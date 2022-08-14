---
title: JavaScript开发（七）-TS开发（二）
date: 2021-01-21 21:40:33
categories: IT
tags:
    - IT，Web
toc: true
thumbnail: http://cdn.kunkunzhang.top/typescript.jpg
---

万万没想到会来到第七篇，第七篇主要对TypeScript的应用作一些说明和示例，算进阶篇。

<!--more-->

## 工具泛型

### Key/Keyof

`keyof` 可以用来取得一个对象接口的所有 `key` 值.in 则可以遍历枚举类型

```typescript
interface Foo {
  name: string;
  age: number
}
type T = keyof Foo // -> "name" | "age"

type Keys = "a" | "b"
type Obj =  {
  [p in Keys]: any
} // -> { a: any, b: any }
```

`keyof` 产生联合类型, `in` 则可以遍历枚举类型, 所以他们经常一起使用

keyof配合泛型使用

```typescript
interface IProps<T> {
    tableProps: Pick<TableProps<T>, keyof TableProps<T>>;
}
```

keyof配合typeof使用

```typescript
const defaultProps = {
    name: '张三',
    age: 18
}

const selfKey: keyof typeof defaultProps = 'name'; // right
const selfKey: keyof typeof defaultProps = 'age'; // right
const selfKey: keyof typeof defaultProps = 'other'; // error
```

### partial

Partial 作用是将传入的属性变为可选项.
首先我们需要理解两个关键字 `keyof` 和 `in`, `keyof` 可以用来取得一个对象接口的所有 `key` 值.

```typescript
type Partial<T> = { [P in keyof T]?: T[P] };
```

### required

Required 的作用是将传入的属性变为必选项, 源码如下

```typescript
type Required<T> = { [P in keyof T]-?: T[P] };
```

### readonly(只读)

typescript类型系统允许在一个接口中使用readonly来标记属性，也就是只读的方式，不可预期的改变是很糟糕的。

可以在接口、类中用此方法定义

```typescript
type Readonly<T> = { readonly [P in keyof T]: T[P] };
```

### Mutable

将 T 的所有属性的 readonly 移除,

```typescript
type Mutable<T> = {
  -readonly [P in keyof T]: T[P]
}
```

### record

将 K 中所有的属性的值转化为 T 类型

```typescript
type Record<K extends keyof any, T> = { [P in K]: T };
```

### pick

从 T 中取出 一系列 K 的属性

```typescript
type Pick<T, K extends keyof T> = { [P in K]: T[P] };
```

### omit

用之前的 Pick 和 Exclude 进行组合, 实现忽略对象某些属性功能, 

```typescript
type Omit<T, K> = Pick<T, Exclude<keyof T, K>>

// 使用
type Foo = Omit<{name: string, age: number}, 'name'> // -> { age: number }
```

### exclude

Exclude 的作用是从 T 中找出 U 中没有的元素, 换种更加贴近语义的说法其实就是从T 中排除 U

```typescript
type T = Exclude<1 | 2, 1 | 3> // -> 2
```

### extract

Extract 的作用是提取出 T 包含在 U 中的元素, 换种更加贴近语义的说法就是从 T 中提取出 U

```typescript
type Extract<T, U> = T extends U ? T : never;
```

### NonNullable<T>

排除T为null或者undefined的情况

```typescript
type T = NonNullable<string | string[] | null | undefined>; //string | string[] 
```



### infer关键字与Returntype

官方类型库中提供了ReturnType可以获取方法的返回类型，实例

```typescript
type stringPromiseReturnType = ReturnType<typeof stringPromise>;
```

Returntype的定义如下

```typescript
type ReturnType<T extends (...args:any) => any >= T extends(...args:any)=> infer R?R:any;
```

利用infer反解promise中的泛型

```typescript 
type PromiseType<T> = (args:any[]) => Promise<T>;
type UnPromisify<T> = T extends PromiseType<infer U>? U:never
```

也可以解析函数入参的类型

```typescript
type VariadicFn<A extends 
```



```typescript
type FunctionReturnType<T> = T extends (...args: any[]) => infer R ? R : T;

type Foo = FunctionReturnType<() => void>;  // void
type Bar = FunctionReturnType<(name: string) => string>; // string
type Buz = FunctionReturnType<(name: string, other: string) => boolean>; // boolean
```



## 函数重载与方法重载

js 因为是动态类型，本身不需要支持重载，直接对参数进行类型判断即可，但是ts为了保证类型安全，支持了函数签名的类型重载

如在JavaScript中：

```javascript
function add(x, y) {
  return x + y;
}

add(1, 2); // 3
add("1", "2"); //"12"
```

由于 TypeScript 是 JavaScript 的超集，因此以上的代码可以直接在 TypeScript 中使用，但当 TypeScript 编译器开启 `noImplicitAny` 的配置项时，以上代码会提示以下错误信息：

```typescript
Parameter 'x' implicitly has an 'any' type.
Parameter 'y' implicitly has an 'any' type.
```

该信息告诉我们参数 x 和参数 y 隐式具有 `any` 类型。为了解决这个问题，我们可以为参数设置一个类型。因为我们希望 `add` 函数同时支持 string 和 number 类型，因此我们可以定义一个 `string | number` 联合类型，然后在函数中使用

```typescript
type Combinable = string | number;

function add(a: Combinable, b: Combinable) {
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString();
  }
  return a + b;
}
```

但是此时如果在结果中使用字符串函数会报错

```typescript
const result = add('semlinker', ' kakuqo');
result.split(' ');

// Property 'split' does not exist on type 'Combinable'.
// Property 'split' does not exist on type 'number'.
```

`Combinable` 和 `number` 类型的对象上并不存在 `split` 属性。这时我们就可以利用 TypeScript 提供的函数重载。

函数重载或方法重载是使用相同名称和不同参数数量或类型创建多个方法的一种能力。

```typescript
function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: string, b: number): string;
function add(a: number, b: string): string;
function add(a: Combinable, b: Combinable) {
  // type Combinable = string | number;
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString();
  }
  return a + b;
}
```

方法重载是指在同一个类中方法同名，参数不同（参数类型不同、参数个数不同或参数个数相同时参数的先后顺序不同），调用时根据实参的形式，选择与它匹配的方法执行操作的一种技术。所以类中成员方法满足重载的条件是：在同一个类中，方法名相同且参数列表不同。

```typescript
class Calculator {
  add(a: number, b: number): number;
  add(a: string, b: string): string;
  add(a: string, b: number): string;
  add(a: number, b: string): string;
  add(a: Combinable, b: Combinable) {
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString();
  }
    return a + b;
  }
}

const calculator = new Calculator();
const result = calculator.add('Semlinker', ' Kakuqo');
```

当 TypeScript 编译器处理函数重载时，它会查找重载列表，尝试使用第一个重载定义。 如果匹配的话就使用这个。 因此，在定义重载的时候，一定要把最精确的定义放在最前面。另外在 Calculator 类中，`add(a: Combinable, b: Combinable){ }` 并不是重载列表的一部分，因此对于 add 成员方法来说，我们只定义了四个重载方法。

## 声明语句与声明文件、声明合并

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

声明文件有全局的类型声明和局部的类型声明两种。

`.d.ts` 里面，没有使用 `import`、`export`，默认是全局的。全局的类型声明在项目的任何地方都可以直接使用，无需引入。但是要特别注意类型命名冲突。在 `.d.ts` 文件中，只要有一个类型定义使用了 `export`，那这个声明文件就会变成模块化的。想要使用里面的类型定义，需要先通过 `import` 的方式将其引入才行。

以react的ts声明文件为例

```typescript
// @types/react/index.d.ts
 
export = React;
export as namespace React;

declare namespace React {
    type ReactType<P = any> = ElementType<P>;
    ...
}
```

导出的都是以一个以原库同名的命名空间。引用库时相当于也把它的类型声明也引进来了，当然在使用的时候，会自动提示

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

### 复用公共的接口/类型

对于那些同一个类型，可能会在项目中的其它地方用到的，复用类型是一个不错的选择

全局的类型：直接放在最外层的 `global.d.ts` 或者 `typing.d.ts`中，不使用 `export` 导出

模块级的类型。在每个功能模块下，定义一个 `index.d.ts` 文件。在这个文件中写需要复用的类型定义。再通过 `export` 的方式将其导出。在需要使用类型的地方，再通过 `import` 导入使用。

- `antd` 在每个独立的模块文件夹下面多了一个`index.d.ts`，见 `node_modules/antd/lib` 下面
- `react-bulma-components 1.1k` 在每个独立的模块文件夹下面多了一个`index.d.ts`
- `swiper` - `27.6k star`，公共的单独放于 `types` 文件夹里面，其它的和文件同级，添加 `文件名.d.ts` 文件

```typescript
// typing.d.ts 全局的

interface IObject {
    [name: string]: any;
}

declare type IResponse = {
    total: number;
    list: IObject[];
}

// index.d.ts 局部的
export type IRecord = {
    id: number;
    name: string;
    hasBrother: boolean;
}

export type INewRecord = IRecord & {
    num: number;
}

// person.tsx
// IRecord, INewRecord 需要引入才能使用
import { IRecord, INewRecord } from 'index.d';

// IResponse 直接使用
const res: IResponse = await api.get('****');

const newList: INewRecord = IResponse.list.map((item: IRecord) => ({ ...item, num: Math.random() }))
```



## 命名空间

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



## 一些特殊用法

### typeof与类型别名混用

```typescript
const defaultProps = {
    name: '张三',
    age: 18,
    score: 722,
}

type IProps = typeof defaultProps & {
    favorite: [string];
}

等价于：

type IProps = {
    name: string;
    age: number;
    score: number;
    favorite: [string];
}
```

### promise类型

在异步操作时常常会使用async函数，函数调用时会return一个promise对象，可以使用then方法添加回调函数

```typescript
interface IResponse<T> {
  message: string,
  result: T,
  success: boolean,
}
  
async function getResult (): Promise<IResponse<number[]>> {
  return {
    message: 'success',
    result: [1,2,3],
    success: true
  }
}

getResult()
	.then(result => {
		console.log(result.result)
	})
```



### 动态分配属性

在 JavaScript 中，我们可以很容易地为对象动态分配属性，但是在typescript中直接给对象添加属性会报错，这个时候需要使用一种宽松的属性对象

```typescript
let developer = {};
developer.name = "semlinker";

//Property 'name' does not exist on type '{}'.(2339) 
interface LooseObject {
  [key: string]: any
}

let developer: LooseObject = {};
developer.name = "semlinker";
```



### 索引签名

JavaScript 在一个对象类型的索引签名上会隐式调用 `toString` 方法，而在 TypeScript 中，为防止初学者砸伤自己的脚（我总是看到 stackoverflow 上有很多 JavaScript 使用者都会这样。），它将会抛出一个错误。

```typescript
const obj = {
  toString() {
    return 'Hello';
  }
};

const foo: any = {};

// ERROR: 索引签名必须为 string, number....
foo[obj] = 'World';

// FIX: TypeScript 强制你必须明确这么做：
foo[obj.toString()] = 'World';
```

声明索引签名

```typescript
const foo: {
  [index: string]: { message: string };
} = {};

// 储存的东西必须符合结构
// ok
foo['a'] = { message: 'some message' };

// Error, 必须包含 `message`
foo['a'] = { messages: 'some message' };

// 读取时，也会有类型检查
// ok
foo['a'].message;

// Error: messages 不存在
foo['a'].messages;
```

当你声明一个索引签名时，所有明确的成员都必须符合索引签名

这可以给你提供安全性，任何以字符串的访问都能得到相同结果。

```typescript
// ok
interface Foo {
  [key: string]: number;
  x: number;
  y: number;
}

// Error
interface Bar {
  [key: string]: number;
  x: number;
  y: string; // Error: y 属性必须为 number 类型
}

type Index = 'a' | 'b' | 'c';
type FromIndex = { [k in Index]?: number };
```

在 JavaScript 社区你将会见到很多滥用索引签名的 API。如 JavaScript 库中使用 CSS 的常见模式

```typescript
interface NestedCSS {
  color?: string; // strictNullChecks=false 时索引签名可为 undefined
  [selector: string]: string | NestedCSS;
}

const example: NestedCSS = {
  color: 'red',
  '.subclass': {
    color: 'blue'
  }
};

// 尽量不要使用这种把字符串索引签名与有效变量混合使用。如果属性名称中有拼写错误，这个错误不会被捕获到,比如下面这样

const failsSilently: NestedCSS = {
  colour: 'red' // 'colour' 不会被捕捉到错误
};
```

可以用索引签名的嵌套避免这种滥用，我们把索引签名分离到自己的属性里，如命名为 `nest`（或者 `children`、`subnodes` 等）

```typescript
interface NestedCSS {
  color?: string;
  nest?: {
    [selector: string]: NestedCSS;
  };
}

const example: NestedCSS = {
  color: 'red',
  nest: {
    '.subclass': {
      color: 'blue'
    }
  }
}

const failsSliently: NestedCSS {
  colour: 'red'  // TS Error: 未知属性 'colour'
}
```

你需要把属性合并至索引签名，可以使用交叉类型

```typescript
type FieldState = {
  value: string;
};

type FormState = { isValid: boolean } & { [fieldName: string]: FieldState };
```



### 空值合并运算符

??

### 非空断言操作符

非空断言操作符会从变量中移除 undefined 和 null，在变量后面添加一个 ! 就会忽略 undefined 和 null

```typescript
function simpleExample(a: number | undefined) {
   const b: number = a; // 报错，COMPILATION ERROR: undefined is not assignable to number.
   const c: number = a!; // OK
}
```

这种操作符在传递可选props、后端加载数据或者ref取dom时会使用比较频繁，因为这三种情况需要等浏览器加载dom或者组件，值可能为空，如果不使用非空断言操作符，这些情况需要手动添加undefined｜null类型或者使用if/三目运算符进行判断，比较麻烦

```typescript
const ScrolledInput = () => {
   const ref = React.createRef<HTMLInputElement>();

   // const goToInput = () => ref.current.scrollIntoView(); //compilation error: ref.current is possibly null
   const goToInput = () => ref.current!.scrollIntoView();
   return (
       <div>
           <input ref={ref}/>
           <button onClick={goToInput}>Go to Input</button>
       </div>
   );
};
```



## 代码检查

### Es-lint

安装es-lint

```shell
npm install --save-dev eslint
```

由于 ESLint 默认使用 [Espree](https://github.com/eslint/espree) 进行语法解析，无法识别 TypeScript 的一些语法，故我们需要安装 [`@typescript-eslint/parser`](https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/parser)，替代掉默认的解析器，别忘了同时安装 `typescript`：

```shell
npm install --save-dev typescript @typescript-eslint/parser
```

接下来需要安装对应的插件 [@typescript-eslint/eslint-plugin](https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin) 它作为 eslint 默认规则的补充，提供了一些额外的适用于 ts 语法的规则。

```shell
npm install --save-dev @typescript-eslint/eslint-plugin
```

创建自己的规则

ESLint 需要一个配置文件来决定对哪些规则进行检查，配置文件的名称一般是 `.eslintrc.js` 或 `.eslintrc.json`。

当运行 ESLint 的时候检查一个文件的时候，它会首先尝试读取该文件的目录下的配置文件，然后再一级一级往上查找，将所找到的配置合并起来，作为当前被检查文件的配置。

```javascript
module.exports = {
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    rules: {
        // 禁止使用 var
        'no-var': "error",
        // 优先使用 interface 而不是 type
        '@typescript-eslint/consistent-type-definitions': [
            "error",
            "interface"
        ]
    }
}
```

执行检查

我们的项目源文件一般是放在 `src` 目录下，所以需要将 `package.json` 中的 `eslint` 脚本改为对一个目录进行检查。由于 `eslint` 默认不会检查 `.ts` 后缀的文件，所以需要加上参数 `--ext .ts`：

```javascript
{
    "scripts": {
        "eslint": "eslint src --ext .ts"
    }
}
```

此时执行 `npm run eslint` 即会检查 `src` 目录下的所有 `.ts` 后缀的文件。

在 VSCode 中集成 ESLint 检查[§](https://ts.xcatliu.com/engineering/lint.html#在-vscode-中集成-eslint-检查)

在编辑器中集成 ESLint 检查，可以在开发过程中就发现错误，甚至可以在保存时自动修复错误，极大的增加了开发效率。

要在 VSCode 中集成 ESLint 检查，我们需要先安装 ESLint 插件，点击「扩展」按钮，搜索 ESLint，然后安装即可。

VSCode 中的 ESLint 插件默认是不会检查 `.ts` 后缀的，需要在「文件 => 首选项 => 设置 => 工作区」中（也可以在项目根目录下创建一个配置文件 `.vscode/settings.json`），添加以下配置：

```json
{
    "eslint.validate": [
        "javascript",
        "javascriptreact",
        "typescript"
    ],
    "typescript.tsdk": "node_modules/typescript/lib"
}
```

此时打开ts文件，在错误处就会有提示

### Prettier 

ESLint 包含了一些代码格式的检查，比如空格、分号等。但前端社区中有一个更先进的工具可以用来格式化代码，那就是 [Prettier](https://prettier.io/)。

Prettier 聚焦于代码的格式化，通过语法分析，重新整理代码的格式，让所有人的代码都保持同样的风格。

安装Prettier

```shell
npm install --save-dev prettier
```

然后创建一个 `prettier.config.js` 文件，里面包含 Prettier 的配置项。Prettier 的配置项很少，这里我推荐大家一个配置规则，作为参考：

```js
// prettier.config.js or .prettierrc.js
module.exports = {
    printWidth: 100,  		   // 一行最多 100 字符
    tabWidth: 4,      			 // 使用 4 个空格缩进
    useTabs: false,  				 // 不使用缩进符，而使用空格
    semi: true,      			   // 行尾需要有分号
    singleQuote: true,			 // 使用单引号
    quoteProps: 'as-needed', // 对象的 key 仅在必要时用引号
    jsxSingleQuote: false,   // jsx 不使用单引号，而使用双引号
    trailingComma: 'none',   // 末尾不需要逗号
    bracketSpacing: true,    // 大括号内的首尾需要空格
    jsxBracketSameLine: false,// jsx 标签的反尖括号需要换行
    arrowParens: 'always',   // 箭头函数，只有一个参数的时候，也需要括号
    rangeStart: 0,           // 每个文件格式化的范围是文件的全部内容
    rangeEnd: Infinity,
    requirePragma: false,    // 不需要写文件开头的 @prettier
    insertPragma: false,     // 不需要自动在文件开头插入 @prettier
    proseWrap: 'preserve',   // 使用默认的折行标准
    htmlWhitespaceSensitivity: 'css',// 根据显示样式决定 html 要不要折行
    endOfLine: 'lf'          // 换行符使用 lf
};
```

### Es-lint支持tsx

如果需要同时支持对 tsx 文件的检查，则需要对以上步骤做一些调整：

安装 eslint-plugin-react

```shell
npm install --save-dev eslint-plugin-react
```

在package.json和vscode的插件中添加配置

```json
{
    "scripts": {
        "eslint": "eslint src --ext .ts,.tsx"
    }
}
```

```javascript
{
    "files.eol": "\n",
    "editor.tabSize": 4,
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "eslint.autoFixOnSave": true,
    "eslint.validate": [
        "javascript",
        "javascriptreact",
        {
            "language": "typescript",
            "autoFix": true
        },
        {
            "language": "typescriptreact",
            "autoFix": true
        }
    ],
    "typescript.tsdk": "node_modules/typescript/lib"
}
```

### style-lint







## 对Node的支持

想用typescript写nodejs，需要引入第三方声明文件

```shell
npm install @type/node --save
```

https://ts.xcatliu.com/basics/type-of-function.html



## TS包

### DefinitelyTyped





## ts简单辨析

### never与void、any、unknown的区别：

任意未明确声明类型并切无法推导出类型的值都默认为any类型，any是检测弱，兼容性问题解决方案。

当一个函数返回空值时，它的返回值为 void 类型，但是，当一个函数永不返回时（或者总是抛出错误），它的返回值为 never 类型。

void 类型可以被赋值（在 strictNullChecking 为 false 时），但是除了 never 本身以外，其他任何类型不能赋值给 never。

unknown相对于any，任意类型都可以赋值给unknow，但是不可对其进行任何访问操作（仅仅为类型安全，any操作访问也安全）

```typescript
let val:any

let val_void:void = val;

let val_undefined:undefined = val;
let val_null:null = val;
let val_number:number = val;

let val: unknown;
let val__unknown:unknown = val;
// 报错:不能将类型“unknown”分配给类型“string”
let val_string:string = val;
// 报错:不能将类型“unknown”分配给类型“number”
let val_number:number = val;
// 报错:不能将类型“unknown”分配给类型“boolean”
```

但是unkown可以通过别的方式来缩小类型

```typescript
declare const maybe: unknown;

if (maybe === true) {
  // TypeScript knows that maybe is a boolean now
  const aBoolean: boolean = maybe;
  // So, it cannot be a string
  const aString: string = maybe;
Type 'boolean' is not assignable to type 'string'.
}
 
if (typeof maybe === "string") {
  // TypeScript knows that maybe is a string
  const aString: string = maybe;
  // So, it cannot be a boolean
  const aBoolean: boolean = maybe;
Type 'string' is not assignable to type 'boolean'.
}
```



### 数字枚举与字符串枚举的区别

我们可以使用字符串枚举或者数值枚举，

```typescript
enum NoYes {
  No,
  Yes,
}

enum NoYes {
  No = 0,
  Yes = 1,
}

enum NoYes {
  No = 'No',
  Yes = 'Yes',
}
```



### type与interface的区别

type与interface都用于描述一个对象或函数, 两者都可以实现继承

interface 可以 extends， 但 type 是不允许 extends 和 implement 的，但是 type 可以通过交叉类型 实现 interface 的 extend 行为，并且两者并不是相互独立的，也就是说 interface 可以 extends type, type 也可以 与 interface 类型交叉 。

```typescript
//interface使用extends继承，type可以通过交叉类型继承
interface Name { 
  name: string; 
}
interface User extends Name { 
  age: number; 
}

type Name = { 
  name: string; 
}
type User = Name & { age: number  };
//interface与type混合extends与交叉
type Name = { 
  name: string; 
}
interface User extends Name { 
  age: number; 
}

interface Name { 
  name: string; 
}
type User = Name & { 
  age: number; 
}
```

不同点：

interface可以声明合并，type不行

```typescript
interface User {
  name: string
  age: number
}

interface User {
  sex: string
}

/*
User 接口为 {
  name: string
  age: number
  sex: string 
}
*/
```

对象、函数两者都适用，type可以声明基本类型别名，联合类型，元组等类型，还可以使用 typeof 获取实例的类型进行赋值，interface不行

```typescript
// 基本类型别名
type Name = string

// 联合类型
interface Dog {
    wong();
}
interface Cat {
    miao();
}

type Pet = Dog | Cat

// 具体定义数组每个位置的类型
type PetList = [Dog, Pet]

// 获取类型进行赋值
let div = document.createElement('div');
type B = typeof div
```

type 支持计算属性，生成映射类型,；interface 不支持。

type 能使用 in 关键字生成映射类型, 内部使用了 for .. in。 具有三个部分：类型变量 K，它会依次绑定到每个属性。
字符串字面量联合的 Keys，它包含了要迭代的属性名的集合。
属性的结果类型。

```typescript
type Keys = "firstname" | "surname"

type DudeType = {
  [key in Keys]: string
}

const test: DudeType = {
  firstname: "Pawel",
  surname: "Grzybek"
}

// 报错
//interface DudeType2 {
//  [key in keys]: string
//}
```

一般来说，如果不清楚什么时候用interface/type，能用 interface 实现，就用 interface , 如果不能就用 type 。

### 元组与数组的区别

数组的类型在[]前面, 元组的类型在[]内部。数组的类型规定数组全部的类型，而元组内部的类型是逐个指定的，也就是元组需要规定元素数量

```typescript
let arr:(number | string)[] = ['s',3,'a'];
let arr:any[] = ['a',2,true];

// let arr:[number] = [2,3,4];
 let arr:[number] = [2]; // 这个时候才是对的！
 let arr:[string,number] = ['a',1];
// 报错:不能将类型“string”分配给类型“number”
// let arr:[string,number] = [1,'d'];
// any元组也需要规定元素数量
let arr:[any,any,any] = ['s',2,true];
```

### 索引签名和工具类型Record的区别

其实Record工具类型的本质就是索引签名，不同之处只是用法，仅仅需要继承就可以了，不需要再写一遍

```typescript
interface inf{
    name:string;
    age:number;
    [k:string]:any;
}

interface inf extends Record<string,any>{
    name:string;
    age:number;
}

let obj:inf = {
    name:'yiye',
    age:33,
    city:'foshan'
}
```



## 编译 

### npm run tsc

如果一个目录下存在一个`tsconfig.json`文件，那么它意味着这个目录是TypeScript项目的根目录。 `tsconfig.json`文件中指定了用来编译这个项目的根文件和编译选项。 一个项目可以通过以下方式之一来编译

使用tsconfig.json

- 不带任何输入文件的情况下调用`tsc`，编译器会从当前目录开始去查找`tsconfig.json`文件，逐级向上搜索父目录。
- 不带任何输入文件的情况下调用`tsc`，且使用命令行参数`--project`（或`-p`）指定一个包含`tsconfig.json`文件的目录。

当命令行上指定了输入文件时，`tsconfig.json`文件会被忽略。

配置关键字

`"compilerOptions"`可以被忽略，这时编译器会使用默认值。

`"files"`指定一个包含相对或绝对文件路径的列表。 `"include"`和`"exclude"`属性指定一个文件glob匹配模式列表。 支持的glob通配符有：

- `*` 匹配0或多个字符（不包括目录分隔符）
- `?` 匹配一个任意字符（不包括目录分隔符）
- `**/` 递归匹配任意子目录

如果一个glob模式里的某部分只包含`*`或`.*`，那么仅有支持的文件扩展名类型被包含在内（比如默认`.ts`，`.tsx`，和`.d.ts`， 如果 `allowJs`设置能`true`还包含`.js`和`.jsx`）。

如果`"files"`和`"include"`都没有被指定，编译器默认包含当前目录和子目录下所有的TypeScript文件（`.ts`, `.d.ts` 和 `.tsx`），排除在`"exclude"`里指定的文件。JS文件（`.js`和`.jsx`）也被包含进来如果`allowJs`被设置成`true`。 如果指定了 `"files"`或`"include"`，编译器会将它们结合一并包含进来。 使用 `"outDir"`指定的目录下的文件永远会被编译器排除，除非你明确地使用`"files"`将其包含进来（这时就算用`exclude`指定也没用）。

使用`"include"`引入的文件可以使用`"exclude"`属性过滤。 然而，通过 `"files"`属性明确指定的文件却总是会被包含在内，不管`"exclude"`如何设置。 如果没有特殊指定， `"exclude"`默认情况下会排除`node_modules`，`bower_components`，`jspm_packages`和`<outDir>`目录。

任何被`"files"`或`"include"`指定的文件所引用的文件也会被包含进来。 `A.ts`引用了`B.ts`，因此`B.ts`不能被排除，除非引用它的`A.ts`在`"exclude"`列表中。

需要注意编译器不会去引入那些可能做为输出的文件；比如，假设我们包含了`index.ts`，那么`index.d.ts`和`index.js`会被排除在外。 通常来讲，不推荐只有扩展名的不同来区分同目录下的文件。

`tsconfig.json`文件可以是个空文件，那么所有默认的文件（如上面所述）都会以默认配置选项编译。

在命令行上指定的编译选项会覆盖在`tsconfig.json`文件里的相应选项。

`@types`，`typeRoots`和`types`

默认所有*可见的*"`@types`"包会在编译过程中被包含进来。 `node_modules/@types`文件夹下以及它们子文件夹下的所有包都是*可见的*； 也就是说， `./node_modules/@types/`，`../node_modules/@types/`和`../../node_modules/@types/`等等。

如果指定了`typeRoots`，*只有*`typeRoots`下面的包才会被包含进来

```json
{
   "compilerOptions": {
       "typeRoots" : ["./typings"]
   }
}
```

这个配置文件会包含*所有*`./typings`下面的包，而不包含`./node_modules/@types`里面的包。

如果指定了`types`，只有被列出来的包才会被包含进来。

```json
{
   "compilerOptions": {
        "types" : ["node", "lodash", "express"]
   }
}
```

这个`tsconfig.json`文件将*仅会*包含 `./node_modules/@types/node`，`./node_modules/@types/lodash`和`./node_modules/@types/express`。/@types/。 `node_modules/@types/*`里面的其它包不会被引入进来。

指定`"types": []`来禁用自动引入`@types`包。

extends

`tsconfig.json`文件可以利用`extends`属性从另一个配置文件里继承配置。

`extends`是`tsconfig.json`文件里的顶级属性（与`compilerOptions`，`files`，`include`，和`exclude`一样）。 `extends`的值是一个字符串，包含指向另一个要继承文件的路径。

在原文件里的配置先被加载，然后被来至继承文件里的配置重写。 如果发现循环引用，则会报错。

来至所继承配置文件的`files`，`include`和`exclude`*覆盖*源配置文件的属性。



### babel编译

最开始 typescript 代码只有自带的 tyepscript compiler（tsc）能编译，编译不同版本的 typescript 代码需要用不同版本的 tsc，通过配置 tsconfig.json 来指定如何编译。

但是 tsc 编译 ts 代码为 js 是有问题的：

tsc 不支持很多还在草案阶段的语法，这些语法都是通过 babel 插件来支持的，所以很多项目的工具链是用 tsc 编译一遍 ts 代码，之后再由 babel 编译一遍。这样编译链路长，而且生成的代码也不够精简。

所以，typescript 找 babel 团队合作，在 babel7 中支持了 typescript 的编译，可以通过插件来指定 ts 语法的编译。比如 api 中是这样用：

```javascript
const parser = require('@babel/parser');

parser.parse(sourceCode, {
    plugins: ['typescript']
});
```

babel编译ts的流程：

- parser: 把源码 parse 成 ast
- traverse：遍历 ast，生成作用域信息和 path，调用各种插件来对 ast 进行转换
- generator：把转换以后的 ast 打印成目标代码，并生成 sourcemap

 typescript compiler 的编译流程是这样的：

- scanner + parser： 分词和组装 ast，从源码到 ast 的过程

- binder + checker： 生成作用域信息，进行类型推导和检查

- transform：对经过类型检查之后的 ast 进行转换

- emitter： 打印 ast 成目标代码，生成 sourcemap 和类型声明文件（根据配置）

能不能基于 babel 的插件在 traverse 的时候实现 checker 呢？

答案是不可以。

因为 tsc 的类型检查是需要拿到整个工程的类型信息，需要做类型的引入、多个文件的 namespace、enum、interface 等的合并，而 babel 是单个文件编译的，不会解析其他文件的信息。所以做不到和 tsc 一样的类型检查。

**一个是在编译过程中解析多个文件，一个是编译过程只针对单个文件，流程上的不同，导致 babel 无法做 tsc 的类型检查。**

其实 babel 只是能够 parse ts 代码成 ast，不会做类型检查，会直接把类型信息去掉，然后打印成目标代码。

这导致了有一些 ts 语法是 babel 所不支持的：

- const enum 不支持。const enum 是在编译期间把 enum 的引用替换成具体的值，需要解析类型信息，而 babel 并不会解析，所以不支持。可以用相应的插件把 const enum 转成 enum。
- namespace 部分支持。不支持 namespace 的跨文件合并，不支持导出非 const 的值。这也是因为 babel 不会解析类型信息且是单文件编译。

上面两种两个是因为编译方式的不同导致的不支持。

- export = import = 这种 ts 特有语法不支持，可以通过插件转为 esm
- 如果开启了 jsx 编译，那么 <string> aa 这种类型断言不支持，通过 aa as string 来替代。这是因为这两种语法有冲突，在两个语法插件(jsx、typescript)里，解决冲突的方式就是用 as 代替。

这四种就是 babel 不支持的 ts 语法，其实影响并不大，这几个特性不用就好了。

**结论：babel 不能编译所有 typescript 代码，但是除了 namespace 的两个特性外，其余的都可以做编译。**

Babel编译的优势：

1.产物体积更小

这与配置编译目标有关

在tsc中配置编译目标如下：

在 compilerOptions 里面配置 target，target 设置目标语言版本

```javascript
{
    compilerOptions: {
        target: "es5" // es3、es2015
    }
}
```

在入口文件里面引入 core-js.

```javascript
import 'core-js';
```

而在babel7中，

配置编译目标：

在 preset-env 里面指定 targets，直接指定目标运行环境（浏览器、node）版本，或者指定 query 字符串，由 browserslist 查出具体的版本。

引入polyfill也是在preset-env 中配置，指定 polyfill 用哪个（corejs2 还是 corejs3），如何引入（entry 在入口引入 ，usage 每个模块单独引入用到的）

```javascript
{
    presets: [
        [
            "@babel/preset-env",
            {
                // targets: {
                //    chrome: 45
                // }
                targets: "last 1 version,> 1%,not dead",
                corejs: 3,
                useBuiltIns: 'usage'
            }
        ]
    ]
}
```

**先根据 targets 查出支持的目标环境的版本，再根据目标环境的版本来从所有特性中过滤支持的，剩下的就是不支持的特性。只对这些特性做转换和 polyfill 即可**

而且 babel 还可以通过 @babel/plugin-transform-runtime 来把全局的 corejs 的 import 转成模块化引入的方式。

显然，用 babel 编译 typescript 从产物上看有两个优点：

- 能够做更精准的按需编译和 polyfill，产物体积更小
- 能够通过插件来把 polyfill 变成模块化的引入，不污染全局环境

2.支持的语言特性：

typescript 默认支持很多 es 的特性，但是不支持还在草案阶段的特性，babel 的 preset-env 支持所有标准特性，还可以通过 proposal 来支持更多还未进入标准的特性。

```javascript
{
    plugins: ['@babel/proposal-xxx'],
    presets: ['@babel/presets-env', {...}]
}
```

3.编译速度

tsc 会在编译过程中进行类型检查，类型检查需要综合多个文件的类型信息，要对 AST 做类型推导，比较耗时，而 babel 不做类型检查，所以编译速度会快很多。

从编译速度来看， babel 胜。

总之，从编译产物大小（主要）、支持的语言特性、编译速度来看，babel 完胜。

### 结合

babel 可以编译生成更小的产物，有更快的编译速度和更多的特性支持，所以我们选择用 babel 编译 typescript 代码。但是类型检查也是需要的，可以在 npm scripts 中配一个命令：

```javascript
{
    "scripts": {
        "typeCheck": "tsc --noEmit"
    }
}
```

这样在需要进行类型检查的时候单独执行一下 npm run typeCheck 就行了，但最好在 git commit 的 hook 里（通过 husky 配置）再执行一次强制的类型检查。



## WebAssembly-AssemblyScript

AssemblyScript定义了一个TypeScript的子集，意在帮助TS背景的同学，通过标准的JavaScript API来完成到wasm的编译，从而消除语言的差异，让程序猿可以快乐的编码。

AssemblyScript项目主要分为三个子项目：

- [AssemblyScript](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2FAssemblyScript%2Fassemblyscript)：将TypeScript转化为wasm的主程序
- [binaryen.js](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2FAssemblyScript%2Fbinaryen.js)：AssemblyScript主程序转化为wasm的底层实现，依托于[binaryen](https://link.juejin.cn?target=http%3A%2F%2Fgithub.com%2FWebAssembly%2Fbinaryen)库，是对binaryen的TypeScript封装。
- [wast.js](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2FAssemblyScript%2Fwabt.js)：AssemblyScript主程序转化为wasm的底层实现，依托于[wast](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2FWebAssembly%2Fwabt)库，是对wast的TypeScript封装。

首先安装assemblyScript

```shell
git clone https://github.com/AssemblyScript/assemblyscript.git
cd assemblyscript
npm install
npm link
```

在node的项目中添加wasm命令

```json
 "scripts": {
    "build": "npm run build:untouched && npm run build:optimized",
    "build:untouched": "asc assembly/module.ts -t dist/module.untouched.wat -b dist/module.untouched.wasm --validate --sourceMap --measure",
    "build:optimized": "asc assembly/module.ts -t dist/module.optimized.wat -b dist/module.optimized.wasm --validate --sourceMap --measure --optimize"
 }
```



```sh
npm install --save @assemblyscript/loader
npm install --save-dev assemblyscript
```

初始化node-modules

```shell
npx asinit .
```

构建

```shell
npm run asbuild
```





## js调用wasm

对于JavaScript调用wasm，一般采用如下步骤：

1. 加载wasm的字节码。
2. 将获取到字节码后转换成 ArrayBuffer，只有这种结构才能被正确编译。编译时会对上述ArrayBuffer进行验证。验证通过方可编译。编译后会通过Promise resolve一个 WebAssembly.Module。
3. 在获取到 module 后需要通过 WebAssembly.Instance API 去同步的实例化 module。
4. 上述第2、3步骤可以用instaniate 异步API等价代替。
5. 之后就可以和像使用JavaScript模块一样调用了。



## 学习资源

typescript手册：https://www.typescriptlang.org/docs/handbook/

深入理解typescript：https://jkchao.github.io/typescript-book-chinese/

typescript入门教程：https://ts.xcatliu.com/basics/type-of-function.html

ts中文手册：https://typescript.bootcss.com/

