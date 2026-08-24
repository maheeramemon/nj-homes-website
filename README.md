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
- Blog index: `site/blog.html` · one file per post in `site/blog/<slug>.html`
- Styles: `site/css/styles.css` · behavior: `site/js/main.js`
- Photos/logos: `site/img/`
- Crawling: `site/sitemap.xml`, `site/robots.txt`

### Adding a blog post

Each post is a standalone, indexable page. Copy the closest existing file in
`site/blog/`, then update the `<title>`, meta description, canonical URL, Open
Graph tags and the three JSON-LD blocks (`BlogPosting`, `BreadcrumbList`, and
`FAQPage` if the post has a "Common questions" section) — they all repeat the
post's own title, description, image and date, so none of them can be left
pointing at the file you copied.

Then add the post to three places: a `<article class="post">` card in
`site/blog.html`, its `blogPost` entry in that page's JSON-LD, and a `<url>`
entry in `site/sitemap.xml`. Linking the new post from two or three related
posts (`.article-related`) is worth the minute it takes.

Posts used to be JavaScript objects inside `site/js/blog.js`, rendered into
`blog.html#slug`. That gave every post the same URL, so none of them could rank
in search. `js/blog.js` is now only a redirect shim that forwards those four old
hash links to their real pages; leave it in place.

The contact form uses **Netlify Forms** (form name: `interest`); submissions
appear in the Netlify dashboard and are emailed via the configured form
notification.

## Deploying

The Netlify project is linked to this repository — pushing or merging to
`main` deploys automatically. Publish directory: `site`, no build command.
