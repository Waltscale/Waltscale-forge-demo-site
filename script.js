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
    menuToggle.setAttribute('aria-expanded', 'false');
    if (restoreFocus) menuToggle.focus();
  }

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close menu when a link is clicked
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        closeMenu(false);
      });
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && nav.classList.contains('open')) {
        closeMenu(true);
      }
    });
  }

  // Quote form handling
  var form = document.getElementById('quoteForm');
  var formNote = document.getElementById('formNote');

  if (form && formNote) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();

      var name = form.name.value.trim();
      var phone = form.phone.value.trim();
      var postcode = form.postcode.value.trim();

      if (!name || !phone || !postcode) {
        formNote.className = 'form-note is-error';
        formNote.textContent = 'Please fill in your name, phone and postcode.';
        return;
      }

      formNote.className = 'form-note is-success';
      formNote.textContent = 'Thanks ' + name + '. Your details were shown in this demo; no enquiry has been sent.';
      form.reset();
    });
  }
})();
