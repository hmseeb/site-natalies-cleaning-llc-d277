/* ============================================================
   Natalies Cleaning LLC — interactions
   Vanilla JS, no dependencies, no external requests.
   ============================================================ */
(function () {
  'use strict';

  /* ---------- Current year in footer ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---------- Mobile navigation ---------- */
  var toggle = document.getElementById('nav-toggle');
  var nav = document.getElementById('site-nav');

  function closeNav() {
    if (!nav || !toggle) return;
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open menu');
  }

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });

    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) closeNav();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeNav();
    });

    document.addEventListener('click', function (e) {
      if (!nav.classList.contains('open')) return;
      if (nav.contains(e.target) || toggle.contains(e.target)) return;
      closeNav();
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 860) closeNav();
    });
  }

  /* ---------- Sticky header shadow ---------- */
  var header = document.querySelector('.site-header');
  function onScroll() {
    if (!header) return;
    header.classList.toggle('is-stuck', window.scrollY > 8);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Focus the form when a CTA asks for it ---------- */
  document.querySelectorAll('[data-scroll-focus]').forEach(function (link) {
    link.addEventListener('click', function () {
      var id = link.getAttribute('data-scroll-focus');
      window.setTimeout(function () {
        var target = document.getElementById(id);
        if (target) target.focus({ preventScroll: true });
      }, 620);
    });
  });

  /* ---------- Scroll reveal ---------- */
  var revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealItems.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealItems.forEach(function (el, i) {
      el.style.transitionDelay = (i % 3) * 90 + 'ms';
      observer.observe(el);
    });
  } else {
    revealItems.forEach(function (el) { el.classList.add('visible'); });
  }

  /* ---------- Active nav link on scroll ---------- */
  var sections = Array.prototype.slice.call(
    document.querySelectorAll('main section[id]')
  );
  var navLinks = Array.prototype.slice.call(
    document.querySelectorAll('.site-nav > ul a')
  );

  if (sections.length && navLinks.length && 'IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = entry.target.id;
        navLinks.forEach(function (link) {
          link.classList.toggle(
            'active',
            link.getAttribute('href') === '#' + id
          );
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

    sections.forEach(function (section) { spy.observe(section); });
  }

  /* ---------- Quote form validation ---------- */
  var form = document.getElementById('quote-form');
  if (!form) return;

  var status = document.getElementById('form-status');
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

  var RULES = {
    name: function (v) {
      if (!v) return 'Please enter your name.';
      if (v.length < 2) return 'Please enter your full name.';
      return '';
    },
    email: function (v) {
      if (!v) return 'Please enter your email address.';
      if (!EMAIL_RE.test(v)) return 'Please enter a valid email address.';
      return '';
    },
    phone: function (v) {
      if (!v) return '';
      var digits = v.replace(/\D/g, '');
      if (digits.length < 10) return 'Please enter a 10-digit phone number.';
      return '';
    },
    service: function (v) {
      if (!v) return 'Please choose the cleaning you need.';
      return '';
    },
    message: function (v) {
      if (!v) return 'Please tell us a little about your home.';
      if (v.length < 10) return 'A few more details will help us quote accurately.';
      return '';
    }
  };

  function setError(field, msg) {
    var errorEl = document.getElementById(field.id + '-error');
    if (msg) {
      field.classList.add('invalid');
      field.setAttribute('aria-invalid', 'true');
      if (errorEl) errorEl.textContent = msg;
    } else {
      field.classList.remove('invalid');
      field.removeAttribute('aria-invalid');
      if (errorEl) errorEl.textContent = '';
    }
    return !msg;
  }

  function validateField(field) {
    var rule = RULES[field.id];
    if (!rule) return true;
    return setError(field, rule(field.value.trim()));
  }

  Object.keys(RULES).forEach(function (id) {
    var field = document.getElementById(id);
    if (!field) return;
    field.addEventListener('blur', function () { validateField(field); });
    field.addEventListener('input', function () {
      if (field.classList.contains('invalid')) validateField(field);
    });
    field.addEventListener('change', function () {
      if (field.tagName === 'SELECT') validateField(field);
    });
  });

  function showStatus(message, ok) {
    if (!status) return;
    status.textContent = message;
    status.className = 'form-status show ' + (ok ? 'success' : 'fail');
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var firstInvalid = null;
    Object.keys(RULES).forEach(function (id) {
      var field = document.getElementById(id);
      if (!field) return;
      if (!validateField(field) && !firstInvalid) firstInvalid = field;
    });

    if (firstInvalid) {
      showStatus('Please fix the highlighted fields and send again.', false);
      firstInvalid.focus();
      return;
    }

    var name = document.getElementById('name').value.trim().split(' ')[0];
    var wantsCall = document.getElementById('callback');

    showStatus(
      'Thanks, ' + name + '! Your request is ready to send. ' +
      (wantsCall && wantsCall.checked
        ? 'We will call you back with your flat-rate quote the same business day.'
        : 'We will email your flat-rate quote the same business day.'),
      true
    );

    form.reset();
    Object.keys(RULES).forEach(function (id) {
      var field = document.getElementById(id);
      if (field) setError(field, '');
    });
    if (status) status.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
})();
