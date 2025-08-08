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

// 初始化
new ImageLoader();