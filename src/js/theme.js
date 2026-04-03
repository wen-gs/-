import { createIcons, icons } from 'lucide';

// 立即执行，防止深色模式首屏闪白（FOUC），在 DOMContentLoaded 之前生效
(function () {
  const saved = localStorage.getItem('theme');
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = saved || (systemDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', theme);
  // 同步地址栏 theme-color，防止闪烁
  const meta = document.getElementById('theme-color-meta');
  if (meta) meta.setAttribute('content', theme === 'dark' ? '#1c1c1e' : '#ffffff');
})();

export function setupTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeColorMeta = document.getElementById('theme-color-meta');
  const root = document.documentElement;

  const updateTheme = (theme) => {
    root.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    if (themeColorMeta) {
      themeColorMeta.setAttribute('content', theme === 'dark' ? '#1c1c1e' : '#ffffff');
    }
    if (themeToggleBtn) {
      themeToggleBtn.innerHTML =
        theme === 'dark' ? '<i data-lucide="sun"></i>' : '<i data-lucide="moon"></i>';
      createIcons({ icons });
    }
  };

  // 读取 IIFE 已写入的主题，同步按钮图标即可
  let currentTheme = root.getAttribute('data-theme') || 'light';
  updateTheme(currentTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
      updateTheme(currentTheme);
    });
    themeToggleBtn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        themeToggleBtn.click();
      }
    });
  }
}
