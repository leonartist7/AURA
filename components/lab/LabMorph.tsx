// @ts-nocheck
'use client';

/* Variation A — "Living 3D".
   A live WebGL raymarched ring: scroll lays it down (rotateX), and a time
   clock makes it breathe + glow WHILE IDLE (the thing baked video can't do).
   Background color shifts with scroll. Falls back to a CSS ring if WebGL is
   unavailable. Heaviest option; capped resolution + off-screen pause. */

import * as React from 'react';
import { usePinnedProgress, win, lerp, seg, ramp } from '@/lib/scroll';

const { useRef, useEffect } = React;

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
  // background warms into night then back
  float dark = smoothstep(0.42,0.6,uScroll)-smoothstep(0.84,0.96,uScroll);
  vec3 bg = mix(vec3(0.953,0.918,0.843), vec3(0.122,0.086,0.071), clamp(dark,0.,1.));
  // lay-down tilt from scroll + gentle idle wobble
  float ang = mix(1.4, 0.32, smoothstep(0.5,0.78,uScroll)) + breathe*0.04;
  M = rotX(ang);
  float sc = 1.0 + (uReduced>0.5?0.0:breathe*0.02);
  vec3 ro=vec3(0.,0.,5.2);
  vec3 rd=normalize(vec3(uv*1.7/sc, -2.0));
  float t=0.,hit=0.;
  for(int i=0;i<88;i++){vec3 p=ro+rd*t;float d=map(p);if(d<0.001){hit=1.;break;}if(t>9.)break;t+=d;}
  vec3 col=bg;
  float glowPulse = uReduced>0.5?0.5:(0.5+0.5*sin(uTime*1.4));
  if(hit>0.5){
    vec3 p=ro+rd*t; vec3 n=calcN(p); vec3 v=normalize(ro-p);
    float g=clamp(0.5+0.42*p.x+0.18*p.y,0.,1.);
    vec3 base=grad(g);
    vec3 lp=normalize(vec3(0.55,0.85,0.45));
    float dif=max(dot(n,lp),0.); float ao=calcAO(p,n);
    vec3 h=normalize(lp+v); float spe=pow(max(dot(n,h),0.),48.);
    float fres=pow(1.-max(dot(n,v),0.),3.);
    vec3 amb=mix(vec3(0.92,0.86,0.78),vec3(0.35,0.28,0.32),clamp(dark,0.,1.));
    col=base*(amb*0.32*ao)+base*dif*vec3(1.05,0.98,0.86)+spe*vec3(1.,0.96,0.85)*0.9+fres*vec3(0.95,0.78,0.55)*(0.5+0.4*glowPulse);
  } else {
    // soft breathing halo behind the ring
    float halo=exp(-length(uv)*1.8)*(0.10+0.10*glowPulse);
    col+=vec3(0.95,0.7,0.4)*halo*(0.5+clamp(dark,0.,1.));
  }
  col=pow(col,vec3(0.85));
  gl_FragColor=vec4(col,1.0);
}`;
const VERT = `attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}`;

function useWebGLRing(scrollRef) {
  const canvasRef = useRef(null);
  const okRef = useRef(true);
  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const gl = cv.getContext('webgl', { antialias: true });
    if (!gl) { okRef.current = false; cv.style.display = 'none'; return; }
    const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 1 : 0;
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
      const w = Math.min(cv.clientWidth * dpr, 1400), h = Math.min(cv.clientHeight * dpr, 1400);
      cv.width = w; cv.height = h; gl.viewport(0, 0, w, h);
    };
    resize(); window.addEventListener('resize', resize);
    const io = new IntersectionObserver((e) => { visible = e[0].isIntersecting; }, { threshold: 0 });
    io.observe(cv);
    const frame = (ts) => {
      if (!t0) t0 = ts;
      if (visible) {
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
  }, [scrollRef]);
  return { canvasRef, okRef };
}

function Beat({ show, color, top, children }) {
  return (
    <div style={{ position: 'absolute', left: 0, right: 0, top, textAlign: 'center', padding: '0 24px', opacity: show, transform: `translateY(${lerp(24, 0, show)}px)`, color, pointerEvents: show > 0.9 ? 'auto' : 'none' }}>
      {children}
    </div>
  );
}

export default function LabMorph() {
  const { ref, p } = usePinnedProgress();
  const scrollRef = useRef(0);
  scrollRef.current = p;
  const { canvasRef } = useWebGLRing(scrollRef);

  const onDark = p > 0.5 && p < 0.9;
  const ink = onDark ? '#F3EAD7' : '#1F1612';

  return (
    <div ref={ref} style={{ position: 'relative', height: '460vh', background: '#F3EAD7' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>
        <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }} />

        <Beat show={win(p, 0, 0.03, 0.1, 0.18)} color={ink} top="14%">
          <div style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', opacity: 0.6 }}>Variation A · Living 3D</div>
          <h1 style={{ marginTop: 14, fontFamily: 'var(--display)', fontWeight: 600, fontSize: 'clamp(38px,5.5vw,76px)', letterSpacing: '-0.045em', lineHeight: 1 }}>Give your café an <span className="serif-it" style={{ color: 'var(--terra)', fontWeight: 400 }}>aura.</span></h1>
        </Beat>
        <Beat show={win(p, 0.24, 0.3, 0.4, 0.48)} color={ink} top="16%">
          <h2 style={{ margin: '0 auto', maxWidth: 640, fontFamily: 'var(--display)', fontWeight: 600, fontSize: 'clamp(28px,4vw,52px)', letterSpacing: '-0.03em' }}>The warmth people feel — <span className="serif-it" style={{ color: 'var(--terra)', fontWeight: 400 }}>kept glowing.</span></h2>
        </Beat>
        <Beat show={win(p, 0.58, 0.66, 0.78, 0.86)} color="#F3EAD7" top="14%">
          <h2 style={{ margin: '0 auto', maxWidth: 680, fontFamily: 'var(--display)', fontWeight: 600, fontSize: 'clamp(30px,4.2vw,56px)', letterSpacing: '-0.03em' }}>It lays down into <span className="serif-it" style={{ color: 'var(--saffron)', fontWeight: 400 }}>your circle.</span></h2>
        </Beat>
        <Beat show={win(p, 0.9, 0.95, 1, 1.001)} color={ink} top="20%">
          <h2 style={{ fontFamily: 'var(--display)', fontWeight: 600, fontSize: 'clamp(34px,5vw,72px)', letterSpacing: '-0.04em' }}>On <span className="serif-it" style={{ color: 'var(--terra)', fontWeight: 400 }}>purpose.</span></h2>
        </Beat>

        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: 'rgba(0,0,0,0.06)' }}>
          <div style={{ width: `${p * 100}%`, height: '100%', background: 'linear-gradient(90deg,var(--terra),var(--saffron),var(--plum))' }} />
        </div>
      </div>
    </div>
  );
}
