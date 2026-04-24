/* ============================================================
   VANEC — Global JavaScript
   Static-hosting friendly. Safe on pages where optional elements do not exist.
   ============================================================ */

(function () {
  'use strict';

  const onReady = (fn) => {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      fn();
    }
  };

  onReady(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ---- NAVIGATION: Burger Menu ---- */
    const burger = document.getElementById('nav-burger');
    const mobileMenu = document.getElementById('nav-mobile');

    if (burger && mobileMenu) {
      burger.addEventListener('click', () => {
        const willOpen = !mobileMenu.classList.contains('open');
        burger.classList.toggle('open', willOpen);
        mobileMenu.classList.toggle('open', willOpen);
        burger.setAttribute('aria-expanded', String(willOpen));
      });

      mobileMenu.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
          burger.classList.remove('open');
          mobileMenu.classList.remove('open');
          burger.setAttribute('aria-expanded', 'false');
        });
      });
    }

    /* ---- NAVIGATION: Active link highlight ---- */
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav__links a, .nav__mobile a').forEach((link) => {
      const href = (link.getAttribute('href') || '').split('#')[0];
      if (href === currentPath || (currentPath === '' && href === 'index.html')) {
        link.classList.add('active');
      }
    });

    /* ---- SCROLL REVEAL ---- */
    const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    if (revealEls.length) {
      if (prefersReducedMotion || !('IntersectionObserver' in window)) {
        revealEls.forEach((el) => el.classList.add('active'));
      } else {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('active');
              observer.unobserve(entry.target);
            }
          });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

        revealEls.forEach((el) => observer.observe(el));
      }
    }

    /* ---- EXIT POPUP: non-invasive rules ---- */
    const popup = document.getElementById('exit-popup');
    if (popup) {
      const currentPage = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
      const blockedPages = ['contacto.html', 'privacidad.html', 'terminos.html', 'cookies.html'];
      const isBlockedPage = blockedPages.includes(currentPage);
      const isMobile = window.matchMedia('(max-width: 767px)').matches;
      const storageKey = 'vanec_exit_popup_closed_until';
      const sessionKey = 'vanec_exit_popup_seen_session';
      const closedUntil = Number(localStorage.getItem(storageKey) || 0);
      const canShowByFrequency = Date.now() > closedUntil;
      let eligibleByTime = false;
      let shown = sessionStorage.getItem(sessionKey) === '1';

      window.setTimeout(() => {
        eligibleByTime = true;
      }, isMobile ? 45000 : 30000);

      const userIsTyping = () => {
        const active = document.activeElement;
        if (!active) return false;
        return ['INPUT', 'TEXTAREA', 'SELECT'].includes(active.tagName) || active.isContentEditable;
      };

      const show = () => {
        if (shown || isBlockedPage || !canShowByFrequency || !eligibleByTime || userIsTyping()) return;
        shown = true;
        sessionStorage.setItem(sessionKey, '1');
        popup.classList.add('show');
        document.body.style.overflow = 'hidden';
        if (prefersReducedMotion) {
          popup.classList.add('visible');
        } else {
          requestAnimationFrame(() => requestAnimationFrame(() => popup.classList.add('visible')));
        }
        document.getElementById('exit-popup-close')?.focus({ preventScroll: true });
      };

      const hide = () => {
        localStorage.setItem(storageKey, String(Date.now() + 7 * 24 * 60 * 60 * 1000));
        popup.classList.remove('visible');
        window.setTimeout(() => {
          popup.classList.remove('show');
          document.body.style.overflow = '';
        }, prefersReducedMotion ? 0 : 320);
      };

      if (!isBlockedPage && canShowByFrequency) {
        document.addEventListener('mouseout', (event) => {
          if (!isMobile && !event.relatedTarget && event.clientY < 60) show();
        });

        window.addEventListener('scroll', () => {
          if (!isMobile || shown) return;
          const maxScrollable = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
          const scrollPercent = window.scrollY / maxScrollable;
          if (scrollPercent >= 0.7) show();
        }, { passive: true });
      }

      document.getElementById('exit-popup-close')?.addEventListener('click', hide);
      popup.addEventListener('click', (event) => {
        if (event.target === popup) hide();
      });
      document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && popup.classList.contains('show')) hide();
      });
    }

    /* ---- ACCORDION ---- */
    document.querySelectorAll('.accordion-trigger').forEach((button) => {
      button.addEventListener('click', () => {
        const item = button.closest('.accordion-item');
        if (!item) return;
        const isOpen = item.classList.contains('open');
        document.querySelectorAll('.accordion-item').forEach((other) => {
          other.classList.remove('open');
          other.querySelector('.accordion-trigger')?.setAttribute('aria-expanded', 'false');
        });
        if (!isOpen) {
          item.classList.add('open');
          button.setAttribute('aria-expanded', 'true');
        }
      });
    });

    /* ---- SMOOTH SCROLL for same-page anchor links ---- */
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener('click', (event) => {
        const targetSelector = link.getAttribute('href');
        if (!targetSelector || targetSelector === '#') return;
        const target = document.querySelector(targetSelector);
        if (!target) return;
        event.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      });
    });

    /* ---- FORM SUBMIT: ready for webhook, safe fallback for static hosting ---- */
    document.querySelectorAll('[data-form]').forEach((form) => {
      form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const button = form.querySelector('button[type="submit"]');
        const originalText = button?.textContent || '';
        const webhook = form.dataset.webhook || '';

        if (button) {
          button.disabled = true;
          button.textContent = 'Đang gửi...';
        }

        const payload = Object.fromEntries(new FormData(form).entries());
        payload.source_page = window.location.pathname.split('/').pop() || 'index.html';
        payload.submitted_at = new Date().toISOString();

        try {
          if (webhook) {
            await fetch(webhook, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(payload)
            });
          } else {
            // PENDIENTE: URL real del webhook/CRM para captación de leads.
            await new Promise((resolve) => window.setTimeout(resolve, 700));
          }

          form.innerHTML = `
            <div class="thank-you-state" role="status" aria-live="polite" style="text-align:center; padding: 32px 0;">
              <div style="font-size:2.5rem; margin-bottom:12px;" aria-hidden="true">🎉</div>
              <h3 style="font-size:1.25rem; font-weight:700; margin-bottom:8px; color:#D4AF37;">
                Đăng ký thành công!
              </h3>
              <p style="color:#94A3B8; font-size:0.95rem; line-height:1.6;">
                VANEC sẽ liên hệ qua Zalo/điện thoại để sắp xếp buổi test miễn phí và tư vấn lộ trình phù hợp.
              </p>
              <p style="color:#64748B; font-size:0.82rem; margin-top:12px;">
                Nếu cần trao đổi ngay, hãy dùng nút Zalo ở góc màn hình.
              </p>
            </div>`;
        } catch (error) {
          console.error('Form submission error:', error);
          const errorBox = form.querySelector('[data-form-error]') || document.createElement('p');
          errorBox.dataset.formError = 'true';
          errorBox.style.color = 'var(--danger)';
          errorBox.textContent = 'Không thể gửi form lúc này. Vui lòng thử lại hoặc liên hệ qua Zalo.';
          if (!errorBox.parentNode) form.appendChild(errorBox);
          if (button) {
            button.disabled = false;
            button.textContent = originalText;
          }
        }
      });
    });

    /* ---- EXERCISE INTERACTIONS ---- */
    document.querySelectorAll('[data-correct]').forEach((button) => {
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

    document.querySelectorAll('[data-check-blanks]').forEach((button) => {
      button.addEventListener('click', () => {
        const box = button.closest('.exercise-box');
        let total = 0;
        let score = 0;
        box?.querySelectorAll('[data-answer]').forEach((input) => {
          total += 1;
          const expected = (input.dataset.answer || '').toLowerCase().trim();
          const accepted = expected.split('|').map((item) => item.trim());
          const given = (input.value || '').toLowerCase().trim();
          const ok = accepted.includes(given);
          input.style.borderColor = ok ? 'var(--success)' : 'var(--danger)';
          if (ok) score += 1;
        });
        const result = box?.querySelector('.blank-result');
        if (result) {
          result.textContent = `Score: ${score}/${total}. Review the model answer below to improve rhythm and politeness.`;
        }
      });
    });

    document.querySelectorAll('[data-toggle-answer]').forEach((button) => {
      button.addEventListener('click', () => {
        const target = document.getElementById(button.getAttribute('aria-controls'));
        if (!target) return;
        const open = target.classList.toggle('open');
        button.setAttribute('aria-expanded', String(open));
        button.textContent = open ? 'Ẩn đáp án' : 'Xem đáp án mẫu';
      });
    });
  });

  /* ---- TYPEWRITER (call on pages that need it) ---- */
  window.initTypewriter = function initTypewriter(elementId, phrases, typeSpeed = 80, eraseSpeed = 40, pause = 2500) {
    const element = document.getElementById(elementId);
    if (!element || !Array.isArray(phrases) || !phrases.length) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      element.textContent = phrases[0];
      return;
    }

    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;

    const tick = () => {
      const phrase = phrases[phraseIndex];
      element.textContent = deleting
        ? phrase.substring(0, charIndex - 1)
        : phrase.substring(0, charIndex + 1);

      charIndex = deleting ? charIndex - 1 : charIndex + 1;

      let delay = deleting ? eraseSpeed : typeSpeed;
      if (!deleting && charIndex === phrase.length) {
        delay = pause;
        deleting = true;
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
