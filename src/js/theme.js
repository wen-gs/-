import { createIcons, icons } from 'lucide';

export function setupTheme() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeColorMeta = document.getElementById('theme-color-meta');
    const root = document.documentElement;
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    let currentTheme = localStorage.getItem('theme') || (systemPrefersDark ? 'dark' : 'light');

    const updateTheme = (theme) => {
        root.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        themeColorMeta.setAttribute('content', theme === 'dark' ? '#0f172a' : '#3b82f6');
        
        if (themeToggleBtn) {
            themeToggleBtn.innerHTML = theme === 'dark' ? '<i data-lucide="sun"></i>' : '<i data-lucide="moon"></i>';
            createIcons({ icons });
        }
    };
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
