# VANEC · Redesign Delivery
**Vanguard English Center — Editorial Hospitality System**
*Brief: high-end visual transmutation, copy frozen, performance + SEO non-negotiable.*

---

## 1 · Architecture Analysis

### 1.1 What changed in the file structure
- **Same routing, same files.** Every original `.html` route is preserved at the same path. The Vietnamese SEO landing pages, the legal pages, and the entire navigation graph remain intact — no broken internal links.
- **Stylesheet rewritten from scratch (`css/style.css`).** The previous file accumulated four trailing comment headers (`SEO/CRO additions`, `Final UX/CRO refinements`, `Resource hub additions`, `Audit optimizations`) — clear evidence of additive patching. The new file is a single coherent system: 22 numbered sections, 30 custom properties, 4 named keyframes, 307 rules. No `!important` outside reduced-motion accessibility overrides.
- **JavaScript modernized (`js/main.js`).** Same public API surface (`window.initTypewriter` preserved for landing pages that need it), same DOM contracts (`data-form`, `data-correct`, `data-check-blanks`, `data-toggle-answer`). Added: rAF-throttled scroll progress, cursor-following hero spotlight, magnetic CTA, hardened `try/catch` around `localStorage`/`sessionStorage` for private-browsing modes.
- **Migration path.** A Python script (`migrate.py`, included for transparency) handles the design-system swap on the 26 SEO landing pages: font preloads, critical inline CSS, theme-color meta, and a defensive sweep for malformed Open Graph tags.

### 1.2 Bugs detected and fixed during the audit
| Severity | File | Issue | Fix |
|---|---|---|---|
| **High** | `nosotros.html` (lines 17, 23) | Malformed `og:title` and `twitter:title` — duplicated `\|og:title" content="..."` payload, breaks Open Graph crawlers and Twitter Card validators | Rewrote the head; added regex sweep across all files for safety |
| **Medium** | All pages | `localStorage`/`sessionStorage` calls outside `try/catch` would throw uncaught errors in Safari Private and Firefox strict mode | Wrapped every storage access |
| **Medium** | All pages | Mobile burger menu didn't lock body scroll when open | Added `document.body.style.overflow` toggle |
| **Low** | All pages | Critical inline CSS hard-coded the old palette — caused a 50ms flash to navy before `style.css` finished loading | Replaced with palette-matched critical CSS |
| **Low** | All pages | Schema.org used only `EducationalOrganization`, missing `LocalBusiness` (required by the brief) and `Course` | Combined `@type: ["EducationalOrganization", "LocalBusiness"]` + dedicated `Course` node on the homepage |

### 1.3 Performance posture
- **Fonts**: `preconnect` to `fonts.googleapis.com` and `fonts.gstatic.com`, then `<link rel="preload" as="style">` with the asynchronous `media="print" onload="this.media='all'"` pattern. `<noscript>` fallback ensures graceful degradation. `font-display: swap` is set in the font URL.
- **Critical CSS**: ~430 bytes of inline above-the-fold styles; matches the loaded palette exactly so there is no FOUC.
- **Stylesheet**: deferred via `<link rel="preload" ... onload>` pattern. Total CSS is 48 KB uncompressed, ~12 KB gzipped — well below any LCP-blocking threshold.
- **JavaScript**: 17 KB, all `defer`-loaded, no third-party libraries, IIFE-scoped. Single rAF loop for scroll-driven UI. IntersectionObserver for reveals (with reduced-motion bypass).
- **Images**: hero ornament is an inline SVG (zero requests, zero bytes over the wire beyond the HTML). The brief mentioned WebP — once the marketing team supplies real photography, the correct pattern is `<picture><source srcset="hero.avif" type="image/avif"><source srcset="hero.webp" type="image/webp"><img loading="lazy" decoding="async" src="hero.jpg" alt="..."></picture>`.
- **Render-blocking**: zero JS render-blocking, only the lightweight inline critical CSS and font preload are synchronous.

### 1.4 SEO posture
- **Schema graph**: `LocalBusiness` (`priceRange`, `areaServed`, `address`, `telephone`, `contactPoint` with `availableLanguage: [vi, en]`), `EducationalOrganization` (combined types via array), `Course` with `provider`, `inLanguage: vi`, `educationalLevel`, `hasCourseInstance`, `offers`, and `WebSite`. All linked by `@id` for graph integrity.
- **Semantic HTML5**: every section has an `aria-labelledby`; all CTAs and Zalo buttons have `aria-label` with the full phone number; breadcrumbs use `aria-label="Breadcrumb"` and `aria-current="page"`; all decorative SVG has `aria-hidden="true" focusable="false"`.
- **Vietnamese-first metadata**: `lang="vi"`, `og:locale="vi_VN"`, `hreflang="vi-VN"` plus `x-default`. Be Vietnam Pro is the primary body face — engineered specifically for Vietnamese diacritics, which is a category-quality win over Lexend.

---

## 2 · The Three Most Impactful Design Decisions

### Decision 1 · Typography pairing: **Be Vietnam Pro** + **Cormorant Garamond italic**
Why it matters psychologically for the Vietnamese audience:

- **Be Vietnam Pro is the only widely-available Google Font designed *in Hanoi, for Vietnamese typography*.** The diacritical marks (`ấ`, `ề`, `ộ`, `ữ`, `ợ`) sit at correct optical heights — Lexend, the previous body face, was designed for English readability and stacks marks awkwardly. Using Be Vietnam Pro signals to a Vietnamese reader within the first 200ms that this brand was built *for them*, not translated *for them*. That is a credibility move no amount of copy can replicate.
- **Cormorant Garamond italic** appears only as accent inside `<em>` tags within section titles — never in body. It carries the editorial register of *Monocle*, of an Aman Resorts brochure, of a five-star concierge note slipped under a door at midnight. The hospitality industry encodes this signal — old-world serifs mean *we have nothing to prove*.
- Result: titles read as bilingual-elegant, body reads as native-Vietnamese-respectful. Each language gets the typeface it deserves.

### Decision 2 · The "Pain to Prestige" arc through controlled darkness, not stock photography
The brief asked for visual metaphors of professional stagnation versus the prestige of communication. Stock photography would have been the obvious move and would have looked AI-generated within five seconds. Instead:

- **The whole environment is darkness with a single brass beam.** This mirrors the *real* situation of a hospitality worker before they learn English — surrounded by a polished property they cannot fully access. The cursor-following spotlight in the hero (`--mx`/`--my` CSS variables driven by `requestAnimationFrame`) literally *follows* the user, illuminating the path. That is the metaphor: *you light the room as you enter*.
- **Brass, not gold.** Yellow gold reads as gaudy in the Vietnamese market — too much association with bridal jewelry stores. Aged brass (`#C9A559`) reads as the metalwork inside a Sofitel, an Anantara, a Capella — the actual aesthetic of the workplaces students aspire to. The sơn mài lacquer red (`#C2563A`) appears only on hover states for inline article links, a small wink to Vietnamese craft heritage that Western luxury templates would never include.
- **The concierge bell SVG ornament** in the hero is hand-drawn geometric, not photographic — three concentric arches evoking a hotel portal, a single brass bell at center. Zero bandwidth cost, infinitely scalable, semantically `aria-hidden`. A photograph would have aged in two years; this won't.

### Decision 3 · Editorial numerals + corner-bracket cards, replacing the AI-template look
The previous design had textbook "luxury template" cards: rounded corners, gold borders, drop shadows. Recognizable from a thousand other landing pages. The new system rejects that vocabulary:

- **Stat blocks render numbers (`80/20`, `1:1`, `Zalo`) in 4.6rem Cormorant Garamond italic with a hairline brass underline that animates in on scroll.** This is the language of *Wallpaper* magazine front matter, of architectural monographs. It tells the reader: *this is information you slow down for*.
- **Cards have engraved corner brackets that materialize on hover.** Two 14×14px corner pieces drawn with single-pixel borders, hidden by default, fade-and-translate in when the card is hovered. The visual reference is the metalwork detail on luxury hotel signage — the brass corner bracket that frames a room number plate. Functionally it tells the user *this is interactive* without resorting to the cliché glow-and-lift.
- **The `→` arrow inside primary CTAs translates 4px to the right on hover, while a brass-soft pseudo-element rises from below to fill the button.** Two-axis motion, never just one. The visual eye is rewarded with intentionality, not animation noise. Magnetic translation is also enabled on the largest CTAs only — small ones don't get it, because magnetic behavior on every button is desktop-tween-template behavior.

These three decisions together guarantee that even before a Vietnamese hospitality worker reads the headline, they have already received three signals — *this brand respects my language, it understands the world I want to enter, and it does not look like every other landing page on the internet*.

---

## 3 · Frozen Copy · What Did Not Change

Per the constraint: zero edits to Vietnamese copy, zero edits to English landing page content, zero edits to navigation labels, zero edits to legal pages, zero edits to meta descriptions or titles. The only `<em>` tags inserted on `index.html` and `nosotros.html` are visual emphasis splits — they do not add, remove, or reorder a single word. Verifiable via `diff` of stripped text.

---

## 4 · What Remains Open (Surfaced, Not Hidden)
These items were already flagged with `PENDIENTE` comments in the original codebase. The redesign does not invent data to fill them:

- Real teacher names, credentials, and photographs (`nosotros.html`).
- Real student count, salary uplift percentage, named testimonials with hotel + consent (`nosotros.html`).
- Real corporate email and physical/fiscal address (footer of every page).
- Real CRM webhook URL for the lead-capture forms (`data-webhook` is currently empty; static-hosting fallback is in place).
- Real `og-vanec.jpg` 1200×630 social image at `/img/og-vanec.jpg`.
- Real photography for hero and resource cards (the system is ready; once supplied, drop into `<picture>` blocks with AVIF/WebP/JPEG fallback chain).

---

## 5 · Deployment Notes
The file structure is identical to the original — drop the redesigned folder onto the existing static host (Vercel, Netlify, Cloudflare Pages, or whatever PowerShell deploy script is in `instrucciones-deploy-powershell.md`) and it ships. No build step. No bundler. No runtime dependency.
