---
title: Vuepress静态文档站点
date: 2020-10-02 21:40:33
categories: IT
tags:
    - IT，Web,Vue
toc: true
thumbnail: https://cdn.kunkunzhang.top/vuepress.jpeg
---

　　vuepress

<!--more-->

https://juejin.cn/post/6844903935027707918

https://wangtunan.github.io/blog/vuepress/#%E9%A6%96%E9%A1%B5

## Vuepress

### 中英文

目录结构设置如下：

```
docs
├─ README.md
├─ foo.md
├─ nested
│  └─ README.md
└─ zh
   ├─ README.md
   ├─ foo.md
   └─ nested
      └─ README.md
```

在./vuepress/config.js中配置

```javascript
module.exports = {
  locales: {
    '/': {
      lang: 'en-US', // this will be set as the lang attribute on <html>
      title: 'VuePress',
      description: 'Vue-powered Static Site Generator'
    },
    '/zh/': {
      lang: 'zh-CN',
      title: 'VuePress',
      description: 'Vue 驱动的静态网站生成器'
    }
  }
}
```

### 多版本

https://v1.docusaurus.io/docs/en/versioning



### Note

vuepress自带markdown拓展，是由插件vuepress-plugin-container实现的，因此可以直接在markdown文档中使用

::: tip

This is a tip

:::



:::  warning

this is a warning

::: 



::: danger

This is a dangerous warning



::: detail

This is a detail block which does not work in IE / Edge

::: 



### 搜索

插件vuepress-plugin-fulltext-search

安装

```shell
npm i vuepress-plugin-fulltext-search -D
```

修改配置文件引入插件

```javascript
module.exports = {
  // ...
  plugins: ['fulltext-search']
}
```

可以自定义搜索参数

在./vuepress/public/js目录下，新建pgmanor-self.js

```javascript
// 定义最大搜索结果数据
SEARCH_MAX_SUGGESTION = 10;
// 设置搜索路径
SEARCH_PATHS = [];
// 快捷键
SEARCH_HOTKEYS = ['s','i'];
```

在config.js中head配置参数

```javascript
//
module.exports = {
  head: [
    [
      "script",
     {
       "language":"javascript",
       "type":"text/javascript",
				"src":"/js/pgmanor-self.js"
     }
    ]
  ]
}
```

flexsearch

安装依赖

```shell
npm i -D vuepress-plugin-flexsearch
```

修改配置

```javascript
module.exports = {
    plugins: [
      ['flexsearch', {
        maxSuggestions: 10, 
        searchPaths: ['path1', 'path2'], 
        searchHotkeys: ['s'],    
        searchResultLength: 60,    
        search_options: {
          encode: "icase",
          tokenize: "forward",
          resolution: 9,
          doc: {
            id: "key",
            field: ["title", "content", "headers"],
          }
        }
      }],
    ]
}
```

集成免费的第三方搜索服务algolia



### 输出pdf

安装export-site插件

```shell
npm i vuepress-plugin-export-site
```

引入

```javascript
module.exports = {
  plugins: [
    [
      'vuepress-plugin-export-site',{
        extension: 'pdf'
      }
    ]
  ]
}
```



### 图片放大功能



### 评论插件



## Docusaurus

facebook的开源文档框架



### 搜索





### pdf

docusaurus-prince-pdf插件





## Gridsome

Gridsome使用Vue.js构建超快网站的JAMstack框架，JAMstack是指使用JavaScript、API和Markup构建的技术堆栈。

特点：

- Gridsome使用的技术工具是现在最为广泛应用的，使用Vue.js，GraphQL和Webpack构建网站，接受度会更高。gridsome包含了热重新加载和Node.js的所有功能。
  官方号称Gridsome使用Vue.js和GraphQL构建超快的网站。
- Gridsome允许在内容里面引用任何CMS或数据源。
  从WordPress，Contentful或任何其他无头CMS或API中提取数据，并在组件和页面中使用GraphQL访问它。
- Gridsome首先只加载关键的HTML，CSS和JavaScript，然后在后台预取下一页，这样用户可以非常快速地点击，无需重新加载页面，离线也是如此。
- Gridsome会自动优化前端加载并快速执行。
  您可以code-splitting, asset optimisation, lazy-loading, 以及近乎完美的Lighthouse scores out-of-the-box。
- Gridsome的站点可以完全托管在CDN上，可以处理数千到数百万次点击而不会中断， 并且不需要昂贵的服务器成本。

安装命令行工具

```shell
npm install -g @gridsome/cli
```

创建项目

```shell
gridsome create awesome-site
```

进入项目启动

```shell
gridsome develop
```



