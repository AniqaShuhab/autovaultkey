/**
 * js/morph.js
 * Purpose: Hero car ↔ car key 3D coin-flip morph animation.
 * Pure CSS + JS, no libraries.
 */

(function () {

  const wrapper = document.getElementById('car3d');
  const glow    = document.querySelector('.car-glow');
  if (!wrapper) return;

  // ── CAR SVG (original) ──
  const carSVG = wrapper.innerHTML;

  // ── CAR KEY SVG ──
  const keySVG = `
  <svg viewBox="0 0 600 300" xmlns="http://www.w3.org/2000/svg" class="car-svg">
    <defs>
      <linearGradient id="keyBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#d0d8e8"/>
        <stop offset="40%" style="stop-color:#e8eef8"/>
        <stop offset="100%" style="stop-color:#a0aabe"/>
      </linearGradient>
      <linearGradient id="keyHeadGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#c8a800"/>
        <stop offset="40%" style="stop-color:#f5c800"/>
        <stop offset="80%" style="stop-color:#e0b000"/>
        <stop offset="100%" style="stop-color:#a07800"/>
      </linearGradient>
      <linearGradient id="keyShine" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#ffffff;stop-opacity:0.55"/>
        <stop offset="100%" style="stop-color:#ffffff;stop-opacity:0"/>
      </linearGradient>
      <linearGradient id="bladeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#dce4f0"/>
        <stop offset="50%" style="stop-color:#b8c4d8"/>
        <stop offset="100%" style="stop-color:#8898b4"/>
      </linearGradient>
      <filter id="keyShadow">
        <feDropShadow dx="0" dy="12" stdDeviation="18" flood-color="#f59e0b" flood-opacity="0.35"/>
      </filter>
      <filter id="keyGlow">
        <feGaussianBlur stdDeviation="4" result="blur"/>
        <feComposite in="SourceGraphic" in2="blur"/>
      </filter>
    </defs>

    <!-- Ground shadow ellipse -->
    <ellipse cx="300" cy="272" rx="175" ry="14" fill="#f59e0b" opacity="0.15"/>

    <!-- Key ring loop -->
    <circle cx="300" cy="60" r="28" fill="none" stroke="url(#keyHeadGrad)" stroke-width="9" filter="url(#keyShadow)"/>
    <circle cx="300" cy="60" r="20" fill="none" stroke="url(#keyShine)" stroke-width="3" opacity="0.6"/>

    <!-- Key head body (fob) -->
    <rect x="230" y="82" width="140" height="100" rx="18" ry="18" fill="url(#keyHeadGrad)" filter="url(#keyShadow)"/>
    <!-- Head shine overlay -->
    <rect x="230" y="82" width="140" height="50" rx="18" ry="18" fill="url(#keyShine)" opacity="0.45"/>
    <!-- Head border -->
    <rect x="230" y="82" width="140" height="100" rx="18" ry="18" fill="none" stroke="#c8a800" stroke-width="2" opacity="0.6"/>

    <!-- Button: Lock -->
    <rect x="248" y="100" width="42" height="28" rx="8" fill="#1a1a2e" opacity="0.75"/>
    <rect x="250" y="102" width="42" height="28" rx="8" fill="none" stroke="#f5c800" stroke-width="1" opacity="0.4"/>
    <!-- Lock icon -->
    <path d="M264 115 L264 111 Q264 106 269 106 Q274 106 274 111 L274 115 Z" fill="none" stroke="#f5d060" stroke-width="1.8"/>
    <rect x="261" y="114" width="16" height="11" rx="3" fill="#f5d060" opacity="0.9"/>

    <!-- Button: Unlock -->
    <rect x="310" y="100" width="42" height="28" rx="8" fill="#1a1a2e" opacity="0.75"/>
    <rect x="312" y="102" width="42" height="28" rx="8" fill="none" stroke="#f5c800" stroke-width="1" opacity="0.4"/>
    <!-- Unlock icon -->
    <path d="M321 115 L321 111 Q321 106 326 106 Q331 105 332 109" fill="none" stroke="#f5d060" stroke-width="1.8" stroke-linecap="round"/>
    <rect x="318" y="114" width="16" height="11" rx="3" fill="#f5d060" opacity="0.9"/>

    <!-- Button: Boot -->
    <rect x="248" y="138" width="104" height="28" rx="8" fill="#1a1a2e" opacity="0.75"/>
    <rect x="250" y="140" width="104" height="28" rx="8" fill="none" stroke="#f5c800" stroke-width="1" opacity="0.4"/>
    <!-- Boot icon lines -->
    <line x1="282" y1="150" x2="318" y2="150" stroke="#f5d060" stroke-width="2" stroke-linecap="round"/>
    <line x1="282" y1="156" x2="318" y2="156" stroke="#f5d060" stroke-width="1.5" stroke-linecap="round"/>

    <!-- Key blade connector -->
    <rect x="285" y="182" width="30" height="16" rx="3" fill="url(#bladeGrad)"/>

    <!-- Key blade (with notches) -->
    <rect x="260" y="198" width="80" height="52" rx="4" fill="url(#bladeGrad)"/>
    <!-- Blade top shine -->
    <rect x="260" y="198" width="80" height="18" rx="4" fill="url(#keyShine)" opacity="0.4"/>
    <!-- Blade side edge line -->
    <line x1="260" y1="204" x2="340" y2="204" stroke="#aabbcc" stroke-width="1" opacity="0.5"/>
    <line x1="260" y1="244" x2="340" y2="244" stroke="#8898b4" stroke-width="1" opacity="0.4"/>

    <!-- Notches on blade top -->
    <rect x="270" y="198" width="10" height="10" rx="1" fill="#8898b4"/>
    <rect x="292" y="198" width="8" height="14" rx="1" fill="#8898b4"/>
    <rect x="313" y="198" width="10" height="8" rx="1" fill="#8898b4"/>

    <!-- Blade tip -->
    <polygon points="260,250 340,250 335,260 265,260" fill="#a0aabe"/>

    <!-- Blade hole detail -->
    <circle cx="300" cy="224" r="7" fill="#c8d0e0" stroke="#8898b4" stroke-width="1.5"/>
    <circle cx="300" cy="224" r="3" fill="#6878a0" opacity="0.7"/>

    <!-- Key logo text -->
    <text x="300" y="170" text-anchor="middle" font-family="Outfit,Arial" font-size="9" font-weight="700" fill="#f5c800" opacity="0.7" letter-spacing="2">AUTO VAULT</text>
  </svg>`;

  // ── SETUP wrapper styles ──
  wrapper.style.transformStyle   = 'preserve-3d';
  wrapper.style.perspective      = '800px';
  wrapper.style.transition       = 'transform 0.6s cubic-bezier(0.4,0,0.2,1), opacity 0.6s ease';
  wrapper.style.willChange       = 'transform, opacity';

  let isCar = true;

  function morphOut() {
    wrapper.style.transform = 'perspective(800px) rotateY(90deg) scale(0.6)';
    wrapper.style.opacity   = '0';
  }

  function morphIn() {
    wrapper.style.transform = 'perspective(800px) rotateY(0deg) scale(1)';
    wrapper.style.opacity   = '1';
  }

  function swapContent() {
    if (isCar) {
      wrapper.innerHTML = keySVG;
      if (glow) {
        glow.style.transition   = 'background 0.8s ease';
        glow.style.background   = 'radial-gradient(ellipse, rgba(245,158,11,0.22) 0%, transparent 70%)';
      }
    } else {
      wrapper.innerHTML = carSVG;
      if (glow) {
        glow.style.background   = 'radial-gradient(ellipse, rgba(108,99,255,0.18) 0%, transparent 70%)';
      }
    }
    isCar = !isCar;
  }

  function runCycle() {
    // Step 1: flip out
    morphOut();
    setTimeout(() => {
      // Step 2: swap at midpoint
      swapContent();
      // Step 3: flip in
      morphIn();
    }, 620);
  }

  // Start loop: 3s on car → flip → 3s on key → flip → repeat
  setTimeout(() => {
    runCycle();
    setInterval(runCycle, 3600); // 3s display + 0.6s transition
  }, 3000);

})();
