# pricing.md - landing page

Standalone landing page for **pricing.md by Valueships**, the machine-readable
pricing document service. Built to be embedded in the Valueships site (Webflow)
via an `<iframe>`, under the Services section.

## Live preview

Open `index.html` in a browser, or serve the folder:

```bash
# Python
python -m http.server 8080
# then open http://localhost:8080
```

## Structure

```
index.html              # the page (self-contained markup)
assets/css/styles.css   # brand-matched styles (pink #FF005E / white, Lato + Roboto)
assets/js/main.js       # scroll-reveal + iframe auto-height (postMessage)
webflow-embed.html      # snippet to paste into a Webflow Embed element
```

## Brand (Valueships spec)

| Token | Value | Usage |
|-------|-------|-------|
| pink500 | `#FF005E` | **Primary** - CTAs, accents |
| pink600 | `#F0004B` | Hover states |
| pink100 | `#FFCCDF` | Tint backgrounds |
| bodyblack | `#101010` | Headings |
| grey300 | `#303030` | Body text |
| grey100 | `#D9D9D9` | Borders, dividers |
| Headings font | **Montserrat** (700/800) | |
| Body font | **Lato** (400/700) | |
| Logo | [Webflow CDN AVIF](https://cdn.prod.website-files.com/640ccca75c912a43cd9c72cd/66bb590e6d91fac9b9223d2d_Valueships_logo.avif) | |

## Deploying & embedding

1. **Deploy** this folder to any static host (Vercel, Lovable, GitHub Pages).
   It's plain HTML/CSS/JS - no build step.
2. **Verify iframe-embeddable:** the deployed URL must NOT send
   `X-Frame-Options` or `Content-Security-Policy: frame-ancestors`.
3. **Embed in Webflow:** add an **Embed** element, paste
   [`webflow-embed.html`](webflow-embed.html), and replace
   `REPLACE_WITH_HOSTED_URL` with your deployed URL. The page posts
   `{ height }` to the parent so the iframe auto-sizes (no inner scrollbar,
   no clipping). All CTAs use `target="_top"` to navigate the parent window.
4. **Artifacts CMS** (collection `6a2293cfe07a7cfd13490900`): add the page via
   the Webflow API with `name`, `slug`, `src` (deployed URL), and `allow`
   (iframe permissions, e.g. `clipboard-write`, or empty).

> The page intentionally avoids `min-height: 100vh` / `100vh` sections, which
> create a feedback loop with iframe height auto-sizing.

> **Note:** CTA buttons currently link to `https://www.valueships.com/contact`.
> Update these in `index.html` (search `data-cta`) to point at the real
> booking/Calendly URL.

## Source content

Copy and figures are drawn from the offer materials in this folder
(`pricing-md-proposal.md`, `pricing-md-offer-deck.pdf`,
`how-to-sell-pricing-md.md`).
