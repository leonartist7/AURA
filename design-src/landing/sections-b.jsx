/* AURA sections B, App Experience (curtain lift), AI (warm panel), Gamification (calmer) */

/* ───────────── APP EXPERIENCE, curtain lift over Solution ───────────── */
function AppExperienceSection() {
  return (
    <section
      className="section grain grain-soft curtain lift"
      id="app"
      data-curtain
      style={{
        background: "var(--cream)",
        paddingTop: 140,
        paddingBottom: 140,
        borderTopLeftRadius: 36,
        borderTopRightRadius: 36,
        boxShadow: "0 -40px 80px -40px rgba(42,31,24,0.18)",
        marginTop: -36,  // slight overlap with previous section
      }}
    >
      <div className="container" style={{ position: "relative", zIndex: 3 }}>
        <div className="r-2 r-end" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "end", marginBottom: 48 }}>
          <div>
            <h2 style={{ marginTop: 28, fontFamily: "var(--display)", fontWeight: 600, fontSize: "clamp(36px, 4.4vw, 60px)", letterSpacing: "-0.035em", lineHeight: 1.0 }}>
              Make every visit feel like<br />
              <span className="serif-it" style={{ fontWeight: 400, color: "var(--terra)" }}>progress.</span>
            </h2>
          </div>
          <p className="r-right" style={{ fontSize: 16, lineHeight: 1.55, color: "var(--ink-soft)", maxWidth: 440, marginLeft: "auto" }}>
            A customer-facing app that turns coffee into a quiet ritual, points you can feel, perks you can see, rewards worth coming back for.
          </p>
        </div>

        {/* Visit → Earn → Return loop strip */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 28, padding: "22px 32px", borderRadius: 999, background: "rgba(252,247,236,0.92)", border: "1px solid rgba(42,31,24,0.08)", boxShadow: "0 14px 30px -22px rgba(42,31,24,0.18)", marginBottom: 80, maxWidth: 720, marginInline: "auto" }}>
          {["Visit", "Earn", "Return"].map((step, i) => (
            <React.Fragment key={step}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ width: 28, height: 28, borderRadius: "50%", background: "var(--ink)", color: "var(--cream)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--mono)", fontSize: 11, fontWeight: 600 }}>{i + 1}</span>
                <span style={{ fontFamily: "var(--display)", fontWeight: 600, fontSize: 20, letterSpacing: "-0.02em", color: "var(--ink)" }}>{step}</span>
              </div>
              {i < 2 && <Icon.arrow style={{ color: "var(--terra)", width: 18, height: 18 }} />}
            </React.Fragment>
          ))}
        </div>

        {/* phone array */}
        <div className="r-4" style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 28,
          alignItems: "start",
        }}>
          <PhoneCard quote="Rewards Wallet, customers see how close they are to the next perk." screen={<ScreenHome />} offset={0} />
          <PhoneCard quote="Mystery Spin, surprise rewards create excitement after visits." screen={<ScreenSpin />} offset={40} />
          <PhoneCard quote="Happy Hour Offers, promote slow hours with targeted discounts." screen={<ScreenHappyHour />} offset={0} />
          <PhoneCard quote="Ritual Streak, motivate customers to return more often." screen={<ScreenStreak />} offset={40} />
        </div>

        <div style={{ marginTop: 96, paddingTop: 36, borderTop: "1px solid var(--hairline)" }}>
          <div className="r-4" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 32 }}>
            {[
              { i: <Icon.crown />,  t: "Tier progress",   q: '"2 visits to Gold."' },
              { i: <Icon.gift />,   t: "Mystery perks",   q: '"Spin for today\'s drop."' },
              { i: <Icon.coffee />, t: "Personal offers", q: '"Latte 20% off till 4."' },
              { i: <Icon.fire />,   t: "Streaks",         q: '"5-day Ritual Streak."' },
            ].map((r) => (
              <div key={r.t} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--muted)" }}>
                  {r.i}
                  <span className="mono">{r.t}</span>
                </div>
                <div className="serif-it" style={{ fontSize: 22, color: "var(--ink)", letterSpacing: "-0.01em" }}>{r.q}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PhoneCard({ screen, quote, offset = 0 }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: offset }}>
      <div style={{ position: "relative", width: 260, animation: `float-y-2 ${7 + (offset / 10)}s ease-in-out infinite ${offset === 0 ? "0s" : "-2s"}` }}>
        <div style={{
          position: "absolute", inset: -24,
          background: "radial-gradient(ellipse at 50% 60%, rgba(214,122,69,0.22), transparent 65%)",
          filter: "blur(28px)",
        }} />
        <div style={{ transform: "scale(0.8)", transformOrigin: "top center" }}>
          <Phone>{screen}</Phone>
        </div>
      </div>
      <div className="serif-it" style={{ marginTop: -130, fontSize: 17, color: "var(--ink)", textAlign: "center", maxWidth: 220, letterSpacing: "-0.01em" }}>{quote}</div>
    </div>
  );
}

/* ───────────── AI, warm cream now, calm authority ───────────── */
function AISection() {
  return (
    <section className="section grain grain-soft" id="ai" style={{ background: "var(--cream-warm)" }}>
      {/* subtle accent glow */}
      <div style={{ position: "absolute", right: -150, top: -50, width: 500, height: 500, background: "radial-gradient(circle, rgba(141,107,141,0.22), transparent 60%)", filter: "blur(50px)", zIndex: 0 }} />
      <div style={{ position: "absolute", left: -100, bottom: -100, width: 480, height: 480, background: "radial-gradient(circle, rgba(214,122,69,0.18), transparent 60%)", filter: "blur(50px)", zIndex: 0 }} />

      <div className="container" style={{ position: "relative", zIndex: 3 }}>
        <div className="r-split" style={{ display: "grid", gridTemplateColumns: "1.05fr 1fr", gap: 80, alignItems: "start" }}>
          <div>
            <h2 style={{ marginTop: 28, fontFamily: "var(--display)", fontWeight: 600, fontSize: "clamp(34px, 4.2vw, 58px)", letterSpacing: "-0.035em", lineHeight: 1.02 }}>
              Your AI growth assistant for slow hours,<br />
              <span className="serif-it" style={{ fontWeight: 400, color: "var(--terra)" }}>quiet customers,</span> and better timing.
            </h2>
            <p className="serif-it" style={{ marginTop: 18, fontSize: 20, color: "var(--ink)", opacity: 0.75, letterSpacing: "-0.01em" }}>
              Marketing that doesn’t wait for inspiration.
            </p>
            <p style={{ marginTop: 18, maxWidth: 500, fontSize: 16, lineHeight: 1.55, color: "var(--ink-soft)" }}>
              Aura watches your hours, your menu, and your customer rhythms, then drafts the next campaign before you have to think of it. <strong style={{ color: "var(--ink)", fontWeight: 600 }}>Approve campaigns in one click</strong> instead of guessing what to post next.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 40 }}>
              {[
                "Slow-hour campaigns",
                "Win back quiet regulars",
                "Birthday offer generator",
                "Review request automation",
                "Social caption ideas",
                "SMS / email / push",
              ].map((f) => (
                <div key={f} style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "12px 14px",
                  background: "rgba(252,247,236,0.92)",
                  border: "1px solid rgba(42,31,24,0.08)",
                  borderRadius: 12,
                  fontSize: 13.5,
                  color: "var(--ink)",
                }}>
                  <Icon.check style={{ color: "var(--terra)", flexShrink: 0 }} /> {f}
                </div>
              ))}
            </div>
          </div>

          {/* AI conversation panel, on warm */}
          <div className="r-unstick" style={{ position: "sticky", top: 100 }}>
            <div style={{
              position: "relative",
              padding: 26,
              borderRadius: 18,
              background: "rgba(255,255,255,0.5)",
              border: "1px solid rgba(255,255,255,0.9)",
              backdropFilter: "blur(20px)",
              boxShadow: "0 30px 70px -30px rgba(42,31,24,0.25)",
            }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{
                    width: 30, height: 30, borderRadius: 8,
                    background: "linear-gradient(135deg, var(--plum), var(--terra))",
                    display: "flex", alignItems: "center", justifyContent: "center", color: "white",
                  }}><Icon.spark style={{ width: 14, height: 14 }} /></div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)" }}>Aura AI · Suggestions</div>
                    <div style={{ fontSize: 11, color: "var(--muted)", fontFamily: "var(--mono)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Updated 2 min ago</div>
                  </div>
                </div>
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--sage)", boxShadow: "0 0 8px var(--sage)" }} />
              </div>

              <div style={{ padding: 14, borderRadius: 12, background: "rgba(42,31,24,0.04)", fontSize: 13, color: "var(--ink-soft)", marginBottom: 14, border: "1px solid var(--hairline)" }}>
                <span style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted)" }}>Context</span>
                <div style={{ marginTop: 4 }}>Café Mira · Tue 2-5 PM averages 38% below daily peak. 142 customers haven't visited in 14+ days.</div>
              </div>

              <div style={{ padding: 20, borderRadius: 16, background: "linear-gradient(135deg, rgba(214,122,69,0.18), rgba(229,177,74,0.14))", border: "1px solid rgba(214,122,69,0.3)", color: "var(--ink)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-soft)" }}>
                  <Icon.bolt style={{ width: 12, height: 12, color: "var(--terra)" }} /> Recommended
                </div>
                <div style={{ fontFamily: "var(--display)", fontSize: 22, fontWeight: 600, letterSpacing: "-0.025em", marginTop: 10, lineHeight: 1.2 }}>
                  Tuesday 2-5 PM is usually slow. Launch a 20% iced latte happy hour to customers within 3 km?
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginTop: 16, fontSize: 11.5 }}>
                  <Stat label="Audience"      v="412" />
                  <Stat label="Est. orders"   v="38-52" />
                  <Stat label="Margin impact" v="+$340" />
                </div>
                <div style={{ display: "flex", gap: 8, marginTop: 18 }}>
                  <button style={{ flex: 1, padding: "11px 0", borderRadius: 999, background: "var(--ink)", color: "var(--cream)", fontWeight: 500, fontSize: 13 }}>Approve campaign</button>
                  <button style={{ padding: "11px 16px", borderRadius: 999, border: "1px solid var(--hairline)", color: "var(--ink)", fontSize: 13, background: "transparent" }}>Edit offer</button>
                </div>
              </div>

              <div style={{ marginTop: 12, display: "grid", gap: 6 }}>
                <MiniSuggestion icon={<Icon.mail />} tint="var(--rose)"    title="Reactivate 142 quiet regulars" sub="Email · best send Thu 9 AM" />
                <MiniSuggestion icon={<Icon.gift />} tint="var(--saffron)" title="Maya's birthday is Friday"      sub="Push · pre-fill free-drink reward" />
                <MiniSuggestion icon={<Icon.star />} tint="var(--plum)"    title="Request reviews from 30 happy visitors" sub="SMS · auto-skip past responders" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, v }) {
  return (
    <div style={{ padding: "9px 11px", background: "rgba(255,255,255,0.5)", borderRadius: 9, border: "1px solid rgba(255,255,255,0.7)" }}>
      <div style={{ fontFamily: "var(--mono)", fontSize: 9.5, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted)" }}>{label}</div>
      <div style={{ fontFamily: "var(--display)", fontWeight: 600, fontSize: 17, letterSpacing: "-0.02em", marginTop: 2, color: "var(--ink)" }}>{v}</div>
    </div>
  );
}

function MiniSuggestion({ icon, tint, title, sub }) {
  return (
    <div style={{ display: "flex", gap: 11, alignItems: "center", padding: "10px 12px", borderRadius: 12, background: "rgba(255,255,255,0.4)", border: "1px solid var(--hairline)" }}>
      <div style={{ width: 28, height: 28, borderRadius: 8, background: tint, color: "white", display: "flex", alignItems: "center", justifyContent: "center" }}>{icon}</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)" }}>{title}</div>
        <div style={{ fontSize: 11.5, color: "var(--muted)" }}>{sub}</div>
      </div>
      <Icon.arrow style={{ color: "var(--muted)" }} />
    </div>
  );
}

/* ───────────── GAMIFICATION, calmer, more premium ───────────── */
function GamificationSection() {
  return (
    <section className="section grain grain-soft" id="game" style={{ background: "var(--clay)", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, zIndex: 0, opacity: 0.55, pointerEvents: "none" }}>
        <GradientRibbons variant="warm" opacity={0.85} />
      </div>

      <div className="container" style={{ position: "relative", zIndex: 3 }}>
        <div className="r-2 r-end" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "end", marginBottom: 80 }}>
          <div>
            <h2 style={{ marginTop: 28, fontFamily: "var(--display)", fontWeight: 600, fontSize: "clamp(36px, 4.4vw, 64px)", letterSpacing: "-0.035em", lineHeight: 1.0 }}>
              Loyalty should feel<br/>
              <span className="serif-it" style={{ fontWeight: 400, color: "var(--terra)" }}>like a small celebration.</span>
            </h2>
          </div>
          <p className="r-right" style={{ fontSize: 16, lineHeight: 1.55, color: "var(--ink-soft)", maxWidth: 460, marginLeft: "auto" }}>
            Not a paper card. Customers unlock progress, status, surprises, quiet reasons to come back that don't shout.
          </p>
        </div>

        {/* 3 explainer cards, Progress / Surprise / Status */}
        <div className="r-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18, marginBottom: 60 }}>
          {[
  { t: "Progress", c: "Customers see how close they are to the next reward.", i: <Icon.trend />, color: "var(--terra)" },
  { t: "Surprise", c: "Mystery drops and spins make every visit feel more exciting.", i: <Icon.gift />, color: "var(--rose)" },
  { t: "Status", c: "VIP tiers turn regulars into recognized members.", i: <Icon.crown />, color: "var(--saffron)" }].map((x) => (
            <div key={x.t} className="card-hover" style={{
  padding: 22,
  borderRadius: 18,
  background: "rgba(252,247,236,0.92)",
  backdropFilter: "blur(14px)",
  border: "1px solid rgba(42,31,24,0.08)",
  boxShadow: "0 14px 30px -22px rgba(42,31,24,0.16)"
}}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 34, height: 34, borderRadius: 10, background: x.color, color: "white", display: "flex", alignItems: "center", justifyContent: "center" }}>{x.i}</div>
                <div style={{ fontFamily: "var(--display)", fontWeight: 600, fontSize: 22, letterSpacing: "-0.025em" }}>{x.t}</div>
              </div>
              <div style={{ marginTop: 12, fontSize: 14, lineHeight: 1.5, color: "var(--ink-soft)" }}>{x.c}</div>
            </div>
          ))}
        </div>

        <div className="r-3" style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.1fr 1fr",
          gap: 28,
          alignItems: "center",
        }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <GameTile icon={<Icon.fire />}  label="Visit streak" value="5"    sub="days · keep going"   accent="var(--terra)" />
            <GameTile icon={<Icon.crown />} label="VIP tier"     value="Gold" sub="unlocked Mar 22"     accent="var(--saffron)" dark />
            <GameTile icon={<Icon.spark />} label="XP earned"    value="1,284" sub="next reward at 1,500" accent="var(--plum)" />
          </div>

          <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
            <div style={{ position: "absolute", inset: -30, background: "radial-gradient(circle, rgba(214,122,69,0.35), transparent 60%)", filter: "blur(40px)" }} />
            <SpinWheelBig />
            <PointBurst delay={0} pos={{ top: 0, right: 0 }} text="+50" color="var(--terra)" />
            <PointBurst delay={1} pos={{ top: 60, left: -10 }} text="+200" color="var(--rose)" />
            <PointBurst delay={2} pos={{ bottom: 30, right: 10 }} text="Gold!" color="var(--saffron)" />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <GameTile icon={<Icon.gift />}  label="Mystery drop"  value="3"    sub="left today · spin"    accent="var(--rose)" />
            <GameTile icon={<Icon.users />} label="Referral"      value="2 / 5" sub="bring a friend"       accent="var(--sage)" dark />
            <GameTile icon={<Icon.bolt />}  label="Happy hour"    value="−20%" sub="Tue · 2-4 PM"       accent="var(--honey)" />
          </div>
        </div>

        <div style={{ marginTop: 80, paddingTop: 36, borderTop: "1px solid var(--hairline)" }}>
          <div className="eyebrow" style={{ marginBottom: 18 }}>Badges, custom profiles, referrals & seasonal challenges</div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {[
  { l: "First sip", c: "var(--terra)" },
  { l: "5-day streak", c: "var(--rose)" },
  { l: "Gold tier", c: "var(--saffron)" },
  { l: "Custom cup", c: "var(--plum)" },
  { l: "Bring a friend, referral challenge", c: "var(--sage)" },
  { l: "Morning regular", c: "var(--honey)" },
  { l: "Seasonal, Spring blend", c: "var(--terra)" },
  { l: "Mystery hunter", c: "var(--rose)" }].map((b) => (
              <div key={b.l} style={{
                display: "flex", alignItems: "center", gap: 9,
                padding: "9px 15px 9px 11px",
                borderRadius: 999,
                background: "rgba(255,255,255,0.45)",
                backdropFilter: "blur(14px)",
                border: "1px solid rgba(255,255,255,0.7)",
                fontSize: 13, fontWeight: 500, color: "var(--ink)",
              }}>
                <div style={{ width: 18, height: 18, borderRadius: "50%", background: b.c, color: "white", display: "flex", alignItems: "center", justifyContent: "center" }}><Icon.star style={{ width: 9, height: 9 }} /></div>
                {b.l}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function GameTile({ icon, label, value, sub, accent, dark = false }) {
  return (
    <div style={{
      padding: 22,
      borderRadius: 20,
      background: dark ? "var(--ink)" : "rgba(252,247,236,0.92)",
      backdropFilter: "blur(16px)",
      border: dark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(42,31,24,0.08)",
      boxShadow: "0 20px 50px -30px rgba(42,31,24,0.3)",
      color: dark ? "var(--cream)" : "var(--ink)",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ width: 32, height: 32, borderRadius: 9, background: accent, color: "white", display: "flex", alignItems: "center", justifyContent: "center" }}>{icon}</div>
        <span className="mono" style={{ color: dark ? "rgba(243,234,215,0.55)" : "var(--muted)" }}>{label}</span>
      </div>
      <div style={{ fontFamily: "var(--display)", fontSize: 40, fontWeight: 600, letterSpacing: "-0.035em", marginTop: 14, lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: 12.5, color: dark ? "rgba(243,234,215,0.55)" : "var(--muted)", marginTop: 6 }}>{sub}</div>
    </div>
  );
}

function SpinWheelBig() {
  const segs = [
    { c: "#D67A45", l: "20% off" },
    { c: "#DC8B7E", l: "Free pastry" },
    { c: "#8D6B8D", l: "+100 pts" },
    { c: "#9DAA7E", l: "Mystery" },
    { c: "#E5B14A", l: "Free shot" },
    { c: "#DC8B7E", l: "BOGO" },
    { c: "#8D6B8D", l: "VIP day" },
    { c: "#D67A45", l: "+200 pts" },
  ];
  return (
    <div style={{ position: "relative", width: 320, height: 320 }}>
      <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%", animation: "spin-slow 28s linear infinite" }}>
        {segs.map((s, i) => {
          const a1 = (i / segs.length) * Math.PI * 2 - Math.PI / 2;
          const a2 = ((i + 1) / segs.length) * Math.PI * 2 - Math.PI / 2;
          const x1 = 50 + 48 * Math.cos(a1), y1 = 50 + 48 * Math.sin(a1);
          const x2 = 50 + 48 * Math.cos(a2), y2 = 50 + 48 * Math.sin(a2);
          const am = ((i + 0.5) / segs.length) * Math.PI * 2 - Math.PI / 2;
          const lx = 50 + 32 * Math.cos(am);
          const ly = 50 + 32 * Math.sin(am);
          return (
            <g key={i}>
              <path d={`M50 50 L${x1} ${y1} A48 48 0 0 1 ${x2} ${y2} Z`} fill={s.c} />
              <text x={lx} y={ly} textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="3.4" fontWeight="500" fontFamily="Geist, sans-serif" style={{ transform: `rotate(${(i + 0.5) * (360 / segs.length)}deg)`, transformOrigin: `${lx}px ${ly}px` }}>{s.l}</text>
            </g>
          );
        })}
        <circle cx="50" cy="50" r="48" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="0.4" />
        <circle cx="50" cy="50" r="13" fill="var(--ink)" />
        <text x="50" y="50.5" textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="5.5" fontWeight="700" fontFamily="Bricolage Grotesque" letterSpacing="-0.04em">AURA</text>
      </svg>
      <div style={{ position: "absolute", top: -4, left: "50%", transform: "translateX(-50%)", width: 0, height: 0, borderLeft: "10px solid transparent", borderRight: "10px solid transparent", borderTop: "16px solid var(--ink)", filter: "drop-shadow(0 4px 8px rgba(42,31,24,0.3))" }} />
    </div>
  );
}

function PointBurst({ pos, text, color, delay = 0 }) {
  return (
    <div style={{
      position: "absolute", ...pos,
      padding: "7px 13px",
      borderRadius: 999,
      background: "rgba(255,255,255,0.85)",
      backdropFilter: "blur(10px)",
      border: `1px solid ${color}`,
      color: color,
      fontFamily: "var(--display)",
      fontWeight: 600,
      fontSize: 17,
      letterSpacing: "-0.02em",
      boxShadow: `0 10px 24px -10px ${color}`,
      animation: `float-y-2 ${6 + delay}s ease-in-out infinite ${-delay}s`,
    }}>{text}</div>
  );
}

Object.assign(window, { AppExperienceSection, AISection, GamificationSection });
