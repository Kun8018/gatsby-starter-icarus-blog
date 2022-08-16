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

### ES6简介

ES6与JavaScript的关系

JavaScript 的创造者 Netscape 公司，决定将 JavaScript 提交给标准化组织 ECMA，希望这种语言能够成为国际标准。次年，ECMA 发布 262 号标准文件（ECMA-262）的第一版，规定了浏览器脚本语言的标准，并将这种语言称为 ECMAScript，这个版本就是 1.0 版。

因此，ECMAScript 和 JavaScript 的关系是，前者是后者的规格，后者是前者的一种实现（另外的 ECMAScript 方言还有 JScript 和 ActionScript）。日常场合，这两个词是可以互换的。

ES6与ES5

EMCA的标准委员会决定，标准在每年的 6 月份正式发布一次，作为当年的正式版本。接下来的时间，就在这个版本的基础上做改动，直到下一年的 6 月份，草案就自然变成了新一年的版本。这样一来，就不需要以前的版本号了，只要用年份标记就可以了。

ES6 的第一个版本，就这样在 2015 年 6 月发布了，正式名称就是《ECMAScript 2015 标准》（简称 ES2015）。2016 年 6 月，小幅修订的《ECMAScript 2016 标准》（简称 ES2016）如期发布，这个版本可以看作是 ES6.1 版，因为两者的差异非常小（只新增了数组实例的`includes`方法和指数运算符），基本上是同一个标准。2017 年 6 月发布 ES2017 标准。

ES6 既是一个历史名词，也是一个泛指，含义是 5.1 版以后的 JavaScript 的下一代标准，涵盖了 ES2015、ES2016、ES2017 等等，而 ES2015 则是正式名称，特指该年发布的正式版本的语言标准。

**考虑到未来所有的代码，其实都是运行在模块之中，ES6 实际上把整个语言升级到了严格模式。**

### let、const与块级作用域 

const声明一个只读的常量，一旦声明，常量的值就不能修改

let和const只在声明的块级作用域内有效

const和let声明的变量不可重复声明

const变量一旦声明，就必须**立即初始化**，不能留到以后赋值，只声明不赋值就会报错

```javascript
const foo
// SyntaxError: Missing initializer in const declaration
```

const声明Object或者Array时，只是已经声明的对象属性不能变化，但是对象和数组仍然可变，可以添加新的属性或者值，如果想要对象不变，使用object.freeze冻结对象

const声明的对象，虽然属性可变，但是内存地址不可变

暂时性死区



ES5中只有全局作用域和函数作用域，ES6新增了块级作用域，用{}表示。

```javascript
function f1() {
  let n = 5;
  if (true) {
    let n = 10;
  }
  console.log(n) //5
}
```

块级作用域的出现使得获得广泛应用的匿名立即执行函数表达式(匿名IIFE)不再必要了

ES5中规定，函数只能在顶层作用域和函数作用域中声明，不能在块级作用域中声明

ES6中中明确规定允许在块级作用域声明函数，函数声明语句类似于let，只能在块级作用域中引用

在const/let变量声明之前调用变量会报错，在var变量声明之前调用会返回undefined

#### 定义不可变对象

1.使用object.freeze冻结对象

2.使用 es6 （Object.defineProperty()） 修改对象属性的属性描述符

```javascript
let obj = {
  name: 'test',
};

Object.defineProperty(obj, 'name', {
  writable: false,
  enumerable: true,
  configurable: true,
});

obj.name = 'xxx';

console.log(obj.name);
```

3.使用proxy代理 get,set 方法，实现不可变

```javascript
//使用属性代理
const handler = {
  get: function(target, key) {
    return target[key];
  },
  set: function(target, key, value) {
    if (key === 'name') return;
    target[key] = value;
  },
};

let p = {
  name: 'test',
};

p = new Proxy(p, handler);

p.age = 29;
p.name = 'cjl';
console.log(p.age);
console.log(p.name);
```



### proxy

Proxy 用于修改某些操作的默认行为，等同于在语言层面做出修改，所以属于一种“元编程”（meta programming），即对编程语言进行编程。

Proxy 可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。

方法：

`get`方法用于拦截某个属性的读取操作，可以接受三个参数，依次为目标对象、属性名和 proxy 实例本身（严格地说，是操作行为所针对的对象），其中最后一个参数可选。

`set`方法用来拦截某个属性的赋值操作，可以接受四个参数，依次为目标对象、属性名、属性值和 Proxy 实例本身，其中最后一个参数可选。

`has`方法用来拦截`HasProperty`操作，即判断对象是否具有某个属性时，这个方法会生效。典型的操作就是`in`运算符。`has`方法可以接受两个参数，分别是目标对象、需查询的属性名。

`deleteProperty`方法用于拦截`delete`操作，如果这个方法抛出错误或者返回`false`，当前属性就无法被`delete`命令删除。

`defineProperty()`方法拦截了`Object.defineProperty()`操作。

`getOwnPropertyDescriptor()`方法拦截`Object.getOwnPropertyDescriptor()`，返回一个属性描述对象或者`undefined`。

`getPrototypeOf()`方法主要用来拦截获取对象原型。具体来说，拦截下面这些操作。

- `Object.prototype.__proto__`
- `Object.prototype.isPrototypeOf()`
- `Object.getPrototypeOf()`
- `Reflect.getPrototypeOf()`
- `instanceof`

`isExtensible()`方法拦截`Object.isExtensible()`操作。

`ownKeys()`方法用来拦截对象自身属性的读取操作。具体来说，拦截以下操作。

- `Object.getOwnPropertyNames()`
- `Object.getOwnPropertySymbols()`
- `Object.keys()`
- `for...in`循环

`preventExtensions()`方法拦截`Object.preventExtensions()`。该方法必须返回一个布尔值，否则会被自动转为布尔值。

`setPrototypeOf()`方法主要用来拦截`Object.setPrototypeOf()`方法。

`Proxy.revocable()`方法返回一个可取消的 Proxy 实例。

### Generator函数

Generator 函数是 ES6 提供的一种异步编程解决方案，语法行为与传统函数完全不同。

执行 Generator 函数会返回一个遍历器对象，也就是说，Generator 函数除了状态机，还是一个遍历器对象生成函数。返回的遍历器对象，可以依次遍历 Generator 函数内部的每一个状态。

Generator 函数是一个普通函数，形式上有两个特征。一是，`function`关键字与函数名之间有一个星号；二是，函数体内部使用`yield`表达式，定义不同的内部状态（`yield`在英语里的意思就是“产出”）。

Generator 函数的调用方法与普通函数一样，也是在函数名后面加上一对圆括号。不同的是，调用 Generator 函数后，该函数并不执行，返回的也不是函数运行结果，而是一个指向内部状态的指针对象，也就是遍历器对象（Iterator Object）

下一步，必须调用遍历器对象的`next`方法，使得指针移向下一个状态。也就是说，每次调用`next`方法，内部指针就从函数头部或上一次停下来的地方开始执行，直到遇到下一个`yield`表达式（或`return`语句）为止。换言之，Generator 函数是分段执行的，`yield`表达式是暂停执行的标记，而`next`方法可以恢复执行。

```javascript
function* helloWorldGenerator() {
  yield 'hello';
  yield 'world';
  return 'ending';
}

var hw = helloWorldGenerator();
hw.next()
// { value: 'hello', done: false }

hw.next()
// { value: 'world', done: false }

hw.next()
// { value: 'ending', done: true }

hw.next()
// { value: undefined, done: true }
```

`yield`表达式与`return`语句既有相似之处，也有区别。相似之处在于，都能返回紧跟在语句后面的那个表达式的值。区别在于每次遇到`yield`，函数暂停执行，下一次再从该位置继续向后执行，而`return`语句不具备位置记忆的功能。一个函数里面，只能执行一次（或者说一个）`return`语句，但是可以执行多次（或者说多个）`yield`表达式。正常函数只能返回一个值，因为只能执行一次`return`；Generator 函数可以返回一系列的值，因为可以有任意多个`yield`。从另一个角度看，也可以说 Generator 生成了一系列的值，这也就是它的名称的来历

**next函数传参**

`yield`表达式本身没有返回值，或者说总是返回`undefined`。`next`方法可以带一个参数，该参数就会被当作上一个`yield`表达式的返回值。

next函数传参这个功能有很重要的语法意义。Generator 函数从暂停状态到恢复运行，它的上下文状态（context）是不变的。通过`next`方法的参数，就有办法在 Generator 函数开始运行之后，继续向函数体内部注入值。也就是说，可以在 Generator 函数运行的不同阶段，从外部向内部注入不同的值，从而调整函数行为。

```javascript
function* foo(x){
var y =2*(yield (x +1));
var z = yield (y /3);
return(x + y + z);
}
var a = foo(5);
a.next()// Object{value:6, done:false}
a.next()// Object{value:NaN, done:false}
a.next()// Object{value:NaN, done:true}
var b = foo(5);
b.next()// { value:6, done:false }
b.next(12)// { value:8, done:false }
b.next(13)// { value:42, done:true }
//第二次运行next方法的时候不带参数，导致 y 的值等于2 * undefined（即NaN），除以 3 以后还是NaN，因此返回对象的value属性也等于NaN。第三次运行Next方法的时候不带参数，所以z等于undefined，返回对象的value属性等于5 + NaN + undefined，即NaN。

//如果向next方法提供参数，返回结果就完全不一样了。上面代码第一次调用b的next方法时，返回x+1的值6；第二次调用next方法，将上一次yield表达式的值设为12，因此y等于24，返回y / 3的值8；第三次调用next方法，将上一次yield表达式的值设为13，因此z等于13，这时x等于5，y等于24，所以return语句的值等于42
```

由于`next`方法的参数表示上一个`yield`表达式的返回值，所以在第一次使用`next`方法时，传递参数是无效的。V8 引擎直接忽略第一次使用`next`方法时的参数，只有从第二次使用`next`方法开始，参数才是有效的。从语义上讲，第一个`next`方法用来启动遍历器对象，所以不用带有参数。

如果想要第一次调用`next`方法时，就能够输入值，可以在 Generator 函数外面再包一层。

```javascript
function wrapper(generatorFunction){
returnfunction(...args){
    let generatorObject = generatorFunction(...args);
    generatorObject.next();
return generatorObject;
};
}
const wrapped = wrapper(function*(){
  console.log(`First input: `);
	return'DONE';
});
wrapped().next('hello!')
// First input: hello!
```





为了防止手动遍历generator函数，js提供co函数库操作generator函数



generator最大的特点是交出函数的执行权，即暂停执行，异步操作需要暂停的地方使用yield注明，此处引入协程的概念。

进程有变量隔离，自动切换运行上下文

线程没有变量隔离，自动切换运行上下文

协程不进行变量隔离，不自动切换运行上下文

### async函数

async可以理解为generator+promise的语法糖，async可以看作是多个异步操作包装成的一个promise对象，而await命令是内部.then的语法糖

async对generator的改进体现在以下四点：

1.内置执行器。generator需要co模块或者调用next方法才能执行，而async函数自带执行器可以向普通函数一样。

2.更好的语义。比起generator的yield和*，async和await更直接

3.更广的适用性。yield命令返回的是promise对象或者thunk函数，而await后面可以是promise对象或者任意原始类型（数值、字符串、布尔值等），方便操作。

4.返回值是promise。generator的返回值是iterator对象，而async返回的是promise对象，可以用.then方法指定下一步的操作。

asnyc函数如果不跟await直接return会返回一个promise对象，

```typescript
async function :<Promise Number> {
  return 1213
}
```

错误处理

await后面跟promise对象时，可能会reject，此时将await写在try里

```javascript
function getUsers() {
    return $.ajax('https://github.com/users');  
}

async function getFirstUser() {
    try {
        let users = await getUsers();
        return users[0].name;
    } catch (err) {
        return {
          name: 'default user'
        }
    }
}
```

#### async与promise的区别

async相比promise的优势:处理 then 的调用链，能够更清晰准确的写出代码

async相比promise的劣势：

有多个接口的情况下，async/await是继发，也就是一个一个接口请求，promise.all是同步触发

如果多个异步代码没有依赖性却使用了 await 会导致性能上的降低，代码没有依赖性的话，完全可以使用 Promise.all 的方式。

async同步触发写法

```javascript
// 写法一
let [foo, bar] = await Promise.all([getFoo(), getBar()]);

// 写法二
let fooPromise = getFoo();
let barPromise = getBar();
let foo = await fooPromise;
let bar = await barPromise;
```

反过来，如果是有依赖性的接口，那么async的语法更直观更符合语义



### 新增class类

JavaScript 语言中，生成实例对象的传统方法是通过构造函数。

ES6 提供了更接近传统语言的写法，引入了 Class（类）这个概念，作为对象的模板。通过`class`关键字，可以定义类。

基本上，ES6 的`class`可以看作只是一个语法糖，它的绝大部分功能，ES5 都可以做到，新的`class`写法只是让对象原型的写法更加清晰、更像面向对象编程的语法而已。

`constructor`方法是类的默认方法，通过`new`命令生成对象实例时，自动调用该方法。一个类必须有`constructor`方法，如果没有显式定义，一个空的`constructor`方法会被默认添加。

类的实例

使用new命令生成类的实例,类的所有实例共享一个原型对象。

```javascript
class Point {
  constructor() {}
}

var p1 = new Point(2,3);
var p2 = new Point(3,2);

p1.__proto__ === p2.__proto__//Point.prototype ==Point.prototype
```

在“类”的内部可以使用`get`和`set`关键字，对某个属性设置存值函数和取值函数，拦截该属性的存取行为。

```javascript
class MyClass {
  constructor() {
    // ...
  }
  get prop() {
    return 'getter';
  }
  set prop(value) {
    console.log('setter: '+value);
  }
}

let inst = new MyClass();

inst.prop = 123;
// setter: 123

inst.prop
// 'getter'
```



类相当于实例的原型，所有在类中定义的方法，都会被实例继承。如果在一个方法前，加上`static`关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”。静态方法可以与非静态方法重名。

每一个对象都有`__proto__`属性，指向对应的构造函数的`prototype`属性。Class 作为构造函数的语法糖，同时有`prototype`属性和`__proto__`属性，因此同时存在两条继承链。

（1）子类的`__proto__`属性，表示构造函数的继承，总是指向父类。

（2）子类`prototype`属性的`__proto__`属性，表示方法的继承，总是指向父类的`prototype`属性。

#### Super关键字

`super`作为函数调用时，代表父类的构造函数。ES6 要求，子类的构造函数必须执行一次`super`函数。

`super`作为对象时，在普通方法中，指向父类的原型对象；在静态方法中，指向父类。

#### Mixin模式

Mixin 指的是多个对象合成一个新的对象，新对象具有各个组成成员的接口。

用最简单的实现实现Mix如下

```javascript
const a = {
  a: 'a'
};
const b = {
  b: 'b'
};
const c = {...a, ...b}; // {a: 'a', b: 'b'}
```







### 新增数据类型和数据结构

ES6 引入了一种新的原始数据类型`Symbol`，表示独一无二的值。它是 JavaScript 语言的第七种数据类型。





ES6 提供了新的数据结构 Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。

`Set`本身是一个构造函数，用来生成 Set 数据结构。

WeakSet 结构与 Set 类似，也是不重复的值的集合。但是，它与 Set 有两个区别。

WeakSet 的成员只能是对象，而不能是其他类型的值。

WeakSet 中的对象都是弱引用，即垃圾回收机制不考虑 WeakSet 对该对象的引用，也就是说，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于 WeakSet 之中。

Map

JavaScript 的对象（Object），本质上是键值对的集合（Hash 结构），但是传统上只能用字符串当作键。这给它的使用带来了很大的限制。

ES6 提供了 Map 数据结构。它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。也就是说，Object 结构提供了“字符串—值”的对应，Map 结构提供了“值—值”的对应，是一种更完善的 Hash 结构实现。如果你需要“键值对”的数据结构，Map 比 Object 更合适。

Map类型的属性和方法

属性

`size`属性返回 Map 结构的成员总数。

`set`方法设置键名`key`对应的键值为`value`，然后返回整个 Map 结构。如果`key`已经有值，则键值会被更新，否则就新生成该键。

`get`方法读取`key`对应的键值，如果找不到`key`，返回`undefined`。

`has`方法返回一个布尔值，表示某个键是否在当前 Map 对象之中。

`Map.prototype.delete(key)`方法删除某个键，返回`true`。如果删除失败，返回`false`。

`Map.prototype.clear()`方法清除所有成员，没有返回值。

方法

- `Map.prototype.keys()`：返回键名的遍历器。
- `Map.prototype.values()`：返回键值的遍历器。
- `Map.prototype.entries()`：返回所有成员的遍历器。
- `Map.prototype.forEach()`：遍历 Map 的所有成员。

WeakMap

`WeakMap`结构与`Map`结构类似，也是用于生成键值对的集合。

WeakMap与Map的区别有两点。

1.`WeakMap`只接受对象作为键名（`null`除外），不接受其他类型的值作为键名。

2.`WeakMap`的键名所指向的对象，不计入垃圾回收机制。

`WeakMap`只有四个方法可用：`get()`、`set()`、`has()`、`delete()`。

weakmap的用途：

1.将DOM 节点作为键名。获取dom节点后，每当发生`click`事件，就更新一下状态。我们将这个状态作为键值放在 WeakMap 里，对应的键名就是这个节点对象。一旦这个 DOM 节点删除，该状态就会自动消失，不存在内存泄漏风险。

2.WeakMap 的另一个用处是部署私有属性。

#### Map数据结构实现

Map底层使用hash+链表结构实现保证插入顺序

```javascript
function MyMap() {
  this.init();
}

Mymap.prototype.init = function() {
  this.tong = new Array(8);
  for(var i=0;i<8;i++) {
    this.tong[i] = new Object();
    this.tong[i].next = null;
  }
}

//添加数据。
Mymap.prototype.set = function (key, value) {
    var index = this.hash(key);        //获取到当前设置的key设置到那个位置上
    var TempBucket = this.tong[index]; //获取当前位置的对象
    while (TempBucket.next) {          //遍历如果当前对象链接的下一个不为空
        if (TempBucket.next.key == key) {  //如果要设置的属性已经存在，覆盖其值。
            TempBucket.next.value = value;
            return;                          //return ,不在继续遍历
        } else {
            TempBucket = TempBucket.next;  //把指针指向下一个对象。
        }
 
    }
    TempBucket.next = {  //对象的next是null ,添加对象。
        key: key,
        value: value,
        next: null
    }
};

//查询数据
Mymap.prototype.get = function (key) {
    var index = this.hash(key);
    var TempBucket = this.tong[index];
    while(TempBucket){
        if(TempBucket.key == key){
            return TempBucket.value;
        }else{
            TempBucket = TempBucket.next;
        }
    }
    return undefined;
}

//删除数据
Mymap.prototype.delete = function(key){
    var index = this.hash(key);
    var TempBucket = this.tong[index];
    while(TempBucket){
        if(TempBucket.next.key == key){
            TempBucket.next = TempBucket.next.next;
            return true;
        }else{
            TempBucket = TempBucket.next;
        }
    }
}
//看当前属性是否存在
Mymap.prototype.has = function(key){
    var index = this.hash(key);
    var TempBucket = this.tong[index];
    while(TempBucket){
        if(TempBucket.key == key){
            return true;
        }else{
            TempBucket = TempBucket.next;
        }
    }
    return false
}
//清空这个map
Mymap.prototype.clear = function(){
    this.init();
}
//使设置的属性平均分配到每个位置上，使得不会某个链条过长。
Mymap.prototype.hash = function (key) {
    var index = 0;
    if (typeof key == "string") {
        for (var i = 0; i < 3; i++) {
            index = index + isNaN(key.charCodeAt(i)) ? 0 : key.charCodeAt(i);
        }
    }
    else if (typeof key == 'object') {
        index = 0;
    }
    else if (typeof key == 'number') {
        index = isNaN(key) ? 7 : key;
    } else {
        index = 1;
    }
 
    return index % 8;
}

var map = new Mymap();    //使用构造函数的方式实例化map
```



### 新增模块化

历史上，JavaScript 一直没有模块（module）体系，无法将一个大程序拆分成互相依赖的小文件，再用简单的方法拼装起来。其他语言都有这项功能，比如 Ruby 的`require`、Python 的`import`，甚至就连 CSS 有`@import`，但是 JavaScript 任何这方面的支持都没有，这对开发大型的、复杂的项目形成了巨大障碍。

在 ES6 之前，社区制定了一些模块加载方案，最主要的有 CommonJS 和 AMD 两种。前者用于服务器，后者用于浏览器。ES6 在语言标准的层面上，实现了模块功能，而且实现得相当简单，完全可以取代 CommonJS 和 AMD 规范，成为浏览器和服务器通用的模块解决方案。

模块功能主要由两个命令构成：`export`和`import`。`export`命令用于规定模块的对外接口，`import`命令用于输入其他模块提供的功能。

一个模块就是一个独立的文件。该文件内部的所有变量，外部无法获取。如果你希望外部能够读取模块内部的某个变量，就必须使用`export`关键字输出该变量。

`export`命令除了输出变量，还可以输出函数或类（class）。

`export`语句输出的接口，与其对应的值是动态绑定关系，即通过该接口，可以取到模块内部实时的值。

`export`命令可以出现在模块的任何位置，只要处于模块顶层就可以。如果处于块级作用域内，就会报错，下一节的`import`命令也是如此。这是因为处于条件代码块之中，就没法做静态优化了，违背了 ES6 模块的设计初衷。

使用`export`命令定义了模块的对外接口以后，其他 JS 文件就可以通过`import`命令加载这个模块。

如果想为输入的变量重新取一个名字，`import`命令要使用`as`关键字，将输入的变量重命名。

`import`命令输入的变量都是只读的，因为它的本质是输入接口。也就是说，不允许在加载模块的脚本里面，改写接口。

`import`后面的`from`指定模块文件的位置，可以是相对路径，也可以是绝对路径。如果不带有路径，只是一个模块名，那么必须有配置文件，告诉 JavaScript 引擎该模块的位置。

`import`命令具有提升效果，会提升到整个模块的头部，首先执行。

`import`是静态执行，所以不能使用表达式和变量，这些只有在运行时才能得到结果的语法结构。如果多次重复执行同一句`import`语句，那么只会执行一次，而不会执行多次。

除了指定加载某个输出值，还可以使用整体加载，即用星号（`*`）指定一个对象，所有输出值都加载在这个对象上面。

从前面的例子可以看出，使用`import`命令的时候，用户需要知道所要加载的变量名或函数名，否则无法加载。但是，用户肯定希望快速上手，未必愿意阅读文档，去了解模块有哪些属性和方法。

为了给用户提供方便，让他们不用阅读文档就能加载模块，就要用到`export default`命令，为模块指定默认输出。

上面代码是一个模块文件`export-default.js`，它的默认输出是一个函数。

`export default`命令用于指定模块的默认输出。显然，一个模块只能有一个默认输出，因此`export default`命令只能使用一次。所以，import命令后面才不用加大括号，因为只可能唯一对应`export default`命令。

其他模块加载该模块时，`import`命令可以为该匿名函数指定任意名字。

#### Js模块化方案对比

模块化这个话题在ES6之前不存在，因此也被诟病为早期Javascript开发全局污染和依赖管理混乱的源头

`require`是运行时加载模块，`import`命令无法取代`require`的动态加载功能。

commonjs加载时，是整体加载如模块的所有方法，再生成对象，例如

```javascript
// CommonJS模块
let { stat, exists, readfile } = require('fs');

// 等同于
let _fs = require('fs');
let stat = _fs.stat;
let exists = _fs.exists;
let readfile = _fs.readfile;
```

上面代码的实质是整体加载`fs`模块（即加载`fs`的所有方法），生成一个对象（`_fs`），然后再从这个对象上面读取 3 个方法。这种加载称为“运行时加载”，因为只有运行时才能得到这个对象，导致完全没办法在编译时做“静态优化”。

上面代码的实质是从`fs`模块加载 3 个方法，其他方法不加载。这种加载称为“编译时加载”或者静态加载，即 ES6 可以在编译时就完成模块加载，效率要比 CommonJS 模块的加载方式高。当然，这也导致了没法引用 ES6 模块本身，因为它不是对象。

由于 ES6 模块是编译时加载，使得静态分析成为可能。有了它，就能进一步拓宽 JavaScript 的语法，比如引入宏（macro）和类型检验（type system）这些只能靠静态分析实现的功能。

commonjs

弥补JavaScript在服务器端缺少模块化机制，NodeJS、webpack都是基于该规范开发

**特点**：

 所有代码都运行在独立的模块作用域，不会污染全局作用域

模块可以多次加载，但是只会在第一次加载时运行，然后运行结果就会被缓存，以后再加载就读取缓存结果，要想让模块再次运行就必须清除缓存

模块加载的顺序按照在代码中出现的顺序

**优点**：服务器端模块重用，NPM中模块包多，有将近20万个。

**缺点：**

无法在编译阶段确认产物，且可以在代码中随意使用require，比如全局、函数、if/else条件语句中等等

加载模块是同步的，只有加载完成后才能执行后面的操作，也就是当要用到该模块了，现加载现用，不仅加载速度慢，而且还会导致性能、可用性、调试和跨域访问等问题。Node.js主要用于服务器编程，加载的模块文件一般都存在本地硬盘，加载起来比较快，不用考虑异步加载的方式，因此,CommonJS规范比较适用。然而，这并不适合在浏览器环境，同步意味着阻塞加载，浏览器资源是异步加载的，因此有了AMD CMD解决方案。

此外，ES6 模块输出的是值的引用，输出接口动态绑定，而 CommonJS 输出的是值的拷贝

AMD与requirejs

commonJS规范很好，但是不适用于浏览器环境，于是有了AMD和CMD两种方案。AMD全称Asynchronous Module Definition，即异步模块定义。它采用异步方式加载模块，

```javascript
define("module", ["dep1", "dep2"], function(d1, d2) {
  return someExportedValue;
});
require(["module", "../file"], function(module, file) { /* ... */ });
```

AMD草案的作者以RequireJS实现了AMD规范，所以一般说AMD是RequireJS

CMD

CMD全称Common Module Definition，是Sea.js所推广的一个模块化方案的输出。SeaJS与RequireJS并称，作者为阿里的玉伯

与AMD的主要区别：
1.对于依赖的模块，AMD是提前执行，CMD是延迟执行。不过RequereJS从2.0开始也改成可以延迟执行，CMD推崇as lazy as possible。延迟执行的意思是只有到require时依赖模块才执行

2.CMD推崇依赖就近，AMD推崇依赖前置

Common Module Definition 规范和 AMD 很相似，尽量保持简单，并与 CommonJS 和 Node.js 的 Modules 规范保持了很大的兼容性。

```javascript

define(function(require, exports, module) {
  var $ = require('jquery');
  var Spinning = require('./spinning');
  exports.doSomething = ...
  module.exports = ...
})
```

UMD，全称Universal Module Definition，即通用模块规范，既然CommonJS和AMD风格一样流行，就需要一个统一浏览器端和非浏览器端的模块化方案的规范

UMD的实现很简单：

先判断是否支持AMD(define是否存在)，存在则使用AMD方式加载模块

再判断是否支持Nodejs模块格式(exports是否存在)，存在则使用Nodejs模块格式

前两个都不存在，则将模块公开到全局(window或者global)

ES6 Modules

以上这些都是社区提供的方案，历史上Javascript一直没有模块化系统，直到ES6在语言标准的层面实现了它。

CommonJS和AMD模块都只能在运行时确定模块的依赖关系，以及输入输出的变量，而ES6的设计思想是尽可能静态化，在编译时就能确定这些东西。

**总结**

AMD依赖前置，提前执行，语法是define，require

CMD依赖就近，延迟执行，语法是define，seajs。use 。延迟执行的意思是只有到require时依赖模块才执行

Commonjs首次执行会被缓存，再次加载只返回缓存结果，require返回的值时输出值的拷贝，对于引用类型是浅拷贝

#### 兼容各种模块函数





#### 循环加载

“循环加载”（circular dependency）指的是，`a`脚本的执行依赖`b`脚本，而`b`脚本的执行又依赖`a`脚本。

```javascript
// a.js
var b = require('b');

// b.js
var a = require('a');
```

通常，“循环加载”表示存在强耦合，如果处理不好，还可能导致递归加载，使得程序无法执行，因此应该避免出现。

但是实际上，这是很难避免的，尤其是依赖关系复杂的大项目，很容易出现`a`依赖`b`，`b`依赖`c`，`c`又依赖`a`这样的情况。这意味着，模块加载机制必须考虑“循环加载”的情况。

在commonjs中，循转引用会只输出循环引用之前执行的部分，不能代表整个代码的执行逻辑，

```javascript
// a.js
exports.done = false;
var b = require('./b.js');
console.log('在 a.js 之中，b.done = %j', b.done);
exports.done = true;
console.log('a.js 执行完毕');

// b.js
exports.done = false;
var a = require('./a.js');
console.log('在 b.js 之中，a.done = %j', a.done);
exports.done = true;
console.log('b.js 执行完毕');

// main.js
var a = require('./a.js');
var b = require('./b.js');
console.log('在 main.js 之中, a.done=%j, b.done=%j', a.done, b.done);

// 在 b.js 之中，a.done = false
// b.js 执行完毕
// 在 a.js 之中，b.done = true
// a.js 执行完毕
// 在 main.js 之中, a.done=true, b.done=true
```

总之，CommonJS 输入的是被输出值的拷贝，不是引用。由于 CommonJS 模块遇到循环加载时，返回的是当前已经执行的部分的值，而不是代码全部执行后的值，两者可能会有差异。所以，输入变量的时候，必须非常小心。

ES6 处理“循环加载”与 CommonJS 有本质的不同。ES6 模块是动态引用，如果使用`import`从一个模块加载变量（即`import foo from 'foo'`），那些变量不会被缓存，而是成为一个指向被加载模块的引用，需要开发者自己保证，真正取值的时候能够取到值。

```javascript
// a.mjs
import {bar} from './b';
console.log('a.mjs');
console.log(bar);
export let foo = 'foo';

// b.mjs
import {foo} from './a';
console.log('b.mjs');
console.log(foo);
export let bar = 'bar';

//执行a.mjs以后会报错，foo变量未定义
```

ES6 循环加载的处理方式：首先，执行`a.mjs`以后，引擎发现它加载了`b.mjs`，因此会优先执行`b.mjs`，然后再执行`a.mjs`。接着，执行`b.mjs`的时候，已知它从`a.mjs`输入了`foo`接口，这时不会去执行`a.mjs`，而是认为这个接口已经存在了，继续往下执行。执行到第三行`console.log(foo)`的时候，才发现这个接口根本没定义，因此报错。

解决这个问题的方法，就是让`b.mjs`运行的时候，`foo`已经有定义了。这可以通过将`foo`写成函数来解决。

```javascript
// a.mjs
import {bar} from './b';
console.log('a.mjs');
console.log(bar());
function foo() { return 'foo' }
export {foo};

// b.mjs
import {foo} from './a';
console.log('b.mjs');
console.log(foo());
function bar() { return 'bar' }
export {bar};
```

因为函数具有提升作用，在执行`import {bar} from './b'`时，函数`foo`就已经有定义了，所以`b.mjs`加载的时候不会报错。这也意味着，如果把函数`foo`改写成函数表达式，也会报错。

