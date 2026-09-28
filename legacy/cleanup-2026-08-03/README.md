# Taxiverz — site structure

## Folder layout

```
public_html/                 <-- upload this folder's contents to the web root
├── index.html               <-- all 155 pages stay at the root, so every
├── about.html                   live URL is unchanged (taxiverz.com/xyz.html)
├── contact.html
├── gorakhpur-to-delhi.html
├── ... (155 pages)
├── 404.html
├── robots.txt
├── sitemap.xml
├── .htaccess
└── assets/
    ├── css/taxiverz.css     <-- the ONLY stylesheet on the site
    ├── js/main.js           <-- the ONLY script on the site
    └── img/                 <-- every image (lowercase, hyphenated names)

_dev/                        <-- NOT part of the live site (blocked in .htaccess)
├── legacy-css/              20 old stylesheets, replaced by taxiverz.css
├── legacy-js/               3 old scripts, replaced by main.js
├── original-images/         pre-compression originals
└── ... old build scripts, index-backup.html, etc.
```

## Editing rules

**Colours** — never hard-code a colour. Everything comes from the tokens at the
top of `assets/css/taxiverz.css`:

```css
--brand:   #ff5800   /* buttons, links, accents, icons */
--ink:     #111827   /* nav, footer, dark sections, headings */
--surface: #f8fafc   /* alternating section backgrounds */
--ink-800 / --ink-600 / --ink-500   /* body / secondary / muted text */
--success: #16a34a   /* WhatsApp + confirmations only */
--warning: #f59e0b   /* star ratings only */
--danger:  #dc2626   /* form errors only */
```

To rebrand the whole site, change `--brand` in one place.

**Never add** a `<style>` block or a `style="..."` attribute to a page. That is
what produced the 50+ competing colours the rebuild removed. Add a class to
`taxiverz.css` instead.

**Never add** a second stylesheet or a CDN framework (Tailwind, Bootstrap).
Section 18 of `taxiverz.css` reimplements the Tailwind utilities the old pages
used, mapped onto the brand tokens.

**Nav and footer** are identical on every page. Changing them means a
find-and-replace across all 155 files — the block starts at
`<a class="skip-link"` and ends at `</nav>`, and the footer runs from
`<footer class="footer">` to the end of `.floating-buttons`.

## Responsive breakpoints

| Width      | Behaviour                                        |
|------------|--------------------------------------------------|
| < 640px    | single column, drawer nav                        |
| >= 640px   | two-column forms                                 |
| >= 768px   | route pages go two-column, taller card images    |
| >= 992px   | **nav switches from drawer to horizontal bar**   |
| >= 1200px  | fleet grids tighten to more cards per row        |

All grids use `repeat(auto-fit, minmax(min(280px, 100%), 1fr))`, so they reflow
at any width without extra media queries. Type scales with `clamp()`.

## Images

Max width 1600px, JPEG q82 / PNG q82. Originals are in
`_dev/original-images/`. Before uploading a new photo, resize it to
<= 1600px wide — the site was 58 MB of images before this pass and is now 19 MB.

Missing vehicle photos currently showing `assets/img/placeholder.svg`:
ambassador (black/white), audi-a5-convertible, bentley-continental,
bentley-mulsanne, gmc-yukon-denali, jaguar-f-type-convertible,
rolls-royce-phantom, royal-enfield-sidecar, vintage-jeep,
sleeper bus, non-AC bus.
Drop a real photo into `assets/img/` with that name to replace it.

## JavaScript

`assets/js/main.js` is feature-detected throughout — one file, safe on every
page. It handles: navigation drawer + dropdown accordions, carousel, smooth
scroll, trip-type toggle, booking forms (hand off to WhatsApp), contact form
(web3forms with inline status), FAQ accordions, scroll reveal, booking modal,
chatbot, visitor counter, image galleries, lazy loading and broken-image
fallbacks.
