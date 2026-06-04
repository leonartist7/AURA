/* AURA sections A, Hero, Problem (sticky pin), Solution */

/* ───────────── HERO ───────────── */
function HeroSection({ headline }) {
  return (
    <section id="top" className="section grain grain-soft" style={{ paddingTop: 180, paddingBottom: 60, background: "var(--cream)" }}>
      {/* real café atmosphere, right-anchored + feathered into cream so the headline stays clean */}
      <div className="hide-mobile" style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
        <BrandPhoto src="/assets/brand/hero-scene.jpg" alt="A warm, sunlit café interior" eager grade={0.1} fallback={null}
          style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "58%", borderRadius: 0, opacity: 0.85 }} />
        <div style={{ position: "absolute", inset: 0,
          background: "linear-gradient(90deg, var(--cream) 30%, rgba(243,234,215,0.55) 52%, transparent 78%)" }} />
        <div style={{ position: "absolute", inset: 0,
          background: "linear-gradient(0deg, var(--cream), transparent 22%, transparent 80%, var(--cream))" }} />
      </div>
      {/* very subtle warm glow */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
        <div style={{
          position: "absolute", left: "50%", top: "30%", transform: "translate(-50%,-50%)",
          width: "120%", height: 700,
          background: "radial-gradient(ellipse at center, rgba(214,122,69,0.22), rgba(229,177,74,0.12) 35%, transparent 60%)",
          filter: "blur(20px)"
        }} />
        <div style={{
          position: "absolute", right: "-10%", top: "10%",
          width: 480, height: 480, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(220,139,126,0.28), transparent 60%)",
          filter: "blur(40px)"
        }} />
      </div>

      <div className="container" style={{ position: "relative", zIndex: 3 }}>
        <div className="r-hero" style={{ display: "grid", gridTemplateColumns: "1.05fr 0.95fr", gap: 60, alignItems: "center", minHeight: "calc(100vh - 280px)" }}>
          {/* LEFT, copy */}
          <div>
            <div className="eyebrow">AI loyalty, ordering & marketing for cafés & restaurants</div>

            <h1 style={{ marginTop: 28, fontFamily: "var(--display)", fontWeight: 600, fontSize: "clamp(46px, 6vw, 84px)", letterSpacing: "-0.04em", lineHeight: 1.0 }}>
              Turn first-time visitors<br />
              into <span className="serif-it" style={{ fontWeight: 400, color: "var(--terra)", fontSize: "1.04em" }}>regulars.</span>
            </h1>

            <p className="serif-it" style={{ marginTop: 18, fontSize: 22, color: "var(--ink)", opacity: 0.75, letterSpacing: "-0.01em" }}>
              Create a quiet ritual they come back for.
            </p>

            <p style={{ marginTop: 22, maxWidth: 480, fontSize: 17, lineHeight: 1.55, color: "var(--ink-soft)" }}>
              A branded loyalty system, smart promotions, and direct ordering that turn first-time visits into regular ones.
            </p>

            <div style={{ marginTop: 32, display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a href="#cta" className="btn-primary">Book a free growth demo <span className="arrow-circle">→</span></a>
              <a href="#app" className="btn-secondary">See the experience</a>
            </div>
          </div>

          {/* RIGHT, phone + 3 carefully placed notifs (not a cluttered cluster) */}
          <div style={{ position: "relative", height: 680, pointerEvents: "none" }}>
            <div style={{
              position: "absolute", left: "50%", top: 0, transform: "translateX(-50%)",
              width: 320, height: 680
            }}>
              <div style={{
                position: "absolute", inset: -60,
                background: "radial-gradient(ellipse at 50% 40%, rgba(214,122,69,0.45), transparent 60%)",
                filter: "blur(50px)"
              }} />
              <div style={{ position: "relative", animation: "float-y-2 8s ease-in-out infinite" }}>
                <Phone scale={0.94}><ScreenHome /></Phone>
              </div>
            </div>

            {/* Just three notifs, well-spaced, calmer (hidden on mobile to avoid overlap) */}
            <div className="hide-mobile" style={{ position: "absolute", top: 100, left: -10, animation: "float-y 7s ease-in-out infinite" }}>
              <NotifCard icon={<Icon.bag />} accent="var(--terra)" label="+27 direct orders" sub="9:14 AM · pickup" />
            </div>
            <div className="hide-mobile" style={{ position: "absolute", top: 340, left: -40, animation: "float-y-2 8s ease-in-out infinite -2s" }}>
              <NotifCard icon={<Icon.crown />} accent="var(--plum)" label="VIP unlocked" sub="Maya R. · Gold tier" />
            </div>
            <div className="hide-mobile" style={{ position: "absolute", top: 500, right: -10, animation: "float-y 7s ease-in-out infinite -3s" }}>
              <NotifCard icon={<Icon.fire />} accent="var(--rose)" label="Happy hour live" sub="2-4 PM" />
            </div>
          </div>
        </div>

        {/* trust strip, no fake names */}
        <div style={{ marginTop: 80, paddingTop: 28, borderTop: "1px solid var(--hairline)", display: "flex", justifyContent: "space-between", gap: 32, flexWrap: "wrap", alignItems: "center" }}>
          <span style={{ color: "var(--muted)", fontSize: 11, fontFamily: "var(--mono)", letterSpacing: "0.16em", textTransform: "uppercase" }}>Built for independent cafés & restaurants</span>
          <span className="serif-it" style={{ color: "var(--ink)", opacity: 0.7, fontSize: 18, letterSpacing: "-0.01em" }}>
            Founder Partner spots open for <strong style={{ fontStyle: "normal", fontFamily: "var(--display)", fontWeight: 600, color: "var(--terra)" }}>5</strong> early businesses.
          </span>
        </div>
      </div>
    </section>);

}

/* ───────────── PROBLEM, sticky pinned, leak viz, rotating pain text ───────────── */
function ProblemSection() {
  const pains = [
  { i: <Icon.chart />, t: "Delivery platforms take 15-30% of every order.", s: "Every order through someone else's app shrinks your margin." },
  { i: <Icon.globe />, t: "Social media decides who sees you.", s: "Reach you earned in months can vanish overnight." },
  { i: <Icon.rotate />, t: "A great first visit isn't enough.", s: "Most customers come once and forget you exist." },
  { i: <Icon.spark />, t: "Promotions are guesswork.", s: "Posters, last-minute posts, hopeful discounts, no system, no learning." },
  { i: <Icon.bookmark />, t: "Punch cards belong to a different decade.", s: "Paper, stickers, lost wallets. Customers want progress." },
  { i: <Icon.users />, t: "You don't own the customer relationship.", s: "No emails, no phone numbers, no way to reach them on your terms." }];


  return (
    <section className="grain grain-soft" id="problem" data-pin-problem style={{ position: "relative", background: "var(--sand)", minHeight: "260vh" }}>
      <div style={{ position: "sticky", top: 0, height: "100vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
        <div className="container" style={{ position: "relative", zIndex: 3 }}>
          <div className="r-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
            {/* LEFT, the framing */}
            <div>
              <div className="eyebrow">The real problem</div>
              <h2 style={{ marginTop: 28, fontFamily: "var(--display)", fontWeight: 600, fontSize: "clamp(36px, 4.6vw, 64px)", letterSpacing: "-0.035em", lineHeight: 1.0, color: "var(--ink)" }}>
                Most restaurants don't have a customer problem.
              </h2>
              <h3 style={{ marginTop: 18, fontFamily: "var(--serif)", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(34px, 4.4vw, 60px)", letterSpacing: "-0.02em", lineHeight: 1.0, color: "var(--terra)" }}>
                They have a retention problem.
              </h3>
              <p style={{ marginTop: 28, maxWidth: 480, fontSize: 16, lineHeight: 1.55, color: "var(--ink-soft)" }}>
                People visit once, order once, follow once, then disappear. Delivery apps take the margin. Social platforms hide your posts. Punch cards get lost. Aura helps you build a system that remembers customers and brings them back.
              </p>
              <p style={{ marginTop: 20, padding: "14px 18px", borderRadius: 12, background: "rgba(214,122,69,0.1)", border: "1px solid rgba(214,122,69,0.28)", maxWidth: 480, fontSize: 15, lineHeight: 1.5, color: "var(--ink)", fontWeight: 500 }}>
                <span className="serif-it" style={{ fontSize: 17, color: "var(--terra)" }}>If customers don't return,</span> every new sale becomes expensive.
              </p>

              {/* margin-flow visualization, literal & labeled */}
              <div data-comment-anchor="30797eb741-svg-130-17" style={{ marginTop: 36, padding: "20px 22px", borderRadius: 14, background: "rgba(255,255,255,0.4)", border: "1px solid var(--hairline)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", fontFamily: "var(--mono)", fontSize: 10.5, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted)" }}>
                  <span>Out of every $100 a customer spends</span>
                  <span style={{ color: "var(--ink)" }}>you keep $51</span>
                </div>

                <div style={{ marginTop: 14, display: "flex", height: 30, borderRadius: 6, overflow: "hidden", boxShadow: "inset 0 0 0 1px var(--hairline)" }}>
                  <div style={{ flex: 22, background: "rgba(214,122,69,0.32)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 600, color: "var(--ink)" }}>−$22</div>
                  <div style={{ flex: 15, background: "rgba(141,107,141,0.28)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 600, color: "var(--ink)" }}>−$15</div>
                  <div style={{ flex: 12, background: "rgba(220,139,126,0.32)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 600, color: "var(--ink)" }}>−$12</div>
                  <div style={{ flex: 51, background: "var(--terra)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 600, color: "white", letterSpacing: "-0.01em" }}>$51 you</div>
                </div>

                <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px 18px", fontSize: 12.5, lineHeight: 1.4 }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--ink-soft)" }}>
                      <span style={{ width: 8, height: 8, borderRadius: 2, background: "rgba(214,122,69,0.6)" }} />
                      <strong style={{ color: "var(--ink)", fontWeight: 600 }}>Delivery apps</strong>
                    </div>
                    <div style={{ color: "var(--muted)", marginTop: 2 }}>15-30% commission per order</div>
                  </div>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--ink-soft)" }}>
                      <span style={{ width: 8, height: 8, borderRadius: 2, background: "rgba(141,107,141,0.6)" }} />
                      <strong style={{ color: "var(--ink)", fontWeight: 600 }}>Buying back reach</strong>
                    </div>
                    <div style={{ color: "var(--muted)", marginTop: 2 }}>ads to find people who already know you</div>
                  </div>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--ink-soft)" }}>
                      <span style={{ width: 8, height: 8, borderRadius: 2, background: "rgba(220,139,126,0.6)" }} />
                      <strong style={{ color: "var(--ink)", fontWeight: 600 }}>One-time visitors</strong>
                    </div>
                    <div style={{ color: "var(--muted)", marginTop: 2 }}>lifetime value you never get to earn</div>
                  </div>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--terra)" }}>
                      <span style={{ width: 8, height: 8, borderRadius: 2, background: "var(--terra)" }} />
                      <strong style={{ color: "var(--ink)", fontWeight: 600 }}>What's left</strong>
                    </div>
                    <div style={{ color: "var(--muted)", marginTop: 2 }}>before rent, staff, supplies</div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT, rotating pain cards (controlled by scroll) */}
            <div data-pain-stack style={{ position: "relative", height: 460 }}>
              {/* index marker */}
              <div data-pain-idx-wrap style={{ position: "absolute", top: 0, right: 0, fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.14em", color: "var(--muted)" }}>
                <span data-pain-idx>01</span> / <span>06</span>
              </div>

              {pains.map((p, i) =>
              <div key={i} data-pain-card data-idx={i} style={{
                position: "absolute",
                inset: 0,
                display: "flex", flexDirection: "column", justifyContent: "center",
                opacity: i === 0 ? 1 : 0,
                transform: i === 0 ? "none" : "translateY(28px)",
                transition: "opacity .8s, transform .8s",
                padding: "0 4px"
              }}>
                  <div style={{
                  width: 56, height: 56, borderRadius: 16,
                  background: "rgba(252,247,236,0.92)",
                  border: "1px solid rgba(42,31,24,0.08)",
                  backdropFilter: "blur(16px)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "var(--terra)"
                }}>{p.i}</div>
                  <h4 style={{ marginTop: 26, fontFamily: "var(--display)", fontWeight: 600, fontSize: "clamp(28px, 3.2vw, 44px)", letterSpacing: "-0.025em", lineHeight: 1.1, color: "var(--ink)" }}>{p.t}</h4>
                  <p style={{ marginTop: 14, maxWidth: 460, fontSize: 17, lineHeight: 1.5, color: "var(--ink-soft)" }}>{p.s}</p>
                </div>
              )}

              {/* progress dots */}
              <div data-pain-dots style={{ position: "absolute", bottom: 0, left: 0, display: "flex", gap: 6 }}>
                {pains.map((_, i) =>
                <span key={i} data-pain-dot data-idx={i} style={{
                  width: 22, height: 3, borderRadius: 2,
                  background: i === 0 ? "var(--terra)" : "rgba(42,31,24,0.15)",
                  transition: "background .4s"
                }} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);

}

/* ───────────── SOLUTION ───────────── */
function SolutionSection() {
  const features = [
  { tag: "Loyalty", title: "Digital loyalty", copy: "Points, rewards, VIP tiers, birthdays, and repeat-visit bonuses, without paper cards.", accent: "var(--terra)", mock: <MockLoyalty /> },
  { tag: "AI", title: "AI promotions", copy: "Campaign ideas for slow hours, happy hours, and quiet customers, drafted and ready to launch.", accent: "var(--plum)", mock: <MockAIIdea /> },
  { tag: "Ordering", title: "Direct ordering", copy: "QR menus and pickup ordering that help customers order directly from you, commission-free.", accent: "var(--saffron)", img: "/assets/brand/card-ordering.jpg", imgAlt: "A coffee and pastry on a café table with a phone QR menu" },
  { tag: "Game", title: "Gamified rewards", copy: "Spins, streaks, mystery perks, badges, and challenges that make loyalty feel alive.", accent: "var(--rose)", mock: <MockSpinTile /> },
  { tag: "Data", title: "Customer database", copy: "Names, birthdays, favorite items, phone numbers, and visit history, owned by you.", accent: "var(--sage)", img: "/assets/brand/card-regulars.jpg", imgAlt: "A barista chatting with a regular over the counter" },
  { tag: "Growth", title: "Social growth", copy: "Campaigns, content ideas, and local ads designed to turn attention into visits.", accent: "var(--honey)", img: "/assets/brand/card-social.jpg", imgAlt: "Overhead flat-lay of latte art being photographed for social" }];


  return (
    <section className="section grain grain-soft" id="solution" style={{ background: "var(--cream-warm)" }}>
      <div className="container">
        <div style={{ textAlign: "center", maxWidth: 680, margin: "0 auto 72px" }}>
          <h2 style={{ fontFamily: "var(--display)", fontWeight: 600, fontSize: "clamp(36px, 4.4vw, 60px)", letterSpacing: "-0.035em", lineHeight: 1.04, textWrap: "balance" }}>
            Everything you need to <span className="serif-it" style={{ fontWeight: 400, color: "var(--terra)" }}>bring customers back.</span>
          </h2>
          <p style={{ marginTop: 18, fontSize: 17, lineHeight: 1.55, color: "var(--ink-soft)", maxWidth: "52ch", marginInline: "auto" }}>
            Six connected systems that turn visits, orders, and promotions into repeat revenue.
          </p>
        </div>

        <div className="r-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }}>
          {features.map((f, i) =>
          <div key={i} className="card-hover" style={{
            position: "relative",
            padding: 26,
            borderRadius: 16,
            background: "rgba(252,247,236,0.94)",
            backdropFilter: "blur(14px)",
            border: "1px solid rgba(42,31,24,0.08)",
            boxShadow: "0 30px 60px -40px rgba(42,31,24,0.18)",
            overflow: "hidden",
            minHeight: 360,
            display: "flex", flexDirection: "column"
          }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{
                width: 10, height: 10, borderRadius: 3,
                background: f.accent,
                boxShadow: `0 0 18px ${f.accent}`
              }} />
                <span className="mono" style={{ color: "var(--muted)" }}>{f.tag}</span>
              </div>
              <h3 style={{ fontFamily: "var(--display)", fontSize: 24, fontWeight: 600, letterSpacing: "-0.025em", marginTop: 30, lineHeight: 1.1 }}>
                {f.title}
              </h3>
              <p style={{ fontSize: 14, lineHeight: 1.55, color: "var(--ink-soft)", marginTop: 10 }}>{f.copy}</p>
              <div style={{ marginTop: "auto", paddingTop: 22 }}>
                {f.img
                  ? <BrandPhoto src={f.img} alt={f.imgAlt} radius={12} grade={0.16} style={{ aspectRatio: "16 / 10" }}
                      fallback={<div style={{ aspectRatio: "16 / 10", borderRadius: 12, background: "linear-gradient(135deg, rgba(214,122,69,0.1), rgba(141,107,141,0.08))", border: "1px solid rgba(42,31,24,0.06)" }} />} />
                  : f.mock}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>);

}

/* ───────── solution mocks, warm-only ───────── */
function MockLoyalty() {
  return (
    <div style={{ padding: 14, borderRadius: 14, background: "linear-gradient(135deg, rgba(214,122,69,0.12), rgba(220,139,126,0.08))", border: "1px solid rgba(42,31,24,0.06)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10.5, color: "var(--muted)", fontFamily: "var(--mono)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
        <span>Tier</span><span>1,284 pts</span>
      </div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginTop: 4 }}>
        <span style={{ fontFamily: "var(--display)", fontSize: 22, fontWeight: 600, letterSpacing: "-0.03em" }}>Silver →</span>
        <span style={{ fontFamily: "var(--display)", fontSize: 22, fontWeight: 600, letterSpacing: "-0.03em", color: "var(--terra)" }}>Gold</span>
      </div>
      <div style={{ height: 5, borderRadius: 999, background: "rgba(42,31,24,0.08)", marginTop: 10, overflow: "hidden" }}>
        <div style={{ width: "72%", height: "100%", background: "linear-gradient(90deg, var(--terra), var(--saffron))" }} />
      </div>
    </div>);

}
function MockAIIdea() {
  return (
    <div style={{ padding: 14, borderRadius: 14, background: "var(--ink)", color: "var(--cream)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ width: 20, height: 20, borderRadius: 6, background: "linear-gradient(135deg,var(--plum),var(--terra))", display: "flex", alignItems: "center", justifyContent: "center" }}><Icon.spark style={{ width: 11, height: 11 }} /></div>
        <span style={{ fontFamily: "var(--mono)", fontSize: 9.5, opacity: 0.6, letterSpacing: "0.14em", textTransform: "uppercase" }}>Aura suggests</span>
      </div>
      <div style={{ fontSize: 13, lineHeight: 1.45, marginTop: 8 }}>"Tuesday 2-5 PM is slow. 20% iced latte happy hour to customers within 3 km?"</div>
      <div style={{ display: "flex", gap: 6, marginTop: 10 }}>
        <span style={{ padding: "4px 9px", borderRadius: 999, background: "var(--cream)", color: "var(--ink)", fontSize: 11, fontWeight: 600 }}>Approve</span>
        <span style={{ padding: "4px 9px", borderRadius: 999, border: "1px solid rgba(243,234,215,0.18)", color: "var(--cream)", fontSize: 11 }}>Edit</span>
      </div>
    </div>);

}
function MockOrders() {
  return (
    <div style={{ display: "grid", gap: 6 }}>
      {[
      { n: "Oat Latte ×2", p: "$10.80" },
      { n: "Cardamom Bun", p: "$4.20" },
      { n: "Cold Brew", p: "$5.20" }].
      map((r) =>
      <div key={r.n} style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5, padding: "7px 11px", background: "rgba(42,31,24,0.04)", borderRadius: 9 }}>
          <span>{r.n}</span><span style={{ fontWeight: 600 }}>{r.p}</span>
        </div>
      )}
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5, padding: "9px 11px", background: "var(--ink)", color: "var(--cream)", borderRadius: 9, marginTop: 2 }}>
        <span>Pickup · 9:14</span><span style={{ fontWeight: 600 }}>$20.20</span>
      </div>
    </div>);

}
function MockSpinTile() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14, padding: 12, borderRadius: 14, background: "linear-gradient(135deg, rgba(220,139,126,0.16), rgba(229,177,74,0.12))" }}>
      <div style={{ position: "relative", width: 56, height: 56, flexShrink: 0 }}>
        <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%", animation: "spin-slow 16s linear infinite" }}>
          {["#D67A45", "#DC8B7E", "#8D6B8D", "#E5B14A", "#9DAA7E", "#DC8B7E", "#8D6B8D", "#D67A45"].map((c, i) => {
            const a1 = i / 8 * Math.PI * 2 - Math.PI / 2;
            const a2 = (i + 1) / 8 * Math.PI * 2 - Math.PI / 2;
            const x1 = 50 + 48 * Math.cos(a1),y1 = 50 + 48 * Math.sin(a1);
            const x2 = 50 + 48 * Math.cos(a2),y2 = 50 + 48 * Math.sin(a2);
            return <path key={i} d={`M50 50 L${x1} ${y1} A48 48 0 0 1 ${x2} ${y2} Z`} fill={c} />;
          })}
          <circle cx="50" cy="50" r="12" fill="var(--ink)" />
        </svg>
      </div>
      <div>
        <div style={{ fontWeight: 600, fontSize: 13.5 }}>Daily spin</div>
        <div style={{ fontSize: 11.5, color: "var(--muted)" }}>3 prizes left today</div>
      </div>
    </div>);

}
function MockCustomers() {
  return (
    <div style={{ display: "grid", gap: 5 }}>
      {[
      { i: "MR", n: "Maya Rivera", l: "Gold · 4 visits", c: "var(--terra)" },
      { i: "AJ", n: "Aiden Jung", l: "Silver · birthday Fri", c: "var(--plum)" },
      { i: "SK", n: "Sara Kahn", l: "New · joined Tue", c: "var(--sage)" }].
      map((r) =>
      <div key={r.n} style={{ display: "flex", alignItems: "center", gap: 9, fontSize: 12.5, padding: "6px 9px", background: "rgba(42,31,24,0.04)", borderRadius: 9 }}>
          <div style={{ width: 24, height: 24, borderRadius: 7, background: r.c, color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700 }}>{r.i}</div>
          <div>
            <div style={{ fontWeight: 500 }}>{r.n}</div>
            <div style={{ fontSize: 11, color: "var(--muted)" }}>{r.l}</div>
          </div>
        </div>
      )}
    </div>);

}
function MockSocial() {
  return (
    <div style={{ padding: 12, borderRadius: 14, background: "linear-gradient(135deg, rgba(229,177,74,0.14), rgba(214,122,69,0.08))" }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10.5, color: "var(--muted)", fontFamily: "var(--mono)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
        <span>@cafemira</span>
        <span style={{ color: "var(--terra)" }}>↗ +24%</span>
      </div>
      <svg viewBox="0 0 200 50" style={{ width: "100%", height: 46, marginTop: 4 }}>
        <defs>
          <linearGradient id="grw" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#D67A45" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#D67A45" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M0 40 C 30 38, 50 30, 70 28 S 110 22, 130 18 S 170 12, 200 8 L 200 50 L 0 50 Z" fill="url(#grw)" />
        <path d="M0 40 C 30 38, 50 30, 70 28 S 110 22, 130 18 S 170 12, 200 8" stroke="var(--terra)" strokeWidth="1.6" fill="none" />
      </svg>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11.5, marginTop: 2 }}>
        <span style={{ color: "var(--muted)" }}>Reach</span>
        <span style={{ fontWeight: 600 }}>14.2k · +318</span>
      </div>
    </div>);

}

Object.assign(window, { HeroSection, ProblemSection, SolutionSection });