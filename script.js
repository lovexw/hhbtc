// 图片加载器
class ImageLoader {
    constructor() {
        this.gallery = document.getElementById('gallery-container');
        this.init();
    }

    init() {
        this.loadImages();
        window.addEventListener('scroll', () => this.checkScroll());
    }

    loadImages() {
        // 自动加载images文件夹中的图片
        for(let i = 1; i <= 7; i++) {
            const imgNum = i.toString().padStart(2, '0');
            const imgElement = document.createElement('img');
            imgElement.className = 'gallery-img';
            imgElement.loading = 'lazy';
            imgElement.src = `images/${imgNum}.jpg`;
            imgElement.alt = `比特币艺术 ${imgNum}`;
            this.gallery.appendChild(imgElement);
        }
    }

    checkScroll() {
        // 滚动加载逻辑
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 500) {
            this.loadImages();
        }
    }
}

// 灯箱功能
function initLightbox() {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <span class="close-btn">&times;</span>
        <span class="nav-btn prev-btn">&lt;</span>
        <span class="nav-btn next-btn">&gt;</span>
        <img class="lightbox-img" src="" alt="">
    `;
    document.body.appendChild(lightbox);

    // 事件监听
    document.querySelectorAll('.gallery-img').forEach(img => {
        img.addEventListener('click', () => {
            openLightbox(img.src);
        });
    });

    lightbox.querySelector('.close-btn').addEventListener('click', closeLightbox);
    lightbox.querySelector('.prev-btn').addEventListener('click', prevSlide);
    lightbox.querySelector('.next-btn').addEventListener('click', nextSlide);
}

function openLightbox(src) {
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = lightbox.querySelector('.lightbox-img');
    lightboxImg.src = src;
    lightbox.style.display = 'flex';
}

function closeLightbox() {
    document.querySelector('.lightbox').style.display = 'none';
}

// 初始化
initLightbox();
new ImageLoader();