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

1. Safari packages are fetched from Supabase `trips` table (migrated from a local `safaris.json`)
2. Booking/contact forms submit to `/api/contact` (server route), which sends HTML email via Nodemailer
3. Admin dashboard reads/writes `bookings`, `trips`, `inquiries`, `profiles`, and `audit_logs` tables using the Supabase service role key (server-side only)
4. Multi-currency rates are fetched via `utils/currency-api.ts` with a 24-hour client-side cache
5. Multi-language support (EN/ES/FR/DE/ZH/JA) is handled in `utils/translation-api.ts`

### Supabase Tables

| Table | Purpose |
|---|---|
| `trips` | Safari packages |
| `bookings` | Booking submissions |
| `inquiries` | Contact/inquiry form submissions |
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
