// @ts-nocheck
"use client";
/* eslint-disable */
/* AURA landing page — assembled from the design handoff modules into a single
   Next.js client component. Source of truth lives in project/src/*.jsx;
   regenerate with /tmp/assemble-landing.js. */
import * as React from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
if (typeof window !== "undefined") {
  try { gsap.registerPlugin(ScrollTrigger); } catch (e) {}
}
const AURA_DEFAULTS = {
  palette: "saffron",
  displayFont: "Geist",
  headline: "A quiet ritual your customers come back for.",
};

/* ===== atoms ===== */
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
          <a href="/diagnostic">Café health check</a>
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

/* ───────────── Brand photo — warm-graded image slot with graceful fallback ─────────────
   Renders a real photo with a consistent warm grade + grain + rounded mask so any
   on-brand image drops in looking cohesive. If the file is missing it renders `fallback`
   (often null), so nothing ever looks broken before assets land. */
function BrandPhoto({ src, alt = "", fallback = null, radius = 16, grade = 0.22, eager = false, fill = false, style = {}, imgStyle = {}, children = null }) {
  const [ok, setOk] = useState(true);
  if (!ok) return fallback;
  const wrap = fill
    ? { position: "absolute", inset: 0, overflow: "hidden", ...style }
    : { position: "relative", overflow: "hidden", borderRadius: radius, ...style };
  return (
    <div style={wrap}>
      <img
        src={src} alt={alt} onError={() => setOk(false)}
        loading={eager ? "eager" : "lazy"} decoding="async"
        // @ts-ignore
        fetchPriority={eager ? "high" : "auto"}
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", ...imgStyle }}
      />
      {/* warm grade so cool/stocky shots still read on-brand */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none",
        background: `linear-gradient(180deg, rgba(214,122,69,0.06), rgba(31,22,18,${grade}))`,
        mixBlendMode: "multiply" }} />
      <div className="grain" style={{ position: "absolute", inset: 0 }} />
      {children && <div style={{ position: "absolute", inset: 0 }}>{children}</div>}
    </div>
  );
}

/* full-bleed photographic band, vanishes gracefully until the asset exists */
function CafeBand() {
  return (
    <BrandPhoto src="/assets/brand/cafe-band.jpg" alt="A busy café counter in warm afternoon light"
      fallback={null} grade={0.42} radius={0}
      style={{ height: "clamp(300px, 44vh, 480px)" }}>
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <p className="serif-it" style={{ margin: 0, textAlign: "center", color: "var(--cream)", maxWidth: 760,
          fontSize: "clamp(28px, 3.6vw, 52px)", lineHeight: 1.1, letterSpacing: "-0.01em",
          textShadow: "0 2px 30px rgba(20,12,5,0.5)" }}>
          The café they choose on purpose, not the app that happened to be open.
        </p>
      </div>
    </BrandPhoto>
  );
}



/* ===== phones ===== */
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



/* ===== sections-a ===== */
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
              {/* hero-glow.png: warm analog bokeh light-leak behind phone — gracefully absent until file dropped in */}
              <BrandPhoto src="/assets/brand/hero-glow.png" alt="" fallback={null} radius={0}
                style={{ position: "absolute", inset: -80, zIndex: 0, mixBlendMode: "screen", opacity: 0.9 }}
                imgStyle={{ width: "100%", height: "100%", objectFit: "cover" }} />
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


/* ===== sections-b ===== */
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
        <div style={{ maxWidth: 720, marginBottom: 56 }}>
          <h2 style={{ fontFamily: "var(--display)", fontWeight: 600, fontSize: "clamp(36px, 4.4vw, 58px)", letterSpacing: "-0.035em", lineHeight: 1.02, textWrap: "balance" }}>
            Make every visit feel like <span className="serif-it" style={{ fontWeight: 400, color: "var(--terra)" }}>progress.</span>
          </h2>
          <p style={{ marginTop: 18, fontSize: 17, lineHeight: 1.55, color: "var(--ink-soft)", maxWidth: "60ch" }}>
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
        <div style={{ textAlign: "center", maxWidth: 720, margin: "0 auto 64px" }}>
          <h2 style={{ fontFamily: "var(--display)", fontWeight: 600, fontSize: "clamp(36px, 4.4vw, 62px)", letterSpacing: "-0.035em", lineHeight: 1.04, textWrap: "balance" }}>
            Loyalty should feel <span className="serif-it" style={{ fontWeight: 400, color: "var(--terra)" }}>like a small celebration.</span>
          </h2>
          <p style={{ marginTop: 18, fontSize: 17, lineHeight: 1.55, color: "var(--ink-soft)", maxWidth: "54ch", marginInline: "auto" }}>
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



/* ===== sections-cozy ===== */
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
                {/* steam — real photo if available, SVG fallback */}
                <BrandPhoto src="/assets/brand/steam-dark.png" alt="" fallback={
                  <svg style={{ position: "absolute", top: -70, left: "50%", transform: "translateX(-50%)", pointerEvents: "none" }} width="120" height="70">
                    <defs><filter id="steamblur"><feGaussianBlur stdDeviation="4" /></filter></defs>
                    <path d="M40 70 Q 30 45 50 28 Q 70 8 50 0" stroke="rgba(243,234,215,0.18)" strokeWidth="2" fill="none" filter="url(#steamblur)" />
                    <path d="M70 70 Q 80 45 60 28 Q 40 8 60 0" stroke="rgba(243,234,215,0.14)" strokeWidth="2" fill="none" filter="url(#steamblur)" />
                  </svg>
                } radius={0}
                  style={{ position: "absolute", top: -140, left: "50%", transform: "translateX(-50%)", width: 160, height: 200, mixBlendMode: "screen", opacity: 0.7, pointerEvents: "none", zIndex: 5 }}
                  imgStyle={{ width: "100%", height: "100%", objectFit: "contain" }} />
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



/* ===== sections-c ===== */
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
  const path = (pts) => "M" + pts.map(([x, y]) => `${x.toFixed(3)} ${y.toFixed(3)}`).join(" L ");
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
      img: "/assets/testimonials/elena-moretti.jpg", accent: "var(--terra)",
    },
    {
      quote: "The AI nudges me when a Tuesday's going to be slow and writes the happy-hour post for me. I approve it on my phone between orders. It feels like having a marketing person I can't afford.",
      name: "David Okonkwo", role: "Owner · Jollof & Co, Houston",
      img: "/assets/testimonials/david-okonkwo.jpg", accent: "var(--plum)",
    },
    {
      quote: "Customers used to visit once and vanish. Now I can see who's fading and bring them back before I lose them. My mornings finally feel predictable.",
      name: "Mei Tanaka", role: "Owner · Hojicha House, Seattle",
      img: "/assets/testimonials/mei-tanaka.jpg", accent: "var(--rose)",
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



/* ===== app ===== */
/* AURA, main app, with GSAP-driven scroll orchestration */

function App() {
  const t = AURA_DEFAULTS;

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
  useEffect(() => {
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
    </>
  );
}

export default App;

