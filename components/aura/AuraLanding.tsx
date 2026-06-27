// @ts-nocheck
"use client";
/* eslint-disable */
/* AURA CLUB landing — 7-section premium composition.
   Sections: Hero → The Leak → Sticky Phone Journey → Horizontal Drift →
   The Club & The Zone → Proof & Offer → Final Close.
   Pricing is intentionally held for the demo. Video-wave slots degrade to
   warm gradients until .mp4 files land in /public/media. */
import * as React from "react";
import HeroMoment from "./HeroMoment";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
if (typeof window !== "undefined") {
  try { gsap.registerPlugin(ScrollTrigger); } catch (e) {}
}

const ZONES_OPEN = 3;
const ZONES_TOTAL = 5;

/* ===== atoms ===== */
const { useState, useEffect, useRef, useMemo, useLayoutEffect } = React;

/* ───────────── Hooks ───────────── */

function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
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
    const t = setTimeout(() => el.classList.add("in"), 1200);
    return () => { io.disconnect(); clearTimeout(t); };
  }, []);
  return ref;
}

/* ───────────── Gradient ribbon backgrounds ───────────── */

function GradientRibbons({ variant = "warm", opacity = 1 }) {
  const stops = useMemo(() => {
    if (variant === "dusk")      return ["#D67A45", "#DC8B7E", "#8D6B8D"];
    if (variant === "saffron")   return ["#E5B14A", "#D67A45", "#DC8B7E"];
    if (variant === "earth")     return ["#9DAA7E", "#D67A45", "#8D6B8D"];
    if (variant === "candle")    return ["#E8AC58", "#D67A45", "#7B4A3A"];
    return ["#D67A45", "#E5B14A", "#DC8B7E", "#8D6B8D"];
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

/* ───────────── Video wave background slot ─────────────
   Drops in /public/media/*.mp4 whenever the user adds them.
   Until then (or under prefers-reduced-motion) the warm gradient
   wash underneath carries the section — nothing ever looks broken. */
function VideoWaveBg({ src, opacity = 1, blend = "normal", fallbackVariant = "warm", veil = null, style = {} }) {
  const [ok, setOk] = useState(true);
  const [motionOK, setMotionOK] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setMotionOK(!mq.matches);
  }, []);
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0, ...style }}>
      <GradientRibbons variant={fallbackVariant} opacity={0.9} />
      {ok && motionOK && (
        <video
          src={src} autoPlay muted loop playsInline
          onError={() => setOk(false)}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity, mixBlendMode: blend }}
        />
      )}
      {veil && <div style={{ position: "absolute", inset: 0, background: veil }} />}
    </div>
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

/* ───────────── Icons ───────────── */

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
  globe: (p) => (<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" {...p}><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/></svg>),
};

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
          <a href="#journey">How it feels</a>
          <a href="#ecosystem">Ecosystem</a>
          <a href="#offer">The Offer</a>
          <a href="/diagnostic">Café health check</a>
        </div>
        <a href="#offer" className="btn-primary" style={{ padding: "12px 18px", fontSize: 13 }}>
          Claim free month <span className="arrow-circle">→</span>
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
      <span style={{ fontFamily: "var(--display)", fontWeight: 700, fontSize: 22, letterSpacing: "-0.04em", color }}>
        aura <span className="serif-it" style={{ fontWeight: 400, fontSize: "0.86em", color: "var(--terra)" }}>club</span>
      </span>
    </div>
  );
}

/* ───────────── Reveal wrapper ───────────── */

function Reveal({ children, delay = 0, style, className = "", as: Tag = "div" }) {
  const ref = useReveal();
  return (
    <Tag ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms`, ...style }}>
      {children}
    </Tag>
  );
}

/* ───────────── Brand photo — warm-graded image slot with graceful fallback ───────────── */
function BrandPhoto({ src, alt = "", fallback = null, radius = 16, grade = 0.22, eager = false, fill = false, style = {}, imgStyle = {}, children = null }) {
  // Load-gated: preload off-DOM and only render the <img> once it actually
  // decodes. Missing files never paint the browser's broken-image glyph —
  // the graceful fallback shows until (and unless) the real asset arrives.
  const [status, setStatus] = useState("loading"); // loading | ok | error
  useEffect(() => {
    if (!src) { setStatus("error"); return; }
    let alive = true;
    const img = new Image();
    img.onload = () => { if (alive) setStatus("ok"); };
    img.onerror = () => { if (alive) setStatus("error"); };
    // @ts-ignore
    if (eager) img.fetchPriority = "high";
    img.src = src;
    if (img.complete && img.naturalWidth > 0) setStatus("ok");
    return () => { alive = false; };
  }, [src, eager]);

  if (status !== "ok") return fallback;

  const wrap = fill
    ? { position: "absolute", inset: 0, overflow: "hidden", ...style }
    : { position: "relative", overflow: "hidden", borderRadius: radius, ...style };
  return (
    <div style={wrap}>
      <img
        src={src} alt={alt} decoding="async"
        // @ts-ignore
        fetchPriority={eager ? "high" : "auto"}
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", ...imgStyle }}
      />
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none",
        background: `linear-gradient(180deg, rgba(214,122,69,0.06), rgba(31,22,18,${grade}))`,
        mixBlendMode: "multiply" }} />
      <div className="grain" style={{ position: "absolute", inset: 0 }} />
      {children && <div style={{ position: "absolute", inset: 0 }}>{children}</div>}
    </div>
  );
}

/* ===== phones ===== */

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

function ScreenHome() {
  return (
    <div style={{ position: "relative", height: "100%", background: "var(--cream-warm)", color: "var(--ink)", overflow: "hidden" }}>
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

      <div style={{ position: "relative", margin: "26px auto 0", width: 260, height: 260 }}>
        <div style={{ position: "absolute", inset: -22, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,138,61,0.35), transparent 65%)" }} />
        <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%", animation: "spin-slow 22s linear infinite", display: "block" }}>
          {segs.map((s, i) => {
            const a1 = (i / segs.length) * Math.PI * 2 - Math.PI / 2;
            const a2 = ((i + 1) / segs.length) * Math.PI * 2 - Math.PI / 2;
            const x1 = (50 + 48 * Math.cos(a1)).toFixed(3), y1 = (50 + 48 * Math.sin(a1)).toFixed(3);
            const x2 = (50 + 48 * Math.cos(a2)).toFixed(3), y2 = (50 + 48 * Math.sin(a2)).toFixed(3);
            return <path key={i} d={`M50 50 L${x1} ${y1} A48 48 0 0 1 ${x2} ${y2} Z`} fill={s.c} opacity="0.92" />;
          })}
          <circle cx="50" cy="50" r="48" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="0.6" />
          <circle cx="50" cy="50" r="14" fill="#0E0A08" stroke="rgba(255,255,255,0.25)" strokeWidth="0.8" />
        </svg>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", fontFamily: "var(--display)", fontWeight: 800, fontSize: 22, color: "white", letterSpacing: "-0.04em" }}>AURA</div>
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

/* ───────── small informative mocks (used in the Drift) ───────── */
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
    </div>
  );
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
    <svg viewBox="0 0 100 80" preserveAspectRatio="none" style={{ width: "100%", height: 140, marginTop: 14 }}>
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

/* ════════════════════════════════════════════════════════════════
   SECTION 1 — HERO. The club, one promise, one CTA.
   ════════════════════════════════════════════════════════════════ */
function HeroSection() {
  return (
    <section id="top" className="section grain grain-soft" style={{ paddingTop: 170, paddingBottom: 80, background: "var(--cream)", minHeight: "100vh", display: "flex", alignItems: "center" }}>
      {/* MEDIA SLOT: drop /public/media/waves-hero.mp4 for the wave background */}
      <VideoWaveBg
        src="/media/waves-hero.mp4"
        opacity={0.5}
        fallbackVariant="warm"
        veil="linear-gradient(180deg, rgba(243,234,215,0.6) 0%, rgba(243,234,215,0.35) 40%, var(--cream) 96%)"
      />

      <div className="container" style={{ position: "relative", zIndex: 3, width: "100%" }}>
        <div className="r-hero" style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 60, alignItems: "center" }}>
          {/* LEFT — the promise */}
          <div>
            <div className="eyebrow" data-hero-stagger>
              <span className="dot" /> aura club · for cafés &amp; restaurants
            </div>

            <h1 data-hero-stagger style={{ marginTop: 30, fontFamily: "var(--display)", fontWeight: 600, fontSize: "clamp(52px, 7vw, 104px)", letterSpacing: "-0.045em", lineHeight: 0.96 }}>
              Your neighborhood's favorite.<br />
              <span className="serif-it" style={{ fontWeight: 400, color: "var(--terra)", fontSize: "1.02em" }}>On purpose.</span>
            </h1>

            <p data-hero-stagger style={{ marginTop: 26, maxWidth: 440, fontSize: 18, lineHeight: 1.55, color: "var(--ink-soft)" }}>
              The club that turns first visits into rituals — loyalty, offers, and ordering your regulars actually love.
            </p>

            <div data-hero-stagger style={{ marginTop: 36, display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center" }}>
              <a href="#offer" className="btn-primary" style={{ padding: "18px 28px", fontSize: 15 }}>
                Claim your free month <span className="arrow-circle">→</span>
              </a>
              <a href="#journey" className="btn-secondary">See how it feels ↓</a>
            </div>

            <div data-hero-stagger style={{ marginTop: 48, display: "flex", gap: 24, fontSize: 11, fontFamily: "var(--mono)", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted)" }}>
              <span>First month free</span>
              <span>·</span>
              <span>A few partners per neighborhood</span>
            </div>
          </div>

          {/* RIGHT — the phone, clean, no clutter */}
          <div className="hide-mobile" style={{ position: "relative", height: 660, pointerEvents: "none" }}>
            <div style={{ position: "absolute", left: "50%", top: 0, transform: "translateX(-50%)", width: 320, height: 660 }}>
              {/* hero-glow.png: warm analog bokeh light-leak — gracefully absent until dropped in */}
              <BrandPhoto src="/assets/brand/hero-glow.png" alt="" fallback={null} radius={0}
                style={{ position: "absolute", inset: -80, zIndex: 0, mixBlendMode: "screen", opacity: 0.9 }}
                imgStyle={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{
                position: "absolute", inset: -60,
                background: "radial-gradient(ellipse at 50% 40%, rgba(214,122,69,0.45), transparent 60%)",
                filter: "blur(50px)"
              }} />
              <div data-hero-phone style={{ position: "relative", animation: "float-y-2 8s ease-in-out infinite" }}>
                <HeroMoment />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════
   SECTION 2 — THE WELCOME. Breathing room: manifesto, dual
   vignettes (café + restaurant), ecosystem teaser. Trust before pain.
   ════════════════════════════════════════════════════════════════ */
function MockTable() {
  return (
    <div style={{ padding: 14, borderRadius: 14, background: "linear-gradient(135deg, rgba(157,170,126,0.14), rgba(229,177,74,0.1))", border: "1px solid rgba(42,31,24,0.06)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10.5, color: "var(--muted)", fontFamily: "var(--mono)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
        <span>Tonight</span><span>19:30</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 8 }}>
        <div style={{ width: 30, height: 30, borderRadius: 9, background: "var(--sage)", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700 }}>R</div>
        <div>
          <div style={{ fontWeight: 600, fontSize: 13.5 }}>The Riveras · table 4</div>
          <div style={{ fontSize: 11.5, color: "var(--muted)" }}>3rd visit this month · birthday Friday</div>
        </div>
      </div>
    </div>
  );
}

function WelcomeSection() {
  const vignettes = [
    {
      key: "cafe",
      img: "/assets/brand/cafe-corner.jpg",
      grad: "linear-gradient(135deg, rgba(214,122,69,0.16), rgba(229,177,74,0.1))",
      title: "The corner café",
      copy: "Where the 7 AM regulars have a usual — and a streak that brings them back tomorrow.",
      mock: <MockLoyalty />,
    },
    {
      key: "kitchen",
      img: "/assets/brand/kitchen-warm.jpg",
      grad: "linear-gradient(135deg, rgba(157,170,126,0.16), rgba(220,139,126,0.1))",
      title: "The neighborhood kitchen",
      copy: "Where Friday tables come back on Sunday — birthdays remembered, favorites saved.",
      mock: <MockTable />,
    },
  ];
  return (
    <section id="welcome" className="section grain grain-soft" style={{ background: "var(--cream-warm)", paddingTop: 170, paddingBottom: 170 }}>
      <div style={{ position: "absolute", left: "50%", top: 0, transform: "translateX(-50%)", width: 900, height: 500, background: "radial-gradient(ellipse, rgba(229,177,74,0.14), transparent 60%)", filter: "blur(50px)", pointerEvents: "none" }} />
      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        {/* manifesto */}
        <Reveal>
          <div style={{ textAlign: "center", maxWidth: 920, margin: "0 auto" }}>
            <div className="eyebrow" style={{ justifyContent: "center" }}><span className="dot" /> The welcome</div>
            <h2 className="serif-it" style={{ marginTop: 30, fontWeight: 400, fontSize: "clamp(38px, 5.4vw, 84px)", letterSpacing: "-0.02em", lineHeight: 1.06, color: "var(--ink)" }}>
              Some places sell coffee.<br/>
              Some serve dinner.<br/>
              <span style={{ color: "var(--terra)" }}>Yours sells belonging.</span>
            </h2>
          </div>
        </Reveal>

        {/* dual vignettes — both rooms see themselves */}
        <div className="r-2" style={{ marginTop: 100, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, maxWidth: 980, marginInline: "auto" }}>
          {vignettes.map((v, i) => (
            <Reveal key={v.key} delay={i * 120}>
              <div className="card-hover" style={{
                padding: 26, borderRadius: 22,
                background: "rgba(252,247,236,0.9)",
                border: "1px solid rgba(42,31,24,0.08)",
                boxShadow: "0 30px 70px -40px rgba(42,31,24,0.25)",
                height: "100%", display: "flex", flexDirection: "column",
              }}>
                {/* MEDIA SLOT: abstract texture — graceful gradient until file lands */}
                <BrandPhoto src={v.img} alt="" radius={14} grade={0.18}
                  style={{ aspectRatio: "16 / 9" }}
                  fallback={<div style={{ aspectRatio: "16 / 9", borderRadius: 14, background: v.grad, border: "1px solid rgba(42,31,24,0.05)" }} />} />
                <h3 style={{ marginTop: 22, fontFamily: "var(--display)", fontWeight: 600, fontSize: 24, letterSpacing: "-0.03em" }}>{v.title}</h3>
                <p style={{ marginTop: 10, fontSize: 15, lineHeight: 1.55, color: "var(--ink-soft)", flex: 1 }}>{v.copy}</p>
                <div style={{ marginTop: 20 }}>{v.mock}</div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* ecosystem teaser → leads into the journey */}
        <Reveal delay={100}>
          <div style={{ marginTop: 110, textAlign: "center" }}>
            <div style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--muted)" }}>Aura isn't an app</div>
            <p className="serif-it" style={{ marginTop: 16, fontSize: "clamp(26px, 3vw, 42px)", letterSpacing: "-0.015em", lineHeight: 1.15, color: "var(--ink)", maxWidth: 640, marginInline: "auto" }}>
              It's the whole ecosystem behind your room.
            </p>
            <div style={{ marginTop: 28, color: "var(--terra)", animation: "float-y 3s ease-in-out infinite", fontSize: 20 }} aria-hidden="true">↓</div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════
   SECTION 5 — THE LEAK. Dark pivot: what staying as-is costs.
   Lands after the dream, right before the zone scarcity.
   ════════════════════════════════════════════════════════════════ */
function LeakSection() {
  const beats = [
    { i: <Icon.chart />, t: "Delivery apps take 15–30% of every order.", s: "Every order through someone else's app shrinks your margin." },
    { i: <Icon.globe />, t: "The algorithm decides who sees you.", s: "Reach you spent months earning can vanish overnight. Rented attention is never yours." },
    { i: <Icon.rotate />, t: "Great first visits walk away forever.", s: "Most customers come once, love it — and never think of you again." },
  ];

  return (
    <section className="grain grain-on-dark" id="leak" data-pin-problem style={{ position: "relative", background: "var(--espresso)", color: "var(--cream)", minHeight: "170vh" }}>
      <div style={{ position: "sticky", top: 0, height: "100vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
        {/* candle warmth */}
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse 700px 600px at 75% 30%, rgba(232,172,88,0.16), transparent 65%), radial-gradient(ellipse 800px 600px at 15% 85%, rgba(214,122,69,0.12), transparent 60%)",
          pointerEvents: "none",
        }} />
        <div className="container" style={{ position: "relative", zIndex: 3 }}>
          <div className="r-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
            {/* LEFT — framing + count-up + leak viz */}
            <div>
              <div className="eyebrow" style={{ color: "rgba(243,234,215,0.6)" }}>
                <span className="dot" /> What leaving it to chance costs
              </div>
              <h2 style={{ marginTop: 26, fontFamily: "var(--display)", fontWeight: 600, fontSize: "clamp(38px, 4.8vw, 70px)", letterSpacing: "-0.04em", lineHeight: 0.98 }}>
                <span data-count data-to="1420" data-prefix="$" style={{ color: "var(--saffron)" }}>$0</span>
                <span className="serif-it" style={{ fontWeight: 400, fontSize: "0.6em", display: "block", marginTop: 10, color: "rgba(243,234,215,0.85)" }}>walks out the door, every month.</span>
              </h2>
              <p style={{ marginTop: 18, maxWidth: 460, fontSize: 16, lineHeight: 1.55, color: "rgba(243,234,215,0.66)" }}>
                Commissions, ads, and one-time visitors quietly drain the margin you worked for. <span style={{ color: "var(--cream)" }}>Illustrative — your number is in the demo.</span>
              </p>

              {/* the $100 margin-leak viz */}
              <div style={{ marginTop: 32, padding: "20px 22px", borderRadius: 14, background: "rgba(243,234,215,0.05)", border: "1px solid var(--hairline-light)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", fontFamily: "var(--mono)", fontSize: 10.5, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(243,234,215,0.55)" }}>
                  <span>Out of every $100 a customer spends</span>
                  <span style={{ color: "var(--cream)" }}>you keep $51</span>
                </div>
                <div style={{ marginTop: 14, display: "flex", height: 30, borderRadius: 6, overflow: "hidden", boxShadow: "inset 0 0 0 1px rgba(243,234,215,0.1)" }}>
                  <div style={{ flex: 22, background: "rgba(214,122,69,0.4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 600, color: "var(--cream)" }}>−$22</div>
                  <div style={{ flex: 15, background: "rgba(141,107,141,0.38)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 600, color: "var(--cream)" }}>−$15</div>
                  <div style={{ flex: 12, background: "rgba(220,139,126,0.38)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 600, color: "var(--cream)" }}>−$12</div>
                  <div style={{ flex: 51, background: "var(--terra)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 600, color: "white", letterSpacing: "-0.01em" }}>$51 you</div>
                </div>
                <div style={{ marginTop: 12, display: "flex", gap: 18, flexWrap: "wrap", fontSize: 12, color: "rgba(243,234,215,0.6)" }}>
                  <span><span style={{ display: "inline-block", width: 8, height: 8, borderRadius: 2, background: "rgba(214,122,69,0.7)", marginRight: 6 }} />Delivery apps</span>
                  <span><span style={{ display: "inline-block", width: 8, height: 8, borderRadius: 2, background: "rgba(141,107,141,0.7)", marginRight: 6 }} />Buying back reach</span>
                  <span><span style={{ display: "inline-block", width: 8, height: 8, borderRadius: 2, background: "rgba(220,139,126,0.7)", marginRight: 6 }} />One-time visitors</span>
                </div>
              </div>
            </div>

            {/* RIGHT — rotating pain beats (scroll-driven) */}
            <div data-pain-stack style={{ position: "relative", height: 380 }}>
              <div data-pain-idx-wrap style={{ position: "absolute", top: 0, right: 0, fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.14em", color: "rgba(243,234,215,0.45)" }}>
                <span data-pain-idx>01</span> / <span>03</span>
              </div>

              {beats.map((p, i) =>
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
                  background: "rgba(243,234,215,0.07)",
                  border: "1px solid rgba(243,234,215,0.12)",
                  backdropFilter: "blur(16px)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "var(--saffron)"
                }}>{p.i}</div>
                  <h4 style={{ marginTop: 26, fontFamily: "var(--display)", fontWeight: 600, fontSize: "clamp(28px, 3.4vw, 48px)", letterSpacing: "-0.03em", lineHeight: 1.06, color: "var(--cream)" }}>{p.t}</h4>
                  <p style={{ marginTop: 14, maxWidth: 440, fontSize: 17, lineHeight: 1.5, color: "rgba(243,234,215,0.66)" }}>{p.s}</p>
                </div>
              )}

              <div data-pain-dots style={{ position: "absolute", bottom: 0, left: 0, display: "flex", gap: 6 }}>
                {beats.map((_, i) =>
                <span key={i} data-pain-dot data-idx={i} style={{
                  width: 26, height: 3, borderRadius: 2,
                  background: i === 0 ? "var(--saffron)" : "rgba(243,234,215,0.15)",
                  transition: "background .4s"
                }} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════
   SECTION 3 — STICKY PHONE JOURNEY. The centerpiece.
   Phone pins center; screens swap inside; beats alternate sides.
   ════════════════════════════════════════════════════════════════ */
const JOURNEY_BEATS = [
  {
    k: "01", side: "left", title: "Join",
    big: <>Scan once.<br/><span className="serif-it" style={{ fontWeight: 400, color: "var(--terra)" }}>In the club.</span></>,
    body: "No app store, no signup walls. A QR on the counter and they're a member before their coffee — or their table — is ready.",
    screen: "home",
  },
  {
    k: "02", side: "right", title: "Earn",
    big: <>Every visit<br/><span className="serif-it" style={{ fontWeight: 400, color: "var(--terra)" }}>counts.</span></>,
    body: "Points they can feel, a tier worth chasing, a mystery spin that makes the receipt the fun part.",
    screen: "spin",
  },
  {
    k: "03", side: "left", title: "Return",
    big: <>Slow hours<br/><span className="serif-it" style={{ fontWeight: 400, color: "var(--terra)" }}>fill themselves.</span></>,
    body: "Aura writes the offer for you — the right perk, to the right regulars, at exactly the right hour.",
    screen: "happy",
  },
  {
    k: "04", side: "right", title: "Belong",
    big: <>They keep<br/><span className="serif-it" style={{ fontWeight: 400, color: "var(--terra)" }}>the streak alive.</span></>,
    body: "Streaks, status, their name remembered. Your café becomes a habit they protect.",
    screen: "streak",
  },
];

const JOURNEY_SCREENS = {
  home: <ScreenHome />,
  spin: <ScreenSpin />,
  happy: <ScreenHappyHour />,
  streak: <ScreenStreak />,
};

function StickyPhoneJourney() {
  return (
    <section id="journey" data-pin-journey style={{ position: "relative", background: "var(--cream)", minHeight: "300vh" }}>
      {/* DESKTOP — pinned cinematic stage */}
      <div className="journey-desktop" style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden", display: "flex", alignItems: "center" }}>
        <div className="grain grain-soft" style={{ position: "absolute", inset: 0 }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse 700px 800px at 50% 45%, rgba(214,122,69,0.14), transparent 65%)",
          pointerEvents: "none",
        }} />
        <div className="container" style={{ position: "relative", zIndex: 3, width: "100%" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 360px 1fr", gap: 40, alignItems: "center", minHeight: 640 }}>
            {/* LEFT beats (01, 03) */}
            <div style={{ position: "relative", height: 420 }}>
              {JOURNEY_BEATS.map((b, i) => b.side === "left" && (
                <div key={b.k} data-journey-beat data-idx={i} style={{
                  position: "absolute", inset: 0,
                  display: "flex", flexDirection: "column", justifyContent: "center",
                  opacity: i === 0 ? 1 : 0,
                  transform: i === 0 ? "none" : "translateY(24px)",
                  transition: "opacity .7s cubic-bezier(.2,.7,.2,1), transform .7s cubic-bezier(.2,.7,.2,1)",
                }}>
                  <div style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--muted)" }}>{b.k} · {b.title}</div>
                  <h3 style={{ marginTop: 18, fontFamily: "var(--display)", fontWeight: 600, fontSize: "clamp(36px, 3.6vw, 58px)", letterSpacing: "-0.04em", lineHeight: 1.0 }}>{b.big}</h3>
                  <p style={{ marginTop: 16, maxWidth: 380, fontSize: 16, lineHeight: 1.55, color: "var(--ink-soft)" }}>{b.body}</p>
                </div>
              ))}
            </div>

            {/* CENTER — the pinned phone with swapping screens */}
            <div style={{ position: "relative", display: "flex", justifyContent: "center" }}>
              <div style={{
                position: "absolute", inset: -50,
                background: "radial-gradient(ellipse at 50% 45%, rgba(214,122,69,0.35), transparent 62%)",
                filter: "blur(46px)",
              }} />
              <div data-journey-phone style={{ position: "relative" }}>
                <Phone scale={1}>
                  <div style={{ position: "relative", height: "100%" }}>
                    {Object.entries(JOURNEY_SCREENS).map(([key, node], i) => (
                      <div key={key} data-journey-screen data-idx={i} style={{
                        position: "absolute", inset: 0,
                        opacity: i === 0 ? 1 : 0,
                        transform: i === 0 ? "scale(1)" : "scale(0.97)",
                        transition: "opacity .55s cubic-bezier(.2,.7,.2,1), transform .55s cubic-bezier(.2,.7,.2,1)",
                      }}>{node}</div>
                    ))}
                  </div>
                </Phone>
              </div>
            </div>

            {/* RIGHT beats (02, 04) */}
            <div style={{ position: "relative", height: 420 }}>
              {JOURNEY_BEATS.map((b, i) => b.side === "right" && (
                <div key={b.k} data-journey-beat data-idx={i} style={{
                  position: "absolute", inset: 0,
                  display: "flex", flexDirection: "column", justifyContent: "center",
                  opacity: 0,
                  transform: "translateY(24px)",
                  transition: "opacity .7s cubic-bezier(.2,.7,.2,1), transform .7s cubic-bezier(.2,.7,.2,1)",
                }}>
                  <div style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--muted)" }}>{b.k} · {b.title}</div>
                  <h3 style={{ marginTop: 18, fontFamily: "var(--display)", fontWeight: 600, fontSize: "clamp(36px, 3.6vw, 58px)", letterSpacing: "-0.04em", lineHeight: 1.0 }}>{b.big}</h3>
                  <p style={{ marginTop: 16, maxWidth: 380, fontSize: 16, lineHeight: 1.55, color: "var(--ink-soft)" }}>{b.body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* progress dots */}
          <div style={{ position: "absolute", bottom: 48, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 6 }}>
            {JOURNEY_BEATS.map((_, i) => (
              <span key={i} data-journey-dot data-idx={i} style={{
                width: 26, height: 3, borderRadius: 2,
                background: i === 0 ? "var(--terra)" : "rgba(42,31,24,0.15)",
                transition: "background .4s",
              }} />
            ))}
          </div>
        </div>
      </div>

      {/* MOBILE — one phone auto-cycling through the 4 screens, compact beats */}
      <div className="journey-mobile">
        <MobileJourney />
      </div>
    </section>
  );
}

/* Mobile journey: a single phone that auto-advances through the 4 ritual
   screens while in view; beat copy crossfades with it. Short, premium, no
   4-phone stack. Pauses when scrolled away (saves battery / main thread). */
function MobileJourney() {
  const [i, setI] = useState(0);
  const wrapRef = useRef(null);
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    let timer = null;
    const start = () => { if (!timer) timer = setInterval(() => setI((n) => (n + 1) % JOURNEY_BEATS.length), 2600); };
    const stop = () => { if (timer) { clearInterval(timer); timer = null; } };
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()), { threshold: 0.25 });
    io.observe(el);
    return () => { stop(); io.disconnect(); };
  }, []);
  const beat = JOURNEY_BEATS[i];
  return (
    <div ref={wrapRef} className="container" style={{ padding: "96px 20px 104px", textAlign: "center" }}>
      <div style={{ position: "relative", width: 300, height: 600, margin: "0 auto" }}>
        <div style={{ position: "absolute", inset: -30, background: "radial-gradient(ellipse at 50% 45%, rgba(214,122,69,0.3), transparent 62%)" }} />
        {Object.entries(JOURNEY_SCREENS).map(([key, node], n) => (
          <div key={key} style={{
            position: "absolute", inset: 0,
            opacity: n === i ? 1 : 0,
            transform: n === i ? "scale(1)" : "scale(0.97)",
            transition: "opacity .5s cubic-bezier(.2,.7,.2,1), transform .5s cubic-bezier(.2,.7,.2,1)",
            pointerEvents: "none",
          }}>
            <Phone scale={0.92}>{node}</Phone>
          </div>
        ))}
      </div>

      <div style={{ position: "relative", minHeight: 132, marginTop: 32 }}>
        {JOURNEY_BEATS.map((b, n) => (
          <div key={b.k} style={{
            position: n === i ? "relative" : "absolute", inset: 0,
            opacity: n === i ? 1 : 0,
            transition: "opacity .5s cubic-bezier(.2,.7,.2,1)",
            pointerEvents: n === i ? "auto" : "none",
          }}>
            <div style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--muted)" }}>{b.k} · {b.title}</div>
            <h3 style={{ marginTop: 12, fontFamily: "var(--display)", fontWeight: 600, fontSize: "clamp(30px, 8vw, 40px)", letterSpacing: "-0.035em", lineHeight: 1.04 }}>{b.big}</h3>
            <p style={{ marginTop: 12, fontSize: 16, lineHeight: 1.55, color: "var(--ink-soft)", maxWidth: 420, marginInline: "auto" }}>{b.body}</p>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 26, display: "flex", justifyContent: "center", gap: 8 }}>
        {JOURNEY_BEATS.map((_, n) => (
          <button key={n} onClick={() => setI(n)} aria-label={`Step ${n + 1}`} style={{
            width: n === i ? 26 : 16, height: 16, padding: 0, borderRadius: 999,
            background: "transparent", position: "relative",
          }}>
            <span style={{ position: "absolute", left: 0, right: 0, top: "50%", transform: "translateY(-50%)", height: 3, borderRadius: 2, background: n === i ? "var(--terra)" : "rgba(42,31,24,0.18)", transition: "background .3s" }} />
          </button>
        ))}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   SECTION 4 — LIQUID GLASS ECOSYSTEM. One membership, everything.
   Floating glass cards travel through center as you scroll.
   ════════════════════════════════════════════════════════════════ */
function GlassPillar({ icon, tag, title, copy, accent, children, lift = 0 }) {
  return (
    <div data-h-panel data-tilt className="glass-card" style={{ width: 350, flexShrink: 0, padding: 28, marginTop: lift }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ width: 42, height: 42, borderRadius: 12, background: accent, color: "white", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 12px 26px -10px ${accent}` }}>{icon}</div>
        <span className="mono" style={{ color: "var(--muted)" }}>{tag}</span>
      </div>
      <h3 style={{ marginTop: 22, fontFamily: "var(--display)", fontWeight: 600, fontSize: 24, letterSpacing: "-0.03em", lineHeight: 1.08 }}>{title}</h3>
      <p style={{ marginTop: 10, fontSize: 14, lineHeight: 1.55, color: "var(--ink-soft)" }}>{copy}</p>
      {children && <div style={{ marginTop: 18 }}>{children}</div>}
    </div>
  );
}

function GlassEcosystem() {
  return (
    <section id="ecosystem" data-h-drift style={{ position: "relative", background: "var(--cream-warm)", minHeight: "340vh" }}>
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>
        {/* vivid warmth behind the glass so the blur reads */}
        <div style={{ position: "absolute", inset: 0, opacity: 0.9, pointerEvents: "none" }}>
          <GradientRibbons variant="warm" opacity={0.9} />
        </div>
        <div className="grain grain-soft" style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />

        {/* header */}
        <div className="glass-head" style={{ position: "absolute", top: "clamp(70px, 9vh, 120px)", left: 0, right: 0, textAlign: "center", zIndex: 3, padding: "0 24px", pointerEvents: "none" }}>
          <div className="eyebrow" style={{ justifyContent: "center" }}><span className="dot" /> Not an app — an ecosystem</div>
          <h2 style={{ marginTop: 16, fontFamily: "var(--display)", fontWeight: 600, fontSize: "clamp(32px, 4.2vw, 60px)", letterSpacing: "-0.04em", lineHeight: 1.0 }}>
            One membership. <span className="serif-it" style={{ fontWeight: 400, color: "var(--terra)" }}>The whole ecosystem.</span>
          </h2>
        </div>

        {/* the floating glass track */}
        <div data-h-track style={{
          display: "flex", alignItems: "center", gap: 36, height: "100%",
          paddingLeft: "calc(50vw - 175px)", paddingRight: "calc(50vw - 175px)",
          paddingTop: 110,
          width: "max-content", willChange: "transform",
        }}>
          <GlassPillar icon={<Icon.crown />} tag="Loyalty" title="Loyalty & status" accent="var(--terra)" lift={-20}
            copy="Points, tiers, streaks, and a name remembered — paper cards never did this.">
            <MockLoyalty />
          </GlassPillar>

          <GlassPillar icon={<Icon.qr />} tag="Ordering" title="Direct ordering" accent="var(--saffron)" lift={36}
            copy="QR menus and pickup, commission-free. The orders you earn stay yours — margin and all." />

          {/* human moment — a voice between the pillars */}
          <div data-h-panel data-tilt className="glass-card" style={{ width: 330, flexShrink: 0, padding: 30, marginTop: -44 }}>
            <div className="serif-it" aria-hidden="true" style={{ fontSize: 44, lineHeight: 0.6, color: "var(--terra)", opacity: 0.5 }}>&ldquo;</div>
            <p className="serif-it" style={{ marginTop: 14, fontSize: 19, lineHeight: 1.4, letterSpacing: "-0.01em", color: "var(--ink)" }}>
              It feels like having a marketing person I couldn't afford.
            </p>
            <div style={{ marginTop: 16, fontSize: 12.5, color: "var(--muted)" }}>David · Jollof &amp; Co, Houston</div>
          </div>

          <GlassPillar icon={<Icon.spark />} tag="Marketing" title="AI marketing" accent="var(--plum)" lift={10}
            copy="It watches your slow hours and quiet regulars, then writes the campaign for you.">
            <MockAIIdea />
          </GlassPillar>

          <GlassPillar icon={<Icon.heart />} tag="Content" title="Creative content" accent="var(--rose)" lift={-30}
            copy="On-brand posts, promos, and signage — a content studio that knows your menu." />

          {/* dashboard glimpse — the tease, not the tour */}
          <div data-h-panel data-tilt className="glass-card glass-card-dark" style={{ width: 370, flexShrink: 0, padding: 24, marginTop: 30 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <span className="mono" style={{ color: "rgba(243,234,215,0.55)" }}>Visits · last 30 days</span>
              <span style={{ fontFamily: "var(--display)", fontSize: 15, fontWeight: 600, color: "#B9C99C" }}>↗ +28%</span>
            </div>
            <div style={{ fontFamily: "var(--display)", fontSize: 28, fontWeight: 600, letterSpacing: "-0.035em", marginTop: 8 }}>
              <span data-count data-to="612" data-prefix="+$">+$0</span>
              <span style={{ fontSize: 13, fontWeight: 400, color: "rgba(243,234,215,0.55)", marginLeft: 8 }}>margin this week</span>
            </div>
            <BigChart />
          </div>

          <GlassPillar icon={<Icon.users />} tag="Community" title="Community & events" accent="var(--sage)" lift={-14}
            copy="Tastings, launch nights, member moments — bonds that algorithms can't touch." />

          <GlassPillar icon={<Icon.trend />} tag="Insights" title="Insights that matter" accent="var(--honey)" lift={40}
            copy="Who's returning, who's fading, what worked — in plain language, not dashboards." />
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════
   SECTION 5 — THE CLUB & THE ZONE. Community + scarcity.
   ════════════════════════════════════════════════════════════════ */
function ZoneMap() {
  /* deterministic dot grid — a quiet abstract neighborhood */
  const dots = [];
  for (let r = 0; r < 7; r++) {
    for (let c = 0; c < 10; c++) {
      dots.push({ x: 30 + c * 38 + (r % 2) * 19, y: 30 + r * 38, key: `${r}-${c}` });
    }
  }
  const taken = new Set(["1-2", "2-7", "4-4"]);
  const yours = "3-6";
  return (
    <svg viewBox="0 0 440 290" style={{ width: "100%", maxWidth: 520, display: "block" }} aria-label="A neighborhood map: a few partner spots taken, one zone open for you">
      {dots.map((d) => {
        if (d.key === yours) {
          return (
            <g key={d.key}>
              <circle cx={d.x} cy={d.y} r="16" fill="none" stroke="var(--terra)" strokeWidth="1.5" opacity="0.8" style={{ animation: "pulse-glow 2.4s ease-in-out infinite" }} />
              <circle cx={d.x} cy={d.y} r="7" fill="var(--terra)" data-zone-dot />
            </g>
          );
        }
        if (taken.has(d.key)) {
          return <circle key={d.key} cx={d.x} cy={d.y} r="6" fill="var(--saffron)" opacity="0.85" data-zone-dot />;
        }
        return <circle key={d.key} cx={d.x} cy={d.y} r="2.5" fill="rgba(243,234,215,0.85)" opacity="0.22" />;
      })}
    </svg>
  );
}

/* ════════════════════════════════════════════════════════════════
   SECTION 6 — PROOF & THE OFFER. Count-ups, one voice, the deal.
   ════════════════════════════════════════════════════════════════ */
const STORIES = [
  {
    quote: "We stopped renting our regulars from delivery apps. People actually chase the streak — they tell me they came in just to keep it alive.",
    name: "Elena Moretti", role: "Owner · Caffè Lumo, Brooklyn",
    img: "/assets/testimonials/elena-moretti.jpg", accent: "var(--terra)",
  },
  {
    quote: "It nudges me when a Tuesday's going to be slow and writes the post for me. It feels like having a marketing person I couldn't afford.",
    name: "David Okonkwo", role: "Owner · Jollof & Co, Houston",
    img: "/assets/testimonials/david-okonkwo.jpg", accent: "var(--plum)",
  },
  {
    quote: "Customers used to visit once and vanish. Now I see who's fading and bring them back before I lose them. My mornings finally feel predictable.",
    name: "Mei Tanaka", role: "Owner · Hojicha House, Seattle",
    img: "/assets/testimonials/mei-tanaka.jpg", accent: "var(--rose)",
  },
];

function TestimonialAvatar({ src, name, accent }) {
  // Load-gated like BrandPhoto — show initials until/unless the photo decodes,
  // so a missing avatar never paints a broken-image glyph.
  const [loaded, setLoaded] = useState(false);
  const initials = name.split(" ").map((w) => w[0]).slice(0, 2).join("");
  useEffect(() => {
    if (!src) return;
    let alive = true;
    const img = new Image();
    img.onload = () => { if (alive) setLoaded(true); };
    img.src = src;
    if (img.complete && img.naturalWidth > 0) setLoaded(true);
    return () => { alive = false; };
  }, [src]);
  return (
    <div style={{
      width: 52, height: 52, borderRadius: "50%", flexShrink: 0, overflow: "hidden",
      background: accent, color: "white",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "var(--display)", fontWeight: 600, fontSize: 18, letterSpacing: "-0.02em",
      boxShadow: "0 8px 20px -10px rgba(42,31,24,0.4)",
    }}>
      {loaded
        ? <img src={src} alt={`${name}, café owner`} decoding="async"
               style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        : <span aria-hidden="true">{initials}</span>}
    </div>
  );
}

function RotatingTestimonial() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % STORIES.length), 6500);
    return () => clearInterval(t);
  }, []);
  const s = STORIES[idx];
  return (
    <div style={{ position: "relative", minHeight: 200, maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
      {STORIES.map((story, i) => (
        <figure key={story.name} style={{
          position: i === idx ? "relative" : "absolute", inset: 0, margin: 0,
          opacity: i === idx ? 1 : 0,
          transition: "opacity .8s cubic-bezier(.2,.7,.2,1)",
          pointerEvents: i === idx ? "auto" : "none",
        }}>
          <blockquote className="serif-it" style={{ margin: 0, fontSize: "clamp(22px, 2.6vw, 32px)", lineHeight: 1.35, color: "var(--ink)", letterSpacing: "-0.015em" }}>
            &ldquo;{story.quote}&rdquo;
          </blockquote>
          <figcaption style={{ marginTop: 24, display: "flex", alignItems: "center", justifyContent: "center", gap: 14 }}>
            <TestimonialAvatar src={story.img} name={story.name} accent={story.accent} />
            <div style={{ textAlign: "left" }}>
              <div style={{ fontWeight: 600, fontSize: 15, color: "var(--ink)" }}>{story.name}</div>
              <div style={{ fontSize: 12.5, color: "var(--muted)" }}>{story.role}</div>
            </div>
          </figcaption>
        </figure>
      ))}
      <div style={{ marginTop: 22, display: "flex", justifyContent: "center", gap: 2 }}>
        {STORIES.map((_, i) => (
          <button key={i} onClick={() => setIdx(i)} aria-label={`Show testimonial ${i + 1}`} style={{
            width: 28, height: 28, padding: 0, background: "transparent",
            display: "inline-flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{
              width: i === idx ? 26 : 10, height: 3, borderRadius: 2,
              background: i === idx ? "var(--terra)" : "rgba(42,31,24,0.18)",
              transition: "width .3s, background .3s",
            }} />
          </button>
        ))}
      </div>
    </div>
  );
}

function OfferSection() {
  const metrics = [
    { to: 38, prefix: "+", suffix: "%", l: "repeat visits" },
    { to: 2.4, dec: 1, suffix: "×", l: "direct orders" },
    { to: 14, suffix: "", l: "days to launch" },
    { v: "0%", l: "order commissions" },
  ];
  return (
    <section id="offer" className="section grain grain-soft" style={{ background: "var(--sand)", paddingTop: 150, paddingBottom: 150 }}>
      <div className="container">
        {/* metric band */}
        <Reveal>
          <div className="r-4" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, maxWidth: 980, margin: "0 auto" }}>
            {metrics.map((m) => (
              <div key={m.l} style={{ textAlign: "center", padding: "10px 8px" }}>
                <div style={{ fontFamily: "var(--display)", fontWeight: 600, fontSize: "clamp(34px, 3.4vw, 52px)", letterSpacing: "-0.04em", lineHeight: 1, color: "var(--ink)" }}>
                  {m.v
                    ? m.v
                    : <span data-count data-to={m.to} data-prefix={m.prefix || ""} data-suffix={m.suffix || ""} data-decimals={m.dec || 0}>{(m.prefix || "") + "0" + (m.suffix || "")}</span>}
                </div>
                <div style={{ marginTop: 10, fontSize: 11.5, color: "var(--muted)", fontFamily: "var(--mono)", letterSpacing: "0.12em", textTransform: "uppercase" }}>{m.l}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 14, textAlign: "center", fontSize: 10.5, fontFamily: "var(--mono)", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)" }}>
            Illustrative partner targets · your results depend on menu, market &amp; effort
          </div>
        </Reveal>

        {/* one voice */}
        <div style={{ marginTop: 90 }}>
          <Reveal><RotatingTestimonial /></Reveal>
        </div>

        {/* the offer card */}
        <Reveal delay={80}>
          <div data-offer-card style={{
            marginTop: 100, maxWidth: 760, marginInline: "auto",
            padding: "clamp(36px, 5vw, 60px)",
            borderRadius: 28, textAlign: "center",
            background: "linear-gradient(160deg, var(--ink) 0%, #3A2A1F 100%)",
            color: "var(--cream)",
            border: "1px solid rgba(243,234,215,0.14)",
            boxShadow: "0 60px 120px -50px rgba(214,122,69,0.45), 0 30px 60px -30px rgba(42,31,24,0.5)",
            position: "relative", overflow: "hidden",
          }}>
            <div style={{ position: "absolute", right: -100, top: -100, width: 320, height: 320, background: "radial-gradient(circle, rgba(214,122,69,0.4), transparent 60%)", filter: "blur(40px)" }} />
            <div style={{ position: "relative" }}>
              <div className="eyebrow" style={{ justifyContent: "center", color: "rgba(243,234,215,0.65)" }}>
                <span className="dot" style={{ background: "var(--saffron)", boxShadow: "0 0 10px var(--saffron)" }} /> The founding offer
              </div>
              <h2 style={{ marginTop: 22, fontFamily: "var(--display)", fontWeight: 600, fontSize: "clamp(40px, 5vw, 68px)", letterSpacing: "-0.04em", lineHeight: 0.98 }}>
                First month <span className="serif-it" style={{ fontWeight: 400, color: "var(--saffron)" }}>free.</span>
              </h2>
              <p style={{ marginTop: 18, maxWidth: 480, marginInline: "auto", fontSize: 16, lineHeight: 1.55, color: "rgba(243,234,215,0.72)" }}>
                We build your club with you and launch it in 14 days. No commissions on direct orders. No long contract. Pricing tailored on your demo.
              </p>
              <div style={{ marginTop: 34, display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                <a href="#close" className="btn-primary" style={{ background: "var(--cream)", color: "var(--ink)", padding: "18px 28px", fontSize: 15 }}>
                  Claim your zone <span className="arrow-circle" style={{ background: "var(--ink)", color: "var(--cream)" }}>→</span>
                </a>
              </div>
              <div style={{ marginTop: 30, display: "flex", justifyContent: "center", gap: 20, flexWrap: "wrap", fontSize: 10.5, fontFamily: "var(--mono)", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(243,234,215,0.5)" }}>
                <span>Works with your POS</span>
                <span>·</span>
                <span>Cancel anytime</span>
                <span>·</span>
                <span>You own the data</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════
   SECTION 7 — FINAL CLOSE. CTA + footer, one espresso-dark moment.
   ════════════════════════════════════════════════════════════════ */
function FinalClose() {
  return (
    <footer id="close" style={{ background: "var(--espresso)", color: "var(--cream)", padding: "150px 0 50px", position: "relative", overflow: "hidden" }}>
      {/* MEDIA SLOT: footer espresso macro + optional waves-cta.mp4 */}
      <BrandPhoto src="/assets/brand/footer-espresso.jpg" alt="" fill grade={0.7} fallback={null}
        imgStyle={{ opacity: 0.16 }} />
      <div style={{ position: "absolute", left: "50%", top: -80, transform: "translateX(-50%)", width: 800, height: 300, background: "radial-gradient(ellipse, rgba(232,172,88,0.2), transparent 60%)", filter: "blur(40px)", pointerEvents: "none" }} />

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        {/* the closing question + the zone claim (scarcity lives here, not its own section) */}
        <div style={{ textAlign: "center", maxWidth: 1000, margin: "0 auto 110px" }}>
          <h2 style={{ fontFamily: "var(--display)", fontWeight: 500, fontSize: "clamp(42px, 6vw, 92px)", letterSpacing: "-0.045em", lineHeight: 0.98 }}>
            Ready to be the place<br/>
            <span className="serif-it" style={{ fontWeight: 400, color: "var(--saffron)" }}>they come back to?</span>
          </h2>
          <p style={{ marginTop: 22, maxWidth: 540, marginInline: "auto", fontSize: 16, lineHeight: 1.55, color: "rgba(243,234,215,0.7)" }}>
            We don't sign everyone — only a few cafés &amp; kitchens per neighborhood, so your spotlight is never split.
          </p>

          {/* the zone claim card — map + live scarcity + the community promise */}
          <div className="glass-card glass-card-dark" data-tilt style={{
            marginTop: 44, maxWidth: 720, marginInline: "auto", padding: "clamp(28px, 4vw, 44px)",
            textAlign: "left",
          }}>
            <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.05fr) minmax(0, 0.95fr)", gap: "clamp(24px, 4vw, 44px)", alignItems: "center" }} className="r-2">
              <div>
                <span style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "8px 14px", borderRadius: 999,
                  background: "rgba(232,172,88,0.14)", border: "1px solid rgba(232,172,88,0.4)",
                  fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--saffron)",
                }}>
                  <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--saffron)", boxShadow: "0 0 8px var(--saffron)", animation: "pulse-glow 2.4s ease-in-out infinite" }} />
                  Only {ZONES_OPEN} of {ZONES_TOTAL} spots open nearby
                </span>
                <h3 style={{ marginTop: 18, fontFamily: "var(--display)", fontWeight: 600, fontSize: "clamp(28px, 3vw, 40px)", letterSpacing: "-0.03em", lineHeight: 1.02, color: "var(--cream)" }}>
                  Claim your zone.
                </h3>
                <p style={{ marginTop: 12, fontSize: 14, lineHeight: 1.55, color: "rgba(243,234,215,0.66)" }}>
                  Your growth team, not just software. Your customers and data stay yours — always.
                </p>
                <div style={{ marginTop: 26, display: "flex", gap: 12, flexWrap: "wrap" }}>
                  <a href="#offer" className="btn-primary" style={{ background: "var(--cream)", color: "var(--ink)", padding: "16px 26px", fontSize: 15 }}>
                    Claim your free month <span className="arrow-circle" style={{ background: "var(--ink)", color: "var(--cream)" }}>→</span>
                  </a>
                  <a href="#offer" className="btn-secondary btn-light">Book a 20-min demo</a>
                </div>
              </div>
              <div style={{ position: "relative" }}>
                <ZoneMap />
                <div style={{ marginTop: 16, display: "flex", gap: 18, fontSize: 12, color: "rgba(243,234,215,0.6)", justifyContent: "center", flexWrap: "wrap" }}>
                  <span><span style={{ display: "inline-block", width: 9, height: 9, borderRadius: "50%", background: "var(--saffron)", marginRight: 7 }} />Taken</span>
                  <span><span style={{ display: "inline-block", width: 9, height: 9, borderRadius: "50%", background: "var(--terra)", marginRight: 7 }} />Your zone</span>
                </div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: 30, display: "flex", justifyContent: "center", gap: 22, flexWrap: "wrap", fontSize: 10.5, fontFamily: "var(--mono)", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(243,234,215,0.45)" }}>
            <span>First month free</span>
            <span>·</span>
            <span>No commitment</span>
            <span>·</span>
            <span>Cancel anytime</span>
          </div>
        </div>

        {/* compressed footer */}
        <div style={{ paddingTop: 36, borderTop: "1px solid rgba(243,234,215,0.08)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 24 }}>
          <Logo light size={24} />
          <div style={{ display: "flex", gap: 26, fontSize: 13.5, color: "rgba(243,234,215,0.75)", flexWrap: "wrap" }}>
            <a href="#journey">How it feels</a>
            <a href="#ecosystem">Ecosystem</a>
            <a href="#offer">The Offer</a>
            <a href="/diagnostic">Café health check</a>
            <a href="#">Instagram</a>
            <a href="#">Email</a>
          </div>
        </div>
        <div style={{ marginTop: 26, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 16, fontSize: 10.5, fontFamily: "var(--mono)", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(243,234,215,0.4)" }}>
          <span>© {new Date().getFullYear()} Aura Club · for cafés &amp; restaurants</span>
          <div style={{ display: "flex", gap: 22 }}>
            <span>Privacy</span><span>Terms</span><span>Cookies</span>
          </div>
        </div>

        {/* mega wordmark — the last frame of the film */}
        <div style={{ marginTop: 50, fontFamily: "var(--serif)", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(120px, 24vw, 400px)", letterSpacing: "-0.04em", lineHeight: 0.85, color: "transparent", WebkitTextStroke: "1px rgba(232,172,88,0.16)", textAlign: "center" }}>aura</div>
      </div>
    </footer>
  );
}

/* ───────────── SCROLL PROGRESS AURA ───────────── */
function ScrollProgress() {
  const ref = useRef(null);
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const p = max > 0 ? window.scrollY / max : 0;
        if (ref.current) ref.current.style.width = `${(p * 100).toFixed(2)}%`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => { window.removeEventListener("scroll", onScroll); if (raf) cancelAnimationFrame(raf); };
  }, []);
  return <div ref={ref} className="scroll-aura" aria-hidden="true" />;
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
        <span style={{ color: "var(--cream)", fontSize: 13, fontWeight: 500, letterSpacing: "-0.005em" }}>1 month free · {ZONES_OPEN} zones open</span>
      </div>
      <a href="#offer" style={{
        padding: "10px 16px",
        borderRadius: 999,
        background: "var(--cream)",
        color: "var(--ink)",
        fontSize: 13, fontWeight: 600,
        display: "inline-flex", alignItems: "center", gap: 8,
        whiteSpace: "nowrap",
      }}>
        Claim yours <Icon.arrow style={{ width: 12, height: 12 }} />
      </a>
    </div>
  );
}

/* ===== app ===== */

function App() {
  /* ── Device-capability auto-tune (NOT OS reduced-motion) ──────────
     Weak devices (small viewport, few cores, coarse pointer) get `data-lite`
     on the landing root, which lightens GPU-heavy blur via CSS. Motion stays on. */
  useEffect(() => {
    const root = document.querySelector(".aura-landing-root");
    if (!root) return;
    const apply = () => {
      const small = window.matchMedia("(max-width: 860px)").matches;
      const coarse = window.matchMedia("(pointer: coarse)").matches;
      const lowCore = (navigator.hardwareConcurrency || 8) <= 4;
      // Lite = phones/tablets, or a touch device that's also core-starved.
      // A desktop with a fine pointer stays full-fidelity even at 4 cores.
      const lite = small || (coarse && lowCore);
      root.toggleAttribute("data-lite", lite);
    };
    apply();
    const mq = window.matchMedia("(max-width: 860px)");
    mq.addEventListener?.("change", apply);
    return () => mq.removeEventListener?.("change", apply);
  }, []);

  /* ── GSAP ScrollTrigger orchestration ───────────────────────────
     - Leak pin: 3 beats cycle
     - Journey pin: 4 app screens swap + side beats alternate
     - Horizontal drift: vertical scroll drives x
     - Count-ups: numbers animate in on view
  */
  useEffect(() => {
    if (typeof gsap === "undefined" || !gsap.registerPlugin) return;
    if (typeof ScrollTrigger === "undefined") return;

    // Motion stays ON for everyone (product decision) — we do NOT gate on
    // prefers-reduced-motion. gsap.matchMedia builds the cinematic pins above
    // 860px and tears them down below (CSS collapses those stages to static
    // stacks there); it re-evaluates on resize, so a small mount-time viewport
    // can't permanently disable the pins.
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    mm.add("(min-width: 861px)", () => {
      /* ── LEAK pin: 3 beats ── */
      const leak = document.querySelector("[data-pin-problem]");
      if (leak) {
        const cards = leak.querySelectorAll("[data-pain-card]");
        const dots  = leak.querySelectorAll("[data-pain-dot]");
        const idxEl = leak.querySelector("[data-pain-idx]");
        const showIdx = (i) => {
          cards.forEach((c, n) => {
            const active = n === i;
            c.style.opacity = active ? 1 : 0;
            c.style.transform = active ? "none" : `translateY(${n < i ? -24 : 24}px)`;
          });
          dots.forEach((d, n) => {
            d.style.background = n <= i ? "var(--saffron)" : "rgba(243,234,215,0.15)";
          });
          if (idxEl) idxEl.textContent = String(i + 1).padStart(2, "0");
        };
        ScrollTrigger.create({
          trigger: leak, start: "top top", end: "bottom bottom", scrub: 0.4,
          onUpdate: (self) => showIdx(Math.min(cards.length - 1, Math.floor(self.progress * cards.length))),
        });
        showIdx(0);
      }

      /* ── JOURNEY pin: 4 screens + beats ── */
      const journey = document.querySelector("[data-pin-journey]");
      if (journey) {
        const screens = journey.querySelectorAll("[data-journey-screen]");
        const beats = journey.querySelectorAll("[data-journey-beat]");
        const dots = journey.querySelectorAll("[data-journey-dot]");
        const show = (i) => {
          screens.forEach((s) => {
            const n = parseInt(s.dataset.idx, 10);
            const active = n === i;
            s.style.opacity = active ? 1 : 0;
            s.style.transform = active ? "scale(1)" : "scale(0.97)";
          });
          beats.forEach((b) => {
            const n = parseInt(b.dataset.idx, 10);
            const active = n === i;
            b.style.opacity = active ? 1 : 0;
            b.style.transform = active ? "none" : `translateY(${n < i ? -20 : 20}px)`;
          });
          dots.forEach((d) => {
            const n = parseInt(d.dataset.idx, 10);
            d.style.background = n <= i ? "var(--terra)" : "rgba(42,31,24,0.15)";
          });
        };
        ScrollTrigger.create({
          trigger: journey, start: "top top", end: "bottom bottom", scrub: 0.4,
          onUpdate: (self) => show(Math.min(JOURNEY_BEATS.length - 1, Math.floor(self.progress * JOURNEY_BEATS.length))),
        });
        show(0);
      }

      /* ── GLASS ECOSYSTEM: vertical scroll drives the cards horizontally ── */
      const drift = document.querySelector("[data-h-drift]");
      if (drift) {
        const track = drift.querySelector("[data-h-track]");
        if (track) {
          ScrollTrigger.create({
            trigger: drift, start: "top top", end: "bottom bottom", scrub: 0.5,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const max = Math.max(0, track.scrollWidth - window.innerWidth);
              gsap.set(track, { x: -max * self.progress });
            },
          });
        }
      }

      /* ── Hero stagger entrance ── */
      gsap.fromTo("[data-hero-stagger]",
        { opacity: 0, y: 26 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power2.out", stagger: 0.1, delay: 0.15 });

      return () => {}; // ScrollTriggers auto-revert via matchMedia scope
    });

    /* ── Count-ups (animate when allowed; otherwise show final values) ── */
    gsap.utils.toArray("[data-count]").forEach((el) => {
      const to = parseFloat(el.dataset.to || "0");
      const prefix = el.dataset.prefix || "";
      const suffix = el.dataset.suffix || "";
      const dec = el.dataset.decimals ? parseInt(el.dataset.decimals, 10) : 0;
      const fmt = (v) => prefix + v.toLocaleString("en-US", { maximumFractionDigits: dec, minimumFractionDigits: dec }) + suffix;
      const obj = { v: 0 };
      gsap.to(obj, {
        v: to, duration: 1.8, ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
        onUpdate: () => { el.textContent = fmt(obj.v); },
      });
    });

    /* ── Soft reveals ── */
    gsap.utils.toArray(".reveal").forEach((el) => {
      gsap.fromTo(el,
        { opacity: 0, y: 28 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        }
      );
    });

    /* ── Dopamine layer (gated only on real pointer capability) ── */
    const cleanups = [];
    const hasHover = window.matchMedia("(hover: hover)").matches;

    if (hasHover) {
      /* 3D tilt + light sweep on glass cards */
      document.querySelectorAll("[data-tilt]").forEach((card) => {
        const onMove = (e) => {
          const r = card.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width;
          const py = (e.clientY - r.top) / r.height;
          card.style.setProperty("--mx", `${(px * 100).toFixed(1)}%`);
          card.style.setProperty("--my", `${(py * 100).toFixed(1)}%`);
          card.style.transform = `perspective(900px) rotateX(${((0.5 - py) * 7).toFixed(2)}deg) rotateY(${((px - 0.5) * 7).toFixed(2)}deg)`;
        };
        const onLeave = () => { card.style.transform = ""; };
        card.addEventListener("mousemove", onMove);
        card.addEventListener("mouseleave", onLeave);
        cleanups.push(() => { card.removeEventListener("mousemove", onMove); card.removeEventListener("mouseleave", onLeave); });
      });

      /* magnetic primary CTAs */
      document.querySelectorAll(".btn-primary").forEach((btn) => {
        const onMove = (e) => {
          const r = btn.getBoundingClientRect();
          const dx = (e.clientX - (r.left + r.width / 2)) * 0.12;
          const dy = (e.clientY - (r.top + r.height / 2)) * 0.2;
          btn.style.transform = `translate(${Math.max(-6, Math.min(6, dx)).toFixed(1)}px, ${Math.max(-6, Math.min(6, dy)).toFixed(1)}px)`;
        };
        const onLeave = () => { btn.style.transform = ""; };
        btn.addEventListener("mousemove", onMove);
        btn.addEventListener("mouseleave", onLeave);
        cleanups.push(() => { btn.removeEventListener("mousemove", onMove); btn.removeEventListener("mouseleave", onLeave); });
      });
    }

    /* confetti — once, when the offer card reveals (always on) */
    {
      const offerCard = document.querySelector("[data-offer-card]");
      if (offerCard) {
        const io = new IntersectionObserver((entries) => {
          entries.forEach((en) => {
            if (!en.isIntersecting) return;
            io.disconnect();
            import("canvas-confetti").then(({ default: confetti }) => {
              const fire = (particleRatio, opts) => confetti({
                origin: { x: 0.5, y: 0.58 },
                colors: ["#D67A45", "#E5B14A", "#DC8B7E", "#8D6B8D", "#E8AC58"],
                disableForReducedMotion: false,
                particleCount: Math.floor(160 * particleRatio),
                scalar: 0.9,
                ...opts,
              });
              // layered burst reads richer than one pop
              fire(0.25, { spread: 26, startVelocity: 32 });
              fire(0.2, { spread: 60 });
              fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
              fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.1 });
              fire(0.1, { spread: 120, startVelocity: 45 });
            }).catch(() => {});
          });
        }, { threshold: 0.4 });
        io.observe(offerCard);
        cleanups.push(() => io.disconnect());
      }
    }

    return () => {
      mm.revert();
      ScrollTrigger.getAll().forEach((tr) => tr.kill());
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return (
    <>
      <TopNav />

      <ScrollProgress />
      <HeroSection />
      <WelcomeSection />
      <StickyPhoneJourney />
      <GlassEcosystem />
      <LeakSection />
      <OfferSection />
      <FinalClose />
      <MobileStickyCTA />
    </>
  );
}

export default App;
