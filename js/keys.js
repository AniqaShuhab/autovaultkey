/**
 * js/keys.js  –  Rotating luxury car key showcase
 * 4 keys: Bugatti · Lamborghini · Audi · Rolls-Royce
 * Pure CSS + JS coin-flip, no libraries.
 */
(function () {

  const flipper = document.getElementById('keyFlipper');
  const glowEl  = document.getElementById('keyGlow');
  const labelEl = document.getElementById('keyBrandLabel');
  const dots    = document.querySelectorAll('.kdot');
  if (!flipper) return;

  const KEYS = [
    {
      brand: 'Bugatti',
      color: '#1a1aff',
      svg: `<svg viewBox="0 0 500 280" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;display:block">
  <defs>
    <pattern id="cf_b" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <rect width="4" height="8" fill="#181818"/><rect x="4" width="4" height="8" fill="#111"/>
    </pattern>
    <linearGradient id="chrome_b" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#e8e8e8"/><stop offset="40%" stop-color="#ffffff"/><stop offset="100%" stop-color="#888"/>
    </linearGradient>
    <linearGradient id="edge_b" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#2a2a2a"/><stop offset="50%" stop-color="#444"/><stop offset="100%" stop-color="#2a2a2a"/>
    </linearGradient>
    <filter id="glow_b"><feGaussianBlur stdDeviation="4" result="blur"/><feComposite in="SourceGraphic" in2="blur" operator="over"/></filter>
  </defs>
  <rect x="130" y="20" width="240" height="195" rx="22" fill="url(#cf_b)"/>
  <rect x="130" y="20" width="240" height="195" rx="22" fill="none" stroke="url(#edge_b)" stroke-width="2"/>
  <rect x="132" y="21" width="236" height="5" rx="3" fill="url(#chrome_b)" opacity="0.18"/>
  <rect x="130" y="194" width="240" height="21" rx="0 0 22 22" fill="#1a1aff" opacity="0.92"/>
  <rect x="130" y="194" width="240" height="3" fill="#3a3aff" opacity="0.5"/>
  <ellipse cx="250" cy="100" rx="60" ry="38" fill="none" stroke="url(#chrome_b)" stroke-width="3"/>
  <ellipse cx="250" cy="100" rx="56" ry="34" fill="#0a0a22"/>
  <ellipse cx="250" cy="100" rx="52" ry="30" fill="none" stroke="#1a1aff" stroke-width="1" stroke-dasharray="4 3" opacity="0.5"/>
  <text x="250" y="108" text-anchor="middle" font-family="Georgia,serif" font-size="26" font-weight="bold" fill="url(#chrome_b)" letter-spacing="4" filter="url(#glow_b)">EB</text>
  <rect x="158" y="156" width="48" height="30" rx="9" fill="#0d0d0d"/>
  <rect x="160" y="158" width="48" height="30" rx="9" fill="none" stroke="#2a2a2a" stroke-width="1"/>
  <path d="M175 172 L175 168 Q175 163 180 163 Q185 163 185 168 L185 172 Z" fill="none" stroke="url(#chrome_b)" stroke-width="1.8"/>
  <rect x="172" y="171" width="16" height="11" rx="3" fill="url(#chrome_b)" opacity="0.7"/>
  <rect x="226" y="156" width="48" height="30" rx="9" fill="#0d0d0d"/>
  <rect x="228" y="158" width="48" height="30" rx="9" fill="none" stroke="#2a2a2a" stroke-width="1"/>
  <path d="M236 172 L236 168 Q236 163 241 162 Q246 161 248 165" fill="none" stroke="url(#chrome_b)" stroke-width="1.8" stroke-linecap="round"/>
  <rect x="238" y="171" width="16" height="11" rx="3" fill="url(#chrome_b)" opacity="0.7"/>
  <rect x="294" y="156" width="48" height="30" rx="9" fill="#0d0d0d"/>
  <rect x="296" y="158" width="48" height="30" rx="9" fill="none" stroke="#2a2a2a" stroke-width="1"/>
  <line x1="305" y1="168" x2="333" y2="168" stroke="url(#chrome_b)" stroke-width="2" stroke-linecap="round" opacity="0.7"/>
  <line x1="305" y1="174" x2="333" y2="174" stroke="url(#chrome_b)" stroke-width="1.5" stroke-linecap="round" opacity="0.45"/>
  <rect x="220" y="215" width="60" height="45" rx="5" fill="none" stroke="#1a1aff" stroke-width="1.5" stroke-dasharray="5 3" opacity="0.45"/>
  <line x1="232" y1="218" x2="232" y2="257" stroke="#1a1aff" stroke-width="1.5" opacity="0.25"/>
  <line x1="248" y1="215" x2="248" y2="260" stroke="#1a1aff" stroke-width="1.5" opacity="0.25"/>
  <line x1="268" y1="215" x2="268" y2="260" stroke="#1a1aff" stroke-width="1.5" opacity="0.25"/>
  <ellipse cx="250" cy="273" rx="115" ry="6" fill="#1a1aff" opacity="0.14"/>
</svg>`
    },
    {
      brand: 'Lamborghini',
      color: '#f5c518',
      svg: `<svg viewBox="0 0 500 280" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;display:block">
  <defs>
    <pattern id="cf_l" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <rect width="4" height="8" fill="#181818"/><rect x="4" width="4" height="8" fill="#111"/>
    </pattern>
    <linearGradient id="gold_l" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f5c518"/><stop offset="45%" stop-color="#ffe060"/><stop offset="100%" stop-color="#b8880c"/>
    </linearGradient>
    <linearGradient id="goldV_l" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffe060"/><stop offset="100%" stop-color="#8b6200"/>
    </linearGradient>
    <filter id="glow_l"><feGaussianBlur stdDeviation="5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <polygon points="108,58 392,38 412,198 360,242 140,242 88,198" fill="url(#cf_l)"/>
  <polygon points="108,58 392,38 412,198 360,242 140,242 88,198" fill="none" stroke="#1e1e1e" stroke-width="1.5"/>
  <line x1="109" y1="60" x2="390" y2="40" stroke="url(#gold_l)" stroke-width="2.5"/>
  <line x1="391" y1="40" x2="410" y2="196" stroke="url(#gold_l)" stroke-width="2.5"/>
  <line x1="410" y1="197" x2="362" y2="240" stroke="url(#gold_l)" stroke-width="2.5"/>
  <line x1="361" y1="240" x2="139" y2="240" stroke="url(#gold_l)" stroke-width="2.5"/>
  <line x1="138" y1="240" x2="90" y2="197" stroke="url(#gold_l)" stroke-width="2.5"/>
  <line x1="89" y1="196" x2="107" y2="59" stroke="url(#gold_l)" stroke-width="2.5"/>
  <circle cx="108" cy="58" r="5" fill="url(#gold_l)"/>
  <circle cx="392" cy="38" r="5" fill="url(#gold_l)"/>
  <circle cx="412" cy="198" r="5" fill="url(#gold_l)"/>
  <circle cx="360" cy="242" r="5" fill="url(#gold_l)"/>
  <circle cx="140" cy="242" r="5" fill="url(#gold_l)"/>
  <circle cx="88" cy="198" r="5" fill="url(#gold_l)"/>
  <circle cx="108" cy="58" r="22" fill="#ff6600" opacity="0.06"/>
  <circle cx="392" cy="38" r="22" fill="#ff6600" opacity="0.06"/>
  <g transform="translate(176,52) scale(0.62)" filter="url(#glow_l)">
    <ellipse cx="120" cy="105" rx="65" ry="44" fill="url(#gold_l)"/>
    <ellipse cx="178" cy="82" rx="22" ry="28" fill="url(#gold_l)"/>
    <ellipse cx="198" cy="65" rx="30" ry="26" fill="url(#gold_l)"/>
    <path d="M182 47 Q170 22 158 30 Q163 44 176 52 Z" fill="url(#gold_l)"/>
    <path d="M215 47 Q226 22 238 30 Q233 44 220 52 Z" fill="url(#gold_l)"/>
    <rect x="70" y="140" width="22" height="50" rx="8" fill="url(#goldV_l)"/>
    <rect x="100" y="140" width="22" height="50" rx="8" fill="url(#goldV_l)"/>
    <rect x="138" y="140" width="22" height="50" rx="8" fill="url(#goldV_l)"/>
    <rect x="166" y="140" width="22" height="50" rx="8" fill="url(#goldV_l)"/>
    <path d="M56 90 Q34 65 40 52 Q52 58 58 78" fill="url(#gold_l)"/>
    <circle cx="222" cy="72" r="6" fill="none" stroke="url(#gold_l)" stroke-width="3"/>
  </g>
  <text x="250" y="214" text-anchor="middle" font-family="'Arial Narrow',Arial,sans-serif" font-size="11" font-weight="900" letter-spacing="4" fill="url(#gold_l)" opacity="0.85">LAMBORGHINI</text>
  <ellipse cx="250" cy="273" rx="130" ry="7" fill="#f5c518" opacity="0.12"/>
</svg>`
    },
    {
      brand: 'Audi',
      color: '#cc0000',
      svg: `<svg viewBox="0 0 500 280" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;display:block">
  <defs>
    <pattern id="brush_a" x="0" y="0" width="4" height="4" patternUnits="userSpaceOnUse">
      <line x1="0" y1="0" x2="4" y2="0" stroke="#2a2a2a" stroke-width="0.8"/>
    </pattern>
    <linearGradient id="silver_a" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#888"/><stop offset="50%" stop-color="#e8e8e8"/><stop offset="100%" stop-color="#888"/>
    </linearGradient>
    <linearGradient id="silverV_a" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#e0e0e0"/><stop offset="100%" stop-color="#666"/>
    </linearGradient>
    <clipPath id="fobClip_a"><rect x="160" y="20" width="180" height="220" rx="18"/></clipPath>
  </defs>
  <rect x="160" y="20" width="180" height="220" rx="18" fill="#1a1a1a"/>
  <rect x="160" y="20" width="180" height="220" rx="18" fill="url(#brush_a)" opacity="0.35" clip-path="url(#fobClip_a)"/>
  <rect x="168" y="28" width="164" height="204" rx="14" fill="#141414"/>
  <rect x="160" y="20" width="180" height="220" rx="18" fill="none" stroke="url(#silver_a)" stroke-width="2"/>
  <rect x="166" y="26" width="168" height="208" rx="15" fill="none" stroke="#252525" stroke-width="1"/>
  <circle cx="196" cy="120" r="32" fill="#141414"/>
  <circle cx="222" cy="120" r="32" fill="#141414"/>
  <circle cx="278" cy="120" r="32" fill="#141414"/>
  <circle cx="304" cy="120" r="32" fill="#141414"/>
  <circle cx="196" cy="120" r="32" fill="none" stroke="url(#silverV_a)" stroke-width="3"/>
  <circle cx="222" cy="120" r="32" fill="none" stroke="url(#silverV_a)" stroke-width="3"/>
  <circle cx="278" cy="120" r="32" fill="none" stroke="url(#silverV_a)" stroke-width="3"/>
  <circle cx="304" cy="120" r="32" fill="none" stroke="url(#silverV_a)" stroke-width="3"/>
  <text x="250" y="178" text-anchor="middle" font-family="Arial,sans-serif" font-size="13" font-weight="300" letter-spacing="7" fill="#e0e0e0" opacity="0.65">AUDI</text>
  <rect x="180" y="195" width="52" height="26" rx="8" fill="#111"/>
  <rect x="182" y="197" width="52" height="26" rx="8" fill="none" stroke="#2e2e2e" stroke-width="1"/>
  <path d="M196 209 L196 205 Q196 200 201 200 Q206 200 206 205 L206 209 Z" fill="none" stroke="#c0c0c0" stroke-width="1.8"/>
  <rect x="193" y="208" width="16" height="9" rx="2.5" fill="#c0c0c0" opacity="0.6"/>
  <rect x="268" y="195" width="52" height="26" rx="8" fill="#111"/>
  <rect x="270" y="197" width="52" height="26" rx="8" fill="none" stroke="#2e2e2e" stroke-width="1"/>
  <path d="M277 209 L277 205 Q277 200 282 199 Q287 198 289 203" fill="none" stroke="#c0c0c0" stroke-width="1.8" stroke-linecap="round"/>
  <rect x="274" y="208" width="16" height="9" rx="2.5" fill="#c0c0c0" opacity="0.6"/>
  <circle cx="250" cy="222" r="5" fill="#cc0000" opacity="0.95"/>
  <circle cx="250" cy="222" r="9" fill="#cc0000" opacity="0.12"/>
  <circle cx="250" cy="222" r="14" fill="#cc0000" opacity="0.05"/>
  <ellipse cx="250" cy="273" rx="100" ry="6" fill="#cc0000" opacity="0.1"/>
</svg>`
    },
    {
      brand: 'Rolls-Royce',
      color: '#d4af37',
      svg: `<svg viewBox="0 0 500 280" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;display:block">
  <defs>
    <linearGradient id="gold_r" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#d4af37"/><stop offset="42%" stop-color="#f0d060"/><stop offset="100%" stop-color="#8b6a18"/>
    </linearGradient>
    <linearGradient id="goldV_r" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#f0d060"/><stop offset="100%" stop-color="#6b4e10"/>
    </linearGradient>
    <linearGradient id="body_r" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0e0e18"/><stop offset="100%" stop-color="#07070f"/>
    </linearGradient>
    <filter id="glow_r"><feGaussianBlur stdDeviation="5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect x="178" y="12" width="144" height="258" rx="42" fill="url(#body_r)"/>
  <rect x="178" y="12" width="144" height="258" rx="42" fill="none" stroke="url(#gold_r)" stroke-width="2"/>
  <rect x="186" y="20" width="128" height="242" rx="36" fill="none" stroke="#1c1708" stroke-width="1"/>
  <line x1="202" y1="46" x2="298" y2="46" stroke="url(#gold_r)" stroke-width="0.8" opacity="0.45"/>
  <line x1="202" y1="50" x2="298" y2="50" stroke="url(#gold_r)" stroke-width="0.4" opacity="0.22"/>
  <line x1="202" y1="242" x2="298" y2="242" stroke="url(#gold_r)" stroke-width="0.8" opacity="0.45"/>
  <line x1="202" y1="246" x2="298" y2="246" stroke="url(#gold_r)" stroke-width="0.4" opacity="0.22"/>
  <g transform="translate(215,52) scale(0.56)" filter="url(#glow_r)">
    <circle cx="63" cy="14" r="12" fill="url(#gold_r)"/>
    <rect x="58" y="24" width="10" height="14" rx="4" fill="url(#gold_r)"/>
    <path d="M50 38 Q55 34 63 34 Q71 34 76 38 L78 80 L48 80 Z" fill="url(#gold_r)"/>
    <path d="M50 38 Q30 48 14 70 Q24 75 38 68 L48 50 Z" fill="url(#goldV_r)"/>
    <path d="M76 38 Q96 48 112 70 Q102 75 88 68 L78 50 Z" fill="url(#goldV_r)"/>
    <path d="M48 80 Q44 96 50 112 L63 106 L76 112 Q82 96 78 80 Z" fill="url(#goldV_r)"/>
    <path d="M46 108 Q55 120 63 118 Q71 120 80 108" fill="none" stroke="url(#gold_r)" stroke-width="1.5" opacity="0.6"/>
  </g>
  <text x="250" y="160" text-anchor="middle" font-family="Georgia,'Times New Roman',serif" font-size="24" font-weight="bold" letter-spacing="5" fill="url(#gold_r)" filter="url(#glow_r)">RR</text>
  <line x1="215" y1="167" x2="285" y2="167" stroke="url(#gold_r)" stroke-width="1" opacity="0.55"/>
  <text x="250" y="182" text-anchor="middle" font-family="Georgia,serif" font-size="8.5" font-weight="400" letter-spacing="3" fill="url(#gold_r)" opacity="0.6">ROLLS-ROYCE</text>
  <rect x="207" y="200" width="30" height="18" rx="5" fill="#0e0e18"/>
  <rect x="209" y="202" width="30" height="18" rx="5" fill="none" stroke="#1e1808" stroke-width="1"/>
  <circle cx="222" cy="209" r="4" fill="none" stroke="url(#gold_r)" stroke-width="1.2" opacity="0.55"/>
  <rect x="235" y="200" width="30" height="18" rx="5" fill="#0e0e18"/>
  <rect x="237" y="202" width="30" height="18" rx="5" fill="none" stroke="#1e1808" stroke-width="1"/>
  <circle cx="250" cy="209" r="4" fill="none" stroke="url(#gold_r)" stroke-width="1.2" opacity="0.55"/>
  <rect x="263" y="200" width="30" height="18" rx="5" fill="#0e0e18"/>
  <rect x="265" y="202" width="30" height="18" rx="5" fill="none" stroke="#1e1808" stroke-width="1"/>
  <circle cx="278" cy="209" r="4" fill="none" stroke="url(#gold_r)" stroke-width="1.2" opacity="0.55"/>
  <rect x="232" y="228" width="36" height="30" rx="4" fill="none" stroke="url(#gold_r)" stroke-width="1.2" stroke-dasharray="3 2.5" opacity="0.38"/>
  <ellipse cx="250" cy="273" rx="85" ry="6" fill="#d4af37" opacity="0.16"/>
</svg>`
    }
  ];

  let current = 0;
  let busy    = false;

  function setDots(i) {
    dots.forEach((d, idx) => d.classList.toggle('active', idx === i));
  }

  function setGlow(color) {
    if (!glowEl) return;
    glowEl.style.transition = 'background 0.55s ease, filter 0.55s ease';
    glowEl.style.background = `radial-gradient(ellipse at center, ${color}2a 0%, transparent 68%)`;
    glowEl.style.filter     = `drop-shadow(0 0 38px ${color}42)`;
  }

  function setLabel(text, color) {
    if (!labelEl) return;
    labelEl.style.transition = 'none';
    labelEl.style.opacity    = '0';
    labelEl.style.transform  = 'translateY(10px)';
    labelEl.style.color      = color;
    labelEl.textContent      = text;
    requestAnimationFrame(() => requestAnimationFrame(() => {
      labelEl.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      labelEl.style.opacity    = '1';
      labelEl.style.transform  = 'translateY(0)';
    }));
  }

  function applyStyle(el, transform, opacity, transition) {
    el.style.transition = transition || 'none';
    el.style.transform  = transform;
    el.style.opacity    = String(opacity);
  }

  function showKey(index, animate) {
    const k = KEYS[index];
    if (!animate) {
      flipper.innerHTML = k.svg;
      applyStyle(flipper, 'perspective(900px) rotateY(0deg) scale(1)', 1, 'none');
      setGlow(k.color);
      setLabel(k.brand, k.color);
      setDots(index);
      return;
    }
    if (busy) return;
    busy = true;

    applyStyle(flipper,
      'perspective(900px) rotateY(90deg) scale(0.82)', 0,
      'transform 0.38s ease-in, opacity 0.34s ease-in');

    setTimeout(() => {
      flipper.innerHTML = k.svg;
      applyStyle(flipper, 'perspective(900px) rotateY(-90deg) scale(0.82)', 0, 'none');
      setGlow(k.color);
      setLabel(k.brand, k.color);
      setDots(index);
      requestAnimationFrame(() => requestAnimationFrame(() => {
        applyStyle(flipper,
          'perspective(900px) rotateY(0deg) scale(1)', 1,
          'transform 0.4s ease-out, opacity 0.36s ease-out');
        setTimeout(() => { busy = false; }, 420);
      }));
    }, 390);
  }

  flipper.style.transformStyle = 'preserve-3d';
  flipper.style.willChange     = 'transform, opacity';
  showKey(0, false);

  setInterval(() => {
    current = (current + 1) % KEYS.length;
    showKey(current, true);
  }, 2900);

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const i = parseInt(dot.dataset.i, 10);
      if (i === current || busy) return;
      current = i;
      showKey(i, true);
    });
  });
})();
