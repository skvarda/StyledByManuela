document.addEventListener('DOMContentLoaded', function() {
  // Mobile navigation toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (navToggle) {
    navToggle.addEventListener('click', function() {
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('active');

      // Prevent scroll when menu is open
      if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });
  }

  // Mobile dropdown toggle
  const mobileDropdown = document.querySelector('.dropdown-toggle-mobile');
  const mobileDropdownContainer = document.querySelector('.mobile-nav-dropdown');

  if (mobileDropdown) {
    mobileDropdown.addEventListener('click', function(e) {
      e.preventDefault();
      mobileDropdownContainer.classList.toggle('active');
    });
  }
  
  // Handle anchor links within the same page (for services page)
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        e.preventDefault();
        const headerHeight = document.querySelector('.header').offsetHeight;
        const offsetTop = targetSection.offsetTop - headerHeight - 20;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });

        // Close mobile menu if open
        if (navMenu && navMenu.classList.contains('active')) {
          navToggle.classList.remove('active');
          navMenu.classList.remove('active');
          document.body.style.overflow = '';
        }
      }
    });
  });

  // Close mobile menu when clicking on non-anchor navigation links
  const navLinksNonAnchor = document.querySelectorAll('.nav-link:not([href^="#"]), .mobile-nav-link:not([href^="#"])');
  navLinksNonAnchor.forEach(link => {
    link.addEventListener('click', function() {
      // Close mobile menu if open
      if (navMenu && navMenu.classList.contains('active')) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });

  // Navbar background on scroll
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Contact form submission
  const contactForm = document.getElementById('consultation-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      // Basic form validation
      const requiredFields = contactForm.querySelectorAll('[required]');
      let isValid = true;

      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          isValid = false;
          field.style.borderColor = '#d32f2f';
        } else {
          field.style.borderColor = '';
        }
      });

      if (isValid) {
        // Here you would typically send the form data to your server
        alert('Thank you for your interest! We will contact you soon to schedule your free consultation.');
        contactForm.reset();
      } else {
        alert('Please fill in all required fields.');
      }
    });
  }
});
