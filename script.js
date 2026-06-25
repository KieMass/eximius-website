/* ============================================================
   EXIMIUS SERVICES — Main Script
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Navbar: scroll shadow ─────────────────────────────── */
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // initial check
  }

  /* ── Mobile menu toggle ─────────────────────────────────── */
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks   = document.querySelector('.nav-links');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('.nav-link, .nav-cta').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target)) {
        navLinks.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ── Hero Slider ────────────────────────────────────────── */
  const slides  = Array.from(document.querySelectorAll('.slider-track .slide'));
  const dots    = Array.from(document.querySelectorAll('.slider-dots .dot'));
  const counter = document.getElementById('slider-counter');

  if (slides.length && dots.length) {
    let currentIndex = 0;
    let autoplayTimer = null;

    const showSlide = (index) => {
      slides.forEach((slide, i) => slide.classList.toggle('active', i === index));
      dots.forEach((dot, i)   => dot.classList.toggle('active', i === index));
      if (counter) {
        counter.textContent = `${String(index + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
      }
      currentIndex = index;
    };

    const startAutoplay = () => {
      clearInterval(autoplayTimer);
      autoplayTimer = setInterval(() => {
        showSlide((currentIndex + 1) % slides.length);
      }, 5000);
    };

    dots.forEach((dot) => {
      dot.addEventListener('click', () => {
        showSlide(Number(dot.dataset.slide));
        startAutoplay(); // reset timer on manual nav
      });
    });

    // Pause on hover
    const sliderTrack = document.querySelector('.slider-track');
    if (sliderTrack) {
      sliderTrack.addEventListener('mouseenter', () => clearInterval(autoplayTimer));
      sliderTrack.addEventListener('mouseleave', startAutoplay);
    }

    showSlide(0);
    startAutoplay();
  }

  /* ── Scroll-reveal (single elements) ───────────────────── */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target); // fire once
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

  /* ── Scroll-reveal (staggered grids) ───────────────────── */
  const staggerObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        staggerObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

  document.querySelectorAll('.reveal-stagger').forEach((el) => staggerObserver.observe(el));

  /* ── Contact form: simulated submit ────────────────────── */
  const submitBtn  = document.getElementById('submit-btn');
  const formEl     = document.getElementById('contact-form');
  const successEl  = document.getElementById('form-success');

  if (submitBtn && formEl && successEl) {
    submitBtn.addEventListener('click', () => {
      // Basic validation
      const email = document.getElementById('email');
      const msg   = document.getElementById('message');

      if (email && !email.value.trim()) {
        email.focus();
        email.style.borderColor = 'rgba(201, 168, 76, 0.7)';
        setTimeout(() => (email.style.borderColor = ''), 1500);
        return;
      }

      if (msg && !msg.value.trim()) {
        msg.focus();
        msg.style.borderColor = 'rgba(201, 168, 76, 0.7)';
        setTimeout(() => (msg.style.borderColor = ''), 1500);
        return;
      }

      // Show success state
      submitBtn.textContent = 'Sending…';
      submitBtn.disabled = true;

      setTimeout(() => {
        formEl.style.display = 'none';
        successEl.style.display = 'block';
      }, 900);
    });
  }

});
