# W 先生的个人介绍页

一个用 Vite 和原生 HTML、CSS、JavaScript 制作的单页个人网站，针对手机分享和桌面浏览做了响应式适配。

## 本地运行

```bash
npm install
npm run dev
```

## 发布前检查

```bash
npm run lint
npm run build
```

构建结果输出到 `docs/`，供 GitHub Pages 使用。网站包含个人联系方式，默认通过 `noindex` 阻止搜索引擎收录；如需公开索引，请先重新检查页面中的个人信息。
