export function setupLoader() {
  const loader = document.getElementById('page-loader');
  const body = document.body;
  if (!loader) return;

  // 至少显示 300ms，防止闪烁；页面可交互后就退出，不等待所有图片。
  const minShowTime = 300;
  const startTime = Date.now();
  let hidden = false;

  const hide = () => {
    if (hidden) return;
    hidden = true;
    const elapsed = Date.now() - startTime;
    const delay = Math.max(0, minShowTime - elapsed);
    setTimeout(() => {
      loader.classList.add('hidden');
      body.classList.remove('loading-active');
      // 等过渡动画结束后移除 DOM，避免占用层叠资源
      setTimeout(() => loader.remove(), 400);
    }, delay);
  };

  requestAnimationFrame(hide);

  // 兜底路径：防止主线程繁忙或异常时卡住加载层
  setTimeout(() => {
    if (document.body.classList.contains('loading-active')) {
      hide();
    }
  }, 1200);
}
