# Admin panel: setup and daily use

The admin panel lives at `/admin/` on your website
(for example `https://YOUR-NAME.github.io/ideal-english-school/admin/`).
Whatever you save there is stored in Supabase and shown on the public website
the next time someone loads the page.

## One-time setup (about 10 minutes)

### 1. Create the database tables
1. Open your project at supabase.com → **SQL Editor** → **New query**.
2. Open `database/cms-setup.sql` from this project, copy everything, paste it in, press **Run**.
   It is safe to run again later; it only adds what is missing.

### 2. Create your admin login
1. Supabase → **Authentication → Users → Add user → Create new user**.
   Enter an email and a strong password and tick **Auto Confirm User**.
2. Back in the **SQL Editor**, run this (use the same email):
   ```sql
   insert into public.cms_admins (user_id)
   select id from auth.users where email = 'YOUR-EMAIL@EXAMPLE.COM'
   on conflict do nothing;
   ```
   Repeat for every person who should be allowed to edit the website.

### 3. (Only for "Forgot password?") allow the redirect
Supabase → **Authentication → URL Configuration**: set **Site URL** to your website address
and add `https://YOUR-NAME.github.io/ideal-english-school/admin/` under **Redirect URLs**.

### 4. Publish the files
Upload this whole project to GitHub (replace the old files). GitHub Pages republishes automatically.
The `images/` folder is new: it holds the logo and the original gallery photos
(they used to be hidden inside `js/main.js`, which made the site slow).

### 5. First sign-in
Open `/admin/`, sign in, and look at the **Dashboard**. If you see a yellow
"Database setup needed" message, step 1 was not completed.

Optional but recommended: **Gallery → Import the original photos**. This puts the
19 original photos into the admin so you can rename, reorder, hide or delete them.

When the school has approved the content: **Website text → Whole website → Website status → Live**
(this hides the yellow "Draft for school approval" bar).

## What each section does

| Section | What you can do | Where it shows on the website |
|---|---|---|
| **Notices** | Add, edit, publish/unpublish, delete. Category, date, summary, details, optional PDF/image attachment. | Notices page and "Latest notices" on the home page |
| **Gallery** | Upload many photos at once, caption, category, reorder, hide, delete. | Gallery page, and the first 4 photos feed "Life at school" on the home page (after importing the originals) |
| **Page photos** | Replace the main home-page photo, the welcome photo and the About page photo. | Home and About pages |
| **Website text** | Heading and intro, welcome paragraph, phone, email, office hours, vision, mission, school numbers, urgent message bar, Draft/Live status. | Throughout the site |

Leave a text box empty to keep the original wording.
Big phone photos are shrunk automatically before upload.

## Good to know
- If the database cannot be reached, visitors still see the original built-in content, so the site never breaks.
- Drafts and hidden photos are never visible to visitors (this is enforced by the database, not just the page).
- Only people listed in `cms_admins` can change anything. The key inside the code is a *publishable* key and is safe to be public. **Never** put a Supabase `service_role` / secret key in any file.
- Deleting a photo or notice also deletes its uploaded file.
- A new notice list replaces the built-in "Admissions enquiry" placeholder notice as soon as the database answers.
