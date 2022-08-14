---
title: Javascript开发（一）
date: 2021-01-14 21:40:33
categories: IT
tags:
    - IT，Web,Javascript
toc: true
thumbnail: http://cdn.kunkunzhang.top/javascript2.png
---

前端：vue写界面、请求数据 数据处理

后端：写Api接口，接收用户数据，处理数据（数据库），返回数据

第一篇和第二篇主要讲原生js语言基本特性、es6和jquery,第三篇讲Node后端开发，第四篇讲框架

<!--more-->

## js基本语法

### 基本变量类型

js中有六种基本的数据类型：

数值number：整数和小数（比如`1`和`3.14`）

字符串string：文本（比如`Hello World`）

布尔值boolean：表示真伪的两个特殊值，即`true`（真）和`false`（假）

`undefined`：表示“未定义”或不存在，即由于目前没有定义，所以此处暂时没有任何值

`null`：表示空值，即此处的值为空。

引用数据类型：

对象object：各种值组成的集合。

数组。对象和数组都是引用数据类型。

函数也是变量类型，属于对象的一种



#### 判断变量类型

JavaScript有三种方法确定值的类型：typeof运算符、instanceof运算符、Object.toString方法。

typeof可以判断基本类型变量，返回类型的小写字母，如number、string、boolean、function、undefined、symbol等

instanceof运算符返回一个布尔值，表示对象是否为构造函数的实例，左边是实例，右边是原型，可以用来判断数组和对象，但不适用基本类型的值

对于数组，有时候会返回Object，因此ES5 提供了 Array.isArray() 方法 。该方法用以确认某个对象本身是否为 Array 类型，而不区分该对象在哪个环境中创建。

Object.prototype.toString()方法返回对象的类型字符串。

由于实例对象可能会自定义toString方法，覆盖掉Object.prototype.toString方法，所以为了得到类型字符串，通过call方法在 任意值上调用这个方法，判断这个值的类型

根据不同的数据类型返回值：

数值：返回[object Number]

字符串：返回[object String]

布尔值：返回[object Boolean]

Undefined: 返回[object Undefined]

Null：返回[object Null]

数组：返回[object Array]

函数：返回[object Function]

Date对象：返回[object Date]

利用这个特性可以写出比typeof更准确的类型判断函数

instanceof原理：检查右边构造函数的prototype属性，是否在左边对象的原型链上。只有一种特殊情况无法判断，就是左边对象的原型链上只有null对象，此时instance会失真。

```javascript
var obj = Object.create(null);

typeof obj == object
```



#### 数据类型转换

数据类型转换氛围强制转换和自动转换

`parseInt()`方法用于将字符串转为整数,如果参数不是字符串，则先转为字符串再进行转换

转换的过程中是一个个字符依次转换，如果遇到不能转为数字的字符，就不能进行下去，返回已经转好的部分,如果字符串第一个字符就不能转化为数字，则返回NaN

`parseInt()`方法接受第二个参数，表示被解析的值的进制，返回该值对应的十进制数，默认情况下第二个参数为10,第二个参数为0时默认也是10.

```javascript 
parseInt('123')  //123
parseInt('   81')  //81
parseInt(1.23)  // 1
parseInt('12**')  // 12
parseInt('abc2')  //NaN
parseInt('1000',2)  //8
```

`parseFloat`方法用于将一个字符串转为浮点数，其他与parseInt相同

isNaN方法用来判断一个值是否为NaN

isFinite方法返回一个布尔值，判断一个值是否是正常的数值

**经典面试题**

`[1,2,3].map(parseInt)`的返回结果：[1,NaN,NaN]

这种写法是以元素1，2，3作为元素，0，1，2作为下标分别求出parseInt(1,0),parseInt(2,1),parseInt(3,2)的值

第一个的值为1，第二个函数的第二个参数的范围为2-36，所以为NaN，第三个函数为二进制，但是数字为3，所以也为NaN；

强制类型转换主要用到Number、String、Boolean三个函数。

Number函数用于强制转换为数值

```javascript
//字符串转数字,可以被解析为数值的情况
Number('324') //324
//字符串转数字,不能解析为数值的情况
Number('324abc') //NaN，not a number
//特殊字符串，空字符串
Number('') //0

//布尔值转数字
Number(true)//1
Number(false)//0

//特殊地
Number(null)//0

//对象转数字与字符串的情况类似，只有包含单个数值的数组可以转
Number([5]) //5
Number([1,2,3]) // NaN
```

String函数用于强制转换成字符串

```javascript
//转换基本类型
String(123) //"123"
String('abc') //"abc"
String(true) //"true"
String(undefined) //"undefined"
String(null) //"null"

//对象或数组
String({a:1}) //"[Object Object]"
String([1,2,3]) //"1,2,3"
```

Boolean函数用于强制转换成布尔值。除了特定五个值的转换结果是false，其他全是true

```javascript
Boolean(undefined) //false
Boolean(0) //false
Boolean(null) //false
Boolean(NaN) //false
Boolean('') //false
```

自动转换

在某些特定的代码语句中会自动调用上述三个函数，起到自动转换的作用。

自动转换为布尔值

在条件语句中，用于将表达式转为布尔值

```javascript
//写法一
expression ？ true：false

//写法二
!!expression
```

自动转换为字符串

在预期为字符串的地方会将非字符串的值转为字符串，有些坑

```javascript
'5'+1 //"51"
'5'+true  //5true
'5'+{} //"5[Object Object]"
'5'+function() {} //"5function (){}"
'5'+undefined //"5undefined"
'5'+null //"5null"
```

自动转换为数值

在预期为数值的地方会将非字符串的值转为字符串，如运算符，

```javascript
'5' - '2' //3
'5' * '2' //10
true - 1 //0
false - 1 //-1
'1' - 1 //0
'5' - [] //0
false / '5' //0
'abc' - 1 //NaN
null + 1 //1
undefined + 1 //NaN
```



### 运算符

#### 一元操作符

delete 操作符

**`delete` 操作符**用于删除对象的某个属性或者一个数组中某一个键值；如果没有指向这个属性的引用，那它最终会被释放。

能使用 `delete` 删除各种各样的隐式声明， 但是被`var`声明的除外。

如果 `delete` 操作成功，属性或者元素会变成 `undefined`。如果 `delete`可行会返回`true`，如果不成功返回`false`。

删除数组中的元素时，数组的长度是不变的，例如删除`a[3]`, `a[4]`，`a[4]``和a[3]` 仍然存在变成了`undefined`。

```javascript
var trees = new Array("redwood", "bay", "cedar", "oak", "maple");
delete trees[3];
var y = 43;
delete y;       // returns false (cannot delete if declared with var)
x = 42;
delete x;       // returns true (can delete if declared implicitly)
```

#### 关系操作符

in操作符

如果所指定的**属性**确实存在于所指定的对象中，则会返回`true`

```javascript
var trees = new Array("redwood", "bay", "cedar", "oak", "maple");
0 in trees;        // returns true
3 in trees;        // returns true
6 in trees;        // returns false
"bay" in trees;    // returns false (you must specify the index number,not the value at that index)

// Custom objects
var mycar = {make: "Honda", model: "Accord", year: 1998};
"make" in mycar;  // returns true
"model" in mycar; // returns true

// Predefined objects
"PI" in Math;          // returns true
var myString = new String("coral");
"length" in myString;  // returns true
```



#### 三元运算符

三元条件运算符由问号（?）和冒号（:）组成，分隔三个表达式。如果问号前的表达式是true则返回第二个表达式的值，问号前的表达式为false时返回第三个表达式的值。

比较运算符

== 相等 ===严格相等 严格相等符要求两个值相等且为同一种类型时才返回true，如果值相等类型不同也返回false。相等会把数据转换成相同类型再进行比较。

NaN与任何值不相等，包括它自己。undefined`和`null`只有与自身比较，或者互相比较时，才会返回`true`；与其他类型的值比较时，结果都为`false

```javascript
[1] == [1]  //false
```

#### void

**`void` 运算符** 对给定的表达式进行求值，然后返回 `undefined`

void 运算符通常只用于获取 `undefined`的原始值，一般使用`void(0)`（等同于`void 0`）

### 字典

js中定义字典

```js
var dic = new Array()//通过申明一个Array来做一个字典
```

设置、修改值

```js
dic["q"] = "q1";//设置和修改值都可以使用该方法进行设定
```

遍历

```js
for (var key in dic) {
  console.log(key + ":" + dic[key]);
}
```

删除值

```js
//两种方式
delete dic["r"];
delete dic.w;	
```



### 对象

javascript中的对象分为原生对象、内置对象和宿主对象三种。

原生对象：ECMAScript实现提供的对象，与宿主无关，在大部分js程序中都有。在运行过程中动态创建的对象，需要new

内置对象：属于原生对象的子集，在开发过程中不需要明确实例化，因为已经被实例化了。

宿主对象：由 ECMAScript 实现的宿主环境提供的对象，由宿主框架通过某种机制注册到ECscript引擎中的对象，宿主指js运行的环境，操作系统和浏览器。常见的宿主对象有window、location、history、screen、navigator、document.

#### 内置对象

原生对象有17种，Object、function、Array、String、Boolean、Number、Date、RegExp、 Error、EvalError、RangeError、ReferenceError、SyntaxError、TypeError、URIError、Math 、Global.最后两种是内置对象，不可实例化。

js中内置17个对象，常用的是array对象，date对象、正则表达式对象、string对象、global对象

math对象

​      math.ceil()：向上取整。  Math.sqrt(): 开平方

​      math.floor():向下取整。 Math.max():取最大值

​      math.round():四舍五入。 Math.min():取最小值

​      math.random():取0-1之间的随机数。 Math.abs():取绝对值

​      math.pow(x,y):

date对象

​     new Date():  创建date对象。 get/setDate()：返回或设置日期

​    Get/setFullYear():返回或设置年份，用四位数表示。 get/setmonth()：获取/设置月份

​      get/setHours():返回小时，为24小时制。       get/setMinutes():返回分钟数

​      Get/setSeconds():返回/设置秒数。Get/setMilliSeconds():返回/设置秒数。

日期的获取

```js
new Date().getYear();//获取当前年份
new Date().getFullYear();//获取当前年份
new Date().getMonth();//获取当前月份
new Date().getDate();//获取当前日
new Date().getDay();//获取当前星期
new Date().getTime();//获取当前时间
new Date().getHours();//获取当前小时数
new Date().getMinutes();//获取当前分钟数
new Date().getSeconds();//获取当前秒数
new Date().getMilliseconds();//获取当前毫秒数
new Date().toLocalDateString();//获取当前日期
new Date().toLocalTimeString();//获取当前时间
new Date().toLocalString();//获取日期与时间
```

Global对象

Global对象是一个固有对象，直接使用

正则表达式对象RegExp

正则表达式（regular expression）是一种表达文本模式（即字符串结构）的方法，有点像字符串的模板，常常用来按照“给定模式”匹配文本。比如，正则表达式给出一个 Email 地址的模式，然后用它来确定一个字符串是否为有效 Email 地址。



#### 错误对象及处理机制

Javascript内部提供error对象进行错误处理机制。原始的`Error`对象，以及6种衍生错误都是构造函数，可以手动生成错误对象的实例。这些构造函数都接受一个参数，代表错误提示信息

调用Error构造函数生成实例对象error。error实例对象必须有`message`属性，表示出错时的提示信息，对`Error`实例还提供`name`和`stack`属性，分别表示错误的名称和错误的堆栈。

```javascript
var err = new Error('出错了')
err.message //‘出错了’
```

Error实例对象是最一般的错误类型，在它的基础上JavaScript还定义了其他6种错误对象。也就是Error的6个派生对象。

`SyntaxError`对象是解析代码时发生的语法错误。

`ReferenceError`对象是引用一个不存在的变量时发生的错误。

`RangeError`对象是一个值超出有效范围时发生的错误。主要有几种情况，一是数组长度为负数，二是`Number`对象的方法参数超出范围，以及函数堆栈超过最大值。

`TypeError`对象是变量或参数不是预期类型时发生的错误。比如，对字符串、布尔值、数值等原始类型的值使用`new`命令，就会抛出这种错误，因为`new`命令的参数应该是一个构造函数。

`URIError`对象是 URI 相关函数的参数不正确时抛出的错误，主要涉及`encodeURI()` 、`decodeURI()` 、 `encodeURIComponent()`  、 `decodeURIComponent()` 、 `escape()`和`unescape()`这六个函数。

`EvalError`对象是`eval`函数没有被正确执行时，会抛出`EvalError`错误。该错误类型已经不再使用了，只是为了保证与以前代码兼容，才继续保留。

除了以上错误类型，JavaScript允许用户自定义错误类型

```javascript
function UserError(message){
    this.message = message || '默认信息';
    this.name = 'UserError';
}

UserError.prototype = new Error();
UserError.prototype.constructor = UserError;
```

throw语句：

作用是手动停止程序，抛出一个错误

```js
if (x <= 0){
  throw new Error('x 必须为正数');
}
```

在上面的代码中，如果x小于等于0，就会手动抛出一个错误，告诉用户x的值不正确，整个程序就会在这里中断执行。throw抛出的错误由自己定义，上面的代码抛出一个Error错误。

Try...catch...finally语句：

JavaScript还提供了`try...catch`结构，允许对错误进行处理，选择是否往下执行。如果没有catch，出现错误的话会直接停止。如果你不确定某些代码是否会报错，就可以把它们放在`try...catch`代码块之中，便于进一步对错误进行处理。

`catch`代码块捕获错误之后，程序不会中断，会按照正常流程继续执行下去。

`try...catch`结构允许在最后添加一个`finally`代码块，表示不管是否出现错误，都必需在最后运行的语句。

```js
openFile();

try {
  writeFile(Data);
} catch(e) {
  handleError(e);
} finally {
  closeFile();
}
```

#### Object对象

Object对象是一个基础对象类型，其他所有对象都从 Object 继承了基本的属性和方法

```js
var obj = new Object();//新建对象
obj.name=['小李']//添加属性
obj.say = function(){//添加方法
  alert(this.name)
}
delete obj.name;//删除
obj.name//访问对象属性
//对象字面量
var obj={				//JSON语法、对象字面量
	name :“小李”,		//添加属性
	say :function(){	//添加方法
 		alert(this.name); 
	}
}
//枚举对象属性
for (var key in obj){
    console.log("属性名"+key+"属性值"+obj[key])
}
//in操作符，返回布尔值
"say" in obj;
```

属性

`Object.keys`方法的参数是一个对象，返回一个数组。该数组的成员都是该对象自身的（而不是继承的）所有属性名。

`Object.getOwnPropertyNames`方法与`Object.keys`类似，也是接受一个对象作为参数，返回一个数组，包含了该对象自身的所有属性名。

对于一般的对象来说，`Object.keys()`和`Object.getOwnPropertyNames()`返回的结果是一样的。只有涉及不可枚举属性时，才会有不一样的结果。`Object.keys`方法只返回可枚举的属性

`Object.getOwnPropertyDescriptor()`：获取某个属性的描述对象。

`Object.defineProperty()`：通过描述对象，定义某个属性。

`Object.defineProperties()`：通过描述对象，定义多个属性。



`Object.create()`：该方法可以指定原型对象和属性，返回一个新的对象。

`Object.getPrototypeOf()`：获取对象的`Prototype`对象。

Object的实例对象方法

`Object.prototype.valueOf()`：返回当前对象对应的值。默认情况下返回对象本身。

`Object.prototype.toString()`：返回当前对象对应的字符串形式。

`Object.prototype.toLocaleString()`：返回当前对象对应的本地字符串形式。

`Object.prototype.hasOwnProperty()`：判断某个属性是否为当前对象自身的属性，还是继承自原型对象的属性。

`Object.prototype.isPrototypeOf()`：判断当前对象是否为另一个对象的原型

`Object.prototype.propertyIsEnumerable()`：判断某个属性是否可枚举。

方法

`Object.setPrototypeOf`方法为参数对象设置原型，返回该参数对象。它接受两个参数，第一个是现有对象，第二个是原型对象。

`Object.prototype.isPrototypeOf() `方法，用来判断该对象是否为参数对象的原型。

`Object.prototype.__proto__`方法，实例对象的`__proto__`属性（前后各两个下划线），返回该对象的原型。该属性可读写。

`Object.getOwnPropertyNames`方法返回一个数组，成员是参数对象本身的所有属性的键名，不包含继承的属性键名。

`Object.prototype.hasOwnProperty()`方法返回一个布尔值，用于判断某个属性定义在对象自身，还是定义在原型链上。

`in`运算符返回一个布尔值，表示一个对象是否具有某个属性。它不区分该属性是对象自身的属性，还是继承的属性。

对象的拷贝

如果要拷贝一个对象，需要做到下面两件事情。

- 确保拷贝后的对象，与原对象具有同样的原型。
- 确保拷贝后的对象，与原对象具有同样的实例属性。

#### 属性描述对象

JavaScript 提供了一个内部数据结构，用来描述对象的属性，控制它的行为，比如该属性是否可写、可遍历等等。这个内部数据结构称为“属性描述对象”（attributes object）。每个属性都有自己对应的属性描述对象，保存该属性的一些元信息。

属性描述对象提供6个元属性。

value：`value`是该属性的属性值，默认为`undefined`。

writable：`writable`是一个布尔值，表示属性值（value）是否可改变（即是否可写），默认为`true`。

enumerable：`enumerable`是一个布尔值，表示该属性是否可遍历，默认为`true`。

configurable: `configurable`是一个布尔值，表示可配置性，默认为`true`

get: `get`是一个函数，表示该属性的取值函数（getter）

Set: `set`是一个函数，表示该属性的存值函数（setter）

get和set属于目标函数的存取器，一旦对目标属性定义了存取器，那么存取的时候，都将执行对应的函数。利用这个功能，可以实现许多高级特性，比如定制属性的读取和赋值行为。

取值函数`get`不能接受参数，存值函数`set`只能接受一个参数（即属性的值）。

存取器往往用于，属性的值依赖对象内部数据的场合。

```javascript
var obj ={
  $n : 5,
  get next() { return this.$n++ },
  set next(n) {
    if (n >= this.$n) this.$n = n;
    else throw new Error('新的值必须大于当前值');
  }
};

obj.next // 5

obj.next = 10;
obj.next // 10

obj.next = 5;
// Uncaught Error: 新的值必须大于当前值
```

基于属性描述对象的方法控制对象的属性

`Object.preventExtensions()`：防止对象扩展。

`Object.isExtensible()`：判断对象是否可扩展。

`Object.seal()`：禁止对象配置。

`Object.isSealed()`：判断一个对象是否可配置。

`Object.freeze()`：冻结一个对象。

`Object.isFrozen()`：判断一个对象是否被冻结。



#### 数组对象

实例属性

length：表示取得当前数组长度  

实例方法

push() : 在数组末尾增加元素

pop() : 数组末尾删除  

concat(ary2):数组拼接 concat不传参时为克隆数组

tostring():数组转成以逗号分隔的字符串 

shift(): 移除数组中第一个元素

unshift():添加到数组第一个元素

slice(start,end):返回数组中的一段 

splice(start, count, addElement1, addElement2)：方法用于删除原数组的一部分成员，并可以在删除的位置添加新的数组成员，返回值是被删除的元素。

sort():对数组进行排序

reverse():反转数组的排序                         

tolocalstring():返回当前

foreach：对数组中的每一项运行给定函数,没有返回值，只是根据原数组中的元素进行操作

```javascript
Array.foreach(function(value, index){
  Console.log(index+":"+value)       
})          
```

映射到函数map：对数组中的每一项运行给定函数，返回每次函数调用的结果组成的数组  

```JavaScript
arr1=arr.map(function(value,index){
})            
```

过滤数组filter：给数组中的每一项运行给指定函数，返回满足过滤条件的组成新数组

```javascript
arr1=arr.filter(function(value,index){
  return index % 3 == 0 || value >= 9
})
```

判断每一项every：every()判断数组每一项是否满足条件，返回布尔值，全部满足返回true

```javascript
var res = arr.every(function (value,index){
  return value < 20
});
```

判断有：数组中是否存在满足条件的项，只要有一项满足条件，就会返回true

```js
var res=arr.some(function (value,index){
  return value  < 10;
});
```



#### 包装对象

三种原始类型的值——数值、字符串、布尔值——在一定条件下，也会自动转为对象，也就是原始类型的“包装对象”。

即，包装对象是指的是与数值、字符串、布尔值分别相对应的`Number`、`String`、`Boolean`三个原生对象。这三个原生对象可以把原始类型的值变成（包装成）对象。

String对象

方法

`String.fromCharCode()`该方法的参数是一个或多个数值，代表 Unicode 码点，返回值是这些码点组成的字符串。

属性

`String.length`返回字符串的长度

实例方法

`String.charAt(1)` 返回指定位置的字符

`String.charCodeAt(1)` 返回指定位置的Unicode码点

`String.concat(String2)`连接两个字符串，返回一个新字符串，不改变原字符串。

`String.slice(2,4)`从原字符串中取出指定字符串并返回，不改变原字符串。第一个参数的开始截取的位置，第二个参数是终止截取的位置

`String.indexOf('string')`方法用于确定一个字符串在另一个字符串中第一次出现的位置，返回结果是匹配开始的位置。如果返回`-1`，就表示不匹配。

`String.lastIndexOf('string')`方法与indexOf方法类似，区别是从最后往前开始匹配

`String.trim()`方法去掉字符串两端的空格、换行符、回车符、制表符等。

`String.toLowerCase()/String.toUpperCase()`方法用于将一个字符串全部转为小写/大写

`String.match('at')`方法用于确定原字符串是否匹配某个子字符串，返回一个数组，成员为匹配的第一个字符串。如果没有找到匹配，则返回`null`。

`String.search('at')`方法用于确定原字符串匹配某个子字符串的位置，返回整数。如果没有找到匹配，则返回`-1`。

`String.replace('a','b')`方法用第二个参数替换字符串中的第一个参数，一般情况下只替换第一个匹配。

`String.split('|')`方法按照给定规则分割字符串，返回一个由分割出来的子字符串组成的数组。如果分割规则为空字符串，则返回数组的成员是原字符串的每一个字符。如果没有参数，则返回数组的唯一成员就是原字符串。如果即两个分割符中间没有其他字符，则返回数组之中会有一个空字符串。如果满足分割规则的部分处于字符串的开头或结尾（即它的前面或后面没有其他字符），则返回数组的第一个或最后一个成员是一个空字符串。

`String.localeCompare('String1')`比较两个字符串，返回一个整数。如果小于0，表示第一个字符串小于第二个字符串；如果等于0，表示两者相等；如果大于0，表示第一个字符串大于第二个字符串。

Number对象

实例方法

`(Number).toString`用来将一个数值转为字符串形式。

`(Number).toFixed(2)`方法先将一个数转为指定位数的小数，然后返回这个小数对应的字符串。

`(Number).toExponential(2)`方法将整数转化为科学记数法的字符串表示

`(Number)toPrecision()`方法用于将一个数转为指定位数的有效数字。

Boolean对象

使用双重的否运算符（`!`）也可以将任意值转为对应的布尔值。

```javascript
!!undefined // false
!!null // false
!!0 // false
!!'' // false
!!NaN // false

!!1 // true
!!'false' // true
!![] // true
!!{} // true
!!function(){} // true
!!/foo/ // true
```

#### RegExp正则表达式对象

https://juejin.im/post/6844904021325512717

https://juejin.im/post/6844904182835757064#heading-6

正则表达式（regular expression）是一种表达文本模式（即字符串结构）的方法，有点像字符串的模板，常常用来按照“给定模式”匹配文本。比如，正则表达式给出一个 Email 地址的模式，然后用它来确定一个字符串是否为 Email 地址。

新建正则表达式对象

```javascript
var regex = new RegExp('xyz', 'i');
// 等价于
var regex = /xyz/i;
```

正则表达式的实例属性

`String.prototype.match()`：返回一个数组，成员是所有匹配的子字符串。

`String.prototype.search()`：按照给定的正则表达式进行搜索，返回一个整数，表示匹配开始的位置。

`String.prototype.replace()`：按照给定的正则表达式进行替换，返回替换后的字符串。

`String.prototype.split()`：按照给定规则进行字符串分割，返回一个数组，包含分割后的各个成员。

正则匹配规则

js定义了很多字符匹配规则，大大方便了正则表达式的使用。

**1.字面量字符与元字符**

大部分字符在正则表达式中，就是字面的含义，比如`/a/`匹配`a`，`/b/`匹配`b`。在正则表达式之中，只表示它字面的含义的字符（就像前面的`a`和`b`）就叫做“字面量字符”

除了字面量字符以外，还有一部分字符有特殊含义，不代表字面的意思。它们叫做“元字符”（metacharacters），主要有以下几个。

元字符包括：

（1）.  ：点字符（`.`）匹配除回车（`\r`）、换行(`\n`) 、行分隔符（`\u2028`）和段分隔符（`\u2029`）以外的所有字符。注意，对于码点大于`0xFFFF`字符，点字符不能正确匹配，会认为这是两个字符。通常把点字符用作占位符，表示匹配特定结构。

（2）位置字符：有一些符号限制匹配字符出现的位置，只有出现在指定的位置才算匹配正确。`^` 表示字符串的开始位置，`$` 表示字符串的结束位置

（3）选择字符：选择字符表示匹配几项中的一项就算匹配成功。

**2.转义符**

正则表达式中那些有特殊含义的元字符，如果要匹配它们本身，就需要在它们前面要加上反斜杠。比如要匹配`+`，就要写成`\+`。

正则表达式中，需要反斜杠转义的，一共有12个字符：`^`、`.`、`[`、`$`、`(`、`)`、`|`、`*`、`+`、`?`、`{`和`\`。

需要特别注意的是，如果使用`RegExp`方法生成正则对象，转义需要使用两个斜杠，因为字符串内部会先转义一次。

**3.字符类**

字符类（class）表示有一系列字符可供选择，只要匹配其中一个就可以了。所有可供选择的字符都放在方括号内，比如`[xyz]` 表示`x`、`y`、`z`之中任选一个匹配。

脱字符

如果方括号内的第一个字符是`[^]`，则表示除了字符类之中的字符，其他字符都可以匹配。比如，`[^xyz]`表示除了`x`、`y`、`z`之外都可以匹配。

连字符

某些情况下，对于连续序列的字符，连字符（`-`）用来提供简写形式，表示字符的连续范围。比如，`[abc]`可以写成`[a-c]`，`[0123456789]`可以写成`[0-9]`，同理`[A-Z]`表示26个大写字母。

**4.预定义模式**

预定义模式是某些常见模式的简写。

- `\d` 匹配0-9之间的任一数字，相当于`[0-9]`。
- `\D` 匹配所有0-9以外的字符，相当于`[^0-9]`。
- `\w` 匹配任意的字母、数字和下划线，相当于`[A-Za-z0-9_]`。
- `\W` 除所有字母、数字和下划线以外的字符，相当于`[^A-Za-z0-9_]`。
- `\s` 匹配空格（包括换行符、制表符、空格符等），相等于`[ \t\r\n\v\f]`。
- `\S` 匹配非空格的字符，相当于`[^ \t\r\n\v\f]`。
- `\b` 匹配词的边界。
- `\B` 匹配非词边界，即在词的内部。

**5.重复类**

模式的精确匹配次数，使用大括号（`{}`）表示。`{n}`表示恰好重复`n`次，`{n,}`表示至少重复`n`次，`{n,m}`表示重复不少于`n`次，不多于`m`次。

**6.量词符**

量词符是特殊的重复类，用来设定某个模式出现的次数。

`?` 问号表示某个模式出现0次或1次，等同于`{0, 1}`。

`*` 星号表示某个模式出现0次或多次，等同于`{0,}`。

`+` 加号表示某个模式出现1次或多次，等同于`{1,}`。

**7.贪婪模式与非贪婪模式**

上一小节的三个量词符，默认情况下都是最大可能匹配，即匹配到下一个字符不满足匹配规则为止。这被称为贪婪模式。

除了贪婪模式，还有非贪婪模式，即最小可能匹配。只要一发现匹配，就返回结果，不要往下检查。如果想将贪婪模式改为非贪婪模式，可以在量词符后面加一个问号。

除了非贪婪模式的加号（`+?`），还有非贪婪模式的星号（`*?`）和非贪婪模式的问号（`??`）。

- `+?`：表示某个模式出现1次或多次，匹配时采用非贪婪模式。
- `*?`：表示某个模式出现0次或多次，匹配时采用非贪婪模式。
- `??`：表格某个模式出现0次或1次，匹配时采用非贪婪模式。

**8.正则修饰符**

修饰符（modifier）表示模式的附加规则，放在正则模式的最尾部。

g修饰符。默认情况下，第一次匹配成功后，正则对象就停止向下匹配了。`g`修饰符表示全局匹配（global），加上它以后，正则对象将匹配全部符合条件的结果，主要用于搜索和替换。

i修饰符。默认情况下，正则对象区分字母的大小写，加上`i`修饰符以后表示忽略大小写

m修饰符。`m`修饰符表示多行模式（multiline），会修改`^`和`$`的行为。默认情况下（即不加`m`修饰符时），`^`和`$`匹配字符串的开始处和结尾处，加上`m`修饰符以后，`^`和`$`还会匹配行首和行尾，即`^`和`$`会识别换行符（`\n`）

**9.组匹配**

`(?:x)`称为非捕获组（Non-capturing group），表示不返回该组匹配的内容，即匹配的结果中不计入这个括号。

注意，使用组匹配时，不宜同时使用`g`修饰符，否则`match`方法不会捕获分组的内容。

**10.先行断言**

`x(?=y)`称为先行断言（Positive look-ahead），`x`只有在`y`前面才匹配，`y`不会被计入返回结果。比如，要匹配后面跟着百分号的数字，可以写成`/\d+(?=%)/`。

先行否定断言

`x(?!y)`称为先行否定断言（Negative look-ahead），`x`只有不在`y`前面才匹配，`y`不会被计入返回结果。比如，要匹配后面跟的不是百分号的数字，就要写成`/\d+(?!%)/`。

常用的 JS正则表达式整理

```javascript
 1 数字：^[0-9]*$
 2 n位的数字：^\d{n}$
 3 至少n位的数字：^\d{n,}$
 4 m-n位的数字：^\d{m,n}$
 5 零和非零开头的数字：^(0|[1-9][0-9]*)$
 6 非零开头的最多带两位小数的数字：^([1-9][0-9]*)+(.[0-9]{1,2})?$
 7 带1-2位小数的正数或负数：^(\-)?\d+(\.\d{1,2})?$
 8 正数、负数、和小数：^(\-|\+)?\d+(\.\d+)?$
 9 有两位小数的正实数：^[0-9]+(.[0-9]{2})?$
10 有1~3位小数的正实数：^[0-9]+(.[0-9]{1,3})?$
11 非零的正整数：^[1-9]\d*$ 或 ^([1-9][0-9]*){1,3}$ 或 ^\+?[1-9][0-9]*$
12 非零的负整数：^\-[1-9][]0-9"*$ 或 ^-[1-9]\d*$
13 非负整数：^\d+$ 或 ^[1-9]\d*|0$
14 非正整数：^-[1-9]\d*|0$ 或 ^((-\d+)|(0+))$
15 非负浮点数：^\d+(\.\d+)?$ 或 ^[1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|0$
16 非正浮点数：^((-\d+(\.\d+)?)|(0+(\.0+)?))$ 或^(-([1-9]\d*\.\d*|0\.\d*[1-9]\d*))|0?\.0+|0$
17 正浮点数：^[1-9]\d*\.\d*|0\.\d*[1-9]\d*$ 或^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$
18 负浮点数：^-([1-9]\d*\.\d*|0\.\d*[1-9]\d*)$ 或^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$
19 浮点数：^(-?\d+)(\.\d+)?$ 或 ^-?([1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|0)$
```

校验字符的表达式

```javascript
1 汉字：^[\u4e00-\u9fa5]{0,}$
 2 英文和数字：^[A-Za-z0-9]+$ 或 ^[A-Za-z0-9]{4,40}$
 3 长度为3-20的所有字符：^.{3,20}$
 4 由26个英文字母组成的字符串：^[A-Za-z]+$
 5 由26个大写英文字母组成的字符串：^[A-Z]+$
 6 由26个小写英文字母组成的字符串：^[a-z]+$
 7 由数字和26个英文字母组成的字符串：^[A-Za-z0-9]+$
 8 由数字、26个英文字母或者下划线组成的字符串：^\w+$ 或 ^\w{3,20}$
 9 中文、英文、数字包括下划线：^[\u4E00-\u9FA5A-Za-z0-9_]+$
10 中文、英文、数字但不包括下划线等符号：^[\u4E00-\u9FA5A-Za-z0-9]+$ 或^[\u4E00-\u9FA5A-Za-z0-9]{2,20}$
11 可以输入含有^%&',;=?$\"等字符：[^%&',;=?$\x22]+
12 禁止输入含有~的字符：[^~\x22]+
```

其他常用正则表达式

```javascript
1. 火车车次：/^[GCDZTSPKXLY1-9]\d{1,4}$/   
2. 手机机身码：/^\d{15,17}$/
3. 必须带端口号的网址或者ip：/^((ht|f)tps?:\/\/)?[\w-]+(\.[\w-]+)+:\d{1,5}\/?$/
4.网址(url,支持端口和"?+参数"和"#+参数)：/^(((ht|f)tps?):\/\/)?[\w-]+(\.[\w-]+)+([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/
5.统一社会信用代码: /^[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}$/
6.迅雷链接：/^thunderx?:\/\/[a-zA-Z\d]+=$/
7.ed2k链接(宽松匹配):/^ed2k:\/\/\|file\|.+\|\/$/
8.磁力链接(宽松匹配)：/^magnet:\?xt=urn:btih:[0-9a-fA-F]{40,}.*$/
9.子网掩码：/^(?:\d{1,2}|1\d\d|2[0-4]\d|25[0-5])(?:\.(?:\d{1,2}|1\d\d|2[0-4]\d|25[0-5])){3}$/
10.linux"隐藏文件"路径：/^\/(?:[^/]+\/)*\.[^/]*/
11.linux文件夹路径：/^\/(?:[^/]+\/)*$/
12.linux文件路径：/^\/(?:[^/]+\/)*[^/]+$/
13.windows文件夹路径：/^[a-zA-Z]:\\(?:\w+\\?)*$/
14.windows文件路径：/^[a-zA-Z]:\\(?:\w+\\)*\w+\.\w+$/
15.股票代码：/^(s[hz]|S[HZ])(000[\d]{3}|002[\d]{3}|300[\d]{3}|600[\d]{3}|60[\d]{4})$/
16.大于0，小于150，且小数点后允许出现5，用于考试判卷分数显示：/^150$|^(?:\d|[1-9]\d|1[0-4]\d)(?:.5)?$/
17.html注释：/^<!--[\s\S]*?-->$/
18.Md5格式32位：/^([a-f\d]{32}|[A-F\d]{32})$/
19.版本号格式X.Y.Z：/^\d+(?:\.\d+){2}$/
20.视频(video)链接地址（视频格式可按需增删）：/^https?:\/\/(.+\/)+.+(\.(swf|avi|flv|mpg|rm|mov|wav|asf|3gp|mkv|rmvb|mp4))$/i
21.图片(image)链接地址（图片格式可按需增删）：/^https?:\/\/(.+\/)+.+(\.(gif|png|jpg|jpeg|webp|svg|psd|bmp|tif))$/i
22.24小时制时间（HH:mm:ss）：/^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/
23.12小时制时间（hh:mm:ss）：/^(?:1[0-2]|0?[1-9]):[0-5]\d:[0-5]\d$/
24.base64格式：/^\s*data:(?:[a-z]+\/[a-z0-9-+.]+(?:;[a-z-]+=[a-z0-9-]+)?)?(?:;base64)?,([a-z0-9!$&',()*+;=\-._~:@/?%\s]*?)\s*$/i
25.数字/货币金额（支持负数、千分位分隔符）：/^-?\d+(,\d{3})*(\.\d{1,2})?$/
26.数字/货币金额 (只支持正数、不支持校验千分位分隔符)：/(?:^[1-9]([0-9]+)?(?:\.[0-9]{1,2})?$)|(?:^(?:0){1}$)|(?:^[0-9]\.[0-9](?:[0-9])?$)/
27.银行卡号（10到30位, 覆盖对公/私账户, 参考微信支付）：/^[1-9]\d{9,29}$/
28.中文姓名：/^(?:[\u4e00-\u9fa5·]{2,16})$/
29.英文姓名：/(^[a-zA-Z]{1}[a-zA-Z\s]{0,20}[a-zA-Z]{1}$)/
30.车牌号（新能源）：/[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领 A-Z]{1}[A-HJ-NP-Z]{1}(([0-9]{5}[DF])|([DF][A-HJ-NP-Z0-9][0-9]{4}))$/
31.车牌号（非新能源）:/^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领 A-Z]{1}[A-HJ-NP-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/
32.车牌号（新能源+非新能源）:/^(?:[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领 A-Z]{1}[A-HJ-NP-Z]{1}(?:(?:[0-9]{5}[DF])|(?:[DF](?:[A-HJ-NP-Z0-9])[0-9]{4})))|(?:[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领 A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9 挂学警港澳]{1})$/
33.手机号(mobile phone)中国(严谨), 根据工信部2019年最新公布的手机号段:/^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/
34.手机号(mobile phone)中国(宽松), 只要是13,14,15,16,17,18,19开头即可:/^(?:(?:\+|00)86)?1[3-9]\d{9}$/
35.手机号(mobile phone)中国(最宽松), 只要是1开头即可, 如果你的手机号是用来接收短信, 优先建议选择这一条:/^(?:(?:\+|00)86)?1\d{10}$/
36.date(日期):/^\d{4}(-)(1[0-2]|0?\d)\1([0-2]\d|\d|30|31)$/
37.email(邮箱):/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
38.座机(tel phone)电话(国内),如: 0341-86091234:/^\d{3}-\d{8}$|^\d{4}-\d{7,8}$/
39.身份证号(1代,15位数字):/^[1-9]\d{7}(?:0\d|10|11|12)(?:0[1-9]|[1-2][\d]|30|31)\d{3}$/
40.身份证号(2代,18位数字),最后一位是校验位,可能为数字或字符X:/^[1-9]\d{5}(?:18|19|20)\d{2}(?:0[1-9]|10|11|12)(?:0[1-9]|[1-2]\d|30|31)\d{3}[\dXx]$/
41.身份证号, 支持1/2代(15位/18位数字):/(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0[1-9]|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/
42.护照（包含香港、澳门）:/(^[EeKkGgDdSsPpHh]\d{8}$)|(^(([Ee][a-fA-F])|([DdSsPp][Ee])|([Kk][Jj])|([Mm][Aa])|(1[45]))\d{7}$)/
43.帐号是否合法(字母开头，允许5-16字节，允许字母数字下划线组合:/^[a-zA-Z]\w{4,15}$/
44.中文/汉字:/^(?:[\u3400-\u4DB5\u4E00-\u9FEA\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0])+$/
45.小数:/^\d+\.\d+$/
46.数字:/^\d{1,}$/
47.html标签(宽松匹配):/<(\w+)[^>]*>(.*?<\/\1>)?/
48.qq号格式正确:/^[1-9][0-9]{4,10}$/
49.数字和字母组成:/^[A-Za-z0-9]+$/
50.英文字母:/^[a-zA-Z]+$/
51.小写英文字母组成:/^[a-z]+$/
52.大写英文字母:/^[A-Z]+$/
53.密码强度校验，最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符:/^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/
54.用户名校验，4到16位（字母，数字，下划线，减号）:/^[a-zA-Z0-9_-]{4,16}$/
55.ip-v4:/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
56.ip-v6:/^((([0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}:[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){5}:([0-9A-Fa-f]{1,4}:)?[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){4}:([0-9A-Fa-f]{1,4}:){0,2}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){3}:([0-9A-Fa-f]{1,4}:){0,3}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){2}:([0-9A-Fa-f]{1,4}:){0,4}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(([0-9A-Fa-f]{1,4}:){0,5}:((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(::([0-9A-Fa-f]{1,4}:){0,5}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|([0-9A-Fa-f]{1,4}::([0-9A-Fa-f]{1,4}:){0,5}[0-9A-Fa-f]{1,4})|(::([0-9A-Fa-f]{1,4}:){0,6}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){1,7}:))$/i
57.16进制颜色:/^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/
58.微信号(wx)，6至20位，以字母开头，字母，数字，减号，下划线:/^[a-zA-Z][-_a-zA-Z0-9]{5,19}$/
59.邮政编码(中国):/^(0[1-7]|1[0-356]|2[0-7]|3[0-6]|4[0-7]|5[1-7]|6[1-7]|7[0-5]|8[013-6])\d{4}$/
60.中文和数字:/^((?:[\u3400-\u4DB5\u4E00-\u9FEA\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0])|(\d))+$/
61.不能包含字母:/^[^A-Za-z]*$/
62.java包名:/^([a-zA-Z_][a-zA-Z0-9_]*)+([.][a-zA-Z_][a-zA-Z0-9_]*)+$/
63.mac地址:/^((([a-f0-9]{2}:){5})|(([a-f0-9]{2}-){5}))[a-f0-9]{2}$/i
64.匹配连续重复的字符:/(.)\1+/
```



#### Json对象

JSON 格式（JavaScript Object Notation 的缩写）是一种用于数据交换的文本格式，2001年由 Douglas Crockford 提出，目的是取代繁琐笨重的 XML 格式。

相比 XML 格式，JSON 格式有两个显著的优点：

​       书写简单，一目了然；

​        符合 JavaScript 原生语法，可以由解释引擎直接处理，不用另外添加解析代码。

所以，JSON 迅速被接受，已经成为各大网站交换数据的标准格式，并被写入标准。

`JSON`对象是 JavaScript 的原生对象，用来处理 JSON 格式数据。

json格式的规定

```js
1.复合类型的值只能是数组或对象，不能是函数、正则表达式对象、日期对象。
2.原始类型的值只有四种：字符串、数值（必须以十进制表示）、布尔值和null（不能使用NaN, Infinity, -Infinity和undefined）。
3.字符串必须使用双引号表示，不能使用单引号。
4.对象的键名必须放在双引号里面。
5.数组或对象最后一个成员的后面，不能加逗号。
```

Json对象的方法

`JSON.stringify`方法用于将一个值转为 JSON 字符串。该字符串符合 JSON 格式，并且可以被`JSON.parse`方法还原。

`JSON.parse`方法用于将 JSON 字符串转换成对应的值。

JSON.stringify()的几种妙用:

判断数组是否包含某对象，或者判断对象是否相等。

```javascript
let data = [
  {name:'echo'},
  {name:'听风是风'},
  {name:'天子笑'},
],
val = {name:'天子笑'};
console.log(JSON.stringify(data).indexOf(JSON.stringify(val)) !== -1);
console.log(data.indexOf(val) !== -1)
//因为数组和对象是引用值不能比较，所以需要序列化一下转成字符串
```

判断两数组/对象是否相等

```javascript
let a = [1,2,3],
b = [1,2,3];
JSON.stringify(a) === JSON.stringify(b);//true
```

让localStorage/sessionStorage可以存储对象。

localStorage/sessionStorage默认只能存储字符串，而实际开发中，我们往往需要存储的数据多为对象类型，那么这里我们就可以在存储时利用json.stringify()将对象转为字符串，而在取缓存时，只需配合json.parse()转回对象即可

```javascript
//存
function setLocalStorage(key,val){
window.localStorage.setItem(key,JSON.stringify(val));
};
//取
function getLocalStorage(key){
let val = JSON.parse(window.localStorage.getItem(key));
return val;
};
//测试
setLocalStorage('demo',[1,2,3]);
let  a = getLocalStorage('demo');//[1,2,3]
```

eval函数

除了JSON.parse可以将字符串转换为json，还可以使用eval函数。eval函数可以执行任意的JavaScript代码

```javascript
var testJson = '{ "name": "小强", "age": 16 }';
//testJson=eval(testJson);//错误的转换方式
testJson = eval("(" + testJson + ")");
alert(testJson.name);
```

也可以自己写一个function将字符串转为json

```javascript
var jsonStr = '{"userName": "tiu","userAge": 26,"isMale": true}';
var json = (new Function("return " + jsonStr))();
```

##### Json方法的处理

json对象的特殊在于，如果传入的字符串不是有效的 JSON 格式，`JSON.parse()`方法将报错

报错之后js就会停止运行，所以为了处理解析错误，可以将`JSON.parse()`方法放在`try...catch`代码块中

```javascript
try {
  JSON.parse("'String'");
} catch(e) {
  console.log('parsing error');
}
```

好一点的处理是捕获报错之后返回一个默认值

```typescript
const jsonStringTransformer = <ValueType = any>(
  jsonString: string,
  defaultValue: ValueType,
) => {
  try {
    return JSON.parse(jsonString);
  } catch (e) {
    return defaultValue;
  }
};
```

### 数组对象的研究

数组是无类型的，数组元素可以是任意类型，同一个数组中的元素也可能是不同类型

数组是动态的：可以根据需要增长或者缩短

数组可能是稀疏的： 数组元素的索引不一定是连续的

数组即使设置了初始长度，但是其超出长度之外的值依然可以显示，而且js中的数组再定义时可以不设长度

那么设置数组长度的意义是什么？

如果设置了数组长度，那么代码在执行时会在初始化的时候就给数据分配一个空间，以后每次给数组赋值就会更快。反之如果没有设置长度，代码在每次执行赋值时会先给数组增加长度，分配空间，降低运行速度。 d

#### 各方法返回值汇总

返回数值：push()、unshift()、indexof()

返回字符串：join()

返回布尔值：includes()、every()、some()、findindex()

返回新数组：pop()、shift()、sort()、reverse()、concat()、slice()、fill()、map()、filter()、find()\ reduce()

没有返回值：foreach()

不改变原数组：slice()、include()、indexof()、findindex()、、、、

改变原数组：sort()、reverse()、splice()、fill()、map()、filter()、reduce()、push()、pop()、

#### 数组常见操作

1. 在指定位置删除或者添加元素：splice方法，改变原数组

```javascript
var a = ['a', 'b', 'c', 'd', 'e', 'f'];
a.splice(4, 2) // ["e", "f"]
a // ["a", "b", "c", "d"]

var a = ['a', 'b', 'c', 'd', 'e', 'f'];
a.splice(4, 2, 1, 2) // ["e", "f"]
a // ["a", "b", "c", "d", 1, 2]
```

还可以使用delete方法，但是delete方法只能将原位置变为undefined，不能自动改变数组长度

```javascript
delete arr[index]
```

2. 从对象数组中提取对象的指定属性为数组

```javascript
objArray = [ { foo: 1, bar: 2}, { foo: 3, bar: 4}, { foo: 5, bar: 6} ];

var result = objArray.map(a => a.foo)
```



#### 数组sort方法

##### 排序方法

sort方法默认是按照字典的顺序排的，也就是先转换成字符串，然后在进行从小到大排序,而不是直接按照大小进行排序

```javascript
['d', 'c', 'b', 'a'].sort()
// ['a', 'b', 'c', 'd']

[4, 3, 2, 1].sort()
// [1, 2, 3, 4]

[10111, 1101, 111].sort()
// [10111, 1101, 111]
```

如果想让`sort`方法按照自定义方式排序，可以传入一个函数作为参数。该函数本身接受两个参数，表示进行比较的两个数组成员。如果该函数的返回值大于`0`，表示第一个成员排在第二个成员后面；其他情况下，都是第一个元素排在第二个元素前面。

自定义的排序函数应该返回数值，否则不同的浏览器可能有不同的实现，不能保证结果都一致。

##### 稳定性



#### reduce方法

##### 对象中的某属性求和

```javascript
//值数组
var sum = [0, 1, 2, 3].reduce(function (accumulator, currentValue) {
  return accumulator + currentValue;
}, 0);// 和为 6

//对象数组
var initialValue = 0;
var sum = [{x: 1}, {x:2}, {x:3}].reduce(function (accumulator, currentValue) {
    return accumulator + currentValue.x;
},initialValue)

console.log(sum) // logs 6
```

##### 将二维数组/多维数组转化为1维

```javascript
//将二维数组转化为一维
let arr = [[0, 1], [2, 3], [4, 5]]
let newArr = arr.reduce((pre,cur)=>{
    return pre.concat(cur)
},[])
console.log(newArr); // [0, 1, 2, 3, 4, 5]

//将多维数组转化为一维
let arr = [[0, 1], [2, 3], [4,[5,6,7]]]
const newArr = function(arr){
   return arr.reduce((pre,cur)=>pre.concat(Array.isArray(cur)?newArr(cur):cur),[])
}
console.log(newArr(arr)); //[0, 1, 2, 3, 4, 5, 6, 7]
```

##### 一维数组转为二维数组

```javascript
function oneTransTwo(source, num) {
      return source.reduce((v, item, index) => {
        let r = null;
        if (index % num === 0) {
          r = [...v, [JSON.parse(JSON.stringify(item))]];
        } else {
          v[v.length - 1].push(item);
          r = v;
        }
        return r;
      }, []);
};
```

##### 数组去重

```javascript
//数组去重
let arr = [1,2,3,4,4,1]
let newArr = arr.reduce((pre,cur)=>{
    if(!pre.includes(cur)){
      return pre.concat(cur)
    }else{
      return pre
    }
},[])
console.log(newArr);// [1, 2, 3, 4]
```

##### 计算每个元素出现的次数

```javascript
//计算数组中每个元素出现的次数
let names = ['Alice', 'Bob', 'Tiff', 'Bruce', 'Alice'];
let nameNum = names.reduce((pre,cur)=>{
  if(cur in pre){
    pre[cur]++
  }else{
    pre[cur] = 1 
  }
  return pre
},{})
console.log(nameNum); //{Alice: 2, Bob: 1, Tiff: 1, Bruce: 1}
```

##### 按属性分类

```javascript
var people = [
  { name: 'Alice', age: 21 },
  { name: 'Max', age: 20 },
  { name: 'Jane', age: 20 }
];

function groupBy(objectArray, property) {
  return objectArray.reduce(function (acc, obj) {
    var key = obj[property];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  }, {});
}

var groupedPeople = groupBy(people, 'age');
// groupedPeople is:
// {
//   20: [
//     { name: 'Max', age: 20 },
//     { name: 'Jane', age: 20 }
//   ],
//   21: [{ name: 'Alice', age: 21 }]
// }
```

##### 按属性去重

```javascript
let array = array.reduce(function (item, next) {
        obj[next.id] ? '' : obj[next.id] = true && item.push(next);
        return item;
 }, []);
 
console.log(array)
```

##### 按顺序执行promise

```javascript
function runPromiseInSequence(arr, input) {
  return arr.reduce(
    (promiseChain, currentFunction) => promiseChain.then(currentFunction),
    Promise.resolve(input)
  );
}

// promise function 1
function p1(a) {
  return new Promise((resolve, reject) => {
    resolve(a * 5);
  });
}

// promise function 2
function p2(a) {
  return new Promise((resolve, reject) => {
    resolve(a * 2);
  });
}

// function 3  - will be wrapped in a resolved promise by .then()
function f3(a) {
 return a * 3;
}

// promise function 4
function p4(a) {
  return new Promise((resolve, reject) => {
    resolve(a * 4);
  });
}

const promiseArr = [p1, p2, f3, p4];
runPromiseInSequence(promiseArr, 10)
  .then(console.log);   // 1200
```

##### 功能型函数管道

```javascript
// Building-blocks to use for composition
const double = x => x + x;
const triple = x => 3 * x;
const quadruple = x => 4 * x;

// Function composition enabling pipe functionality
const pipe = (...functions) => input => functions.reduce(
    (acc, fn) => fn(acc),
    input
);

// Composed functions for multiplication of specific values
const multiply6 = pipe(double, triple);
const multiply9 = pipe(triple, triple);
const multiply16 = pipe(quadruple, quadruple);
const multiply24 = pipe(double, triple, quadruple);

// Usage
multiply6(6); // 36
multiply9(9); // 81
multiply16(16); // 256
multiply24(10); // 240
```

