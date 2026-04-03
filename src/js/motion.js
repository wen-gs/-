/**
 * 用原生 IntersectionObserver 替代 scrollreveal（约 394KB），
 * 实现等效的滚动入场动画，打包体积减少 ~99%。
 */
export function setupMotion() {
  // 控制"向下滑动"指示器
  const scrollIndicator = document.getElementById('scroll-bounce');
  const heroSection = document.getElementById('hero');
  if (scrollIndicator && heroSection && 'IntersectionObserver' in window) {
    const heroObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          scrollIndicator.classList.toggle('is-bouncing', entry.isIntersecting);
        });
      },
      { threshold: 0.1 }
    );
    heroObserver.observe(heroSection);
    scrollIndicator.classList.add('is-bouncing');
  }

  // 如果用户开启了减弱动效，直接跳过入场动画
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // 定义各类元素的动画入场配置
  const revealGroups = [
    { selector: '.avatar-container', delay: 0, origin: 'bottom' },
    { selector: '.hero-content .name', delay: 80, origin: 'bottom' },
    { selector: '.hero-content .subtitle', delay: 160, origin: 'bottom' },
    { selector: '.hero-content .tags', delay: 240, origin: 'bottom' },
    { selector: '.section-title', delay: 0, origin: 'left' },
    { selector: '.bento-card', delay: 0, origin: 'bottom', stagger: 80 },
    { selector: '.gallery-item', delay: 100, origin: 'bottom', stagger: 80 },
    { selector: '.about-block', delay: 0, origin: 'bottom' },
    { selector: '.hobby-item', delay: 0, origin: 'bottom', stagger: 120 },
    { selector: '.looking-for-card', delay: 0, origin: 'bottom' },
    { selector: '.contact-box', delay: 160, origin: 'bottom' },
  ];

  const baseTransform = (origin) => {
    switch (origin) {
      case 'bottom': return 'translateY(28px)';
      case 'left':   return 'translateX(-20px)';
      case 'right':  return 'translateX(20px)';
      default:       return 'translateY(28px)';
    }
  };

  // 为每组元素注入初始隐藏样式，然后用 IO 触发入场
  revealGroups.forEach(({ selector, delay, origin, stagger = 0 }) => {
    const els = document.querySelectorAll(selector);
    els.forEach((el, index) => {
      const totalDelay = delay + index * stagger;
      // 初始状态：透明 + 偏移
      el.style.opacity = '0';
      el.style.transform = baseTransform(origin);
      el.style.transition = `opacity 0.55s ease ${totalDelay}ms, transform 0.55s ease ${totalDelay}ms`;
      el.style.willChange = 'opacity, transform';

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              el.style.opacity = '1';
              el.style.transform = 'none';
              // 动画完成后清理 will-change 节省合成层
              el.addEventListener('transitionend', () => {
                el.style.willChange = 'auto';
              }, { once: true });
              observer.unobserve(el);
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
      );
      observer.observe(el);
    });
  });
}
