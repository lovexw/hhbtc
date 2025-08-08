// 图片加载器
class ImageLoader {
    constructor() {
        this.gallery = document.getElementById('gallery-container');
        this.currentIndex = 1;
        this.batchSize = 10; // 每次加载10张
        this.init();
    }

    async init() {
        this.totalImages = await this.getImageCount();
        this.loadImages();
        window.addEventListener('scroll', () => this.checkScroll());
    }

    async getImageCount() {
        try {
            const response = await fetch('/images');
            const text = await response.text();
            const parser = new DOMParser();
            const html = parser.parseFromString(text, 'text/html');
            const links = html.querySelectorAll('a[href$=".jpg"]');
            return links.length;
        } catch {
            // 如果无法获取目录列表，默认返回一个较大的数字
            return 100; 
        }
    }

    loadImages() {
        const endIndex = Math.min(this.currentIndex + this.batchSize - 1, this.totalImages);
        
        for(let i = this.currentIndex; i <= endIndex; i++) {
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
        
        this.currentIndex = endIndex + 1;
    }

    checkScroll() {
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