# Ethno Kenya Adventure — Owner's Guide

This guide is for the site owner and staff who use the admin dashboard day to day. It doesn't cover any code — for that, see `docs/DEVELOPER_GUIDE.md`, which is written for a developer.

---

## 1. What this website does

This is a **booking-inquiry website** for a safari tour company, not an online checkout. Nobody pays through the site. Instead:

1. A visitor browses safari packages.
2. They fill out a form — either a general question ("Contact Us") or a request about a specific trip ("Book This Journey").
3. That form is saved to the dashboard as an **inquiry**, and you (the admin) get an email alert immediately.
4. You follow up with the customer by email or phone, outside the website.
5. Once the trip is confirmed, you convert that inquiry into a **booking** from the dashboard — this is just an internal record for you, it doesn't charge the customer or send them anything automatically.

> 📸 Screenshot: the public homepage

---

## 2. Logging in

Go to `/admin/login` on the site (e.g. `https://yourdomain.com/admin/login`). Enter the email and password you were given. If you forget your password, use "Forgot password?" on the login screen — you'll get a reset link by email.

> 📸 Screenshot: login screen

### Roles: Admin vs Super Admin

There are two levels of access:

- **Admin** — can manage tours (add/edit/archive) and inquiries/bookings day to day.
- **Super Admin** — everything an Admin can do, **plus**: inviting/removing team members, changing anyone's role, viewing the audit log (a history of who did what), and permanently deleting archived tours.

If a menu item doesn't appear in your sidebar, it's because your role doesn't have access to it — that's expected, not a bug.

---

## 3. The Dashboard, screen by screen

> 📸 Screenshot: dashboard overview

### Overview
Your at-a-glance summary: how many active trips you have listed, how many bookings are pending/confirmed, total inquiries received, and a conversion rate (how many inquiries turned into bookings). Below that, a table of your most recent bookings, and quick shortcuts to add a new tour or manage your team.

### Tours
This is where every safari package on the site is managed.

> 📸 Screenshot: tour add form

When you add or edit a tour, you'll fill in the basics (title, price, duration, location, countries, description, photos, itinerary, inclusions/exclusions) plus three separate classification fields that are easy to confuse, so here's what each one means:

- **Tour Type** — is this trip run as a *group tour* or a *private tour* (or self-drive, fly-in, walking, day-trip)? This drives the "GROUP/PRIVATE" badge shown on the package card, and it's also how the "Group Bush Safaris" / "Private Bush Safaris" menu links filter results.
- **Activity Type** — what kind of safari is it: Wildlife, Trekking, Beach, or Dining? This is how the "Mt Climbing", "Beach Holidays", and "Bush and Beach" menu links find the right trips.
- **Category** — a broader marketing grouping (Day Trips, Mountain Climbing, Multi-Day Safaris, Luxury Safaris, International, Kenya Safaris) used mainly for the "International Tours" menu link.

**Rule of thumb**: if you add a new trip and it doesn't show up under a menu link you expected (e.g. "Beach Holidays"), the most likely cause is one of these three fields wasn't set correctly on that trip — go back into the tour's edit page and check all three.

Archiving a tour hides it from the public site without deleting it — you (or a Super Admin) can restore it later. Only a Super Admin can permanently delete an archived tour.

### Inquiries
Every form submission from the public site lands here, organized into four tabs:

- **New** — just came in, not yet actioned.
- **Replied** — you've responded to the customer.
- **Converted** — turned into a booking.
- **Archived** — no longer active (e.g. customer went elsewhere).

> 📸 Screenshot: inquiries inbox

Click an inquiry to see its full details on the right. "Reply" opens your email client with the customer's address pre-filled — replies happen over your normal email, not inside the dashboard. When you're ready to formalize a booking, click **"Upgrade to Booking"** (if the inquiry was about a specific trip) or **"Create Custom Booking"** (if it was a general inquiry, which lets you pick which trip to attach it to).

### Bookings
Confirmed/pending bookings, most of them created by converting an inquiry above. This is your internal record-keeping — nothing here charges a customer.

### Team Management *(Super Admin only)*
Invite new admins by email (they'll get a link to set their own password), change someone's role, or remove someone's dashboard access. Removing someone here does **not** delete their email account anywhere else — it only revokes their access to this dashboard.

> 📸 Screenshot: team management panel

### Audit Logs *(Super Admin only)*
A running history of significant actions — who archived/restored/deleted a tour, who invited or removed a team member, who changed a role, etc. Useful for accountability if something changes unexpectedly and you need to know who did it and when.

### Settings
Your own personal account settings: display name, email, password, and a "sign out other devices" button if you think your session may be compromised elsewhere. This does **not** control site-wide settings like the contact email or SMTP — those live in server configuration a developer manages.

---

## 4. Common tasks

**Add a new safari package**
Dashboard → Tours → "Add Tour" → fill in the details → make sure Tour Type, Activity Type, and Category are all set (see above) → Save.

**See who inquired about a specific trip**
Dashboard → Inquiries → use the tabs/search to find it. Each inquiry shows which trip (if any) it was about.

**Invite a new team member**
Dashboard → Team Management (Super Admin only) → "Invite Admin" → enter their email and role → they'll receive an email with a link to set their password.

**Reset your own password**
Dashboard → Settings → change password (you'll need to re-enter your current one first), or use "Forgot password?" on the login screen if you're locked out.

**Temporarily hide a tour without deleting it**
Dashboard → Tours → Archive. It disappears from the public site immediately but can be restored later.

---

## 5. Who to talk to

This guide covers *using* the dashboard. If something looks broken, a page won't load, or you need a new feature built, that's a job for a developer — hand them `docs/DEVELOPER_GUIDE.md`, which has everything they need to pick this project up.
