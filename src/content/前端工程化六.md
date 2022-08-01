---
title: 前端进阶（六）-UI自动化测试
date: 2020-12-15 21:40:33
categories: IT
tags:
    - IT，Web,数据库
toc: true
thumbnail: https://cdn.kunkunzhang.top/babel-js.png
---

　　自动化测试应该也是工程化的一部分。本文讲前端UI自动化测试

<!--more-->

## UI自动化测试

为了保障软件质量，并减少重复性的测试工作，自动化测试已经被广泛运用。

自动化测试是一种测试方法，是指使用特定的软件，去控制测试流程，并比较实际结果与预期结果之间的差异。通过将测试自动化，可以把人对软件的测试行为转化为由机器自动执行测试的行为，从而替代大量的手工测试操作，使得测试可以快速，反复的进行。

关于自动化测试，有一个测试金字塔模型，该模型把测试从下到上分为了单元测试、集成测试和UI自动化测试（E2E测试/UI界面测试）。越往金字塔底层，测试成本越低，效率也越高，而越往金字塔的顶层，测试成本会逐渐增高，收益也会越低。

UI测试(端到端测试)

UI测试的主要目的是，从软件使用者的角度来检验软件的质量，而UI自动化测试则是以自动化的方式来代替人工执行测试。在测试金字塔模型中，UI层测试是各种测试中投入最大、收益最低、运行最慢的一种。

接口自动化测试（集成测试）

接口自动化主要包括模块接口测试，子功能模块集成起来的功能模块测试等，目的是为了验证在单元测试的基础上，所有模块集成起来的子系统、子功能是否仍然满足质量目标。

单元测试

单元测试又称为模块测试，主要针对程序中最小可测试单元（一般指方法，类）的测试，具备投入小、收益产出高的特征，可以较早期地发现代码缺陷，适用于公共函数库的测试。

## cypress

Cypress是为现代网络打造的，基于JavaScript的下一代前端测试工具。他可以对浏览器中运行的任何内容进行快速，简单和可靠的测试。

Cypress是自集成的，它提供了一套完整的端到端测试体验。无须借助其他外部工具，在简单安装后即可允许用户快速的创建、编写、运行、测试用例，并且针对每一步操作均支持回看。

不同于其他只能测试UI层的前端测试工具，Cypress允许你编写所有类型的测试，覆盖了测试金字塔模型涉及的所有测试类型：端到端测试、集成测试、单元测试。

优点

- 阅读性高，易于理解

- 界面美观友好。

- 测试的每一步都有对应的截图，在运行测试的时候，cypress会获取快照，记录了测试执行过程的每一步细节。

- 全程都会有录屏。
- 支持使用web浏览器上的开发工具直接调试，有丰富错误和堆栈跟踪信息，支持debug调试，随时暂停。
  自动等待ui更新，减少异步代码，在页面某些元素还没出来的时候，通常我们会添加等待的代码。但是在cypress中，是自动等待的，直到 元素出现，或者超过了你设置的超时时间。
- 环境安装：快速安装。没有服务器，驱动程序，或任何其他依赖需要安装或配置。

局限

1、长期权衡

不建议使用Cypress用于网络爬虫，性能测试之目的。

Cypress永远不会支持多标签测试。

Cypress不支持同时打开两个及以上的浏览器。

每个Cypress测试用例应遵守同源策略

2、短期折中

目前浏览器支持Chrome，Firefox，Microsoft Edge和Electron

不支持测试移动端应用

针对iframe的支持有限

不能在window.fetch上使用cy.route()

没有影子DOM支持。

cypress原理

大多数测试工具(Selenium/WebDriver)通过在浏览器外部运行并在网络上执行远程命令来运行(WebDriver底层的通信协议基于JSON Wire Protocol其运行需要网络通信)，Cypress恰恰相反，它在与应用程序相同的生命周期里执行，当运行测试时，Cypress首先使用webpack将测试代码中的所有模块bundle到一个js文件中，然后，它会运行浏览器并将测试代码注入一个空白页面里，然后它将在浏览器中运行测试代码(可以理解为Cypress通过一系列操作将测试代码放到一个iframe中运行)

在每次测试首次加载Cypress时，内部Cypress Web应用程序先把自己托管在本地的一个随机端口上(例如http://localhost:65874/__/),在识别出测试中发出的第一个cy.visit()命令后，Cypress将会更改其本地URL以匹配你远程应用程序的Origin(用于满足同源策略),这使得你的测试代码和应用程序可以在同一个Run Loop中运行

因为Cypress测试代码和应用程序均运行在由Cypress全权控制的浏览器中，且他们运行在同一个Domain下的不同iframe内，所以Cypress的测试代码可以直接操作DOM、Window Objects甚至Local Storages而无须通过网络访问，也因此它更快

此外Cypress还可以在网络(请求)层进行及时读取和更改网络流量的操作，Cypress背后是NodeJS Process，任何发往浏览器之外的HTTP的请求和响应，均由Cypress生成，被NodeJS Process控制的Proxy进行转发，因此Cypress不仅可以修改进出浏览器的所有内容，还可以更改可能影响自动化浏览器操作的代码，所以Cypress不仅从根本上控制整个自动化测试的流程，还可以提供稳定性更佳的结果

### 使用

安装

```shell
npm install cypress --save-dev
```

使用`cypress open`命令会自动进行初始化配置并生成一个默认的文件夹结构

fixture通常配合cy.fixture()命令来使用，主要用来存储测试用例的外部静态数据，通常目录是在cypress/fixtures中，但也可以配置到另一个目录；静态数据通常存储在.json后缀文件里，例如自动生成的example.json

测试代码文件，默认位于cypress/integration路径下，也可以配置到另一个目录中，且以如下后缀的文件均会被Cypress视为测试文件

  .js文件:普通的JavaScript编写的文件

  .jsx文件:带有扩展的JavaScript文件，其中可能包含处理XML的ECMAScript

  .coffee文件:是一套JavaScript的转译语言，相对于JavaScript它的语法更严格

  .cjsx文件:CoffeeScript中的jsx文件

插件

Cypress独一无二的优点便是测试运行在浏览器之内，但也带来了问题，就是在浏览器之外的通信变得很困难，为了解决此类问题，Cypress提供了现成的插件，当然也可以自定义插件，默认情况下插件位于cypress/plugins/index.js中，也可以配置到另一个目录下，在每个测试文件运行之前，Cypress都会自动加载插件文件cypress/plugins/index.js

通常情况下，插件的应用包括：

动态更改来自cypress.json,cypress.env.json,CLI或系统环境变量等

修改特定浏览器的启动参数

将消息直接从测试代码传递到后端

Support

该路径下通常放置可重用的配置，例如通用函数或全局默认配置等，默认位于cypress/support/index.js,也可以配置到另一个目录，每个测试文件运行之前，Cypress都会自动加载cypress/support/index.js

实际使用非常简单，只需要在cypress/support/index.js文件中使用beforeEach()函数即可，例如要实现每次测试运行前打印出所有的环境变量，如下代码所示

```javascript
beforeEach(function(){
	cy.log('当前环境变量为${JSON.stringify(Cypress.env())}')
})
```

Cypress不仅支持用户自定义文件结构，还支持用户自定义Cypress的各项配置，Cypress通过cypress.json文件来实现各项配置的自定义，当一个项目被添加到Cypress中后，该文件就会被创建在与Cypress同级目录下，它用来保存projectId和任何用户定义的配置信息

全局配置项

配置项	默认值	描述
baseUrl	null	通常就设置为系统主域名
env	{ }	任何想用作环境变量的变量就都可以设置在env里
ignoreTestFiles	*.hot-update.js	忽略某些测试用例，被此选项规则匹配的测试用例不会被执行
numTestsKeptInMemory	50	保留在内存中的测试用例(主要是快照和命令数据)条数，默认50，过大将消耗大量内存
port	null	Cypress占用的端口号，默认随机生成
reporter	spec	在Cypress运行期间使用哪个reporter，例如Mocha内置的reporter，teamcity和junit等
reporterOptions	null	reporter支持的选项配置
testFiles	**/*.*	要加载的测试文件，可以指定具体文件，也可以模糊匹配
watchForFIleChanges	true	Cypress在运行中自动检测文件变化，当文件有变化时，则自动重新运行受影响的测试用例

超时

配置项	                             默认值	描述
defaultCommandTimeout4000	命令默认超时时间，单位毫秒
execTimeout	                   60000	在cy.exec()命令执行期间，等待系统命令完成执行的超时时间，单位毫秒
taskTimeout	                   60000	在cy.task()命令执行期间，等待任务完成执行的超时时间，单位毫秒
pageLoadTimeoutpage	60000	等待页面加载或cy.visit()，cy.go()，cy.reload()命令触发其页面加载事件的超时时间，单位毫秒
requestTimeout	             5000	等待cy.wait()命令中的XHR请求发出的超时时间，单位毫秒
responseTimeout	        30000	cy.request(),cywait(),cy.fixture(),cy.getCookie(),cy.getCookies(),cy.setCookie(),cy.clearCookie(),cy.clearCookies()和cy.screenshot()命令的响应超时时间，单位毫秒

除了直接在cypress.json文件里更改配置项之外，Cypress还允许使用Cypress.config()去获取或者覆盖某些配置项，语法如下

```javascript
// 获取所有config信息
Cypress.config()
// 获取指定配置项的信息
Cypress.config(name)
// 更改指定配置项的默认值
Cypress.config(name, value)
// 使用对象字面值设置多个配置项
Cypress.config(object)
```

### 元素定位

在使用其他测试框架的时候例如Selenium、Appium等一定遇到过应用元素ID或者类是动态生成的或者使用了CSS定位，但在开发过程中CSS发生了变化，为了解决这类问题Cypress提供了data-*属性，它包含3个定位器data-cy、data-test、data-testid，data-*属性是Cypress转有定位器，仅用来测试，与元素的行为和样式无关，意味着即使CSS样式或JS行为改变也不会导致测试代码执行失败

```html
//为button添加data-cy属性
<button id="main" class="btn" data-cy="submit">Submit</button>
//为button添加data-test属性
<button id="main" class="btn" data-test="submit">Submit</button>
//为button添加data-testid属性
<button id="main" class="btn" data-testid="submit">Submit</button>
```

获取

```javascript
//使用data-cy属性
cy.get("[data-cy=submit]").click()
//使用data-test属性
cy.get("[data-test=submit]").click()
//使用data-testid属性
cy.get("[data-testid=submit]").click()
```

### 常规选择器

```javascript
//使用button的id属性定位
cy.get("#main").click

//使用button的class属性定位
cy.get(".btn").click()

//使用button的id属性定位
cy.get('[button[id="main"]').click()

//:nth-child(n)选择器匹配其父元素的第n个子元素，不论元素类型
cy.get('li:nth-child(1)').click()

// jquery 的$选择器
//Cypress查找元素，selector使用id
Cypress.$('#main')
//等同于
cy.get('#main')
```

### 辅助方法

```javascript
//找出dom的所有父元素
cy.get('#id').parents()

//仅沿DOM树向上移动一个级别，获取的是指定DOM元素的第一层父元素
cy.get('#id').parent()

//.siblings()方法用来获取DOM元素的所有同级元素
cy.get('#id').siblings()

//.first()方法用来匹配给定DOM对象集的第一个元素
cy.get('#id').first()
```

https://blog.51cto.com/davieyang/3061198?b=totalstatistic

### 断言

Cypress的断言基于Chai断言库，并且增加了对Sinon-Chai、Chai-jQuery断言库的支持，并且Cypress支持多种风格的断言包括BDD风格(expect/should)和TDD风格(assert)格式的断言

针对长度的断言

```javascript
//重试, 直到找到3个匹配的<li.selected>
cy.get('li.selected').should('hava.length',3)
```

针对类的断言

```javascript
//重试，直到input元素没有类被disabled为止或直到超时为止
cy.get('form').find('input').should('not.hava.clacc', 'disabled')
```

针对值的断言

```javascript
//重试，直到textarea的值为'davieyang'
cy.get('testarea').should('hava.value', 'davieyang')
```

针对文本内容的断言

```javascript
//重试，知道这个span不包含“click me”字样
cy.get('a').parent('span.help').should('not.contain', 'click me')
```

针对元素是否可见的断言

```javascript
//重试，直到这个button可见为止
cy.get('button').should('be.visible')
```

针对元素是否存在的断言

```javascript
//重试，直到id为loading的空间不存在
cy.get('#loading').should('not.exist')
```

针对元素状态的断言

```javascript
//重试，直到这个radio button是选中状态为止
cy.get(':radio').should('be.checked')
```

针对CSS的断言

```javascript
//重试，直到completed的这个类有匹配的CSS为止
cy.get('.completed').should('hava.css', 'text-decoration', 'line-through')
```

### 测试框架

Cypress将Mocha硬编码在框架中，因此在Cypress中编写的所有测试用例都基于Mocha提供的如下基本模块

describe(): 测试套件，在其中可以设定context()，可以包含多个测试用例it()，也可以嵌套测试套件

it():用于描述测试用例，一个测试套件可以不包括任何钩子函数Hook,但必须包含至少一个测试用例it()

context():是decribe()的别名，其行为方式与describe()相同，使用context()只是提供一种使测试更易于阅读和组织的方式

before()

beforeEach()

afterEach()

after()

.only()

.skip()

对于一条可执行的测试而言，describe()和it()是两个必要的组成部分，除了这两个功能模块外，其他功能模块对于一条可执行的测试来说都是可选的

Cypress底层依赖于很多优秀的开源测试库，其中比较重要的就是Mocha，它是一个适用于Node.js和浏览器的测试框架，它使得异步测试变得简单灵活；而JavaScript是单线程异步执行的，这就产生了一种复杂的场景，因为异步往往无法直接判断函数的返回值是否符合预期，要验证异步函数的正确与否，就需要测试框架支持回调，利用Promise或者其他方式来验证异步函数的正确性，而Mocha就提供了出色的异步支持包括Promise

Cypress继承并扩展了Mocha对异步的支持，而Mocha提供了多种接口来定义测试套件，Hooks和Individual tests，即BDD、TDD、Exports、Qunit和Require

Cypress采用了Mocha的BDD语法



## Playwright

Playwright是由微软公司2020年初发布的新一代自动化测试工具，相较于目前最常用的Selenium，它仅用一个API即可自动执行Chromium、Firefox、WebKit等主流浏览器自动化操作。作为针对 Python 语言纯自动化的工具，在回归测试中可更快的实现自动化。

据说Playwright团队是微软把puppeteer团队挖过去做的，所以基本上puppeteer的特性Playwright都有，并在puppeteer基础上做了很多优化。

简而言之，您可以编写打开浏览器的代码，用代码实现使用所有网络浏览器的功能。自动化脚本可以实现**导航到URL、输入文本、单击按钮和提取文本**等功能。Playwright最令人惊喜的功能是它可以**同时处理多个页面且不用等待，**也不会被封锁。

Playwright**支持大多数浏览器，**例如Google Chrome、Firefox、使用Chromium内核的Microsoft Edge和使用WebKit内核的Safari。**跨浏览器的网络自动化**是Playwright的强项，可以为所有浏览器有效地执行相同的代码。此外，Playwright**支持各种编程语言，**例如Node.js、Python、Java和.NET。您可以编写代码用于打开网站并使用这些语言中的任何一种与之交互。

Playwright的文档内容非常详细，覆盖面广。它**涵盖了从入门到高级的所有类和方法。**

playwright可以通过录制的功能将你对浏览器的操作录制下来直接生成代码，极大地提高了开发效率。我想，这对新手也极其友好，不会写的操作就直接录制生成。

playwright的优势

（1） Selenium需要通过WebDriver操作浏览器；Playwright通过开发者工具与浏览器交互，安装简洁，不需要安装各种Driver。

（2） Playwright几乎支持所有语言，且不依赖于各种Driver，通过调用内置浏览器所以启动速度更快。

（3） Selenium基于HTTP协议（单向通讯），Playwright基于Websocket（双向通讯）可自动获取浏览器实际情况。

（4） Playwright为自动等待。

- 等待元素出现（定位元素时，自动等待30s，等待时间可以自定义，单位毫秒）
- 等待事件发生

- playwright是一个进程外自动化驱动程序，它不受页面内JavaScript执行范围的限制，可以自动化控制多个页面。
- 强大的网络控制：Playwright 引入了上下文范围的网络拦截来存根和模拟网络请求。
- 现代web特性：支持Shadow DOM选择，元素位置定位，页面提示处理，Web Worker等Web API。
- 覆盖所有场景：支持文件下载、上传、OOPIF（out-of-process iframes），输入、点击，暗黑模式等。

局限性

（1） Playwright不支持旧版Microsoft Edge或IE11。支持新的Microsoft Edge（在Chromium上）；所以对浏览器版本有硬性要求的项目不适用。

（2） 需要SSL证书进行访问的网站可能无法录制，该过程需要单独定位编写。

（3） 移动端测试是通过桌面浏览器来模拟移动设备（相当于自带模拟器），无法控制真机。

### python版本

使用

安装playwright，需要python 3.7以上

```shell
pip install playwright
```

安装Chromium、Firefox、WebKit等浏览器的驱动文件（内置浏览器）

```shell
python -m playwright install
```

自动录制

从起始页为xingzheai.cn开始录制

```shell
python -m playwright codegen https://xingzheai.cn/
```

打开xingzheai.cn，用Chromium驱动，将结果保存为my.py的python文件

```shell
python -m playwright codegen --target python -o 'my.py' -b chromium https://xingzheai.cn/
```

- -target：规定生成脚本的语言，有JS和Python两种，默认为Python
- -b：指定浏览器驱动
- -o：将录制的脚本保存到一个文件

网络拦截

```python
page = context.newPage()
def Whether_intercept() -> bool:
    return True  #进行拦截
# return False #不进行拦截

def handler(route:Route):
    print(route.request.url)
    #正常访问
    # route.continue_()
    #拒绝访问
    # route.abort("网络拦截")
    # 重定向到非目标地址
    route.fulfill(
        status=302,
        headers={
            'Location' : "https://xingzheai.cn/"
        }
    )
page.route(Whether_intercept,handler)
```

同步执行

```python
#依次打开三个浏览器，前往行者官网，截图后退出。
from playwright import sync_playwright with sync_playwright() as p:
    for browser_type in [p.chromium, p.firefox, p.webkit]:
         # 指定为有头模式，Ture为无头模式
        browser = browser_type.launch(headless=False)
        page = browser.newPage()
        page.goto('https://xingzheai.cn/')
        # 等待页面加载完全后截图
        page.waitForSelector("text=智能内容审核")
        page.screenshot(path=f'example-{browser_type.name}.png')
        browser.close()
```

异步执行

```python
#同时进行三个浏览器操作
import asyncio
from playwright import async_playwright
async def main():
    async with async_playwright() as p:
        for browser_type in [p.chromium, p.firefox, p.webkit]:
                browser = await browser_type.launch()
            page = await browser.newPage()
            await page.goto('https://xingzheai.cn/')
                await page.waitForSelector("text=智能内容审核")
                await page.screenshot(path=f'example-{browser_type.name}.png')
                await browser.close()
               asyncio.get_event_loop().run_until_complete(main())
```

使用异步API需要导入asyncio库，它是一个可以用来实现Python协程的库



### Nodejs

安装

```shell
npm i -D playwright
```

录制生产代码

```javascript
npx playwright codegen wikipedia.org -o test.js
```

录制命令的其他参数

- `-o, --output <file name>` ：保存生成脚本
- `--target <language>` ：生成的脚本语言，可以设置javascript, test, python, python-async和csharp，默认为python。
- `-b, --browser <browserType>` ：要使用的浏览器，可以选择cr, chromium, ff, firefox, wk和webkit，默认chromium。
- `--channel <channel>`：chromium版本，比如chrome, chrome-beta, msedge-dev等，
- `--color-scheme <scheme>`：模拟器的颜色主题，可选择light 或者 dark样式。
- `--device <deviceName>` ：模拟的设备，比如iPhone 11。
- `--save-storage <filename>` ：保存上下文状态，用于保存cookies 和localStorage，可用它来实现重用。例如`playwright codegen --save-storage=auth.json`
- `--load-storage <filename>` ：加载`--save-storage` 保存的数据，重用认证数据。
- `--proxy-server <proxy>` ：指定代理服务器
- `--timezone <time zone>` ： 指定时区
- `--geolocation <coordinates>` ：指定地理位置坐标
- `--lang <language>` ：指定语言/地区，比如中国大陆：zh-CN
- `--timeout <timeout>` ：超时时间，定位毫秒，默认10000ms
- `--user-agent <ua string>` ：用户代理
- `--viewport-size <size>` ：浏览器窗口大小
- `-h, --help` ：查看帮助信息

默认是无头模式，设置有头模式

```javascript
const { chromium } = require('playwright');//引用模拟浏览器
 
(async () => {
  const browser = await chromium.launch({ headless: false, slowMo: 50 });//模拟打开浏览器,设置有头模式，并通过slowMo属性减慢浏览器的每一步操作
  const context = await browser.newContext();//建立context
  const page = await context.newPage();//模拟打开一个浏览器的标签页
  await page.goto('https://www.baidu.com/');//模拟访问网站url
  await page.screenshot({ path: `example.png` });//对网页进行截图并保存为example.png
  await page.close();//关闭网页
  await context.close();//关闭context
  await browser.close();//关闭浏览器
})();
```

模拟移动浏览器

```javascript
const { chromium,devices } = require('playwright');//引用模拟浏览器
(async () => {
  const browser = await chromium.launch({ headless: false, slowMo: 50 });//模拟打开浏览器,设置有头模式，并通过slowMo属性减慢浏览器的每一步操作
  const phoneD = devices['iPhone 11'];//得到一个模拟移动设备
  const context = await browser.newContext({ ...phoneD });//建立context，并设置模拟仿真移动设备
  const page = await context.newPage();//模拟打开一个浏览器的标签页
  await page.goto('https://www.baidu.com/');//模拟访问网站url
  await page.screenshot({ path: `example.png` });//对网页进行截图并保存为example.png
  await page.close();//关闭网页
  await context.close();//关闭context
  await browser.close();//关闭浏览器
})();
```

API

大部分操作都是在**page**层面的，所以**page**有最多的函数

```javascript
page.click(selector, **kwargs)
page.content()      # 获取页面的html
page.screenshot(**kwargs)
page.goto(url, **kwargs)
page.pdf(**kwargs)
page.reload(**kwargs)
page.wait_for_timeout(timeout)
page.get_attribute(selector, name, **kwargs)

// page的expect_**函数需要注意
// 这个类型的函数一般都伴随这with使用
// 下面这个例子就是点击按钮后，改变了页面框架
with page.expect_event("framenavigated") as event_info:
    page.click("button")
frame = event_info.value
// 这样的还有很多，比如，大都用在交互的对象改变的情况下
page.expect_file_chooser(**kwargs)
page.expect_navigation(**kwargs)
page.expect_popup(**kwargs)

// 个人推荐注意这几个is的方法，在等待页面的时候很有用
page.is_disabled/(selector, **kwargs)
is_editable，is_enabled，is_hidden，is_visible

// 还有一个特殊的方法
page.locator(selector)      // 定位页面元素，返回的是locator对象
```



**frame**的操作大部分跟**page**一样，只不过**frame**是**page**下一级的，可以理解为在page里嵌套的一个小页面。但是还是有一点不一样。 **page**里分为主框架和子框架，

选择器

**Playwright**可以通过`css`,`XPath`,`HTML`等选择元素，像`id`,`data-test-id`，或者像上面演示的，通过text内容。 这里有一些例子

```javascript
// Using data-test-id= selector engine
page.click('data-test-id=foo')

// CSS and XPath selector engines are automatically detected
page.click('div')
page.click('//html/body/div')

// Find node by text substring
page.click('text=Hello w')

// 通过 >> 链接相同或不同的选择器
// Click an element with text 'Sign Up' inside of a #free-month-promo.
page.click('#free-month-promo >> text=Sign Up')
```

所有的操作都会等待元素可见，或者可操作之后才会进行，也就是自带等待时间，但是如果要自己加等待的话不推荐使用`time.sleep(5)`，而是用`page.wait_for_timeout(5000)`。 这里也可以使用page的wait操作

```javascript
page.wait_for_event(event, **kwargs)
page.wait_for_function(expression, **kwargs)
page.wait_for_load_state(**kwargs)
page.wait_for_selector(selector, **kwargs)
page.wait_for_timeout(timeout)
page.wait_for_url(url, **kwargs)
```

像 page.evaluate(expression, **kwargs) 这样的剧作家评估方法采用单个可选参数。 此参数可以是 Serializable 值和 JSHandle 或 ElementHandle 实例的混合。 句柄会自动转换为它们所代表的值。

```javascript
// A primitive value.
page.evaluate('num => num', 42)

// An array.
page.evaluate('array => array.length', [1, 2, 3])

// An object.
page.evaluate('object => object.foo', { 'foo': 'bar' })

// A single handle.
button = page.query_selector('button')
page.evaluate('button => button.textContent', button)

// Alternative notation using elementHandle.evaluate.
button.evaluate('(button, from) => button.textContent.substring(from)', 5)

// Object with multiple handles.
button1 = page.query_selector('.button1')
button2 = page.query_selector('.button2')
page.evaluate("""o => o.button1.textContent + o.button2.textContent""",
    { 'button1': button1, 'button2': button2 })

// Object destructuring works. Note that property names must match
// between the destructured object and the argument.
// Also note the required parenthesis.
page.evaluate("""
    ({ button1, button2 }) => button1.textContent + button2.textContent""",
    { 'button1': button1, 'button2': button2 })

// Array works as well. Arbitrary names can be used for destructuring.
// Note the required parenthesis.
page.evaluate("""
    ([b1, b2]) => b1.textContent + b2.textContent""",
    [button1, button2])

// Any non-cyclic mix of serializables and handles works.
page.evaluate("""
    x => x.button1.textContent + x.list[0].textContent + String(x.foo)""",
    { 'button1': button1, 'list': [button2], 'foo': None })
```

监听事件

通过page.on(event, fn) 可以来注册对应事件的处理函数

```javascript
function log_request(intercepted_request) {
    console.log("a request was made:", intercepted_request.url)
}
page.on("request", log_request)
// sometime later...
page.remove_listener("request", log_request)
```

browser是一个Chromium实例，创建实例其实是比较耗费资源的，Playwright支持在一个browser实例下创建多个浏览器上下文（BrowserContext），BrowserContext的创建速度很快，并且比创建browser实例消耗资源更少。

一个浏览器上下文可以有多个页面，也就是多个窗口。

#### 页面存储

通过context获取页面的localStorage、sessionStorage和cookie

```javascript
// Save storage state and store as an env variable
const storage = await context.storageState();
process.env.STORAGE = JSON.stringify(storage);

const cookie = await context.cookies()
```

在页面刚开始注入脚本

```javascript
// Set session storage in a new context
const sessionStorage = process.env.SESSION_STORAGE;
await context.addInitScript(storage => {
  if (window.location.hostname === 'example.com') {
    const entries = JSON.parse(storage);
    Object.keys(entries).forEach(key => {
      window.sessionStorage.setItem(key, entries[key]);
    });
  }
}, sessionStorage);
```

#### 路由拦截

通过 context.route, 还可以伪造修改拦截请求等。比如说，拦截所有的图片请求以减少带宽占用

```javascript
context.route("**/*.{png,jpg,jpeg}", lambda route: route.abort())
context.route(re.compile(r"(\.png$)|(\.jpg$)"), lambda route: route.abort())

browser.close()
```



#### 请求/响应

```javascript
page.on("request", lambda request: print(">>", request.method, request.url))
page.on("response", lambda response: print("<<", response.status, response.url))
```

#### 代理

Playwright 还可以很方便地设置代理。Puppeteer 在打开浏览器之后就无法在更改代理了，对于爬虫类应用非常不友好，而 Playwright 可以通过 Context 设置代理，这样就非常轻量，不用为了切换代理而重启浏览器

```javascript
context = browser.new_context(
    proxy={"server": "http://example.com:3128", "bypass": ".example.com", "username": "", "password": ""}
)
```



### Playwright test

因为Playwright Test是微软推出的匹配playwright测试工具的测试框架，匹配度和功能度上都更完整更好用，所以我们选择了Playwright Test测试框架。

此外还有别的推荐适配的第三方测试框架

- Playwright Test
- Jest / Jasmine
- AVA
- Mocha
- Multiple Browsers

安装

```shell
yarn add playwright  @playwright/test typescript ts-node
```

配置package.json

```json
{ 
    ... 
    "scripts": { "test": "playwright test" }
}
```

公共配置playwright.config.ts

```typescript
import { PlaywrightTestConfig } from "@playwright/test"; 
let config: PlaywrightTestConfig = { 	
     timeout: 6 * 60 * 1000,  // 每个测试用例超时 
     globalTimeout: 60 * 1000, // 总超时     
     testDir: "./demo",//测试目录     
     reporter: [["html", { outputFolder: "./", open: "always" }]],//测试报告 	
     use: { 		
        launchOptions: { 			
        headless: false, //不是无头模式 			
        // recordVideo:'videos' 			
        // recordVideo 			
        // devtools: true, 		
    }, 		
    contextOptions: { 			
    viewport: {   //窗口视野大小 				
        width: 1400,   				
        height: 900, 			
    }, 		
  }, 		
    //baseURL: process.env.TENANT_URL, // 基础URL           
    screenshot: "only-on-failure", // 失败时截屏 	   
    trace: "retain-on-failure",// 失败时跟踪记录 	       
    browserName: "webkit", // 测试浏览器  	
    }, 
};
export default config;
```

配合playwright编写测试用例

配置登陆页面等，实现UI交互层与业务代码分离

```typescript
//UI交互层代码 
import { Page } from "playwright"; 
export class TestOperationPanel { 
    protected page: Page; 
    constructor(page: Page) { 
        this.page = page;
    } 
    /** * 加载测试的网址 */ 
    goTestUrl = async (url: string) => { 
      /**跳转地址**/ 
      await this.page.goto(url);
      /**等待页面加载**/ 
      await this.page.waitForLoadState(); 
    };
    /** * 搜索指定内容 */ 
    searchContent = async param => { 
      /**在输入框中填充搜索字段**/ 
      await this.page.locator(".s_ipt").fill(param); 
      /**在输入框中回车触发搜索**/ 
      await this.page.locator(".s_ipt").press("Enter");
      /**等待页面加载**/ 
      await this.page.waitForLoadState(); 
      /**返回搜索内容第一项的内容**/ 
      const result = await this.page.locator('//div[@id="1"]/h3//em').textContent(); 
      return result; 
    }
}
```

兼容不同系统开启浏览器函数

```typescript
import os from "os"; 
import fs from "fs";
/** * 判断操作系统决定lanuch条件 * @returns */ 
export function judgeSystem() { 
  const osType = os.type(); 
  if (osType === "Darwin") { 
    /**macOS系统下测试浏览器的配置 */ 
        return { 
          executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", //浏览器地址 
        }; 
  } 
  if (osType === "Linux") { 
    /**Linux系统下测试浏览器的配置 */ 
    return {  devtools: true  } 
  }
  if (osType === "Windows_NT") {
    /**windows系统下测试浏览器的配置 */ 
    return {  devtools: true  } 
  } 
}
```

编写主测试流程

```typescript
import { expect, test } from "@playwright/test"; 
import { chromium } from "playwright"; 
import { TestOperationPanel } from "./TestOperationPanel"; 
import { judgeSystem } from "./config"; 

let  testOperation: TestOperationPanel, browser, page, context; 
/**测试用例组**/ 
test.describe("Playright-demo", async function () { 
  /**运行所有测试用例前的函数**/ 
  test.beforeAll(async ({ browserName }, testConfig) => { 
    /**判断系统类型配置**/ 
    const launch = await judgeSystem(); 
    /**创建浏览器**/ 
    browser = await chromium.launch(launch); 
    /**创建窗口**/ 
    context = await browser.newContext(); 
    /**创建界面**/ 
    page = await context.newPage(); 
    /**创建UI交互配置代码实例**/ 
    testOperation = new TestOperationPanel(page); 
  }); 
  
  /**运行每个测试用例前的函数**/ 
  test.beforeEach(async function () { 
    /**跳转地址**/ 
    await testOperation.goTestUrl("http://www.baidu.com"); 
  }); 
  
  /**测试用例**/ 
  test("搜索Playwright", async function () { 
    /**搜索指定内容**/ 
    const result = await testOperation.searchContent("playwright"); 
    /**断言校验匹配的内容**/   
    expect(result).toMatch(/^playwright/); 
  }); 
  
  /**运行所有测试用例后的函数**/ 
  test.afterAll(async function ({ browser }) { 
    /**关闭浏览器**/
    await browser.close()
  });
});
```





## Puppeteerjs

Puppeteer 是 Chrome 开发团队在 2017 年发布的一个 Node.js 包，用来模拟 Chrome 浏览器的运行。

Chrome DevTool Protocol

- CDP 基于 WebSocket，利用 WebSocket 实现与浏览器内核的快速数据通道
- CDP 分为多个域（DOM，Debugger，Network，Profiler，Console...），每个域中都定义了相关的命令和事件（Commands and Events）
- 我们可以基于 CDP 封装一些工具对 Chrome 浏览器进行调试及分析，比如我们常用的 “Chrome 开发者工具” 就是基于 CDP 实现的
- 如果你以 remote-debugging-port 参数启动 Chrome，那么就可以看到所有 Tab 页面的开发者调试前端页面，还会在同一端口上还提供了 http 服务，主要提供以下几个接口

```json
GET /json/version                     # 获取浏览器的一些元信息
GET /json or /json/list               # 当前浏览器上打开的一些页面信息
GET /json/protocol                    # 获取当前 CDP 的协议信息   
GET /json/new?{url}                   # 开启一共新的 Tab 页面
GET /json/activate/{targetId}         # 激活某个页面成为当前显示的页面
GET /json/close/{targetId}            # 关闭某个页面
GET /devtools/inspector.html          # 打开当前页面的开发者调试工具
WebSocket /devtools/page/{targetId}   # 获取某个页面的 websocket 地址
```

Headless Chrome

- 在无界面的环境中运行 Chrome
- 通过命令行或者程序语言操作 Chrome
- 无需人的干预，运行更稳定
- 在启动 Chrome 时添加参数 --headless，便可以 headless 模式启动 Chrome

Puppeteer

- Puppeteer 是 Node.js 工具引擎
- Puppeteer 提供了一系列 API，通过 Chrome DevTools Protocol 协议控制 Chromium/Chrome 浏览器的行为
- Puppeteer 默认情况下是以 headless 启动 Chrome 的，也可以通过参数控制启动有界面的 Chrome
- Puppeteer 默认绑定最新的 Chromium 版本，也可以自己设置不同版本的绑定
- Puppeteer 让我们不需要了解太多的底层 CDP 协议实现与浏览器的通信

Puppeteer能做的事情

- 网页截图或者生成 PDF
- 爬取 SPA 或 SSR 网站
- UI 自动化测试，模拟表单提交，键盘输入，点击等行为
- 捕获网站的时间线，帮助诊断性能问题
- 创建一个最新的自动化测试环境，使用最新的 js 和最新的 Chrome 浏览器运行测试用例
- 测试 Chrome 扩展程序

常用api

- **Browser**： 对应一个浏览器实例，一个 Browser 可以包含多个 BrowserContext
- **BrowserContext**： 对应浏览器一个上下文会话，就像我们打开一个普通的 Chrome 之后又打开一个隐身模式的浏览器一样，BrowserContext 具有独立的 Session(cookie 和 cache 独立不共享)，一个 BrowserContext 可以包含多个 Page
- **Page**：表示一个 Tab 页面，通过 browserContext.newPage()/browser.newPage() 创建，browser.newPage() 创建页面时会使用默认的 BrowserContext，一个 Page 可以包含多个 Frame
- **Frame**: 一个框架，每个页面有一个主框架（page.MainFrame()）,也可以多个子框架，主要由 iframe 标签创建产生的
- **ExecutionContext**： 是 javascript 的执行环境，每一个 Frame 都一个默认的 javascript 执行环境
- **ElementHandle**: 对应 DOM 的一个元素节点，通过该该实例可以实现对元素的点击，填写表单等行为，我们可以通过选择器，xPath 等来获取对应的元素
- **JsHandle**：对应 DOM 中的 javascript 对象，ElementHandle 继承于 JsHandle，由于我们无法直接操作 DOM 中对象，所以封装成 JsHandle 来实现相关功能
- **CDPSession**：可以直接与原生的 CDP 进行通信，通过 session.send 函数直接发消息，通过 session.on 接收消息，可以实现 Puppeteer API 中没有涉及的功能
- **Coverage**：获取 JavaScript 和 CSS 代码覆盖率
- **Tracing**：抓取性能数据进行分析
- **Response**： 页面收到的响应
- **Request**： 页面发出的请求

https://zhuanlan.zhihu.com/p/76237595

### cucumberjs

Cucumber是基于BDD模式的可执行规范（Executable Specifications）的开源工具。行为驱动开发（Behavior-driven development）是一种敏捷开发的技术，鼓励开发者、测试以及非技术人员之间的协作。

Cucumber除了自动化验收测试以外，更重要的是能够使用统一的语言在团队的技术与非技术人员之间建起一座沟通的桥梁。

- 可执行性（Executable）：您可以像执行代码（Java、Ruby…）一样运行这些规范，来验证、验收目标应用。当然，这一点是从技术人员的视角来看的；

- 规范性（Specification）：从非技术人员的视角触发，相比验证本身，他们更加关心系统功能的清晰描述：系统在什么场景下能够做什么样的事情。

Cucumber有多种语言实现的版本，并且可以集成到主流测试框架中。在这里我们使用的是JavaScript的版本——CucumberJS。

执行测试用例后，可以使用开源的cucumber报告工具来查看生成的报告。如下是常用的[`cucumber-reporter`](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fdamianszczepanik%2Fcucumber-reporting)

[`macaca`](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Falibaba%2Fmacaca)是阿里开源的一款基于`cucumber`的多端自动化解决方案。它提供了一系列的解决方案，包括计算机视觉（openCV等）、mock方案、页面元素检查工具、报告器、持续集成等生态建设。

`macaca-reporter`会生成如下的脑图模式的报告结果，比常规的`cucumber-reporter`更简洁好看。



## Taiko

Taiko是一个**免费**的**开源浏览器自动化工具**，由ThoughtWorks开发。它是一个node的库，Taiko使用Chrome Devtools API，它是为测试现代web应用程序而构建的。

所以对于Taiko来说： 1、它是为测试**Web应用**而生 2、它基于Chrome浏览器

安装taiko

```shell
npm install -g taiko
```

接下来输入 `openBrowser()`，您将看到taiko会开启一个浏览器。 然后执行 `goto("baidu.com")`,浏览器将跳转到百度首页。然后再次执行 `write("博客园 句幽")`，浏览器将在输入框内填充对于的内容。最后执行`click("百度一下")`，将模拟操作点击一下搜索。

接下来输入 `.code` ，您将看到刚才操作步骤的代码。 这是taiko为您自动生成的。

在VS Code中新建文件“first-case.js”。然后将刚才taiko为我们生成的代码拷贝下来，复制到文件中。

此时该文件中的内容就相当于完成了我们第一个Case： “打开浏览器，输入内容，点击搜索”。

也就是说 taiko 其实就是为咱们提供了这些基于浏览器的基础操作指令，而我们就可以用这些各种命令进行排列组合，完成对应的操作。比如 “点击”、“按压”、“输入”、“选择元素”等等操作，而这些所有的操作命令都在 [taiko 官网](https://taiko.dev/) 为我们标注出来了。我们只需要选取需要的命令进行操作就可以了。

比如咱们更改一下操作:

> await openBrowser();
> await goto("baidu.com");
> await write("句幽 博客园");
> await link('句幽- 博客园').exists();
> await click(link('句幽- 博客园'));

这样将会在百度搜索句幽的博客园，然后在点击跳转到句幽的博客园。

而这每一个步骤都将会有一个验证，比如`await link('句幽- 博客园').exists();`，如果该页面没有获取到名称为"句幽- 博客园"的元素，将会验证失败。

而将这些步骤都转换为js代码，放置在咱们的`first-demo.js` 文件中，然后在终端运行:

> taiko first-demo.js



### Gauge

taiko 它提供了各类操作浏览器的命令，供我们排列组合完成模拟操作，最终得到自动化测试结果。

那么您觉得它够简单吗？如果要和团队一同维护和编辑用例，它很方便吗？ 显然不太好用。

所以此刻我们将介绍另外的一个工具：Gauge。 它将以 taiko 提供的命令操作为基础，用更自然的操作方式来完成对应的操作。

安装

```shell
npm install -g @getgauge/cli
```

运行完成之后就完成了Gauge的安装。当然在Gauge的官网，它还提供了一个[安装包](https://docs.gauge.org/getting_started/installing-gauge.html?os=windows&language=csharp&ide=vscode)。 以何种方式安装取决于你，不过此处我强烈建议您使用 npm的安装方式。

Gauge还提供了vs code的扩展支持，您可以在VS Code的扩展中（最左侧按钮）进行安装。

Gauge它充当着一个什么样的角色： 首先要明白，taiko为我们操作浏览器提供了便捷的指令，它使用js来编写。但是这就为咱们测试团队建立了一个障碍，首先全员都得熟悉JS的写法，比如`await`等关键字等等，这无形提高了技术操作门槛。还有一点，我们所有的案例都将已大量js片段代码来维护，无疑增大了维护成本。

那么gauge干了一个什么操作呢？ 它建立于taiko之上，允许测试人员将某某关键词与某段JS相对应,比如（"跳转" 对应 taiko 的`Goto`）。 这样有什么好处呢？ 团队并不需要全员掌握JS了。频繁的操作用例可以统一为共同的指令，增加可维护性。

比如有一个跳转的命令，在js文件中

```javascript
step("Goto getgauge github page", async () => {
    await goto('https://github.com/getgauge');
});
```

也就是说'Goto getgauge github page' 对应着 taiko 的操作 **await goto('https://github.com/getgauge');**。

然后再看看`specs`文件夹下面的`example.spec`。对应部分为:

\* Goto getgauge github page

这样，用例编写人员只需要写出这样的语句就可以完成操作了。而测试团队中的某一小部分人员，负责js对应关系的编写，功能测试人员负责用例的编写，就能很快的完成测试工作。

接下来我们来尝试使用它，在`test`文件夹下面的`step_implementation.js` 文件中增加语句:

```javascript
step("跳转到句幽博客", async () => {
    await goto("baidu.com");
    await write("句幽 博客园");
    await link('句幽- 博客园').exists();
    await click(link('句幽- 博客园'));
});
```

这部分代码熟悉吗？ 这是咱们刚开始使用taiko所写的代码。现在我们将它包裹起来，对应到了`跳转到句幽博客` 这一指令。然后再到`specs`文件夹下面的`example.spec`添加对应操作

\## 跳转测试
\* 跳转到句幽博客

文本指令 Gauge 采用了MarkDown的写法。我们现在无需过去去了解markdown，只需要知道在spec文件中： `#` 代表的测试项目名，比如您可以命名（# 考勤分析测试），而`##` 代表了测试用例，比如您可以命名(## 添加考勤人员)。 `*` 代表了步骤，步骤的名称来源于您从js文件里的关键词对应。

在终端里输入

```shell
gauge run [你的spec的文件名]
```

就可以进行测试，最终生成测试报告。

如果您安装了VS Code的Gauge插件，那么在进入'.spec'文件后，您可以看到每一个用例上都有一个运行的按钮。点击就可以执行用例。

https://www.cnblogs.com/uoyo/p/12401366.html



## 其他自动化测试框架介绍

Selenium/WebDriver

- Selenium作为应用范围最广泛的UI自动化测试工具，在Selenium1的时代也就是Selenium RC，其工作原理是通过把Selenium Core注入浏览器的方式来控制浏览器，现在Selenium1已经被Selenium WebDriver取代
- Selenium WebDriver已经到了4.x时代，它运行在浏览器中，通过调用浏览器原生API来实现对浏览器的控制，因为调用的是浏览器原生API，所以对于同样的元素操作，Selenium需要针对不同的浏览器提供相应的WebDriver
- Selenium IDE，它是以插件的形式存在，作为一个集成开发环境，它提供了简介的页面，并提供了录制和导出不同语言代码的功能
- Selenium-Grid，它通常跟持续集成工具配合使用，允许用户并行运行测试并且允许分布式执行测试任务

Karma

Karma不是一个测试框架，它只是基于Node.js的一个JavaScript测试运行器，Karma基于Client/Server架构，可以用来测试所有主流的浏览器，它允许Web开发人员在简单的配置后立刻开始测试，Karma的一个强大的特性是它设置了一个文件监听器，允许代码发生更改时自动重新运行测试脚本

服务器端(Server)，是系统的主要部分，它保持所有状态（例如关于捕获的客户端的信息，当前在文件系统上运行的测试或文件）和基于该状态的可进行的操作，它包含如下部分：

- Manager:负责与客户端的双向通信，例如通过广播启动一次测试，收集来自客户端的测试结果等
- FS Watcher:负责观察文件系统(FS)，它维护测试项目的内部模型(所有文件，它们所在的位置以及它们最后修改的时间戳),Web Server会使用此FS模型，以便向客户端提供正确的文件
- Reporter:负责将测试结果呈现给开发人员
- Web Server:负责提供客户端所需的所有静态数据，静态数据是客户端管理器的源代码，测试框架的源代码以及测试代码和测试中的实际代码

客户端(Client)，实际执行所有测试的地方，通常是指各种浏览器，它包含如下部分：

- Manager:负责与服务器端的双向通信，它处理来自服务器的所有消息（例如触发测试运行）并将它们传递给其他客户端组件(通常是测试框架)
- Testing Framework:Testing Framework不是该项目的一部分，Karma足够灵活，允许使用任何第三方测试框架
- Code Under Test & Test Code:测试框架运行的所有用户代码，它从Web Server获取并通过测试框架执行

工作流程

​       Karma在启动后，会加载插件和配置文件，然后启动本地的一个Web Server来监听所有的连接，在此过程中，所有已经连接上Server的浏览器会断开并重新连接，插件在加载的时候，一个监听浏览器的事件TestReporter将会被注册以用于后续的测试报告
​       接着Karma启动浏览器，并将初始页面设置为Karma服务器的URL，当有浏览器链接进来时，Karma会提供一个"client.html"页面给浏览器，此页面在浏览器中运行时，会通过websocket连接回Karma服务器
​       一旦服务器检测到websocket连接，就会通过websocket协议指示客户端执行测试：客户端页面打开一个iframe，其中包含来自服务器根据配置信息生成的“context.html”页面，该页面包括测试框架适配器，要测试的代码和测试代码
​       当浏览器加载context页面时，一个onload事件处理程序会通过PostMessage连接客户端页面和这个context页面，此时测试框架适配器会通过客户端页面来运行测试，报告错误或成功

​        发送到客户端页面的消息会通过websocket转发到Karma服务器，服务器将这些消息重新分派为浏览器事件，监听浏览器事件的Test Reporter通过监听浏览器事件获取数据，TestReporter可以打印这些数据，将其保存到文件，或将数据转发到另一个服务，由于数据是由测试框架适配器发送给Test Reporter的，因此适配器和Test Reporter几乎总是成对出现，如karma-jasmine和karma-jasmine-reporter

Nightwatch.js

Nightwatch.js是一个用于Web应用程序和网站的自动化测试框架，使用Node.js编写并使用W3C WebDriver API(即Selenium/WebDriver的底层协议)，它是一个完整的端到端测试解决方案，目的在于简化编写自动化测试和设置持续集成，Nightwatch还可以用于编写Node.js单元和集成测试

Nightwatch使用WebDriver API执行与浏览器自动化相关的任务，例如打开窗口，点击链接等等，Nightwatch通过CSS选择器或Xpath表达式来定位元素，Nightwatch的运行依赖于Selenium Standalone Server连接和WebDriver Service(浏览器驱动)，从Nightwatch1.0开始，Selenium Standalone Server不再是必备，除非需要针对于IE进行测试，或者需要使用Selenium Grid

Protractor

Protractor基于Angular和AngularJS应用程序的端到端测试框架，它构建于WebDriverJS(W3C WebDriver API的官方实现)之上，Protractor扩展了所有WebDriverJS功能，这些功能有助于自动化所有最终用户针对各种Web浏览器的操作

此外，Protractor还有一组额外的功能，比如自动等待元素加载和针对Angular的特殊定位器

Protractor默认使用Jasmine单元测试框架作为测试框架，所以用户可以像写Jasmine测试用例那样编写自己的测试用例，Protractor同时允许用户按喜好更改单元测试框架，由于低层架构使用W3C WebDriver协议，所有发往浏览器的测试命令均通过网络传输，速度会是个问题

TestCafe

TestCafe是一个用于测试Web端应用程序的纯NodeJS端到端解决方案，支持使用TyepScript或JavaScript(包括支持新特性async/await)来编写测试脚本

TestCafe不使用Selenium/WebDriver，它使用URL Rewriting Proxy代理，此代理将模拟用户操作的驱动程序脚本注入测试页面，由此，TestCafe可以完成测试所需的一切，例如模拟用户操作，身份验证，运行自己的脚本等，整个过程就是个仿真交互的过程



PhantomJS



## 自动化测试中的xpath & css Selector定位

https://blog.csdn.net/u010698107/article/details/111415888

https://blog.csdn.net/u010698107/article/details/121070094
