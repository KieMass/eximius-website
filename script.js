document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.navbar');
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    });
  }

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });

    navLinks.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const slides = Array.from(document.querySelectorAll('.hero-slider .slide'));
  const dots = Array.from(document.querySelectorAll('.hero-slider .dot'));

  if (slides.length && dots.length) {
    let currentIndex = 0;

    const showSlide = (index) => {
      slides.forEach((slide, slideIndex) => {
        slide.classList.toggle('active', slideIndex === index);
      });

      dots.forEach((dot, dotIndex) => {
        dot.classList.toggle('active', dotIndex === index);
      });

      currentIndex = index;
    };

    dots.forEach((dot) => {
      dot.addEventListener('click', () => {
        showSlide(Number(dot.dataset.slide));
      });
    });

    setInterval(() => {
      const nextIndex = (currentIndex + 1) % slides.length;
      showSlide(nextIndex);
    }, 4000);
  }

  const revealItems = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.15 });

  revealItems.forEach((item) => observer.observe(item));

  // ── Service Image Carousel ───────────────────────────────
  const scTrack = document.getElementById('scTrack');
  const scPrev  = document.getElementById('scPrev');
  const scNext  = document.getElementById('scNext');
  const scDotsEl = document.getElementById('scDots');

  if (scTrack && scPrev && scNext && scDotsEl) {
    const scSlides = Array.from(scTrack.querySelectorAll('.sc-slide'));
    let perPage = 3;
    let scPage = 0;

    const getPerPage = () => {
      if (window.innerWidth <= 560) return 1;
      if (window.innerWidth <= 860) return 2;
      return 3;
    };

    const totalPages = () => Math.ceil(scSlides.length / perPage);

    const buildDots = () => {
      scDotsEl.innerHTML = '';
      for (let i = 0; i < totalPages(); i++) {
        const d = document.createElement('button');
        d.className = 'sc-dot' + (i === scPage ? ' active' : '');
        d.setAttribute('aria-label', `Go to page ${i + 1}`);
        d.addEventListener('click', () => goTo(i));
        scDotsEl.appendChild(d);
      }
    };

    const goTo = (page) => {
      perPage = getPerPage();
      const pages = totalPages();
      scPage = Math.max(0, Math.min(page, pages - 1));
      const offset = scPage * perPage;
      scSlides.forEach((slide, i) => {
        slide.style.display = (i >= offset && i < offset + perPage) ? '' : 'none';
      });
      scPrev.disabled = scPage === 0;
      scNext.disabled = scPage >= pages - 1;
      Array.from(scDotsEl.querySelectorAll('.sc-dot')).forEach((d, i) => {
        d.classList.toggle('active', i === scPage);
      });
    };

    const init = () => {
      perPage = getPerPage();
      buildDots();
      goTo(0);
    };

    scPrev.addEventListener('click', () => goTo(scPage - 1));
    scNext.addEventListener('click', () => goTo(scPage + 1));
    window.addEventListener('resize', init);
    init();
  }
});
