// ─── Stats ────────────────────────────────────────────────────────────────────

export const stats = [
  { num: "180+", label: "Brands grown" },
  { num: "32M", label: "Reach generated" },
  { num: "4.9★", label: "Client rating" },
  { num: "5yr", label: "In business" },
] as const;

// ─── Services ─────────────────────────────────────────────────────────────────
// icon refers to a lucide-react icon name, resolved in ServicesSection

export const services = [
  {
    id: "social-strategy",
    icon: "Smartphone",
    title: "Social Strategy",
    description:
      "Content calendars, captions, and trends that fit your brand voice — not generic templates.",
  },
  {
    id: "content-production",
    icon: "Clapperboard",
    title: "Content Production",
    description:
      "Scroll-stopping reels, photo shoots, and UGC that look effortless and convert.",
  },
  {
    id: "influencer-partnerships",
    icon: "Heart",
    title: "Influencer Partnerships",
    description:
      "We match you with creators whose audience actually wants what you're selling.",
  },
  {
    id: "brand-identity",
    icon: "Palette",
    title: "Brand Identity",
    description:
      "Visual systems, moodboards, and a look that feels unmistakably yours.",
  },
  {
    id: "paid-campaigns",
    icon: "BarChart3",
    title: "Paid Campaigns",
    description:
      "Performance marketing that doesn't sacrifice personality for conversions.",
  },
  {
    id: "launch-strategy",
    icon: "Sparkles",
    title: "Launch Strategy",
    description:
      "From zero to sold out — full-funnel plans for product and brand launches.",
  },
] as const;

// ─── Process ──────────────────────────────────────────────────────────────────

export const processSteps = [
  {
    num: "1",
    title: "Discover",
    description:
      "We dig into your brand, audience, and goals before touching a single deliverable.",
  },
  {
    num: "2",
    title: "Design",
    description:
      "Strategy and aesthetic come together into a plan that feels unmistakably you.",
  },
  {
    num: "3",
    title: "Deliver",
    description:
      "Content goes out, campaigns launch, and we track everything that matters.",
  },
  {
    num: "4",
    title: "Grow",
    description:
      "We optimize, double down on what's working, and keep the momentum going.",
  },
] as const;

// ─── Testimonials ─────────────────────────────────────────────────────────────

export const testimonials = [
  {
    quote:
      "whyshy completely changed how people see our brand. It finally feels like us.",
    author: "Priya Nair",
    role: "Founder, Bloom Skincare",
  },
  {
    quote:
      "They get it — the strategy is sharp but nothing ever feels stiff or corporate.",
    author: "Maya Torres",
    role: "Marketing Lead, Cove Studio",
  },
  {
    quote:
      "Our engagement tripled in two months. whyshy just understands what people want to see.",
    author: "Jordan Lee",
    role: "Founder, Saltwater Goods",
  },
] as const;

// ─── Nav links ────────────────────────────────────────────────────────────────

export const navLinks = [
  { label: "services", href: "#services" },
  { label: "process", href: "#process" },
  { label: "love notes", href: "#testimonials" },
] as const;

export const socialLinks = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "TikTok", href: "https://tiktok.com" },
] as const;

// ─── Hero stickers (lucide icon names + position/rotation) ────────────────────

export const heroStickers = [
  { icon: "Ribbon", top: "8%", left: "4%", size: 44, rotate: -12, float: 0 },
  { icon: "Ribbon", top: "62%", left: "8%", size: 32, rotate: 8, float: 1 },
  { icon: "Flower2", top: "14%", left: "82%", size: 40, rotate: 15, float: 2 },
  { icon: "Flower2", top: "70%", left: "88%", size: 34, rotate: -10, float: 0 },
  { icon: "Flower", top: "40%", left: "2%", size: 36, rotate: -6, float: 1 },
  { icon: "Fish", top: "78%", left: "30%", size: 34, rotate: 5, float: 2 },
  { icon: "Fish", top: "82%", left: "62%", size: 32, rotate: -8, float: 0 },
  { icon: "Dices", top: "18%", left: "92%", size: 32, rotate: 18, float: 1 },
  { icon: "Star", top: "52%", left: "94%", size: 26, rotate: -15, float: 2 },
  { icon: "Star", top: "10%", left: "14%", size: 22, rotate: 20, float: 0 },
  { icon: "Heart", top: "30%", left: "90%", size: 24, rotate: -5, float: 1 },
  { icon: "Cherry", top: "85%", left: "85%", size: 32, rotate: 10, float: 2 },
  { icon: "Ticket", top: "48%", left: "6%", size: 30, rotate: -14, float: 0 },
  { icon: "Sparkle", top: "22%", left: "48%", size: 22, rotate: 0, float: 1 },
  { icon: "Flower2", top: "66%", left: "94%", size: 30, rotate: 12, float: 2 },
] as const;
