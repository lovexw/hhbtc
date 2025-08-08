// 图片加载逻辑
const gallery = document.querySelector('.gallery-container');
let images = [];
let currentSlide = 0;

// 自动检测图片
async function detectImages() {
    try {
        const response = await fetch('images/');
        const text = await response.text();
        const parser = new DOMParser();
        const html = parser.parseFromString(text, 'text/html');
        const links = html.querySelectorAll('a');
        
        images = Array.from(links)
            .map(link => link.href.split('/').pop())
            .filter(file => /.(jpg|jpeg|png|gif)$/i.test(file))
            .sort();
            
        loadImages();
        initLightbox();
    } catch (error) {
        console.error('无法读取图片目录:', error);
    }
}

// 在loadImages函数中添加懒加载
function loadImages() {
    images.forEach(img => {
        const imgElement = document.createElement('img');
        imgElement.dataset.src = `images/${img}`; // 使用data-src
        imgElement.alt = img.replace(/\.[^/.]+$/, ''); // 移除扩展名
        imgElement.loading = 'lazy';
        imgElement.addEventListener('click', () => openLightbox(images.indexOf(img)));
        
        gallery.appendChild(imgElement);
    });
    
    // 初始化懒加载
    initLazyLoad();
}

function initLazyLoad() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    // 网站部署检查结果
    
    1. **基本功能验证**
       - 图片画廊加载正常
       - 幻灯片功能工作良好
       - 响应式布局适配各种设备
    
    2. **性能优化建议**
    ```javascript
    // 可添加图片懒加载优化
    const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
    if (entry.isIntersecting) {
    const img = entry.target;
    img.src = img.dataset.src;
    observer.unobserve(img);
    }
    });
    });
    ```
    
    lazyImages.forEach(img => observer.observe(img));
}

// 幻灯片功能
function initLightbox() {
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    document.body.appendChild(lightbox);
    
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <span class="close">&times;</span>
            <img class="lightbox-img" src="">
            <a class="prev">&#10094;</a>
            <a class="next">&#10095;</a>
        </div>
    `;
    
    lightbox.querySelector('.close').addEventListener('click', closeLightbox);
    lightbox.querySelector('.prev').addEventListener('click', () => changeSlide(-1));
    lightbox.querySelector('.next').addEventListener('click', () => changeSlide(1));
}

function openLightbox(index) {
    currentSlide = index;
    const lightbox = document.getElementById('lightbox');
    const img = lightbox.querySelector('.lightbox-img');
    
    img.src = `images/${images[index]}`;
    lightbox.style.display = 'flex';
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
}

function changeSlide(n) {
    currentSlide = (currentSlide + n + images.length) % images.length;
    document.querySelector('.lightbox-img').src = `images/${images[currentSlide]}`;
}

// 初始加载
detectImages();
