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

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close menu when a link is clicked
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
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
        formNote.textContent = 'Please fill in your name, phone and postcode.';
        formNote.style.color = '#ffb3b3';
        return;
      }

      // Demo only: no backend is wired up
      formNote.textContent = 'Thanks ' + name + '. We\'ll call you within 24 hours.';
      formNote.style.color = '#b8e6c1';
      form.reset();
    });
  }
})();
