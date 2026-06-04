const fs = require('fs');
const SRC = 'design-src/landing';
const order = ['atoms','phones','sections-a','sections-b','sections-cozy','sections-c','app'];

// remove entire `Object.assign(window, {...});` statements (single- or multi-line)
function stripWindowExports(code) {
  const lines = code.split('\n');
  const out = [];
  let skipping = false;
  for (const l of lines) {
    if (!skipping && l.trimStart().startsWith('Object.assign(window')) {
      // single-line form ends on same line
      if (l.includes('});')) continue;
      skipping = true; continue;
    }
    if (skipping) {
      if (l.trim() === '});') skipping = false;
      continue;
    }
    out.push(l);
  }
  return out.join('\n');
}

let body = '';
for (const name of order) {
  let code = fs.readFileSync(`${SRC}/${name}.jsx`, 'utf8');
  code = stripWindowExports(code);

  if (name === 'atoms') {
    // cross-link to the diagnostic route from the landing nav
    code = code.replace(
      '<a href="#founders">Founder Program</a>',
      '<a href="#founders">Founder Program</a>\n          <a href="/diagnostic">Café health check</a>'
    );
  }

  if (name === 'app') {
    code = code.replace(
      'const [t, setTweak] = useTweaks(window.AURA_DEFAULTS);',
      'const t = AURA_DEFAULTS;'
    );
    code = code.replace('useLayoutEffect(() => {', 'useEffect(() => {');
    code = code.replace(/\n\s*<TweaksPanel title="Tweaks">[\s\S]*?<\/TweaksPanel>/, '');
    code = code.replace(/const root = ReactDOM\.createRoot[\s\S]*$/, 'export default App;\n');
  }
  body += `\n/* ===== ${name} ===== */\n` + code + '\n';
}

const header = `// @ts-nocheck
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
`;

let out = header + body;
out = out.replace(/"assets\/testimonials\//g, '"/assets/testimonials/');
fs.writeFileSync('components/aura/AuraLanding.tsx', out);
console.log('bytes:', out.length);
console.log('window-export remaining:', (out.match(/Object\.assign\(window/g)||[]).length);
console.log('dangling "});" orphans near top:', (out.slice(0,12000).match(/^\}\);$/gm)||[]).length);
console.log('diagnostic nav link:', out.includes('href="/diagnostic"'));
console.log('export default App:', out.includes('export default App;'));
