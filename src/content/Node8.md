---
title: JavaScript开发（六）-TS开发（一）
date: 2021-01-21 21:40:33
categories: IT
tags:
    - IT，Web
toc: true
thumbnail: http://cdn.kunkunzhang.top/typescript.jpg
---

万万没想到会来到第六篇，第六篇写TypeScript。

<!--more-->

## Typescript

Typescript是JavaScript的超集，主要提供了**类型系统**和**对 ES6 的支持**，它由 Microsoft 开发，代码[开源于 GitHub](https://github.com/Microsoft/TypeScript) 上。

Typescript的优势：

Typescript增加了代码的可读性。

- 类型系统实际上是最好的文档，大部分的函数看看类型的定义就可以知道如何使用了
- 可以在编译阶段就发现大部分错误，这总比在运行时候出错好
- 增强了编辑器和 IDE 的功能，包括代码补全、接口提示、跳转到定义、重构等

TypeScript 非常包容

- TypeScript 是 JavaScript 的超集，`.js` 文件可以直接重命名为 `.ts` 即可
- 即使不显式的定义类型，也能够自动做出[类型推论](https://ts.xcatliu.com/basics/type-inference.html)
- 可以定义从简单到复杂的几乎一切类型
- 即使 TypeScript 编译报错，也可以生成 JavaScript 文件
- 兼容第三方库，即使第三方库不是用 TypeScript 写的，也可以编写单独的类型文件供 TypeScript 读取

Typescript的劣势：

- 有一定的学习成本，需要理解接口（Interfaces）、泛型（Generics）、类（Classes）、枚举类型（Enums）等前端工程师可能不是很熟悉的概念
- 短期可能会增加一些开发成本，毕竟要多写一些类型的定义，不过对于一个需要长期维护的项目，TypeScript 能够减少其维护成本
- 集成到构建流程需要一些工作量
- 可能和一些库结合的不是很完美

### 安装和使用

使用typescript编写的文件以ts为文件后缀，用typescript编写react时以tsx为文件后缀。

安装typescript的命令行工具

```shell
npm install -g typescript
```

以上命令会在全局环境下安装tsc命令，安装完成后可以在任何地方执行tsc命令

编译typescript文件

```shell
tsc hello.ts
```

如果想要用typescript写node文件，则需要引入第三方声明文件：

```shell
npm install @types/node --save-dev
```

简单的编译示例：

hello.ts

```typescript
function sayHello(person: string) {
    return 'Hello, ' + person;
}

let user = 'Tom';
console.log(sayHello(user));
```

执行

```shell
tsc hello.ts
```

编译生成的hello.js文件

```javascript
function sayHello(person) {
    return 'Hello, ' + person;
}
var user = 'Tom';
console.log(sayHello(user));
```

typeScript 中，使用 `:` 指定变量的类型，`:` 的前后有没有空格都可以。

### 模块@types

[DefinitelyTyped](https://github.com/borisyankov/DefinitelyTyped) 是 TypeScript 最大的优势之一，社区已经记录了 90% 的顶级 JavaScript 库。你可以非常高效地使用这些库，而无须在单独的窗口打开相应文档以确保输入的正确性。

你可以通过 `npm` 来安装使用 `@types`，例如为 `jquery` 添加声明文件：

```shell
npm install @types/jquery --save-dev
```

安装完之后，不需要特别的配置，你就可以像使用模块一样使用它：

```ts
import * as $ from 'jquery';

// 现在你可以此模块中任意使用$了 :)
```

### 编译上下文tsconfig.json

编译上下文算是一个比较花哨的术语，可以用它来给文件分组，告诉 TypeScript 哪些文件是有效的，哪些是无效的。除了有效文件所携带信息外，编译上下文还包含有正在被使用的编译选项的信息。定义这种逻辑分组，一个比较好的方式是使用 `tsconfig.json` 文件。

在项目的根目录下创建一个空 JSON 文件。通过这种方式，TypeScript 将 会把此目录和子目录下的所有 .ts 文件作为编译上下文的一部分，它还会包含一部分默认的编译选项。

你可以通过 `compilerOptions` 来定制你的编译选项：

```javascript
{
  "compilerOptions": {

    /* 基本选项 */
    "target": "es5",                       // 指定 ECMAScript 目标版本: 'ES3' (default), 'ES5', 'ES6'/'ES2015', 'ES2016', 'ES2017', or 'ESNEXT'
    "module": "commonjs",                  // 指定使用模块: 'commonjs', 'amd', 'system', 'umd' or 'es2015'
    "lib": [],                             // 指定要包含在编译中的库文件
    "allowJs": true,                       // 允许编译 javascript 文件
    "checkJs": true,                       // 报告 javascript 文件中的错误
    "jsx": "preserve",                     // 指定 jsx 代码的生成: 'preserve', 'react-native', or 'react'
    "declaration": true,                   // 生成相应的 '.d.ts' 文件
    "sourceMap": true,                     // 生成相应的 '.map' 文件
    "outFile": "./",                       // 将输出文件合并为一个文件
    "outDir": "./",                        // 指定输出目录
    "rootDir": "./",                       // 用来控制输出目录结构 --outDir.
    "removeComments": true,                // 删除编译后的所有的注释
    "noEmit": true,                        // 不生成输出文件
    "importHelpers": true,                 // 从 tslib 导入辅助工具函数
    "isolatedModules": true,               // 将每个文件作为单独的模块 （与 'ts.transpileModule' 类似）.

    /* 严格的类型检查选项 */
    "strict": true,                // 启用所有严格类型检查选项
    "noImplicitAny": true,         // 在表达式和声明上有隐含的 any类型时报错
    "strictNullChecks": true,      // 启用严格的 null 检查
    "noImplicitThis": true,        // 当 this 表达式值为 any 类型的时候，生成一个错误
    "alwaysStrict": true,                  // 以严格模式检查每个模块，并在每个文件里加入 'use strict'

    /* 额外的检查 */
    "noUnusedLocals": true,            // 有未使用的变量时，抛出错误
    "noUnusedParameters": true,        // 有未使用的参数时，抛出错误
    "noImplicitReturns": true,         // 并不是所有函数里的代码都有返回值时，抛出错误
    "noFallthroughCasesInSwitch": true,// 报告 switch 语句的 fallthrough 错误。（即，不允许 switch 的 case 语句贯穿）

    /* 模块解析选项 */
    "moduleResolution": "node",            // 选择模块解析策略： 'node' (Node.js) or 'classic' (TypeScript pre-1.6)
    "baseUrl": "./",                       // 用于解析非相对模块名称的基目录
    "paths": {},                           // 模块名到基于 baseUrl 的路径映射的列表
    "rootDirs": [],                        // 根文件夹列表，其组合内容表示项目运行时的结构内容
    "typeRoots": [],                       // 包含类型声明的文件列表
    "types": [],                           // 需要包含的类型声明文件名列表
    "allowSyntheticDefaultImports": true,  // 允许从没有设置默认导出的模块中默认导入。

    /* Source Map Options */
    "sourceRoot": "./",               // 指定调试器应该找到 TypeScript 文件而不是源文件的位置
    "mapRoot": "./",                  // 指定调试器应该找到映射文件而不是生成文件的位置
    "inlineSourceMap": true,          // 生成单个 soucemaps 文件，而不是将 sourcemaps 生成不同的文件
    "inlineSources": true,            // 将代码与 sourcemaps 生成到一个文件中，要求同时设置了 --inlineSourceMap 或 --sourceMap 属性

    /* 其他选项 */
    "experimentalDecorators": true,        // 启用装饰器
    "emitDecoratorMetadata": true          // 为装饰器提供元数据的支持
  }
}
```

### 数据类型与对象类型

typescript包含javascript的五种基本数据类型和ES6中声明的symbol，唯一的区别是在声明变量时需指明变量类型。

除此之外，typescript有新添加的类型

#### 字符串字面量类型

字符串字面量类型用来约束取值只能是某几个字符串中的一个。

```typescript
type EventNames = 'click' | 'scroll' | 'mousemove';
function handleEvent(ele: Element, event: EventNames) {
    // do something
}

handleEvent(document.getElementById('hello'), 'scroll');  // 没问题
handleEvent(document.getElementById('world'), 'dblclick'); // 报错，event 不能为 'dblclick'

// index.ts(7,47): error TS2345: Argument of type '"dblclick"' is not assignable to parameter of type 'EventNames'.
```

#### 任意类型

任意值（Any）用来表示允许赋值为任意类型。如果是 `any` 类型，则允许被赋值为任意类型。

```typescript
let myFavoriteNumber: any = 'seven';
myFavoriteNumber = 7;
```

在任意值上访问任何属性都是允许的.如果变量在声明时未指定其类型，则被识别为任意类型。

#### 联合类型

联合类型（Union Types）表示取值可以为多种类型中的一种。

```typescript
let myFavoriteNumber: string | number;
myFavoriteNumber = 'seven';
myFavoriteNumber = 7;
```

上面的代码将myFavoriteNumber定义为字符串或者数值型，在不同的语句可以切换不同的类型，但不允许是定义以外的类型。

联合类型使用 `|` 分隔每个类型。当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，我们只能访问此联合类型的所有类型里共有的属性或方法。

联合类型的变量在被赋值的时候，会根据类型推论的规则推断出一个类型,并使用该类型

```typescript
let myFavoriteNumber: string | number;
myFavoriteNumber = 'seven';
console.log(myFavoriteNumber.length); // 5
myFavoriteNumber = 7;
console.log(myFavoriteNumber.length); // 编译时报错

// index.ts(5,30): error TS2339: Property 'length' does not exist on type 'number'.
```

#### 交叉类型

交叉类型可以把现有的类型组合起来得到新的类型，从而拥有全部的属性，表示为A & B

实例

```typescript
interface IPerson {
  name: string;
  age:number;
}

interface IStudent {
  grade:number;
}

const getBio = (user:IPerson & IStudent) =>{
  return `His name is ${user.name},i am ${user.age} and Grade ${user.grade}` 
}

getBio({name:'joi',age:12,grade:6})
```

交叉类型是两个类型的并集

#### 条件类型

条件类型是在Typescrip在2.8版本加入的一个新featrue，用来表达非均匀类型，即基于某个条件下表示推断给定的可能的两种类型之一。

```typescript
type StringOnly<T> = T extends string ? never : T;
type A = StringOnly<string >; // string
type B = StringOnly<number >; // never
```



#### 模版类型

模版类型使用模版字符串的方式，将别的字面量类型作为type引入

```typescript
type World = "world";
 
type Greeting = `hello ${World}`; // type Greeting = "hello world"

type EmailLocaleIDs = "welcome_email" | "email_heading";
type FooterLocaleIDs = "footer_title" | "footer_sendoff";
 
type AllLocaleIDs = `${EmailLocaleIDs | FooterLocaleIDs}_id`; // type AllLocaleIDs = "welcome_email_id" | "email_heading_id" | "footer_title_id" | "footer_sendoff_id"

type AllLocaleIDs = `${EmailLocaleIDs | FooterLocaleIDs}_id`;
type Lang = "en" | "ja" | "pt";
 
type LocaleMessageIDs = `${Lang}_${AllLocaleIDs}`;
// type LocaleMessageIDs = "en_welcome_email_id" | "en_email_heading_id" | "en_footer_title_id" | "en_footer_sendoff_id" | "ja_welcome_email_id" | "ja_email_heading_id" | "ja_footer_title_id" | "ja_footer_sendoff_id" | "pt_welcome_email_id" | "pt_email_heading_id" | "pt_footer_title_id" | "pt_footer_sendoff_id"
```

typescript内置了一些模版类型，方便使用 大写、小写、首字母大写、首字母小写

```typescript
type Greeting = "Hello, world"
type ShoutyGreeting = Uppercase<Greeting> //type ShoutyGreeting = "HELLO, WORLD"

type QuietGreeting = Lowercase<Greeting> //type QuietGreeting = "hello, world"

type Greeting = Capitalize<LowercaseGreeting>; // type Greeting = "Hello, world"

type UncomfortableGreeting = Uncapitalize<UppercaseGreeting>; //type UncomfortableGreeting = "hELLO wORLD"
```



#### 类型别名

类型别名用来给一个类型起个新名字，常用于联合类型

```typescript
type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;
function getName(n: NameOrResolver): Name {
    if (typeof n === 'string') {
        return n;
    } else {
        return n();
    }
}
```

#### 类型断言

类型断言可以

- 联合类型可以被断言为其中一个类型
- 父类可以被断言为子类
- 任何类型都可以被断言为 any
- any 可以被断言为任何类型

要使得 `A` 能够被断言为 `B`，只需要 `A` 兼容 `B` 或 `B` 兼容 `A` 即可

类型断言好比其他语言里的类型转换，但是不进行特殊的数据检查和解构。

断言类型有两种形式，其一是尖括号语法

```typescript
let someValue:any = 'this is a string';
let strlength:number = (<string>someValue).length
```

另一种是as语法

```typescript
let someValue:any = 'this is a string';
let strlength:number = (someValue as string).length
```

类型断言在枚举值中的应用

如果写两个枚举值，在调用时通常需要使用类型断言来调用

```typescript
export enum PLAN_STATUS {
  DRAFT = 5,
  NO_START = 10,
  READY = 15,
  READY_END = 17,
  EXECUTION = 20,
  ENDED = 25,
  PAUSE = 30,
  ABNORMAL = 35,
  PUBLISHED = 100,
}

export const PLAN_STATUS_COLOR_MAP: {
  [key in PLAN_STATUS]: string;
} = {
  [PLAN_STATUS.DRAFT]: '#FFB800',
  [PLAN_STATUS.NO_START]: '#BDE8DB',
  [PLAN_STATUS.READY_END]: '#599CFF',
  [PLAN_STATUS.READY]: '#599CFF',
  [PLAN_STATUS.EXECUTION]: '#34B991',
  [PLAN_STATUS.ENDED]: STYLES_VARIABLES.textPromptColor,
  [PLAN_STATUS.PAUSE]: '#FF7A00',
  [PLAN_STATUS.ABNORMAL]: '#F82D00',
  [PLAN_STATUS.PUBLISHED]: '#599CFF',
};

PLAN_STATUS_COLOR_MAP?.[status as PLAN_STATUS]
```



#### 类型推论

如果定义的时候有赋值，typescript会自动推测出一个类型；

如果定义的时候没有赋值，不管之后有没有赋值，都会被推断成 `any` 类型而完全不被类型检查;

```typescript
//定义时有赋值，自动推测出类型，之后赋值为别的类型会报错
let myFavoriteNumber = 'seven';
myFavoriteNumber = 7;

// index.ts(2,1): error TS2322: Type 'number' is not assignable to type 'string'.
//定义时无赋值，类型为any，不会报错
let myFavoriteNumber;
myFavoriteNumber = 'seven';
myFavoriteNumber = 7;
```

### 泛型

泛型（Generics）是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性。

```typescript
function createArray<T>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}

createArray<string>(3, 'x'); // ['x', 'x', 'x']
```

在函数名后添加 `<T>`，其中 `T` 用来指代任意输入的类型，然后在后面的输入 `value: T` 和输出 `Array<T>` 中即可使用了。

接着在调用的时候，可以指定它具体的类型为 `string`。或者也可以不手动指定，而让类型推论自动推算出来

也可以指定泛型的默认类型，这样如果调用时没用指定类型，则使用默认类型

```typescript
//在function中指定默认类型，在调用时没有指定的话即为默认类型
function createArray<T = string>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}
createArray(3, 'x'); // ['x', 'x', 'x']
```

定义泛型时，也可以一次定义多个泛型类型参数，

```typescript
function swap<T, U>(tuple: [T, U]): [U, T] {
    return [tuple[1], tuple[0]];
}

swap([7, 'seven']); // ['seven', 7]
```

虽然泛型没有指定数据结构，但是可以通过接口规定泛型的属性和方法，传入参数时进行属性校验，在内部操作时也可以直接操作属性而不会出现没有属性或者方法报错的情况。此外参数之间也可以互相继承。

```typescript
interface Lengthwise {
    length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);
    return arg;
}
```

箭头函数使用泛型

```typescript
const foo = <T>(x: T) => T; // Error: T 标签没有关闭
const foo = <T extends {}>(x: T) => x;
```



泛型接口与泛型类

泛型还可以用于定义接口和类

```typescript
interface CreateArrayFunc<T> {
    (length: number, value: T): Array<T>;
}

let createArray: CreateArrayFunc<any>;
createArray = function<T>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}

createArray(3, 'x'); // ['x', 'x', 'x']

class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y) { return x + y; };
```

`T` 代表 **Type**，在定义泛型时通常用作第一个类型变量名称。但实际上 `T` 可以用任何有效名称代替。除了 `T` 之外，以下是常见泛型变量代表的意思：

- K（Key）：表示对象中的键类型；
- V（Value）：表示对象中的值类型；
- E（Element）：表示元素类型。



### 新增基本类型

#### 元组

数组合并了相同类型的对象，而元组（Tuple）合并了不同类型的对象。

```typescript
let tom: [string, number] = ['Tom', 25];
```

当直接对元组类型的变量进行初始化或者赋值的时候，需要提供所有元组类型中指定的项。

```typescript
let tom: [string, number];
tom = ['Tom']; //// Property '1' is missing in type '[string]' but required in type '[string, number]'.

tom = ['Tom', 25];
```

当添加越界的元素时，它的类型会被限制为元组中每个类型的联合类型

```typescript
let tom: [string, number];
tom = ['Tom', 25];
tom.push('male');
tom.push(true); // Argument of type 'true' is not assignable to parameter of type 'string | number'.
```



#### 枚举

TypeScript 的枚举类型的概念来源于C#

枚举（Enum）类型用于取值被限定在一定范围内的场景，比如一周只能有七天，颜色限定为红绿蓝等。

```typescript
export enum Days {Sun, Mon, Tue, Wed, Thu, Fri, Sat};
```

默认情况下，枚举成员会被赋值为从 `0` 开始递增的数字，同时也会对枚举值到枚举名进行反向映射

```typescript
enum Days {Sun, Mon, Tue, Wed, Thu, Fri, Sat};

console.log(Days["Sun"] === 0); // true
console.log(Days["Mon"] === 1); // true
console.log(Days["Tue"] === 2); // true
console.log(Days["Sat"] === 6); // true

console.log(Days[0] === "Sun"); // true
console.log(Days[1] === "Mon"); // true
console.log(Days[2] === "Tue"); // true
console.log(Days[6] === "Sat"); // true
```

外部枚举（Ambient Enums）是使用 `declare enum` 定义的枚举类型：

```typescript
declare enum Directions {
    Up,
    Down,
    Left,
    Right
}
```

`declare` 定义的类型只会用于编译时的检查，编译结果中会被删除。

外部枚举和非外部枚举之间有一个重要的区别，在正常的枚举里，没有初始化方法的成员被当成常数成员。 对于非常数的外部枚举而言，没有初始化方法时被当做需要经过计算的。

enum和const enum

enum可以进行反向查找，所以遍历得到的长度是预计长度的两倍, const enum不可以进行反向查找，所以得到的是预计长度

```typescript
enum REVERSE{
    OK,
    NO 
}

console.log(REVERSE.OK)
// OK
console.log(REVERSE[0])
// OK

// of不可以，警告需要有[Symbol.iterator]方法
for(let item in REVERSE){
    // 0 1 OK NO
    console.log(item);
}

const enum ONE{
    OK,
    NO 
}
console.log(ONE.OK)
// 报错:只有使用字符串文本才能访问常数枚举成员。
// console.log(ONE[0]);

// 遍历
// 报错:"const" 枚举仅可在属性、索引访问表达式、导入声明的右侧、导出分配或类型查询中使用。
/* for(let item in ONE){

} */
```

##### 异构枚举

从技术的角度来说，枚举可以混合字符串和数字成员

```typescript
enum BooleanLikeHeterogeneousEnum {
    No = 0,
    Yes = "YES",
}
```

##### 反向映射

除了创建一个以属性名做为对象成员的对象之外，数字枚举成员还具有了 *反向映射*，从枚举值到枚举名字。

```typescript
enum Enum {
    A
}
let a = Enum.A;
let nameOfA = Enum[a]; // "A"
```

生成的代码中，枚举类型被编译成一个对象，它包含了正向映射（ `name` -> `value`）和反向映射（ `value` -> `name`）。 引用枚举成员总会生成为对属性访问并且永远也不会内联代码。

要注意的是 *不会*为字符串枚举成员生成反向映射。



#### never

never是typescript的底层类型，他常用于

1.不会有返回值的函数

2.总是抛出错误的函数

never准确来说是不应该出现的类型

never可以用来收缩类型

比如有一个联合类型，而在 switch 当中判断 该类型的type，TS 是可以收窄类型的 (discriminated union)

```typescript
interface Foo {
  type: 'foo'
}

interface Bar {
  type: 'bar'
}

type All = Foo | Bar

function handleValue(val: All) {
  switch (val.type) {
    case 'foo':
      // 这里 val 被收窄为 Foo
      break
    case 'bar':
      // val 在这里是 Bar
      break
    default:
      // val 在这里是 never
      const exhaustiveCheck: never = val
      break
  }
}
```

如果有一天有人修改 All 的类型，比如加了一种类型

```typescript
type All = Foo | Bar | Baz
```

然而他忘记了在 switch中 加上针对新加类型 Baz 的处理逻辑，这个时候在 default branch 里面 val 会被收窄为 Baz，导致无法赋值给 never，产生一个编译错误。所以通过这个办法，你可以确保 handleValue 总是穷尽 (exhaust) 了所有 All 的可能类型。

详见yyx的知乎回答：https://www.zhihu.com/search?type=content&q=ts%20never

#### unkown



### interface

在面向对象语言中，接口（Interfaces）是一个很重要的概念，它是对行为的抽象，而具体如何行动需要由类或者对象去实现（implement）。

#### 可配置属性

接口中可以包含确定属性、可选属性、任意属性、只读属性四种属性

确定属性是指变量由接口生成时，接口中的确定属性不能多，也不能少；

可选属性在接口中规定后，在变量中可以写可以不写；

任意属性是指在接口定义时允许变量自定义属性，这时要在接口中定义任意属性；任意属性的类型必须是确定属性和可选属性的母集，且一个接口只能使用一个任意属性，如果接口中有多个类型的属性，则可以在任意属性中使用联合类型：

只读属性是指对象中的一些字段只能在创建的时候被赋值，那么可以用 `readonly` 定义只读属性。

typescript使用接口（Interfaces）来定义对象的类型。接口是对行为的抽象，而具体如何行动需要由类（classes）去实现（implement）。

```typescript
interface Person {
    name: string;
    age: number;
}

let tom: Person = {
    name: 'Tom',
    age: 25
};
```

上面的代码中，我们定义了一个接口 `Person`，接着定义了一个变量 `tom`，它的类型是 `Person`。这样，我们就约束了 `tom` 的形状必须和接口 `Person` 一致。

一般情况下，定义的变量比接口少了一些属性是不允许的，多一些属性也是不允许的，会报错：

```typescript
let tom: Person = {
    name: 'Tom'
};
// index.ts(6,5): error TS2322: Type '{ name: string; }' is not assignable to type 'Person'.
let tom: Person = {
    name: 'Tom',
    age: 25,
    gender: 'male'
};
// index.ts(9,5): error TS2322: Type '{ name: string; age: number; gender: string; }' is not assignable to type 'Person'.
```

可以设置可选属性、任意属性、只读属性。

可选属性为接口定义而对象可以不引用，

任意属性是接口不指定而对象可以添加，

只读属性是接口定义后在对象第一次初始化时添加，其后不能更改。

利用可选属性可以进行部分继承

```typescript
interface Person {
    readonly id: number;
    name: string;
    age?: number;  // age为可选属性
    [propName: string]: any;
}

let tom: Person = {
    id: 89757,
    name: 'Tom',
    gender: 'male'
};
```

#### 可实现接口类型

接口可以定义对象，设置需要存在的普通属性

```typescript
interface Person {
    name: string
    bool?: boolean
    readonly timestamp: number
    readonly arr: ReadonlyArray<number> // 此外还有 ReadonlyMap/ReadonlySet
}

let p1: Person = {
    name: 'oliver',
    bool: true, // ✔️️ 可以设置可选属性 并非必要的 可写可不写
    timestamp: + new Date(), // ✔️ 设置只读属性
    arr: [1, 2, 3] // ✔️ 设置只读数组
}

```

Interface 还可以用来规范函数的形状。Interface 里面需要列出参数列表返回值类型的函数定义。

```typescript
interface Func {
    // ✔️ 定于这个函数接收两个必选参数都是 number 类型，以及一个可选的字符串参数 desc，这个函数不返回任何值
    (x: number, y: number, desc?: string): void
}

const sum: Func = function (x, y, desc = '') {
    
    // ts类型系统默认推论可以不必书写上述类型定义
    console.log(desc, x + y)
}

// 上述函数等于：const sum: Func = function (x: number, y: number, desc: string): void {}
```

interface 还可以用来定义可索引类型的接口,比如数组或者对象。需要注意的是 index 只能为 number 类型或 string 类型

```typescript
interface StringSet {
    readonly [index: number]: string // ❗ 需要注意的是 index 只能为 number 类型或 string 类型
    length: number // ✔️ 还可以指定属性
}

let arr1: StringSet = ['hello', 'world']
arr1[1] = '' // ✔️ 可以设置为只读防止给索引赋值
let arr: StringSet = [23,12,3,21] // ❌ 数组应为 string 类型
```

接口除了定义变量，还可以在类中使用，用来实现类的共性接口。由类继承时一般同时定义静态属性接口和实例属性接口进行检查

```typescript
// PersonConstructor 是用来检查静态部分的
interface PersonConstructor {
    new (name: string, age: number)   // 用来检查 constructor 的
    typename: string                  // 用来检查静态属性 typename 的
    logname(): void                   // 用来检查静态方法 logname 的
}
// PersonInterface 则是用来检查实例部分的
interface PersonInterface {
    // new (name: string, age: number) // ❌ 静态方法的检查也不能写在这里 这样写是错误的
    log(): void // : 这里定义了实例方法 log
}

// class Person implements PersonInterface, PersonInterface { ❌ 这样写是错误的
const Person: PersonConstructor = class Person implements PersonInterface {
    name: string
    age: number
    static typename = 'Person type'    // 这里定义 typename 的静态属性
    static logname() {                 // 这里定义 logname 的静态方法
        console.log(this.typename)
    }
    constructor(name: string, age: number) { // constructor 也是静态方法
        this.name = name
        this.age = age
    }
    log() { // log 是实例方法
        console.log(this.name, this.age)
    }
}
```

在同一个接口中可以同时定义多种类型，比如函数或者属性，继承该接口时所有的属性一起继承

```typescript
interface Counter {
    (start: number): void // 1️⃣ 如果只有这一个那么这个接口是函数接口
    add(): void // 2️⃣ 这里还有一个方法，那么这个接口就是混合接口
    log(): number // 3️⃣ 这里还有另一个方法
}

function getCounter(): Counter { // ⚠️ 它返回的函数必须符合接口的三点
    let count = 0
    function counter (start: number) { count = start } // counter 方法函数
    counter.add = function() { count++ } // add 方法增加 count
    counter.log = function() { return count } // log 方法打印 count
    return counter
}

const c = getCounter()
c(10) // count 默认为 10
c.add()
console.log(c.log())
```

接口可以继承接口，可以继承父接口的所有方法

```typescript
interface PersonInfoInterface { // 第一个接口
    name: string
    age: number
    log?(): void
}

interface Student extends PersonInfoInterface { //  这里继承了一个接口
    doHomework(): boolean    //  新增一个方法
}
interface Teacher extends PersonInfoInterface { //  这里继承了同一个接口
    dispatchHomework(): void // 新增了一个方法
}

interface Emmm extends Student, Teacher // 也可以继承多个接口

let Alice: Teacher = {
    name: 'Alice',
    age: 34,
    dispatchHomework() { // ✔️ 必须满足继承的接口规范
        console.log('dispatched')
    }
}

let oliver: Student = {
    name: 'oliver',
    age: 12,
    log() {
        console.log(this.name, this.age)
    },
    doHomework() { // ✔️ 必须满足继承的接口规范
        return true
    }
}
```

接口还可以继承类，再由新类继承接口时同时也继承了接口所继承的类

```typescript
class Person {
    type: string // ❗️这里是类的描述
}
// Child 接口继承了 Person 对 type 的描述，还定义了 Child 接口本身 log 的描述
interface Child extends Person { // ❗️Child 接口继承自 Person 类，因此规范了 type 属性
    log(): void
    // 这里其实有一个 type: string
}

// 🥇 第一种写法
class Girl implements Child {
    type: 'child' // 接口继承自 Person 的
    log() {} // 接口本身规范的
}

// 🥈 第二种写法
class Boy extends Person implements Child { // 首先 extends 了 Person 类，然后还需满足 Child 接口的描述
    type: 'child'
    log() {}
}
```



#### 接口注意事项

接口(interface)定义了“公共(public)”契约(Contract)，因此在接口(interface)上具有`protected`或`private`访问修饰符没有任何意义，更多的是实现细节

使用read-only访问修饰符

```typescript
interface IModuleMenuItem {
     readonly name : string;
}

class ModuleMenuItem implements IModuleMenuItem {
    public readonly name : string;

    constructor() {
        name = "name";
    }
}
```

#### 接口和类的区别

接口只规定类的形状，也就是类具有哪些属性和方法，不具体实现这些属性和方法

实例

```typescript
interface ContentInterface{
  //定义方法名称和返回类型
  getContent():String;
}
//可以使用不同的方式实现
class Article implements ContentInterface{
   public function getContent():String{
     return 'i am a article'
   }
}

class Passage implements ContentInterface{
   public function getContent():String{
     return 'i am a passage'
   }
}

class News implements ContentInterface{
  //没有实现getContent方法会报错
}

let a = new Article();
let p = new Passage();

print(a)
print(p)
```

### 类class

TypeScript 除了实现了所有 ES6 中的类的功能以外，还添加了一些新的用法。

类的相关概念

- 类（Class）：定义了一件事物的抽象特点，包含它的属性和方法
- 对象（Object）：类的实例，通过 `new` 生成
- 面向对象（OOP）的三大特性：封装、继承、多态
- 封装（Encapsulation）：将对数据的操作细节隐藏起来，只暴露对外的接口。外界调用端不需要（也不可能）知道细节，就能通过对外提供的接口来访问该对象，同时也保证了外界无法任意更改对象内部的数据
- 继承（Inheritance）：子类继承父类，子类除了拥有父类的所有特性外，还有一些更具体的特性
- 多态（Polymorphism）：由继承而产生了相关的不同的类，对同一个方法可以有不同的响应。比如 `Cat` 和 `Dog` 都继承自 `Animal`，但是分别实现了自己的 `eat` 方法。此时针对某一个实例，我们无需了解它是 `Cat` 还是 `Dog`，就可以直接调用 `eat` 方法，程序会自动判断出来应该如何执行 `eat`
- 存取器（getter & setter）：用以改变属性的读取和赋值行为
- 修饰符（Modifiers）：修饰符是一些关键字，用于限定成员或类型的性质。比如 `public` 表示公有属性或方法
- 抽象类（Abstract Class）：抽象类是供其他类继承的基类，抽象类不允许被实例化。抽象类中的抽象方法必须在子类中被实现
- 接口（Interfaces）：不同类之间公有的属性或方法，可以抽象成一个接口。接口可以被类实现（implements）。一个类只能继承自另一个类，但是可以实现多个接口

类的属性和方法



类的继承



TypeScript 可以使用三种访问修饰符（Access Modifiers），分别是 `public`、`private` 和 `protected`。

- `public` 修饰的属性或方法是公有的，可以在任何地方被访问到，默认所有的属性和方法都是 `public` 的
- `private` 修饰的属性或方法是私有的，不能在声明它的类的外部访问，在子类中也是不允许访问的。该类不允许被继承或者实例化：
- `protected` 修饰的属性或方法是受保护的，它和 `private` 类似，区别是它在子类中也是允许被访问的，且该类只允许被继承，不能被实例化

`abstract` 用于定义抽象类和其中的抽象方法。抽象类是不允许被实例化的，抽象类中的抽象方法必须被子类实现：



### 声明语句与声明文件、声明合并

假如我们想使用第三方库 jQuery，一种常见的方式是在 html 中通过 `<script>` 标签引入 jQuery，然后就可以使用全局变量 `$` 或 `jQuery` 了。

但是在 ts 中，编译器并不知道 `$` 或 `jQuery` 是什么东西[1](https://github.com/xcatliu/typescript-tutorial/tree/master/examples/declaration-files/01-jquery)：

这时，我们需要使用 `declare var` 来定义它的类型

通常我们会把声明语句放到一个单独的文件（`jQuery.d.ts`）中，这就是声明文件。声明文件必需以 `.d.ts` 为后缀。一般来说，ts 会解析项目中所有的 `*.ts` 文件，当然也包含以 `.d.ts` 结尾的文件。所以当我们将 `jQuery.d.ts` 放到项目中时，其他所有 `*.ts` 文件就都可以获得 `jQuery` 的类型定义了。

假如仍然无法解析，那么可以检查下 `tsconfig.json` 中的 `files`、`include` 和 `exclude` 配置，确保其包含了 `jQuery.d.ts` 文件。

TS可以在编译时自动生成.d.ts文件，只需要在tsconfig.json配置文件中开启即可

```json
{
  "compilerOptions": {
    "declaration": true
  }
}
```

一般只有三种情况需要手动定义声明文件：

1.通过script标签引入第三方库

2.使用的第三方npm包没有提供声明文件

3.自己团队内比较优秀的js库或者插件，为了提升开发体验

声明文件只是对类型的定义，不能赋值

如果定义了同名的函数、类、接口，typescript会自动合并。接口的属性和方法都支持合并

```typescript
interface Alarm{
  price: number;
  alert(s:string):string;
};
interface Alarm{
  weight: number;
  alert(s:string,n:number):string;
}
//相当于
interface Alarm{
  price: number;
  alert(s:string):string;
  weight: number;
  alert(s:string,n:number):string;
}
```

合并时属性可以重复，但是不能有冲突，否则会报错。

```typescript
interface Alarm{
  price: number;
};
interface Alarm{
  price: number;//可以
  weight: number;
};
interface Alarm{
  price: string;//报错
}
```

类的合并和接口的合并类似

对于没有提供声明文件的npm包，可以创建一个types目录，来管理自己写的声明文件，同时在配置文件tsconfig.json中的paths和baseUrl配置

```json
{
  "compilerOptions": {
    "module": "commonjs",
    "baseUrl": "./",
    "paths": {"*":["types/*"]}
  }
}
```

npm包的声明文件主要有以下几种语法

```typescript
export const/let
export namespace
export default
export = 
```



### 命名空间

在 JavaScript 使用命名空间时， 这有一个常用的、方便的语法：

```javascript
(function(something) {
  something.foo = 123;
})(something || (something = {}));

console.log(something);
// { foo: 123 }

(function(something) {
  something.bar = 456;
})(something || (something = {}));

console.log(something); // { foo: 123, bar: 456 }
```

在确保创建的变量不会泄漏至全局命名空间时，这种方式在 JavaScript 中很常见。当基于文件模块使用时，你无须担心这点，但是该模式仍然适用于一组函数的逻辑分组。因此 TypeScript 提供了 `namespace` 关键字来描述这种分组，

```typescript
namespace Utility {
  export function log(msg) {
    console.log(msg);
  }
  export function error(msg) {
    console.log(msg);
  }
}

// usage
Utility.log('Call me');
Utility.error('maybe');
```

值得注意的一点是，命名空间是支持嵌套的。因此，你可以做一些类似于在 `Utility` 命名空间下嵌套一个命名空间 `Messaging` 的事情。



