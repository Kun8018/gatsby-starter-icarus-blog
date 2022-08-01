---
title: HTML/CSS
date: 2020-08-02 21:40:33
categories: 技术博客
tags:
    - Web，IT，HTML，CSS
toc: true
thumbnail: http://cdn.kunkunzhang.top/css3.png
---

​      html和css是做网页和前端的基础，也是基本构成

​      从开始学习前端之后，其实一直没有特别地学习过html和css。最开始写过一周之后，因为想要搭建好看的样式，开始使用bootstrap，再后来学习spa应用，react和vue，使用框架和库能快速地搭建想要的界面。

​      直到后面找前端工作参加面试的时候和参加工作之后开始写，才发现html和css还是前端基本功，包括vue和react其实也只是封装了很多东西，一定要了解基础原理和改进方法才能用好。

​     所以继续开始记录。

<!--more-->

## CSS

### 常见CSS属性

**背景图片**

background-img:

Background-repeat:重复背景图片

background-size：设定背景图片的尺寸

属性值：length：可以指定图像的宽度和高度，第一个值是宽度，第二个值是高度。如果只设置第一个值，第二个值默认为auto

​				百分比：以父元素的百分比来设置图片的宽度和高度的，第一个值是宽度，第二个值是高度，如果只设置一个值，那么第二个值默认是auto

​				cover：把背景图片放到足够大，以使背景图片完全覆盖背景区域

​				contain：把图像扩展至最大尺寸，以使宽度和高度

object-fit：指定可替换元素的内容应该如何适应到其使用的高度和宽度确定的框

Text-decoration: line-through; 在文本上加横线表示划掉

​								dashed：虚线

​								underline: 下划线

​								wavy： 波浪线

​								overline： 上划线



#### flex布局高度

设置height：auto属性

**横向滚动**

white-space: nowrap;//不分行

Overflow-x: scroll//开启横向滚动

Overflow-y:hidden//纵向滚动关闭

filter: grayscale(100%);//适用于一键变灰等功能

**display**: block：可以定义宽度和高度。块元素占用了全部宽度，在前后都是换行符。

​               inline：此元素会被显示为内联元素，元素前后没有换行符,不强制换行。内联元素无法定义宽高。

​               none：不显示

​               inherit：从父元素继承display属性

​               Inline-block:行内块元素

​              flex：

​               Table-cell:会作为一个表格单元格显示

其中**flex**是未来布局的首选方案，意为弹性布局，灵活性较大，任何一个容器都可以指定为flex布局。定义为flex之后可以添加其他附带6个属性在该容器上

```css
flex-direction:row | row-reverse | column | column-reverse;/*决定主轴的方向（即项目的排列方向）,row（默认值）：主轴为水平方向，起点在左端。row-reverse：主轴为水平方向，起点在右端。column：主轴为垂直方向，起点在上沿。column-reverse：主轴为垂直方向，起点在下沿。。*/
flex-wrap:nowrap | wrap | wrap-reverse;/*默认情况下，项目都排在一条线（又称"轴线"）上。flex-wrap属性定义，如果一条轴线排不下，如何换行。nowrap（默认）：不换行。wrap：换行，第一行在上方。wrap-reverse：换行，第一行在下方。*/
flex-flow
justify-content:flex-start | flex-end | center | space-between | space-around;/*justify-content属性定义了项目在主轴上的对齐方式。flex-start（默认值）：左对齐.flex-end：右对齐.center： 居中.space-between：两端对齐，项目之间的间隔都相等。space-around：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。*/
align-items:flex-start | flex-end | center | baseline | stretch;/*align-items属性定义项目在交叉轴上如何对齐。flex-start：交叉轴的起点对齐。flex-end：交叉轴的终点对齐。center：交叉轴的中点对齐。baseline: 项目的第一行文字的基线对齐。stretch（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度。*/
align-content:flex-start | flex-end | center | space-between | space-around | stretch;/*align-content属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。flex-start：与交叉轴的起点对齐。flex-end：与交叉轴的终点对齐。center：与交叉轴的中点对齐。space-between：与交叉轴两端对齐，轴线之间的间隔平均分布。stretch（默认值）：轴线占满整个交叉轴。
space-around：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。*/
```

还有6个属性作为flex容器的子容器的属性

```css
order: <integer>;/*order属性定义项目的排列顺序。数值越小，排列越靠前，默认为0。*/
flex-grow: <number>; /* default 0 flex-grow属性定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。如果所有项目的flex-grow属性都为1，则它们将等分剩余空间（如果有的话）。如果一个项目的flex-grow属性为2，其他项目都为1，则前者占据的剩余空间将比其他项多一倍。*/
flex-shrink: <number>; /* default 1 flex-shrink属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。*/
align-self: auto | flex-start | flex-end | center | baseline | stretch;/* align-self属性允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch。*/
flex-basis: <length> | auto; /* default auto flex-basis属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小。它可以设为跟width或height属性一样的值（比如350px），则项目将占据固定空间。*/
flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]/*flex属性是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。后两个属性可选。*/
```

flex一般是0或1.

默认是块元素的例子：<p>、<h1>、<div>、<ul>

默认是内联元素的例子：<span>、<a>、<input>、<img>、

**curser**:css设置光标的类型，在鼠标悬停在元素上时显示相应的样式

​              default：默认指针，通常是箭头。crosshair：十字交叉指针光标   help：带问号的箭头。pointer：手型

​              progress：指针旁带沙漏   wait：没有指针的沙漏  Text:文本      vertical-text：垂直文本    

​              move：指示物体可被移动  no-drop：当前位置不能被扔下 not-allowed：当前位置不能执行

​              grab:可被抓取 grabbing：抓取中 row-resize：上下双向分隔箭头 col-resize：左右双向分隔箭头

​              n-resize:上箭头 e-resize：右键头 s-resize：下箭头 w-resize：左箭头

​              ne-resize:右上箭头  nw-resize:左上箭头 se-resize:右下箭头 sw-resize:左下箭头

​              ew-resize:左右双向箭头 ns-resize：上下双向箭头 nesw-resize：右上左下双箭头

​              zoom-in：放大显示      zoom-out：缩小显示

**opacity**：不透明度

**表格元素**

自动根据内容换行：

word-break：

属性值：normal：默认值，按字词截断换行

​               break-all：强行截断并换行

​               keep-all：自适应文本宽度，不截断不换行

table-layout：auto：默认值

​                 fixed：宽度固定，截断超出的内容

**文本**

letter-spacing：用于设置文本字符的间距表现

属性：normal：按照当前字体的正常间距确定的

或者指定宽度：1px，rem这样

text-transform:控制文本大小写 direction：书写方向 color:文本颜色

text-indent：规定文本首行的缩进 white-space：处理元素的空白如nowrap表示文本不会换行

letter-spacing/Word-spacing:设置字符/单词间距  text-wrap 规定文本的换行规则 

Text-align:文本对齐方式

 text-align-last:最后一行的对齐方式 

text-transform:定义文本的大小写 

text-shadow: 添加文本阴影

text-shadow的参数：当阴影大于一个时要用逗号区别开阴影之间的参数

每个阴影都有两到三个`<length>`参数 ， 以及一个与阴影颜色相关的`<color>`参数 。 前两个`<length>`参数，是以“文字中心”为原点的坐标轴，分别为x轴 `<offset-x>` 和y轴 `<offset-y>` 的值； 如果有第三个`<length>`参数，则第三个数值为形成阴影效果的半径的数值 `<blur-radius>` 

当所给的阴影大于一个时，阴影应用的顺序为从前到后, 第一个指定的阴影在顶部.

**blur-radius**： 值越大，模糊半径越大，阴影也就越大越淡

offset-x、offset-y

必选。这些长度值指定阴影相对文字的偏移量。`<offset-x>` 指定水平偏移量，若是负值则阴影位于文字左边。 `<offset-y>` 指定垂直偏移量，若是负值则阴影位于文字上面。如果两者均为0，则阴影位于文字正后方（如果设置了`<blur-radius> `则会产生模糊效果)。

这个属性同时适用于[`::first-line`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::first-line) 以及 [`::first-letter`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::first-letter) [伪元素](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-elements).

text-overflow:设置文本溢出时的属性，

​						clip表示修剪，

​						ellipsis表示用省略号代替被修剪的文本，

​						string表示用字符串代替被修剪的文本

word-wrap：允许对长的不可分割的单词进行分割并换行到下一行。

**position**：fixed：相对于视口（viewport，浏览器窗口）进行偏移，即定位基点是浏览器窗口。这会导致元素的位置不随页面滚动而变化，好像固定在网页上一样。

​                  absolute：绝对定位，相对于上级元素进行偏移，如果指定定位基点是**父元素**需父元素需**指定position值**，否则是相对屏幕定位。

​                   relative：相对于默认位置（即`static`时的位置）进行偏移，即定位基点是**元素的默认位置**。无论父级存在不存在，无论有没有TRBL，均是以父级的左上角进行定位，但是父级的Padding属性会对其影响。

​                   static：position的默认值，浏览器会按照源码的顺序，决定每个元素的位置，这称为"正常的页面流"（normal flow）。每个块级元素占据自己的区块（block），元素与元素之间不产生重叠，即忽略left、top、right、bottom、z-index等属性。**使用static 定位或无position定位的元素z-index属性是无效的。**

指定为absolute时，必须有left、right、top等元素才能生效。

**overflow**：定义溢出元素内容区的内容会如何处理。如果值为 scroll，不论是否需要，用户代理都会提供一种滚动机制。

​                   visiable:默认值，元素不会被折叠，呈现在元素框之外

​                  hidden：内容超出会被修剪，超出内容不可见

​                  scroll：内容超出会被修剪，但是浏览器会显示滚动条以便查看其余的内容。

​                  auto：内容超出会被修剪，但是浏览器会显示滚动条以便查看其余的内容。

​                  inherit：从父元素继承 overflow 属性的值。

overflow要指定dom的宽度width:200px，配合text-overflow使用
Text-overflow:ellipsis 省略号

 clip：剪裁

perspective：指定观察者与z=0平面的距离，使具有三维位置变换的元素具有透视效果。z>0平面的三维元素比正常大，z<0则比正常小，大小程度由该属性的值决定

#### position各属性的区别

relative与absolute的区别：

1.relative在正常流中的位置存在，absolute在正常流中不存在。

2.relative定位的层总是相对于其最近的父元素，无论其父元素是何种定位方式。对于absolute定位的层总是相对于其最近的定义为absolute或relative的父层，

fixed与absolute的区别：

fixed参照位置是浏览器窗口的左上角，即坐标点为(0px, 0px)

absolute参照位置是离当前元素最近的定位方式为fixed,absolute,relative的祖先原则的左上角，

在有滚动条的情况下，fixed定位不会随滚动条移动而移动，而absolute则会随滚动条移动

#### 清除float的方法

1.添加新元素或者在浮动后面的元素上设置clear:both属性

优点：简单，代码少，浏览器兼容性好

缺点：清除浮动比较多时要添加大量无语义的html元素，代码不够优雅，后期不容易维护

2.使用css的overflow属性

给浮动元素添加overflow:hidden或者overflow:auto的属性，清除浮动。如果在ie6中使用此方式，还需要在父元素设置zoom为1.

在添加overflow后，浮动元素又回到了容器层，把容器高度撑起，达到了清理浮动的效果

3.使用伪元素

给浮动元素的容器添加一个clearfix的class，然后给这个class添加一个:after的伪元素实现元素末尾添加一个看不到的块元素清除浮动

此外，ie中可以设置zoom:1触发清除浮动、清除margin重叠等作用，webkit也支持，firefox不支持

小模块里使用overflow，页面主要布局使用:after伪元素

### 写法分类

原生css有四种：

行内样式:直接在html中的style属性编写css代码

内嵌样式:编写class，在html中style标签中引入class

导入样式:在内联样式中通过@import方法导入其他样式，供当前页面使用

外部样式：在html中通过link标签加载样式，提供给当前页面使用

推荐使用内嵌样式和外部样式

行内样式的缺点：

1.样式不能复用

2.样式的权重太高，样式不好覆盖

3.表现层与结构层没有分离

4.不能进行缓存，影响加载效率

导入样式的缺点：

1.导入样式只能放到第一行，放在其他行会无效

2.@import声明的样式表不能充分利用浏览器并发请求资源的行为，其加载行为往往会延后触发或被其他资源挂起

3.由于@import样式表的延后加载，可能导致页面样式闪烁

#### link与import的区别

@import是 CSS 提供的语法规则，只有导入样式表的作用；link是HTML提供的标签，不仅可以加载 CSS 文件，还可以定义 RSS、rel 连接属性等。

加载顺序：加载页面时，link标签引入的 CSS 被同时加载；@import引入的 CSS 将在页面加载完毕后被加载。

兼容性：@import是 CSS2.1 才有的语法，故只可在 IE5+ 才能识别；[link标签](https://www.zhihu.com/search?q=link标签&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra={"sourceType"%3A"article"%2C"sourceId"%3A136047345})作为 HTML 元素，不存在兼容性问题。

可操控性：可以通过 JS 操作 DOM ，插入link标签来改变样式；由于 DOM 方法是基于文档的，无法使用@import的方式插入样式。

### 模块化

使用css-loader，设置options.module为true

构建时根据文件到位置、内容生成一个全局唯一的base64字符串，替换原来的名称以解决全局命名冲突的问题，这样就达到了模块化的目的



### 元素层级

DOM层级顺序，就是DOM节点在z轴方向（垂直于屏幕向外的方向）的显示优先级。由于屏幕是一个二维平面，因此我们并不是真正地看到了z轴。 我们说看到z轴，其实是通过透视，通过元素展现在与其共享二维空间的其他元素的前面或者后面来看到的。有几大规则。

顺序规则

在不设置position属性（或设置成static）的情况下，文档流后面的DOM节点会覆盖前面的DOM节点。

定位规则

定位节点（position属性设置为relative，absolute或fixed的节点）会覆盖非定位节点（不设置position属性或position属性设为static的节点）

根据顺序规则和定位规则, 我们可以做出更加复杂的结构。A和 B 都设为非定位节点，A 的子节点 A-1 设定定位节点。

默认值规则

对于所有的定位节点，z-index值大的节点会覆盖z-index值小的节点。

z-index设为0和没有设置z-index的节点在同一层级内没有高低之分。在IE6和7种，z-index的默认值为0，其他浏览器中默认值为auto。

从父规则

两个节点A和B都是定位节点，如果节点A的z-index值比节点B的大，那么节点A的子元素都会覆盖在节点B以及节点B的子节点上。

如果定位节点A和B的z-index值一样大，那么根据顺序规则，B会覆盖A，那么即使A的子节点的z-index比B的子节点大，B的子节点还是会覆盖A的子节点。(这就是为什么即使我们把A-1的z-index设置得很大，依然无法盖住B节点的原因)。

层级树规则

定位节点，且z-index有整数值的（不包括z-index:auto），会被放置到一个与DOM节点不一样的层级树里。

在下面的DOM节点中，A和B是兄弟节点，但是在层级树种，A和B-1才是兄弟节点（因为他们都是Root下的第一层含有整数z-index的定位节点），所以A在B和B-1之上。虽然A-1的z-index比B-1的小，但是根据从父规则，A-1也在B-1之上。

**使用static 定位或无position定位的元素z-index属性是无效的。**

层叠上下文

层叠上下文是HTML元素的三维概念，这些HTML元素在一条假想的相对于面向（电脑屏幕的）视窗或者网页的用户的z轴上延伸，HTML元素依据其自身属性按照优先级顺序占用层叠上下文的空间。

从底部到顶部

1.**背景和边框** —— 形成层叠上下文的元素的背景和边框。 层叠上下文中的最低等级，一般为父元素。

2.负堆叠顺序的子元素 z-index: <negative integer>; position: relative (or absolute or fixed)

3.**块级盒**。文档流中，非内联，非定位子元素 display: /* not inline */; position: static

4.浮动盒。非定位浮动子元素 float: left (or right); position: static

5.行内盒。内联流，非定位子元素 display: inline; position: static

6.堆叠顺序为0的子元素 z-index: auto (or 0); position: position: relative(or absolute or fixed)

7.堆叠顺序为正的子元素 z-index: <positive integer>; position: relative(or absolute or fixed)

**`pointer-events`** CSS 属性指定在什么情况下 (如果有) 某个特定的图形元素可以成为鼠标事件的 [target](https://developer.mozilla.org/en-US/docs/Web/API/Event/target)



/* Keyword values */
pointer-events: auto;
pointer-events: none;
pointer-events: visiblePainted; /* SVG only */
pointer-events: visibleFill;    /* SVG only */
pointer-events: visibleStroke;  /* SVG only */
pointer-events: visible;        /* SVG only */
pointer-events: painted;        /* SVG only */
pointer-events: fill;           /* SVG only */
pointer-events: stroke;         /* SVG only */
pointer-events: all;            /* SVG only */

### 包含块



### 盒模型

当对一个文档进行布局（lay out）的时候，浏览器的渲染引擎会根据标准之一的 **CSS 基础框盒模型**（**CSS basic box model**），将所有元素表示为一个个矩形的盒子（box）。CSS 决定这些盒子的大小、位置以及属性（例如颜色、背景、边框尺寸…）

每个盒子有四个边界，由外到内分别是：*外边框边界* *Margin Edge*、*边框边界* *Border Edge*、*内边距边界* *Padding Edge*、*内容边界* *Content edge*。

Margin：元素边界外的距离

Border：边框

Padding：元素边界内的距离

Content：内容

margin、padding有四个距离，分别对应上 右 下 左。如果只有两个距离，是上下和左右

距离设为负值时可以进行重叠

盒模型分为IE盒模型和W3C标准盒模型。

w3c盒模型中，元素的属性width,height只包含内容content，不包含border和padding。

切换：使用css属性 box-sizing，默认为content-box，即标准盒模型，设为border-box则为IE盒模型

#### 怪异盒模型

IE盒模型中，元素的属性width,height包含border和padding，指的是content + padding + border。



### 各种FC(格式化上下文)

格式化上下文(Formatting Context)，指页面中一个渲染区域，拥有一套渲染规则，它决定了其子元素如何定位，以及与其他元素的相互关系和作用，那么css布局中格式化上下文有BFC、IFC、FFC、GFC。

BFC

BFC(Block formatting context)直译为"块级格式化上下文"。它规定了内部的Block-level Box如何布局，并且与这个区域外部毫不相干。

内部的Box会在垂直方向上一个接一个的放置

垂直方向上的距离由margin决定。

每个元素的左外边距与包含块的左边界相接触（从左向右），即使浮动元素也是如此。

BFC的区域不会与float的元素区域重叠

特点：

BFC是方形的，其他元素进不来，内部的元素也出不去

IFC

IFC(Inline Formatting Contexts)直译为"行内格式化上下文"，IFC的line box（线框）高度由其包含行内元素中最高的实际高度计算而来（不受到竖直方向的 padding/margin 影响)

1、IFC中的line box一般左右都贴紧整个IFC，但是会因为float元素而扰乱。float元素会位于IFC与与line box之间，使得line box宽度缩短。

2、IIFC中时不可能有块级元素的，当插入块级元素时（如p中插入div）会产生两个匿名块与div分隔开，即产生两个IFC，每个IFC对外表现为块级元素，与div垂直排列。

**IFC的应用**

1. 水平居中：当一个块要在环境中水平居中时，设置其为`inline-block`则会在外层产生`IFC`，通过`text-align`则可以使其水平居中。
2. 垂直居中：创建一个`IFC`，用其中一个元素撑开父元素的高度，然后设置其`vertical-align:middle`，其他行内元素则可以在此父元素下垂直居中。

GFC

`GFC(GridLayout Formatting Contexts)`直译为"网格布局格式化上下文"，当为一个元素设置`display`值为`grid`的时候，此元素将会获得一个独立的渲染区域，我们可以通过在网格容器`（grid container）`上定义网格定义行`（grid definition rows）`和网格定义列`（grid definition columns）`属性各在网格项目`（grid item）`上定义网格行`（grid row）`和网格列`（grid columns）`为每一个网格项目`（grid item）`定义位置和空间。

`GFC`将改变传统的布局模式，他将让布局从一维布局变成了二维布局。简单的说，有了`GFC`之后，布局不再局限于单个维度了。这个时候你要实现类似九宫格，拼图之类的布局效果显得格外的容易。

FFC自适应格式化上下文)：

FFC(Flex Formatting Contexts)直译为"自适应格式化上下文"，display值为flex或者inline-flex的元素将会生成自适应容器（flex container）。

Flex Box 由伸缩容器和伸缩项目组成。通过设置元素的 display 属性为 flex 或 inline-flex 可以得到一个伸缩容器。设置为 flex 的容器被渲染为一个块级元素，而设置为 inline-flex 的容器则渲染为一个行内元素。

伸缩容器中的每一个子元素都是一个伸缩项目。伸缩项目可以是任意数量的。伸缩容器外和伸缩项目内的一切元素都不受影响。简单地说，Flexbox 定义了伸缩容器内伸缩项目该如何布局。

#### BFC的应用以及如何触发BFC

清除浮动

当父元素没有设置高度，且子元素为浮动元素的情况下，父元素会发生高度坍塌，上下边界重合，即浮动元素无法撑开父元素,子元素浮动后父元素失去高度

```html
<div class="parent">
  <div class="child"></div>
</div>

<link type="text/css">
.parent {
	overflow: auto;
	.child {
		float: left;
	}
}
</link>
```

浮动元素重叠

浮动元素由于脱离文档流，第一个盒子堆到第二个盒子，此时可以给第二个盒子设置成BFC，就不会产生堆叠

```html
<div class="box1"></div>
<div class="box2"></div>

<link type="text/css">
.box1 {
	float: left;
}
.box2 {
	overflow: hidden;
}
<link>
```

外边距重叠

在标准文档流中，毗邻的两个或多个块级元素之间垂直方向的margin会合并成一个margin，会取两个元素margin最大的那一个，这就是外边距重叠。

有三种情况会形成外边距重叠：同一层相邻元素之间、没有内容将父元素和后代元素分开、空的块级元素

可以使用overflow: hidden产生一个BFC环境来解决该问题，或者将其放在不同的BFC容器中

```html
<div class="container">
  <div></div>
</div>
<div class="container">
  <div></div>
</div>
```

触发BFC的方法：

根元素

浮动元素、绝对定位元素：设置元素的float不为none

设置display为行内块元素、表格单元格、表格标题、弹性元素、网格元素

overflow属性不为visible的元素（hidden、auto、scoll）

contain值为layout、content、paint的元素

多列元素（column-count不为auto的元素）、column-span为all的元素



### CSS选择器、权重问题

html标签样式的优先级

行间样式 > id选择器 > class选择器 > 标签选择器 > 通配符选择器 >继承>默认

权重

！important 无限大  行间样式 1000 id选择器 100 

class选择器 10 标签选择器 1 通配符选择器 0 

class与id区别

class可以有多个，id只有一个

class一般为元素添加样式，利用id为元素添加行为--js

以代码为例

```html
<div id="a" class="a">
  <div id="b" class="b">
    <p id="c" class="c">I am here</p>
  </div>
</div>
<style type="text/css">
  #a { font-size:12px }
  div p { font-size:13px }
  div .c { font-size:14px }
  .a .b .c { font-size:15px }  /*优先级最高*/
  #b { font-size:16px }
</style>
```

代码运行效果：只有15px生效

### 上下文选择符

">"符号

大于号代表某个元素的的下一代元素，A>B是指A元素里的第一代B元素

"~"符号

波浪号A～B表示A标签之后所有的B标签，但是A和B标签必须拥有相同的父元素

"+“符号

加号又被称作兄弟选择器，A+B表示紧邻在A后面的B元素，且A和B必须拥有相同的父元素，所选到的仅为一个B标签

","符号

A,B表示同时选择A、B两个元素

“ ”空格符号

A B表示以A为祖先元素的B元素

通配符 *

选择所有元素



### @规则

一个 **at-rule** 是一个[CSS 语句，](https://developer.mozilla.org/en/CSS/Syntax#CSS_statements)以at符号开头, '`@`' (`U+0040 COMMERCIAL AT`), 后跟一个标识符，并包括直到下一个分号的所有内容, '`;`' (`U+003B SEMICOLON`), 或下一个CSS块，以先到者为准。

- [`@charset`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@charset), 定义样式表使用的字符集.
- [`@import`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@import), 告诉 CSS 引擎引入一个外部样式表.
- [`@namespace`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@namespace), 告诉 CSS 引擎必须考虑XML命名空间。
- 嵌套@规则, 是嵌套语句的子集,不仅可以作为样式表里的一个语句，也可以用在条件规则组里：
  - [`@media`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@media), 如果满足媒介查询的条件则条件规则组里的规则生效。
  - [`@page`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@page), 描述打印文档时布局的变化.
  - [`@font-face`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@font-face), 描述将下载的外部的字体。 
  - [`@keyframes`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@keyframes), 描述 CSS 动画的中间步骤 . 
  - [`@supports`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@supports), 如果满足给定条件则条件规则组里的规则生效。 
  - [`@document`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@document), 如果文档样式表满足给定条件则条件规则组里的规则生效。

@page 规则用于在打印文档时修改某些CSS属性。你不能用@page规则来修改所有的CSS属性，而是只能修改margin,orphans,widow 和 page breaks of the document。对其他属性的修改是无效的。

:left: 需要和[@规则](https://developer.mozilla.org/zh-CN/docs/Web/CSS/At-rule) [`@page`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@page) 配套使用, 对打印文档的左侧页设置CSS样式.

:right: 必须与[@规则](https://developer.mozilla.org/zh-CN/docs/Web/CSS/At-rule) [`@page`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@page) 一起配套使用，表示打印文档的所有右页

:first: 描述的是：打印文档的时候，第一页的样式。



### 属性关键字

inherit：从父元素继承值

initial：将属性的初始值或者默认值应用于元素

revert：等价于unset，只有safari和iso支持

unset：属性从其父级继承，如果没有继承父级样式，则该属性重新设置为初始值。也就是说，在第一种情况下它的行为类似于inherit，第二种情况下它的行为类似于initial

all：修改所有元素或其父元素的属性为初始值，all属性用于重置所有属性，除了unicode-bidi和direction



### CSS3伪类、伪元素

CSS伪类添加一些选择器的特殊效果,表示状态。

a标签的伪类

a:link 未访问过的链接  a:visited 已访问过的链接  a:hover 鼠标划过链接  a:active 已选中的链接

:lang 伪类使你有能力为不同的语言定义特殊的规则

:active:伪类匹配被用户激活的元素

:focus: 表示获得焦点的元素（如表单输入）。当用户点击或触摸元素或通过键盘的 “tab” 键选择它时会被触发。

:focus-visible: 

:focus-within: 表示一个元素获得焦点，或，该元素的后代元素获得焦点

input标签的伪类

:autofill:

:enabled:**`enabled`** 表示任何被启用的（enabled）元素。如果一个元素能够被激活（如选择、点击或接受文本输入），或者能够获取焦点，则该元素是启用的。元素也有一个禁用的状态（disabled state），在被禁用时，元素不能被激活或获取焦点。

:disabled:CSS [伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Pseudo-classes)表示任何被禁用的元素。如果一个元素不能被激活（如选择、点击或接受文本输入）或获取焦点，则该元素处于被禁用状态。元素还有一个启用状态（enabled state），在启用状态下，元素可以被激活或获取焦点。

:read-only:表示元素不可被用户编辑的状态（如锁定的文本输入框）

:read-write:代表一个元素（例如可输入文本的 input元素）可以被用户编辑

:placeholder-shown: 在textarea或input元素显示 [placeholder text](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-placeholder) 时生效.

:default

:checked:表示任何处于选中状态的**radio**(`<input type="radio">`), **checkbox** (`<input type="checkbox">`) 或("select") 元素中的**option** HTML元素("option")

:blank:选择用户输入为空的输入框，input或者textarea

:required: 表示任意设置了[`required`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input#attr-required)属性的input、select或text元素。 这个伪类对于高亮显示在提交表单之前必须具有有效数据的字段非常有用。

:optional:表示任意没有设置[`required`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input#attr-required)属性的input、select或text元素。

:valid: 表示任意内容通过验证的input或其他form元素 .

:invalid: 表示任意内容未通过验证的input或其他form元素 .

:in-range:表示一个Input元素，其当前值处于属性 `min` 和 `max` 限定的范围内

:out-of-range:表示一个Input元素，其当前值处于属性 `min` 和 `max` 限定的范围外

:user-invalid:

第三方伪类(现在大部分浏览器已默认支持)

:first child :last child 父类的第一个子元素和最后一个子元素

:empty: 选中没有子元素的元素

`:only-child` 匹配没有任何兄弟元素的元素.

:nth-child():选中第n个元素

`:nth-of-type()`：针对具有一组兄弟节点的标签, 用 n 来筛选出在一组兄弟节点的位置

:first-letter :first-line 元素的第一个字母/第一行

:scope: 它表示作为选择器要匹配的参考点的元素。当从DOM API使用，`:scope` 匹配你调用API的元素。

**`:not()`** 用来匹配不符合一组选择器的元素。由于它的作用是防止特定的元素被选中，它也被称为*反选伪类*

伪元素

::before

::after

:first-line 伪元素

"first-line" 伪元素用于向文本的首行设置特殊样式。



伪类与伪元素的区别

**伪类**选择元素基于的是当前元素处于的状态，或者说元素当前所具有的特性，而不是元素的id、class、属性等静态的标志。由于状态是动态变化的，所以一个元素达到一个特定状态时，它可能得到一个伪类的样式；当状态改变时，它又会失去这个样式。由此可以看出，它的功能和class有些类似，但它是基于文档之外的抽象，所以叫伪类。

与伪类针对特殊状态的元素不同的是，**伪元素**是对元素中的特定内容进行操作，它所操作的层次比伪类更深了一层，也因此它的动态性比伪类要低得多。实际上，设计伪元素的目的就是去选取诸如元素内容第一个字（母）、第一行，选取某些内容前面或后面这种普通的选择器无法完成的工作。它控制的内容实际上和元素是相同的，但是它本身只是基于元素的抽象，并不存在于文档中，所以叫伪元素。

