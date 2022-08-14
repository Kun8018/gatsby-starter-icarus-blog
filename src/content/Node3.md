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

## DOM方法

### Mutation Observer

Mutation Observer APi用来监听DOM变动。DOM的任何变动，比如节点的增减、属性的变动、文本的变动，这个api都可以得到通知

DOM变动就会触发Mutation Observer，与事件的区别是事件是同步触发，也就是DOM的变动立刻会触发相应的事件，Mutation Observer是异步触发，需要等当前所有的DOM操作都结束才会触发

Mutation Observer有以下特点：

- 它等所有脚本任务完成后才会运行(异步触发)
- 它把DOM变动记录封装成一个数组进行处理，而不是一条条个别处理
- 既可以观察DOM的所有类型变动，也可以只观察某一类变动

实例方法

`observe()`方法用来监听，接受两个参数：所要观察的DOM节点，以及配置对象，也就是观察的特定变动

`disconnect()`方法用来停止观察，调用该方法后DOM再变动也不会触发

`takeRecords()`方法用来

### Document

实例方法

`document.open()`方法清除当前文档内的所有内容，使得文档处于可写状态

`document.close()` 方法关闭document.open打开的文档

`document.elementFromPoint()`方法返回位于页面指定位置最上层的元素节点

`document.createDocumentFragment()`方法生成一个DocumentFragment实例



### Element

实例属性

`element.id`:属性直接返回指定元素的id属性

`element.tagname`属性直接返回指定元素的大写标签名，与nodeName属性的值相等

`element.dir`属性用于读写当前元素的文字方向，从左到右为ltr，从右到左为rtl

`element.draggable`属性返回一个布尔值，表示当前元素是否可拖动

`element.lang`属性返回当前元素的语言设置

`element.hidden`属性返回一个布尔值，表示当前元素的hidden属性，用来控制当前的元素是否可见

`element.className`属性用来读写当前元素节点的class属性

`element.classList`属性返回一个类似数组的对象，当前节点的每一个class就算这个对象的一个成员

`element.innerHTML`属性返回一个字符串，等同于该元素包含的所有html代码

`element.outerHTML`属性返回一个字符串，表示当前元素节点的所有HTML代码，包括该元素自身和所有子元素

`element.clientHeight`属性返回一个整数值，表示元素节点的css高度

`element.clientwidth`属性返回元素节点的CSS宽度

`element.clientLeft`属性等于元素节点左边框的宽度

`element.clientTop`属性等于元素顶部边框的宽度

`element.scrollHeight`属性返回一个整数值，表示当前元素的总高度，包括溢出容器不可见的高度、padding、伪元素的高度，不包括border、margin、以及水平滚动条的高度

`element.scrollWidth`属性返回当前元素的总宽度

`element.offsetHeight`属性返回一个整数，表示元素的CSS垂直高度，包括元素自身的高度、padding、border、以及水平滚动条的高度

`element.offsetWidth`属性返回一个CSS水平宽度。

`element.scrollLeft`属性表示当前元素的水平滚动条向右侧滚动的像素数量，如果没有滚动条值为0 

`element.scrollTop`属性表示当前元素的垂直滚动条向下滚动的像素数量，如果没有滚动条值为0 

`element.offsetLeft`属性表示当前元素左上角相对于element.offsetParent节点的水平位移

`element.offsetTop`属性表示当前元素左上角相对于element.offsetParent节点的垂直位移

`element.firstElementChild`属性返回当前元素的第一个元素子节点

`element.lastElementChild`返回当前元素的最后一个元素子节点

`element.offsetParent`属性返回最靠近当前元素的、并且CSS的position属性不等于static的上层元素

`element.children`属性返回一个类似数组的对象，包含当前元素节点的所有子元素。如果当前元素没有子元素，则返回的对象包含零个成员

实例方法

`element.querySelector()`方法接受CSS选择器作为参数，返回父元素的第一个匹配的子元素，如果没有找到匹配的子元素，返回null

`element.querySelectorAll()`方法接受CSS选择器作为参数，返回一个NodeList实例，包含所有匹配的子元素

`element.getElementsByClassName`方法返回一个HTMLCollection实例，成员是当前元素的子元素节点。与document.getElementByClassName类似，只是搜索范围不是整个文档是当前元素element

`element.scrolltoView`方法滚动当前元素，进入浏览器的可见区域，类似于设置window.location.hash的效果

`element.getBoundingClientRect()`方法返回一个对象，提供当前元素节点的大小、位置等信息，基本上是CSS盒状模型的所有信息

`element.getClientRects()`方法返回一个类似数组的对象，里面是元素当前在页面上形成的矩形

`element.insertAdjacentHTML()`方法用于将一个HTML字符串解析成DOM结构插入相对于当前节点的指定位置

`element.remove()`方法用于将当前元素节点从它的父节点移除

`element.focus()`方法用于将当前页面的焦点转移到指定元素上

`element.blur()`方法用于将焦点从当前元素上移除

`element.click()`方法用于在当前元素上模拟一次鼠标点击，相当于触发了click事件



### Htmlcollection、NodeList

document和element都是单个dom对象，可以使用htmlcollection和nodelist多节点对象

NodeList包含各种类型的节点，HTMLCollection只是HTML元素节点

NodeList实例很像数组，但是不是数组，不可以使用pop或者push等数组的方法，可以使用length属性和forEach方法，也可以使用for遍历

如果NodeList要使用数组的方法，可以将其转为真正的数组，使用array.slice.call(nodelist)进行转换

遍历时可以选择NodeList.keys、NodeList.values、NodeList.entries三个对象进行遍历。NodeList.keys返回键名的遍历器，NodeList.values返回键值的遍历器，NodeList.entries返回的遍历器同时包含键名和键值

```javascript
for (var key of children.keys()) {
   console.log(key)
}
for (var value of children.values()) {
   console.log(value)
}
for (var entry of children.entries()) {
   console.log(entry)
}
```

HTMLCollection是节点对象的集合，但只能包含元素节点(element)，不能包含其他类型的节点。HTMLCollection与NodeList接口不同，HTMLCollection没有forEach方法，只能用for循环遍历

HTMLCollection.length属性：返回HTMLCollection实例包含的成员数量

HTMLCollection.Item()方法:接收一个整数值作为参数，返回该位置上的成员

HTMLCollection.namedItem()方法：通过id或者name属性返回对应的元素节点，如果没有对应的节点返回null



### text、documentFragment

Text节点表示元素节点和属性节点的文本内容。如果一个节点只包含一段文本，那么它就有一个文本字节点，代表该节点的文本内容。

属性

text.data属性等同于NodeValue属性，用来设置或读取文本节点的内容

text.wholeText属性将当前文本节点和毗邻的文本节点作为一个整体返回

text.length属性返回当前文本节点的文本长度

方法

text.appendData方法用于在Text节点尾部追加字符串

text.deleteData方法用于删除Text节点内部的子字符串，第一个参数为子字符串开始的位置，第二个参数是子字符串长度

text.insertData方法用于在text节点插入字符串，第一个参数为插入位置，第二个参数是插入的子字符串

text.replaceData方法用于获取子字符串，第一个参数为子字符串在Text节点中的开始位置，第二个参数为子字符串长度

text.remove方法用于移除当前Text节点

text.splitText方法将Text节点一分为二，变成两个毗邻的text节点，它的参数是从0开始。如果位置不存在，将报错

DocumentFragment节点代表一个文档的片段，本身就是一个完整的DOM树形结构，它没有父节点，parentNode返回Null，但是可以插入任意数量的子节点，它不属于当前节点，所以操作DocumentFragment节点比直接操作DOM树快的多

DocumentFragment节点本身不能被插入当前文档，当他作为appendChild、insertBefore等方法的参数时，是它的所有子节点插入当前文档，而不是它自身。一旦DocumentFragment节点被插入，它自身就变成空节点，可以再次被使用。如果想要保留DocumentFragment节点的内容，可以使用cloneNode方法。

DocumentFragment节点不是单独的一种节点对象，它具有的属性和方法全部继承自Node节点和ParentNode接口。



## 浏览器缓存storage方法

storage 接口用于脚本在浏览器保存数据。两个对象部署了这个接口：`window.sessionStorage`和`window.localStorage`。

属性：

`Storage.length`：返回保存的数据项个数。

方法：

`Storage.setItem()`方法用于存入数据。它接受两个参数，第一个是键名，第二个是保存的数据。如果键名已经存在，该方法会更新已有的键值。

`Storage.getItem()`方法用于读取数据。它只有一个参数，就是键名。如果键名不存在，该方法返回`null`。

`Storage.removeItem()`方法用于清除某个键名对应的键值。它接受键名作为参数，如果键名不存在，该方法不会做任何事情。

`Storage.clear()`方法用于清除所有保存的数据。该方法的返回值是undefined

`Storage.key()`接受一个整数作为参数（从零开始），返回该位置对应的键值

```js
window.localStorage.setItem('baz', 'c');
window.sessionStorage.setItem('key', 'value');
window.localStorage.setItem('key', 'value');
window.sessionStorage.getItem('key')
window.localStorage.getItem('key')
sessionStorage.removeItem('key');
localStorage.removeItem('key');
window.sessionStorage.clear()
window.localStorage.clear()
window.sessionStorage.key(0)
//遍历所有键
for (var i = 0; i < window.localStorage.length; i++) {
  console.log(localStorage.key(i));
}
window.addEventListener('storage', onStorageChange);
```

异步方法



## 函数、函数作用域和闭包

JavaScript 语言将函数看作一种值，与其它值（数值、字符串、布尔值等等）地位相同。凡是可以使用值的地方，就能使用函数。比如，可以把函数赋值给变量和对象的属性，也可以当作参数传入其他函数，或者作为函数的结果返回。函数只是一个可以执行的值，此外并无特殊之处。

由于函数与其他数据类型地位平等，所以在 JavaScript 语言中又称函数为第一等公民。

return语句

函数体内的return语句表示返回，JavaScript引擎遇到return语句就会直接返回return语句后面那个表达式的值，后面即使还有语句也不会得到执行，也就是说，return语句所带的那个表达式就是函数的返回值。return语句不是必须的，如果没有的话该函数就不返回任何值，或者说返回undefined

通过return语句调用自己，就是递归，比如计算斐波那契数列

```javascript
function fib(num) {
  if(num == 0) return 0;
  if(num == 1) return 1;
  return fib(num-1) + fib(num-2)
}
```

arguements对象

由于 JavaScript 允许函数有不定数目的参数，所以需要一种机制，可以在函数体内部读取所有参数。这就是`arguments`对象的由来。

`arguments`对象包含了函数运行时的所有参数，`arguments[0]`就是第一个参数，`arguments[1]`就是第二个参数，以此类推。这个对象只有在函数体内部，才可以使用。

虽然`arguments`很像数组，但它是一个对象。数组专有的方法（比如`slice`和`forEach`），不能在`arguments`对象上直接使用。

如果要让`arguments`对象使用数组方法，真正的解决方法是将`arguments`转为真正的数组。下面是两种常用的转换方法：`slice`方法和逐一填入新数组。

### 函数提升与变量提升

JavaScript 引擎的工作方式是，先解析代码，获取所有被声明的变量，然后再一行一行地运行。这造成的结果，就是所有的变量的声明语句，都会被提升到代码的头部，这就叫做变量提升（hoisting）。

```javascript
console.log(a)   //undefined
var a='我是谁'
console.log(a)   //'我是谁'
```

例：变量提升常常会导致的错误，在for循环中添加异步事件时会导致var直接变成最后一个，因为for循环是同步循环，先完成循环再执行异步任务，使用let变量即使是异步事件由于局部作用域不会发生这种事

```javascript
for (var i=0;i<5;i++) {
    console.log(i);
}
// 输出：0,1,2,3,4

for (var i=0;i<5;i++) {
  setTimeout(()=>{
    console.log(i);
  },0)
}
//当事件是异步时输出都是4，set

//使用立即执行函数或者let变量可以输出0，1，2，3，4
for (let i=0;i<5;i++) {
  setTimeout(()=>{
    console.log(i);
  },0)
}

for (var i=0;i<5;i++) {
  (function(i){
    setTimeout(()=>{
    	console.log(i);
  	},0)
  })(i)
}
```

变量提升的其他例子

```javascript
var foo = 3;

// 预编译之后
function hoistVariable() {
    var foo;
    foo = foo || 5;
    console.log(foo); // 5
}

hoistVariable();
```

JavaScript 引擎将函数名视同变量名，所以采用`function`命令声明函数时，整个函数会像变量声明一样，被提升到代码头部。所以，下面的代码不会报错。

表面上，上面代码好像在声明之前就调用了函数`f`。但是实际上，由于“变量提升”，函数`f`被提升到了代码头部，也就是在调用之前已经声明了。但是，如果采用赋值语句定义函数，JavaScript 就会报错。

**函数提升只针对具名函数，而对于赋值的匿名函数，并不会存在函数提升。**

```javascript
function hoistFunction() {
    foo(); // output: I am hoisted

    function foo() {
        console.log('I am hoisted');
    }
}

hoistFunction();
// 预编译之后
function hoistFunction() {
    function foo() {
        console.log('I am hoisted');
    }

    foo(); // output: I am hoisted
}

hoistFunction();
```

**函数提升优先级高于变量提升，且不会被同名变量声明覆盖，但是会被变量赋值后覆盖。而且存在同名函数与同名变量时，优先执行函数。**

函数声明被提升时，声明和赋值两个步骤都会被提升，而普通变量却只能提升声明步骤，而不能提升赋值步骤。变量被提升过后，先对提升上来的所有对象统一执行一遍声明步骤，然后再对变量执行一次赋值步骤。而执行赋值步骤时，会优先执行函数变量的赋值步骤，再执行普通变量的赋值步骤。

```javascript
console.log(a);      //f a() 此时a是函数
console.log(a());      //1  
var a=1;
function a(){
    console.log(1);
}
console.log(a);       //1   
a=3
console.log(a())      //a not a function,被覆盖
```

变量提升和函数提升的原因：

函数提升是为了解决函数相互递归调用的目的

也就是说，变量提升是人为实现的问题，而函数提升在当初设计时是有目的的。

其他：

ES6中的class声明也存在提升，不过它和let、const一样，被约束和限制了，其规定，如果再声明位置之前引用，则是不合法的，会抛出一个异常。

所以，无论是早期的代码，还是ES6中的代码，我们都需要遵循一点，先声明，后使用。

### 作用域与作用域链

JS执行环境在JS机制内部`就是用一个对象来表示的`，称作`执行环境对象`，简称`环境对象`。执行环境分为`全局执行环境`和`局部执行环境`两种，每个执行环境都有一个属于自己的环境对象。在web浏览器中，全局环境对象为window对象

作用域

作用域是变量或者函数可以被访问的代码范围，或者说是变量和函数所起作用的范围。

作用域分为`全局作用域`、`局部作用域`两种。

在页面中的脚本开始执行时，就会产生一个“全局作用域”。它是最外围（范围最大，或者说层级最高）的一个作用域。全局作用域的变量、函数
可以在代码的任何地方访问到。

当一个函数被创建的时候，会创建一个“局部作用域”。局部作用域中的函数、变量只能在某些局部代码中可以访问到。

作用域链

当前作⽤域没有定义的变量，就是⾃由变量 。为了得到⾃由变量，js程序内部将向⽗级作⽤域寻找。如果上一级父级作用域也没有，就一层一层向上找，直到找到全局作⽤域还是没找到，就宣布放弃。这种⼀层⼀ 层的关系，就是 **作⽤域链** 。



### 闭包

闭包就是有权访问另一个函数作用域中的变量的函数。

由于函数作用域的影响，正常情况下，函数外部无法读取函数内部声明的变量，只有函数内部可以读取全局变量和父作用域变量。

如果出于种种原因，需要得到函数内的局部变量。正常情况下，这是办不到的，只有通过变通方法才能实现。

**在函数内部定义子函数，将子函数作为返回值，就可以在外部读取函数内部的变量，作为返回值的子函数称为闭包**

```javascript
function f1() {
  var n = 999;
  function f2() {
    console.log(n);
  }
  return f2;
}

var result = f1();
result(); // 999
```

闭包的最大用处有两个，一个是可以读取外层函数内部的变量，另一个就是让这些变量始终保持在内存中，即闭包可以使得它诞生环境一直存在。原因是闭包（上例的`inc`）用到了外层变量（`start`），导致外层函数（`createIncrementor`）不能从内存释放。只要闭包没有被垃圾回收机制清除，外层函数提供的运行环境也不会被清除，它的内部变量就始终保存着当前值，供闭包读取。

此外，闭包的另一个用处，是封装对象的私有属性和私有方法。

```javascript
function Person(name) {
  var _age;
  function setAge(n) {
    _age = n;
  }
  function getAge() {
    return _age;
  }

  return {
    name: name,
    getAge: getAge,
    setAge: setAge
  };
}

var p1 = Person('张三');
p1.setAge(25);
p1.getAge() // 25
```

闭包的使用场景

需要值长期保存又需要隐藏的场景

闭包的问题

一般情况下，一个函数执行完内部的代码，函数调用时所创建的执行环境、环境对象（包括变量对象、[[scope]]等）都会被销毁，它们的生命周期就只有函数调用到函数执行结束这一段时间。

闭包形成后，会在函数执行完仍将他的变量对象保存在内存中，当引用时间过长或者引用对象很多的时候，会占用大量内存，严重影响性能。

闭包的清除

将闭包的值手动置空即可。

eval命令

`eval`命令接受一个字符串作为参数，并将这个字符串当作语句执行。



### 立即执行函数

立即执行函数就是声明一个匿名函数，并且马上调用这个匿名函数

```javascript
//函数最后的括号是调用的意思
(function() {alert('匿名函数')})()
```

立即执行函数的作用只有一个：创建独立的作用域

在这个作用域里面的变量，外面访问不到，即避免变量污染

```javascript
var liList = ul.getElementsByTagName('li')
for(var i=0;i<6;i++){
  liList[i].onclick = function(){
    alert(i) //输出都是6，i贯穿整个作用域，而不是给每个li一个i
  }
}

//使用立即执行函数创建独立作用域
var liList = ul.getElementsByTagName('li')
for(var i=0;i<6;i++){
  !function(ii){
    liList[ii].onclick = function(){
    	alert(ii) //输出都是6，i贯穿整个作用域，而不是给每个li一个i
  	}
  }
}
```



### 函数的rest参数与占位符

无法只省略该参数，而不省略它后面的参数，除非显式输入`undefined`。如果传入`undefined`，将触发该参数等于默认值，`null`则没有这个效果。

```javascript
function f(x, y = 5, z) {
  return [x, y, z];
}

f() // [undefined, 5, undefined]
f(1) // [1, 5, undefined]
f(1, ,2) // 报错
f(1, undefined, 2) // [1, 5, 2]
```

数组的Map方法函数的占位符为下滑线

```javascript
 Array.from({ length: 31 }).map((_, i) => i + 1),
```



 

## 严格模式

早期的 JavaScript 语言有很多设计不合理的地方，但是为了兼容以前的代码，又不能改变老的语法，只能不断添加新的语法，引导程序员使用新语法。

严格模式是从 ES5 进入标准的，主要目的有以下几个。

- 明确禁止一些不合理、不严谨的语法，减少 JavaScript 语言的一些怪异行为。
- 增加更多报错的场合，消除代码运行的一些不安全之处，保证代码运行的安全。
- 提高编译器效率，增加运行速度。
- 为未来新版本的 JavaScript 语法做好铺垫。

严格模式可以用于整个脚本，也可以只用于单个函数。`use strict`放在脚本文件的第一行，整个脚本都将以严格模式运行。如果这行语句不在第一行就无效，整个脚本会以正常模式运行。`use strict`放在函数体的第一行，则整个函数以严格模式运行。

进入严格模式的标志，是一行字符串`use strict`。老版本的引擎会把它当作一行普通字符串，加以忽略。新版本的引擎就会进入严格模式。

严格模式不允许的语法：

严格模式下，设置字符串的`length`属性，会报错。长度只可读，不可写；

严格模式下，对一个只有取值器（getter）、没有存值器（setter）的属性赋值，会报错。

严格模式下，对禁止扩展的对象添加新属性，会报错。

正常模式下，函数内部的`this`可能会指向全局对象，严格模式禁止这种用法，避免无意间创造全局变量。

函数内部不得使用`fn.caller`、`fn.arguments`，否则会报错。这意味着不能在函数内部得到调用栈了。

严格模式下无法删除变量，如果使用`delete`命令删除一个变量，会报错。只有对象的属性，且属性的描述对象的`configurable`属性设置为`true`，才能被`delete`命令删除。



## this关键字

`this`指向属性或方法“当前”所在的对象。

`this`的动态切换，固然为 JavaScript 创造了巨大的灵活性，但也使得编程变得困难和模糊。有时，需要把`this`固定下来，避免出现意想不到的情况。JavaScript 提供了`call`、`apply`、`bind`这三个方法，来切换/固定`this`的指向。

`call`方法的参数是一个对象。如果参数为空、`null`和`undefined`，则默认传入全局对象。

```javascript
var n = 123;
var obj = { n: 456 };

function a() {
  console.log(this.n);
}

a.call() // 123
a.call(null) // 123
a.call(undefined) // 123
a.call(window) // 123
a.call(obj) // 456
```

`apply`方法的作用与`call`方法类似，也是改变`this`指向，然后再调用该函数。唯一的区别就是，它接收一个数组作为函数执行时的参数

`bind()`方法用于将函数体内的`this`绑定到某个对象，然后返回一个新函数。

```javascript
var counter = {
  count: 0,
  inc: function () {
    this.count++;
  }
};

var func = counter.inc.bind(counter);
func();
counter.count // 1
```

### 为什么有this

JavaScript 语言之所以有 this 的设计，跟内存里面的数据结构有关系。

将一个对象赋值给变量`obj`。JavaScript 引擎会先在内存里面，生成一个对象`{ foo: 5 }`，然后把这个对象的内存地址赋值给变量`obj`。也就是说，变量`obj`是一个地址（reference）。后面如果要读取`obj.foo`，引擎先从`obj`拿到内存地址，然后再从该地址读出原始的对象，返回它的`foo`属性。

原始的对象以字典结构保存，每一个属性名都对应一个属性描述对象。

这样的结构是很清晰的，问题在于属性的值可能是一个函数。

引擎会将函数单独保存在内存中，然后再将函数的地址赋值给`foo`属性的`value`属性。

由于函数是一个单独的值，所以它可以在不同的环境（上下文）执行。JavaScript 允许在函数体内部，引用当前环境的其他变量。

现在问题就来了，由于函数可以在不同的运行环境执行，所以需要有一种机制，能够在函数体内部获得当前的运行环境（context）。所以，`this`就出现了，它的设计目的就是在函数体内部，指代函数当前的运行环境。

### 绑定方法

**new绑定**： new方式是优先级最高的一种调用方式，只要是使用new方式来调用一个构造函数，this一定会指向new调用函数新创建的对象

**显示绑定**：显示绑定指的是通过call()和apply()方法，强制指定某些对象对函数进行调用，this则强制指向调用函数的对象

**隐式绑定**：隐式绑定是指通过为对象添加属性，该属性的值即为要调用的函数，进而使用该对象调用函数

**默认绑定**：默认绑定是指当上面这三条绑定规则都不符合时，默认绑定会把this指向全局对象window

```javascript
function thisTo(){
   console.log(this.a);
}
var a=2; //a是全局对象的一个同名属性
thisTo(); //2
```

### this通常的调用方式

全局环境

全局环境使用`this`，它指的就是顶层对象`window`。

```javascript
this === window // true

function f() {
  console.log(this === window);
}
f() // true
```

构造函数

```javascript
// 定义了一个构造函数Obj。由于this指向实例对象，所以在构造函数内部定义this.p，就相当于定义实例对象有一个p属性。
var Obj = function (p) {
  this.p = p;
};

var o = new Obj('Hello World!');
o.p // "Hello World!"
```

对象的方法

如果对象的方法里面包含`this`，`this`的指向就是方法运行时所在的对象。该方法赋值给另一个对象，就会改变`this`的指向。

```javascript
var obj ={
  foo: function () {
    console.log(this);
  }
};

obj.foo() // obj
// 情况一
(obj.foo = obj.foo)() // window
// 情况二
(false || obj.foo)() // window
// 情况三
(1, obj.foo)() // window
```



### this指向丢失的情况

引用赋值丢失：

当进行**隐式绑定**时，如果进行一次引用赋值或者传参操作，会造成this的丢失，使this绑定到全局对象中去。

```javascript
function thisTo(){
   console.log(this.a);
}
var data={
    a:2,
    foo:thisTo //通过属性引用this所在函数 
};
var a=3;//全局属性
 
var newData = data.foo; //这里进行了一次引用赋值 
newData(); // 3，因为newData实际上引用的是foo函数本身，这就相当于：var newData = thisTo;data对象只是一个中间桥梁，data.foo只起到传递函数的作用，所以newData跟data对象没有任何关系。而newData本身又不带a属性，最后a只能指向window。
```

回调函数传参丢失

传参丢失，就是在将包含this的函数作为参数在函数中传递时，this指向改变。setTimeout函数的本来写法应该是setTimeout(function(){......},100)；100ms后执行的函数都在“......”中，可以将要执行函数定义成var fun = function(){......},即:setTimeout(fun,100)，100ms后就有：fun()；所以此时此刻是data.foo作为一个参数，是这样的：setTimeout(thisTo,100);100ms过后执行thisTo()

```javascript
function thisTo(){
   console.log(this.a);
}
var data={
    a:2,
    foo:thisTo //通过属性引用this所在函数 
};
var a=3;//全局属性
 
setTimeout(data.foo,100);// 3
```

数组的foreach和map方法

`foreach`方法的回调函数中的`this`，其实是指向`window`对象，因此取不到`o.v`的值。原因跟上一段的多层`this`是一样的，就是内层的`this`不指向外部，而指向顶层对象。

解决this丢失的问题：

1.使用bind 方法返回一个新对象。它会把参数设置为this的上下文并调用原始函数。

2.间接引用：间接引用是指一个定义对象的方法引用另一个对象存在的方法，这种情况下会使得this指向window：

3.使用箭头函数：箭头函数在this这块是一个特殊的改进，箭头函数使用了词法作用域取代了传统的this机制，所以箭头函数无法使用上面所说的这些this优先级的原则，注意的是在箭头函数中，是根据外层父亲作用域来决定this的指向问题。

### call apply bind区别

call方法第一个参数是this指向，第二个参数可以传入参数列表，call方法临时改变一次this指向，并立即执行

Apply方法可以传入参数数组，使用apply方法改变this指向后原函数会立即执行，且此方法只是临时改变this指向一次。

bind方法和apply方法类似，第一个参数是this指向，第二个参数可以传入参数列表，但是bind改变this指向后不会立即执行，而是返回一个永久改变this指向的函数

- 