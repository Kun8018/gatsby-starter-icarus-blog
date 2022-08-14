---
title: rust（三）
date: 2020-03-11 21:40:33
categories: IT
tags:
    - IT,Rust,Web
toc: true
thumbnail: 
---

   rust第三篇，主要讲rust异步和异步运行时

<!--more-->

## Async/Await异步编程

异步编程是一个[并发编程模型](https://course.rs/advance/concurrency-with-threads/concurrency-parallelism.html)，目前主流语言基本都支持了，当然，支持的方式有所不同。异步编程允许我们同时并发运行大量的任务，却仅仅需要几个甚至一个 OS 线程或 CPU 核心，现代化的异步编程在使用体验上跟同步编程也几无区别，例如 Go 语言的 `go` 关键字，也包括我们后面将介绍的 `async/await` 语法，该语法是 `JavaScript` 和 `Rust` 的核心特性之一

如果你是一个熟悉javascript语言的人，你应该了解事件循环和Async/Await异步。在这里我们简单对比一下异步并发与其他并发模型的区别

由于并发编程在现代社会非常重要，因此每个主流语言都对自己的并发模型进行过权衡取舍和精心设计，Rust 语言也不例外。下面的列表可以帮助大家理解不同并发模型的取舍:

- **OS 线程**, 它最简单，也无需改变任何编程模型(业务/代码逻辑)，因此非常适合作为语言的原生并发模型，我们在[多线程章节](https://course.rs/advance/concurrency-with-threads/concurrency-parallelism.html)也提到过，Rust 就选择了原生支持线程级的并发编程。但是，这种模型也有缺点，例如线程间的同步将变得更加困难，线程间的上下文切换损耗较大。使用线程池在一定程度上可以提升性能，但是对于 IO 密集的场景来说，线程池还是不够看。
- **事件驱动(Event driven)**, 这个名词你可能比较陌生，如果说事件驱动常常跟回调( Callback )一起使用，相信大家就恍然大悟了。这种模型性能相当的好，但最大的问题就是存在回调地狱的风险：非线性的控制流和结果处理导致了数据流向和错误传播变得难以掌控，还会导致代码可维护性和可读性的大幅降低，大名鼎鼎的 JS 曾经就存在回调地狱。
- **协程(Coroutines)** 可能是目前最火的并发模型，`Go` 语言的协程设计就非常优秀，这也是 `Go` 语言能够迅速火遍全球的杀手锏之一。协程跟线程类似，无需改变编程模型，同时，它也跟 `async` 类似，可以支持大量的任务并发运行。但协程抽象层次过高，导致用户无法接触到底层的细节，这对于系统编程语言和自定义异步运行时是难以接受的
- **actor 模型**是 erlang 的杀手锏之一，它将所有并发计算分割成一个一个单元，这些单元被称为 `actor` , 单元之间通过消息传递的方式进行通信和数据传递，跟分布式系统的设计理念非常相像。由于 `actor` 模型跟现实很贴近，因此它相对来说更容易实现，但是一旦遇到流控制、失败重试等场景时，就会变得不太好用
- **async/await**， 该模型性能高，还能支持底层编程，同时又像线程和协程那样无需过多的改变编程模型，但有得必有失，`async` 模型的问题就是内部实现机制过于复杂，对于用户来说，理解和使用起来也没有线程和协程简单，好在前者的复杂性开发者们已经帮我们封装好，而理解和使用起来不够简单，正是本章试图解决的问题。

Rust 经过权衡取舍后，最终选择了同时提供多线程编程和 async 编程:

- 前者通过标准库实现，当你无需那么高的并发时，例如需要并行计算时，可以选择它，优点是线程内的代码执行效率更高、实现更直观更简单，这块内容已经在多线程章节进行过深入讲解，不再赘述
- 后者通过语言特性 + 标准库 + 三方库的方式实现，在你需要高并发、异步 `I/O` 时，选择它就对了

Rust的异步模型与JS或者flutter中的异步模型的区别：

- **Future 在 Rust 中是惰性的**，只有在被轮询(`poll`)时才会运行， 因此丢弃一个 `future` 会阻止它未来再被运行, 你可以将`Future`理解为一个在未来某个时间点被调度执行的任务。
- **Async 在 Rust 中使用开销是零**， 意味着只有你能看到的代码(自己的代码)才有性能损耗，你看不到的(`async` 内部实现)都没有性能损耗，例如，你可以无需分配任何堆内存、也无需任何动态分发来使用 `async` ，这对于热点路径的性能有非常大的好处，正是得益于此，Rust 的异步编程性能才会这么高。
- **Rust 没有内置异步调用所必须的运行时**，但是无需担心，Rust 社区生态中已经提供了非常优异的运行时实现，例如大明星 [`tokio`](https://tokio.rs/)
- **运行时同时支持单线程和多线程**，

　　

## Tokio

对于 Async Rust，最最重要的莫过于底层的异步运行时，它提供了执行器、任务调度、异步 API 等核心服务。简单来说，使用 Rust 提供的 `async/.await` 特性编写的异步代码要运行起来，就必须依赖于异步运行时，否则这些代码将毫无用处

异步运行时是由 Rust 社区提供的，它们的核心是一个 `reactor` 和一个或多个 `executor`(执行器):

- `reactor` 用于提供外部事件的订阅机制，例如 `I/O` 、进程间通信、定时器等
- `executor` 在上一章我们有过深入介绍，它用于调度和执行相应的任务( `Future` )

目前最受欢迎的几个运行时有:

- [`tokio`](https://github.com/tokio-rs/tokio)，目前最受欢迎的异步运行时，功能强大，还提供了异步所需的各种工具(例如 tracing )、网络协议框架(例如 HTTP，gRPC )等等
- [`async-std`](https://github.com/async-rs/async-std)，最大的优点就是跟标准库兼容性较强
- [`smol`](https://github.com/smol-rs/smol), 一个小巧的异步运行时

随着时间的流逝，`tokio`越来越亮眼，无论是性能、功能还是社区、文档，它在各个方面都异常优秀，时至今日，可以说已成为事实上的标准。deno也同样使用tokio作为异步运行时

引入

在cargo.toml中引入相关依赖

```toml
[dependencies]
tokio = { version = "1", features = ["full"] }
mini-redis = "0.4"
```



## Rust Web框架

Rust 拥有多个非常快速的 web 框架：Rocket、Actix web 和 Yew。

### web 前端框架

stdweb

stdweb 是一个前端标准库，它提供了直接与 JavaScript web API 通信的能力。它是为了让开发人员能够在 Rust 中创建成熟的 JavaScript 应用而精心设计的，通过在语言之间提供简单的 API 绑定，以提高速度和性能。

stdweb 支持闭包、任意结构，以及 web API 的标准组件，包括 DOM、event，和 window。请参阅这几个[示例项目](https://github.com/koute/stdweb/tree/master/examples)，以了解它是如何工作的。

概述：

- 稳定：是
- 生产就绪：否
- 项目规模：小

Sauron

Sauron 是一个微前端框架，它的灵感来自 [Elm 体系结构](https://guide.elm-lang.org/architecture/)。它支持事件、状态管理和组件。Sauron `使用一个名为html2sauron` 的库，将 html 转换为 Sauron 视图代码，然后进行渲染优化。

Percy

Percy 是一个用于构建单页应用程序（SPA），以及 UI 管理的工具包，包括针对特定浏览器和屏幕（桌面、移动）的优化。Percy 的开发工作正在进行；需要很多改进，以获得更好的结构、优化的样板文件和一些 bug 修复。

Seed

Seed 是一个前端框架，用于创建性能驱动的，且可靠的 web 应用程序，该应用程序还具有[类似 Elm 的体系结构](https://guide.elm-lang.org/architecture/)。它有最小的配置和样板文件，并有清晰的文档，使得任何人都可以很容易地开始。

Smithy

Smithy 为开发人员提供了一个简单的学习曲线。它支持注入和子组件、事件、状态管理、与 JavaScript 交互、`smd!` 宏（受 React 的 Jsx 启发），以及对服务器部署的支持。

Yew

[Yew](https://github.com/yewstack/yew)是一个 Rust 框架，用于使用 WebAssembly 创建 web 应用。Yew 是 stdweb 的改进版本。它是一个基于组件的框架（类似于 React 和 Elm），支持多线程、基于组件的模式，以及其它类似于 stdweb 的特性。

在它的主要优点中，它列出了一个像 React 和 Elm 那样的基于组件的框架，由于对多线程的支持和 JavaScript 的互操作性，它具有出色的性能。

到目前为止，它还没有生产就绪，但是对于内部工具来说，它应该是一个非常好的选择，特别是如果想使用 WASM 的场景。

### Web后端框架

Rust 为后端开发提供了多种 web 框架，包括来自不同开发者的工具和库。旨在提供一种高效、安全和灵活的方法，以构建、测试和运行应用程序。

后端开发框架的一些最典型功能包括：

- 数据库管理
- 会话
- 模板
- 对象关系映射（ORM）
- 迁移和部署

Rocket

[Rocket](https://github.com/SergioBenitez/Rocket)是 Rust 生态系统中对初学者来说最容易上手的 web 框架。

它是高度可定制化的，可以快速启动一个新的应用程序。同时，它避免了许多不必要的文件。

它支持测试库、cookie、数据流、路由、模板、数据库、ORM，以及项目样板等。Rocket 还拥有一个庞大而活跃的开发者社区。

与 Actix Web 不同的是，该框架运行在 Rust 语言的“实验”版本)上。

Actix Web

[Actix Web](https://github.com/actix/actix-web)通常被认为比 Rocket 性能更稳定。

在下面，它与[Erlang](https://serokell.io/blog/introduction-to-erlang#process-oriented)和[Akka](https://doc.akka.io/docs/akka/current/typed/actors.html)中使用的角色模型一起工作。

与 Rocket 相比，需要使用第三方库来实现额外的功能。

Gotham

Gotham 是一个灵活的 web 框架，为稳定版 Rust 构建。其是静态类型的，从而确保应用程序在编译时总是正确表达。Gotham 基于 Tokio 和 hyper，提供异步支持。

Gotham 支持路由、提取器（类型安全数据请求）、中间件、状态共享和测试。Gotham 没有工程结构、样板文件，或数据库支持。

Warp

[Warp](https://github.com/seanmonstar/warp)是一个用 Rust 编写的 web 服务器框架。与 Rocket 和 Actix 相比。

对于一个 web 框架来说，它是相当小巧的，并且只提供基本的开箱即用的功能。

Rouille

Rouille 是一个微框架，它通过一个监听 socket 解析 HTTP 请求，采用线性请求和响应设计。它是为了方便用户学习而构建的。Rouille 通过 CGI、输入（请求头和请求体）、内容编码、代理、会话和 websocket 支持请求处理。

Nickels 

Nickels 是一个小型而轻量级的框架，其 API 受到了流行的 JavaScript Express 框架的启发。它提供了灵活的路由、中间件、JSON 处理、自定义错误处理程序、模板，以及样板文件等。

Thruster 

Thruste是一个快速而可靠的 Rust web 框架，灵感来自于分层设计的 Koa 和 Express。Thruster 的 SSL 特性已就绪，可提供安全访问和测试的。Thruster 是为适应 async/await 而构建的，并为中间件、错误处理、数据库和测试提供支持。

Iron

Iron 是一个内置于 hyper 中的 web 框架，关注并发性、可扩展性和最小负载。它可以在多台机器上水平扩展，或者在更强大的机器上多种方式扩展。因为它被设计成可扩展和可插拔的，所以 Iron 主要将中间件、插件，可选扩展（第三方扩展）作为其主要组件。

Iron 提供对路由、JSON 解析、URL 编码解析、会话，以及静态文件的支持。

Tide

Tide 是小型而实用的 Rust web 应用程序框架，为快速开发而构建（类似于 python 的 flask，或 nodejs 的 express，或 Ruby 的 Sinatra），专注于以异步 Rust 版本构建 web 应用。

Tide 提供对路由、身份验证、侦听器、日志、模板引擎、中间件、测试，以及其它实用程序的支持。

对于构建高级 web 应用的后端 web 框架，我推荐 Rocket、Actix，以及 Tide（异步支持）。它们也都被 Rust 社区所接受，并且各自框架社区都提供了完善的支持库。

https://blog.budshome.com/budshome/rust-web-kuang-jia-xian-zhuang--(2021-nian-1-ji-du-)-



## WebAssembly

安装rust webassembly工具

```shell
$ rustup target add wasm32-wasi
$ rustup override set nightly
$ rustup target add wasm32-wasi --toolchain nightly
```

创建一个cargo项目。由于这个程序是从主机应用程序调用的，而不是作为独立的可执行文件运行，因此我们将创建一个 `lib` 项目。

```shell
$ cargo new --lib triple
$ cd triple
```

编辑 `Cargo.toml` 文件以添加`[lib]`节。 它会告诉编译器在哪里可以找到库的源代码，以及如何生成字节码输出。

```toml
[lib]
name = "triple_lib"
path = "src/lib.rs"
crate-type =["cdylib"]
```

在Rust 程序 `src/lib.rs` 的内容. 实际上，你可以在这个库文件中定义多个外部函数，并且所有这些函数都可以通过 WebAssembly 在 JaveScript 主机上使用。

```rust
#[no_mangle]
pub extern fn triple(x: i32) -> i32 {
  return 3 * x;
}
```

编译 Rust 的源代码到WebAssembly的字节码中。

```shell
cargo +nightly build --target wasm32-wasi --release
```

导出的WebAssembly 字节码文件是 `target/wasm32-wasi/release/triple_lib.wasm`

在JavaScript中使用

```javascript
if (!('WebAssembly' in window)) {
  alert('you need a browser with wasm support enabled :(');
}
(async () => {
  const response = await fetch('triple_lib.wasm');
  const buffer = await response.arrayBuffer();
  const module = await WebAssembly.compile(buffer);
  const instance = await WebAssembly.instantiate(module);
  const exports = instance.exports;
  const triple = exports.triple;

  var buttonOne = document.getElementById('buttonOne');
  buttonOne.value = 'Triple the number';
  buttonOne.addEventListener('click', function() {
    var input = $("#numberInput").val();
    alert(input + ' tripled equals ' + triple(input));
  }, false);
})();
```

