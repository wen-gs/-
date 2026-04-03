export function setupLoader() {
  const loader = document.getElementById('page-loader');
  const body = document.body;
  if (!loader) return;

  // 至少显示 300ms，防止闪烁；等实际 load 事件或超时兜底
  const minShowTime = 300;
  const startTime = Date.now();

  const hide = () => {
    const elapsed = Date.now() - startTime;
    const delay = Math.max(0, minShowTime - elapsed);
    setTimeout(() => {
      loader.classList.add('hidden');
      body.classList.remove('loading-active');
      // 等过渡动画结束后移除 DOM，避免占用层叠资源
      setTimeout(() => loader.remove(), 400);
    }, delay);
  };

  // 主路径：等待所有资源（含图片）加载完毕
  window.addEventListener('load', hide, { once: true });

  // 兜底路径：3s 后强制消除，防止某张图片永久卡住
  setTimeout(() => {
    if (document.body.classList.contains('loading-active')) {
      hide();
    }
  }, 3000);
}
