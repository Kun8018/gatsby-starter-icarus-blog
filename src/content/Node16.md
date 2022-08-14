---
title: NodeJs开发（五） 
date: 2021-1-23 21:40:33
categories: IT
tags:
    - IT，Web
toc: true
thumbnail: http://cdn.kunkunzhang.top/nestjs.png
---

万万万万万万没想到会来到第十二篇，第十二篇写一些Typescript编译原理

<!--more-->

TypeScript 编译器源文件位于 [`src/compiler`](https://github.com/Microsoft/TypeScript/tree/master/src/compiler) 目录下

## 概述

它分为以下几个关键部分：

- Scanner 扫描器（`scanner.ts`）
- Parser 解析器（`parser.ts`）
- Binder 绑定器（`binder.ts`）
- Checker 检查器（`checker.ts`）
- Emitter 发射器（`emitter.ts`）

每个部分在源文件中均有独立文件

`core.ts` ：TypeScript 编译器使用的核心工具集，重要的有：

` let objectAllocator: ObjectAllocator`是一个定义为全局单例的变量。提供以下定义：

- `getNodeConstructor`（节点会在解析器 / AST 中介绍）
- `getSymbolConstructor`（符号会在绑定器中介绍）
- `getTypeConstructor`（类型会在检查器中介绍）
- `getSignatureConstructor`（签名是索引，调用和构造签名

`types.ts` 包含整个编译器中使用的关键数据结构和接口，这里列出一些关键部分：

- `SyntaxKind` AST 节点类型通过 `SyntaxKind` 枚举进行识别
- `TypeChecker` 类型检查器提供此接口
- `CompilerHost` 用于程序（`Program`）和系统之间的交互
- `Node` AST 节点

`system.ts`，TypeScript 编译器与操作系统的所有交互均通过 `System` 接口进行。接口及其实现（`WScript` 和 `Node`） 均定义在 `system.ts` 中。你可以将其视为*操作环境（OE, Operating Environment）*。

整个编译处理的流程：

```
SourceCode（源码） ~~ 扫描器 ~~> Token 流 ~~ 解析器 ~~> AST（抽象语法树）~~ 绑定器 ~~> Symbols（符号）
```

符号（`Symbol`）是 TypeScript *语义*系统的主要构造块。如上所示，符号是绑定的结果。符号将 AST 中的声明节点与相同实体的其他声明相连

符号和 AST 是检查器用来验证源代码*语义*的

```
AST + 符号 ~~ 检查器 ~~> 类型验证
AST + 检查器 ~~ 发射器 ~~> JavaScript 代码
```

程序定义在 `program.ts` 中。[编译上下文](https://jkchao.github.io/typescript-book-chinese/project/compilationContext.html)在 TypeScript 编译器中被视为一个 `Program`，它包含 `SourceFile` 和编译选项



## 扫描器

TypeScript 扫描器的源码均位于 `scanner.ts`。在内部，由解析器*控制*扫描器将源码转化为抽象语法树（AST）。期望结果如下：

```
SourceCode ~~ 扫描器 ~~> Token 流 ~~ 解析器 ~~> AST
```

为避免重复创建扫描器造成的开销，`parser.ts` 中创建了一个扫描器的*单例*。解析器根据需要使用 `initializeState` 函数*准备*该扫描器



## 解析器

TypeScript 解析器代码均位于 `parser.ts` 中。在内部，由解析器控制扫描器将源码转化为 AST。其期望结果如下

```
源码 ~~ 扫描器 ~~> Token 流 ~~ 解析器 ~~> AST
```

解析器实现原理是单例模式（其原因类似扫描器，如果能重新初始化就不重新构建）。实际实现成 `namespace Parser`，包含解析器的各种*状态*变量和单例扫描器（`const scanner`）。该扫描器由解析器函数管理。





## 绑定器

大多数的 JavaScript 转译器（transpiler）都比 TypeScript 简单，因为它们几乎没提供代码分析的方法。典型的 JavaScript 转换器只有以下流程

```
源码 ~~扫描器~~> Tokens ~~解析器~~> AST ~~发射器~~> JavaScript
```

上述架构确实对于简化 TypeScript 生成 JavaScript 的理解有帮助，但缺失了一个关键功能，即 TypeScript 的*语义*系统。为了协助（检查器执行）类型检查，绑定器将源码的各部分连接成一个相关的类型系统，供检查器使用。绑定器的主要职责是创建*符号*（Symbols）。



## 检查器

*检查器*使得 TypeScript 更独特，比*其它 JavaScript 转译器*更强大。检查器位于 `checker.ts` 中，当前有 23k 行以上的代码（编译器中最大的部分）

检查器是由程序初始化，下面是调用栈示意

```
program.getTypeChecker ->
    ts.createTypeChecker（检查器中）->
        initializeTypeChecker（检查器中） ->
            for each SourceFile `ts.bindSourceFile`（绑定器中）
            // 接着
            for each SourceFile `ts.mergeSymbolTable`（检查器中）
```

检查器检测到错误后，调用本地的error函数报告错误

```javascript
function error(location: Node, message: DiagnosticMessage, arg0?: any, arg1?: any, arg2?: any): void {
  let diagnostic = location
    ? createDiagnosticForNode(location, message, arg0, arg1, arg2)
    : createCompilerDiagnostic(message, arg0, arg1, arg2);
  diagnostics.add(diagnostic);
}
```



## 发射器

TypeScript 编译器提供了两个发射器：

- `emitter.ts`：可能是你最感兴趣的发射器，它是 TS -> JavaScript 的发射器
- `declarationEmitter.ts`：这个发射器用于为 *TypeScript 源文件（`.ts`）* 创建*声明文件（`.d.ts`）*

Program 提供了一个 `emit` 函数。该函数主要将功能委托给 `emitter.ts`中的 `emitFiles` 函数。下面是调用栈：

```
Program.emit ->
    `emitWorker` （在 program.ts 中的 createProgram） ->
        `emitFiles` （emitter.ts 中的函数）
```

`emitWorker`（通过 `emitFiles` 参数）给发射器提供一个 `EmitResolver`。 `EmitResolver` 由程序的 TypeChecker 提供，基本上它是一个来自 `createChecker` 的本地函数的子集

