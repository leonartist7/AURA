// @ts-nocheck
'use client';

/* AroLandingV3 — the "no slop" rebuild.
   Kills: glowing 3D shapes, orbiting letter-avatars, blur-blob backgrounds,
   pulsing/breathing loops. Replaces with: confident typography as the hero
   (not a shape), one small flat static wallet-pass mock, hairline dividers,
   flat data rows. Adds the substance a premium/high-converting page needs
   and previous passes were missing entirely: a direct competitor comparison,
   a real pricing anchor, and an FAQ that kills the standing objections. */

import * as React from 'react';
import { motion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1];

function Reveal({ children, delay = 0, y = 16, style = {} }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.6, ease: EASE, delay }}
      style={style}
    >
      {children}
    </motion.div>
  );
}

function Container({ children, style = {} }) {
  return <div style={{ width: '100%', maxWidth: 1120, margin: '0 auto', padding: '0 32px', ...style }}>{children}</div>;
}

function Rule({ dark = false }) {
  return <div style={{ height: 1, background: dark ? 'rgba(243,234,215,0.12)' : 'rgba(42,31,24,0.1)' }} />;
}

function Wordmark({ light = false }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 9, fontFamily: 'var(--display)', fontWeight: 700, fontSize: 21, letterSpacing: '-0.04em', color: light ? 'var(--cream)' : 'var(--ink)' }}>
      <span style={{ width: 9, height: 9, borderRadius: '50%', background: 'var(--terra)', display: 'inline-block' }} />
      aro
    </span>
  );
}

/* ───────── nav ───────── */
function Nav() {
  return (
    <div style={{ position: 'sticky', top: 0, zIndex: 30, background: 'rgba(243,234,215,0.86)', backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(42,31,24,0.08)' }}>
      <Container style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 32px' }}>
        <Wordmark />
        <div style={{ display: 'flex', alignItems: 'center', gap: 30 }}>
          <a className="hide-mobile" href="#how" style={{ fontSize: 14, color: 'var(--ink-soft)', textDecoration: 'none' }}>How it works</a>
          <a className="hide-mobile" href="#compare" style={{ fontSize: 14, color: 'var(--ink-soft)', textDecoration: 'none' }}>Compare</a>
          <a className="hide-mobile" href="#pricing" style={{ fontSize: 14, color: 'var(--ink-soft)', textDecoration: 'none' }}>Pricing</a>
          <a className="hide-mobile" href="#faq" style={{ fontSize: 14, color: 'var(--ink-soft)', textDecoration: 'none' }}>FAQ</a>
          <a href="#offer" className="btn-primary" style={{ padding: '10px 18px', fontSize: 13 }}>Book a demo</a>
        </div>
      </Container>
    </div>
  );
}

/* ───────── a restrained, flat wallet-pass mock (no glow, no pulse) ───────── */
function PassMock() {
  return (
    <div
      style={{
        width: 300,
        padding: 22,
        borderRadius: 20,
        background: 'linear-gradient(155deg, #2A1F18 0%, #1F1612 100%)',
        color: 'var(--cream)',
        boxShadow: '0 30px 60px -24px rgba(20,12,5,0.35)',
        border: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: 'var(--display)', fontWeight: 700, fontSize: 15, letterSpacing: '-0.02em' }}>aro</span>
        <span style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.55 }}>Silver member</span>
      </div>
      <div style={{ marginTop: 26, fontFamily: 'var(--display)', fontSize: 20, fontWeight: 600, letterSpacing: '-0.02em' }}>Maya Rivera</div>
      <div style={{ fontSize: 12.5, opacity: 0.6, marginTop: 2 }}>The Roastery · Kensington</div>
      <div style={{ marginTop: 20, display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: 'var(--display)', fontSize: 26, fontWeight: 700, letterSpacing: '-0.03em' }}>1,284 <span style={{ fontSize: 12, fontWeight: 500, opacity: 0.6 }}>pts</span></span>
        <div style={{ display: 'flex', gap: 2, alignItems: 'flex-end', height: 18 }}>
          {[5, 11, 8, 14, 6, 12, 9].map((h, i) => <span key={i} style={{ width: 2, height: h, background: 'rgba(243,234,215,0.5)', borderRadius: 1 }} />)}
        </div>
      </div>
      <div style={{ marginTop: 18, paddingTop: 14, borderTop: '1px solid rgba(255,255,255,0.08)', fontSize: 12, opacity: 0.7 }}>
        Your usual oat flat white — ready in 3 min
      </div>
    </div>
  );
}

/* ───────── hero ───────── */
function Hero() {
  return (
    <section style={{ background: 'var(--cream)', padding: '86px 0 96px' }}>
      <Container>
        <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: 56, alignItems: 'center' }} className="r-hero">
          <div>
            <Reveal>
              <div className="eyebrow"><span className="dot" /> for independent cafés &amp; restaurants</div>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 style={{ marginTop: 22, fontFamily: 'var(--display)', fontWeight: 600, fontSize: 'clamp(38px,4.6vw,64px)', letterSpacing: '-0.045em', lineHeight: 1.03, maxWidth: 620 }}>
                Coffee gets them in the door. <span className="serif-it" style={{ color: 'var(--terra)', fontWeight: 400 }}>This gets them back.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p style={{ marginTop: 20, maxWidth: 480, fontSize: 17, lineHeight: 1.6, color: 'var(--ink-soft)' }}>
                aro is the regulars club independent cafés run without hiring anyone — loyalty, win-backs, and direct ordering that actually works, live in 14 days.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div style={{ marginTop: 30, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                <a href="#offer" className="btn-primary" style={{ padding: '15px 24px', fontSize: 14.5 }}>Book a 20-min demo <span className="arrow-circle">→</span></a>
                <a href="#how" className="btn-secondary">See how it works</a>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div style={{ marginTop: 34, display: 'flex', gap: 20, flexWrap: 'wrap', fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)' }}>
                <span>A few cafés per neighbourhood</span><span>·</span><span>First month free</span><span>·</span><span>No commission</span>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.1} style={{ display: 'flex', justifyContent: 'center' }} className="hide-mobile">
            <PassMock />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

/* ───────── proof strip — flat, no glow ───────── */
function ProofStrip() {
  const cafes = ['The Roastery', 'Bridge & Bean', 'Saint Aubin', 'Maman', 'Kettle Black'];
  return (
    <section style={{ background: 'var(--cream)', paddingBottom: 70 }}>
      <Container>
        <Rule />
        <Reveal style={{ paddingTop: 26 }}>
          <div style={{ textAlign: 'center', fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 22 }}>
            Trusted by independent cafés across Kensington · Inglewood · Bridgeland
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '18px 40px', opacity: 0.62 }}>
            {cafes.map((c) => <span key={c} style={{ fontFamily: 'var(--display)', fontSize: 19, fontWeight: 600, letterSpacing: '-0.02em' }}>{c}</span>)}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/* ───────── comparison — the objection killer ───────── */
function Compare() {
  const rows = [
    ['Personalized win-backs', 'No', 'No', 'Yes'],
    ['Commission-free direct ordering', '—', 'Partial', 'Yes'],
    ['Done-for-you setup', 'No', 'No', 'Yes — 14 days'],
    ['Local exclusivity per area', '—', '—', 'Yes'],
    ['A person you can call', 'No', 'Support ticket', 'Your rep'],
  ];
  return (
    <section id="compare" style={{ background: 'var(--cream-warm)', padding: '90px 0' }}>
      <Container>
        <Reveal><div className="eyebrow"><span className="dot" /> why not just use square?</div></Reveal>
        <Reveal delay={0.05}>
          <h2 style={{ marginTop: 18, fontFamily: 'var(--display)', fontWeight: 600, fontSize: 'clamp(28px,3.6vw,46px)', letterSpacing: '-0.035em', maxWidth: 640 }}>
            Your POS already does loyalty. <span className="serif-it" style={{ color: 'var(--terra)', fontWeight: 400 }}>Badly.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p style={{ marginTop: 14, maxWidth: 560, fontSize: 16, lineHeight: 1.6, color: 'var(--ink-soft)' }}>
            Square and Toast give you a punch-card. aro gives you a system that actually brings people back — and someone who sets it up for you.
          </p>
        </Reveal>

        <Reveal delay={0.15} style={{ marginTop: 40, overflowX: 'auto' }}>
          <table style={{ width: '100%', minWidth: 560, borderCollapse: 'collapse', fontSize: 14.5 }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '0 0 14px', fontWeight: 500, color: 'var(--muted)', fontFamily: 'var(--mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em' }}></th>
                <th style={{ textAlign: 'center', padding: '0 0 14px', fontWeight: 500, color: 'var(--muted)', fontFamily: 'var(--mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Punch card</th>
                <th style={{ textAlign: 'center', padding: '0 0 14px', fontWeight: 500, color: 'var(--muted)', fontFamily: 'var(--mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Square / Toast</th>
                <th style={{ textAlign: 'center', padding: '0 0 14px', fontWeight: 700, color: 'var(--terra)', fontFamily: 'var(--mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em' }}>aro</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i} style={{ borderTop: '1px solid rgba(42,31,24,0.08)' }}>
                  <td style={{ padding: '16px 8px 16px 0', fontWeight: 600 }}>{r[0]}</td>
                  <td style={{ padding: '16px 8px', textAlign: 'center', color: 'var(--muted)' }}>{r[1]}</td>
                  <td style={{ padding: '16px 8px', textAlign: 'center', color: 'var(--muted)' }}>{r[2]}</td>
                  <td style={{ padding: '16px 0 16px 8px', textAlign: 'center', fontWeight: 700, color: 'var(--ink)' }}>{r[3]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>

        <Reveal delay={0.2}>
          <p style={{ marginTop: 30, fontSize: 15.5, fontStyle: 'italic', color: 'var(--ink-soft)' }}>
            You don&apos;t need more software. You need someone who makes it work.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}

/* ───────── how it works — flat numbered rows, no icon-in-circle ───────── */
function HowItWorks() {
  const steps = [
    ['01', 'We build your club with you.', '14 days, no dev work on your side. Your menu, your rewards, your brand.'],
    ['02', 'Regulars join in one tap.', 'A QR at the counter, a pass in their wallet. No app to download.'],
    ['03', 'aro brings them back — on its own.', 'Quiet win-backs, birthday perks, and "your usual" nudges run in the background.'],
  ];
  return (
    <section id="how" style={{ background: 'var(--cream)', padding: '90px 0' }}>
      <Container>
        <Reveal><div className="eyebrow"><span className="dot" /> live in 14 days</div></Reveal>
        <Reveal delay={0.05}>
          <h2 style={{ marginTop: 18, fontFamily: 'var(--display)', fontWeight: 600, fontSize: 'clamp(28px,3.6vw,46px)', letterSpacing: '-0.035em' }}>Simple enough to forget it&apos;s working.</h2>
        </Reveal>
        <div style={{ marginTop: 44 }}>
          {steps.map((s, i) => (
            <Reveal key={s[0]} delay={0.08 * i}>
              <div style={{ display: 'grid', gridTemplateColumns: '70px 1fr', gap: 24, padding: '26px 0', borderTop: i === 0 ? '1px solid rgba(42,31,24,0.1)' : 'none', borderBottom: '1px solid rgba(42,31,24,0.1)' }}>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 14, color: 'var(--terra)' }}>{s[0]}</div>
                <div>
                  <h3 style={{ fontFamily: 'var(--display)', fontWeight: 600, fontSize: 20, letterSpacing: '-0.02em' }}>{s[1]}</h3>
                  <p style={{ marginTop: 6, fontSize: 15, lineHeight: 1.55, color: 'var(--ink-soft)', maxWidth: 520 }}>{s[2]}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ───────── numbers — flat data row, no glowing circles ───────── */
function Numbers() {
  const stats = [['+22%', 'repeat visits in the first 90 days'], ['0%', 'commission on direct orders'], ['~11 hrs', 'of monthly marketing you stop doing']];
  return (
    <section style={{ background: 'var(--cream-warm)', padding: '80px 0' }}>
      <Container>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 28 }} className="r-3col">
          {stats.map((s, i) => (
            <Reveal key={s[0]} delay={i * 0.06}>
              <div>
                <div style={{ fontFamily: 'var(--display)', fontWeight: 700, fontSize: 'clamp(36px,4vw,52px)', letterSpacing: '-0.035em' }}>{s[0]}</div>
                <div style={{ marginTop: 6, fontSize: 14.5, color: 'var(--ink-soft)', maxWidth: 220 }}>{s[1]}</div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.2}>
          <div style={{ marginTop: 30, fontFamily: 'var(--mono)', fontSize: 10.5, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)' }}>Illustrative — your real numbers are in the free café health check</div>
        </Reveal>
      </Container>
    </section>
  );
}

/* ───────── testimonial — flat muted avatar, no glow ───────── */
function Testimonial() {
  return (
    <section style={{ background: 'var(--cream)', padding: '90px 0' }}>
      <Container style={{ maxWidth: 760 }}>
        <Reveal>
          <p style={{ fontFamily: 'var(--display)', fontWeight: 500, fontSize: 'clamp(22px,2.8vw,32px)', letterSpacing: '-0.02em', lineHeight: 1.35 }}>
            “It feels like having a marketing person I could never afford — except it just works while I make coffee.”
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <div style={{ marginTop: 22, display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--sand)', color: 'var(--ink)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontFamily: 'var(--display)', fontSize: 14 }}>S</div>
            <div>
              <div style={{ fontWeight: 600, fontSize: 14 }}>Sofia</div>
              <div style={{ fontSize: 12.5, color: 'var(--muted)' }}>The Roastery · Kensington</div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/* ───────── pricing anchor — a real number, not "held for demo" ───────── */
function Pricing() {
  return (
    <section id="pricing" style={{ background: 'var(--cream-warm)', padding: '90px 0' }}>
      <Container style={{ maxWidth: 720 }}>
        <Reveal><div className="eyebrow"><span className="dot" /> pricing</div></Reveal>
        <Reveal delay={0.05}>
          <h2 style={{ marginTop: 18, fontFamily: 'var(--display)', fontWeight: 600, fontSize: 'clamp(28px,3.6vw,46px)', letterSpacing: '-0.035em' }}>
            Plans start at <span className="serif-it" style={{ color: 'var(--terra)', fontWeight: 400 }}>$149/mo.</span> First month free.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p style={{ marginTop: 16, fontSize: 16, lineHeight: 1.6, color: 'var(--ink-soft)', maxWidth: 520 }}>
            We tailor the setup to your menu and reward structure on a 20-minute call — but the price is never a surprise, and there&apos;s no long-term contract.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}

/* ───────── FAQ — native accordion, zero JS needed ───────── */
function FAQ() {
  const items = [
    ['Do I need to replace my POS?', 'No. aro runs alongside Square, Toast, Clover — no rip-and-replace, no new hardware.'],
    ['How long does setup take?', '14 days, and we do it with you — menu, rewards, and staff training included.'],
    ['What if my regulars don’t use it?', 'Your first month is free. If it doesn’t work, you walk away — no cost, no hard feelings.'],
    ['Is there a contract?', 'No long-term contract. Month to month, cancel anytime.'],
    ['Why only a few cafés per neighbourhood?', 'Because we can’t be your competitor’s system too. Exclusivity is the point.'],
  ];
  return (
    <section id="faq" style={{ background: 'var(--cream)', padding: '90px 0' }}>
      <Container style={{ maxWidth: 760 }}>
        <Reveal><div className="eyebrow"><span className="dot" /> frequently asked</div></Reveal>
        <Reveal delay={0.05}>
          <h2 style={{ marginTop: 18, marginBottom: 34, fontFamily: 'var(--display)', fontWeight: 600, fontSize: 'clamp(28px,3.6vw,44px)', letterSpacing: '-0.035em' }}>Before you ask.</h2>
        </Reveal>
        <div>
          {items.map(([q, a], i) => (
            <Reveal key={q} delay={i * 0.04}>
              <details style={{ borderTop: '1px solid rgba(42,31,24,0.1)', padding: '18px 0' }}>
                <summary style={{ cursor: 'pointer', fontWeight: 600, fontSize: 16.5, listStyle: 'none' }}>{q}</summary>
                <p style={{ marginTop: 10, fontSize: 15, lineHeight: 1.6, color: 'var(--ink-soft)' }}>{a}</p>
              </details>
            </Reveal>
          ))}
          <Rule />
        </div>
      </Container>
    </section>
  );
}

/* ───────── final CTA + footer ───────── */
function Offer() {
  return (
    <section id="offer" style={{ background: 'var(--espresso)', color: 'var(--cream)', padding: '110px 0 50px' }}>
      <Container>
        <Reveal style={{ textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--display)', fontWeight: 600, fontSize: 'clamp(32px,4.6vw,64px)', letterSpacing: '-0.04em', lineHeight: 1.04 }}>
            Your neighbourhood&apos;s favourite. <span className="serif-it" style={{ color: 'var(--saffron)', fontWeight: 400 }}>On purpose.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.06} style={{ textAlign: 'center' }}>
          <p style={{ margin: '20px auto 0', maxWidth: 460, fontSize: 16, lineHeight: 1.6, color: 'rgba(243,234,215,0.78)' }}>
            Start free for a month. Launch in 14 days. No commissions, no contract. If your regulars don&apos;t feel it, you walk away.
          </p>
        </Reveal>
        <Reveal delay={0.12} style={{ textAlign: 'center' }}>
          <div style={{ marginTop: 30 }}>
            <a href="#" className="btn-primary" style={{ background: 'var(--cream)', color: 'var(--ink)', padding: '16px 28px', fontSize: 15 }}>Book a 20-min demo <span className="arrow-circle" style={{ background: 'var(--ink)', color: 'var(--cream)' }}>→</span></a>
          </div>
        </Reveal>

        <div style={{ marginTop: 100, paddingTop: 34, borderTop: '1px solid rgba(243,234,215,0.12)' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 40, justifyContent: 'space-between' }}>
            <div style={{ maxWidth: 260 }}>
              <Wordmark light />
              <p style={{ marginTop: 12, fontSize: 13, color: 'rgba(243,234,215,0.55)', lineHeight: 1.5 }}>The regulars club for independent cafés &amp; restaurants.</p>
            </div>
            <div style={{ display: 'flex', gap: 56, flexWrap: 'wrap' }}>
              <div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 10.5, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(243,234,215,0.4)', marginBottom: 10 }}>Product</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 13.5 }}>
                  <a href="#how" style={{ color: 'rgba(243,234,215,0.75)', textDecoration: 'none' }}>How it works</a>
                  <a href="#compare" style={{ color: 'rgba(243,234,215,0.75)', textDecoration: 'none' }}>Compare</a>
                  <a href="#pricing" style={{ color: 'rgba(243,234,215,0.75)', textDecoration: 'none' }}>Pricing</a>
                  <a href="/diagnostic" style={{ color: 'rgba(243,234,215,0.75)', textDecoration: 'none' }}>Café health check</a>
                </div>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 10.5, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(243,234,215,0.4)', marginBottom: 10 }}>Company</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 13.5 }}>
                  <a href="#faq" style={{ color: 'rgba(243,234,215,0.75)', textDecoration: 'none' }}>FAQ</a>
                  <a href="mailto:hello@aro.club" style={{ color: 'rgba(243,234,215,0.75)', textDecoration: 'none' }}>Contact</a>
                </div>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 10.5, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(243,234,215,0.4)', marginBottom: 10 }}>Legal</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 13.5 }}>
                  <a href="/privacy" style={{ color: 'rgba(243,234,215,0.75)', textDecoration: 'none' }}>Privacy</a>
                  <a href="/terms" style={{ color: 'rgba(243,234,215,0.75)', textDecoration: 'none' }}>Terms</a>
                </div>
              </div>
            </div>
          </div>
          <div style={{ marginTop: 40, paddingTop: 20, borderTop: '1px solid rgba(243,234,215,0.08)', fontSize: 12, color: 'rgba(243,234,215,0.4)' }}>© 2026 aro. All rights reserved.</div>
        </div>
      </Container>
    </section>
  );
}

export default function AroLandingV3() {
  return (
    <div style={{ background: 'var(--cream)' }}>
      <Nav />
      <Hero />
      <ProofStrip />
      <Compare />
      <HowItWorks />
      <Numbers />
      <Testimonial />
      <Pricing />
      <FAQ />
      <Offer />
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 900px) {
          .r-hero { grid-template-columns: 1fr !important; }
          .r-3col { grid-template-columns: 1fr !important; gap: 24px !important; }
          .hide-mobile { display: none !important; }
        }
        details summary::-webkit-details-marker { display: none; }
      ` }} />
    </div>
  );
}
