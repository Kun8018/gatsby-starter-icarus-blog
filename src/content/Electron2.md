---
title: Electron开发(二)
date: 2020-06-15 21:40:33
categories: IT
tags:
    - IT，App,Node,Electron
toc: true
thumbnail: https://cdn.kunkunzhang.top/tauri.png
---

　　目前看来Electron 的开发并没有想像的那么简单，简单尝试一下之后目前先搁置了，等有空再来。

<!--more-->

## Electron优化



### 静态资源缓存

对于网络资源，我们采取了一些缓存手段，保证它们展示的速度。可以采用service-worker+workbox的方式，实现跨页面静态资源缓存



### 窗口预热、窗口常驻与窗口池

用户在登录页面后就会在后台预热，将该加载的资源都准备好，在登录成功后就立即渲染显示，窗口打开的延时很短，基本接近原生的窗口体验

对于频繁开启/关闭的窗口，使用窗口池来优化，比如webview页面，打开一个webview时会优先从窗口池中选取，当窗口池为空时才创建新的窗口。后面页面关闭会再放回窗口池中，方便复用

对于业务无关的、通用的窗口，可以采用常驻模式，例如通知、照片查看器，这些窗口一旦被创建就不会释放，打开效果会更好



### 预加载机制





### 减少主进程负荷

Electron的主进程非常重要，它是所有窗口的父窗口，负责调度各种资源，如果主进程堵塞，将影响整个应用的响应性能

所以不要让主进程干脏活累活，能在渲染进程做的就在渲染进程做。分离CPU密集型人物和同步I/O到单独进程或者worker，避免阻塞UI



### 优化进程通信

不要滥用remote

remote提供了一种简便的、无侵入的形式来访问主进程中的API和数据，其底层基于同步的IPC

remote是同步的，且属性是动态获取，remote底层是不会进行缓存，而是每次获取一个属性就动态到主进程中取

所以尽量避免使用remote



## Node扩展能力

在很多情况下，你的应用程序要和外部设备进行交互，一般情况下厂商会为你提供硬件设备的开发包，这些开发包基本上都是通过`C++` 编写，在使用`electron`开发的情况下，并不具备直接调用`C++`代码的能力，我们可以利用`node-ffi`来实现这一功能。

`node-ffi`提供了一组强大的工具，用于在`Node.js`环境中使用纯`JavaScript`调用动态链接库接口。它可以用来为库构建接口绑定，而不需要使用任何`C++`代码。

注意`node-ffi`并不能直接调用`C++`代码，你需要将`C++`代码编译为动态链接库：在 `Windows`下是 `Dll` ，在 `Mac OS `下是 `dylib` `，Linux` 是 `so` 。

`node-ffi` 加载 `Library`是有限制的，只能处理 `C`风格的 `Library`。

```javascript
const ffi = require('ffi');
const ref = require('ref');
const SHORT_CODE = ref.refType('short');


const DLL = new ffi.Library('test.dll', {
    Test_CPP_Method: ['int', ['string',SHORT_CODE]], 
  })

testCppMethod(str: String, num: number): void {
  try {
    const result: any = DLL.Test_CPP_Method(str, num);
    return result;
  } catch (error) {
    console.log('调用失败～',error);
  }
}

this.testCppMethod('ConardLi',123);
```



## js-brige

一套代码既能跑在浏览器端，又能跑在electron 端，

与NW.js相比，Electron 作为 NW.js 的继任者，最大的改动就是将 NW.js 的融合环境（以 HTML 为入口，同时支持前端和 Node 技术的环境）一分为二，变成了一个**纯 Node.js 的主进程（Main process）\**加上\**一系列默认关闭 Node 支持的前端渲染进程（Renderer process）**。

如果从 NW.js 和 Electron 同源于 Chromium 的角度来看，NW.js 相当于一个嵌入了 Node.js 支持的单窗口浏览器，每开一个进程就相当于打开了一个新的**浏览器窗口**；而 Electron 则相当于一个支持**多标签页**的浏览器，主进程是那个独立于所有标签页之外的那个「看不见的」框架层，渲染进程则相当于在这个浏览器中打开的一个个「看得见的」**Tab**。

**Nodejs与前端代码相互侵入**

虽然官方允许你直接在前端业务代码中直接使用 Electron 甚至直接引用 Node.js 依赖，但这种方式却对业务无意间侵入了前端业务代码。当项目加载远端业务页面以及业务代码由其他项目打包工具生成的情况下，你可能无法对前端业务代码做修改。如果引入 Native 与 HTML 页面的 Bridge 通信模式

同时，前端代码也可能使用electron代码。Electron 提供了 [ipcMain](https://www.electronjs.org/docs/api/ipc-main) 与 ipcRenderer 模块用以主进程与渲染进程之间的通信，前端页面可能通过调用子进程的方式获取数据。

如果想在你的前端页面使用这种通信方式，那么你需要在 webview 中配置 `<webview src="http://www.google.com/" nodeintegration></webview>` 或者在 BrowserWindow 实例中的 webPreferences 属性里配置 `nodeIntegration: true`。这虽然能够解决进程间的通信问题，但也将 Node.js 环境引入了前端业务页面。

解决办法

需要在代码中先判断环境，再分别写对应的逻辑。每次写到electron环境下的逻辑，又要区分渲染进程和主进程，因为有些事只能渲染进程做，有些事只能主进程做。所以，我希望能将这些抽象出来，某个方法，只能在electron环境下被调用，并且不需要关心在什么进程下，web只要判断环境，调不同的方法就行，不需要关心和electron的交互。

另外，这样做也能快速的开启另一个electron的项目，我希望我web里的代码能轻易的获取到electron的能力，而不是重新开始编写，这个时候，我希望有一层对electron能力的封装

团队内有些成员对web很熟悉，但是对electron不是很了解，如果加入项目，就需要去学习electron的知识，这个时候，如果能有一个库列出了所有electron能做的事，你只需要调用，无需关心它是怎么实现的，能很大程度提高开发效率。

目标

1.给web注入适当的环境变量，让web知道自己的环境

2.给web注入一个对象，包含所有electron能做的事（包括主进程、渲染进程）

**给web注入环境变量**

在load web页面的时候，有个webPreferences配置，我们在这里预加载一个js文件，就是electron-bridge.js。这个文件拥有node的能力，并且它是属于渲染进程的，所以它能做渲染进程里的事, 也能跟主进程通讯。

在主进程中使用BrowserWindow时，添加WebPreferences

```javascript
// main.js
const mainViwndo = new BrowserWindow({
    webPreferences: {
        webSecurity: false,
        nodeIntegration: true,
        preload: path.join(__dirname, 'preload.js'),
    },
})
```

当我们启动electron的时候，主进程开始通知这个渲染进程，给渲染进程注入主进程的环境变量，再有渲染进程挂载到window对象上，这样web就能获取自己的环境信息

然后在preload.js里面

```javascript
//preload.js
window._ipcRenderer = require('electron').ipcRenderer;
window._remote = require('electron').remote;
window._platform = process.platform;
const {ipcRenderer} = require('electron');
 
//监听主进程，设置环境变量
ipcRenderer.on('set-env', (event, msg) => {
  for (const key in msg) {
    window[key] = msg[key];
  }
});
```

在main.js中获取创建好的环境变量并发送信息

```javascript

//main.js
const {BrowserWindow, ipcMain} = require('electron');
 
const win = new BrowserWindow({...});
 
//获取创建好的window对象发送消息
win.webContents.on('did-finish-load', function() {
  win.webContents.send('set-env', { //设置web环境变量
    __ELECTRON__: true,
    __DEV__: true,
    __PRO__: false,
    __SERVER__: false,
    windowLoaded: true
  });
})
```

在web端就可以调用bridge.js暴露出来的事件，实现electron代码(业务代码)和前端代码分开

```javascript
// ../web/index.js
 
$btn1.addEventListener('click', function() {
  if (__ELECTRON__ && ElectronBridge) { //electron 环境
    ElectronBridge.setFullScreen((err) => {
      if (err) return;
      console.log('done');
    });
  } else { //web 环境
    alert('不能设置全屏')
    //do something else
  }
})
```

bridge.js能自己处理渲染进程的事件，也能通过调用主进程事件处理主进程才能完成的事件

```javascript
//处理渲染进程事件
//bridge.js
const {webFrame} = require('electron');
//设置缩放比，只能在渲染进程中实现
function setZoomFactor(params, cb) {
  webFrame.setZoomFactor(params);
  cb && cb();
}
 
window.ElectronBridge = {
  setZoomFactor
};
```

调用主进程事件：

我们通过ipcRender给主进程发送一系列消息，包括做什么事情(eventName), 根据哪些参数（params），对外根据不同的事件暴露不同的方法，接受参数，和回调函数。

- 先将回调函数放在 eventsMap上暂存起来，因为ipcRender不能发送函数，所有的信息会被序列化后再发送给主进程，所以，我们先生成一个时间戳，让 eventsMap[时间戳] = cb 并把时间戳一同发送过去，等一会儿，主进程通知渲染进程调用哪个时间戳函数
- 通过'resist-event'频道, 发送参数，包括 eventName、params、timeStamp

```javascript
//bridge.js
const {ipcRenderer} = require('electron');
 
const eventsMap = {};
 
//调用原生事件
function registEvent(eventName, params, cb) {
  //允许只传两个数据
  if (!cb) {
    cb = params;
    params = {};
  }
 
  //如果win还未ready
  if (!windowLoaded) {
    cb(new Error('window not ready'));
    return;
  }
 
  const stamp = String(new Date().getTime());
  const opts = Object.assign({eventName}, params, {stamp});
  eventsMap[stamp] = cb; //注册唯一函数
  ipcRenderer.send('regist-event', opts); //发送事件
}
 
//进入全屏
function setFullScreen(cb) {
  registEvent(SET_FULL_SCREEN, cb);
}

window.ElectronBridge = {
  setFullScreen
};
```

主进程监听‘resist-event’频道，做对应的事。我们会将所有主进程能做的事，放在eventsList对象下，当接受到渲染进程的通知，去eventsList找有没有对应的事能做，有，做完通过promise，或者通过回调函数，去在‘fire-event’频道通知，渲染进程，事情已经做完，并把数据传回去，包括 stamp(之前渲染进程传过来的，现在传回去，告诉渲染进程执行哪个回调函数) 、 payload(返回数据) 、err (错误信息)

在渲染进程再监听‘fire-event’执行对应时间戳回调函数，并把主进程传过来的数据传给回调函数。触发完成后，删掉该回调函数。

```javascript
//bridge.js
//触发事件回调
ipcRenderer.on('fire-event', (event, arg) => {
  const cb = eventsMap[arg.stamp];
  if (cb) {
    if (arg.err) {
      cb(arg.err, arg.payload);
    } else {
      cb(false, arg.payload);
    }
    delete eventsMap[arg.stamp];
  }
});
```



这样代码就可以同时跑在浏览器端和electron

```javascript
// electron-client.js
const _rpc = window._ipcRenderer;

export function minWindow() {
    _rpc && _rpc.send('minWindow');
}

export function maxWindow() {
    _rpc && _rpc.send('maxWindow');
}

export function closeWindow() {
    _rpc && _rpc.send('closeWindow');
}

export function unMaxWindow() {
    _rpc &&  _rpc.send('unMaxWindow');

}
```





## 混合架构

业务下沉：将通用的、核心的业务下沉。例如消息处理、语音/视频、会议、数据存储等核心模块, 核心协议是 XMPP、SIP。这些模块变动频率较低、对性能要求也比较高，而且有跨平台需求，因此适合用 C/C++ 来实现。

UI混合：视图层混合化目前也有较多的解决方案，例如 Electron、React Native、Flutter、或者是 HTML Hybrid。我们选择先从 Electron 开始，因为它在桌面端开发中已经有非常成熟的表现，市场上也有很多大型的 Electron 应用，例如 VSCode、Atom、Slack。在移动端，我们对 React Native 和 Flutter 还比较保守，后续可能会进行尝试。

对应的MVC架构：

M：通用混合层，C/C++ 封装核心、通用的业务模块以及业务数据存储。

V：UI层，视图层，使用跨平台视图解决方案，对于性能要求较高的部分使用原生实现。比如 Electron

C：**平台桥接层**。介于 M 和 V 之间，桥接`通用混合层`接口，同时也为 UI 层暴露一些**平台相关**的特性。比如在桌面端，这里会通过 Node 原生模块桥接通用混合层, 同时也补充一些 Electron 缺失或不完美的功能。



## CEF

Chromium Embedded Framework (CEF)是个基于Google Chromium项目的开源Web browser控件（俗称谷歌亲儿子），支持Windows, Linux, Mac平台， 其包含C/C++程序接口，能够完美的与C++库集成，完善的支持Html5 Web页面开发，并且可以通过修改编译选项和源代码后编译的方式来实现剪裁CEF和提供原CEF没有的功能，定制自己的窗口类型。

优点：

•CEF可以通过编译和修改源代码的方式来定制

•可以通过C++控制窗口类型，支持透明窗口

•能够使用最新的CEF来兼容最新的Javascript标准和CSS，或者固定CEF的版本来支持Windows XP

•底层与C++集成容易

•可以使用Javascript来开发UI，C++实现大计算量的任务

缺点：

•与操作系统相关的功能，如读取注册表、写文件等功能，需要C++实现，增加了一些C++开发的工作量

•不经过裁剪的CEF，安装包会过大

对于要实现透明窗口和集成大量的C++模块的应用，CEF是个不错的选择。

CEF目前使用不太多，而且更像是一个C++项目，因此先贴一些资源：

教程：https://www.cnblogs.com/tuyile006/p/13852630.html

源码、下载包：https://bitbucket.org/chromiumembedded/cef/src/master/



## Tauri

Tauri 是一个为所有主流桌面平台构建小型、快速二进制文件的框架。开发人员可以集成任何编译成 HTML、 JS 和 CSS 的前端框架来构建他们的用户界面。应用程序的后端是一个 Rust 二进制文件，具有前端可以与之交互的 API。

`Tauri` 构建的桌面程序太小了，远不是 Electron.JS 可以相比的，因为它放弃了体积巨大的 `Chromium` 内核 和 `nodejs`，前端使用操作系统的 `webview`，后端集成了 `Rust`。 Tauri 提供了初始化程序的模板，比如原生js, `react`, `svelte.js`, `vue.js` 等等

### 特点

- 原始Tauri应用程序的**打包大小**小于3 MB，比Electron的大小小140 MB。
- **内存占用**小于使用相同代码库构建的Electron应用程序的大小的一半。
- **安全**是Tauri的头等大事，我们正在不断创新。
- 遗憾的是，底层是 Chromium 的使用者（例如Electron）无法获得 ** FLOSS(自由/开源软件) ** 许可

### 实现原理

tauri 具有五个主要组成部分：

- 用于创建，开发和构建应用程序的Node.js CLI
- Rust Core，用于绑定到底层WEBVIEW并提供可摇树优化的API
- Rust Bundler用于制造最终的二进制文件
- Webview的Rust绑定
- Webview低层库，用于创建和与操作系统“本机” Webview交互

Tauri应用程序中的用户界面目前在macOS上使用Cocoa / WebKit，在Linux上使用gtk-webkit2，在Windows上通过Edge使用MSHTML（IE10 / 11）或Webkit。 Tauri基于MIT许可的进行工作，即webview

### 安装

tauri是一个多语言系统，因此需要大量工具

1.首先安装gcc

```shell
brew install gcc
```

编译需要Xcode

```shell
xcode-select --install
```

2.也需要node的环境，需要node12以上

```shell
nvm install 12
nvm use 12
```

安装rust语言的编译器rustc和cargo安装包管理

```shell
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

验证

```shell
rustc --version
## rustc 1.42.0 (b8cedc004 2020-03-09)
```

下载tauri打包工具

```shell
cargo install tauri-bundler --force
```



### 直接创建Tauri应用

官方CLi初始化程序

```shell
yarn create tauri-app
## npx create-tauri-app
```

创建并初始化的时候要选择vue、react 原生js或者svelte应用

然后就可以直接启动项目

```shell
yarn tauri dev
```

打包客户端

```shell
yarn tauri build
```

在打包完就能在bundler或者release目录下面看到dmg文件夹



### 在现有项目中使用

首先你需要一个web项目，可以是react-create-app或者vue-cli创建的项目，也可以是任意创建的web项目

在项目中下载tauri

```shell
yarn add -D @tauri-apps/cli
# OR
npm install -D @tauri-apps/cli
```

在项目的package.json文件中添加tauri命令

```json
{
  // This content is just a sample
  "scripts": {
    "tauri": "tauri"
  }
}
```

下载完成后在当前项目的目录下使用命令

```shell
npm run tauri init
```

检查tauri设置

```shell
npm run tauri info
```

之后, 你的项目下会出现一个目录 `src-tauri`

再根据你的 web 项目启动时的端口修改文件 `src-tauri/tauri.conf.json`

一切就绪之后运行tauri app

```shell
npm run tauri dev
```

发布

```shell
npm run tauri build
```

更新tauri版本

```shell
npm install @tauri-apps/cli@latest @tauri-apps/api@latest
```



### 窗口名称/右下角应用图标

在src/tauri目录下的tauri.conf.json文件中修改

```json
"tauri": {
    "bundle": {
      "active": true,
      "targets": "all",
      "identifier": "com.tauri.dev",
      // 右下角图标
      "icon": [
        "icons/kun.png"
      ],
      "resources": [],
      "externalBin": [],
      "copyright": "",
      "category": "DeveloperTool",
      "shortDescription": "",
      "longDescription": "",
      "deb": {
        "depends": [],
        "useBootstrapper": false
      },
      "macOS": {
        "frameworks": [],
        "minimumSystemVersion": "",
        "useBootstrapper": false,
        "exceptionDomain": "",
        "signingIdentity": null,
        "providerShortName": null,
        "entitlements": null
      },
      "windows": {
        "certificateThumbprint": null,
        "digestAlgorithm": "sha256",
        "timestampUrl": ""
      }
    },
    "updater": {
      "active": false
    },
    "allowlist": {
      "all": true
    },
    "windows": [
      {
        // 窗口名称
        "title": "Kun的小屋",
        "width": 800,
        "height": 600,
        "resizable": true,
        "fullscreen": false
      }
    ],
    "security": {
      "csp": null
    }
  }
```



### 多窗口



### 自动更新



### 坑

安装过程中会报错，提示安装别的文件,需要单独安装别的包

```shell
## 安装 pngquant-bin 包 
npm install pngquant-bin
## pngquant-bin要求预安装别的包
brew install libimagequant
sudo apt-get install libimagequant-dev
```



## React Native Desktop

