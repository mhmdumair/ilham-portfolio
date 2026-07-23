# Umair Designs — Portfolio Website Build Plan

Reference: `docs/reference.png`

## 1. Overview

A single-page portfolio site for a freelance graphic designer ("Umair Designs"). Purpose: showcase logo design and social media post work, build credibility (stats, testimonials), and convert visitors into leads via a contact form.

Sections (top to bottom):
1. Navbar
2. Hero
3. About Me
4. Services ("How I Can Help You")
5. Logo Design Work (gallery, dark section)
6. Social Media Post Designs (gallery/carousel)
7. Tools I Use / Stats (dark section)
8. Testimonials
9. Contact + Footer (gradient section)

## 2. Tech Stack

- **Framework:** React + Vite (fast dev, component-based — fits repeating card patterns)
- **Styling:** Tailwind CSS (utility classes match the gradient/spacing-heavy design well, fast to iterate)
- **Icons:** lucide-react (clean line icons for arrows, mail, phone, location, social links)
- **Fonts:** Google Fonts — headings in a geometric sans (e.g. "Poppins" or "Sora"), body in "Inter"
- **Animation:** Tailwind + a light touch of `framer-motion` for on-scroll fade/slide-ins (optional, only if time allows)
- **Form handling:** Static form first (no backend); wire to a service later (Formspree / EmailJS) if needed
- **No routing needed** — single page with anchor-link nav (`#about`, `#services`, `#logo-design`, `#skills`, `#testimonials`, `#contact`)

> Open question for user: confirm React+Vite+Tailwind is acceptable, vs. plain HTML/CSS/JS. Plan below assumes React+Tailwind but structure maps 1:1 either way.

## 3. Design Tokens

**Colors** (sampled from reference):
- Brand gradient: `from-violet-600 via-fuchsia-500 to-orange-400` (`#7C3AED → #EC4899 → #FB923C`) — used on logo mark, primary buttons, "Creative Design" text, CTA badge, footer background
- Dark navy (section backgrounds): `#0B0F24` / `#0D1029`
- Light background: `#F8F7FC` (very light lavender-white)
- Body text: `#4B5563` (gray-600)
- Heading text: `#111827` (near-black)
- Accent card icon backgrounds: violet `#7C3AED`, pink `#EC4899`, orange `#F97316`, teal `#14B8A6` (one per service/what-I-do item, cycling)

**Typography:**
- Headings: Semibold/Bold, tight tracking, sizes ~40–44px (H1), ~28–32px (H2 section titles)
- Eyebrow/label text: small uppercase, gradient or accent-colored, letter-spaced (e.g. "FREELANCE GRAPHIC DESIGNER", "ABOUT ME", "SERVICES")
- Body: 15–16px, relaxed line-height, gray

**Shape language:** large rounded corners (`rounded-2xl`/`rounded-3xl`) on cards and images, pill-shaped buttons and filter tabs, decorative scattered shapes (dots, plus signs, small squiggles) in accent colors.

## 4. Project Structure

```
/
├── docs/
│   ├── reference.png
│   └── plan.md
├── public/
│   └── images/          # logo cards, poster mockups, avatar photos, tool icons
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── AboutMe.jsx
│   │   ├── Services.jsx
│   │   ├── LogoDesignWork.jsx
│   │   ├── SocialMediaPosts.jsx
│   │   ├── ToolsAndStats.jsx
│   │   ├── Testimonials.jsx
│   │   ├── ContactFooter.jsx
│   │   └── ui/
│   │       ├── Button.jsx
│   │       ├── SectionLabel.jsx     # small uppercase gradient eyebrow
│   │       ├── FilterTabs.jsx       # pill tab group (used in 2 galleries)
│   │       └── Card.jsx
│   ├── data/
│   │   ├── services.js
│   │   ├── logos.js
│   │   ├── posts.js
│   │   ├── testimonials.js
│   │   └── tools.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── tailwind.config.js
└── package.json
```

Data-driven components (Services, LogoDesignWork, SocialMediaPosts, Testimonials, ToolsAndStats) pull from `src/data/*.js` arrays so content can be edited without touching JSX.

## 5. Section-by-Section Breakdown

### Navbar
- Logo mark: gradient "U" square icon + "Umair Designs" wordmark (two-line, bold)
- Center nav links: Home, About, Services, Logo Design, Posts, Skills, Testimonials, Contact — active link underlined/colored
- Right: gradient pill button "Let's Work Together" with arrow icon
- Sticky on scroll, mobile: hamburger menu

### Hero
- Left column:
  - Eyebrow label: "FREELANCE GRAPHIC DESIGNER"
  - H1: "Bringing Ideas to Life with **Creative Design**" (last part gradient text)
  - Paragraph description
  - Button row: primary gradient "View My Work ↓", secondary outline "Hire Me ↗"
  - Availability indicator: green pulsing dot + "Available for freelance projects"
- Right column: layered collage of 4 work-sample cards (logo mockup, poster mockups) with slight rotation/offset, plus floating decorative icons (pen tool, color palette dots, small shapes). Implement as absolutely-positioned images inside a relative container.

### About Me
- Left: circular/rounded photo with a gradient brush-stroke shape behind it (SVG or blob background), handwritten-style "Let's Create!" caption
- Middle: "ABOUT ME" label, heading "I'm Umair, a *passionate* graphic designer." (italic accent word), paragraph, 3-item icon row (Creative & Original / High Quality Designs / On-time Delivery)
- Right: "What I Do" card (light box, shadow) listing 4 items with colored icon squares — Logo Design, Social Media Posts, Graphic Design, Independent Designs

### Services — "How I Can Help You"
- Centered "SERVICES" label + heading
- 4-column card grid (stacks to 1 col mobile): each card = icon square (unique accent color), title, short description, "Learn More →" link
- Cards: Logo Design, Social Media Posts, Graphic Design, Independent Graphics

### Logo Design Work (dark section)
- Dark navy full-bleed background
- "LOGO DESIGN" label + "Logo Design Work" heading (white text)
- Filter pill tabs: All / Minimal / Modern / Typography / Abstract (active = filled gradient/purple pill)
- Grid of logo cards (white/light rounded squares, logo centered) — 6 shown: Infinity, Leafora, Wardiere Inc, Pixora Studio, Axion Technologies, Coffee House
- Filtering: client-side filter by `category` field in `logos.js`
- CTA button: "View All Logo Projects"

### Social Media Post Designs
- Light background, "SOCIAL MEDIA POSTS" label + heading
- Filter tabs: All / Instagram / Facebook / Promotional / Event
- Horizontally-scrollable row (carousel) of poster thumbnails with prev/next arrow buttons; 6 sample posters shown
- CTA button: "View All Post Designs"
- Implement carousel with simple horizontal scroll + scrollIntoView on arrow click (no heavy library needed)

### Tools I Use / Stats (dark section)
- "MY SKILLS" label + "Tools I Use" heading
- Row of tool badges (Ai, Ps, Id, Xd, + one more) as colored rounded-square icons
- 4-column stat block: 50+ Projects Completed, 30+ Happy Clients, 2+ Years Experience, 100% Client Satisfaction — each with an icon (rocket, heart, star, thumbs-up)
- Consider count-up animation on scroll-into-view for the stat numbers (nice-to-have)

### Testimonials
- "TESTIMONIALS" label + "What Clients Say" heading
- 3-column card grid: quote icon, testimonial text, avatar photo + name (colored) + role, 5-star rating row
- Sample: Sarah Khan (Business Owner), Ali Raza (Marketing Manager), Zainab Noor (Entrepreneur)

### Contact + Footer (gradient section)
- Full-bleed pink→purple gradient background, white text
- Left: "LET'S WORK TOGETHER" heading + supporting line
- Form: Name + Email (2-col), Message (textarea), "Send Message" pill button
- Right: contact info list (Email, Phone, Location) each with icon; social icon row (Facebook, Instagram, Behance, Dribbble)
- Bottom: copyright bar "© 2025 Umair Designs. All Rights Reserved." + scroll-to-top button (bottom-right floating circle)

## 6. Assets Needed

- Logo mark (gradient "U")
- Designer photo (hero-about image) — needs transparent/cutout background for the brush-stroke effect
- 4 hero collage mockups (Axion logo card, burger poster, adventure poster, Pixora logo card) — can be placeholder stock images/mockups initially
- 6 logo samples for Logo Design Work grid
- 6 poster samples for Social Media Posts
- 3 client avatar photos (or use placeholder avatars)
- Tool icons: Illustrator, Photoshop, InDesign, XD, + one more (use official brand icon set or simple-icons)
- Decorative SVG shapes (dots, plus signs, squiggle arrows) scattered around hero/section headings

All placeholder images can start as free stock/mockup images or solid-color placeholders and be swapped later with real work samples.

## 7. Responsive Strategy

- Mobile-first Tailwind breakpoints (`sm`, `md`, `lg`, `xl`)
- Navbar → hamburger drawer below `md`
- Hero: collage stacks below/behind text on mobile, reduce to single column
- Grids (Services, Logo, Testimonials): 4→2→1 columns down the breakpoints; Logo grid 3→2 col on tablet
- Carousel (Social Media Posts): native horizontal scroll with snap on mobile (touch-friendly), arrows hidden on small screens
- Contact section: form and info stack vertically on mobile

## 8. Build Phases

1. **Setup** — scaffold Vite + React + Tailwind, configure fonts/colors in `tailwind.config.js`, add base layout (`App.jsx`) with section anchors
2. **Static structure** — build all 9 sections with real content/data but placeholder images, no interactivity yet, get spacing/typography matching reference
3. **Interactivity** — filter tabs (logo/posts galleries), carousel arrows, mobile nav toggle, form validation (client-side only)
4. **Polish** — decorative shapes, gradient details, hover states, scroll animations, count-up stats
5. **Responsive pass** — test/fix all breakpoints
6. **Assets swap** — replace placeholders with final photography/mockups
7. **Contact form wiring** — connect to Formspree/EmailJS or leave as `mailto:` fallback (needs user decision)

## 9. Design Fidelity — Exact Colors, Shapes & Decorative Details

Pulled directly from `reference.png`, section by section, so the build matches pixel-for-pixel rather than approximately.

**Core palette (exact roles):**
- Gradient A (brand, warm): `#7C3AED → #EC4899 → #FB923C` (violet → pink → orange) — logo mark, "Creative Design" text, primary buttons, active filter pills
- Gradient B (hot, used in Posts/CTA section): `#EC4899 → #F97316 → #FBBF24` (pink → orange → amber) — Social Media Posts CTA, Send Message button
- Footer gradient (full-bleed): diagonal `#8B2FE0 → #EC4899 → #FB7A5B` (purple → magenta → coral)
- Dark section bg: `#0B0F24` (near-black navy) — Logo Design Work, Tools/Stats
- Page bg: `#FAF9FD` (near-white lavender tint)
- Ink/headings: `#111827`
- Body copy: `#6B7280`
- Icon accent set (cycles across Services / What-I-Do / Stats): violet `#7C3AED`, pink `#EC4899`, orange `#F97316`, teal `#14B8A6`

**Decorative shape inventory (small, scattered accents — these are what make it read as "designer-made" rather than generic):**
- Hero: small pink 4-point sparkle/flower top-left of eyebrow label; teal squiggle + small dot near heading; hollow hexagon outline near "Hire Me" button; scattered palette dots (red, yellow, teal, violet) beside the collage; small dark vertical toolbar chip with white tool icons (pen, pencil, brush, text, crop, wand) overlapping the collage; a loose pen/pencil illustration laid diagonally bottom-right of collage; each collage card (Axion, Burger, Adventure, Pixora) sits at a slight independent rotation with its own drop shadow, deliberately overlapping — not a grid.
- About: irregular brush-stroke/paint-splash blob (gradient violet→pink→orange, soft edges) sits behind the circular photo, photo appears masked into a rounded/organic shape on top of it; "Let's Create!" in a script/handwritten font, purple, with a small underline squiggle beside it; a few small dotted-trail marks near the photo edge.
- Services section heading: small orange squiggle/underline flourish next to "How I Can Help You".
- Logo Design Work (dark): small white plus-sign top-left of the heading area; small pink heart-ish squiggle top-right; small orange dot bottom-left of the grid — all tiny, low-opacity, purely decorative.
- Tools/Stats (dark): small dotted plus-grid mark top-left corner.
- Testimonials: large pink quotation-mark glyph inset top of each card (decorative, behind/above the quote text).
- Contact/Footer: no extra shapes — the gradient itself carries the visual weight; a floating solid-black circular "scroll to top" button, bottom-right, overlapping the section edge.

**Structural/shape language to replicate exactly:**
- Buttons are true pills (`rounded-full`), never just rounded-rect
- Cards use large radii (`rounded-2xl`/`rounded-3xl`, ~16–24px), soft multi-layer shadows, no hard borders except filter-tab outlines
- Filter tabs are pill-shaped, outline by default, solid gradient/fill only when active
- Icon containers are rounded-squares (`rounded-xl`, ~40–48px), never circles, filled solid with one accent color, icon in white
- Alternating full-bleed section backgrounds (light → dark → light → dark → light → gradient) is a deliberate rhythm — keep the sequence exactly as in the reference, it's what gives the page pacing

## 10. Micro-Animation Spec (creativity + polish layer)

A static clone of the layout reads as "template." These small motion details are what make it feel like an actual designer's site — implement with `framer-motion` + CSS transitions, all subtle (150–400ms, ease-out), nothing that delays content:

- **Hero collage:** each card gently floats (slow independent up/down loop, ~4–6s, a few px), staggered start delay per card so they don't move in sync; on hover, the hovered card lifts (scale 1.03, shadow deepens) and straightens rotation slightly
- **Availability dot:** soft pulse/glow loop (green dot, "Available for freelance projects")
- **Primary buttons:** hover = slight scale (1.02–1.05) + shadow lift; gradient buttons shift gradient angle subtly on hover
- **Nav links:** underline draws in from center on hover; active link stays underlined
- **"Let's Create!" script text:** small underline squiggle draws itself once on scroll-into-view (SVG stroke-dashoffset animation)
- **Section entrances:** content fades up (~16px translate + opacity) as each section scrolls into view, staggered per card/item within a grid (Services cards, Logo grid, Testimonial cards) so items cascade in rather than pop together
- **Logo Design Work grid:** logo cards render in grayscale/dim by default, transition to full color + slight lift on hover — nice touch that fits a logo-showcase specifically
- **Filter tabs (Logo + Posts galleries):** active-state background is a single element that slides between tabs on click (shared-layout animation) rather than each tab independently toggling color; grid re-filters with a quick fade/scale-out → scale-in transition
- **Social Media Posts carousel:** smooth scroll with snap points; arrow buttons scale down on click (tap feedback); cards scale slightly on hover
- **Stats numbers (50+, 30+, 2+, 100%):** count up from 0 once, triggered when the section enters viewport
- **Tool icon badges:** slight tilt/bounce on hover
- **Scroll-to-top button:** fades/scales in only after the user scrolls past the hero, hover = scale up

## 11. Open Questions for User

- Confirm tech stack (React+Vite+Tailwind vs plain HTML/CSS/JS vs other framework preference)
- Real content: actual bio text, real project names/logos, real testimonials, real contact details (email/phone/location shown in reference are placeholders — confirm if `umairdesigns@email.com` / Sri Lanka number are real or placeholder)
- Where should the contact form submit to (no backend currently)?
- Any existing brand assets (logo file, photo) to use instead of placeholders?
- OK to add `framer-motion` as a dependency for the micro-animations in §10, or keep it to pure CSS/Tailwind transitions only?
