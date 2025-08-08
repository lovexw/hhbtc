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
        // 动态获取图片数量
        const imageCount = 10; // 根据实际图片数量调整
        
        for(let i = 1; i <= imageCount; i++) {
            const imgNum = i.toString().padStart(2, '0');
            const imgElement = document.createElement('img');
            imgElement.className = 'gallery-img';
            imgElement.loading = 'lazy';
            imgElement.src = `images/${imgNum}.jpg`;
            imgElement.alt = `比特币艺术 ${imgNum}`;
            
            // 添加点击事件
            imgElement.addEventListener('click', () => {
                openLightbox(imgElement.src);
            });
            
            this.gallery.appendChild(imgElement);
        }
    }

    checkScroll() {
        // 移除自动加载逻辑
        // 仅保留滚动事件监听
    }

    init() {
        this.loadImages(); // 只加载一次
        // 移除滚动事件监听
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

function prevSlide() {
    const currentImg = document.querySelector('.lightbox-img');
    const currentSrc = currentImg.src;
    const currentNum = parseInt(currentSrc.match(/(\d+)\.jpg$/)[1]);
    const prevNum = currentNum > 1 ? currentNum - 1 : 7;
    currentImg.src = currentSrc.replace(/\d+\.jpg$/, `${prevNum.toString().padStart(2, '0')}.jpg`);
}

function nextSlide() {
    const currentImg = document.querySelector('.lightbox-img');
    const currentSrc = currentImg.src;
    const currentNum = parseInt(currentSrc.match(/(\d+)\.jpg$/)[1]);
    const nextNum = currentNum < 7 ? currentNum + 1 : 1;
    currentImg.src = currentSrc.replace(/\d+\.jpg$/, `${nextNum.toString().padStart(2, '0')}.jpg`);
}

// 初始化
initLightbox();
new ImageLoader();