/**
 * js/animations.js
 * Purpose: All scroll-based animations and counter logic.
 * Uses Intersection Observer (no GSAP CDN dependency needed).
 */

(function () {

  // ── REVEAL ON SCROLL ──
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 80);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  reveals.forEach(el => revealObserver.observe(el));

  // ── ANIMATED COUNTERS ──
  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1800;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);

      if (target >= 1000) {
        el.textContent = current.toLocaleString() + '+';
      } else if (target === 100) {
        el.textContent = current + '%';
      } else {
        el.textContent = current + '+';
      }

      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }

  const statsSection = document.getElementById('stats');
  let countersDone = false;

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !countersDone) {
        countersDone = true;
        document.querySelectorAll('.stat-num').forEach(el => animateCounter(el));
      }
    });
  }, { threshold: 0.4 });

  if (statsSection) statsObserver.observe(statsSection);

  // ── SERVICE CARDS STAGGER ──
  const serviceCards = document.querySelectorAll('.service-card');
  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        entry.target.style.transitionDelay = `${i * 0.12}s`;
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        cardObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  serviceCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease, box-shadow 0.3s, border-color 0.3s';
    cardObserver.observe(card);
  });

  // ── WHY ITEMS STAGGER ──
  const whyItems = document.querySelectorAll('.why-item');
  const whyObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        entry.target.style.transitionDelay = `${i * 0.08}s`;
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        whyObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  whyItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    whyObserver.observe(item);
  });

  // ── GALLERY ITEMS ──
  const galleryItems = document.querySelectorAll('.gallery-item');
  const galleryObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        entry.target.style.transitionDelay = `${i * 0.1}s`;
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'scale(1)';
        galleryObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  galleryItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'scale(0.95)';
    item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    galleryObserver.observe(item);
  });

  // ── ABOUT CARDS STAGGER ──
  const acards = document.querySelectorAll('.acard');
  const acardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        entry.target.style.transitionDelay = `${i * 0.15}s`;
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateX(0)';
        acardObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  acards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateX(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    acardObserver.observe(card);
  });

})();
