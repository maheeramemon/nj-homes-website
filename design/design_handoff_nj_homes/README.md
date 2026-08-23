# Handoff: NJ Homes — marketing site

## Overview

A marketing website for **NJ Homes / NJ Home Concepts**, a family-run residential construction company building ground-up new homes across the Dallas–Fort Worth metroplex. The site is a single scrolling home page plus a blog page, with a contact/interest form as the primary conversion goal. A future admin view (owner logs in and adds homes to the portfolio) is planned but **not yet designed** — see "Planned, not built" at the end.

The audience is overwhelmingly mobile. Treat phone layout as the primary case and desktop as the wide variant.

## About the design files

The files in this bundle are **design references created in HTML** — prototypes showing intended look and behavior, not production code to copy directly. The task is to **recreate these designs in the target codebase's environment** (Next.js, Astro, Remix, WordPress theme, etc.) using its established patterns, routing, and component conventions. If no environment exists yet, pick the most appropriate framework — this is a content-light marketing site with one form, so a static-site generator (Astro, Next.js static export, Eleventy) plus a form backend is a good default.

The `.dc.html` files use a small template runtime (`{{ }}` holes, `<sc-for>`, `<sc-if>`, a `Component` logic class). Do not port that runtime. Read the markup for structure and exact style values, read the logic class for data and behavior, and rebuild both idiomatically.

## Fidelity

**High fidelity.** Colors, typography, spacing, and interaction behavior are final and should be reproduced as specified. Copy is final except where noted (blog post bodies are placeholder).

---

## Design tokens

### Color

| Token | Hex | Use |
|---|---|---|
| Ink | `#14130F` | Body text, dark sections, header text |
| Ink deep | `#0D0C0A` | Footer background |
| Cream | `#EFE9DF` | Page background |
| Cream raised | `#F7F3EC` | Cards on cream, text on dark |
| Sand | `#E4DACB` | Alternate section background, image placeholder |
| Leather | `#3B2A1E` | Stats band background |
| Copper | `#A87E56` | Link hover, primary hover fill |
| Copper light | `#C29862` | Eyebrow text on dark, hover accent |
| Bronze | `#8A6033` | Eyebrow text on cream |
| Bronze deep | `#7A5427` | Eyebrow text on sand |
| Body muted | `#4A443B` | Long-form body copy |
| Meta | `#6B6357` | Captions, secondary meta |
| Meta light | `#8A8072` | Tertiary meta |

Alpha values used on dark: `rgba(247,243,236,0.6)` labels, `rgba(247,243,236,0.7)` body, `rgba(247,243,236,0.16)` rules, `rgba(247,243,236,0.28)` input underlines.
Alpha values used on cream: `rgba(20,19,15,0.10)` header rule, `rgba(20,19,15,0.16)` card borders and rules, `rgba(20,19,15,0.12)–(0.14)` grid gap fills.

### Typography

Two families, loaded from Google Fonts:

- **Newsreader** (serif) — weights 300, 400, 500 + italic 300. All headings and display numerals.
- **Archivo** (sans) — weights 400, 500, 600. All UI, body copy, labels, forms.

```
Newsreader:ital,opsz,wght@0,6..72,300;0,6..72,400;0,6..72,500;1,6..72,300
Archivo:wght@400;500;600
```

Scale as used:

| Role | Spec |
|---|---|
| Hero H1 | Newsreader 300, `clamp(38px, 7.2vw, 74px)`, line-height 1.04, letter-spacing −0.015em, `max-width:15ch`, `text-wrap:balance` |
| Section H2 | Newsreader 300, `clamp(30px, 5vw, 50px)`, line-height 1.1, letter-spacing −0.01em |
| Sub-section H2 | Newsreader 300, `clamp(28px, 4.4vw, 44px)`, line-height 1.12 |
| Card H3 | Newsreader 400, `clamp(26px, 3.4vw, 36px)`, line-height 1.15 |
| Display numeral (stats, address tiles) | Newsreader 300, 44px / 30px, line-height 1 |
| Pull quote | Newsreader 300 italic, 20px |
| Eyebrow | Archivo 600, 13–14px, letter-spacing 0.18–0.2em, uppercase |
| Micro label | Archivo 400/600, 10.5–12px, letter-spacing 0.14–0.18em, uppercase |
| Body | Archivo 400, 15.5–16.5px, line-height 1.7–1.75, `max-width:44–48ch` |
| Meta | Archivo 400, 13.5–15px |
| Nav | Archivo 400, 14.5px, letter-spacing 0.02em |
| Button | Archivo 500/600, 12.5–13px, letter-spacing 0.14em, uppercase |

### Layout & spacing

- Content max width: **1240px**, centered, 20px side padding.
- Section vertical padding: `clamp(64px, 9vw, 120px)`.
- Section scroll offset for anchor nav: `scroll-margin-top: 80px`.
- Responsive grids use `repeat(auto-fit, minmax(min(100%, Npx), 1fr))` — no media queries needed for the content grids. N values: 340px (portfolio rows), 320px (about, contact), 280px (gallery), 240px (pipeline), 220px (form fields), 190px (Rayner tiles), 150px (stats).
- **Zero border radius everywhere.** Square corners are a defining choice — no rounded cards, buttons, or inputs.
- Hairline dividers instead of shadows. The only shadow in the design is the sticky header's scroll shadow.
- Grid "gap fill" pattern: tile groups use `gap: 2px` over a `rgba(20,19,15,0.12–0.14)` background so the gaps read as hairline rules.

### Breakpoints

Only two, both attribute-driven on the header:

```css
@media (max-width: 860px) { [data-wide-only] { display: none !important; } }
@media (min-width: 861px) { [data-narrow-only] { display: none !important; } }
```

Everything else is fluid via `clamp()` and `auto-fit` grids.

---

## Screens / views

### 1. Header (both pages)

Sticky, `top: 0`, `z-index: 50`, `background: rgba(239,233,223,0.92)`, `backdrop-filter: blur(10px)`, `border-bottom: 1px solid rgba(20,19,15,0.10)`. Inner row: max-width 1240px, `padding: 18px 20px`, flex, `gap: 20px`, vertically centered.

- **Logo lockup** (left, `flex: 1`): `img/logo-black.png` at `height: 56px`, then a two-line text block — "NJ HOMES" (Archivo 600, 13.5px, letter-spacing 0.22em, uppercase) over "Dallas–Fort Worth, Texas" (Archivo 400, 11px, letter-spacing 0.14em, `#6B6357`). Links to top of home page.
- **Nav** (`data-wide-only`): flex, `gap: 32px`, 14.5px. Items: Portfolio, Building Now, About Us, Blog, Contact. First four are `#anchor` links on the home page; Blog is a page link.
- **Menu button** (`data-narrow-only`): transparent, `1px solid rgba(20,19,15,0.25)`, `padding: 10px 14px`, 11px uppercase, letter-spacing 0.14em. Label toggles "Menu" / "Close".
- **Mobile drawer**: rendered below the row when open. Column of full-width links, each `padding: 14px 0` with a `1px solid rgba(20,19,15,0.08)` bottom rule, 16px. Ends with a filled call button: `#14130F` bg, `#EFE9DF` text, `padding: 16px`, centered, 13px uppercase — "Call (832) 495-1190". Tapping any link closes the drawer.

**Scroll behavior (important):** the header hides on scroll down and reappears on scroll up. Implemented with a passive scroll listener comparing to the last `scrollY`:

- Scrolling down past `y > 140`: `transform: translateY(-101%)`.
- Scrolling up (any position): `transform: translateY(0)`.
- Transition: `transform 0.42s cubic-bezier(0.4, 0, 0.2, 1)`, plus `box-shadow 0.42s ease`.
- Shadow `0 10px 30px -22px rgba(20,19,15,0.55)` applies when `y > 40` and not currently hiding; otherwise `none`.
- Suppressed while the mobile drawer is open (header must not hide with the menu out).

### 2. Hero (home)

Full-bleed section, `background: #14130F`, `min-height: clamp(520px, max(88vh, 62vw), 900px)`, `overflow: hidden`, content bottom-aligned via flex column + `justify-content: flex-end`.

Two stacked absolutely-positioned images, both `inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: 50% 26%`:

- `img/hero-day.jpeg` — `opacity: 0.86`, base state.
- `img/hero-night.jpeg` — `opacity: 0`, revealed on hover.

**Day-to-night transition.** This is a signature interaction; reproduce it carefully. Both layers share `transform-origin: 50% 35%` and `will-change: opacity, transform, filter`.

```css
[data-day]   { transform: translate(-2.1%, 0.9%) scale(1.05);
               transition: filter 2s ease, transform 6s ease; }
[data-night] { opacity: 0; transform: translate(2.1%, -0.9%) scale(1.16);
               transition: opacity 1.8s cubic-bezier(0.33,0,0.2,1), transform 6s ease; }

[data-hero]:hover [data-day],   [data-hero]:active [data-day]   { filter: brightness(0.55) saturate(0.75);
                                                                  transform: translate(-2.1%, 0.9%) scale(1.08); }
[data-hero]:hover [data-night], [data-hero]:active [data-night] { opacity: 1;
                                                                  transform: translate(2.1%, -0.9%) scale(1.097); }

@media (prefers-reduced-motion: reduce) { [data-day], [data-night] { transition-duration: 0.4s; } }
```

The slow, mismatched durations (1.8s opacity against 6s transform) are what make it read as a filmic dissolve rather than a crossfade. `:active` is included so it fires on touch.

Overlay above the images, `pointer-events: none`:
```
linear-gradient(180deg, rgba(20,19,15,0.45) 0%, rgba(20,19,15,0.12) 30%,
                        rgba(20,19,15,0.55) 62%, rgba(20,19,15,0.82) 100%)
```

Content block: `padding: 120px 20px 48px`, max-width 1240px.
- H1: "New homes for Dallas–Fort Worth, built the way we'd build our own."
- Body: "Ground-up residential construction across the DFW metroplex. Nineteen homes in the ground or on the boards right now, each one finished by the same family that started it." — `rgba(247,243,236,0.82)`, `clamp(15px, 2.2vw, 18px)`, `max-width: 52ch`.
- Two buttons, flex + `gap: 12px`, both `padding: 16px 30px`, 12.5px uppercase, letter-spacing 0.14em, weight 500:
  - "See the homes" → `#F7F3EC` bg / `#14130F` text; hover `#A87E56` bg / `#F7F3EC` text.
  - "Start a conversation" → transparent, `1px solid rgba(247,243,236,0.55)`, `#F7F3EC` text; hover `background: rgba(247,243,236,0.12)`.

### 3. Stats band (home)

`background: #3B2A1E`, `color: #F7F3EC`. Grid `repeat(auto-fit, minmax(150px, 1fr))` with `border-left: 1px solid rgba(247,243,236,0.14)`; each cell `padding: 30px 24px` with a matching `border-right`.

Four cells: **9** New construction · **5** Under construction · **5** In permitting · **DFW Metroplex** Service area. Numerals are Newsreader 300 44px; the last cell uses Newsreader 300 26px with `padding-top: 8px` instead. Labels are 11px uppercase, letter-spacing 0.18em, `rgba(247,243,236,0.6)`, `margin-top: 8px` (10px on the last).

### 4. Portfolio (`#portfolio`, home)

Header row: eyebrow "Completed homes · 2026" (`#8A6033`), H2 "Finished, sold, and standing in Fort Worth." in a `max-width: 34ch` container.

**Three featured homes**, stacked with `gap: clamp(40px, 6vw, 72px)`. Each is a grid `repeat(auto-fit, minmax(min(100%,340px), 1fr))`, `gap: clamp(20px, 3vw, 44px)`, `align-items: start`.

*Left column — image stack:*
- Hero image, `aspect-ratio: 3/2`, `object-fit: cover`, on `#E4DACB`.
- Counter chip, absolutely positioned `right: 12px; bottom: 12px`, `rgba(20,19,15,0.68)` bg, `#F7F3EC` text, 11px, letter-spacing 0.14em, `padding: 6px 10px`. Shows `"n / 8"`.
- Thumbnail row below: `grid-template-columns: repeat(4, 1fr)`, `gap: 8px`, `margin-top: 8px`, each `aspect-ratio: 4/3`. **Note:** each home has 8 photos, so the thumbnails wrap to two rows of four. Active thumbnail is `opacity: 1`, inactive `0.45`; clicking one sets the hero.

**Hover carousel (signature interaction):** hovering the hero image auto-advances through that home's 8 photos on a **1100ms interval**, looping. Leaving stops it and the hero stays on the last shown frame. Bound to `mouseenter`/`mouseleave` **and** `touchstart`/`touchend` so press-and-hold works on phones. Only one home cycles at a time (starting a new one clears the existing timer).

*Right column — copy:*
- Eyebrow: status, e.g. "Completed · Sold" (`#8A6033`, 13px, letter-spacing 0.18em).
- H3: street address. Below it, city/zip in `#6B6357` 15px.
- Note paragraph, `#4A443B`, 15.5px, line-height 1.7, `max-width: 44ch`, `margin-top: 20px`.
- **Zillow preview card**, `margin-top: 26px`, `max-width: 400px`, `background: #F7F3EC`, `1px solid rgba(20,19,15,0.16)`, `padding: 14px 16px`, flex with `gap: 14px`; hover `border-color: #14130F`. Contains a 56×56 cover thumbnail of the home, a two-line text block ("VIEW LISTING ON ZILLOW" micro label over the address, truncated with ellipsis), and a `↗` glyph in `#A87E56`. Opens the Zillow URL in a new tab (`rel="noopener"`).

**Gallery sub-section**, separated by `margin-top: clamp(56px,7vw,96px)`, `padding-top: clamp(36px,5vw,56px)`, `border-top: 1px solid rgba(20,19,15,0.14)`. Header row: H3 "More homes we've delivered" (Newsreader 300, `clamp(24px,3.6vw,36px)`) and "Across Fort Worth" right-aligned. Below, a grid `repeat(auto-fit, minmax(min(100%,280px), 1fr))`, `gap: clamp(14px,2vw,24px)` of six figures: `aspect-ratio: 4/3` image, caption with street (16px weight 500) over city (13.5px `#6B6357`).

### 5. Building now (`#building`, home)

`background: #E4DACB`. Eyebrow "Rising now · The 2026 slate" (`#7A5427`), H2 "Five houses going up this year." (`max-width: 22ch`).

- **Waterview card**: `background: #F7F3EC`, full-width `img/waterview.png` at `aspect-ratio: 2/1`, then a padded (`clamp(24px,4vw,40px)`) two-column `auto-fit minmax(min(100%,280px),1fr)` block: left is eyebrow "Front elevation" + H3 "6000 Waterview Drive" + "Arlington, TX 76106"; right is the material description paragraph (`max-width: 46ch`).
- **Rayner group**: eyebrow "Rayner Avenue · Fort Worth, TX 76111", then `img/rayner-concept.png` at `aspect-ratio: 16/10` with `margin-bottom: 2px`, then four address tiles in a `auto-fit minmax(min(100%,190px),1fr)` grid with `gap: 2px` over `rgba(20,19,15,0.12)`. Each tile: `#F7F3EC`, `padding: 26px 22px`, Newsreader 300 30px numeral (429 / 433 / 437 / 441) over "Rayner Ave" (12px, letter-spacing 0.1em, `#6B6357`).

### 6. Pipeline / 2027 (home)

Continues the `#E4DACB` background; `padding: 0 20px clamp(64px,9vw,120px)` with a `border-top: 1px solid rgba(20,19,15,0.16)` and `padding-top: clamp(44px,6vw,72px)`.

Header row: eyebrow "On the boards · 2027", H2 "The next five, already in hand." (`max-width: 20ch`), and a right-aligned note "Land secured in Sherman, Dallas and Fort Worth. Plans and permitting are underway." (`#5C5347`, 15px, `max-width: 34ch`).

Tile grid `auto-fit minmax(min(100%,240px),1fr)`, `gap: 2px` over `rgba(20,19,15,0.14)`; each tile `#EFE9DF`, `padding: 28px 24px`, street (17px weight 500) over city (13.5px `#6B6357`).

### 7. About Us (`#about`, home)

Cream background. Two columns, `auto-fit minmax(min(100%,320px),1fr)`, `gap: clamp(32px,5vw,72px)`, `align-items: center`.

Left: eyebrow "Our Story", H2 "We started with old houses. We stayed for the neighborhoods." (`max-width: 20ch`), two body paragraphs (16.5px, line-height 1.75, `max-width: 48ch`), then a Newsreader 300 italic 20px pull quote: "Built with family values, finished by the family that built it."

Right: a 2-column image grid, `gap: 10px`. First image spans two rows at `aspect-ratio: 4/5`; the other two are `aspect-ratio: 4/3`.

### 8. Interest form (`#contact`, home)

`background: #14130F`, `color: #F7F3EC`. Two columns, `auto-fit minmax(min(100%,320px),1fr)`, `gap: clamp(36px,5vw,80px)`, `align-items: start`.

*Left column:* eyebrow "Interest form" (`#C29862`), H2 "Tell us what you're looking for." (`max-width: 18ch`), intro paragraph, then a contact list — three rows, each a flex `justify-content: space-between` link with `padding: 20px 0` and a `1px solid rgba(247,243,236,0.16)` bottom rule; micro uppercase label left, value right at 17px; hover `color: #A87E56`:

| Label | Value | Target |
|---|---|---|
| Call Abdul Memon | (832) 495-1190 | `tel:+18324951190` |
| Email | njhomeconcepts@gmail.com | `mailto:njhomeconcepts@gmail.com` |
| Instagram | @njhomeconcepts | `https://www.instagram.com/njhomeconcepts` (new tab) |

*Right column — the form.* Grid `auto-fit minmax(min(100%,220px),1fr)`, `gap: 18px`. Every field is an underline input: transparent background, no border except `border-bottom: 1px solid rgba(247,243,236,0.28)`, `padding: 10px 0`, `font-size: 16px` (keeps iOS from zooming), `color: #F7F3EC`, `outline: none`; on focus the underline becomes `#A87E56`. Labels sit above as micro uppercase text in `rgba(247,243,236,0.55)`, `margin-bottom: 8px`.

| Field | Name | Type | Required | Options / placeholder |
|---|---|---|---|---|
| Name | `name` | text | yes | — |
| Email | `email` | email | yes | — |
| Phone | `phone` | tel | no | — |
| I'm interested in | `interest` | select | no | Buying a finished home · Building on my lot · Land · Not sure yet |
| Target area | `area` | text | no | placeholder "Fort Worth, Arlington…" |
| Budget range | `budget` | select | no | Under $300k · $300k – $450k · $450k – $600k · $600k+ |
| Timeline | `timeline` | select | no | Ready now · 3 – 6 months · 6 – 12 months · Just exploring |
| Message | `message` | textarea, 3 rows | no | spans full width (`grid-column: 1/-1`), `resize: vertical` |

Submit button spans full width, `margin-top: 8px`, `#F7F3EC` bg, `#14130F` text, `padding: 18px`, 12.5px uppercase, letter-spacing 0.14em, weight 600; hover `#A87E56` bg with `#F7F3EC` text. Label: "Send my details".

**Submit behavior in the prototype is local only** — it swaps the form for a success panel and does not send anything. In production, wire it to a real endpoint (email to njhomeconcepts@gmail.com, or a form service). Keep the same success state: a bordered panel (`1px solid rgba(247,243,236,0.2)`, `padding: clamp(28px,4vw,44px)`) with H3 "Thank you — we have it.", the paragraph "Someone from the family will reach out within a day or two. If it's urgent, call Abdul directly at (832) 495-1190.", and a "Send another" ghost button that returns to the form. It animates in with:

```css
@keyframes njfade { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
/* animation: njfade 0.45s ease both */
```

Add real server-side validation and spam protection — the prototype has neither.

### 9. Footer (both pages)

`background: #0D0C0A`, `color: rgba(247,243,236,0.6)`, `padding: 44px 20px`. Flex row, wrapping, `gap: 28px`, `justify-content: space-between`.

Left: `img/logo-gold.png` at `height: 44px` beside a two-line lockup — "NJ HOMES" over "Serving the DFW metroplex". Right: email, phone, Instagram, and "© 2026 NJ Homes", 13.5px, `gap: 20px 32px`, links hover to `#A87E56`.

(The blog page footer is the same but uses `img/logo-cream.png` at 34px with the label "NJ Homes · Fort Worth, TX".)

### 10. Blog page

Same header and footer. Two states in one route.

*Index:* eyebrow "Blog", H1 "Read Our Blog" (`clamp(34px,6.4vw,72px)`), intro paragraph. Then a list of posts, each an `<article>` with `border-top: 1px solid rgba(20,19,15,0.16)` and `padding: clamp(26px,3.4vw,44px) 0`. Inside, a two-column `auto-fit minmax(min(100%,300px),1fr)` grid with `gap: clamp(22px,3vw,48px)`: a `4/3` cover image and a text block (tag + date micro row, Newsreader 400 `clamp(24px,3.4vw,38px)` title, excerpt at 16px `max-width: 56ch`, and a "Read the post" underlined uppercase link). **Images alternate sides** — odd-indexed posts set `order: 2` on the image so it lands right.

*Article:* replaces the index. `max-width: 760px` column. A "← All posts" text button, then tag + date, H1 `clamp(32px,5.4vw,58px)`, a `16/10` cover image, then body paragraphs at `clamp(17px,1.7vw,19px)` / line-height 1.8 with `clamp(22px,3vw,32px)` top margins. Closes with a rule and two actions: filled "All posts" and outlined "Get in touch" (links to `#contact` on the home page). Opening or closing a post scrolls to top.

Between the list and footer sits a CTA band: `#14130F`, two columns, H2 "Thinking about building with us?" and two buttons — "Start the conversation" (filled cream, hover `#C29862`) and "@njhomeconcepts" (outlined).

---

## Content data

Model these as CMS entries, not hard-coded markup.

### Completed homes (featured, 8 photos each)

| Street | City | Status | Zillow |
|---|---|---|---|
| 2705 S Jones St | Fort Worth, TX 76104 | Completed · Sold | `https://www.zillow.com/homedetails/2705-S-Jones-St-Fort-Worth-TX-76104/347918238_zpid/` |
| 2701 S Jones St | Fort Worth, TX 76104 | Completed · Sold | `https://www.zillow.com/homedetails/2701-S-Jones-St-Fort-Worth-TX-76104/97715929_zpid/` |
| 1442 E Allen Ave | Fort Worth, TX 76104 | Completed · Sold | `https://www.zillow.com/homedetails/1442-E-Allen-Ave-Fort-Worth-TX-76104/97714159_zpid/` |

Each carries a `note` paragraph (see the prototype for exact copy) and an ordered array of 8 image paths, **first being the exterior**.

### Gallery (one photo each)

1344 E Jefferson Ave · 2416 Jewell Drive · 309 Donald Street · 313 Donald Street · 3008 Walker Street · 3012 Walker Street — all Fort Worth, TX.

### Under construction, 2026

6000 Waterview Drive, Arlington, TX 76106 (has a rendering) · 429, 433, 437, 441 Rayner Ave, Fort Worth, TX 76111 (share one concept rendering).

### Pipeline, 2027

1904 Heritage Knoll Drive, Sherman, TX 75092 · 2006 Heritage Knoll Drive, Sherman, TX 75092 · 3749 Durango Drive, Dallas, TX 75220 · 7807 Robin Road, Dallas, TX 75209 · 1028 E Cannon, Fort Worth, TX 76104.

### Blog posts

Four entries, each `{ tag, date, title, excerpt, img, body: string[] }`. **The post copy in the prototype is placeholder written from the owner's notes — replace it with real copy before launch.**

---

## State

Minimal; no store needed.

| State | Scope | Purpose |
|---|---|---|
| `menuOpen` | header | mobile drawer |
| `active[homeKey]` | portfolio | index of the currently shown photo per home |
| `_timer` | portfolio | single interval handle for the hover carousel (1100ms) |
| `sent` | contact | form vs. success panel |
| `open` | blog | index of the open post, or null for the index view |
| scroll `last` | header | previous `scrollY` for direction detection |

No data fetching in the prototype. In production the homes, gallery, pipeline, and posts should come from a CMS or JSON so the owner can edit them.

---

## Assets

All in `img/` in this bundle. Photography is the client's own (WhatsApp-sourced JPEGs from job sites — resolution is adequate for web but they should be re-exported at consistent sizes and served as WebP/AVIF with `srcset` in production).

| File | Use |
|---|---|
| `logo-black.png` | header on cream |
| `logo-cream.png` | blog footer |
| `logo-gold.png` | home footer |
| `logo-dark.png` | spare |
| `hero-day.jpeg` / `hero-night.jpeg` | hero day/night pair (2705 S Jones) |
| `j2705-1…8.jpeg` | 2705 S Jones carousel, `-1` is the exterior |
| `j2701-1…8.jpeg` | 2701 S Jones carousel, `-1` is the exterior |
| `a1442-1…8.jpeg` | 1442 E Allen carousel, `-1` is the exterior |
| `jefferson1344`, `jewell2416`, `donald309`, `donald313`, `walker3008`, `walker3012` `.jpeg` | gallery |
| `waterview.png` | 6000 Waterview rendering |
| `rayner-concept.png` | Rayner Ave concept elevation |
| `jones2701-*`, `jones2705-*`, `allen1442-*` | earlier crops still referenced by the About collage and blog covers |

Every image needs a real `alt`; the prototype has them on the meaningful ones and empty `alt=""` on decorative duplicates (the hero night layer, the Zillow card thumbnail). Preserve that distinction.

---

## Performance & production notes

- The hero loads two full-size images. Preload the day image, lazy-load the night one, and consider skipping the night layer entirely on `prefers-reduced-motion` or slow connections.
- The portfolio holds 3 homes × 8 photos = 24 images plus 6 gallery shots. Lazy-load everything below the hero and preload only the first frame of each carousel.
- The hover carousel should not run when the section is offscreen; consider an `IntersectionObserver` guard.
- Add proper `<title>`, meta description, Open Graph tags, and `LocalBusiness` + `Residence` structured data — this is a local business site and organic search matters.
- Zillow links are plain outbound links; the "preview" is a styled card built from the site's own photo, not a Zillow embed. If a real embed is wanted later, Zillow does not offer a public one — the card is the workaround.

---

## Planned, not built

The owner wants an **admin view**: a login, and behind it the ability to add homes to the portfolio (photos, address, status, note, Zillow link) and add blog posts. Explicitly *no other UI changes* — the public site's design stays exactly as it is; admin is purely a content-entry surface. Nothing has been designed for this yet. Build it as a CMS or a simple authenticated form; the public pages should read the same data shape described above.

---

## Files in this bundle

| File | What it is |
|---|---|
| `NJ Homes.dc.html` | Home page — hero, stats, portfolio, building now, pipeline, about, contact form, footer |
| `NJ Homes Blog.dc.html` | Blog index + article view |
| `Mobile Preview.dc.html` | Harness that frames the two pages at 390×844 — a review tool, not part of the site |
| `img/` | All photography and logo files |

Open the `.dc.html` files in a browser to see them run. Read the markup for exact values; this README is the source of truth for intent.
