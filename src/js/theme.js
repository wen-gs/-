// 注意：主题的首次写入由 index.html <head> 内的内联脚本完成，
// 此处只负责按钮图标同步和用户切换逻辑。
export function setupTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeColorMeta = document.getElementById('theme-color-meta');
  const root = document.documentElement;

  const sunSVG = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>';
  const moonSVG = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"/></svg>';

  const updateTheme = (theme) => {
    root.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    if (themeColorMeta) {
      themeColorMeta.setAttribute('content', theme === 'dark' ? '#1c1c1e' : '#ffffff');
    }
    if (themeToggleBtn) {
      themeToggleBtn.innerHTML = theme === 'dark' ? sunSVG : moonSVG;
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
