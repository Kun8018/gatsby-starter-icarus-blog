---
title: Golang语言开发(五)
date: 2020-03-02 21:40:33
categories: 技术博客
tags:
    - Web,IT,Go
toc: true
thumbnail: https://s1.ax1x.com/2020/04/20/J1Iu4O.th.jpg
---

　　本篇主要内容为分布式系统

<!--more-->

## 分布式系统

Go语言号称是互联网时代的C语言。现在的互联网系统已经不是以前的一个主机搞定一切的时代，互联网时代的后台服务由大量的分布式系统构成，任何单一后台服务器节点的故障并不会导致整个系统的停机。同时以阿里云、腾讯云为代表的云厂商崛起标志着云时代的到来，在云时代分布式编程将成为一个基本技能。而基于Go语言构建的Docker、K8s等系统推动了云时代的提前到来。

对于已经比较完善的分布式系统，我们会简单讲讲怎么通过使用它们来提高我们的工作效率。对于没有现成解决方案的系统，我们会按照自己的业务需求提出解决方案。

### 分布式系统概念

我们考虑两个时间尺度：**进程**间**消息**传递延迟和进程内**事件**间隔，如果前者相对后者不可忽略，则这组进程就是一个分布式系统。

理解这个定义，需要理解几个重要的概念（形式化的定义总是这样，摊手）：进程（process）、消息（message）和事件（event）。

进程就是一个负责干活的劳工，其干的活可以分解为多个步骤，每个步骤就是一个事件，消息便是劳工交流的方式。

这里面涉及到了计算机系统中最重的几种资源：计算（computational），存储（memory），以及沟通他们的网络（network）。

总结下，我们可以从另一个角度来对分布式系统进行描述：

对外，分布式系统表现为一个整体，基于总体的存储和计算能力，提供特定功能。

对内，分布式系统表现为一组个体，基于网络消息进行通信，分工合作。

而分布式系统的设计目标是，最大化整体资源利用率的同时，处理局部错误、保持对外可用性。



### 分布式系统的特点

在构建分布式系统时，在逻辑上要注意以下这些方面：

1. **可扩展性**：可扩展性是对分布式系统最本质的要求，即系统设计允许我们只通过增加机器来应对不断增长的外部需求。
2. **容错性 \ 可用性**：这是可扩展性所带来的一个副作用，即在系统规模不断变大之后，单个机器故障便会成为常态。系统需要自动处理这些故障，对外保持可用性。
3. **并发性**：由于没有全局时钟进行协调，分散的机器天然处在 “平行宇宙” 中。系统需要引导这些并发变为协作，以拆解并执行集群任务。
4. **异构性**（对内）：系统需要处理进群内部不同硬件、不同操作系统、不同中间件的差异性，并且能够容纳新的异构组件加入系统。
5. **透明性**（对外）：对外屏蔽系统复杂性，提供逻辑上的单一性。



### 类型

在组织分布式系统时，在物理上可以有以下几种类型：

1. **主从架构（[master-workers](https://www.qtmuniao.com/2021/07/03/distributed-system-1-master-workers/)）**：有一个负责指挥的机器，其他机器负责干活，如 Hadoop。好处是设计和实现相对容易，坏处是单点瓶颈和故障。
2. **点对点架构（peer-to-peer）**：所有机器逻辑等价。如亚马逊 Dynamo，好处是没有单点故障，坏处是机器协调不好做、一致性也不好保证。不过，如果系统是无状态的，则这种架构很合适。
3. **多层架构（multi-tier）**：这是一种复合架构，实际中也最常用，比如今年来常说存储计算分离。每一层可以根据不同特点（IO 密集型、计算密集型）进行设计，甚至可以复用现有组件（云原生）。

### 优缺点

优点：

高可用、高吞吐、高可扩展性

1. **无限扩展**：只要设计的好，可以通过线性的增加机器资源来应对不断增长的需求。
2. **低延迟**：多地部署，将用户请求按地理路由到最近机房处理。
3. **高可用**、**容错**：一部分机器坏掉，仍可以正常对外提供服务。

缺点：

最大的问题是复杂性。

1. **数据的一致性**。考虑到大量的机器故障：宕机、重启、关机，数据可能丢失、陈旧、出错，如何让系统容纳这些问题，对外保证数据的正确性，需要相当复杂的设计。
2. **网络和通信故障**。网络的不可靠，消息可能丢失、早到、迟到、Hang 住，这给机器间的协调带来了极大的复杂度。像 TCP 等网络基础协议，能解决部分问题，但更多的需要系统层面自己处理。更不用说，开放式网络上可能存在的消息伪造。
3. **管理复杂度**。机器数量到达一定数量级时，如何对他们进行有效监控、收集日志、负载均衡，都是很大挑战。
4. **延迟**。网络通信延迟要比机器内通信高出几个数量级，而组件越多、网络跳数越多，延迟便会更高，这些最终都会作用于系统对外服务质量上。



### 分布式id生成器

有时我们需要能够生成类似MySQL自增ID这样不断增大，同时又不会重复的id。以支持业务中的高并发场景。比较典型的，电商促销时，短时间内会有大量的订单涌入到系统，比如每秒10w+。明星出轨时，会有大量热情的粉丝发微博以表心意，同样会在短时间内产生大量的消息。

在插入数据库之前，我们需要给这些消息、订单先打上一个ID，然后再插入到我们的数据库。对这个id的要求是希望其中能带有一些时间信息，这样即使我们后端的系统对消息进行了分库分表，也能够以时间顺序对这些消息进行排序。

Twitter的snowflake算法是这种场景下的一个典型解法。

首先确定我们的数值是64位，int64类型，被划分为四部分，不含开头的第一个bit，因为这个bit是符号位。用41位来表示收到请求时的时间戳，单位为毫秒，然后五位来表示数据中心的id，然后再五位来表示机器的实例id，最后是12位的循环自增id（到达1111,1111,1111后会归0）。

这样的机制可以支持我们在同一台机器上，同一毫秒内产生`2 ^ 12 = 4096`条消息。一秒共409.6万条消息。从值域上来讲完全够用了。

数据中心加上实例id共有10位，可以支持我们每数据中心部署32台机器，所有数据中心共1024台实例。

表示`timestamp`的41位，可以支持我们使用69年。当然，我们的时间毫秒计数不会真的从1970年开始记，那样我们的系统跑到`2039/9/7 23:47`

`

`:35`就不能用了，所以这里的`timestamp`只是相对于某个时间的增量，比如我们的系统上线是2018-08-01，那么我们可以把这个timestamp当作是从`2018-08-01 00:00:00.000`的偏移量。

worker_id分配

`timestamp`，`datacenter_id`，`worker_id`和`sequence_id`这四个字段中，`timestamp`和`sequence_id`是由程序在运行期生成的。但`datacenter_id`和`worker_id`需要我们在部署阶段就能够获取得到，并且一旦程序启动之后，就是不可更改的了（想想，如果可以随意更改，可能被不慎修改，造成最终生成的id有冲突）。

一般不同数据中心的机器，会提供对应的获取数据中心id的API，所以`datacenter_id`我们可以在部署阶段轻松地获取到。而worker_id是我们逻辑上给机器分配的一个id，这个要怎么办呢？比较简单的想法是由能够提供这种自增id功能的工具来支持，比如MySQL



### 分布式锁

在单机程序并发或并行修改全局变量时，需要对修改行为加锁以创造临界区。

在分布式场景下，我们也需要这种“抢占”的逻辑，我们可以使用Redis提供的`setnx`命令

```go
package main

import (
    "fmt"
    "sync"
    "time"

    "github.com/go-redis/redis"
)

func incr() {
    client := redis.NewClient(&redis.Options{
        Addr:     "localhost:6379",
        Password: "", // no password set
        DB:       0,  // use default DB
    })

    var lockKey = "counter_lock"
    var counterKey = "counter"

    // lock
    resp := client.SetNX(lockKey, 1, time.Second*5)
    lockSuccess, err := resp.Result()

    if err != nil || !lockSuccess {
        fmt.Println(err, "lock result: ", lockSuccess)
        return
    }

    // counter ++
    getResp := client.Get(counterKey)
    cntValue, err := getResp.Int64()
    if err == nil || err == redis.Nil {
        cntValue++
        resp := client.Set(counterKey, cntValue, 0)
        _, err := resp.Result()
        if err != nil {
            // log err
            println("set value error!")
        }
    }
    println("current counter is ", cntValue)

    delResp := client.Del(lockKey)
    unlockSuccess, err := delResp.Result()
    if err == nil && unlockSuccess > 0 {
        println("unlock success!")
    } else {
        println("unlock failed", err)
    }
}

func main() {
    var wg sync.WaitGroup
    for i := 0; i < 10; i++ {
        wg.Add(1)
        go func() {
            defer wg.Done()
            incr()
        }()
    }
    wg.Wait()
}
```

通过代码和执行结果可以看到，我们远程调用`setnx`运行流程上和单机的trylock非常相似，如果获取锁失败，那么相关的任务逻辑就不应该继续向前执行。

`setnx`很适合在高并发场景下，用来争抢一些“唯一”的资源。比如交易撮合系统中卖家发起订单，而多个买家会对其进行并发争抢。这种场景我们没有办法依赖具体的时间来判断先后，因为不管是用户设备的时间，还是分布式场景下的各台机器的时间，都是没有办法在合并后保证正确的时序的。哪怕是我们同一个机房的集群，不同的机器的系统时间可能也会有细微的差别。

#### ZooKeeper

```go
package main

import (
    "time"

    "github.com/samuel/go-zookeeper/zk"
)

func main() {
    c, _, err := zk.Connect([]string{"127.0.0.1"}, time.Second) //*10)
    if err != nil {
        panic(err)
    }
    l := zk.NewLock(c, "/lock", zk.WorldACL(zk.PermAll))
    err = l.Lock()
    if err != nil {
        panic(err)
    }
    println("lock succ, do your business logic")

    time.Sleep(time.Second * 10)

    // do some thing
    l.Unlock()
    println("unlock succ, finish business logic")
}
```

基于ZooKeeper的锁与基于Redis的锁的不同之处在于Lock成功之前会一直阻塞，这与我们单机场景中的`mutex.Lock`很相似。

其原理也是基于临时Sequence节点和watch API，例如我们这里使用的是`/lock`节点。Lock会在该节点下的节点列表中插入自己的值，只要节点下的子节点发生变化，就会通知所有watch该节点的程序。这时候程序会检查当前节点下最小的子节点的id是否与自己的一致。如果一致，说明加锁成功了。

这种分布式的阻塞锁比较适合分布式任务调度场景，但不适合高频次持锁时间短的抢锁场景。按照Google的Chubby论文里的阐述，基于强一致协议的锁适用于`粗粒度`的加锁操作。这里的粗粒度指锁占用时间较长。我们在使用时也应思考在自己的业务场景中使用是否合适。



#### etcd

etcd是分布式系统中，功能上与ZooKeeper类似的组件，这两年越来越火了。上面基于ZooKeeper我们实现了分布式阻塞锁，基于etcd，也可以实现类似的功能

```go
package main

import (
    "log"

    "github.com/zieckey/etcdsync"
)

func main() {
    m, err := etcdsync.New("/lock", 10, []string{"http://127.0.0.1:2379"})
    if m == nil || err != nil {
        log.Printf("etcdsync.New failed")
        return
    }
    err = m.Lock()
    if err != nil {
        log.Printf("etcdsync.Lock failed")
        return
    }

    log.Printf("etcdsync.Lock OK")
    log.Printf("Get the lock. Do something here.")

    err = m.Unlock()
    if err != nil {
        log.Printf("etcdsync.Unlock failed")
    } else {
        log.Printf("etcdsync.Unlock OK")
    }
}
```

etcd中没有像ZooKeeper那样的Sequence节点。所以其锁实现和基于ZooKeeper实现的有所不同。在上述示例代码中使用的etcdsync的Lock流程是：

1. 先检查`/lock`路径下是否有值，如果有值，说明锁已经被别人抢了
2. 如果没有值，那么写入自己的值。写入成功返回，说明加锁成功。写入时如果节点被其它节点写入过了，那么会导致加锁失败，这时候到 3
3. watch `/lock`下的事件，此时陷入阻塞
4. 当`/lock`路径下发生事件时，当前进程被唤醒。检查发生的事件是否是删除事件（说明锁被持有者主动unlock），或者过期事件（说明锁过期失效）。如果是的话，那么回到 1，走抢锁流程。

值得一提的是，在etcdv3的API中官方已经提供了可以直接使用的锁API

#### 选择合适的锁

业务还在单机就可以搞定的量级时，那么按照需求使用任意的单机锁方案就可以。

如果发展到了分布式服务阶段，但业务规模不大，qps很小的情况下，使用哪种锁方案都差不多。如果公司内已有可以使用的ZooKeeper、etcd或者Redis集群，那么就尽量在不引入新的技术栈的情况下满足业务需求。

业务发展到一定量级的话，就需要从多方面来考虑了。首先是你的锁是否在任何恶劣的条件下都不允许数据丢失，如果不允许，那么就不要使用Redis的`setnx`的简单锁。

对锁数据的可靠性要求极高的话，那只能使用etcd或者ZooKeeper这种通过一致性协议保证数据可靠性的锁方案。但可靠的背面往往都是较低的吞吐量和较高的延迟。需要根据业务的量级对其进行压力测试，以确保分布式锁所使用的etcd或ZooKeeper集群可以承受得住实际的业务请求压力。需要注意的是，etcd和Zookeeper集群是没有办法通过增加节点来提高其性能的。要对其进行横向扩展，只能增加搭建多个集群来支持更多的请求。这会进一步提高对运维和监控的要求。多个集群可能需要引入proxy，没有proxy那就需要业务去根据某个业务id来做分片。如果业务已经上线的情况下做扩展，还要考虑数据的动态迁移。这些都不是容易的事情。

在选择具体的方案时，还是需要多加思考，对风险早做预估。

### 延时任务系统

我们在做系统时，很多时候是处理实时的任务，请求来了马上就处理，然后立刻给用户以反馈。但有时也会遇到非实时的任务，比如确定的时间点发布重要公告。或者需要在用户做了一件事情的X分钟/Y小时后，对其特定动作，比如通知、发券等等。

如果业务规模比较小，有时我们也可以通过数据库配合轮询来对这种任务进行简单处理，但上了规模的公司，自然会寻找更为普适的解决方案来解决这一类问题。

一般有两种思路来解决这个问题：

1. 实现一套类似crontab的分布式定时任务管理系统。
2. 实现一个支持定时发送消息的消息队列。

两种思路进而衍生出了一些不同的系统，但其本质是差不多的。都是需要实现一个定时器（timer）。在单机的场景下定时器其实并不少见，例如我们在和网络库打交道的时候经常会调用`SetReadDeadline()`函数，就是在本地创建了一个定时器，在到达指定的时间后，我们会收到定时器的通知，告诉我们时间已到。这时候如果读取还没有完成的话，就可以认为发生了网络问题，从而中断读取。

定时器的实现在工业界已经是有解的问题了。常见的就是时间堆和时间轮。

最常见的时间堆一般用小顶堆实现，小顶堆其实就是一种特殊的二叉树，

小顶堆的好处是什么呢？对于定时器来说，如果堆顶元素比当前的时间还要大，那么说明堆内所有元素都比当前时间大。进而说明这个时刻我们还没有必要对时间堆进行任何处理。定时检查的时间复杂度是`O(1)`。

当我们发现堆顶的元素小于当前时间时，那么说明可能已经有一批事件已经开始过期了，这时进行正常的弹出和堆调整操作就好。每一次堆调整的时间复杂度都是`O(LgN)`。

Go自身的内置定时器就是用时间堆来实现的，不过并没有使用二叉堆，而是使用了扁平一些的四叉堆。

小顶堆的性质，父节点比其4个子节点都小，子节点之间没有特别的大小关系要求。

四叉堆中元素超时和堆调整与二叉堆没有什么本质区别。

用时间轮来实现定时器时，我们需要定义每一个格子的“刻度”，可以将时间轮想像成一个时钟，中心有秒针顺时针转动。每次转动到一个刻度时，我们就需要去查看该刻度挂载的任务列表是否有已经到期的任务。

从结构上来讲，时间轮和哈希表很相似，如果我们把哈希算法定义为：触发时间%时间轮元素大小。那么这就是一个简单的哈希表。在哈希冲突时，采用链表挂载哈希冲突的定时器。

除了这种单层时间轮，业界也有一些时间轮采用多层实现，这里就不再赘述了。

每一个实例每隔一小时，会去数据库里把下一个小时需要处理的定时任务捞出来，捞取的时候只要取那些`task_id % shard_count = shard_id`的那些任务即可。

当这些定时任务被触发之后需要通知用户侧，有两种思路：

1. 将任务被触发的信息封装为一条消息，发往消息队列，由用户侧对消息队列进行监听。
2. 对用户预先配置的回调函数进行调用。



### 负载均衡

如果我们不考虑均衡的话，现在有n个服务节点，我们完成业务流程只需要从这n个中挑出其中的一个。有几种思路:

1. 按顺序挑: 例如上次选了第一台，那么这次就选第二台，下次第三台，如果已经到了最后一台，那么下一次从第一台开始。这种情况下我们可以把服务节点信息都存储在数组中，每次请求完成下游之后，将一个索引后移即可。在移到尽头时再移回数组开头处。
2. 随机挑一个: 每次都随机挑，真随机伪随机均可。假设选择第 x 台机器，那么x可描述为`rand.Intn()%n`。
3. 根据某种权重，对下游节点进行排序，选择权重最大/小的那一个。

当然了，实际场景我们不可能无脑轮询或者无脑随机，如果对下游请求失败了，我们还需要某种机制来进行重试，如果纯粹的随机算法，存在一定的可能性使你在下一次仍然随机到这次的问题节点。

洗牌算法

考虑到我们需要随机选取每次发送请求的节点，同时在遇到下游返回错误时换其它节点重试。所以我们设计一个大小和节点数组大小一致的索引数组，每次来新的请求，我们对索引数组做洗牌，然后取第一个元素作为选中的服务节点，如果请求失败，那么选择下一个节点重试，以此类推

洗牌算法 有两个隐藏的隐患:

1. 没有随机种子。在没有随机种子的情况下，`rand.Intn()`返回的伪随机数序列是固定的。
2. 洗牌不均匀，会导致整个数组第一个节点有大概率被选中，并且多个节点的负载分布不均衡。



### 分布式搜索引擎

数据库系统本身要保证实时和强一致性，所以其功能设计上都是为了满足这种一致性需求。比如write ahead log的设计，基于B+树实现的索引和数据组织，以及基于MVCC实现的事务等等。

关系型数据库一般被用于实现OLTP系统，所谓OLTP，援引wikipedia：

在线交易处理（OLTP, Online transaction processing）是指透过信息系统、电脑网络及数据库，以线上交易的方式处理一般即时性的作业数据，和更早期传统数据库系统大量批量的作业方式并不相同。OLTP通常被运用于自动化的数据处理工作，如订单输入、金融业务…等反复性的日常性交易活动。和其相对的是属于决策分析层次的联机分析处理（OLAP）。

在互联网的业务场景中，也有一些实时性要求不高(可以接受多秒的延迟)，但是查询复杂性却很高的场景。举个例子，在电商的WMS系统中，或者在大多数业务场景丰富的CRM或者客服系统中，可能需要提供几十个字段的随意组合查询功能。这种系统的数据维度天生众多，比如一个电商的WMS中对一件货物的描述，可能有下面这些字段：

> 仓库id，入库时间，库位分区id，储存货架id，入库操作员id，出库操作员id，库存数量，过期时间，SKU类型，产品品牌，产品分类，内件数量

除了上述信息，如果商品在仓库内有流转。可能还有有关联的流程 id，当前的流转状态等等。

想像一下，如果我们所经营的是一个大型电商，每天有千万级别的订单，那么在这个数据库中查询和建立合适的索引都是一件非常难的事情。

在CRM或客服类系统中，常常有根据关键字进行搜索的需求，大型互联网公司每天会接收数以万计的用户投诉。而考虑到事件溯源，用户的投诉至少要存2~3年。又是千万级甚至上亿的数据。根据关键字进行一次like查询，可能整个MySQL就直接挂掉了。

这时候我们就需要搜索引擎来救场了。



### 分布式配置管理

在分布式系统中，常困扰我们的还有上线问题。虽然目前有一些优雅重启方案，但实际应用中可能受限于我们系统内部的运行情况而没有办法做到真正的“优雅”。比如我们为了对去下游的流量进行限制，在内存中堆积一些数据，并对堆积设定时间或总量的阈值。在任意阈值达到之后将数据统一发送给下游，以避免频繁的请求超出下游的承载能力而将下游打垮。这种情况下重启要做到优雅就比较难了。

所以我们的目标还是尽量避免采用或者绕过上线的方式，对线上程序做一些修改。比较典型的修改内容就是程序的配置项。

我们使用etcd实现一个简单的配置读取和动态更新流程，以此来了解线上的配置更新流程。

配置定义

```json
etcdctl get /configs/remote_config.json
{
    "addr" : "127.0.0.1:1080",
    "aes_key" : "01B345B7A9ABC00F0123456789ABCDAF",
    "https" : false,
    "secret" : "",
    "private_key_path" : "",
    "cert_file_path" : ""
}
```

新建etcd client

```go
cfg := client.Config{
    Endpoints:               []string{"http://127.0.0.1:2379"},
    Transport:               client.DefaultTransport,
    HeaderTimeoutPerRequest: time.Second,
}
```

获取配置

```go
resp, err = kapi.Get(context.Background(), "/path/to/your/config", nil)
if err != nil {
    log.Fatal(err)
} else {
    log.Printf("Get is done. Metadata is %q\n", resp)
    log.Printf("%q key has %q value\n", resp.Node.Key, resp.Node.Value)
}
```

配置膨胀

随着业务的发展，配置系统本身所承载的压力可能也会越来越大，配置文件可能成千上万。客户端同样上万，将配置内容存储在etcd内部便不再合适了。随着配置文件数量的膨胀，除了存储系统本身的吞吐量问题，还有配置信息的管理问题。我们需要对相应的配置进行权限管理，需要根据业务量进行配置存储的集群划分。如果客户端太多，导致了配置存储系统无法承受瞬时大量的QPS，那可能还需要在客户端侧进行缓存优化，等等。

这也就是为什么大公司都会针对自己的业务额外开发一套复杂配置系统的原因。

配置版本管理

在配置管理过程中，难免出现用户误操作的情况，例如在更新配置时，输入了无法解析的配置。这种情况下我们可以通过配置校验来解决。

有时错误的配置可能不是格式上有问题，而是在逻辑上有问题。比如我们写SQL时少select了一个字段，更新配置时，不小心丢掉了json字符串中的一个field而导致程序无法理解新的配置而进入诡异的逻辑。为了快速止损，最快且最有效的办法就是进行版本管理，并支持按版本回滚。

在配置进行更新时，我们要为每份配置的新内容赋予一个版本号，并将修改前的内容和版本号记录下来，当发现新配置出问题时，能够及时地回滚回来。

常见的做法是，使用MySQL来存储配置文件或配置字符串的不同版本内容，在需要回滚时，只要进行简单的查询即可。



## ElasticSearch

数据库系统本身要保证实时和强一致性，所以其功能设计上都是为了满足这种一致性需求。比如write ahead log的设计，基于B+树实现的索引和数据组织，以及基于MVCC实现的事务等等。

关系型数据库一般被用于实现OLTP系统，所谓OLTP，在线交易处理（OLTP, Online transaction processing）是指透过信息系统、电脑网络及数据库，以线上交易的方式处理一般即时性的作业数据，和更早期传统数据库系统大量批量的作业方式并不相同。OLTP通常被运用于自动化的数据处理工作，如订单输入、金融业务…等反复性的日常性交易活动。和其相对的是属于决策分析层次的联机分析处理（OLAP）。

在互联网的业务场景中，也有一些实时性要求不高(可以接受多秒的延迟)，但是查询复杂性却很高的场景。举个例子，在电商的WMS系统中，或者在大多数业务场景丰富的CRM或者客服系统中，可能需要提供几十个字段的随意组合查询功能。这种系统的数据维度天生众多

想像一下，如果我们所经营的是一个大型电商，每天有千万级别的订单，那么在这个数据库中查询和建立合适的索引都是一件非常难的事情。

在CRM或客服类系统中，常常有根据关键字进行搜索的需求，大型互联网公司每天会接收数以万计的用户投诉。而考虑到事件溯源，用户的投诉至少要存2~3年。又是千万级甚至上亿的数据。根据关键字进行一次like查询，可能整个MySQL就直接挂掉了。

这时候我们就需要搜索引擎来救场了。

[全文搜索](https://baike.baidu.com/item/全文搜索引擎)属于最常见的需求，开源的 [Elasticsearch](https://www.elastic.co/) （以下简称 Elastic）是目前全文搜索引擎的首选。

它可以快速地储存、搜索和分析海量数据。维基百科、Stack Overflow、Github 都采用它。

Elastic 的底层是开源库 [Lucene](https://lucene.apache.org/)。但是，你没法直接用 Lucene，必须自己写代码去调用它的接口。Elastic 是 Lucene 的封装，提供了 REST API 的操作接口，开箱即用。

安装Elastic

```shell
$ wget https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-5.5.1.zip
$ unzip elasticsearch-5.5.1.zip
$ cd elasticsearch-5.5.1/ 
```

接着，进入解压后的目录，运行下面的命令，启动 Elastic。

```shell
$ ./bin/elasticsearch
```

如果这时[报错](https://github.com/spujadas/elk-docker/issues/92)"max virtual memory areas vm.max*map*count [65530] is too low"，要运行下面的命令。

```shell
$ sudo sysctl -w vm.max_map_count=262144
```

如果一切正常，Elastic 就会在默认的9200端口运行。这时，打开另一个命令行窗口，请求该端口，会得到说明信息。

```shell
$ curl localhost:9200

{
  "name" : "atntrTf",
  "cluster_name" : "elasticsearch",
  "cluster_uuid" : "tf9250XhQ6ee4h7YI11anA",
  "version" : {
    "number" : "5.5.1",
    "build_hash" : "19c13d0",
    "build_date" : "2017-07-18T20:44:24.823Z",
    "build_snapshot" : false,
    "lucene_version" : "6.6.0"
  },
  "tagline" : "You Know, for Search"
}
```

上面代码中，请求9200端口，Elastic 返回一个 JSON 对象，包含当前节点、集群、版本等信息。

按下 Ctrl + C，Elastic 就会停止运行。

默认情况下，Elastic 只允许本机访问，如果需要远程访问，可以修改 Elastic 安装目录的`config/elasticsearch.yml`文件，去掉`network.host`的注释，将它的值改成`0.0.0.0`，然后重新启动 Elastic。

```yaml
network.host: 0.0.0.0
```

上面代码中，设成`0.0.0.0`让任何人都可以访问。线上服务不要这样设置，要设成具体的 IP。

### 基本概念

Node与Cluster

Elastic 本质上是一个分布式数据库，允许多台服务器协同工作，每台服务器可以运行多个 Elastic 实例。

单个 Elastic 实例称为一个节点（node）。一组节点构成一个集群（cluster）。

Index

Elastic 会索引所有字段，经过处理后写入一个反向索引（Inverted Index）。查找数据的时候，直接查找该索引。

所以，Elastic 数据管理的顶层单位就叫做 Index（索引）。它是单个数据库的同义词。每个 Index （即数据库）的名字必须是小写。

下面的命令可以查看当前节点的所有 Index。

```shell
$ curl -X GET 'http://localhost:9200/_cat/indices?v'
```

Document

Index 里面单条的记录称为 Document（文档）。许多条 Document 构成了一个 Index。

Document 使用 JSON 格式表示，下面是一个例子。

```json
{
  "user": "张三",
  "title": "工程师",
  "desc": "数据库管理"
}
```

同一个 Index 里面的 Document，不要求有相同的结构（scheme），但是最好保持相同，这样有利于提高搜索效率。

Type

Document 可以分组，比如`weather`这个 Index 里面，可以按城市分组（北京和上海），也可以按气候分组（晴天和雨天）。这种分组就叫做 Type，它是虚拟的逻辑分组，用来过滤 Document。

不同的 Type 应该有相似的结构（schema），举例来说，`id`字段不能在这个组是字符串，在另一个组是数值。这是与关系型数据库的表的[一个区别](https://www.elastic.co/guide/en/elasticsearch/guide/current/mapping.html)。性质完全不同的数据（比如`products`和`logs`）应该存成两个 Index，而不是一个 Index 里面的两个 Type（虽然可以做到）。

下面的命令可以列出每个 Index 所包含的 Type。

```shell
$ curl 'localhost:9200/_mapping?pretty=true'
```

Elastic 6.x 版只允许每个 Index 包含一个 Type，7.x 版将会彻底移除 Type。

### 新建和删除index

新建 Index，可以直接向 Elastic 服务器发出 PUT 请求。下面的例子是新建一个名叫`weather`的 Index

```shell
$ curl -X PUT 'localhost:9200/weather'
```

服务器返回一个 JSON 对象，里面的`acknowledged`字段表示操作成功。

```json
{
  "acknowledged":true,
  "shards_acknowledged":true
}
```

然后，我们发出 DELETE 请求，删除这个 Index。

```shell
$ curl -X DELETE 'localhost:9200/weather'
```



### 中文分词设置

首先，安装中文分词插件。这里使用的是 [ik](https://github.com/medcl/elasticsearch-analysis-ik/)，也可以考虑其他插件（比如 [smartcn](https://www.elastic.co/guide/en/elasticsearch/plugins/current/analysis-smartcn.html)）。

```shell
$ ./bin/elasticsearch-plugin install https://github.com/medcl/elasticsearch-analysis-ik/releases/download/v5.5.1/elasticsearch-analysis-ik-5.5.1.zip
```

上面代码安装的是5.5.1版的插件，与 Elastic 5.5.1 配合使用。

接着，重新启动 Elastic，就会自动加载这个新安装的插件。

然后，新建一个 Index，指定需要分词的字段。这一步根据数据结构而异，下面的命令只针对本文。基本上，凡是需要搜索的中文字段，都要单独设置一下。

```shell
$ curl -X PUT 'localhost:9200/accounts' -d '
{
  "mappings": {
    "person": {
      "properties": {
        "user": {
          "type": "text",
          "analyzer": "ik_max_word",
          "search_analyzer": "ik_max_word"
        },
        "title": {
          "type": "text",
          "analyzer": "ik_max_word",
          "search_analyzer": "ik_max_word"
        },
        "desc": {
          "type": "text",
          "analyzer": "ik_max_word",
          "search_analyzer": "ik_max_word"
        }
      }
    }
  }
}'
```

Elastic 的分词器称为 [analyzer](https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis.html)。我们对每个字段指定分词器。

```json
"user": {
  "type": "text",
  "analyzer": "ik_max_word",
  "search_analyzer": "ik_max_word"
}
```

`analyzer`是字段文本的分词器，`search_analyzer`是搜索词的分词器。`ik_max_word`分词器是插件`ik`提供的，可以对文本进行最大数量的分词。

### 数据操作

新增记录

向指定的 /Index/Type 发送 PUT 请求，就可以在 Index 里面新增一条记录。比如，向`/accounts/person`发送请求，就可以新增一条人员记录。

```shell
$ curl -X PUT 'localhost:9200/accounts/person/1' -d '
{
  "user": "张三",
  "title": "工程师",
  "desc": "数据库管理"
}' 
```

服务器返回的 JSON 对象，会给出 Index、Type、Id、Version 等信息。

```json
{
  "_index":"accounts",
  "_type":"person",
  "_id":"1",
  "_version":1,
  "result":"created",
  "_shards":{"total":2,"successful":1,"failed":0},
  "created":true
}
```

如果你仔细看，会发现请求路径是`/accounts/person/1`，最后的`1`是该条记录的 Id。它不一定是数字，任意字符串（比如`abc`）都可以。

新增记录的时候，也可以不指定 Id，这时要改成 POST 请求。

```shell
$ curl -X POST 'localhost:9200/accounts/person' -d '
{
  "user": "李四",
  "title": "工程师",
  "desc": "系统管理"
}'
```

上面代码中，向`/accounts/person`发出一个 POST 请求，添加一个记录。这时，服务器返回的 JSON 对象里面，`_id`字段就是一个随机字符串。

```json
{
  "_index":"accounts",
  "_type":"person",
  "_id":"AV3qGfrC6jMbsbXb6k1p",
  "_version":1,
  "result":"created",
  "_shards":{"total":2,"successful":1,"failed":0},
  "created":true
}
```

注意，如果没有先创建 Index（这个例子是`accounts`），直接执行上面的命令，Elastic 也不会报错，而是直接生成指定的 Index。所以，打字的时候要小心，不要写错 Index 的名称。

查询记录

向`/Index/Type/Id`发出 GET 请求，就可以查看这条记录。

```shell
$ curl 'localhost:9200/accounts/person/1?pretty=true'
```

上面代码请求查看`/accounts/person/1`这条记录，URL 的参数`pretty=true`表示以易读的格式返回。

返回的数据中，`found`字段表示查询成功，`_source`字段返回原始记录。

```json
{
  "_index" : "accounts",
  "_type" : "person",
  "_id" : "1",
  "_version" : 1,
  "found" : true,
  "_source" : {
    "user" : "张三",
    "title" : "工程师",
    "desc" : "数据库管理"
  }
}
```

如果 Id 不正确，就查不到数据，`found`字段就是`false`。

```shell
$ curl 'localhost:9200/weather/beijing/abc?pretty=true'

{
  "_index" : "accounts",
  "_type" : "person",
  "_id" : "abc",
  "found" : false
}
```

删除记录

删除记录就是发出 DELETE 请求。

```shell
$ curl -X DELETE 'localhost:9200/accounts/person/1'
```

更新记录

更新记录就是使用 PUT 请求，重新发送一次数据。

```shell
$ curl -X PUT 'localhost:9200/accounts/person/1' -d '
{
    "user" : "张三",
    "title" : "工程师",
    "desc" : "数据库管理，软件开发"
}' 

{
  "_index":"accounts",
  "_type":"person",
  "_id":"1",
  "_version":2,
  "result":"updated",
  "_shards":{"total":2,"successful":1,"failed":0},
  "created":false
}
```

### 数据查询

返回所有记录

使用 GET 方法，直接请求`/Index/Type/_search`，就会返回所有记录。

```shell
$ curl 'localhost:9200/accounts/person/_search'

{
  "took":2,
  "timed_out":false,
  "_shards":{"total":5,"successful":5,"failed":0},
  "hits":{
    "total":2,
    "max_score":1.0,
    "hits":[
      {
        "_index":"accounts",
        "_type":"person",
        "_id":"AV3qGfrC6jMbsbXb6k1p",
        "_score":1.0,
        "_source": {
          "user": "李四",
          "title": "工程师",
          "desc": "系统管理"
        }
      },
      {
        "_index":"accounts",
        "_type":"person",
        "_id":"1",
        "_score":1.0,
        "_source": {
          "user" : "张三",
          "title" : "工程师",
          "desc" : "数据库管理，软件开发"
        }
      }
    ]
  }
}
```

全文搜索

Elastic 的查询非常特别，使用自己的[查询语法](https://www.elastic.co/guide/en/elasticsearch/reference/5.5/query-dsl.html)，要求 GET 请求带有数据体。

```shell
$ curl 'localhost:9200/accounts/person/_search'  -d '
{
  "query" : { "match" : { "desc" : "软件" }}
}'
```

Elastic 默认一次返回10条结果，可以通过`size`字段改变这个设置。

```shell
$ curl 'localhost:9200/accounts/person/_search'  -d '
{
  "query" : { "match" : { "desc" : "管理" }},
  "size": 1
}'
```

还可以通过`from`字段，指定查询位置。

```shell
$ curl 'localhost:9200/accounts/person/_search'  -d '
{
  "query" : { "match" : { "desc" : "管理" }},
  "from": 1,
  "size": 1
}'
```

上面代码指定，从位置1开始（默认是从位置0开始），只返回一条结果。

逻辑运算

如果有多个搜索关键字， Elastic 认为它们是`or`关系。

```shell
$ curl 'localhost:9200/accounts/person/_search'  -d '
{
  "query" : { "match" : { "desc" : "软件 系统" }}
}'
```

如果要执行多个关键词的`and`搜索，必须使用[布尔查询](https://www.elastic.co/guide/en/elasticsearch/reference/5.5/query-dsl-bool-query.html)。

```shell
$ curl 'localhost:9200/accounts/person/_search'  -d '
{
  "query": {
    "bool": {
      "must": [
        { "match": { "desc": "软件" } },
        { "match": { "desc": "系统" } }
      ]
    }
  }
}'
```

