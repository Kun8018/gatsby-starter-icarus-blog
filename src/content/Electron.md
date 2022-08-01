---
title: Electron开发 
date: 2020-06-15 21:40:33
categories: IT
tags:
    - IT，App,Node,Electron
toc: true
thumbnail: http://cdn.kunkunzhang.top/electron.png
---

　　目前看来Electron 的开发并没有想像的那么简单，简单尝试一下之后目前先搁置了，等有空再来。

<!--more-->

## 启动



```node

```





### 安装electron

克隆仓库

```git
git clone https://github.com/electron/electron-quick-start
```

进入文件夹,安装依赖

```node
cd electron-quick-start
npm install
```

运行

```node
npm start
```

或者直接安装

```ndoe
npm install electron --save-dev
```

检验是否安装成功

```node
npx electron -v
```

运行electron

```node
eletron .
或者npm start
```

打开调试模式

```electron
mainWindow.webContents.openDevTools()
```

## 项目文件





## 创建应用工具栏

创建Menu.js,输入以下代码

```node
const {Menu} = require('electron')

var template=[
    {
        label:'文件',
        submenu:[
            {label:'创建',
             accelerator:'ctrl+n',
            },
            {label:'打开'},
        ]
    },
    {
        label:'编辑',
        submenu:[
            {label:'撤销'},
            {label:'上一步'},
        ]
    },
]
var m = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(m)
```

在main.js中引入

```node
require('./main/menu.js')
```



## 设置鼠标右键菜单

在main.js中Create window函数添加node

```node
webPreferences: {
nodeIntegration:true,
}
```

创建render.js，并在主进程html文件中引入

```node
const {remote} = require('electron')//引入remote模块

var rightTemplate = [
    {label:'复制',accelerator:'ctrl+c'},
    {label:'粘贴',accelerator:'ctrl+v'}
]//设置右键菜单栏

var m = remote.Menu.buildFromTemplate(rightTemplate)
//启动右键监听函数
window.addEventListener('contextmenu',function(e){
        e.preventDefault()
        m.popup({window:remote.getCurrentWindow()})
    })
```

## 创建新窗口



可拖动



## 设置自定义标题栏

安装第三方包

```node
npm i custom-electron-titlebar
```

主进程中窗口

```node
frame： false
```

渲染进程中

```javascript
var titlebar = new Titlebar({
	backgroundColor: Color.fromHex('#ECECEC'),
  icon: './assets/logo.png',
  
});

titlebar.updateTitle('嘿嘿嘿')
```





## 选择、保存文件对话框--dialog模块

选择文件框

```node
const {dialog} = require('electron').remote

var openbtn = document.getElementById('openbtn')

openbtn.onclick=function(){
    dialog.showOpenDialog({
        title:'选择照片',
        defaultPath:'./',
        filters:[{name:'',extensions:['jpg','png']}],
        buttonLabel:''
    }).then(
        result=>{

               let image=document.getElementById('')
               image.setAttribute("src",result)
        }
    ).catch()
}
```

保存文件框



## 弹出对话框



```electron
const {dialog} = require('electron').remote

dialog.showMessageBox({
    type:'warning',
    title:'',
    message:'',
    buttons:['','']
})
```



## 注册快捷键功能、剪切板功能





## Shell-管理文件与URL



## 设置右下角图标tray

```javascript
const tray = new Tray('./src/assets/logo.png');
  const trayContextMenu = Menu.buildFromTemplate([
    {
      label: '打开',
      click: () => {
        win.show();
      }
    }, 
    {
      type: 'separator'
    },
    {
      label: '退出',
      click: () => {
        app.quit();
      }
    }
  ]);
  
  tray.setToolTip('myApp');
  tray.on('click', () => {
    win.isVisible() ? win.hide() : win.show()
    win.isVisible() ?win.setSkipTaskbar(false):win.setSkipTaskbar(true);
  });
  tray.on('right-click', () => {
    tray.popUpContextMenu(trayContextMenu);
  });
```



## 主进程与渲染进程通信

`ipcRenderer` 是一个 `EventEmitter` 的实例。 你可以使用它提供的一些方法，从渲染进程发送同步或异步的消息到主进程。 也可以接收主进程回复的消息。

渲染进程向主进程通信

渲染进程发布信息

```javascript
//在渲染进程引入ipcRenderer
import { ipcRenderer } from 'electron';
//通过 channel 发送同步消息到主进程，可以携带任意参数。参数会被序列化为 JSON，因此参数对象上的函数和原型链不会被发送。
ipcRenderer.send('sync-render', '我是来自渲染进程的异步消息');
//也可以同步发送，但是同步发送会堵塞渲染进程直至主进程收到
const msg = ipcRenderer.sendSync('async-render', '我是来自渲染进程的同步消息');
```

主进程监听

`ipcMain`模块是`EventEmitter`类的一个实例。 当在主进程中使用时，它处理从渲染器进程（网页）发送出来的异步和同步信息。 从渲染器进程发送的消息将被发送到该模块。

`ipcMain.on`：监听 `channel`，当接收到新的消息时 `listener` 会以 `listener(event, args...)` 的形式被调用。

```javascript
 ipcMain.on('sync-render', (event, data) => {
    console.log(data);
  });
```

主进程向渲染进程通信

在主进程中可以通过`BrowserWindow`的`webContents`向渲染进程发送消息，所以，在发送消息前你必须先找到对应渲染进程的`BrowserWindow`对象。

```javascript
const mainWindow = BrowserWindow.fromId(global.mainId);
 mainWindow.webContents.send('main-msg', `ConardLi]`)
```

在`ipcMain`接受消息的回调函数中，通过第一个参数`event`的属性`sender`可以拿到消息来源渲染进程的`webContents`对象，我们可以直接用此对象回应消息。

```javascript
ipcMain.on('sync-render', (event, data) => {
    console.log(data);
    event.sender.send('main-msg', '主进程收到了渲染进程的【异步】消息！')
  });
```

渲染进程监听：`ipcRenderer.on`:监听 `channel`, 当新消息到达，将通过` listener(event, args...) `调用 `listener`

```javascript
ipcRenderer.on('main-msg', (event, msg) => {
    console.log(msg);
})
```

### ipc通信实现的原理

`ipcMain` 和 `ipcRenderer` 都是 `EventEmitter` 类的一个实例。`EventEmitter` 类是 `NodeJS` 事件的基础，它由 `NodeJS` 中的 `events` 模块导出。

`EventEmitter` å的核心就是事件触发与事件监听器功能的封装。它实现了事件模型需要的接口， 包括 `addListener，removeListener`, `emit` 及其它工具方法. 同原生 `JavaScript` 事件类似， 采用了发布/订阅(观察者)的方式， 使用内部 `_events` 列表来记录注册的事件处理器。

我们通过 `ipcMain`和`ipcRenderer` 的 `on、send` 进行监听和发送消息都是 `EventEmitter` 定义的相关接口。

渲染进程之间通过html5 storage接口进行数据共享

### remote与ipc的区别

remote实现调用方法

```javascript
const os = require('os')

function getCpu(){
  const cors = os.cpus();
  if(cores.length > 0){
    return cores[0].model;
  }
}

exports.getCpu = getCpu;

const obj = require('electron').remote.require('./systemInfo')
const cpuInfo = obj.getCpu();

```

remote实现数据共享

```javascript
const os = require('os')

function getCpu(){
  const cors = os.cpus();
  if(cores.length > 0){
    return cores[0].model;
  }
}

exports.getCpu = getCpu;

const getCpu = require('/systemInfo');
const cpuInfo = getCpu();
global['cpuinfo'] = cpuInfo;

const cpuInfo = require('electron').remote.getGlobal('cpuInfo')
```

使用ipc传递数据

```javascript
const os = require('os')

function getCpu(){
  const cors = os.cpus();
  if(cores.length > 0){
    return cores[0].model;
  }
}

exports.getCpu = getCpu;

const getCpu = require('./systemInfo');
const ipc = require('electron').ipcMain;

ipc.on('get-cpu-info',function (event,arg){
  event.sender.send('cpu-info-reply',getCpu())
})

const ipc = require('electron').ipcRenderer;
const getCpuInfoBtn = document.getElementById('info-btn');

getCpuInfoBtn.addEventListener('click',function() {
  ipc.send('get-cpu-info')
})

ipc.on('cpu-info-reply', function(event, arg) {
  console.log(arg);
})
```

remote通过方法直接调用以及全局变量获取来实现数据的传递

ipc：通过事件注册发布的方式实现数据传递

remote是同步的，底层通过ipc实现

https://www.wxwenku.com/d/200894878

### 设置global变量

通过ipc main监听，设置变量

```javascript
const { ipcMain } = require('electron')

ipcMain.on("setMyGloBalVariable",(event,myGlobalVariableValue)=>{
  global.myGlobalVariableValue = myGlobalVariableValue;
})
```

remote获取

```javascript
const { ipcRenderer, remote } = require("electron")

ipcRenderer.send("setMyGloBalVariable","Hi There!")

remote.getGlobal("MyGlobalVariableValue"); //=> "Hi There"
```



## 引入终端

https://blog.csdn.net/gao_grace/article/details/88868884

https://www.jb51.net/article/170628.htm



## windows 任务栏



[https://www.electronjs.org/docs/tutorial/windows-taskbar#%E7%BC%A9%E7%95%A5%E5%9B%BE%E5%B7%A5%E5%85%B7%E6%A0%8F](https://www.electronjs.org/docs/tutorial/windows-taskbar#缩略图工具栏)

## 截图功能

`desktopCapturer`用于从桌面捕获音频和视频的媒体源的信息。它只能在渲染进程中被调用。

```javascript
getImg = () => {
    this.setState({ imgMsg: '正在截取屏幕...' })
    const thumbSize = this.determineScreenShotSize()
    let options = { types: ['screen'], thumbnailSize: thumbSize }
    desktopCapturer.getSources(options, (error, sources) => {
      if (error) return console.log(error)
      sources.forEach((source) => {
        if (source.name === 'Entire screen' || source.name === 'Screen 1') {
          const screenshotPath = path.join(os.tmpdir(), 'screenshot.png')
          fs.writeFile(screenshotPath, source.thumbnail.toPNG(), (error) => {
            if (error) return console.log(error)
            shell.openExternal(`file://${screenshotPath}`)
            this.setState({ imgMsg: `截图保存到: ${screenshotPath}` })
          })
        }
      })
    })
  }

  determineScreenShotSize = () => {
    const screenSize = screen.getPrimaryDisplay().workAreaSize
    const maxDimension = Math.max(screenSize.width, screenSize.height)
    return {
      width: maxDimension * window.devicePixelRatio,
      height: maxDimension * window.devicePixelRatio
    }
  }
```



## 下载管理

由于Electron渲染层是基于chromium的，触发下载的逻辑和chromium是一致的，页面中的a标签或者js跳转等等行为都可能触发下载，具体视访问的资源而定。什么样的资源会触发浏览器的下载行为呢？

1.response header中的`Content-Disposition`为attachment。

2.response header中的`Content-Type`，是浏览器无法直接打开的文件类型，例如`application/octet-stream`，此时取决于浏览器的具体实现了。例如: IE无法打开pdf文件，chrome可以直接打开pdf文件，因此pdf类型的url在chrome上可以直接打开，而在IE下会触发下载行为。

在Electron中还有一种方法可以触发下载： [webContents.download](https://electronjs.org/docs/api/web-contents#contentsdownloadurlurl)。相当于直接调用chromium底层的下载逻辑，忽略headers中的那些判断，直接下载。

两种方式都会触发session的[will-download](https://electronjs.org/docs/api/session#event-will-download)事件，获取到关键的[downloadItem](https://electronjs.org/docs/api/download-item)对象

如果不做任何处理的话，触发下载行为时Electron会弹出一个系统dialog，让用户来选择文件存放的目录。这个体验并不好，因此我们首先需要把这个系统dialog去掉，设置默认的下载路径即可。

为文件设置默认下载路径，就需要考虑文件名重复的情况，一般来说会使用文件名自增的逻辑，例如：test.jpg、test.jpg(1)这种格式。文件默认存放目录，也是一个问题，我们统一使用`app.getPath('downloads')`作为文件下载目录。为了用户体验，后续提供修改文件下载目录功能即可。

```javascript
//main.js
const { session } = require('electron');
session.defaultSession.on('will-download', async (event, item) => {
    const fileName = item.getFilename();
    const url = item.getURL();
    const startTime = item.getStartTime();
    const initialState = item.getState();
    const downloadPath = app.getPath('downloads');

    let fileNum = 0;
    let savePath = path.join(downloadPath, fileName);

    // savePath基础信息
    const ext = path.extname(savePath);
    const name = path.basename(savePath, ext);
    const dir = path.dirname(savePath);

    // 文件名自增逻辑
    while (fs.pathExistsSync(savePath)) {
      fileNum += 1;
      savePath = path.format({
        dir,
        ext,
        name: `${name}(${fileNum})`,
      });
    }

    // 设置下载目录，阻止系统dialog的出现
    item.setSavePath(savePath);
    
     // 通知渲染进程，有一个新的下载任务
    win.webContents.send('new-download-item', {
      savePath,
      url,
      startTime,
      state: initialState,
      paused: item.isPaused(),
      totalBytes: item.getTotalBytes(),
      receivedBytes: item.getReceivedBytes(),
    });

    // 下载任务更新
    item.on('updated', (e, state) => { // eslint-disable-line
      win.webContents.send('download-item-updated', {
        startTime,
        state,
        totalBytes: item.getTotalBytes(),
        receivedBytes: item.getReceivedBytes(),
        paused: item.isPaused(),
      });
    });

    // 下载任务完成
    item.on('done', (e, state) => { // eslint-disable-line
      win.webContents.send('download-item-done', {
        startTime,
        state,
      });
    });
  });
```

在下载列表中直接打开文件

在下载管理窗口中，双击下载任务可以打开该文件，点击查看按钮可以打开文件所在目录。我们统一使用Electron的[shell](https://electronjs.org/docs/api/shell)模块来实现。

```javascript

```



获取文件图标

文件的图标都是从系统获取的，要求和文件管理器中看到的文件图标一致。

```javascript
const { app } = require('electron').remote;

// 封装一个函数
const getFileIcon = (path) => {
  return new Promise((resolve) => {
    const defaultIcon = 'some-default.jpg';
    if (!path) return resolve(defaultIcon);
    return app.getFileIcon(path, (err, nativeImage) => {
      if (err) {
        return resolve(defaultIcon);
      }
      return resolve(nativeImage.toDataURL()); // 使用base64展示图标
    });
  });
};

// 获取图标
const imgSrc = await getFileIcon('./test.jpg');
```

## 从浏览器启动pc端

许多本地应用（例如vscode、QQ），都支持通过浏览器来启动PC上的本地软件.

实现原理为：浏览器在解析url的时候，会尝试从系统本地寻找url协议所关联的应用，如果有关联的应用，则尝试打开这个应用。我们只需要**将自定义的协议注册到用户电脑上**，就可以实现功能了。用户浏览器里访问带有自定义协议的url，即可启动我们的客户端。

这个功能需要两步：1.注册自定义协议，2.接收参数.

注册自定义协议

windows端

windows端在安装时添加注册表即可，卸载时要删掉注册表

```javascript
[Registry]
Root: HKCR; SubKey: Kujiale; ValueData: "KujialeProtocol"; ValueType: string; Flags: createvalueifdoesntexist uninsdeletekey;
Root: HKCR; SubKey: Kujiale; ValueName: "URL Protocol"; ValueData: "{app}\{#appExe}"; ValueType: string; Flags: createvalueifdoesntexist uninsdeletekey;
Root: HKCR; SubKey: Kujiale\DefaultIcon; ValueData: "{app}\{#appExe}"; ValueType: string; Flags: createvalueifdoesntexist uninsdeletekey;
Root: HKCR; SubKey: Kujiale\shell\open\command; ValueData: "{app}\{#appExe} ""%1"""; Flags: createvalueifdoesntexist uninsdeletekey; ValueType: string;
```

当然，也可以在软件启动的时候操作注册表，这个时候其实是用NodeJs来与注册表交互，推荐一个npm包[node-regedit](https://github.com/ironSource/node-regedit)



mac端

iOS和MacOS的应用包中，都有一个info.plist文件，这个文件主要用来记录应用的一些meta信息，文件用键值对的形式来记录信息(xml).

CFBundleURLTypes是info.plist里面的一个key，对应的value是一个数组。可以通过这个字段来为应用注册一个 or 多个 URL Schema。

在[Electron Packager](https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#protocols)中，有一个配置`protocols`可以注册自定义协议，只对MacOS端生效，原理就是上面提到的修改infi.plist文件。

```javascript
// for mac
options.protocols = [{
  name: '钟离',
  schemes: ['zhongli', 'test'], // 可以注册多个协议
}];
```

接收参数

协议注册完毕之后，我们已经可以在浏览器中，通过访问自定义协议url来启动客户端了。

windows端

对于windows，参数会通过启动参数的形式传递给应用程序。因此，我们可以很方便的拿到这个参数

```javascript
// 通过自定义url启动客户端时
console.log(process.argv);

// 打印出
[
 'C://your-app.exe', // 启动路径
 'kujiale://111',  // 启动的自定义url
]
```

mac端

在Mac下不会通过启动参数传递给应用，通过自定义协议打开应用，app会收到 [open-url](https://electronjs.org/docs/api/app#event-open-url-macos) 事件

```javascript
// mac下通过kujiale协议启动应用
app.on('open-url', (e, url) => { // eslint-disable-line
  parse(url)； 解析url
});
```





## 打印功能

```javascript
/**
 * 获取系统打印机列表
 */
export function getPrinters() {
  let printers = [];
  try {
    const contents = remote.getCurrentWindow().webContents;
    printers = contents.getPrinters();
  } catch (e) {
    console.error('getPrintersError', e);
  }
  return printers;
}
/**
 * 获取系统默认打印机
 */
export function getDefaultPrinter() {
  return getPrinters().find(element => element.isDefault);
}
/**
 * 检测是否安装了某个打印驱动
 */
export function checkDriver(driverMame) {
  return getPrinters().find(element => (element.options["printer-make-and-model"] || '').includes(driverMame));
}
/**
 * 根据打印机名称获取打印机对象
 */
export function getPrinterByName(name) {
  return getPrinters().find(element => element.name === name);
}
```



## js数据库lowdb和nedb

与原生App类似，与web端不同，electron应用是一个桌面级应用，需要具备将数据存储在本地的能力以实现数据持久化，有些数据我们必须在本地存下来，方便下次使用的时候读取。。数据持久化存储实际上对于后端很熟悉。通常是指的是把内存里的数据以不同的存储模型存储到磁盘上，在需要的时候再从存储模型里读取读入内存中的整个流程。这里面的存储模型通常就是我们熟悉的数据库。常见的数据库mysql、mongodb，常见的这些数据库都是Server-Client模式的，需要启动服务端。但是对于electron，不可能用户在使用的时候让用户配数据库。

Electron是node技术栈的，于是我就找了一些纯JavaScript实现的数据库。js数据库有lowdb和nedb。

lowdb是用JSON为基本存储结构基于lodash开发的，有lodash的加持，用起来很顺手。优势在于它在持续的维护，有不少好用的插件。并且很关键的是同步操作，采用链式调用的写法，写起来有种jQuery的感觉。再者，用JSON存储的数据，不管是调用还是备份都很方便，这也是让我很喜欢的一点。

lowdb本质上就是通过`fs`来读写JSON文件实现的。

安装json数据库

```shell
npm install lowdb
```



nedb使用

```javascript
>>> 新建db.js
import Datastore from 'nedb'
import path from 'path'
import { remote } from 'electron'

const db = {
    tableData: new Datastore({filename: path.join(remote.app.getPath('userData'), '/tableData.db')}),
    chartData: new Datastore({filename: path.join(remote.app.getPath('userData'), '/chartData.db')}),
    cfgData: new Datastore({filename: path.join(remote.app.getPath('userData'), '/cfgData.db')}),
}

export default {
    db
}

>>>>  引入数据库
/**
 *  本地数据库导入
 *  web模式注释该代码
 */
import db from '../db'
Vue.prototype.$db = db.db

>>>> 任意页面调用数据库
  this.$db.chartData.loadDatabase();
  this.$db.chartData.find({},  (err, docs)=> {
//                            console.log(docs);
                            if(docs && docs.length > 0){
                                this.totalOptionList = docs;
                            }
                        });
```





## 拖拽播放





## 启动参数

当你的应用启动时，你可能需要同时带上一些参数来影响程序的执行逻辑，比如通过设置启动参数来让程序换不同的皮肤

在electron中，主进程其实就是个node进程，所以直接通过node支持的方式去获取启动参数

```javascript
const { app,BrowserWindow } = require('electron');
console.log(process.argv)
//渲染进程
const remote = require('eletron').remote
alert(remote.process.argv)
```



## 结合React



```node
npm install --global create-react-app
```



```node
create-react-app test_app
```



```node
npm install -save electron
```



### 在React中使用Electron

在项目`public/`目录下新建`renderer.js`文件,该文件是预加载的js文件，并且在该文件内可以使用所有的Node.js的API。在`renderer.js`中添加

```javascript
global.electron = require(``'electron'``)
```

修改`piblic/index.html`文件

在`<div id="root"></div>`前引入`renderer.js`文件

```html
<script>require('./renderer.js')</script>
<div id="root"></div>
```

修改`main.js`文件

修改创建浏览器的入口代码,添加`preload`配置项。将`renderer.js`作为预加载文件





## 结合Vue

安装vue-cli工具

```node
yarn global add @vue/cli-init
```



```node
vue init simulatedgreg/electron-vue my-project
```



```vue
npm install # or yarn
```

运行项目

```node
npm run dev # or yarn run dev
```

打包

```node
yarn run build
```

第二种



```node
vue create [项目名]
```



```node
vue add electron-builder
```



```node
npm run electron:serve
yarn electron-serve
```







打包前更新electron builder

```node
npm i electron-builder@latest -S
或者yarn add
```



如果在这一步 `Downloading tmp-5756-0-electron-v1.6.2-win32-x64.zip` 无法下载或者下载缓慢时，可以使用以下方式处理：

```node
npm config set ELECTRON_MIRROR "https://npm.taobao.org/mirrors/electron/"
```





### 错误信息

**process is not defined**

删掉`src/index.ejs`里面的

#### eslint的错误

https://www.cnblogs.com/lunlunshiwo/p/8596003.html

 ‘Unexpected tab character’

　　字面意思理解呢就是**意想不到的制表符**，当时出现的时候就是我习惯的使用Tab键去打空格，但是eslint默认不认可Tab，所以解决方法很简单：



　　在eslint的配置文件中（**.eslintrc**）**rules**项中添加一行：**"no-tabs":"off"**。

**expected indentation of 2 spaces but found 1 tab**

字面意思就是**预期缩进2个空格，但找到1个Tab**。说实话，我一开始找了半天，没发现原因，后来想到可能是eslint不认可**tab**开头，因此我找到了我使用的编辑器VSCord的设置，添加了相应的文字：

**Unexpected trailing comma. (comma-dangle)’**

字面意思是**尾随了一个多余的逗号**，有时候明明在最后一个属性之后都没有了，却多余地添加了一个逗号，毕竟eslint是一个强迫症患者，解决思路超简单，删掉即可。



## 应用打包

### 主进程打包

主进程，即将整个程序打包成可运行的客户端程序，常用的打包方案一般有两种，`electron-packager`和`electron-builder`。

`electron-packager`在打包配置上我觉得有些繁琐，而且它只能将应用直接打包为可执行程序。

`electron-builder`它不仅拥有方便的配置 `protocol` 的功能、内置的 `Auto Update`、简单的配置 `package.json` 便能完成整个打包工作，用户体验非常不错。而且`electron-builder`不仅能直接将应用打包成`exe app`等可执行程序，还能打包成`msi dmg`等安装包格式。

安装打包工具

```node
npm install electron-packager -g
```

配置打包命令

```node
"scripts": {
    "start": "electron .",
    "pack": "electron-packager . myClient --win --out ../myClient --arch=x64 --app-version=0.0.1 --electron-version=2.0.0"
  }
```

命令结构如下（根据实际情况修改）：

```node
“.”：需要打包的应用目录（即当前目录），
“myClient”：应用名称，
“--win”：打包平台（以Windows为例），
“--out ../myClient”：输出目录，
“--arch=64”：64位，
“--app-version=0.0.1”：应用版本，
“--electron-version=2.0.0”：electron版本
```

执行打包命令

```node
electron-builder
```

### 渲染进程打包

一般情况下，我们的大部分业务逻辑代码是在渲染进程完成的，在大部分情况下我们仅仅需要对渲染进程进行更新和升级而不需要改动主进程代码，我们渲染进程的打包实际上和一般的`web`项目打包没有太大差别，使用`webpack`打包即可。

打包完成的`html`和`js`文件，我们一般要上传到我们的前端静态资源服务器下，然后告知服务端我们的渲染进程有代码更新，这里可以说成渲染进程单独的升级。

需要注意的是，和壳的升级不同，渲染进程的升级仅仅是静态资源服务器上`html`和`js`文件的更新，而不需要重新下载更新客户端，这样我们每次启动程序的时候检测到离线包有更新，即可直接刷新读取最新版本的静态资源文件，即使在程序运行过程中要强制更新，我们的程序只需要强制刷新页面读取最新的静态资源即可，这样的升级对用户是非常友好的。

一旦我们这样配置，就意味着渲染进程和主进程打包升级的完全分离，我们在启动主窗口时读取的文件就不应该再是本地文件，而是打包完成后放在静态资源服务器的文件。

### 打包优化

`electron-builder`打包出来的`App`要比相同功能的原生客户端应用体积大很多，即使是空的应用，体积也要在`100mb`以上。原因有很多：

第一点；为了达到跨平台的效果，每个`Electron`应用都包含了整个`V8`引擎和`Chromium`内核。

第二点：打包时会将整个`node_modules`打包进去，大家都知道一个应用的`node_module`体积是非常庞大的，这也是使得`Electron`应用打包后的体积较大的原因。

第一点我们无法改变，我们可以从第二点对应用体积进行优化：`Electron`在打包时只会将`denpendencies`的依赖打包进去，而不会将 `devDependencies` 中的依赖进行打包。所以我们应尽可能的减少`denpendencies`中的依赖。在上面的进程中，我们使用`webpack`对渲染进程进行打包，所以渲染进程的依赖全部都可以移入`devDependencies`。

另外，我们还可以使用双`packajson.json`的方式来进行优化，把只在开发环境中使用到的依赖放在整个项目的根目录的`package.json`下，将与平台相关的或者运行时需要的依赖装在`app`目录下。

tree-shaking



## 自定义安装UI和路径





## Github发布与更新功能

electron提供electron-updater插件

```shell
npm install electron-updater --save-dev
```

引入

```javascript
const {autoUpdater} = require('electron-updater')
```

实例

```javascript
ipcMain.on('checkForUpdate',e=>
    updateHandle()
)

//检查更新
function updateHandle(){
  //检查更新
  autoUpdater.checkForUpdate()
  const message = {
    error:'检查更新出错'，
    checking:'正在检查更新...',
    updateAva:'检测到新版本，正在下载...',
    updateNotAva:'为监测到新版本'
  }
  autoUpdater.on('checking-for-update',function(){
    sendUpdateMessage(message.checking)
  })
  autoUpdater.on('update-available',function(){
    sendUpdateMessage(message.updateAva)
  })
  autoUpdater.on('update-not-available',function(){
    sendUpdateMessage(message.updateNotAva)
  })
  autoUpdater.on('error',function(){
    sendUpdateError(JSON.stringify(error))
    sendUpdateMessage(message.error)
  })
  
  //更新下载进度事件
   autoUpdater.on('download-progress',function(progressObj){
     console.log(progressObj.percent)
     win.webContents.send('downloadProgress',progressObj)
  })
   autoUpdater.on('update-downloaded',function(event,releaseNotes,releaseName,releaseDate,updateUrl,quitAndUpdate){
      ipcMain.on('isUpdateNow',(e,arg) =>{
        console.log(arg)
        console.log('开始更新')
        autoUpdater.quitAndInstall()
      })
     win.webContents.send('isUpdateNow')
  })
}
```





[https://molunerfinn.com/electron-vue-5/#%E7%89%88%E6%9C%AC%E7%9B%B8%E5%85%B3](https://molunerfinn.com/electron-vue-5/#版本相关)

## [进阶]实现系统级别的右键菜单





## [进阶] 实现命令行命令/内部执行命令行命令

使用node的child_process执行cmd命令

引入child_process模块

```javascript
import { exec } from 'child_process'
```

实例

```javascript
//定义cmd命令为字符串
const cmdStr = 'ipconfig'
//定义执行目录，如果在根目录执行或者命令不需要定义路径则不需要定义目录
const cmdPath = pathUtil.getAppResourcePath('')
//执行命令行
const workerProcess = exec(cmdStr,{cmd:cmdPath})
//输出验证
workerProcess.stdout.on('data',function(data){
  console.log(data)
})
//打印错误的后台执行程序输出
workerProcess.stderr.on('data',function(data){
  console.log(data)
})
//退出后的输出
workerProcess.on('close',function(code){
  console.log('out code:'+code)
})
```



## 监控崩溃

崩溃监控是每个客户端程序必备的保护功能，当程序崩溃时我们一般期望做到两件事：

- 1.上传崩溃日志，及时报警
- 2.监控程序崩溃，提示用户重启程序

`electron`为我们提供给了`crashReporter`来帮助我们记录崩溃日志，我们可以通过`crashReporter.start`来创建一个崩溃报告器：

```javascript
const { crashReporter } = require('electron')
crashReporter.start({
  productName: 'YourName',
  companyName: 'YourCompany',
  submitURL: 'https://your-domain.com/url-to-submit',
  uploadToServer: true
})
```

当程序发生崩溃时，崩溃报日志将被储存在临时文件夹中名为`YourName Crashes`的文件文件夹中。`submitURL`用于指定你的崩溃日志上传服务器。 在启动崩溃报告器之前，您可以通过调用`app.setPath('temp', 'my/custom/temp') `API来自定义这些临时文件的保存路径。你还可以通过`crashReporter.getLastCrashReport()`来获取上次崩溃报告的日期和`ID`。



## Electron运行原理

`Electron` 结合了 `Chromium`、`Node.js` 和用于调用操作系统本地功能的`API`三部分结合而成运行。

Chromium

`Chromium `是` Google `为发展` Chrome `浏览器而启动的开源项目，`Chromium `相当于` Chrome `的工程版或称实验版，新功能会率先在` Chromium `上实现，待验证后才会应用在`Chrome `上，故` Chrome `的功能会相对落后但较稳定。

`Chromium`为`Electron`提供强大的`UI`能力，可以在不考虑兼容性的情况下开发界面。

Nodejs

`Node.js`是一个让` JavaScript `运行在服务端的开发平台，`Node `使用事件驱动，非阻塞`I/O `模型而得以轻量和高效。

单单靠`Chromium`是不能具备直接操作原生`GUI`能力的，`Electron`内集成了`Nodejs`，这让其在开发界面的同时也有了操作系统底层` API `的能力，`Nodejs` 中常用的 `Path、fs、Crypto` 等模块在 `Electron` 可以直接使用。

系统API

为了提供原生系统的`GUI`支持，`Electron`内置了原生应用程序接口，对调用一些系统功能，如调用系统通知、打开系统文件夹提供支持。