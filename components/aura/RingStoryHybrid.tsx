// @ts-nocheck
'use client';

/* RingStoryHybrid — the synthesized scroll story for /story.
   Base: parallax orbs + a warm (non-muddy) color ramp + "surroundings light
   up" chips (Lab B — fast, works everywhere).
   Accent: the ring itself — a live WebGL breathing raymarch on capable
   desktops (Lab A's magic: glows/pulses while idle, not just on scroll),
   falling back to the baked 3D render (Lab C) animated with CSS everywhere
   else, so nothing is ever blank or janky.
   Copy: rewritten — bolder, more specific, less generic ("aura/glowing"
   softness swapped for a sharper, wittier voice). */

import * as React from 'react';
import { usePinnedProgress, win, lerp, seg, ramp } from '@/lib/scroll';

const { useRef, useEffect, useState, useMemo } = React;

/* ───────── live shader (used only when the device can handle it) ───────── */

const FRAG = `
precision highp float;
uniform vec2 R; uniform float uScroll; uniform float uTime; uniform float uReduced;
const float MAJ=1.0, MIN=0.40;
mat3 rotX(float a){float c=cos(a),s=sin(a);return mat3(1.,0.,0., 0.,c,-s, 0.,s,c);}
mat3 M;
float sdTorus(vec3 p){vec2 q=vec2(length(p.xz)-MAJ,p.y);return length(q)-MIN;}
float map(vec3 p){return sdTorus(M*p);}
vec3 calcN(vec3 p){vec2 e=vec2(0.001,0.);return normalize(vec3(map(p+e.xyy)-map(p-e.xyy),map(p+e.yxy)-map(p-e.yxy),map(p+e.yyx)-map(p-e.yyx)));}
float calcAO(vec3 p,vec3 n){float o=0.,s=1.;for(int i=0;i<5;i++){float h=0.01+0.13*float(i);o+=(h-map(p+n*h))*s;s*=0.85;}return clamp(1.-1.4*o,0.,1.);}
vec3 grad(float t){vec3 a=vec3(0.839,0.478,0.271),b=vec3(0.898,0.694,0.290),c=vec3(0.553,0.420,0.553);return t<0.5?mix(a,b,t*2.):mix(b,c,(t-0.5)*2.);}
void main(){
  vec2 uv=(gl_FragCoord.xy-0.5*R)/R.y;
  float breathe = uReduced>0.5 ? 0.0 : sin(uTime*1.4);
  float ang = mix(1.4, 0.32, smoothstep(0.40,0.82,uScroll)) + breathe*0.04;
  M = rotX(ang);
  float sc = 1.0 + (uReduced>0.5?0.0:breathe*0.02);
  vec3 ro=vec3(0.,0.,5.0);
  vec3 rd=normalize(vec3(uv*1.75/sc, -2.0));
  float t=0.,hit=0.;
  for(int i=0;i<88;i++){vec3 p=ro+rd*t;float d=map(p);if(d<0.001){hit=1.;break;}if(t>9.)break;t+=d;}
  if(hit<0.5){ discard; }
  vec3 p=ro+rd*t; vec3 n=calcN(p); vec3 v=normalize(ro-p);
  float g=clamp(0.5+0.42*p.x+0.18*p.y,0.,1.);
  vec3 base=grad(g);
  vec3 lp=normalize(vec3(0.55,0.85,0.45));
  float dif=max(dot(n,lp),0.); float ao=calcAO(p,n);
  vec3 h=normalize(lp+v); float spe=pow(max(dot(n,h),0.),48.);
  float fres=pow(1.-max(dot(n,v),0.),3.);
  float glowPulse = uReduced>0.5?0.5:(0.5+0.5*sin(uTime*1.4));
  vec3 col=base*(vec3(0.92,0.86,0.78)*0.32*ao)+base*dif*vec3(1.05,0.98,0.86)+spe*vec3(1.,0.96,0.85)*(0.8+0.3*glowPulse)+fres*vec3(0.95,0.78,0.55)*(0.4+0.3*glowPulse);
  col=pow(col,vec3(0.85));
  gl_FragColor=vec4(col,1.0);
}`;
const VERT = `attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}`;

function useLiveRing(canUse, scrollRef) {
  const canvasRef = useRef(null);
  useEffect(() => {
    if (!canUse) return;
    const cv = canvasRef.current;
    if (!cv) return;
    const gl = cv.getContext('webgl', { antialias: true, alpha: true });
    if (!gl) return;
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ? 1 : 0;
    const sh = (t, s) => { const o = gl.createShader(t); gl.shaderSource(o, s); gl.compileShader(o); return o; };
    const prog = gl.createProgram();
    gl.attachShader(prog, sh(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog); gl.useProgram(prog);
    const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'p'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const uR = gl.getUniformLocation(prog, 'R'), uS = gl.getUniformLocation(prog, 'uScroll'), uT = gl.getUniformLocation(prog, 'uTime'), uRed = gl.getUniformLocation(prog, 'uReduced');

    let raf = 0, visible = true, t0 = 0;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = Math.min(cv.clientWidth * dpr, 1000), h = Math.min(cv.clientHeight * dpr, 1000);
      cv.width = w; cv.height = h; gl.viewport(0, 0, w, h);
    };
    resize(); window.addEventListener('resize', resize);
    const io = new IntersectionObserver((e) => { visible = e[0].isIntersecting; }, { threshold: 0 });
    io.observe(cv);
    const frame = (ts) => {
      if (!t0) t0 = ts;
      if (visible) {
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.uniform2f(uR, cv.width, cv.height);
        gl.uniform1f(uS, scrollRef.current);
        gl.uniform1f(uT, (ts - t0) / 1000);
        gl.uniform1f(uRed, reduced);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); io.disconnect(); };
  }, [canUse, scrollRef]);
  return canvasRef;
}

/* ───────── parallax orbs (Lab B, tuned down — fewer, calmer) ───────── */
const ORBS = [
  { c: '#E5B14A', s: 300, x: -30, y: -18, sp: 0.7, blur: 44 },
  { c: '#8D6B8D', s: 260, x: 32, y: 22, sp: 1.1, blur: 40 },
  { c: '#D67A45', s: 160, x: 24, y: -28, sp: 1.7, blur: 22 },
  { c: '#DC8B7E', s: 130, x: -22, y: 30, sp: 2.1, blur: 18 },
];

/* ───────── text beat ───────── */
function Beat({ show, color, top, children, style = {} }) {
  return (
    <div style={{ position: 'absolute', left: 0, right: 0, top, textAlign: 'center', padding: '0 24px', opacity: show, transform: `translateY(${lerp(24, 0, show)}px)`, color, pointerEvents: show > 0.9 ? 'auto' : 'none', ...style }}>
      {children}
    </div>
  );
}

export default function RingStoryHybrid() {
  const { ref, p } = usePinnedProgress();
  const scrollRef = useRef(0);
  scrollRef.current = p;

  // decide once: live shader only on capable, non-reduced-motion desktops
  const [liveOk, setLiveOk] = useState(false);
  useEffect(() => {
    try {
      const fine = window.matchMedia?.('(min-width: 900px) and (pointer: fine)').matches;
      const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
      const cv = document.createElement('canvas');
      const gl = cv.getContext('webgl');
      setLiveOk(Boolean(fine && !reduced && gl));
    } catch {
      setLiveOk(false);
    }
  }, []);
  const canvasRef = useLiveRing(liveOk, scrollRef);

  // FIXED color ramp: routed through saturated warm stops so the midpoint
  // never desaturates into muddy grey-brown.
  const bg = ramp(p, [
    [0, '#F3EAD7'],
    [0.14, '#F3D9A0'],
    [0.26, '#D67A45'],
    [0.42, '#2A1F18'],
    [0.62, '#1F1612'],
    [0.86, '#D67A45'],
    [1, '#F3EAD7'],
  ]);
  const onDark = p > 0.4 && p < 0.88;
  const ink = onDark ? '#F7F0DE' : '#1F1612';

  // static-fallback ring pose (tilt + scale), mirrors the shader's own curve
  const rx = p < 0.4 ? lerp(8, 10, seg(p, 0, 0.4))
    : p < 0.66 ? lerp(10, 30, seg(p, 0.4, 0.66))
    : p < 0.82 ? lerp(30, 72, seg(p, 0.66, 0.82))
    : p < 0.9 ? 72
    : p < 0.98 ? lerp(72, 0, seg(p, 0.9, 0.98))
    : 0;
  const ringScale = p < 0.66 ? 1 : p < 0.82 ? lerp(1, 1.22, seg(p, 0.66, 0.82)) : lerp(1.22, 1, seg(p, 0.82, 1));

  // regulars light up around the ring during the circle beat
  const circleShow = win(p, 0.62, 0.7, 0.84, 0.9);
  const chips = useMemo(() => ['M', 'J', 'A', 'L', 'S', 'R'].map((n, i) => ({ n, a: (i / 6) * Math.PI * 2 })), []);

  return (
    <div ref={ref} style={{ position: 'relative', height: '540vh', background: bg, transition: 'background 0.12s linear' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>
        {/* parallax orbs */}
        {ORBS.map((o, i) => {
          const driftX = o.x + (p - 0.5) * o.sp * 16;
          const driftY = o.y + (0.5 - p) * o.sp * 36;
          const light = 0.22 + 0.4 * win(p, 0.06 + i * 0.05, 0.24 + i * 0.05, 0.55, 0.82);
          return (
            <div key={i} style={{ position: 'absolute', left: '50%', top: '50%', width: o.s, height: o.s, marginLeft: -o.s / 2, marginTop: -o.s / 2, transform: `translate(calc(${driftX}vw), calc(${driftY}vh))`, borderRadius: '50%', background: `radial-gradient(circle at 40% 35%, ${o.c}, transparent 68%)`, filter: `blur(${o.blur}px)`, opacity: light, willChange: 'transform' }} />
          );
        })}

        {/* the ring — live shader OR static baked render, same stage position */}
        <div style={{ position: 'absolute', left: '50%', top: '50%', width: 'min(46vh, 380px)', height: 'min(46vh, 380px)', transform: 'translate(-50%,-50%)' }}>
          {liveOk ? (
            <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
          ) : (
            <img
              src="/lab/ring.png"
              alt=""
              className="ring-idle-pulse"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                transform: `rotateX(${rx}deg) scale(${ringScale})`,
                filter: `drop-shadow(0 30px 60px rgba(214,122,69,0.35))`,
                willChange: 'transform',
              }}
            />
          )}
        </div>

        {/* regulars light up around the ring */}
        {chips.map((c, i) => {
          const rad = lerp(130, 178, seg(p, 0.62, 0.78));
          return (
            <div key={i} style={{ position: 'absolute', left: '50%', top: '50%', transform: `translate(${Math.cos(c.a) * rad - 22}px, ${Math.sin(c.a) * rad - 22}px)`, width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(145deg,#E5B14A,#D67A45)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: 'var(--display)', fontWeight: 700, opacity: circleShow, boxShadow: `0 0 ${lerp(0, 28, circleShow)}px rgba(229,177,74,${0.65 * circleShow})` }}>{c.n}</div>
          );
        })}

        {/* ── COPY — rewritten: bolder, specific, less "aura/glow" softness ── */}

        <Beat show={win(p, 0, 0.03, 0.09, 0.16)} color={ink} top="13%">
          <div style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', opacity: 0.6 }}>aro · the regulars club</div>
          <h1 style={{ marginTop: 16, fontFamily: 'var(--display)', fontWeight: 600, fontSize: 'clamp(38px,5.6vw,80px)', letterSpacing: '-0.045em', lineHeight: 1 }}>
            Coffee gets them in the door.<br /><span className="serif-it" style={{ color: 'var(--terra)', fontWeight: 400 }}>This gets them back.</span>
          </h1>
        </Beat>

        <Beat show={win(p, 0.2, 0.26, 0.34, 0.41)} color={ink} top="16%">
          <h2 style={{ margin: '0 auto', maxWidth: 680, fontFamily: 'var(--display)', fontWeight: 600, fontSize: 'clamp(27px,3.8vw,50px)', letterSpacing: '-0.03em', lineHeight: 1.12 }}>
            It remembers what your POS forgets — <span className="serif-it" style={{ color: 'var(--terra)', fontWeight: 400 }}>their name, their order, their Tuesday.</span>
          </h2>
        </Beat>

        <Beat show={win(p, 0.44, 0.5, 0.58, 0.65)} color="#F7F0DE" top="16%">
          <h2 style={{ margin: '0 auto', maxWidth: 640, fontFamily: 'var(--display)', fontWeight: 600, fontSize: 'clamp(27px,3.8vw,48px)', letterSpacing: '-0.03em', lineHeight: 1.14 }}>
            Your best regular won&apos;t complain before they leave.<br /><span className="serif-it" style={{ color: 'var(--saffron)', fontWeight: 400 }}>They&apos;ll just stop showing up.</span>
          </h2>
        </Beat>

        <Beat show={win(p, 0.68, 0.75, 0.83, 0.89)} color="#F7F0DE" top="13%">
          <h2 style={{ margin: '0 auto', maxWidth: 720, fontFamily: 'var(--display)', fontWeight: 600, fontSize: 'clamp(29px,4.2vw,54px)', letterSpacing: '-0.03em', lineHeight: 1.08 }}>
            That&apos;s not a loyalty program. <span className="serif-it" style={{ color: 'var(--saffron)', fontWeight: 400 }}>That&apos;s a circle — and they belong to it.</span>
          </h2>
        </Beat>

        <Beat show={win(p, 0.92, 0.96, 1, 1.001)} color={ink} top="20%">
          <h2 style={{ fontFamily: 'var(--display)', fontWeight: 600, fontSize: 'clamp(34px,5vw,74px)', letterSpacing: '-0.04em' }}>
            Your neighbourhood&apos;s favourite. <span className="serif-it" style={{ color: 'var(--terra)', fontWeight: 400 }}>On purpose.</span>
          </h2>
          <div style={{ marginTop: 28 }}>
            <a href="#" className="btn-primary" style={{ padding: '16px 28px', fontSize: 15 }}>Claim your free month <span className="arrow-circle">→</span></a>
          </div>
        </Beat>

        <div style={{ position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)', opacity: win(p, 0, 0.01, 0.04, 0.08), fontFamily: 'var(--mono)', fontSize: 10.5, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--muted)' }}>Scroll ↓</div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: 'rgba(0,0,0,0.06)' }}>
          <div style={{ width: `${p * 100}%`, height: '100%', background: 'linear-gradient(90deg,var(--terra),var(--saffron),var(--plum))' }} />
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .ring-idle-pulse { animation: ring-pulse 5.5s ease-in-out infinite; }
        @keyframes ring-pulse { 0%,100% { filter: drop-shadow(0 30px 60px rgba(214,122,69,0.30)) brightness(1); } 50% { filter: drop-shadow(0 34px 70px rgba(229,177,74,0.5)) brightness(1.06); } }
        @media (prefers-reduced-motion: reduce) { .ring-idle-pulse { animation: none; } }
      ` }} />
    </div>
  );
}
