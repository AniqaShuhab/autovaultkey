/**
 * js/gallery-canvas.js
 * Animated perspective grid + drifting glow dots behind gallery cards.
 */
(function () {
  const canvas  = document.getElementById('galleryCanvas');
  const section = document.getElementById('gallery');
  if (!canvas || !section) return;

  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width  = section.offsetWidth;
    canvas.height = section.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  /* ── FLOATING GLOW DOTS ── */
  const DOTS = Array.from({ length: 26 }, () => ({
    x     : Math.random() * 1400,
    y     : Math.random() * 900,
    r     : Math.random() * 3 + 1.2,
    dx    : (Math.random() - 0.5) * 0.38,
    dy    : (Math.random() - 0.5) * 0.38,
    alpha : Math.random() * 0.18 + 0.07,
    hue   : Math.random() > 0.55 ? '108,99,255' : '79,142,247'
  }));

  /* ── PERSPECTIVE GRID ── */
  let gridTick = 0;

  function drawGrid() {
    const W  = canvas.width;
    const H  = canvas.height;
    const vx = W * 0.5;
    const vy = H * 0.38;
    const N  = 14;         /* number of horizontal bands */
    const sp = 70;         /* pixel spacing at bottom */

    ctx.save();

    /* Horizontal converging lines */
    for (let i = 0; i < N; i++) {
      const yBase = vy + ((i * sp + gridTick) % (N * sp));
      const t     = Math.max(0, (yBase - vy) / (H - vy));
      if (t <= 0 || yBase > H) continue;
      const xL = vx - vx * t * 2.2;
      const xR = vx + (W - vx) * t * 2.2;
      ctx.globalAlpha = Math.min(t * 0.55, 0.1);
      ctx.strokeStyle = 'rgba(79,142,247,1)';
      ctx.lineWidth   = 1;
      ctx.beginPath();
      ctx.moveTo(Math.max(0, xL), yBase);
      ctx.lineTo(Math.min(W, xR), yBase);
      ctx.stroke();
    }

    /* Vertical diverging lines from vanishing point */
    const VL = 16;
    ctx.globalAlpha = 0.055;
    ctx.strokeStyle = 'rgba(79,142,247,1)';
    for (let i = 0; i <= VL; i++) {
      const xB = (i / VL) * W;
      ctx.beginPath();
      ctx.moveTo(vx, vy);
      ctx.lineTo(xB, H);
      ctx.stroke();
    }

    ctx.restore();
  }

  function drawDots() {
    DOTS.forEach(d => {
      /* wrap */
      d.x += d.dx; d.y += d.dy;
      if (d.x < 0) d.x = canvas.width;
      if (d.x > canvas.width)  d.x = 0;
      if (d.y < 0) d.y = canvas.height;
      if (d.y > canvas.height) d.y = 0;

      const g = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, d.r * 5);
      g.addColorStop(0, `rgba(${d.hue},${d.alpha})`);
      g.addColorStop(1, `rgba(${d.hue},0)`);
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r * 5, 0, Math.PI * 2);
      ctx.fillStyle = g;
      ctx.fill();
    });
  }

  let running = false;
  function frame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    gridTick = (gridTick + 0.42) % (14 * 70);
    drawGrid();
    drawDots();
    requestAnimationFrame(frame);
  }

  /* Only start when section enters viewport */
  const obs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !running) {
      running = true;
      frame();
      obs.disconnect();
    }
  }, { threshold: 0.05 });
  obs.observe(section);
})();
