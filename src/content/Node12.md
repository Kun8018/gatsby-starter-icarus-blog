---
title: NodeJs开发（三） 
date: 2021-1-22 22:40:33
categories: IT
tags:
    - IT，Web
toc: true
thumbnail: https://cdn.kunkunzhang.top/express.jpg
---

Javascript第九篇，Nodejs第三篇，第三篇写Node的性能和Express框架

<!--more-->

## Node性能

### chromev8引擎内存管理

Nodejs内存管理问题：

在浏览器中，Chrome V8引擎实例的生命周期不会很长（谁没事一个页面开着几天几个月不关），而且运行在用户的机器上。如果不幸发生内存泄露等问题，仅仅会 影响到一个终端用户。且无论这个V8实例占用了多少内存，最终在关闭页面时内存都会被释放，几乎没有太多管理的必要（当然并不代表一些大型Web应用不需 要管理内存）。但如果使用Node作为服务器，就需要关注内存问题了，一旦内存发生泄漏，久而久之整个服务将会瘫痪（服务器不会频繁的重启）。

chromev8垃圾回收机制：

JavaScript使用垃圾回收机制来自动管理内存。垃圾回收是一把双刃剑，其好处是可以大幅简化程序的内存管理代码，降低程序员的负担，减少因 长时间运转而带来的内存泄露问题。

但使用了垃圾回收即意味着程序员将无法掌控内存。ECMAScript没有暴露任何垃圾回收器的接口。我们无法强迫其进 行垃圾回收，更无法干预内存管理

chromev8内存限制：

Chrome限制了所能使用的**内存极限**（64位为1.4GB，32位为1.0GB），这也就意味着将无法直接操作一些大内存对象。

Chrome之所以限制了内存的大小，表面上的原因是V8最初是作为浏览器的JavaScript引擎而设计，不太可能遇到大量内存的场景，而深层次的原因 则是由于V8的垃圾回收机制的限制。由于V8需要保证JavaScript应用逻辑与垃圾回收器所看到的不一样，V8在执行垃圾回收时会阻塞 JavaScript应用逻辑，直到垃圾回收结束再重新执行JavaScript应用逻辑，这种行为被称为“全停顿”（stop-the-world）。 若V8的堆内存为1.5GB，V8做一次小的垃圾回收需要50ms以上，做一次非增量式的垃圾回收甚至要1秒以上。这样浏览器将在1s内失去对用户的响 应，造成假死现象。如果有动画效果的话，动画的展现也将显著受到影响

chromev8的堆构成

V8的堆其实并不只是由老生代和新生代两部分构成，可以将堆分为几个不同的区域：

1、新生代内存区：大多数的对象被分配在这里，这个区域很小但是垃圾回特别频繁；

2、老生代指针区：属于老生代，这里包含了大多数可能存在指向其他对象的指针的对象，大多数从新生代晋升的对象会被移动到这里；

3、老生代数据区：属于老生代，这里只保存原始数据对象，这些对象没有指向其他对象的指针；

4、大对象区：这里存放体积超越其他区大小的对象，每个对象有自己的内存，垃圾回收其不会移动大对象；

5、代码区：代码对象，也就是包含JIT之后指令的对象，会被分配在这里。唯一拥有执行权限的内存区；

6、Cell区、属性Cell区、Map区：存放Cell、属性Cell和Map，每个区域都是存放相同大小的元素，结构简单。

每个区域都是由一组内存页构成，内存页是V8申请内存的最小单位，除了大对象区的内存页较大以外，其他区的内存页都是1MB大小，而且按照1MB对 齐。内存页除了存储的对象，还有一个包含元数据和标识信息的页头，以及一个用于标记哪些对象是活跃对象的位图区。另外每个内存页还有一个单独分配在另外内 存区的槽缓冲区，里面放着一组对象，这些对象可能指向其他存储在该页的对象。**垃圾回收器只会针对新生代内存区、老生代指针区以及老生代数据区进行垃圾回收。**

内存泄漏

 内存泄露是指程序中**已分配的堆内存**由于某种原因**未释放或者无法释放**，造成系统内存的浪费，导致程序运行速度减慢甚至系统奔溃等后果。

常见的内存泄漏场景

1.缓存：开发时候喜欢用**对象的键值来缓存函数的计算结果**，但是缓存中存储的键越多，长期存活的对象就越多，导致垃圾回收在进行扫描和整理时，对这些对象做了很多无用功。

2.作用域未释放(闭包)

3.没有必要的全局变量：声明过多的全局变量，会导致变量常驻内存，要直到进程结束才能够释放内存。

4.无效的DOM引用。

5.定时器未清除：vue 或 react 的页面生命周期初始化时，定义了定时器，但是在离开页面后，未清除定时器，就会导致内存泄漏。

6.事件监听为空白：在页面生命周期初始化时，绑定了事件监听器，但在离开页面后，未清除事件监听器，同样也会导致内存泄漏。

内存优化做法：

1.解除引用。确保占用最少的内存可以让页面获得更好的性能。而优化内存占用的最佳方式，就是为执行中的代码只保存必要的数据。一旦数据不再有用，最好通过将其值设置为 null 来释放其引用——这个做法叫做解除引用

2.避免过多使用闭包。

3.注意清除定时器和事件监听器。

4提供手动清除变量的功能

5.使用redis等外部工具来缓存数据。

6.nodejs中使用stream或buffer来操作大文件，不会受nodejs内存限制。

垃圾回收机制：

新生代算法：

新生代的对象为存活时间较短的对象，老生代中的对象为存活时间较长或常驻内存的对象。分别对新生代和老生代使用 不同的垃圾回收算法来提升垃圾回收的效率。对象起初都会被分配到新生代，当新生代中的对象满足某些条件时，会被移动到老生代（晋升）。

新生代中的对象一般存活时间较短，使用 Scavenge GC 算法。在Scavenge的具体实现中，主要是采用一种复制的方式的方法--cheney算法。

在新生代空间中，内存空间分为两部分，分别为 From 空间和 To 空间。在这两个空间中，必定有一个空间是使用的，另一个空间是空闲的。新分配的对象会被放入 From 空间中，当 From 空间被占满时，新生代 GC 就会启动了。算法会检查 From 空间中存活的对象并复制到 To 空间中，如果有失活的对象就会销毁。当复制完成后将 From 空间和 To 空间互换，这样 GC 就结束了。

老生代算法：

老生代中的对象一般存活时间较长且数量也多，使用了两个算法，分别是**标记清除算法**和**标记压缩算法**。

在讲算法前，先来说下什么情况下对象会出现在老生代空间中：

1、新生代中的对象是否已经经历过一次 Scavenge 算法，如果经历过的话，会将对象从新生代空间移到老生代空间中。

2、To 空间的对象占比大小超过 25 %。在这种情况下，为了不影响到内存分配，会将对象从新生代空间移到老生代空间中。

在老生代中，以下情况会先启动标记清除算法：

1、某一个空间没有分块的时候

2、空间中被对象超过一定限制

3、空间不能保证新生代中的对象移动到老生代中

Mark Sweep 是将需要被回收的对象进行标记，在垃圾回收运行时直接释放相应的地址空间，如下图所示(红色的内存区域表示需要被回收的区域)：

Mark Compact 的思想有点像新生代垃圾回收时采取的 Cheney 算法：将存活的对象移动到一边，将需要被回收的对象移动到另一边，然后对需要被回收的对象区域进行整体的垃圾回收。

在这个阶段中，会遍历堆中所有的对象，然后标记活的对象，在标记完成后，销毁所有没有被标记的对象。在标记大型对内存时，可能需要几百毫秒才能完成一次标记。这就会导致一些性能上的问题。为了解决这个问题，2011 年，V8 从 stop-the-world 标记切换到增量标志。在增量标记期间，GC 将标记工作分解为更小的模块，可以让 JS 应用逻辑在模块间隙执行一会，从而不至于让应用出现停顿情况。但在 2018 年，GC 技术又有了一个重大突破，这项技术名为并发标记。该技术可以让 GC 扫描和标记对象时，同时允许 JS 运行。

清除对象后会造成堆内存出现碎片的情况，当碎片超过一定限制后会启动压缩算法。在压缩过程中，将活的对象像一端移动，直到所有对象都移动完成然后清理掉不需要的内存。

### js变量内存何时释放

JavaScript中的类型分为值类型和引用类型

引用类型是在没有引用之后，通过v8的GC自动回收，值类型如果处于闭包的情况下，要等闭包没有引用才会被GC回收，非闭包的情况下，等待V8的新生代切换的时候会回收





### js内存泄漏/爆掉的情况

内存崩掉的情况

```javascript
let arr = [];
while(true) {
	arr.push\(1\);
}
```

上面的代码内存会崩溃，超出了数组最大长度，会自动结束异常。

```javascript
let arr = []
while(true) {
	arr.push\(\)
}
```

不会爆掉，会陷入死循环。

```javascript
let arr = [];
while(true) {
	arr.push(new Buffer(1000));
}
```

这个情况比直接push number类型的慢很多，因为ES定义的Number类型遵循IEEE-2008的64位存储，也就是说Number类型的1相比buffer类型的1，前者在编译器中是63个0+1，占了64位，而后者只占了一位

push buffer不会崩溃，当内存顶到爆时，也就是即将到达100%的状态，会自动垃圾回收，就是会瞬间降低内存，push工作继续，很神奇。



泄漏

**1.意外的全局变量**

全局变量的生命周期最长，直到页面关闭前，它都存活着，所以全局变量上的内存一直都不会被回收

当全局变量使用不当，没有及时回收（手动赋值 null），或者拼写错误等将某个变量挂载到全局变量时，也就发生内存泄漏了

**2.遗忘的定时器**

setTimeout 和 setInterval 是由浏览器专门线程来维护它的生命周期，所以当在某个页面使用了定时器，当该页面销毁时，没有手动去释放清理这些定时器的话，那么这些定时器还是存活着的

也就是说，定时器的生命周期并不挂靠在页面上，所以当在当前页面的 js 里通过定时器注册了某个回调函数，而该回调函数内又持有当前页面某个变量或某些 DOM 元素时，就会导致即使页面销毁了，由于定时器持有该页面部分引用而造成页面无法正常被回收，从而导致内存泄漏了

如果此时再次打开同个页面，内存中其实是有双份页面数据的，如果多次关闭、打开，那么内存泄漏会越来越严重

而且这种场景很容易出现，因为使用定时器的人很容易遗忘清除

**3.使用不当的闭包**

函数本身会持有它定义时所在的词法环境的引用，但通常情况下，使用完函数后，该函数所申请的内存都会被回收了

但当函数内再返回一个函数时，由于返回的函数持有外部函数的词法环境，而返回的函数又被其他生命周期东西所持有，导致外部函数虽然执行完了，但内存却无法被回收

所以，返回的函数，它的生命周期应尽量不宜过长，方便该闭包能够及时被回收

**4.遗漏的DOM元素**

DOM 元素的生命周期正常是取决于是否挂载在 DOM 树上，当从 DOM 树上移除时，也就可以被销毁回收了

但如果某个 DOM 元素，在 js 中也持有它的引用时，那么它的生命周期就由 js 和是否在 DOM 树上两者决定了，记得移除时，两个地方都需要去清理才能正常回收它

**5.网络回调**

某些场景中，在某个页面发起网络请求，并注册一个回调，且回调函数内持有该页面某些内容，那么，当该页面销毁时，应该注销网络的回调，否则，因为网络持有页面部分内容，也会导致页面部分内容无法被回收



#### 监控内存泄漏

内存泄漏的问题是可以分成两类的，一种是比较严重的，泄漏的就一直回收不回来了，另一种严重程度稍微轻点，就是没有及时清理导致的内存泄漏，一段时间后还是可以被清理掉

不管哪一种，利用开发者工具抓到的内存图，应该都会看到一段时间内，内存占用不断的直线式下降，这是因为不断发生 GC，也就是垃圾回收导致的

针对第一种比较严重的，会发现，内存图里即使不断发生 GC 后，所使用的内存总量仍旧在不断增长

另外，内存不足会造成不断 GC，而 GC 时是会阻塞主线程的，所以会影响到页面性能，造成卡顿，所以内存泄漏问题还是需要关注的

可以使用 performance monitor 工具，在开发者工具里找到更多的按钮，在里面打开此功能面板，这是一个可以实时监控 cpu，内存等使用情况的工具，

### chrome浏览器调试

以chrome为例

在chrome菜单中选择更多工具->开发者工具或者右键点击网页元素，选择检查打开调试面板。

调试面板中有设备模式、元素面板、控制台面板、源代码面板、网络面板、性能面板、内存面板、应用面板、安全面板。

设备模式面板可以选择web、ios、安卓等设备模式检查响应式布局

元素面板(element)可以检查页面DOM和CSS，还可以自由操作DOM和CSS更改布局和设计页面。

点击箭头图标，点击网页的任意位置，就可以出现该位置的元素html代码和css样式

控制台面板(console)可以在开发期间记录输出信息，或者作为shell与javascript交互

error和waring就是网页运行中产生的错误和警告，info用作输出的显示

源代码面板(source)可以设置断点调试JavaScript，或者通过workspace连接本地文件来使用开发者工具的实时编辑器。

网络面板(network)查看当前网页的请求和下载的资源文件。

点击network就能看到各个接口请求的先后顺序和耗时。想要查看具体的接口参数，在name中找到具体的接口，header为请求头参数，preview和response为返回值。

内存面板(memory)可以跟踪内存泄漏等功能

性能面板(performance)可以记录和查看网站生命周期内发生的各种事件，通过修改对应事件来提高页面的运行性能。

应用面板(application)中可以检查加载的所有资源，包括indexedDB、WebSQL数据库、本地和会话存储、cookie、应用程序缓存、图像、字体、样式表等。

安全面板(security)检查证书问题等。



### js常用设计模式

设计模式是可重用的用于解决软件设计中一般问题的方案。设计模式如此让人着迷，以至在任何编程语言中都有对其进行的探索。

其中一个原因是它可以让我们站在巨人的肩膀上，获得前人所有的经验，保证我们以优雅的方式组织我们的代码，满足我们解决问题所需要的条件。

设计模式同样也为我们描述问题提供了通用的词汇。这比我们通过代码来向别人传达语法和语义性的描述更为方便。

12种设计模式：

单例模式、工厂模式、代理模式、装饰模式、观察者模式、适配器模式

外观模式、命令模式、原型模式、中介者模式、模块化模式、策略模式

Mixin(织入目标类)、享元模式

```javascript
//单例：　任意对象都是单例，无须特别处理
var obj = {name: 'michaelqin', age: 30};

//工厂: 就是同样形式参数返回不同的实例
function Person() { this.name = 'Person1'; }
	function Animal() { this.name = 'Animal1'; }

	function Factory() {}
	Factory.prototype.getInstance = function(className) {
		return eval('new ' + className + '()');
	}

	var factory = new Factory();
	var obj1 = factory.getInstance('Person');
	var obj2 = factory.getInstance('Animal');
	console.log(obj1.name); // Person1
	console.log(obj2.name); // Animal1

//代理: 就是新建个类调用老类的接口,包一下
	function Person() { }
	Person.prototype.sayName = function() { console.log('michaelqin'); }
	Person.prototype.sayAge = function() { console.log(30); }

	function PersonProxy() {
		this.person = new Person();
		var that = this;
		this.callMethod = function(functionName) {
			console.log('before proxy:', functionName);
			that.person[functionName](); // 代理
			console.log('after proxy:', functionName);
		}
	}

	var pp = new PersonProxy();
	pp.callMethod('sayName'); // 代理调用Person的方法sayName()
	pp.callMethod('sayAge'); // 代理调用Person的方法sayAge()

4) 观察者: 就是事件模式，比如按钮的onclick这样的应用.
	function Publisher() {
		this.listeners = [];
	}
	Publisher.prototype = {
		'addListener': function(listener) {
			this.listeners.push(listener);
		},

		'removeListener': function(listener) {
			delete this.listeners[this.listeners.indexOf(listener)];
		},

		'notify': function(obj) {
			for(var i = 0; i < this.listeners.length; i++) {
				var listener = this.listeners[i];
				if (typeof listener !== 'undefined') {
					listener.process(obj);
				}
			}
		}
	}; // 发布者

	function Subscriber() {

	}
	Subscriber.prototype = {
		'process': function(obj) {
			console.log(obj);
		}
	};　// 订阅者


	var publisher = new Publisher();
	publisher.addListener(new Subscriber());
	publisher.addListener(new Subscriber());
	publisher.notify({name: 'michaelqin', ageo: 30}); // 发布一个对象到所有订阅者
  publisher.notify('2 subscribers will both perform process'); // 发布一个字符串到所有订阅者

```

观察者模式与发布/订阅模式的区别

观察者模式要求想要接受相关通知的观察者必须到发起这个事件的被观察者上注册这个事件。

发布/订阅模式使用一个主题/事件频道，这个频道处于想要获取通知的订阅者和发起事件的发布者之间。

这个事件系统允许代码定义应用相关的事件，这个事件可以传递特殊的参数，参数中包含有订阅者所需要的值。这种想法是为了避免订阅者和发布者之间的依赖性。

这种和观察者模式之间的不同，使订阅者可以实现一个合适的事件处理函数，用于注册和接受由发布者广播的相关通知。

适配者模式

当两种数据/函数都能实现相同的功能，但是参数、调用不兼容，这是要在某一方使用适配器抹平这种差异



https://mp.weixin.qq.com/s/o0MRn-wy1_7a13xzstaJnQ

## Express框架

安装Express

```node
npm i express@next
```

运行Express，启动服务器

```js
const express= require('express')
const app = express()

app.listen(3000,()=>{
   console.log('')
})
```

### 路由

```js
const express = require('express')
const router = express.Router()

router.get('/add',(req,res)=>{
res.send('user add')
}) 

router.get('/del',(req,res)=>{
res.send('del add')
})

module.exports = router
```

写接口

```node
app.get
```



```node
npm i cors
```



### 中间件

中间件可以终止 HTTP 请求，也可以用 next 将其传递给另一个中间件函数,下一个中间件函数通常由名为 `next` 的变量来表示。

- 路由器级中间件，例如：router.use
- 内置中间件，例如：express.static，express.json，express.urlencoded
- 错误处理中间件，例如：app.use（err，req，res，next）
- 第三方中间件，例如：bodyparser、cookieparser

如果当前中间件函数没有结束请求/响应循环，那么它必须调用 `next()`，以将控制权传递给下一个中间件函数。否则，请求将保持挂起状态。

#### express中间件模型

express的中间件的原理就是一层层函数的嵌套，虽然最内部的函数调用res.send结束的请求，但是程序依然在运行。并且这个运行的结果也类似koa的洋葱。这里面有一点需要注意，express结束请求是在最内部函数。

express和koa中间件执行逻辑没有什么特别的不同，都是依赖函数调用栈的执行顺序，抬杠一点讲都可以叫做洋葱模型。Koa 依靠 async/await（generator + co）让异步操作可以变成同步写法，更好理解。最关键的不是这些中间的执行顺序，而是响应的时机，Express 使用 res.end() 是立即返回，这样想要做出些响应前的操作变得比较麻烦；而 Koa 是在所有中间件中使用 ctx.body 设置响应数据，但是并不立即响应，而是在所有中间件执行结束后，再调用 res.end(ctx.body) 进行响应，这样就为响应前的操作预留了空间，所以是请求与响应都在最外层，中间件处理是一层层进行，所以被理解成洋葱模型

#### 应用层中间件

使用 `app.use()` 和 `app.METHOD()` 函数将应用层中间件绑定到[应用程序对象](https://expressjs.com/zh-cn/4x/api.html#app)的实例， `METHOD` 是中间件函数处理的请求的小写 HTTP 方法（例如 GET、PUT 或 POST）。

实例

```js
var app = express();

app.use(function (req, res, next) {
  console.log('Time:', Date.now());
  next();
});
app.get('/user/:id', function (req, res, next) {
  res.end(req.params.id);
});
```

#### 路由器中间件

路由器层中间件的工作方式与应用层中间件基本相同，差异之处在于它绑定到 `express.Router()` 的实例。

实例

```js
//引入router
var router= express.Router();
//全局路由中间件
router.use(function (req, res, next) {
  console.log('Time:', Date.now());
  next();
});
//具体http方法
router.get('/user/:id', function (req, res, next) {
  // if the user ID is 0, skip to the next router
  if (req.params.id == 0) next('route');
  // otherwise pass control to the next middleware function in this stack
  else next(); //
}, function (req, res, next) {
  // render a regular page
  res.render('regular');
});
//加载中间件
app.use('/', router);
```



#### **内置中间件**

Express 有以下内置的中间件功能：

- `express.static` 提供静态资源，例如 HTML 文件，图像等。
- `express.json` 负载解析用 JSON 传入的请求。
- `express.urlencoded` 解析传入的用 URL 编码的有效载荷请求。

#### **错误处理中间件**

错误处理中间件始终采用四个参数**（err，req，res，next）**。

实例

```js
app.use(function(err,req,res,next){
    console.log(err.stack);
    res.status(500).send('somethingbroke');
})
```



#### 第三方中间件

使用第三方中间件为express应用程序添加功能

实例：cookie 解析中间件函数 `cookie-parser`。

安装包

```js
npm install cookie-parser
```

引用

```js
var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');

//加载中间件
app.use(cookieParser)
```



### websocket

服务端

安装依赖

```shell
npm install socket.io --save
```

代码

```javascript
let io = require("socket.io")(http);

io.on("connection",function(socket){
  console.log("连接成功")
  socket.emit("new message",{mess:"初识消息"})
})
```



### 第三方登录

 

### 模版引擎

express可以使用模板引擎，使用前先进行设置

views：指定模版引擎所在目录

view engine：指定使用的模版引擎

首先安装需要使用的模版引擎

```js
npm install pug --save
```

指定模版引擎

```js
app.set('view engine', 'pug');
```

在 `views` 目录中创建名为 `index.pug` 的 Pug 模板文件，

```pug
html
  head
    title= title
  body
    h1= message

```

在node中渲染

```js
app.get('/', function (req, res) {
  res.render('index', { title: 'Hey', message: 'Hello there!'});
});
```

向主页发出请求时，`index.pug` 文件将呈现为 HTML。

### Cors通信

通过使用 Node 的[cors](https://github.com/expressjs/cors) 中间件来允许来自其他源的请求。

使用命令安装*cors*

```shell
npm install cors
```

使用中间件并允许来自所有来源的请求:

```javascript
const cors = require('cors')

app.use(cors())
```



### Restful API实例

REST即表述性状态传递（英文：Representational State Transfer，简称REST）是Roy Fielding博士在2000年他的博士论文中提出来的一种软件架构风格。

Web service是一个平台独立的，低耦合的，自包含的、基于可编程的web的应用程序，可使用开放的XML（标准通用标记语言下的一个子集）标准来描述、发布、发现、协调和配置这些应用程序，用于开发分布式的互操作的应用程序。

基于 REST 架构的 Web Services 即是 RESTful。

由于轻量级以及通过 HTTP 直接传输数据的特性，Web 服务的 RESTful 方法已经成为最常见的替代方法。可以使用各种语言（比如 Java 程序、Perl、Ruby、Python、PHP 和 Javascript[包括 Ajax]）实现客户端。

为了显示数据，首先准备一个json数据文件

```json
{
   "user1" : {
      "name" : "mahesh",
      "password" : "password1",
      "profession" : "teacher",
      "id": 1
   },
   "user2" : {
      "name" : "suresh",
      "password" : "password2",
      "profession" : "librarian",
      "id": 2
   },
   "user3" : {
      "name" : "ramesh",
      "password" : "password3",
      "profession" : "clerk",
      "id": 3
   }
}
```

基于以上的数据，做不同的api展示不同的数据

|    URI     | HTTP方法 |  请求内容   |       结果       |
| :--------: | :------: | :---------: | :--------------: |
| listUsers  |   GET    |     空      | 显示所有用户列表 |
|    :id     |   GET    |     空      | 显示用户详细信息 |
|  addUser   |   POST   | JSON 字符串 |    添加新用户    |
| deleteUser |  DELETE  | JSON 字符串 |     删除用户     |

实例

```javascript
var express = require('express');
var app = express();
var fs = require("fs");

//获取用户列表
app.get('/listUsers', function (req, res) {
   fs.readFile( __dirname + "/" + "user.json", 'utf8', function (err, data) {
       console.log( data );
       res.end( data );
   });
})

 //添加用户
 //添加的新用户数据
 var user = {
    "user4" : {
       "name" : "mohit",
       "password" : "password4",
       "profession" : "teacher",
       "id": 4
    }
 }

 app.get('/addUser', function (req, res) {
    // 读取已存在的数据
    fs.readFile( __dirname + "/" + "user.json", 'utf8', function (err, data) {
        data = JSON.parse( data );
        data["user4"] = user["user4"];
        console.log( data );
        res.end( JSON.stringify(data));
    });
 })

 //删除用户
 var id = 3;

 app.get('/deleteUser', function (req, res) {
 
    // First read existing users.
    fs.readFile( __dirname + "/" + "user.json", 'utf8', function (err, data) {
        data = JSON.parse( data );
        delete data["user" + id];
        
        console.log( data );
        res.end( JSON.stringify(data));
    });
 })

app.get('/:id', function (req, res) {
    // 首先我们读取已存在的用户
    fs.readFile( __dirname + "/" + "user.json", 'utf8', function (err, data) {
        data = JSON.parse( data );
        var user = data["user" + req.params.id] 
        console.log( user );
        res.end( JSON.stringify(user));
    });
 })


var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("应用实例，访问地址为 http://%s:%s", host, port)

})
```



### Mysql

安装包

```node
npm install mysql
```

建立连接

```javascript
var mysql = require('mysql')
var connection = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'',
  database:'my_db'
})

connection.connect();

```

增删改查





### 与Mongo数据库交互

MongoDB的安装教程不在赘述，在官网下载即可

在Mongo的安装目录bin目录下打开CMD窗口，运行



安装Node的Mongo数据库工具Mongoose

```node
npm i mongoose
```

连接代码

```javascript
const mongoose = require('mongoose');
mongoose.connect(
  'mongodb://localhost:27017/test', 
  {
    useNewUrlParser: true, 
    useUnifiedTopology: true
  }
);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});
```

创建Schema对象

```javascript
  //将scheme对象实例化并创建
  var user = mongoose.Schema;
  //创建对象
  var userschema = new user({
  name:
  age:
  length:
})
转化为数据模型
  var blog = mongoose.model('Blog', blogSchema);
```

增删改查,对模型进行操作

```mongo
blog.insertMany()
blog.remove()
blog.update()
blog.find({ name: 'john', age: { $gte: 18 }});
```



### Redis

安装node驱动包

```node
npm install redis
```

Redis支持多种数据类型，有键值对、哈希表、链表、集合等

在node中创建redis客户端，运行redis,

```js
var redis = require('redis')

var client = redis.createClient(6379,'127.0.0.1')
client.on('error',function(err){
    console.log('Error'+error)
})；
```

创建键值对

```js
client.set('color','red',redis.print)
client.get('color',function(err,value){
    if(err)throw err;
    console.log('Got:'+value)
    client.quit();
})
```

redis除了键值对，还有散列（哈希）、列表（list）、集合（set)、有序集合（zset）等数据类型，并有对的处理函数

```js
//对键（key）的操作
del('key') //删除key
exists('key') //查询key
expire/pexpire('key',seconds/milliseconds) //设置key的过期秒数/毫秒数
persist('key')//移除key的过期时间
flushdb//清空当前数据库

//对键值对的操作
set('key','value')//设置键的值
get('key')//获取键对应的值
del('key')//删除键对应的值
增加键对应的值
incrby('key',increment)
减去键对应的值
der('key',increment)

//对列表（队列）的操作
lrange('key',0,-1)//获取列表内指定范围的值
lindex('key',1)//获取列表在指定位置的值
lpop('key')//在列表左边弹出一个值，并返回
rpop('key')//在列表右边弹出一个值，并返回
rpush('key','value')//在列表右边推入指定值
rtrim('key','start','end')//将列表的内容在指定范围裁剪

//对有序集合(zset)的操作
zadd('zset-key',score,key)//添加元素到集合
zrange  //获取集合中指定位置的元素
zrangebyscore  //获取集合中指定范围的元素
zcard('key')  //获取一个有序集合中成员数量
zrem //移除有序集合中的成员

//对集合的操作
smembers('key')//返回集合中包含的所有元素
scad('key')//返回集合中元素的数量
sismenber('key','value')//检查元素是否存在于集合中
smove('source-key','dest-key','item')//一个集合迁移到另一个集合
srem('key','value')//移除集合中指定元素
spop('key')//随机删除集合元素，并返回值
sdiff('key','key2')//返回存在于第一个集合，但不存在于其他集合的元素（差集）
sdiffstore('dest-key','key','key2')//将存在于第一个集合，但不存在于其他集合的元素存储到指定键
sinter('key','key2')//返回不同集合的交集部分
sinterstore('dest-key','key','key2')//将不同集合的交集部分存储到指定键
sunion('key','key2')//返回不同集合的并集
sunionstore('dest-key','key','key2')////将不同集合的并集存储到指定键

//对哈希散列的操作

```

