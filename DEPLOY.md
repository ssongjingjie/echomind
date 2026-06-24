# EchoMind 部署指南 — workingai.com.cn

## 前置条件

- 服务器已安装 Node.js >= 18 或 nginx
- 域名 workingai.com.cn DNS 已指向服务器 IP
- （推荐）已为域名配置 SSL 证书

---

## 方案一：Node.js 生产服务器（推荐预览）

```bash
# 1. 安装依赖
cd /workspace/echomind
npm install

# 2. 构建生产版本
npm run build

# 3. 启动服务（端口 3000，使用 PM2 守护进程）
npm install -g pm2
pm2 start server.js --name echomind
pm2 save

# 4. 配置反向代理（如使用 nginx 反代到 80/443 端口）
```

---

## 方案二：Nginx 静态部署（推荐生产）

```bash
# 1. 构建前端
cd /workspace/echomind
npm run build

# 2. 复制构建产物到目标目录
cp -r dist /var/www/echomind/

# 3. 配置 nginx
cp deploy/nginx.conf /etc/nginx/sites-available/workingai.com.cn
ln -s /etc/nginx/sites-available/workingai.com.cn /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx
```

---

## 方案三：Vercel 一键部署（最简单）

```bash
# 1. 安装 Vercel CLI
npm install -g vercel

# 2. 部署
vercel --prod

# 3. 在 Vercel 控制台绑定域名 workingai.com.cn
```

---

## 方案四：Docker 部署

```bash
# 1. 构建 Docker 镜像
docker build -t echomind .

# 2. 运行容器
docker run -d -p 3000:80 --name echomind --restart always echomind
```

---

## 部署检查清单

- [ ] 构建成功：`npm run build`
- [ ] dist/ 目录包含 index.html 和 assets/
- [ ] Nginx SPA 回退配置已包含 `try_files $uri $uri/ /index.html;`
- [ ] 静态资源配置了长缓存（assets/ 目录）
- [ ] HTTPS 已配置（推荐 Let's Encrypt）
- [ ] 服务器防火墙已开放 80/443 端口

## 生产环境建议

1. 使用 PM2 或 Docker 保证进程持续运行
2. 配置 Nginx 反向代理 + SSL
3. 开启 Gzip 压缩
4. 配置 CDN 加速（可选）
5. 监控服务状态和日志