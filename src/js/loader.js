export function setupLoader() {
  const loader = document.getElementById('page-loader');
  const body = document.body;

  window.addEventListener('load', () => {
    if (loader) {
      loader.classList.add('hidden');
      body.classList.remove('loading-active');
      setTimeout(() => {
        loader.remove();
      }, 400);
    }
  });

  setTimeout(() => {
    if (loader && !loader.classList.contains('hidden')) {
      loader.classList.add('hidden');
      body.classList.remove('loading-active');
      setTimeout(() => loader.remove(), 400);
    }
  }, 2500);
}
