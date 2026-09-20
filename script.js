(function () {
  'use strict';

  // Update copyright year
  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  // Mobile menu toggle
  var menuToggle = document.getElementById('menuToggle');
  var nav = document.getElementById('nav');

  function closeMenu(restoreFocus) {
    if (!menuToggle || !nav) return;
    nav.classList.remove('open');
    if (window.matchMedia('(max-width: 720px)').matches) {
      nav.setAttribute('aria-hidden', 'true');
      nav.querySelectorAll('a').forEach(function (link) {
        link.setAttribute('tabindex', '-1');
      });
    } else {
      nav.removeAttribute('aria-hidden');
      nav.querySelectorAll('a').forEach(function (link) {
        link.removeAttribute('tabindex');
      });
    }
    menuToggle.setAttribute('aria-expanded', 'false');
    if (restoreFocus) menuToggle.focus();
  }

  function openMenu() {
    nav.classList.add('open');
    nav.removeAttribute('aria-hidden');
    nav.querySelectorAll('a').forEach(function (link) {
      link.removeAttribute('tabindex');
    });
    menuToggle.setAttribute('aria-expanded', 'true');
  }

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', function () {
      if (nav.classList.contains('open')) {
        closeMenu(false);
      } else {
        openMenu();
      }
    });

    // Close menu when a link is clicked
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        closeMenu(false);
      });
    });

    closeMenu(false);

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && nav.classList.contains('open')) {
        closeMenu(true);
      }
    });

    window.addEventListener('resize', function () {
      if (!window.matchMedia('(max-width: 720px)').matches) {
        nav.classList.remove('open');
        nav.removeAttribute('aria-hidden');
        nav.querySelectorAll('a').forEach(function (link) {
          link.removeAttribute('tabindex');
        });
        menuToggle.setAttribute('aria-expanded', 'false');
      } else if (!nav.classList.contains('open')) {
        closeMenu(false);
      }
    });
  }

  // Quote form handling
  var form = document.getElementById('quoteForm');
  var formNote = document.getElementById('formNote');

  if (form && formNote) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();

      var fields = [form.name, form.phone, form.email, form.postcode, form.message];
      var firstInvalid = null;

      fields.forEach(function (field) {
        field.setCustomValidity('');
        field.setAttribute('aria-invalid', 'false');
      });

      if (form.name.value.trim().length < 2) {
        form.name.setCustomValidity('Enter your name (at least 2 characters).');
      }
      if (!/^\+?[0-9 ()-]{7,25}$/.test(form.phone.value.trim())) {
        form.phone.setCustomValidity('Enter a valid phone number.');
      }
      if (form.email.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.value.trim())) {
        form.email.setCustomValidity('Enter a valid email address or leave this field blank.');
      }
      if (!/^[A-Za-z0-9 ]{5,8}$/.test(form.postcode.value.trim())) {
        form.postcode.setCustomValidity('Enter a valid postcode.');
      }
      if (form.message.value.trim().length < 10) {
        form.message.setCustomValidity('Tell us a little more about the job (at least 10 characters).');
      }

      if (!form.checkValidity()) {
        firstInvalid = fields.find(function (field) { return !field.checkValidity(); });
        fields.forEach(function (field) {
          if (!field.checkValidity()) field.setAttribute('aria-invalid', 'true');
        });
        formNote.className = 'form-note is-error';
        formNote.textContent = firstInvalid.validationMessage || 'Please check the highlighted fields.';
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      formNote.className = 'form-note is-demo';
      formNote.textContent = 'The form is valid for demonstration purposes, but no enquiry was sent because this demo has no backend.';
    });
  }
})();
