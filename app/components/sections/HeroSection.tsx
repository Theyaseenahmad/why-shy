"use client";


import RibbonCanvas from "../hero/RibbonCanvas";
import FloatingCards from "../hero/FloatingCards";
import LogoReveal from "../hero/LogoReveal";

export function HeroSection() {
  return (


    <section
        className="relative mx-auto flex min-h-[88vh] w-full max-w-[1320px] flex-col items-center justify-center px-6 pt-32 md:px-10 md:pt-24"
        data-testid="hero-section"
        
      >
        {/* Ribbon lives behind everything — full bleed */}
        <div className="pointer-events-none absolute inset-0 z-10">
          <RibbonCanvas color="#FF6AA8" width={5} segments={42} interactive />
        </div>

        {/* Editorial floating cards live in front of the ribbon, behind the type */}
        <FloatingCards />

        {/* Headline cluster */}
        <div className="relative z-40 mx-auto flex max-w-[980px] flex-col items-center text-center">
          <div className="mb-7">
            <LogoReveal size={132} />
          </div>

          <div
            className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/55 px-3.5 py-1.5 text-[10px] uppercase tracking-[0.32em] text-black/55 backdrop-blur-md ring-1 ring-black/[0.06]"
            data-testid="eyebrow"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF6AA8]" />
            Influencer × Brand · matchmaking studio
          </div>

          <h1
            className="font-display text-[clamp(44px,8.4vw,120px)] font-medium leading-[0.95] tracking-[-0.025em] text-[#11121a]"
            data-testid="hero-headline"
          >
            We connect brands
            <br />
            with <em className="not-italic">
              <span className="font-display italic">top-notch</span></em>
            {" "}
            influencers <span className="inline-block translate-y-[-0.1em]">🎀</span>
          </h1>

          <p
            className="mt-7 max-w-[560px] text-[15px] leading-[1.6] text-black/65"
            data-testid="hero-subhead"
          >
           Think cute campaigns, dreamy content, and creators who feel like the perfect match.
            That's kind of our thing.
          </p>

          <div
            className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:gap-4"
            data-testid="hero-ctas"
          >
            <a
              href="#brief"
              data-testid="cta-primary"
              className="group inline-flex items-center gap-3 rounded-full bg-[#11121a] px-6 py-3 text-[12px] uppercase tracking-[0.28em] text-[#f6efe6] shadow-[0_18px_40px_-18px_rgba(20,15,30,0.55)] transition-transform hover:-translate-y-[2px]"
            >
              <span>Start your campaign</span>
              <span
                aria-hidden
                className="transition-transform group-hover:translate-x-0.5"
              >
                →
              </span>
            </a>
            <a
              href="#roster"
              data-testid="cta-secondary"
              className="inline-flex items-center gap-2 rounded-full bg-white/60 px-5 py-3 text-[12px] uppercase tracking-[0.28em] text-black/70 ring-1 ring-black/[0.08] backdrop-blur-sm transition-colors hover:text-black"
            >
              See the roster
            </a>
          </div>

          <div className="mt-12 flex items-center gap-6 text-[11px] uppercase tracking-[0.24em] text-black/45">
            <span data-testid="trust-1">280+ creators</span>
            <span className="h-3 w-px bg-black/15" />
            <span data-testid="trust-2">62 brand partners</span>
            <span className="h-3 w-px bg-black/15 hidden sm:inline-block" />
            <span data-testid="trust-3" className="hidden sm:inline">
              24.6M combined reach
            </span>
          </div>
        </div>
      </section>
  );
}