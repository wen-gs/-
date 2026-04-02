document.addEventListener('DOMContentLoaded', () => {
    // 0. 进阶优化：加载页逻辑
    const loader = document.getElementById('page-loader');
    const body = document.body;
    
    // 设置仪式感最小停留时长为 1.5 秒
    setTimeout(() => {
        if (loader) {
            loader.classList.add('hidden');
            body.classList.remove('loading-active');
            
            // 彻底移除 DOM 避免内存占用（可选）
            setTimeout(() => {
                loader.remove();
            }, 800);
        }
    }, 1500);

    // 1. 初始化 Lucide 图标
    lucide.createIcons();

    // 2. 复制微信号功能
    const copyBtn = document.getElementById('copy-btn');
    const wechatIdContainer = document.getElementById('wechat-id');

    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            const wechatId = wechatIdContainer.innerText;
            navigator.clipboard.writeText(wechatId).then(() => {
                const originalText = copyBtn.innerHTML;
                copyBtn.innerHTML = '<i data-lucide="check"></i> 已复制成功';
                lucide.createIcons();
                setTimeout(() => {
                    copyBtn.innerHTML = originalText;
                    lucide.createIcons();
                }, 2000);
            }).catch(err => {
                console.error('复制失败: ', err);
                alert('复制失败，请手动复制微信号');
            });
        });
    }

    // 3. 优化2：悬浮按钮平滑滚动到底部
    const fab = document.getElementById('fab-connect');
    if (fab) {
        fab.addEventListener('click', () => {
            document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
        });
        
        // 滚动时隐藏/显示 FAB
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                fab.style.transform = 'scale(1)';
                fab.style.opacity = '1';
            } else {
                fab.style.transform = 'scale(0)';
                fab.style.opacity = '0';
            }
        });
    }

    // 4. 优化4：简易 Lightbox 大图预览
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const zoomableImages = document.querySelectorAll('.zoomable');
    const closeBtn = document.querySelector('.close-lightbox');

    zoomableImages.forEach(img => {
        img.addEventListener('click', () => {
            lightbox.style.display = 'flex';
            lightboxImg.src = img.src;
        });
    });

    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target !== lightboxImg) {
                lightbox.style.display = 'none';
            }
        });
    }

    // 5. ScrollReveal 滚动动画配置
    const sr = ScrollReveal({
        distance: '40px',
        duration: 1000,
        delay: 200,
        easing: 'cubic-bezier(0.5, 0, 0, 1)',
        mobile: true,
        reset: false,
    });

    sr.reveal('.hero-content .avatar-container', { origin: 'bottom', distance: '20px' });
    sr.reveal('.hero-content .name', { origin: 'bottom', delay: 300 });
    sr.reveal('.hero-content .subtitle', { origin: 'bottom', delay: 400 });
    sr.reveal('.hero-content .tags', { origin: 'bottom', delay: 500 });
    
    sr.reveal('.section-title', { origin: 'left' });
    sr.reveal('.info-card', { origin: 'bottom', interval: 100 });
    sr.reveal('.gallery-item', { origin: 'bottom', interval: 100, delay: 300 });
    sr.reveal('.about-block', { origin: 'bottom' });
    sr.reveal('.hobby-item', { origin: 'bottom', interval: 200 });
    sr.reveal('.looking-for-card', { origin: 'bottom', scale: 0.95 });
    sr.reveal('.contact-box', { origin: 'bottom', delay: 300 });
});
