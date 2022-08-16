---
title: Javascript开发（三）
date: 2021-01-18 21:40:33
categories: IT
tags:
    - IT，Web,Node
toc: true
thumbnail: http://cdn.kunkunzhang.top/javascript.png
---

​     第三篇主要讲原生js的方法

<!--more-->

## 原型链继承

A 对象通过继承 B 对象，就能直接拥有 B 对象的所有属性和方法。这对于代码的复用是非常有用的。

JavaScript 语言的继承不通过 class，而是通过“原型对象”（prototype）实现，JavaScript 通过构造函数生成新对象，因此构造函数可以视为对象的模板。实例对象的属性和方法，可以定义在构造函数内部。

实例

```js
function Cat (name, color) {
  this.name = name;
  this.color = color;
}

var cat1 = new Cat('大毛', '白色');

cat1.name // '大毛'
cat1.color // '白色'
```

`Cat`函数是一个构造函数，函数内部定义了`name`属性和`color`属性，所有实例对象（上例是`cat1`）都会生成这两个属性，即这两个属性会定义在实例对象上面。

通过构造函数为实例对象定义属性，虽然很方便，但是有一个缺点。同一个构造函数的多个实例之间，无法共享属性，从而造成对系统资源的浪费。通过 JavaScript 的原型对象（prototype）继承，就能很方便得共享对象。

实例

```javascript
function Animal(name) {
  this.name = name;
}
Animal.prototype.color = 'white';

var cat1 = new Animal('大毛');
var cat2 = new Animal('二毛');

cat1.color // 'white'
cat2.color // 'white'
```

上面代码中，构造函数`Animal`的`prototype`属性，就是实例对象`cat1`和`cat2`的原型对象。原型对象上添加一个`color`属性，结果，实例对象都共享了该属性.如果实例对象自身就有某个属性或方法，它就不会再去原型对象寻找这个属性或方法。

原型链

JavaScript 规定，所有对象都有自己的原型对象（prototype）。一方面，任何一个对象，都可以充当其他对象的原型；另一方面，由于原型对象也是对象，所以它也有自己的原型。因此，就会形成一个“原型链”（prototype chain）：对象到原型，再到原型的原型……

如果一层层地上溯，所有对象的原型最终都可以上溯到`Object.prototype`，即`Object`构造函数的`prototype`属性。也就是说，所有对象都继承了`Object.prototype`的属性。这就是所有对象都有`valueOf`和`toString`方法的原因，因为这是从`Object.prototype`继承的。

`Object.prototype`的原型是`null`。`null`没有任何属性和方法，也没有自己的原型。因此，原型链的尽头就是`null`。



`prototype`对象有一个`constructor`属性，默认指向`prototype`对象所在的构造函数。由于`constructor`属性是定义在`prototype`对象上面，意味着可以被所有实例对象继承。

constructor属性的作用：

1、可以由实例追溯回构造函数，得知某个实例对象，到底是哪一个构造函数产生的。

```javascript
function F() {};
var f = new F();

f.constructor === F // f的构造函数是F,所以true
f.constructor === RegExp // false
```

2.已知一个实例对象，可以根据该实例对象的constructor构造另一个实例对象，而不必使用构造函数

```javascript

```

`constructor`属性表示原型对象与构造函数之间的关联关系，如果修改了原型对象，一般会同时修改`constructor`属性，防止引用的时候出错。

```javascript
// 坏的写法
C.prototype = {
  method1: function (...) { ... },
  // ...
};

// 好的写法
C.prototype = {
  constructor: C,
  method1: function (...) { ... },
  // ...
};

// 更好的写法
C.prototype.method1 = function (...) { ... };
```

要么将`constructor`属性重新指向原来的构造函数，要么只在原型对象上添加方法，这样可以保证`instanceof`运算符不会失真。

### prototype与proto



### 构造函数与构造函数的继承

让一个构造函数继承另一个构造函数，是非常常见的需求。

这可以分成两步实现。第一步是在子类的构造函数中，调用父类的构造函数。第二步，是让子类的原型指向父类的原型，这样子类就可以继承父类原型。

实例

```javascript
//新建shape构造函数
function Shape() {
  this.x = 0;
  this.y = 0;
}

Shape.prototype.move = function (x, y) {
  this.x += x;
  this.y += y;
  console.info('Shape moved.');
};
//新建Rectangle构造函数继承Shape。
// 第一步，子类继承父类的实例
function Rectangle() {
  Shape.call(this); // 调用父类构造函数
}
// 另一种写法
function Rectangle() {
  this.base = Shape;
  this.base();
}

// 第二步，子类继承父类的原型
Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.constructor = Rectangle;
```



### 原生原型链

```javascript
const b = 2;
a = b;
```

b是基础类型，所以a的原型指向Number

#### 改变原型

使用构造函数的prototype属性



## 实例对象与new

javascript是面向对象编程的语言。js中一切皆对象。对象具有属性和方法，属性是对象的状态，方法是对象的行为（完成某种任务）。

JavaScript 语言使用构造函数（constructor）作为对象的模板。所谓”构造函数”，就是专门用来生成实例对象的函数。它就是对象的模板，描述实例对象的基本结构。一个构造函数，可以生成多个实例对象，这些实例对象都有相同的结构。

构造函数就是一个普通的函数，但是有自己的特征和用法。

构造函数的特点：

函数体内部使用了`this`关键字，代表了所要生成的对象实例。

生成对象的时候，必须使用`new`命令。

为了与普通函数区别，构造函数名字的第一个字母通常大写。

`new`命令的作用，就是执行构造函数，返回一个实例对象。

实例

```js
var Vehicle = function () {
  this.price = 1000;
};

var v = new Vehicle();
v.price // 1000
```

如果忘了使用`new`命令，直接调用构造函数，构造函数就变成了普通函数，并不会生成实例对象。`this`这时代表全局对象。

为了避免这种情况的发生，可以在构造函数内部使用严格模式，即第一行加上`use strict`。这样的话，一旦忘了使用`new`命令，直接调用构造函数就会报错。

new对象的原理

使用`new`命令时，它后面的函数依次执行下面的步骤。

1. 创建一个空对象，作为将要返回的对象实例。
2. 将这个空对象的原型，指向构造函数的`prototype`属性。
3. 将这个空对象赋值给函数内部的`this`关键字。
4. 开始执行构造函数内部的代码。

也就是说，构造函数内部，`this`指的是一个新生成的空对象，所有针对`this`的操作，都会发生在这个空对象上。构造函数之所以叫“构造函数”，就是说这个函数的目的，就是操作一个空对象（即`this`对象），将其“构造”为需要的样子。

如果构造函数内部有`return`语句，而且`return`后面跟着一个对象，`new`命令会返回`return`语句指定的对象；否则，就会不管`return`语句，返回`this`对象。

对普通函数（内部没有`this`关键字的函数）使用`new`命令，则会返回一个空对象。

## 异步操作与定时器

### 事件循环

异步操作、队列与事件循环

JavaScript 运行时，除了一个正在运行的主线程(执行栈)，引擎还提供一个任务队列（task queue），里面是各种需要当前程序处理的异步任务。

首先，主线程会去执行所有的同步任务。等到同步任务全部执行完，就会去看任务队列里面的异步任务。如果满足条件，那么异步任务就重新进入主线程开始执行，这时它就变成同步任务了。等到执行完，下一个异步任务再进入主线程开始执行。一旦任务队列清空，程序就结束执行。

JavaScript 引擎怎么知道异步任务有没有结果，能不能进入主线程呢？答案就是引擎在不停地检查，一遍又一遍，只要同步任务执行完了，引擎就会去检查那些挂起来的异步任务，是不是可以进入主线程了。这种循环检查的机制，就叫做事件循环

异步任务分为宏任务和微任务，页面渲染事件，各种IO的完成事件等随时被添加到任务队列中，一直会保持先进先出的原则执行，我们不能准确地控制这些事件被添加到任务队列中的位置。但是这个时候突然有高优先级的任务需要尽快执行，那么一种类型的任务就不合适了，所以引入了微任务队列。

微任务的优先级高于宏任务，即每次事件队列完毕先检查是否有微任务，再检查是否有宏任务，有微任务则先执行微任务，全部执行完毕再执行宏任务。

常见的宏任务有：MessageChannel、setTimeout()、setInterval()、UI交互事件、I/O，浏览器中独有的requestFrames、requestCallback, messageChannel，Node中独有setimmidiatly

常见的微任务有Promise、MutationObserver，node中有process.nextTick

微任务的优先级：nexttick> promise> mutationobserver

宏任务的优先级：DOM事件> 网络操作>UI render，

requestFrames会在每次重排时触发，requestCallback只有在浏览器空闲时触发。因此优先级较低，优先执行主代码块>setimmediate >settimeout/setInterval

在vue中对宏任务的实现，优先监测setImmediate，不支持的话再去检测是否支持原生的MessageChannel，如果还不支持就降级为settimeout 0

react中fiber架构，同样如果支持MessageChannel优先选择MessageChannel，不支持采用setTimeout降级处理

常见的微任务有：process.nexttick、promise.then、MutationObserver(html5 新特性)。

在事件循环中，每进行一次循环操作称为 tick。

异步操作的模式

题目1:

```javascript
console.log('script start')

setTimeout(function(){
  console.log('setTimeout')
},0)

Promise.resolve()
	.then(function () {
  	console.log('promise1');
	})
	.then(function () {
  	console.log('promise2')
	})

console.log('script end')

// script start
// script end
// promise1
// promise2
// setTimeout
```

题目2:

```javascript
async function async1() {
  console.log('async1 start');
  await async2();
  console.log('async1 end');
}

async function async2() {
  console.log('async2')
}

console.log('script start')

setTimeout(function(){
  console.log('setTimeout');
},0)

async1()

new Promise(function(resolve){
  console.log('promise1');
  resolve();
}).then(function () {
  console.log('promise2');
})
console.log('script end');

// script start
// async1 start
// async2 

// promise1
// script end

// promise2 
// async1 end

// setTimeout
```

需要注意的是，Promise一个立即执行函数，他成功或者失败的回调函数确实一个异步回调函数。当执行到resolve时这个任务会被放到回调队列当中。

### 定时器

`setTimeout`函数用来指定某个函数或某段代码，在多少毫秒之后执行。它返回一个整数，表示定时器的编号，以后可以用来取消这个定时器。

`setTimeout`函数接受两个参数，第一个参数`func|code`是将要推迟执行的函数名或者一段代码，第二个参数`delay`是推迟执行的毫秒数。

`setTimeout`和`setInterval`函数，都返回一个整数值，表示计数器编号。将该整数传入`clearTimeout`和`clearInterval`函数，就可以取消对应的定时器。

`setTimeout`和`setInterval`的运行机制，是将指定的代码移出本轮事件循环，等到下一轮事件循环，再检查是否到了指定时间。如果到了，就执行对应的代码；如果不到，就继续等待。

定时器应用：防抖函数

```javascript
$('textarea').on('keydown', debounce(ajaxAction, 2500));

function debounce(fn, delay){
  var timer = null; // 声明计时器
  return function() {
    var context = this;
    var args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  };
}
```

### setTimeout(f,0)

`setTimeout`的作用是将代码推迟到指定时间执行，如果指定时间为`0`，即`setTimeout(f, 0)`，不会立刻执行该函数，必须要等到当前脚本的同步任务，全部处理完以后，才会执行`setTimeout`指定的回调函数`f`。也就是说，`setTimeout(f, 0)`会在下一轮事件循环一开始就执行。

`setTimeout(f, 0)`有几个非常重要的用途。它的一大应用是，可以调整事件的发生顺序。比如，网页开发中，某个事件先发生在子元素，然后冒泡到父元素，即子元素的事件回调函数，会早于父元素的事件回调函数触发。如果，想让父元素的事件回调函数先发生，就要用到`setTimeout(f, 0)`。

`setTimeout(f,1)`与`setTimeout(f,0)`：两个函数都是尽可能使函数尽快发生，在chrome中两个函数优先级相同，以同步函数的方式执行，也就是谁在前就先执行谁，在firefox中，`setTimeout(f,0)`优先于`setTimeout(f,1)`

事实上，settimeout()函数的最小设置时间为4ms，也就是说，**如果当前正在运行的任务是由setTimeout（）方法创建的任务，并且timeout小于4，则将timeout增加到4。**

`setTimeout(1)`和 `setTimeout(1) `的优先级均高于`setTimeout(f,2)`。

### 为什么setTimeout有最小时延4ms

windows默认的time resolution是10-15.6ms，最开始浏览器的timer依赖于系统层面的timer resolution。但是chrome目的是高性能的现代浏览器，其希望timer的量级能够达到亚毫秒级，也就是小于1ms，因此chrome选取了和flash和quicktime同样的api来替代系统默认的timer resolution。

那为什么不设置最小延迟为0ms呢？因为设置0ms会让JavaScript引擎过度循环。如果速度很慢的JavaScript 通过0ms timer不断安排唤醒系统，那么event loop就会被阻塞，那么就会遇到CPU spining 和浏览器崩溃的状态。这就是chrome不设置最小延迟为0ms的原因。

那为什么不设置最小延迟为1ms呢？因为设置后有bug报告，现实timer导致CPU spinning，而CPU spinning的后果是计算机没有办法进入休眠模式。因此chrome团队不得不调整，对timer做了很多限制。最后发现将1ms提升到4ms，大部分机器上好像没有CPU spinning 和过于耗电的问题，

### 0ms延时的代码

使用postMessage实现0ms延时

```javascript
(function() {
   var timeout = [];
   var messageName = 'zero-timeout-message';
   
   function setZeroTimeout(fn){
     timeout.push(fn);
     window.postMessage(messageName,'*');
   }
  
   function handleMessage(event){
     if(event.source == window && event.data == messageName){
       event.stopPropagation();
       if (timeouts.length > 0){
          var fn = timeouts.shift();
          fn()
       }
     }
   }
  
   window.addEventListener('message',handleMessage,true)
  
   window.setZeroTimeout = setZeroTimeout;
})()
```

postMessage的回调函数的执行和setTimeout一样属于宏任务，

### setTimeout准时策略

**首次调用会有延时**

setInterval和setTimeout调用时，为了避免首次调用延时，把函数定义在settimeout或者setInterval外部,先执行原函数，再返回该函数给定时函数执行

```javascript
//延时写法
var data1 = 0；
function count1(){
  console.log("count1",data1++);
}
setInterval(count1,1000);

//先执行一次写法
var data2 = 0;
var count2 = function(){
  console.log("count2",data++);
  return count2; //若不返回时，此函数只会执行一次
}
setInterval(count2(),1000);
```

**循环调用时间不准**

如果循环调用setTimeout，setTimeout每次执行都会加入循环队列，而每轮宏任务的执行时间不一样，执行完才会检查消息队列，如果代码很多就会造成时间的偏差延后。

解决方案：

通过setTimeout代码灵活调整进行补偿方案去执行.

也就是说，假设设定每50ms执行一次，如果第一次执行到事件队列执行完需要66ms，那么第二次会通过获取系统事件，再通过代码调整为44ms，从而达到每50ms执行一次的效果

```javascript
function timer(){
  var speed = 500;
  counter = 1;
  start = new Date().getTime();
  
  function instance(){
    var ideal = (counter * speed),
    real = (new Date().getTime() - start);
    
    counter++;
    
    var diff = (real - ideal);
    
    window.setTimeout(function(){ instance()},(speed - diff));
  };
  window.setTimeout(function(){ instance()},speed);
}
```

通过这样弥补就可以实现准时的效果

**其他方法**

webworker新开线程执行

webworker为web内容在后台线程中运行脚本提供了一种简单的方法，线程可以执行任务而不干扰用户界面.在worker中写入一个while循环，当达到我们的预取时间时再向主线程发送一个完成事件，就不会因为主线程的其他事件干扰而延迟

```javascript
//生成worker
const createWorker = (fn,options) =>{
  const blob = new Blob(['('+fn.toString()+')()']);
  const url = URL.createObjectURL(blob);
  if(options){
    return new Worker(url,options)
  }
  return new Worker(url);
}
//创建worker线程实例
const worker = createWorker(function() {
  onmessage = function (e) {
    const date = Date.now();
    while(true){
      const now = Date.now();
      if(now - date >= e.data){
        postMessage(1);
        return;
      }
    }
  }
})
//主线程调用
let isStart = false;
function timer(){
  worker.onmessage = function(e){
    cb()
    if(isStart){
      worker.postMessage(speed);
    }
  }
  worker.postMessage(speed)
}
```

webworker修复时间会很准，但是一方面work线程会被while占住，导致无法接受信息，多个定时器无法同时执行，另一个方面由于onmessage 还是属于时间循环内，如果主线程有大量阻塞还是会让时间差越来越大

requestAnimationFrame

requestAnimationFrame方法是告诉浏览器希望执行一个动画，该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行。回调函数通常是每秒执行60次，也就是每16.7ms执行一次，但不一定保证是16.7ms.使用该方法能模拟settimeout方法

```javascript
function setTimeout2(cb,delay){
  let startTime = Date.now();
  loop()
  
  function loop(){
    const now = Date.now()
    if(now - startTime >= delay){
      cb();
      return;
    }
    requestAnimationFrame(loop);
  }
}
```

while循环

while循环强制执行定时器的过程，但是while循环会堵塞线程，不能使用

```javascript
function timer(time){
  const startTime = Date.now()
  while(true){
    const now = Date.now();
    if(now - startTime >= time){
      console.log('误差'，now - startTime - time);
      return ;
    }
  }
}
timer(5000);
```



## 异步对象promise

Promise 对象是 JavaScript 的异步操作解决方案，为异步操作提供统一接口。它起到代理作用（proxy），充当异步操作与回调函数之间的中介，使得异步操作具备同步操作的接口。它可以将异步操作以同步的流程表达出来，它比传统的使用回调函数和事件来处理异步问题更加合理，更符合人们线性处理问题的逻辑。Promise 可以让异步操作写起来，就像在写同步操作的流程，而不必一层层地嵌套回调函数。

`Prmoise`对象中保存了异步操作的最终状态和结果。Promise有三种状态，pending(进行中)、fulfilled(已完成)、rejected(已失败)。promise只会处于三种状态中的一种状态。当异步请求开始并且未结束（没有返回结果）时，处于`pending`状态。当异步请求返回结果后，可以根据请求返回的结果将`Promise`的状态修改为`fulfilled`或者`rejected`。

Promise 是一个对象，也是一个构造函数。Promise构造函数内部设置resolve、reject两个参数，可以改变promise的状态。这两个参数是两个函数，`resolve()`函数可以将`Promise`的状态由`pending`改变为`fulfilled`。`reject()`函数可以将`Promise`的状态由`pending`改变为`rejected`。异步操作的结果`resData`传给这两个函数，就是将其保存到了`Promise`对象中。由 JavaScript 引擎提供，不用自己实现。

获取resData结果后，每个`Promise`的对象实例都会有一个`.then()`和`.catch()`方法，这两个方法都接收一个函数作为参数，这个函数会被`Promise`传入一个参数，这个参数就是传入`resolve()`、`reject()`方法中的异步请求的结果（上个例子中的`resData`）。当`Promise`内部状态变为`fulfilled`时，就会进入`.then()`方法中，执行里面的回调函数。同理，当`Promise`内部状态变为`rejected`时，就会进入`.catch()`方法中，执行里面的回调函数。

**在`.then()/.catch()`的返回值依旧是一个`Promise`实例。**也就是说，在`.then()/.catch()`中`return`任何值，都会被转化成一个`Promise`实例。所以`.then()`后面可以链式继续调用`.then()/.catch`，`.catch()`后面同样也可以。

Promise 的设计思想是，所有异步任务都返回一个 Promise 实例。Promise 实例有一个`then`方法，用来指定下一步的回调函数。

实例

```javascript

```

其他方法

Promise.resolve():接收一个任意值作为参数，可以将其转换为Promise对象。

Promise.reject()：也会返回一个新的 Promise 实例，该实例的状态为`rejected`。

Promise.all():用于将多个`Promise`实例，包装成一个新的`Promise`实例。以`const p=Promise.all([p1,p2,p3]);`为例，`p1`、`p2`、`p3`都是 Promise 实例，只有`p1`、`p2`、`p3`的状态都变成`fulfilled`，`p`的状态才会变成`fulfilled`，此时`p1`、`p2`、`p3`的返回值组成一个数组，传递给`p`的回调函数。只要`p1`、`p2`、`p3`之中有一个被`rejected`，`p`的状态就变成`rejected`，此时第一个被`reject`的实例的返回值，会传递给`p`的回调函数。

Promise.race():`Promise.race`方法同样是将多个`Promise`实例，包装成一个新的`Promise`实例。只要`p1`、`p2`、`p3`之中有一个实例率先改变状态，`p`的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给`p`的回调函数。

`Promise.allSettled()`方法接受一组 Promise 实例作为参数，包装成一个新的 Promise 实例。只有等到所有这些参数实例都返回结果，不管是`fulfilled`还是`rejected`，包装实例才会结束。

`Promise.any()`方法接受一组 Promise 实例作为参数，包装成一个新的 Promise 实例。只要参数实例有一个变成`fulfilled`状态，包装实例就会变成`fulfilled`状态；如果所有参数实例都变成`rejected`状态，包装实例就会变成`rejected`状态。`Promise.any()`跟`Promise.race()`方法很像，只有一点不同，就是不会因为某个 Promise 变成`rejected`状态而结束。

Promise 的优点在于，让回调函数变成了规范的链式写法，程序流程可以看得很清楚。它有一整套接口，可以实现许多强大的功能，比如同时执行多个异步操作，等到它们的状态都改变以后，再执行一个回调函数；再比如，为多个回调函数中抛出的错误，统一指定处理方法等等。

而且，Promise 还有一个传统写法没有的好处：它的状态一旦改变，无论何时查询，都能得到这个状态。

Promise 的缺点是，编写的难度比传统写法高，而且阅读代码也不是一眼可以看懂。你只会看到一堆`then`，必须自己在`then`的回调函数里面理清逻辑。

Promise不是新的语法功能，而是新的写法，为了解决传统回调函数回调地狱的困难。

Promise最大的问题是代码冗余，原来的任务被promise包装后不管什么操作都是一堆then

https://caogongzi.gitee.io/2019/03/25/ES6-Promise/

### promise A+规范

PromiseA+规范其实是对Promise的长相进行了规范

术语：

promise：是一个拥有then方法的对象或者函数，其行为符合本规范

thenable：是一个定义then方法的对象或函数，主要是用来兼容一些老的promise实例。只要一个promise是实现thenable，也就是then方法，就可以跟promise/A+兼容

value：指resolve出来的值，可以是任何合法的js值，包括undefined、thenable和promise等

exception：异常，在promise里面用throw抛出来的错误

reason：拒绝原因，也就是reject里面传的参数

状态

Promise总共有三个状态：

pending:一个promise被resolve或者reject之前就处于这个状态

Fullfilled：一个promise被resolve之后就处于fullfilled状态，这个状态不能再被改变，而且必须拥有一个不可变的值(value)

Rejected：一个promise被reject之后就处于rejected状态，这个状态也不能再被改变，而且必须拥有一个不可变的拒绝原因(reason)

then方法：

一个promise必须有一个then方法来访问他的值或者拒绝理由。then方法有两个参数

```javascript
promise.then(onFulfilled,onRejected)
```

其中，如果onFullfilled或者onRejected都是可选参数，如果不是函数，都必须被忽略

then方法可以被同一个promise调用多次，promise成功执行时，onFullfilled的方法需按照其注册顺序依次调用，promise被拒绝执行时，所有的onRejected方法也需按照其注册顺序依次调用

then方法中的onFullfilled或者onRejected如果是函数，其被调用次数不可超过一次，且在promise执行结束前或者被拒绝执行前不可被调用，onFullfilled的一个参数为promise的终值value，onRejected的第一个参数为promise的拒因reason

https://segmentfault.com/a/1190000023157856



### promise同步与异步的问题

需要注意的是，promise只有.then和.catch的回调函数是异步的，会被添加到事件队列的微任务，promise resolve前的代码是同步的

例如

```html
<!DOCTYPE html>
<html>
<body>
<p>该实例使用 addEventListener() 方法向同个按钮中添加两个点击事件。</p>
<button id="myBtn">点我</button>
<script>
var x = document.getElementById("myBtn");
x.addEventListener("click", myFunction);
x.addEventListener("click", someOtherFunction);
function myFunction() {
	Promise((resolve,reject)=>{console.log("click1");})
    console.log("1")
}
function someOtherFunction() {
	Promise((resolve,reject)=>{console.log("click2");})
    console.log("2")
}
</script>
</body>
</html>
```

此段代码的输出为：

```javascript
click1
1
click2
2
```



### promise的第二个参数和catch的区别

reject是用来抛出异常的，catch是用来处理异常的。

reject是promise的方法，then和catch是promise实例的方法

如果在then的第一个函数里抛出了异常，后面的catch能捕获到，而then的第二个参数捕获不到

一般多使用catch方法，catch方法能捕获到then方法里的错误信息。 不使用reject

```javascript
const promise = new Promise((resolve,rejected) => {
	throw new Error('test')
})

promise.then(res => {
  
}, err => {
  console.log(err)  //此时只有then的第二个参数能捕获到错误信息
}).catch(err1 => {
	console.log(err1)
})

promise.then(res => {
  
}).catch(err1 => {
	console.log(err1)  //此时catch方法可以捕获到错误信息
})
```

promise对象的错误具有冒泡性质，会一直向后传递，直到被捕获为止，也就是说，错误总会被下一个catch语句捕获，而这是then的第二个参数处理不了的

```javascript
getJSON('/post/1.json').then(function(post) {
  return getJSON(post.commentURL);
}).then(function(comments){
  
}).catch(function(error){
	//处理前面三个promise产生的错误
})
```



## 赋值、深拷贝与浅拷贝

浅拷贝:将内存中的某个对象复制一份,在内存中开辟一块新的空间,如果复制的这个对象的属性为基本数据类型,则拷贝的便为这个值本身,如果为复杂数据类型,则拷贝复制的为地址,因此,修改新对象会对原对象产 生影响

深拷贝:开辟一块新的空间,完整的复制一份,包括复杂数据类型,拷贝的这个对象和原对象无任何关系,修改什么 的都互不影响

深拷贝：我们希望在改变新的数组（对象）的时候，不改变原数组（对象）

赋值是将某一**数值或对象**赋给某个**变量**的过程，分为：

1、基本数据类型：赋值，赋值之后两个变量互不影响

2、引用数据类型：赋**址**，两个变量具有相同的引用，指向同一个对象，相互之间有影响

浅拷贝：**创建一个新对象，这个对象有着原始对象属性值的一份精确拷贝**。如果属性是基本类型，拷贝的就是基本类型的值，如果属性是引用类型，拷贝的就是内存地址 ，所以如果其中一个对象改变了这个地址，就会影响到另一个对象。object.assign、array.slice都属于浅拷贝

用代码说明

```javascript
var a = {}
var b = {...a}
var c = a;

console.log(a === b)  //false
console.log(b === c)  //false
console.log(a === c)	// true
```



|        | 和原数据是否指向同一对象 | 第一层数据为基本数据类型 | 原数据中包含子对象       |
| ------ | ------------------------ | ------------------------ | ------------------------ |
| 赋值   | 是                       | 改变会使原数据一起改变   | 改变会使原数据一起改变   |
| 浅拷贝 | 否                       | 改变不会使原数据一起改变 | 改变会使原数据一起改变   |
| 深拷贝 | 否                       | 改变不会使原数据一起改变 | 改变不会使原数据一起改变 |



## 对象的循环引用

对象的循环引用本质为堆对堆的引用形成闭环造成了循环引用

循环引用可以是对象的某个属性调用对象自身，或者两个对象的属性间互相引用对方对象,或者同级引用

```javascript
// 自身的某个属性的值等于自身
const obj1 = {
    a: 1,
}
obj1.b = obj;  // obj1的属性b引用了obj自己

console.log(obj);
/**
 * {
 *   a: 1,
 *   b: {
 *     a: 1,
 *     b: {
 *       a: 1,
 *       b: ...
 *     }
 *   }
 * }
 */

// 互相调用
const obj1 = {
  name: 'obj1',
}

const obj2 = {
  name: 'obj2',
}

// obj1 和 obj2 的val属性互相引用了对方
obj1.val = obj2;
obj2.val = obj1;
console.log(obj1);
/**
 * {
 *   name: 'obj1',
 *   val: {
 *     name: 'obj2',
 *     val: {
 *       name: 'obj1',
 *       val: { ... }
 *     }
 *   }
 * }
 */

// 同级调用
const obj = {
    a: 1,
    b: 2,
    c: {
    
    }
}
obj.c.d = obj.a;
```

对象循环引用会导致的问题

JSON数据序列化时会报错

```javascript
const a = { name: 'a' }
const b = { name: 'b' }
a.val = b;
b.val = a;
JSON.stringify(obj1);  // error
```

对象的深拷贝不能正确处理循环引用 / 递归爆栈

```javascript
const a = { name: 'a' }
const b = { name: 'b' }
a.val = b;
b.val = a;
const c = _deepCopy(obj1);
console.log(c);
/**
  * {
  *   ...someProperty,
  *   [Circular]
  * }
  */
```

### 循环引用对象的深拷贝

拷贝时利用额外的空间检查对象是否已经克隆过，有就直接返回，没有则继续克隆

```javascript
function clone(target, map = new Map()) {
    if (typeof target === 'object') {
        let cloneTarget = Array.isArray(target) ? [] : {};
        if (map.get(target)) {
            return map.get(target);
        }
        map.set(target, cloneTarget);
        for (const key in target) {
            cloneTarget[key] = clone(target[key], map);
        }
        return cloneTarget;
    } else {
        return target;
    }
};
```





## debugger与控制台命令

`debugger`语句主要用于除错，作用是设置断点。如果有正在运行的除错工具，程序运行到`debugger`语句时会自动停下。如果没有除错工具，`debugger`语句不会产生任何结果，JavaScript 引擎自动跳过这一句。

Chrome 浏览器中，当代码运行到`debugger`语句时，就会暂停运行，自动打开脚本源码界面。

浏览器控制台中，除了使用`console`对象，还可以使用一些控制台自带的命令行方法。

`$_`属性返回上一个表达式的值。

控制台保存了最近5个在 Elements 面板选中的 DOM 元素，`$0`代表倒数第一个（最近一个），`$1`代表倒数第二个，以此类推直到`$4`。

`$(selector)`返回第一个匹配的元素，等同于`document.querySelector()`。注意，如果页面脚本对`$`有定义，则会覆盖原始的定义。比如，页面里面有 jQuery，控制台执行`$(selector)`就会采用 jQuery 的实现，返回一个数组。

`$$(selector)`返回选中的 DOM 对象，等同于`document.querySelectorAll`

`$x(path)`方法返回一个数组，包含匹配特定 XPath 表达式的所有 DOM 元素。

`inspect(object)`方法打开相关面板，并选中相应的元素，显示它的细节。DOM 元素在`Elements`面板中显示，比如`inspect(document)`会在 Elements 面板显示`document`元素。JavaScript 对象在控制台面板`Profiles`面板中显示，比如`inspect(window)`。

`getEventListeners(object)`方法返回一个对象，该对象的成员为`object`登记了回调函数的各种事件（比如`click`或`keydown`），每个事件对应一个数组，数组的成员为该事件的回调函数。

`keys(object)`方法返回一个数组，包含`object`的所有键名。

`values(object)`方法返回一个数组，包含`object`的所有键值。

`monitorEvents(object[, events])`方法监听特定对象上发生的特定事件。事件发生时，会返回一个`Event`对象，包含该事件的相关信息。`unmonitorEvents`方法用于停止监听。

`monitorEvents`允许监听同一大类的事件。所有事件可以分成四个大类。

- mouse："mousedown", "mouseup", "click", "dblclick", "mousemove", "mouseover", "mouseout", "mousewheel"
- key："keydown", "keyup", "keypress", "textInput"
- touch："touchstart", "touchmove", "touchend", "touchcancel"
- control："resize", "scroll", "zoom", "focus", "blur", "select", "change", "submit", "reset"

命令行 API 还提供以下方法。

- `clear()`：清除控制台的历史。
- `copy(object)`：复制特定 DOM 元素到剪贴板。
- `dir(object)`：显示特定对象的所有属性，是`console.dir`方法的别名。
- `dirxml(object)`：显示特定对象的 XML 形式，是`console.dirxml`方法的别名。

## js数据结构

https://segmentfault.com/a/1190000002410553

### 图

图（Graph）是由顶点的有穷非空集合和顶点之间边的集合组成，通常表示为：`G(V,E)`，其中，`G`表示一个图，`V`是图G中顶点的集合，`E`是图G中边的集合

**有向边：**若从顶点`Vi`到`Vj`的边有方向，则称这条边为有向边，也成为弧(Arc)，用有序偶`<Vi,Vj>`来表示，`Vi`称为弧尾，`Vj`称为弧头。

无向边：**若顶点`Vi`到`Vj`之间的边没有方向，则称这条边为无向边(Edge)，用无序偶`(Vi,Vj)`来表示。

简单图：在图结构中，若不存在顶点到其自身的边，且同一条边不重复出现，则称这样的图为简单图

创建定点

创建图类的第一步就是要创建一个`Vertex`类来保存顶点和边。这个类的作用和链表、二叉搜索树的Node类一样。`Vertex`类有两个数据成员：一个用于标识顶点，另一个表明是否被访问过的布尔值。分别被命名为`label`和`wasVisited`

```javascript
function Vertex(label){
    this.label = label;
}
```

构建图

```javascript
function Graph(v){
    this.vertices = v;//vertices至高点
    this.edges = 0;
    this.adj = [];
    for(var i =0;I<this.vertices;++i){
        this.adj[i] = [];
        this.adj[i].push('');
    }
    this.addEdge = addEdge;
    this.toString = toString;
}
```

这个类会记录一个图表示了多少条边，并使用一个长度与图的顶点数来记录顶点的数量

```javascript
function addEdge(){
    this.adj[v].push(w);
    this.adj[w].push(v);
    this.edges++;
}
```

#### 图的遍历

深度优先遍历

比如在一个房间内寻找一把钥匙，无论从哪一间房间开始都可以，将房间内的墙角、床头柜、床上、床下、衣柜、电视柜等挨个寻找，做到不放过任何一个死角，当所有的抽屉、储藏柜中全部都找遍后，接着再寻找下一个房间。

```javascript
function dfs(v){
    this.marked[v] = true;
    //if语句在这里不是必须的
    if(this.adj[v] != undefined){
        print("Visited vertex: " + v );
        for each(var w in this.adj[v]){
            if(!this.marked[w]){
                this.dfs(w);
            }
        }
    }
}
```

广度优先遍历

广度优先搜索（`BFS`）属于一种盲目搜寻法，目的是系统地展开并检查图中的所有节点，以找寻结果。换句话说，它并不考虑结果的可能位置，彻底地搜索整张图，直到找到结果为止。

工作原理：

  1. 首先查找与当前顶点相邻的未访问的顶点，将其添加到已访问顶点列表及队列中；
  2. 然后从图中取出下一个顶点v，添加到已访问的顶点列表
  3. 最后将所有与v相邻的未访问顶点添加到队列中

```javascript
function bfs(s){
    var queue = [];
    this.marked = true;
    queue.push(s);//添加到队尾
    while(queue.length>0){
        var v = queue.shift();//从队首移除
        if(v == undefined){
            print("Visited vertex: " + v);
        }
        for each(var w in this.adj[v]){
            if(!this.marked[w]){
                this.edgeTo[w] = v;
                this.marked[w] = true;
                queue.push(w);
            }
        }
    }
}
```

拓扑排序算法

拓扑排序会对`有向图`的所有顶点进行排序，使`有向边`从前面的顶点指向后面的顶点。
拓扑排序算法与`BFS`类似，不同的是，拓扑排序算法不会立即输出已访问的顶点，而是访问当前顶点邻接表中的所有相邻顶点，直到这个列表穷尽时，才会将当前顶点压入栈中。

拓扑排序算法被拆分为两个函数，第一个函数是`topSort()`，用来设置排序进程并调用一个辅助函数`topSortHelper()`，然后显示排序好的顶点列表

拓扑排序算法主要工作是在递归函数`topSortHelper()`中完成的，这个函数会将当前顶点标记为已访问，然后递归访问当前顶点邻接表中的每个顶点，标记这些顶点为已访问。最后，将当前顶点压入栈中。

```javascript
//topSort()函数
function topSort(){
    var stack = [];
    var visited = [];
    for(var i =0;i<this.vertices;i++){
        visited[i] = false;
    }
    for(var i = 0;i<this.vertices;i++){
        if(visited[i] == false){
            this.topSortHelper(i,visited,stack);
        }
    }
    for(var i = 0;i<stack.length;i++){
        if(stack[i] !=undefined && stack[i] != false){
            print(this.vertexList[stack[i]]);
        }
    }
}

//topSortHelper()函数
function topSortHelper(v,visited,stack){
    visited[v] = true;
    for each(var w in this.adj[v]){
        if(!visited[w]){
            this.topSortHelper(visited[w],visited,stack);
        }
    }
    stack.push(v);
}
```

