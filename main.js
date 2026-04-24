/* ============================================================
   VANEC — Global JavaScript
   Add new pages without touching this file.
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- NAVIGATION: Burger Menu ---- */
  const burger = document.getElementById('nav-burger');
  const mobileMenu = document.getElementById('nav-mobile');

  if (burger && mobileMenu) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });

    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        burger.classList.remove('open');
        mobileMenu.classList.remove('open');
      });
    });
  }

  /* ---- NAVIGATION: Active link highlight ---- */
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__links a, .nav__mobile a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  /* ---- SCROLL REVEAL ---- */
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if (revealEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => observer.observe(el));
  }

  /* ---- EXIT POPUP ---- */
  const popup = document.getElementById('exit-popup');
  if (popup) {
    let shown = false;

    const show = () => {
      if (shown) return;
      shown = true;
      popup.classList.add('show');
      document.body.style.overflow = 'hidden';
      requestAnimationFrame(() => {
        requestAnimationFrame(() => popup.classList.add('visible'));
      });
    };

    const hide = () => {
      popup.classList.remove('visible');
      setTimeout(() => {
        popup.classList.remove('show');
        document.body.style.overflow = '';
      }, 320);
    };

    // Desktop: mouse leaves top
    document.addEventListener('mouseout', e => {
      if (!e.relatedTarget && e.clientY < 60) show();
    });

    // Mobile: scroll back up after 60%
    let maxScroll = 0;
    window.addEventListener('scroll', () => {
      if (shown) return;
      const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      if (pct > maxScroll) maxScroll = pct;
      if (maxScroll > 0.6 && maxScroll - pct > 0.15) show();
    }, { passive: true });

    // Close
    document.getElementById('exit-popup-close')?.addEventListener('click', hide);
    popup.addEventListener('click', e => { if (e.target === popup) hide(); });
  }

  /* ---- ACCORDION ---- */
  document.querySelectorAll('.accordion-trigger').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.accordion-item');
      const isOpen = item.classList.contains('open');
      // Close all
      document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('open'));
      // Toggle clicked
      if (!isOpen) item.classList.add('open');
    });
  });

  /* ---- SMOOTH SCROLL for anchor links ---- */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ---- FORM SUBMIT (generic) ---- */
  document.querySelectorAll('[data-form]').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const original = btn?.textContent;
      if (btn) {
        btn.disabled = true;
        btn.textContent = 'Đang gửi...';
      }
      // Replace with your actual endpoint / webhook
      setTimeout(() => {
        form.innerHTML = `
          <div style="text-align:center; padding: 32px 0;">
            <div style="font-size:2.5rem; margin-bottom:12px;">🎉</div>
            <h3 style="font-size:1.25rem; font-weight:700; margin-bottom:8px; color:#D4AF37;">
              Đăng ký thành công!
            </h3>
            <p style="color:#94A3B8; font-size:0.95rem; line-height:1.6;">
              Chúng tôi sẽ liên hệ trong vòng 24 giờ để sắp xếp buổi test miễn phí cho bạn.
            </p>
          </div>`;
      }, 1200);
    });
  });

});

/* ---- TYPEWRITER (call on pages that need it) ---- */
function initTypewriter(elementId, phrases, typeSpeed = 80, eraseSpeed = 40, pause = 2500) {
  const el = document.getElementById(elementId);
  if (!el) return;
  let ti = 0, ci = 0, deleting = false;

  const tick = () => {
    const word = phrases[ti];
    el.textContent = deleting
      ? word.substring(0, ci - 1)
      : word.substring(0, ci + 1);

    deleting ? ci-- : ci++;

    let delay = deleting ? eraseSpeed : typeSpeed;
    if (!deleting && ci === word.length) { delay = pause; deleting = true; }
    else if (deleting && ci === 0) { deleting = false; ti = (ti + 1) % phrases.length; delay = 500; }

    setTimeout(tick, delay);
  };
  setTimeout(tick, 1000);
}
