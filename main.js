document.addEventListener('DOMContentLoaded', () => {
    // 1. 初始化 Lucide 图标
    lucide.createIcons();

    // 2. 复制微信号功能
    const copyBtn = document.getElementById('copy-btn');
    const wechatId = document.getElementById('wechat-id').innerText;

    copyBtn.addEventListener('click', () => {
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

    // 3. ScrollReveal 滚动动画配置
    const sr = ScrollReveal({
        distance: '40px',
        duration: 1000,
        delay: 200,
        easing: 'cubic-bezier(0.5, 0, 0, 1)',
        mobile: true,
        reset: false, // 动画是否在向上滚动时重置
    });

    // 绑定不同元素的动画
    sr.reveal('.hero-content .avatar-container', { origin: 'bottom', distance: '20px' });
    sr.reveal('.hero-content .name', { origin: 'bottom', delay: 300 });
    sr.reveal('.hero-content .subtitle', { origin: 'bottom', delay: 400 });
    sr.reveal('.hero-content .tags', { origin: 'bottom', delay: 500 });
    
    sr.reveal('.section-title', { origin: 'left' });
    
    // 基本信息卡片交错进入
    sr.reveal('.info-card', { 
        origin: 'bottom',
        interval: 100 
    });

    sr.reveal('.about-block', { origin: 'bottom' });
    
    sr.reveal('.hobby-item', { origin: 'bottom', interval: 200 });
    
    sr.reveal('.looking-for-card', { origin: 'bottom', scale: 0.95 });
    
    sr.reveal('.footer h2, .footer p', { origin: 'bottom', interval: 100 });
    sr.reveal('.contact-box', { origin: 'bottom', delay: 300 });
});
