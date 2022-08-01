---
title: Git使用技巧
date: 2020-06-18 21:40:33
categories: 技术博客
tags:
    - IT，Github
thumbnail: http://cdn.kunkunzhang.top/git-logo.jpg
---

　　Git是最常用的版本管理工具，利于协同开发

​        原来的标题是Github使用技巧，但是后来开发之后发现github和gitlab都是基于Git，因此改为Git

<!--more-->

## GitHub action

持续集成由很多操作组成，比如抓取代码、运行测试、登录远程服务器，发布到第三方服务等等。GitHub 把这些操作就称为 actions。

很多操作在不同项目里都是类似的，完全可以共享，因此github允许开发者把每个操作写成独立的脚本文件，存放到代码仓库里，使得其他开发者可以引用

如果你需要某个action，不必自己写复杂的脚本，直接引用别人写好的action即可，整个持续集成过程就变成了一个actions 的组合

### 基本概念：

workflow：持续集成一次运行的过程，就是一个workflow

job：一个workflow由一个或者多个job组成，含义是一次持续集成的运行可以完成多个任务

step：每个job由多个step组成，一步步完成

action：每个step可以依次执行一个或者多个命令(action)

github actions的配置文件叫做workflow文件，存放在代码仓库的.github/workflow目录

workflow采用yaml文件，文件名可以任取，后缀名统一为.yml，一个库可以有多个workflow文件，github只要发现.github/workflows目录里面有.yml文件就会自动运行该文件

workflow中常用的配置字段

**name**：workflow的名称，如果省略该字段，则默认是workflow的文件名

**on**：指定触发workflow的条件，通常是某些事件，可以是事件或事件的数组

例：`on:[push,pull_request]`表示push或者pull_request事件都可以触发workflow

on也可以限定某些分支的事件或标签，

```yaml
on:
  push:
    branches: 
      - master
```

上面的代码表示是有master分支push时才触发

**jobs**：jobs是workflow文件的主体，表示要执行的一项或者多项任务

jobs中：

首先写出每一项任务的joh_id，名称自定义就可以，添加name字段是任务的说明

needs字段指定当前任务的依赖关系，即运行顺序

runs-on字段指定运行所需要的虚拟机环境，这是必填字段

runs-on可以选择github提供的虚拟机或者自己的服务器，使用自己的机器需要github能进行访问并给其所需的权限

有时候需要对多个操作系统、多个编程语言版本、多个平台进行测试，此时可以在runs-on字段下面配置一个构建矩阵

```yaml
runs-on: ${{matrix.os}}
strategy:
   matrix:
      os:[ubuntu-16.04 ubuntu-18.04]
      node:[6,8,10]
## 上面的代码配置了两种os操作系统和三种node版本共六种情况的构建矩阵，`{{matrix.os}}`是一个上下文参数
```

strategy策略包括：

matrix：构建矩阵

fail-fast：默认为true，即一旦某个矩阵任务失败则立即取消所有还在进行中的任务

max-paraller：可同时执行的最大并发数，默认情况下github会动态调整

此外还可以使用include为一个特定的`os`版本声明，用exclude删除特定的配置项

```yaml
runs-on: ${{matrix.os}}
strategy:
   matrix:
      os:[macos-latest windows-latest ubuntu-18.04]
      node:[4,6,8,10]
      include: 
        - os: windows-latest
          node: 4
          npm: 2
      exclude:
        - os: macos-latest
          node: 4
```

上面的代码声明了当os为windows-latest时增加一个node和npm的特定版本，当os为Macos-latest时移出node为4的版本

**jobs.steps**：steps字段指定每个job的运行步骤，可以包含一个或者多个步骤，每个steps可以指定三个字段

Steps.name：步骤名称

steps.run：该步骤的shell指令或者action

steps.env：该步骤所需的环境变量

steps.uses:使用哪个action

checkout action是一个标准动作，当有以下情况时必须率先使用checkout action：

1.workflow需要项目库当代码副本，如构建、测试、或持续集成这些操作

2.workflow中至少有一个action是在同一个项目库下定义的

此外，如果只是想浅克隆库或者只复制最新的版本，使用with:fetch-depth声明

```yaml
- uses: actions/checkout@v1
  with:
    fetch-depth: 1
```

也可以引用现有库、自己的库或者docker的container

```yaml
jobs: 
   my_first_job:
     step:
       - name: My first step
         uses: docker://alpine:3.8
         uses: ./.github/actions/hello-word-action
         uses: actions/setup-node@v1
         with: 
             node-version: 10.x
```

**if语句**：

在jobs和step中可以使用if条件语句，只有满足条件时才执行具体的job或者step

if语句中的任务检查语句

always():总是返回true

success():当上一步执行成功时才会返回true

failure()：当上一步执行失败时才会返回ture

cancelled()：当workflow被取消时返回true

```yaml
steps:
    - name: step1
      if:always()
      
    - name: step2
      if:success()
      
    - name: step3
      if:failure()
```

**上下文和表达式(expression)**

有时候我们需要和第三方平台交互，这时通常需要配置一个token，但是这个token不可能明文使用的，通过${ { } }

的表达式就能传入

具体做法：

1.在具体repo库Settings中添加一个密钥，如SOMEONE_TOKEN

2.在workflow中通过表达式将 token安全地传入环境变量

```yaml
steps:
   - name: My first action
     env:
      SOMEONE_TOKEN:${{ secrets.SOMEONE_TOKEN}}
```

这里的secrets就是一个上下文，除此之外还有：

github.event_name:触发workflow的事件名称

job.status:当前job的状态，如success、failure等

Steps.output:某个action的输出

runner.os：runner的操作系统，如windows、linux或者macOS

github还做了一个官方市场，可以搜索到其他人提交的actions，另外还有一个awesome actions的仓库可以找到其他action

### 回滚

在github action下找到要回滚的版本，点击re-run就可以回到指定的版本



### 触发其他repo的workflow

```yaml
name: Dispatch Event

on: [push]

jobs:
	build:
		
		runs-on: ubuntu-latest
		
		steps:
		- uses: actions/checkout@v1
			with:
				fetch-depth: 1
		
		- name: dispatch event to another_repository
			env:
				GITHUB_TOKEN: ${{ secrets.REPO_ACCESS_TOKEN }}
				EVENT: YOUR_EVENT_TYPE
				ORG: YOUR_ORG_NAME
				REPO: YOUR_TARGET_REPO_NAME
			run: |
				curl -d "{\"event_type\": \"${EVENT}\"}" -H "Content-Type: application/json" -H "Authorization: token ${GITHUB_TOKEN}" -H "Accept: application/vnd.github.everest-preview+json" "https://api.github.com/repos/${ORG}/${REPO}/dispatches"
```



```yaml
name: hugo publish

on: 
	push: 
		branches:
			-master
	repository_dispatch:
		types: sub_commit

jobs:
	build-deploy:
		runs-on: ubuntu-18.04
		steps:
		- uses: actions/checkout@v2
			with: 
				submodule: recursive
```





### 好用的git action

action-js-inline

Https://github.com/marketplace/actions/execute-javascript-inline

可以在git action里执行js代码，而不只是shell代码



### 本地跑git action

https://www.github.com/nektos/act



## Git Hooks



## 在Github上工作

### 向开源项目贡献代码

一般开源库不会给其他人开放push权限，如果有很好的想法或者发现开源库有bug，可以向作者提pr(pull request)/mr(merge request)

首先Fork（关联复制）一份开源库A的代码到自己的github账号下( A1)

自己对于A1有完全的权限，此时在A1上加入自己的代码，commitA

发送Merge Request到原A库作者

原A库作者审核同意后，将commitA merge到A库代码中

### GitHub activity

一般来说，只有对GitHub上repo的master分支操作时，比如push或者合并到master时GitHub activity会有记录

### GitHub api



api.github.com/repos/{repo_name}/releases/tags/

```bash
curl -o index.json https:api.github.com/repos/vesoft-inc/nebula-graph/releases/tags/v2.5.0
https:api.github.com/repos/{repo_name}/releases/latest
```





### pr/issue template





### GitHub release/tag

Git tag常用于发布版本的标注，可以理解为tag是对某一次commit hash的别名设置。需要注意的是，git tag的同步与删除需要显式地指定名称

```shell
# 列出本地所有tag
git tag

# 过滤出v2.开头的tag
git tag -l 'v2.*'

# 使用管道输出tag列表，避免进入visual模式
git tag | sort -V # gtv
```

新增tag

```shell
# 创建一个名为 v0.0.1的轻量tag
git tag v0.0.1

# 创建一个名为 v0.0.1的附注tag
git tag -a v0.0.1 -m 'tag description'

# 将tag推送至远程
git push origin v0.0.1 #ggp v0.0.1
```

删除tag

```shell
# 删除本地tag
git tag -d v0.0.1

# 删除远程tag
git push origin -d v0.0.1 # gp origin: v0.0.1
```

语义化版本

```shell
git describe master --tags
```

### 文件夹模式

在对应的github地址下改url为github1s.com 可以使用类似于vscode的文件模式，但是是网页版，查看文件比较方便

比如

https://github1s.com/margox/braft-utils/blob/master/src/content.js#L44

也可以使用chrome插件

比如说gitako.安装之后在站点会有一个牛角一样的东西，可以展开/收起文件夹

地址：https://github.com/EnixCoda/Gitako

### Oauth

github支持Oauth 2.0, 在setting- 开发设置中添加Oauth 拿到clientId和client secret

在应用中添加github第三方登录时，路由为http://github.com/login/oauth/authorize?client_id=&redirect-uri=&scope=&state=

参数名	       数据类型	描述
client_id	      String	点击请在此处注册OAuth Apps，此处会看见Client_id,Client Secret
redirect_uri	String	当用户授权登录后，自动重定向的页面
login	            String	使用一个特定的帐户登录和授权的应用程序。
scope	          String	获取到信息的范围
state	            String	随机一个数值，用作防止跨域攻击

如果用户接受您的请求，GitHub 将重定向回您的站点，其中，代码参数为临时 `code`，`state` 参数为您在上一步提供的状态。 临时代码将在 10 分钟后到期。 如果状态不匹配，然后第三方创建了请求，您应该中止此过程。

用此 `code` 换访问令牌：

```shell
POST https://github.com/login/oauth/access_token
```

query参数

| 名称            | 类型     | 描述                                                       |
| :-------------- | :------- | :--------------------------------------------------------- |
| `client_id`     | `字符串` | **必填。**您从 GitHub 收到的 OAuth 应用程序 的客户端 ID。  |
| `client_secret` | `字符串` | **必填。**您从 GitHub 收到的 OAuth 应用程序 的客户端密钥。 |
| `代码`          | `字符串` | **必填。**您收到的响应第 1 步的代码。                      |
| `redirect_uri`  | `字符串` | 用户获得授权后被发送到的应用程序中的 URL。                 |

然后就可以使用token访问github 的api

在请求头中添加

```header
Authorization: token OAUTH-TOKEN
GET https://api.github.com/user
```



文档：

https://docs.github.com/cn/developers/apps/building-oauth-apps/authorizing-oauth-apps



## git-open

git-open是一个npm包，可以在git提交后在命令行输入，快速打开gitlab

```js
npm install git-open
```

使用时直接输入

```js
git open
```

就可以在默认浏览器打开gitlab的提交页面

如果提交的分支不是master，需要在gitlab页面创建合并请求，选择审核人进行审核合并

在审核人确定合并之前，下次提交时不需要再次创建合并请求

确定合并之后下次提交到分支时则需要再次创建

## Gitlab

gitlab自带nginx、redis等软件，所以运行起来较大，在RAM4GB及以上的服务器才可以跑起来

### Gitlab ci

过在项目根目录下配置**.gitlab-ci.yml**文件，可以控制ci流程的不同阶段，例如install/检查/编译/部署服务器。gitlab平台会扫描.gitlab-ci.yml文件，并据此处理ci流程

ci流程在每次团队成员**push/merge**后之后触发。每当你push/merge一次，gitlab-ci都会检查项目下有没有.gitlab-ci.yml文件，如果有，它会执行你在里面编写的脚本，并完整地走一遍从**intall =>** **eslint检查=>编译 =>部署服务器**的流程

gitlab-ci提供了指定ci运行平台的机制，它提供了一个叫**gitlab-runner**的软件，只要在对应的平台(机器或docker)上下载并运行这个命令行软件，并输入从gitlab交互界面获取的token,就可以把当前机器和对应的gitlab-ci流程绑定，也即：每次跑ci都在这个平台上进行。

gitlab-ci的所有流程都是可视化的，每个流程节点的状态可以在gitlab的交互界面上看到，包括执行成功或失败。如下图所示,因为它的执行看上去就和多节管道一样，所以我们通常用“pipeLine”来称呼它

不同push/merge所触发的CI流程不会互相影响，也就是说，你的一次push引发的CI流程并不会因为接下来另一位同事的push而阻断，它们是互不影响的。这一个特点方便让测试同学根据不同版本进行测试。

pipeline不仅能被动触发，也是可以手动触发的。

通过gitlab-ci，前端开发在提交代码之后就不用管了，ci流程会自动部署到测试或集成环境的服务器。很大程度上节约了开发的时间。

同时，因为开发和测试人员可以共用gitlab里的pipeline界面, 测试同学能够随时把握代码部署的情况，同时还可以通过交互界面手动启动pipeline，自己去部署测试，从而节约和开发之间的沟通时间。

我们可以把eslint或其他的代码检查加到pipeline流程中，每当团队成员提交和合并一次，pipeline都会触发一次并对代码做一次全面检测，这样就从一个更细的粒度上控制代码质量了。

#### gitlab ci中的概念

Pipeline是Gitlab根据项目的.gitlab-ci.yml文件执行的流程，它由许多个任务节点组成, 而这些Pipeline上的每一个任务节点，都是一个独立的Job

Job在YML中的配置我们将会在下面介绍，现在需要知道的是：**每个Job都会配置一个stage属性，来表示这个Job所处的阶段。**

**一个Pipleline有若干个stage,每个stage上有至少一个Job**，

Runner可以理解为：**在特定机器上**根据项目的**.gitlab-ci.yml**文件，对项目执行pipeline的**程序**。Runner可以分为两种： **Specific Runner** 和 **Shared Runner**

- **Shared Runner**是Gitlab平台提供的免费使用的runner程序，它由Google云平台提供支持，每个开发团队有十几个。对于公共开源项目是免费使用的，如果是私人项目则有每月2000分钟的CI时间上限。
- **Specific Runner**是我们自定义的，在自己选择的机器上运行的runner程序，gitlab给我们提供了一个叫gitlab-runner的命令行软件，只要在对应机器上下载安装这个软件，并且运行gitlab-runner register命令，然后输入从gitlab-ci交互界面获取的token进行注册, 就可以在自己的机器上远程运行pipeline程序了。

1. Shared Runner是所有项目都可以使用的，而Specific Runner只能针对特定项目运行
2. Shared Runner默认基于docker运行，没有提前装配的执行pipeline的环境，例如node等。而Specific Runner你可以自由选择平台，可以是各种类型的机器，如Linux/Windows等，并在上面装配必需的运行环境，当然也可以选择Docker/K8s等
3. 私人项目使用Shared Runner受运行时间的限制，而Specific Runner的使用则是完全自由的。

有时候你可能会发现：你的Job并没有被你新建的Runner执行，而是被Share Runner抢先执行了。你如果不想要Share Runner，你可以在Gitlab面板上关掉

CI流程的运行控制，决定于项目根目录下编写的配置文件—— **.gitlab-ci.yml**，正因如此，我们需要掌握YML的基本语法规则。

YML是一种编写配置文件的语言，比JSON更为简洁和方便，因此，我们首先要掌握的就是YML文件的编写语法。

Gitlab yaml

模块化

yaml

- 使用 **&**符号可以定义一个片段的别名
- 使用 **<<**符号和 ***** 符号可以将别名对应的YML片段导入

```yaml
.common-config: &commonConfig
  only: # 表示仅在develop/release分支上执行
    refs:
      - develop
      - release

install-job:
  # 其他配置 ....
  <<: *commonConfig
build-job:
  # 其他配置 ....
  <<: *commonConfig
```

gitlab-ci提供的include关键字便可实现这个功能, 它可以用来导入外部的YML文件。

```yaml
include:
  - '/.gitlab-ci.wx.yml'
  - '/.gitlab-ci.bd.yml'
  - '/.gitlab-ci.h5.yml'
```

gitlab-ci还提供了extend关键字，它的功能和前面提到的YML的片段导入的功能是一样的，

```yaml
.common-config: 
  only: # 表示仅在develop/release分支上执行
    refs:
      - develop
      - release

install-job:
  # 其他配置 ....
  extends: .common-config

build-job:
  # 其他配置 ....
  extends: .common-config
```

script

由runner执行的shell脚本，job所需的唯一关键字

```yaml
## 示例1：
  job:
    script: "bundle exec rspec"
## 示例2：
  job:
    script:
      - uname -a
      - bundle exec rspec
```

before_script

定义在所有job之前运行的命令（包括部署作业），必须是数组

after_script

定义在所有job之后运行的命令（包括失败的job），必须是数组

每个管道均可使用的两个阶段
.pre: 保证始终是管道的第一个阶段
.post: 保证始终是管道的最后一个阶段

```yaml
## 示例1:
    stages:
      - .pre
      - a
      - b
      - .post
```

environment

定义作业部署到特定环境，如果指定不存的名称在则自动创建

```yaml
  deploy to production:
  stage: deploy
  script: git push production HEAD:master
  environment:
    name: production
```

cache

为了**重复运行pipeline的时候不会重复安装全部node_modules的包**，从而减少pipeline的时间，提高pipeline的性能。

**但是，这并不是cache关键字唯一的功能！**

在介绍cache的另外一个功能之前，我要先说一下gitlab-ci的一个优点“恶心人”的特点：

它在运行下一个Job的时候，会默认把前一个Job新增的资源删除得干干静静

也就是说，我们上面bulid阶段编译生成的包，会在deploy阶段运行前被默认删除！（我生产包都没了我怎么部署emmmmmmm）

而cache的作用就在这里体现出来了：如果我们把bulid生产的包的路径添加到cache里面，虽然gitlab还是会删除bulid目录，但是因为在删除前我们已经重新上传了cache，并且在下个Job运行时又把cache给pull下来，那么这个时候就可以实现在下一个Job里面使用前一个Job的资源了

总而言之，cache的功能体现在两点：

- **在不同pipeline之间重用资源**
- **在同一pipeline的不同Job之间重用资源**

虽然cache会缓存旧的包，但我们并不用担心使用到旧的资源，因为npm install还是会如期运行，并检查package.json是否有更新，npm build的时候，生成的build资源包也会覆盖cache,并且在当前Job运行结束时，作为**"新的cache"**上传

如果cache在job外定义，则表示它是全局的

artifacts

将生成的资源作为pipeline运行成功的附件上传，并在gitlab交互界面上提供下载

```yaml
Build-job:
  stage: build
  script:
  - 'npm run build'
  artifacts:
    name: 'bundle'
    paths: 
      - build/
```

Image/Services

这两个关键字可使用Docker的镜像和服务运行Job，

```yaml
### 示例1：
  image: "registry.example.com/my/image:latest"
### 示例2：
  image:
    name: "registry.example.com/my/image:latest"
### 示例1：
    services:
      - postgresql:9.4
      - redis:latest
### 示例2:
    services:
      - name: postgresql:9.4
      - name: redis:latest
```

Only/except

这两个关键字后面跟的值是tag或者分支名的列表。

故名思义

- only的作用是指定当前Job仅仅只在某些tag或者branch上触发
- 而except的作用是当前Job不在某些tag或者branch上触发

```yaml
job:
  # use regexp
  only:
    - /^issue-.*$/
    - develop
    - release
```

allow_failure

值为true/false, 表示当前Job是否允许允许失败。

- 默认是false,也就是如果当前Job因为报错而失败，则当前pipeline停止
- 如果是true，则即使当前Job失败，pipeline也会继续运行下去。

```yaml
job1:
  stage: test
  script:
    - execute_script_that_will_fail
  allow_failure: true
```

retry

指明的是当前Job的失败重试次数的上限。

但是这个值只能在0 ～2之间，也就是重试次数最多为2次，包括第一次运行在内，Job最多自动运行3次

timeout

配置超时时间，超过时间判定为失败

```yaml
Job:
  script: rspec
  timeout: 3h 30m
```

when

Job在何种状态下运行，它可设置为3个值

- **on_success**: 仅当先前pipeline中的所有Job都成功（或因为已标记，被视为成功allow_failure）时才执行当前Job 。这是默认值。
- **on_failure**: 仅当至少一个先前阶段的Job失败时才执行当前Job。
- **always**: 执行当前Job，而不管先前pipeline的Job状态如何。

tags

从允许运行此项目的所有runner列表中选择特定的runner，
tags允许为具有指定标签的runner允许job

```yaml
### 示例1：
   job:
    tags:
    -
      - ruby
      - postgres 
```

**variables**

在.gitlab-ci.yml定义的内部变量，用于存储非敏感项目配置
 在job环境中传递这些变量，可以全局设置，也可以按job设置
 在variables工作级使用关键字时，它将覆盖全局YAML变量和预定义的变量

```yaml
##  示例1：
    variables:
      DATABASE_URL: "postgres://postgres@postgres/my_database"
```

parallel

配置并行运行的job实例数，此值必须大于等于2且小于等于50

不推荐的参数

全局定义 types
工作定义 type
全局定义image，services，cache，before_script，after_script

### Gitlab Runner

下载gitlab runner 的rpm包，安装

```shell
rpm -i gitlab-runner_<arch>.rpm
```

通常作为一个 trigger 代理，任务开销很小，我们可以把 /etc/gitlab-runner/config.toml 配置里的 concurrent 可以改得大一些，以支持更高的并发量。

搭建 gitlab runner 每台 runner 只需要执行一次

注册 gitlab runner 每个 git 仓库每台 runner 都需要单独注册

先登入 gitlab，进入对应的 git 仓库（project）

\- 展开左边侧边栏最下面 Settings -> CI/CD。点击页面上 Runners 栏右边的 Expand，页面往下滚动一点可看到

注册

```shell
sudo gitlab-runner register
```

**2. Enter your GitLab instance URL.**

上图红框中 Register the runner with this URL 下面的内容。

**3. Enter the token you obtained to register the runner.**

上图红框中 And this registration token 下面内容。

**4. Enter a description for the runner. You can change this value later in the GitLab user interface.**

在 gitlab 中显示的 runner 描述，该实践中我们把他当名字用，叫 scapegoat-01。

**5. Enter the tags associated with the runner, separated by commas. You can change this value later in the GitLab user interface.**

tag 相当于Jenkins中的 label， 用于 runner 分类。该实践中输入 scapegoat。

**6. Provide the runner executor. For most use cases, enter docker.**

这里我们选 shell， window 可选 powershell。

https://zhuanlan.zhihu.com/p/184936276

### gitlab ci触发jenkins

理论上，gitlab的runner可以直接替代jenkins，但是实际项目中会有各种历史包袱。所以利用gitlab触发jenkins也可以

有两种方式，比较简单的方式是使用jenkins+webhook的插件方式实现

在jenkins的dashboard面板安装`Generic Webhook Trigger`插件

在构建触发器中选择`Generic Webhook Trigger`选项,将Jenkins和gitlab配合起来

![image-20210816143402614.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/078156204e2846c2ba1ae00a3db5c27e~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp)

登录gitlab进入你要部署的项目>settings>Integrations>add webhook

测试webhook是否成功

https://juejin.cn/post/6997560212924137485#heading-24

也可以通过python-jenkins触发jenkins job

安装python和pip

```shell
sudo apt install python或sudo apt install python3
sudo apt install python-pip
```

安装python-jenkins

```shell
python -m pip install python-jenkinsor python3 -m pip install python-jenkins
```

python脚本

```python
#!/usr/bin/python# file name: Jenkins-Compile-trigger.py
import jenkins
import requests
import time
import sys
import os

jenkins_url = "http://yunxin-jenkins.netease.im:8080"
# gitlab的登录账号
jenkins_user = "zouliyong" 
#获取gitlab access token章节获取到的token
jenkins_token = "xxxxxxxxxxxxxxxxx" 
#Jenkins job name
job_name = "Lava-CI"
#从gitlab-ci中获取Jenkins job的参数，按需修改
job_parameters = {                      
    "_GitlabSourceBranch"    : os.getenv("CI_MERGE_REQUEST_SOURCE_BRANCH_NAME"),     
    "_GitlabTargetBranch"    : os.getenv("CI_MERGE_REQUEST_TARGET_BRANCH_NAME"),    
    "_GitlabMergeRequestLastCommit"  : os.getenv("CI_COMMIT_SHA"),                    
    "_GitlabSourceRepoHomepage"  : os.getenv("CI_PROJECT_URL"),                    
    "_GitlabMergeRequestIid"  : os.getenv("CI_MERGE_REQUEST_IID"),                    
    "_GitlabPipelineId"  : os.getenv("CI_PIPELINE_ID"),                    
    "_GitlabPipelineUrl" : os.getenv("CI_PIPELINE_URL"),                    
    "_GitlabJobId"  : os.getenv("CI_JOB_ID"),                    
    "_GitlabUserName"  : os.getenv("GITLAB_USER_NAME"),                    
    "_GitlabUserEmail"   : os.getenv("GITLAB_USER_EMAIL")
}

build_number = 0build_info = {"building" : False}                 
print("jenkins job name: ", job_name)
print("jenkins job parameters: ", job_parameters)
#连接Jenkins服务
server = jenkins.Jenkins(jenkins_url, username= jenkins_user, password= jenkins_token)
#获取Jenkins job最后一次build的build number
def last_build_number(server, job):    
    last_build = server.get_job_info(job)['lastBuild']    
    return 1 
    if None == last_build 
    else 
    last_build['number']

last_build = server.get_job_info(job_name)['lastBuild']
next_build_number = last_build_number(server, job_name) + 1
#触发Jenkins
jobqueue_id = server.build_job(job_name, parameters=job_parameters)
print("Jenkins build is waiting for running [queue id = %d] ..." % queue_id)sys.stdout.flush()
#到这里，Jenkins job已经被放到执行队列里了，
#只是触发不用等待Jenkins job结束的话，python脚本可以到此为止
#等待Jenkins job开始执行
while True:    
    if next_build_number <= last_build_number(server, job_name):       
        try:            
            build_info = server.get_build_info(job_name, next_build_number)        
            except requests.exceptions.RequestException as e:            
            print(e)            
            server = jenkins.Jenkins(jenkins_url, username= jenkins_user, password= jenkins_token)
            build_info = server.get_build_info(job_name, next_build_number)        
            if queue_id == build_info["queueId"]:            
            build_number = next_build_number            
            print("build number: %d" % build_number)            
            break        
            next_build_number = next_build_number + 1    
            time.sleep(0.1)
print("Jenkins build is running [build number = %d] ..." % build_number)
print("Jenkins job URL: %s/job/%s/%d/display/redirect" % (jenkins_url, job_name, build_number))
sys.stdout.flush()
#到这里Jenkins job已经被正式调度，并开始执行
#等待Jenkins job执行结束
while build_info["building"]:    
    try:        
        build_info = server.get_build_info(job_name, build_number)    
        except requests.exceptions.RequestException as e:        
        print(e)        
        server = jenkins.Jenkins(jenkins_url, username= jenkins_user, password= jenkins_token)        
        build_info = server.get_build_info(job_name, build_number)    
        time.sleep(1)
# 获取执行结果
result = server.get_build_info(job_name, build_number)["result"]
print("jenkins build result: %s" % result)
assert("SUCCESS" == result)
```

gitlab ci yaml

```yaml
#file name: .gitlab-ci.yml
stages:     
  - build
# 在代码push的时候触发
Compilation:    
  stage: 
    build    
      tags:
    -        
        - scapegoat 
# runner tag 参照上面注册gitlab runner章节    
    script:        
      - python Jenkins-Compile-trigger.py
# 只在merge request的时候触发CI:    
stage: 
  build    
    tags:
    -        
      - scapegoat    
    script:       
# 这个脚本可以根据情况参照Jenkins-Compile-trigger.py自行修改        
      - python Jenkins-CI-trigger.py     
    only:        
      - merge_requests
```



https://juejin.cn/post/7073731514386612255

## Gitbook

Gitbook是一个提供Markdown书籍托管的网络平台。支持通过git及github进行文档管理，使用它可以很简单地生成、发布电子图书。Gitbook也是一个Nodejs命令行工具，可以使用它搭建自己的gitbook站点。GitBook甚至提供Github hook，在每次push前自动更新书籍内容。

安装GitBook 控制台

```shell
npm install -g gitbook-cli
```

如果安装过gitbook旧版本需要卸载。

gitbook常用命令

```shell
gitbook serve -p 8080 .
```

Gitbook首先把你的Markdown文件编译为HTML文件，并根据SUMMARY.md生成书的目录。所有生存的文件都保存在当前目录下的一个名为_book的子目录中。完成这些工作后，Gitbook会作为一个HTTP Server运行，并在8080端口监听HTTP请求。

运行以上命令后，打开浏览器，在地址栏输入：`http://localhost:8080`即可看到你的书页了。

其中位于左侧书目顶部的`Introduction`一节就编译自README.md，而书目本身自编译自SUMMARY.md。你要在自己的网站上发布新书，只需把_book目录复制到服务器相应目录即可。至此Gitbook的基本用法就介绍完毕。

### Gitbook的插件支持

在页面中嵌入Disqus评论

```shell
 npm install gitbook-plugin-disqus
```

然后建立一个book.json文件，其格式如下：

```json
{
  "plugins":  
			["disqus"],  
  "pluginsConfig":  
 			{  "disqus":  
         {  "shortName":  
           "NAME-FROM-DISQUS"
         }  
      }  
}
```

把上面的`NAME-FROM-DISQUS`修改为你在Disqus上的项目名即可。

再次运行命令：

> $ gitbook serve -p 8080 .

并刷新浏览器，即可看到附加了Disqus评论的页面。

### Gitbook电子书封面

可以为电子书添加封面。只需添加2个名为`cover.jpg`和`cover_small.jpg`的两个图片即可。官方建议cover.jpg尺寸1800*2360，cover_small.jpg尺寸200*262。花2元即可在淘宝上找个做封面的人为你制造一个简单的封面，做得好就要花更多一些了 :)

总体而言，GitBook还是很好玩，比起其他写作平台而言，要自由、简单，并舒服得多，可以用Vim编辑，支持Markdown语法，用git管理，关联GitHub后每次push后还能自动编译，生成多种电子书格式。如果你的书极为畅销的话，还能获取到捐赠或购买，没有理由不尝试的呀。

**删除电子书**

同样是在Book Setting中，可以删除电子书。在电子书列表中没有删除接口。

## SVN

一般来说公司版本管理工具使用git的比较多，也有使用svn。SVN是sub vision的缩写，windows中svn客户端一般使用TortoiseSVN，mac中比较好用的当属CornerStone。TortoiseSVN是可视化svn界面，Cornerstone是收费的，因此你可以去网上下载破解版，直接安装即可。

### TortoiseSVN

TortoiseSVN 常年管理文件和目录。文件存储于一个中央版本库中。版本库就像一个常见的文件服 务器，除了它保存你对文件和目录所有的改变。这一特性使得你可以恢复文件的旧版本并查看历史-谁 在什么时间如何进行的修改。

创建版本库

```svn
svnadmin create --fs-type bdb MyNewRepository
```

图标重载

使用svn-checkout检查文件状态。对号表示状态正常，红色感叹号表示文件被修改未提交，黄色感叹号表示产生冲突。

拉取项目

```svn

```

提交项目

```shell
svn commit
```

更新文件

```svn
svn update
```



### Cornerstone