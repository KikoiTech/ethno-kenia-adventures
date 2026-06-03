# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start dev server at localhost:3000
npm run build      # Build for production
npm run generate   # Generate static site (SSG)
npm run preview    # Preview production build
```

No test runner or lint scripts are configured.

## Environment Variables

Copy `.env.example` to `.env` and fill in:

```
SMTP_HOST / SMTP_PORT / SMTP_USER / SMTP_PASS   # Nodemailer (Truehost/cPanel SMTP)
NUXT_PUBLIC_GTAG_ID                              # Google Analytics
SUPERBASE_URL / SUPERBASE_KEY                    # Supabase public credentials
SUPERBASE_SERVICE_KEY                            # Server-side admin key (never exposed to client)
```

Note the intentional typo: env vars use `SUPERBASE_*`, not `SUPABASE_*`.

## Architecture Overview

This is a **Nuxt 4 / Vue 3 / TypeScript** SSR application for a safari booking platform. Users browse packages, submit booking inquiries, and admins manage everything via a protected dashboard.

### Data Flow

1. Safari packages are fetched from Supabase `trips` table (soft-deleted rows excluded via `.is('deleted_at', null)`)
2. Contact/booking inquiries flow through `/api/inquiries.post` (server route) → database INSERT + admin alert email
3. Admin dashboard (`pages/admin/inquiries.vue`) reads inquiries with trip joins; admins can convert inquiries to bookings
4. Multi-currency rates cached client-side (24h) and multi-language support handled by utility APIs
5. All admin writes use server routes with Supabase service role key (bypasses RLS), plus Bearer token auth verification

**Inquiry Submission Pattern:**
When an inquiry is submitted:

1. Form POSTs to `/api/inquiries` with inquiry details
2. Server route validates and inserts into `inquiries` table
3. Admin alert email sent to ADMIN_EMAIL via SMTP (includes full inquiry details)
4. Response returns immediately with inquiry ID

### Supabase Tables

| Table       | Purpose |
|-------------|---------|
| `trips` | Safari packages (includes `deleted_at` for soft deletes) |
| `inquiries` | Contact/inquiry form submissions (status: new/replied/converted_to_booking/archived) |
| `bookings` | Booking submissions (linked to inquiries via `original_inquiry_id`) |
| `profiles` | Admin users (role: `admin` or `super_admin`) |
| `audit_logs` | Admin action history |

### Key Directories

- `pages/` — File-based routing. Public routes live at the top level; admin routes under `pages/admin/`
- `components/` — Auto-imported. Subdirectories: `admin/`, `layout/`, `safari-packages/`, `sections/`, `ui/`
- `server/api/` — Nitro server routes (`contact.post.ts`, `admin/users.get.ts`)
- `middleware/admin-auth.ts` — Protects all `/admin/*` routes except `/admin/login`
- `layouts/` — `default.vue` (public), `admin.vue` (dashboard with auth check), `home.vue`
- `composables/useAdmin.ts` — Admin auth, profile fetching, audit logging; uses `useState('admin_profile')`
- `utils/supabase.ts` — Singleton Supabase client via `useSupabase()`
- `utils/package-data.ts` — Package filtering, sorting, pricing calculations, and `validateBookingForm()`
- `types/safari-package.ts` — All TypeScript interfaces (packages, bookings, pricing, availability)

### Inquiry Management

**Public Forms:**

- `contact-us.vue` — General inquiry form (posts to `/api/inquiries` with `trip_id: null`)
- `safari-packages/BookingForm.vue` — Per-trip booking inquiry (posts to `/api/inquiries` with trip's `id`)

**Admin Dashboard:**

- `pages/admin/inquiries.vue` — Full CRUD + conversion workflow for regular admins; filters by status (New/Replied/Converted/Archived)
- `/api/inquiries.post` — Accepts inquiry submissions, saves to DB, sends admin alert email; uses service key to bypass RLS
- `/api/admin/inquiries/[id]/convert.post` — Converts inquiry to booking entry

**Soft Delete Pattern (Tours):**

- `trips` table has `deleted_at` column; archiving sets it, deletion clears it
- `utils/package-loader.ts` filters all queries: `.is('deleted_at', null)`
- Regular admins see archive UI only; super-admins can restore or permanently delete

### Styling

Tailwind CSS with custom brand tokens defined in `tailwind.config.js`: `terracotta`, `green`, `charcoal`, `sand`, `off-white`. shadcn-nuxt provides UI primitives (`Button`, `Card`, `Dialog`, etc.) configured via `components.json`. Dark mode uses the `class` strategy. Custom fonts: Inter (sans) and Playfair Display (serif).

### Authentication

Supabase Auth (email/password). The `useAdmin()` composable wraps session management via `onAuthStateChange`. Role-based access distinguishes `admin` from `super_admin`. The `admin.vue` layout enforces auth on the client side; `middleware/admin-auth.ts` enforces it at the router level.

### Notable Integrations

- **Mapbox GL** — Interactive maps on package detail pages
- **@nuxt/image + Cloudinary** — Image optimization; configured in `nuxt.config.ts` with Cloudinary baseURL
- **nuxt-gtag** — Google Analytics
- **Twak.to** — Live chat widget loaded via `plugins/twak.client.ts`
- **vue-sonner** — Toast notifications
- **vee-validate + Zod** — Form validation
