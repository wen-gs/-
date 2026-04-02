export function setupLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const zoomableImages = document.querySelectorAll('.zoomable');
    const closeBtn = document.querySelector('.close-lightbox');

    const openLightbox = (src) => {
        lightbox.setAttribute('aria-hidden', 'false');
        lightboxImg.src = src;
        closeBtn.focus();
    };

    const closeLightbox = () => {
        lightbox.setAttribute('aria-hidden', 'true');
    };

    zoomableImages.forEach(img => {
        img.addEventListener('click', () => openLightbox(img.src));
        img.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                openLightbox(img.src);
            }
        });
    });

    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target !== lightboxImg) {
                closeLightbox();
            }
        });
        closeBtn.addEventListener('click', closeLightbox);
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.getAttribute('aria-hidden') === 'false') {
                closeLightbox();
            }
        });
    }
}
