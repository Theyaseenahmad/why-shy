# whyshy — Marketing Agency Website

A playful, pink, sticker-collage marketing agency website built with Next.js 15.

## Tech Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** — scroll reveals, testimonial carousel
- **Lenis** — smooth scroll
- **Lucide React** — icon library (used for hero stickers and service icons)

## Design System

| Token | Value |
|---|---|
| Hot Pink | `#E0457B` |
| Bubblegum | `#F4A6C6` |
| Baby Pink | `#FCE4ED` |
| Blush | `#FDF1F5` |
| Rust | `#C8552D` |
| Magenta | `#A8285A` |
| Cream | `#FFFBF8` |
| Serif | Fraunces |
| Sans | Plus Jakarta Sans |
| Script | Caveat (logo + accents) |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
whyshy/
├── app/
│   ├── components/
│   │   ├── sections/          # Page sections
│   │   │   ├── HeroSection.tsx
│   │   │   ├── AboutSection.tsx
│   │   │   ├── StatsBand.tsx
│   │   │   ├── ServicesSection.tsx
│   │   │   ├── QuoteBand.tsx
│   │   │   ├── ProcessSection.tsx
│   │   │   ├── TestimonialsSection.tsx
│   │   │   ├── ContactSection.tsx
│   │   │   └── Footer.tsx
│   │   └── ui/
│   │       ├── HeroStickers.tsx       # Floating icon collage
│   │       ├── Nav.tsx
│   │       ├── PressButton.tsx        # Bouncy CTA button
│   │       ├── Reveal.tsx             # Scroll reveal wrapper
│   │       └── SmoothScrollProvider.tsx
│   ├── lib/
│   │   ├── data.ts            # All site content
│   │   └── utils.ts
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## Swapping in real stickers

The hero currently uses **Lucide icons** as placeholder stickers (bows, flowers, koi fish, dice, stars, hearts, cherries, tickets) styled pink. This was the fast/clean option chosen over hand-illustrated assets.

To swap in real sticker PNGs/illustrations matching your moodboard:

1. Drop PNG/SVG assets into `public/stickers/`
2. In `app/components/ui/HeroStickers.tsx`, replace the `<Icon>` render with `<Image src={...} />` from `next/image`
3. Keep the same `top`/`left`/`rotate`/`float` positioning data in `app/lib/data.ts` — just swap which image renders at each position

```tsx
// Before (icon)
<Icon size={sticker.size} color="#E0457B" strokeWidth={1.5} />

// After (real asset)
<Image src={`/stickers/${sticker.icon}.png`} width={sticker.size} height={sticker.size} alt="" />
```

Lucide has no literal "ribbon/bow" icon — `Flower2` is used as a stand-in. This is the first one worth replacing with a real bow illustration.

## Content

All copy lives in `app/lib/data.ts` — services, stats, process steps, testimonials, nav links, and hero sticker positions.

## Contact Form

`ContactSection.tsx` has a stub `handleSubmit`. Wire it to:
- **Formspree**: `fetch("https://formspree.io/f/YOUR_ID", { method: "POST", body: formData })`
- **Resend**: create `app/api/contact/route.ts`
- **EmailJS**: drop in their SDK

## Deployment

```bash
npx vercel --prod
```

No required env vars for the base site.

## Notes on the aesthetic

- Hero uses a hybrid approach: maximalist floating sticker collage (per the moodboard) contained to the hero only, then content sections settle into clean pink cards/bands for readability.
- The rust orange `QuoteBand` section echoes the "DISCIPLINE" callout from the original moodboard — a single bold contrasting color block as a pattern interrupt between content sections.
- `PressButton` (primary variant) uses a hard drop-shadow + translateY trick to feel like a physically "pressed" bouncy button.
