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

## 响应式布局CSS

1.在网页头部加上viewport元标签

```html
<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=no" />
```

width：控制viewport的大小，可以指定具体的大小或者特殊值，如device-width

height：与width相对应，指定高度

initial-scale：初始缩放比例，也即是当页面第一次load的时候缩放比例

maximum-scale：允许用户缩放到的最大比例

minimum-scale：允许用户缩放到的最小比例

user-scalable：用户是否可以手动缩放

2.不使用绝对宽度



3.流式布局

[float](http://designshack.net/articles/css/everything-you-never-knew-about-css-floats/)的好处是，如果宽度太小，放不下两个元素，后面的元素会自动滚动到前面元素的下方，不会在水平方向overflow（溢出），避免了水平滚动条的出现。

绝对定位（`position: absolute`）的使用，也要非常小心。

4.选择加载CSS

自适应网页的核心就是CSS引入的Media Query模块

自动检测屏幕宽度，然后加载相应的CSS文件

实例

```html
<link rel="stylesheet" type="text/css" media="screen and (max-device-width: 400px)" href="tinyScreen.css"/>
<link rel="stylesheet" type="text/css" media="screen and (min-width: 400px) and (max-device-width: 600px)" href="smallScreen.css"/>
```

上面的代码意思是，如果屏幕宽度小于400像素（max-device-width: 400px），就加载tinyScreen.css文件。

如果屏幕宽度在400像素到600像素之间，则加载smallScreen.css文件。

或者，在同一个CSS文件中利用@media的属性也能选择性加载样式

```css
@media 
screen and (max-device-width: 400px) 
{ .column 
  {float: none;width: auto;} 
  #sidebar { 
    display: none'
  }
}
```

5.图片的自适应

添加属性

```css
img { max-width: 100%;}
```

这行代码对于大多数嵌入网页的视频也有效，所以可以写成：`img, object { max-width: 100%;}`

### rem与屏幕宽度的换算

rem是CSS3中新增的度量单位，全称是“ font size of the root element”，翻译过来是根元素字体大小，所以它其实是一个相对于html的相对单位。

下面的代码我们将屏幕的 1/15 大小（px）复制给 html 标签的 font-size 属性。此时，在任何尺寸的屏幕上，屏幕尺寸（px）的 1/15 px 都等于 1rem 的大小。即：在任何尺寸的屏幕上，只要给元素设置值相同的 rem，则在所有尺寸的屏幕上该元素所占屏幕宽度的比例是一样的，所占比例一样，就适配了所有尺寸的屏幕。

```html
// 在 html 文件的 head 标签中
<script type="text/javascript">
  (function(){
    var html = document.documentElement;
    // 获取屏幕宽度（px）
    var hWidth = html.getBoundingClientRect().width;
    // 设置 html 标签的 font-size 大小为 hWidth/15
    html.style.fontSize = hWidth/15 + 'px';
  })()
</script>
```

在less中设置

```less
// 在 less 中
/* 定义变量@r：750/15 */
@r:50rem; 
div {
  width: 100/@r;
  height: 200/@r;
}
```



### 各自的优缺点

响应式的优缺点：

优点：兼容性好，@media在ie9上是支持的，pc端和mobile是一套代码，不用分开

缺点：要写的css比另外两个多很多，而且各个断点都要做好。css样式要稍微大点的话更麻烦

Rem的优缺点：

优点：能维持整体的布局效果，移动端兼容性好，不用写多个css代码，而且还可以使用@media进行优化

缺点：开头要引入一段js，单位都要改成rem，计算rem比较麻烦，可以引用预处理器，但是增加了编译过程。PC和mobile要分开

设置viewport的width：

优点：与Rem相同，而且不用写rem，直接使用px，更加快捷

缺点：效果可能没rem好，图片会相对模糊，而且无法使用@media进行断点，不同size的手机上显示高度差距可能会相差很大

## 常见布局

布局的基本方案：基于盒模型，依赖position属性+float属性+display属性定位

### 三列布局

左右定宽，中间自适应，五种方法

利用表格（table/table-cell）布局、利用浮动（float）布局

利用栅格（grid）布局、利用绝对定位（absolute）布局

利用弹性和（flex-box）布局

html页面

```html
<body>
  <section id="container">
    <!--注意！！.left和.right谁在前都可以，但是.center必须在它俩后面-->
    <aside class="left">left(定宽)</aside>
    <aside class="right">right(定宽)</aside>
    <main class="center">center(宽度自适应)</main>
  </section>
</body>
```

css布局

```css
/***CSS***/
.left {
    width: 200px;
    height: 100vh;
    background: #61daa5;
    /* 左侧左浮动 */
    float: left;
}
.right {
    width: 200px;
    height: 100vh;
    background: #ffa7e9;
    /* 右侧右浮动 */
    float: right;
}
.center {
    height: 100vh;
    background: #78a5f1;
    /* 多出10px，是给左中右三栏留出10px间距 */
    margin-left: 210px;
    margin-right: 210px;
}
```

https://caogongzi.gitee.io/2019/04/02/three-columns-layout/

### 两列布局

与三列布局类似，一栏定宽，一栏自适应，也有五种实现方案

Flex

```html
<body>
  <div id='parent'>
    <div id="left">左列定宽</div>
  	<div id="right">右列自适应</div>
  </div>
</body>
<css>
#parent {
	width: 100%;
  height: 400px;
  display: flex;
}
#left {
	width: 200px;
  background: blue;
}
#green {
	flex: 1;
  background: green
}
</css>
```

Grid

```html
<body>
  <div id='parent'>
    <div id="left">左列定宽</div>
  	<div id="right">右列自适应</div>
  </div>
</body>
<css>
#parent {
	width: 100%;
  height: 400px;
  display: grid;
  grid-template-columns: 200px auto;
}
#left {
  background: blue;
}
#right {
	background: green;  
}
</css>
```

table布局

```html
<body>
  <div id='parent'>
    <div id="left">左列定宽</div>
  	<div id="right">右列自适应</div>
  </div>
</body>
<css>
#parent {
  width: 100%;
  height: 400px;
  display: table;
}
#left, #right {
	display: table-cell;
}
#left {
	width: 200px;
  background-color: blue;
}
#right {
	background-color: green;  
}
</css>
```

float

```html
<body>
  <div id="left">左列定宽</div>
  <div id="right">右列自适应</div>
</body>
<css>
#left {
  float: left;
  width: 200px;
  height: 400px;
  background-color: blue;
}
#right {
  float: right;
  margin-left: 200px;
  background-color: green;
}
</css>
```

绝对定位

```html
<body>
  <div id='parent'>
    <div id="left">左列定宽</div>
  	<div id="right">右列自适应</div>
  </div>
</body>
<css>
#parent {
	position: relavtive;  
}
#left {
	position: absolute; 
  top: 0;
  left: 0;
  width: 200px;
  height: 400px;
}
#right {
	position: absolute;
  left: 200px;
  top: 0;
  height: 400px;
}
</css>
```

角度单位有四种

deg度数，一个圆共360度，grad梯度，一个圆共400梯度，rad弧度，一个圆共2n弧度，turn转、圈，一个圆共1转，



### 品字布局

```html
<!doctype html>
<html>

<head>
  <meta charset="utf-8">
  <title>品字布局</title>
  <style>
    * {
        margin: 0;
        padding: 0;
      }
      div {
        width: 100%;
        height: 100px;
        background: red;
        font-size: 40px;
        line-height: 100px;
        color: #fff;
        text-align: center;
      }
      .div1 {
        margin: 0 auto 0;
      }
      .div2 {
        background: green;
        float: left;
        width: 50%;
      }
      .div3 {
        background: blue;
        float: left;
        width: 50%;
      }
  </style>
</head>

<body>
  <div class="div1">1</div>
  <div class="div2">2</div>
  <div class="div3">3</div>
</body>
</html>
```

## 典型样式

### 元素、文本垂直水平居中

三种方法：转换成表格、flex、css3transform

1.转换成表格

```css
.container{
  display:table-cell;
  vertical-align:center;
  text-align:center;
}
```

2.flex布局

```css
.container{
  display:flex;
  justify-content:center;
  align-items:center;
}
```

3.css3transform

```css
.container{
  width: 100%;
  height: 400px;
  background: #eee;
  position: relative;
}
.center{
  background: blue;
  position:absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```



垂直居中：容器元素设置`display:table-cell;vertical-align:middle`

子元素宽度为父元素的一半且为正方形

### 元素高度始终为宽度的一半

html

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>JS Bin</title>
</head>
<body>
  <div class="father">
    <div class="son"><span>A</span></div>
  </div>
</body>
</html>
```

css样式

```css
.father{
  overflow:hidden;
  position: absolute;
  left:20px;
  right:20px;
  top:50%;
  transform: translateY(-50%);
}

.son{
  height:0;
  width:100%;
  padding-top:50%;
  background:pink;
}

span{
  position:absolute;
  top:50%;
  left:50%; 
  transform: translate(-50%,-50%);
  font-size:10px;
}
```

https://segmentfault.com/a/1190000011668865

### 字体渐变色

html

```html
<html>
  <head>
    <meta charset="utf-8">
    <style>
      span{
        background: linear-gradient(to right,red,blue);
        -webkit-background-clip:text;
        color:transparent;
      }
    </style>
  </head>
  <body>
    <span>前端渐变色</span>
  </body>
</html>
```

## 常见图形

使用css绘制斜线、椭圆、三角形、圆形、扇形、梯形

斜线

用伪元素画一条直线，然后旋转

```css
<div></div>
div{
  div{
  position:relative;
  margin:50px auto;
  width:100px;
  height:100px;
  box-sizing:border-box;
  border:1px solid #333;  
  // background-color:#333;
  line-height:120px;
  text-indent:5px;
}

div::before{
  content:"";
  position:absolute;
  left:0;
  top:0;
  width:100%;
  height:50px;
  box-sizing:border-box;
  border-bottom:1px solid deeppink;
  transform-origin:bottom center;
  // transform:rotateZ(45deg) scale(1.414);
  animation:slash 5s infinite ease;
}

@keyframes slash{
  0%{
    transform:rotateZ(0deg) scale(1);
  }
  30%{
    transform:rotateZ(45deg) scale(1);
  }
  60%{
    transform:rotateZ(45deg) scale(1.414);
  }
  100%{
    transform:rotateZ(45deg) scale(1.414);
  }
}
}
```

或者

```css
div{
  position:relative;
  margin:50px auto;
  width:100px;
  height:100px;
  box-sizing:border-box;
  border:1px solid #333;  
  line-height:120px;
  text-indent:5px;
  background:
  linear-gradient(45deg, transparent 49.5%, deeppink 49.5%, deeppink 50.5%, transparent 50.5%);
}
```

先建立三角形，然后用白色小三角形遮挡，可以用剪裁clip-path或者伪元素

```css

```

圆形

```css
.circle{
  border-radius:50%;
  width:80px;
  height:80px;
  background:#666;
}
```

三角形

```css
.tri-angle{
   width:0px;
   height:0px;
   border-left:50px solid transparent;
   border-right:50px solid transparent;
   border-bottom:100px solid red;
}
```

扇形

```css

```

梯形

```css

```

### 房子

```html
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>CSS样式»</title>
<style>
.border-up{
    width: 0;
    height: 0;
    border-left: 150px solid transparent;
    border-right: 150px solid transparent;
    border-bottom:150px solid #333;
    position: relative;
    margin: 50px auto;

    background-image:linear-gradient(45deg,#a95f44  26%,transparent 0,transparent 75%,#a95f44  0),
    linear-gradient(45deg,#a95f44  26%,transparent 0,transparent 75%,#a95f44 0);
    background-size:30px 30px;
    background-position:0 0,15px 15px;
}
.border-up span{
    display: block;
    width: 0;height: 0;
    border-left: 147px solid transparent;
    border-right: 145px solid transparent;
    border-bottom: 147px solid #F0981C;
    position: absolute;left: -147px;
    top: 1px;
}
.div3{
    width:40px;
    height:40px;
    background-color:transparent;
    float:left;
}
.div-border1{
    border-top:solid 1px;
    border-left:solid 1px;
    border-bottom:solid 1px;
}
.div-border2{
    border-top:solid 1px;
    border-right:solid 1px;
    border-left:solid 1px;
    border-bottom:solid 1px;
}
.div-border3{
    border-left:solid 1px;
    border-bottom:solid 1px;
}
.div-border4{
    border-right:solid 1px;
    border-left:solid 1px;
    border-bottom:solid 1px;
}
.div{
    width:120px;
    height:40px;
    top:56px;
    margin-left:-45px;
    z-index: 99999;
    position:relative;
}
.chimney{
    background-image:linear-gradient(45deg,#a95f44  26%,transparent 0,transparent 75%,#a95f44  0),
    linear-gradient(45deg,#a95f44  26%,transparent 0,transparent 75%,#a95f44 0);
    background-size:30px 30px;
    background-position:0 0,15px 15px;
    width: 30px;
    height: 80px;
    border:  1px solid;
    margin-left:  40px;
    margin-top:  -30px;
}
.house{
 		width: 240px;
    height: 200px;
    border: 1px solid;
    background-color: #FFFFFF;
    margin-left: -122px;
    margin-top: 56px;
}
</style>
</head>
<body>
<div class="border-up">
		<span></span>
		<div class="div">
      <div class="div3 div-border1"></div>
      <div class="div3 div-border2"></div>
      <div class="div3 div-border3"></div>
      <div class="div3 div-border4"></div>
    </div>
    <div class="chimney" style=""></div>
    <div class="house"></div>
</div>
</body>
</html>
```



### 伪类时间轴

```html
<div class="message_item">
    <div class="message_time">2020-05-13 19:11</div>
    <sapn class="message_circle"></sapn>
</div>
<div class="message_item">
    <div class="message_time">2020-05-13 19:10</div>
    <sapn class="message_circle"></sapn>
</div>
```

样式

```css
.message_item{
    height: 145px;
    width: 300px;
    padding-left: 12px;
    border-left: 1px solid #979797;
    position: relative;
}
.message_time{
    height: 17px;
    line-height: 17px;
    font-size: 12px;
    margin-bottom: 12px;
}
.message_time:before{
    content: '';
    display: block;
    width: 2px;
    height: 93%;
    margin-top: 25px;
    background: #00D1E3;
    position: absolute;
    left: 30%;
    top: 10px;
}
.message_circle{
    position: absolute;
    width: 8px;
    height: 8px;
    background-color: #547ABD;
    border-radius: 50%;
    left: -4px;
    top: 5px;
}
```

### 容量球效果

```html
<div class="box">
    <div class="circular">
        <div class="content">
        </div>
        <span class="num">40%</span>
    </div>
</div>
```

样式

```css
.box{
    height: 500px;
    padding-top: 100px;
    padding-left: 200px;
}
.circular{
    height: 100px;
    width: 100px;
    border: 2px solid #4682B4;
    border-radius: 50%;
    overflow: hidden;
    box-sizing: border-box;
    position: relative;
}
.num{
    position: absolute;
    left: 50%;
    top: 50%;
    z-index: 30;
    transform: translate(-50%,-50%);
}
.content{
    position: absolute;
    height: 30px;
    width: 100px;
    background: #4682B4;
    bottom: 0px;
}
.content::after, .content::before{
    content: "";
    position: absolute;
    width: 400px;
    height: 400px;
    top: 0;
    left: 50%;
    background-color: rgba(255, 255, 255, .7);
    border-radius: 40% 42% 40% 41%;
    transform: translate(-50%, -100%) rotate(0);
    animation: rotate 8s linear infinite;
    z-index: 10;
}
.content::after{
    border-radius: 42% 40% 41% 40%;
    background-color: rgba(255, 255, 255, .9);
    transform: translate(-50%, -100%) rotate(0);
    animation: rotate 8s linear -5s infinite;
    z-index: 20;
}

@keyframes rotate {
    50% {
        transform: translate(-50%, -103%) rotate(180deg);
    } 100% {
        transform: translate(-50%, -100%) rotate(360deg);
    }
}
```

### 卡券效果

```html
<html>
<link tyep="css/text">
  .coupon {
     width:300px;
     height:100px;
     line-height:100px;
     margin:50px auto;
     text-align:center;
     position:relative;
     background:radial-gradient(circle at right bottom,transparent 10px,#FFFFFF 0) top right /50% 51px no-repeat
                radial-gradient(circle at left bottom,transparent 10px,#FFFFFF 0) top left /50% 51px no-repeat
                radial-gradient(circle at right top,transparent 10px,#FFFFFF 0) bottom right /50% 51px no-repeat
                radial-gradient(circle at left top,transparent 10px,#FFFFFF 0) bottom left /50% 51px no-repeat
     filter:drop-shadow(2px 2px 2px rgba(0,0,0,0.2))
  }
  .coupon span {
     display:inline-block;
     vertical-align:middle;
     margin-right:10px;
     color:red;
     font-size:50px;
     font-weight:400;
  }
</link>
<body>
   <p class="coupon">
      <span>400</span>
   </p>
</body>
</html>
```

### 虚线框

```html
<html>
<link type="text/css">
.dotted-line {
  width:800px;
  margin:auto;
  padding:20px;
  border:1px dashed transparent;
  background:linear-gradient(white,white) padding-box,repeat-linear-gradient(-45deg,red 0,#ccc 0.25em,white 0,white 0.75em);
} 
</css>
<body>
  <p class="dotted-line">庭院深深，不知有多深？杨柳依依，飞扬起片片烟雾，一重重帘幕不知道有多少层</p>
</body>
</html>
```

### 圆点

```css
.circle {
	width: 10px;
  height: 10px;
  background-color: red;
  border-radius: 50%;
  display: inline-block;
  margin-right: 5px;
}
```

## 滚动条样式

webkit下滚动条主要有7个属性：

::webkit-scrollbar：滚动条整体部分，可以设置宽度等

::webkit-scrollbar-button：滚动条两端的按钮

::webkit-scrollbar-track：外层轨道

::webkit-scrollbar-track-piece：内层滚动槽

::webkit-scrollbar-thumb：滚动的滑块

::webkit-scrollbar-corner：边角

::webkit-resized：定义右下角拖动块的样式

上述七个属性都可以设置边框、阴影、背景图片、背景颜色等等。此外下面的伪类可以应用到上述的伪元素中：

:horizontal//适用于任何水平方向的滚动条

:vertical//适用于任何垂直方向的滚动条

:decrement//标识按钮或内层轨道是否会减小

:increment//标识按钮或者内层轨道是否会增大视窗的位置，比如垂直滚动条的下边和水平滚动条的右边

:start：标识对象是否放在滑块的前面

:end：标识对象是否放在滑块的后面

:double-button：判断一个按钮是否自己同一端的一对按钮中的一个，或者内层轨道是否紧靠一对按钮

:single-button：判断一个按钮是否自己独立的在滚动条的一段，或者内层轨道是否紧靠一个single-button

:no-button：判断内层轨道是否要滚到滚动条的终端

:corner-present：指示滚动条圆角是否显示

:window-inactive：指示应用滚动条的某个页面容器是否当前被激活

ie下相对简单，只能设置颜色：

Scrollbar-3dlight-color：滚动立体条亮边的颜色

Scrollbar-highlight-color：滚动条的高亮颜色

Scrollbar-face-color：立体滚动条的颜色

Scrollbar-arrow-color：三角箭头的颜色

Scrollbar-shadow-color：立体滚动条阴影的颜色

Scrollbar-dark-shadow-color：立体滚动条外阴影的颜色

Scrollbar-base-color：滚动条基色

Scrollbar-track-color：滚动条背景颜色

Https://segmentfault.com/a/1190000012800450



## 字体

 在不同操作系统、不同游览器里面默认显示的字体是不一样的，并且相同字体在不同操作系统里面渲染的效果也不尽相同，

windows平台

`微软雅黑`为Win平台上最值得选择的中文字体，但非游览器默认，需要设置；西文字体的选择以`Arial`、`Tahoma`等无衬线字体为主。

mac os

`苹方`和`San Francisco`为苹果推出的最新字体，显示效果也最为优雅

安卓

`Droid Sans`为安卓系统中默认的西文字体，是一款人文主义无衬线字体，而`Droid Sans Fallback`则是包含汉字、日文假名、韩文的文字扩展支持。

ios系统

iOS系统的字体和Mac OS系统的字体相同，保证了Mac上的字体效果，iOS设备就没有太大问题。

linux

文泉驿微米黑：几乎是 Linux 社区现有的最佳简体中文字体。

引入不同字体时中文和英文的字体是不同的。先声明英文字体，再声明中文字体。

苹方（PingFang SC）、黑体-简（Heiti SC）、冬青黑体（ Hiragino Sans GB ）、Microsoft Yahei（微软雅黑）、宋体（SimSun）

css中引入

```css
font-family:"PingFang SC",
```

字体族大体上分为两类：`sans-serif（无衬线体）`和`serif（衬线体）`，一般非衬线字体在显示器中的显示效果会比较好，一般非衬线字体在显示器中的显示效果会比较好，
