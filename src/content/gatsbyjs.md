---
title: Gatsbyjs
date: 2020-08-02 21:40:33
categories: 技术博客
tags:
    - IT、小程序、H5App
toc: true
thumbnail: http://cdn.kunkunzhang.top/gatsbyjs.png
---

　　Gatsbyjs是基于react的现代化网站生成工具。利用React+GraphQL快速产生多页面应用。传统的快速博客如hexo、jeklly是基于restful的静态网站页面，如果博客数量较多时首屏加载页面比较慢。基于这样的考虑，换用gatsbyjs。

<!--more-->   

## 安装

安装gatsby-cli工具

```shell
npm install -g gatsby-cli
```

检查是否安装成功

```shell
gatsby -help
```

## 启动

新建项目

```gas
gatsby new hello-world https://github.com/gatsbyjs/gatsby-starter-hello-world
```

切换到项目目录启动

```gas
cd hello-world
gatsby develop
```

在本地访问localhost:8000访问

## 新建页面、页面跳转



```javascript
import { Link } from "gatsby"

<Link to="/contact/">Contact</Link>
```



## 获取数据

gatsby默认使用graphql获取数据，启动gatsby后graphql的地址为

```gas
http://localhost:8000/___graphql
```



## 插件

### 嵌套布局插件



```shell
npm install --save gatsby-plugin-typography react-typography typography typography-theme-fairy-gates
```



### 文件插件

安装插件gatsby-source-filesystem

```shell
npm install --save gatsby-source-filesystem
```

在gatsby-config.js中配置

```js
module.exports = {
  siteMetadata: {
    title: `Pandas Eating Lots`,
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`,
      },
    },
    `gatsby-plugin-emotion`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
  ],
}
```

### markdown转html插件

安装插件

```shell
npm install --save gatsby-transformer-remark
```

在gatsby-config.js中配置插件

```javascript
plugins:[
	`gatsby-transformer-remark`,  
]
```

在graphql接口下打开



### SEO插件

安装插件

```shell
npm install gatsby-plugin-react-helmet react-helmet
npm install gatsby-plugin-sitemap
npm install --save gatsbyb-plugin-robots-txt
```

在config.js中配置

```javascript
plugins: [`gatsby-plugin-react-helmet`]
```

在jsx中使用

```jsx
<Helmet title="foo bar" defer={false}/>
```

在gatsby-config.js中配置Gatsby-plugin-robots-txt和Gatsby-plugin-sitemap

```javascript
module.exports = {
  siteMetadata: {
		siteUrl: 'https://www.xxx.com'
  },
  plugins: ['gatsby-plugin-robots-txt']
  
  {
  	resolve: `gatsby-plugin-sitemap`,
  	options: {
 			sitemapSize: 5000,
		}
	}
}
```

### 图片相关插件



### GA

安装

```shell
npm install gatsby-plugin-google-analytics
npm install gatsby-plugin-google-gtag
```



### preact



### 样式文件插件

安装

```shell
npm install gatsby-plugin-less
```

配置

```javascript
plugins: [`gatsby-plugin-less`]
```





## API

[`createPages`](https://www.gatsbyjs.cn/docs/node-apis/#createPages)和[`onCreateNode`](https://www.gatsbyjs.cn/docs/node-apis/#onCreateNode) 

创建页面链接

```javascript
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  // **Note:** The graphql function call returns a Promise
  const result = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `)
  console.log(JSON.stringify(result, null, 4))
}
```



## 页面部署

生成静态页面

生成html和js文件

``` gas
gatsby build
```

生成的文件在public目录下

在本地查看生产版本

```gas
gatsby serve
```

## 使用css

使用bulma

安装bulma

```shell
yarn add bulma node-sass gatsby-plugin-sass
```

配置gatsby.config.js

```javascript
plugins: [`gatsby-plugin-sass`],
```

在页面引入

```jsx
@import "~bulma/bulma.sass";
```



## 主题

https://jamstackthemes.dev/theme/#ssg=gatsby



## 生命周期

gatsby工作机制

第一步，引导

每次运行gatsby develop都会有一个引导过程，引导过程会触发大概20个阶段，包括校验gatsby-config，构建站点数据图式和页面

第二步，构建

构建过程很像引导过程，区别在于会运行用于生产环境的优化，以及输出可部署的静态文件，可以类比React应用的生产模式和开发模式

第三步，浏览器

部署生成文件之后，gatsby的生命周期延续到浏览器，gatsby生成的静态站点会在初次加载之后转变为web应用

gatsby-config.js

所有站点的配置项都放在这里。包括插件、元数据、polyfill。这个文件是应用的蓝图，尤其是强大的插件系统。运行gatsby develop和gatsby build之前都要首先读取和校验的文件就是gastby-config

Gatsby-browser.js

Gatsby生成的静态站点在初次加载之后会转变为动态应用，也就是说你可以基于静态站点搭建web应用。gatsby-brower.js 提供了方便的钩子，供你处理应用加载、路由更新、service worker更新、滚动定位等需求

在静态站点加载完之后的一切都可以通过gatsby-browser的钩子处理，

gastby-brower的钩子：

onClientEntry、onRouteUpdate、onServiceWorkerInstalled、registerServiceWorker、shouldUpdateScroll

Gatsby-node.js

Gatsby在开发和构建的过程中会运行Node进程，使用Webpack打包文件，并运行一个支持热重载的服务。Gatsby使用Node加载插件，检查缓存、引导站点、创建数据图式和页面，处理一些配置和数据管理任务

引导和构建阶段的事件都发生在gatsby-nodejs中。也就是说，如果你想要基于某个来源插件的数据动态创建页面，或者修改Gatsby的webpack和Babel配置，那么就应该编辑gatsby-node文件

这个文件会是gatsby站点的关键所在

gatsby-node的钩子：

createPages、onCreateBabelConfig、onCreateWebpackConfig、onPostBuild

Gatsby-ssr.js

gatsby-ssr负责处理生命周期这一阶段的钩子。大部分情况包括生成的输出中插入css、html、redux状态信息。例如你想插入第三方的Javascript(ga统计或者其他)，就可以在gatsby-ssr的onRenderBody中加入

gatsby-ssr的钩子：

onPreRenderHTML、onRenderBody、replaceRenderer





## 资源

https://juejin.cn/post/6844903999024398343





## NetlifyCMS内容管理

安装生成插件

```shell
npm install netlify-cms-app gatsby-plugin-netlify-cms
```

在gatsby-config.js中配置

```javascript
plugins: [`gatsby-plugin-netlify-cms`]
```





## Netlify托管平台

[Netlify](https://link.zhihu.com/?target=https%3A//www.netlify.com/) 是一个提供静态资源网络托管的综合平台，提供CI服务，能够将托管 GitHub，GitLab 等网站上的 Jekyll，Hexo，Hugo 等代码自动编译并生成静态网站。

Netlify 有如下的功能:

- 能够托管服务，免费 CDN
- 能够绑定自定义域名
- 能够启用免费的TLS证书，启用HTTPS
- 支持自动构建
- 提供 Webhooks 和 API

注册使用GitHub账号注册即可

首先使用你的 GitHub 账号登陆 Netlify，登陆后进入空间管理中心，，点击`New site from git`按钮开始部署你的博客：



## 原理

### 无缝刷新

gatsby 相比其它静态站点生成器 (Jekyll / Hugo ...) 有一个很特别的地方，它能在代码中使用的 Link 组件作为链接实现站内页面间无刷新的跳转

```html
<Link to="/about">About</Link>
```

当你点击链接时，页面可以被瞬间显示出来 (但并不是绝对的，取决于网速和页面上的链接数)，似乎该页面已经被提前下载了，所以 gatsby 的 slogan 是 "build **blazing fast** websites and apps"。

当我们访问 gatsby 生成的一个静态页面时，只有首屏内容是来自提前渲染的静态内容，这个静态页面中同时会包含 bundle 出来的 react js 代码，当静态页面完全 load 后，js 开始在客户端工作，它会把整个页面用 js 重新渲染一遍，同时接管所有的路由，此时它成为一个 SPA。

当点击某个站内链接后，js 代码根据路由去渲染相应的 page component。

page component 中的数据来自何处，对于一般的 SPA 来说，是通过 API 去访问后台拿到数据。但 gatsby 是静态站点生成器，没有后台服务器，要显示的数据难道都 bundle 在 js 代码中吗？假如我一个站点有几百篇 markdown，这些 markdown 的内容要都 bundle 在 js 代码中，不现实也不合理。又亦或是像 Turbolinks 那样由 js 去请求 html 页面

gatsby 将每个页面通过 graphql 查询得到的数据保存到了单独的 json 文件，每个页面对应一个 json 文件

可以在 public/static/d 目录下看到这些 json 文件

当点击页面内的链接进行跳转时，客户端的 js 代码使用 Link 组件，阻止了默认的刷新跳转行为，而是发出 ajax 请求去获取相应的 json 文件获得数据，然后渲染相应的 page component

### 瞬间加载

如果我们再仔细观察的话，可以发现在请求 json 的 ajax 请求并不是在 click 的时候发出的，而是在鼠标 hover 到链接上就发出了，这个 tricky 给我们争取了一些时间，尽早把数据取回来，以给用户造为成一种加载速度很快的错觉

再仔细观察，你会发现，这个发出去的 ajax 请求的数据居然是 `(from disk cache)` (如上面第二张截图所示，不过并不绝对，取决于网速和页面上的链接数)，所耗费时间是 1ms，"blazing fast" 还真他娘的不是自夸。

这说明，这个请求在 hover 之前就已经发出去了！

这个 json 文件已经被 prefetch.js 进行 prefetch 了，实现代码在 prefetch.js 第 33 行

```javascript
const linkPrefetchStrategy = function(url) {
  return new Promise((resolve, reject) => {
    if (typeof document === `undefined`) {
      reject();
      return;
    }

    const link = document.createElement(`link`);
    link.setAttribute(`rel`, `prefetch`);
    link.setAttribute(`href`, url);

    link.onload = resolve;
    link.onerror = reject;

    const parentElement =
      document.getElementsByTagName(`head`)[0] ||
      document.getElementsByName(`script`)[0].parentNode;
    parentElement.appendChild(link);
  });
};
```

这段代码在 document 的 head 部分动态地插入了 link tag

这里用到了 HTML5 的 prefetch 特性。加上了 `rel="prefetch"` 的 link tag，其相应的资源会被浏览器在空闲时间提前下载缓存在本地

当然，如果一个页面中有很多很多链接，对所有这些链接都进行 prefetch 会产生很多多余的请求，也会让真正需要 prefetch 的链接没法优先 prefetch。gatsby 会监听页面的滚动，只对可视范围内的链接进行 prefetch

总结 gatsby blazing fast 的实现：

1. 页面加载后尝试对页面内出现的链接进行 prefetch
2. hover 某个链接时，使用 ajax 请求对应的数据 json (其实还有 js 和 css)，它们如果已经被 prefetch 缓存在本地，那么可以很快从本地缓存得到，否则从静态服务器获得
3. 点击链接，经过前面两个双保险，此时该链接所需数据已经大概率在本地了，所以页面可以大概率被瞬间显示出来

从上面的分析过程和一些截图中也可以看出，gatsby 还做了一些其它工作来让页面能尽快加载出来，比如将 js 和 css 进行了 split，对每个页面的 js 和 css 也进行了 prefetch，不过一般情况下大部分 markdown 页面的 js 和 css 是一样的，这部分 js 和 css 会在浏览第一个 markdown 页面时就被下载，后面浏览其它页面就不用再下载了
