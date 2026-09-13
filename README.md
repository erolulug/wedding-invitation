# Wedding Invitation Website

A single-page wedding invitation site with:
- Tap-to-open envelope intro
- Live countdown to the wedding
- Schedule / timeline, venue, dress code, gifts, story/photos sections
- RSVP form in a modal
- Background music you control (on/off toggle, autostarts when the envelope opens)
- Full Czech + Turkish translations with a language switch (top-left)

Everything is placeholder content marked "(doplňte)" / "(buraya ekleyin)" —
edit the files below to make it yours. No build step, no dependencies:
just HTML/CSS/JS.

## Where to edit things

| What | File |
|---|---|
| All visible text, in both languages | `js/translations.js` |
| Wedding date/time, default language, venue address for the map link | top of `js/main.js` (also update `wedding_date_display` in `js/translations.js` to match) |
| RSVP form fields, section order/structure | `index.html` |
| Colors, fonts, spacing | `css/style.css` (`:root` block at the top) |
| Photos | replace the `.gallery-placeholder` divs in `index.html` with `<img src="assets/images/yourphoto.jpg">` |
| Music | see `assets/music/README.txt` — just drop a file named `song.mp3` in that folder |

## Adding your music
Put your MP3 at `assets/music/song.mp3`. Nothing else to configure —
the page already references that path. Swap the file anytime; guests
always get whatever is currently there.

## Making the RSVP form actually receive submissions
Right now the form points to a placeholder URL and will just show the
"thank you" message locally without saving anywhere. To collect real
RSVPs for free:

1. Go to https://formspree.io and create a free account (50 submissions/month free).
2. Create a new form, copy the endpoint it gives you (looks like
   `https://formspree.io/f/abcd1234`).
3. In `index.html`, find `<form id="rsvp-form" action="https://formspree.io/f/YOUR_FORM_ID" ...>`
   and replace `YOUR_FORM_ID` with your real endpoint.
4. Submissions will now arrive in your Formspree dashboard and by email.

(Google Forms is a free alternative if you'd rather use that — swap the
form's `action`/field names accordingly.)

## Publishing it for free

**Option A — Netlify (easiest, drag-and-drop)**
1. Go to https://app.netlify.com/drop
2. Drag the whole `wedding_project` folder onto the page.
3. You get a free `https://your-name.netlify.app` URL instantly.
   You can rename the site (still free) in Site settings → Change site name.

**Option B — GitHub Pages**
1. Create a new GitHub repository and push this folder to it:
   ```
   cd wedding_project
   git init
   git add .
   git commit -m "Wedding invitation site"
   git branch -M main
   git remote add origin https://github.com/<you>/<repo>.git
   git push -u origin main
   ```
2. In the repo on GitHub: Settings → Pages → Source: "Deploy from branch",
   branch `main`, folder `/ (root)`.
3. Your site is live at `https://<you>.github.io/<repo>/` within a minute or two.

**Option C — Vercel**
1. Go to https://vercel.com, "Add New Project", import the folder/repo.
2. No build settings needed (it's static). Deploy — free `.vercel.app` URL.

Any of these can later have a custom domain attached (e.g. `janaaahmet.cz`)
for a few dollars/year if you want one — the free subdomain works fine
for sending to guests.

## Testing locally
Just open `index.html` directly in a browser, or run a tiny local server
so the audio/paths behave exactly like they will online:
```
cd wedding_project
python3 -m http.server 8000
```
Then visit http://localhost:8000
