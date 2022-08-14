---
title: Rust
date: 2020-06-02 21:40:33
categories: IT
tags:
    - IT，Web,Rust
toc: true
thumbnail: https://cdn.kunkunzhang.top/rust.jpeg
---

​      Rust语言

<!--more-->

## Why Rust

### 系统级编程语言 vs 应用级编程语言

像 Java/C# 的应用级编程语言被用来构建直接服务于用户的应用程序。比如我们常用的 Excel， World 应用程序，网站和手机 App。

像 C/C++ 这类的属于系统级编程语言，常用来构建软件和软件平台，操作系统，游戏引擎，编译器，等等 。通常会需要一些偏底层的操作，比如大量的和硬件交互。

系统级比应用级有两个主要的问题

- 编写内存安全的代码很困难。
- 编写多线程代码很困难。

### rust

- Rust 是一个系统级编程语言，被 Mozilla 员工 "Graydon Hoare" 于 2006 年 开发。他形容 Rust 是一种线程安全的支持并发的实用型的编程语言，支持函数式编程与命令式编程。
- rust 的语法和 C++ 类似。
- Rust 是免费开源的软件，即任何人可以免费的使用它，并且源代码是开源分享的，因此人们还可以去提高它的软件设计。
- 在 2016 年，2017 年和 2018 年的 stack overflow 开发人员调查中，Rust 被评比为 “最受欢迎的编程语言” 之一。
- 没有例如 calloc（动态内存分配并做初始化）或者 malloc（动态内存分配不做初始化）这样直接的内存管理模式。这意味着，内存会由 Rust 进行内部管理。



## 安装

linux

```shell
# Install Rust

$ sudo apt-get update
$ sudo apt-get -y upgrade
$ curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
$ source $HOME/.cargo/env
```

mac

```shell
curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf | sh
```

Rust 对运行环境的依赖和 Go 语言很像，几乎所有环境都可以无需安装任何依赖直接运行。但是，Rust 会依赖 `libc` 和链接器 `linker`。所以如果遇到了提示链接器无法执行的错误，你需要再手动安装一个 C 语言编译器

## 第一个应用程序

使用cargo创建第一个hello world应用程序

```shell
cargo new world-hello --bin
```

然后运行

```shell
cargo run 
```

`cargo run` 首先对项目进行编译，然后再运行，因此它实际上等同于运行了两个指令，下面我们手动试一下编译和运行项目：

编译

```shell
$ cargo build
    Finished dev [unoptimized + debuginfo] target(s) in 0.00s
```

运行

```shell
$ ./target/debug/world_hello
Hello, world!
```

rust运行时默认是 `debug` 模式，在这种模式下，**代码的编译速度会非常快**，可是福兮祸所依，**运行速度就慢了**. 原因是，在 `debug` 模式下，Rust 编译器不会做任何的优化，只为了尽快的编译完成，让你的开发流程更加顺畅。

可以添加 `--release` 来编译：

- `cargo run --release`
- `cargo build --release`

此时生成的二进制文件运行一下我们高性能的 `release` 程序：

## 使用

编程

```rust
fn main() {
    println!("Hello， world!");
}
```

运行

```shell
rustc main.rs
```



Rust 原生支持 UTF-8 编码的字符串，这意味着你可以很容易的使用世界各国文字作为字符串内容。

关注下 `println` 后面的 `!`，如果你有 Ruby 编程经验，那么你可能会认为这是解构操作符，但是在 Rust 中，这是 `宏` 操作符，你目前可以认为宏是一种特殊类型函数。

对于 `println` 来说，我们没有使用其它语言惯用的 `%s`、`%d` 来做输出占位符，而是使用 `{}`，因为 Rust 在底层帮我们做了大量工作，会自动识别输出数据的类型，例如当前例子，会识别为 `String` 类型。



### 常量与变量

变量是程序可以操纵的命名存储。 简而言之，变量可以帮助程序存储值。 Rust 中的变量与特定的数据类型相关联。 数据类型决定变量的内存大小和布局，可以存储在该内存中的值的范围以及可以对该变量执行的一组操作。

变量的名称可以由字母，数字和下划线字符组成。以字母或下划线开头。

常量表示不可变的值。如果你声明了一个常量，你将无法改变它的值。声明常量的关键字为 **const**。常量一定要显式声明它的数据类型。

常量与变量的区别

- 常量使用 **const** 关键字来声明，而变量使用 **let** 关键字来声明。
- 变量的声明中可以选择是否声明数据类型，而声明常量时一定要声明它的数据类型。这意味着代码 const USER_LIMIT=100 将会导致错误。
- 使用 **let** 关键字声明的变量默认是不可变的。但是你可以选择使用 **mut** 关键字来使其可变。常量则永远是不可变的。
- 常量只能被赋予常量表达式而不能被赋予调用函数返回的值或是在运行时计算产生的值。（即常量的值一定要为编译前已知的值而非运行时产生的值）
- 常量可以在任何范围内声明，包括全局范围，这对于代码内需要被多处使用的值很有用。



### 变量类型

数值

Rust 使用一个相对传统的语法来创建整数（`1`，`2`，...）和浮点数（`1.0`，`1.1`，...）。整数、浮点数的运算和你在其它语言上见过的一致，都是通过常见的运算符来完成。

**整数**是没有小数部分的数字。

下表显示了 Rust 中的内置的整数类型：（ `i` 是英文单词 *integer* 的首字母，与之相反的是 `u`，代表无符号 `unsigned` 类型）。

| 长度       | 有符号类型 | 无符号类型 |
| ---------- | ---------- | ---------- |
| 8 位       | `i8`       | `u8`       |
| 16 位      | `i16`      | `u16`      |
| 32 位      | `i32`      | `u32`      |
| 64 位      | `i64`      | `u64`      |
| 128-位     | `i128`     | `u128`     |
| 视架构而定 | `isize`    | `usize`    |

类型定义的形式统一为：`有无符号 + 类型大小(位数)`。**无符号数**表示数字只能取正数，而**有符号**则表示数字即可以取正数又可以取负数。就像在纸上写数字一样：当要强调符号时，数字前面可以带上正号或负号；然而，当很明显确定数字为正数时，就不需要加上正号了。有符号数字以[补码](https://en.wikipedia.org/wiki/Two's_complement)形式存储。

每个有符号类型规定的数字范围是 -(2n - 1) ~ 2n - 1 - 1，其中 `n` 是该定义形式的位长度。因此 `i8` 可存储数字范围是 -(27) ~ 27 - 1，即 -128 ~ 127。无符号类型可以存储的数字范围是 0 ~ 2n - 1，所以 `u8` 能够存储的数字为 0 ~ 28 - 1，即 0 ~ 255。

此外，`isize` 和 `usize` 类型取决于程序运行的计算机 CPU 类型： 若 CPU 是 32 位的，则这两个类型是 32 位的，同理，若 CPU 是 64 位，那么它们则是 64 位。

| 数字字面量         | 示例          |
| ------------------ | ------------- |
| 十进制             | `98_222`      |
| 十六进制           | `0xff`        |
| 八进制             | `0o77`        |
| 二进制             | `0b1111_0000` |
| 字节 (仅限于 `u8`) | `b'A'`        |

Rust 整形默认使用 `i32`，例如 `let i = 1`，那 `i` 就是 `i32` 类型，因此你可以首选它，同时该类型也往往是性能最好的。`isize` 和 `usize` 的主要应用场景是用作集合的索引。

**浮点类型数字** 是带有小数点的数字，在 Rust 中浮点类型数字也有两种基本类型： `f32` 和 `f64`，分别为 32 位和 64 位大小。默认浮点类型是 `f64`，在现代的 CPU 中它的速度与 `f32` 几乎相同，但精度更高。

```rust
fn main() {
    let x = 2.0; // f64

    let y: f32 = 3.0; // f32
}
```

Rust 支持所有数字类型的基本数学运算：加法、减法、乘法、除法和取模运算。

```rust
fn main() {
    // 加法
    let sum = 5 + 10;

    // 减法
    let difference = 95.5 - 4.3;

    // 乘法
    let product = 4 * 30;

    // 除法
    let quotient = 56.7 / 32.2;

    // 求余
    let remainder = 43 % 5;
}
```

Rust 的 `HashMap` 数据结构，是一个 KV 类型的 Hash Map 实现，它对于 `K` 没有特定类型的限制，但是要求能用作 `K` 的类型必须实现了 `std::cmp::Eq` 特征，因此这意味着你无法使用浮点数作为 `HashMap` 的 `Key`，来存储键值对，但是作为对比，Rust 的整数类型、字符串类型、布尔类型都实现了该特征，因此可以作为 `HashMap` 的 `Key`。

NaN

对于数学上未定义的结果，例如对负数取平方根 `-42.1.sqrt()` ，会产生一个特殊的结果：Rust 的浮点数类型使用 `NaN` (not a number)来处理这些情况。

**所有跟 `NaN` 交互的操作，都会返回一个 `NaN`**，而且 `NaN` 不能用来比较，

```rust
fn main() {
    let x = (-42.0_f32).sqrt();
    if x.is_nan() {
        println!("未定义的数学行为")
    }
}
```

序列

Rust 提供了一个非常简洁的方式，用来生成连续的数值，例如 `1..5`，生成从 1 到 4 的连续数字，不包含 5 ；`1..=5`，生成从 1 到 5 的连续数字，包含 5，它的用途很简单，常常用于循环中

```rust
for i in 1..=5 {
    println!("{}",i);
}
// 1
// 2
// 3
// 4
// 5
for i in 'a'..='z' {
    println!("{}",i);
}
```

序列只允许用于数字或字符类型，原因是：它们可以连续，同时编译器在编译期可以检查该序列是否为空，字符和数字值是 Rust 中仅有的可以用于判断是否为空的类型。

有理数和复数

Rust 的标准库相比其它语言，准入门槛较高，因此有理数和复数并未包含在标准库中：

- 有理数和复数
- 任意大小的整数和任意精度的浮点数
- 固定精度的十进制小数，常用于货币相关的场景

社区已经开发出高质量的 Rust 数值库：[num](https://crates.io/crates/num)。

在 `Cargo.toml` 中的 `[dependencies]` 下添加一行 `num = "0.4.0"`，然后在代码中引入就可以使用

```rust
use num::complex::Complex;

 fn main() {
   let a = Complex { re: 2.1, im: -1.2 };
   let b = Complex::new(11.1, 22.2);
   let result = a + b;

   println!("{} + {}i", result.re, result.im)
 }
```

字符串

在 Rust 语言中这些都是字符，Rust 的字符不仅仅是 `ASCII`，所有的 `Unicode` 值都可以作为 Rust 字符，包括单个的中文、日文、韩文、emoji 表情符号等等，都是合法的字符类型。`Unicode` 值的范围从 `U+0000 ~ U+D7FF` 和 `U+E000 ~ U+10FFFF`。不过“字符”并不是 `Unicode` 中的一个概念，所以人在直觉上对“字符”的理解和 Rust 的字符概念并不一致。

由于 `Unicode` 都是 4 个字节编码，因此字符类型也是占用 4 个字节

```rust
fn main() {
    let x = '中';
    println!("字符'中'占用了{}字节的内存大小",std::mem::size_of_val(&x));
}
// 字符'中'占用了4字节的内存大小
```

布尔值

Rust 中的布尔类型有两个可能的值：`true` 和 `false`，布尔值占用内存的大小为 `1` 个字节

```rust
fn main() {
    let t = true;

    let f: bool = false; // 使用类型标注,显式指定f的类型

    if f {
        println!("这是段毫无意义的代码");
    }
}
```

单元类型

单元类型就是 `()` ，对，你没看错，就是 `()` ，唯一的值也是 `()` ，一些读者读到这里可能就不愿意了，你也太敷衍了吧，管这叫类型？

只能说，再不起眼的东西，都有其用途，在目前为止的学习过程中，大家已经看到过很多次 `fn main()` 函数的使用吧？那么这个函数返回什么呢？

没错， `main` 函数就返回这个单元类型 `()`，你不能说 `main` 函数无返回值，因为没有返回值的函数在 Rust 中是有单独的定义的：`发散函数`，顾名思义，无法收敛的函数。

例如常见的 `println!()` 的返回值也是单元类型 `()`。

再比如，你可以用 `()` 作为 `map` 的值，表示我们不关注具体的值，只关注 `key`。 这种用法和 Go 语言的 ***struct{}*** 类似，可以作为一个值用来占位，但是完全**不占用**任何内存。

函数要点

- 函数名和变量名使用[蛇形命名法(snake case)](https://course.rs/practice/naming.html)，例如 `fn add_two() -> {}`
- 函数的位置可以随便放，Rust 不关心我们在哪里定义了函数，只要有定义即可
- 每个函数参数都需要标注类型

字符串

Rust 在语言级别，只有一种字符串类型： `str`，它通常是以引用类型出现 `&str`，也就是上文提到的字符串切片。虽然语言级别只有上述的 `str` 类型，但是在标准库里，还有多种不同用途的字符串类型，其中使用最广的即是 `String` 类型。

字符串是由字符组成的连续集合，但是在上一节中我们提到过，**Rust 中的字符是 Unicode 类型，因此每个字符占据 4 个字节内存空间，但是在字符串中不一样，字符串是 UTF-8 编码，也就是字符串中的字符所占的字节数是变化的(1 - 4)**，这样有助于大幅降低字符串所占用的内存空间。

`str` 类型是硬编码进可执行文件，也无法被修改，但是 `String` 则是一个可增长、可改变且具有所有权的 UTF-8 编码字符串，**当 Rust 用户提到字符串时，往往指的就是 `String` 类型和 `&str` 字符串切片类型，这两个类型都是 UTF-8 编码**。

切片

切片并不是 Rust 独有的概念，在 Go 语言中就非常流行，它允许你引用集合中部分连续的元素序列，而不是引用整个集合。

对于字符串而言，切片就是对 `String` 类型中某一部分的引用，

元组

元组是由多种类型组合到一起形成的，因此它是复合类型，元组的长度是固定的，元组中元素的顺序也是固定的。

```rust
fn main() {
    let tup: (i32, f64, u8) = (500, 6.4, 1);
}
```

变量 `tup` 被绑定了一个元组值 `(500, 6.4, 1)`，该元组的类型是 `(i32, f64, u8)`，看到没？元组是用括号将多个类型组合到一起，简单吧？

结构体

一个结构体有几部分组成：

- 通过关键字 `struct` 定义
- 一个清晰明确的结构体 `名称`
- 几个有名字的结构体 `字段`

枚举

枚举(enum 或 enumeration)允许你通过列举可能的成员来定义一个**枚举类型**，例如扑克牌花色

```rust
```

数组

在日常开发中，使用最广的数据结构之一就是数组，在 Rust 中，最常用的数组有两种，第一种是速度很快但是长度固定的 `array`，第二种是可动态增长的但是有性能损耗的 `Vector`，在本书中，我们称 `array` 为数组，`Vector` 为动态数组

这两个数组的关系跟 `&str` 与 `String` 的关系很像，前者是长度固定的字符串切片，后者是可动态增长的字符串。其实，在 Rust 中无论是 `String` 还是 `Vector`，它们都是 Rust 的高级类型：集合类型，

数组的具体定义很简单：将多个类型相同的元素依次组合在一起，就是一个数组。结合上面的内容，可以得出数组的三要素：

- 长度固定
- 元素必须有相同的类型
- 依次线性排列

**我们这里说的数组是 Rust 的基本类型，是固定长度的，这点与其他编程语言不同，其它编程语言的数组往往是可变长度的，与 Rust 中的动态数组 `Vector` 类似**，

```rust
```

### 集合类型

集合在 Rust 中是一类比较特殊的类型，因为 Rust 中大多数数据类型都只能代表一个特定的值，但是集合却可以代表一大堆值。而且与语言级别的数组、字符串类型不同，标准库里的这些家伙是分配在堆上，因此都可以进行动态的增加和减少

`Vector`、`HashMap` 再加上之前的 `String` 类型，是标准库中最最常用的集合类型

动态数组类型用 `Vec<T>` 表示。动态数组允许你存储多个值，这些值在内存中一个紧挨着另一个排列，因此访问其中某个元素的成本非常低。动态数组只能存储相同类型的元素，如果你想存储不同类型的元素，可以使用之前讲过的枚举类型或者特征对象。

创建动态数组

```rust
// v 被显式地声明了类型 Vec<i32>，这是因为 Rust 编译器无法从 Vec::new() 中得到任何关于类型的暗示信息，因此也无法推导出 v 的具体类型
let v: Vec<i32> = Vec::new();

// 或者下面这种，此时v 就无需手动声明类型，因为编译器通过 v.push(1)，推测出 v 中的元素类型是 i32，因此推导出 v 的类型是 Vec<i32>
let mut v = Vec::new();
v.push(1);

// 还可以使用宏 vec! 来创建数组，与 Vec::new 有所不同，前者能在创建同时给予初始化值
let v = vec![1, 2, 3];
```

向数组尾部添加元素，可以使用 `push` 方法

跟结构体一样，`Vector` 类型在超出作用域范围后，会被自动删除

```rust
{
    let v = vec![1, 2, 3];

    // ...
} // <- v超出作用域并在此处被删除
```

从vector中读取元素

读取指定位置的元素有两种方式可选：

- 通过下标索引访问。
- 使用 `get` 方法。

```rust
let v = vec![1, 2, 3, 4, 5];

let third: &i32 = &v[2];
println!("第三个元素是 {}", third);

match v.get(2) {
    Some(third) => println!("第三个元素是 {}", third),
    None => println!("去你的第三个元素，根本没有！"),
}
```

`v.get(2)` 也是访问第三个元素，但是有所不同的是，它返回了 `Option<&T>`，因此还需要额外的 `match` 来匹配解构出具体的值

当你确保索引不会越界的时候，就用索引访问，否则用 `.get`。例如，访问第几个数组元素并不取决于我们，而是取决于用户的输入时，用 `.get` 会非常适合

可以通过循环遍历数组

```rust
let mut v = vec![1, 2, 3];
for i in &mut v {
    *i += 10
}
```

HashMap

和动态数组一样，`HashMap` 也是 Rust 标准库中提供的集合类型，但是又与动态数组不同，`HashMap` 中存储的是一一映射的 `KV` 键值对，并提供了平均复杂度为 `O(1)` 的查询方法，当我们希望通过一个 `Key` 去查询值时，该类型非常有用，以致于 Go 语言将该类型设置成了语言级别的内置特性

Rust 中哈希类型（哈希映射）为 `HashMap<K,V>`，在其它语言中，也有类似的数据结构，例如 `hash map`，`map`，`object`，`hash table`，`字典` 等等

创建HashMap的方法跟创建动态数组 `Vec` 的方法类似，可以使用 `new` 方法来创建 `HashMap`，然后通过 `insert` 方法插入键值对。

```rust
use std::collections::HashMap;

// 创建一个HashMap，用于存储宝石种类和对应的数量
let mut my_gems = HashMap::new();

// 将宝石类型和对应的数量写入表中
my_gems.insert("红宝石", 1);
my_gems.insert("蓝宝石", 2);
my_gems.insert("河边捡的误以为是宝石的破石头", 18);
```

`HashMap` 也是内聚性的，即所有的 `K` 必须拥有同样的类型，`V` 也是如此

在实际使用中，不是所有的场景都能 `new` 一个哈希表后，然后悠哉悠哉的依次插入对应的键值对，而是可能会从另外一个数据结构中，获取到对应的数据，最终生成 `HashMap`

Rust 为我们提供了一个非常精妙的解决办法：先将 `Vec` 转为迭代器，接着通过 `collect` 方法，将迭代器中的元素收集后，转成 `HashMap`

```rust
fn main() {
    use std::collections::HashMap;

    let teams_list = vec![
        ("中国队".to_string(), 100),
        ("美国队".to_string(), 10),
        ("日本队".to_string(), 50),
    ];

    let teams_map: HashMap<_,_> = teams_list.into_iter().collect();

    println!("{:?}",teams_map)
}
```

查询HashMap

通过get方法获取元素

```rust
use std::collections::HashMap;

let mut scores = HashMap::new();

scores.insert(String::from("Blue"), 10);
scores.insert(String::from("Yellow"), 50);

let team_name = String::from("Blue");
let score: Option<&i32> = scores.get(&team_name);
```

更新元素

```rust
fn main() {
    use std::collections::HashMap;

    let mut scores = HashMap::new();

    scores.insert("Blue", 10);

    // 覆盖已有的值
    let old = scores.insert("Blue", 20);
    assert_eq!(old, Some(10));

    // 查询新插入的值
    let new = scores.get("Blue");
    assert_eq!(new, Some(&20));

    // 查询Yellow对应的值，若不存在则插入新值
    let v = scores.entry("Yellow").or_insert(5);
    assert_eq!(*v, 5); // 不存在，插入5

    // 查询Yellow对应的值，若不存在则插入新值
    let v = scores.entry("Yellow").or_insert(50);
    assert_eq!(*v, 5); // 已经存在，因此50没有插入
}
```



### 方法

从面向对象语言过来的同学对于方法肯定不陌生，`class` 里面就充斥着方法的概念。在 Rust 中，方法的概念也大差不差，往往和对象成对出现

Rust 使用 `impl` 来定义方法，例如

```rust
struct Circle {
    x: f64,
    y: f64,
    radius: f64,
}

impl Circle {
    // new是Circle的关联函数，因为它的第一个参数不是self
    // 这种方法往往用于初始化当前结构体的实例
    fn new(x: f64, y: f64, radius: f64) -> Circle {
        Circle {
            x: x,
            y: y,
            radius: radius,
        }
    }

    // Circle的方法，&self表示借用当前的Circle结构体
    fn area(&self) -> f64 {
        std::f64::consts::PI * (self.radius * self.radius)
    }
}
```

`&self` 其实是 `self: &Self` 的简写（注意大小写）。在一个 `impl` 块内，`Self` 指代被实现方法的结构体类型，`self` 指代此类型的实例，换句话说，`self` 指代的是 `Rectangle` 结构体实例，这样的写法会让我们的代码简洁很多，而且非常便于理解：我们为哪个结构体实现方法，那么 `self` 就是指代哪个结构体的实例。

需要注意的是，`self` 依然有所有权的概念：

- `self` 表示 `Rectangle` 的所有权转移到该方法中，这种形式用的较少
- `&self` 表示该方法对 `Rectangle` 的不可变借用
- `&mut self` 表示可变借用

总之，`self` 的使用就跟函数参数一样，要严格遵守 Rust 的所有权规则。

这种定义在 `impl` 中且没有 `self` 的函数被称之为**关联函数**： 因为它没有 `self`，不能用 `f.read()` 的形式调用，因此它是一个函数而不是方法，它又在`impl` 中，与结构体紧密关联，因此称为关联函数。

Rust 中有一个约定俗称的规则，使用 `new` 来作为构造器的名称，出于设计上的考虑，Rust 特地没有用 `new` 作为关键字

多个impl定义

Rust 允许我们为一个结构体定义多个 `impl` 块，目的是提供更多的灵活性和代码组织性，例如当方法多了后，可以把相关的方法组织在同一个 `impl` 块中，那么就可以形成多个 `impl` 块，各自完成一块儿目标

```rust
impl Rectangle {
    fn area(&self) -> u32 {
        self.width * self.height
    }
  
    fn can_hold(&self, other: &Rectangle) -> bool {
        self.width > other.width && self.height > other.height
    }
}
```



### 类型转换

可以使用类型转换符进行转换，转换时要注意类型

```rust
fn main() {
   let a = 3.1 as i8;
   let b = 100_i8 as i32;
   let c = 'a' as u8; // 将字符'a'转换为整数，97

   println!("{},{},{}",a,b,c)
}
```

TryInto转换

在一些场景中，使用 `as` 关键字会有比较大的限制。如果你想要在类型转换上拥有完全的控制而不依赖内置的转换，例如处理转换错误，那么可以使用 `TryInto`

```rust
use std::convert::TryInto;

fn main() {
   let a: u8 = 10;
   let b: u16 = 1500;

   let b_: u8 = b.try_into().unwrap();

   if a < b_ {
     println!("Ten is less than one hundred.");
   }
}
```



### 类型别名

通过type关键字生成类型别名

- 类型别名仅仅是别名，只是为了让可读性更好，并不是全新的类型，`newtype` 才是！
- 类型别名无法实现*为外部类型实现外部特征*等功能，而 `newtype` 可以

```rust
type Meters = u32

type Thunk = Box<dyn Fn() + Send + 'static>;

let f: Thunk = Box::new(|| println!("hi"));

fn takes_long_type(f: Thunk) {
    // --snip--
}

fn returns_long_type() -> Thunk {
    // --snip--
}
```



### 流程控制

在 Rust 语言中有三种循环方式：`for`、`while` 和 `loop`，其中 `for` 循环是 Rust 循环王冠上的明珠。

对于循环而言，`loop` 循环毋庸置疑，是适用面最高的，它可以适用于所有循环场景（虽然能用，但是在很多场景下， `for` 和 `while` 才是最优选择），因为 `loop` 就是一个简单的无限循环，你可以在内部实现逻辑通过 `break` 关键字来控制循环何时结束。

当使用 `loop` 时，必不可少的伙伴是 `break` 关键字，它能让循环在满足某个条件时跳出：

```rust
fn main() {
    let mut counter = 0;

    let result = loop {
        counter += 1;

        if counter == 10 {
            break counter * 2;
        }
    };

    println!("The result is {}", result);
}
```

- **break 可以单独使用，也可以带一个返回值**，有些类似 `return`
- **loop 是一个表达式**，因此可以返回一个值

`for` 循环是 Rust 的大杀器：

```rust
//for 元素 in 集合 {
// 使用元素干一些你懂我不懂的事情
//}
fn main() {
    for i in 1..=5 {
        println!("{}",i);
    }
}

for item in &mut collection {
  // ...
}

fn main() {
    let a = [4,3,2,1];
    // `.iter()` 方法把 `a` 数组变成一个迭代器
    // 获取索引
    for (i,v) in a.iter().enumerate() {
        println!("第{}个元素是{}",i+1,v);
    }
}
```

使用方法总结

| 使用方法                      | 等价使用方式                                      | 所有权     |
| ----------------------------- | ------------------------------------------------- | ---------- |
| `for item in collection`      | `for item in IntoIterator::into_iter(collection)` | 转移所有权 |
| `for item in &collection`     | `for item in collection.iter()`                   | 不可变借用 |
| `for item in &mut collection` | `for item in collection.iter_mut()`               | 可变借用   |



### 模式匹配

模式匹配经常出现在函数式编程里，用于为复杂的类型系统提供一个轻松的解构能力。

在 Rust 中，模式匹配最常用的就是 `match` 和 `if let`

```rust
match target {
    模式1 => 表达式1,
    模式2 => {
        语句1;
        语句2;
        表达式2
    },
    _ => 表达式3
}

enum Direction {
    East,
    West,
    North,
    South,
}

fn main() {
    let dire = Direction::South;
    match dire {
        Direction::East => println!("East"),
        Direction::North | Direction::South => {
            println!("South or North");
        },
        _ => println!("West"),
    };
}
```

这里我们想去匹配 `dire` 对应的枚举类型，因此在 `match` 中用三个匹配分支来完全覆盖枚举变量 `Direction` 的所有成员类型，有以下几点值得注意：

- `match` 的匹配必须要穷举出所有可能，因此这里用 `_` 来代表未列出的所有可能性
- `match` 的每一个分支都必须是一个表达式，且所有分支的表达式最终返回值的类型必须相同
- **X | Y**，类似逻辑运算符 `或`，代表该分支可以匹配 `X` 也可以匹配 `Y`，只要满足一个即可

其实 `match` 跟其他语言中的 `switch` 非常像，`_` 类似于 `switch` 中的 `default`。

通过将 `_` 其放置于其他分支后，`_` 将会匹配所有遗漏的值。`()` 表示返回**单元类型**与所有分支返回值的类型相同，所以当匹配到 `_` 后，什么也不会发生。

有时会遇到只有一个模式的值需要被处理，其它值直接忽略的场景, 此时 `match` 就显得过于啰嗦。

杀鸡焉用牛刀，这种情况可以用 `if let` 的方式来实现

```rust
let v = Some(3u8);
if let Some(3) = v {
    println!("three");
}
```



## 返回值和错误处理

Go 语言为人诟病的其中一点就是 ***if err != nil {}\*** 的大量使用，缺乏一些程序设计的美感

与 Go 语言不同，Rust 博采众家之长，实现了颇具自身色彩的返回值和错误处理体系，

错误对于软件来说是不可避免的，因此一门优秀的编程语言必须有其完整的错误处理哲学。在很多情况下，Rust 需要你承认自己的代码可能会出错，并提前采取行动，来处理这些错误。

Rust 中的错误主要分为两类：

- **可恢复错误**，通常用于从系统全局角度来看可以接受的错误，例如处理用户的访问、操作等错误，这些错误只会影响某个用户自身的操作进程，而不会对系统的全局稳定性产生影响
- **不可恢复错误**，刚好相反，该错误通常是全局性或者系统性的错误，例如数组越界访问，系统启动时发生了影响启动流程的错误等等，这些错误的影响往往对于系统来说是致命的

很多编程语言，并不会区分这些错误，而是直接采用异常的方式去处理。Rust 没有异常，但是 Rust 也有自己的卧龙凤雏：`Result<T, E>` 用于可恢复错误，`panic!` 用于不可恢复错误。

假设，我们有一台消息服务器，每个用户都通过 websocket 连接到该服务器来接收和发送消息，该过程就涉及到 socket 文件的读写，那么此时，如果一个用户的读写发生了错误，显然不能直接 `panic`，否则服务器会直接崩溃，所有用户都会断开连接，因此我们需要一种更温和的错误处理方式：`Result<T, E>`。

`Result<T, E>` 是一个枚举类型，定义如下：

```rust
enum Result<T, E> {
    Ok(T),
    Err(E),
}
```

泛型参数 `T` 代表成功时存入的正确值的类型，存放方式是 `Ok(T)`，`E` 代表错误是存入的错误值，存放方式是 `Err(E)`，

```rust
use std::fs::File;

fn main() {
    let f = File::open("hello.txt");
}
```

Rust 为我们提供了 `panic!` 宏，当调用执行该宏时，**程序会打印出一个错误信息，展开报错点往前的函数调用堆栈，最后退出程序**。

切记，一定是不可恢复的错误，才调用 `panic!` 处理，你总不想系统仅仅因为用户随便传入一个非法参数就崩溃吧？所以，**只有当你不知道该如何处理时，再去调用 panic!**.

在真实场景中，错误往往涉及到很长的调用链甚至会深入第三方库，如果没有栈展开技术，错误将难以跟踪处理，

```rust
fn main() {
    let v = vec![1, 2, 3];

    v[99];
}
```

上面的代码很简单，数组只有 `3` 个元素，我们却尝试去访问它的第 `100` 号元素(数组索引从 `0` 开始)，那自然会崩溃。

如果有过 C 语言的经验，即使你越界了，问题不大，我依然尝试去访问，至于这个值是不是你想要的（`100` 号内存地址也有可能有值，只不过是其它变量或者程序的！），抱歉，不归我管，我只负责取，你要负责管理好自己的索引访问范围。上面这种情况被称为**缓冲区溢出**，并可能会导致安全漏洞，例如攻击者可以通过索引来访问到数组后面不被允许的数据。

说实话，我宁愿程序崩溃，为什么？当你取到了一个不属于你的值，这在很多时候会导致程序上的逻辑 BUG！ 有编程经验的人都知道这种逻辑上的 BUG 是多么难被发现和修复！因此程序直接崩溃，然后告诉我们问题发生的位置，最后我们对此进行修复，这才是最合理的软件开发流程，而不是把问题藏着掖着

当出现 `panic!` 时，程序提供了两种方式来处理终止流程：**栈展开**和**直接终止**。

其中，默认的方式就是 `栈展开`，这意味着 Rust 会回溯栈上数据和函数调用，因此也意味着更多的善后工作，好处是可以给出充分的报错信息和栈调用信息，便于事后的问题复盘。`直接终止`，顾名思义，不清理数据就直接退出程序，善后工作交与操作系统来负责。

对于绝大多数用户，使用默认选择是最好的，但是当你关心最终编译出的二进制可执行文件大小时，那么可以尝试去使用直接终止的方式，例如下面的配置修改 `Cargo.toml` 文件，实现在 [`release`](https://course.rs/first-try/cargo.html#手动编译和运行项目) 模式下遇到 `panic` 直接终止：

```toml
[profile.release]
panic = 'abort'
```

长话短说，如果是 `main` 线程，则程序会终止，如果是其它子线程，该线程会终止，但是不会影响 `main` 线程。因此，尽量不要在 `main` 线程中做太多任务，将这些任务交由子线程去做，就算子线程 `panic` 也不会导致整个程序的结束。

上面的代码就是一次栈展开(也称栈回溯)，它包含了函数调用的顺序，当然按照逆序排列：最近调用的函数排在列表的最上方。因为咱们的 `main` 函数基本是最先调用的函数了，所以排在了倒数第二位，还有一个关注点，排在最顶部最后一个调用的函数是 `rust_begin_unwind`，该函数的目的就是进行栈展开，呈现这些列表信息给我们。

要获取到栈回溯信息，你还需要开启 `debug` 标志，该标志在使用 `cargo run` 或者 `cargo build` 时自动开启（这两个操作默认是 `Debug` 运行方式）。同时，栈展开信息在不同操作系统或者 Rust 版本上也所有不同。



组合器

将对象组合成树形结构以表示“部分整体”的层次结构。组合模式使得用户对单个对象和组合对象的使用具有一致性。–GoF <<设计模式>>

与组合器模式有所不同，在 Rust 中，组合器更多的是用于对返回结果的类型进行变换：例如使用 `ok_or` 将一个 `Option` 类型转换成 `Result` 类型。



## Rust语言规范

通常，对于 **type-level** 的构造 Rust 倾向于使用**驼峰命名法**，而对于 **value-level** 的构造使用**蛇形命名法**。

| 条目                               | 惯例                                                         |
| ---------------------------------- | ------------------------------------------------------------ |
| 包 Crates                          | [unclear](https://github.com/rust-lang/api-guidelines/issues/29) |
| 模块 Modules                       | `snake_case`                                                 |
| 类型 Types                         | `UpperCamelCase`                                             |
| 特征 Traits                        | `UpperCamelCase`                                             |
| 枚举 Enumerations                  | `UpperCamelCase`                                             |
| 结构体 Structs                     | `UpperCamelCase`                                             |
| 函数 Functions                     | `snake_case`                                                 |
| 方法 Methods                       | `snake_case`                                                 |
| 通用构造器 General constructors    | `new` or `with_more_details`                                 |
| 转换构造器 Conversion constructors | `from_some_other_type`                                       |
| 宏 Macros                          | `snake_case!`                                                |
| 局部变量 Local variables           | `snake_case`                                                 |
| 静态类型 Statics                   | `SCREAMING_SNAKE_CASE`                                       |
| 常量 Constants                     | `SCREAMING_SNAKE_CASE`                                       |
| 类型参数 Type parameters           | `UpperCamelCase`，通常使用一个大写字母: `T`                  |
| 生命周期 Lifetimes                 | 通常使用小写字母: `'a`，`'de`，`'src`                        |
| Features                           | [unclear](https://github.com/rust-lang/api-guidelines/issues/101) but see [C-FEATURE](https://course.rs/practice/naming.html#c-feature) |

## Rust资源

rust版本指南： https://rustwiki.org/zh-CN/

cargo中文文档：https://cargo.budshome.com/guide/

rust语言圣经：https://course.rs/first-try/installation.html

rust练习: https://practice.rs

