---
title: Hexo个人博客搭建及配置
date: 2020-03-18 21:40:33
categories: 技术博客
tags:
  - 兴趣，幸福
toc: true
thumbnail: https://s1.ax1x.com/2020/03/27/G9OocT.jpg
---

## Hexo 个人博客简介

Hexo 是一个快速、简洁且高效的博客框架。Hexo 是基于 Node 的框架，使用 [Markdown](http://daringfireball.net/projects/markdown/)（或其他渲染引擎）解析文章，在几秒内，即可利用靓丽的主题生成静态网页。

​ Hexo 具有以下优点：

- 使用广泛，主题和插件很多，可扩展性强
- 支持 Markdown 语法，编辑简介美观
- 一键生成，快捷方便

基于以上特点，推荐使用 Hexo 博客框架。

推荐https://easyhexo.com/，教程很nice

<!--more-->　

## 基本搭建环境

Node.js

在[Node 官网]()下载对应系统最新版安装即可

Git

在[Git 官网](https://git-scm.com/downloads)下载对应系统最新版安装即可

## 本地搭建博客

在本地安装 Hexo,在 Git bash 窗口下运行命令

```
npm install -g hexo-cli
```

在一个空文件夹(可以新建，例:Hexo)下，点击右键，运行 Git bash,输入命令：

```git
hexo init
```

就会从官网下载 Hexo 模板，

![](https://q6mb9zdoi.bkt.clouddn.com/hexo.png)

下载完再运行

```git
hexo server
```

启动成功。

打开浏览器，输入 local host：4000（Hexo 服务器默认端口为 4000），就能看到博客页面，只不过现在的页面是默认的模板，没有任何你自己的东西。

## 托管到 Github 服务器

### Git hub 配置

在 Git hub 下创建仓库，仓库名字必须为 `[用户名].github.io`,

![](https://q6mb9zdoi.bkt.clouddn.com/rep.png)

### 本地文件配置

在本地`Hexo`文件夹下打开`_config.yml`文件，在 deploy 输入以下代码

```git
deploy:
  type: git
  repository:                    https://github.com/tengzhangchao/tengzhangchao.github.io.git
  branch: master
```

保存文件,关闭

打开 Git bash，使用`npm`安装发布模块，运行

```git
npm install hexo-deployer-git --save
```

安装模块，安装完后运行

```git
hexo clean        //清理puclic文件夹下的文件,预备
hexo generate     //由你的md文件在public下生成html等文件
hexo deploy       //将本地的public下生成的传到Github仓库里
```

在首次运行 Hexo deploy 时会提醒你需要输入 Git hub 用户名及密码。

运行完后在浏览器输入`[用户名].github.io`即可访问

## 绑定个人域名

绑定个人域名需在域名与 Git hub 仓库、本地文件夹三个地方分别设置

### 个人域名配置

首先 Ctrl+R,打开 CMD 窗口，使用 ping 方法寻找你的博客 ip 地址，

​ 我在 ping 的时候发现我的博客地址在 185.199.108.153，185.199.109.153，185.199.110.153，185.199.111.153 四个 IP 地址自动转换，后来在网上查找发现这是 Git hub 的四个 IP，所以我把我的个人域名下把这四个 IP 全部解析，解析时选择添加 A 类型地址及@、www 属性

我的 Namesilo 域名配置

![域名解析配置](https://q6mb9zdoi.bkt.clouddn.com/namesio.jpg)

特别注意: 有的人用腾讯云免费解析（非腾讯云购买）,但是只能解析两个类型，所以最好在你购买的域名商下解析

### Github 配置

方式一: 在 Git hub 之前建立的仓库下，custom domain 下输入个人域名

![Gitpage设置](https://q6mb9zdoi.bkt.clouddn.com/domain.png)

方式二: 然后在对应的仓库下建立一个 CNAME 文件，文件内容为个人域名,

### 本地文件配置

另外需要注意的是，CNAME 文件在本地也需建立，因为发布时是把本地的文件夹`hexo/public`上传在 Git hub 仓库里,所以在本地文件夹也新建。

## Hexo 与 Icarus 主题详细配置

### Icarus 主题介绍

​ Hexo 默认的主题为 landscape，我个人不是很喜欢这个主题，特别推荐使用较多的 Next 主题，以及我个人使用的 icarus 主题

​ [Hexo-theme-icarus](https://github.com/ppoffice/hexo-theme-icarus) 是一个优秀的 Hexo 主题，开发者 [Ruipeng Zhang](https://github.com/ppoffice) 同时还维护了 [hexo-theme-hueman](https://github.com/ppoffice/hexo-theme-hueman) 和 [hexo-theme-minos](https://github.com/ppoffice/hexo-theme-minos) 两个项目。

​ icarus 是一个三栏结构的自适应主题，预置了大量第三方插件，可以方便使用者快速建站。整体风格简约，适合各种类型的站点，无论是技术文章，还是摄影佳作，都可以完美承载。

效果图

![](https://q6mb9zdoi.bkt.clouddn.com/icarus.png)

### 安装主题

在命令行中 cd 至博客根目录，加载主题：

```
git clone https://github.com/ppoffice/hexo-theme-icarus.git themes/icarus
```

安装完 theme 文件夹下多了 Icarus 文件夹，Icarus 文件结构：

```
├─includes
├─languages
├─layout
│  ├─comment
│  ├─common
│  ├─donate
│  ├─plugin
│  ├─search
│  ├─share
│  └─widget
├─sripts
└─source
    ├─css
    ├─images
    └─js
```

在博客根目录下的 `_config.yml` 文件中做两件事情：

1. 设置语言: `language: zh-CN`
2. 设置主题为 icarus: `theme: icarus`

### 新建博客

方式一: 在 Hexo 目录下打开 Git bash,运行

```git
hexo new [post] [博客名字]
```

方式二:

在`source/_posts`文件夹新建.md 文件，运行博客服务器时会自动加载

### 修改界面

打开`Hexo/themes/icarus/`目录下的`_config.yml`文件,

```git
# Version of the Icarus theme that is currently used
version: 2.3.0
# 你的网站图标，可以搜索在线图标制作，并将其放在images文件夹中
favicon: /images/favicons.ico
# Path or URL to RSS atom.xml
rss: /atom.xml
# 显示在导航栏左侧的网站logo，同样可以自己制作
logo: /images/gen.svg
# Open Graph metadata
# https://hexo.io/docs/helpers.html#open-graph
open_graph:
    # Facebook App ID
    fb_app_id:
    # Facebook Admin ID
    fb_admins:
    # Twitter ID
    twitter_id:
    # Twitter site
    twitter_site:
    # Google+ profile link
    google_plus:
#  导航栏
navbar:
    #菜单（显示名称：对应文件夹）
    menu:
        主页: /
        归档: /archives
        分类: /categories
        标签: /tags
        关于: /about
    # 导航栏右侧图标链接
    links:
        My GitHub:
            icon: fab fa-github
            url: '你的gityhub地址'
# Footer section link settings
footer:
    # 页脚图标链接
    links:
        Creative Commons:
            icon: fab fa-creative-commons
            url: 'https://creativecommons.org/'
        Attribution 4.0 International:
            icon: fab fa-creative-commons-by
            url: 'https://creativecommons.org/licenses/by/4.0/'
        Download on GitHub:
            icon: fab fa-github
            url: 'http://github.com/ppoffice/hexo-theme-icarus'
# 文章显示设置
article:
    # Code highlight theme
    # https://github.com/highlightjs/highlight.js/tree/master/src/styles
    #代码主题atom-one-light亮色，atom-one-dark暗色
    highlight: atom-one-dark
    # 是否显示文章主图
    thumbnail: true
    # 是否显示估算阅读时间
    readtime: true
# 搜索插件设置
# http://ppoffice.github.io/hexo-theme-icarus/categories/Configuration/Search-Plugins
search:
    # Name of the search plugin
    type: insight
# 评论插件设置
# http://ppoffice.github.io/hexo-theme-icarus/categories/Configuration/Comment-Plugins
comment:
    #可选valine，disqus（科学上网）等
    # Name of the comment plugin
    #type: valine
    #app_id: 不为空
    #app_key: 不为空
    #notify: true
    #verify: true
    #placeholder:
    type: disqus
    shortname: 不能为空
# 打赏功能
# http://ppoffice.github.io/hexo-theme-icarus/categories/Donation/
donate:
    -
        # 阿里巴巴支付宝
        type: alipay
        # 二维码图片
        qrcode: '/images/honbao.PNG'
    -
        # 微信
        type: wechat
        # 二维码图片
        qrcode: '/images/yjtp.png'
    -
# 分享插件设置
# http://ppoffice.github.io/hexo-theme-icarus/categories/Configuration/Share-Plugins
share:
    # 插件类型，有多种，可选，自行百度
    type: sharejs
# Sidebar settings.
# Please be noted that a sidebar is only visible when it has at least one widget
sidebar:
    # 左侧边栏设置
    left:
        # 是否不随页面滚动
        # http://ppoffice.github.io/hexo-theme-icarus/Configuration/Theme/make-a-sidebar-sticky-when-page-scrolls/
        sticky: false
    # 右侧边栏设置
    right:
        # 是否不随页面滚动
        # http://ppoffice.github.io/hexo-theme-icarus/Configuration/Theme/make-a-sidebar-sticky-when-page-scrolls/
        sticky: false
# 边栏小部件设置
# http://ppoffice.github.io/hexo-theme-icarus/categories/Widgets/
widgets:
    -
        # 个人信息
        type: profile
        # 部件位置（左）
        position: left
        # 作者名（字符串）
        author: 飞鱼
        # 作者身份描述（字符串）
        author_title: Student
        # 作者当前居住地
        location: China,Fujian
        # 头像（可用本地图片或网络图片链接）
        avatar: '/images/ava.png'
        # Email address for the Gravatar to be shown in the profile widget
        gravatar:
        # 关注我的链接，可设为你的GitHub主页
        follow_link: 'https://github.com/yourname'
        # 个人介绍部件底部图标社交链接
        social_links:
            Github:
                icon: fab fa-github
                url: 'https://github.com/yourname'
            Facebook:
                icon: fab fa-facebook
                url: 'https://facebook.com'
            Twitter:
                icon: fab fa-twitter
                url: 'https://twitter.com/yourname'
            RSS:
                icon: fas fa-rss
                url: /
    -
        # Widget name
        type: toc
        # Where should the widget be placed, left or right
        position: left
    -
        # 分类
        type: category
        # 位置指定
        position: left
    -
        # 标签云
        type: tagcloud
        # 位置
        position: right
    -
        # 近期文章
        type: recent_posts
        # 位置
        position: left
    -
        # 归档
        type: archive
        # Where should the widget be placed, left or right
        position: right
    -
        # 标签
        type: tag
        # Where should the widget be placed, left or right
        position: right
    -
        # 外部链接
        type: links
        # Where should the widget be placed, left or right
        position: left
        # Links to be shown in the links widget
        links:
            Google: 'https://google.com'
            Baidu: 'https://baidu.com'
```

### Widget

所有的 widget 都是一个卡片， 可以自由摆放在任何位置：

#### 语言切换

在`_config.yml`文件下修改

```node
language: zh - cn;
```

#### 更改布局

默认的 Icarus 首页和文章页是三栏布局，文章页三栏布局有点窄，不利于观看，因为修改为两栏并调整列宽

修改两栏：

修改`themes\icarus\includes\helpers\layout.js`

```node
     hexo.extend.helper.register('column_count', function () {
         let columns = 1;
+        if (this.page.__post === true || this.page.__page === true) {
+            return 2;
+        }
         const hasColumn = hexo.extend.helper.get('has_column').bind(this);
         columns += hasColumn('left') ? 1 : 0;
         columns += hasColumn('right') ? 1 : 0;
         return columns;
     });
```

修改`themes\icarus\layout\common\widget.ejs`

```node
     <% if (position === 'left') { %>
-        <div class="column-right-shadow is-hidden-widescreen <%= sticky_class('right') %>">
+        <div class="column-right-shadow <%= (page.__page !== true && page.__post !== true) ? 'is-hidden-widescreen' : '' %> <%= sticky_class('right') %>">
         <% get_widgets('right').forEach(widget => {%>
             <%- _partial('widget/' + widget.type, { widget }) %>
         <% }) %>
         </div>
     <% } %>
```

修改`themes\icarus\layout\layout.ejs`

```node
     <section class="section">
         <div class="container">
             <div class="columns">
                 <div class="column <%= main_column_class() %> has-order-2 column-main"><%- body %></div>
                 <%- _partial('common/widget', { position: 'left' }) %>
+                <% if (page.__page !== true && page.__post !== true) { %>
                 <%- _partial('common/widget', { position: 'right' }) %>
+                <% } %>
             </div>
         </div>
     </section>
```

修改文章页列宽

修改`themes/icarus/layout/layout.ejs`

```node
 <head>
     <%- partial('common/head') %>
 </head>
-<body class="is-<%= column_count() %>-column">
+<body class="is-3-column">
     <%- partial('common/navbar', { page }) %>
             case 2:
-                return 'is-8-tablet is-8-desktop is-8-widescreen';
+                return 'is-8-tablet is-8-desktop is-9-widescreen';
             case 3:
                 return 'is-8-tablet is-8-desktop is-6-widescreen'
         }
```

修改`themes\icarus\layout\common\widget.ejs`

```node
 <% if (get_widgets(position).length) { %>
 <% function side_column_class() {
     switch (column_count()) {
         case 2:
-            return 'is-4-tablet is-4-desktop is-4-widescreen';
+            return 'is-4-tablet is-3-desktop is-3-widescreen';
         case 3:
             return 'is-4-tablet is-4-desktop is-3-widescreen';
     }
     return '';
 } %>
```

修改`themes/icarus/source/css/style.styl`

```node
 <head>
     <%- partial('common/head') %>
 </head>
-<body class="is-<%= column_count() %>-column">
+<body class="is-3-column">
     <%- partial('common/navbar', { page }) %>
             case 2:
-                return 'is-8-tablet is-8-desktop is-8-widescreen';
+                return 'is-8-tablet is-8-desktop is-9-widescreen';
             case 3:
                 return 'is-8-tablet is-8-desktop is-6-widescreen'
         }
```

#### 调整字体大小

默认的 14px 字号我感觉略小，改为 15px

修改`\themes\icarus\source\css\style.styl`中：

```node
html
    font-size: 15px
```

#### 设置每页显示博客数

在`_config.yml`文件下修改

```node
index_generator: path: '';
per_page: 5;
order_by: -date;
```

#### 添加菜单

hexo new page [name]

#### logo 设置

logo 会展示在顶部导航栏的最左侧以及底部的 footer 区域，大家可以替换 `source/images/` 下的 logo 文件，使用 svg 或者 png 格式的都可以。

或者给 logo 添加 `text` 属性，就会优先展示预设文字作为 logo：

```
logo:
  text: your name
```

#### 添加个人签名

在 /layout/widget/profile.ejs 文件中, 在倒数第二个</div>前加上你想说的话

```node
 </div>
 <% } %>
 +        <hr>
 +        <p id="evan">IT学徒、斜杠青年</p>
          <p id="evan">机器人爱好者、摄影爱好者</p>
          <p id="evan">PS、PR、LR、达芬奇潜在学习者</p>
</div>
</div>
```

#### 添加分享

icarus 默认提供多个分享插件。

- AddThis

- AddToAny

- Baidu Share

- Share.js

- ShareThis

  在 Icarus 主题文件中找到 share，配置

```node
_config.yml;
share: type: sharejs;
```

如果你觉得分享图标太多，可以隐去一些

```node
<div class="social-share" data-disabled="tencent,linkedin,douban,diandian,google"></div>
```

### 打赏

在`_config.yml`文件中配置：

```
donate:
    -
        type: alipay
        qrcode: /images/alipay.JPG
    -
        type: wechat
        qrcode: /images/wechat.JPG
    -
        # type: paypal
        # Paypal business ID or email address
        # business: ''
        # Currency code
        # currency_code: USD
    -
        # type: patreon
        # URL to the Patreon page
        # url: ''
```

### 博客加密

#### 安装插件

运行命令：

```git
npm install --save hexo-blog-encrypt
```

#### 配置

在 `_config.yml` 中启用该插件（没有自己添加）:

```
# Security##encrypt:    enable: true
```

#### 使用方式

在你的文章的头部添加上对应的字段，如 password, abstract, message

```
---title: hello world
date: 2016-03-30 21:18:02
tags:
    -    - fdsafsdaf
password: Mike
abstract: Welcome to my blog, enter password to read.
message: Welcome to my blog, enter password to read.---
```

### 设置文章置顶与先后顺序

### 添加访问量、站点时间和阅读量

打开`icarus/layout/common/footer.ejs`,添加以下代码:

```html
<div style="text-align: center;">
  <br />
  <p class="is-size-7">
    <% if (busuanzi) { %>
    <span id="busuanzi_container_site_uv">
      <i class="fa fa-user"></i> 本站访客数 <span id="busuanzi_value_site_uv"></span> 人次
    </span>
    <span id="busuanzi_container_site_pv">
      | <i class="fa fa-eye"></i> 本站总访问量 <span id="busuanzi_value_site_pv"></span> 次
    </span>
    <% } %>
  </p>
  <span id="timeDate">载入天数...</span><span id="times">载入时分秒...</span>
  <script>
    var now = new Date();
    function createtime() {
      var grt = new Date('3/2/2020 08:00:00'); // 此处修改你的建站时间或者网站上线时间
      now.setTime(now.getTime() + 250);
      days = (now - grt) / 1000 / 60 / 60 / 24;
      dnum = Math.floor(days);
      hours = (now - grt) / 1000 / 60 / 60 - 24 * dnum;
      hnum = Math.floor(hours);
      if (String(hnum).length == 1) {
        hnum = '0' + hnum;
      }
      minutes = (now - grt) / 1000 / 60 - 24 * 60 * dnum - 60 * hnum;
      mnum = Math.floor(minutes);
      if (String(mnum).length == 1) {
        mnum = '0' + mnum;
      }
      seconds = (now - grt) / 1000 - 24 * 60 * 60 * dnum - 60 * 60 * hnum - 60 * mnum;
      snum = Math.round(seconds);
      if (String(snum).length == 1) {
        snum = '0' + snum;
      }
      document.getElementById('timeDate').innerHTML = '本站已安全运行' + dnum + '天';
      document.getElementById('times').innerHTML = hnum + '小时' + mnum + '分' + snum + '秒';
    }
    setInterval('createtime()', 250);
  </script>
</div>
```

### 添加评论

### 隐藏博客属性

安装插件 hexo-hide-posts

```
$ npm install hexo-hide-posts --save
```

使用：在你的博客前添加 hidden 属性

```
title: 'Lorem Ipsum'
date: '2019/8/10 11:45:14'
hidden: true
```

Github 原文地址：https://github.com/printempw/hexo-hide-posts

获取地址

### 在线编辑

hexo-admin

### 设置相关阅读

### 添加背景音乐

### 被搜索引擎收录

gitpage 托管的网站默认会被 google 收录，在搜索引擎中输入 site: 你的域名 就可以找到，百度不会

https://www.xiemingzhao.com/posts/HexoblogSE.html

### RSS 订阅

RSS 订阅是站点用来和其他站点之间共享内容的一种简易方式，即 Really Simple Syndication（简易信息聚合）

```shell
$ npm install hexo-generator-feed
```

等待安装完成后，打开 hexo 目录下配置文件的\_config.yml，在末尾添加以下配置：

```yml
# Extensions
## Plugins: http://hexo.io/plugins/
#RSS订阅
plugin:
  - hexo-generator-feed
#Feed Atom
feed:
type: atom
path: atom.xml
limit: 20
```

### seo

Hexo-generator-sitemap 和 Hexo-generator-baidu-sitemap

## gridea

https://gridea.dev/

https://v2ex.com/t/699961#reply4

## jekyll

## mkdocs

mkdocs 是基于 python 的编译器。比 Hugo 慢，也没 hexo 那样基于 Node 拓展性强，因为我涉及到这方面的工作，所以只是一个记录

启动 mkdocs 项目需要 python 和 pip 的支持，所以不管是 windows 或者 linux，要支持这些

## 托管到 giteepage 服务器

码云是国内的代码托管网站，也可以托管静态博客，与 github 托管的功能类似。最重要的是对于国内的用户访问速度会比 github 快，所以可以尝试一下。

如果你之前 hexo 配置好了，你只需要做两件事情

### 在 gitee 新建账号和仓库

### 本地关联 gitee 仓库和发布

由于 gitee 也是使用 git 作为版本管理工具，所以不需要改用其他版本管理工具。

添加 gitee 远程仓库关联

```shell
git remote add github git@gitee.com:yefcion/Poweron.gits
```

修改站点配置文件 \_config.yml,把原来 github 的 repo 注释掉，新加 gitee 的仓库链接

```yaml
deploy:
  type: git
  #  repo: https://github.com/zhengqingya/zhengqingya.github.io # github仓库
  repo: https://gitee.com/zhengqingya/blog # 码云仓库
  branch: master
  message:
```

发布到仓库

```hexo
hexo deploy
```

在仓库的 gitpage 服务下面点击更新

## 托管到 Netify 服务器

### NetlifyCMS

托管到 Netlify 有一个好处是能够使用 NetlifyCMS 管理静态博客文件，进而可以远程编辑，Netlify 会获取你的 Git 仓库很多权限。

在 hexo 中添加依赖

```shell
npm install hexo-netlify-cms --save
#或者
yarn add hexo-netlify-cms
```

在 config_yml 中添加配置

```yaml
netlify_cms:
  backend:
    name: git-gateway
    branch: master
```

在 Netlify 中开启 netlify git-gateway 服务

添加 netlify-identity-widget.js, 代码如下

```javascript
<script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
```

现在 Netlify CMS 已经好了, 你可以访问`your-site/admin`查看

## Vercel 托管

非常简单

登录 vercel（github）-New Project-import-deploy

## 开发 hexo 主题

开发一款属于你的 hexo 主题吧～

### EJS 语法

Hexo 使用主流的模板引擎，如： `EJS` 、 `Jade` 、 `Swing` 等，Hexo 的页面都是通过模板引擎渲染出来的页面，它可以实现一些代码的复用。

“E” 代表什么？可以表示 “可嵌入（Embedded）”，也可以是“高效（Effective）”、“优雅（Elegant）”或者是“简单（Easy）”。EJS 是一套简单的模板语言，帮你利用普通的 JavaScript 代码生成 HTML 页面。EJS 没有如何组织内容的教条；也没有再造一套迭代和控制流语法；有的只是普通的 JavaScript 代码而已。

标签

- `<%` '脚本' 标签，用于流程控制，无输出。
- `<%_` 删除其前面的空格符
- `<%=` 输出数据到模板（输出是转义 HTML 标签）
- `<%-` 输出非转义的数据到模板
- `<%#` 注释标签，不执行、不输出内容
- `<%%` 输出字符串 '<%'
- `%>` 一般结束标签
- `-%>` 删除紧随其后的换行符
- `_%>` 将结束标签后面的空格符删除

### hexo 语法

除了 ejs 语法，还有 hexo 特有的一些语法

辅助函数：

`url_for`：输出路径

`partial`：载入其他模版文件

`css`：载入 css 文件

`js`：载入 js 文件

`data_xml`：插入 XML 格式的日期

变量

- `page`：针对该页面的内容以及 front-matter 所设定的变量
- `config`：网站配置（hexo 的\_config.yml）
- `theme`：主题配置（theme 的\_config.yml）
- `url`：当前页面的完整网址
- `path`：当前页面的路径（不含根路径）

- `post.title`：文章的题目
- `post.excerpt`：文章的摘要，即写文章的时候`<!--more-->`之上的那段儿，首页显示
- `post.comments`：评论模块
- `post.photots`：文章中插入的图片
- `post.content`：文章内容
- `post.date`：文章的时间

### 文件

主题的文件全部在 theme 文件夹下，

layout.ejs

在 layout 文件夹下，布局被写在 layout.ejs 中，由于 hexo 支持**模块儿化布局**，使用 hexo 提供的局部函数`partial`载入其他模版文件，配合 ejs 的语法，布局文件 layout.ejs

Index.ejs

首页

Post.ejs

文章页

Archive.ejs

归档页

Tag.ejs

标签页

Page.ejs

其他页面

### 参考

他山之石，可以攻玉。在编写时要参考现有的优秀的博客主题，如 Next、icarus

## 学习资源

https://easyhexo.com/
