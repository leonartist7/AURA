/* AURA phone screens, composable app UI for the mockups */

/* ───────────── Phone shell ───────────── */
function Phone({ children, glow = true, scale = 1, style = {}, className = "" }) {
  return (
    <div
      className={`phone ${className}`}
      style={{
        transform: `scale(${scale})`,
        transformOrigin: "top center", ...style,
      }}
    >
      <div className="notch" />
      <div className="screen">
        {children}
      </div>
    </div>
  );
}

/* Status bar */
function StatusBar({ dark = false }) {
  const color = dark ? "var(--cream)" : "var(--ink)";
  return (
    <div style={{
      display: "flex", justifyContent: "space-between", alignItems: "center",
      padding: "14px 28px 6px", fontSize: 13, fontWeight: 600, color, letterSpacing: "-0.01em",
    }}>
      <span>9:41</span>
      <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
        <svg width="16" height="10" viewBox="0 0 16 10" fill={color}><rect x="0" y="6" width="3" height="4" rx="0.5"/><rect x="4" y="4" width="3" height="6" rx="0.5"/><rect x="8" y="2" width="3" height="8" rx="0.5"/><rect x="12" y="0" width="3" height="10" rx="0.5"/></svg>
        <svg width="22" height="11" viewBox="0 0 22 11" fill="none"><rect x="0.5" y="0.5" width="18" height="10" rx="2.5" stroke={color}/><rect x="2" y="2" width="14" height="7" rx="1.2" fill={color}/><rect x="19" y="3.5" width="2" height="4" rx="1" fill={color}/></svg>
      </div>
    </div>
  );
}

/* ───────────── Home screen (loyalty / rewards) ───────────── */
function ScreenHome() {
  return (
    <div style={{ position: "relative", height: "100%", background: "var(--cream-warm)", color: "var(--ink)", overflow: "hidden" }}>
      {/* warm gradient header */}
      <div style={{
        position: "absolute", inset: "0 0 auto 0", height: 320,
        background: "linear-gradient(160deg, #E5B14A 0%, #DC8B7E 55%, #8D6B8D 100%)",
        clipPath: "ellipse(140% 100% at 50% 0%)",
      }} />
      <StatusBar dark />

      <div style={{ position: "relative", padding: "8px 22px 0", color: "white" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: 11, opacity: 0.85, letterSpacing: "0.04em", textTransform: "uppercase" }}>Good morning</div>
            <div style={{ fontFamily: "var(--display)", fontSize: 24, fontWeight: 700, letterSpacing: "-0.03em", marginTop: 2 }}>Hey, Maya</div>
          </div>
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(255,255,255,0.25)", border: "1.5px solid rgba(255,255,255,0.55)" }} />
        </div>

        {/* points card */}
        <div style={{
          marginTop: 22, padding: 18, borderRadius: 22,
          background: "rgba(255,255,255,0.16)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.32)",
          color: "white",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 11, opacity: 0.85, letterSpacing: "0.05em", textTransform: "uppercase" }}>
            <span>Your points</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
              <Icon.crown style={{ width: 11, height: 11 }} /> Silver
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: 6 }}>
            <span style={{ fontFamily: "var(--display)", fontSize: 44, fontWeight: 800, letterSpacing: "-0.04em" }}>1,284</span>
            <span style={{ fontSize: 12, opacity: 0.8 }}>pts</span>
          </div>
          <div style={{ marginTop: 12, height: 5, borderRadius: 999, background: "rgba(255,255,255,0.22)", overflow: "hidden" }}>
            <div style={{ width: "72%", height: "100%", background: "white", borderRadius: 999 }} />
          </div>
          <div style={{ marginTop: 8, fontSize: 11, opacity: 0.85 }}>2 visits away from <strong style={{ fontWeight: 600 }}>Gold</strong></div>
        </div>
      </div>

      {/* sheet */}
      <div style={{
        position: "absolute", left: 0, right: 0, bottom: 0, top: 290,
        background: "var(--cream-warm)",
        borderRadius: "28px 28px 0 0",
        padding: "20px 22px 26px",
        boxShadow: "0 -8px 24px rgba(20,12,5,0.06)",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontWeight: 600, fontSize: 14 }}>Today for you</span>
          <span style={{ fontSize: 11, color: "var(--muted)", fontFamily: "var(--mono)", textTransform: "uppercase" }}>3 perks</span>
        </div>

        <div style={{ display: "grid", gap: 10, marginTop: 12 }}>
          <PerkRow icon={<Icon.coffee />} bg="#D67A45" title="Your usual latte" sub="20% off until 4 PM" badge="−20%" />
          <PerkRow icon={<Icon.gift />} bg="#8D6B8D" title="Mystery reward" sub="Spin to reveal" badge="NEW" />
          <PerkRow icon={<Icon.fire />} bg="#DC8B7E" title="Ritual streak" sub="5 days · keep going" badge="+50" />
        </div>

        <div style={{ position: "absolute", left: 22, right: 22, bottom: 18, display: "flex", justifyContent: "space-around", padding: "12px 0", background: "rgba(27,22,18,0.05)", borderRadius: 18 }}>
          {["home", "qr", "rewards", "profile"].map((k, i) => (
            <div key={k} style={{ width: 28, height: 28, borderRadius: 8, background: i === 0 ? "var(--ink)" : "transparent", color: i === 0 ? "var(--cream)" : "var(--ink)", opacity: i === 0 ? 1 : 0.45, display: "flex", alignItems: "center", justifyContent: "center" }}>
              {i === 0 && <Icon.heart />}
              {i === 1 && <Icon.qr />}
              {i === 2 && <Icon.star />}
              {i === 3 && <Icon.users />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PerkRow({ icon, bg, title, sub, badge }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 12,
      padding: "12px 14px", borderRadius: 16,
      background: "white",
      boxShadow: "0 6px 14px -10px rgba(20,12,5,0.16)",
    }}>
      <div style={{ width: 36, height: 36, borderRadius: 11, background: bg, color: "white", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {icon}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 600, fontSize: 13.5 }}>{title}</div>
        <div style={{ fontSize: 11.5, color: "var(--muted)" }}>{sub}</div>
      </div>
      <div style={{ fontFamily: "var(--mono)", fontSize: 10, padding: "4px 8px", background: "var(--ink)", color: "var(--cream)", borderRadius: 999, letterSpacing: "0.05em" }}>{badge}</div>
    </div>
  );
}

/* ───────────── Spin reward screen ───────────── */
function ScreenSpin() {
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
    <div style={{ position: "relative", height: "100%", background: "linear-gradient(180deg, #0E0A08 0%, #1A1410 100%)", color: "var(--cream)", overflow: "hidden" }}>
      <StatusBar dark={false} />
      <div style={{ padding: "14px 22px 0" }}>
        <div style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.18em", opacity: 0.6, textTransform: "uppercase" }}>Daily spin</div>
        <div style={{ fontFamily: "var(--display)", fontSize: 28, fontWeight: 800, letterSpacing: "-0.035em", marginTop: 4, lineHeight: 1.05 }}>
          Spin today's<br/>mystery reward.
        </div>
      </div>

      {/* wheel */}
      <div style={{ position: "relative", margin: "26px auto 0", width: 260, height: 260 }}>
        <div style={{ position: "absolute", inset: -22, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,138,61,0.35), transparent 65%)" }} />
        <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%", animation: "spin-slow 22s linear infinite", display: "block" }}>
          {segs.map((s, i) => {
            const a1 = (i / segs.length) * Math.PI * 2 - Math.PI / 2;
            const a2 = ((i + 1) / segs.length) * Math.PI * 2 - Math.PI / 2;
            const x1 = 50 + 48 * Math.cos(a1), y1 = 50 + 48 * Math.sin(a1);
            const x2 = 50 + 48 * Math.cos(a2), y2 = 50 + 48 * Math.sin(a2);
            return <path key={i} d={`M50 50 L${x1} ${y1} A48 48 0 0 1 ${x2} ${y2} Z`} fill={s.c} opacity="0.92" />;
          })}
          <circle cx="50" cy="50" r="48" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="0.6" />
          <circle cx="50" cy="50" r="14" fill="#0E0A08" stroke="rgba(255,255,255,0.25)" strokeWidth="0.8" />
        </svg>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", fontFamily: "var(--display)", fontWeight: 800, fontSize: 22, color: "white", letterSpacing: "-0.04em" }}>AURA</div>
        {/* pointer */}
        <div style={{ position: "absolute", top: -8, left: "50%", transform: "translateX(-50%)", width: 0, height: 0, borderLeft: "10px solid transparent", borderRight: "10px solid transparent", borderTop: "14px solid var(--cream)" }} />
      </div>

      <div style={{ position: "absolute", left: 22, right: 22, bottom: 24 }}>
        <button style={{
          width: "100%", padding: "16px 0", borderRadius: 999,
          background: "linear-gradient(95deg, #D67A45, #DC8B7E, #8D6B8D)",
          color: "white", fontWeight: 600, fontSize: 15, letterSpacing: "-0.01em",
          boxShadow: "0 18px 36px -14px rgba(255,94,154,0.55)",
        }}>Spin · uses 1 token</button>
      </div>
    </div>
  );
}

/* ───────────── QR menu / order screen ───────────── */
function ScreenQR() {
  return (
    <div style={{ position: "relative", height: "100%", background: "var(--cream-warm)", color: "var(--ink)", overflow: "hidden" }}>
      <StatusBar />
      <div style={{ padding: "10px 22px 0" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.16em", color: "var(--muted)", textTransform: "uppercase" }}>Cafe Mira · Table 4</div>
            <div style={{ fontFamily: "var(--display)", fontSize: 24, fontWeight: 700, letterSpacing: "-0.03em", marginTop: 4 }}>Order again</div>
          </div>
          <div style={{ width: 32, height: 32, borderRadius: 10, background: "var(--ink)", color: "var(--cream)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon.qr />
          </div>
        </div>

        <div style={{ marginTop: 16, display: "flex", gap: 8 }}>
          {["Coffee", "Bakery", "Cold", "Lunch"].map((c, i) => (
            <div key={c} style={{ padding: "8px 12px", borderRadius: 999, background: i === 0 ? "var(--ink)" : "rgba(27,22,18,0.06)", color: i === 0 ? "var(--cream)" : "var(--ink)", fontSize: 12, fontWeight: 500 }}>{c}</div>
          ))}
        </div>

        <div style={{ marginTop: 14, display: "grid", gap: 10 }}>
          <MenuItem name="Oat Latte" sub="Your usual · 12oz" price="$5.40" tag="Saved" stripe="linear-gradient(135deg,#D67A45,#DC8B7E)" />
          <MenuItem name="Matcha Hojicha" sub="House blend, slightly smoky" price="$5.80" stripe="linear-gradient(135deg,#9DAA7E,#9DAA7E)" />
          <MenuItem name="Cardamom Bun" sub="Baked at 6 AM" price="$4.20" tag="Today" stripe="linear-gradient(135deg,#E5B14A,#D67A45)" />
        </div>
      </div>

      {/* bottom cart */}
      <div style={{ position: "absolute", left: 16, right: 16, bottom: 18, padding: "12px 14px 12px 16px", borderRadius: 20, background: "var(--ink)", color: "var(--cream)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontSize: 11, opacity: 0.6, fontFamily: "var(--mono)", textTransform: "uppercase", letterSpacing: "0.1em" }}>2 items · pickup 9:14</div>
          <div style={{ fontFamily: "var(--display)", fontWeight: 700, fontSize: 18, letterSpacing: "-0.02em", marginTop: 2 }}>$11.20</div>
        </div>
        <div style={{ padding: "10px 14px", borderRadius: 999, background: "var(--cream)", color: "var(--ink)", fontWeight: 600, fontSize: 13, display: "flex", alignItems: "center", gap: 6 }}>
          Order <Icon.arrow />
        </div>
      </div>
    </div>
  );
}

function MenuItem({ name, sub, price, tag, stripe }) {
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "center", padding: "10px 12px", background: "white", borderRadius: 16, boxShadow: "0 6px 14px -10px rgba(20,12,5,0.18)" }}>
      <div style={{ width: 42, height: 42, borderRadius: 12, background: stripe, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.45), transparent 50%)" }} />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontWeight: 600, fontSize: 14 }}>{name}</span>
          {tag && <span style={{ fontFamily: "var(--mono)", fontSize: 9, padding: "2px 6px", background: "rgba(27,22,18,0.08)", borderRadius: 999, letterSpacing: "0.06em" }}>{tag}</span>}
        </div>
        <div style={{ fontSize: 11.5, color: "var(--muted)" }}>{sub}</div>
      </div>
      <div style={{ fontWeight: 600, fontSize: 14 }}>{price}</div>
    </div>
  );
}

/* ───────────── VIP / Tier screen ───────────── */
function ScreenVIP() {
  return (
    <div style={{ position: "relative", height: "100%", background: "linear-gradient(180deg,#1F1612 0%, #0D0805 100%)", color: "var(--cream)", overflow: "hidden" }}>
      <StatusBar dark={false} />
      <div style={{ padding: "10px 22px 0" }}>
        <div style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.18em", color: "rgba(244,236,221,0.6)", textTransform: "uppercase" }}>Membership</div>
        <div style={{ fontFamily: "var(--display)", fontSize: 26, fontWeight: 800, letterSpacing: "-0.035em", marginTop: 4, lineHeight: 1.05 }}>VIP unlocked.<br/>Welcome to Gold.</div>
      </div>

      {/* card */}
      <div style={{
        margin: "20px 22px 0", padding: "20px 18px",
        borderRadius: 22,
        background: "linear-gradient(140deg, #E5B14A 0%, #D67A45 55%, #DC8B7E 100%)",
        color: "#1A1108",
        position: "relative", overflow: "hidden",
        boxShadow: "0 20px 50px -16px rgba(255,138,61,0.5)",
      }}>
        <div style={{ position: "absolute", right: -40, top: -40, width: 180, height: 180, borderRadius: "50%", background: "rgba(255,255,255,0.25)", filter: "blur(2px)" }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", position: "relative" }}>
          <div style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", opacity: 0.7 }}>Aura Member</div>
          <Icon.crown style={{ width: 22, height: 22 }} />
        </div>
        <div style={{ fontFamily: "var(--display)", fontWeight: 800, fontSize: 32, letterSpacing: "-0.04em", marginTop: 32, lineHeight: 1 }}>Gold Tier</div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 22, fontSize: 11, opacity: 0.8 }}>
          <div>
            <div style={{ fontFamily: "var(--mono)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Member</div>
            <div style={{ fontWeight: 600, fontSize: 13, marginTop: 2 }}>Maya R.</div>
          </div>
          <div>
            <div style={{ fontFamily: "var(--mono)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Since</div>
            <div style={{ fontWeight: 600, fontSize: 13, marginTop: 2 }}>Mar 2025</div>
          </div>
        </div>
      </div>

      <div style={{ padding: "20px 22px" }}>
        <div style={{ fontSize: 12, fontFamily: "var(--mono)", letterSpacing: "0.14em", color: "rgba(244,236,221,0.55)", textTransform: "uppercase" }}>Perks unlocked</div>
        <div style={{ display: "grid", gap: 8, marginTop: 10 }}>
          {["Free drink every 7 visits", "Priority pickup line", "Early access to new menu", "Birthday surprise"].map((p, i) => (
            <div key={p} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 12, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", fontSize: 13 }}>
              <Icon.check style={{ color: "#D67A45" }} /> {p}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ───────────── Happy hour screen ───────────── */
function ScreenHappyHour() {
  return (
    <div style={{ position: "relative", height: "100%", background: "var(--cream-warm)", color: "var(--ink)", overflow: "hidden" }}>
      <StatusBar />
      <div style={{ padding: "10px 22px 0" }}>
        <div style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.16em", color: "var(--muted)", textTransform: "uppercase" }}>Happy Hour · Today</div>
        <div style={{ fontFamily: "var(--display)", fontSize: 26, fontWeight: 800, letterSpacing: "-0.035em", marginTop: 4, lineHeight: 1.05 }}>
          Iced lattes,<br/>20% off till 4.
        </div>
      </div>

      {/* hero gradient panel */}
      <div style={{
        margin: "18px 22px 0",
        padding: "20px",
        borderRadius: 22,
        background: "linear-gradient(150deg, #9DAA7E 0%, #8D6B8D 55%, #DC8B7E 100%)",
        color: "white", position: "relative", overflow: "hidden",
        height: 200,
      }}>
        <div style={{ position: "absolute", right: -30, bottom: -30, width: 200, height: 200, borderRadius: "50%", background: "rgba(255,255,255,0.18)", filter: "blur(8px)" }} />
        <div style={{ position: "relative" }}>
          <div style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", opacity: 0.85 }}>−20% · 2 PM - 4 PM</div>
          <div style={{ fontFamily: "var(--display)", fontSize: 38, fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1, marginTop: 50 }}>Cool down.</div>
          <div style={{ fontSize: 12, opacity: 0.85, marginTop: 6 }}>Iced drinks · 12oz & up</div>
        </div>
      </div>

      <div style={{ padding: "18px 22px" }}>
        <div style={{ display: "flex", gap: 8, fontSize: 11, color: "var(--muted)", fontFamily: "var(--mono)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Eligible</div>
        <div style={{ display: "grid", gap: 8, marginTop: 10 }}>
          {[
            { n: "Iced Oat Latte", p: "$4.32", was: "$5.40" },
            { n: "Cold Brew Tonic", p: "$4.16", was: "$5.20" },
            { n: "Yuzu Matcha", p: "$4.64", was: "$5.80" },
          ].map((m) => (
            <div key={m.n} style={{ display: "flex", justifyContent: "space-between", padding: "10px 14px", background: "white", borderRadius: 14, boxShadow: "0 6px 14px -10px rgba(20,12,5,0.18)" }}>
              <span style={{ fontWeight: 500, fontSize: 13.5 }}>{m.n}</span>
              <span>
                <span style={{ color: "var(--muted)", textDecoration: "line-through", marginRight: 8, fontSize: 12 }}>{m.was}</span>
                <span style={{ fontWeight: 600 }}>{m.p}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ───────────── Streak / progress screen ───────────── */
function ScreenStreak() {
  return (
    <div style={{ position: "relative", height: "100%", background: "var(--cream-warm)", color: "var(--ink)", overflow: "hidden" }}>
      <StatusBar />
      <div style={{ padding: "10px 22px 0" }}>
        <div style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.16em", color: "var(--muted)", textTransform: "uppercase" }}>Ritual Streak</div>
        <div style={{ fontFamily: "var(--display)", fontSize: 26, fontWeight: 800, letterSpacing: "-0.035em", marginTop: 4, lineHeight: 1.05 }}>5 days. Keep<br/>the rhythm going.</div>
      </div>
      <div style={{ padding: "22px", display: "flex", justifyContent: "center" }}>
        <div style={{
          width: 200, height: 200, borderRadius: "50%",
          background: "conic-gradient(from -90deg, #D67A45 0%, #DC8B7E 35%, #8D6B8D 60%, rgba(42,31,24,0.08) 60%)",
          display: "flex", alignItems: "center", justifyContent: "center",
          position: "relative",
        }}>
          <div style={{ width: 160, height: 160, borderRadius: "50%", background: "var(--cream-warm)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.14em", color: "var(--muted)", textTransform: "uppercase" }}>Streak</span>
            <span style={{ fontFamily: "var(--display)", fontSize: 56, fontWeight: 800, lineHeight: 1, letterSpacing: "-0.04em" }}>5</span>
            <span style={{ fontSize: 11, color: "var(--muted)" }}>of 7 days</span>
          </div>
        </div>
      </div>
      <div style={{ padding: "0 22px" }}>
        <div style={{ display: "flex", gap: 6, justifyContent: "center" }}>
          {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
            <div key={i} style={{
              width: 32, height: 40, borderRadius: 10,
              background: i < 5 ? "var(--ink)" : "rgba(27,22,18,0.05)",
              color: i < 5 ? "var(--cream)" : "var(--muted)",
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              fontSize: 11, fontWeight: 600,
              gap: 2,
            }}>
              <span>{d}</span>
              {i < 5 && <Icon.check style={{ width: 10, height: 10, color: "var(--cream)" }} />}
            </div>
          ))}
        </div>
        <div style={{ marginTop: 20, padding: "14px 16px", borderRadius: 16, background: "var(--ink)", color: "var(--cream)", display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 32, height: 32, borderRadius: 10, background: "#D67A45", color: "white", display: "flex", alignItems: "center", justifyContent: "center" }}><Icon.fire /></div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600, fontSize: 13 }}>2 more days unlocks</div>
            <div style={{ fontSize: 11.5, opacity: 0.65 }}>Free drink + 200 bonus pts</div>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, {
  Phone, StatusBar,
  ScreenHome, ScreenSpin, ScreenQR, ScreenVIP, ScreenHappyHour, ScreenStreak,
});
