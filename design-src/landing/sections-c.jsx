/* AURA sections C, Dashboard (warm sand), Social, Pricing, Final CTA (warm), Footer (espresso) */

/* ───────────── DASHBOARD, warm sand, NOT dark ───────────── */
function DashboardSection() {
  return (
    <section className="section grain grain-soft" id="dashboard" style={{ background: "var(--sand)" }}>
      {/* soft warm glow */}
      <div style={{ position: "absolute", left: -200, top: -100, width: 700, height: 700, background: "radial-gradient(circle, rgba(214,122,69,0.18), transparent 60%)", filter: "blur(60px)", zIndex: 0 }} />
      <div style={{ position: "absolute", right: -100, bottom: -100, width: 500, height: 500, background: "radial-gradient(circle, rgba(141,107,141,0.16), transparent 60%)", filter: "blur(60px)", zIndex: 0 }} />

      <div className="container" style={{ position: "relative", zIndex: 3 }}>
        <div style={{ maxWidth: 720, marginBottom: 48 }}>
          <h2 style={{ fontFamily: "var(--display)", fontWeight: 600, fontSize: "clamp(36px, 4.4vw, 58px)", letterSpacing: "-0.035em", lineHeight: 1.02, textWrap: "balance" }}>
            Simple control. <span className="serif-it" style={{ fontWeight: 400, color: "var(--terra)" }}>Real</span> growth signals.
          </h2>
          <p style={{ marginTop: 18, fontSize: 17, lineHeight: 1.55, color: "var(--ink-soft)", maxWidth: "60ch" }}>
            See what matters without drowning in complicated dashboards. Know who is returning, who is fading, what campaign worked, and what to launch next.
          </p>
        </div>

        {/* Dashboard mockup, espresso surface on warm sand bg (single accent surface, doesn't break flow) */}
        <div style={{
          position: "relative",
          padding: 24,
          borderRadius: 28,
          background: "linear-gradient(180deg, #2A1F18 0%, #1F1612 100%)",
          color: "var(--cream)",
          border: "1px solid rgba(243,234,215,0.08)",
          boxShadow: "0 60px 120px -40px rgba(42,31,24,0.45)",
          overflow: "hidden",
        }}>
          {/* warm spotlights inside the dashboard */}
          <div style={{ position: "absolute", left: -80, top: -80, width: 360, height: 360, background: "radial-gradient(circle, rgba(232,172,88,0.18), transparent 60%)", filter: "blur(40px)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", right: -80, bottom: -80, width: 360, height: 360, background: "radial-gradient(circle, rgba(220,139,126,0.14), transparent 60%)", filter: "blur(40px)", pointerEvents: "none" }} />

          {/* window chrome */}
          <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 22 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <Logo light size={22} />
              <span style={{ color: "rgba(243,234,215,0.4)", fontSize: 13 }}>·</span>
              <span style={{ color: "rgba(243,234,215,0.7)", fontSize: 13, fontWeight: 500 }}>Café Mira</span>
              <span style={{ padding: "3px 8px", borderRadius: 999, background: "rgba(157,170,126,0.18)", color: "#B9C99C", fontSize: 10.5, fontFamily: "var(--mono)", letterSpacing: "0.12em" }}>LIVE</span>
            </div>
            <div style={{ fontFamily: "var(--mono)", fontSize: 10.5, letterSpacing: "0.14em", color: "rgba(243,234,215,0.5)", textTransform: "uppercase" }}>
              Today · Tue Mar 26
            </div>
          </div>

          <div className="r-4" style={{ position: "relative", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
            <DashCard label="Today's orders"         value="48"   delta="+12 vs Mon"      chart="terra" />
            <DashCard label="Repeat customer rate"   value="62%"  delta="+8 pts this mo"  chart="rose" />
            <DashCard label="Rewards redeemed"       value="17"   delta="3 spins · 14 perks" chart="plum" />
            <DashCard label="New members"            value="+24"  delta="this week"       chart="saffron" />
          </div>

          <div className="r-split" style={{ position: "relative", display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 14, marginTop: 14 }}>
            {/* big chart card */}
            <div style={{ padding: 22, borderRadius: 18, background: "rgba(14,10,8,0.5)", border: "1px solid rgba(243,234,215,0.08)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div className="mono" style={{ color: "rgba(243,234,215,0.5)" }}>Visits · last 30 days</div>
                  <div style={{ fontFamily: "var(--display)", fontSize: 30, fontWeight: 600, letterSpacing: "-0.035em", color: "var(--cream)", marginTop: 6 }}>1,148</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div className="mono" style={{ color: "rgba(243,234,215,0.5)" }}>Growth</div>
                  <div style={{ fontFamily: "var(--display)", fontSize: 17, fontWeight: 600, color: "#B9C99C", marginTop: 4 }}>↗ +28%</div>
                </div>
              </div>
              <BigChart />
              <div style={{ display: "flex", gap: 16, marginTop: 10, fontSize: 11.5, color: "rgba(243,234,215,0.6)" }}>
                <LegendDot c="var(--terra)" l="First-time" />
                <LegendDot c="var(--plum)" l="Returning" />
                <LegendDot c="var(--saffron)" l="VIP" />
              </div>
            </div>

            <div style={{ display: "grid", gap: 14 }}>
              <div style={{ padding: 18, borderRadius: 18, background: "linear-gradient(140deg, rgba(214,122,69,0.18), rgba(220,139,126,0.14))", border: "1px solid rgba(214,122,69,0.28)" }}>
                <div className="mono" style={{ color: "rgba(243,234,215,0.7)" }}>Best offer this week</div>
                <div style={{ fontFamily: "var(--display)", fontSize: 22, fontWeight: 600, letterSpacing: "-0.025em", color: "var(--cream)", marginTop: 8, lineHeight: 1.1 }}>Iced latte happy hour</div>
                <div style={{ display: "flex", gap: 14, marginTop: 12, fontSize: 12, color: "rgba(243,234,215,0.75)" }}>
                  <span><strong style={{ color: "var(--cream)" }}>52</strong> orders</span>
                  <span><strong style={{ color: "var(--cream)" }}>+$612</strong> margin</span>
                  <span><strong style={{ color: "var(--cream)" }}>4.8★</strong></span>
                </div>
              </div>

              <div style={{ padding: 16, borderRadius: 14, background: "rgba(14,10,8,0.5)", border: "1px solid rgba(243,234,215,0.08)" }}>
                <div className="mono" style={{ color: "rgba(243,234,215,0.5)" }}>At-risk customers</div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginTop: 6 }}>
                  <div style={{ fontFamily: "var(--display)", fontSize: 22, fontWeight: 600, letterSpacing: "-0.025em", color: "var(--cream)" }}>142</div>
                  <div style={{ fontSize: 11, color: "rgba(243,234,215,0.55)" }}>14+ days inactive</div>
                </div>
                <button style={{ marginTop: 10, width: "100%", padding: "8px 0", borderRadius: 999, background: "var(--cream)", color: "var(--ink)", fontWeight: 600, fontSize: 12.5 }}>Launch win-back</button>
              </div>
            </div>
          </div>

          <div style={{ position: "relative", marginTop: 14, padding: "16px 20px", borderRadius: 16, background: "rgba(14,10,8,0.5)", border: "1px solid rgba(243,234,215,0.08)", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 30, height: 30, borderRadius: 9, background: "linear-gradient(135deg, var(--plum), var(--terra))", color: "white", display: "flex", alignItems: "center", justifyContent: "center" }}><Icon.spark /></div>
              <div>
                <div style={{ color: "var(--cream)", fontWeight: 600, fontSize: 14 }}>Next campaign suggestion</div>
                <div style={{ color: "rgba(243,234,215,0.6)", fontSize: 12.5 }}>"Wednesday morning · breakfast combo for new members within 2 km."</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button style={{ padding: "9px 14px", borderRadius: 999, background: "var(--cream)", color: "var(--ink)", fontWeight: 600, fontSize: 12.5 }}>Approve</button>
              <button style={{ padding: "9px 14px", borderRadius: 999, border: "1px solid rgba(243,234,215,0.2)", color: "var(--cream)", fontSize: 12.5, background: "transparent" }}>Edit</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function LegendDot({ c, l }) {
  return <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><span style={{ width: 8, height: 8, background: c, borderRadius: 2 }} /> {l}</span>;
}

function DashCard({ label, value, delta, chart = "terra" }) {
  const tints = { terra: "#D67A45", rose: "#DC8B7E", plum: "#8D6B8D", saffron: "#E5B14A", sage: "#9DAA7E" };
  const c = tints[chart];
  return (
    <div style={{
      padding: 18,
      borderRadius: 16,
      background: "rgba(14,10,8,0.5)",
      border: "1px solid rgba(243,234,215,0.08)",
      position: "relative", overflow: "hidden",
    }}>
      <div className="mono" style={{ color: "rgba(243,234,215,0.5)" }}>{label}</div>
      <div style={{ fontFamily: "var(--display)", fontWeight: 600, fontSize: 32, letterSpacing: "-0.035em", color: "var(--cream)", marginTop: 6, lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: 11.5, color: "rgba(243,234,215,0.55)", marginTop: 6 }}>{delta}</div>
      <svg viewBox="0 0 100 30" preserveAspectRatio="none" style={{ position: "absolute", right: 12, bottom: 10, width: 56, height: 22, opacity: 0.85 }}>
        <path d="M0 22 C 10 18, 20 14, 30 12 S 50 8, 60 6 S 80 4, 100 2" stroke={c} strokeWidth="1.6" fill="none" />
      </svg>
    </div>
  );
}

function BigChart() {
  const make = (phase, amp, drop) => Array.from({ length: 30 }, (_, i) => {
    const x = (i / 29) * 100;
    const y = drop + Math.sin(i * 0.4 + phase) * amp - i * 0.55;
    return [x, y];
  });
  const p1 = make(0, 6, 60);
  const p2 = make(1, 4, 40);
  const p3 = make(1.5, 3, 22);
  const path = (pts) => "M" + pts.map(([x, y]) => `${x} ${y}`).join(" L ");
  const area = (pts) => path(pts) + ` L 100 100 L 0 100 Z`;
  return (
    <svg viewBox="0 0 100 80" preserveAspectRatio="none" style={{ width: "100%", height: 180, marginTop: 14 }}>
      <defs>
        <linearGradient id="d1" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#D67A45" stopOpacity="0.45" /><stop offset="100%" stopColor="#D67A45" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="d2" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#8D6B8D" stopOpacity="0.45" /><stop offset="100%" stopColor="#8D6B8D" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="d3" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#E5B14A" stopOpacity="0.45" /><stop offset="100%" stopColor="#E5B14A" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[20, 40, 60, 80].map((y) => <line key={y} x1="0" x2="100" y1={y} y2={y} stroke="rgba(243,234,215,0.06)" strokeWidth="0.2" />)}
      <path d={area(p1)} fill="url(#d1)" />
      <path d={area(p2)} fill="url(#d2)" />
      <path d={area(p3)} fill="url(#d3)" />
      <path d={path(p1)} stroke="#D67A45" strokeWidth="0.8" fill="none" />
      <path d={path(p2)} stroke="#8D6B8D" strokeWidth="0.8" fill="none" />
      <path d={path(p3)} stroke="#E5B14A" strokeWidth="0.8" fill="none" />
    </svg>
  );
}

/* ───────────── SOCIAL GROWTH ───────────── */
function SocialGrowthSection() {
  return (
    <section className="section grain grain-soft" id="social" style={{ background: "var(--cream)" }}>
      <div className="container" style={{ position: "relative", zIndex: 3 }}>
        <div className="r-split" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start" }}>
          <div className="r-unstick" style={{ position: "sticky", top: 110 }}>
            <h2 style={{ marginTop: 28, fontFamily: "var(--display)", fontWeight: 600, fontSize: "clamp(36px, 4.4vw, 60px)", letterSpacing: "-0.035em", lineHeight: 1.0 }}>
              Turn attention<br/>
              into <span className="serif-it" style={{ fontWeight: 400, color: "var(--terra)" }}>repeat visits.</span>
            </h2>
            <p style={{ marginTop: 26, fontSize: 16, lineHeight: 1.55, color: "var(--ink-soft)", maxWidth: 460 }}>
              Aura connects your loyalty system with content, ads, reviews, and local promotions, so online attention becomes real customers walking back in.
            </p>
            <div style={{ marginTop: 28, padding: 18, borderRadius: 14, background: "rgba(255,255,255,0.5)", border: "1px solid var(--hairline)", fontSize: 13.5, lineHeight: 1.5, color: "var(--ink)" }}>
              <span className="mono" style={{ color: "var(--muted)" }}>How we talk about reach</span>
              <div className="serif-it" style={{ fontSize: 18, marginTop: 8, letterSpacing: "-0.01em" }}>
                "Growth campaigns designed to increase local visibility, engagement, and follower growth, based on ad budget, market, and content performance."
              </div>
            </div>
          </div>

          <div style={{ display: "grid", gap: 10 }}>
            {[
              { i: <Icon.bolt />,   t: "Local ad campaigns",        s: "Meta + Google, targeted by neighborhood and intent.", c: "var(--terra)" },
              { i: <Icon.spark />,  t: "Social content ideas",      s: "Weekly content calendar built around your menu and seasons.", c: "var(--plum)" },
              { i: <Icon.heart />,  t: "Promo graphics",            s: "On-brand templates for stories, posts, and in-store signage.", c: "var(--rose)" },
              { i: <Icon.star />,   t: "Review generation",         s: "Auto-prompt happy customers right after their visit.", c: "var(--saffron)" },
              { i: <Icon.users />,  t: "Follower growth strategy",  s: "Tuned to your ad budget, market and content performance.", c: "var(--sage)" },
              { i: <Icon.chart />,  t: "Monthly growth report",     s: "Plain-language summary of what worked and what's next.", c: "var(--honey)" },
            ].map((c, i) => (
              <div key={c.t} className="card-hover" style={{
                display: "flex", gap: 16, alignItems: "center",
                padding: "18px 20px",
                borderRadius: 16,
                background: "rgba(252,247,236,0.92)",
                backdropFilter: "blur(14px)",
                border: "1px solid rgba(42,31,24,0.08)",
                boxShadow: "0 14px 30px -22px rgba(42,31,24,0.16)",
              }}>
                <div style={{ width: 40, height: 40, borderRadius: 11, background: c.c, color: "white", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{c.i}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "var(--display)", fontWeight: 600, fontSize: 17, letterSpacing: "-0.02em" }}>{c.t}</div>
                  <div style={{ fontSize: 13.5, color: "var(--ink-soft)", marginTop: 2, lineHeight: 1.45 }}>{c.s}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────── PRICING ───────────── */
function PricingSection() {
  const plans = [
    {
      name: "Starter", price: "$297", sub: "/mo", setup: "Launch setup from $900",
      copy: "For cafés and restaurants starting with loyalty.",
      features: ["Digital loyalty system", "QR menu", "Basic rewards", "Customer database", "Monthly growth report", "Basic promotions"],
      cta: "Start with Starter",
    },
    {
      name: "Growth", price: "$497", sub: "/mo", setup: "Launch setup from $900",
      copy: "For businesses ready to automate retention.",
      features: ["Everything in Starter", "AI promotion ideas", "Happy hour campaigns", "Email / SMS / push", "Review generation", "Social growth support", "Basic ad support"],
      cta: "Choose Growth", featured: true,
    },
    {
      name: "Premium", price: "$697", sub: "/mo", setup: "Launch setup from $900",
      copy: "For brands that want the full digital experience.",
      features: ["Everything in Growth", "Branded app / web app experience", "Advanced gamification", "VIP membership system", "Custom rewards", "Premium campaign strategy", "Advanced dashboard"],
      cta: "Talk about Premium",
    },
  ];

  return (
    <section className="section grain grain-soft" id="pricing" style={{ background: "var(--cream-warm)" }}>
      <div className="container" style={{ position: "relative" }}>
        <div style={{ textAlign: "center", maxWidth: 720, margin: "0 auto" }}>
          <div className="eyebrow" style={{ justifyContent: "center" }}>Pricing</div>
          <h2 style={{ marginTop: 28, fontFamily: "var(--display)", fontWeight: 600, fontSize: "clamp(36px, 4.4vw, 60px)", letterSpacing: "-0.035em", lineHeight: 1.0 }}>
            <span className="serif-it" style={{ fontWeight: 400, color: "var(--terra)" }}>Founder Partner</span> Plans
          </h2>
          <p style={{ marginTop: 22, fontSize: 16, color: "var(--ink-soft)" }}>
            No commissions on direct orders. Cancel anytime. First 5 businesses receive Founder Partner pricing.
          </p>
        </div>

        <div className="r-3" style={{ marginTop: 64, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }}>
          {plans.map((p) => <PlanCard key={p.name} p={p} />)}
        </div>

        <div id="founders" style={{
          marginTop: 28,
          padding: "26px 30px",
          borderRadius: 20,
          background: "linear-gradient(120deg, var(--ink) 0%, #3A2A1F 100%)",
          color: "var(--cream)",
          display: "flex", justifyContent: "space-between", alignItems: "center", gap: 24, flexWrap: "wrap",
          boxShadow: "0 30px 60px -30px rgba(42,31,24,0.4)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div style={{ width: 42, height: 42, borderRadius: 11, background: "linear-gradient(135deg,var(--terra),var(--saffron),var(--plum))", display: "flex", alignItems: "center", justifyContent: "center" }}><Icon.crown /></div>
            <div>
              <div className="mono" style={{ color: "rgba(243,234,215,0.6)" }}>Founder note</div>
              <div style={{ fontFamily: "var(--display)", fontSize: 20, fontWeight: 600, letterSpacing: "-0.025em", marginTop: 4 }}>
                First 5 businesses receive Founder Partner pricing and priority custom setup.
              </div>
            </div>
          </div>
          <a href="#cta" className="btn-primary" style={{ background: "var(--cream)", color: "var(--ink)" }}>
            Request Founder Partner Pricing
            <span className="arrow-circle" style={{ background: "var(--ink)", color: "var(--cream)" }}>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

function PlanCard({ p }) {
  return (
    <div className="card-hover" style={{
      position: "relative",
      padding: 28,
      borderRadius: 16,
      background: p.featured ? "linear-gradient(160deg, var(--ink) 0%, #3A2A1F 100%)" : "rgba(252,247,236,0.94)",
      backdropFilter: "blur(14px)",
      color: p.featured ? "var(--cream)" : "var(--ink)",
      border: p.featured ? "1px solid rgba(243,234,215,0.18)" : "1px solid rgba(42,31,24,0.08)",
      boxShadow: p.featured
        ? "0 40px 80px -30px rgba(214,122,69,0.3), 0 20px 40px -20px rgba(42,31,24,0.4)"
        : "0 20px 50px -30px rgba(42,31,24,0.16)",
      overflow: "hidden",
    }}>
      {p.featured && (
        <div style={{ position: "absolute", right: -80, top: -80, width: 240, height: 240, background: "radial-gradient(circle, rgba(214,122,69,0.35), transparent 60%)", filter: "blur(30px)" }} />
      )}
      <div style={{ position: "relative", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div className="mono" style={{ color: p.featured ? "rgba(243,234,215,0.65)" : "var(--muted)" }}>{p.name}</div>
        {p.featured && <span style={{ padding: "4px 10px", borderRadius: 999, background: "linear-gradient(135deg,var(--terra),var(--saffron))", color: "white", fontFamily: "var(--mono)", fontSize: 9.5, letterSpacing: "0.14em", textTransform: "uppercase" }}>Most popular</span>}
      </div>

      <div style={{ position: "relative", display: "flex", alignItems: "baseline", gap: 4, marginTop: 20 }}>
        <span style={{ fontFamily: "var(--display)", fontWeight: 600, fontSize: 52, letterSpacing: "-0.04em", lineHeight: 1 }}>{p.price}</span>
        <span style={{ fontSize: 14, color: p.featured ? "rgba(243,234,215,0.6)" : "var(--muted)" }}>{p.sub}</span>
      </div>
      <div style={{ position: "relative", fontSize: 11, fontFamily: "var(--mono)", color: p.featured ? "rgba(243,234,215,0.55)" : "var(--muted)", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 6 }}>{p.setup}</div>
      <p style={{ position: "relative", fontSize: 14, lineHeight: 1.5, color: p.featured ? "rgba(243,234,215,0.78)" : "var(--ink-soft)", marginTop: 14 }}>{p.copy}</p>

      <div style={{ position: "relative", height: 1, background: p.featured ? "rgba(243,234,215,0.12)" : "var(--hairline)", margin: "20px 0 18px" }} />

      <ul style={{ position: "relative", listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 9 }}>
        {p.features.map((f) => (
          <li key={f} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13.5 }}>
            <Icon.check style={{ color: p.featured ? "var(--terra)" : "var(--ink)", flexShrink: 0 }} />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <a href="#cta" className={p.featured ? "btn-primary" : "btn-secondary"}
         style={{
           position: "relative",
           marginTop: 28, width: "100%", justifyContent: "center",
           background: p.featured ? "var(--cream)" : undefined,
           color: p.featured ? "var(--ink)" : undefined,
         }}>
        {p.cta}
        <span className="arrow-circle" style={{ background: "var(--ink)", color: "var(--cream)" }}>→</span>
      </a>
    </div>
  );
}

/* ───────────── FINAL CTA, warm sunset, NO dark slam ───────────── */
function FinalCTASection() {
  return (
    <section className="section grain grain-soft" id="cta" style={{ background: "var(--clay)", overflow: "hidden", padding: "160px 0 140px" }}>
      <div style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}>
        <GradientRibbons variant="dusk" opacity={0.85} />
      </div>
      {/* very soft single ghost word, low opacity, behind, toned down so it doesn't compete with the headline */}
      <div className="hide-mobile" style={{ position: "absolute", left: 0, right: 0, top: "50%", transform: "translateY(-50%)", zIndex: 1, opacity: 0.16, pointerEvents: "none", textAlign: "center" }}>
        <span className="serif-it" style={{ fontSize: "clamp(160px, 26vw, 380px)", color: "rgba(42,31,24,0.1)", letterSpacing: "-0.03em" }}>regulars</span>
      </div>

      <div className="container" style={{ position: "relative", zIndex: 3, textAlign: "center" }}>
        <h2 style={{ marginTop: 28, fontFamily: "var(--display)", fontWeight: 600, fontSize: "clamp(44px, 6vw, 84px)", letterSpacing: "-0.04em", lineHeight: 0.98, maxWidth: 1000, marginInline: "auto" }}>
          Ready to turn <span className="serif-it" style={{ fontWeight: 400, color: "var(--espresso)" }}>visitors</span><br/>
          into <span style={{ color: "var(--terra)" }}>regulars?</span>
        </h2>
        <p style={{ marginTop: 26, maxWidth: 580, marginInline: "auto", fontSize: 17, lineHeight: 1.55, color: "var(--ink-soft)" }}>
          Become one of the first Aura Founder Partners and launch a loyalty experience your customers actually want to use.
        </p>
        <div style={{ marginTop: 40, display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
          <a href="#" className="btn-primary">
            Book a free growth demo
            <span className="arrow-circle">→</span>
          </a>
          <a href="#" className="btn-secondary">Request Founder Partner Pricing</a>
        </div>
        <div style={{ marginTop: 56, display: "flex", justifyContent: "center", gap: 28, flexWrap: "wrap", fontSize: 11, fontFamily: "var(--mono)", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--muted)" }}>
          <span>20-minute call</span>
          <span>·</span>
          <span>No commitment</span>
          <span>·</span>
          <span>Custom growth plan included</span>
        </div>
      </div>
    </section>
  );
}

/* ───────────── FOOTER, espresso, the closing dark moment ───────────── */
function Footer() {
  return (
    <footer style={{ background: "var(--espresso)", color: "var(--cream)", padding: "100px 0 50px", position: "relative", overflow: "hidden" }}>
      {/* macro espresso/crema texture, sunk almost to black so it only adds grain + depth behind the wordmark. Vanishes gracefully until the asset lands. */}
      <BrandPhoto src="/assets/brand/footer-espresso.jpg" alt="" fill grade={0.7} fallback={null}
        imgStyle={{ opacity: 0.16 }} />
      {/* faint warm spotlight */}
      <div style={{ position: "absolute", left: "50%", top: -80, transform: "translateX(-50%)", width: 700, height: 240, background: "radial-gradient(ellipse, rgba(232,172,88,0.18), transparent 60%)", filter: "blur(40px)", pointerEvents: "none" }} />

      <div className="container" style={{ position: "relative" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr 1fr 1fr", gap: 40, alignItems: "start" }}>
          <div>
            <Logo light size={28} />
            <p style={{ marginTop: 22, fontSize: 14.5, lineHeight: 1.55, color: "rgba(243,234,215,0.6)", maxWidth: 320 }}>
              AI-powered loyalty, marketing, and ordering systems for cafés and restaurants.
            </p>
            <div style={{ marginTop: 20, display: "flex", gap: 10 }}>
              {["Instagram", "Email"].map((s) => (
                <span key={s} style={{ padding: "8px 14px", borderRadius: 999, border: "1px solid rgba(243,234,215,0.14)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: "rgba(243,234,215,0.78)" }}>{s}</span>
              ))}
            </div>
          </div>
          <FootCol title="Product"   items={["Features", "Pricing", "Demo"]} />
          <FootCol title="Program"   items={["Founder Partner Program"]} />
          <FootCol title="Contact"   items={["Book a demo", "Email us"]} />
        </div>
        <div style={{ marginTop: 60, paddingTop: 24, borderTop: "1px solid rgba(243,234,215,0.08)", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 16, fontSize: 11, fontFamily: "var(--mono)", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(243,234,215,0.45)" }}>
          <span>© {new Date().getFullYear()} Aura · for cafés & restaurants</span>
          <div style={{ display: "flex", gap: 22 }}>
            <span>Privacy</span><span>Terms</span><span>Cookies</span>
          </div>
        </div>

        {/* Mega serif wordmark, closes the loop with cozy section */}
        <div style={{ marginTop: 60, fontFamily: "var(--serif)", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(140px, 26vw, 420px)", letterSpacing: "-0.04em", lineHeight: 0.85, color: "transparent", WebkitTextStroke: "1px rgba(232,172,88,0.16)", textAlign: "center" }}>aura</div>
      </div>
    </footer>
  );
}

function FootCol({ title, items }) {
  return (
    <div>
      <div className="mono" style={{ color: "rgba(243,234,215,0.45)" }}>{title}</div>
      <ul style={{ listStyle: "none", padding: 0, margin: "16px 0 0", display: "grid", gap: 10 }}>
        {items.map((i) => (
          <li key={i} style={{ fontSize: 14, color: "rgba(243,234,215,0.85)" }}>{i}</li>
        ))}
      </ul>
    </div>
  );
}

/* ───────────── HOW IT WORKS, 3 steps, before pricing ───────────── */
function HowItWorksSection() {
  const steps = [
    {
      n: "01",
      t: "Build your loyalty system",
      c: "We design your rewards, offers, QR menu, and customer flow, branded to your café.",
      icon: <Icon.spark />,
    },
    {
      n: "02",
      t: "Launch your first campaigns",
      c: "Happy hour, review requests, social promotions, and return offers, live in days, not months.",
      icon: <Icon.bolt />,
    },
    {
      n: "03",
      t: "Track what brings people back",
      c: "Repeat visits, members, rewards, and campaign performance, in one clear dashboard.",
      icon: <Icon.trend />,
    },
  ];

  return (
    <section className="section grain grain-soft" id="how" style={{ background: "var(--cream)" }}>
      <div className="container" style={{ position: "relative" }}>
        <div style={{ textAlign: "center", maxWidth: 720, margin: "0 auto" }}>
          <h2 style={{ marginTop: 28, fontFamily: "var(--display)", fontWeight: 600, fontSize: "clamp(36px, 4.4vw, 60px)", letterSpacing: "-0.035em", lineHeight: 1.0 }}>
            Launch in <span className="serif-it" style={{ fontWeight: 400, color: "var(--terra)" }}>14 days.</span>
          </h2>
          <p style={{ marginTop: 22, fontSize: 16, color: "var(--ink-soft)" }}>
            Three steps from first call to first regular.
          </p>
        </div>

        <div className="r-3" style={{ marginTop: 56, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18, position: "relative" }}>
          {/* connecting line */}
          <div className="hide-mobile" style={{ position: "absolute", left: "16%", right: "16%", top: 48, height: 1, background: "linear-gradient(90deg, transparent, var(--terra) 20%, var(--terra) 80%, transparent)", opacity: 0.4, zIndex: 0 }} />
          {steps.map((s, i) => (
            <div key={s.n} className="card-hover" style={{
              position: "relative",
              padding: 28,
              borderRadius: 16,
              background: "rgba(252,247,236,0.95)",
              backdropFilter: "blur(14px)",
              border: "1px solid rgba(42,31,24,0.08)",
              boxShadow: "0 20px 50px -30px rgba(42,31,24,0.18)",
              zIndex: 1,
            }}>
              <div style={{
                width: 56, height: 56, borderRadius: "50%",
                background: "var(--cream-warm)",
                border: "1px solid var(--hairline)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "var(--terra)",
                marginBottom: 20,
                position: "relative",
                boxShadow: "0 0 0 6px var(--cream)",
              }}>{s.icon}</div>
              <h3 style={{ marginTop: 8, fontFamily: "var(--display)", fontSize: 22, fontWeight: 600, letterSpacing: "-0.025em", lineHeight: 1.15 }}>{s.t}</h3>
              <p style={{ marginTop: 10, fontSize: 14, lineHeight: 1.55, color: "var(--ink-soft)" }}>{s.c}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────── MOBILE STICKY CTA ───────────── */
function MobileStickyCTA() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.4);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div
      className="mobile-sticky-cta"
      style={{
        position: "fixed",
        bottom: 16, left: 16, right: 16,
        zIndex: 60,
        padding: "10px 12px",
        borderRadius: 999,
        background: "rgba(42,31,24,0.94)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        boxShadow: "0 18px 40px -16px rgba(0,0,0,0.45)",
        display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12,
        transform: show ? "translateY(0)" : "translateY(120%)",
        transition: "transform .35s cubic-bezier(.2,.7,.2,1)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, paddingLeft: 6 }}>
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--saffron)", boxShadow: "0 0 8px var(--saffron)" }} />
        <span style={{ color: "var(--cream)", fontSize: 13, fontWeight: 500, letterSpacing: "-0.005em" }}>5 Founder spots open</span>
      </div>
      <a href="#cta" style={{
        padding: "10px 16px",
        borderRadius: 999,
        background: "var(--cream)",
        color: "var(--ink)",
        fontSize: 13, fontWeight: 600,
        display: "inline-flex", alignItems: "center", gap: 8,
        whiteSpace: "nowrap",
      }}>
        Book a demo <Icon.arrow style={{ width: 12, height: 12 }} />
      </a>
    </div>
  );
}

/* ───────────── TESTIMONIALS, social proof before pricing ───────────── */
function TestimonialAvatar({ src, name, accent }) {
  const [ok, setOk] = useState(true);
  const initials = name.split(" ").map((w) => w[0]).slice(0, 2).join("");
  return (
    <div style={{
      width: 52, height: 52, borderRadius: "50%", flexShrink: 0, overflow: "hidden",
      background: accent, color: "white",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "var(--display)", fontWeight: 600, fontSize: 18, letterSpacing: "-0.02em",
      boxShadow: "0 8px 20px -10px rgba(42,31,24,0.4)",
    }}>
      {ok
        ? <img src={src} alt={`${name}, café owner`} onError={() => setOk(false)}
               style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        : <span aria-hidden="true">{initials}</span>}
    </div>
  );
}

function Stars({ n = 5 }) {
  return (
    <div style={{ display: "inline-flex", gap: 2 }} aria-label={`${n} out of 5 stars`} role="img">
      {Array.from({ length: n }).map((_, i) => (
        <Icon.star key={i} style={{ color: "var(--saffron)", width: 15, height: 15 }} />
      ))}
    </div>
  );
}

function TestimonialsSection() {
  const stories = [
    {
      quote: "We stopped renting our regulars from delivery apps. Direct orders are up, and people actually chase the streak, they tell me they came in just to keep it alive.",
      name: "Elena Moretti", role: "Owner · Caffè Lumo, Brooklyn",
      img: "assets/testimonials/elena-moretti.jpg", accent: "var(--terra)",
    },
    {
      quote: "The AI nudges me when a Tuesday's going to be slow and writes the happy-hour post for me. I approve it on my phone between orders. It feels like having a marketing person I can't afford.",
      name: "David Okonkwo", role: "Owner · Jollof & Co, Houston",
      img: "assets/testimonials/david-okonkwo.jpg", accent: "var(--plum)",
    },
    {
      quote: "Customers used to visit once and vanish. Now I can see who's fading and bring them back before I lose them. My mornings finally feel predictable.",
      name: "Mei Tanaka", role: "Owner · Hojicha House, Seattle",
      img: "assets/testimonials/mei-tanaka.jpg", accent: "var(--rose)",
    },
  ];

  const metrics = [
    { v: "+38%", l: "repeat visits" },
    { v: "2.4×", l: "direct orders" },
    { v: "14 days", l: "to launch" },
    { v: "0%", l: "order commissions" },
  ];

  return (
    <section className="section grain grain-soft" id="stories" style={{ background: "var(--sand)" }}>
      <div className="container" style={{ position: "relative", zIndex: 3 }}>
        <div style={{ textAlign: "center", maxWidth: 720, margin: "0 auto" }}>
          <h2 style={{ marginTop: 28, fontFamily: "var(--display)", fontWeight: 600, fontSize: "clamp(34px, 4.2vw, 56px)", letterSpacing: "-0.035em", lineHeight: 1.0 }}>
            The regulars came back.<br />
            <span className="serif-it" style={{ fontWeight: 400, color: "var(--terra)" }}>So did the margins.</span>
          </h2>
          <p style={{ marginTop: 22, fontSize: 16, color: "var(--ink-soft)" }}>
            What changes when your café remembers every customer, and knows exactly who to bring back next.
          </p>
        </div>

        {/* outcome metric band */}
        <div className="r-4" style={{ marginTop: 56, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
          {metrics.map((m) => (
            <div key={m.l} className="card-hover" style={{
              padding: "24px 20px", borderRadius: 18, textAlign: "center",
              background: "rgba(252,247,236,0.92)", backdropFilter: "blur(14px)",
              border: "1px solid rgba(42,31,24,0.08)",
              boxShadow: "0 14px 30px -22px rgba(42,31,24,0.16)",
            }}>
              <div style={{ fontFamily: "var(--display)", fontWeight: 600, fontSize: 40, letterSpacing: "-0.04em", lineHeight: 1, color: "var(--ink)" }}>{m.v}</div>
              <div style={{ marginTop: 8, fontSize: 12.5, color: "var(--muted)", fontFamily: "var(--mono)", letterSpacing: "0.1em", textTransform: "uppercase" }}>{m.l}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 12, textAlign: "center", fontSize: 11, fontFamily: "var(--mono)", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)" }}>
          Illustrative Founder Partner targets · your results depend on menu, market &amp; effort
        </div>

        {/* testimonial cards */}
        <div className="r-3" style={{ marginTop: 36, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }}>
          {stories.map((s) => (
            <figure key={s.name} className="card-hover" style={{
              margin: 0, position: "relative",
              padding: 28, borderRadius: 16,
              background: "rgba(252,247,236,0.95)", backdropFilter: "blur(14px)",
              border: "1px solid rgba(42,31,24,0.08)",
              boxShadow: "0 20px 50px -30px rgba(42,31,24,0.18)",
              display: "flex", flexDirection: "column",
            }}>
              {/* big quote mark */}
              <div aria-hidden="true" style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: 64, lineHeight: 0.5, color: "var(--terra)", opacity: 0.35, height: 30 }}>&ldquo;</div>
              <Stars n={5} />
              <blockquote className="serif-it" style={{ margin: "16px 0 0", fontSize: 19, lineHeight: 1.4, color: "var(--ink)", letterSpacing: "-0.01em", flex: 1 }}>
                {s.quote}
              </blockquote>
              <figcaption style={{ marginTop: 24, paddingTop: 20, borderTop: "1px solid var(--hairline)", display: "flex", alignItems: "center", gap: 14 }}>
                <TestimonialAvatar src={s.img} name={s.name} accent={s.accent} />
                <div>
                  <div style={{ fontWeight: 600, fontSize: 15, color: "var(--ink)" }}>{s.name}</div>
                  <div style={{ fontSize: 12.5, color: "var(--muted)" }}>{s.role}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────── FAQ, objection handling before the final CTA ───────────── */
function FAQItem({ q, a, open, onToggle, id }) {
  return (
    <div style={{
      borderRadius: 16, overflow: "hidden",
      background: open ? "rgba(252,247,236,0.94)" : "rgba(255,255,255,0.4)",
      border: "1px solid " + (open ? "rgba(214,122,69,0.3)" : "var(--hairline)"),
      transition: "background .25s, border-color .25s",
    }}>
      <button
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={`faq-panel-${id}`}
        id={`faq-btn-${id}`}
        style={{
          width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16,
          padding: "20px 22px", textAlign: "left", background: "transparent",
          fontFamily: "var(--display)", fontWeight: 600, fontSize: 17, letterSpacing: "-0.02em", color: "var(--ink)",
        }}
      >
        {q}
        <span aria-hidden="true" style={{
          flexShrink: 0, width: 26, height: 26, borderRadius: "50%",
          border: "1px solid var(--hairline)", display: "inline-flex", alignItems: "center", justifyContent: "center",
          color: "var(--terra)", transform: open ? "rotate(45deg)" : "none", transition: "transform .25s",
        }}><Icon.plus style={{ width: 13, height: 13 }} /></span>
      </button>
      <div
        id={`faq-panel-${id}`}
        role="region"
        aria-labelledby={`faq-btn-${id}`}
        style={{
          maxHeight: open ? 240 : 0, overflow: "hidden",
          transition: "max-height .35s cubic-bezier(.2,.7,.2,1)",
        }}
      >
        <p style={{ margin: 0, padding: "0 22px 22px", fontSize: 14.5, lineHeight: 1.6, color: "var(--ink-soft)", maxWidth: 620 }}>{a}</p>
      </div>
    </div>
  );
}

function FAQSection() {
  const [open, setOpen] = useState(0);
  const faqs = [
    { q: "How long until we're live?", a: "Most cafés launch within 14 days. We build your loyalty system, rewards, and QR menu with you, you approve, we ship. No long onboarding, no blank screens." },
    { q: "Will my customers actually use it?", a: "There's no app store to fight. Customers join from a QR code and use it from the web, rewards they can feel, a streak worth keeping, and offers that land at the right moment. Adoption is the whole design." },
    { q: "Do I need to replace my POS?", a: "No. Aura runs alongside whatever you use today. Direct QR ordering is commission-free, so the orders you bring in stay yours, margin and all." },
    { q: "Is there a long contract?", a: "Plans are month-to-month and you can cancel anytime. Founder Partners simply lock in early pricing, there's no multi-year commitment." },
    { q: "Who sets everything up?", a: "We do. Launch setup is done-for-you: rewards, offers, QR menu, branding, and your first campaigns, all configured and reviewed with you before you go live." },
    { q: "Who owns the customer data?", a: "You do. Always. Names, emails, phone numbers, birthdays, favorites, and visit history belong to your business, not a delivery platform, not us." },
  ];

  return (
    <section className="section grain grain-soft" id="faq" style={{ background: "var(--cream)" }}>
      <div className="container">
        <div className="r-split" style={{ display: "grid", gridTemplateColumns: "0.9fr 1.1fr", gap: 64, alignItems: "start" }}>
          <div className="r-unstick" style={{ position: "sticky", top: 110 }}>
            <h2 style={{ marginTop: 28, fontFamily: "var(--display)", fontWeight: 600, fontSize: "clamp(34px, 4vw, 54px)", letterSpacing: "-0.035em", lineHeight: 1.0 }}>
              Everything you're<br />
              <span className="serif-it" style={{ fontWeight: 400, color: "var(--terra)" }}>probably wondering.</span>
            </h2>
            <p style={{ marginTop: 24, fontSize: 16, lineHeight: 1.55, color: "var(--ink-soft)", maxWidth: 380 }}>
              Still unsure? A 20-minute growth demo answers the rest, no commitment, no pressure.
            </p>
            <a href="#cta" className="btn-primary" style={{ marginTop: 24 }}>
              Book a free growth demo <span className="arrow-circle" aria-hidden="true">→</span>
            </a>
          </div>

          <div style={{ display: "grid", gap: 10 }}>
            {faqs.map((f, i) => (
              <FAQItem key={i} id={i} q={f.q} a={f.a} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { DashboardSection, SocialGrowthSection, HowItWorksSection, TestimonialsSection, PricingSection, FAQSection, FinalCTASection, Footer, MobileStickyCTA });
