export function setupContactAndFab() {
  const copyBtn = document.getElementById('copy-btn');
  const wechatIdEl = document.getElementById('wechat-id');

  // Toast 提示
  const showToast = (msg) => {
    let toast = document.getElementById('custom-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'custom-toast';
      toast.className = 'toast-msg';
      toast.setAttribute('role', 'status');
      toast.setAttribute('aria-live', 'polite');
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
  };

  // 复制微信号 — 用 CSS class 切换，不操作 innerHTML
  if (copyBtn && wechatIdEl) {
    copyBtn.addEventListener('click', () => {
      const wechatId = wechatIdEl.textContent.trim();
      if (!navigator.clipboard) {
        showToast('当前浏览器不支持一键复制，请长按微信号手动复制');
        return;
      }
      navigator.clipboard
        .writeText(wechatId)
        .then(() => {
          copyBtn.classList.add('copied');
          copyBtn.querySelector('.btn-label').textContent = '已复制成功';
          showToast('✅ 微信号已复制，请前往微信添加');
          setTimeout(() => {
            copyBtn.classList.remove('copied');
            copyBtn.querySelector('.btn-label').textContent = '复制微信号';
          }, 2000);
        })
        .catch(() => {
          showToast('复制异常，请长按微信号手动复制');
        });
    });
  }

  // FAB — 滚动超过 300px 才显示，初始由 CSS 控制隐藏
  const fab = document.getElementById('fab-connect');
  if (fab) {
    fab.addEventListener('click', () => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    });

    window.addEventListener(
      'scroll',
      () => {
        if (window.scrollY > 300) {
          fab.classList.remove('fab-hidden');
        } else {
          fab.classList.add('fab-hidden');
        }
      },
      { passive: true }
    );
  }
}
