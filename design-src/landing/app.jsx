/* AURA, main app, with GSAP-driven scroll orchestration */

function App() {
  const [t, setTweak] = useTweaks(window.AURA_DEFAULTS);

  /* ── CSS var driven palette tweaks ────────────────────────────── */
  useEffect(() => {
    const root = document.documentElement;
    const palettes = {
      warm:    { terra: "#D67A45", rose: "#DC8B7E", plum: "#8D6B8D", saffron: "#E5B14A" },
      saffron: { terra: "#E5B14A", rose: "#D67A45", plum: "#DC8B7E", saffron: "#E8AC58" },
      dusk:    { terra: "#C9986C", rose: "#A87E68", plum: "#7B4A3A", saffron: "#D67A45" },
      earth:   { terra: "#D67A45", rose: "#9DAA7E", plum: "#7B5B8A", saffron: "#E5B14A" },
    };
    const p = palettes[t.palette] || palettes.warm;
    root.style.setProperty("--terra",   p.terra);
    root.style.setProperty("--rose",    p.rose);
    root.style.setProperty("--plum",    p.plum);
    root.style.setProperty("--saffron", p.saffron);

    const display = t.displayFont === "Instrument Serif"
      ? `"Instrument Serif", Georgia, serif`
      : t.displayFont === "Geist"
        ? `"Geist", system-ui, sans-serif`
        : `"Bricolage Grotesque", system-ui, sans-serif`;
    root.style.setProperty("--display", display);
  }, [t.palette, t.displayFont]);

  /* ── GSAP ScrollTrigger orchestration ───────────────────────────
     - Problem pin: cycles through 6 pain cards & animates the leak dots
     - Cozy pin: cycles through 3 copy lines
     - Curtain: App section lifts up over Solution (it already overlaps via
       margin-top; we drive a subtle scale+shadow on the lifting card)
  */
  useLayoutEffect(() => {
    if (typeof gsap === "undefined" || !gsap.registerPlugin) return;
    if (typeof ScrollTrigger === "undefined") return;

    // Respect motion preferences & skip scroll-jacking on small screens.
    // The CSS already unrolls the pinned sections into a static stack in both
    // cases, here we simply don't create the ScrollTriggers, so nothing fights it.
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isNarrow = window.matchMedia("(max-width: 860px)").matches;
    if (reduceMotion || isNarrow) return;

    gsap.registerPlugin(ScrollTrigger);

    const triggers = [];

    /* ── PROBLEM SECTION pin ───────────────────────────────────── */
    const problem = document.querySelector("[data-pin-problem]");
    if (problem) {
      const cards = problem.querySelectorAll("[data-pain-card]");
      const dots  = problem.querySelectorAll("[data-pain-dot]");
      const idxEl = problem.querySelector("[data-pain-idx]");
      const leakDots = problem.querySelectorAll("[data-leak-dot]");

      const showIdx = (i) => {
        cards.forEach((c, n) => {
          const active = n === i;
          c.style.opacity = active ? 1 : 0;
          c.style.transform = active ? "none" : `translateY(${n < i ? -24 : 24}px)`;
        });
        dots.forEach((d, n) => {
          d.style.background = n <= i ? "var(--terra)" : "rgba(42,31,24,0.15)";
        });
        if (idxEl) idxEl.textContent = String(i + 1).padStart(2, "0");
        // animate leak dots in waves
        leakDots.forEach((d, n) => {
          d.style.opacity = ((n % 6) <= i) ? 0.9 : 0;
          d.style.transition = "opacity .5s";
        });
      };

      const trig = ScrollTrigger.create({
        trigger: problem,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.4,
        onUpdate: (self) => {
          const i = Math.min(cards.length - 1, Math.floor(self.progress * cards.length));
          showIdx(i);
        },
      });
      triggers.push(trig);
      showIdx(0);
    }

    /* ── COZY SECTION pin: 3 lines ─────────────────────────────── */
    /* ── COZY SECTION pin: 3 storyteller lines ── */
    const cozy = document.querySelector("[data-pin-cozy]");
    if (cozy) {
      const lines = cozy.querySelectorAll("[data-cozy-line]");
      const dots  = cozy.querySelectorAll("[data-cozy-dot]");

      const showIdx = (i) => {
        lines.forEach((l, n) => {
          const active = n === i;
          l.style.opacity = active ? 1 : 0;
          l.style.transform = active ? "translateY(0)" : `translateY(${n < i ? -24 : 24}px)`;
        });
        dots.forEach((d, n) => {
          d.style.background = n <= i ? "var(--saffron)" : "rgba(243,234,215,0.15)";
        });
      };

      const trig = ScrollTrigger.create({
        trigger: cozy,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.4,
        onUpdate: (self) => {
          const i = Math.min(lines.length - 1, Math.floor(self.progress * lines.length));
          showIdx(i);
        },
      });
      triggers.push(trig);
      showIdx(0);
    }

    /* ── CURTAIN: App Experience lifts over Solution ──────────────
       The App section already overlaps via negative margin + top radius.
       Here we drive a subtle translateY ease so it really feels like it
       "rises" over Solution as Solution exits the viewport.            */
    const curtain = document.querySelector("[data-curtain]");
    const solution = document.getElementById("solution");
    if (curtain && solution) {
      gsap.set(curtain, { y: 60 });
      const trig = ScrollTrigger.create({
        trigger: solution,
        start: "bottom bottom",
        end: "bottom top",
        scrub: 0.8,
        onUpdate: (self) => {
          gsap.set(curtain, { y: 60 - 60 * self.progress });
        },
      });
      triggers.push(trig);
    }

    /* ── Misc soft reveals on phones & cards ───────────────────── */
    gsap.utils.toArray(".reveal").forEach((el) => {
      gsap.fromTo(el,
        { opacity: 0, y: 28 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        }
      );
    });

    return () => {
      triggers.forEach((tr) => tr.kill());
    };
  }, []);

  return (
    <>
      <TopNav />

      <HeroSection headline={t.headline} />
      <ProblemSection />
      <SolutionSection />
      <AppExperienceSection />
      <CafeBand />
      <CozySpaceSection />
      <AISection />
      <GamificationSection />
      <DashboardSection />
      <SocialGrowthSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <PricingSection />
      <FAQSection />
      <FinalCTASection />
      <Footer />
      <MobileStickyCTA />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Warm palette" />
        <TweakRadio
          label="Tone"
          value={t.palette}
          options={["warm", "saffron", "dusk", "earth"]}
          onChange={(v) => setTweak("palette", v)}
        />

        <TweakSection label="Type" />
        <TweakRadio
          label="Display"
          value={t.displayFont}
          options={["Bricolage Grotesque", "Instrument Serif", "Geist"]}
          onChange={(v) => setTweak("displayFont", v)}
        />

        <TweakSection label="Content" />
        <TweakText
          label="Hero headline"
          value={t.headline}
          onChange={(v) => setTweak("headline", v)}
        />
      </TweaksPanel>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
