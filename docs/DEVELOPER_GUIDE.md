# Ethno Kenya Adventure — Developer Guide

Technical reference for anyone picking up this codebase — including future-you after a long break. Pairs with `docs/OWNER_GUIDE.md` (non-technical, for the site owner) and `CLAUDE.md` (short quick-reference for AI coding assistants — this document supersedes it wherever the two disagree; discrepancies found are called out below).

---

## 1. What this project is

A **safari booking-inquiry platform** for Ethno Kenya Adventure. Visitors browse safari packages and submit inquiries; there is **no payment/checkout flow** — inquiries are emailed to the admin and managed through a protected dashboard, where staff manually convert promising inquiries into internal booking records.

## 2. Tech stack

| Layer | Choice |
|---|---|
| Framework | Nuxt 4 (Vue 3, TypeScript), SSR (no custom `ssr`/`nitro` overrides — defaults apply) |
| Styling | Tailwind CSS + shadcn-nuxt (`components.json`: style `default`, base color `slate`, components in `components/ui`) |
| Database/Auth | Supabase (Postgres + Supabase Auth) |
| Images | Cloudinary, via `@nuxt/image`'s cloudinary provider |
| Email | Nodemailer over SMTP (Truehost/cPanel) |
| Maps | `mapbox-gl` is a dependency but **not currently used anywhere** — see §10 Integrations |
| Analytics | `nuxt-gtag` (Google Analytics) |
| Live chat | Tawk.to, loaded via `plugins/twak.client.ts` |
| Forms | vee-validate + Zod (installed; most forms in practice use plain `ref`s and manual validation rather than the vee-validate/Zod pipeline) |
| Notifications | vue-sonner (toast messages in the admin UI) |
| Rich text | `@tiptap/*` suite (installed; check current tour-description editors for actual usage) |

**Commands**: `npm run dev` (localhost:3000), `npm run build`, `npm run generate` (SSG), `npm run preview`. **No test, lint, or typecheck script is configured** — there's nothing to run before a PR beyond manual verification.

**Note on `package.json`**: both `reka-ui` (dependency) and `radix-vue` (devDependency) are present — these are the same component library under an old and new name. Likely an incomplete migration; don't add new code against `radix-vue`, prefer `reka-ui` or existing shadcn components.

---

## 3. Environment variables — corrected

`CLAUDE.md` states env vars intentionally use the typo `SUPERBASE_*`. **This is stale/incorrect.** The actual code (`nuxt.config.ts`) reads:

```
SUPABASE_URL
SUPABASE_KEY
SUPABASE_SERVICE_KEY
```

(correctly spelled, no typo). `.env.example` at the repo root is also **missing all three of these** — it only lists `SMTP_*`, `SITE_URL`, and `NUXT_PUBLIC_GTAG_ID`. Anyone bootstrapping from `.env.example` alone will get a Supabase client with no credentials and silent failures. When touching onboarding docs or `.env.example`, add the three Supabase keys.

Full required `.env`:
```
SMTP_HOST / SMTP_PORT / SMTP_USER / SMTP_PASS   # Nodemailer
SITE_URL
NUXT_PUBLIC_GTAG_ID
SUPABASE_URL / SUPABASE_KEY                     # public, RLS-bound client
SUPABASE_SERVICE_KEY                            # server-only, bypasses RLS — never exposed to the client
```

---

## 4. Supabase connection — two different clients

- **`utils/supabase.ts`** — a singleton client (`useSupabase()`) built from `SUPABASE_URL`/`SUPABASE_KEY` (the public anon key). Used by every page/component that reads data directly from the browser or during SSR. Subject to Row Level Security (RLS) policies configured in Supabase.
- **Server-side admin client** — every `server/api/admin/*.ts` route (and `server/api/inquiries.post.ts`) builds its **own** `createClient(...)` instance ad-hoc using `SUPABASE_SERVICE_KEY`, which bypasses RLS entirely. This is intentional (admin writes need to bypass RLS), but note it's **not a shared singleton** — each route repeats the same few lines of client construction. A shared `server/utils/supabaseAdmin.ts` helper would be a reasonable, low-risk refactor if you're touching several of these routes anyway.

> 📸 Diagram: Supabase table editor showing the `trips` table

---

## 5. Database schema (as-built, verified live against Supabase this session)

| Table | Purpose |
|---|---|
| `trips` | Safari packages. Soft-deleted via `deleted_at` (see §7). |
| `inquiries` | Contact/booking inquiry submissions. `status`: `new` / `replied` / `converted_to_booking` / `archived`. |
| `bookings` | Internal booking records, created by converting an inquiry (`original_inquiry_id` links back). |
| `profiles` | One row per admin user, `role`: `admin` or `super_admin`. Keyed to a Supabase Auth user id. |
| `audit_logs` | `{ id, admin_id, action, target_id, details (jsonb), created_at }` — see §11 for a caveat on `target_id`. |
| `admin_invitations` | Not documented in `CLAUDE.md`. Token-based admin invite flow (see §6): stores a SHA-256 hash of a random token, the invited email/role, a 30-minute expiry, and a used flag. |

### `trips` — the three-column classification split

The `type` column used to conflate two unrelated concepts, which silently broke several nav filters and the GROUP/PRIVATE badge (any trip created through the admin UI never matched the activity-based filters, and no trip had ever been tagged `private`). This was fixed and the table now has **three separate, single-purpose columns**:

| Column | Meaning | Real values in use |
|---|---|---|
| `type` | **Booking mode** — how the trip is run | `group`, `private`, `self-drive`, `fly-in`, `walking`, `day-trip` |
| `activity_type` | **Safari activity** | `Wildlife`, `Trekking`, `Beach`, `Dining` (legacy rows may have combo strings like `Wildlife & Beach` — filters match these with `.includes()`, not strict equality) |
| `category` | **Marketing category** | `Day Trips`, `Mountain Climbing`, `Multi-Day Safaris`, `Luxury Safaris`, `International`, `Kenya Safaris` |

All three are editable via dedicated selects on the admin tour form (`pages/admin/tours/add.vue`, `pages/admin/tours/edit/[id].vue`). The filtering logic that reads them lives in `pages/safari-packages/index.vue`'s `filteredPackages` computed — see the inline comments there for exactly which nav link maps to which combination of `type`/`activity_type`/`category`/`country`. If you add a new nav filter link, follow that same pattern rather than inventing a fourth taxonomy on a new column.

---

## 6. Auth & authorization model

- **Supabase Auth** (email/password) is the identity provider. A `profiles` row (keyed by the Auth user id) carries the `role`.
- **`middleware/admin-auth.ts`** — route-level gate, applied per-page via `definePageMeta({ middleware: ['admin-auth'] })` (not a global middleware). Allows `/admin/login`, `/admin/accept-invite`, `/admin/reset-password` unauthenticated; everywhere else, checks for a session and a `profiles.role` of `admin`/`super_admin`, signing out and redirecting to login otherwise. This is the first line of defense, run before the page renders.
- **`layouts/admin.vue`** — a *second*, client-side check in `onMounted` (own `getUser()` + profile fetch), and it's also where the **`onAuthStateChange` listener** lives (reacting to a session expiring while already on an admin page). Note this corrects `CLAUDE.md`, which describes `onAuthStateChange` as living inside `composables/useAdmin.ts` — it doesn't; `useAdmin()` only exposes `fetchProfile()`/`signOut()`/`logAction()` and the `isAdmin`/`isSuperAdmin` computeds, sourced from a shared `useState('admin_profile')`.
- **Server routes** — every `server/api/admin/*` route independently verifies a `Bearer <token>` in the `Authorization` header via `supabaseAdmin.auth.getUser(token)`, then looks up `profiles.role` and requires `admin`/`super_admin` (or `super_admin`-only for the `users/*` namespace and tour restore/purge). As of this session, this pattern is now applied **consistently across every admin route** — see §11 for the gaps that were closed.
- **Invite flow** (`admin_invitations` table): a super_admin invites via Team Management → `POST /api/admin/invite` (Bearer + super_admin check, generates a random token, stores its SHA-256 hash + 30-min expiry, emails a link; if SMTP env vars are missing it "simulates" the send and returns the link directly in the JSON response — handy for local dev). The invitee visits `/admin/accept-invite?token=...` → `GET /api/admin/accept-invite` validates the token → the acceptance form → `POST /api/admin/accept-invite` creates the Supabase Auth user (`auth.admin.createUser`, pre-confirmed) and a `profiles` row, then marks the invite used.
- **Forgot/reset password flow** (separate from the invite flow above): the "Forgot password?" modal on `pages/admin/login.vue` → `POST /api/admin/forgot-password` (always reports success regardless of whether the email exists, to avoid leaking which emails are registered) → reset link lands on `pages/admin/reset-password.vue` → validated/consumed via `GET`/`POST /api/admin/reset-password`. Both this page and `/admin/accept-invite` are explicitly allowlisted as unauthenticated routes in `middleware/admin-auth.ts`.

Frontend calls to protected routes attach the bearer token via a small repeated helper pattern:
```ts
async function getAuthHeaders() {
  const { data: { session } } = await supabase.auth.getSession()
  return { Authorization: `Bearer ${session?.access_token}` }
}
```
(originally in `pages/admin/tours/index.vue`, now duplicated into `add.vue`, `edit/[id].vue`, and `pages/admin/inquiries.vue`). If you add a new admin write endpoint, copy this pattern rather than inventing another.

---

## 7. Page-by-page reference

### Public

| Page | Purpose |
|---|---|
| `pages/index.vue` (`layout: 'home'`) | Homepage. Full-viewport rotating hero, then composes `TripFilter`, `IntroSection`, `FeaturedPackages`, `JourneyShowcase`, `GalleryPreview`, `StartYourJourney` in sequence. |
| `pages/about-us.vue` | Static brand story page. No API calls; all content hardcoded in-template. A "Meet Your Local Guides" section is commented out (dead markup, not deleted). |
| `pages/contact-us.vue` | General contact form (first/last name, email, phone, message) → `POST /api/inquiries` with `trip_id: null`. Has its own separate submit logic from `BookingForm.vue` (not shared). |
| `pages/safari-packages/index.vue` (`layout: 'home'`) | The filterable package listing. See §5 for how the `type`/`activity_type`/`category`/`country`/`tourType`/`duration` query params combine. |
| `pages/safari-packages/[slug].vue` | **The live trip detail page.** Fetches via `getSafariBySlug()` (`utils/package-loader.ts`, Supabase). Renders hero, quick facts, an inline itinerary timeline, inclusions/exclusions, and a sticky `BookingForm`. `currentLanguage` is hardcoded to `'en'` here (no language switcher is rendered) and price only displays `price.USD` (no live currency conversion) — see §8. |
| `pages/safari-packages/booking/[slug].vue` | A second, partially-broken detail/booking page — the "Inquire" button calls `openBookingModal()` but **no modal exists in the template**, so nothing happens on click. Treat as needing a fix or removal before pointing any link at it. |
| `pages/safaris/[slug].vue` | An orphaned duplicate detail page (uses `ItineraryAccordion`). **Nothing links to `/safaris/...` anywhere in the app** — likely superseded by `safari-packages/[slug].vue` and safe to delete after confirming no external backlinks (SEO/bookmarks) depend on it. |

### Admin (all under `layouts/admin.vue`, gated by `middleware/admin-auth.ts`)

| Page | Purpose |
|---|---|
| `pages/admin/login.vue` | Supabase Auth sign-in + role check; "Forgot password?" modal (anti-enumeration: always reports success). |
| `pages/admin/accept-invite.vue` | Invited-admin onboarding (sets name/password) — see §6. |
| `pages/admin/dashboard.vue` | Stat cards (active trips, bookings, inquiries, conversion rate), recent bookings table, quick actions. Subscribes to Supabase Realtime on `bookings` insert/update to toast new bookings. One stat card's copy was overwritten from "Total Revenue" to "Active Trips" in code (no `total_paid` column exists) — the `DollarSign` icon is stale, cosmetic-only, low priority. |
| `pages/admin/tours/index.vue` | Tour list. Regular admins: search + Archive (soft delete). Super admins additionally see archived rows with Restore/Purge (permanent delete). |
| `pages/admin/tours/add.vue` / `edit/[id].vue` | Create/edit a tour — see §5 for the Tour Type / Activity Type / Category fields. |
| `pages/admin/inquiries.vue` | Two-pane inbox (list + detail), status tabs (new/replied/converted_to_booking/archived), convert-to-booking flow. "Reply" is a `mailto:` link, not in-app messaging. |
| `pages/admin/bookings.vue` | Booking records list. |
| `pages/admin/team.vue` | Super-admin-only. Invite/remove admins, change roles, view an admin's recent activity, trigger a password reset for someone else. Removing a team member deletes only their `profiles` row (dashboard access), not their underlying auth account. |
| `pages/admin/logs.vue` | Super-admin-only audit trail viewer. Two known dead-UI spots: the "View Changes" button per row has no click handler, and "Live Feed" just re-runs the fetch (not an actual realtime subscription despite the label). Also, the UI reads a `log.target_name` field that is **never written** by any insert (only `target_id` is) — it always falls back to `"Object #<id prefix>"`. If you want readable target names in the log, either write `target_name` at insert time or resolve `target_id` → a human label at render time. |
| `pages/admin/settings.vue` | Personal account settings only (display name, email, password, sign-out-other-devices) — not site-wide configuration. |

### Orphaned/unused components (found during this session's audit — don't spend time debugging these unless you're the one reviving them)

- `components/safari-packages/CurrencyConverter.vue` and `LanguageSelector.vue` — fully built, never imported by any page. Multi-currency and multi-language support are therefore **inert on the live site** — `currentLanguage` is hardcoded `'en'` everywhere, and package prices show raw USD with no conversion.
- `components/sections/WildlifeSanctuaryBanner.vue` — not referenced anywhere.
- `components/layout/OfferModal.vue` — a fully built 25%-off newsletter popup; commented out in both `layouts/default.vue` and `layouts/home.vue`. Contains leftover debug `console.log`s including "Reduced to 3 seconds for testing" if you do decide to re-enable it.
- `pages/safaris/[slug].vue` and `pages/safari-packages/booking/[slug].vue` — see table above.

---

## 8. Multi-language and multi-currency — built but not wired up

- **Language**: `utils/translation-api.ts` exports `getText(text, language)`, which resolves a `MultiLanguageText` object with a fallback chain (requested language → `en` → first available key). `SUPPORTED_LANGUAGES` there covers 6 languages (`en, es, fr, de, zh, ja`) plus `sw` used ad hoc in several components — narrower than `LanguageSelector.vue`'s own hardcoded 15-language list, so the two are already out of sync. The `translateText`/`mockTranslate` pipeline is an explicit stub ("For demo purposes... In production, you'd integrate with Google Translate API") with a hand-written ~8-phrase dictionary — there is no real translation API integrated. Since no page renders `LanguageSelector`, none of this is reachable by an actual visitor today.
- **Currency**: `utils/currency-api.ts` fetches live rates from `exchangerate-api.com`, cached in-memory for 24h, with a large hardcoded fallback rate table if the fetch fails. Fully functional — but only `CurrencyConverter.vue` calls into it, and that component isn't mounted anywhere.

If either feature is wanted, the utilities are largely ready — the work is wiring `LanguageSelector`/`CurrencyConverter` into the live pages (`[slug].vue`, `index.vue`) and making `currentLanguage`/`selectedCurrency` real reactive state instead of hardcoded values.

---

## 9. Key flows end-to-end

**Inquiry submission** (general or per-trip): form (`contact-us.vue` or `BookingForm.vue`) → `POST /api/inquiries` (`server/api/inquiries.post.ts`) → validates `first_name`+`email` present → inserts into `inquiries` via the service-role client (bypasses RLS) → resolves the trip title if `trip_id` is set → sends an admin-alert email via its own Nodemailer transporter to `SMTP_USER` (email failure is caught and swallowed — the inquiry is already saved, so a broken SMTP config doesn't lose the lead, it just silently skips the alert).

**Inquiry → booking conversion**: `pages/admin/inquiries.vue` → `POST /api/admin/inquiries/[id]/convert` → verifies Bearer + admin/super_admin role → copies contact/travel fields from the inquiry into a new `bookings` row (`status: 'confirmed'`, `original_inquiry_id` set) → marks the source inquiry `converted_to_booking`. No email is sent on conversion.

**Tour create/edit**: admin form → `POST /api/admin/tours` or `PUT /api/admin/tours/[id]` → Bearer + admin/super_admin check → upserts into `trips` (all three classification columns from §5, plus everything else). `logAction('CREATE_TOUR' | 'UPDATE_TOUR', ...)` records it in `audit_logs`.

**Soft delete / restore / purge**: `tours/index.vue` → `DELETE /api/admin/tours/[id]` (sets `deleted_at`, any admin) → `POST /api/admin/tours/[id]/restore` (clears `deleted_at`, super_admin only) → `DELETE /api/admin/tours/[id]/purge` (hard delete, super_admin only). `utils/package-loader.ts`'s `getSafaris()`/`getSafariBySlug()` always filter `deleted_at is null`, so an archived trip immediately disappears from every public page without a code change needed anywhere else.

**Admin invite → accept**: see §6.

---

## 10. Integrations

- **Cloudinary** (`@nuxt/image`, provider config in `nuxt.config.ts`, `baseURL: 'https://res.cloudinary.com/dmdihuyvn/image/upload/'` — cloud name hardcoded, not env-driven). The provider passes `width`/`height` straight through to Cloudinary as `w_`/`h_` **without a `fit` modifier unless you explicitly pass one** — Cloudinary's default for bare `w,h` is `c_scale`, which **stretches/distorts** the image to force those exact dimensions rather than cropping. `components/sections/FeaturedPackages.vue` hit this (landscape photos looked squeezed into tall cards) and was fixed by adding `fit="cover"` (→ Cloudinary `c_lfill`) and `gravity="auto"` (content-aware crop) to the `NuxtImg`. **Any other `NuxtImg` using explicit `width`/`height` without `fit` has the same latent bug** — worth a repo-wide check if you're touching image display.
- **SMTP/Nodemailer**: no shared mailer utility exists (`server/utils/` doesn't exist). `server/api/contact.post.ts` and `server/api/inquiries.post.ts` each build their own transporter independently with near-identical config (`tls.rejectUnauthorized: false` for Truehost/cPanel compatibility). Both fall back to a "simulated send" (console log, no real email) if SMTP env vars are missing — useful for local dev, easy to forget in production if env vars are ever accidentally unset. A `server/utils/mailer.ts` shared helper is a reasonable refactor if you touch either route.
- **Google Analytics**: `nuxt-gtag` module, id from `NUXT_PUBLIC_GTAG_ID`.
- **Tawk.to live chat**: `plugins/twak.client.ts`, client-only. Hidden on `/contact-us` and every `/admin*` route via a route-based show/hide check in `router.afterEach`.
- **Mapbox**: installed (`mapbox-gl`) but not imported/used anywhere despite `CLAUDE.md` claiming "Interactive maps on package detail pages." Either add the map to `[slug].vue` or remove the dependency and the CLAUDE.md claim.

---

## 11. Known issues / technical debt

Fixed this session (documented here so it isn't rediscovered from scratch later):
- **`type`/`activity_type`/`category` taxonomy collision** on `trips` — see §5. Was causing "Private Bush Safaris" and several other nav filters to silently return zero results.
- **Unauthenticated admin write/read endpoints** — `POST /api/admin/tours`, `PUT /api/admin/tours/[id]`, and `GET /api/admin/users` had zero auth checks (the last one publicly leaked the full admin roster's names/emails/roles to anyone who requested the URL, though nothing in the frontend actually called it). `POST /api/admin/inquiries/[id]/convert` checked for *any* logged-in session but not an admin role. All four now use the same Bearer-token + `profiles.role` check as their sibling routes.
- Cloudinary image stretching on `FeaturedPackages.vue` — see §10.

Still open, not addressed this session:
- Multi-language and multi-currency are fully built but not wired into any live page (§8).
- `pages/safaris/[slug].vue` and `pages/safari-packages/booking/[slug].vue` are broken/orphaned (§7).
- `CurrencyConverter.vue`, `LanguageSelector.vue`, `WildlifeSanctuaryBanner.vue`, `OfferModal.vue` are unused/disabled components.
- Duplicated SMTP transporter setup (§10).
- `audit_logs.target_name` is read by the UI but never written (§7, `logs.vue`).
- `reka-ui` and `radix-vue` both present as dependencies — likely an incomplete migration (§2).
- No test, lint, or typecheck script configured anywhere in `package.json`.
- `.env.example` is missing the three Supabase env vars entirely (§3).

---

## 12. Local setup checklist

1. `npm install`
2. Copy `.env.example` to `.env`, then **add the three Supabase keys** (not in the example file — see §3): `SUPABASE_URL`, `SUPABASE_KEY`, `SUPABASE_SERVICE_KEY`, plus `SMTP_*`, `SITE_URL`, `NUXT_PUBLIC_GTAG_ID`.
3. `npm run dev` → `http://localhost:3000` (falls back to the next free port if 3000 is taken).
4. To reach the admin dashboard you need a `profiles` row with `role = 'admin'` or `'super_admin'` linked to a real Supabase Auth user — either seed one directly in Supabase or use the invite flow (§6) from an existing super_admin account.
