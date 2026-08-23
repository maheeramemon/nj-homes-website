# NJ Homes — njhomeconcept.com

Marketing website for NJ Homes / NJ Home Concepts, a family-run residential
construction company building new homes across the Dallas–Fort Worth metroplex.

Live at **https://njhomeconcept.com**, hosted on Netlify.

## Structure

| Folder | What it is |
|---|---|
| `site/` | The deployed website (plain HTML/CSS/JS — no build step). This is Netlify's publish directory. |
| `design/` | The original design handoff bundle (reference only, not deployed). |

## Editing

- Home page: `site/index.html`
- Blog index: `site/blog.html` · blog post content: `site/js/blog.js`
- Styles: `site/css/styles.css` · behavior: `site/js/main.js`
- Photos/logos: `site/img/`

The contact form uses **Netlify Forms** (form name: `interest`); submissions
appear in the Netlify dashboard and are emailed via the configured form
notification.

## Deploying

The Netlify project is linked to this repository — pushing or merging to
`main` deploys automatically. Publish directory: `site`, no build command.
