import ScrollReveal from 'scrollreveal';

export function setupMotion() {
  const scrollIndicator = document.getElementById('scroll-bounce');
  const heroSection = document.getElementById('hero');
  if (scrollIndicator && heroSection && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            scrollIndicator.classList.add('is-bouncing');
          } else {
            scrollIndicator.classList.remove('is-bouncing');
          }
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(heroSection);
    scrollIndicator.classList.add('is-bouncing');
  }

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReducedMotion) {
    const sr = ScrollReveal({
      distance: '30px',
      duration: 800,
      delay: 100,
      easing: 'cubic-bezier(0.5, 0, 0, 1)',
      mobile: true,
      reset: false,
    });

    sr.reveal('.hero-content .avatar-container', { origin: 'bottom', distance: '20px' });
    sr.reveal('.hero-content .name', { origin: 'bottom', delay: 200 });
    sr.reveal('.hero-content .subtitle', { origin: 'bottom', delay: 300 });
    sr.reveal('.hero-content .tags', { origin: 'bottom', delay: 400 });

    sr.reveal('.section-title', { origin: 'left' });
    sr.reveal('.bento-card', { origin: 'bottom', interval: 100 });
    sr.reveal('.gallery-item', { origin: 'bottom', interval: 100, delay: 200 });
    sr.reveal('.about-block', { origin: 'bottom' });
    sr.reveal('.hobby-item', { origin: 'bottom', interval: 200 });
    sr.reveal('.looking-for-card', { origin: 'bottom', scale: 0.95 });
    sr.reveal('.contact-box', { origin: 'bottom', delay: 300 });
  }
}
