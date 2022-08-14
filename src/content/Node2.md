---
title: Javascript开发（二）
date: 2021-01-15 21:40:33
categories: IT
tags:
    - IT，Web,Node
toc: true
thumbnail: http://cdn.kunkunzhang.top/jsEvent.jpg
---

​     第二篇主要讲原生js语言的原生方法，如继承、闭包和原型链等

<!--more-->

## js基本语法

### 宿主对象

#### Window

属性

`window.name`属性是一个字符串，表示当前浏览器窗口的名字。窗口不一定需要名字，这个属性主要配合超链接和表单的`target`属性使用。

`window.closed`属性返回一个布尔值，表示窗口是否关闭。

`window.opener`属性表示打开当前窗口的父窗口。如果当前窗口没有父窗口（即直接在地址栏输入打开），则返回`null`。

`window.frames`属性返回一个类似数组的对象，成员为页面内所有框架窗口，包括`frame`元素和`iframe`元素。`window.frames[0]`表示页面中第一个框架窗口。

`window.length`属性返回当前网页包含的框架总数。如果当前网页不包含`frame`和`iframe`元素，那么`window.length`就返回`0`。

`window.frameElement`属性主要用于当前窗口嵌在另一个网页的情况（嵌入`<object>`、`<iframe>`或`<embed>`元素），返回当前窗口所在的那个元素节点。如果当前窗口是顶层窗口，或者所嵌入的那个网页不是同源的，该属性返回`null`。

`window.top`属性指向最顶层窗口，主要用于在框架窗口（frame）里面获取顶层窗口。

`window.parent`属性指向父窗口。如果当前窗口没有父窗口，`window.parent`指向自身。

`window.devicePixelRatio`属性返回一个数值，表示一个 CSS 像素的大小与一个物理像素的大小之间的比率。也就是说，它表示一个 CSS 像素由多少个物理像素组成。它可以用于判断用户的显示环境，如果这个比率较大，就表示用户正在使用高清屏幕，因此可以显示较大像素的图片。

`window.screenX`和`window.screenY`属性，返回浏览器窗口左上角相对于当前屏幕左上角的水平距离和垂直距离（单位像素）。这两个属性只读。

`window.innerHeight`和`window.innerWidth`属性，返回网页在当前窗口中可见部分的高度和宽度，即“视口”（viewport）的大小（单位像素）。这两个属性只读。

用户放大网页的时候（比如将网页从100%的大小放大为200%），这两个属性会变小。因为这时网页的像素大小不变（比如宽度还是960像素），只是每个像素占据的屏幕空间变大了，因为可见部分（视口）就变小了。

`window.outerHeight`和`window.outerWidth`属性返回浏览器窗口的高度和宽度，包括浏览器菜单和边框（单位像素）。这两个属性只读。

`window.scrollX`属性返回页面的水平滚动距离，`window.scrollY`属性返回页面的垂直滚动距离，单位都为像素。这两个属性只读。

- `window.locationbar`：地址栏对象
- `window.menubar`：菜单栏对象
- `window.scrollbars`：窗口的滚动条对象
- `window.toolbar`：工具栏对象
- `window.statusbar`：状态栏对象
- `window.personalbar`：用户安装的个人工具栏对象

window实例方法
`window.alert('Hello World')`;//弹出对话框，只有确定按钮，用于提醒用户信息
`var result = confirm('你最近好吗？');`//弹出的对话框，除了提示信息之外，只有“确定”和“取消”,返回布尔值
`var result = window.prompt()//`也是弹出对话框，但是提示框下面有输入框，并有“确定”和“取消”两个按钮，返回布尔值
`window.open(url, windowName, [windowFeatures])`新建另一个浏览器窗口，url为地址栏，
`window.close()`window方法,用于关闭当前窗口，

`window.stop()`方法完全等同于单击浏览器的停止按钮，会停止加载图像、视频等正在或等待加载的对象。

`window.moveTo(100, 200)`

`window.moveBy(25, 50)`

`window.focus()`激活窗口，使其获得焦点，出现在其他窗口的前面。

`window.blur()`方法将焦点从窗口移除。

`window.getSelection`方法返回一个`Selection`对象，表示用户现在选中的文本。

`window.resizeTo()`方法用于缩放窗口到指定大小。

`window.resizeBy()`方法用于缩放窗口。它与`window.resizeTo()`的区别是，它按照相对的量缩放，`window.resizeTo()`需要给出缩放后的绝对大小。

`window.scrollTo`方法用于将文档滚动到指定位置。它接受两个参数，表示滚动后位于窗口左上角的页面坐标。

`window.scrollBy()`方法用于将网页滚动指定距离（单位像素）。它接受两个参数：水平向右滚动的像素，垂直向下滚动的像素。

`window.print`方法会跳出打印对话框，与用户点击菜单里面的“打印”命令效果相同。

`window.getSelection`方法返回一个`Selection`对象，表示用户现在选中的文本。

`window.getComputedStyle()`方法接受一个元素节点作为参数，返回一个包含该元素的最终样式信息的对象

`window.matchMedia()`方法用来检查 CSS 的`mediaQuery`语句

##### requestAnimationFrame()与requestIdleCallback()事件

`window.requestAnimationFrame()`方法跟`setTimeout`类似，都是推迟某个函数的执行。不同之处在于，`setTimeout`必须指定推迟的时间，`window.requestAnimationFrame()`则是推迟到浏览器下一次重流时执行，执行完才会进行下一次重绘。重绘通常是 16ms 执行一次，不过浏览器会自动调节这个速率，比如网页切换到后台 Tab 页时，`requestAnimationFrame()`会暂停执行。

requestAnimationFrame采用系统时间间隔，保持最佳绘制效率，不会因为间隔时间过短，造成过度绘制，增加开销；也不会因为间隔时间太长，使用动画卡顿不流畅，让各种网页动画效果能够有一个统一的刷新机制，从而节省系统资源，提高系统性能，改善视觉效果。

如果某个函数会改变网页的布局，一般就放在`window.requestAnimationFrame()`里面执行，这样可以节省系统资源，使得网页效果更加平滑。因为慢速设备会用较慢的速率重流和重绘，而速度更快的设备会有更快的速率。requestAnimationFrame会把每一帧中的所有DOM操作集中起来，在一次重绘或回流中就完成，并且重绘或回流的时间间隔紧紧跟随浏览器的刷新频率
在隐藏或不可见的元素中，requestAnimationFrame将不会进行重绘或回流，这当然就意味着更少的CPU、GPU和内存使用量
requestAnimationFrame是由浏览器专门为动画提供的API，在运行时浏览器会自动优化方法的调用，并且如果页面不是激活状态下的话，动画会自动暂停，有效节省了CPU开销

`window.requestIdleCallback()`跟`setTimeout`类似，也是将某个函数推迟执行，但是它保证将回调函数推迟到系统资源空闲时执行。也就是说，如果某个任务不是很关键，就可以使用`window.requestIdleCallback()`将其推迟执行，以保证网页性能。

它跟`window.requestAnimationFrame()`的区别在于，后者指定回调函数在下一次浏览器重排时执行，问题在于下一次重排时，系统资源未必空闲，不一定能保证在16毫秒之内完成； `window.requestIdleCallback()`可以保证回调函数在系统资源空闲时执行。

##### 获取当前动画fps

requestAnimationFrame的回调函数执行次数通常与浏览器屏幕刷新次数相匹配，而利用这个API实现动画的原理就是回调函数内再次调用requestAnimationFrame，所以页面不断重绘时，然后检测1秒内requestAnimationFrame调用的次数，就是当前的FPS

```html
<script>
  let num = 0
  let height = 0
  let frame = 0
  window.onload = () => {
    let animationHeight = () => {
      document.getElementById('div').style.height = (++height) + 'px'
      if (height < 1000) {
        frame++
        requestAnimationFrame(animationHeight)
      }
    }
    // 每秒钟输出当前帧数
    setInterval(() => {
      console.log(frame)
      frame = 0
    }, 1000)
    requestAnimationFrame(animationHeight)
  }

</script>
```

事件

`load`事件发生在文档在浏览器窗口加载完毕时。`window.onload`属性可以指定这个事件的回调函数。

//浏览器脚本发生错误时，会触发window对象的error事件。通过window.onerror属性对该事件指定回调函数。

window.onerror = function(message,error){
  console.log("出错了")
}

Window对象的事件监听属性

```js
window.onafterprint：afterprint事件的监听函数。
window.onbeforeprint：beforeprint事件的监听函数。
window.onbeforeunload：beforeunload事件的监听函数。
window.onhashchange：hashchange事件的监听函数。
window.onlanguagechange: languagechange的监听函数。
window.onmessage：message事件的监听函数。
window.onmessageerror：MessageError事件的监听函数。
window.onoffline：offline事件的监听函数。
window.ononline：online事件的监听函数。
window.onpagehide：pagehide事件的监听函数。
window.onpageshow：pageshow事件的监听函数。
window.onpopstate：popstate事件的监听函数。
window.onstorage：storage事件的监听函数。
window.onunhandledrejection：未处理的 Promise 对象的reject事件的监听函数。
window.onunload：unload事件的监听函数。
```

##### window.onload与DOMcontentloaded、jquery中document.ready的区别

DOM解析的完整过程：

1. 解析HTML结构。
2. 加载外部脚本和样式表文件。
3. 解析并执行脚本代码。//js之类的
4. DOM树构建完成。//DOMContentLoaded
5. 加载图片等外部文件。
6. 页面加载完毕。//load

在第4步的时候`DOMContentLoaded`事件会被触发,也就是jquery的document.ready()事件。
在第6步的时候`load`事件会被触发。

区分的必要性

开发中我们经常需要给一些元素的事件绑定处理函数。但问题是，如果那个元素还没有加载到页面上，但是绑定事件已经执行完了，是没有效果的。这两个事件大致就是用来避免这样一种情况，将绑定的函数放在这两个事件的回调中，保证能在页面的某些元素加载完毕之后再绑定事件的函数。
 当然DOMContentLoaded机制更加合理，因为我们可以容忍图片，flash延迟加载，却不可以容忍看见内容后页面不可交互。



#### Location

Location是浏览器提供的原生对象，提供URL相关的信息和操作方法。

```js
document.location.href// http://user:passwd@www.example.com:4097/path/a.html?x=111#part1
document.location.protocol//当前 URL 的协议，包括冒号（:），"http:"
document.location.host//主机。如果端口不是协议默认的80和433，则还会包括冒号（:）和端口。"www.example.com:4097"
document.location.hostname//主机名，不包括端口，"www.example.com"
document.location.port//端口号，"4097"
document.location.pathname// URL 的路径部分，从根路径/开始。"/path/a.html"
document.location.search// "?x=111"
document.location.hash// "#part1"
document.location.username//域名前面的用户名，"user"
document.location.password//域名前面的密码，"passwd"
document.location.origin//URL 的协议、主机名和端口，"http://user:passwd@www.example.com:4097"
```

方法

```js
document.location.assign('http://www.example.com')//跳转到新的网址，可回退
document.location.replace('http://www.example.com')//跳转到新网址，不可回退
window.location.reload(true);// 向服务器重新请求当前网址
location.toString()//返回整个 URL 字符串，相当于读取Location.href属性。
```

#### History

`window.history`属性指向 History 对象，它表示当前窗口的浏览历史。

属性

`History.length`：当前窗口访问过的网址数量（包括当前网页）

`History.state`：History 堆栈最上层的状态值（详见下文）

方法

`History.back()`：移动到上一个网址，等同于点击浏览器的后退键。对于第一个访问的网址，该方法无效果。

`History.forward()`：移动到下一个网址，等同于点击浏览器的前进键。对于最后一个访问的网址，该方法无效果。

`History.go()`：接受一个整数作为参数，以当前网址为基准，移动到参数指定的网址，比如`go(1)`相当于`forward()`，`go(-1)`相当于`back()`。

`History.pushState(state, title, url)`方法用于在历史中添加一条记录。

`History.replaceState()`方法用来修改 History 对象的当前记录

#### Navigator 

指向浏览器和系统信息

```javascript
//属性
navigator.userAgent();//返回浏览器的useragent字符串，表示浏览器的厂商和版本信息
Navigator.platform//属性,返回用户的操作系统信息，比如MacIntel、Win32、Linux x86_64等。
navigator.cookieEnabled//返回一个布尔值，表示浏览器的 Cookie 功能是否打开。
//方法
navigator.javaEnabled()//方法，返回一个布尔值，表示浏览器是否能运行 Java Applet 小程序。
navigator.language//属性，返回一个字符串，表示浏览器的首选语言
Navigator.languages//属性，返回一个数组，表示用户可以接受的语言。

Navigator.geolocation//属性，返回一个 Geolocation 对象，包含用户地理位置的信息。该 API 只有在 HTTPS 协议下可用，
Geolocation.getCurrentPosition()//得到用户的当前位置
Geolocation.watchPosition()//监听用户位置变化
Geolocation.clearWatch()//取消watchPosition()方法指定的监听函数
```

window.screen表示当前显示的窗口，返回设备的显示信息

```js
Screen.height：浏览器窗口所在的屏幕的高度（单位像素）。
Screen.width：浏览器窗口所在的屏幕的宽度（单位像素）
Screen.availHeight：浏览器窗口可用的屏幕高度（单位像素）
Screen.availWidth：浏览器窗口可用的屏幕宽度（单位像素）
Screen.pixelDepth：整数，表示屏幕的色彩位数，比如24表示屏幕提供24位色彩。
Screen.colorDepth：Screen.pixelDepth的别名。严格地说，colorDepth 表示应用程序的颜色深度，pixelDepth 表示屏幕的颜色深度，绝大多数情况下，它们都是同一件事。
Screen.orientation：返回一个对象，表示屏幕的方向。该对象的type属性是一个字符串，表示屏幕的具体方向，landscape-primary表示横放，landscape-secondary表示颠倒的横放，portrait-primary表示竖放，portrait-secondary
```

#### XMLHttpRequest 对象

1999年，微软公司发布 IE 浏览器5.0版，第一次引入新功能：允许 JavaScript 脚本向服务器发起 HTTP 请求。2005年2月，AJAX 这个词第一次正式提出，它是Asynchronous JavaScript and XML 的缩写，指的是通过 JavaScript 的异步通信，从服务器获取 XML 文档从中提取数据，再更新当前网页的对应部分，而不用刷新整个网页。

后来，AJAX 这个词就成为 JavaScript 脚本发起 HTTP 通信的代名词，也就是说，只要用脚本发起通信，就可以叫做 AJAX 通信。

AJAX 通过原生的`XMLHttpRequest`对象发出 HTTP 请求，得到服务器返回的数据后，再进行处理。现在，服务器返回的都是 JSON 格式的数据，XML 格式已经过时了，但是 AJAX 这个名字已经成了一个通用名词，字面含义已经消失了。

ajax请求的步骤

1. 创建 XMLHttpRequest 实例
2. 发出 HTTP 请求
3. 接收服务器传回的数据
4. 更新网页数据

ajax支持多种协议（ftp、file等），可以发送任何格式的数据。

XMLHttpRequest对象的属性

`XMLHttpRequest.readyState`返回一个整数，表示实例对象的当前状态。该属性只读，返回以下值：

0:XMLHttpRequest 实例已经创建，但是没调用open方法

1:open方法已经调用，但没有调用send方法发起请求。此时仍然可以使用实例的setRequestHeader()方法设定HTTP请求的头信息

2:表示实例的send方法已经调用，服务器返回的头信息和状态码已经收到

3:表示正在接收服务器传来的数据体，此时如果实例的responseType属性等于text或者空字符串，responseText属性就会包含已经收到的部分信息

4:表示服务器返回的数据已经完全接收，或者本次接收已经失败

`XMLHttpRequest.onreadystatechange`属性指向一个监听函数，readystatechange事件发生时就会执行这个函数。此外，如果实例执行abort方法，也会触发该属性

**`XMLHttpRequest.response`**属性表示服务器返回的数据体。它可能是任何数据类型，比如字符串、二进制对象、对象等等。

**`XMLHttpRequest.responseType`**属性是一个字符串，表示服务器返回数据的类型，这个属性是可写的。设置这个属性的值可以告诉浏览器如何解读返回的数据。如果responseType设为空字符串，就是默认值text

responseType也可以是以下值：

Array buffer:ArrayBuffer对象，表示服务器返回二进制数组

blob：Blob对象，表示服务器返回二进制对象

document：Document对象，表示服务器返回一个文档对象

json：JSON对象

text：字符串

**`XMLHttpRequest.responseText`**属性返回从服务器接收到的字符串，该属性为只读。只有 HTTP 请求完成接收以后，该属性才会包含完整的数据。

**`XMLHttpRequest.responseURL`**属性是字符串，表示发送数据的服务器的网址。

`XMLHttpRequest.status`属性返回一个整数，表示服务器回应的 HTTP 状态码。

XMLHttpRequest 对象事件监听属性：

XMLHttpRequest 对象可以对以下事件指定监听函数。

- XMLHttpRequest.onloadstart：loadstart 事件（HTTP 请求发出）的监听函数
- XMLHttpRequest.onprogress：progress事件（正在发送和加载数据）的监听函数
- XMLHttpRequest.onabort：abort 事件（请求中止，比如用户调用了`abort()`方法）的监听函数
- XMLHttpRequest.onerror：error 事件（请求失败）的监听函数
- XMLHttpRequest.onload：load 事件（请求成功完成）的监听函数
- XMLHttpRequest.ontimeout：timeout 事件（用户指定的时限超过了，请求还未完成）的监听函数
- XMLHttpRequest.onloadend：loadend 事件（请求完成，不管成功或失败）的监听函数

XMLHttpRequest对象的方法

`XMLHttpRequest.open()`方法用于指定 HTTP 请求的参数，或者说初始化 XMLHttpRequest 实例对象。它一共可以接受五个参数。method：表示 HTTP 动词方法，比如GET、POST、PUT、DELETE、HEAD等。
url: 表示请求发送目标 URL。
async: 布尔值，表示请求是否为异步，默认为true。如果设为false，则send()方法只有等到收到服务器返回了结果，才会进行下一步操作。该参数可选。由于同步 AJAX 请求会造成浏览器失去响应，许多浏览器已经禁止在主线程使用，只允许 Worker 里面使用。所以，这个参数轻易不应该设为false。
user：表示用于认证的用户名，默认为空字符串。该参数可选。
password：表示用于认证的密码，默认为空字符串。该参数可选。

`XMLHttpRequest.send()`方法用于实际发出 HTTP 请求。它的参数是可选的，如果不带参数，就表示 HTTP 请求只有一个 URL，没有数据体，典型例子就是 GET 请求；如果带有参数，就表示除了头信息，还带有包含具体数据的信息体，典型例子就是 POST 请求。

`XMLHttpRequest.setRequestHeader()`方法用于设置浏览器发送的 HTTP 请求的头信息。该方法接受两个参数。第一个参数是字符串，表示头信息的字段名，第二个参数是字段值。

`XMLHttpRequest.getResponseHeader()`方法返回 HTTP 头信息指定字段的值，如果还没有收到服务器回应或者指定字段不存在，返回null

`XMLHttpRequest.getAllResponseHeaders()`方法返回一个字符串，表示服务器发来的所有 HTTP 头信息。格式为字符串，每个头信息之间使用`CRLF`分隔（回车+换行），如果没有收到服务器回应，该属性为`null`。如果发生网络错误，该属性为空字符串。

`XMLHttpRequest.abort()`方法用来终止已经发出的 HTTP 请求。调用这个方法以后，`readyState`属性变为`4`，`status`属性变为`0`。

XMLHttpRequest 对象的事件

readyStateChange 事件

`readyState`属性的值发生改变，就会触发 readyStateChange 事件。

我们可以通过`onReadyStateChange`属性，指定这个事件的监听函数，对不同状态进行不同处理。尤其是当状态变为`4`的时候，表示通信成功，这时回调函数就可以处理服务器传送回来的数据。

progress 事件

XMLHttpRequest 实例对象本身和实例的`upload`属性，都有一个`progress`事件，会不断返回上传的进度。

load 事件表示服务器传来的数据接收完毕，error 事件表示请求出错，abort 事件表示请求被中断（比如用户取消请求）。

loadend事件

`abort`、`load`和`error`这三个事件，会伴随一个`loadend`事件，表示请求结束，但不知道其是否成功。



#### arraybuffer blob filereader

Blob 对象表示一个二进制文件的数据内容，比如一个图片文件的内容就可以通过 Blob 对象读写。它通常用来读写文件，它的名字是 Binary Large Object （二进制大型对象）的缩写。它与 ArrayBuffer 的区别在于，它用于操作二进制文件，而 ArrayBuffer 用于操作内存。

`Blob`构造函数接受两个参数。第一个参数是数组，成员是字符串或二进制对象，表示新生成的`Blob`实例对象的内容；第二个参数是可选的，是一个配置对象，目前只有一个属性`type`，它的值是一个字符串，表示数据的 MIME 类型，默认是空字符串。

文件选择器`<input type="file">`用来让用户选取文件。出于安全考虑，浏览器不允许脚本自行设置这个控件的`value`属性，即文件必须是用户手动选取的，不能是脚本指定的。一旦用户选好了文件，脚本就可以读取这个文件。

文件选择器返回一个 FileList 对象，该对象是一个类似数组的成员，每个成员都是一个 File 实例对象。File 实例对象是一个特殊的 Blob 实例，增加了`name`和`lastModifiedDate`属性。



取得 Blob 对象以后，可以通过`FileReader`对象，读取 Blob 对象的内容，即文件内容。

FileReader 对象提供四个方法，处理 Blob 对象。Blob 对象作为参数传入这些方法，然后以指定的格式返回。

- `FileReader.readAsText()`：返回文本，需要指定文本编码，默认为 UTF-8。
- `FileReader.readAsArrayBuffer()`：返回 ArrayBuffer 对象。
- `FileReader.readAsDataURL()`：返回 Data URL。
- `FileReader.readAsBinaryString()`：返回原始的二进制字符串。

```javascript
function typefile(file) {
  // 文件开头的四个字节，生成一个 Blob 对象
  var slice = file.slice(0, 4);
  var reader = new FileReader();
  // 读取这四个字节
  reader.readAsArrayBuffer(slice);
  reader.onload = function (e) {
    var buffer = reader.result;
    // 将这四个字节的内容，视作一个32位整数
    var view = new DataView(buffer);
    var magic = view.getUint32(0, false);
    // 根据文件的前四个字节，判断它的类型
    switch(magic) {
      case 0x89504E47: file.verified_type = 'image/png'; break;
      case 0x47494638: file.verified_type = 'image/gif'; break;
      case 0x25504446: file.verified_type = 'application/pdf'; break;
      case 0x504b0304: file.verified_type = 'application/zip'; break;
    }
    console.log(file.name, file.verified_type);
  };
}
```



#### File

File 对象代表一个文件，用来读写文件信息。

File的属性：

- File.lastModified：最后修改时间
- File.name：文件名或文件路径
- File.size：文件大小（单位字节）
- File.type：文件的 MIME 类型



### 事件

#### 事件级别

事件级别分为Dom0级、Dom2级和Dom3级

Dom0级指在JavaScript中指定对象，最后通过事件处理属性赋值null来解绑事件

```html
<body>
  <button value="按钮"></button>
  <script>
    var button = document.querySelector("button");
    btn.click = function(){ alert("0")}
  </script>
</body>
```

缺点：

1.不能给同一元素添加多个事件，如果添加多个事件会互相覆盖

2.不能控制事件流

Dom2级事件是对指定对象添加事件处理函数，可以是多个，如

```html
<body>
  <div id="demo"></div>
  <script>
     demo.addEventListener("onclick",clickfn,false);
     demo.addEventListener("mouseover",showfn,false);
    function clickfn(){
      alert('1')
    }
    function showfn(){
      alert('2')
    }
  </script>
</body>
```

特别地，IE8版本以下的IE浏览器下不支持addEventListener和removeEventListener，使用attachEvent和detachEvent

Dom2与Dom0之间不会互相覆盖

Dom3级是在Dom2级的基础上添加更多事件类型，

UI事件，主要包括load,unload,abort,error,select,resize,scroll事件。

焦点事件，当用户获得或失去焦点时触发，如focus、blur

鼠标事件，当用户在鼠标上操作时触发事件，如dbclick、mouseup

键盘事件、当用户在键盘上操作时触发事件，如keydown，keypress

文本事件：当在文档中输入文本时触发，如textInput

滚轮事件，当用户使用鼠标滚轮或者类似设备时触发事件，如mousewheel

合成事件：当为IME(输入法编辑器)输出字符时触发，如compositionstart

变动事件：当底层Dom结构发生变化时触发，如DomsubtreeModified

html5事件、设备事件

Dom3也允许自定义事件

事件模型是指分为三个阶段：

- 捕获阶段：在事件冒泡的模型中，捕获阶段不会响应任何事件；
- 目标阶段：目标阶段就是指事件响应到触发事件的最底层元素上；
- 冒泡阶段：冒泡阶段就是事件的触发响应会从最底层目标一层层地向外到最外层（根节点），事件代理即是利用事件冒泡的机制把里层所需要响应的事件绑定到外层；

#### EventTarget对象

DOM 的事件操作（监听和触发），都定义在`EventTarget`接口。所有节点对象都部署了这个接口，其他一些需要事件通信的浏览器内置对象（比如，`XMLHttpRequest`、`AudioNode`、`AudioContext`）也部署了这个接口。

`EventTarget.addEventListener()`用于在当前节点或对象上，定义一个特定事件的监听函数。一旦这个事件发生，就会执行监听函数。该方法没有返回值。

addEventListener()有三个参数：

type：表示监听事件类型的字符串，比如click等

listener：监听函数

options：指定有关listener属性等可选参数对象。在旧版的DOM规定中addEventListener的第三个参数是布尔值表示是否在捕获阶段调用事件处理程序。随着时间的推移，很明显需要更多的选项。与其在后面添加更多的参数，不如将第三个参数改为一个包含各种属性的对象

​				capture：布尔值，表示listener会在该类型的事件捕获阶段传播到该EventTarget时触发

​				once：布尔值，表示listener在添加之后最多只被调用一次，如果是true，listener会在其被调用之后自动移除

​				passive：设置为true时，表示listener永远不会调用preventDefault。如果listener仍然调用了这个函数，客户端将会忽略它并抛出一个警告

​				

`EventTarget.removeEventListener`方法用来移除`addEventListener`方法添加的事件监听函数。

`EventTarget.dispatchEvent`方法在当前节点上触发指定事件，从而触发监听函数的执行。该方法返回一个布尔值，只要有一个监听函数调用了`Event.preventDefault()`，则返回值为`false`，否则为`true`。

#### Event对象

事件发生以后，会产生一个事件对象，作为参数传给监听函数。浏览器原生提供一个`Event`对象，所有的事件都是这个对象的实例，或者说继承了`Event.prototype`对象。

实例属性

`Event.bubbles`属性返回一个布尔值，表示当前事件是否会冒泡。该属性为只读属性，一般用来了解 Event 实例是否可以冒泡。前面说过，除非显式声明，`Event`构造函数生成的事件，默认是不冒泡的。

`Event.eventPhase`属性返回一个整数常量，表示事件目前所处的阶段。该属性只读。

- 0，事件目前没有发生。
- 1，事件目前处于捕获阶段，即处于从祖先节点向目标节点的传播过程中。
- 2，事件到达目标节点，即`Event.target`属性指向的那个节点。
- 3，事件处于冒泡阶段，即处于从目标节点向祖先节点的反向传播过程中。

`Event.cancelable`属性返回一个布尔值，表示事件是否可以取消。该属性为只读属性，一般用来了解 Event 实例的特性。

事件发生以后，会经过捕获和冒泡两个阶段，依次通过多个 DOM 节点。因此，任意事件都有两个与事件相关的节点，一个是事件的原始触发节点（`Event.target`），另一个是事件当前正在通过的节点（`Event.currentTarget`）。前者通常是后者的后代节点。

`Event.currentTarget`属性返回事件当前所在的节点，即事件当前正在通过的节点，也就是当前正在执行的监听函数所在的那个节点。随着事件的传播，这个属性的值会变。

`Event.target`属性返回原始触发事件的那个节点，即事件最初发生的节点。这个属性不会随着事件的传播而改变。

`Event.type`属性返回一个字符串，表示事件类型。事件的类型是在生成事件的时候指定的。该属性只读。

`Event.timeStamp`属性返回一个毫秒时间戳，表示事件发生的时间。它是相对于网页加载成功开始计算的。

`Event.isTrusted`属性返回一个布尔值，表示该事件是否由真实的用户行为产生。比如，用户点击链接会产生一个`click`事件，该事件是用户产生的；`Event`构造函数生成的事件，则是脚本产生的。

`Event.detail`属性只有浏览器的 UI （用户界面）事件才具有。该属性返回一个数值，表示事件的某种信息。具体含义与事件类型相关。比如，对于`click`和`dblclick`事件，`Event.detail`是鼠标按下的次数（`1`表示单击，`2`表示双击，`3`表示三击）；对于鼠标滚轮事件，`Event.detail`是滚轮正向滚动的距离，负值就是负向滚动的距离，返回值总是3的倍数。

实例方法

`Event.preventDefault`方法取消浏览器对当前事件的默认行为。比如点击链接后，浏览器默认会跳转到另一个页面，使用这个方法以后，就不会跳转了；再比如，按一下空格键，页面向下滚动一段距离，使用这个方法以后也不会滚动了。该方法生效的前提是，事件对象的`cancelable`属性为`true`，如果为`false`，调用该方法没有任何效果。**该方法只是取消事件对当前元素的默认影响，不会阻止事件的传播。如果要阻止传播，可以使用`stopPropagation()`或`stopImmediatePropagation()`方法。**

`Event.stopPropagation`方法阻止事件在 DOM 中继续传播，防止再触发定义在别的节点上的监听函数，但是不包括在当前节点上其他的事件监听函数。

`Event.stopImmediatePropagation`方法阻止同一个事件的其他监听函数被调用，不管监听函数定义在当前节点还是其他节点。也就是说，该方法阻止事件的传播，比`Event.stopPropagation()`更彻底。

`Event.composedPath()`返回一个数组，成员是事件的最底层节点和依次冒泡经过的所有上层节点。

#### 事件模型

##### 事件传播（事件冒泡与事件捕获）

一个事件发生后，会在子元素和父元素之间传播，这个传播分为3个阶段：

- **第一阶段**：从`window`对象传导到目标节点（上层传到底层），称为“捕获阶段”（capture phase）。
- **第二阶段**：在目标节点上触发，称为“目标阶段”（target phase）。
- **第三阶段**：从目标节点传导回`window`对象（从底层传回上层），称为“冒泡阶段”（bubbling phase）。

事件冒泡可以形象地比喻为把一颗石头投入水中，泡泡会一直从水底冒出水面。也就是说，事件会从最内层的元素开始发生，一直向上传播，直到document对象。

网景提出另一种事件流名为**事件捕获**(event capturing)。与事件冒泡相反，事件会从最外层开始发生，直到最具体的元素。

最后采用w3c的折中方案：先捕获后冒泡，形成了事件传播的3个阶段

简单来说，如果父dom和子dom都定义了相同的事件（如点击事件），那么触发子dom的事件时会同时触发父dom上的事件

举例

##### 阻止事件冒泡

```js
$("#div1").mousedown(function(e){
    var e=event||window.event;
    event.stopPropagation();
});
```

不支持冒泡的事件类型：

mouseenter、mouseleave、blur、focus、load、unload、resize

不支持冒泡的事件，可以在捕获阶段实现事件代理

##### 事件委托/事件代理

由于事件传播的存在，事件会在冒泡阶段向上传播到父节点。因此可以把

事件委托，通俗地来讲，就是把一个元素响应事件（click、keydown......）的函数委托到另一个元素；

事件委托会把一个或者一组元素的事件委托到它的父层或者更外层元素上，真正绑定事件的是外层元素，当事件响应到需要绑定的元素上时，会通过事件冒泡机制从而触发它的外层元素的绑定事件上，然后在外层元素上去执行函数。

实例

```html
<ul id="list">
  <li>item 1</li>
  <li>item 2</li>
  <li>item 3</li>
  ......
  <li>item n</li>
</ul>
<script>
// 给父层元素绑定事件
document.getElementById('list').addEventListener('click', function (e) {
  // 兼容性处理
  var event = e || window.event;
  var target = event.target || event.srcElement;
  // 判断是否匹配目标元素
  if (target.nodeName.toLocaleLowerCase === 'li') {
    console.log('the content is: ', target.innerHTML);
  }
});
</script>
```

事件委托的优点：

1.减少内存消耗

正常来说，如果我们有一个列表，列表之中有大量的列表项，我们需要在点击列表项的时候响应一个事件；

比较好的方法就是把这个点击事件绑定到他的父层，也就是 `ul` 上，然后在执行事件的时候再去匹配判断目标元素；

所以事件委托可以减少大量的内存消耗，节约效率。

2.可以动态绑定事件

例子中列表项就几个，我们给每个列表项都绑定了事件；

在很多时候，我们需要通过 AJAX 或者用户操作动态的增加或者去除列表项元素，那么在每一次改变的时候都需要重新给新增的元素绑定事件，给即将删去的元素解绑事件；

如果用了事件委托就没有这种麻烦了，因为事件是绑定在父层的，和目标元素的增减是没有关系的，执行到目标元素是在真正响应执行事件函数的过程中去匹配的；

事件委托也是有一定局限性的；

比如 focus、blur 之类的事件本身没有事件冒泡机制，所以无法委托；

mousemove、mouseout 这样的事件，虽然有事件冒泡，但是只能不断通过位置去计算定位，对性能消耗高，因此也是不适合于事件委托的；

对于事件代理(事件委托）来说，在事件捕获或者事件冒泡阶段处理并没有明显的优劣之分，但是由于事件冒泡的事件流模型被所有主流的浏览器兼容，从兼容性角度来说还是建议大家使用事件冒泡模型。

#### 表单事件

input事件

`input`事件当`<input>`、`<select>`、`<textarea>`的值发生变化时触发。对于复选框（`<input type=checkbox>`）或单选框（`<input type=radio>`），用户改变选项时，也会触发这个事件。另外，对于打开`contenteditable`属性的元素，只要值发生变化，也会触发`input`事件。

`input`事件的一个特点，就是会连续触发，比如用户每按下一次按键，就会触发一次`input`事件

该事件跟`change`事件很像，不同之处在于`input`事件在元素的值发生变化后立即发生，而`change`在元素失去焦点时发生，而内容此时可能已经变化多次。也就是说，如果有连续变化，`input`事件会触发多次，而`change`事件只在失去焦点时触发一次

change事件

`change`事件当`<input>`、`<select>`、`<textarea>`的值发生变化时触发。它与`input`事件的最大不同，就是不会连续触发，只有当全部修改完成时才会触发，另一方面`input`事件必然伴随`change`事件。具体来说，分成以下几种情况。

- 激活单选框（radio）或复选框（checkbox）时触发。
- 用户提交时触发。比如，从下列列表（select）完成选择，在日期或文件输入框完成选择。
- 当文本框或`<textarea>`元素的值发生改变，并且丧失焦点时触发。

`select`事件

当在`<input>`、`<textarea>`里面选中文本时触发

选中的文本可以通过`event.target`元素的`selectionDirection`、`selectionEnd`、`selectionStart`和`value`属性拿到。

valid事件

用户提交表单时，如果表单元素的值不满足校验条件，就会触发`invalid`事件

reset、submit事件

这两个事件发生在表单对象`<form>`上，而不是发生在表单的成员上。

`reset`事件当表单重置（所有表单成员变回默认值）时触发。

`submit`事件当表单数据向服务器提交时触发。注意，`submit`事件的发生对象是`<form>`元素，而不是`<button>`元素，因为提交的是表单，而不是按钮

##### 中文输入法输入事件composition

如果一个 INPUT 中，用户使用中文输入法，那么原生的键盘事件就会发生变化，无法获取正确的 keycode 及对应的输入内容。从前端的能力，只能操作浏览器相关的 [API](https://so.csdn.net/so/search?q=API&spm=1001.2101.3001.7020)，不能获取中文输入法的内置 API。查阅资料后，可以使用 composition 事件来监听相关的事件

不同中文输入法的情况可能大同小异（例如搜狗输入法，中文输入时，keycode 就是225，这样无法检测到点击的键）

composition 事件组合分成三个事件：compositionstart、compositionupdate、compositionend，分别对应中文输入法下，开始输入、更新输入、结束输入的事件。

```javascript
// 首先获取INPUT元素，或者全局document元素
const inputElement = document.querySelector('input[type="text"]');

// 当输入区域获取焦点后，点击键盘，会触发 composition 事件组合，通过 event.data 可以获取输入的字符
inputElement.addEventListener('compositionstart', (event) => {
  console.log(`generated characters were: ${event.data}`);
});

```

开始输入首先触发一次 compositionstart 

然后触发一次 compositionupdate，如果继续点击键盘，那么继续触发这个事件

最后，点击空格键输入中文时，触发 compositionend 事件

```javascript
const inputElement = document.querySelector('input[type="text"]');
const log = document.querySelector('.event-log-contents');
const clearLog = document.querySelector('.clear-log');

clearLog.addEventListener('click', () => {
    log.textContent = '';
});

function handleEvent(event) {
    log.textContent = log.textContent + `${event.type}: ${event.data}\n`;
}

inputElement.addEventListener('compositionstart', handleEvent);
inputElement.addEventListener('compositionupdate', handleEvent);
inputElement.addEventListener('compositionend', handleEvent);
```



#### 鼠标事件

鼠标点击事件

- `click`：按下鼠标（通常是按下主按钮）时触发。
- `dblclick`：在同一个元素上双击鼠标时触发。
- `mousedown`：按下鼠标键时触发。
- `mouseup`：释放按下的鼠标键时触发。

鼠标移动事件

`mousemove`：当鼠标在一个节点内部移动时触发。当鼠标持续移动时，该事件会连续触发。为了避免性能问题，建议对该事件的监听函数做一些限定，比如限定一段时间内只能运行一次

`mouseover`事件和`mouseenter`事件，都是鼠标进入一个节点时触发。两者的区别是，`mouseenter`事件只触发一次，而只要鼠标在节点内部移动，`mouseover`事件会在子节点上触发多次

`mouseout`事件和`mouseleave`事件，都是鼠标离开一个节点时触发。两者的区别是，在父元素内部离开一个子元素时，`mouseleave`事件不会触发，而`mouseout`事件会触发





#### 键盘事件

键盘事件由用户击打键盘触发，主要有`keydown`、`keypress`、`keyup`三个事件，它们都继承了`KeyboardEvent`接口。

- `keydown`：按下键盘时触发。
- `keypress`：按下有值的键时触发，即按下 Ctrl、Alt、Shift、Meta 这样无值的键，这个事件不会触发。对于有值的键，按下时先触发`keydown`事件，再触发这个事件。
- `keyup`：松开键盘时触发该事件。

如果用户一直按键不松开，就会连续触发键盘事件，触发的顺序如下。

1. keydown
2. keypress
3. keydown
4. keypress
5. ...（重复以上过程）
6. keyup

`KeyboardEvent`接口用来描述用户与键盘的互动。这个接口继承了`Event`接口，并且定义了自己的实例属性和实例方法

- `KeyboardEvent.altKey`：是否按下 Alt 键
- `KeyboardEvent.ctrlKey`：是否按下 Ctrl 键
- `KeyboardEvent.metaKey`：是否按下 meta 键（Mac 系统是一个四瓣的小花，Windows 系统是 windows 键）
- `KeyboardEvent.shiftKey`：是否按下 Shift 键

#### 进度事件

进度事件用来描述资源加载的进度，主要由 AJAX 请求、`<img>`、`<audio>`、`<video>`、`<style>`、`<link>`等外部资源的加载触发，继承了`ProgressEvent`接口。它主要包含以下几种事件。

- `abort`：外部资源中止加载时（比如用户取消）触发。如果发生错误导致中止，不会触发该事件。
- `error`：由于错误导致外部资源无法加载时触发。
- `load`：外部资源加载成功时触发。
- `loadstart`：外部资源开始加载时触发。
- `loadend`：外部资源停止加载时触发，发生顺序排在`error`、`abort`、`load`等事件的后面。
- `progress`：外部资源加载过程中不断触发。
- `timeout`：加载超时时触发。

`ProgressEvent`接口主要用来描述外部资源加载的进度，比如 AJAX 加载、`<img>`、`<video>`、`<style>`、`<link>`等外部资源加载。进度相关的事件都继承了这个接口

`ProgressEvent()`构造函数接受两个参数。第一个参数是字符串，表示事件的类型，这个参数是必须的。第二个参数是一个配置对象，表示事件的属性，该参数可选。配置对象除了可以使用`Event`接口的配置属性，还可以使用下面的属性，所有这些属性都是可选的。

- `lengthComputable`：布尔值，表示加载的总量是否可以计算，默认是`false`。
- `loaded`：整数，表示已经加载的量，默认是`0`。
- `total`：整数，表示需要加载的总量，默认是`0`。

`ProgressEvent`具有对应的实例属性。

- `ProgressEvent.lengthComputable`
- `ProgressEvent.loaded`
- `ProgressEvent.total`

#### 拖动事件

拖拉（drag）指的是，用户在某个对象上按下鼠标键不放，拖动它到另一个位置，然后释放鼠标键，将该对象放在那里。

拖拉的对象有好几种，包括元素节点、图片、链接、选中的文字等等。在网页中，除了元素节点默认不可以拖拉，其他（图片、链接、选中的文字）都可以直接拖拉。为了让元素节点可拖拉，可以将该节点的`draggable`属性设为`true`。

`draggable`属性可用于任何元素节点，但是图片（`<img>`）和链接（`<a>`）不加这个属性，就可以拖拉。对于它们，用到这个属性的时候，往往是将其设为`false`，防止拖拉这两种元素。

当元素节点或选中的文本被拖拉时，就会持续触发拖拉事件，包括以下一些事件。

- `drag`：拖拉过程中，在被拖拉的节点上持续触发（相隔几百毫秒）。
- `dragstart`：用户开始拖拉时，在被拖拉的节点上触发，该事件的`target`属性是被拖拉的节点。通常应该在这个事件的监听函数中，指定拖拉的数据。
- `dragend`：拖拉结束时（释放鼠标键或按下 ESC 键）在被拖拉的节点上触发，该事件的`target`属性是被拖拉的节点。它与`dragstart`事件，在同一个节点上触发。不管拖拉是否跨窗口，或者中途被取消，`dragend`事件总是会触发的。
- `dragenter`：拖拉进入当前节点时，在当前节点上触发一次，该事件的`target`属性是当前节点。通常应该在这个事件的监听函数中，指定是否允许在当前节点放下（drop）拖拉的数据。如果当前节点没有该事件的监听函数，或者监听函数不执行任何操作，就意味着不允许在当前节点放下数据。在视觉上显示拖拉进入当前节点，也是在这个事件的监听函数中设置。
- `dragover`：拖拉到当前节点上方时，在当前节点上持续触发（相隔几百毫秒），该事件的`target`属性是当前节点。该事件与`dragenter`事件的区别是，`dragenter`事件在进入该节点时触发，然后只要没有离开这个节点，`dragover`事件会持续触发。
- `dragleave`：拖拉操作离开当前节点范围时，在当前节点上触发，该事件的`target`属性是当前节点。如果要在视觉上显示拖拉离开操作当前节点，就在这个事件的监听函数中设置。
- `drop`：被拖拉的节点或选中的文本，释放到目标节点时，在目标节点上触发。注意，如果当前节点不允许`drop`，即使在该节点上方松开鼠标键，也不会触发该事件。如果用户按下 ESC 键，取消这个操作，也不会触发该事件。该事件的监听函数负责取出拖拉数据，并进行相关处理。





`DataTransfer.setData()`方法用来设置拖拉事件所带有的数据。该方法没有返回值。

`DataTransfer.getData()`方法接受一个字符串（表示数据类型）作为参数，返回事件所带的指定类型的数据（通常是用`setData`方法添加的数据）。如果指定类型的数据不存在，则返回空字符串。通常只有`drop`事件触发后，才能取出数据。

`DataTransfer.clearData()`方法接受一个字符串（表示数据类型）作为参数，删除事件所带的指定类型的数据。如果没有指定类型，则删除所有数据。如果指定类型不存在，则调用该方法不会产生任何效果。

`DataTransfer.setDragImage()`拖动过程中（`dragstart`事件触发后），浏览器会显示一张图片跟随鼠标一起移动，表示被拖动的节点。这张图片是自动创造的，通常显示为被拖动节点的外观，不需要自己动手设置。

`DataTransfer.setDragImage()`方法可以自定义这张图片。它接受三个参数。第一个是`<img>`节点或者`<canvas>`节点，如果省略或为`null`，则使用被拖动的节点的外观；第二个和第三个参数为鼠标相对于该图片左上角的横坐标和纵坐标。

#### 其他事件

##### 资源事件

beforeunload事件

`beforeunload`事件在窗口、文档、各种资源将要卸载前触发。它可以用来防止用户不小心卸载资源。

如果该事件对象的`returnValue`属性是一个非空字符串，那么浏览器就会弹出一个对话框，询问用户是否要卸载该资源。但是，用户指定的字符串可能无法显示，浏览器会展示预定义的字符串。如果用户点击“取消”按钮，资源就不会卸载。

```javascript
window.addEventListener('beforeunload', function (event) {
  event.returnValue = '你确定离开吗？';
});
```

unload事件

`unload`事件在窗口关闭或者`document`对象将要卸载时触发。它的触发顺序排在`beforeunload`、`pagehide`事件后面。

`unload`事件发生时，文档处于一个特殊状态。所有资源依然存在，但是对用户来说都不可见，UI 互动全部无效。这个事件是无法取消的，即使在监听函数里面抛出错误，也不能停止文档的卸载。

```javascript
window.addEventListener('unload', function(event) {
  console.log('文档将要卸载');
});
```

手机上，浏览器或系统可能会直接丢弃网页，这时该事件根本不会发生。而且跟`beforeunload`事件一样，一旦使用了`unload`事件，浏览器就不会缓存当前网页，理由同上。因此，任何情况下都不应该依赖这个事件，指定网页卸载时要执行的代码，可以考虑完全不使用这个事件。

该事件可以用`pagehide`代替。

Load  Error事件

`load`事件在页面或某个资源加载成功时触发。注意，页面或资源从浏览器缓存加载，并不会触发`load`事件。

`error`事件是在页面或资源加载失败时触发。`abort`事件在用户取消加载时触发。

```javascript
window.addEventListener('load', function(event) {
  console.log('所有资源都加载完成');
});
```

这三个事件实际上属于进度事件，不仅发生在`document`对象，还发生在各种外部资源上面。浏览网页就是一个加载各种资源的过程，图像（image）、样式表（style sheet）、脚本（script）、视频（video）、音频（audio）、Ajax请求（XMLHttpRequest）等等。这些资源和`document`对象、`window`对象、XMLHttpRequestUpload 对象，都会触发`load`事件和`error`事件。

最后，页面的`load`事件也可以用`pageshow`事件代替。

##### 会话历史事件

pageshow 事件，pagehide 事件

默认情况下，浏览器会在当前会话（session）缓存页面，当用户点击“前进/后退”按钮时，浏览器就会从缓存中加载页面。

`pageshow`事件在页面加载时触发，包括第一次加载和从缓存加载两种情况。如果要指定页面每次加载（不管是不是从浏览器缓存）时都运行的代码，可以放在这个事件的监听函数。

第一次加载时，它的触发顺序排在`load`事件后面。从缓存加载时，`load`事件不会触发，因为网页在缓存中的样子通常是`load`事件的监听函数运行后的样子，所以不必重复执行。同理，如果是从缓存中加载页面，网页内初始化的 JavaScript 脚本（比如 DOMContentLoaded 事件的监听函数）也不会执行。

`pageshow`事件有一个`persisted`属性，返回一个布尔值。页面第一次加载时，这个属性是`false`；当页面从缓存加载时，这个属性是`true`。

```javascript
window.addEventListener('pageshow', function(event) {
  console.log('pageshow: ', event);
});

window.addEventListener('pageshow', function(event){
  if (event.persisted) {
    // ...
  }
});
```

`pagehide`事件与`pageshow`事件类似，当用户通过“前进/后退”按钮，离开当前页面时触发。它与 unload 事件的区别在于，如果在 window 对象上定义`unload`事件的监听函数之后，页面不会保存在缓存中，而使用`pagehide`事件，页面会保存在缓存中。

`pagehide`事件实例也有一个`persisted`属性，将这个属性设为`true`，就表示页面要保存在缓存中；设为`false`，表示网页不保存在缓存中，这时如果设置了unload 事件的监听函数，该函数将在 pagehide 事件后立即运行。

如果页面包含`<frame>`或`<iframe>`元素，则`<frame>`页面的`pageshow`事件和`pagehide`事件，都会在主页面之前触发。

注意，这两个事件只在浏览器的`history`对象发生变化时触发，跟网页是否可见没有关系。

popState事件

`popstate`事件在浏览器的`history`对象的当前记录发生显式切换时触发。注意，调用`history.pushState()`或`history.replaceState()`，并不会触发`popstate`事件。该事件只在用户在`history`记录之间显式切换时触发，比如鼠标点击“后退/前进”按钮，或者在脚本中调用`history.back()`、`history.forward()`、`history.go()`时触发。

该事件对象有一个`state`属性，保存`history.pushState`方法和`history.replaceState`方法为当前记录添加的`state`对象

```javascript
window.onpopstate = function (event) {
  console.log('state: ' + event.state);
};
history.pushState({page: 1}, 'title 1', '?page=1');
history.pushState({page: 2}, 'title 2', '?page=2');
history.replaceState({page: 3}, 'title 3', '?page=3');
history.back(); // state: {"page":1}
history.back(); // state: null
history.go(2);  // state: {"page":3}
```

上面代码中，`pushState`方法向`history`添加了两条记录，然后`replaceState`方法替换掉当前记录。因此，连续两次`back`方法，会让当前条目退回到原始网址，它没有附带`state`对象，所以事件的`state`属性为`null`，然后前进两条记录，又回到`replaceState`方法添加的记录。

浏览器对于页面首次加载，是否触发`popstate`事件，处理不一样，Firefox 不触发该事件。

hashchange事件

`hashchange`事件在 URL 的 hash 部分（即`#`号后面的部分，包括`#`号）发生变化时触发。该事件一般在`window`对象上监听。

`hashchange`的事件实例具有两个特有属性：`oldURL`属性和`newURL`属性，分别表示变化前后的完整 URL。

```javascript
// URL 是 http://www.example.com/
window.addEventListener('hashchange', myFunction);

function myFunction(e) {
  console.log(e.oldURL);
  console.log(e.newURL);
}

location.hash = 'part2';
// http://www.example.com/
// http://www.example.com/#part2
```

##### 网页状态事件

DOMContentLoaded 事件

网页下载并解析完成以后，浏览器就会在`document`对象上触发 DOMContentLoaded 事件。这时，仅仅完成了网页的解析（整张页面的 DOM 生成了），所有外部资源（样式表、脚本、iframe 等等）可能还没有下载结束。也就是说，这个事件比`load`事件，发生时间早得多。

注意，网页的 JavaScript 脚本是同步执行的，脚本一旦发生堵塞，将推迟触发`DOMContentLoaded`事件。

```javascript
document.addEventListener('DOMContentLoaded', function (event) {
  console.log('DOM生成');
});

// 这段代码会推迟触发 DOMContentLoaded 事件
for(var i = 0; i < 1000000000; i++) {
  // ...
}
```

readystatechange事件

`readystatechange`事件当 Document 对象和 XMLHttpRequest 对象的`readyState`属性发生变化时触发。`document.readyState`有三个可能的值：`loading`（网页正在加载）、`interactive`（网页已经解析完成，但是外部资源仍然处在加载状态）和`complete`（网页和所有外部资源已经结束加载，`load`事件即将触发）

```javascript
document.onreadystatechange = function () {
  if (document.readyState === 'interactive') {
    // ...
  }
}
```

这个事件可以看作`DOMContentLoaded`事件的另一种实现方法

##### 窗口事件

scroll事件

`scroll`事件在文档或文档元素滚动时触发，主要出现在用户拖动滚动条。

该事件会连续地大量触发，所以它的监听函数之中不应该有非常耗费计算的操作。推荐的做法是使用`requestAnimationFrame`或`setTimeout`控制该事件的触发频率，然后可以结合`customEvent`抛出一个新事件

```javascript
(function () {
  var throttle = function (type, name, obj) {
    var obj = obj || window;
    var running = false;
    var func = function () {
      if (running) { return; }
      running = true;
      requestAnimationFrame(function() {
        obj.dispatchEvent(new CustomEvent(name));
        running = false;
      });
    };
    obj.addEventListener(type, func);
  };

  // 将 scroll 事件转为 optimizedScroll 事件
  throttle('scroll', 'optimizedScroll');
})();

window.addEventListener('optimizedScroll', function() {
  console.log('Resource conscious scroll callback!');
});

function throttle(fn, wait) {
  var time = Date.now();
  return function() {
    if ((time + wait - Date.now()) < 0) {
      fn();
      time = Date.now();
    }
  }
}

window.addEventListener('scroll', throttle(callback, 1000));
```

`throttle`与它区别在于，`throttle`是“节流”，确保一段时间内只执行一次，而`debounce`是“防抖”，要连续操作结束后再执行。以网页滚动为例，`debounce`要等到用户停止滚动后才执行，`throttle`则是如果用户一直在滚动网页，那么在滚动过程中还是会执行

resize事件

`resize`事件在改变浏览器窗口大小时触发，主要发生在`window`对象上面

该事件也会连续地大量触发，所以最好像上面的`scroll`事件一样，通过`throttle`函数控制事件触发频率。

```javascript
var resizeMethod = function () {
  if (document.body.clientWidth < 768) {
    console.log('移动设备的视口');
  }
};

window.addEventListener('resize', resizeMethod, true);
```

fullscreenchange 事件，fullscreenerror 事件

`fullscreenchange`事件在进入或退出全屏状态时触发，该事件发生在`document`对象上面

`fullscreenerror`事件在浏览器无法切换到全屏状态时触发。

```javascript
document.addEventListener('fullscreenchange', function (event) {
  console.log(document.fullscreenElement);
});
```

##### 剪贴板事件

以下三个事件属于剪贴板操作的相关事件。

- `cut`：将选中的内容从文档中移除，加入剪贴板时触发。
- `copy`：进行复制动作时触发。
- `paste`：剪贴板内容粘贴到文档后触发。

如果希望禁止输入框的粘贴事件，可以使用下面的代码。

```javascript
inputElement.addEventListener('paste', e => e.preventDefault());
```

上面的代码使得用户无法在`<input>`输入框里面粘贴内容。

`cut`、`copy`、`paste`这三个事件的事件对象都是`ClipboardEvent`接口的实例。`ClipboardEvent`有一个实例属性`clipboardData`，是一个 DataTransfer 对象，存放剪贴的数据。

```javascript
document.addEventListener('copy', function (e) {
  e.clipboardData.setData('text/plain', 'Hello, world!');
  e.clipboardData.setData('text/html', '<b>Hello, world!</b>');
  e.preventDefault();
});
```

##### 焦点事件

焦点事件发生在元素节点和`document`对象上面，与获得或失去焦点相关。它主要包括以下四个事件。

- `focus`：元素节点获得焦点后触发，该事件不会冒泡。
- `blur`：元素节点失去焦点后触发，该事件不会冒泡。
- `focusin`：元素节点将要获得焦点时触发，发生在`focus`事件之前。该事件会冒泡。
- `focusout`：元素节点将要失去焦点时触发，发生在`blur`事件之前。该事件会冒泡。

这四个事件的事件对象都继承了`FocusEvent`接口。`FocusEvent`实例具有以下属性。

- `FocusEvent.target`：事件的目标节点。
- `FocusEvent.relatedTarget`：对于`focusin`事件，返回失去焦点的节点；对于`focusout`事件，返回将要接受焦点的节点；对于`focus`和`blur`事件，返回`null`。

由于`focus`和`blur`事件不会冒泡，只能在捕获阶段触发，所以`addEventListener`方法的第三个参数需要设为`true`。

```javascript
form.addEventListener('focus', function (event) {
  event.target.style.background = 'pink';
}, true);

form.addEventListener('blur', function (event) {
  event.target.style.background = '';
}, true);
```

customEvent接口

CustomEvent 接口用于生成自定义的事件实例。那些浏览器预定义的事件，虽然可以手动生成，但是往往不能在事件上绑定数据。如果需要在触发事件的同时，传入指定的数据，就可以使用 CustomEvent 接口生成的自定义事件对象。

浏览器原生提供`CustomEvent()`构造函数，用来生成 CustomEvent 事件实例。

`CustomEvent()`构造函数接受两个参数。第一个参数是字符串，表示事件的名字，这是必须的。第二个参数是事件的配置对象，这个参数是可选的。`CustomEvent`的配置对象除了接受 Event 事件的配置属性，只有一个自己的属性。

- `detail`：表示事件的附带数据，默认为`null`。

```javascript
var event = new CustomEvent('build', { 'detail': 'hello' });

function eventHandler(e) {
  console.log(e.detail);
}

document.body.addEventListener('build', function (e) {
  console.log(e.detail);
});

document.body.dispatchEvent(event);
```

上面的代码中，我们手动定义了`build`事件。该事件触发后，会被监听到，从而输出该事件实例的`detail`属性（即字符串`hello`）

### 全局事件

指定事件的回调函数，推荐使用的方法是元素的`addEventListener`方法。

除了之外，还有一种方法可以直接指定事件的回调函数。

这个接口是由`GlobalEventHandlers`接口提供的。它的优点是使用比较方便，缺点是只能为每个事件指定一个回调函数，并且无法指定事件触发的阶段（捕获阶段还是冒泡阶段）。

`HTMLElement`、`Document`和`Window`都继承了这个接口，也就是说，各种 HTML 元素、`document`对象、`window`对象上面都可以使用`GlobalEventHandlers`接口提供的属性。



