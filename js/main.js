// ===== js/main.js =====
/* ───────────────────────────────────────────────
   MAIN JAVASCRIPT - ENHANCED VERSION
   ─────────────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', function() {
  'use strict';

  // ─── PAGE LOAD ANIMATION ──────────────────────
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.8s ease-in-out';
  
  setTimeout(function() {
    document.body.style.opacity = '1';
  }, 200);

  // ─── NAVBAR TOGGLE ──────────────────────────
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function() {
      const isOpen = navMenu.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    navMenu.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        navToggle.focus();
      }
    });
  }

  // ─── SMOOTH SCROLL ──────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const navHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ─── NAVBAR SCROLL EFFECT ───────────────────
  const navbar = document.querySelector('.navbar');

  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
      navbar.style.background = 'rgba(11, 8, 24, 0.95)';
      navbar.style.borderBottom = '1px solid rgba(201, 168, 76, 0.15)';
      navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
    } else {
      navbar.style.background = 'rgba(11, 8, 24, 0.85)';
      navbar.style.borderBottom = '1px solid rgba(201, 168, 76, 0.08)';
      navbar.style.boxShadow = 'none';
    }
  });

  // ─── SCROLL PROGRESS INDICATOR ──────────────
  const progressBar = document.createElement('div');
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: linear-gradient(90deg, #C9A84C, #F59E0B, #7C3AED);
    z-index: 9999;
    transition: width 0.1s ease-out;
  `;
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = scrollPercent + '%';
  });

  // ─── BACK TO TOP BUTTON ──────────────────────
  const backToTop = document.createElement('button');
  backToTop.innerHTML = '↑';
  backToTop.setAttribute('aria-label', 'Back to top');
  backToTop.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, #C9A84C, #F59E0B);
    color: #0B0818;
    font-size: 1.5rem;
    font-weight: 700;
    border: none;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    box-shadow: 0 4px 20px rgba(201, 168, 76, 0.3);
    z-index: 999;
    transform: translateY(20px);
  `;
  document.body.appendChild(backToTop);

  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      backToTop.style.opacity = '1';
      backToTop.style.visibility = 'visible';
      backToTop.style.transform = 'translateY(0)';
    } else {
      backToTop.style.opacity = '0';
      backToTop.style.visibility = 'hidden';
      backToTop.style.transform = 'translateY(20px)';
    }
  });

  backToTop.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  backToTop.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.1)';
    this.style.boxShadow = '0 6px 30px rgba(201, 168, 76, 0.5)';
  });

  backToTop.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1)';
    this.style.boxShadow = '0 4px 20px rgba(201, 168, 76, 0.3)';
  });

  // ─── CONTACT FORM - FORMPREE BACKEND ───────────
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const name = document.getElementById('contactName');
      const email = document.getElementById('contactEmail');
      const phone = document.getElementById('contactPhone');
      const business = document.getElementById('contactBusiness');
      const need = document.getElementById('contactNeed');
      const budget = document.getElementById('contactBudget');
      const message = document.getElementById('contactMessage');
      let isValid = true;

      // Reset previous errors
      document.querySelectorAll('.form-error').forEach(function(el) {
        el.remove();
      });

      // Validate name
      if (!name.value.trim()) {
        showError(name, 'Name is required');
        isValid = false;
      }

      // Validate email
      if (!email.value.trim()) {
        showError(email, 'Email is required');
        isValid = false;
      } else if (!isValidEmail(email.value)) {
        showError(email, 'Please enter a valid email address');
        isValid = false;
      }

      // Validate message
      if (!message.value.trim()) {
        showError(message, 'Message is required');
        isValid = false;
      }

      if (isValid) {
        // Show loading state
        const btn = contactForm.querySelector('button[type="submit"]');
        const originalText = btn.textContent;
        btn.textContent = 'Sending...';
        btn.style.background = 'linear-gradient(135deg, #7C3AED, #8B5CF6)';
        btn.style.boxShadow = '0 8px 28px rgba(124, 67, 237, 0.3)';
        btn.disabled = true;

        // Prepare form data
        const formData = new FormData(contactForm);

        // Submit to Formspree
        fetch(contactForm.action, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        })
        .then(function(response) {
          if (response.ok) {
            return response.json();
          } else {
            return response.json().then(function(data) {
              throw new Error(data.error || 'Form submission failed');
            });
          }
        })
        .then(function(data) {
          // Success!
          btn.textContent = '✓ Sent!';
          btn.style.background = 'linear-gradient(135deg, #4ade80, #22c55e)';
          btn.style.boxShadow = '0 8px 28px rgba(74, 222, 128, 0.3)';
          btn.style.color = '#0B0818';

          // Reset form
          contactForm.reset();

          // Show success message
          const successMsg = document.createElement('div');
          successMsg.style.cssText = `
            color: #4ade80;
            padding: 1rem;
            background: rgba(74, 222, 128, 0.1);
            border: 1px solid #4ade80;
            border-radius: 12px;
            text-align: center;
            font-size: 1rem;
            margin-top: 1rem;
          `;
          successMsg.textContent = '🎉 Thank you! I\'ll get back to you within 24 hours.';
          contactForm.appendChild(successMsg);

          // Reset button after 5 seconds
          setTimeout(function() {
            btn.textContent = originalText;
            btn.style.background = '';
            btn.style.boxShadow = '';
            btn.style.color = '';
            btn.disabled = false;
            successMsg.style.opacity = '0';
            successMsg.style.transition = 'opacity 0.5s ease';
            setTimeout(function() {
              successMsg.remove();
            }, 500);
          }, 5000);
        })
        .catch(function(error) {
          console.error('Error:', error);
          btn.textContent = 'Error! Try Again';
          btn.style.background = 'linear-gradient(135deg, #f87171, #ef4444)';
          btn.style.boxShadow = '0 8px 28px rgba(248, 113, 113, 0.3)';
          btn.style.color = '#fff';
          btn.disabled = false;

          setTimeout(function() {
            btn.textContent = originalText;
            btn.style.background = '';
            btn.style.boxShadow = '';
            btn.style.color = '';
          }, 4000);
        });
      }
    });
  }

  // ─── FORM ERROR HELPER ──────────────────────
  function showError(input, message) {
    const error = document.createElement('span');
    error.className = 'form-error';
    error.style.cssText = `
      color: #f87171;
      font-size: 0.8rem;
      margin-top: 0.25rem;
    `;
    error.textContent = message;
    input.parentNode.appendChild(error);
    input.style.borderColor = '#f87171';

    input.addEventListener('input', function() {
      this.style.borderColor = '';
      const err = this.parentNode.querySelector('.form-error');
      if (err) err.remove();
    }, { once: true });
  }

  // ─── EMAIL VALIDATION ───────────────────────
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // ─── INTERSECTION OBSERVER (animations) ────
  const animateElements = document.querySelectorAll(
    '.service-card, .work-item, .case-card, .why-card, .thinking-card, .about-block'
  );

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    animateElements.forEach(function(el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });
  } else {
    animateElements.forEach(function(el) {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    });
  }

  // ─── ACTIVE NAV LINK ────────────────────────
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-menu a:not(.nav-cta)');

  if (sections.length && navLinks.length) {
    window.addEventListener('scroll', function() {
      let current = '';
      const navHeight = navbar.offsetHeight;

      sections.forEach(function(section) {
        const sectionTop = section.offsetTop - navHeight - 100;
        if (window.pageYOffset >= sectionTop) {
          current = section.getAttribute('id');
        }
      });

      navLinks.forEach(function(link) {
        link.style.color = '';
        link.style.fontWeight = '';
        if (link.getAttribute('href') === '#' + current) {
          link.style.color = '#C9A84C';
          link.style.fontWeight = '600';
        }
      });
    });
  }

  // ─── KEYBOARD ACCESSIBILITY ─────────────────
  document.querySelectorAll('.btn, .service-card, .work-item, .case-card, .why-card, .thinking-card').forEach(function(el) {
    if (!el.hasAttribute('tabindex') && !el.matches('a, button, input, select, textarea')) {
      el.setAttribute('tabindex', '0');
    }
  });

  // ─── HERO VIDEO LOADING ─────────────────────
  const heroVideo = document.querySelector('.hero-video');
  const heroWrapper = document.querySelector('.hero-video-wrapper');

  if (heroVideo) {
    heroVideo.style.opacity = '0';
    
    heroVideo.addEventListener('canplay', function() {
      setTimeout(function() {
        heroVideo.style.transition = 'opacity 1.5s ease-in-out';
        heroVideo.style.opacity = '1';
        heroVideo.classList.add('loaded');
        if (heroWrapper) {
          heroWrapper.classList.add('video-loaded');
        }
      }, 800);
    });

    setTimeout(function() {
      heroVideo.style.transition = 'opacity 1.5s ease-in-out';
      heroVideo.style.opacity = '1';
      heroVideo.classList.add('loaded');
      if (heroWrapper) {
        heroWrapper.classList.add('video-loaded');
      }
    }, 4000);

    heroVideo.addEventListener('error', function() {
      if (heroWrapper) {
        heroWrapper.classList.add('video-loaded');
      }
      this.style.display = 'none';
    });
  }

  // ─── PARALLAX EFFECT ON HERO ────────────────
  const hero = document.querySelector('.hero');
  if (hero) {
    document.addEventListener('mousemove', function(e) {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      const heroContent = hero.querySelector('.hero-content');
      if (heroContent) {
        heroContent.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
      }
    });
  }

  // ─── TYPING EFFECT FOR GREETING ─────────────
  const greetingElement = document.querySelector('.greeting');
  if (greetingElement) {
    const originalText = greetingElement.textContent;
    greetingElement.textContent = '';
    let charIndex = 0;

    function typeGreeting() {
      if (charIndex < originalText.length) {
        greetingElement.textContent += originalText.charAt(charIndex);
        charIndex++;
        setTimeout(typeGreeting, 50);
      }
    }

    setTimeout(typeGreeting, 500);
  }

  // ─── LOG ────────────────────────────────────
  console.log('✅ Ranganath Gowda — Premium Portfolio Site Initialized');
  console.log('🚀 Features: Smooth Scroll | Back to Top | Progress Bar | Parallax | Typing Effect');
});