---
title: flutter移动开发（四）
date: 2020-09-02 21:40:33
categories: 技术博客
tags:
    - IT，Flutter 
toc: true
thumbnail: http://cdn.kunkunzhang.top/dart.jpg
---

　　本篇注重flutter底层

　　<!--more-->

## Dart语法

### dart内置包

```dart
import 'dart:core';
```

提供了小型但关键的内置功能，这个包库被自动导入每个dart程序

```dart
import 'dart:async';
```

异步编程通常使用回调函数，dart提供其他方法：future和stream，dart:async库中包含了future和Stream的更多信息

Future就像对未来某个时刻的结果的承诺。Stream是一种获取值序列(如事件)的方法。

```dart
import 'dart:math';
```

dart:math库提供常见的函数，如正弦余弦、最大值最小值，pi和e等

Api：https://api.dart.dev/stable/2.8.4/dart-math/dart-math-library.html

```dart
import 'dart:convert';
```

jsonDecode将json编码的字符串解码为dart对象

jsonEncode将受支持的Dart对象编码为json格式的字符串

utf8.decode()将utf8编码的字节解码为dart字符串

utf8.encode()将Dart字符串编码为utf8编码字节的列表:

```dart
import 'dart:io'
```

网络实现

```dart
var httpClient = new HttpClient();
var uri = new Uri.http()
var request = await httpClient.getUrl(uri);
var response = await request.close();

```

### 变量和基本类型 

变量 var

如果不希望变量修改，可以使用final或者const定义变量

数字类型：int整数、double浮点数类型、num数字类型

布尔类型 

枚举类型  enum

List数组

List,是泛型类型数据结构，支持任意数据类型的数组。默认定义方式为可扩展数组

```dart
// 通过List对象定义int数组
List<int> a = List(); // 在Dart语言中new是可选的
// 定义int数组
var b = List<int>(); // 也可以通过指定List泛型类型定义数组.
// 定义String数组
List<String> strs = ["字符串1", "字符串2"];
//创建固定长度的数组  
List<int> fixedLengthList = List(5);
//合并数组
var list = [1, 2, 3];
var list2 = [0, ...list]; // 将list数组的所有元素一个个展开来，插入到list2中，...为伸展运算符
// 往数组尾巴添加一个元素
var a = [5,1,2,6,3]
a.add(100);
// 通过数组下标，读取第一个元素， 数组下标从0开始计算,固定长度数组只能通过下面的下标的方式读写数组，而且数组下标不能超过数组长度。
var data = a[0];
// 修改第一个元素的值
a[0] = 101;
// 在数组0位置，插入100
a.insert(0,100);
// 删除一个数据
a.remove(100);
// 清空List，删除所有数据
a.clear();
//获取数组大小
print(a.length)
//排序
a.sort();//默认从小到大排序
//查找数据元素
var pos = list.indexOf(5)//数组中第5个位置元素的值
//判断数组是否包含某元素，返回布尔值
var v = list.contains(3);
```

Set集合

Set是无序集合类型，Set跟List都能保存一组数据，区别就是Set的元素都是唯一的。

```dart
//初始化set
var halogens = {'fluorine', 'chlorine', 'bromine', 'iodine', 'astatine'};
var names = Set<String>();
//set集合中添加一个元素
names.add("tizi365");
//将集合类型的数据导入到另一个Set中
var titles = ["Dart语言教程", "Flutter教程"];
names.addAll(titles);
// 删除Set元素
names.remove("Dart语言教程");
// 删除所有Set元素
names.clear();
//获取set集合元素个数
names.length
//检测set中是否含有元素
names.contains("tizi")
// 循环遍历Set元素
for (var x in names) {
	print(x); // 打印元素
}
```

Map类型

Map是一种哈希类型数据，map类型的数据都是由key和value两个值组成，key是唯一的，value不必唯一，key和value可以为相同类型，也可以将key和value分别指定为别的类型

```dart
//初始化map
//直接赋值
var gifts = {
  'first': 'partridge',
  'second': 'turtledoves',
  'fifth': 'golden rings'
};
var data = Map<String, int>();//指定类型
var nobleGases = Map();//默认为<Object,Object>
```

修改map

```dart
//添加数据
data["key1"] = "value1";   
data["key2"] = "value2";
//查询数据
var v = data["tizi"];//根据key为tizi的value返回给v，如果没有默认为null
//更新数据
data["tizi"] = 1001;
//删除map数据
data.remove("tizi");//根据key指定删除数据
//删除map所有数据
data.clear();
//获取map大小
var len = data.length;
//遍历数据
data.forEach((k, v) {// 通过给forEach函数传递一个闭包函数遍历map
    // 这个闭包函数有两个参数: k 代表map的key, v 代表map的value值
    print(k + " = " + v.toString()); // 打印数据
});
```

final表示这个变量不能在发生更改，但是这个初始化的值在编译时是不确定的，在运行时确定其值，且不能更改，如http接口、三方库的随机数据

const是在定义时初始化

### 泛型

类泛型

```dart
//定义类的泛型很简单，只需要在类名后加: <T>；如果需要多个泛型类型参数，可以在尖括号中追加，用逗号分隔
class List<T> {
  T element;

  void add(T element) {
    //...
  }
}
```

函数泛型

```dart
//定义函数的泛型
void add(T elememt) {//函数参数类型为泛型类型
    //...
}

T elementAt(int index) {//函数参数返回值类型为泛型类型
    //...
}

E transform(R data) {//函数参数类型和函数参数返回值类型均为泛型类型
   //... 
}
```

集合泛型

Map<string,int>={}

### 运算符

is对象是该类型，返回true

 is！对象不是该类型返回false

 as类型转换

### 引入与导出

引入分为引入内置库、引入pub包管理器提供的库、引入本地文件(自定义的库)

内置库随flutter sdk安装到本地，

dart语言使用pub管理第三方开源包，

导入本地包时直接通过路径访问dart脚本

指定库的别名

如果导入的两个包，包含了同名的类或者函数，就会出现命名冲突，因此提供别名机制。

```dart
import 'dart:math' as math;// 使用 as 关键词，指定包的别名,通过别名访问包中的方法
```

部分导入

分为只导入需要的部分和隐藏不需要的部分两种

```dart
import 'package:lib1/lib1.dart' show foo;
import 'package:lib1/lib1.dart' hide foo;
```

延迟加载：

在需要的时候进行加载，可以减少app启动时间

```dart
import 'package:deferred/hello.dart' deferred as hello;
    
greet() async {
    await hello.loadLibrary();
    hello.printGreeting();
}
```

flutter对于平台级的包是plugin，主要是与平台相关的功能

flutter对于纯dart开发的包的package，与平台无关，第三方包的前缀为package

导出更大的库 export

library

### 类

默认类的成员属性和方法都是共有的，以下划线 ( _ ) 开头命名的属性和方法代表私有（private）成员属性，

类中跟类名同名的方法，为构造方法，如果没有自定义构造方法，会自动生成一个不带参数的默认构造方法

```dart
//实例化
var p = Person("tizi", 20);
//通过.调用对象中的属性和方法
var ret = p.greet("dacui");
```

Factory构造方法类似设计模式中的工厂模式，用来创建对象。factory 构造方法只能访问静态属性和静态成员方法，因此不能访问this引用。

extends是继承，调用父类的方法要用`super`，重写父类的方法要用`@override`，子类中实现父类的方法时要加`override`

flutter中只支持单继承，且构造函数不能继承，Dart语言中一个类只能继承一个父类，但是Dart语言提供了mixins机制，可以复用多个类，达到类似多继承的效果

```dart
// 定一个父类
class Television {
  void turnOn() {
    print("i am father");
  }
}

// 定义一个子类, 继承Television父类
class SmartTelevision extends Television {
  // 重写父类的方法
  void turnOn() {
    print("i am son");
  }
}
```

implement接口

flutter没有专门的接口，每一个类有一个隐形的接口，接口中包含类中所有变量和方法，可以拥有父类的api，类bimplement类a

```dart
class Point implements Comparable, Location {...}
```

抽象类是不能实例化的类，一般都是用来定义接口，抽象方法就是没有实现的方法。只能继承或写接口

```dart
// 使用abstract关键词修饰的类，就是抽象类
abstract class Doer {
  // 定义个抽象方法，这个方法我们没有实现具体的功能。
  void doSomething(); 
}
class EffectiveDoer extends Doer {
  // 实现抽象类的抽象方法
  void doSomething() {
    print("实现了抽象方法doSomething");
  }
}
```

混合mixins的对象是类，可以混合多个

dart中..符号（两个连点）代表连续调用函数或方法，属于流式编程。

### 函数

函数允许定义0个或多个参数，也可以使用命名参数，就是在函数调用传参的时候，直接根据参数名传递参数，忽略参数定义的顺序。

命名参数用花括号{}表示，命名参数定义后，调用函数时可以不传参，不传参的时候默认参数为null，也可以自定义默认参数

```dart
// 参数包括在 花括号{} 之间
void enableFlags({bool bold, bool hidden}) {
	// 忽略函数代码
}
// 调用函数，多个参数使用逗号分隔，参数顺序无关紧要。
enableFlags(hidden: true, bold: false);
```

闭包函数又叫匿名函数，就是没有函数名的函数，直接将函数赋值给一个变量，通过变量名调用函数即可。

```dart
var f = (a, b) {
    return a > b;  // 返回bool类型参数
};
// 调用闭包函数
f(1,2);
```

闭包函数的一种是箭头函数，如果闭包函数只有一个表达式的时候，可以使用箭头函数简写。

```dart
//上面的函数等价于
var f = (a, b) => a > b;
```

闭包函数内部可以引用包含闭包函数的所有层级作用域中的变量，与闭包函数调用的位置无关。

### 值传递

dart是值传递而非引用传递

值传递和引用传递属于函数调用时参数的求值策略，是用于区分两种内存分配方式，值传递在调用栈上分配，引用传递在堆上分配。

值传递是原来函数的一份拷贝，拷贝的是值，而引用传递拷贝的是指针地址，可以改变值或者指针地址，

除了c、c#、c++，其他的语言如java、oc、Dart等都是值传递。值传递用起来更简单，同时还能规避很多因为此而产生的不必要的问题



### flutter页面间传参

1.通过定义构造方法传值

需要在接收数据的页面事先定义好构造方法，构造方法中是要接收的参数。

2.通过指定路由传递参数

在Flutter中我们可以把要传递的参数放到**Navigator**中，然后传递给指定的路由，在接收的页面提取出需要的参数即可，这种方式相比方式一更加灵活一些。

3.通过onGenerateRoute提取参数后传给相应Widget

这种方式可以看做是前两种方式的结合体，我们可以在onGenerateRoute提取参数，然后传递给指定的Widget。



### Key

flutter受到react或vue启发，每个wideget的构建方法都会有一个key的参数可选，用key标识元素，当移除或添加元素时可以准确识别

Key对于每个元素是独一无二的

ObjectKey与ValueKey

GlobalKey的使用场景是从父组件跨子Widget来传递状态时使用

### future异步

dart是单线程语言，flutter中的异步操作是通过单线程再通过调度任务优先级执行的，也就是future。future是对zone的封装

future与await、async 的区别是future提供了链式调用，future中的.then没有创建新的Event，而是一个个普通函数，全部执行完在开始执行下一个future

创建future

```dart
void testFuture(){
    Future future = new Future(() => null);
    future.then((_){
        print("then");
    }).then((){
        print("whenComplete");
    }).catchError((_){
        
    })
}
```

多个future的执行顺序

future的执行顺序为future在EventQueue中的排列顺序，当需要延迟执行时，采用future.delay()执行，放在最后执行

future如果执行完才添加.then函数，则该任务会被放到MicroTask，当前future执行完才去执行microtask，microtask执行完才去下一个future



### Flutter 与Native通信

Flutter中定义了三种不同类型的channel，分别是

BasicMessageChannel:用于传递字符串和半结构化的信息

MethodChannel：传递方法调用

EventChannel：用于数据流通信

### 单线程模型





### Isolate多线程

flutter中isolate是有自己的内存和单线程控制的运行实体，isolate类似于线程，默认情况Dart启动一个Isolate，main函数就是他的入口。运行中的flutter程序是由一个或多个isolate组成的，通常情况下程序运行在main isolate中。

isolate是通过flutter Engine层面的线程实现的。多个isolate无法共享内存，必须通过api进行通信。

执行完后检查并执行Microtask Queue，通常使用scheduleMicrotask将事件添加到MicroTask Queue

最后执行EventQueue队列中的代码，通常使用future向EventQueue加入时间，也可以使用async和await添加事件

针对比较消耗CPU的任务，最好创建一个新的 Isolate 去处理，避免阻塞主 Isolate （也就是主线程），这样可以利用设备的多核特性。

```dart
// 导入isolate包
import 'dart:isolate';

void main asyc{
  // 创建一个ReceivePort用于接收消息
    var recv = ReceivePort();
  // 通过Isolate.spawn静态函数，创建一个新的Isolate
  Isolate.spawn<String>(subTask, "Task1 parameter");//
  // 泛型参数为SendPort，入口函数为subTask
  Isolate.spawn<SendPort>(subTask, recv.sendPort);
}

// 入口函数，参数类型由上面的spawn的泛型参数决定。
void subTask(String msg) {
	print("subTask recv: $msg");
}
// Isolate入口函数定义，接收一个SendPort对象作为参数
void subTask(SendPort port) {
    // 使用SendPort发送一条字符串消息
	port.send("subTask Result.");
}
```

多个Isolate 之间只能通过消息通讯，主要通过ReceivePort和SendPort两个类处理消息通讯。

ReceivePort 负责接收 SendPort 发送的消息， SendPort 和 ReceivePort 是捆绑关系， SendPort 是由 ReceivePort 创建的。

### 事件流

Stream是dart语言自带的，可以把stream想象成管道，只从一端流入数据，通过管道从另一端流出数据。通过StreamController控制stream，

Stream支持任何数据的传输，包括基本值、对象、事件、集合等。传输数据时可以通过listen监听来自StreamController的属性，监听之后可以通过StreamSubscription订阅对象并接受stream发送数据变更的通知。

Stream也是异步处理的核心，与Future相比，Future表示将来一次异步获得的数据，而Stream是多次异步获取的数据。Future是返回一次值，Stream返回多次值。Stream有StreamBuilder负责监听Stream，当Stream数据流出时会自动重新构建组件，并通过Builder进行回调。

### 常用函数

https://github.com/Sky24n/common_utils



## Flutter底层原理

### flutter开发概述（拷贝）

flutter的开发通过继承无状态的`StatelessWidget`控件还有有状态的`StatefulWidget`，然后通过嵌套`Widget`下的`child/children`，在对应的`Widget`下面建立控件及控件样式

flutter中container控件就是结合`Align`、`Padding`、`DecoratedBox`、`ConstrainedBox`、`Transform`等组合而成，形成编辑好的业务模板

对于状态管理，flutter通过继承statefulwidget，然后在state对象内通过变量访问和setstate出发更新

flutter中存在Widget、Element、RenderObject、Layer四棵树，Element与RenderObject是一一对应的关系，与Widget是多对一的关系，

### flutter执行原理

flutter ui是直接通过skia渲染的。

flutter内部执行事件循环机制。App执行main函数时，优先处理microtask queue，直到队列为空，microtask queue为空后开始处理event queue。每执行一次event，又会判断此时新的microytask queue是否为空，如果有再取出执行。执行microtask queue时eventqueue会被阻塞，直到再次为空。

当microtask queue和event queue都为空时，App正常退出。

microtask queue中尽量避免任务太多或者长时间处理，否则会使App的绘制和交互等行为卡住，因此绘制和交互这些作为event存放在event queue中。

### flutter渠道

flutter定义了master、beta、dev、stable四个渠道

master为最新的channel

dev为当月最新且充分测试的channel

beta为每月最新且充分测试后的channel

stable为当月最稳定的channel

稳定性依次提高



### 生命周期

生命周期存在于有状态组件statefulwidget中

`createState()`创建一个StatefulWidget时立即调用，当要创建新的 StatefulWidget 的时候，会立即执行 createState，而且只执行一次，createState 必须要实现：

`initState()`此方法只会调用一次，初始化state，将state与对应的Buildcontext产生关联,必须调用super.initState()。在此方法内注册streams ChangeNotifiers或其他会改变的数据的监听

`didChangeDependencies()`state的依赖对象发生变化时调用该方法，同时build()方法会被调用

`build()`这个方法经常被调用，build 是用来创建 Widget 的，但因为 build 在每次界面刷新的时候都会调用，所以不要在 build 里写业务逻辑，可以把业务逻辑写到你的 StatelessWidget 的构造函数里。

`didUpdateWidge`当widget的状态变化时调用，一般不会用到，只有在使用 key 对 Widget 进行复用的时候才会调用。

`deactivate()`当切换页面时会调用该方法

`dispose()`widget销毁前调用该方法。当 View 不需要再显示，从渲染树中移除的时候，State 就会永久的从渲染树中移除，就会调用 **dispose** 生命周期，这时候就可以在 **dispose** 里做一些取消监听、动画的操作，和 **initState** 是相反的。

`setState()`通知组件刷新

```dart
@override
initState(){
    super.initState();
}
```

App生命周期

想知道flutterapp是在前台还是后台等，需要了解app生命周期，使用**WidgetsBindingObserver** ，

在首页mix**WidgetsBindingObserver**类，同时初始化监听和移除，

```dart
class _MyHomePageState extends State<MyHomePage> with WidgetsBindingObserver {
    ...
}
  @override
  void initState(){
    super.initState();
    WidgetsBinding.instance.addObserver(this);
  }

  @override
  void dispose() {
    // TODO: implement dispose
    super.dispose();
    WidgetsBinding.instance.removeObserver(this);
  }
@override
void didChangeAppLifecycleState(AppLifecycleState state) {
  super.didChangeAppLifecycleState(state);
  if (state == AppLifecycleState.paused) {
    // went to Background
  }
  if (state == AppLifecycleState.resumed) {
    // came back to Foreground
  }
}
```

AppLifecycleState 就是 App 的生命周期，有：

- resumed
- inactive
- paused
- suspending





## 在Android程序中插入flutter组件



## 在IOS中插入flutter组件



## 音视频

对于flutter或者ios、android开发，在会写界面的基础上，在音视频、性能优化、监控、热修插件、动画效果、渲染等有深入就会很抢手。

音视频基础

视频流从加载到播放一般经过解协议、解封装、解编码等过程

视频封装协议是指我们常见的mp4、avi、rmvb、mkv、flv等常见后缀格式，在传输过程中把音频和视频都打包在一起的封装

流媒体协议一般有http、rtsp、RTMP等，最常见的就说http网络协议，RTSP和RTMP一般用于直播流或远程监控。

对于编码，音频编码是指音频数据的编码方式，有mp3、pcm、aac、ac-3等，数据大小按采样率*声道数*样本格式计算。一般来说，wav/pcm编码的音频质量比较好，体积也会比较大，MP3有损压缩会在保证音频质量的同时压缩体积，aac也是有损压缩

视频编码是图像的编码方式，有h263、h264、h265（HEVC）、MPEG-2、MPEG-4等，



音视频开发接sdk和视频源url，确认自己需要支持的封装协议、视频编码和音频编码。如果允许客户上传，最好在服务端提供转格式与编码率等功能

ffmpeg

## Flutter Web

　flutterweb要求flutter版本大于1.5.4

安装webdev工具

```dart
flutter packages pub global activate webdev
```

如果提示出错安装stagehand，输入命令

```dart
flutter packages pub global activate stagehand 
```

以git方式在pubspec.yaml中引入web库

```dart
dependencies:
     flutter_web: any
     flutter_web_ui: any
 
dev_dependencies:
     builder_runner: ^1.4.0
     builder_web_compilers: ^1.4.0   
     
dependency_overrides:
     flutter_web:
       git:
         url: https://github.com/flutter/flutter_web
         path: packages/flutter_web
     flutter_web_ui:
       git:
         url: https://github.com/flutter/flutter_web
         path: packages/flutter_web_ui
```

热更新

```dart
webdev serve --auto restart
```

输出静态文件

```dart
webdev build
```

### dart2js



## Flutter Windows

开启windows支持

```dart
flutter config --enable-windows-desktop
```

windows应用编译需要visual studio工具

创建一个release版本

```shell
flutter build --<platform>--
## flutter build macos
```



### 窗口尺寸

```dart
import 'package:window_size/window_size.dart' as window_size
```





### file_chooser



## 

　　

## 

