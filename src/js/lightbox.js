export function setupLightbox() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const zoomableImages = Array.from(document.querySelectorAll('.zoomable'));
  const closeBtn = document.querySelector('.close-lightbox');
  const prevBtn = document.querySelector('.lightbox-prev');
  const nextBtn = document.querySelector('.lightbox-next');

  if (!lightbox || !lightboxImg || !closeBtn) return;

  let currentIndex = 0;
  let triggerElement = null; // 记录触发来源，关闭后焦点回退

  const updateLightbox = (index) => {
    currentIndex = index;
    const img = zoomableImages[currentIndex];
    if (img) {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt || '大图预览';
    }
  };

  const openLightbox = (img, index) => {
    triggerElement = img;
    updateLightbox(index);
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

  const prevImage = (e) => {
    e.stopPropagation();
    const newIndex = (currentIndex - 1 + zoomableImages.length) % zoomableImages.length;
    updateLightbox(newIndex);
  };

  const nextImage = (e) => {
    e.stopPropagation();
    const newIndex = (currentIndex + 1) % zoomableImages.length;
    updateLightbox(newIndex);
  };

  // 焦点圈定：只允许 Tab 在 lightbox 内循环
  const trapFocus = (e) => {
    if (e.key === 'ArrowLeft') prevImage(e);
    if (e.key === 'ArrowRight') nextImage(e);
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

  zoomableImages.forEach((img, index) => {
    img.addEventListener('click', () => openLightbox(img, index));
    img.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') openLightbox(img, index);
    });
  });

  // 点击遮罩关闭（非图片或按钮区域）
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
      // 点击背景或图片本身的行为设定：此处保持简单，点击背景关闭
      if (e.target === lightbox) closeLightbox();
    }
  });

  closeBtn.addEventListener('click', closeLightbox);
  prevBtn?.addEventListener('click', prevImage);
  nextBtn?.addEventListener('click', nextImage);

  // ESC 关闭
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.getAttribute('aria-hidden') === 'false') {
      closeLightbox();
    }
  });
}
