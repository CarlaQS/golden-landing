/**
 * GOLDEN - Plataforma E-commerce y Sistema de Gestión Integral
 * JavaScript interactivo para landing page estática
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Element References
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const backToTopBtn = document.getElementById('back-to-top');
  const currentYearSpan = document.getElementById('current-year');
  const contactForm = document.getElementById('contact-form');
  const formFeedback = document.getElementById('form-feedback');
  const formSubmitBtn = document.getElementById('form-submit-btn');

  // 2. Set Dynamic Year
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // 3. Navbar Scroll Effect & Back-to-Top Toggle
  const handleScroll = () => {
    const scrollPos = window.scrollY;

    // Sticky Navbar shadow
    if (scrollPos > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Back to top button visibility
    if (scrollPos > 450) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check

  // 4. Mobile Menu Toggle
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      navToggle.classList.toggle('open', isOpen);
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close menu when clicking any nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (event) => {
      if (!navbar.contains(event.target) && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // 5. Back to Top Smooth Scroll
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 6. Navigation Scroll Spy (Active link indicator)
  const sections = document.querySelectorAll('main section[id]');

  const highlightNavOnScroll = () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const targetNavLink = document.querySelector(`.nav-menu a[href*="#${sectionId}"]`);

      if (targetNavLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLinks.forEach(l => l.classList.remove('active'));
          targetNavLink.classList.add('active');
        }
      }
    });
  };

  window.addEventListener('scroll', highlightNavOnScroll, { passive: true });

  // 7. Contact Form Simulation & Feedback
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('client-name');
      const typeSelect = document.getElementById('client-type');
      const messageInput = document.getElementById('client-message');

      if (!nameInput.value.trim() || !typeSelect.value || !messageInput.value.trim()) {
        formFeedback.textContent = 'Por favor, completa todos los campos requeridos.';
        formFeedback.className = 'form-feedback error';
        return;
      }

      // Visual sending state
      const originalBtnHTML = formSubmitBtn.innerHTML;
      formSubmitBtn.disabled = true;
      formSubmitBtn.style.opacity = '0.75';
      formSubmitBtn.innerHTML = `
        <svg class="spin-anim" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
          <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path>
        </svg>
        <span>Procesando solicitud...</span>
      `;

      setTimeout(() => {
        formFeedback.textContent = `¡Consulta registrada para Sucre! Gracias ${nameInput.value.trim()}, nos contactaremos a la brevedad.`;
        formFeedback.className = 'form-feedback success';
        
        contactForm.reset();
        formSubmitBtn.disabled = false;
        formSubmitBtn.style.opacity = '1';
        formSubmitBtn.innerHTML = originalBtnHTML;

        // Clear feedback after 6 seconds
        setTimeout(() => {
          formFeedback.textContent = '';
          formFeedback.className = 'form-feedback';
        }, 6000);
      }, 900);
    });
  }
});
