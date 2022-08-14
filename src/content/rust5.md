---
title: rust（四）
date: 2020-03-11 21:40:33
categories: IT
tags:
    - IT,Rust,Web
toc: true
thumbnail: 
---

   rust第四篇，主要讲rust测试

<!--more-->

## 单元测试与集成测试

与单元测试的同吃同住不同，集成测试的代码是在一个单独的目录下的。由于它们使用跟其它模块一样的方式去调用你想要测试的代码，因此只能调用通过 `pub` 定义的 `API`，这一点与单元测试有很大的不同。

如果说单元测试是对代码单元进行测试，那集成测试则是对某一个功能或者接口进行测试，因此单元测试的通过，并不意味着集成测试就能通过：局部上反映不出的问题，在全局上很可能会暴露出来。

一个标准的 Rust 项目，在它的根目录下会有一个 `tests` 目录，大名鼎鼎的 [`ripgrep`](https://github.com/BurntSushi/ripgrep) 也不能免俗。

没错，该目录就是用来存放集成测试的，Cargo 会自动来此目录下寻找集成测试文件。我们可以在该目录下创建任何文件，Cargo 会对每个文件都进行自动编译，但友情提示下，最好按照合适的逻辑来组织你的测试代码。

首先来创建一个集成测试文件 `tests/integration_test.rs` ，注意，`tests` 目录一般来说需要手动创建，该目录在项目的根目录下，跟 `src` 目录同级。然后在文件中填入如下测试代码：

```rust
use adder;

#[test]
fn it_adds_two() {
    assert_eq!(4, adder::add_two(2));
}
```

首先与单元测试有所不同，我们并没有创建测试模块。其次，`tests` 目录下的每个文件都是一个单独的包，我们需要将待测试的包引入到当前包的作用域后: `use adder`，才能进行测试 。大家应该还记得[包和模块章节](https://course.rs/advance/crate-module/crate.html)中讲过的内容吧？在创建项目后，`src/lib.rs` 自动创建一个与项目同名的 `lib` 类型的包，由于我们的项目名是 `adder`，因此包名也是 `adder`



## 断言

在编写测试函数时，断言决定了我们的测试是通过还是失败，它为结果代言。在前面，大家已经见识过 `assert_eq!` 的使用，下面一起来看看 Rust 为我们提供了哪些好用的断言。

在正式开始前，来看看常用的断言有哪些:

- `assert!`, `assert_eq!`, `assert_ne!`, 它们会在所有模式下运行
- `debug_assert!`, `debug_assert_eq!`, `debug_assert_ne!`, 它们只会在 `Debug` 模式下运行



## 基准测试benchMark

几乎所有开发都知道，如果要测量程序的性能，就需要性能测试。

性能测试包含了两种：压力测试和基准测试。前者是针对接口 API，模拟大量用户去访问接口然后生成接口级别的性能数据；而后者是针对代码，可以用来测试某一段代码的运行速度，例如一个排序算法。

而本文将要介绍的就是基准测试 `benchmark`，在 Rust 中，有两种方式可以实现：

- 官方提供的 `benchmark`
- 社区实现，例如 `criterion.rs`

官方benchMark

官方提供的测试工具，目前最大的问题就是只能在非 `stable` 下使用，原因是需要在代码中引入 `test` 特性: `#![feature(test)]`。

开始正式编写 `benchmark` 代码。首先，将 `src/lib.rs` 中的内容替换成如下代码

```rust
#![feature(test)]

extern crate test;

pub fn add_two(a: i32) -> i32 {
    a + 2
}

#[cfg(test)]
mod tests {
    use super::*;
    use test::Bencher;

    #[test]
    fn it_works() {
        assert_eq!(4, add_two(2));
    }

    #[bench]
    fn bench_add_two(b: &mut Bencher) {
        b.iter(|| add_two(2));
    }
}
```

可以看出，`benchmark` 跟单元测试区别不大，最大的区别在于它是通过 `#[bench]` 标注，而单元测试是通过 `#[test]` 进行标注，这意味着 `cargo test` 将不会运行 `benchmark` 代码

`cargo test` 直接把我们的 `benchmark` 代码当作单元测试处理了，因此没有任何性能测试的结果产生。

对此，需要使用 `cargo bench` 命令：

```shell
$ cargo bench
running 2 tests
test tests::it_works ... ignored
test tests::bench_add_two ... bench:           0 ns/iter (+/- 0)

test result: ok. 0 passed; 0 failed; 1 ignored; 1 measured; 0 filtered out; finished in 0.29s
```

官方 `benchmark` 有两个问题，首先就是不支持 `stable` 版本的 Rust，其次是结果有些简单，缺少更详细的统计分布。

因此社区 `benchmark` 就应运而生，其中最有名的就是 [`criterion.rs`](https://github.com/bheisler/criterion.rs)，它有几个重要特性:

- 统计分析，例如可以跟上一次运行的结果进行差异比对
- 图表，使用 [`gnuplots`](http://www.gnuplot.info/) 展示详细的结果图表

首先，如果你需要图表，需要先安装 `gnuplots`，其次，我们需要引入相关的包，在 `Cargo.toml` 文件中新增 :

```toml
[dev-dependencies]
criterion = "0.3"

[[bench]]
name = "my_benchmark"
harness = false
```

接着，在项目中创建一个测试文件: `$PROJECT/benches/my_benchmark.rs`，然后加入以下内容：

```rust
use criterion::{black_box, criterion_group, criterion_main, Criterion};

fn fibonacci(n: u64) -> u64 {
    match n {
        0 => 1,
        1 => 1,
        n => fibonacci(n-1) + fibonacci(n-2),
    }
}

fn criterion_benchmark(c: &mut Criterion) {
    c.bench_function("fib 20", |b| b.iter(|| fibonacci(black_box(20))));
}

criterion_group!(benches, criterion_benchmark);
criterion_main!(benches);
```

最后，使用 `cargo bench` 运行并观察结果
