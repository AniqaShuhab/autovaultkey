/**
 * morph-keys.js
 * Car ↔ Luxury Key morphing hero animation.
 * Cycle: Car(3s) → flip → Key[0](3s) → flip → Car(3s) → flip → Key[1](3s) → ...
 */
(function () {

  const stage   = document.getElementById('morphStage');
  const glowEl  = document.getElementById('morphGlow');
  const labelEl = document.getElementById('morphLabel');
  if (!stage) return;

  /* ── Store original car SVG ── */
  const CAR_HTML  = stage.innerHTML;
  const CAR_COLOR = '#6c63ff';
  const CAR_LABEL = '';

  /* ════════════════════════════════
     4 LUXURY KEY SVGs
  ════════════════════════════════ */
  const KEYS = [

    /* 1 ─ BUGATTI ─────────────────── */
    { brand:'Bugatti', color:'#00d4ff', html:`
<svg viewBox="0 0 340 520" xmlns="http://www.w3.org/2000/svg" style="width:auto;height:280px;display:block;margin:auto">
  <defs>
    <linearGradient id="bug_body" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1a1a2e"/><stop offset="50%" stop-color="#0d0d1a"/><stop offset="100%" stop-color="#0a0a14"/>
    </linearGradient>
    <linearGradient id="bug_chrome" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#c0c0d0"/><stop offset="50%" stop-color="#ffffff"/><stop offset="100%" stop-color="#8888a0"/>
    </linearGradient>
    <linearGradient id="bug_screen" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#001830"/><stop offset="100%" stop-color="#000d1a"/>
    </linearGradient>
    <filter id="bug_cyan_glow"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    <filter id="bug_drop"><feDropShadow dx="0" dy="16" stdDeviation="20" flood-color="#00d4ff" flood-opacity="0.3"/></filter>
  </defs>
  <!-- FOB body pill -->
  <rect x="60" y="20" width="220" height="480" rx="48" fill="url(#bug_body)" filter="url(#bug_drop)"/>
  <!-- Chrome border -->
  <rect x="60" y="20" width="220" height="480" rx="48" fill="none" stroke="url(#bug_chrome)" stroke-width="2.5"/>
  <!-- Glossy highlight top-left -->
  <path d="M72 38 Q120 24 200 30 L200 60 Q140 50 75 62 Z" fill="white" opacity="0.05"/>
  <!-- Chrome inner border -->
  <rect x="68" y="28" width="204" height="464" rx="42" fill="none" stroke="rgba(0,212,255,0.15)" stroke-width="1"/>

  <!-- BB LOGO TOP -->
  <ellipse cx="170" cy="82" rx="44" ry="28" fill="none" stroke="url(#bug_chrome)" stroke-width="2"/>
  <ellipse cx="170" cy="82" rx="38" ry="22" fill="#06060f"/>
  <text x="170" y="90" text-anchor="middle" font-family="Georgia,serif" font-size="20" font-weight="bold" fill="url(#bug_chrome)" letter-spacing="2" filter="url(#bug_cyan_glow)">BB</text>

  <!-- OLED SCREEN -->
  <rect x="86" y="128" width="168" height="210" rx="14" fill="url(#bug_screen)"/>
  <rect x="88" y="130" width="164" height="206" rx="13" fill="none" stroke="rgba(0,212,255,0.4)" stroke-width="1.5"/>
  <!-- Screen inner glow -->
  <rect x="92" y="134" width="156" height="198" rx="10" fill="rgba(0,212,255,0.03)"/>

  <!-- Screen content: "START ENGINE" -->
  <text x="170" y="200" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" letter-spacing="3" fill="rgba(0,212,255,0.45)">BUGATTI EB110</text>
  <text x="170" y="232" text-anchor="middle" font-family="'Courier New',monospace" font-size="13" font-weight="bold" letter-spacing="2" fill="#00d4ff" filter="url(#bug_cyan_glow)">START ENGINE</text>
  <line x1="106" y1="248" x2="234" y2="248" stroke="rgba(0,212,255,0.3)" stroke-width="1"/>
  <!-- Engine status bar -->
  <rect x="106" y="256" width="128" height="6" rx="3" fill="rgba(0,212,255,0.1)"/>
  <rect x="106" y="256" width="86" height="6" rx="3" fill="#00d4ff" opacity="0.7"/>
  <text x="170" y="278" text-anchor="middle" font-family="'Courier New',monospace" font-size="8" fill="rgba(0,212,255,0.5)" letter-spacing="1">SYSTEM READY</text>
  <!-- Screen corner dots -->
  <circle cx="100" cy="142" r="2.5" fill="rgba(0,212,255,0.4)"/>
  <circle cx="240" cy="142" r="2.5" fill="rgba(0,212,255,0.4)"/>
  <circle cx="100" cy="326" r="2.5" fill="rgba(0,212,255,0.4)"/>
  <circle cx="240" cy="326" r="2.5" fill="rgba(0,212,255,0.4)"/>

  <!-- 3 CIRCULAR BUTTONS with icons -->
  <!-- Lock -->
  <circle cx="120" cy="385" r="22" fill="#080814"/>
  <circle cx="120" cy="385" r="22" fill="none" stroke="rgba(0,212,255,0.5)" stroke-width="1.5"/>
  <circle cx="120" cy="385" r="16" fill="none" stroke="rgba(0,212,255,0.2)" stroke-width="1"/>
  <path d="M113 386 L113 382 Q113 377 118 377 Q123 377 123 382 L123 386 Z" fill="none" stroke="#00d4ff" stroke-width="1.8" filter="url(#bug_cyan_glow)"/>
  <rect x="110" y="385" width="20" height="13" rx="3" fill="rgba(0,212,255,0.6)"/>
  <!-- Unlock -->
  <circle cx="170" cy="385" r="22" fill="#080814"/>
  <circle cx="170" cy="385" r="22" fill="none" stroke="rgba(0,212,255,0.5)" stroke-width="1.5"/>
  <path d="M163 386 L163 382 Q163 377 168 376 Q173 375 175 379" fill="none" stroke="#00d4ff" stroke-width="1.8" stroke-linecap="round" filter="url(#bug_cyan_glow)"/>
  <rect x="160" y="385" width="20" height="13" rx="3" fill="rgba(0,212,255,0.4)"/>
  <!-- Car icon button -->
  <circle cx="220" cy="385" r="22" fill="#080814"/>
  <circle cx="220" cy="385" r="22" fill="none" stroke="rgba(0,212,255,0.5)" stroke-width="1.5"/>
  <path d="M208 389 Q208 385 211 384 L215 380 Q218 377 222 377 Q226 377 229 380 L233 384 Q236 385 236 389 L236 393 Q236 395 234 395 L210 395 Q208 395 208 393 Z" fill="rgba(0,212,255,0.5)" filter="url(#bug_cyan_glow)"/>
  <circle cx="213" cy="395" r="3" fill="#00d4ff" opacity="0.8"/>
  <circle cx="229" cy="395" r="3" fill="#00d4ff" opacity="0.8"/>

  <!-- BB LOGO BOTTOM -->
  <ellipse cx="170" cy="456" rx="36" ry="22" fill="none" stroke="rgba(0,212,255,0.3)" stroke-width="1.5"/>
  <text x="170" y="463" text-anchor="middle" font-family="Georgia,serif" font-size="14" font-weight="bold" fill="rgba(0,212,255,0.5)" letter-spacing="2">BB</text>

  <!-- Floor shadow -->
  <ellipse cx="170" cy="510" rx="90" ry="6" fill="#00d4ff" opacity="0.12"/>
</svg>` },

    /* 2 ─ AUDI ─────────────────────── */
    { brand:'Audi', color:'#cc0000', html:`
<svg viewBox="0 0 300 500" xmlns="http://www.w3.org/2000/svg" style="width:auto;height:280px;display:block;margin:auto">
  <defs>
    <linearGradient id="audi_chrome" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#e8e8e8"/><stop offset="35%" stop-color="#f5f5f5"/><stop offset="65%" stop-color="#d0d0d0"/><stop offset="100%" stop-color="#b8b8b8"/>
    </linearGradient>
    <linearGradient id="audi_rubber" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#222"/><stop offset="100%" stop-color="#111"/>
    </linearGradient>
    <linearGradient id="audi_ring" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#d8d8d8"/><stop offset="100%" stop-color="#a0a0a0"/>
    </linearGradient>
    <filter id="audi_drop"><feDropShadow dx="0" dy="14" stdDeviation="18" flood-color="#cc0000" flood-opacity="0.18"/></filter>
    <clipPath id="audi_clip"><rect x="50" y="18" width="200" height="465" rx="20"/></clipPath>
  </defs>
  <!-- FOB outer chrome body -->
  <rect x="50" y="18" width="200" height="465" rx="20" fill="url(#audi_chrome)" filter="url(#audi_drop)"/>
  <!-- Brushed texture overlay -->
  <rect x="50" y="18" width="200" height="465" rx="20" fill="none" stroke="#ccc" stroke-width="1.5"/>
  <!-- Thin highlight at top -->
  <rect x="52" y="19" width="196" height="8" rx="8" fill="white" opacity="0.5"/>

  <!-- RUBBER BUTTON PANEL (upper half) -->
  <rect x="66" y="60" width="168" height="240" rx="14" fill="url(#audi_rubber)"/>
  <!-- Panel inset shadow -->
  <rect x="68" y="62" width="164" height="236" rx="12" fill="none" stroke="#333" stroke-width="1"/>
  <!-- Subtle grip texture lines -->
  <line x1="70" y1="120" x2="230" y2="120" stroke="#2a2a2a" stroke-width="0.8" opacity="0.5"/>
  <line x1="70" y1="150" x2="230" y2="150" stroke="#2a2a2a" stroke-width="0.8" opacity="0.5"/>
  <line x1="70" y1="180" x2="230" y2="180" stroke="#2a2a2a" stroke-width="0.8" opacity="0.5"/>
  <line x1="70" y1="210" x2="230" y2="210" stroke="#2a2a2a" stroke-width="0.8" opacity="0.5"/>
  <line x1="70" y1="240" x2="230" y2="240" stroke="#2a2a2a" stroke-width="0.8" opacity="0.5"/>
  <line x1="70" y1="270" x2="230" y2="270" stroke="#2a2a2a" stroke-width="0.8" opacity="0.5"/>

  <!-- RED LED top-right corner -->
  <rect x="216" y="70" width="12" height="7" rx="2" fill="#ff2200" opacity="0.95"/>
  <rect x="215" y="69" width="14" height="9" rx="3" fill="none" stroke="#ff4422" stroke-width="0.8" opacity="0.5"/>

  <!-- 4 RUBBER BUTTONS (2x2 grid) -->
  <!-- Lock (top-left) -->
  <rect x="84" y="100" width="56" height="54" rx="10" fill="#1a1a1a"/>
  <rect x="86" y="102" width="56" height="54" rx="10" fill="none" stroke="#333" stroke-width="1"/>
  <rect x="86" y="102" width="52" height="6" rx="4" fill="#2e2e2e" opacity="0.5"/>
  <path d="M107 128 L107 124 Q107 118 112 118 Q117 118 117 124 L117 128 Z" fill="none" stroke="#d0d0d0" stroke-width="2"/>
  <rect x="103" y="127" width="18" height="12" rx="3" fill="#c0c0c0" opacity="0.8"/>
  <!-- Unlock (top-right) -->
  <rect x="160" y="100" width="56" height="54" rx="10" fill="#1a1a1a"/>
  <rect x="162" y="102" width="56" height="54" rx="10" fill="none" stroke="#333" stroke-width="1"/>
  <rect x="162" y="102" width="52" height="6" rx="4" fill="#2e2e2e" opacity="0.5"/>
  <path d="M180 128 L180 124 Q180 118 185 117 Q190 116 192 120" fill="none" stroke="#d0d0d0" stroke-width="2" stroke-linecap="round"/>
  <rect x="177" y="127" width="18" height="12" rx="3" fill="#c0c0c0" opacity="0.8"/>
  <!-- Boot/trunk (bottom-left) -->
  <rect x="84" y="172" width="56" height="54" rx="10" fill="#1a1a1a"/>
  <rect x="86" y="174" width="56" height="54" rx="10" fill="none" stroke="#333" stroke-width="1"/>
  <rect x="86" y="174" width="52" height="6" rx="4" fill="#2e2e2e" opacity="0.5"/>
  <path d="M95 199 Q100 196 112 196 Q124 196 129 199 Q129 206 112 206 Q95 206 95 199 Z" fill="none" stroke="#c0c0c0" stroke-width="1.5"/>
  <line x1="100" y1="202" x2="124" y2="202" stroke="#aaa" stroke-width="1.2" opacity="0.6"/>
  <!-- Window (bottom-right) -->
  <rect x="160" y="172" width="56" height="54" rx="10" fill="#1a1a1a"/>
  <rect x="162" y="174" width="56" height="54" rx="10" fill="none" stroke="#333" stroke-width="1"/>
  <rect x="162" y="174" width="52" height="6" rx="4" fill="#2e2e2e" opacity="0.5"/>
  <path d="M173 193 L178 190 Q188 188 198 190 L203 193 L203 200 Q188 206 173 200 Z" fill="none" stroke="#c0c0c0" stroke-width="1.5"/>
  <line x1="173" y1="204" x2="203" y2="204" stroke="#888" stroke-width="1.2" opacity="0.5" stroke-dasharray="3 2"/>

  <!-- CHROME LOWER SECTION -->
  <rect x="66" y="318" width="168" height="140" rx="10" fill="url(#audi_chrome)" opacity="0.6"/>
  <rect x="68" y="320" width="164" height="136" rx="9" fill="none" stroke="#ddd" stroke-width="1"/>

  <!-- AUDI FOUR RINGS (lower chrome section) -->
  <!-- Dark bg behind rings -->
  <circle cx="122" cy="375" r="28" fill="#ccc" opacity="0.3"/>
  <circle cx="148" cy="375" r="28" fill="#ccc" opacity="0.3"/>
  <circle cx="152" cy="375" r="28" fill="#ccc" opacity="0.3"/>
  <circle cx="178" cy="375" r="28" fill="#ccc" opacity="0.3"/>
  <!-- Ring outlines -->
  <circle cx="122" cy="375" r="26" fill="none" stroke="url(#audi_ring)" stroke-width="3.5"/>
  <circle cx="148" cy="375" r="26" fill="none" stroke="url(#audi_ring)" stroke-width="3.5"/>
  <circle cx="152" cy="375" r="26" fill="none" stroke="url(#audi_ring)" stroke-width="3.5"/>
  <circle cx="178" cy="375" r="26" fill="none" stroke="url(#audi_ring)" stroke-width="3.5"/>
  <!-- AUDI text -->
  <text x="150" y="428" text-anchor="middle" font-family="Arial,sans-serif" font-size="11" font-weight="300" letter-spacing="6" fill="#666" opacity="0.75">AUDI</text>

  <!-- Red dot LED accent -->
  <circle cx="150" cy="446" r="4" fill="#cc0000" opacity="0.9"/>
  <circle cx="150" cy="446" r="7" fill="#cc0000" opacity="0.12"/>

  <!-- Floor shadow -->
  <ellipse cx="150" cy="495" rx="80" ry="5" fill="#cc0000" opacity="0.1"/>
</svg>` },

    /* 3 ─ LAMBORGHINI ───────────────── */
    { brand:'Lamborghini', color:'#f5c518', html:`
<svg viewBox="0 0 400 440" xmlns="http://www.w3.org/2000/svg" style="width:auto;height:260px;display:block;margin:auto">
  <defs>
    <pattern id="lambo_cf" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <rect width="4" height="8" fill="#181818"/><rect x="4" width="4" height="8" fill="#111111"/>
    </pattern>
    <linearGradient id="lambo_gold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f5c518"/><stop offset="45%" stop-color="#ffe060"/><stop offset="100%" stop-color="#b8880c"/>
    </linearGradient>
    <linearGradient id="lambo_goldV" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffe060"/><stop offset="100%" stop-color="#7a5600"/>
    </linearGradient>
    <filter id="lambo_drop"><feDropShadow dx="0" dy="14" stdDeviation="18" flood-color="#f5c518" flood-opacity="0.25"/></filter>
    <filter id="lambo_glow"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>

  <!-- ANGULAR HEXAGONAL BODY -->
  <polygon points="80,50 320,26 360,200 316,348 84,348 40,200"
           fill="url(#lambo_cf)" filter="url(#lambo_drop)"/>
  <polygon points="80,50 320,26 360,200 316,348 84,348 40,200"
           fill="none" stroke="#222" stroke-width="1.5"/>

  <!-- GOLD SHARP EDGE LINES -->
  <line x1="82" y1="52"  x2="318" y2="28"  stroke="url(#lambo_gold)" stroke-width="3"/>
  <line x1="319" y1="28" x2="358" y2="198" stroke="url(#lambo_gold)" stroke-width="3"/>
  <line x1="358" y1="199" x2="315" y2="346" stroke="url(#lambo_gold)" stroke-width="3"/>
  <line x1="314" y1="346" x2="86"  y2="346" stroke="url(#lambo_gold)" stroke-width="3"/>
  <line x1="85"  y1="346" x2="41"  y2="199" stroke="url(#lambo_gold)" stroke-width="3"/>
  <line x1="41"  y1="198" x2="80"  y2="51"  stroke="url(#lambo_gold)" stroke-width="3"/>
  <!-- Corner accent dots -->
  <circle cx="80"  cy="50"  r="5" fill="url(#lambo_gold)"/>
  <circle cx="320" cy="26"  r="5" fill="url(#lambo_gold)"/>
  <circle cx="360" cy="200" r="5" fill="url(#lambo_gold)"/>
  <circle cx="316" cy="348" r="5" fill="url(#lambo_gold)"/>
  <circle cx="84"  cy="348" r="5" fill="url(#lambo_gold)"/>
  <circle cx="40"  cy="200" r="5" fill="url(#lambo_gold)"/>

  <!-- RAGING BULL LOGO (geometric) -->
  <g transform="translate(134,72) scale(0.68)" filter="url(#lambo_glow)">
    <ellipse cx="96" cy="112" rx="70" ry="46" fill="url(#lambo_gold)"/>
    <ellipse cx="156" cy="88" rx="26" ry="32" fill="url(#lambo_gold)"/>
    <ellipse cx="172" cy="68" rx="28" ry="26" fill="url(#lambo_gold)"/>
    <path d="M156 44 Q142 20 128 28 Q135 44 150 50 Z" fill="url(#lambo_gold)"/>
    <path d="M190 44 Q204 20 218 28 Q211 44 196 50 Z" fill="url(#lambo_gold)"/>
    <rect x="48"  y="148" width="24" height="54" rx="8" fill="url(#lambo_goldV)"/>
    <rect x="80"  y="148" width="24" height="54" rx="8" fill="url(#lambo_goldV)"/>
    <rect x="118" y="148" width="24" height="54" rx="8" fill="url(#lambo_goldV)"/>
    <rect x="148" y="148" width="24" height="54" rx="8" fill="url(#lambo_goldV)"/>
    <path d="M30 88 Q10 64 16 50 Q28 58 34 78" fill="url(#lambo_gold)"/>
    <circle cx="195" cy="78" r="7" fill="none" stroke="url(#lambo_gold)" stroke-width="3"/>
  </g>

  <!-- 3 FLUSH ANGULAR BUTTONS -->
  <!-- Hexagonal button shapes -->
  <polygon points="120,278 142,270 164,278 164,298 142,306 120,298" fill="#0e0e0e" stroke="url(#lambo_gold)" stroke-width="1.5"/>
  <line x1="130" y1="288" x2="154" y2="288" stroke="url(#lambo_gold)" stroke-width="1.5" opacity="0.6"/>

  <polygon points="178,278 200,270 222,278 222,298 200,306 178,298" fill="#0e0e0e" stroke="url(#lambo_gold)" stroke-width="1.5"/>
  <path d="M188 290 L188 286 Q188 282 193 282 Q198 282 198 286 L198 290 Z" fill="none" stroke="url(#lambo_gold)" stroke-width="1.5" opacity="0.6"/>
  <rect x="184" y="289" width="16" height="9" rx="2" fill="url(#lambo_gold)" opacity="0.5"/>

  <polygon points="236,278 258,270 280,278 280,298 258,306 236,298" fill="#0e0e0e" stroke="url(#lambo_gold)" stroke-width="1.5"/>
  <path d="M246 293 Q252 286 268 286 L268 296 Q260 300 246 296 Z" fill="none" stroke="url(#lambo_gold)" stroke-width="1.2" opacity="0.6"/>

  <!-- LAMBORGHINI text -->
  <text x="200" y="334" text-anchor="middle" font-family="'Arial Narrow',Arial,sans-serif"
        font-size="10" font-weight="900" letter-spacing="3" fill="url(#lambo_gold)" opacity="0.85">LAMBORGHINI</text>

  <!-- Orange corner micro-glows -->
  <circle cx="80"  cy="50"  r="24" fill="#ff6600" opacity="0.07"/>
  <circle cx="320" cy="26"  r="24" fill="#ff6600" opacity="0.07"/>

  <!-- Floor shadow -->
  <ellipse cx="200" cy="428" rx="130" ry="7" fill="#f5c518" opacity="0.13"/>
</svg>` },

    /* 4 ─ ROLLS-ROYCE ───────────────── */
    { brand:'Rolls-Royce', color:'#d4af37', html:`
<svg viewBox="0 0 280 520" xmlns="http://www.w3.org/2000/svg" style="width:auto;height:290px;display:block;margin:auto">
  <defs>
    <linearGradient id="rr_body" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0c0c1a"/><stop offset="100%" stop-color="#060610"/>
    </linearGradient>
    <linearGradient id="rr_gold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#d4af37"/><stop offset="42%" stop-color="#f0d060"/><stop offset="100%" stop-color="#8b6a18"/>
    </linearGradient>
    <linearGradient id="rr_goldV" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#f0d060"/><stop offset="100%" stop-color="#6b4e10"/>
    </linearGradient>
    <filter id="rr_drop"><feDropShadow dx="0" dy="16" stdDeviation="20" flood-color="#d4af37" flood-opacity="0.28"/></filter>
    <filter id="rr_glow"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>

  <!-- TALL PILL FOB -->
  <rect x="54" y="16" width="172" height="490" rx="50" fill="url(#rr_body)" filter="url(#rr_drop)"/>
  <!-- Gold outer border -->
  <rect x="54" y="16" width="172" height="490" rx="50" fill="none" stroke="url(#rr_gold)" stroke-width="2.5"/>
  <!-- Inner engraving border -->
  <rect x="62" y="24" width="156" height="474" rx="44" fill="none" stroke="#1e1a08" stroke-width="1"/>
  <!-- Subtle body highlight -->
  <path d="M66 38 Q110 26 180 32 L180 60 Q120 52 68 64 Z" fill="white" opacity="0.03"/>

  <!-- Gold engraving horizontal lines top -->
  <line x1="78" y1="52"  x2="202" y2="52"  stroke="url(#rr_gold)" stroke-width="0.8" opacity="0.5"/>
  <line x1="78" y1="56"  x2="202" y2="56"  stroke="url(#rr_gold)" stroke-width="0.4" opacity="0.25"/>
  <!-- Gold engraving horizontal lines bottom -->
  <line x1="78" y1="455" x2="202" y2="455" stroke="url(#rr_gold)" stroke-width="0.8" opacity="0.5"/>
  <line x1="78" y1="459" x2="202" y2="459" stroke="url(#rr_gold)" stroke-width="0.4" opacity="0.25"/>
  <!-- Side engraving verticals -->
  <line x1="68"  y1="80"  x2="68"  y2="440" stroke="url(#rr_gold)" stroke-width="0.5" opacity="0.15"/>
  <line x1="212" y1="80"  x2="212" y2="440" stroke="url(#rr_gold)" stroke-width="0.5" opacity="0.15"/>

  <!-- SPIRIT OF ECSTASY (top) -->
  <g transform="translate(100,62) scale(0.72)" filter="url(#rr_glow)">
    <circle cx="55" cy="16"  r="13" fill="url(#rr_gold)"/>
    <rect   x="50" y="28"  width="10" height="16" rx="4" fill="url(#rr_gold)"/>
    <path d="M42 44 Q48 38 55 38 Q62 38 68 44 L70 88 L40 88 Z" fill="url(#rr_gold)"/>
    <!-- Left wing -->
    <path d="M42 44 Q22 56 6 80 Q18 86 34 78 L42 58 Z" fill="url(#rr_goldV)"/>
    <!-- Right wing -->
    <path d="M68 44 Q88 56 104 80 Q92 86 76 78 L68 58 Z" fill="url(#rr_goldV)"/>
    <!-- Flowing skirt -->
    <path d="M40 88 Q36 108 42 124 L55 116 L68 124 Q74 108 70 88 Z" fill="url(#rr_goldV)"/>
    <path d="M38 120 Q48 132 55 130 Q62 132 72 120" fill="none" stroke="url(#rr_gold)" stroke-width="1.5" opacity="0.65"/>
  </g>

  <!-- RR MONOGRAM -->
  <text x="140" y="210" text-anchor="middle" font-family="Georgia,'Times New Roman',serif"
        font-size="30" font-weight="bold" letter-spacing="6" fill="url(#rr_gold)" filter="url(#rr_glow)">RR</text>
  <!-- Ornamental divider -->
  <line x1="100" y1="220" x2="180" y2="220" stroke="url(#rr_gold)" stroke-width="1" opacity="0.6"/>
  <!-- Diamond ornament -->
  <polygon points="140,212 144,216 140,220 136,216" fill="url(#rr_gold)" opacity="0.4"/>
  <!-- ROLLS-ROYCE text -->
  <text x="140" y="240" text-anchor="middle" font-family="Georgia,serif"
        font-size="9" font-weight="400" letter-spacing="3.5" fill="url(#rr_gold)" opacity="0.65">ROLLS-ROYCE</text>

  <!-- 2 MINIMAL BUTTONS -->
  <rect x="96"  y="296" width="44" height="20" rx="6" fill="#0c0c1a"/>
  <rect x="98"  y="298" width="44" height="20" rx="6" fill="none" stroke="#1e1a08" stroke-width="1"/>
  <circle cx="118" cy="308" r="5" fill="none" stroke="url(#rr_gold)" stroke-width="1.5" opacity="0.55"/>

  <rect x="160" y="296" width="44" height="20" rx="6" fill="#0c0c1a"/>
  <rect x="162" y="298" width="44" height="20" rx="6" fill="none" stroke="#1e1a08" stroke-width="1"/>
  <circle cx="182" cy="308" r="5" fill="none" stroke="url(#rr_gold)" stroke-width="1.5" opacity="0.55"/>

  <!-- Engraving flourish lines -->
  <path d="M90 330 Q140 326 190 330" fill="none" stroke="url(#rr_gold)" stroke-width="0.8" opacity="0.3"/>
  <path d="M90 334 Q140 330 190 334" fill="none" stroke="url(#rr_gold)" stroke-width="0.4" opacity="0.15"/>

  <!-- Blade slot phantom -->
  <rect x="116" y="350" width="48" height="60" rx="6" fill="none" stroke="url(#rr_gold)" stroke-width="1.2" stroke-dasharray="3 2.5" opacity="0.32"/>
  <line x1="128" y1="356" x2="128" y2="404" stroke="url(#rr_gold)" stroke-width="1" opacity="0.18"/>
  <line x1="142" y1="350" x2="142" y2="410" stroke="url(#rr_gold)" stroke-width="1" opacity="0.18"/>
  <line x1="158" y1="350" x2="158" y2="410" stroke="url(#rr_gold)" stroke-width="1" opacity="0.18"/>

  <!-- Floor shadow -->
  <ellipse cx="140" cy="512" rx="88" ry="6" fill="#d4af37" opacity="0.16"/>
</svg>` }

  ]; /* end KEYS */

  /* ── Insert Shoe at index 1, Bag at index 3 ── */
  const SHOE = {
    brand: 'ALDO',
    color: '#ec4899',
    html: `<div style="width:100%;max-width:520px;height:290px;margin:auto;position:relative;display:flex;align-items:center;justify-content:center;">
  <!-- Pink radial glow bg -->
  <div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 60%, rgba(236,72,153,0.14) 0%, transparent 68%);border-radius:20px;pointer-events:none;"></div>
  <!-- Main hero shoe photo - teal luxury heel flat-lay -->
  <div style="
    width:290px;height:260px;
    background-image:url('assets/images/heels-luxury.png');
    background-size:cover;background-position:center top;
    border-radius:18px;
    box-shadow:0 16px 48px rgba(236,72,153,0.3),0 4px 16px rgba(0,0,0,0.18);
    border:2.5px solid rgba(255,255,255,0.85);
    position:relative;z-index:2;
  "></div>
  <!-- Back photo - ALDO shoes display, offset right -->
  <div style="
    position:absolute;right:20px;top:24px;
    width:175px;height:200px;
    background-image:url('assets/images/shoes-product.png');
    background-size:cover;background-position:center;
    border-radius:14px;
    box-shadow:0 8px 28px rgba(0,0,0,0.22);
    border:2.5px solid rgba(255,255,255,0.75);
    transform:rotate(7deg);
    z-index:1;
  "></div>
  <!-- Floor glow -->
  <div style="position:absolute;bottom:0;left:50%;transform:translateX(-50%);width:340px;height:18px;background:radial-gradient(ellipse,rgba(236,72,153,0.22),transparent 70%);border-radius:50%;"></div>
</div>`
  };


  const BAG = {
    brand: 'Gucci',
    color: '#a16207',
    html: `<svg viewBox="0 0 500 280" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;display:block">
  <defs>
    <linearGradient id="b_body" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1c1917"/><stop offset="60%" stop-color="#292524"/><stop offset="100%" stop-color="#1c1917"/>
    </linearGradient>
    <linearGradient id="b_face" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#3d3530"/><stop offset="100%" stop-color="#1c1917"/>
    </linearGradient>
    <linearGradient id="b_green" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#064e3b"/><stop offset="100%" stop-color="#065f46"/>
    </linearGradient>
    <linearGradient id="b_gold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ca8a04"/><stop offset="40%" stop-color="#eab308"/><stop offset="100%" stop-color="#a16207"/>
    </linearGradient>
    <linearGradient id="b_chain_l" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#fef08a"/><stop offset="50%" stop-color="#ca8a04"/><stop offset="100%" stop-color="#fef08a"/>
    </linearGradient>
    <pattern id="b_quilt" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <path d="M0 10 Q5 5 10 0 Q15 5 20 10 Q15 15 10 20 Q5 15 0 10 Z" fill="none" stroke="#292524" stroke-width="1"/>
    </pattern>
    <filter id="b_drop"><feDropShadow dx="0" dy="16" stdDeviation="20" flood-color="#000" flood-opacity="0.5"/></filter>
    <filter id="b_glow"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>

  <!-- ─── CHAIN STRAP (across top) ─── -->
  <!-- Chain left segment -->
  <path d="M72 85 Q68 65 80 55 Q95 48 112 58 Q125 65 128 85" fill="none" stroke="url(#b_chain_l)" stroke-width="6" stroke-linecap="round"/>
  <!-- Chain links detail left -->
  <ellipse cx="90" cy="56" rx="9" ry="5" fill="none" stroke="url(#b_gold)" stroke-width="2.5" transform="rotate(-30,90,56)"/>
  <ellipse cx="106" cy="52" rx="9" ry="5" fill="none" stroke="url(#b_gold)" stroke-width="2.5" transform="rotate(-15,106,52)"/>

  <!-- Chain right segment -->
  <path d="M372 85 Q375 65 390 55 Q405 47 420 58 Q432 67 428 85" fill="none" stroke="url(#b_chain_l)" stroke-width="6" stroke-linecap="round"/>
  <ellipse cx="392" cy="54" rx="9" ry="5" fill="none" stroke="url(#b_gold)" stroke-width="2.5" transform="rotate(15,392,54)"/>
  <ellipse cx="410" cy="52" rx="9" ry="5" fill="none" stroke="url(#b_gold)" stroke-width="2.5" transform="rotate(30,410,52)"/>

  <!-- Chain ring connectors -->
  <circle cx="72" cy="88" r="10" fill="url(#b_gold)"/>
  <circle cx="72" cy="88" r="6" fill="#92400e"/>
  <circle cx="128" cy="88" r="10" fill="url(#b_gold)"/>
  <circle cx="128" cy="88" r="6" fill="#92400e"/>
  <circle cx="372" cy="88" r="10" fill="url(#b_gold)"/>
  <circle cx="372" cy="88" r="6" fill="#92400e"/>
  <circle cx="428" cy="88" r="10" fill="url(#b_gold)"/>
  <circle cx="428" cy="88" r="6" fill="#92400e"/>

  <!-- ─── BAG BODY (dark structured) ─── -->
  <rect x="62" y="84" width="376" height="176" rx="12" fill="url(#b_body)" filter="url(#b_drop)"/>
  <!-- Quilted texture overlay -->
  <rect x="62" y="84" width="376" height="176" rx="12" fill="url(#b_quilt)" opacity="0.4"/>
  <!-- Face panel slight lighter -->
  <rect x="72" y="92" width="356" height="158" rx="9" fill="url(#b_face)" opacity="0.7"/>

  <!-- ─── OUTER STITCHING ─── -->
  <rect x="78" y="98" width="344" height="146" rx="7" fill="none"
        stroke="url(#b_gold)" stroke-width="1.2" stroke-dasharray="5 4" opacity="0.45"/>

  <!-- ─── GOLD HARDWARE CLASP ─── -->
  <!-- Clasp plate -->
  <rect x="200" y="80" width="100" height="32" rx="7" fill="url(#b_gold)"/>
  <rect x="202" y="82" width="96" height="28" rx="6" fill="none" stroke="#92400e" stroke-width="1.2"/>
  <!-- Lock body -->
  <rect x="218" y="85" width="64" height="22" rx="5" fill="#ca8a04"/>
  <!-- Lock detail -->
  <rect x="228" y="89" width="44" height="13" rx="3" fill="url(#b_gold)"/>
  <circle cx="250" cy="95" r="5" fill="#7c3e04" opacity="0.7"/>
  <circle cx="250" cy="95" r="2.5" fill="#ca8a04"/>
  <!-- Clasp hinge -->
  <path d="M230 102 Q250 108 270 102" fill="none" stroke="url(#b_gold)" stroke-width="2" opacity="0.7"/>

  <!-- ─── GUCCI-STYLE LOGO PLATE ─── -->
  <!-- Center logo plate dark green -->
  <rect x="182" y="136" width="136" height="52" rx="8" fill="url(#b_green)"/>
  <rect x="184" y="138" width="132" height="48" rx="7" fill="none" stroke="url(#b_gold)" stroke-width="1.2"/>
  <!-- Interlocked GG-style text -->
  <text x="250" y="168" text-anchor="middle" font-family="Georgia,'Times New Roman',serif"
        font-size="20" font-weight="bold" fill="url(#b_gold)" letter-spacing="4" filter="url(#b_glow)">GUCCI</text>
  <line x1="194" y1="157" x2="306" y2="157" stroke="url(#b_gold)" stroke-width="0.8" opacity="0.4"/>
  <line x1="194" y1="175" x2="306" y2="175" stroke="url(#b_gold)" stroke-width="0.8" opacity="0.4"/>

  <!-- ─── VERTICAL CENTER SEAM ─── -->
  <line x1="250" y1="94" x2="250" y2="130" stroke="url(#b_gold)" stroke-width="1" stroke-dasharray="3 2.5" opacity="0.3"/>
  <line x1="250" y1="198" x2="250" y2="252" stroke="url(#b_gold)" stroke-width="1" stroke-dasharray="3 2.5" opacity="0.3"/>

  <!-- ─── CORNER STUDS ─── -->
  <circle cx="82"  cy="94"  r="5" fill="url(#b_gold)"/>
  <circle cx="418" cy="94"  r="5" fill="url(#b_gold)"/>
  <circle cx="82"  cy="250" r="5" fill="url(#b_gold)"/>
  <circle cx="418" cy="250" r="5" fill="url(#b_gold)"/>

  <!-- Bottom feet hardware -->
  <circle cx="130" cy="255" r="6" fill="url(#b_gold)"/><circle cx="130" cy="255" r="3" fill="#92400e"/>
  <circle cx="250" cy="258" r="6" fill="url(#b_gold)"/><circle cx="250" cy="258" r="3" fill="#92400e"/>
  <circle cx="370" cy="255" r="6" fill="url(#b_gold)"/><circle cx="370" cy="255" r="3" fill="#92400e"/>

  <!-- Floor shadow -->
  <ellipse cx="250" cy="270" rx="195" ry="9" fill="#ca8a04" opacity="0.18"/>
</svg>`
  };

  /* Also add a WATCH morph item */
  const WATCH = {
    brand: 'Rolex',
    color: '#14b8a6',
    html: `<svg viewBox="0 0 500 280" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;display:block">
  <defs>
    <linearGradient id="w_case" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#e2e8f0"/><stop offset="40%" stop-color="#f8fafc"/><stop offset="100%" stop-color="#94a3b8"/>
    </linearGradient>
    <linearGradient id="w_dial" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f172a"/><stop offset="100%" stop-color="#1e293b"/>
    </linearGradient>
    <linearGradient id="w_strap" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#134e4a"/><stop offset="50%" stop-color="#0f766e"/><stop offset="100%" stop-color="#134e4a"/>
    </linearGradient>
    <linearGradient id="w_teal" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#14b8a6"/><stop offset="100%" stop-color="#0d9488"/>
    </linearGradient>
    <linearGradient id="w_gold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fbbf24"/><stop offset="100%" stop-color="#d97706"/>
    </linearGradient>
    <filter id="w_drop"><feDropShadow dx="0" dy="10" stdDeviation="16" flood-color="#14b8a6" flood-opacity="0.35"/></filter>
  </defs>

  <!-- ─── TOP STRAP ─── -->
  <rect x="210" y="14" width="80" height="88" rx="10" fill="url(#w_strap)"/>
  <rect x="212" y="16" width="76" height="84" rx="9" fill="none" stroke="#0f766e" stroke-width="1"/>
  <!-- Strap holes -->
  <circle cx="250" cy="38" r="3" fill="#0a4744"/>
  <circle cx="250" cy="54" r="3" fill="#0a4744"/>
  <circle cx="250" cy="70" r="3" fill="#0a4744"/>
  <circle cx="250" cy="86" r="3" fill="#0a4744"/>
  <!-- Strap stitching -->
  <line x1="220" y1="20" x2="220" y2="96" stroke="#2dd4bf" stroke-width="1" stroke-dasharray="4 3" opacity="0.4"/>
  <line x1="280" y1="20" x2="280" y2="96" stroke="#2dd4bf" stroke-width="1" stroke-dasharray="4 3" opacity="0.4"/>

  <!-- ─── BOTTOM STRAP ─── -->
  <rect x="210" y="178" width="80" height="88" rx="10" fill="url(#w_strap)"/>
  <rect x="212" y="180" width="76" height="84" rx="9" fill="none" stroke="#0f766e" stroke-width="1"/>
  <circle cx="250" cy="196" r="3" fill="#0a4744"/>
  <circle cx="250" cy="212" r="3" fill="#0a4744"/>
  <circle cx="250" cy="228" r="3" fill="#0a4744"/>
  <circle cx="250" cy="244" r="3" fill="#0a4744"/>
  <line x1="220" y1="182" x2="220" y2="262" stroke="#2dd4bf" stroke-width="1" stroke-dasharray="4 3" opacity="0.4"/>
  <line x1="280" y1="182" x2="280" y2="262" stroke="#2dd4bf" stroke-width="1" stroke-dasharray="4 3" opacity="0.4"/>
  <!-- Buckle -->
  <rect x="228" y="248" width="44" height="16" rx="5" fill="url(#w_gold)"/>
  <rect x="246" y="244" width="8" height="24" rx="3" fill="url(#w_gold)"/>
  <rect x="230" y="250" width="40" height="12" rx="4" fill="none" stroke="#92400e" stroke-width="1"/>

  <!-- ─── CASE BODY ─── -->
  <circle cx="250" cy="140" r="90" fill="url(#w_case)" filter="url(#w_drop)"/>
  <!-- Case side lug lines -->
  <line x1="164" y1="128" x2="156" y2="128" stroke="#cbd5e1" stroke-width="3" stroke-linecap="round"/>
  <line x1="164" y1="152" x2="156" y2="152" stroke="#cbd5e1" stroke-width="3" stroke-linecap="round"/>
  <line x1="336" y1="128" x2="344" y2="128" stroke="#cbd5e1" stroke-width="3" stroke-linecap="round"/>
  <line x1="336" y1="152" x2="344" y2="152" stroke="#cbd5e1" stroke-width="3" stroke-linecap="round"/>
  <!-- Crown -->
  <rect x="338" y="134" width="18" height="12" rx="4" fill="url(#w_case)"/>
  <rect x="340" y="136" width="14" height="8" rx="3" fill="none" stroke="#94a3b8" stroke-width="1"/>

  <!-- Case shine ring -->
  <circle cx="250" cy="140" r="88" fill="none" stroke="rgba(255,255,255,0.6)" stroke-width="3"/>
  <circle cx="250" cy="140" r="86" fill="none" stroke="rgba(0,0,0,0.1)" stroke-width="1"/>

  <!-- ─── DIAL ─── -->
  <circle cx="250" cy="140" r="76" fill="url(#w_dial)"/>
  <!-- Dial bezel ring teal -->
  <circle cx="250" cy="140" r="76" fill="none" stroke="url(#w_teal)" stroke-width="4"/>
  <!-- Minute track -->
  <circle cx="250" cy="140" r="70" fill="none" stroke="rgba(20,184,166,0.25)" stroke-width="1" stroke-dasharray="2 8"/>

  <!-- ─── HOUR MARKERS ─── -->
  <!-- 12 -->
  <rect x="246" y="72" width="8" height="16" rx="2" fill="#14b8a6"/>
  <!-- 3 -->
  <rect x="312" y="136" width="16" height="8" rx="2" fill="url(#w_gold)"/>
  <!-- 6 -->
  <rect x="246" y="192" width="8" height="16" rx="2" fill="#14b8a6"/>
  <!-- 9 -->
  <rect x="172" y="136" width="16" height="8" rx="2" fill="url(#w_gold)"/>
  <!-- Minor markers at other positions -->
  <rect x="287" y="77"  width="5" height="10" rx="1.5" fill="#334155" transform="rotate(30,289,82)"/>
  <rect x="315" y="96"  width="5" height="10" rx="1.5" fill="#334155" transform="rotate(60,318,101)"/>
  <rect x="316" y="166" width="5" height="10" rx="1.5" fill="#334155" transform="rotate(120,319,171)"/>
  <rect x="290" y="194" width="5" height="10" rx="1.5" fill="#334155" transform="rotate(150,293,199)"/>
  <rect x="211" y="194" width="5" height="10" rx="1.5" fill="#334155" transform="rotate(210,214,199)"/>
  <rect x="181" y="168" width="5" height="10" rx="1.5" fill="#334155" transform="rotate(240,184,173)"/>
  <rect x="181" y="96"  width="5" height="10" rx="1.5" fill="#334155" transform="rotate(300,184,101)"/>
  <rect x="209" y="77"  width="5" height="10" rx="1.5" fill="#334155" transform="rotate(330,212,82)"/>

  <!-- ─── SUB-DIAL (date window) ─── -->
  <rect x="280" y="136" width="24" height="16" rx="3" fill="#1e293b"/>
  <rect x="282" y="138" width="20" height="12" rx="2" fill="#0f172a"/>
  <text x="292" y="148" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#14b8a6" font-weight="bold">14</text>

  <!-- ─── ROLEX-STYLE BRAND ─── -->
  <text x="250" y="118" text-anchor="middle" font-family="Georgia,serif"
        font-size="11" font-weight="bold" fill="url(#w_gold)" letter-spacing="2" opacity="0.9">ROLEX</text>
  <text x="250" y="132" text-anchor="middle" font-family="Georgia,serif"
        font-size="7.5" font-weight="400" fill="rgba(255,255,255,0.45)" letter-spacing="1.5">OYSTER PERPETUAL</text>

  <!-- ─── HANDS ─── -->
  <!-- Hour hand (pointing ~10 o'clock) -->
  <line x1="250" y1="140" x2="218" y2="104" stroke="#f8fafc" stroke-width="5" stroke-linecap="round"/>
  <line x1="250" y1="140" x2="218" y2="104" stroke="url(#w_teal)" stroke-width="2" stroke-linecap="round"/>
  <!-- Minute hand (pointing ~2 o'clock) -->
  <line x1="250" y1="140" x2="290" y2="88" stroke="#f8fafc" stroke-width="4" stroke-linecap="round"/>
  <line x1="250" y1="140" x2="290" y2="88" stroke="url(#w_teal)" stroke-width="1.5" stroke-linecap="round"/>
  <!-- Seconds hand (red accent) -->
  <line x1="250" y1="140" x2="266" y2="100" stroke="#f43f5e" stroke-width="1.5" stroke-linecap="round" opacity="0.9"/>
  <line x1="250" y1="140" x2="240" y2="165" stroke="#f43f5e" stroke-width="1.5" stroke-linecap="round" opacity="0.9"/>
  <!-- Centre cap -->
  <circle cx="250" cy="140" r="6" fill="url(#w_gold)"/>
  <circle cx="250" cy="140" r="3" fill="#f8fafc"/>

  <!-- Floor shadow -->
  <ellipse cx="250" cy="270" rx="95" ry="7" fill="#14b8a6" opacity="0.2"/>
</svg>`
  };

  /* Requested cycle order: Bugatti → Shoe → Gucci Bag → Lamborghini → Rolex Watch → Audi → repeat
     KEYS base array = [Bugatti(0), Audi(1), Lamborghini(2), Rolls-Royce(3)]
     Build final array manually in correct order:                              */
  const ORDERED = [
    KEYS[0],   /* Bugatti */
    SHOE,      /* ALDO Shoe */
    BAG,       /* Gucci Bag */
    KEYS[2],   /* Lamborghini */
    WATCH,     /* Rolex Watch */
    KEYS[1],   /* Audi */
  ];
  KEYS.length = 0;
  ORDERED.forEach(k => KEYS.push(k));
  /* Final cycle: Car→Bugatti→Car→Shoe→Car→GucciBag→Car→Lamborghini→Car→Watch→Car→Audi→repeat */

  /* ══════════════════════════
     ANIMATION ENGINE
  ══════════════════════════ */
  let keyIndex = 0;
  let busy     = false;
  const FLIP_MS = 480;
  const HOLD_MS = 2800;

  function setStyle(el, transform, opacity, dur, easing) {
    el.style.transition = dur ? `transform ${dur}ms ${easing}, opacity ${dur * 0.8}ms ${easing}` : 'none';
    el.style.transform  = transform;
    el.style.opacity    = String(opacity);
  }

  function setGlow(color) {
    if (!glowEl) return;
    glowEl.style.transition = 'background 0.6s ease, filter 0.6s ease';
    glowEl.style.background = `radial-gradient(ellipse at center, ${color}25 0%, transparent 65%)`;
    glowEl.style.filter     = `drop-shadow(0 0 42px ${color}38)`;
  }

  function setLabel(text, color) {
    if (!labelEl) return;
    labelEl.style.transition = 'none';
    labelEl.style.opacity    = '0';
    labelEl.style.transform  = 'translateY(8px)';
    labelEl.style.color      = color;
    labelEl.textContent      = text;
    requestAnimationFrame(() => requestAnimationFrame(() => {
      labelEl.style.transition = 'opacity 0.45s ease, transform 0.45s ease';
      labelEl.style.opacity    = '1';
      labelEl.style.transform  = 'translateY(0)';
    }));
  }

  /* Flip OUT then call cb at midpoint */
  function flipOut(cb) {
    setStyle(stage, 'perspective(900px) rotateY(90deg) scale(0.62)', 0, FLIP_MS, 'ease-in');
    setTimeout(cb, FLIP_MS + 10);
  }

  /* Flip IN from -90 to 0 */
  function flipIn() {
    setStyle(stage, 'perspective(900px) rotateY(-90deg) scale(0.62)', 0, 0, 'ease-out');
    requestAnimationFrame(() => requestAnimationFrame(() => {
      setStyle(stage, 'perspective(900px) rotateY(0deg) scale(1)', 1, FLIP_MS, 'ease-out');
      setTimeout(() => { busy = false; }, FLIP_MS + 10);
    }));
  }

  /* Show car */
  function showCar(animate) {
    if (animate) {
      flipOut(() => {
        stage.innerHTML = CAR_HTML;
        setGlow(CAR_COLOR);
        setLabel('', CAR_COLOR);
        flipIn();
      });
    } else {
      stage.innerHTML = CAR_HTML;
      setStyle(stage, 'perspective(900px) rotateY(0deg) scale(1)', 1, 0, '');
      setGlow(CAR_COLOR);
    }
  }

  /* Show key[i] */
  function showKey(i, animate) {
    const k = KEYS[i];
    if (animate) {
      flipOut(() => {
        stage.innerHTML = k.html;
        setGlow(k.color);
        setLabel(k.brand, k.color);
        flipIn();
      });
    } else {
      stage.innerHTML = k.html;
      setStyle(stage, 'perspective(900px) rotateY(0deg) scale(1)', 1, 0, '');
      setGlow(k.color);
      setLabel(k.brand, k.color);
    }
  }

  /* Run one full cycle: car → key[i] → car → next */
  function runCycle() {
    if (busy) return;
    busy = true;
    /* Car → Key */
    showKey(keyIndex, true);
    /* After key hold → Key → Car */
    setTimeout(() => {
      showCar(true);
      /* After car hold → advance key index and repeat */
      setTimeout(() => {
        keyIndex = (keyIndex + 1) % KEYS.length;
        busy = false;
        runCycle();
      }, HOLD_MS);
    }, HOLD_MS + FLIP_MS * 2 + 40);
  }

  /* ── INIT ── */
  stage.style.transformStyle = 'preserve-3d';
  stage.style.willChange     = 'transform, opacity';
  setStyle(stage, 'perspective(900px) rotateY(0deg) scale(1)', 1, 0, '');
  setGlow(CAR_COLOR);
  if (labelEl) labelEl.textContent = '';

  /* Start first cycle after 3s initial car display */
  setTimeout(runCycle, HOLD_MS);

})();
