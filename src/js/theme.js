import { createIcons, icons } from 'lucide';

// 注意：主题的首次写入由 index.html <head> 内的内联脚本完成，
// 此处只负责按钮图标同步和用户切换逻辑。
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

  // 读取内联脚本已写入的当前主题并同步按钮图标
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
