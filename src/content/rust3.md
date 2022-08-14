---
title: rust（二）
date: 2020-03-11 21:40:33
categories: IT
tags:
    - IT,Rust,Web
toc: true
thumbnail: 
---

   rust第二篇，主要讲多线程

<!--more-->

## 多线程并发编程

并发与并行

- **并发(Concurrent)** 是多个队列使用同一个咖啡机，然后两个队列轮换着使用（未必是 1:1 轮换，也可能是其它轮换规则），最终每个人都能接到咖啡
- **并行(Parallel)** 是每个队列都拥有一个咖啡机，最终也是每个人都能接到咖啡，但是效率更高，因为同时可以有两个人在接咖啡
- 串行：只有一个队列且仅使用一台咖啡机，前面哪个人接咖啡时突然发呆了几分钟，后面的人就只能等他结束才能继续接。如果其中一个队列占用太长时间，另外一个队列的人把他推开就行了，自己队友不能在背后开枪，但是其它队的可以

**并发和并行都是对“多任务”处理的描述，其中并发是轮流处理，而并行是同时处理**。

**CPU 核心**对应的是上图的咖啡机，而**多个线程的任务队列**就对应的多个排队的队列，由于终受限于 CPU 核心数，每个队列每次只会有一个任务被处理。

和排队一样，假如某个任务执行时间过长，就会导致用户界面的假死（相信使用 Windows 的同学或多或少都碰到过假死的问题）， 那么就需要 CPU 的任务调度了（真实 CPU 的调度很复杂，我们这里做了简化），有一个调度器会按照某些条件从队列中选择任务进行执行，并且当一个任务执行时间过长时，会强行切换该任务到后台中（或者放入任务队列，真实情况很复杂！），去执行新的任务。

不断这样的快速任务切换，对用户而言就实现了表面上的多任务同时处理，但是实际上最终也只有一个 CPU 核心在不停的工作。

因此并发的关键在于：**快速轮换处理不同的任务**，给用户带来所有任务同时在运行的假象。

在 OS 级别，多线程负责管理我们的任务队列，你可以简单认为一个线程管理着一个任务队列，然后线程之间还能根据空闲度进行任务调度。我们的程序只会跟 OS 线程打交道，并不关心 CPU 到底有多少个核心，真正关心的只是 OS，当线程把任务交给 CPU 核心去执行时，如果只有一个 CPU 核心，那么它就只能同时处理一个任务。

多核心并行

当 CPU 核心增多到 `N` 时，那么同一时间就能有 `N` 个任务被处理，那么我们的并行度就是 `N`，相应的处理效率也变成了单核心的 `N` 倍（实际情况并没有这么高）

多核心并发

当核心增多到 `N` 时，操作系统同时在进行的任务肯定远不止 `N` 个，这些任务将被放入 `M` 个线程队列中，接着交给 `N` 个 CPU 核心去执行，最后实现了 `M:N` 的处理模型，在这种情况下，**并发跟并行时同时在发生的，所有用户任务从表面来看都在并发的运行，其实实际上，同一时刻只有 `N` 个任务能被同时并行的处理**。

如果某个系统支持两个或者多个动作的**同时存在**，那么这个系统就是一个并发系统。如果某个系统支持两个或者多个动作**同时执行**，那么这个系统就是一个并行系统。

在并发程序中可以同时拥有两个或者多个线程。这意味着，如果程序在单核处理器上运行，那么这两个线程将交替地换入或者换出内存。这些线程是 **同时“存在”** 的——每个线程都处于执行过程中的某个状态。如果程序能够并行执行，那么就一定是运行在多核处理器上。此时，程序中的每个线程都将分配到一个独立的处理器核上，因此可以同时运行。

**“并行”概念是“并发”概念的一个子集**。也就是说，你可以编写一个拥有多个线程或者进程的并发程序，但如果没有多核处理器来执行这个程序，那么就不能以并行方式来运行代码。因此，凡是在求解单个问题时涉及多个执行流程的编程模式或者执行行为，都属于并发编程的范畴。

### 编程语言的并发模型

不同语言对于线程的实现可能大相径庭：

- 由于操作系统提供了创建线程的 API，因此部分语言会直接调用该 API 来创建线程，因此最终程序内的线程数和该程序占用的操作系统线程数相等，一般称之为**1:1 线程模型**，例如 Rust。
- 还有些语言在内部实现了自己的线程模型（绿色线程、协程），程序内部的 M 个线程最后会以某种映射方式使用 N 个操作系统线程去运行，因此称之为**M:N 线程模型**，其中 M 和 N 并没有特定的彼此限制关系。一个典型的代表就是 Go 语言。
- 还有些语言使用了 Actor 模型，基于消息传递进行并发，例如 Erlang 语言。

总之，每一种模型都有其优缺点及选择上的权衡，而 Rust 在设计时考虑的权衡就是运行时(Runtime)。出于 Rust 的系统级使用场景，且要保证调用 C 时的极致性能，它最终选择了尽量小的运行时实现

运行时是那些会被打包到所有程序可执行文件中的 Rust 代码，根据每个语言的设计权衡，运行时虽然有大有小（例如 Go 语言由于实现了协程和 GC，运行时相对就会更大一些），但是除了汇编之外，每个语言都拥有它。小运行时的其中一个好处在于最终编译出的可执行文件会相对较小，同时也让该语言更容易被其它语言引入使用

而绿色线程/协程的实现会显著增大运行时的大小，因此 Rust 只在标准库中提供了 `1:1` 的线程模型，如果你愿意牺牲一些性能来换取更精确的线程控制以及更小的线程上下文切换成本，那么可以选择 Rust 中的 `M:N` 模型，这些模型由三方库提供了实现，例如大名鼎鼎的 `tokio`。

### 多线程

由于多线程的代码是同时运行的，因此我们无法保证线程间的执行顺序，这会导致一些问题：

- 竞态条件(race conditions)，多个线程以非一致性的顺序同时访问数据资源
- 死锁(deadlocks)，两个线程都想使用某个资源，但是又都在等待对方释放资源后才能使用，结果最终都无法继续执行
- 一些因为多线程导致的很隐晦的 BUG，难以复现和解决

虽然 Rust 已经通过各种机制减少了上述情况的发生，但是依然无法完全避免上述情况，因此我们在编程时需要格外的小心

创建线程

使用 `thread::spawn` 可以创建线程

```rust
use std::thread;
use std::time::Duration;

fn main() {
    thread::spawn(|| {
        for i in 1..10 {
            println!("hi number {} from the spawned thread!", i);
            thread::sleep(Duration::from_millis(1));
        }
    });

    for i in 1..5 {
        println!("hi number {} from the main thread!", i);
        thread::sleep(Duration::from_millis(1));
    }
}
```

有几点值得注意：

- 线程内部的代码使用闭包来执行
- `main` 线程一旦结束，程序就立刻结束，因此需要保持它的存活，直到其它子线程完成自己的任务
- `thread::sleep` 会让当前线程休眠指定的时间，随后其它线程会被调度运行（上一节并发与并行中有简单介绍过），因此就算你的电脑只有一个 CPU 核心，该程序也会表现的如同多 CPU 核心一般，这就是并发！

如果多运行几次，你会发现好像每次输出会不太一样，因为：虽说线程往往是轮流执行的，但是这一点无法被保证！线程调度的方式往往取决于你使用的操作系统。总之，**千万不要依赖线程的执行顺序**



线程通信

在多线程间有多种方式可以共享、传递数据，最常用的方式就是通过消息传递或者将锁和`Arc`联合使用

与 Go 语言内置的`chan`不同，Rust 是在标准库里提供了消息通道(`channel`)，你可以将其想象成一场直播，多个主播联合起来在搞一场直播，最终内容通过通道传输给屏幕前的我们，其中主播被称之为**发送者**，观众被称之为**接收者**，显而易见的是：一个通道应该支持多个发送者和接收者。

但是，在实际使用中，我们需要使用不同的库来满足诸如：**多发送者 -> 单接收者，多发送者 -> 多接收者**等场景形式

多发送者 单接收者

标准库提供了通道`std::sync::mpsc`，其中`mpsc`是*multiple producer, single consumer*的缩写，代表了该通道支持多个发送者，但是只支持唯一的接收者。 当然，支持多个发送者也意味着支持单个发送者，

```rust
use std::sync::mpsc;
use std::thread;

fn main() {
    // 创建一个消息通道, 返回一个元组：(发送者，接收者)
    let (tx, rx) = mpsc::channel();

    // 创建线程，并发送消息
    thread::spawn(move || {
        // 发送一个数字1, send方法返回Result<T,E>，通过unwrap进行快速错误处理
        tx.send(1).unwrap();

        // 下面代码将报错，因为编译器自动推导出通道传递的值是i32类型，那么Option<i32>类型将产生不匹配错误
        // tx.send(Some(1)).unwrap()
    });

    // 在主线程中接收子线程发送的消息并输出
    println!("receive {}", rx.recv().unwrap());
}
```

注意：

- `tx`,`rx`对应发送者和接收者，它们的类型由编译器自动推导: `tx.send(1)`发送了整数，因此它们分别是`mpsc::Sender<i32>`和`mpsc::Receiver<i32>`类型，需要注意，由于内部是泛型实现，一旦类型被推导确定，该通道就只能传递对应类型的值, 例如此例中非`i32`类型的值将导致编译错误
- 接收消息的操作`rx.recv()`会阻塞当前线程，直到读取到值，或者通道被关闭
- 需要使用`move`将`tx`的所有权转移到子线程的闭包中



共享内存可以说是同步的灵魂，因为消息传递的底层实际上也是通过共享内存来实现，两者的区别如下：

- 共享内存相对消息传递能节省多次内存拷贝的成本
- 共享内存的实现简洁的多
- 共享内存的锁竞争更多

消息传递适用的场景很多，我们下面列出了几个主要的使用场景:

- 需要可靠和简单的(简单不等于简洁)实现时
- 需要模拟现实世界，例如用消息去通知某个目标执行相应的操作时
- 需要一个任务处理流水线(管道)时，等等

而使用共享内存(并发原语)的场景往往就比较简单粗暴：需要简洁的实现以及更高的性能时。

总之，消息传递类似一个单所有权的系统：一个值同时只能有一个所有者，如果另一个线程需要该值的所有权，需要将所有权通过消息传递进行转移。而共享内存类似于一个多所有权的系统：多个线程可以同时访问同一个值。

互斥锁

既然是共享内存，那并发原语自然是重中之重，先来一起看看皇冠上的明珠: 互斥锁`Mutex`(mutual exclusion 的缩写)。

`Mutex`让多个线程并发的访问同一个值变成了排队访问：同一时间，只允许一个线程`A`访问该值，其它线程需要等待`A`访问完成后才能继续

单线程中使用Mutex

```rust
use std::sync::Mutex;fn main() {    // 使用`Mutex`结构体的关联函数创建新的互斥锁实例    let m = Mutex::new(5);    {        // 获取锁，然后deref为`m`的引用        // lock返回的是Result        let mut num = m.lock().unwrap();        *num = 6;        // 锁自动被drop    }    println!("m = {:?}", m);}
```

和`Box`类似，数据被`Mutex`所拥有，要访问内部的数据，需要使用方法`m.lock()`向`m`申请一个锁, 该方法会**阻塞当前线程，直到获取到锁**，因此当多个线程同时访问该数据时，只有一个线程能获取到锁，其它线程只能阻塞着等待，这样就保证了数据能被安全的修改！

`Mutex<T>`是一个智能指针，准确的说是`m.lock()`返回一个智能指针`MutexGuard<T>`:

- 它实现了`Deref`特征，会被自动解引用后获得一个引用类型，该引用指向`Mutex`内部的数据
- 它还实现了`Drop`特征，在超出作用域后，自动释放锁，以便其它线程能继续获取锁\\

多线程中使用Mutex

使用`Arc<T>`，得益于它的[内部计数器](https://course.rs/advance/smart-pointer/rc-arc.html#多线程无力的rc)是多线程安全的，因此可以在多线程环境中使用

```rust
use std::sync::{Arc, Mutex};use std::thread;fn main() {    let counter = Arc::new(Mutex::new(0));    let mut handles = vec![];    for _ in 0..10 {        let counter = Arc::clone(&counter);        let handle = thread::spawn(move || {            let mut num = counter.lock().unwrap();            *num += 1;        });        handles.push(handle);    }    for handle in handles {        handle.join().unwrap();    }    println!("Result: {}", *counter.lock().unwrap());}
```

`Rc<T>/RefCell<T>`用于单线程内部可变性， `Arc<T>/Mutext<T>`用于多线程内部可变性

使用Mutex 需要注意的点：

- 在使用数据前必须先获取锁
- 在数据使用完成后，必须**及时**的释放锁，比如文章开头的例子，使用内部语句块的目的就是为了及时的释放锁

忘记释放锁是经常发生的，虽然 Rust 通过智能指针的`drop`机制帮助我们避免了这一点，但是由于不及时释放锁导致的性能问题也是常见的。

正因为这种困难性，导致很多用户都热衷于使用消息传递的方式来实现同步，例如 Go 语言直接把`channel`内置在语言特性中，甚至还有无锁的语言，例如`erlang`，完全使用`Actor`模型，依赖消息传递来完成共享和同步。幸好 Rust 的类型系统、所有权机制、智能指针等可以很好的帮助我们减轻使用锁时的负担。

另一个值的注意的是在使用`Mutex<T>`时，Rust 无法帮我们避免所有的逻辑错误，例如在之前章节，我们提到过使用`Rc<T>`可能会导致[循环引用的问题](https://course.rs/advance/circle-self-ref/circle-reference.html)。类似的，`Mutex<T>`也存在使用上的风险，例如创建死锁(deadlock)：当一个操作试图锁住两个资源，然后两个线程各自获取其中一个锁，并试图获取另一个锁时，就会造成死锁。

死锁

当我们拥有两个锁，且两个线程各自使用了其中一个锁，然后试图去访问另一个锁时，就可能发生死锁：

多线程死锁

```rust
use std::{sync::{Mutex, MutexGuard}, thread};use std::thread::sleep;use std::time::Duration;use lazy_static::lazy_static;lazy_static! {    static ref MUTEX1: Mutex<i64> = Mutex::new(0);    static ref MUTEX2: Mutex<i64> = Mutex::new(0);}fn main() {    // 存放子线程的句柄    let mut children = vec![];    for i_thread in 0..2 {        children.push(thread::spawn(move || {            for _ in 0..1 {                // 线程1                if i_thread % 2 == 0 {                    // 锁住MUTEX1                    let guard: MutexGuard<i64> = MUTEX1.lock().unwrap();                    println!("线程 {} 锁住了MUTEX1，接着准备去锁MUTEX2 !", i_thread);                    // 当前线程睡眠一小会儿，等待线程2锁住MUTEX2                    sleep(Duration::from_millis(10));                    // 去锁MUTEX2                    let guard = MUTEX2.lock().unwrap();                // 线程2                } else {                    // 锁住MUTEX2                    let _guard = MUTEX2.lock().unwrap();                    println!("线程 {} 锁住了MUTEX2, 准备去锁MUTEX1", i_thread);                    let _guard = MUTEX1.lock().unwrap();                }            }        }));    }    // 等子线程完成    for child in children {        let _ = child.join();    }    println!("死锁没有发生");}
```

上面的代码中，死锁发生的必然条件：线程 1 锁住了`MUTEX1`并且线程`2`锁住了`MUTEX2`，然后线程 1 试图去访问`MUTEX2`，同时线程`2`试图去访问`MUTEX1`，就会死锁。 因为线程 2 需要等待线程 1 释放`MUTEX1`后，才会释放`MUTEX2`，而与此同时，线程 1 需要等待线程 2 释放`MUTEX2`后才能释放`MUTEX1`，这种情况造成了两个线程都无法释放对方需要的锁，最终死锁。

那么为何某些时候，死锁不会发生？原因很简单，线程 2 在线程 1 锁`MUTEX1`之前，就已经全部执行完了，随之线程 2 的`MUTEX2`和`MUTEX1`被全部释放，线程 1 对锁的获取将不再有竞争者。 同理，线程 1 若全部被执行完，那线程 2 也不会被锁，因此我们在线程 1 中间加一个睡眠，增加死锁发生的概率。如果你在线程 2 中同样的位置也增加一个睡眠，那死锁将必然发生!

读写锁RwLock

`Mutex`会对每次读写都进行加锁，但某些时候，我们需要大量的并发读，`Mutex`就无法满足需求了，此时就可以使用`RwLock`:

```rust
use std::sync::RwLock;fn main() {    let lock = RwLock::new(5);    // 同一时间允许多个读    {        let r1 = lock.read().unwrap();        let r2 = lock.read().unwrap();        assert_eq!(*r1, 5);        assert_eq!(*r2, 5);    } // 读锁在此处被drop    // 同一时间只允许一个写    {        let mut w = lock.write().unwrap();        *w += 1;        assert_eq!(*w, 6);        // 以下代码会panic，因为读和写不允许同时存在        // 写锁w直到该语句块结束才被释放，因此下面的读锁依然处于`w`的作用域中        // let r1 = lock.read();        // println!("{:?}",r1);    }// 写锁在此处被drop}
```

使用RwLock有几个问题：

- 读和写不能同时发生，如果使用`try_xxx`解决，就必须做大量的错误处理和失败重试机制
- 当读多写少时，写操作可能会因为一直无法获得锁导致连续多次失败([writer starvation](https://stackoverflow.com/questions/2190090/how-to-prevent-writer-starvation-in-a-read-write-lock-in-pthreads))
- RwLock 其实是操作系统提供的，实现原理要比`Mutex`复杂的多，因此单就锁的性能而言，比不上原生实现的`Mutex`

因此和Mutex的使用场景略有差别

- 追求高并发读取时，使用`RwLock`，因为`Mutex`一次只允许一个线程去读取
- 如果要保证写操作的成功性，使用`Mutex`
- 不知道哪个合适，统一使用`Mutex`

需要注意的是，`RwLock`虽然看上去貌似提供了高并发读取的能力，但这个不能说明它的性能比`Mutex`高，事实上`Mutex`性能要好不少，后者**唯一的问题也仅仅在于不能并发读取**。

一个常见的、错误的使用`RwLock`的场景就是使用`HashMap`进行简单读写，因为`HashMap`的读和写都非常快，`RwLock`的复杂实现和相对低的性能反而会导致整体性能的降低，因此一般来说更适合使用`Mutex`。

总之，如果你要使用`RwLock`要确保满足以下两个条件：**并发读，且需要对读到的资源进行"长时间"的操作**，`HashMap`也许满足了并发读的需求，但是往往并不能满足后者："长时间"的操作。



`Mutex`用起来简单，但是无法并发读，`RwLock`可以并发读，但是使用场景较为受限且性能不够，那么有没有一种全能性选手呢？ 欢迎我们的`Atomic`闪亮登场

从 Rust1.34 版本后，就正式支持原子类型。原子指的是一系列不可被 CPU 上下文交换的机器指令，这些指令组合在一起就形成了原子操作。在多核 CPU 下，当某个 CPU 核心开始运行原子操作时，会先暂停其它 CPU 内核对内存的操作，以保证原子操作不会被其它 CPU 内核所干扰。

由于原子操作是通过指令提供的支持，因此它的性能相比锁和消息传递会好很多。相比较于锁而言，原子类型不需要开发者处理加锁和释放锁的问题，同时支持修改，读取等操作，还具备较高的并发性能，几乎所有的语言都支持原子类型。

可以看出原子类型是无锁类型，但是无锁不代表无需等待，因为原子类型内部使用了`CAS`循环，当大量的冲突发生时，该等待还是得[等待](https://course.rs/advance/concurrency-with-threads/thread.html#多线程的开销)！但是总归比锁要好

CAS 全称是 Compare and swap, 它通过一条指令读取指定的内存地址，然后判断其中的值是否等于给定的前置值，如果相等，则将其修改为新的值

原子类型的一个常用场景，就是作为全局变量来使用

```rust
use std::ops::Sub;use std::sync::atomic::{AtomicU64, Ordering};use std::thread::{self, JoinHandle};use std::time::Instant;const N_TIMES: u64 = 10000000;const N_THREADS: usize = 10;static R: AtomicU64 = AtomicU64::new(0);fn add_n_times(n: u64) -> JoinHandle<()> {    thread::spawn(move || {        for _ in 0..n {            R.fetch_add(1, Ordering::Relaxed);        }    })}fn main() {    let s = Instant::now();    let mut threads = Vec::with_capacity(N_THREADS);    for _ in 0..N_THREADS {        threads.push(add_n_times(N_TIMES));    }    for thread in threads {        thread.join().unwrap();    }    assert_eq!(N_TIMES * N_THREADS as u64, R.load(Ordering::Relaxed));    println!("{:?}",Instant::now().sub(s));}
```

以上代码启动了数个线程，每个线程都在疯狂对全局变量进行加 1 操作, 最后将它与`线程数 * 加1次数`进行比较，如果发生了因为多个线程同时修改导致了脏数据，那么这两个必将不相等。好在，它没有让我们失望，不仅快速的完成了任务，而且保证了 100%的并发安全性。

当然以上代码的功能其实也可以通过`Mutex`来实现，但是后者的强大功能是建立在额外的性能损耗基础上的，因此性能会逊色不少:

`Atomic`实现会比`Mutex`快**41%**，实际上在复杂场景下还能更快(甚至达到 4 倍的性能差距)！

还有一点值得注意: **和`Mutex`一样，`Atomic`的值具有内部可变性**，你无需将其声明为`mut`

```rust
use std::sync::Mutex;use std::sync::atomic::{Ordering, AtomicU64};struct Counter {    count: u64}fn main() {    let n = Mutex::new(Counter {        count: 0    });    n.lock().unwrap().count += 1;    let n = AtomicU64::new(0);    n.fetch_add(0, Ordering::Relaxed);}
```

内存顺序是指 CPU 在访问内存时的顺序，该顺序可能受以下因素的影响：

- 代码中的先后顺序
- 编译器优化导致在编译阶段发生改变(内存重排序 reordering)
- 运行阶段因 CPU 的缓存机制导致顺序被打乱

Rust 提供了`Ordering::Relaxed`用于限定内存顺序了，事实上，该枚举有 5 个成员:

- **Relaxed**， 这是最宽松的规则，它对编译器和 CPU 不做任何限制，可以乱序
- **Release 释放**，设定内存屏障(Memory barrier)，保证它之前的操作永远在它之前，但是它后面的操作可能被重排到它前面
- **Acquire 获取**, 设定内存屏障，保证在它之后的访问永远在它之后，但是它之前的操作却有可能被重排到它后面，往往和`Release`在不同线程中联合使用
- **AcqRel**, **Acquire**和**Release**的结合，同时拥有它们俩提供的保证。比如你要对一个 `atomic` 自增 1，同时希望该操作之前和之后的读取或写入操作不会被重新排序
- **SeqCst 顺序一致性**， `SeqCst`就像是`AcqRel`的加强版，它不管原子操作是属于读取还是写入的操作，只要某个线程有用到`SeqCst`的原子操作，线程中该`SeqCst`操作前的数据操作绝对不会被重新排在该`SeqCst`操作之后，且该`SeqCst`操作后的数据操作也绝对不会被重新排在`SeqCst`操作前。

这些规则由于是系统提供的，因此其它语言提供的相应规则也大同小异

在多线程环境中要使用`Atomic`需要配合`Arc`

```rust
use std::sync::Arc;use std::sync::atomic::{AtomicUsize, Ordering};use std::{hint, thread};fn main() {    let spinlock = Arc::new(AtomicUsize::new(1));    let spinlock_clone = Arc::clone(&spinlock);    let thread = thread::spawn(move|| {        spinlock_clone.store(0, Ordering::SeqCst);    });    // 等待其它线程释放锁    while spinlock.load(Ordering::SeqCst) != 0 {        hint::spin_loop();    }    if let Err(panic) = thread.join() {        println!("Thread had an error: {:?}", panic);    }}
```

那么原子类型既然这么全能，它可以替代锁吗？答案是不行：

- 对于复杂的场景下，锁的使用简单粗暴，不容易有坑
- `std::sync::atomic`包中仅提供了数值类型的原子操作：`AtomicBool`, `AtomicIsize`, `AtomicUsize`, `AtomicI8`, `AtomicU16`等，而锁可以应用于各种类型
- 在有些情况下，必须使用锁来配合，例如上一章节中使用`Mutex`配合`Condvar`

事实上，`Atomic`虽然对于用户不太常用，但是对于高性能库的开发者、标准库开发者都非常常用，它是并发原语的基石，除此之外，还有一些场景适用：

- 无锁(lock free)数据结构
- 全局变量，例如全局自增 ID, 在后续章节会介绍
- 跨线程计数器，例如可以用于统计指标



## Cargo

### 包和模块

Rust 为我们提供了强大的包管理工具：

- **项目(Package)**：可以用来构建、测试和分享包
- **工作空间(WorkSpace)**：对于大型项目，可以进一步将多个包联合在一起，组织成工作空间
- **包(Crate)**：一个由多个模块组成的树形结构，可以作为三方库进行分发，也可以生成可执行文件进行运行
- **模块(Module)**：可以一个文件多个模块，也可以一个文件一个模块，模块可以被认为是真实项目中的代码组织单元

包Crate

对于 Rust 而言，包是一个独立的可编译单元，它编译后会生成一个可执行文件或者一个库。

一个包会将相关联的功能打包在一起，使得该功能可以很方便的在多个项目中分享。例如标准库中没有提供但是在三方库中提供的 `rand` 包，它提供了随机数生成的功能，我们只需要将该包通过 `use rand;` 引入到当前项目的作用域中，就可以在项目中使用 `rand` 的功能：`rand::XXX`。

同一个包中不能有同名的类型，但是在不同包中就可以。例如，虽然 `rand` 包中，有一个 `Rng` 特征，可是我们依然可以在自己的项目中定义一个 `Rng`，前者通过 `rand::Rng` 访问，后者通过 `Rng` 访问，对于编译器而言，这两者的边界非常清晰，不会存在引用歧义。

项目package

鉴于 Rust 团队标新立异的起名传统，以及包的名称被 `crate` 占用，库的名称被 `library` 占用，经过斟酌， 我们决定将 `Package` 翻译成项目，你也可以理解为工程、软件包。

由于 `Package` 就是一个项目，因此它包含有独立的 `Cargo.toml` 文件，以及因为功能性被组织在一起的一个或多个包。一个 `Package` 只能包含**一个**库(library)类型的包，但是可以包含**多个**二进制可执行类型的包。

二进制package

创建一个二进制 `Package`：

```shell
$ cargo new my-project
     Created binary (application) `my-project` package
$ ls my-project
Cargo.toml
src
$ ls my-project/src
main.rs
```

这里，Cargo 为我们创建了一个名称是 `my-project` 的 `Package`，同时在其中创建了 `Cargo.toml` 文件，可以看一下该文件，里面并没有提到 `src/main.rs` 作为程序的入口，原因是 Cargo 有一个惯例：**`src/main.rs` 是二进制包的根文件，该二进制包的包名跟所属 `Package` 相同，在这里都是 `my-project`**，所有的代码执行都从该文件中的 `fn main()` 函数开始。

使用 `cargo run` 可以运行该项目，输出：`Hello, world!`。

库Package

再来创建一个库类型的 `Package`

```shell
$ cargo new my-lib --lib
     Created library `my-lib` package
$ ls my-lib
Cargo.toml
src
$ ls my-lib/src
lib.rs
```

如果你试图运行 `my-lib`，会报错

```shell
$ cargo run
error: a bin target must be available for `cargo run`
```

原因是库类型的 `Package` 只能作为三方库被其它项目引用，而不能独立运行，只有之前的二进制 `Package` 才可以运行。

与 `src/main.rs` 一样，Cargo 知道，如果一个 `Package` 包含有 `src/lib.rs`，意味它包含有一个库类型的同名包 `my-lib`，该包的根文件是 `src/lib.rs`。

模块

- 使用 `mod` 关键字来创建新模块，后面紧跟着模块名称
- 模块可以嵌套，这里嵌套的原因是招待客人和服务都发生在前厅，因此我们的代码模拟了真实场景
- 模块中可以定义各种 Rust 类型，例如函数、结构体、枚举、特征等
- 所有模块均定义在同一个文件中

模块树

`src/main.rs` 和 `src/lib.rs` 被称为包源(crate root)，这个奇葩名称的来源,是由于这两个文件的内容形成了一个模块 `crate`，该模块位于包的树形结构(由模块组成的树形结构)的根部

这颗树展示了模块之间**彼此的嵌套**关系，因此被称为**模块树**。其中 `crate` 包根是 `src/lib.rs` 文件，包根文件中的三个模块分别形成了模块树的剩余部分。

如果模块 `A` 包含模块 `B`，那么 `A` 是 `B` 的父模块，`B` 是 `A` 的子模块。在上例中，`front_of_house` 是 `hosting` 和 `serving` 的父模块，反之，后两者是前者的子模块。

模块树跟计算机上文件系统目录树的相似之处。不仅仅是组织结构上的相似，就连使用方式都很相似：每个文件都有自己的路径，用户可以通过这些路径使用它们，在 Rust 中，我们也通过路径的方式来引用模块。

想要调用一个函数，就需要知道它的路径，在 Rust 中，这种路径有两种形式：

- **绝对路径**，从包根开始，路径名以包名或者 `crate` 作为开头
- **相对路径**，从当前模块开始，以 `self`，`super` 或当前模块的标识符作为开头



### 为什么有cargo

Cargo 是一个工具,允许 Rust 项目声明其各种依赖项，并确保您始终获得可重复的构建。

为了实现这一目标,Cargo 做了四件事:

- 引入两个，包含各种项目信息的元数据文件。
- 获取，并构建项目的依赖项.
- 正确使用参数，以调用`rustc`或其他构建工具，构建你的项目。
- 介绍，更容易使用 Rust 项目的约定(规范/风格)。



### cargo.toml和cargo.lock

`Cargo.toml`和`Cargo.lock`各有其目的。在我们谈论它们之前，这是一个总结:

- `Cargo.toml`是从广义上描述你的依赖，并由你编写.
- `Cargo.lock`包含有关您的依赖项的确切信息。它由 Cargo 维护，不应手动编辑

如果您正在构建，其他项目要依赖的库，请将`Cargo.lock`放置在你的`.gitignore`。如果您正在构建可执行文件，如命令行工具或应用程序，请检查`Cargo.lock`位于`git`管理下。



### 常用命令

`cargo check` 是一个新的子命令，可以在很多情况下加快开发工作流程。

它有什么作用？让我们退一步说，讨论 `rustc` 如何编译代码。编译有许多“过程”，也就是说，编译器在从源代码到生成最终二进制文件的过程中有许多不同的步骤。 但是，您可以通过两个重要步骤来考虑这个过程：首先，`rustc` 执行所有安全检查，确保您的语法正确，所有这些。其次，一旦满足一切顺序，就会生成最终执行的实际二进制代码。

事实证明，第二步需要花费很多时间。而且大多数时候，这不是必要的。也就是说，当您处理一些 Rust 代码时，许多开发人员将进入这样的工作流程：

1. 写一些代码。
2. 运行 `cargo build` 以确保它编译。
3. 根据需要重复1-2。
4. 运行 `cargo test` 以确保测试通过。
5. 亲自尝试二进制文件
6. GOTO 1。

在第二步中，您实际上从未运行过您的代码。您正在寻找编译器的反馈，而不是实际运行二进制文件。 `cargo check` 正好支持这个用例：它运行所有编译器的检查，但不生成最终的二进制文件

cargo intall

Cargo 已经发展了一种新的 `install` 命令。 这旨在用于为 Cargo 安装新的子命令，或者为 Rust 开发人员安装工具。 这并不能取代为您支持的平台上的最终用户构建真实的本机程序包的需要。

`cargo new` 现在默认生成二进制文件，而不是库。我们试图保持 Cargo 的 CLI 非常稳定，但这种变化很重要，不太可能导致破损。

对于某些背景，cargo new 接受两个标志： `--lib` 用于创建库，`--bin` 用于创建二进制文件或可执行文件。 如果你没有传递其中一个标志，它曾经默认为 `--lib`。 当时，我们做出了这个决定，因为每个二进制文件（通常）都依赖于许多库，因此我们认为库案例会更常见。但是，这是不正确的; 每个包都依赖于许多二进制文件。 此外，在开始使用时，你经常需要的是一个可以运行和使用的程序。而且，不仅仅是新 Rustaceans们， 甚至是很长时间的社区成员都说他们发现这个默认值令人惊讶。 因此，我们已经改变它，它现在默认为 `--bin`。



### 国内cargo镜像源

字节

最好用 https://rsproxy.cn/

```config
## 新建或者修改 ～/.cargo/config 文件
[source.crates-io]
replace-with = 'rsproxy'

[source.rsproxy]
registry = "https://rsproxy.cn/crates.io-index"

[registries.rsproxy]
index = "https://rsproxy.cn/crates.io-index"

[net]
git-fetch-with-cli = true
```

修改~/.zshrc or ~/.bashrc

```shell
export RUSTUP_DIST_SERVER="https://rsproxy.cn"
export RUSTUP_UPDATE_ROOT="https://rsproxy.cn/rustup"
```

安装rust

```shell
# export the env above first
curl --proto '=https' --tlsv1.2 -sSf https://rsproxy.cn/rustup-init.sh | sh
```

rustcc

rust国内社区 https://rustcc.cn/

```toml
## 放到 `$HOME/.cargo/config` 文件中
[source.crates-io]
registry = "https://github.com/rust-lang/crates.io-index"

# 替换成你偏好的镜像源
replace-with = 'sjtu'
#replace-with = 'ustc'

# 清华大学
[source.tuna]
registry = "https://mirrors.tuna.tsinghua.edu.cn/git/crates.io-index.git"

# 中国科学技术大学
[source.ustc]
registry = "git://mirrors.ustc.edu.cn/crates.io-index"

# 上海交通大学
[source.sjtu]
registry = "https://mirrors.sjtug.sjtu.edu.cn/git/crates.io-index"

# rustcc社区
[source.rustcc]
registry = "git://crates.rustcc.cn/crates.io-index"
```

