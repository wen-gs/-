import { createIcons, icons } from 'lucide';

export function setupContactAndFab() {
    const copyBtn = document.getElementById('copy-btn');
    const wechatIdContainer = document.getElementById('wechat-id');
    const showToast = (msg) => {
        let toast = document.getElementById('custom-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'custom-toast';
            toast.className = 'toast-msg';
            document.body.appendChild(toast);
        }
        toast.innerText = msg;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3000);
    };

    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            const wechatId = wechatIdContainer.innerText;
            if (!navigator.clipboard) {
                showToast('当前浏览器环境不支持一键复制，请手动长按微信号复制');
                return;
            }
            navigator.clipboard.writeText(wechatId).then(() => {
                const originalHTML = copyBtn.innerHTML;
                copyBtn.innerHTML = '<i data-lucide="check"></i> <span>已复制成功</span>';
                createIcons({ icons });
                setTimeout(() => {
                    copyBtn.innerHTML = originalHTML;
                    createIcons({ icons });
                }, 2000);
            }).catch(err => {
                console.error('复制失败: ', err);
                showToast('复制异常，请长按微信号手动复制');
            });
        });
    }

    const fab = document.getElementById('fab-connect');
    if (fab) {
        fab.addEventListener('click', () => {
            document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
        });
        fab.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                fab.click();
            }
        });
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                fab.style.transform = 'scale(1)';
                fab.style.opacity = '1';
                fab.style.pointerEvents = 'auto';
            } else {
                fab.style.transform = 'scale(0)';
                fab.style.opacity = '0';
                fab.style.pointerEvents = 'none';
            }
        }, { passive: true });
    }
}
