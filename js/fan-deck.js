/**
 * fan-deck.js  —  Fan-spread card slider for "What We Fix & Duplicate"
 * Cards fan out like a hand of cards. Centre = active.
 * Click side cards to navigate. Arrows + dots + auto-advance + touch swipe.
 */
(function () {

  const deck  = document.getElementById('fanDeck');
  const prev  = document.getElementById('fanPrev');
  const next  = document.getElementById('fanNext');
  const dotsEl = document.getElementById('fanDots');
  if (!deck) return;

  const slides = Array.from(deck.querySelectorAll('.fan-slide'));
  const dots   = Array.from(dotsEl ? dotsEl.querySelectorAll('.fan-dot') : []);
  const TOTAL  = slides.length;
  let current  = 0;
  let autoTimer = null;

  /* ── Position all slides relative to current ── */
  function render() {
    slides.forEach((s, i) => {
      const pos = ((i - current + TOTAL) % TOTAL);
      // Map to -2,-1,0,1,2 (wrap around)
      let p = pos;
      if (p > TOTAL / 2) p -= TOTAL;
      // Clamp to ±2 for visual
      const clamped = Math.max(-2, Math.min(2, p));
      s.dataset.pos = clamped;
    });
    // Update dots
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  function goTo(index) {
    current = ((index % TOTAL) + TOTAL) % TOTAL;
    render();
    resetAuto();
  }

  function goNext() { goTo(current + 1); }
  function goPrev() { goTo(current - 1); }

  /* Click side cards to navigate */
  slides.forEach((s, i) => {
    s.addEventListener('click', () => {
      if (parseInt(s.dataset.pos) !== 0) goTo(i);
    });
  });

  if (prev) prev.addEventListener('click', goPrev);
  if (next) next.addEventListener('click', goNext);

  dots.forEach((d, i) => d.addEventListener('click', () => goTo(i)));

  /* Auto-advance */
  function startAuto() {
    autoTimer = setInterval(goNext, 3500);
  }
  function resetAuto() {
    clearInterval(autoTimer);
    startAuto();
  }

  /* Touch / swipe */
  let touchStartX = 0;
  deck.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  deck.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 40) dx < 0 ? goNext() : goPrev();
  }, { passive: true });

  /* Keyboard */
  document.addEventListener('keydown', e => {
    const section = document.getElementById('fix-gallery');
    if (!section) return;
    const r = section.getBoundingClientRect();
    if (r.top > window.innerHeight || r.bottom < 0) return;
    if (e.key === 'ArrowLeft')  goPrev();
    if (e.key === 'ArrowRight') goNext();
  });

  /* Init */
  render();
  startAuto();

})();
