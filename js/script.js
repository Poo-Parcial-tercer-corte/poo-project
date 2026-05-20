/**
 * POO Project — script.js
 * Funcionalidades: navbar scroll, menú móvil, scroll reveal,
 * botón volver arriba, copia de código, animaciones.
 */

// ─── 1. Navbar: efecto al hacer scroll ───────────────────────
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  const backTop = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Botón volver arriba
    if (window.scrollY > 400) {
      backTop.classList.add('visible');
    } else {
      backTop.classList.remove('visible');
    }
  });

  backTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

// ─── 2. Menú hamburguesa (mobile) ───────────────────────────
(function initMobileMenu() {
  const btn    = document.getElementById('hamburger-btn');
  const menu   = document.getElementById('nav-mobile');
  const links  = menu.querySelectorAll('a');

  btn.addEventListener('click', () => {
    btn.classList.toggle('open');
    menu.classList.toggle('open');
  });

  // Cerrar al tocar un enlace
  links.forEach(link => {
    link.addEventListener('click', () => {
      btn.classList.remove('open');
      menu.classList.remove('open');
    });
  });
})();

// ─── 3. Scroll reveal (Intersection Observer) ────────────────
(function initReveal() {
  const targets = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  if (!targets.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Pequeño delay escalonado para grupos de cards
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, Number(delay));
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  targets.forEach(el => observer.observe(el));
})();

// ─── 4. Asignar delays escalonados a grupos ───────────────────
(function staggerDelays() {
  // Grids de ventajas
  document.querySelectorAll('.advantages-grid .adv-item').forEach((el, i) => {
    el.dataset.delay = i * 80;
  });
  // Tarjetas de conceptos
  document.querySelectorAll('.concept-grid .concept-card').forEach((el, i) => {
    el.dataset.delay = i * 100;
  });
  // Tarjetas de ejemplo
  document.querySelectorAll('.example-card').forEach((el, i) => {
    el.dataset.delay = i * 90;
  });
  // Tarjetas de ejercicio
  document.querySelectorAll('.exercise-card').forEach((el, i) => {
    el.dataset.delay = i * 100;
  });
  // Items timeline
  document.querySelectorAll('.tl-item').forEach((el, i) => {
    el.dataset.delay = i * 110;
  });
})();

// ─── 5. Navegación activa al hacer scroll ────────────────────
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-links a, .nav-mobile a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sTop = section.offsetTop - 90;
      if (window.scrollY >= sTop) current = section.getAttribute('id');
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  });
})();

// ─── 6. Copiar código al portapapeles ─────────────────────────
(function initCopyCode() {
  document.querySelectorAll('.code-copy').forEach(btn => {
    btn.addEventListener('click', () => {
      const pre = btn.closest('.code-block')
        ? btn.closest('.code-block').querySelector('pre')
        : btn.closest('.example-card')?.querySelector('pre');

      if (!pre) return;

      const text = pre.innerText;
      navigator.clipboard.writeText(text).then(() => {
        const orig = btn.textContent;
        btn.textContent = '✓ Copiado';
        btn.style.color = '#00ffcc';
        setTimeout(() => {
          btn.textContent = orig;
          btn.style.color = '';
        }, 2000);
      }).catch(() => {
        // Fallback para navegadores sin Clipboard API
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        btn.textContent = '✓ Copiado';
        setTimeout(() => { btn.textContent = '⎘ Copiar'; }, 2000);
      });
    });
  });
})();

// ─── 7. Smooth scroll para enlaces internos ─────────────────
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = 70;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();

// ─── 8. Pequeña animación de typewriter en el hero ───────────
(function initTypewriter() {
  const el = document.getElementById('typewriter');
  if (!el) return;

  const words = ['Herencia', 'Encapsulamiento', 'Constructores', 'Polimorfismo'];
  let wordIdx = 0, charIdx = 0, deleting = false;

  function type() {
    const word = words[wordIdx];
    if (!deleting) {
      el.textContent = word.slice(0, ++charIdx);
      if (charIdx === word.length) {
        deleting = true;
        setTimeout(type, 1800);
        return;
      }
    } else {
      el.textContent = word.slice(0, --charIdx);
      if (charIdx === 0) {
        deleting = false;
        wordIdx = (wordIdx + 1) % words.length;
      }
    }
    setTimeout(type, deleting ? 65 : 95);
  }
  setTimeout(type, 900);
})();
