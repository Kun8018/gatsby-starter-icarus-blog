title: 非关系型数据库
date: 2020-03-02 21:40:33
categories: IT
tags:
    - IT，Web,数据库
toc: true
thumbnail: https://s1.ax1x.com/2020/03/27/G9OTjU.png

　　非关系型数据库有关的知识，学习后端必备。

<!--more-->

## NoSQL

　 Not Only SQL,

## Mongo

Mongo是目前最流行的面向文档型数据库，

### 安装

mac下命令行启动

```mac
brew tap mongodb/bew
brew install mongodb-community
brew services start mongodb-community
```

windows下在Mongo/bin目录下运行

```mongo
mongo
```

mongo shell的命令行

```mongo
show dbs     列出所有DB
use dbname   切换当前DB
show tables      列出当前DB的所有表/集合
show collections  列出当前DB的所有表/集合
show users   列出当前DB的所有用户
show profile 列出当前DB的所有慢查询
show logs     列出运行日志
```

执行命令

```mongo
* db.serverStatus()                                查看mongod运行状态信息
* db.stats()                                       查看db元数据
* db.collection.stats()                            查看集合元数据
* db.collection.insert() / update / remove / find  对集合增删改查
* db.collection.createIndex()                      创建索引
* db.collection.dropIndex()                        删除索引
* db.dropDatabase()                                删除DB
* db.printReplicationInfo() 
* db.printSlaveReplicationInfo()                   查看复制集同步信息
* rs.status()                                      查看复制集当前状态
* rs.conf()                                        查看复制集配置
* rs.initiate()                                    初始化复制集
* rs.reconfig()                                    重新配置复制集
* rs.add() / rs.remove()                           增加/删除复制集节点  
* sh.enableSharding()                              对DB启用分片
* sh.shardCollection()                             对集合进行分片
* sh.status()                                      查看sharding状态信息
```

### GUI工具

mac下使用Robo 3T gui工具



### 与Sql对比

基本概念

| SQL术语/概念  | MongoDB术语/概念 | 解析/说明                               |
| :------------ | :--------------- | :-------------------------------------- |
| `database`    | `database`       | 数据库                                  |
| `table`       | `collection`     | 数据表/集合                             |
| `row`         | `document`       | 数据记录/文档                           |
| `column`      | `field`          | 数据记录行/文档                         |
| `index`       | `index`          | 索引                                    |
| `table`       | `joins`          | 表连接，`MongoDB`不支持                 |
| `primary key` | `primary key`    | 主键,`MongoDB`自动将`_id`字段设置为主键 |

查询语句

| mongo                                                       | sql                                                          | 说明                                 |
| :---------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------- |
| `db.users.find()`                                           | `select * from users`                                        | 从`user`表中查询所有数据             |
| `db.users.find({“username” : “joe”, “age” : 27})`           | `select * from users where “username” = “joe” and age = 27`  | 查找`username = joe`且`age = 27`的人 |
| `db.users.find({}, {“username” : 1, “email” : 1})`          | `select username, email from users`                          | 查找`username`,`email`这`2`个子项    |
| `db.users.find({“age” : {“$gt” : 18}})`                     | `select * from users where age >18`                          | 查找`age > 18`的会员                 |
| `db.users.find({“age” : {“$gte” : 18}})`                    | `select * from users where age >=18`                         | 查找`age >= 18`的人                  |
| `db.users.find({“age” : {“$lt” : 18}})`                     | `select * from users where age <18`                          | 查找`age < 18`的人                   |
| `db.users.find({“age” : {“$lte” : 18}})`                    | `select * from users where age <=18`                         | 查找`age <= 18`的人                  |
| `db.users.find({“username” : {“$ne” : “joe”}})`             | `select * from users where username <> “joe”`                | 查找 `username != joe`的会员         |
| `db.users.find({“ticket_no” : {“$in” : [725, 542, 390]}})`  | `select * from users where ticket_no in (725, 542, 390)`     | 符合`tickt_no`在此范围的结果         |
| `db.users.find({“ticket_no” : {“$nin” : [725, 542, 390]}})` | `select * from users where ticket_no not in (725, 542, 390)` | 符合`tickt_no`不在此范围的结果       |
| `db.users.find({“name” : /joey^/})`                         | `select * from users where name like “joey%”`                | 查找前`4`个字符为`joey`的人          |

### 基本操作





### 为什么Mongo使用B树



### 缺点

不支持事务





## Redis

redis是用c语言开发的一个开源的高性能键值对数据库。它通过提供多种键值数据类型来满足不同场景下的存储需求

redis 的应用场景：

缓存（数据查询、短连接、新闻内容、商品内容等等）

分布式集群架构中的session分离

聊天室的在线好友列表

任务队列（秒杀、抢购、12306等等）

应用排行榜

网站访问统计

数据过期处理（精确到毫秒）

### 安装

使用linux wget命令安装

```shell
wget http://download.redis.io/releases/redis-3.0.0.tar.gz
```

将redis-3.0.0 tar包拷贝到/usr/local下

```shell
cp redis-3.0.0.tar.gz /usr/local
```

解压源码

```shell
tar -zxvf redis-3.0.0.tar.gz
```

进入解压后的目录，编译、安装到指定目录

```shell
cd /usr/local/redis-3.0.0
make PREFIX=/usr/local/redis install
```

Redis bin：

redis-benchmark：redis性能测试工具

redis-check-aof：AOF文件修复工具

redis-check-rdb：RDB文件修复工具

redis-cli： redis命令行客户端

redisconf：redis配置文件

redis-sentinal：redis集群管理工具

redis-server：redis

启动服务

```node
redis-server
```



### Redis的数据结构

redis有五种数据结构：

string：简单的kv缓存。最常规的set/get操作，value可以是String也可以是数字。一般做一些复杂的计数功能的缓存。

hash：存放对象。

list：有序列表，可以存储列表型数据

set：无序集合，自动去重

zset：排序的set，可以自定义排序规则。sorted set多了一个权重参数score,集合中的元素能够按score进行排列。可以做排行榜应用，取TOP N操作。

redis内部结构

- dict 本质上是为了解决算法中的查找问题（Searching）是一个用于维护key和value映射关系的数据结构，与很多语言中的Map或dictionary类似。本质上是为了解决算法中的查找问题（Searching）
- sds sds就等同于char * 它可以存储任意二进制数据，不能像C语言字符串那样以字符’\0’来标识字符串的结 束，因此它必然有个长度字段。
- skiplist （跳跃表） 跳表是一种实现起来很简单，单层多指针的链表，它查找效率很高，堪比优化过的二叉平衡树，且比平衡树的实现，
- quicklist
- ziplist 压缩表 ziplist是一个编码后的列表，是由一系列特殊编码的连续内存块组成的顺序型数据结构，



### 为什么Redis使用单线程模型，在4.0之后的版本加了多线程

Redis 作为一个内存服务器，它需要处理很多来自外部的网络请求，它使用 I/O 多路复用机制同时监听多个文件描述符的可读和可写状态，一旦收到网络请求就会在内存中快速处理，由于绝大多数的操作都是纯内存的，所以处理的速度会非常地快。

在 [Redis 4.0](https://raw.githubusercontent.com/antirez/redis/4.0/00-RELEASENOTES) 之后的版本，情况就有了一些变动，新版的 Redis 服务在执行一些命令时就会使用『主处理线程』之外的其他线程，例如 `UNLINK`、`FLUSHALL ASYNC`、`FLUSHDB ASYNC` 等非阻塞的删除操作。

为什么大部分命令使用单线程

Redis 从一开始就选择使用单线程模型处理来自客户端的绝大多数网络请求，这种考虑其实是多方面的，作者分析了相关的资料，发现其中最重要的几个原因如下：

1. 使用单线程模型能带来更好的可维护性，方便开发和调试；
2. 使用单线程模型也能并发的处理客户端的请求；
3. Redis 服务中运行的绝大多数操作的性能瓶颈都不是 CPU；

Redis 选择使用单线程模型处理客户端的请求主要还是因为 CPU 不是 Redis 服务器的瓶颈，所以使用多线程模型带来的性能提升并不能抵消它带来的开发成本和维护成本，系统的性能瓶颈也主要在网络 I/O 操作上；而 Redis 引入多线程操作也是出于性能上的考虑，对于一些大键值对的删除操作，通过多线程非阻塞地释放内存空间也能减少对 Redis 主线程阻塞的时间，提高执行的效率。

https://draveness.me/whys-the-design-redis-single-thread/



### Redis的过期策略

设置过期时间

在设置key时为key设置一个过期时间，到期后缓存就会失效，

**定时删除**

redis默认每秒会进行10次过期扫描，但不是扫描所有的key，而是使用一种简单的贪心政策：

从过期字典里随机选取20个key；

删除这20个key中已经过期的key；

如果过期的key比率超过1/4，则重复步骤一。

这样保证了过期扫描不会循环过度，redis还增加了扫描时间的上限，默认不会超过25ms

**惰性删除**

在获取某个key时，redis会检查一下，如果这个key设置了过期时间并且已经过期了，就会删除这个key，不会返回任何数据。

内存淘汰策略

redis为用户提供了几种内存淘汰策略：

Noeviction:内存不足以容纳新数据时，新写入的数据会报错，del和read请求可以正常执行。这是默认的淘汰策略。

Alleys-lru：当内存不足以容纳新数据时，移除最近最少使用的key(针对全部的key，没有设置过期时间的key也会被淘汰)

Alleys-random:当内存不足以容纳新数据时，随机移除某个key(针对全部的key)

Volatile-lru:当内存不足以容纳新数据时，在设置了过期时间的key中，移除最近最少使用的key

Volatile-random:当内存不足以容纳新数据时，在设置了过期时间的key中，随机移除key

Volatile-ttl:当内存不足以容纳新数据时，在设置了过期时间的key中，优先移除有更早过期时间的key



### 持久化

Redis有RDB(快照)和AOF(日志)两种持久化的机制，RDB是一次全量备份，AOF是连续增量备份

RDB会生成多个数据文件，每个数据文件都代表某个时刻中redis的数据。但是使用RDB进行持久化是每隔一段时间生成一次数据文件，如果宕机，就会丢失一段时间的数据。

redis底层使用操作系统的多进程机制COW机制来实现RDB持久化，redis在持久化的时候会调用glibc的函数fork一个子进程，RDB持久化过程完全交给子进程处理，父进程继续处理客户端的需求。当父进程对某个页面的数据进行修改时，COW机制会将页面复制一份出来，父页面修改的是复制出来的页面，子进程的页面是没有变化的，还是进程产生的数据，子进程可以安心地遍历数据进行序列化写磁盘，这就是RDB持久化被称为快照的原因。

AOF记录的redis服务器的顺序指令序列，只会记录对内存修改的指令记录到日志文件中，在redis重启之后就通过AOF日志的命令重放，以此来重新构建整个数据集。

AOF的日志会越来越长，在redis重启回复数据时重放整个AOF日志也会很耗时，导致长时间redis无法对外提供服务，所以redis提供了指令对AOF日志进行瘦身，进行瘦身时会基于当前内存中的数据，来重写构造一个更小的AOF文件，并将旧的膨胀的很大的日志文件删除。

### 缓存雪崩与缓存穿透、缓存击穿、缓存预热

**缓存雪崩**是指缓存整体崩溃，导致请求全部走到数据库，数据库崩溃同时导致系统崩溃

解决方案：

使用redis-cluster实现高可用，防止redis崩溃

使用本地缓存ehcache和hystrix限流、降级等，防止大量请求到后台

使用redis持久化，在redis崩溃重启后能快速回复数据

**缓存穿透：**

缓存穿透是指别人发送的恶意请求，每次在缓存和数据库中查询数据都查不到，这样就会导致大量的恶意请求直接将数据库搞崩

解决方案：每次到数据库中查询时就算没查到数据也设置一个空值到缓存中。

**缓存击穿：**

是指一个key非常热点，在不停的扛着大并发，大并发集中对这一个点进行访问，当这个key在失效的瞬间，持续的大并发就穿破缓存，直接请求数据。

解决方案：在访问key之前，采用SETNX（set if not exists）来设置另一个短期key来锁住当前key的访问，访问结束再删除该短期key。



**缓存预热**

就是系统上线后，将相关的缓存数据直接加载到缓存系统。这样就可以避免在用户请求的时候，先查询数据库，然后再将数据缓存的问题！用户直接查询事先被预热的缓存数据！

解决思路：

- 直接写个缓存刷新页面，上线时手工操作下；
- 数据量不大，可以在项目启动的时候自动进行加载；
- 定时刷新缓存；

**缓存更新** 

除了缓存服务器自带的缓存失效策略之外（Redis默认的有6中策略可供选择），我们还可以根据具体的业务需求进行自定义的缓存淘汰，常见的策略有两种：

- 定时去清理过期的缓存；
- 当有用户请求过来时，再判断这个请求所用到的缓存是否过期，过期的话就去底层系统得到新数据并更新缓存。

两者各有优劣，第一种的缺点是维护大量缓存的key是比较麻烦的，第二种的缺点就是每次用户请求过来都要判断缓存失效，逻辑相对比较复杂！具体用哪种方案，大家可以根据自己的应用场景来权衡。



**缓存降级**

当访问量剧增、服务出现问题（如响应时间慢或不响应）或非核心服务影响到核心流程的性能时，仍然需要保证服务还是可用的，即使是有损服务。系统可以根据一些关键数据进行自动降级，也可以配置开关实现人工降级。

降级的最终目的是保证核心服务可用，即使是有损的。而且有些服务是无法降级的（如加入购物车、结算）

以参考日志级别设置预案：

- 一般：比如有些服务偶尔因为网络抖动或者服务正在上线而超时，可以自动降级；
- 警告：有些服务在一段时间内成功率有波动（如在95~100%之间），可以自动降级或人工降级，并发送告警；
- 错误：比如可用率低于90%，或者数据库连接池被打爆了，或者访问量突然猛增到系统能承受的最大阀值，此时可以根据情况自动降级或者人工降级；
- 严重错误：比如因为特殊原因数据错误了，此时需要紧急人工降级。

服务降级的目的，是为了防止Redis服务故障，导致数据库跟着一起发生雪崩问题。因此，对于不重要的缓存数据，可以采取服务降级策略，例如一个比较常见的做法就是，Redis出现问题，不去数据库查询，而是直接返回默认值给用户。

### **Memcache与Redis的区别都有哪些？**

1)、存储方式 Memecache把数据全部存在内存之中，断电后会挂掉，数据不能超过内存大小。Redis有部份存在硬盘上，redis可以持久化其数据

2)、数据支持类型 memcached所有的值均是简单的字符串，redis作为其替代者，支持更为丰富的数据类型 ，提供list，set，zset，hash等数据结构的存储

3)、使用底层模型不同 它们之间底层实现方式 以及与客户端之间通信的应用协议不一样。Redis直接自己构建了VM 机制 ，因为一般的系统调用系统函数的话，会浪费一定的时间去移动和请求。

4). value 值大小不同：Redis 最大可以达到 512M；memcache 只有 1mb。

5）redis的速度比memcached快很多

6）Redis支持数据的备份，即master-slave模式的数据备份。





### redis集群方案

1.twemproxy，大概概念是，它类似于一个代理方式， 使用时在本需要连接 redis 的地方改为连接 twemproxy， 它会以一个代理的身份接收请求并使用一致性 hash 算法，将请求转接到具体 redis，将结果再返回 twemproxy。

缺点：twemproxy 自身单端口实例的压力，使用一致性 hash 后，对 redis 节点数量改变时候的计算值的改变，数据无法自动移动到新的节点。

2.codis，目前用的最多的集群方案，基本和 twemproxy 一致的效果，但它支持在 节点数量改变情况下，旧节点数据可恢复到新 hash 节点

3.redis cluster3.0 自带的集群，特点在于他的分布式算法不是一致性 hash，而是 hash 槽的概念，以及自身支持节点设置从节点。具体看官方文档介绍。



### 多机redis如何保证数据一致

主从复制，读写分离

一类是主数据库（master）一类是从数据库（slave），主数据库可以进行读写操作，当发生写操作的时候自动将数据同步到从数据库，而从数据库一般是只读的，并接收主数据库同步过来的数据，一个主数据库可以有多个从数据库，而一个从数据库只能有一个主数据库。



### redis事务

Redis事务功能是通过MULTI、EXEC、DISCARD和WATCH 四个原语实现的

Redis会将一个事务中的所有命令序列化，然后按顺序执行。

1. redis 不支持回滚“Redis 在事务失败时不进行回滚，而是继续执行余下的命令”， 所以 Redis 的内部可以保持简单且快速。
2. 如果在一个事务中的命令出现错误，那么所有的命令都不会执行；
3. 如果在一个事务中出现运行错误，那么正确的命令会被执行。

注：redis的discard只是结束本次事务,正确命令造成的影响仍然存在.

1）MULTI命令用于开启一个事务，它总是返回OK。MULTI执行之后，客户端可以继续向服务器发送任意多条命令，这些命令不会立即被执行，而是被放到一个队列中，当EXEC命令被调用时，所有队列中的命令才会被执行。

2）EXEC：执行所有事务块内的命令。返回事务块内所有命令的返回值，按命令执行的先后顺序排列。当操作被打断时，返回空值 nil 。

3）通过调用DISCARD，客户端可以清空事务队列，并放弃执行事务， 并且客户端会从事务状态中退出。

4）WATCH 命令可以为 Redis 事务提供 check-and-set （CAS）行为。可以监控一个或多个键，一旦其中有一个键被修改（或删除），之后的事务就不会执行，监控一直持续到EXEC命令。



### redis线程模型





### **为什么Redis的操作是原子性的，怎么保证原子性的？**

对于Redis而言，命令的原子性指的是：一个操作的不可以再分，操作要么执行，要么不执行。

Redis的操作之所以是原子性的，是因为Redis是单线程的。（Redis新版本已经引入多线程，这里基于旧版本的Redis）

Redis本身提供的所有API都是原子操作，Redis中的事务其实是要保证批量操作的原子性。

多个命令在并发中也是原子性的吗？

不一定， 将get和set改成单命令操作，incr 。使用Redis的事务，或者使用Redis+Lua==的方式实现.



### redis分布式锁

Redis为单进程单线程模式，采用队列模式将并发访问变成串行访问，且多客户端对Redis的连接并不存在竞争关系Redis中可以使用SETNX命令实现分布式锁。

将 key 的值设为 value ，当且仅当 key 不存在。若给定的 key 已经存在，则 SETNX 不做任何动作

解锁：使用 del key 命令就能释放锁

解决死锁：

- 通过Redis中expire()给锁设定最大持有时间，如果超过，则Redis来帮我们释放锁。
- 使用 setnx key “当前系统时间+锁持有的时间”和getset key “当前系统时间+锁持有的时间”组合的命令就可以实现。



错误：**Warning: no config file specified, using the default config. In order to specify a config file**

```noed
redis-server redis.windows.conf
```





错误：**creating server tcp listening socket 127.0.0.1:6379: bind No error**

```node
Redis-cli.exe
shutdown
exit
```

