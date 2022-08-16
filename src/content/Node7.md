---
title: JavaScript开发（五）
date: 2021-01-19 21:40:33
categories: IT
tags:
    - IT，Web,Node
toc: true
thumbnail: http://cdn.kunkunzhang.top/es6.png
---

第五篇注重ES6

<!--more-->

## ES6

### 遍历器Iterator

JavaScript 原有的表示“集合”的数据结构，主要是数组（`Array`）和对象（`Object`），ES6 又添加了`Map`和`Set`。这样就有了四种数据集合，用户还可以组合使用它们，定义自己的数据结构，比如数组的成员是`Map`，`Map`的成员是对象。这样就需要一种统一的接口机制，来处理所有不同的数据结构。

遍历器（Iterator）就是这样一种机制。它是一种接口，为各种不同的数据结构提供统一的访问机制。任何数据结构只要部署 Iterator 接口，就可以完成遍历操作（即依次处理该数据结构的所有成员）。

Iterator 的遍历过程是这样的。

（1）创建一个指针对象，指向当前数据结构的起始位置。也就是说，遍历器对象本质上，就是一个指针对象。

（2）第一次调用指针对象的`next`方法，可以将指针指向数据结构的第一个成员。

（3）第二次调用指针对象的`next`方法，指针就指向数据结构的第二个成员。

（4）不断调用指针对象的`next`方法，直到它指向数据结构的结束位置。

#### for...of

ES6 借鉴 C++、Java、C# 和 Python 语言，引入了`for...of`循环，作为遍历所有数据结构的统一的方法。

一个数据结构只要部署了`Symbol.iterator`属性，就被视为具有 iterator 接口，就可以用`for...of`循环遍历它的成员。也就是说，`for...of`循环内部调用的是数据结构的`Symbol.iterator`方法。

`for...of`循环可以使用的范围包括数组、Set 和 Map 结构、某些类似数组的对象（比如`arguments`对象、DOM NodeList 对象）、后文的 Generator 对象，以及字符串。

JavaScript 原有的`for...in`循环，只能获得对象的键名，不能直接获取键值。ES6 提供`for...of`循环，允许遍历获得键值。

对于普通的对象，`for...of`结构不能直接使用，会报错，必须部署了 Iterator 接口后才能使用。但是，这样情况下，`for...in`循环依然可以用来遍历键名。

```javascript
for (let e in es6) {
  console.log(e);
}
// edition
// committee
// standard

for (let e of es6) {
  console.log(e);
}
// TypeError: es6[Symbol.iterator] is not a function

var arr = ['a', 'b', 'c', 'd'];

for (let a in arr) {
  console.log(a); // 0 1 2 3
}

for (let a of arr) {
  console.log(a); // a b c d
}
```

`for...in`循环有几个缺点。

- 数组的键名是数字，但是`for...in`循环是以字符串作为键名“0”、“1”、“2”等等。
- `for...in`循环不仅遍历数字键名，还会遍历手动添加的其他键，甚至包括原型链上的键。
- 某些情况下，`for...in`循环会以任意顺序遍历键名。

总之，`for...in`循环主要是为遍历对象而设计的，不适用于遍历数组。

`for...of`循环相比上面几种做法，有一些显著的优点。

- 有着同`for...in`一样的简洁语法，但是没有`for...in`那些缺点。
- 不同于`forEach`方法，它可以与`break`、`continue`和`return`配合使用。
- 提供了遍历所有数据结构的统一操作接口。

### 装饰器

装饰器不能用于函数，因为会存在函数提升



### Reflect

`Reflect`对象与`Proxy`对象一样，也是 ES6 为了操作对象而提供的新 API。`Reflect`对象的设计目的有这样几个。

将`Object`对象的一些明显属于语言内部的方法（比如`Object.defineProperty`），放到`Reflect`对象上。现阶段，某些方法同时在`Object`和`Reflect`对象上部署，未来的新方法将只部署在`Reflect`对象上。也就是说，从`Reflect`对象上可以拿到语言内部的方法。

修改某些`Object`方法的返回结果，让其变得更合理。比如，`Object.defineProperty(obj, name, desc)`在无法定义属性时，会抛出一个错误，而`Reflect.defineProperty(obj, name, desc)`则会返回`false`。

让`Object`操作都变成函数行为。某些`Object`操作是命令式，比如`name in obj`和`delete obj[name]`，而`Reflect.has(obj, name)`和`Reflect.deleteProperty(obj, name)`让它们变成了函数行为。

`Reflect`对象的方法与`Proxy`对象的方法一一对应，只要是`Proxy`对象的方法，就能在`Reflect`对象上找到对应的方法。这就让`Proxy`对象可以方便地调用对应的`Reflect`方法，完成默认行为，作为修改行为的基础。也就是说，不管`Proxy`怎么修改默认行为，你总可以在`Reflect`上获取默认行为。

`Reflect`对象一共有 13 个静态方法。

`Reflect.get`方法查找并返回`target`对象的`name`属性，如果没有该属性，则返回`undefined`。

`Reflect.set`方法设置`target`对象的`name`属性等于`value`。

`Reflect.has`方法对应`name in obj`里面的`in`运算符。

`Reflect.deleteProperty`方法等同于`delete obj[name]`，用于删除对象的属性。

`Reflect.construct`方法等同于`new target(...args)`，这提供了一种不使用`new`，来调用构造函数的方法。

`Reflect.getPrototypeOf`方法用于读取对象的`__proto__`属性，对应`Object.getPrototypeOf(obj)`。
`Reflect.setPrototypeOf`方法用于设置目标对象的原型（prototype），对应`Object.setPrototypeOf(obj, newProto)`方法。它返回一个布尔值，表示是否设置成功。

`Reflect.apply`方法等同于`Function.prototype.apply.call(func, thisArg, args)`，用于绑定`this`对象后执行给定函数。



### 对象扩展

#### Object对象的扩展

`Object.assign()`方法用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target）

`Object.assign()`方法实行的是浅拷贝，而不是深拷贝。也就是说，如果源对象某个属性的值是对象，那么目标对象拷贝得到的是这个对象的引用。

super关键字

`this`关键字总是指向函数所在的当前对象，ES6 又新增了另一个类似的关键字`super`，指向当前对象的原型对象。



#### math对象的扩展



#### Number对象的扩展



#### 数组对象的扩展

`Array.from`方法用于将两类对象转为真正的数组：类似数组的对象（array-like object）和可遍历（iterable）的对象（包括 ES6 新增的数据结构 Set 和 Map）。

`Array.of`方法用于将一组值，转换为数组。

数组实例的`find`方法，用于找出第一个符合条件的数组成员。它的参数是一个回调函数，所有数组成员依次执行该回调函数，直到找出第一个返回值为`true`的成员，然后返回该成员。如果没有符合条件的成员，则返回`undefined`。

数组实例的`findIndex`方法的用法与`find`方法非常类似，返回第一个符合条件的数组成员的位置，如果所有成员都不符合条件，则返回`-1`。

`fill`方法使用给定值，填充一个数组。

`Array.prototype.includes`方法返回一个布尔值，表示某个数组是否包含给定的值，与字符串的`includes`方法类似。

`Array.prototype.flat()`用于将嵌套的数组“拉平”，变成一维的数组。该方法返回一个新数组，对原数据没有影响。数组的成员有时还是数组。`flat()`默认只会“拉平”一层，如果想要“拉平”多层的嵌套数组，可以将`flat()`方法的参数写成一个整数，表示想要拉平的层数，默认为1。

如果不管有多少层嵌套，都要转成一维数组，可以用`Infinity`关键字作为参数。

如果原数组有空位，`flat()`方法会去掉空位。

`flatMap()`方法对原数组的每个成员执行一个函数（相当于执行`Array.prototype.map()`），然后对返回值组成的数组执行`flat()`方法。该方法返回一个新数组，不改变原数组。

`copyWithin`方法 在当前数组内部，将指定位置的成员复制到其他位置（会覆盖原有成员），然后返回当前数组。也就是说，使用这个方法，会修改当前数组。



#### 字符串对象的扩展

`String.raw()`方法。该方法返回一个斜杠都被转义（即斜杠前面再加一个斜杠）的字符串，往往用于模板字符串的处理方法。

`String.includes()`：返回布尔值，表示是否找到了参数字符串。

`String.startsWith()`：返回布尔值，表示参数字符串是否在原字符串的头部。

`String.endsWith()`：返回布尔值，表示参数字符串是否在原字符串的尾部。

`String.repeat()`方法返回一个新字符串，表示将原字符串重复`n`次。

如果某个字符串不够指定长度，会在头部或尾部补全。`padStart()`用于头部补全，`padEnd()`用于尾部补全。

`trimStart()`和`trimEnd()`这两个方法。它们的行为与`trim()`一致，`trimStart()`消除字符串头部的空格，`trimEnd()`消除尾部的空格。它们返回的都是新字符串，不会修改原始字符串。

#### 函数对象扩展

ES6允许使用箭头定义函数

箭头函数的存在是为了方便在很多地方执行小函数的情况。比如foreach、settimeout等，这种情况下我们并不想离开当前上下文，这时就使用箭头函数。

```js
// 箭头函数,包含一个name参数
let fun = (name) => {
    // 函数体
    return `Hello ${name} !`;
};
// 等同于
let fun = function (name) {
    // 函数体
    return `Hello ${name} !`;
};
```

没有参数时使用空括号，有多个参数时用逗号隔开

箭头函数没有this、`arguments`、`super`、`new.target`，全部指向外层函数的对应变量，所以也就不能用`call()`、`apply()`、`bind()`这些方法去改变`this`的指向。

不可以当作构造函数，也就是说，不可以使用`new`命令，否则会抛出一个错误。

（3）不可以使用`arguments`对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。

（4）不可以使用`yield`命令，因此箭头函数不能用作 Generator 函数。

ES6 引入 rest 参数（形式为`...变量名`），用于获取函数的多余参数，

##### 箭头函数与普通函数的区别

1.语法更加简洁清晰

2.箭头函数不会创建自己的this。箭头函数没有自己的`this`，它会捕获自己在**定义时**（注意，是定义时，不是调用时）所处的**外层执行环境的`this`**，并继承这个`this`值。所以，箭头函数中`this`的指向在它被定义的时候就已经确定了，之后永远不会改变。.call()/.apply()/.bind()也无法改变箭头函数中this的指向

3.箭头函数没有原型prototype，没有自己的arguments，在箭头函数中访问`arguments`实际上获得的是外层局部（函数）执行环境中的值。

实例

```js
function outer(val1, val2) {
    let argOut = arguments;
    console.log(argOut);    // ①
    let fun = () => {
        let argIn = arguments;
        console.log(argIn);     // ②
        console.log(argOut === argIn);  // ③
    };
    fun();
}
outer(111, 222);
//1、2处的输出相同，为111，222，3处输出为true
```

4.箭头函数不能作为构造函数使用，不能用作Generator函数，不能使用yeild关键字、new关键字

箭头函数表达式更适用于那些本来需要匿名函数的地方，并且它不能用作构造函数。

##### 箭头函数vsbind

箭头函数没有创建任何绑定，箭头函数只是没有this，this的查找与常规变量的搜索方式完全相同：在外部词法环境中查找

。bind创建了一个函数参数的绑定版本

##### 尾调用与尾递归(非常重要)

尾调用时函数式编程的一个重要概念，本身非常简单，就是某个函数在最后一步调用另一个函数

```javascript

```

函数调用时会在内存中形成一个调用记录，又称调用帧，保存调用位置和内部变量等信息。如果在函数A的内部调用函数B，那么在A的调用帧上方还会形成一个B的调用帧，等到B运行结束之后，将结果返回到A，B的调用帧才会消失。如果函数B内部还调用函数C，那就还有一个C的调用帧，以此类推，所有的调用帧就形成一个调用栈

尾调用由于是函数的最后一步操作，所以不需要保留外层函数的调用帧，因为调用位置、内部变量信息等不会被再用到，只有直接用内层函数的调用帧，取代外层函数的调用帧就可以

这个就叫做尾调用优化，只保留内层函数的调用帧。如果所有的函数都是尾调用，那么完全可以做到每次调用时调用帧只有一项，这将大大节省内存，这就是尾调用的意义

函数调用自身的过程，称为递归。递归非常耗费内存，因为需要同时保存成千上百个调用帧，很容易发生栈溢出错误。但是对于尾递归来说，由于只存在一个调用帧，所以永远也不会发生栈溢出错误。

比如常见的斐波那契数列的非尾递归写法

```javascript
function Fibonacci(n) {
  if (n<=1) {
    return n
  }
  return Fibonacci(n-1) + Fibonacci(n-2)
}

Fibonacci(10) //89
Fibonacci(100) // 超时
Fibonacci(1000) // 超时
```

尾递归优化之后的代码

```javascript
function Fibonacci2(n,ac=1,ac2=1) {
  if (n<=1) {
    return ac2
  }
  return Fibonacci(n-1,ac2,ac1+ac2)
}
Fibonacci2(100) //89
Fibonacci2(1000) //89
Fibonacci2(10000) //infinite
```

尾调用的意义非常重大，因此ES6规定所有ECMA的实现都必须采用尾调用优化

递归本质上是一种循环操作，但是纯粹的函数式编程没有循环操作命令，所有的循环都通过递归实现，这就是尾递归对这些语言的重要意义

尾递归调用要注意的问题

尾递归调用不能使用函数中的其他变量，因此写的时候要注意写法

通常是在另一个函数中调用递归函数，这样去实现避免中间变量

```javascript
//阶乘函数，用普通递归函数实现
function factorial(n) {
  if (n == 1){
    return 1
  }
  return n * factorial(n-1);
}

factorial(5)
//用尾调用实现
function factorial(n,total) {
  if(n == 1) return total;
  return factorial(n-1,n*total);
}

factorial(5,1)
//用嵌套尾调用实现，参数更简单
function tailFactorial(n,total) {
  if(n == 1) return total;
  return tailFactorial(n-1,n*total);
}

function factorial(n) {
  return tailFactorial(n,1);
}
factorial(5)
```

也可以用函数科里化实现

#### 解构赋值与扩展运算符

ES6允许按照一定模式从对象和数组中提取值，对变量进行赋值，称为解构

数组解构

```javascript
// 解构不成功时为undefined
let [a,b,c] = [1,2,3] //a:1,b:2,c:3
let [,,third] = ["foo","bar","baz"] //third: baz
let [x,,y] = [1,2,3] //x:1,y:3
let [head,...tail] = [1,2,3,4] //head:1,tail:[2,3,4]
let [x,y,...z] = ['a'] //x:'a',y:undefined,z:[]

// 不完全解构
let [x,y] = [1,2,3] //x:1,y:2
let [a,[b],d] = [1,[2,3],4] //a:1,b:2,d:4

```

对象解构

```javascript
//对象与数组的不同是，数组的元素是按次序排列的，变量的取值由位置决定，而对象的属性没有次序，必须同名才能取到正确的值
let { foo, bar } = {foo:'aaa',bar:'bbb'}; //foo “aaa”，bar “bbb”
let { baz } = {foo:'aaa',bar:'bbb'} // undefined

//将现有对象的方法赋值到某个变量上去
let { log,sin,cos } = Math;

// 先找同名的属性值，再赋给对应的变量，所以真正被赋值的是后者而不是前者
let { foo:baz } = {foo:'aaa',bar:'bbb'}, //baz:'aaa',foo:error,not defined

//嵌套解构
let obj = {
  p: ['hello',{y: 'world'}]
}
let {p:[x,{y}]} = obj; //x：hello y：world p：undefined
let {p,p:[x,{y}]} = obj; // x：helle y：world p “helle ，y world
```

字符串解构

```javascript
const [a,b,c,d,e] = 'hello',
```

数值和布尔值的解构赋值

```javascript
let {toString: s} = 123;

let {toString: s} = true;
```

函数参数的解构赋值

```javascript
function add([x,y]){
  return x+y
}
add([1,2])

[[1,2],[3,4]].map(([a,b])=> a + b) //[3,7]
```

解构赋值的应用

1.变量交换

```javascript
let x=1;let y=2;
[x,y] = [y,x]
```

2.从函数返回多个值

```javascript
function example(){
  return {
    foo: 1,
    bar: 2
  }
}
let { foo,bar } = example();
```

3.函数参数定义

```javascript
//
function f({x,y,z}) {...}
f({z:3,y:2,x:1})
// 
function f([x,y,z]) {...}
f([1,2,3])
```

4.提取JSON数据

```javascript
let jsonData = {
  id:42;
  status: "OK",
  data: [867, 5309]
}

let { id,status, data:number} = jsonData //id,status,number
```

5.输入模块的指定方法。解构赋值能使输入语句变得十分清晰

```javascript
const { SourceMapConsumer, SourceNode } = require("source-map")
```

其他：函数参数默认值、遍历Map结构

解构赋值和扩展运算符都是浅拷贝

扩展运算符使用object

扩展运算符（spread）是三个点（`...`）。它好比 rest 参数的逆运算，将一个数组转为用逗号分隔的参数序列。

 该运算符主要用于函数调用时使用，用于将数组的每个元素转化为逐个参数。

扩展运算符与正常的函数参数可以结合使用，非常灵活。

### 可选链式操作符与空值合并操作符

**可选链**操作符 ( **`?.`** ) 允许读取位于连接对象链深处的属性的值，而不必明确验证链中的每个引用是否有效。`?.` 操作符的功能类似于 `.` 链式操作符，不同之处在于，在引用为空 ([nullish](https://developer.mozilla.org/zh-CN/docs/Glossary/Nullish) ) ([`null`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/null) 或者 [`undefined`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined)) 的情况下不会引起错误，该表达式短路返回值是 `undefined`。与函数调用一起使用时，如果给定的函数不存在，则返回 `undefined`

```javascript
const adventurer = {
  name: 'Alice',
  cat: {
    name: 'Dinah'
  }
};

const dogName = adventurer.dog?.name;
console.log(dogName);
// expected output: undefined

console.log(adventurer.someNonExistentMethod?.());
// expected output: undefined
```

**空值合并操作符**（**`??`**）是一个逻辑操作符，当左侧的操作数为 [`null`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/null) 或者 [`undefined`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined) 时，返回其右侧操作数，否则返回左侧操作数。

与[逻辑或操作符（`||`）](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Logical_OR)不同，逻辑或操作符会在左侧操作数为[假值](https://developer.mozilla.org/zh-CN/docs/Glossary/Falsy)时返回右侧操作数。也就是说，如果使用 `||` 来为某些变量设置默认值，可能会遇到意料之外的行为。比如为假值（例如，`''` 或 `0`）时。

```javascript
const foo = null ?? 'default string';
console.log(foo);
// expected output: "default string"

const baz = 0 ?? 42;
console.log(baz);
// expected output: 0
```

需要注意的是，可选链式操作符通过bable polyfill编译之后会比较丑

```javascript
const obj = {};
const a = obj?.a?.b

// 编译后
var _obj$a;

const obj = {};
const a = obj === null || obj === void 0 ? void 0 : (_obj$a = obj.a) === null || _obj$a === void 0 ? void 0 : _obj$a.b;
```



### 模版字符串

传统的 JavaScript 语言，输出模板使用jquery通常是这样写的

```javascript
$('#result').append(
  'There are <b>' + basket.count + '</b> ' +
  'items in your basket, ' +
  '<em>' + basket.onSale +
  '</em> are on sale!'
);
```

ES6引入了模板字符串简化了写法

```javascript
$('#result').append(`
  There are <b>${basket.count}</b> items
   in your basket, <em>${basket.onSale}</em>
  are on sale!
`);
```

### ES6与ES5转码

[Babel](https://babeljs.io/) 是一个广泛使用的 ES6 转码器，可以将 ES6 代码转为 ES5 代码，从而在老版本的浏览器执行。这意味着，你可以用 ES6 的方式编写程序，又不用担心现有环境是否支持。

安装Babel

```shell
npm install --save-dev @babel/core
```

配置文件babelrc

Babel 的配置文件是`.babelrc`，存放在项目的根目录下。使用 Babel 的第一步，就是配置这个文件。

该文件用来设置转码规则和插件，基本格式如下。

```babelrc
{
  "presets": [],
  "plugins": []
}
```

`presets`字段设定转码规则，官方提供以下的规则集，你可以根据需要安装。

```shell
# 最新转码规则
$ npm install --save-dev @babel/preset-env

# react 转码规则
$ npm install --save-dev @babel/preset-react
```

然后，将这些规则加入`.babelrc`。

```
{
    "presets": [
      "@babel/env",
      "@babel/preset-react"
    ],
    "plugins": []
 }
```

Babel 默认只转换新的 JavaScript 句法（syntax），而不转换新的 API，比如`Iterator`、`Generator`、`Set`、`Map`、`Proxy`、`Reflect`、`Symbol`、`Promise`等全局对象，以及一些定义在全局对象上的方法（比如`Object.assign`）都不会转码。

举例来说，ES6 在`Array`对象上新增了`Array.from`方法。Babel 就不会转码这个方法。如果想让这个方法运行，可以使用`core-js`和`regenerator-runtime`(后者提供generator函数的转码)，为当前环境提供一个垫片。

安装

```shell
npm install --save-dev core-js regenerator-runtime
```

然后在脚本头部加入如下代码

```javascript
import 'core-js';
import 'regenerator-runtime/runtime';
// 或者
require('core-js');
require('regenerator-runtime/runtime);
```

`@babel/node`模块的`babel-node`命令，提供一个支持 ES6 的 REPL 环境。它支持 Node 的 REPL 环境的所有功能，而且可以直接运行 ES6 代码。

安装

```shell
npm install --save-dev @babel/node
```

执行`babel-node`就进入 REPL 环境。

`@babel/register`模块改写`require`命令，为它加上一个钩子。此后，每当使用`require`加载`.js`、`.jsx`、`.es`和`.es6`后缀名的文件，就会先用 Babel 进行转码。

```shell
npm install --save-dev @babel/register
```

使用时，必须首先加载`@babel/register`。

Babel 提供一个[REPL 在线编译器](https://babeljs.io/repl/)，可以在线将 ES6 代码转为 ES5 代码。转换后的代码，可以直接作为 ES5 代码插入网页运行。

### 最新提案

#### do表达式

在之前的提案中，块级作用域是一个语句，将多个操作封装在一起，没有返回值。

```javascript
{
  let t = f();
  t = t * t + 1;
}
```

块级作用域将两个语句封装在一起。但是，在块级作用域以外，没有办法得到`t`的值，因为块级作用域不返回值，除非`t`是全局变量。

这个提案使得块级作用域可以变为表达式，也就是说可以返回值，办法就是在块级作用域之前加上`do`，使它变为`do`表达式，然后就会返回内部最后执行的表达式的值

```javascript
let x = do {
  let t = f();
  t * t + 1;
};
```

上面代码中，变量`x`会得到整个块级作用域的返回值（`t * t + 1`）。

#### throw表达式

JavaScript 语法规定`throw`是一个命令，用来抛出错误，不能用于表达式之中。

语法上，`throw`表达式里面的`throw`不再是一个命令，而是一个运算符。为了避免与`throw`命令混淆，规定`throw`出现在行首，一律解释为`throw`语句，而不是`throw`表达式。



#### 管道操作符

Unix 操作系统有一个管道机制（pipeline），可以把前一个操作的值传给后一个操作。这个机制非常有用，使得简单的操作可以组合成为复杂的操作。

JavaScript 的管道是一个运算符，写作`|>`。它的左边是一个表达式，右边是一个函数。管道运算符把左边表达式的值，传入右边的函数进行求值。

管道运算符最大的好处，就是可以把嵌套的函数，写成从左到右的链式表达式。

管道运算符只能传递一个值，这意味着它右边的函数必须是一个单参数函数。如果是多参数函数，就必须进行柯里化，改成单参数的版本。

```javascript
x |> f
// 等同于
f(x)
```

#### 双冒号运算符

箭头函数可以绑定`this`对象，大大减少了显式绑定`this`对象的写法（`call`、`apply`、`bind`）。但是，箭头函数并不适用于所有场合。提案提出了“函数绑定”（function bind）运算符，用来取代`call`、`apply`、`bind`调用。

函数绑定运算符是并排的两个冒号（`::`），双冒号左边是一个对象，右边是一个函数。该运算符会自动将左边的对象，作为上下文环境（即`this`对象），绑定到右边的函数上面。

```javascript
foo::bar;
// 等同于
bar.bind(foo);

foo::bar(...arguments);
// 等同于
bar.apply(foo, arguments);

const hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn(obj, key) {
  return obj::hasOwnProperty(key);
}
```

如果双冒号左边为空，右边是一个对象的方法，则等于将该方法绑定在该对象上面。

#### 更多提案

ECMA 39组委会官网： https://tc39.es/

ECMA 39组委会github：https://github.com/tc39
