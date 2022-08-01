---
title: flutter移动开发（三）
date: 2020-08-28 21:40:33
categories: 技术博客
tags:
    - IT,Web，Flutter
toc: true
thumbnail: http://cdn.kunkunzhang.top/flutter.jpeg
---

## 概述

​     跨平台移动开发工具。

​    看了一些大佬的博客，我也试图收录一些对flutter 的语法、跨平台属性进行深入探索与总结

<!--more-->

## 基础组件

### 图片

```dart
Image.asset(name);//从资源中获取图片
Image.file(file);//从文件中获取图片
Image.memory(bytes);//从内存中获取图片
Image.network(src);//从网络中获取图片
```

### 文本输入框

TextField有很多属性

decoration属性介绍:
border：增加一个边框，
hintText：未输入文字时，输入框中的提示文字，
prefixIcon：输入框内侧左面的控件，
labelText：一个提示文字。输入框获取焦点/输入框有内容 会移动到左上角，否则在输入框内，labelTex的位置.
suffixIcon: 输入框内侧右面的图标.
icon : 输入框左侧添加个图标

监听文本变化

监听文本变化有两种方式，一种是设置onChange回调，一种是controller监听，onChange专用于监听文本变化，controller还可以使用默认值，选择文本等，通常使用第二种

```dart
TextEditingController _selectionController = TextEdittingController()//创建controller
//创建监听
@override 
void initState() {
    _selectionController.addlistener(){
        print(_selectionController.text);
    }
}
//设置默认值，并选中字符
_selectionController.text="helloworld";
_selectionController.selection = TextSelection(
    baseOffset: 2,
    extentOffset: _selectionController.text.length;//动态获取前两个字符之后的长度
)
//设置controller
TextField(
    controller: _selectionController,
)
```

控制焦点

https://blog.csdn.net/u011272795/article/details/82528432?depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromBaidu-1&utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromBaidu-1

### 文本显示

Text用于显示简单文本，具有文本样式控制属性

textAlign：文本的对齐方式，可以选择居中、左侧或者右侧

maxlines、overflow：指定文本显示的最大行数。如果有多余的文本，可以通过overflow指定截断方式。

textScaleFactor：代表文本相对于当前字体的缩放因子。相当于调整样式的字体大小属性,但是是根据系统字体大小全局调整而不是指定某段字体具体大小

```dart
Text("helloworld"*6//字符串重复6次
     textAlign: TextAlign.center,//居中
     maxLines: 1,//最大行数一行
     overflow: TextOverflow.ellipsis,//多余的文本以省略号显示
     textScaleFactor: 1.5,//默认为1
  )；
```

Textstyle用于指定文本显示的样式如颜色、字体、粗细、背景等

```dart
Text("helloworld"
    style: TextStyle(
      color: Colors.blue,//颜色
      fontSize: 18.0,//大小
      height: 1.2,  //行高
      fontFamily: "Courier",//字体
      background: new Paint()..color=Colors.yellow,//背景颜色
      decoration:TextDecoration.underline,//下划线
      decorationStyle: TextDecorationStyle.dashed
    ),
  );
```

Textspan对一个text中的字体进行不同样式的显示

### 各种按钮

在 Flutter 里有很多的 Button，包括了：MaterialButton、RaisedButton、FloatingActionButton、FlatButton、IconButton、ButtonBar、DropdownButton 等。

**MaterialButton** 是一个 Materia 风格的按钮。

**RaisedButton** 与 **MaterialButton** 类似

**OutlineButton**是一个有默认边线且背景透明的按钮，也就是说我们设置其边线和颜色是无效的，其他属性跟MaterialButton中属性基本一致

**FlatButton** 与 **MaterialButton** 类似，不同的是它是透明背景的。如果一个 Container 想要点击事件时，可以使用 FlatButton 包裹，而不是 MaterialButton。因为 MaterialButton 默认带背景，而 FlatButton 默认不带背景。

**IconButton** 顾名思义就是 Icon + Button 的复合体，当某个 Icon 需要点击事件时，使用 IconButton 最好不过。

**FloatingActionButton** 是一个浮动在页面右下角的浮动按钮。

**ButtonBar** 是一个布局组件，可以让 Button 排列在一行。

**DropdownButton ** 是下拉菜单按钮

https://www.jianshu.com/p/2f887cadd527

按钮button样式实例

```dart
//基本样式 
RaisedButton(
      onPressed: _log,//点击回调事件
      child: Text("浮动按钮"),//按钮显示的文本
      color: Colors.red,//按钮的主颜色
      textColor: Colors.white,//按钮文本的颜色
      splashColor: Colors.black,//点击按钮时水波纹的颜色
      highlightColor: Colors.green,//长按按钮后显示的颜色
      elevation: 30,//按钮下显示的阴影，一般设置小一点
      shape: BeveledRectangleBorder(//边框形状，带斜角的长方形边框
         side: BorderSide(
        color: Colors.white,
      ),
      borderRadius: BorderRadius.all(Radius.circular(10))
      ),
    );
//其他边框形状
shape: CircleBorder(//圆形边框
        side: BorderSide(
          color: Colors.white,
        ),
      ),
shape: RoundedRectangleBorder(//圆角矩形边框
        borderRadius: BorderRadius.all(Radius.circular(10)),
      ),
shape: StadiumBorder(),//两边是半圆的边框
```

浮动按钮组

```dart
floatingActionButton: ButtonBar(
          // alignment 属性用来指定子元素如何在横轴上进行排列
          // MainAxisAlignment.spaceAround 表示分散对齐,浮动按钮默认是靠右侧堆叠
          alignment: MainAxisAlignment.spaceAround,
          // 子元素
          children: <Widget>[
                // 第一个浮动按钮
                FloatingActionButton(
                  onPressed: () {
                    choosePic(ImageSource.camera);
                  },
                  tooltip: 'takephoto',
                  child: Icon(Icons.photo_camera),
                ),
                // 第二个浮动按钮
                FloatingActionButton(
                  onPressed: () {
                    choosePic(ImageSource.gallery);
                  },
                  tooltip: 'takepicture',
                  child: Icon(Icons.photo_library),
                )
           ],
        )
```

#### 折叠浮动按钮

安装包

```yaml
dependencies:
  flutter_speed_dial: ^1.2.4
```

引入包

```dart
import 'package:flutter_speed_dial/flutter_speed_dial.dart';
```

实例

```node

```



## 布局

### 简单布局



### 线性布局Row、Column

线性布局是指水平方向和垂直方向。

线性布局有主轴和纵轴之分。水平方向布局中，主轴为水平方向，纵轴为垂直方向

垂直方向布局中，主轴为垂直方向，纵轴为水平方向。

Row在水平方向排列其子组件widget，Column在垂直方向排列其子组件widget

具体方法

textDirection：水平方向子组件的布局顺序。默认为中文、英文从左向右，阿拉伯语从右向左。指定赋值时，.ltr表示从左向右，.rtl表示从右向左

verticalDirection: Row自身在纵轴的对齐方式，默认为.down为从上到下

maxnAxisSize: 表示Row在水平方向的占用空间。max为尽可能多的占用水平空间，此时Row的宽度始终等于水平方向最大宽度，min为尽可能少的占用水平空间，此时Row的宽度为所有子组件占用的水平空间。

mainAxisAlignment：子组件在主轴上的对齐方式。Row中为水平方向，Column中为垂直方向 。值有.start 表示从textDirection指定的方向首端.center 居中对齐 .end 表示从textDirection指定的方向尾端，.spacebetween

crossAxisAlignment: 子组件在纵轴上的对齐方式。Row中为垂直方向，Column中为水平方向。值有.start 表示从verticalDirection指定的方向首端.center 居中对齐.end 表示从verticalDirection指定的方向尾端, .spacebetween

crossAxisAlignment: 子组件在纵轴上的对齐方式。Row中为垂直方向，Column中为水平方向

children: 子组件

实例

```dart

```



### 弹性布局Flex

Expanded可以按比例扩伸Row、Column。



### 边距Padding

Padding为子节点控制边距，通常使用Padding中的EdgeInsets类，其中定义了一些设置边距的便捷方法

EdgeInsets中的方法：

- fromLTRB{double left, double top, double right, double bottom} 分别指定四个方向的填充

- all(double value)：设置所有方向，相同数值填充
- only({left, top, right, bottom}): 设置具体某个方向的边距，也可以设置两个或三个
- symmetric({ vertical, horizontal }): 用于设置对称方向的边距，vertical指top和bottom，horizontal指left和right

实例

```dart
class PaddingTest extends statelessWidget {
    @override
    Widget build(BuildContext context) {
        return Padding(
            //上下左右添加相同16像素边距
            padding: EdgeInsets.all(16.0),
            child: Column(
                children: <Widget> [
                    Padding(
                        //左侧添加8像素边距
                        padding: const EdgeInsets.only(left: 8.0),
                        child: Text("Helloworld"),
                    ),
                    Padding(
                        //上下对称添加8像素边距
                        padding: const EdgeInsets.symmetric(vertical: 8.0),
                        child: Text("Helloworld"),
                    ),
                    Padding(
                        //指定四个方向的边距
                        padding: const EdgeInsets.fromLTRB(20.0,0,20.0,8.0),
                        child: Text("Helloworld"),
                    ),
                ],
            ),
        );
    }
}
```

### 样式装饰器DecoratedBox

装饰器可以向子组件添加一些特殊样式，如背景、边框，渐变等。使用时一般使用子类BoxDecoration，实现常用元素的装饰绘制

具体

color、//颜色 image//图片、border//边框，borderRadius//圆角，

boxShadow//阴影，gradient//渐变、 boxshape//形状、backgroundBlendMode//背景混合模式

实例

```dart
Container(
   decoration: BoxDecoration(
        gradient: LinearGradient(colors:[Colors.red,Colors.orange[700]]),//背景渐变
        borderRadius: BorderRadius: circular(3.0),//3像素圆角
        boxShadow: [//阴影
            BoxShadow(
                color:Colors.black54,
                offset: Offset(2.0,2.0),
                blurRadius: 4.0,
            )
    	]
       child: Text("login",style: TextStyle(color: Colors.white),),
   )
)
```

### 对齐



### 堆叠布局

return stack



## 滚动组件

### Listview

参数：

physics: 此对象接受一个ScrollPhysics类型的对象，用以滚动组件如何响应用户操作，比如抬起手指之后继续执行动画，滑动到底部时如何显示。默认情况下flutter会根据平台显示不同效果。

shrinkWrap：是否根据子组件的总长度设置Listview的长度，默认为false，也就是默认情况下Liseview会尽可能地占用较多空间

controller：此对象接受一个ScrollController对象，控制滚动位置和监听滚动事件。ScrollController常用属性和方法：

offset：可滚动组件当前的滚动位置

jupmTo(double offset)、animateTo(double offset)：这两个方法用于跳转到指定位置，后者会执行一个动画而前者不会

reverse: 是否与滑动方向相反，默认为false

itemExtent：滚动为垂直方向时为子组件的高度，滚动为水平方向时为子组件的宽度

列表项不多时使用ListView，用构造函数中的children参数

```dart
ListView(
   shrinkWrap: true,
   padding: const EdgeInsets.all(20.0),
   children:<Widget>[
       const Text('i am'),
       const Text('i am'),
       const Text('i am'),
       const Text('i am'),
   ],
);
```

ListView.builder方法适用于列表项比较多的情况，该方法创建子组件时只有子组件真正显示时才会被创建，也就是基于Sliver的懒加载模型

参数:

itemCount:指定列表项的数目，null为无限

itemBuilder：列表项构造器

ListView.seperated方法可以在生成的列表之间添加一个分割组件，它比Listview.builder多了一个separatorbuilder的参数，该参数可以生成一个分割组件生成器。

```dart
//创建一个奇数行蓝色下划线，偶数行绿色下划线的列表
class ListView extends StatelessWidget {
    @override
    Widget build(BuildContext context){
      Widget divide1= Divider(color: Colors.blue,);
      Widget divide2= Divider(color: Colors.green,);
      return ListView.separated(
        itemCount: 100,
        itemBuilder: (BuildContext context,int index){
            return ListTile(title: Text("$index"));
        },
        separatorBuilder: (BuildContext context,int index){
           return index$2==0?divider1:divider2;    
        },
      );
    }
}
```

### Gridview

Gridview可以构造二维网格列表

主要参数：

crossAxisCount：横轴子元素的数量

mainAxisSpacing：主轴方向的间距

crossAxisSpacing：横轴方向子元素的间距

childAspectRatio：子元素在横轴长度和主轴长度的比例。一般由crossAxisCount指定子元素的横轴长度，再通过此参数确定子元素的主轴长度

Gridview.count 创建横轴固定数量子元素的gridview，内部包含SliverGridDelegateWithFixedCrossAxisCount类

```dart
GridView.extent(
    crossAxisCount: 3,//子元素数量为3
    childAspectRatio: 1.0,//宽高比为2
    children: <Widget>[
        Icons(Icons.ac_unit),
        Icons(Icons.airport_shuttle),
        Icons(Icons.all_inclusive),
        Icons(Icons.beach_access),
        Icons(Icons.cake),
        Icons(Icons.free_breakfast),
    ],
);
```

Gridview.extent 创建纵轴子元素为固定长度的gridview，内部包含SliverGridDelegateWithMaxCrossAxisExtent类，

```dart
GridView.extent(
    maxCrossAxisExtent: 120.0,//子元素在横轴上的最大长度
    childAspectRatio: 2.0,//宽高比为2
    children: <Widget>[
        Icons(Icons.ac_unit),
        Icons(Icons.airport_shuttle),
        Icons(Icons.all_inclusive),
        Icons(Icons.beach_access),
        Icons(Icons.cake),
        Icons(Icons.free_breakfast),
    ],
);
```

Gridview.builder 当子组件较多时通过Gridview.builder动态创建子widget，使用ItemBuilder创建子widget

### CustomScrollView

当一个页面同时使用gridview和listview时，由于两个组件相互独立，不能保证他们滚动效果一致，因此需要一个粘合剂使他们成为一体，使用CustomScrollView

```dart
return Material(
      child: CustomScrollView(
        slivers: <Widget>[
          //AppBar，包含一个导航栏
          SliverAppBar(
            pinned: true,
            expandedHeight: 250.0,
            flexibleSpace: FlexibleSpaceBar(
              title: const Text('Demo'),
              background: Image.asset(
                "./images/avatar.png", fit: BoxFit.cover,),
            ),
          ),
          SliverPadding(
            padding: const EdgeInsets.all(8.0),
            sliver: new SliverGrid( //Grid
              gridDelegate: new SliverGridDelegateWithFixedCrossAxisCount(
                crossAxisCount: 2, //Grid按两列显示
                mainAxisSpacing: 10.0,
                crossAxisSpacing: 10.0,
                childAspectRatio: 4.0,
              ),
              delegate: new SliverChildBuilderDelegate(
                    (BuildContext context, int index) {
                  //创建子widget      
                  return new Container(
                    alignment: Alignment.center,
                    color: Colors.cyan[100 * (index % 9)],
                    child: new Text('grid item $index'),
                  );
                },
                childCount: 20,
              ),
            ),
          ),
          new SliverFixedExtentList(
            itemExtent: 50.0,
            delegate: new SliverChildBuilderDelegate(
                    (BuildContext context, int index) {
                  //创建列表项      
                  return new Container(
                    alignment: Alignment.center,
                    color: Colors.lightBlue[100 * (index % 9)],
                    child: new Text('list item $index'),
                  );
                },
                childCount: 50 //50个列表项
            ),
          ),
        ],
```

### 上拉刷新下拉加载

安装包

```yaml
 dependencies:
     pull_to_refresh: ^1.6.0
```

引入包

```dart
import 'package:pull_to_refresh/pull_to_refresh.dart';
```

实例

```dart
RefreshController _refreshController =
      RefreshController(initialRefresh: false);

  void _onRefresh() async{
    // monitor network fetch
    await Future.delayed(Duration(milliseconds: 1000));
    // if failed,use refreshFailed()
    _refreshController.refreshCompleted();
  }

  void _onLoading() async{
    // monitor network fetch
    await Future.delayed(Duration(milliseconds: 1000));
    // if failed,use loadFailed(),if no data return,use LoadNodata()
    items.add((items.length+1).toString());
    if(mounted)
    setState(() {

    });
    _refreshController.loadComplete();
  }
@override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SmartRefresher(
        enablePullDown: true,
        enablePullUp: true,
        header: WaterDropHeader(),
        footer: CustomFooter(
          builder: (BuildContext context,LoadStatus mode){
            Widget body ;
            if(mode==LoadStatus.idle){
              body =  Text("上拉加载");
            }
            else if(mode==LoadStatus.loading){
              body =  CupertinoActivityIndicator();
            }
            else if(mode == LoadStatus.failed){
              body = Text("加载失败！点击重试！");
            }
            else if(mode == LoadStatus.canLoading){
               body = Text("松手,加载更多!");
            }
            else{
              body = Text("没有更多数据了!");
            }
            return Container(
              height: 55.0,
              child: Center(child:body),
            );
          },
        ),
  			controller: _refreshController,
        onRefresh: _onRefresh,
        onLoading: _onLoading,
        child: ListView.builder(
          itemBuilder: (c, i) => Card(child: Center(child: Text(items[i]))),
          itemExtent: 100.0,
          itemCount: items.length,
        ),
      ),
    );
  }
```

可以自定义上拉或下拉刷新加载样式，

下拉样式 RefreshStyle.Follow，RefreshStyle.UnFollow，RefreshStyle.Front，RefreshStyle.Behind

上拉样式 LoadStyle.ShowAlways，LoadStyle.HideAlways，LoadStyle.ShowWhenLoading

全局配置RefreshConfiguration用于配置子树下的所有智能刷新器表示形式，通常存储在MaterialApp的根目录下，其用法与ScrollConfiguration类似. 

```dart
// 全局配置子树下的SmartRefresher,下面列举几个特别重要的属性
     RefreshConfiguration(
         // 如果每个页面的头部指示器都一样的话,可以设置默认头部指示器
         headerBuilder: () => WaterDropHeader(),
         // 配置默认底部指示器
         footerBuilder:  () => ClassicFooter(),
         headerTriggerDistance: 80.0,        // 头部触发刷新的越界距离
         // 自定义回弹动画,三个属性值意义请查询flutter api
         springDescription:SpringDescription(stiffness: 170, damping: 16, mass: 1.9),   
         maxOverScrollExtent :100, //头部最大可以拖动的范围,如果发生冲出视图范围区域,请设置这个属性
         maxUnderScrollExtent:0, // 底部最大可以拖动的范围
         //这个属性不兼容PageView和TabBarView,如果你特别需要TabBarView左右滑动,你需要把它设置为true
         enableScrollWhenRefreshCompleted: true, 
         enableLoadingWhenFailed : true, //在加载失败的状态下,用户仍然可以通过手势上拉来触发加载更多
         hideFooterWhenNotFull: false, // Viewport不满一屏时,禁用上拉加载更多功能
         enableBallisticLoad: true, // 可以通过惯性滑动触发加载更多
        child: MaterialApp(
            ........
        )
    );
```

国际化，根据App语言显示下拉文字为中文或英文

```dart
MaterialApp(
            localizationsDelegates: [
              // 这行是关键
              RefreshLocalizations.delegate,
              GlobalWidgetsLocalizations.delegate,
              GlobalMaterialLocalizations.delegate
            ],
            supportedLocales: [
              const Locale('en'),
              const Locale('zh'),
            ],
            localeResolutionCallback:
                (Locale locale, Iterable<Locale> supportedLocales) {
              //print("change language");
              return locale;
            },
    )
```
