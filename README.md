# Ideal English School Website

Static website (plain HTML/CSS/JS) with a Supabase-powered admin panel.

```text
ideal-english-school/
├── index.html          # public website
├── css/style.css
├── js/
│   ├── main.js         # website pages and built-in content
│   └── cms.js          # loads notices, photos and text saved in /admin
├── images/             # logo and original gallery photos
├── admin/              # the admin panel (index.html, admin.css, admin.js)
├── database/cms-setup.sql   # run once in Supabase SQL Editor
└── ADMIN-SETUP.md      # setup guide and how-to
```

## Run locally
Use VS Code Live Server, or run `python3 -m http.server 8000` in this folder and open
`http://localhost:8000` (website) and `http://localhost:8000/admin/` (admin).
Opening `index.html` directly from the disk also works for the website.

## Publish with GitHub Pages
Push to `main`; the workflow in `.github/workflows/pages.yml` publishes the `ideal-english-school` folder.

## Admin panel
See **ADMIN-SETUP.md**.
