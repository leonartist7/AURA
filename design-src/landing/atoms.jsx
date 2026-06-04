/* AURA atoms, backgrounds, ribbons, notifications, icons, primitives */
const { useState, useEffect, useRef, useMemo, useLayoutEffect } = React;

/* ───────────── Hooks ───────────── */

function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // If already on screen at mount, reveal immediately
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) {
      el.classList.add("in");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("in")),
      { threshold: 0.08 }
    );
    io.observe(el);
    // safety fallback
    const t = setTimeout(() => el.classList.add("in"), 1200);
    return () => { io.disconnect(); clearTimeout(t); };
  }, []);
  return ref;
}

function useParallax(strength = 0.18) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const offset = (window.innerHeight / 2 - center) * strength;
        el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [strength]);
  return ref;
}

/* ───────────── Gradient ribbon backgrounds ───────────── */

function GradientRibbons({ variant = "warm", opacity = 1 }) {
  // Soft blurred SVG blobs in warm autumnal tones. Drift slowly.
  const stops = useMemo(() => {
    if (variant === "dusk")      return ["#D67A45", "#DC8B7E", "#8D6B8D"];
    if (variant === "saffron")   return ["#E5B14A", "#D67A45", "#DC8B7E"];
    if (variant === "earth")     return ["#9DAA7E", "#D67A45", "#8D6B8D"];
    if (variant === "candle")    return ["#E8AC58", "#D67A45", "#7B4A3A"];
    return ["#D67A45", "#E5B14A", "#DC8B7E", "#8D6B8D"]; // warm default
  }, [variant]);

  return (
    <div className="ribbon-bg" style={{ opacity }}>
      <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" style={{ width: "100%", height: "100%" }}>
        <defs>
          <radialGradient id="rg1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={stops[0]} stopOpacity="0.9" />
            <stop offset="100%" stopColor={stops[0]} stopOpacity="0" />
          </radialGradient>
          <radialGradient id="rg2" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={stops[1]} stopOpacity="0.85" />
            <stop offset="100%" stopColor={stops[1]} stopOpacity="0" />
          </radialGradient>
          <radialGradient id="rg3" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={stops[2]} stopOpacity="0.85" />
            <stop offset="100%" stopColor={stops[2]} stopOpacity="0" />
          </radialGradient>
          <radialGradient id="rg4" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={stops[3] || stops[0]} stopOpacity="0.8" />
            <stop offset="100%" stopColor={stops[3] || stops[0]} stopOpacity="0" />
          </radialGradient>
        </defs>
        <g style={{ transformOrigin: "center", animation: "drift1 22s ease-in-out infinite" }}>
          <ellipse cx="350" cy="380" rx="520" ry="420" fill="url(#rg1)" />
        </g>
        <g style={{ transformOrigin: "center", animation: "drift2 28s ease-in-out infinite" }}>
          <ellipse cx="1180" cy="320" rx="560" ry="440" fill="url(#rg2)" />
        </g>
        <g style={{ transformOrigin: "center", animation: "drift3 34s ease-in-out infinite" }}>
          <ellipse cx="900" cy="780" rx="640" ry="380" fill="url(#rg3)" />
        </g>
        <g style={{ transformOrigin: "center", animation: "drift1 40s ease-in-out infinite reverse" }}>
          <ellipse cx="180" cy="800" rx="500" ry="360" fill="url(#rg4)" />
        </g>
      </svg>
    </div>
  );
}

/* Animated wavy ribbon, silky strands flowing horizontally */
function WavyRibbons({ density = 4, opacity = 0.55, tint = "warm" }) {
  const colors = tint === "candle"
    ? ["#E8AC58", "#D67A45", "#7B4A3A"]
    : ["#D67A45", "#DC8B7E", "#8D6B8D", "#E5B14A"];

  const lines = useMemo(() => Array.from({ length: density }, (_, i) => {
    const y = 100 + i * (700 / density);
    const amp = 80 + (i % 3) * 30;
    const dur = 22 + (i * 4);
    const c = colors[i % colors.length];
    return { y, amp, dur, c, i };
  }), [density]);

  return (
    <svg
      viewBox="0 0 1600 900"
      preserveAspectRatio="none"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity, pointerEvents: "none", zIndex: 0 }}
    >
      <defs>
        <filter id="rblur"><feGaussianBlur stdDeviation="14" /></filter>
      </defs>
      {lines.map((l) => (
        <path
          key={l.i}
          d={`M -200 ${l.y} C 200 ${l.y - l.amp}, 600 ${l.y + l.amp}, 1000 ${l.y - l.amp * 0.7} S 1800 ${l.y + l.amp * 0.6}, 2200 ${l.y}`}
          stroke={l.c}
          strokeWidth={3 + (l.i % 3)}
          fill="none"
          filter="url(#rblur)"
          style={{ animation: `drift${(l.i % 3) + 1} ${l.dur}s ease-in-out infinite ${l.i * -2}s` }}
        />
      ))}
    </svg>
  );
}

/* ───────────── Notification card (floating toast) ───────────── */

function NotifCard({ icon, label, sub, accent, style, className = "" }) {
  return (
    <div className={`notif ${className}`} style={style}>
      <div className="icon-wrap" style={{ background: accent }}>
        {icon}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <span style={{ fontWeight: 600, color: "var(--ink)" }}>{label}</span>
        {sub && <span style={{ fontSize: 11, color: "var(--muted)", fontWeight: 500, letterSpacing: "0.02em" }}>{sub}</span>}
      </div>
    </div>
  );
}

/* ───────────── Icons (small, premium line/fill set) ───────────── */

const Icon = {
  bag: (p) => (<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" {...p}><path d="M5 8h14l-1.2 11.2A2 2 0 0 1 15.8 21H8.2a2 2 0 0 1-2-1.8L5 8z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>),
  heart: (p) => (<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" {...p}><path d="M12 21s-7-4.35-9.5-9A5.5 5.5 0 0 1 12 6.1 5.5 5.5 0 0 1 21.5 12c-2.5 4.65-9.5 9-9.5 9z"/></svg>),
  spark: (p) => (<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" {...p}><path d="M12 2l1.6 5.4L19 9l-5.4 1.6L12 16l-1.6-5.4L5 9l5.4-1.6L12 2zM19 14l.9 2.6 2.6.9-2.6.9L19 21l-.9-2.6-2.6-.9 2.6-.9L19 14z"/></svg>),
  star: (p) => (<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" {...p}><path d="M12 2l3 7 7 .7-5.3 4.8L18.2 22 12 18l-6.2 4 1.5-7.5L2 9.7 9 9z"/></svg>),
  fire: (p) => (<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" {...p}><path d="M13 2s4 4 4 9a5 5 0 1 1-10 0c0-3 2-4 2-7 0 0 4 2 4 8 1-2 0-7 0-10z"/></svg>),
  users: (p) => (<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" {...p}><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><circle cx="17" cy="9" r="2.5"/><path d="M15 20a6 6 0 0 1 7-5"/></svg>),
  coffee: (p) => (<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" {...p}><path d="M4 9h12v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V9z"/><path d="M16 11h2a2 2 0 0 1 0 4h-2"/><path d="M8 3v3M12 3v3"/></svg>),
  rotate: (p) => (<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...p}><path d="M3 12a9 9 0 0 1 15.5-6.3L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-15.5 6.3L3 16"/><path d="M3 21v-5h5"/></svg>),
  crown: (p) => (<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" {...p}><path d="M3 7l4 4 5-7 5 7 4-4-2 12H5L3 7z"/></svg>),
  bolt: (p) => (<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" {...p}><path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z"/></svg>),
  check: (p) => (<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M4 12l5 5L20 6"/></svg>),
  arrow: (p) => (<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M5 12h14M13 6l6 6-6 6"/></svg>),
  arrowUp: (p) => (<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M7 17L17 7M9 7h8v8"/></svg>),
  plus: (p) => (<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...p}><path d="M12 5v14M5 12h14"/></svg>),
  qr: (p) => (<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" {...p}><path d="M3 3h7v7H3V3zm2 2v3h3V5H5zm9-2h7v7h-7V3zm2 2v3h3V5h-3zM3 14h7v7H3v-7zm2 2v3h3v-3H5zm9-2h2v2h-2v-2zm4 0h3v3h-3v-3zm-4 4h2v2h-2v-2zm4 1h3v4h-3v-4z"/></svg>),
  gift: (p) => (<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" {...p}><path d="M4 12h16v8H4zM2 8h20v4H2zM12 8v12M12 8s-3-4-5-2.5S9 8 12 8c3 0 5-1 5-2.5S15 4 12 8z"/></svg>),
  mail: (p) => (<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" {...p}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>),
  chart: (p) => (<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...p}><path d="M4 19V5M4 19h16M8 15v-4M12 15V9M16 15v-7"/></svg>),
  trend: (p) => (<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M3 17l6-6 4 4 8-9"/><path d="M14 6h7v7"/></svg>),
  bell: (p) => (<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" {...p}><path d="M12 2a6 6 0 0 0-6 6v3l-2 4h16l-2-4V8a6 6 0 0 0-6-6zM9 19a3 3 0 0 0 6 0"/></svg>),
  bookmark: (p) => (<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" {...p}><path d="M6 3h12v18l-6-4-6 4V3z"/></svg>),
  globe: (p) => (<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" {...p}><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/></svg>),
};

/* ───────────── Big ghost word marquee ───────────── */

function GhostMarquee({ words, dur = 60, onDark = false, size = "clamp(120px, 18vw, 260px)" }) {
  const row = [...words, ...words]; // duplicate for seamless loop
  return (
    <div style={{ width: "100%", overflow: "hidden", display: "flex" }}>
      <div
        style={{
          display: "flex", gap: "0.8em", whiteSpace: "nowrap",
          animation: `marquee ${dur}s linear infinite`,
        }}
      >
        {row.map((w, i) => (
          <span
            key={i}
            className={`ghost-word ${onDark ? "on-dark" : ""}`}
            style={{ fontSize: size, lineHeight: 1 }}
          >
            {w}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ───────────── Top Nav ───────────── */

function TopNav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <nav
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        padding: scrolled ? "12px 0" : "22px 0",
        transition: "padding .4s, background .4s, border-color .4s",
        background: scrolled ? "rgba(243,234,215,0.78)" : "transparent",
        backdropFilter: scrolled ? "blur(16px) saturate(160%)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(16px) saturate(160%)" : "none",
        borderBottom: scrolled ? "1px solid var(--hairline)" : "1px solid transparent",
      }}
    >
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <a href="#top" style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Logo />
        </a>
        <div className="nav-links" style={{ display: "flex", gap: 32, fontSize: 14, color: "var(--ink)", fontWeight: 500 }}>
          <a href="#solution">Features</a>
          <a href="#app">Experience</a>
          <a href="#ai">AI</a>
          <a href="#pricing">Pricing</a>
          <a href="#founders">Founder Program</a>
        </div>
        <a href="#cta" className="btn-primary" style={{ padding: "12px 18px", fontSize: 13 }}>
          Book demo <span className="arrow-circle">→</span>
        </a>
      </div>
    </nav>
  );
}

function Logo({ size = 26, light = false }) {
  const color = light ? "var(--cream)" : "var(--ink)";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <svg width={size} height={size} viewBox="0 0 32 32" style={{ overflow: "visible" }}>
        <defs>
          <linearGradient id="logoG" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D67A45" />
            <stop offset="50%" stopColor="#E5B14A" />
            <stop offset="100%" stopColor="#8D6B8D" />
          </linearGradient>
        </defs>
        <circle cx="16" cy="16" r="14" fill="url(#logoG)" />
        <circle cx="16" cy="16" r="6.5" fill={light ? "var(--espresso)" : "var(--cream)"} />
      </svg>
      <span style={{ fontFamily: "var(--display)", fontWeight: 700, fontSize: 22, letterSpacing: "-0.04em", color }}>aura</span>
    </div>
  );
}

/* ───────────── Reveal wrapper component ───────────── */

function Reveal({ children, delay = 0, style, className = "", as: Tag = "div" }) {
  const ref = useReveal();
  return (
    <Tag ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms`, ...style }}>
      {children}
    </Tag>
  );
}

Object.assign(window, {
  useReveal, useParallax, GradientRibbons, WavyRibbons,
  NotifCard, Icon, GhostMarquee, TopNav, Logo, Reveal,
});
