---
title: flutter移动开发（二）
date: 2020-08-28 21:40:33
categories: 技术博客
tags:
    - IT,Web，Flutter
toc: true
thumbnail: http://cdn.kunkunzhang.top/flutter2.jpg
---

## 概述

​     跨平台移动开发工具。

​    第一篇很长了，所以换到第二篇。第一篇主要写了安装、布局等基础性模块，第二篇涉及到更多模块

<!--more-->

## 选择器

### 中国城市选择器

安装包

```yaml
dependencies:
       city_pickers: ^0.1.18
```

导入包

```dart
import 'package:city_pickers/city_pickers.dart';
```

实例



### 文件选择器

安装包

```yaml
dependencies:
      file_picker: ^1.3.8
```

引入包

```dart

```

实例

```

```

### 时间日期选择器

底部弹出栏，可以选择时间、日期，支持中文、英文等几种语言。

安装包

```yaml
dependencies:
     flutter_datetime_picker: 1.4.0
```

引入包

```dart
import 'package:flutter/material.dart';
import 'package:flutter_datetime_picker/flutter_datetime_picker.dart';
```

实例

```dart
onPressed: () {
        DatePicker.showDatePicker(context,showTitleActions: true,
                              minTime: DateTime(2018, 3, 5),
                              maxTime: DateTime(2019, 6, 7), 
                              onChanged: (date) {
                                print('change $date');
                              }, 
                              onConfirm: (date) {
                                print('confirm $date');
                              }, 
                              currentTime: DateTime.now(), 
                               locale: LocaleType.zh
         );
    },
    child: Text(
        'show date time picker (Chinese)',
        style: TextStyle(color: Colors.blue),
    ));
```

https://www,jianshu.com/p/4b23964be383

## 动画

animation

```dart
class _Animation extends State<AnimateApp> with SingleTickerProviderStateMixin{
  AnimationController controller;
  Animation<double> animation;
  
  @override
  void initState() {
    //初始化AnimationController对象
      controller=AnimationController(
        const Duration(milliseconds: 500),
        vsync: this
  	 );
    //通过tween对象，创建animation对象
    animation = Tween(begin: 50.0,end: 200.0).animate(controller)
      ..addlistener((){
        setState(() {});
      })
      //添加状态监听，检测动画是否播放完成
      ...addStatusListener((status){
        if(status == AnimationStatus.completed){
          controller.reverse();
        } else if (status == AnimationStatus.dismissed){
          controller.forward();
        }
      })
      
    //执行动画
    controller.forward();
  }

  @override
  void dispose() {
    super.dispose();
    //销毁控制器，释放资源
    controller.dispose();
  }
}
```

`Animation` 对象，是 `Flutter` 动画库中的核心类，插入用于引导动画的值,`Animation` 对象知道当前动画的状态（如：动画是否开始，停止，前进或者后退），但对屏幕上显示的内容一无所知

`AnimationController` 对象管理着 `Animation`

`CurvedAnimation` 是非线性运动的动画

`Listeners` 和 `StatusListeners` 来监听动画状态的变化

controller常用方法

- animateTo(double target, { Duration duration, Curve curve: Curves.linear }) ：将动画从其当前值驱动到目标值
- animateWith(Simulation simulation)：根据给定的需要模拟的物体运动（类似物体的速度，受到的力等）开展动画
- dispose() ：释放此对象使用的资源。调用此方法后，该对象不再可用。
- fling({double velocity: 1.0, AnimationBehavior animationBehavior }) ：使用临界阻尼弹簧（在lowerBound 和upperBound内）和初始速度驱动动画。
- forward({double from }) ：开始向前运行此动画（到最后）。
- repeat({double min, double max, Duration period }) ：以向前方向开始运行此动画，并在完成时重新启动动画。
- reset() ：将控制器的值设置为lowerBound，停止动画（如果正在进行中），并重置为其开始点或解除状态。
- reverse({double from })：开始反向运行此动画（朝向开头）。
- stop({bool canceled: true })：停止运行此动画。

AnimationStatus.completed表示动画结束的状态，AnimationStatus.dismissed表示动画回到起点的状态

- didRegisterListener()：在添加动画状态监听前调用，该方法需融合withAnimationLocalStatusListenersMixin的类来实现
- addStatusListener(AnimationStatusListener listener)：添加动画状态监听
- removeStatusListener(AnimationStatusListener listener)：移除动画状态监听
- didUnregisterListener()：在移除动画状态监听后调用，该方法需融合withAnimationLocalStatusListenersMixin的类来实现
- notifyStatusListeners(AnimationStatus status)：动画状态变化的通知，通知所有注册的AnimationStatusListener

flutter页面切换时动画处理

```dart
dependencies:
     flutter_vallains: ^1.2.1
```

引入

```dart
import 'package:flutter_villains/villain.dart'
```

动画分为两类，补间动画和物理动画

补间动画就是

Tween是一个无状态(stateless)对象，需要begin和end值。Tween的唯一职责就是定义从输入范围到输出范围的映射

物理动画是在基于物理的动画中，运动被模拟为与真实世界的行为相似。例如，当你掷球时，它在何处落地，取决于抛球速度有多快、球有多重、距离地面有多远。 类似地，将连接在弹簧上的球落下（并弹起）与连接到绳子上的球放下的方式也是不同。

flutter 的动画是基于

### hero动画

在路由转换之间添加动画成为hero动画，hero动画为共享动画



### flare动画

https://juejin.im/post/6861865147557183495#heading-5

### 实例1:闪屏动画



### 实例2：加载动画



### 3D动画

Flutter 中的 Transform 可以实现许多酷炫的动画效果，由于现在的智能手机都有用于图形计算的 GPU 单元，对于图形的计算与渲染进行了优化，因此即使是渲染 3D 图形也是非常快的。因此，基本上你看到的手机上的所有图形，都是通过 3D 的渲染方式来呈现的，即使是 2D 的图形素材。

通过 Transfrom 来实现透视效果，而 Transfrom 是通过 Matrix4 进行矩阵变换来实现的这个效果。





## Grapgql

安装包

```yaml
dependencies:
    grapgql_flutter
```

首先将json数据转换为dart模型

科学上网打开 转换 网站：[app.quicktype.io/](https://app.quicktype.io/)

将json代码数据粘贴到左侧，右侧选择dart语言，会自动生成模型代码

复制右侧代码，保存到dart文件中（如PostsData.dart)

实例

```dart
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:tinylearn_client/PostsData.dart';//导入模型文件

final _uri = 'http://10.0.0.10:4444/'; //接口地址

Future<PostsData> _postsData;

  @override
  void initState() {
    
    final client = GraphQLClient(
      cache: InMemoryCache(),
      link: HttpLink(uri: _uri)
    );

    _postsData = _createPostsData(client);
    super.initState();
  }

 Future<PostsData> _createPostsData(GraphQLClient client) async {
        
    final result = await client.query(QueryOptions(
      documentNode: gql(r'''
        query {
          posts {
            id
            created
            content
          }
        }
      '''),
    ));
    if (result.hasException) throw result.exception;
    return PostsData.fromMap(result.data);
  }

```

https://juejin.im/post/5ed5a4d46fb9a047cf332f83#heading-3

## 数据存储

把一些轻量级的数据（如用户信息、APP配置信息等）写入SharedPreference做存储，flutter中使用第三方库实现。合理地使用持久化能够让App支持离线化操作，给用户带来极大的操作体验的提升。

安装包

```dart
dependencies:
    shared_preferences
```

引入包

```dart
import 'packages:shared_preferences/shared_preferences.dart'
```

sp是通过key-value的方式存数据、取数据

```dart
//存数据
Future saveString() async(){
    SharedPreferences sharedPreferences=await SharedPreferences.getInstance();
    sharedPreferences.setString(
       STORAGE_KEY, _textFieldController.value.text.toString()
    );
}
//取数据
Future getString() async(){
    SharedPreferences sharedPreferences=await SharedPreferences.getInstance();
    setState(
       _storageString = sharedPreferences.getString(STORAGE_KEY);
    );//把取出的数据保存到变量中
}
//删除数据
SharedPreferences sharePreferences = await SharedPreferences.getInstance();
sharePreferences.remove(key);
```

把长期存储的数据写入文件或Sqlite3

写入文件

安装包

```dart
dependencies:
    path_provider: ^0.5.0
```



Sqlite

```yaml
dependencies:
    sqfliter: ^1.0.0
```

引入文件

```dart
import 'package:sqflite/sqflite.dart';
```





## Provider状态管理

InheritedWidget可以提供共享数据，并且通过getElementForInheritedWidgetOfExactType来解除didChangeDependencies的调用，但还是没有避免CountWidget的重新build，并没有将build最小化。

我们今天就来解决如何避免不必要的build构建，将build缩小到最小的CountText。



provider是一个依赖注入和状态管理的混合工具，通过组件来构建组件。

安装包

```yaml
dependencies:
  provider: ^4.0.0
```

引入包

```dart
import 'package:provider/provider.dart';
```

通过各种不同的provider来应对具体的需求

`Provider` 最基础的provider,它会获取一个值并将它暴露出来

`ListenableProvider` 用来暴露可监听的对象，该provider将会监听对象的改变以便及时更新组件状态

`ChangeNotifierProvider` ListerableProvider依托于ChangeNotifier的一个实现，它将会在需要的时候自动调用`ChangeNotifier.dispose`方法

`ValueListenableProvider` 监听一个可被监听的值，并且只暴露`ValueListenable.value`方法

`StreamProvider` 监听一个流，并且暴露出其最近发送的值

`FutureProvider` 接受一个`Future`作为参数，在这个`Future`完成的时候更新依赖

暴露多个provider

```dart
MultiProvider(
  providers: [
    Provider<Something>(create: (_) => Something()),
    Provider<SomethingElse>(create: (_) => SomethingElse()),
    Provider<AnotherThing>(create: (_) => AnotherThing()),
  ],
  child: someWidget,
)
```

selector

不要在只会调用一次的组件生命周期中调用Provider,如create、initstate

`provider`暴露了许多细节api以便使用者封装自己的provider，它们包括：`SingleChildCloneableWidget`、`InheritedProvider`、`DelegateWidget`、`BuilderDelegate`、`ValueDelegate`,

https://juejin.im/post/6844904145774870536#heading-10

## Fishredux

安装fishredux

```yaml
dependencies:
  fish_redux: ^0.3.4
```

引入

```dart
import 'package:fish_redux/fish_redux.dart';
```





reducer是负责（state）的更新，effect 负责 state 更新之外的事情。

store维持全局的状态（state），应用只有一个单一的 store 。

## Bloc

状态管理插件

https://juejin.im/post/6844903689082109960#heading-4



## 路由

路由是在不同页面之间跳转。在Android中通常指一个Activity，在iOS中指一个ViewController。flutter中管理多个页面时有两个核心概念和类：[Route](https://docs.flutter.io/flutter/widgets/Route-class.html) 和 [Navigator](https://docs.flutter.io/flutter/widgets/Navigator-class.html)。一个 route 是一个屏幕或页面的抽象，Navigator 是管理 route 的 Widget。路由入栈 (push) 操作对应打开一个新页面，路由出栈 (pop) 操作对应页面关闭操作，

`Navigator`是一个路由管理的组件，它提供了打开和退出路由页方法。`Navigator`通过一个栈来管理活动路由集合。通常当前屏幕显示的页面就是栈顶的路由。`Navigator`提供了一系列方法来管理路由栈，

注册路由表

```dart
routes:{
   "new_page":(context) => NewRoute(),
    ... // 省略其它路由注册信息
  } ,
```

路由表是一个Map类型的键值对集合，key是路由的名字，是字符串，value是builder函数，

普通跳转方式与返回

```dart
Navigator.push(
  context,
  MaterialPageRoute(
    builder: (context) {
      return TipRoute(
        // 路由参数
        text: "我是提示xxxx",
      );
    },
  ),
);
//在路由页添加返回函数
Navigator.pop(context, "我是返回值"),
```

`MaterialPageRoute` 是`Material`组件库的一个Widget，它可以针对不同平台，实现与平台页面切换动画风格一致的路由切换动画



命名路由

一般推荐使用命名路由的方式管理路由，因为：

语义化更明确。

代码更好维护；如果使用匿名路由，则必须在调用`Navigator.push`的地方创建新路由页，这样不仅需要import新路由页的dart文件，而且这样的代码将会非常分散。

可以通过`onGenerateRoute`做一些全局的路由跳转前置处理逻辑。

方法

```dart
Future pushNamed(BuildContext context, String routeName,{Object arguments})
```

### 路由参数

注册路由与正常相同，路由页与路由跳转添加参数

```dart
class EchoRoute extends StatelessWidget {

  @override
  Widget build(BuildContext context) {
    //通过RouteSetting对象获取路由参数  
    var args=ModalRoute.of(context).settings.arguments;
    //...省略无关代码
  }
}
```

跳转路由时填写参数

```dart
Navigator.of(context).pushNamed("new_page", arguments: "hi");
```

其他跳转方式 

PushReplacement会替换当前的路由，也就是说新push进入的route会替换原来route。

PushReplacementNamed是根据路由名称（routeName），找寻对应的route，并实现见面的跳转。`PushReplacementNamed`会替换当前的路由，也就是说新push进入的route会替换原来route。

PopAndPushNamed是先pop原来的route，再push新的route。

pushAndRemoveUntil/pushNamedAndRemoveUntil,,跳转到新的路由，并删除路由栈中的其他路由，可以应用于支付流程。在支付的过程中，我们会跳转多个界面（填写金额、选择支付方式、输入密码、支付结果...），当我们支付成功后，pop时不应该一层一层的，而应该直接返回根界面。

canPop判断当前route是否可以pop，返回bool；maybePop先判断当前route是否可以pop，可以则直接pop，不行则没有任何效果。

popUntil一直返回route，直到`predicate`返回true时停止。

实例

```dart
Navigator.of(context).pushNamed('a_router_widget');
Navigator.of(context).pushReplacementNamed('d_router_widget');
Navigator.of(context).popAndPushNamed('d_router_widget');
Navigator.of(context).pushNamedAndRemoveUntil('d_router_widget', (Route<dynamic> route) => false);

Navigator.of(context).maybePop();
Navigator.of(context).canPop();
Navigator.of(context).pop();
Navigator.popUntil(context, ModalRoute.withName('a_router_widget'));
```



### 路由钩子函数



## 时间组件

DateTime表示一个时间点，创建之后将是固定不变的，不可被修改，datetime默认是本地时区

```dart
var today = DateTime.now()//获取当前时间
DateTime victoryDay = new DateTime(1992,9,9)  //创建指定时间
DateTime.parse(string)//字符串转datetime
formatDate(DateTime,[yyyy,'-',mm,'-',dd]);//datetime转字符串
fromMillisecondsSinceEpoch//时间戳转datetime
today.millisecondsSinceEpoch//datetime转时间戳
today.isBefore(date)//时间比较 在之前
today.isAfter(date)//时间比较 在之后
today.isAtSameMomentAs(date)//时间比较 是否相等
compareTo(date)//大于返回1，等于返回0，小于返回-1
today.difference(date)//两个时间相差 小时数
today:add(new Duration(days: 5));//时间加5天
today.subtract(new Duration(days: 5))//时间减五天
today.timeZoneOffset//返回utc与本地时差小时数
today.year//返回年year、月month、日day、时hour、分minute、秒second、毫秒millisecond、微秒microsecond
today.weekday//返回星期几
//计算时间
Duration timeremain = new Duration(days:2,hours:56,minutes:14);//104:14:00
```



## 屏幕适配



## 瀑布流

安装包

```yaml
dependencies:
  flutter_staggered_grid_view: "^0.3.2"
```

导入包

```dart
import 'package:flutter_staggered_grid_view/flutter_staggered_grid_view.dart';
```

使用包

```dart
new StaggeredGridView.countBuilder(
  crossAxisCount: 4,
  itemCount: 8,
  itemBuilder: (BuildContext context, int index) => new Container(
      color: Colors.green,
      child: new Center(
        child: new CircleAvatar(
          backgroundColor: Colors.white,
          child: new Text('$index'),
        ),
      )),
  staggeredTileBuilder: (int index) =>
      new StaggeredTile.count(2, index.isEven ? 2 : 1),
  mainAxisSpacing: 4.0,
  crossAxisSpacing: 4.0,
)
```

## 剪切板

https://jianshu.com/p/c71b150f85f0

引入包

```dart
import 'package:flutter/service.dart'
```

安装包

```yaml
dependencies:
   flutter_clipboard_manager:^0.2.1
```

引入包

```dart
import 'package:flutter_clipboard_manager/flutter_clipboard_manager.dart'
```

实例

```dart
//定义函数，写入剪贴板
static Future<bool> copyToClipboard(String text) asyc{
    return FlutterClipboardManager.copyToClipBoard(text).then((result){
        
    });//支持调用.then方法
}
//从剪贴板导出
static Future<bool> copyFromClipboard(String text) asyc{
    return FlutterClipboardManager.copyFromClipBoard(text).then((result){
         print(result);
    });//支持调用.then方法
}
```

## 国际化

使用intl包可以实现国际化，也方便

添加sdk

```yaml
flutter_localization:
   sdk: flutter
```

引入

```dart
import 'packages:flutter_localization/flutter_localization.dart'
```



## 权限管理

安装包

```yaml
dependencies:
    permission_handler:
```

引入包

```dart
import 'package:permission_handler/permission_handler.dart';
```

实例

```dart
Future requestPermission() async {
  // 申请权限
  Map<PermissionGroup, PermissionStatus> permissions =
      await PermissionHandler().requestPermissions([PermissionGroup.storage]);
  // 申请结果
  PermissionStatus permission =
      await PermissionHandler().checkPermissionStatus(PermissionGroup.storage);
  if (permission == PermissionStatus.granted) {
    Fluttertoast.showToast(msg: "权限申请通过");
  } else {
    Fluttertoast.showToast(msg: "权限申请被拒绝");
  }
}
```



## 版本管理

安装包

```dart
version
```

引入包





## SVG插件

可以在flutter中使用svg文件，安装包

```yaml
dependencies:
   flutter_svg:^0.17.4
```

引入包

```dart
import 'packages:flutter_svg/flutter_svg.dart'
```

实例

```dart
//将svg格式的文件放在asset中，在yaml文件中引入资源
SvgPicture set = new SvgPicture.asset(
   "assets/set.svg",
    color: Colors.red
)//引入名为set的图标,宽度、颜色等样式可以自定义
```

## 插入web_view

安装插件

```yaml
dependencies:
   flutter_webview_plugin:^0.2.1
```

引入

```dart
import 'package:flutter_webview_plugin/flutter_webview_plugin.dart'
```

实例

```dart
new MaterialApp(
      routes: {
        "/": (_) => new WebviewScaffold(
          url: "https://www.google.com",
          appBar: new AppBar(
            title: new Text("Widget webview"),
          ),
        ),
      },
    );
```

## 网络状态

安装包

```yaml
dependencies:
  connectivity: ^0.4.8+6
```

引入包

```dart
import 'package:connectivity/connectivity.dart';
```

实例

```dart
var connectivityResult = await (Connectivity().checkConnectivity());
if (connectivityResult == ConnectivityResult.mobile) {
  // I am connected to a mobile network.
} else if (connectivityResult == ConnectivityResult.wifi) {
  // 连接到wifi
}
```

## 地图组件

安装包

```yaml
dependencies:
  flutter_map: 0.9.0
```

允许

```xml
<uses-permission android:name="android.permission.INTERNET"/>
```

引入包

```dart
import 'package:flutter_map/flutter_map.dart';
```



## 保存图片

可以在flutter中保存图片，安装包

```yaml
dependencies:
  image_gallery_saver: '^1.5.0'
```

导入包

```dart
import 'package:image_gallery_saver/image_gallery_saver.dart';
```

实例

```dart
_save() async {
   var response = await Dio().get(
           "https://ss0.baidu.com/94o3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=a62e824376d98d1069d40a31113eb807/838ba61ea8d3fd1fc9c7b6853a4e251f94ca5f46.jpg",
           options: Options(responseType: ResponseType.bytes));
   final result = await ImageGallerySaver.saveImage(
           Uint8List.fromList(response.data),
           quality: 60,
           name: "hello");
   print(result);
  }
```



## 键盘管理

安装包

```yaml
dependencies:
   keyboard_visibility: any
```

引入包

```dart
import 'package:keyboard_visibility/keyboard_visibility.dart';
```

实例

```dart
@protected
void initState() {
  super.initState();

  KeyboardVisibilityNotification().addNewListener(
    onChange: (bool visible) {
      print(visible);
    },
  );
}
```



## 资源管理

flutter可以将asset打包在程序安装包中，在程序运行时访问，常见的资源包括json文件、配置文件、图标和图片。构建时flutter将asset放置到称为asset bundle的特殊存档。

在pubspec.yaml中 指定资源

```yaml
flutter:
     assets:
       - assets/1.png
       - assets/2.png
```

加载方法

```dart
Image.asset('路径')//加载图片
future: DefaultAssetBundle.of(context).loadString("assets/sword.json")//加载json，加载后可以将json转化为dart进行显示
    
```



```dart
import 'package:flutter/services.dart' show rootBundle;

Future<String> loadAsset(async) {
    return await rootBundle.loadString('assets/sword.json')
}
```

加载依赖包中的图片

```dart
AssetImage('icons/phone.png',package:'best_icons')
```

指定某一目录的所有资源，直接指定目录名称

```dart
flutter:
     assets:
       - assets/
```

## 搜索页



## 录音管理

安装包

```yaml
dependencies:

```

引入包

```dart
import 'package:audio_recorder/audio_recorder.dart';
```

开启权限

安卓

```xml
<uses-permission android:name="android.permission.RECORD_AUDIO" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
```

IOS

```xml
<key>NSMicrophoneUsageDescription</key>
<string>Record audio for playback</string>
```

实例

```dart
// 检查权限
bool hasPermissions = await AudioRecorder.hasPermissions;

// 获取目前状态
bool isRecording = await AudioRecorder.isRecording;
// 开始录音
await AudioRecorder.start(path: _controller.text, audioOutputFormat: AudioOutputFormat.AAC);
// 结束录音
Recording recording = await AudioRecorder.stop();
print("Path : ${recording.path},  Format : ${recording.audioOutputFormat},  Duration : ${recording.duration},  Extension : ${recording.extension},");

```



## 长按复制





## QQ和微信





## 手机震动

安装包

```yaml
 dependencies:
   vibration: ^1.2.4
```

引入包

```dart
import 'package:vibration/vibration.dart';
```

在AndroidManifest.xml文件中开启权限

```xml
<uses-permission android:name="android.permission.VIBRATE"/>
```

实例

```dart
震动函数以ms为单位，
Vibration.vibrate(duration: 1000);//振动1s
Vibration.vibrate(pattern: [500, 1000, 500, 2000]);//振动0.5s，休息一秒，振动0.5秒，休息两秒
Vibration.vibrate(pattern: [500, 1000, 500, 2000], intensities: [1, 255]);//震动强度变化
```



## flutter美化进阶组件

### 液体效果页面切换

安装包

```dart
dependencies:
  liquid_swipe: ^1.3.0
```

引入包

```dart
import 'package:liquid_swipe/Constants/Helpers.dart';
import 'package:liquid_swipe/liquid_swipe.dart';
```

https://juejin.im/post/5ddb54146fb9a07a8f412d62



### 点赞按钮动画

安装包

```dart
dependencies:
  like_button: ^0.1.9
```

引入包

```dart
import 'package:like_button/like_button.dart';
```



https://juejin.im/post/5db4f54bf265da4d02625c17

### 加载中过渡动画

安装包

```dart
dependencies:
  liquid_progress_indicator: ^0.3.2
```

引入包

```dart
import 'package:liquid_progress_indicator/liquid_progress_indicator.dart';
```

圆形进度器

```node
LiquidCircularProgressIndicator(
    value: 0.8, //当前进度 0-1
    valueColor: AlwaysStoppedAnimation(Colors.blue[200]), // 进度值的颜色.
    backgroundColor: Colors.white, // 背景颜色.
    borderColor: Colors.blue,//边框颜色
    borderWidth: 2.0,//边框宽度
    direction: Axis.vertical, // 进度方向 (Axis.vertical = 从下到上, Axis.horizontal = 从左到右). 默认：Axis.vertical
    center: Text("正在上传..."), //中间显示的组件 
)

```

https://juejin.im/post/5dde3194f265da06074f13c6

### 粘性header组件

安装包

```yaml
dependencies:
  sticky_headers: ^0.1.8+1
```

引入包

```dart
import 'package:sticky_headers/sticky_headers.dart';
```

实例

```dart
ListView.builder(
    itemCount: 12,
    itemBuilder: (context, index) {
        return StickyHeader(
            header: Container( //header组件
                height: 50.0,
                color: Colors.blueGrey[700],
                padding: EdgeInsets.symmetric(horizontal: 16.0),
                alignment: Alignment.centerLeft,
                child: Text('Header #$index',
                    style: const TextStyle(color: Colors.white),
                ),
            ),
            content: Container(//内容组件
                child: Image.network(imgs[index], fit: BoxFit.cover,width: double.infinity, height: 200.0),
            ),
        );
    }
)

链接：https://juejin.im/post/5dce4a845188254c9479f0af
```

### 可翻转卡片

安装包

```yaml
dependencies:
  flip_card: ^0.4.4
```

引入包

```dart
import 'package:flip_card/flip_card.dart';
```

实例

```dart
FlipCard(
    direction: FlipDirection.VERTICAL, //基于X轴翻转
    front: Container(
        height: 200,
        width: 345,
        margin: EdgeInsets.all(10),
        color: Colors.teal,
        child: Center(
            child: Text("《遮天》",style:TextStyle(
                fontSize:40,
                color:Colors.white
            )),
        ),
    ),
    back: Container(
        height: 200,
        width: 345,
        margin: EdgeInsets.all(10),
        color: Colors.pink,
        padding: EdgeInsets.all(10),
        child: Text('....'
        ,style: TextStyle(
            color: Colors.white,
            height:2.0
        )),
    ),
),

链接：https://juejin.im/post/5dd4f84e5188254e0c036d5f
```



### 自制刮刮卡效果

安装包

```yaml
dependencies:
  scratcher: "^1.3.0"
```

引入包

```dart
import 'package:scratcher/scratcher.dart';
```

实例

```dart
Scratcher(
    brushSize: 30, //刷子大小（手指刮动的笔刷）
    threshold: 50, //完全刮开的阈值 百分比
    color: Colors.grey, //覆盖层的颜色
    onChange: (value) { //被刮动的回调 返回当前刮开区域百分比
        print("当前刮开比例: $value%");
    },
    onThreshold: () { //触发完全刮开的阈值回调
        print("已触发设置的全部刮开阈值");
    },
    child: Container( //覆盖层下的原本组件 一般是刮卡结果展示
        height: 150,
        width: 300,
        color: Colors.blue,
    ),
)

链接：https://juejin.im/post/5df5c48ae51d4558096d5887
```

### 自制评分组件

安装包

```yaml
dependencies:
  flutter_rating_bar: ^3.0.0
```

引入包

```dart
import 'package:flutter_rating_bar/flutter_rating_bar.dart';
```

实例

```dart
RatingBar(
    initialRating: rate1, //初始评分 double
    allowHalfRating: true,//允许0.5评分
    itemCount: 5,//评分组件个数
    itemPadding: EdgeInsets.symmetric(horizontal: 4.0),
    itemBuilder: (context, _) => Icon(
        Icons.star,
        color: Colors.amber,
    ),
    onRatingUpdate: (rating) {
        setState(() {
            this.rate1=rating;
        });
    },
)

链接：https://juejin.im/post/5dd1f9eae51d454014386435
```







