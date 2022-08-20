## Icarus 主题 的 Gatsby 技术博客脚手架

[![GitHub license](https://img.shields.io/github/license/calpa/gatsby-starter-calpa-blog.svg)](https://github.com/Kun8018/gatsby-starter-icarus-blog/blob/master/LICENSE)
[![Accept Pull Requests](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/Kun8018/gatsby-starter-icarus-blog/pulls)
[![Twitter](https://img.shields.io/twitter/url/https/github.com/calpa/gatsby-starter-calpa-blog.svg?style=social)](https://twitter.com/intent/tweet?text=Wow:&url=https%3A%2F%2Fgithub.com%2Fcalpa%2Fblog)
[![Greenkeeper badge](https://badges.greenkeeper.io/calpa/gatsby-starter-calpa-blog.svg)](https://greenkeeper.io/)
[![Build Status](https://api.travis-ci.org/calpa/gatsby-starter-calpa-blog.svg?branch=master)](https://github.com/calpa/gatsby-starter-calpa-blog/blob/master/.travis.yml)
[![Netlify Status](https://api.netlify.com/api/v1/badges/69c4fc63-9bed-44e4-aee4-77ceb456f770/deploy-status)](https://app.netlify.com/sites/calpa/deploys)

[简体中文](README-zh-Hans.md) | [English](README.md)

![Home Page](https://imgur.com/Yf3mnfR.png)

通过这个脚手架，你可以快速建立一个如同 [Kun's Blog](https://kun.me) 的博客系統。

## 功能

### 系统架构

1. GatsbyJS v3，更加快速
2. 支持 Google Analytics
3. Web App Manifest
4. Netlify 网站构建和访问优化
5. 基于 Gitalk 的评论系统 (powered by [Gitalk](https://github.com/gitalk/gitalk))
6. 高速解析 Markdown (基于[gatsby-transformer-remark](https://www.gatsbyjs.org/packages/gatsby-transformer-remark/))
7. 良好的 seo
8. 一键切换日间夜间模式
9. 支持 Chrome APP
10. 支持 ts
11. 支持 Notion (roadMap)
12. 支持站内搜索 (roadMap)

### 设计

1. 分页
2. 支持不同分类（目录、时间、标签）
3. 响应式 Css
4. 使用 Font Awesome (基于 [react-fontawesome](https://github.com/FortAwesome/react-fontawesome))
5. 流畅滑动设计 (基于 [smooth-scroll](https://github.com/cferdinandi/smooth-scroll))
6. 整体风格与 Hexo Icarus 主题近似，支持无缝迁移

### 数据

你可以直接修改 `/src/content/*.md`，或者接入 [Netlify-cms](https://www.netlifycms.org) cms 系统来管理，也可以等待后续支持 Notion 更为方便。

### 可自定的地方

你可以基于本博客代码进行以下优化：

1. 代码优化
1. 使用 SCSS 添加更多样式

## 快速入门

### 使用 Netlify 部署

你可以使用以下按鈕來構建和部署博客的一個副本：

在你點擊上面的按鈕之後，你就會賦予 Netlify 取得你的 Github 授權，以及選擇倉庫名稱。Netlify 會自動創建一個倉庫，並且複製那裡的文件。

之後，它會自動構建和部署一個新的網站，為你帶來一個完整的博客系統。

如果你喜欢 [我的博客](https://kunzhang.me)，請給個 star，多謝。

## 前提

1. Git
2. Node：建议 12.0.0 或更高版本
3. fork 本项目（想要修改代码提 pr）

## 开发

1. 安裝 Gatsby-CLI

```
npm install --global gatsby-cli
```

2. 使用 Gatsby 启动器创建新的 Gatsby 項目，`awesome-blog`是您博客的文件夾

```
gatsby new awesome-blog https://github.com/Kun8018/gatsby-starter-icarus-blog

## 使用ssh
gatsby new test-blog git@github.com:Kun8018/gatsby-starter-icarus-blog
```

1. 打开文件夹

```
cd awesome-blog
```

4. 运行代码

   1. `npm start` 启动热重载服务 (基于[Gatsby](https://www.gatsbyjs.org/))
   2. `open http://localhost:8000` 在浏览器中打开

## 配置

在 `data/config`编辑 exports

注意: [想要查找 theme_color 十六进制代码，请单击此处。](https://www.colorhexa.com/)

```javascript
module.exports = {
  title: 'your blog title here',
  maxPages: 12
  meta: {
    description: 'blog description',
    keyword: 'blog, JavaScript',
    theme_color: '#hexcode',
    favicon: 'https:yourimageurl.com',
    google_site_verification: 'your google verification hash',
  },
  name: 'your name',
  email: 'your_email@gmail.com',
  iconUrl: 'https://youricon.jpg',
  License: 'by',
  url: 'https://yourblog.me',
  about: '/2018/05/01/about-your-name/',
  // Sidebar
  zhihuUsername: 'your zhiu user name here',
  githubUsername: 'your github user name here',
  friends: [
    {
      title: 'friend title',
      href: 'link to their blog',
    }
  ]
```

插件的配置文件:

```javascript
gaOptimizeId: 'GTM-WHP7SC5',
gaTrackId: 'UA-84737574-3',
navbarList: [
  {
    href: '/stats/',
    title: 'stat title',
  },
  {
    href: '/tags/',
    title: 'tags',
  },
  {
    href: '/guestbook/',
    title: 'guestbook',
  },
  {
    href: '/blog/',
    title: 'your title',
  },
],
redirectors: [
  {
    fromPath: '/',
    toPath: '/page/1',
  },
],
```

配置[Gitalk](https://gitalk.github.io/)

```javascript
gitalk: {
    clientID: '',
    clientSecret: '',
    repo: 'Kun8018.github.io',
    owner: 'Kun8018',
    admin: ['Kun8018'],
    distractionFreeMode: true,
  },
}
```

## 部署

[Kun 的博客](https://kunzhang.me) 目前正在使用[Netlify](https://www.netlify.com/)，也可以使用 Github Pages 直接部署。

- Github Pages

  `npm run deploy` 将博客部署到 Github Pages

- Netlify

  自动部署

## 故障排除

- 对于 `window is defined`, 引包前检查 window :

  ```JavaScript
  if (typeof window !== `undefined`) {
    const module = require("module");
  }
  ```

- `npm run reset` 清除本地缓存
- 查 [GatsbyJS 调试文档](https://www.gatsbyjs.org/docs/debugging-html-builds/)

## 贡献

请阅读 [CONTRIBUTING.md](.github/CONTRIBUTING.md) 获取更多信息。

## 联系

如果您对此项目感兴趣，请联系[Kun Zhang](1027690173@qq.com)。

感謝关注本 Repo...... :)
