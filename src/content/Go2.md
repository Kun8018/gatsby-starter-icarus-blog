---
title: Golang语言开发(二)
date: 2020-03-02 21:40:33
categories: 技术博客
tags:
    - Web,IT,Go
toc: true
thumbnail: https://s1.ax1x.com/2020/04/20/J1Iu4O.th.jpg
---

　　go语言开发第二篇

<!--more-->

## 引用数据类型

### 结构体

Go 通过类型别名（alias types）和结构体的形式支持用户自定义类型，或者叫定制类型。一个带属性的结构体试图表示一个现实世界中的实体。结构体是复合类型（composite types），当需要定义一个类型，它由一系列属性组成，每个属性都有自己的类型和值的时候，就应该使用结构体，它把数据聚集在一起。然后可以访问这些数据，就好像它是一个独立实体的一部分。结构体也是值类型，因此可以通过 **new** 函数来创建。

组成结构体类型的那些数据称为 **字段（fields）**。每个字段都有一个类型和一个名字；在一个结构体中，字段名字必须是唯一的。

结构体的概念在软件工程上旧的术语叫 ADT（抽象数据类型：Abstract Data Type），在一些老的编程语言中叫 **记录（Record）**，比如 Cobol，在 C 家族的编程语言中它也存在，并且名字也是 **struct**，在面向对象的编程语言中，跟一个无方法的轻量级类一样。不过因为 Go 语言中没有类的概念，因此在 Go 中结构体有着更为重要的地位。

结构体的定义方式

```go
type identifier struct {
    field1 type1
    field2 type2
    ...
}
```

`type T struct {a, b int}` 也是合法的语法，它更适用于简单的结构体。

结构体里的字段都有 **名字**，像 field1、field2 等，如果字段在代码中从来也不会被用到，那么可以命名它为 **_**。

标签

结构体中的字段除了有名字和类型外，还可以有一个可选的标签（tag）：它是一个附属于字段的字符串，可以是文档或其他的重要标记。标签的内容不可以在一般的编程中使用，只有包 `reflect` 能获取它。

如果变量是一个结构体类型，就可以通过 Field 来索引结构体的字段，然后就可以使用 Tag 属性。

```go
```

匿名字段



#### 递归结构体

结构体类型可以通过引用自身来定义。这在定义链表或二叉树的元素（通常叫节点）时特别有用，此时节点包含指向临近节点的链接（地址）。如下所示，链表中的 `su`，树中的 `ri` 和 `le` 分别是指向别的节点的指针。

这块的 `data` 字段用于存放有效数据（比如 float64），`su` 指针指向后继节点。



#### 方法

在 Go 语言中，结构体就像是类的一种简化形式，那么面向对象程序员可能会问：类的方法在哪里呢？在 Go 中有一个概念，它和方法有着同样的名字，并且大体上意思相同：Go 方法是作用在接收者（receiver）上的一个函数，接收者是某种类型的变量。因此方法是一种特殊类型的函数。

接收者类型可以是（几乎）任何类型，不仅仅是结构体类型：任何类型都可以有方法，甚至可以是函数类型，可以是 int、bool、string 或数组的别名类型。但是接收者不能是一个接口类型（参考 第 11 章），因为接口是一个抽象定义，但是方法却是具体实现；如果这样做会引发一个编译错误：**invalid receiver type…**。

最后接收者不能是一个指针类型，但是它可以是任何其他允许类型的指针。



#### 函数和方法的区别

函数将变量作为参数：**Function1(recv)**

方法在变量上被调用：**recv.Method1()**

在接收者是指针时，方法可以改变接收者的值（或状态），这点函数也可以做到（当参数作为指针传递，即通过引用调用时，函数也可以改变参数的状态）。

**不要忘记 Method1 后边的括号 ()，否则会引发编译器错误：`method recv.Method1 is not an expression, must be called`**

接收者必须有一个显式的名字，这个名字必须在方法中被使用。

**receiver_type** 叫做 **（接收者）基本类型**，这个类型必须在和方法同样的包中被声明。

在 Go 中，（接收者）类型关联的方法不写在类型结构里面，就像类那样；耦合更加宽松；类型和方法之间的关联由接收者来建立。

**方法没有和数据定义（结构体）混在一起：它们是正交的类型；表示（数据）和行为（方法）是独立的。**





## 函数

函数是Go语言的一等公民

### init函数

变量除了可以在全局声明中初始化，也可以在 init 函数中初始化。这是一类非常特殊的函数，它不能够被人为调用，而是在每个包完成初始化后自动执行，并且执行优先级比 main 函数高

每个源文件可以包含多个 init 函数，同一个源文件中的 init函数会按照从上到下的顺序执行，如果一个包有多个源文件包含 init 函数的话，则官方鼓励但不保证以文件名的顺序调用。初始化总是以单线程并且按照包的依赖关系顺序执行

一个可能的用途是在开始执行程序之前对数据进行检验或修复，以保证程序状态的正确性

```go
package trans

import "math"

var Pi float64

func init() {
   Pi = 4 * math.Atan(1) // init() function computes Pi
}
```



### 接口

Go 语言不是一种 *“传统”* 的面向对象编程语言：它里面没有类和继承的概念。

但是 Go 语言里有非常灵活的 **接口** 概念，通过它可以实现很多面向对象的特性。接口提供了一种方式来 **说明** 对象的行为：如果谁能搞定这件事，它就可以用在这儿。

接口定义了一组方法（方法集），但是这些方法不包含（实现）代码：它们没有被实现（它们是抽象的）。接口里也不能包含变量。

```go
type Namer interface {
    Method1(param_list) return_type
    Method2(param_list) return_type
    ...
}
```

接口的名字由方法名加 `er` 后缀组成，例如 `Printer`、`Reader`、`Writer`、`Logger`、`Converter` 等等。还有一些不常用的方式（当后缀 `er` 不合适时），比如 `Recoverable`，此时接口名以 `able` 结尾，或者以 `I` 开头（像 `.NET` 或 `Java` 中那样）。

一个接口可以包含一个或多个其他的接口，这相当于直接将这些内嵌接口的方法列举在外层接口中一样

```go
type ReadWrite interface {
    Read(b Buffer) bool
    Write(b Buffer) bool
}

type Lock interface {
    Lock()
    Unlock()
}

type File interface {
    ReadWrite
    Lock
    Close()
}
```

空接口

**空接口或者最小接口** 不包含任何方法，它对实现不做任何要求

```go
type Any interface {}
```

任何其他类型都实现了空接口（它不仅仅像 `Java/C#` 中 `Object` 引用类型），`any` 或 `Any` 是空接口一个很好的别名或缩写。

空接口类似 `Java/C#` 中所有类的基类： `Object` 类，二者的目标也很相近。

可以给一个空接口类型的变量 `var val interface {}` 赋任何类型的值。



### 反射

虽然在大多数的应用和服务中并不常见，但是很多框架都依赖 Go 语言的反射机制简化代码。因为 Go 语言的语法元素很少、设计简单，所以它没有特别强的表达能力，但是 Go 语言的 [`reflect`](https://golang.org/pkg/reflect/) 包能够弥补它在语法上[`reflect.Type`](https://draveness.me/golang/tree/reflect.Type)的一些劣势

[`reflect`](https://golang.org/pkg/reflect/) 实现了运行时的反射能力，能够让程序操作不同类型的对象[1](https://draveness.me/golang/docs/part2-foundation/ch04-basic/golang-reflect/#fn:1)。反射包中有两对非常重要的函数和类型，两个函数分别是：

- [`reflect.TypeOf`](https://draveness.me/golang/tree/reflect.TypeOf) 能获取类型信息；
- [`reflect.ValueOf`](https://draveness.me/golang/tree/reflect.ValueOf) 能获取数据的运行时表示；

类型 [`reflect.Type`](https://draveness.me/golang/tree/reflect.Type) 是反射包定义的一个接口，我们可以使用 [`reflect.TypeOf`](https://draveness.me/golang/tree/reflect.TypeOf) 函数获取任意变量的类型

运行时反射是程序在运行期间检查其自身结构的一种方式。反射带来的灵活性是一把双刃剑，反射作为一种元编程方式可以减少重复代码[2](https://draveness.me/golang/docs/part2-foundation/ch04-basic/golang-reflect/#fn:2)，但是过量的使用反射会使我们的程序逻辑变得难以理解并且运行缓慢

反射的三大法则：

1. 从 `interface{}` 变量可以反射出反射对象；
2. 从反射对象可以获取 `interface{}` 变量；
3. 要修改反射对象，其值必须可设置；



## 指针

不像 Java 和 .NET，Go 语言为程序员提供了控制数据结构的指针的能力；但是，你不能进行指针运算。通过给予程序员基本内存布局，Go 语言允许你控制特定集合的数据结构、分配的数量以及内存访问模式，这些对构建运行良好的系统是非常重要的：指针对于性能的影响是不言而喻的，而如果你想要做的是系统编程、操作系统或者网络应用，指针更是不可或缺的一部分。

Go 语言和 C、C++ 以及 D 语言这些低级（系统）语言一样，都有指针的概念。但是对于经常导致 C 语言内存泄漏继而程序崩溃的指针运算（所谓的指针算法，如：`pointer+2`，移动指针指向字符串的字节数或数组的某个位置）是不被允许的。Go 语言中的指针保证了内存安全，更像是 Java、C# 和 VB.NET 中的引用。

程序在内存中存储它的值，每个内存块（或字）有一个地址，通常用十六进制数表示，如：`0x6b0820` 或 `0xf84001d7f0`。

Go 语言的取地址符是 `&`，放到一个变量前使用就会返回相应变量的内存地址。

**一个指针变量可以指向任何一个值的内存地址** 它指向那个值的内存地址，在 32 位机器上占用 4 个字节，在 64 位机器上占用 8 个字节，并且与它所指向的值的大小无关。当然，可以声明指针指向任何类型的值来表明它的原始性或结构性；你可以在指针类型前面加上 * 号（前缀）来获取指针所指向的内容，这里的 * 号是一个类型更改器。使用一个指针引用一个值被称为间接引用。

当一个指针被定义后没有分配到任何变量时，它的值为 `nil`。

一个指针变量通常缩写为 `ptr`。

指针也可以指向另一个指针，并且可以进行任意深度的嵌套，导致你可以有多级的间接引用，但在大多数情况这会使你的代码结构不清晰。

## 控制结构



```go

```



```go
func unhex(c byte) byte {
  switch {
    case '0' <= c && c <= '9':
    	return c - '0'
    case 'a' <= c && c <= 'f':
    	return c - 'a' + 10
    case 'A' <= c && c <= 'F':
    	return c - 'A' + 10
  }
  return 0
}
```



类型选择

```go
var t interface{}

t = functionOfSomeType()

switch t := t.(type) {
  default:
  	fmt.Printf("unexpected type")
  case bool:
  	fmt.Printf("unexpected type")
	case int:
  	fmt.Printf("unexpected type")
	case *bool:
  	fmt.Printf("unexpected type")
  case *int:
  	fmt.Printf("unexpected type")
}
```



## 关键字



defer

Go 语言的 `defer` 会在当前函数返回前执行传入的函数，它会经常被用于关闭文件描述符、关闭数据库连接以及解锁资源



select





panic与recover

`panic` 能够改变程序的控制流，函数调用`panic` 时会立刻停止执行函数的其他代码，并在执行结束后在当前 Goroutine 中递归执行调用方的延迟函数调用 `defer`；

`recover` 可以中止 `panic` 造成的程序崩溃。它是一个只能在 `defer` 中发挥作用的函数，在其他作用域中调用不会发挥任何作用；

Panic和recover常用于错误处理

```go
func CubeRoot(x float64) float64 {
  z := x/3
  for i := 0; i < 1e6; i++ {
    prevz := z
    z -= (z*z*z-x) / (3*z*z)
    if veryClose(z,prez) {
      return z
    }
  }
  
  panic(fmt.Sprintf("CubeRoot(g%) did not converge", x))
}
```



```go
func server(workChan <-chan *Work) {
  for work := range workChan {
    go safelyDo(work)
  }
}

func safeliDo(work *Work) {
  defer func() {
    if err := recover(); err != nil {
      log.Println("work failed", err)
    }
  }()
  do(work)
}
```





make和new

`make` 的作用是初始化内置的数据结构，也就是我们在前面提到的切片、哈希表和 Channel[2](https://draveness.me/golang/docs/part2-foundation/ch05-keyword/golang-make-and-new/#fn:2)；

`new` 的作用是根据传入的类型分配一片内存空间并返回指向这片内存空间的指针[3](https://draveness.me/golang/docs/part2-foundation/ch05-keyword/golang-make-and-new/#fn:3)；



## 文件读写

在 Go 语言中，文件使用指向 `os.File` 类型的指针来表示的，也叫做文件句柄。我们在前面章节使用到过标准输入 `os.Stdin` 和标准输出 `os.Stdout`，他们的类型都是 `*os.File`



### 用切片读取文件

切片提供了 Go 中处理 I/O 缓冲的标准方式，下面 `cat` 函数的第二版中，在一个切片缓冲内使用无限 for 循环（直到文件尾部 EOF）读取文件，并写入到标准输出（`os.Stdout`）

```go
func cat(f *os.File) {
	const NBUF = 512
	var buf [NBUF]byte
	for {
		switch nr, err := f.Read(buf[:]);  {
		case nr < 0:
			fmt.Fprintf(os.Stderr, "cat: error reading: %s\n", err.Error())
			os.Exit(1)
		case nr == 0: // EOF
			return
		case nr > 0:
			if nw, ew := os.Stdout.Write(buf[0:nr]); nw != nr {
				fmt.Fprintf(os.Stderr, "cat: error writing: %s\n", ew.Error())
			}
		}
	}
}
```



### 拷贝

拷贝文件最简单的方式就是使用 io 包

```go
// filecopy.go
package main

import (
	"fmt"
	"io"
	"os"
)

func main() {
	CopyFile("target.txt", "source.txt")
	fmt.Println("Copy done!")
}

func CopyFile(dstName, srcName string) (written int64, err error) {
	src, err := os.Open(srcName)
	if err != nil {
		return
	}
	defer src.Close()

	dst, err := os.Create(dstName)
	if err != nil {
		return
	}
	defer dst.Close()

	return io.Copy(dst, src)
}
```



### Json包

数据结构要在网络中传输或保存到文件，就必须对其编码和解码；目前存在很多编码格式：JSON，XML，gob，Google 缓冲协议等等。Go 语言支持所有这些编码格式；

结构可能包含二进制数据，如果将其作为文本打印，那么可读性是很差的。另外结构内部可能包含匿名字段，而不清楚数据的用意。

通过把数据转换成纯文本，使用命名的字段来标注，让其具有可读性。这样的数据格式可以通过网络传输，而且是与平台无关的，任何类型的应用都能够读取和输出，不与操作系统和编程语言的类型相关。

下面是一些术语说明：

- 数据结构 --> 指定格式 = **序列化** 或 **编码**（传输之前）
- 指定格式 --> 数据结构 = **反序列化** 或 **解码**（传输之后）

序列化是在内存中把数据转换成指定格式（数据 -> 字符串），反之亦然（字符串 -> 数据）。

编码也是一样的，只是输出一个数据流（实现了 `io.Writer` 接口）；解码是从一个数据流（实现了 `io.Reader`）输出到一个数据结构。

我们都比较熟悉 XML 格式(参阅 [12.10](https://github.com/unknwon/the-way-to-go_ZH_CN/blob/master/eBook/12.9.md))；但有些时候 JSON（JavaScript Object Notation，参阅 [http://json.org](http://json.org/)）被作为首选，主要是由于其格式上非常简洁。通常 JSON 被用于 web 后端和浏览器之间的通讯，但是在其它场景也同样的有用。

尽管 XML 被广泛的应用，但是 JSON 更加简洁、轻量（占用更少的内存、磁盘及网络带宽）和更好的可读性，这也使它越来越受欢迎。

Go 语言的 `json` 包可以让你在程序中方便的读取和写入 JSON 数据。

我们将在下面的例子里使用 `json` 包，并使用练习 10.1 [vcard.go](https://github.com/unknwon/the-way-to-go_ZH_CN/blob/master/eBook/exercises/chapter_10/vcard.go) 中一个简化版本的 `Address` 和 `VCard` 结构

JSON 与 Go 类型对应如下：

- `bool` 对应 JSON 的 boolean
- `float64` 对应 JSON 的 number
- `string` 对应 JSON 的 string
- `nil` 对应 JSON 的 null

不是所有的数据都可以编码为 JSON 类型，只有验证通过的数据结构才能被编码：

- JSON 对象只支持字符串类型的 key；要编码一个 Go `map` 类型，`map` 必须是 `map[string]T`（`T` 是 `json` 包中支持的任何类型）
- Channel，复杂类型和函数类型不能被编码
- 不支持循环数据结构；它将引起序列化进入一个无限循环
- 指针可以被编码，实际上是对指针指向的值进行编码（或者指针是 `nil`）





## 包

包是结构化代码的一种方式：每个程序都由包（通常简称为 pkg）的概念组成，可以使用自身的包或者从其它包中导入内容。

包是函数和数据的集合。用package保留字定义一个包，文件名不需要与包名一致，包名的约定是小写字符。

如同其它一些编程语言中的类库或命名空间的概念，每个 Go 文件都属于且仅属于一个包。一个包可以由许多以 `.go` 为扩展名的源文件组成，因此文件名和包名一般来说都是不相同的。

你必须在源文件中非注释的第一行指明这个文件属于哪个包，如：`package main`。`package main`表示一个可独立执行的程序，每个 Go 应用程序都包含一个名为 `main` 的包。

一个应用程序可以包含不同的包，而且即使你只使用 main 包也不必把所有的代码都写在一个巨大的文件里：你可以用一些较小的文件，并且在每个文件非注释的第一行都使用 `package main` 来指明这些文件都属于 main 包。如果你打算编译包名不是为 main 的源文件，如 `pack1`，编译后产生的对象文件将会是 `pack1.a` 而不是可执行程序。另外要注意的是，所有的包名都应该使用小写字母

引入包

单个引入包

```go
import "fmt"
import "os"
```

### 常用包



fmt:包fmt实现了格式化的I/O函数，这与C的printf和scanf类似

io：这个包提供了原始的I/O操作界面

bufio：这个包实现了缓冲的io

sync：sync包提供了基本的同步原语

sort:sort包提供了对数组和用户定义集合的原始的排序功能

strconv：strconv包提供了字符串与基本数据类型的转换功能

text/template:数据驱动的模版，用于生成文本输出，例如HTML

net/http:net/http实现了http请求、响应和URL的解析，并提供了可扩展的HTTP服务和基本的HTTP客户端

unsafe:unsafe包包含了Go程序中数据类型上所有不安全的操作，通常无须使用这个

encoding/json:实现了编码和解码RFC 4627定义的JSON对象

reflect:实现了运行时反射，允许程序通过抽象类型操作对象

flag：flag包实现了命令行的解析

os/exec:os/exec包执行外部命令



## 错误处理

库函数很多时候必须将错误信息返回给函数的调用者，Go允许函数有多个返回值的特性，使得函数的调用者在得到正常返回值的同时，可以获取更为详细的错误信息。

简单的错误类型为内置的简单接口，错误类型为error

```go
type error interface {
  Error() string
}
```

库开发者可以使用更丰富的模型实现这个接口，这样不仅可以看到错误，还可以提供一些上下文，比如像这样返回文件路径

```go
type PathError struct {
	Op string
  Path string
  Err error
}

func (e *PathError) Error() string {
  return e.Op + e.Path + e.Err.Error();
}
```





## 数据库

数据库几乎是所有 Web 服务不可或缺的一部分，在所有类型的数据库中，关系型数据库是我们在想要持久存储数据时的首要选择，不过因为关系型数据库的种类繁多，所以 Go 语言的标准库 [`database/sql`](https://golang.org/pkg/database/sql/) 就为访问关系型数据提供了通用的接口，这样不同数据库只要实现标准库中的接口，应用程序就可以通过标准库中的方法访问。

结构化查询语言（Structured Query Language、SQL）是在关系型数据库系统中使用的领域特定语言（Domain-Specific Language、DSL），它主要用于处理结构化的数据[1](https://draveness.me/golang/docs/part4-advanced/ch09-stdlib/golang-database-sql/#fn:1)。作为一门领域特定语言，它由更加强大的表达能力，与传统的命令式 API 相比，它能够提供两个优点：

1. 可以使用单个命令在数据库中访问多条数据；
2. 不需要在查询中指定获取数据的方法；

所有的关系型数据库都会提供 SQL 作为查询语言，应用程序可以使用相同的 SQL 查询在不同数据库中查询数据，



## 模版引擎/Hugo

hugo是基于go语言实现的静态站点生成器，并且利用了Go html/template模版，Go modules等多项技术

Hugo静态网页的数据内容主要来源有四个：

一是Markdown文件，每个文件顶部都可以设置参数，这个区域叫做扉页，文件后面是内容

二是config.toml站点的配置文件

三是data目录下的数据文件

四是通过ajax请求，还可以在页面请求外部服务器的数据服务，比如表单数据，评论数据等等

页面与文件目录结构

文件目录为：

static：静态资源存放目录，图片、css、js库等，可以放到这里，编译时会自动原样复制到public目录。可以有多个静态目录

public：静态站点的文件输出目录

config：Hugo有大量的配置指令，此目录用于保存Json、Yaml、toml等配置文件。最简单的项目只需要一个config.toml文件

每个文件对应一个配置根对象，比如Params，Menus、Languages等

content：所有内容页面存放页，

resouce：资源缓冲目录，非默认创建，用于加速hugo的生成过程，也可以用作给模版作者分发构建好的sass文件，因此不必另外安装预处理器



### 模版引擎

条件判断

```go
{{ if pipeline }}
      T1
{{else if pipeline}}
      T0
{{else}} 
      T
{{end}}
```

循环

```go
{{range pipeline}}
    	T1
{{end}}
```

模版嵌套

```go
{{ partial "<path>/<patial>.html"}}
```

### 路由/列表页

Hugo中一切皆页面，“everything in Hugo is a Page”。当需要新路由时，在对应的content下面新建子目录，并在子目录下面新建_index.md

当需要列表页时，在



### 变量

Hugo中可以使用自定义变量，并且它提供很多预定义的全局变量可以使用

.Site Params

在配置文件中添加Params参数，在模版中就能使用

```toml
baseURL: https://yoursite.example.com/
params: 
  author: Nikola Tesla
  description:Tesla's Awesome Hugo Site
```

然后在模版引擎中使用

```html
<meta name="description" content="{{if IsHome}}"
```

.Site.Pages



## Go.sum和Go.mod

Go在做依赖管理时会创建两个文件，go.mod和go.sum

gomod是官方推荐的包管理方式，开始于go1.11，在go1.12基本稳定，go1.13默认开启

通过go mod init方式产生go mod文件

go mod提供了module、require、replace、和exclude四个命令



go mod tidy：移除所有代码中不需要的包

go mod edit fmt：格式化文本

go sum类似于package-lock json文件，



## 调试工具

编译指令

```shell
go tool compile -S -N -l main.go
```



## 格式化

Go 开发团队不想要 Go 语言像许多其它语言那样总是在为代码风格而引发无休止的争论，浪费大量宝贵的开发时间，因此他们制作了一个工具：`go fmt`（`gofmt`）。这个工具可以将你的源代码格式化成符合官方统一标准的风格，属于语法风格层面上的小型重构。遵循统一的代码风格是 Go 开发中无可撼动的铁律，因此你必须在编译或提交版本管理系统之前使用 `gofmt` 来格式化你的代码。

尽管这种做法也存在一些争论，但使用 `gofmt` 后你不再需要自成一套代码风格而是和所有人使用相同的规则。这不仅增强了代码的可读性，而且在接手外部 Go 项目时，可以更快地了解其代码的含义。此外，大多数开发工具也都内置了这一功能。

Go 对于代码的缩进层级方面使用 tab 还是空格并没有强制规定，一个 tab 可以代表 4 个或 8 个空格。在实际开发中，1 个 tab 应该代表 4 个空格，而在本身的例子当中，每个 tab 代表 8 个空格。至于开发工具方面，一般都是直接使用 tab 而不替换成空格。

在命令行输入 `gofmt –w program.go` 会格式化该源文件的代码然后将格式化后的代码覆盖原始内容（如果不加参数 `-w` 则只会打印格式化后的结果而不重写文件）；`gofmt -w *.go` 会格式化并重写所有 Go 源文件；`gofmt map1` 会格式化并重写 map1 目录及其子目录下的所有 Go 源文件。

`gofmt` 也可以通过在参数 `-r` 后面加入用双引号括起来的替换规则实现代码的简单重构，规则的格式：`<原始内容> -> <替换内容>`。

实例：

```shell
gofmt -r '(a) -> a' –w *.go
## 上面的代码会将源文件中没有意义的括号去掉
gofmt -r 'a[n:len(a)] -> a[n:]' –w *.go
## 上面的代码会将源文件中多余的 len(a) 去掉
gofmt –r 'A.Func1(a,b) -> A.Func2(b,a)' –w *.go
## 上面的代码会将源文件中符合条件的函数的参数调换位置。
```



## 代码文档

`go doc` 工具会从 Go 程序和包文件中提取顶级声明的首行注释以及每个对象的相关注释，并生成相关文档。

它也可以作为一个提供在线文档浏览的 web 服务器，[http://golang.org](http://golang.org/) 就是通过这种形式实现的。

**一般用法**

- `go doc package` 获取包的文档注释，例如：`go doc fmt` 会显示使用 `godoc` 生成的 `fmt` 包的文档注释。
- `go doc package/subpackage` 获取子包的文档注释，例如：`go doc container/list`。
- `go doc package function` 获取某个函数在某个包中的文档注释，例如：`go doc fmt Printf` 会显示有关 `fmt.Printf()` 的使用说明。

这个工具只能获取在 Go 安装目录下 `../go/src` 中的注释内容。此外，它还可以作为一个本地文档浏览 web 服务器。在命令行输入 `godoc -http=:6060`，然后使用浏览器打开 [http://localhost:6060](http://localhost:6060/) 后，你就可以看到本地文档浏览服务器提供的页面。

`godoc` 也可以用于生成非标准库的 Go 源码文件的文档注释



## 其他工具

Go 自带的工具集主要使用脚本和 Go 语言自身编写的，目前版本的 Go 实现了以下三个工具：

- `go install` 是安装 Go 包的工具，类似 Ruby 中的 rubygems。主要用于安装非标准库的包文件，将源代码编译成对象文件。
- `go fix` 用于将你的 Go 代码从旧的发行版迁移到最新的发行版，它主要负责简单的、重复的、枯燥无味的修改工作，如果像 API 等复杂的函数修改，工具则会给出文件名和代码行数的提示以便让开发人员快速定位并升级代码。Go 开发团队一般也使用这个工具升级 Go 内置工具以及 谷歌内部项目的代码。`go fix` 之所以能够正常工作是因为 Go 在标准库就提供生成抽象语法树和通过抽象语法树对代码进行还原的功能。该工具会尝试更新当前目录下的所有 Go 源文件，并在完成代码更新后在控制台输出相关的文件名称。
- `go test` 是一个轻量级的单元测试框架（第 13 章）。





## Protobuf

protobuf 即 Protocol Buffers，是一种轻便高效的结构化数据存储格式，与语言、平台无关，可扩展可序列化。protobuf 性能和效率大幅度优于 JSON、XML 等其他的结构化数据格式。protobuf 是以二进制方式存储的，占用空间小，但也带来了可读性差的缺点。protobuf 在通信协议和数据存储等领域应用广泛。例如著名的分布式缓存工具 [Memcached](https://memcached.org/) 的 Go 语言版本[groupcache](https://github.com/golang/groupcache) 就使用了 protobuf 作为其 RPC 数据格式。

Protobuf 在 `.proto` 定义需要处理的结构化数据，可以通过 `protoc` 工具，将 `.proto` 文件转换为 C、C++、Golang、Java、Python 等多种语言的代码，兼容性好，易于使用。

如果需要在 Golang 中使用 protobuf，还需要安装 protoc-gen-go，这个工具用来将 `.proto` 文件转换为 Golang 代码。

```shell
go get -u github.com/golang/protobuf/protoc-gen-go
```

protoc-gen-go 将自动安装到 `$GOPATH/bin` 目录下，也需要将这个目录加入到环境变量中。





## WebAssembly

Go 语言在 1.11 版本(2018年8月) 加入了对 WebAssembly (Wasm) 的原生支持，使用 Go 语言开发 WebAssembly 相关的应用变得更加地简单。Go 语言的内建支持是 Go 语言进军前端的一个重要的里程碑。

在这之前，如果想使用 Go 语言开发前端，需要使用 [GopherJS](https://github.com/gopherjs/gopherjs)，GopherJS 是一个编译器，可以将 Go 语言转换成可以在浏览器中运行的 JavaScript 代码。新版本的 Go 则直接将 Go 代码编译为 wasm 二进制文件，而不再需要转为 JavaScript 代码。更巧的是，实现 GopherJS 和在 Go 语言中内建支持 WebAssembly 的是同一拨人。

Go 语言实现的函数可以直接导出供 JavaScript 代码调用，同时，Go 语言内置了 [syscall/js](https://github.com/golang/go/tree/master/src/syscall/js) 包，可以在 Go 语言中直接调用 JavaScript 函数，包括对 DOM 树的操作。



## 资源

go语言入门指南：https://github.com/unknwon/the-way-to-go_ZH_CN/blob/master/eBook/preface.md

　https://draveness.me/golang/docs/

effective go

go语言资源库 :https://github.com/Unknwon/go-study-index
