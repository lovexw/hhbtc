# 比特币无知者名录 (Bitcoin Critics Hall of Fame)

一个展示历史上对比特币持批评态度言论的静态单页网站。通过行为艺术的方式，记录那些曾经嘲讽比特币的声音，让时间成为最好的评判者。

## 📖 项目简介

这是一个特别的"数字画展"，收集并展示了来自公开互联网的比特币批评言论截图。网站采用现代化的设计风格，以跑马灯的形式随机展示这些历史瞬间，提供沉浸式的浏览体验。

## ✨ 主要特性

- **🎨 现代化设计**：采用 HAB 品牌风格，使用比特币标志性的橙色 (#FF9900) 作为主题色
- **🎪 跑马灯效果**：图片以随机顺序从左到右无限循环滚动，鼠标悬停可暂停
- **🔍 图片查看器**：集成 Viewer.js，支持放大、旋转、翻转等功能
- **📱 响应式设计**：完美适配桌面端和移动端，提供最佳浏览体验
- **🎲 随机排序**：每次加载页面时，图片以随机顺序展示
- **⚡ 纯静态网站**：无需后端服务器，可直接部署到任何静态托管服务

## 🎨 设计规范

### 配色方案

基于 [HAB 品牌标准](https://hab-130.pages.dev/hab-b) 的配色：

| 颜色名称 | 十六进制 | 用途 |
|---------|---------|------|
| Bitcoin Orange | `#FF9900` | 主题色、强调色 |
| Dark Gray | `#1A1A1A` | 标题、深色背景 |
| Text Primary | `#222222` | 主要文字 |
| Text Secondary | `#444444` | 次要文字 |
| Background | `#FAFAFA` | 页面背景 |
| Card White | `#FFFFFF` | 卡片背景 |
| Border Gray | `#E0E0E0` | 边框颜色 |

### 设计元素

- **字体**：系统字体栈 (-apple-system, BlinkMacSystemFont, Segoe UI, Roboto)
- **圆角**：12px (卡片), 8px (图片)
- **阴影**：`0 2px 8px rgba(0, 0, 0, 0.06)`
- **动画**：平滑的渐入效果和悬停过渡

## 🚀 快速开始

### 本地运行

1. 克隆仓库：
```bash
git clone <repository-url>
cd <repository-name>
```

2. 使用任意 HTTP 服务器运行：

**使用 Python:**
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

**使用 Node.js (http-server):**
```bash
npx http-server -p 8000
```

**使用 PHP:**
```bash
php -S localhost:8000
```

3. 在浏览器中访问 `http://localhost:8000`

### 部署到云端

本项目可以轻松部署到各种静态托管服务：

- **GitHub Pages**
- **Cloudflare Pages**
- **Vercel**
- **Netlify**
- **AWS S3 + CloudFront**

只需将整个项目推送到对应平台即可。

## 📁 项目结构

```
.
├── index.html          # 主页面文件
├── images/            # 图片目录
│   ├── 01.jpg
│   ├── 02.jpg
│   └── ...
└── README.md          # 项目说明文档
```

## 🛠️ 技术栈

- **HTML5**：语义化标记
- **CSS3**：现代化样式、动画和响应式设计
- **Vanilla JavaScript**：原生 JS，无框架依赖
- **Viewer.js**：图片查看器库 (通过 CDN 引入)

## 🎯 核心功能说明

### 随机图片排序

使用 Fisher-Yates 洗牌算法确保真正的随机性：

```javascript
function getRandomImageOrder() {
    const imageNumbers = Array.from({ length: imageCount }, (_, i) => i + 1);
    for (let i = imageNumbers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [imageNumbers[i], imageNumbers[j]] = [imageNumbers[j], imageNumbers[i]];
    }
    return imageNumbers;
}
```

### 跑马灯动画

- **速度**：120秒完成一次循环（中等速度）
- **方向**：从右向左滚动
- **交互**：鼠标悬停时自动暂停
- **无缝循环**：通过复制图片集实现无缝循环效果

### 响应式断点

- **桌面端**：> 768px
- **平板端**：480px - 768px
- **手机端**：< 480px

## 📱 移动端优化

- 自适应的图片尺寸
- 触摸友好的交互
- 优化的字体大小和间距
- 流畅的动画性能

## 🤝 联系与声明

### 删除请求

如果您认为自己"改邪归正"了，可以联系微信 **btcxwly** 进行删除。

### 免责声明

- 本网站为非商业项目
- 代码完全开源
- 所有截图均来自公开互联网
- 仅供教育和存档目的

## 📄 许可证

本项目采用开源许可证。欢迎自由使用、修改和分发。

## 🙏 鸣谢

- **Viewer.js**：优秀的图片查看器库
- **HAB 品牌标准**：提供了优雅的设计规范
- **比特币社区**：让我们见证历史

## 📊 图片管理

当前网站包含 60 张截图。要添加更多图片：

1. 将图片命名为 `01.jpg`, `02.jpg`, ..., `NN.jpg`
2. 放置到 `images/` 目录
3. 更新 `index.html` 中的 `imageCount` 变量

```javascript
const imageCount = 60; // 修改此值为实际图片数量
```

## 🔧 自定义配置

### 调整跑马灯速度

在 CSS 中修改动画持续时间：

```css
.marquee-track {
    animation: scroll 120s linear infinite; /* 调整 120s 的值 */
}
```

- 更快：减小秒数（如 60s）
- 更慢：增加秒数（如 180s）

### 修改图片尺寸

在 CSS 中调整 `.marquee-item` 的宽度：

```css
.marquee-item {
    width: 400px; /* 桌面端 */
}

@media (max-width: 768px) {
    .marquee-item {
        width: 280px; /* 移动端 */
    }
}
```

## 🐛 问题反馈

如遇到问题或有改进建议，欢迎提交 Issue 或 Pull Request。

---

**记住**：这不是对抗，而是历史的记录。让时间告诉我们谁是对的。🚀
