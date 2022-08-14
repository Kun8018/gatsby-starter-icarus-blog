---
title: React Native入门
date: 2020-04-02 21:40:33
categories: IT
tags:
    - IT，RN，
toc: true
thumbnail: https://s1.ax1x.com/2020/03/27/G9OXNR.png
---

## 概述

　　React Native是目前移动端跨平台开发的选择之一，另一种是Flutter，目前安卓平台还是以Android原生开发和java为主，IOS端以Object-c和Swift为主，ReactNative作为一种新的跨平台开发方式，目前可使用的包还不多，但是我认为对于个人开发者还是比较方便的，所以这里把我实现的方式（因为真的很烦）

<!--more-->

## 最重要的事

   一定要翻墙 !一定要翻墙!一定要翻墙！

  因为配置的工具比较多，各软件版本一定要对！各软件版本一定要对！各软件版本一定要对！

重要的事情说三遍！重要的事情说三遍！重要的事情说三遍！（所以这句话为什么要说三遍？因为很重要！因为很重要！因为很重要！（禁止套娃））

不然你就会像我一样，装了删，删了重装，关键你还不知道到底是五个工具哪个有问题（往事不要再提)

## 开始安装

### Node





### Python 2.7

python是免费的

### Java JDK 1.8

https://www.oracle.com/java/technologies/javase-jdk8-downloads.html

### Android Studio 最新版





### 配置环境变量



### Android Studio SDK配置



### ReactNative命令行



```node
npm install -g react-native-cli
```



测试连接设备

```node
adb devices
```



### 启动



```node
react-native init  [文件名]
cd [文件名]
npx react-native run-android
```



## 第二种安装方式

（如果你看到这里了，无论你看到上面多么复杂，难受，可以忽略了）

目前官方推荐使用第二种

使用Expo方式安装和使用





```node
npm install -g create-react-native-app
```

创建项目

```node
create-react-native-app appName
cd appName
```

启动项目

```node
npm start
```

启动项目后会生成二维码

手机端下载安装App，打开App扫描二维码,等待加载完成，即可热刷新

注意：

- Expo App只能在Google Play中下载，国内的应用商店没有，可以在下方链接下载安装

- 手机和电脑应处于同一WIFI环境下，不需要额外连线

## 导航器

使用官方



```node
npm install @react-navigation/native
```



### 底部导航栏

导入包

```yarn
yarn add @react-navigation/bottom-tabs
```



### 顶部信息



### 栈内导航



```yarn
yarn add @react-navigation/stack
```



```node
<Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerTitle: '首页',
          headerLeft: () => (
            <Button
              onPress={() => alert('This is a button!')}
              title="我"
              color="#f56f"
            />
          ),
          headerRight: () => (
            <Button
              onPress={() => alert('This is a button!')}
              title="I扫一扫"
              color="#35ff"
            />
          ),
        }}
        />
```





导入部分加入

```

```



程序主部分



### 侧边栏

安装包

```yarn
yarn add @react-navigation/drawer
```

导入包

```reactnative
import {
  createDrawerNavigator, //创建侧边栏必备
  DrawerContentScrollView, //创建内容
  DrawerItemList,  //创建项目条
} from '@react-navigation/drawer';
```



## 内容

### 获取网络数据

三种方法：fetch、 axios、async await

这里用axios

安装包



### Scrollview（滚动视图）





### 轮播图

安装包

```node
npm i react-native-swiper –save 
```

导入包

```reactnative
import Swiper from ‘react-native-swiper’;
```

github源地址

https://github.com/leecade/react-native-swiper



```node
<View style={styles.swiper}>
                    <Swiper  showsButtons={true} autoplay={true}>//设置自动轮播、轮播按钮
                        <View style={styles.slide1} >
                        <Text style={styles.text}>Hello Swiper</Text>
                        {/* <Image source={{ uri:'http://q6mb9zdoi.bkt.clouddn.com/linux.jpg' }}></Image> */}
                        </View>
                        <View style={styles.slide2}>
                        <Text style={styles.text}>Beautiful</Text>
                        </View>
                        <View style={styles.slide3}>
                        <Text style={styles.text}>And simple</Text>
                        </View>
                    </Swiper>

            </View>
```



### 九宫格





### 摄像头模块

安装包

```yarn
yarn add react-native-image-picker
```

导入包

```node
import ImagePicker from 'react-native-image-picker';
```

使用

Git hub源地址：https://github.com/react-native-community/react-native-image-picker



### 滚轮



https://github.com/lesliesam/react-native-wheel-picker



### 定时器

安装包

```node
npm i react-timer-mixin --save
```













## 打包Apk

### Expo

```node
npm install -g exp 
exp login   （此处需要在expo官网注册账号，然后登录）

配置app.json
{
   "expo": {
    "name": "Your App Name",
    "icon": "./path/to/your/app-icon.png",
    "version": "1.0.0",
    "slug": "your-app-slug", 
    "sdkVersion": "XX.0.0",
    "ios": {
      "bundleIdentifier": "com.yourcompany.yourappname"
    },
    "android": {
      "package": "com.yourcompany.yourappname"
    }
   }
 }
exp build:android 
```

### Reactnative 原生项目打包

原生打包有两种方式，一是React Native内打包，二是Android Studio打包，这里采用React Native打包，Android Studio打包以后更新（我看了好几篇博客，听说AS打包很慢，而且会常常出错。

1.生成Android签名证书

进入JDK/bin目录，在目录下打开cmd窗口执行命令：

```node
keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

执行后设置密钥库密码以及发布信息，记住密码，my-release-key是生成apk的名字。

密钥库里应该已经生成了一个单独的密钥，有效期为`10000`天

2.设置Gradle变量

在`/android/gradle.properties`文件末尾加入代码

```node
MYAPP_RELEASE_STORE_FILE=your keystore filename   
MYAPP_RELEASE_KEY_ALIAS=your keystore alias  
MYAPP_RELEASE_STORE_PASSWORD=*****    
MYAPP_RELEASE_KEY_PASSWORD=*****  
```

等号右边的部分用自己的项目替换

3.修改Gradle配置文件

在`/android/app/build.gradle`下添加以下代码



4.签名打包APK

在项目的`android`目录下启动终端，运行命令

`./gradlew assembleRelease`

自动进行打包

5.将APK发送到手机上执行

打包成功的APK文件默认安装在`/[项目名]/android/app/build/outputs/apk/`下，后缀为.apk,

打包博客链接

https://www.jianshu.com/p/1380d4c8b596



https://blog.csdn.net/carry_qi/article/details/87917387?depth_1-utm_source=distribute.pc_relevant.none-task&utm_source=distribute.pc_relevant.none-task







