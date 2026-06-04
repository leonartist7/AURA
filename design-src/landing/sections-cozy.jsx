/* AURA, "After hours" cozy digital space, pinned cinematic cycle.
   3 storyteller moments anchor the relationship the product creates. */

function CozySpaceSection() {
  return (
    <section
      id="cozy"
      data-pin-cozy
      style={{
        position: "relative",
        background: "var(--espresso)",
        color: "var(--cream)",
        minHeight: "220vh",  // 3 storyteller moments, ~73vh each, cinematic without bloat
      }}
    >
      {/* sticky stage that pins through the cycle */}
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>
        {/* real night-café photo, sunk behind the candle gradients for cinematic depth */}
        <BrandPhoto src="/assets/brand/cozy-night.jpg" alt="A dim café after closing, warm light" fill grade={0.55} fallback={null}
          imgStyle={{ opacity: 0.5 }} />
        <div style={{ position: "absolute", inset: 0, background: "var(--espresso)", opacity: 0.45, pointerEvents: "none" }} />
        {/* candle warmth */}
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse 600px 700px at 70% 50%, rgba(232,172,88,0.32), transparent 65%), radial-gradient(ellipse 800px 600px at 20% 80%, rgba(214,122,69,0.22), transparent 60%), radial-gradient(ellipse 700px 500px at 80% 0%, rgba(141,107,141,0.2), transparent 60%)",
          pointerEvents: "none",
        }} />
        {/* film grain */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.4 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
          opacity: 0.14,
          mixBlendMode: "screen",
          pointerEvents: "none",
        }} />
        {/* candle flicker */}
        <div style={{ position: "absolute", inset: 0, opacity: 0.5, pointerEvents: "none" }}>
          <GradientRibbons variant="candle" opacity={0.7} />
        </div>

        <div className="container" style={{ position: "relative", zIndex: 3, height: "100%" }}>
          <div className="r-hero" style={{ display: "grid", gridTemplateColumns: "1.05fr 0.95fr", gap: 60, alignItems: "center", height: "100%" }}>
            {/* LEFT, cycling copy */}
            <div data-cozy-stack style={{ position: "relative", height: 420 }}>
              <div className="eyebrow" style={{ color: "rgba(243,234,215,0.65)" }}>
                <span className="dot" style={{ background: "var(--saffron)", boxShadow: "0 0 10px var(--saffron)" }} /> After hours
              </div>

              {[
                {
                  k: "01",
                  small: "The lights are off in the café.",
                  big: <>Even after they leave,<br /><span className="serif-it" style={{ color: "var(--saffron)" }}>your café stays with them.</span></>,
                  body: "When the espresso machine cools down, Aura keeps your brand in their pocket, a quiet, branded space your regulars carry home.",
                },
                {
                  k: "02",
                  small: "Sunday evening, 9:47 PM.",
                  big: <>A reminder, <span className="serif-it" style={{ color: "var(--saffron)" }}>not a pitch.</span></>,
                  body: "A streak nudge. A perk waiting. A reason to swing by tomorrow. The kind of message a regular actually wants to receive.",
                },
                {
                  k: "03",
                  small: "Monday morning, before the rush.",
                  big: <>They open the app.<br /><span className="serif-it" style={{ color: "var(--saffron)" }}>You're already there.</span></>,
                  body: "Their usual order. A reward two visits away. A streak worth keeping. The day starts inside your world.",
                },
              ].map((line, i) => (
                <div key={line.k} data-cozy-line data-idx={i} style={{
                  position: "absolute", inset: "40px 0 30px 0",
                  opacity: i === 0 ? 1 : 0,
                  transform: i === 0 ? "translateY(0)" : "translateY(24px)",
                  transition: "opacity 1s cubic-bezier(.2,.7,.2,1), transform 1s cubic-bezier(.2,.7,.2,1)",
                }}>
                  <div style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.16em", color: "rgba(243,234,215,0.55)", textTransform: "uppercase" }}>{line.k}  ·  {line.small}</div>
                  <h2 style={{
                    marginTop: 22,
                    fontFamily: "var(--display)",
                    fontWeight: 500,
                    fontSize: "clamp(40px, 4.6vw, 64px)",
                    letterSpacing: "-0.035em",
                    lineHeight: 1.04,
                    color: "var(--cream)",
                  }}>{line.big}</h2>
                  <p style={{ marginTop: 22, maxWidth: 480, fontSize: 16, lineHeight: 1.55, color: "rgba(243,234,215,0.72)" }}>{line.body}</p>
                </div>
              ))}

              {/* progress dots, bottom of left col */}
              <div data-cozy-dots style={{ position: "absolute", bottom: 0, left: 0, display: "flex", gap: 6 }}>
                {[0, 1, 2].map((i) => (
                  <span key={i} data-cozy-dot data-idx={i} style={{
                    width: 26, height: 3, borderRadius: 2,
                    background: i === 0 ? "var(--saffron)" : "rgba(243,234,215,0.15)",
                    transition: "background .4s",
                  }} />
                ))}
              </div>
            </div>

            {/* RIGHT, phone in spotlight */}
            <div style={{ position: "relative", height: 640, display: "flex", justifyContent: "center", alignItems: "center" }}>
              <div style={{
                position: "absolute", inset: 0,
                background: "radial-gradient(ellipse 380px 500px at 50% 50%, rgba(232,172,88,0.4), rgba(214,122,69,0.18) 50%, transparent 70%)",
                filter: "blur(20px)",
              }} />
              <div style={{ position: "relative", animation: "float-y-2 9s ease-in-out infinite" }}>
                <Phone scale={0.92}><ScreenHome /></Phone>
                {/* steam */}
                <svg style={{ position: "absolute", top: -70, left: "50%", transform: "translateX(-50%)", pointerEvents: "none" }} width="120" height="70">
                  <defs>
                    <filter id="steamblur"><feGaussianBlur stdDeviation="4" /></filter>
                  </defs>
                  <path d="M40 70 Q 30 45 50 28 Q 70 8 50 0" stroke="rgba(243,234,215,0.18)" strokeWidth="2" fill="none" filter="url(#steamblur)" />
                  <path d="M70 70 Q 80 45 60 28 Q 40 8 60 0" stroke="rgba(243,234,215,0.14)" strokeWidth="2" fill="none" filter="url(#steamblur)" />
                </svg>
              </div>

              <div style={{ position: "absolute", top: 80, right: -10, animation: "float-y 9s ease-in-out infinite -2s", zIndex: 4 }}>
                <div style={{
                  display: "flex", alignItems: "center", gap: 12,
                  padding: "12px 16px 12px 12px",
                  borderRadius: 16,
                  background: "rgba(243,234,215,0.92)",
                  border: "1px solid rgba(243,234,215,0.95)",
                  boxShadow: "0 30px 60px -25px rgba(232,172,88,0.5)",
                  color: "var(--ink)",
                  fontSize: 13,
                  fontWeight: 500,
                  whiteSpace: "nowrap",
                }}>
                  <div style={{ width: 28, height: 28, borderRadius: 9, background: "var(--saffron)", color: "white", display: "flex", alignItems: "center", justifyContent: "center" }}><Icon.coffee /></div>
                  <div>
                    <div style={{ fontWeight: 600 }}>Your usual, ready at 8:14</div>
                    <div style={{ fontSize: 11, color: "var(--muted)" }}>Café Mira · 320m away</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* faint gold serif "aura" at back */}
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          pointerEvents: "none",
          fontFamily: "var(--serif)",
          fontStyle: "italic",
          fontSize: "clamp(180px, 30vw, 440px)",
          color: "transparent",
          WebkitTextStroke: "1px rgba(232,172,88,0.08)",
          letterSpacing: "-0.03em",
          zIndex: 0,
        }}>aura</div>
      </div>
    </section>
  );
}

Object.assign(window, { CozySpaceSection });
