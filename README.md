# Natalies Cleaning LLC — Plainfield, IL

Single-page marketing website for **Natalies Cleaning LLC**, a locally owned house
cleaning service serving Plainfield, Illinois and the surrounding communities.

## Stack

Vanilla HTML, CSS and JavaScript — no build step, no dependencies, no external APIs.
Open `index.html` in a browser, or serve the folder statically:

```bash
python3 -m http.server 8000
```

## Files

| File | Purpose |
| --- | --- |
| `index.html` | Entry point — all page sections, semantic markup, meta tags, JSON-LD |
| `styles.css` | Design system (custom properties), layout, components, responsive rules |
| `script.js` | Mobile nav, sticky header, scroll reveal, scroll-spy, form validation |
| `favicon.svg` | Favicon placeholder (inline SVG shield mark) |

## Sections

1. **Hero** — business name, tagline, primary call to action, trust points
2. **Call-back banner** — prominent "Request a Call Back" CTA
3. **Services** — recurring cleaning, deep cleaning, kitchen detail, bathroom
   sanitizing, move-in/move-out, small office cleaning
4. **How It Works** — three-step process
5. **Why Us** — local crew, checklist-driven, flat-rate, make-it-right promise
6. **Reviews** — client testimonials
7. **Contact** — service area, hours, contact routes and a validated quote form

## Notes

- The quote form validates entirely client-side and confirms in-page. No backend,
  form endpoint, or third-party service is wired up — connect one when a delivery
  address is chosen.
- All photography is sourced from Pexels and is contextually matched to the
  section it appears in, with business-specific alt text.
- Responsive from 320px up, with a sticky mobile CTA, reduced-motion support,
  keyboard focus styles and a skip link.
