export function setupLightbox() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const zoomableImages = document.querySelectorAll('.zoomable');
  const closeBtn = document.querySelector('.close-lightbox');

  if (!lightbox || !lightboxImg || !closeBtn) return;

  let triggerElement = null; // 记录触发来源，关闭后焦点回退

  const openLightbox = (src, trigger) => {
    triggerElement = trigger || null;
    lightboxImg.src = src;
    lightbox.setAttribute('aria-hidden', 'false');
    lightbox.setAttribute('aria-modal', 'true');
    // 锁定页面滚动
    document.body.style.overflow = 'hidden';
    // 焦点移入关闭按钮
    closeBtn.focus();
    // 圈定焦点在 lightbox 内
    lightbox.addEventListener('keydown', trapFocus);
  };

  const closeLightbox = () => {
    lightbox.setAttribute('aria-hidden', 'true');
    lightbox.removeAttribute('aria-modal');
    document.body.style.overflow = '';
    lightbox.removeEventListener('keydown', trapFocus);
    // 焦点回退到触发元素
    if (triggerElement) {
      triggerElement.focus();
      triggerElement = null;
    }
  };

  // 焦点圈定：只允许 Tab 在 lightbox 内循环
  const trapFocus = (e) => {
    if (e.key !== 'Tab') return;
    const focusable = lightbox.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  };

  zoomableImages.forEach((img) => {
    img.addEventListener('click', () => openLightbox(img.src, img));
    img.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') openLightbox(img.src, img);
    });
  });

  // 点击遮罩关闭（非图片区域）
  lightbox.addEventListener('click', (e) => {
    if (e.target !== lightboxImg) closeLightbox();
  });

  closeBtn.addEventListener('click', closeLightbox);

  // ESC 关闭
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.getAttribute('aria-hidden') === 'false') {
      closeLightbox();
    }
  });
}
