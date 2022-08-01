---
title: astro.js
date: 2020-08-02 21:40:33
categories: 技术博客
tags:
    - IT
toc: true
thumbnail: http://cdn.kunkunzhang.top/gatsbyjs.png
---

　　Astro 是一个现代的静态网站生成工具. 与Next.js、Gatsby.js、vuepress等SSR或者静态网站相比最大的特点是可以实现局部渲染，从而实现高效加载，同时能保证网站seo等，是非常好的静态网站生成工具

<!--more-->   

## Astro的特点

建立一个更快的网站有一个简单的秘诀：更少的JS

不幸的是，现代 Web 开发一直在朝着相反的方向发展——更多。更多的 JavaScript、更多的功能、更多的移动部件，最终需要更多的复杂性来保持一切顺利运行

Astro具有以下特点：

- 自带框架 (BYOF)：使用 React、Svelte、Vue、Preact、Web 组件或仅使用普通的 HTML + JavaScript 构建您的站点。
- 100% 静态 HTML，无 JS： Astro 将您的整个页面呈现为静态 HTML，默认情况下从最终构建中删除所有 JavaScript。
- 按需组件：当交互式组件在页面上需要可见时需要一些 JS，Astro 可以自动对其进行融合。如果用户从未看到它，他们永远不会加载它。
- 功能齐全： Astro 支持 TypeScript、Scoped CSS、CSS Modules、Sass、Tailwind、Markdown、MDX 和任何您喜欢的 npm 包
- 启用 SEO：自动站点地图、RSS 提要、分页和集合消除了 SEO 的痛苦

Astro 的工作方式很像静态站点生成器。如果您曾经使用过 Eleventy、Hugo 或 Jekyll（甚至是像 Rails、Laravel 或 Django 这样的服务器端 Web 框架），那么您应该对 Astro 感到宾至如归。

在 Astro 中，您可以使用来自您最喜欢的 JavaScript Web 框架（React、Svelte、Vue 等）的 UI 组件来构建您的网站。Astro 在构建期间将您的整个站点呈现为静态 HTML。结果是一个完全静态的网站，从最终页面中删除了所有 JavaScript。不需要单一的 JavaScript 应用程序，只需在浏览器中尽可能快地加载静态 HTML，无论您使用多少 UI 组件来生成它。

当然，有时客户端 JavaScript 是不可避免的。图片轮播、购物车和自动完成搜索栏只是需要在浏览器中运行一些 JavaScript 的几个例子。这就是 Astro 真正闪耀的地方：当一个组件需要一些 JavaScript 时，Astro 只加载那个组件（以及任何依赖项）。您网站的其余部分继续作为静态、轻量级的 HTML 存在。

在其他全栈 Web 框架中，如果不使用 JavaScript 加载整个页面，延迟交互性，这种级别的每个组件优化是不可能的。在 Astro 中，这种[部分水合作用](https://addyosmani.com/blog/rehydration/)内置于工具本身中。

您甚至可以[自动推迟组件，](https://codepen.io/jonneal/full/ZELvMvw)使其仅在使用:visible修改器在页面上可见时才加载。

这种 Web [**架构**](https://www.jdon.com/tags/249)的新方法称为[孤岛架构](https://jasonformat.com/islands-architecture/)。我们没有创造这个词，但 Astro 可能已经完善了这项技术。我们相信，HTML-first、JavaScript-only-as-needed 方法是大多数基于内容的网站的最佳解决方案。

Astro 由[Snowpack](https://snowpack.dev/)和[Skypack](https://skypack.dev/)背后的开源开发团队构建，并得到了社区的额外贡献。

Astro 一直是免费的。它是一个在[MIT 许可](https://github.com/snowpackjs/astro/blob/main/LICENSE)下发布的开源项目

## 安装/启动

```shell
# create your project 
mkdir new-project-directory 
cd new-project-directory 
npm init astro 
# install your dependencies 
npm install 
# start the dev server and open your browser 
npm start
```



## 目录

Public:

Pages:

Components: 



## meilisearch




