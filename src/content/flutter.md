---
title: Flutter移动开发（一）
date: 2020-08-28 21:40:33
categories: 技术博客
tags:
    - Web,IT,Flutter
toc: true
thumbnail: https://s1.ax1x.com/2020/04/20/J1IMCD.png
---

## 概述

　　跨平台移动开发工具。

​       入门安装、模块使用

<!--more-->

### 安装

windows和macos都必须先安装java和android studio才能跑flutter 的安卓，macos安装xcode可以写ios程序。

### Windows

​       如果你开发过ReactNative或者Androidstudio，那么恭喜你，你不用在安装Java JDK 和android Studio的配置，虽然Flutter的配置也不简单（Google的东西总是被墙）

```ndoe
set PUB_HOSTED_URL=https://pub.flutter-io.cn //国内用户需要设置
set FLUTTER_STORAGE_BASE_URL=https://storage.flutter-io.cn //国内用户需要设置
```



```node
git clone -b beta https://github.com/flutter/flutter.git
```

如果gitclone太慢，可以换成码云上的源，具体方法百度以下

配置环境变量

手动把flutter/bin目录添加到path变量中。

运行

```shell
flutter doctor
flutter run
```

或者

```shell
flutter create [项目名]
```

### 修改gradle

　　flutter项目运行时卡在initializing gradle...

原因：Gradle编译失败。因为项目的gradle依赖maven仓库在国外，修改依赖源

修改项目中`android/build.gradle`文件：

```gradle
buildscript {
    repositories {
        //修改的地方
        //google()
        //jcenter()
        maven { url 'https://maven.aliyun.com/repository/google' }
        maven { url 'https://maven.aliyun.com/repository/jcenter' }
        maven { url 'http://maven.aliyun.com/nexus/content/groups/public' }
    }

    dependencies {
        classpath 'com.android.tools.build:gradle:3.2.1'
    }
}

allprojects {
    repositories {
        //修改的地方
        //google()
        //jcenter()
        maven { url 'https://maven.aliyun.com/repository/google' }
        maven { url 'https://maven.aliyun.com/repository/jcenter' }
        maven { url 'http://maven.aliyun.com/nexus/content/groups/public' }
    }
}
```

修改Flutter的配置文件，该文件在Flutter安装目录下`/packages/flutter_tools/gradle/flutter.gradle`,

```node
buildscript {
    repositories {
        //修改的地方
        //google()
        //jcenter()
        maven { url 'https://maven.aliyun.com/repository/google' }
        maven { url 'https://maven.aliyun.com/repository/jcenter' }
        maven { url 'http://maven.aliyun.com/nexus/content/groups/public' }
    }
    dependencies {
        classpath 'com.android.tools.build:gradle:3.2.1'
    }
}
```

gradle task assembledebug failed with exit code 



flutter clean



Vs Code插件

flutter

dart

### 虚拟机

安装Android Studio后可以单独在vs code内单独运行

热更新

默认需要在终端中输入r到代表reload，可以直接在

绿色条纹：有属性未加

### 去掉debug标记

```node
      debugShowCheckedModeBanner: false,
```

### 快速生成

```node
stlss 	tab
stful   tab
```



### mac os

设置环境变量

打开模拟器

```mac
open -a Simulator
```

在ios真机上运行

使用brew安装工具

```mac
brew install --HEAD usbmuxd
brew link usbmuxd
brew install --HEAD libimobiledevice
brew install ideviceinstaller ios-deploy cocoapods
pod setup
```

设置xcode

即使不使用xcode编辑，ios项目仍然需要通过xcode编译和运行，在xcode上登录apple id

xcode签名时，

如果遇到自动签名错误：

```xcode
Failed to create provisioning profile
No profile for '' were found
Xcode couldn't find any IOS APP Development
```

在xcode-runner-General下修改Bundle Identifier为

```xcode
com.szyh.movieApp
```

## Scaffold页面

Scaffold是一个页面的骨架，提供顶部Appbar，一个抽屉菜单、一个底部导航等

### 顶部Appbar

Appbar有以下属性：

- leading → Widget - 在标题前面显示的一个控件，在首页通常显示应用的 logo；在其他界面通常显示为返回按钮。

- title → Widget - Toolbar 中主要内容，通常显示为当前界面的标题文字。

- actions → List - 一个 Widget 列表，代表 Toolbar 中所显示的菜单，对于常用的菜单，通常使用 IconButton 来表示；对于不常用的菜单通常使用 PopupMenuButton 来显示为三个点，点击后弹出二级菜单。

- bottom → PreferredSizeWidget - 一个 AppBarBottomWidget 对象，通常是 TabBar。用来在 Toolbar 标题下面显示一个 Tab 导航栏。

- elevation → double - 控件的 z 坐标顺序，默认值为 4，对于可滚动的 SliverAppBar，当 SliverAppBar 和内容同级的时候，该值为 0， 当内容滚动 SliverAppBar 变为 Toolbar 的时候，修改 elevation 的值。

- flexibleSpace → Widget - 一个显示在 AppBar 下方的控件，高度和 AppBar 高度一样，可以实现一些特殊的效果，该属性通常在 SliverAppBar 中使用。

- backgroundColor → Color - Appbar 的颜色，默认值为 ThemeData.primaryColor。改值通常和下面的三个属性一起使用。

- brightness → Brightness - Appbar 的亮度，有白色和黑色两种主题，默认值为 ThemeData.primaryColorBrightness。

- iconTheme → IconThemeData - Appbar 上图标的颜色、透明度、和尺寸信息。默认值为 ThemeData.primaryIconTheme。

- textTheme → TextTheme - Appbar 上的文字样式。

- centerTitle → bool - 标题是否居中显示，默认值根据不同的操作系统，显示方式不一样。

- toolbarOpacity → double



```dart
appBar: AppBar(
        title: Text('电影列表'),
        centerTitle: true,
        actions: <Widget>[
          IconButton(
            icon: Icon(Icons.search),
            onPressed: (){},
            )
        ],
      ) ,
```

https://www.jianshu.com/p/77f8b7ee8460

右侧堆叠菜单设置

```dart
SelectView(IconData icon, String text, String id) {
    return new PopupMenuItem<String>(
        value: id,
        child: new Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: <Widget>[
                new Icon(icon, color: Colors.blue),
                new Text(text),
            ],
        )
    );
}.
action: <Widget>{
new PopupMenuButton<String>(
            itemBuilder: (BuildContext context) => <PopupMenuItem<String>>[
                this.SelectView(Icons.message, '发起群聊', 'A'),
                this.SelectView(Icons.group_add, '添加服务', 'B'),
                this.SelectView(Icons.cast_connected, '扫一扫码', 'C'),
            ],
            onSelected: (String action) {
                // 点击选项的时候
                switch (action) {
                    case 'A': break;
                    case 'B': break;
                    case 'C': break;
                }
            },)
         }
```

左侧leading图标设置

自定义左侧leading图标、大小并连接侧边抽屉

```dart
leading: Builder(
          builder: (BuildContext context){
            return IconButton(
                icon: Container(
                  padding: EdgeInsets.all(3.0),
                  child: CircleAvatar(
                      radius: 30.0,
                      backgroundImage: NetworkImage(
                       'https://images.gitee.com/uploads/91/465191_vsdeveloper.png?1530762316'),
                  ),
                ),
              onPressed: () { 
                 Scaffold.of(context).openDrawer();
                //_scaffoldKey.currentState.openDrawer();
               },
            );
          }
          ),

leading: IconButton(
                icon: Container(
                  padding: EdgeInsets.all(3.0),
                  child: CircleAvatar(
                      radius: 30.0,
                      backgroundImage: NetworkImage(
                       'https://images.gitee.com/uploads/91/465191_vsdeveloper.png?1530762316'),
                  ),
                ),
                
              onPressed: () { 
                // Scaffold.of(context).openDrawer();
                _scaffoldKey.currentState.openDrawer();
               },
            ),
```

中间title设置搜索框

默认是文本，可以自定义为搜索框

```dart
Widget buildTextField() {
    return TextField(
      decoration: InputDecoration(
          
          prefixIcon:Icon(Icons.search),
          contentPadding: EdgeInsets.all(10.0),
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(15.0),
//            borderSide: BorderSide(color: Colors.red, width: 3.0, style: BorderStyle.solid)//没什么卵效果
          )),
    );
  }
  
title: Container(
          height:30,
          width: 100,
          child:buildTextField(),
        ),
```

### 顶部、中部tab标签页

```dart
class _ScaffoldRouteState extends State<ScaffoldRoute>
    with SingleTickerProviderStateMixin {
  
  TabController _tabController; //定义一个Controller
  List tabs = ["新闻", "历史", "图片"];
  // 在初始化状态中创建Controller  
  @override
  void initState() {
    super.initState();
    
    _tabController = TabController(length: tabs.length, vsync: this);
  }
  
  @override
  Widget build(BuildContext context){
     return Scaffold(
       appBar: AppBar(
         bottom: TabBar(
            controller: _tabController,
           tabs: tabs.map((e) => Tab(text.e)).toList()
        )
       )
     )
  }
```

提供tabcontroller监听tab栏切换，再使用tabview与tab栏对应

```dart
_tabController.addListener((){
  switch(_tabController.index){
      case 1: ;
      case 2: ;
  }
})
  
Scaffold(
   appBar: AppBar(),
   drawer: Drawer(),
   body: TabBarView(
    controller: _tabController,
    children: tabs.map((e)).toList(),
   )
)
```



### 底部Tab栏与小图标

```dart
bottomNavigationBar: Container(
        decoration: BoxDecoration(
          color:Colors.black
        ),
        height: 55,
        child: TabBar(
          labelStyle: TextStyle(height:0,fontSize: 10),
          tabs: <Widget>[
            Tab(
              icon: Icon(Icons.movie_filter),
              text: '热映',
              ),
            Tab(
            icon: Icon(Icons.movie_creation),
            text: '即将上映',
            ),
            Tab(
            icon: Icon(Icons.local_movies),
            text: '前排',
            ),
          ]
        ),
        ),
```

### 小拓展：浮动底部导航栏



```dart
dependencies:
  curved_navigation_bar: ^0.3.1
```



```dart
import 'package:curved_navigation_bar/curved_navigation_bar.dart';
```



```dart
bottomNavigationBar: CurvedNavigationBar(
    backgroundColor: Colors.blueAccent,
    items: <Widget>[
      Icon(Icons.add, size: 30),
      Icon(Icons.list, size: 30),
      Icon(Icons.compare_arrows, size: 30),
    ],
    onTap: (index) {
      //Handle button tap
    },
  ),

```

https://juejin.im/post/5dc0c52df265da4d5609129e



### 小红点



```flutter
dependencies:
  badges: ^1.1.1
```



```flutter
import 'package:badges/badges.dart';
```



```flutter
Badge(
    badgeContent: Text('3'),
    child: Icon(Icons.settings),
)
```



https://pub.dev/packages/badges

### 侧边抽屉栏

drawer是左抽屉栏，endDrawer是右抽屉栏

```dart
drawer: Drawer(
        child: ListView(
          padding: EdgeInsets.all(0),
          children: <Widget>[
            UserAccountsDrawerHeader(
              accountEmail: Text('1027690173@qq.com'),
              accountName: Text('张三'), 
              currentAccountPicture: CircleAvatar(
                backgroundImage:NetworkImage(
                'https://images.gitee.com/uploads/91/465191_vsdeveloper.png?1530762316'),//头像
              ),
              decoration:BoxDecoration(
                image: DecorationImage(
                  fit:BoxFit.cover,
                  image:NetworkImage(
                'http://www.liulongbin.top:3005/images/bg1.jpg' ))),
              ),//背景图片
              ListTile(title:Text('用户反馈'),trailing: Icon(Icons.feedback),),
              ListTile(title:Text('系统设置'),trailing: Icon(Icons.settings),),
              ListTile(title:Text('我要发布'),trailing: Icon(Icons.send),),
              ListTile(title:Text('注销'),trailing: Icon(Icons.exit_to_app),)

          ],
        ),
      ),
```



## 上下抽屉栏



```dart
dependencies:
  sliding_up_panel: ^1.0.1
```



```dart
import 'package:sliding_up_panel/sliding_up_panel.dart';
```

基本使用

```dart
body:SlidingUpPanel(
        panel: Center(
          child: Text("这里是抽屉区"),
        ),
        body: Center(
          child: Text("这么是页面区"),
        ),
      ),
```

更多属性

| `panel`         | (必需）滑入视图的小部件。当panel折叠且如果collapsed为null时，将显示此Widget的顶部；否则，collapsed将显示在此小部件的顶部。 |
| --------------- | :----------------------------------------------------------- |
| `minHeight`     | 完全折叠时滑动面板的高度。                                   |
| `maxHeight`     | 完全打开时滑动面板的高度。                                   |
| `panelSnapping` | 设置为false可禁用面板快速打开或关闭。                        |
|                 |                                                              |
|                 |                                                              |

## 轮播图

安装包

```dart
dependencies:
  flutter_swiper: ^1.1.6
```

引入包

```dart
import 'package:flutter_swiper/flutter_swiper.dart';
```

示例

```dart
List<String> imgs=[
    'http://www.liulongbin.top:3005/images/bg1.jpg',
    'http://www.liulongbin.top:3005/images/bg1.jpg',
    'http://www.liulongbin.top:3005/images/bg1.jpg',
    'http://www.liulongbin.top:3005/images/bg1.jpg'
     ];
     
 <Widget>[
  Container(
      height:250,
      child:new Swiper(
          itemBuilder: (BuildContext context,int index){
          return new Image.network(imgs[index],fit: BoxFit.cover,);
          },
      itemCount: imgs.length,
      pagination: new SwiperPagination(),//如果不填则不显示指示点
      control: new SwiperControl(),//如果不填则不显示左右按钮
      loop: true,
      autoplay: true,
      ),),
 ]
```

https://pub.dev/packages/carousel_slider



## 网络请求dio库

使用前确保手机或者虚拟机可以访问网络、并且程序具有访问网络的权限

引入第三方包dio

在GitHub上找到最新的版本，在`pubspec.yaml`中引入

```dart
dependencies:
  flutter:
    
  dio: ^3.0.9
```

在文件中引入

```dart
import 'package:dio/dio.dart';

//get方法
getMovieList() async {

    int offset = (page-1)* pagesize ;

    var response = await dio.get('http://www.liulongbin.top:3005/api/v2/movie/${widget.mt}?start=$offset&count=$pagesize');
    
    var result= response.data;

    // print(result);
    
    setState(() {
      mlist = result['subjects'];
      total = result['total'];
    });
  }
```

json序列化

在 Flutter 中，json 序列化是有些特殊的。不同与 JS ，比如使用上述 Dio 网络请求返回，如果配置了返回数据格式为 **json** ，实际上的到会是一个Map。而 Map 的 key-value 使用，在开发过程中并不是很方便，所以你需要对Map 再进行一次转化，转为实际的 Model 实体。

引入插件

```yaml
dependencies:
  # Your other regular dependencies here
  json_annotation: ^0.2.2

dev_dependencies:
  # Your other dev_dependencies here
  build_runner: ^0.7.6
  json_serializable: ^0.3.2
```







## 可扩展伸缩页头





## 手势检测GestureDetector

基本手势定义

点击（一次）：

- onTapDown ：点击屏幕立即触发此方法。
- onTapUp ：手指离开屏幕。
- onTap ：点击屏幕。
- onTapCancel：此次点击事件结束，onTapDown不会在产生点击事件。

双击：

- onDoubleTap ：用户快速连续两次在同一位置点击屏幕。

长按：

- onLongPress ：长时间保持与相同位置的屏幕接触

垂直拖动：

- onVerticalDragStart： 与接触屏幕，可能会开始垂直移动。
- onVerticalDragUpdate：与屏幕接触并垂直移动的指针在垂直方向上移动
- onVerticalDragEnd ：之前与屏幕接触并垂直移动的指针不再与屏幕接触，并且在停止接触屏幕时以特定速度移动

水平拖动：

- onHorizontalDragStart ：与接触屏幕，可能开始水平移动
- onVerticalDragUpdate：与屏幕接触并水平移动的指针在水平方向上移动
- onVerticalDragEnd ：先前与屏幕接触并且水平移动的指针不再与屏幕接触，并且当它停止接触屏幕时以特定速度移动

https://www.jianshu.com/p/90c82f764d01
使用方法：

```node
 Widget build(BuildContext context) {
    return new GestureDetector(
    )
}
```



## 弹出框组件

弹出栏属于弹出组件的一种，主流的app反馈形式有三种，toast、snackbar和dialog。toast弹出一段时间就会消失，提示用户一些不太重要的信息，flutter内部有几种弹出组件

### 底部弹出栏

从底部弹出，`BottomSheet` - 为全屏弹出弹窗，showModalBottomSheet为半屏弹出窗口

```dart
onPressed: (){
                  showModalBottomSheet(
                        context: context,
                        builder: (BuildContext context) {
                          return Column(
                            mainAxisSize: MainAxisSize.min, // 设置最小的弹出
                            children: <Widget>[
                              new ListTile(
                                leading: new Icon(Icons.photo_camera),
                                title: new Text("Camera"),
                                onTap: () async {
                                 },
                                 ),
                              new ListTile(
                                leading: new Icon(Icons.photo_library),
                                title: new Text("Gallery"),
                                onTap: () async {
                                },
                              ),
                            ],
                          );
                        }
                      );
              },
```



### 弹出按钮、下拉按钮

`DropdownButton` - 下拉菜单按钮

`PopupMenuButton` - pop 按钮

### 对话框dialog

flutter要求开发者通过showDialog(context,child)来唤起不同类型的dialog显示，context为上下文参数，child为要显示的对话框，alterdialog、Simpledialog、aboutdialog、bottomSheetdialog等都需要借助showDialog唤起，

Simpledialog只需要传入title和child就可以使用，child为任意widget

Alertdialog是对Simpledialog的封装，新加了action操作，aboutdialog同理

方法：

showDialog：弹出material风格对话框

showCupertinoDialog：弹出IOS风格对话框

showGeneralDialog：弹出自定义对话框

```dart
showDialog(
context:context,
    builder:(context)=>AlertDialog{
        title: Text('dialog'),
        content: Text(('Dialog content..')),
        action: <Widget>[
            new FlatButton(
              child: new Text('取消')，
              onPressed: (){
                  Navigator.of(context).pop();
				},
            ),
            new FlatButton(
              child: new Text('取消')，
              onPressed: (){
                  Navigator.of(context).pop();
				}
            ),
        ]
    }
)
```





### toast

 Flutter 没有内置 Toast，所有的 Toast 方案都是以外置插件的方式导进来使用的，这里多介绍几个

`OKToast` - 最好的 Toast 插件，功能非常完善，推荐使用

```dart
dependencies:
    oktoast: ^2.2.0 
```

引入



`fluttertoast`

安装

```dart
fluttertoast: ^4.0.1
```

引入

```dart
import 'package:fluttertoast/fluttertoast'
```

实例：

```dart
Fluttertoast.showToast(
          msg:"好看";
          toastlength:
          timeInSecForIosWeb:1;
          backgroundColor: Colors.black45,
          textColor: Colors.white,
          fontSize: 16.0
             );
Fluttertoast.cancel()//主动取消提示框
```

https://juejin.im/post/5dc3c22e5188252b10380818#heading-2

## 调用图库及摄像头

安装包

```dart
image_picker: 0.6.4
```

导入

```dart
import 'package:image_picker/image_picker.dart';
```

实例

```dart
void choosePic(source) async {
  // 得到选取的照片
  var image = await ImagePicker.pickImage(source: source);
  // 如果选取的照片为空，则不执行后续人脸检测的业务逻辑
  if (image == null) {
    return;
  }
}

onPressed: () {
    choosePic(ImageSource.camera);
},
onPressed: () {
    choosePic(ImageSource.gallery);
},
```



## 发送通知栏

安装插件

```yaml
dependencies:
  flutter_local_notifications: ^0.4.4+2
```

导入包

```dart
import 'package:flutter_local_notifications/flutter_local_notifications.dart';
```



## 图片与视频

与node包类似，flutter也有类似的包管理工具，官网地址是https://pub.dev/flutter/packages，可以根据功能在上面搜索需要的包

chewie

video-player

video-player实现对视频播放的底层访问，chewie对video-player进行封装，提供友好的控制UI

安装包

```yaml
dependencies:
        chewie: ^0.9.8+1
        video-player: ^0.10.2+5
```

引入包

```dart

```

实例

```dart
class _ChewiewVideoWideget extends State<ChewieVideoWidget> {
    VideoPlayerController _videoPlayerController;
    ChewieController _chewieController;
    final String playUrl;
  
    //初始化
    @override
    void initState() {
        super.initState();
        _videoPlayerController = VideoPlayerController.network(widget.playUrl);
        _chewieController = ChewieController(
            videoPlayerController: _videoPlayerController,
            autoPlay: true,
          //aspectRatio: 3 / 2.0,
          //customControls: CustomControls(),
      );
    }
    
    @override
    void dispose() {
        super.dispose();
      _videoPlayerController.dispose();
      _chewieController.dispose();
    }
    
    @override
    Widget build(BuildContext context) {
      return Container(
        child: Chewie(controller: _chewieController,),
      );
    }
}
```

如果不能播放，需要在AndroidManifest.xml中配置

```xml
<application
        android:name="io.flutter.app.FlutterApplication"
        android:label="flutter_sample"
        android:usesCleartextTraffic="true"
        tools:targetApi="m"
        android:icon="@mipmap/ic">
```



## 读取二维码

bancode

安装包

```flutter
dependencies:
  qrcode_reader: ^0.4.4
```

引入包

```flutter
import 'package:qrcode_reader/qrcode_reader.dart';
```

实例

```flutter
Future<String> futureString = new QRCodeReader()
               .setAutoFocusIntervalInMs(200) // default 5000
               .setForceAutoFocus(true) // default false
               .setTorchEnabled(true) // default false
               .setHandlePermissions(true) // default true
               .setExecuteAfterPermissionGranted(true) // default true
               .scan();
```

## 生成二维码

生成带图片的二维码

安装包

```dart
dependencies:
     qr_flutter: ^3.0.1
```

引入包

```dart
import 'package:qr_flutter/qr_flutter.dart';
```

实例

```dart
Center(
    child: QrImage(
       data:'这是二维码的内容'
        size:200,
        embeddedImage: NetworkImage('https:'),
        embeddedImageStyle: QrEmbeddedImageStyle(
          size: Size(30,30),    
        )
    )
)
```



## 组件

### 各种边框（矩形框、圆角框）

https://blog.csdn.net/zl18603543572/article/details/95641481



### 列表条

ListTile

```dart
ListTile(
    leading: new Icon(Icons.cake),//内侧左侧图标
    title: new Text('标题'),//标题栏
    subtitle: new Row(
        children: <Widget>[
        new Text('副标题'),
        new Icon(Icons.person)
        ],
    ),//副标题栏
    trailing: new Icon(Icons.save),//内侧尾部图标
    onTap: () {
    },//点击事件
),
```



### 进度条

安装包

```dart
dependencies:
  percent_indicator: ^2.1.1+1
```

引入包

```dart
import 'package:percent_indicator/percent_indicator.dart';
```



引用比较简单，不在这里放例程了，官方地址：https://pub.dev/packages/percent_indicator

### 左右滑动带出按钮

安装包

```dart
dependencies:
  flutter_slidable: ^0.5.4
```

引入包

```dart
import 'package:flutter_slidable/flutter_slidable.dart';
```

实例

```dart
ListView(
    children:<Widget>[
        Slidable(
            actionPane: SlidableScrollActionPane(),//滑出选项的面板 动画
            actionExtentRatio: 0.25,
            child: ListTile(
                leading: new Icon(Icons.cake),
                title: new Text('标题'),
                subtitle: Text('data'),
                trailing: new Icon(Icons.save),
             ),
            actions: <Widget>[//左侧按钮列表
                IconSlideAction(
                    caption: 'Archive',
                    color: Colors.blue,
                    icon: Icons.archive,
                    onTap:() {},
                ),
                IconSlideAction(
                    caption: 'Share',
                    color: Colors.indigo,
                    icon: Icons.share,
                    onTap:() {},
                ),
            ],
            secondaryActions: <Widget>[//右侧按钮列表
                IconSlideAction(
                    caption: '更多',
                    color: Colors.black45,
                    icon: Icons.more_horiz,
                    onTap:() {},
                ),
                IconSlideAction(
                    caption: '删除',
                    color: Colors.red,
                    icon: Icons.delete,
                    closeOnTap: false,
                    // onTap: (){_showSnackBar('Delete');},
                    onTap:() {},
                ),
            ],
        )
    ],
)
```



## 常用图标Icon

```node
actions: <Widget>[ 
Icon(Icons.cancel)//取消--叉号
Icon(Icons.save),//保存
icon: Icons.more_horiz,//更多--横向三个点
icon: Icons.archive,//下载、存档
Icon(Icons.share)//分享
Icon(Icons.photo_camera)//照相机
Icon(Icons.photo_library)//图库
icon: Icon(Icons.mail_outline),//邮箱
onPressed: _onClickNotification,
Icon(Icons.menu),//
icon-addr//地址
Icon(Icons.home),//首页
Icons.message, '发起群聊',
Icons.group_add, '添加服务',
Icons.cast_connected, '扫一扫码',
Icon(Icons.feedback)//评论、反馈
Icon(Icons.send)//发送信息
Icon(Icons.exit_to_app)//退出
Icon(Icons.menu)//三条杠--菜单
icon: Icons.delete,//删除
//购物车
  IconButton(
    icon: Icon(Icons.shopping_cart),
    tooltip: 'Open shopping cart',
    onPressed: () {       
      // handle the press   
      },    
  ),   
//设置
  IconButton(      
    icon: Icon(Icons.settings),      
    
    tooltip: 'Open settings',      
    onPressed: () {     
          // handle the press   
    },    
  ), 
//搜索
  IconButton(
    icon: Icon(Icons.search),
    onPressed: (){
    },
  ),
//
],
```



```dart
//Icon属性
Icon(
      Icons.access_alarm,//设置使用哪种图标
      size: 300,//设置图标大小
      color: Colors.yellow,//设置图标颜色
      textDirection:TextDirection.rtl ,//设置用于渲染图标的文本方向
      semanticLabel: "语义标签",//设置用于渲染图标的文本方向
    )
```



## 一键变灰

在main.dart里添加

```dart
  runApp(
    ColorFiltered(
        colorFilter: ColorFilter.mode(Colors.white, BlendMode.color),
        child: FlutterApp())));

```

启动或取消一键变灰需要重启进程



## 设置APP图片和名称 打包发布

修改名称和图标logo

flutter默认会以项目名为app名，flutter图标为app图标，可以修改成自定义。

安卓端

在`/android/app/src/main`目录中的`AndroidManifest.xml` 文件中指定logo文件位置，

```xml
<appication
      android:label="ac_flutter"//应用名
			android:icon="@mipmap/icon_logo">//logo文件
</appication>
```

安卓端logo默认文件在`/res/mipmap-hdpi`中

iOS端

在`/ios/Runner/Info.plist`文件中修改名字

```xml
<key>CFBundleName</key>
<string>flutter_01</string>//名字
```

在content.json中配置logo

logo文件默认位置是`/ios/Runner/Assets.xcassets/AppIcon.appiconset`

对APK进行签名（React Native和Android Studio开发都会有此步骤）

```Android
keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

在`/android`目录下创建`key.properties`的文件，插入代码

```node
storePassword=<password from previous step>
keyPassword=<password from previous step>
keyAlias=key
storeFile=<location of the key store file, e.g. /Users/<user name>/key.jks>
```

在Gradle中配置签名

`/android/app/build.gradle`修改

```node
android {
```

替换为

```node
def keystorePropertiesFile = rootProject.file("key.properties")
def keystoreProperties = new Properties()
keystoreProperties.load(new FileInputStream(keystorePropertiesFile))

android {
```



```node
buildTypes {
    release {
        // TODO: Add your own signing config for the release build.
        // Signing with the debug keys for now, so `flutter run --release` works.
        signingConfig signingConfigs.debug
    }
}
```

为

```dart
signingConfigs {
    release {
        keyAlias keystoreProperties['keyAlias']
        keyPassword keystoreProperties['keyPassword']
        storeFile file(keystoreProperties['storeFile'])
        storePassword keystoreProperties['storePassword']
        }
}
buildTypes {
    release {
        signingConfig signingConfigs.release
    }
}
```





在项目目录下终端运行打包命令

```shell
flutter build apk
```

打包好的apk路径为`/build/app/outputs/apk/app-release.apk`

可以直接将apk安装到手机上，运行命令：

```flutter
flutter install
```

