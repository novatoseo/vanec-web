/* ==========================================================================
   VANEC — Vanguard English Center
   Application script · Editorial micro-interactions
   ==========================================================================
   Architecture
   1.  Boot helpers
   2.  Navigation: burger, active link, scroll state, scroll progress
   3.  Hero: cursor-following spotlight (rAF-throttled)
   4.  Magnetic CTA hover affordance
   5.  Reveal-on-scroll system (IntersectionObserver)
   6.  Exit popup: time-gated, frequency-capped, mobile-aware
   7.  Accordion
   8.  Smooth same-page anchor scroll
   9.  Lead form submission with safe static fallback
   10. Exercise interactions: multiple choice, fill-in-blank, answer toggle
   11. Public typewriter helper (window.initTypewriter)
   ========================================================================== */

(function () {
  'use strict';

  /* -- 1 · Boot helpers ----------------------------------------------------- */
  const onReady = (fn) => {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      fn();
    }
  };

  const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isCoarsePointer = () => window.matchMedia('(pointer: coarse)').matches;
  const $  = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  onReady(() => {
    const reducedMotion = prefersReducedMotion();

    /* -- 2 · Navigation ----------------------------------------------------- */
    const nav        = $('.nav');
    const burger     = $('#nav-burger');
    const mobileMenu = $('#nav-mobile');

    if (burger && mobileMenu) {
      burger.addEventListener('click', () => {
        const willOpen = !mobileMenu.classList.contains('open');
        burger.classList.toggle('open', willOpen);
        mobileMenu.classList.toggle('open', willOpen);
        burger.setAttribute('aria-expanded', String(willOpen));
        document.body.style.overflow = willOpen ? 'hidden' : '';
      });

      mobileMenu.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
          burger.classList.remove('open');
          mobileMenu.classList.remove('open');
          burger.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        });
      });
    }

    /* Active link highlight */
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    $$('.nav__links a, .nav__mobile a').forEach((link) => {
      const href = (link.getAttribute('href') || '').split('#')[0];
      if (href === currentPath || (currentPath === '' && href === 'index.html')) {
        link.classList.add('active');
      }
    });

    /* Nav scroll state + scroll progress hairline (single rAF loop) */
    if (nav) {
      const docEl = document.documentElement;
      let ticking = false;
      const update = () => {
        const scrollTop = window.scrollY || docEl.scrollTop;
        const max       = Math.max(1, docEl.scrollHeight - window.innerHeight);
        const pct       = Math.min(100, (scrollTop / max) * 100);
        nav.style.setProperty('--scroll-progress', pct + '%');
        nav.classList.toggle('is-scrolled', scrollTop > 24);
        ticking = false;
      };
      window.addEventListener('scroll', () => {
        if (!ticking) {
          window.requestAnimationFrame(update);
          ticking = true;
        }
      }, { passive: true });
      update();
    }

    /* -- 3 · Hero cursor-following spotlight -------------------------------- */
    const hero = $('.page-hero');
    if (hero && !reducedMotion && !isCoarsePointer()) {
      let pending = false;
      let mx = 70, my = 30;
      hero.addEventListener('mousemove', (event) => {
        const rect = hero.getBoundingClientRect();
        mx = ((event.clientX - rect.left) / rect.width)  * 100;
        my = ((event.clientY - rect.top)  / rect.height) * 100;
        if (!pending) {
          window.requestAnimationFrame(() => {
            hero.style.setProperty('--mx', mx + '%');
            hero.style.setProperty('--my', my + '%');
            pending = false;
          });
          pending = true;
        }
      }, { passive: true });
    }

    /* -- 4 · Magnetic CTA hover -------------------------------------------- */
    if (!reducedMotion && !isCoarsePointer()) {
      const magneticTargets = $$('.btn-primary.btn-lg, .nav__cta');
      magneticTargets.forEach((el) => {
        let raf = null;
        const reset = () => {
          if (raf) cancelAnimationFrame(raf);
          el.style.transform = '';
        };
        el.addEventListener('mousemove', (event) => {
          const rect = el.getBoundingClientRect();
          const cx = rect.left + rect.width  / 2;
          const cy = rect.top  + rect.height / 2;
          const dx = (event.clientX - cx) * 0.18;
          const dy = (event.clientY - cy) * 0.18;
          if (raf) cancelAnimationFrame(raf);
          raf = window.requestAnimationFrame(() => {
            el.style.transform = `translate(${dx}px, ${dy - 2}px)`;
          });
        });
        el.addEventListener('mouseleave', reset);
        el.addEventListener('blur', reset);
      });
    }

    /* -- 5 · Reveal-on-scroll system --------------------------------------- */
    const revealEls = $$('.reveal, .reveal-left, .reveal-right');
    if (revealEls.length) {
      if (reducedMotion || !('IntersectionObserver' in window)) {
        revealEls.forEach((el) => el.classList.add('active'));
      } else {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('active');
              observer.unobserve(entry.target);
            }
          });
        }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
        revealEls.forEach((el) => observer.observe(el));
      }
    }

    /* -- 6 · Exit popup ---------------------------------------------------- */
    const popup = $('#exit-popup');
    if (popup) {
      const currentPage  = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
      const blockedPages = ['contacto.html', 'privacidad.html', 'terminos.html', 'cookies.html', 'gracias.html'];
      const isBlockedPage = blockedPages.includes(currentPage);
      const isMobile      = window.matchMedia('(max-width: 767px)').matches;
      const storageKey    = 'vanec_exit_popup_closed_until';
      const sessionKey    = 'vanec_exit_popup_seen_session';
      let   closedUntil   = 0;
      try { closedUntil = Number(localStorage.getItem(storageKey) || 0); } catch (_) { /* private mode */ }
      const canShowByFrequency = Date.now() > closedUntil;
      let eligibleByTime = false;
      let shown = false;
      try { shown = sessionStorage.getItem(sessionKey) === '1'; } catch (_) { /* private mode */ }

      window.setTimeout(() => { eligibleByTime = true; }, isMobile ? 45000 : 30000);

      const userIsTyping = () => {
        const active = document.activeElement;
        if (!active) return false;
        return ['INPUT', 'TEXTAREA', 'SELECT'].includes(active.tagName) || active.isContentEditable;
      };

      const show = () => {
        if (shown || isBlockedPage || !canShowByFrequency || !eligibleByTime || userIsTyping()) return;
        shown = true;
        try { sessionStorage.setItem(sessionKey, '1'); } catch (_) { /* private mode */ }
        popup.classList.add('show');
        document.body.style.overflow = 'hidden';
        if (reducedMotion) {
          popup.classList.add('visible');
        } else {
          window.requestAnimationFrame(() => window.requestAnimationFrame(() => popup.classList.add('visible')));
        }
        $('#exit-popup-close')?.focus({ preventScroll: true });
      };

      const hide = () => {
        try { localStorage.setItem(storageKey, String(Date.now() + 7 * 24 * 60 * 60 * 1000)); } catch (_) { /* private mode */ }
        popup.classList.remove('visible');
        window.setTimeout(() => {
          popup.classList.remove('show');
          document.body.style.overflow = '';
        }, reducedMotion ? 0 : 360);
      };

      if (!isBlockedPage && canShowByFrequency) {
        document.addEventListener('mouseout', (event) => {
          if (!isMobile && !event.relatedTarget && event.clientY < 60) show();
        });
        window.addEventListener('scroll', () => {
          if (!isMobile || shown) return;
          const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
          if ((window.scrollY / max) >= 0.7) show();
        }, { passive: true });
      }

      $('#exit-popup-close')?.addEventListener('click', hide);
      popup.addEventListener('click', (event) => {
        if (event.target === popup) hide();
      });
      document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && popup.classList.contains('show')) hide();
      });
    }

    /* -- 7 · Accordion ----------------------------------------------------- */
    $$('.accordion-trigger').forEach((button) => {
      button.addEventListener('click', () => {
        const item = button.closest('.accordion-item');
        if (!item) return;
        const isOpen = item.classList.contains('open');
        $$('.accordion-item').forEach((other) => {
          other.classList.remove('open');
          other.querySelector('.accordion-trigger')?.setAttribute('aria-expanded', 'false');
        });
        if (!isOpen) {
          item.classList.add('open');
          button.setAttribute('aria-expanded', 'true');
        }
      });
    });

    /* -- 8 · Smooth scroll for same-page anchors --------------------------- */
    $$('a[href^="#"]').forEach((link) => {
      link.addEventListener('click', (event) => {
        const targetSelector = link.getAttribute('href');
        if (!targetSelector || targetSelector === '#') return;
        const target = document.querySelector(targetSelector);
        if (!target) return;
        event.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 90;
        window.scrollTo({ top, behavior: reducedMotion ? 'auto' : 'smooth' });
      });
    });

    /* -- 9 · Lead form submission ------------------------------------------ */
    $$('[data-form]').forEach((form) => {
      form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const button       = form.querySelector('button[type="submit"]');
        const originalText = button?.textContent || '';
        const webhook      = form.dataset.webhook  || '';
        const redirectUrl  = form.dataset.redirect || '';

        if (button) {
          button.disabled    = true;
          button.textContent = 'Đang gửi...';
        }

        const payload = Object.fromEntries(new FormData(form).entries());
        payload.source_page  = window.location.pathname.split('/').pop() || 'index.html';
        payload.submitted_at = new Date().toISOString();

        try {
          if (webhook) {
            await fetch(webhook, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(payload)
            });
          } else {
            /* Static-hosting fallback: PENDING real webhook URL. */
            await new Promise((resolve) => window.setTimeout(resolve, 700));
          }

          if (redirectUrl) {
            try { sessionStorage.setItem('vanec_last_lead', JSON.stringify(payload)); } catch (_) { /* noop */ }
            window.location.href = redirectUrl;
            return;
          }

          form.innerHTML = `
            <div class="thank-you-state" role="status" aria-live="polite" style="text-align:center; padding:32px 0;">
              <div style="font-size:2.4rem; margin-bottom:14px; color:var(--brass);" aria-hidden="true">✦</div>
              <h3 style="font-family:var(--font-display); font-style:italic; font-size:1.5rem; font-weight:500; margin-bottom:10px; color:var(--ivory);">
                Đăng ký thành công
              </h3>
              <p style="color:var(--ivory-mute); font-size:0.95rem; line-height:1.7; max-width:340px; margin:0 auto;">
                VANEC sẽ liên hệ qua Zalo / điện thoại để sắp xếp buổi test miễn phí và tư vấn lộ trình phù hợp.
              </p>
              <p style="color:var(--taupe-deep); font-size:0.8rem; margin-top:14px;">
                Cần trao đổi ngay? Dùng nút Zalo ở góc màn hình.
              </p>
            </div>`;
        } catch (error) {
          /* eslint-disable-next-line no-console */
          console.error('Form submission error:', error);
          const errorBox = form.querySelector('[data-form-error]') || document.createElement('p');
          errorBox.dataset.formError = 'true';
          errorBox.style.color   = 'var(--negative)';
          errorBox.style.fontSize = '.88rem';
          errorBox.style.marginTop = '8px';
          errorBox.textContent = 'Không thể gửi form lúc này. Vui lòng thử lại hoặc liên hệ qua Zalo.';
          if (!errorBox.parentNode) form.appendChild(errorBox);
          if (button) {
            button.disabled    = false;
            button.textContent = originalText;
          }
        }
      });
    });

    /* -- 10 · Exercise interactions ---------------------------------------- */
    $$('[data-correct]').forEach((button) => {
      button.addEventListener('click', () => {
        const group = button.closest('.exercise-question');
        group?.querySelectorAll('[data-correct]').forEach((btn) => {
          btn.classList.remove('is-correct', 'is-wrong');
          btn.setAttribute('aria-pressed', 'false');
        });
        const ok = button.dataset.correct === 'true';
        button.classList.add(ok ? 'is-correct' : 'is-wrong');
        button.setAttribute('aria-pressed', 'true');
        const feedback = group?.querySelector('.feedback');
        if (feedback) {
          feedback.textContent = ok
            ? 'Correct. This is the most natural hotel English option.'
            : 'Try again. Think about tone, clarity and guest service.';
        }
      });
    });

    $$('[data-check-blanks]').forEach((button) => {
      button.addEventListener('click', () => {
        const box = button.closest('.exercise-box');
        let total = 0, score = 0;
        box?.querySelectorAll('[data-answer]').forEach((input) => {
          total += 1;
          const expected = (input.dataset.answer || '').toLowerCase().trim();
          const accepted = expected.split('|').map((item) => item.trim());
          const given    = (input.value || '').toLowerCase().trim();
          const ok       = accepted.includes(given);
          input.style.borderColor = ok ? 'var(--positive)' : 'var(--negative)';
          if (ok) score += 1;
        });
        const result = box?.querySelector('.blank-result');
        if (result) {
          result.textContent = `Score: ${score}/${total}. Review the model answer below to improve rhythm and politeness.`;
        }
      });
    });

    $$('[data-toggle-answer]').forEach((button) => {
      button.addEventListener('click', () => {
        const target = document.getElementById(button.getAttribute('aria-controls'));
        if (!target) return;
        const open = target.classList.toggle('open');
        button.setAttribute('aria-expanded', String(open));
        button.textContent = open ? 'Ẩn đáp án' : 'Xem đáp án mẫu';
      });
    });
  });

  /* -- 11 · Public typewriter helper --------------------------------------- */
  window.initTypewriter = function initTypewriter(elementId, phrases, typeSpeed, eraseSpeed, pause) {
    const element = document.getElementById(elementId);
    if (!element || !Array.isArray(phrases) || !phrases.length) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      element.textContent = phrases[0];
      return;
    }
    const T = typeSpeed  || 80;
    const E = eraseSpeed || 40;
    const P = pause      || 2500;
    let phraseIndex = 0, charIndex = 0, deleting = false;
    const tick = () => {
      const phrase = phrases[phraseIndex];
      element.textContent = deleting
        ? phrase.substring(0, charIndex - 1)
        : phrase.substring(0, charIndex + 1);
      charIndex = deleting ? charIndex - 1 : charIndex + 1;
      let delay = deleting ? E : T;
      if (!deleting && charIndex === phrase.length) {
        delay = P; deleting = true;
      } else if (deleting && charIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        delay = 500;
      }
      window.setTimeout(tick, delay);
    };
    window.setTimeout(tick, 1000);
  };
})();
