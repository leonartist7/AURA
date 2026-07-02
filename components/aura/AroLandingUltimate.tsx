// @ts-nocheck
'use client';

/* AroLandingUltimate — the definitive synthesis.
   Master's craft + v3's conversion substance + the circle/aura direction +
   restrained scroll-storytelling. Daylight arc: cream morning → golden
   afternoon → espresso night (the leak) → warm proof → espresso close (dawn
   glow). Anti-slop rules enforced: no gradient blobs, no orbiting avatars,
   the ring appears exactly twice (hero signature + close sunrise), real-photo
   slots degrade to flat warm fields + grain + type — never decoration. */

import * as React from 'react';
import { motion } from 'framer-motion';
import { usePinnedProgress, win, lerp, seg, clamp } from '@/lib/scroll';

const { useState, useEffect, useRef } = React;

const EASE = [0.22, 1, 0.36, 1];
const ZONES_OPEN = 3;
const ZONES_TOTAL = 5;

/* ═══════════════ atoms ═══════════════ */

function Reveal({ children, delay = 0, y = 18, style = {}, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.7, ease: EASE, delay }}
      style={style}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Container({ children, style = {}, wide = false }) {
  return (
    <div style={{ width: '100%', maxWidth: wide ? 1240 : 1120, margin: '0 auto', padding: '0 clamp(20px, 4vw, 40px)', ...style }}>
      {children}
    </div>
  );
}

function Eyebrow({ children, light = false }) {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
        fontFamily: 'var(--mono)',
        fontSize: 11,
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: light ? 'rgba(243,234,215,0.6)' : 'var(--muted)',
      }}
    >
      <span style={{ width: 7, height: 7, borderRadius: 999, background: 'var(--terra)' }} />
      {children}
    </div>
  );
}

function RingMark({ size = 26, hole = 'var(--cream)' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" style={{ display: 'block' }}>
      <defs>
        <linearGradient id="ultRing" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D67A45" />
          <stop offset="50%" stopColor="#E5B14A" />
          <stop offset="100%" stopColor="#8D6B8D" />
        </linearGradient>
      </defs>
      <circle cx="16" cy="16" r="14" fill="url(#ultRing)" />
      <circle cx="16" cy="16" r="6.8" fill={hole} />
    </svg>
  );
}

function Wordmark({ light = false, size = 22 }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
      <RingMark size={size + 4} hole={light ? 'var(--espresso)' : 'var(--cream)'} />
      <span style={{ fontFamily: 'var(--display)', fontWeight: 700, fontSize: size, letterSpacing: '-0.04em', color: light ? 'var(--cream)' : 'var(--ink)' }}>
        aro
      </span>
    </span>
  );
}

/* organic curved seam — the previous section's colour sweeping into this one */
function ArcSeam({ from }) {
  return (
    <div aria-hidden style={{ position: 'absolute', top: -1, left: 0, right: 0, height: 110, overflow: 'hidden', pointerEvents: 'none' }}>
      <div
        style={{
          position: 'absolute',
          top: -230,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '150%',
          height: 330,
          borderRadius: '50%',
          background: from,
        }}
      />
    </div>
  );
}

/* photo slot: real image when present; a flat warm field + grain + quiet
   label while absent. NEVER a gradient blob. */
function PhotoSlot({ src, alt = '', label, field = '#E7D9BC', dark = false, ratio = '4/3', radius = 24, style = {}, imgStyle = {}, parallax = 0, bare = false }) {
  const [loaded, setLoaded] = useState(false);
  const ref = useRef(null);
  const [off, setOff] = useState(0);

  useEffect(() => {
    if (!parallax) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const t = clamp((window.innerHeight - r.top) / (window.innerHeight + r.height));
        setOff((t - 0.5) * parallax);
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); if (raf) cancelAnimationFrame(raf); };
  }, [parallax]);

  // "bare" slots are invisible until the real photo loads — no field, no grain
  const showChrome = loaded || !bare;
  return (
    <div
      ref={ref}
      className={showChrome ? (dark ? 'grain grain-on-dark' : 'grain grain-soft') : ''}
      style={{ position: 'relative', aspectRatio: ratio, borderRadius: radius, overflow: 'hidden', background: showChrome ? field : 'transparent', ...style }}
    >
      {/* real image — load-gated, warm-graded */}
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        style={{
          position: 'absolute',
          inset: parallax ? '-8% 0' : 0,
          width: '100%',
          height: parallax ? '116%' : '100%',
          objectFit: 'cover',
          opacity: loaded ? 1 : 0,
          transform: parallax ? `translateY(${off}px)` : 'none',
          transition: 'opacity 0.8s ease',
          ...imgStyle,
        }}
      />
      {loaded && (
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(214,122,69,0.06), rgba(31,22,18,0.1))', mixBlendMode: 'multiply', pointerEvents: 'none' }} />
      )}
      {/* quiet label while the photo is absent */}
      {!loaded && label && (
        <div style={{ position: 'absolute', left: 18, bottom: 16, fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: dark ? 'rgba(243,234,215,0.45)' : 'rgba(42,31,24,0.4)' }}>
          {label}
        </div>
      )}
    </div>
  );
}

/* ═══════════════ the living ring — signature #1 (hero) ═══════════════ */

const RING_FRAG = `
precision highp float;
uniform vec2 R; uniform float uTime; uniform float uReduced;
const float MAJ=1.0, MIN=0.36;
mat3 rotX(float a){float c=cos(a),s=sin(a);return mat3(1.,0.,0., 0.,c,-s, 0.,s,c);}
mat3 M;
float sdT(vec3 p){vec2 q=vec2(length(p.xz)-MAJ,p.y);return length(q)-MIN;}
float map(vec3 p){return sdT(M*p);}
vec3 N(vec3 p){vec2 e=vec2(0.001,0.);return normalize(vec3(map(p+e.xyy)-map(p-e.xyy),map(p+e.yxy)-map(p-e.yxy),map(p+e.yyx)-map(p-e.yyx)));}
float AO(vec3 p,vec3 n){float o=0.,s=1.;for(int i=0;i<5;i++){float h=0.01+0.12*float(i);o+=(h-map(p+n*h))*s;s*=0.85;}return clamp(1.-1.4*o,0.,1.);}
vec3 grad(float t){vec3 a=vec3(0.839,0.478,0.271),b=vec3(0.898,0.694,0.290),c=vec3(0.553,0.420,0.553);return t<0.5?mix(a,b,t*2.):mix(b,c,(t-0.5)*2.);}
void main(){
  vec2 uv=(gl_FragCoord.xy-0.5*R)/R.y;
  float br = uReduced>0.5 ? 0.0 : sin(uTime*1.1);
  M = rotX(1.30 + br*0.05);
  vec3 ro=vec3(0.,0.,4.6);
  vec3 rd=normalize(vec3(uv*1.85/(1.0+br*0.015), -2.0));
  float t=0.,hit=0.;
  for(int i=0;i<80;i++){vec3 p=ro+rd*t;float d=map(p);if(d<0.001){hit=1.;break;}if(t>9.)break;t+=d;}
  if(hit<0.5) discard;
  vec3 p=ro+rd*t; vec3 n=N(p); vec3 v=normalize(ro-p);
  float g=clamp(0.5+0.42*p.x+0.2*p.y,0.,1.);
  vec3 base=grad(g);
  vec3 lp=normalize(vec3(0.5,0.85,0.5));
  float dif=max(dot(n,lp),0.); float ao=AO(p,n);
  vec3 h=normalize(lp+v); float spe=pow(max(dot(n,h),0.),52.);
  float fres=pow(1.-max(dot(n,v),0.),3.);
  float pulse = uReduced>0.5 ? 0.5 : (0.5+0.5*sin(uTime*1.1));
  vec3 col=base*(vec3(0.94,0.88,0.8)*0.34*ao)+base*dif*vec3(1.04,0.97,0.86)+spe*vec3(1.,0.96,0.86)*(0.7+0.25*pulse)+fres*vec3(0.95,0.78,0.55)*(0.35+0.25*pulse);
  col=pow(col,vec3(0.86));
  gl_FragColor=vec4(col,1.0);
}`;

function LiveRing({ size = 220 }) {
  const canvasRef = useRef(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    let cleanup = () => {};
    try {
      const fine = window.matchMedia?.('(min-width: 900px) and (pointer: fine)').matches;
      const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
      const cv = canvasRef.current;
      if (!fine || !cv) return;
      const gl = cv.getContext('webgl', { antialias: true, alpha: true });
      if (!gl) return;
      setLive(true);

      const sh = (t, s) => { const o = gl.createShader(t); gl.shaderSource(o, s); gl.compileShader(o); return o; };
      const prog = gl.createProgram();
      gl.attachShader(prog, sh(gl.VERTEX_SHADER, 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}'));
      gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, RING_FRAG));
      gl.linkProgram(prog); gl.useProgram(prog);
      const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
      const loc = gl.getAttribLocation(prog, 'p'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
      const uR = gl.getUniformLocation(prog, 'R'), uT = gl.getUniformLocation(prog, 'uTime'), uRed = gl.getUniformLocation(prog, 'uReduced');

      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      cv.width = size * dpr; cv.height = size * dpr;
      gl.viewport(0, 0, cv.width, cv.height);

      let raf = 0, visible = true, t0 = 0;
      const io = new IntersectionObserver((e) => { visible = e[0].isIntersecting; }, { threshold: 0 });
      io.observe(cv);
      const frame = (ts) => {
        if (!t0) t0 = ts;
        if (visible) {
          gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT);
          gl.uniform2f(uR, cv.width, cv.height);
          gl.uniform1f(uT, (ts - t0) / 1000);
          gl.uniform1f(uRed, reduced ? 1 : 0);
          gl.drawArrays(gl.TRIANGLES, 0, 3);
        }
        raf = requestAnimationFrame(frame);
      };
      raf = requestAnimationFrame(frame);
      cleanup = () => { cancelAnimationFrame(raf); io.disconnect(); };
    } catch { /* fall through to static */ }
    return () => cleanup();
  }, [size]);

  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <canvas ref={canvasRef} width={size} height={size} style={{ width: '100%', height: '100%', display: live ? 'block' : 'none' }} />
      {!live && <img src="/lab/ring.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />}
    </div>
  );
}

/* ═══════════════ nav ═══════════════ */

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  return (
    <div
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 40,
        background: scrolled ? 'rgba(243,234,215,0.88)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(42,31,24,0.07)' : '1px solid transparent',
        transition: 'background 0.3s, border-color 0.3s',
      }}
    >
      <Container wide style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: scrolled ? '14px 40px' : '22px 40px', transition: 'padding 0.3s' }}>
        <a href="#top" style={{ textDecoration: 'none' }}><Wordmark /></a>
        <div style={{ display: 'flex', alignItems: 'center', gap: 26 }}>
          <a className="hide-mobile" href="#journey" style={{ fontSize: 13.5, color: 'var(--ink-soft)', textDecoration: 'none' }}>How it feels</a>
          <a className="hide-mobile" href="#compare" style={{ fontSize: 13.5, color: 'var(--ink-soft)', textDecoration: 'none' }}>Compare</a>
          <a className="hide-mobile" href="#pricing" style={{ fontSize: 13.5, color: 'var(--ink-soft)', textDecoration: 'none' }}>Pricing</a>
          <a className="hide-mobile" href="/diagnostic" style={{ fontSize: 13.5, color: 'var(--ink-soft)', textDecoration: 'none' }}>Café health check</a>
          <a href="#offer" className="btn-primary" style={{ padding: '11px 18px', fontSize: 13 }}>Claim free month</a>
        </div>
      </Container>
    </div>
  );
}

/* ═══════════════ 1 · hero ═══════════════ */

function Hero() {
  return (
    <section id="top" className="grain grain-soft" style={{ position: 'relative', background: 'var(--cream)', minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '150px 0 90px' }}>
      {/* hero photo slot — sits right, melts into cream (absent = pure calm) */}
      <div className="hide-mobile" style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: '46%', pointerEvents: 'none' }}>
        <PhotoSlot
          src="/assets/brand/hero-scene.jpg"
          alt="Morning light in a neighbourhood café"
          bare
          ratio="auto"
          radius={0}
          style={{ position: 'absolute', inset: 0, aspectRatio: 'auto' }}
          imgStyle={{ maskImage: 'linear-gradient(90deg, transparent 0%, black 30%)', WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, black 30%)' }}
        />
      </div>

      <Container wide style={{ position: 'relative', zIndex: 2 }}>
        <div className="r-hero" style={{ display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: 48, alignItems: 'center' }}>
          <div>
            <Reveal><Eyebrow>The regulars club · for cafés &amp; restaurants</Eyebrow></Reveal>
            <Reveal delay={0.06}>
              <h1 style={{ marginTop: 26, fontFamily: 'var(--display)', fontWeight: 600, fontSize: 'clamp(44px, 5.6vw, 84px)', letterSpacing: '-0.045em', lineHeight: 0.99 }}>
                Keep your <span className="serif-it" style={{ color: 'var(--terra)', fontWeight: 400 }}>circle</span> close.
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p style={{ marginTop: 24, maxWidth: 460, fontSize: 17.5, lineHeight: 1.62, color: 'var(--ink-soft)' }}>
                Every café has its people — the Tuesday 8am, the double-oat-latte, the corner-table couple. aro remembers them, welcomes them back, and keeps them <em style={{ fontStyle: 'normal', fontWeight: 600 }}>yours</em>. Not the apps&apos;.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <div style={{ marginTop: 34, display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center' }}>
                <a href="#offer" className="btn-primary" style={{ padding: '17px 27px', fontSize: 15 }}>
                  Claim your free month <span className="arrow-circle">→</span>
                </a>
                <a href="#leak" className="btn-secondary">See how it feels ↓</a>
              </div>
            </Reveal>
            <Reveal delay={0.24}>
              <div style={{ marginTop: 42, display: 'flex', gap: 18, flexWrap: 'wrap', fontFamily: 'var(--mono)', fontSize: 10.5, letterSpacing: '0.13em', textTransform: 'uppercase', color: 'var(--muted)' }}>
                <span>A few cafés per neighbourhood</span><span>·</span><span>First month free</span><span>·</span><span>No commission</span>
              </div>
            </Reveal>
          </div>

          {/* right: the living ring above a believable pass — the brand, alive */}
          <div className="hide-mobile" style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Reveal delay={0.15} style={{ alignSelf: 'flex-end', marginRight: 24, zIndex: 2 }}>
              <LiveRing size={190} />
            </Reveal>
            <Reveal delay={0.25} style={{ marginTop: -58 }}>
              <PassMock />
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* believable flat wallet pass — no glow, no pulse */
function PassMock() {
  return (
    <div
      style={{
        width: 296, padding: 22, borderRadius: 20,
        background: 'linear-gradient(155deg, #2A1F18 0%, #1F1612 100%)',
        color: 'var(--cream)',
        boxShadow: '0 34px 64px -26px rgba(20,12,5,0.4)',
        border: '1px solid rgba(255,255,255,0.06)',
        transform: 'rotate(-2deg)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: 'var(--display)', fontWeight: 700, fontSize: 15 }}>aro</span>
        <span style={{ fontFamily: 'var(--mono)', fontSize: 9.5, letterSpacing: '0.12em', textTransform: 'uppercase', opacity: 0.55 }}>Silver member</span>
      </div>
      <div style={{ marginTop: 24, fontFamily: 'var(--display)', fontSize: 19, fontWeight: 600, letterSpacing: '-0.02em' }}>Maya Rivera</div>
      <div style={{ fontSize: 12, opacity: 0.6, marginTop: 2 }}>The Roastery · Kensington</div>
      <div style={{ marginTop: 18, display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: 'var(--display)', fontSize: 24, fontWeight: 700, letterSpacing: '-0.03em' }}>1,284 <span style={{ fontSize: 11, fontWeight: 500, opacity: 0.6 }}>pts</span></span>
        <div style={{ display: 'flex', gap: 2, alignItems: 'flex-end', height: 16 }}>
          {[5, 11, 8, 13, 6, 12, 9].map((h, i) => <span key={i} style={{ width: 2, height: h, background: 'rgba(243,234,215,0.5)', borderRadius: 1 }} />)}
        </div>
      </div>
      <div style={{ marginTop: 16, paddingTop: 13, borderTop: '1px solid rgba(255,255,255,0.08)', fontSize: 11.5, opacity: 0.7 }}>
        Your usual oat flat white — ready in 3 min
      </div>
    </div>
  );
}

/* ═══════════════ 2 · proof strip ═══════════════ */

function ProofStrip() {
  const cafes = ['The Roastery', 'Bridge & Bean', 'Saint Aubin', 'Maman', 'Kettle Black', 'Rosso'];
  return (
    <section style={{ background: 'var(--cream)', padding: '4px 0 66px' }}>
      <Container>
        <div style={{ height: 1, background: 'rgba(42,31,24,0.09)' }} />
        <Reveal style={{ paddingTop: 26 }}>
          <div style={{ textAlign: 'center', fontFamily: 'var(--mono)', fontSize: 10.5, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 20 }}>
            Loved by independent cafés across Kensington · Inglewood · Bridgeland
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px 38px', opacity: 0.6 }}>
            {cafes.map((c) => <span key={c} style={{ fontFamily: 'var(--display)', fontSize: 18, fontWeight: 600, letterSpacing: '-0.02em' }}>{c}</span>)}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/* ═══════════════ 3 · belonging (manifesto + vignettes) ═══════════════ */

function Belonging() {
  return (
    <section style={{ position: 'relative', background: 'var(--cream-warm)', padding: '110px 0 120px' }}>
      <Container>
        <div style={{ maxWidth: 720 }}>
          <Reveal><Eyebrow>Why it matters</Eyebrow></Reveal>
          <Reveal delay={0.06}>
            <h2 style={{ marginTop: 20, fontFamily: 'var(--display)', fontWeight: 600, fontSize: 'clamp(32px, 4.2vw, 56px)', letterSpacing: '-0.035em', lineHeight: 1.05 }}>
              Some places sell coffee. <span className="serif-it" style={{ color: 'var(--terra)', fontWeight: 400 }}>Yours sells belonging.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p style={{ marginTop: 20, maxWidth: 540, fontSize: 17, lineHeight: 1.65, color: 'var(--ink-soft)' }}>
              People don&apos;t come back for the beans alone. They come back because someone remembers their name, their order, their week. That&apos;s your real product — and it deserves a system that protects it.
            </p>
          </Reveal>
        </div>

        <div style={{ marginTop: 56, display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 24, alignItems: 'stretch' }} className="r-hero">
          <Reveal delay={0.1}>
            <PhotoSlot src="/assets/brand/cafe-corner.jpg" alt="A warm café corner" label="The café · Kensington" field="#E3D3B0" ratio="16/10" parallax={26} />
          </Reveal>
          <Reveal delay={0.18}>
            <PhotoSlot src="/assets/brand/kitchen-warm.jpg" alt="A busy warm kitchen" label="The kitchen · Inglewood" field="#DCC9A2" ratio="4/5" parallax={34} />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

/* ═══════════════ 4 · the leak — espresso night, loss aversion ═══════════════ */

function Leak() {
  const { ref, p } = usePinnedProgress();
  const amount = Math.round(lerp(0, 1420, seg(p, 0.15, 0.7)));
  return (
    <div ref={ref} id="leak" style={{ position: 'relative', height: '220vh', background: 'var(--espresso)' }}>
      <ArcSeam from="var(--cream-warm)" />
      <div className="grain grain-on-dark" style={{ position: 'sticky', top: 0, height: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden', color: 'var(--cream)' }}>
        <Container>
          <div style={{ display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: 56, alignItems: 'center' }} className="r-hero">
            <div style={{ opacity: win(p, 0, 0.12, 0.9, 1.01) }}>
              <PhotoSlot
                src="/assets/brand/cozy-night.jpg"
                alt="An empty café table at night, one cold coffee"
                label="Table 4 · 8:00 am · empty"
                field="#241a14"
                dark
                ratio="4/5"
                radius={28}
              />
            </div>
            <div>
              <div style={{ opacity: win(p, 0.02, 0.12, 0.92, 1.01), transform: `translateY(${lerp(24, 0, win(p, 0.02, 0.14, 1, 1.01))}px)` }}>
                <Eyebrow light>The quiet leak</Eyebrow>
                <h2 style={{ marginTop: 20, fontFamily: 'var(--display)', fontWeight: 600, fontSize: 'clamp(32px, 4.4vw, 58px)', letterSpacing: '-0.032em', lineHeight: 1.04 }}>
                  Your best regular just stopped coming. You&apos;ll never know why.
                </h2>
                <p style={{ marginTop: 20, maxWidth: 460, fontSize: 16.5, lineHeight: 1.65, color: 'rgba(243,234,215,0.78)' }}>
                  A new job. A closer café. A broken habit. No complaint, no goodbye — just an empty seat where your Tuesday 8am used to sit.
                </p>
              </div>
              <div style={{ marginTop: 34, opacity: win(p, 0.2, 0.34, 0.92, 1.01) }}>
                <span style={{ fontFamily: 'var(--display)', fontWeight: 700, fontSize: 'clamp(44px, 5vw, 68px)', letterSpacing: '-0.04em', color: 'var(--terra)', fontVariantNumeric: 'tabular-nums' }}>
                  ${amount.toLocaleString()}
                </span>
                <span style={{ marginLeft: 14, fontSize: 15.5, color: 'rgba(243,234,215,0.72)' }}>
                  quietly walks out the door every month — for a typical café. Most never see it happen.
                </span>
                <div style={{ marginTop: 10, fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(243,234,215,0.4)' }}>
                  Illustrative — <a href="/diagnostic" style={{ color: 'rgba(229,177,74,0.85)', textDecoration: 'none' }}>your real number is in the free café health check →</a>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}

/* ═══════════════ 5 · the turn ═══════════════ */

function Turn() {
  return (
    <section style={{ position: 'relative', background: 'var(--sand)', padding: '130px 0 110px' }}>
      <ArcSeam from="var(--espresso)" />
      <Container style={{ textAlign: 'center' }}>
        <Reveal><Eyebrow>The fix</Eyebrow></Reveal>
        <Reveal delay={0.06}>
          <h2 style={{ margin: '22px auto 0', maxWidth: 840, fontFamily: 'var(--display)', fontWeight: 600, fontSize: 'clamp(34px, 4.8vw, 66px)', letterSpacing: '-0.035em', lineHeight: 1.03 }}>
            What if your café remembered <span className="serif-it" style={{ color: 'var(--terra)', fontWeight: 400 }}>every one of them?</span>
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p style={{ margin: '22px auto 0', maxWidth: 560, fontSize: 17, lineHeight: 1.62, color: 'var(--ink-soft)' }}>
            aro learns who your regulars are, greets them by name, and quietly brings them back — a circle that keeps itself close, while you keep making coffee.
          </p>
        </Reveal>
        <Reveal delay={0.18} style={{ marginTop: 48 }}>
          <PhotoSlot
            src="/assets/brand/cafe-band.jpg"
            alt="A neighbourhood café counter in the late afternoon"
            label="The counter · late afternoon"
            field="#E0CFA8"
            ratio="21/9"
            radius={28}
            parallax={30}
          />
        </Reveal>
      </Container>
    </section>
  );
}

/* ═══════════════ 6 · the journey — pinned product story ═══════════════ */

const BEATS = [
  {
    eyebrow: 'Day one',
    title: 'They scan once. They’re in the club.',
    body: 'A small QR by the register. Five seconds, no app to download — their pass drops straight into their wallet.',
  },
  {
    eyebrow: 'Every visit after',
    title: 'Their pass lives where they live — their pocket.',
    body: 'Points tick up with every visit. Their usual is remembered. The counter feels like it knows them, because now it does.',
  },
  {
    eyebrow: 'The quiet Tuesdays',
    title: 'Slow morning? aro already sent the nudge.',
    body: 'Win-backs for the fading, birthday perks, a gentle “we miss you.” It runs itself — you just see them walk back in.',
  },
];

function MomentJoin() {
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 18, padding: 26, background: 'var(--cream-warm)' }}>
      <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--muted)' }}>The Roastery · Kensington</div>
      {/* simple deterministic QR-ish mark */}
      <svg width="128" height="128" viewBox="0 0 21 21" style={{ borderRadius: 10, background: 'white', padding: 10, boxSizing: 'content-box', boxShadow: '0 12px 28px -14px rgba(20,12,5,0.25)' }}>
        {Array.from({ length: 21 }).map((_, r) =>
          Array.from({ length: 21 }).map((_, c) => {
            // deterministic QR-ish pattern: three finder squares + noise field
            const finder =
              ((r < 7 && c < 7) || (r < 7 && c > 13) || (r > 13 && c < 7)) &&
              (r % 20 === 0 || c % 20 === 0 || r === 6 || c === 6 || r === 14 || c === 14 ||
                (r >= 2 && r <= 4 && c >= 2 && c <= 4) ||
                (r >= 2 && r <= 4 && c >= 16 && c <= 18) ||
                (r >= 16 && r <= 18 && c >= 2 && c <= 4));
            const inFinderZone = (r < 7 && c < 7) || (r < 7 && c > 13) || (r > 13 && c < 7);
            const noise = !inFinderZone && (r * 31 + c * 17 + ((r * c) % 7)) % 5 < 2;
            const on = finder || noise;
            return on ? <rect key={`${r}-${c}`} x={c} y={r} width="1" height="1" fill="#2A1F18" /> : null;
          }),
        )}
      </svg>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontFamily: 'var(--display)', fontWeight: 600, fontSize: 17, letterSpacing: '-0.02em', color: 'var(--ink)' }}>Join the regulars</div>
        <div style={{ marginTop: 4, fontSize: 12.5, color: 'var(--muted)' }}>Scan · tap · done. No app.</div>
      </div>
    </div>
  );
}

function MomentPass() {
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 14, padding: 24, background: 'linear-gradient(170deg, #F7F0DE 0%, #F3EAD7 100%)' }}>
      <div style={{ padding: 18, borderRadius: 18, background: 'linear-gradient(155deg, #2A1F18, #1F1612)', color: 'var(--cream)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, fontFamily: 'var(--mono)', letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.6 }}>
          <span>aro</span><span>Silver</span>
        </div>
        <div style={{ marginTop: 14, fontFamily: 'var(--display)', fontSize: 17, fontWeight: 600 }}>Maya Rivera</div>
        <div style={{ marginTop: 10, fontFamily: 'var(--display)', fontSize: 24, fontWeight: 700, letterSpacing: '-0.03em' }}>1,284 <span style={{ fontSize: 11, fontWeight: 500, opacity: 0.6 }}>pts</span></div>
        <div style={{ marginTop: 10, height: 4, borderRadius: 999, background: 'rgba(243,234,215,0.18)' }}>
          <div style={{ width: '72%', height: '100%', borderRadius: 999, background: 'var(--saffron)' }} />
        </div>
        <div style={{ marginTop: 7, fontSize: 10.5, opacity: 0.65 }}>2 visits from Gold</div>
      </div>
      <div style={{ padding: '13px 15px', borderRadius: 14, background: 'white', boxShadow: '0 10px 24px -14px rgba(20,12,5,0.2)', display: 'flex', alignItems: 'center', gap: 11 }}>
        <span style={{ width: 34, height: 34, borderRadius: 10, background: 'var(--terra)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15 }}>☕</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--ink)' }}>Your usual oat flat white</div>
          <div style={{ fontSize: 11, color: 'var(--muted)' }}>Ready in 3 min · tap to confirm</div>
        </div>
      </div>
    </div>
  );
}

function MomentNudge() {
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 12, padding: 24, background: 'linear-gradient(180deg, #2A1F18 0%, #1F1612 100%)' }}>
      <div style={{ textAlign: 'center', color: 'var(--cream)', marginBottom: 8 }}>
        <div style={{ fontFamily: 'var(--display)', fontSize: 34, fontWeight: 600, letterSpacing: '-0.03em' }}>9:41</div>
        <div style={{ fontSize: 11, opacity: 0.55 }}>Tuesday, October 14</div>
      </div>
      {[
        { t: 'The Roastery', s: 'We miss you, Maya — your oat flat white is on us this week ☕', time: 'now' },
        { t: 'aro · owner digest', s: 'Quiet Tuesday detected · win-back sent to 23 fading regulars', time: '9:12' },
      ].map((n, i) => (
        <div key={i} style={{ padding: '12px 14px', borderRadius: 15, background: 'rgba(243,234,215,0.92)', backdropFilter: 'blur(8px)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10.5, color: 'var(--muted)' }}>
            <span style={{ fontWeight: 700, color: 'var(--ink)' }}>{n.t}</span><span>{n.time}</span>
          </div>
          <div style={{ marginTop: 3, fontSize: 12.5, lineHeight: 1.45, color: 'var(--ink)' }}>{n.s}</div>
        </div>
      ))}
    </div>
  );
}

function Journey() {
  const { ref, p } = usePinnedProgress();
  const w = [win(p, 0, 0.06, 0.26, 0.36), win(p, 0.3, 0.4, 0.58, 0.68), win(p, 0.62, 0.72, 0.94, 1.01)];
  return (
    <div ref={ref} id="journey" style={{ position: 'relative', height: '320vh', background: 'var(--cream)' }} className="hide-mobile-block">
      <div style={{ position: 'sticky', top: 0, height: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <Container>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 0.9fr', gap: 60, alignItems: 'center' }}>
            {/* beats */}
            <div style={{ position: 'relative', minHeight: 300 }}>
              <div style={{ marginBottom: 40 }}>
                <Eyebrow>How it feels</Eyebrow>
              </div>
              {BEATS.map((b, i) => (
                <div key={i} style={{ position: 'absolute', top: 60, left: 0, right: 0, opacity: w[i], transform: `translateY(${lerp(20, 0, w[i])}px)`, pointerEvents: 'none' }}>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--terra)' }}>{b.eyebrow}</div>
                  <h3 style={{ marginTop: 14, fontFamily: 'var(--display)', fontWeight: 600, fontSize: 'clamp(28px, 3.4vw, 44px)', letterSpacing: '-0.03em', lineHeight: 1.08 }}>{b.title}</h3>
                  <p style={{ marginTop: 16, maxWidth: 440, fontSize: 16, lineHeight: 1.62, color: 'var(--ink-soft)' }}>{b.body}</p>
                </div>
              ))}
              {/* progress dots */}
              <div style={{ position: 'absolute', bottom: -60, left: 0, display: 'flex', gap: 8 }}>
                {BEATS.map((_, i) => (
                  <span key={i} style={{ width: w[i] > 0.5 ? 26 : 8, height: 8, borderRadius: 999, background: w[i] > 0.5 ? 'var(--terra)' : 'rgba(42,31,24,0.15)', transition: 'width 0.3s, background 0.3s' }} />
                ))}
              </div>
            </div>
            {/* the phone */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div className="phone" style={{ transform: 'scale(0.82)', transformOrigin: 'center' }}>
                <div className="notch" />
                <div className="screen" style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', inset: 0, opacity: w[0] }}><MomentJoin /></div>
                  <div style={{ position: 'absolute', inset: 0, opacity: w[1] }}><MomentPass /></div>
                  <div style={{ position: 'absolute', inset: 0, opacity: w[2] }}><MomentNudge /></div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}

/* mobile fallback: the three moments stacked, no pin */
function JourneyMobile() {
  return (
    <section className="show-mobile-block" style={{ display: 'none', background: 'var(--cream)', padding: '90px 0' }}>
      <Container>
        <Eyebrow>How it feels</Eyebrow>
        {BEATS.map((b, i) => (
          <Reveal key={i} delay={0.05}>
            <div style={{ marginTop: 36 }}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--terra)' }}>{b.eyebrow}</div>
              <h3 style={{ marginTop: 10, fontFamily: 'var(--display)', fontWeight: 600, fontSize: 26, letterSpacing: '-0.03em', lineHeight: 1.1 }}>{b.title}</h3>
              <p style={{ marginTop: 10, fontSize: 15, lineHeight: 1.6, color: 'var(--ink-soft)' }}>{b.body}</p>
              <div style={{ marginTop: 18, position: 'relative', height: 300, borderRadius: 22, overflow: 'hidden', boxShadow: '0 18px 40px -20px rgba(20,12,5,0.3)' }}>
                {i === 0 && <MomentJoin />}
                {i === 1 && <MomentPass />}
                {i === 2 && <MomentNudge />}
              </div>
            </div>
          </Reveal>
        ))}
      </Container>
    </section>
  );
}

/* ═══════════════ 7 · numbers ═══════════════ */

function Numbers() {
  const stats = [
    ['+22%', 'repeat visits in the first 90 days'],
    ['0%', 'commission on direct orders — the margin stays yours'],
    ['~11 hrs', 'of monthly marketing you stop doing'],
  ];
  return (
    <section style={{ background: 'var(--cream-warm)', padding: '104px 0' }}>
      <Container>
        <Reveal style={{ textAlign: 'center' }}>
          <h2 style={{ margin: '0 auto', maxWidth: 780, fontFamily: 'var(--display)', fontWeight: 600, fontSize: 'clamp(28px, 3.6vw, 48px)', letterSpacing: '-0.032em', lineHeight: 1.08 }}>
            The romance is the point. <span className="serif-it" style={{ color: 'var(--terra)', fontWeight: 400 }}>The numbers are the proof.</span>
          </h2>
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28, marginTop: 58, textAlign: 'center' }} className="r-3col">
          {stats.map((s, i) => (
            <Reveal key={s[0]} delay={i * 0.08}>
              <div style={{ fontFamily: 'var(--display)', fontWeight: 700, fontSize: 'clamp(40px, 4.6vw, 60px)', letterSpacing: '-0.04em' }}>{s[0]}</div>
              <p style={{ margin: '8px auto 0', maxWidth: 240, fontSize: 14.5, lineHeight: 1.5, color: 'var(--ink-soft)' }}>{s[1]}</p>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.26} style={{ textAlign: 'center' }}>
          <div style={{ marginTop: 44, fontFamily: 'var(--mono)', fontSize: 10.5, letterSpacing: '0.11em', textTransform: 'uppercase', color: 'var(--muted)' }}>
            Illustrative · built for owners who&apos;d rather be in the room than in a spreadsheet
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/* ═══════════════ 8 · comparison — the objection killer ═══════════════ */

function Compare() {
  const rows = [
    ['Personalized win-backs', 'No', 'No', 'Yes'],
    ['Commission-free direct ordering', '—', 'Partial', 'Yes'],
    ['Done-for-you setup', 'No', 'No', 'Yes — 14 days'],
    ['Local exclusivity per area', '—', '—', 'Yes'],
    ['A person you can call', 'No', 'Support ticket', 'Your rep'],
  ];
  return (
    <section id="compare" style={{ background: 'var(--cream)', padding: '104px 0' }}>
      <Container>
        <Reveal><Eyebrow>Why not just Square?</Eyebrow></Reveal>
        <Reveal delay={0.05}>
          <h2 style={{ marginTop: 18, fontFamily: 'var(--display)', fontWeight: 600, fontSize: 'clamp(28px, 3.8vw, 48px)', letterSpacing: '-0.035em', maxWidth: 620 }}>
            Your POS already does loyalty. <span className="serif-it" style={{ color: 'var(--terra)', fontWeight: 400 }}>Badly.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p style={{ marginTop: 14, maxWidth: 560, fontSize: 16, lineHeight: 1.6, color: 'var(--ink-soft)' }}>
            Square and Toast hand you a digital punch-card and wish you luck. aro is a system that actually brings people back — with someone who sets it up for you.
          </p>
        </Reveal>
        <Reveal delay={0.15} style={{ marginTop: 42, overflowX: 'auto' }}>
          <table style={{ width: '100%', minWidth: 560, borderCollapse: 'collapse', fontSize: 14.5 }}>
            <thead>
              <tr>
                {['', 'Punch card', 'Square / Toast', 'aro'].map((h, i) => (
                  <th key={i} style={{ textAlign: i === 0 ? 'left' : 'center', padding: '0 8px 14px', fontFamily: 'var(--mono)', fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: i === 3 ? 700 : 500, color: i === 3 ? 'var(--terra)' : 'var(--muted)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i} style={{ borderTop: '1px solid rgba(42,31,24,0.08)' }}>
                  <td style={{ padding: '16px 8px 16px 0', fontWeight: 600 }}>{r[0]}</td>
                  <td style={{ padding: '16px 8px', textAlign: 'center', color: 'var(--muted)' }}>{r[1]}</td>
                  <td style={{ padding: '16px 8px', textAlign: 'center', color: 'var(--muted)' }}>{r[2]}</td>
                  <td style={{ padding: '16px 0 16px 8px', textAlign: 'center', fontWeight: 700 }}>{r[3]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="serif-it" style={{ marginTop: 28, fontSize: 17, color: 'var(--ink-soft)' }}>
            You don&apos;t need more software. You need someone who makes it work.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}

/* ═══════════════ 9 · testimonials — rotating, named ═══════════════ */

const STORIES = [
  {
    quote: 'We stopped renting our regulars from delivery apps. People actually chase the streak — Tuesdays went from dead to booked.',
    name: 'Elena Moretti', role: 'Caffè Lumo · Kensington', initials: 'EM', accent: 'var(--terra)', img: '/assets/testimonials/elena-moretti.jpg',
  },
  {
    quote: 'It nudges me when a Tuesday’s going to be slow and writes the win-back for me. It feels like having a marketing person I could never afford.',
    name: 'David Okonkwo', role: 'Jollof & Co · Inglewood', initials: 'DO', accent: 'var(--plum)', img: '/assets/testimonials/david-okonkwo.jpg',
  },
  {
    quote: 'Customers used to visit once and vanish. Now I see who’s fading before they’re gone. My mornings finally feel predictable.',
    name: 'Mei Tanaka', role: 'Hojicha House · Bridgeland', initials: 'MT', accent: 'var(--saffron)', img: '/assets/testimonials/mei-tanaka.jpg',
  },
];

function Avatar({ story }) {
  const [ok, setOk] = useState(false);
  return (
    <span style={{ position: 'relative', width: 44, height: 44, borderRadius: '50%', overflow: 'hidden', background: story.accent, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontFamily: 'var(--display)', fontWeight: 700, fontSize: 15, flexShrink: 0 }}>
      {!ok && story.initials}
      <img src={story.img} alt="" onLoad={() => setOk(true)} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: ok ? 1 : 0 }} />
    </span>
  );
}

function Testimonials() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % STORIES.length), 6500);
    return () => clearInterval(id);
  }, []);
  const s = STORIES[idx];
  return (
    <section style={{ background: 'var(--sand)', padding: '104px 0' }}>
      <Container style={{ maxWidth: 820 }}>
        <Reveal><Eyebrow>From the counter</Eyebrow></Reveal>
        <div style={{ marginTop: 30, minHeight: 190 }}>
          <motion.div key={idx} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE }}>
            <p style={{ fontFamily: 'var(--display)', fontWeight: 500, fontSize: 'clamp(22px, 3vw, 34px)', letterSpacing: '-0.02em', lineHeight: 1.3 }}>
              “{s.quote}”
            </p>
            <div style={{ marginTop: 24, display: 'flex', alignItems: 'center', gap: 13 }}>
              <Avatar story={s} />
              <div>
                <div style={{ fontWeight: 600, fontSize: 14.5 }}>{s.name}</div>
                <div style={{ fontSize: 12.5, color: 'var(--muted)' }}>{s.role}</div>
              </div>
            </div>
          </motion.div>
        </div>
        <div style={{ marginTop: 26, display: 'flex', gap: 8 }}>
          {STORIES.map((_, i) => (
            <button key={i} onClick={() => setIdx(i)} aria-label={`Story ${i + 1}`} style={{ width: i === idx ? 26 : 8, height: 8, borderRadius: 999, border: 'none', cursor: 'pointer', background: i === idx ? 'var(--terra)' : 'rgba(42,31,24,0.18)', transition: 'width 0.3s, background 0.3s', padding: 0 }} />
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ═══════════════ 10 · scarcity — the zone ═══════════════ */

function ZoneDots() {
  const dots = [];
  for (let r = 0; r < 6; r++) {
    for (let c = 0; c < 9; c++) {
      const x = 14 + c * 24 + (r % 2 ? 12 : 0);
      const y = 14 + r * 22;
      const k = (r * 9 + c) % 17;
      const taken = k === 3 || k === 9 || k === 14;
      const yours = r === 2 && c === 4;
      dots.push({ x, y, taken, yours });
    }
  }
  return (
    <svg viewBox="0 0 240 148" style={{ width: '100%', maxWidth: 320 }}>
      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r={d.yours ? 7 : 4.5}
          fill={d.yours ? 'var(--terra)' : d.taken ? 'var(--saffron)' : 'rgba(42,31,24,0.12)'}
          opacity={d.yours ? 1 : d.taken ? 0.9 : 1}
        >
          {d.yours && <animate attributeName="r" values="7;8.5;7" dur="2.6s" repeatCount="indefinite" />}
        </circle>
      ))}
    </svg>
  );
}

function Scarcity() {
  return (
    <section style={{ background: 'var(--cream)', padding: '104px 0' }}>
      <Container>
        <Reveal>
          <div style={{ borderRadius: '56px 56px 56px 14px', background: 'var(--cream-warm)', border: '1px solid rgba(42,31,24,0.07)', padding: 'clamp(32px, 5.5vw, 64px)', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 36 }}>
            <div style={{ maxWidth: 520 }}>
              <Eyebrow>Local by design</Eyebrow>
              <h2 style={{ marginTop: 16, fontFamily: 'var(--display)', fontWeight: 600, fontSize: 'clamp(28px, 3.8vw, 46px)', letterSpacing: '-0.032em', lineHeight: 1.05 }}>
                Only a few cafés per neighbourhood.
              </h2>
              <p style={{ marginTop: 14, fontSize: 15.5, lineHeight: 1.62, color: 'var(--ink-soft)' }}>
                aro runs on local loyalty — so we never sign your competitor across the street. When a neighbourhood fills, it&apos;s full.
              </p>
              <div style={{ marginTop: 20, display: 'inline-flex', alignItems: 'center', gap: 10, padding: '10px 16px', borderRadius: 999, background: 'var(--cream)', border: '1px solid rgba(42,31,24,0.08)' }}>
                <span style={{ width: 8, height: 8, borderRadius: 999, background: 'var(--terra)' }} />
                <span style={{ fontFamily: 'var(--mono)', fontSize: 11.5, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-soft)' }}>
                  {ZONES_OPEN} of {ZONES_TOTAL} spots open in Kensington
                </span>
              </div>
            </div>
            <div style={{ flex: '0 1 320px' }}>
              <ZoneDots />
              <div style={{ marginTop: 10, display: 'flex', gap: 18, fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><span style={{ width: 8, height: 8, borderRadius: 999, background: 'var(--saffron)' }} /> taken</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><span style={{ width: 8, height: 8, borderRadius: 999, background: 'var(--terra)' }} /> yours</span>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/* ═══════════════ 11 · pricing ═══════════════ */

function Pricing() {
  return (
    <section id="pricing" style={{ background: 'var(--cream-warm)', padding: '104px 0' }}>
      <Container style={{ maxWidth: 720 }}>
        <Reveal><Eyebrow>Pricing</Eyebrow></Reveal>
        <Reveal delay={0.05}>
          <h2 style={{ marginTop: 18, fontFamily: 'var(--display)', fontWeight: 600, fontSize: 'clamp(28px, 3.8vw, 48px)', letterSpacing: '-0.035em', lineHeight: 1.08 }}>
            Plans start at <span className="serif-it" style={{ color: 'var(--terra)', fontWeight: 400 }}>$149/mo.</span> First month free.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p style={{ marginTop: 16, fontSize: 16, lineHeight: 1.62, color: 'var(--ink-soft)', maxWidth: 540 }}>
            We tailor the setup to your menu and rewards on a 20-minute call — but the price is never a surprise, and there&apos;s no long-term contract. Less than one lost regular a week.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}

/* ═══════════════ 12 · FAQ ═══════════════ */

function FAQ() {
  const items = [
    ['Do I need to replace my POS?', 'No. aro runs alongside Square, Toast, Clover — no rip-and-replace, no new hardware at the counter.'],
    ['How long does setup take?', '14 days, and we do it with you — menu, rewards, table tents, and a 20-minute staff training included.'],
    ['What if my regulars don’t use it?', 'Your first month is free. If your regulars don’t feel it, you walk away — no cost, no hard feelings.'],
    ['Is there a contract?', 'No long-term contract. Month to month, cancel anytime.'],
    ['Why only a few cafés per neighbourhood?', 'Because we can’t be your competitor’s system too. Local exclusivity is the point.'],
  ];
  return (
    <section id="faq" style={{ background: 'var(--cream)', padding: '104px 0 120px' }}>
      <Container style={{ maxWidth: 760 }}>
        <Reveal><Eyebrow>Before you ask</Eyebrow></Reveal>
        <Reveal delay={0.05}>
          <h2 style={{ margin: '18px 0 32px', fontFamily: 'var(--display)', fontWeight: 600, fontSize: 'clamp(28px, 3.6vw, 44px)', letterSpacing: '-0.035em' }}>
            Fair questions.
          </h2>
        </Reveal>
        {items.map(([q, a], i) => (
          <Reveal key={q} delay={i * 0.04}>
            <details style={{ borderTop: '1px solid rgba(42,31,24,0.1)', padding: '19px 0' }}>
              <summary style={{ cursor: 'pointer', fontWeight: 600, fontSize: 16.5, listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {q}
                <span style={{ fontFamily: 'var(--mono)', color: 'var(--terra)', fontSize: 18 }}>+</span>
              </summary>
              <p style={{ marginTop: 12, fontSize: 15, lineHeight: 1.62, color: 'var(--ink-soft)', maxWidth: 620 }}>{a}</p>
            </details>
          </Reveal>
        ))}
        <div style={{ height: 1, background: 'rgba(42,31,24,0.1)' }} />
      </Container>
    </section>
  );
}

/* ═══════════════ 13 · close — signature #2: the dawn ═══════════════ */

function Close() {
  const { ref, p } = usePinnedProgress();
  const rise = seg(p, 0.05, 0.65);
  return (
    <div ref={ref} id="offer" style={{ position: 'relative', height: '170vh', background: 'var(--espresso)' }}>
      <ArcSeam from="var(--cream)" />
      <div className="grain grain-on-dark" style={{ position: 'sticky', top: 0, minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', overflow: 'hidden', color: 'var(--cream)' }}>
        {/* the dawn — a single warm glow rising behind the close (no donut) */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            left: '50%',
            bottom: `${lerp(-58, -16, rise)}%`,
            transform: 'translateX(-50%)',
            width: 900,
            height: 900,
            borderRadius: '50%',
            background: `radial-gradient(circle at 50% 38%, rgba(229,177,74,${0.16 + 0.16 * rise}), rgba(214,122,69,${0.08 + 0.08 * rise}) 42%, transparent 68%)`,
            filter: 'blur(24px)',
            pointerEvents: 'none',
          }}
        />
        <Container style={{ position: 'relative', textAlign: 'center', padding: '120px 40px 0' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 28, opacity: lerp(0.4, 1, rise) }}>
            <RingMark size={54} hole="var(--espresso)" />
          </div>
          <h2 style={{ margin: '0 auto', maxWidth: 900, fontFamily: 'var(--display)', fontWeight: 600, fontSize: 'clamp(38px, 5.6vw, 82px)', letterSpacing: '-0.042em', lineHeight: 0.99 }}>
            Your neighbourhood&apos;s favourite. <span className="serif-it" style={{ color: 'var(--saffron)', fontWeight: 400 }}>On purpose.</span>
          </h2>
          <p style={{ margin: '24px auto 0', maxWidth: 500, fontSize: 17, lineHeight: 1.62, color: 'rgba(243,234,215,0.8)' }}>
            Start free for a month. Live in 14 days. No commissions, no contract. If your regulars don&apos;t feel it, you walk away.
          </p>
          <div style={{ marginTop: 36 }}>
            <a href="mailto:hello@aro.club?subject=Claim%20my%20free%20month" className="btn-primary" style={{ background: 'var(--cream)', color: 'var(--ink)', padding: '18px 30px', fontSize: 15 }}>
              Claim your free month <span className="arrow-circle" style={{ background: 'var(--ink)', color: 'var(--cream)' }}>→</span>
            </a>
          </div>
          <div style={{ marginTop: 22, fontFamily: 'var(--mono)', fontSize: 10.5, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(243,234,215,0.5)' }}>
            First month free · we set it all up · cancel anytime
          </div>

          {/* footer */}
          <div style={{ marginTop: 110, paddingTop: 34, borderTop: '1px solid rgba(243,234,215,0.12)', textAlign: 'left' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 40, justifyContent: 'space-between' }}>
              <div style={{ maxWidth: 280 }}>
                <Wordmark light />
                <p style={{ marginTop: 12, fontSize: 13, color: 'rgba(243,234,215,0.55)', lineHeight: 1.55 }}>
                  The regulars club. Every café has an aura — we keep it glowing.
                </p>
              </div>
              <div style={{ display: 'flex', gap: 52, flexWrap: 'wrap' }}>
                {[
                  ['Product', [['How it feels', '#journey'], ['Compare', '#compare'], ['Pricing', '#pricing'], ['Café health check', '/diagnostic']]],
                  ['Company', [['FAQ', '#faq'], ['Contact', 'mailto:hello@aro.club']]],
                  ['Legal', [['Privacy', '/privacy'], ['Terms', '/terms']]],
                ].map(([title, links]) => (
                  <div key={title}>
                    <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.11em', textTransform: 'uppercase', color: 'rgba(243,234,215,0.4)', marginBottom: 10 }}>{title}</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 13.5 }}>
                      {links.map(([label, href]) => (
                        <a key={label} href={href} style={{ color: 'rgba(243,234,215,0.75)', textDecoration: 'none' }}>{label}</a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ margin: '36px 0 28px', paddingTop: 18, borderTop: '1px solid rgba(243,234,215,0.08)', fontSize: 12, color: 'rgba(243,234,215,0.4)', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
              <span>© 2026 aro · Calgary</span>
              <span className="serif-it" style={{ color: 'rgba(229,177,74,0.6)' }}>Keep your circle close.</span>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}

/* ═══════════════ mobile sticky CTA ═══════════════ */

function MobileCTA() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => {
      const d = document.documentElement;
      setShow(window.scrollY / (d.scrollHeight - window.innerHeight) > 0.35);
    };
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  return (
    <div className="show-mobile-flex" style={{ display: 'none', position: 'fixed', left: 12, right: 12, bottom: 12, zIndex: 50, transform: show ? 'translateY(0)' : 'translateY(120%)', transition: 'transform 0.4s cubic-bezier(0.22,1,0.36,1)' }}>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '12px 14px 12px 18px', borderRadius: 18, background: 'rgba(31,22,18,0.95)', backdropFilter: 'blur(10px)', color: 'var(--cream)', boxShadow: '0 18px 44px -16px rgba(20,12,5,0.5)' }}>
        <span style={{ fontSize: 12.5 }}>{ZONES_OPEN} of {ZONES_TOTAL} spots open nearby</span>
        <a href="#offer" style={{ padding: '10px 16px', borderRadius: 999, background: 'var(--cream)', color: 'var(--ink)', fontWeight: 600, fontSize: 13, textDecoration: 'none', whiteSpace: 'nowrap' }}>Free month →</a>
      </div>
    </div>
  );
}

/* ═══════════════ page ═══════════════ */

export default function AroLandingUltimate() {
  return (
    <div style={{ background: 'var(--cream)', overflowX: 'clip' }}>
      <Nav />
      <Hero />
      <ProofStrip />
      <Belonging />
      <Leak />
      <Turn />
      <Journey />
      <JourneyMobile />
      <Numbers />
      <Compare />
      <Testimonials />
      <Scarcity />
      <Pricing />
      <FAQ />
      <Close />
      <MobileCTA />
      <style
        dangerouslySetInnerHTML={{
          __html: `
        details > summary::-webkit-details-marker { display: none; }
        @media (max-width: 900px) {
          .r-hero { grid-template-columns: 1fr !important; }
          .r-3col { grid-template-columns: 1fr !important; gap: 30px !important; }
          .hide-mobile { display: none !important; }
          .hide-mobile-block { display: none !important; }
          .show-mobile-block { display: block !important; }
          .show-mobile-flex { display: flex !important; }
        }
      `,
        }}
      />
    </div>
  );
}
