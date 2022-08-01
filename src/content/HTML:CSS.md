---
title: HTML/CSS
date: 2020-08-03 21:40:33
categories: 技术博客
tags:
    - Web，IT，HTML，CSS
toc: true
thumbnail: http://cdn.kunkunzhang.top/html.jpeg
---

​      html和css是做网页和前端的基础，也是基本构成

​      从开始学习前端之后，其实一直没有特别地学习过html和css。最开始写过一周之后，因为想要搭建好看的样式，开始使用bootstrap，再后来学习spa应用，react和vue，使用框架和库能快速地搭建想要的界面。

​      直到后面找前端工作参加面试的时候和参加工作之后开始写，才发现html和css还是前端基本功，包括vue和react其实也只是封装了很多东西，一定要了解基础原理和改进方法才能用好。

​     所以继续开始记录。

<!--more-->

## HTML

### Doctype

<!DOCTYPE>声明叫做文件类型定义（DTD），声明的作用为了告诉浏览器该文件的类型。让浏览器解析器知道应该用哪个规范来解析文档。<!DOCTYPE>声明必须在 HTML 文档的第一行，处于html标签之前，这并不是一个 HTML 标签。DTD（文档类型定义）是一组机器可读的规则，他们定义 XML 或 HTML 的特定版本中允许有什么，不允许有什么。

严格模式（又称标准模式，Standards模式）和混杂模式（Quirk模式）都是指浏览器的呈现模式，要与Doctype的两种风格区别开来（严格（ strict ）和过渡（ transitional ），过渡 DOCTYPE 的目的是帮助开发人员从老版本迁移到新版本）。

严格模式又称标准模式，是指浏览器按照 W3C 标准解析代码，呈现页面

混杂模式又称怪异模式或兼容模式，是指浏览器用自己的方式解析代码，即使用一种比较宽松的向后兼容的方式来显示页面

```html
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0.1 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml111.dtd"
```

HTML5 没有 DTD ，因此也就没有严格模式与混杂模式的区别，HTML5 有相对宽松的语法，实现时，已经尽可能大的实现了向后兼容。（ HTML5 没有严格和混杂之分）

DOCTYPE不存在或格式不正确会让文档以混杂模式呈现

```html
<!DOCTYPE html>
```



### 头部标签

#### meta标签

**HTML `<meta>` 元素**表示那些不能由其它 HTML 元相关（meta-related）元素之一表示的任何[元数据](https://developer.mozilla.org/zh-CN/docs/Glossary/Metadata)信息。

属性

charset：声明文档的字符编码。其值必须是与ASCII大小写无关的"`utf-8`"。

name和content：`name` 和 `content` 属性可以一起使用，以名-值对的方式给文档提供元数据，其中 name 作为元数据的名称，content 作为元数据的值。

Name的属性值：

```html
<meta name="Generator" content="">
```

Generator用以说明生成工具

```html
<meta name="KEYWords" content="">
```

Keywords用以向搜索引擎说明网页的关键字

```html
<meta name="description" content="">
```

description用来向搜索引擎说明站点的主要内容

```html
<meta name="author" content="">
```

author用来向搜索引擎说明站点的制作作者

```html
<meta name="Robots" content="all|none|index|noindex|follow|nofollow"/>
```

robots属性用来告诉搜索引擎是否可以被检索

all：文件将被检索，且页面上的连接可以被查询

none:文件将不被检索，且页面上的连接不可以被查询

index：文件将被检索，

follow：页面上的连接可以被查询

noindex：文件将不被检索，但页面上的连接可以被查询

nofollow：文件将不被检索，但页面上的连接可以被查询

**`http-equiv`**的属性值

```html
<meta http-equiv="Expires" content="Mon,12 May 2001 00:20:00">
```

Expires可以用于设置网页的过期时间，一旦过期则必须到服务器上重新调用。需要注意的是必须使用GMT时间格式

```html
<meta http-equiv="Pragma" content="no-cache">
```

Pragma用于设定禁止浏览器从本地机的缓存中调阅页面内容，设定后一旦离开网页就无法从Cache中调出

```html
<meta http-equiv="Refresh" content="n;url=http://yourlink">
```

refresh用于让网页在指定的时间内跳转到指定页面

```html
<meta http-equiv="set-cookie" content="Mon,12 May 2001 00:20:00">
```

Set-cookie用于cookie设定，如果网页过期，则存盘的cookie将被删除。需要注意的是也是使用GMT时间格式

```html
<meta http-equiv="windows-Target" content="_top">
```

强调页面在当前窗口中医独立页面展示，可以防止自己的页面被别人当作一个iframe调用

```html
<meta http-equiv="Page-Enter" content="revealTrans(duration=10,transition=50)">
<meta http-equiv="Page-Exit" content="revealTrans(duration=20,transition=6)">
```

用于设定进入和离开页面的特殊效果，这个功能即FrontPage中的网页过渡，不过所加的网页不能是一个iframe页面



属性定义了一个编译指示指令。这个属性叫做 `**http-equiv**(alent)` 是因为所有允许的值都是特定HTTP头部的名称`content-type`
如果使用这个属性，其值必须是"`text/html; charset=utf-8`"。注意：该属性只能用于 [MIME type](https://wiki.developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types) 为 `text/html` 的文档，不能用于MIME类型为XML的文档。

`itemprop` 属性，`meta` 元素提供用户定义的元数据。



Property的属性值：

og是一种新的http头部标记，即Open Graph Protocol，为了提高站外内容的传播效率，2010年F8会议上，Facebook开放了一套开放内容协议，即open graph protocol，任何网页只要遵守该协议，SNS就能从页面上提取最有效的信息并呈现给用户。目前之中协议被SNS网站如fb等采用

```html
<meta property="og:type" content="video"/>
<meta property="og:title" content="video"/>
<meta property="og:image" content="video"/>
<meta property="og:url" content="video"/>
<meta property="og:locale" content="video"/>
<meta property="og:description" content="video"/>
<meta property="fb:app_id" content="video"/>
```

Og:url:页面的权威链接，此标签是未加修饰的网址，没有会话变量、用户识别参数或者计数器

Og:image:分享网址时所显示的图片

og:type：内容的媒体类型，此标签会影响网页内容在动态消息的显示方式，如果不指定类型则默认为website

og:locale：资源的区域设置，默认为en_US

Og:title:文章的标题，不包含任何品牌，例如网址名称

Og:description:内容的简单描述，通常为2-4个句子

fb:app_id:要使用fb成效分析，则将应用编号添加到主页中



facebook调试器：https://developers.facebook.com/tools/debug



外链图标



#### link标签

苹果书签图标：

```html
<link rel="apple-touch-icon" href="apple-icon" size="152*152">
```

注意：书签bookmark的png分辨率不能太小，否则显示不了效果

网页小图标

```html
<link rel="shortcut icon" href="favicon">
<link rel="bookmark" href="/favicon.ico" type="image/x-icon" />
```

link标签还可以使用prefetch和preload属性，

**preload 是声明式的 fetch，可以强制浏览器请求资源，同时不阻塞文档 [onload](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FAPI%2FGlobalEventHandlers%2Fonload) 事件**

**Prefetch 提示浏览器这个资源将来可能需要**，但是把决定是否和什么时间加载这个资源的决定权交给浏览器

**对于当前页面很有必要的资源使用 preload，对于可能在将来的页面中使用的资源使用 prefetch**

preload 是对浏览器指示预先请求当前页需要的资源（关键的脚本，字体，主要图片）。

prefetch 应用场景稍微又些不同 —— 用户将来可能在其他部分（比如视图或页面）使用到的资源。如果 A 页面发起一个 B 页面的 prefetch 请求，这个资源获取过程和导航请求可能是同步进行的，而如果我们用 preload 的话，页面 A 离开时它会立即停止

使用 preload 和 prefetch，我们有了对当前页面和将来页面加载关键资源的解决办法。

prefetch与preload的缓存策略

[Chrome 有四种缓存](https://link.juejin.cn?target=https%3A%2F%2Fcalendar.perfplanet.com%2F2016%2Fa-tale-of-four-caches%2F): HTTP 缓存，内存缓存，Service Worker 缓存和 Push 缓存。preload 和 prefetch 都被存储在 **HTTP 缓存中**。

当一个资源被 **preload 或者 prefetch** 获取后，它可以从 HTTP 缓存移动至渲染器的内存缓存中。如果资源可以被缓存（比如说存在有效的[cache-control](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FHTTP%2FHeaders%2FCache-Control) 和 max-age），它被存储在 HTTP 缓存中可以被**现在或将来的任务使用**，如果资源不能被缓存在 HTTP 缓存中，作为代替，它被放在内存缓存中直到被使用



#### 管理外链的内容

#### form标签



#### input标签





#### script标签

现代网站中，脚本往往比html更重，更大，处理时间也更长。

**当浏览器加载html时，遇到`<script>...</script>`标签时浏览器就不能继续构建DOM，它必须立即执行此脚本，对于外部脚本`<script src="..."></script>`也是一样，浏览器必须等待脚本下载完并执行结束之后才能继续处理剩余的页面。**

这会导致两个问题：

​       1.脚本不能访问到位于它之后的DOM元素，无法访问到意味着也无法给它们添加处理程序

​       2.如果页面顶部有一个笨重的脚本会阻塞页面，在该脚本下载并执行完之前用户都不能看到页面。

可以把script放在html页面的底部，这样浏览器会下载完整的HTML文档之后在监测到脚本

但是对于长的HTML文档，这样会造成明显的延迟

script标签只有在head部分才有效，如果将脚本放在body中就没有用了

**defer特性**

defer特性告诉浏览器不要等待脚本，浏览器继续构建DOM，脚本会在后台下载，等DOM构建完之后，在DOMContentLoaded事件执行之前执行

同时defer能保证相对顺序，就像保证常规脚本一样

defer特性只适用于外部js文件，即src内加载的脚本

```html
<!--这两个脚本会并行下载，但是不管谁先下载完，都会先执行pre.js,执行完之后再执行after.js-->
<script defer src="pre.js"></script>
<script defer src="after.js"></script>
```

**async特性**

async特性的script，不会与DOM和其他脚本产生冲突，独立运行，任何一个asnyc js加载完就运行，也不会等待任何东西

defer、async与正常代码区别

没有 `defer` 或 `async`，浏览器会立即加载并执行指定的脚本，“立即”指的是在渲染该 `script` 标签之下的文档元素之前，也就是说不等待后续载入的文档元素，读到就加载并执行。

有 `async`，加载和渲染后续文档元素的过程将和 `script.js` 的加载与执行并行进行（异步）。

有 `defer`，加载后续文档元素的过程将和 `script.js` 的加载并行进行（异步），但是 `script.js` 的执行要在所有元素解析完成之后，`DOMContentLoaded` 事件触发之前完成。

*async* 对于应用脚本的用处不大，因为它完全不考虑依赖（哪怕是最低级的顺序执行），不过它对于那些可以不依赖任何脚本或不被任何脚本依赖的脚本来说却是非常合适的，最典型的例子：Google Analytics

**同时有async和defer特性**

如果同时指定两者，async优先于现代浏览器，而支持defer但不支持async的旧版浏览器将回退到defer

**动态脚本**

可以通过js代码来动态加载脚本

```javascript
function loadScript(src){
  let script = document.createElement('script');
  script.src = src;
  script.async = false;//默认通过js加载脚本是async方式，可以设置为false，则按照defer的规则来执行
  document.body.append(script);
}

loadScript("pre.js")
loadScript("after.js")
```

### 常见HTML标签属性

html连接：<a>标签：target属性规定在何处打开链接文档。浏览器会根据target的属性值去打开与其命名或名称									相符的 

​									download属性：同源情况下，添加download属性，点击a标签后会下载文件，            									download=""可以指定下载文件名

​									href：链接，如果是下载文本文件，在href的链接尾部加入"?response-content-type=application/octet-stream",如"http://oss-cdn.nebula-graph.com.cn/package/2.0.1/nebula-graph-2.0.1.el8.x86_64.rpm?response-content-type=application/octet-stream"

​										如果href是mailto链接，chrome会提示不安全，添加target="_top"可以消除

框架<frame>或者窗口.

​             _blank:在新窗口中打开被链接文档。

​             _self:在相同的框架中打开被链接文档。

​             _top:在整个窗口中打开被链接文档。

​             _parent:在父框架集中打开被链接文档。

html图片：<img>标签：alt是在图片未加载完成的时候做完图片的替代文字线性，title是图片的解释文字

​			onError事件：img的src不是有效地址时，会出发onerror事件

​            onabort  图片加载时用户点击停止加载时触发，通常这里触发一个提示：图片正在加载。

​            onload  图片加载完成之后触发

​           在vue的项目中，我们同样可以使用vue提供的once方法，template内的代码如下

```vue
<div class="item-img">
  <img id="errorImg" v-bind:src="'http://bbg-seller.oss-cn-qingdao.aliyuncs.com/test/gp/p1/' + item.picture" v-on:error.once="dosomething($event)" v-bind:alt="item.name">
</div>
<scirpt>
method: { 
 dosomething: function (e) {
  	e.currentTarget.src = "http://www.ianbiangou.cn/index/ICON2.png"
  }
}
</scirpt>
```



Html<script>标签：intergrity的作用、defer 和 async 标签的作用与区别

Html表格：<tr>标签：行 colspan：合并的列数

​                  <td>标签：列 rowspan：合并的行数

Html表单：<form>标签用于为用户输入表单。form标签能包含input、textarea等标签

​                                action属性规定当提交表单时向何处发送表单数据。

​                                method属性规定用于发送 form-data 的 HTTP 方法。

​                                name属性规定表单的名称。

​                               enctype属性规定表单的编码方式，默认空格改为+号

​                                target属性规定在何处打开action中的url，与<a>标签的target属性相同，有_blank、_self、_top等

#### 自定义属性

html5允许在标签上自定义属性data-*，通过这样的方式可以进行数据存放。使用data-*可以解决自定义属性混乱无管理的现状

```html
<div id="test" data-age="24">
  Click Here
</div>

<script>
var test = document.getElementById('test');
test.dataset.my = 'Byron';
</script>
```



### 自闭合标签与闭合标签的区别





### html被废除的标签



### 拖动

拖放是一种常见的特性，即抓取对象以后拖到另一个位置。

在 HTML5 中，拖放是标准的一部分，任何元素都能够拖放。

写法

首先，为了使元素可拖动，把 draggable 属性设置为 true ：

```html
<img draggable="true">
```

拖动 - ondragstart 和 setData()

放置目标-ondragover 事件规定在何处放置被拖动的数据。

默认地，无法将数据/元素放置到其他元素中。如果需要设置允许放置，我们必须阻止对元素的默认处理方式。

进行放置-当放置被拖数据时，会发生 drop 事件。

https://www.cnblogs.com/wzjhoutai/p/6858022.html  

### 图层

浏览器在渲染一个页面时，会将页面分为很多个图层，图层有大有小，每个图层上有一个或多个节点

**渲染 DOM 时** 浏览器所做的：

- 获取 DOM 后分割为多个图层
- 对每个图层的节点计算样式结果 （Recalculate style--样式重计算）
- 为每个节点生成图形和位置 （Layout--重排,回流）
- 将每个节点绘制填充到图层位图中 （Paint--重绘）
- 图层作为纹理上传至 GPU
- 符合多个图层到页面上生成最终屏幕图像 （Composite Layers--图层重组）

**图层的创建条件**

Chrome 中满足 以下任意情况 就会创建图层：

拥有 3D 变换的 css 属性 transform

加速视频解码的 <video> 节点

 <canvas> 且浏览器硬件加速

css3 动画节点 animation

拥有 css 加速属性的元素 (will-change: transform; 记得取消为 auto )

通过devtools中的layers可以看到页面的所有图层。

重绘重排的基本单位是图层，所以gif的时候最好单独开一个图层，否则如果gif的图层是document的时候，所有的元素都需要重排或者重绘很影响效率。

### 重排与重绘

重排：当DOM的变化影响了元素的几何信息(元素的的位置和尺寸大小)，浏览器需要重新计算元素的几何属性，将其安放在界面中的正确位置，这个过程叫做重排。

触发重排的机制：

- 页面初始渲染，这是开销最大的一次重排
- 添加/删除可见的DOM元素
- 改变元素位置
- 改变元素尺寸，比如边距、填充、边框、宽度和高度等
- 改变元素内容，比如文字数量，图片大小等
- 改变元素字体大小
- 改变浏览器窗口尺寸，比如resize事件发生时

重绘：当一个元素的外观发生改变，但没有改变布局,重新把元素外观绘制出来的过程，叫做重绘。

触发重排一定会触发重绘。

#### 重排的优化：

减少重排范围：以局部布局的形式组织html结构，尽可能小的影响重排的范围。

减少重排次数：样式集中改变、优化动画

### html5新加的标签

html5是2014年发布的第五版html标准。

html<audio> 标签定义声音，比如音乐或其他音频流。

html<canvas> 标签定义图形，比如图表和其他图像。

html<article>标签定义外部的内容。比如来自一个外部的新闻提供者的一篇新的文章，或者来自 blog 的文本，或者是来自论坛的文本。亦或是来自其他外部源内容。

html<menu> 标签用于上下文菜单、工具栏以及用于列出表单控件和命令。

html<command> 标签可以定义命令按钮，比如单选按钮、复选框或按钮。只有当 command 元素位于 menu 元素内时，该元素才是可见的。否则不会显示这个元素，但是可以用它规定键盘快捷键。

html<section>定义文档中的节，比如章节、页脚等

html<aside>定义页面的侧边栏内容

### HTML5新特性



### html语义化标签

语义化的标签 是指让标签拥有自己的含义

以代码为例

```html
<p>一行文字</p>
<span>一行文字</span>
```

`p` 标签与 `span` 标签都区别之一就是，`p` 标签的含义是：段落。而 `span` 标签责没有独特的含义。

语义化标签的优势

1. 代码结构清晰，方便阅读，有利于团队合作开发。
2. 方便其他设备解析（如屏幕阅读器、盲人阅读器、移动设备）以语义的方式来渲染网页。
3. 有利于搜索引擎优化（SEO）。

因此我们在写页面结构时，应尽量使用有 语义的HTML 标签。语义化的标签有：

```html
<title>：页面主体内容。
<hn>：h1~h6，分级标题，<h1> 与 <title> 协调有利于搜索引擎优化。
<ul>：无序列表。
<li>：有序列表。
<header>：页眉通常包括网站标志、主导航、全站链接以及搜索框。
<nav>：标记导航，仅对文档中重要的链接群使用。
<main>：页面主要内容，一个页面只能使用一次。如果是web应用，则包围其主要功能。
<article>：定义外部的内容，其中的内容独立于文档的其余部分。
<section>：定义文档中的节（section、区段）。比如章节、页眉、页脚或文档中的其他部分。
<aside>：定义其所处内容之外的内容。如侧栏、文章的一组链接、广告、友情链接、相关产品列表等。
<footer>：页脚，只有当父级是body时，才是整个页面的页脚。
<small>：呈现小号字体效果，指定细则，输入免责声明、注解、署名、版权。
<strong>：和 em 标签一样，用于强调文本，但它强调的程度更强一些。
<em>：将其中的文本表示为强调的内容，表现为斜体。
<mark>：使用黄色突出显示部分文本。
<figure>：规定独立的流内容（图像、图表、照片、代码等等）（默认有40px左右margin）。
<figcaption>：定义 figure 元素的标题，应该被置于 figure 元素的第一个或最后一个子元素的位置。
<cite>：表示所包含的文本对某个参考文献的引用，比如书籍或者杂志的标题。
<blockquoto>：定义块引用，块引用拥有它们自己的空间。
<q>：短的引述（跨浏览器问题，尽量避免使用）。
<time>：datetime属性遵循特定格式，如果忽略此属性，文本内容必须是合法的日期或者时间格式。
<abbr>：简称或缩写。
<dfn>：定义术语元素，与定义必须紧挨着，可以在描述列表dl元素中使用。
<address>：作者、相关人士或组织的联系信息（电子邮件地址、指向联系信息页的链接）。
<del>：移除的内容。
<ins>：添加的内容。
<code>：标记代码。
<meter>：定义已知范围或分数值内的标量测量。（Internet Explorer 不支持 meter 标签）
<progress>：定义运行中的进度（进程）。
```

使用li标签时默认前面会有小圆点marker，添加 list-style:none去除

#### strong/b、em/i标签区别

strong与b标签，em和i标签的效果样式没有区别，并且都是行元素。strong和b标签默认都是字体加粗的效果，em和i默认都是文字斜体的效果。

`b标签`仅仅只是给文字添加了加粗样式，属于UI层面的处理，除此之外没有任何意义。你甚至就可以把它看作是加了`font-size:bold`的css样式的span标签。

`strong标签`则是侧重于标签语义化，它是在告诉浏览器这是一段重点强调的内容。只不过它的默认样式恰好也是加粗。

针对SEO（搜索引擎优化），strong标签与b标签相比更被搜索引擎重视，内容更容易被抓取到。同理，em标签也是语义化标签，而i标签只是仅仅加了斜体样式，并且em标签对SEO来说也更加友好。

#### meta属性





#### role属性

role是增强语义性，当现有的html标签不能充分表达语义性时，可以借助role说明

role的作用是描述一个非标准的tag的实际作用，比如用div做button，辅助工具就可以认出是一个button

```html
<li role="presentation" class="active"><a href="#">Home</a></li>
<div role="button"></div>
```

此外role属性作用是告诉Access类应用(比如屏幕朗读程序，为盲人提供的访问网络的便利程序)，这个元素所扮演的角色主要是供残疾人使用，使用role可以增强文本的可读性和语义化

html标签本身是有语义的，正常不添加role，但是bootstrap中有很多类似的声明和属性，目的是为了兼容老版本的浏览器。

比如一个表单，正常人使用placeholder就可以提示输入密码，但对于残障人士是无效的，这时候就需要role了

老版本有浏览器不支持html标签的也有必要使用role。

```html
<div role="checkbox" aria-checked="checked"></div>
```

#### type属性

媒体类型MIME类型(Multipurpose Internet Mail Extension)是一种标准，用来表示文档、字节、或者字节流的性质或格式

MIME的组成结构非常简单，由类型和子类型两个字符串，中间用/分隔组成，不允许空格存在。type表示可以独立类别，subtype表示细分后的类型

独立类别

text：表示是普通文本，默认是text/plain

image：表明是图像或者gif动态图

audio：表示是某种音频文件

video：表示是某种视频文件

application：表示是某种二进制数据，默认是application/octet-stream

子类别：

text/plain：文本文件的默认值，即它意味着位置的文本文件，但浏览器认为是可以展示的

text/css：

text/html

text/typescript：

#### aria-hidden属性

aria-hidden属于辅助性技术的一种

把`aria-hidden="true"`加到元素上会把该元素和它的所有元素从可访问性树上移除，这样做可以隐藏下列内容提升使用辅助技术的用户体验

- 装饰性的内容，如图片、图标
- 重复的内容，如重复的文本
- 屏幕外或被折叠的部分，如菜单

`aria-hidden="true"`这个属性不应该用于可聚焦的元素上

#### SEO优化

提交sitemap.xml和robot.txt：robot.txt和sitemap.xml都要在根目录下才有效。

默认情况下，搜索引擎是可以抓取所有页面的，也就是说允许搜索引擎完全抓取站点可以不设置robot.txt，但是如果不设置，请保证搜索引擎访问robot.txt文件时返回404错误码， 防止搜索引擎误解。

sitemap.xml是站点地图，百利而无一害，提交站点地图可以加速搜索引擎爬取速度，影响内容的更新。在站点结构不佳，功能板块和内容比较分散的情况下站点地图是改善seo的重要环节

不过sitemap不会影响对站点的最终收录情况、权重、相关数据还得搜索引擎根据内容计算



### html文档流/文本流

文档流是指“Normal flow”，文本流是指“Text flow”。

将窗体自上而下分成一行行, 并在每行中按从左至右的顺序排放元素,即为文档流。

具体来说“Normal flow”是css中定位的一种默认情况，平时我们所说的BFC、IFC等都是“Normal flow”的情况下的规则。

只要不是float和绝对定位方式布局的，都在普通流(文档流)里面。

文本流，概括地说其实就是一系列字符，是文档的读取和输出顺序，也就是我们通常看到的由左到右、由上而下的读取和输出形式，在网页中每个元素都是按照这个顺序进行排序和显示的，而position属性可以将元素从文本流脱离出来显示。

### 行内属性

行内元素区别于块级元素的一点就是它不能设置宽高

但是并不是所有的行内元素都不能设置宽高，行内元素可分为替换元素和不可替换元素，替换元素可以设置宽高

替换元素：浏览器根据元素的标签和属性来决定元素的具体显示内容，如img、input、textarea、select、object等都是替换元素。替换元素往往没有实际内容，就是一个空元素

不可替换元素，html的大部分元素是不可替换元素，即其内容直接展现给用户端

设置宽高的方法：

1.设置block或者inline-block

2.使其浮动，当元素浮动之后，就会生成一个块级框，行内元素也就生成相应的行内框，因此设置宽高就会起作用了。

### css为什么在body头部，js在末尾

将css放在头部可以增加页面的性能。

CSS放头部，在加载html生成DOM tree的时候，就可以同时对DOM tree进行渲染。这样可以防止闪跳，白屏或者布局混乱。

现在浏览器为了更好的用户体验，渲染引擎会尝试尽快在屏幕上显示内容，它不会等到所有的HTMl元素解析之后在构建和布局dom树，所以部分内容将被解析并显示。也就是说浏览器能够渲染不完整的dom树和cssom，尽快的减少白屏的时间。

CSS如果放置底部，浏览器阻止内容逐步呈现，浏览器在等待最后一个css文件下载完成的过程中，就出现了“白屏”（新打开连接时为白屏，尔后先出现文字，图片，样式最后出现）。这点非常严重，因为在网速非常慢的情况下，css下载时间比较长，这样就给用户带来“白屏”的时间自然也就很长了，用户体验非常差。

将CSS放在底部，页面可以逐步呈现，但在CSS下载并解析完毕后，已经呈现的文字和图片就要需要根据新的样式重绘，这是一种不好的用户体验。

而javascript可能会改变DOM tree的结构，所以需要一个稳定的DOM tree。

javascript加载后会立即执行，同时会阻塞后面的资源加载。（javascript加载和执行的特点）。因为当浏览器解析到script的时候，就会立即下载执行，中断html的解析过程，如果外部脚本加载时间很长（比如一直无法完成下载），就会造成网页长时间失去响应，浏览器就会呈现“假死”状态，这被称为“阻塞效应”。

假如我们将js放在header，js将阻塞解析dom，dom的内容会影响到dom树的绘制，导致dom绘制延后。所以说我们会将js放在后面，以减少dom绘制的时间，但是不会减少DOMContentLoaded被触发的时间。

`js的执行是依赖css样式`的。即只有css样式全部下载完成后才会执行js。

因为如果脚本的内容是获取元素的样式，宽高等CSS控制的属性，浏览器是需要计算的，也就是依赖于CSS。浏览器无法感知脚本内容到底是什么，为避免样式获取错误，因而只好等前面所有的样式下载完后，再执行JS。也就是说，**如果有外链css，那么js的执行时需要等待外链css下载完**。



### 用div实现textarea

```html
<!DOCTYPE html>
<head>
  <title>textarea with div</title>
  <style>
    .editdiv {
      border: 1px solid #a0b3d6;
      width: 500px;
      min-height: 200px;
      font-size: 14px;
      padding: 40px;
      color: #333;
      outline: 0;
    }
    .editdiv:empty::before {
      content: attr(placeholder);
      color: #999;
    }
  </style>
</head>
<body>
  <div class="editdiv" contenteditable="true" placeholder="input content">   
  </div>
</body>
```



### canvas绘图

canvas本身没有绘图能力，是图形的容器，必须使用脚本来完成实际的绘图任务。

```javascript
var c=document.getElementById("myCanvas");
var ctx=c.getContext("2d");
ctx.rect(20,20,150,100);
ctx.stroke();
```

其他方法

```javascript
//路径
stroke()//绘制当前定义路径
lineTo()//添加一个新点，然后在画布中创建从该点到最后指定点的线条。绘制矩形（无填充）。
moveTo()//把路径移动到画布中的指定点，不创建线条。
beginPath()//起始一条路径，或重置当前路径。
closePath()//创建从当前点回到起始点的路径。
quadraticCurveTo()//创建二次贝塞尔曲线。
bezierCurveTo()//创建三次贝塞尔曲线。
//矩形
fillRect()//绘制有填充矩形
strokeRect()//绘制矩形（无填充）
clearRect()//	在给定的矩形内清除指定的像素。
//图像
drawImage()//在画布上绘制图片或视频
```

### html unicode图标

在浏览器中已经有庞大的图标和符号库-unicode，可以在html或者css文件中直接使用，在php或者js等文件中可以像使用字符串一样使用。需要注意的是，html或者css必须是utf-8，否则可能会出现乱码。也可以使用转义字符。

字符串网站http://www.keyin.cn/font

字符串网站：https://blog.csdn.net/lhjuejiang/article/details/79818358

### 在html中添加Google搜索

可以在html中添加定制化Google搜索引擎

注册Google账号，然后登陆到 https://www.google.com/cse/all，或者直接搜索Google custom search

```html
<div class="gcse-search"></div>
<script async src="https://cse.google.com/cse.js?cx=de1f4d876bf449124"></script>
```



### 在html中添加GA

事件跟踪代码有四个值

Category：字符串、必须，指定事件的目录

Action：字符串、必须，指定GA统计分析交互的行为

Label：字符串、非必须，指定GA中交互行为的标签

Value：数值、非必须，非负数

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-8888-7"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag() {dataLayer.push(arguments)};
  gtag('js',new Date());
  gtag('config','UA-8888-7')
</script>
<li
    onclick="gtag('event','Link Click',{event_category: 'Engagement',event_label: 'start via Nav'})"
    ></li>
```





### 右键菜单

```html
<html>
  <head>
    <style type="text/css">
      #right-menu {
        position: absolute;
        width:200px;
        border: 1px #CCC solid;
        display:none;
        box-shadow: 5px #CCC;
      }
      .menu-item {
        height:25px;
        cursor:point;
      }
      .menu-item:hover {
        background-color:#CCC;
      }
      .menu-item-separator {
        height:1px;
        border-top:1px #CCC solid;
      }
    </style>
  </head>
  <div id="right-menu">
    <div class="menu-item">执行</div>
    <div class="menu-item">启动</div>
    <div class="menu=item-separator"></div>
    <div class="menu-item">删除</div>
    <div class="menu-item">执行</div>
  </div>
  <script type="text/javascript">
       window.oncontextmenu = function(e){
         e.preventDefault(); //阻止浏览器自带的右键菜单显示
         var menu = document.getElementById("right-menu");
         menu.style.display = "block";
         menu.style.left = e.clientX + "px";
         menu.style.top = e.clientY + "px";
       }
       window.onclick = function(e){
         var menu document.getElementById("right-menu");
         menu.style.display = "none";
       }
  </script>
</html>
```



