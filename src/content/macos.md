---
title: Mac OS使用
date: 2020-05-06 21:40:33
categories: 技术博客
tags:
    - IT,Web，Mac
toc: true
thumbnail: 
---

## 概述

​     触控板很舒服，系统很快，偶尔发热

​     mac os的操作记录

<!--more-->

## mac 操作

双指同时在触摸板上滑动表示滚轮

双指同时按压表示右键（或者安装option+单击）

三指同时左右滑动切换桌面，三指上滑到桌面栏

command+shift+3全屏截屏

command+shift+4选取截屏

所有打开应用程序的菜单栏在最上面



## Mac os设置

自带git



mac可以通过app store安装文件，也可以通过浏览器下载，mac 安装文件为dmg或者zip，安装时把图标拖进应用程序



mac通过访达访问文件，通过启动台启动程序，



~代表到用户名的路径，pwd代表根目录，

在用户名下创建.bashrc文件，通过编辑代码设置环境变量，但是由于.bashrc在mac系统不自动运行，创建.zshrc文件，此文件能自动运行，编辑source .bashrc，

mac和ubuntu一样，有隐藏文件夹，command+shift+p开启（ubuntu按键不一样）



## 环境变量

在用户下新建.bashrc和.zbash文件，在文件中添加语句配置环境变量



## 安装brew

brew是mac os和linux包管理工具，是比较方便的

有四部分，brew、homebrew-core、homebrew-cask、homebrew-bottles

官网默认的安装方式为

```mac
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

raw.githubusercontent.com这个网站常常不稳定，如果被拒可以使用中科大镜像

```
/usr/bin/ruby -e "$(curl -fsSL https://cdn.jsdelivr.net/gh/ineo6/homebrew-install/install)"
```

如果卡在

```git
==> Tapping homebrew/core
Cloning into 
```

中断安装，先执行

```git
cd "$(brew --repo)/Library/Taps"
mkdir homebrew && cd homebrew
git clone git://mirrors.ustc.edu.cn/homebrew-core.git
```

看到`==> installstion successful`即为安装成功，最后更新源

```git
brew updates
```

检查源

```macos
# brew.git镜像源
git -C "$(brew --repo)" remote -v

# homebrew-core.git镜像源
git -C "$(brew --repo homebrew/core)" remote -v

# homebrew-cask.git镜像源
git -C "$(brew --repo homebrew/cask)" remote -v 
```

更换源

```mac
cd "$(brew --repo)"
git remote set-url origin https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/brew.git
cd "$(brew --repo)/Library/Taps/homebrew/homebrew-core"
git remote set-url origin https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/homebrew-core.git
brew update
```

恢复原有镜像

```Mac os 
git -C "$(brew --repo)" remote set-url origin https://github.com/Homebrew/brew.git

git -C "$(brew --repo homebrew/core)" remote set-url origin https://github.com/Homebrew/homebrew-core.git

git -C "$(brew --repo homebrew/cask)" remote set-url origin https://github.com/Homebrew/homebrew-cask.git
```

如果没有更新尝试以下方法

```mac os
brew doctor
brew update-reset
brew update
```

报错

Another active Homebrew update process is already in progress

在终端输入

```shell
rm -rf /usr/local/var/homebrew/locks
```



## mac文件夹介绍

Mac目录下打开Macintosh HD硬盘可以看到四个文件夹：应用程序(application)、系统(System)、用户(User)、资料库(Library)

1.Application存放各种软件

2.System包含由Apple安装的系统软件，位于启动卷宗

3.Library系统资源库，比如字体、ColorSync配置、偏好设置以及插件都安装在Library目录下适当的子目录

4.User包含了某个用户专有的资源，这里也有一个Library

user下的目录：

bin：储存基本的UNIX指令，系统所需要的基本命令位于此目录，如ls、cp、mkdir等。这个文件夹是包含在path系统变量里面

sbin：储存比较进阶的UNIX指令，大多是涉及系统管理的命令，是超级权限用户root的可执行命令存放地，

etc：系统设定档案储存的地方

tmp：临时目录，有些文件用了一两次就不会被用到，linux系统会定期对这个文件夹进行清理

usr：UNIX的使用者专用挡文件夹



## 移动硬盘

Mac 默认只支持，不支持NFTS格式的硬盘，无法进行读写操作。

需要借助工具Mounty for NTFS

Mounty for NTFS的主页https://mounty.app/

点击here下载、安装，

插入硬盘后mounty显示加载提示，选择将硬盘挂载为读写模式



## 终端

### 终端网络代理

在.shrc中添加语句

```shell
export http_proxy="http://127.0.0.1:8001"
export HTTP_PROXY="http://127.0.0.1:8001"
export https_proxy="http://127.0.0.1:8001"
export HTTPS_PROXY="http://127.0.0.1:8001"
```

也可以

**在当前用户根目录新建一个文件名为 \**.bash_profile\**** 的**空白文本**「. 开头文件为隐藏文件」，然后输入以下代码：

```bash
function proxy_off(){
        unset http_proxy
        unset https_proxy
        unset ftp_proxy
        unset rsync_proxy
        echo -e "已关闭代理"
}
 
function proxy_on() {
        export no_proxy="localhost,127.0.0.1,localaddress,.localdomain.com"
        export http_proxy="http://127.0.0.1:7890" ## 代理的端口
        export https_proxy=$http_proxy
        export ftp_proxy=$http_proxy
        export rsync_proxy=$http_proxy
        export HTTP_PROXY=$http_proxy
        export HTTPS_PROXY=$http_proxy
        export FTP_PROXY=$http_proxy
        export RSYNC_PROXY=$http_proxy
        echo -e "已开启代理"
}
```

然后在终端中输入命令开启代理

```shell
source  ~/.bash_profile 
proxy_on
```

关闭代理

```shell
proxy_off
```

需要注意的是，该代码为一次性的，当关闭终端界面时，需要再次输入才能让终端走代理

```shell
source  ~/.bash_profile 
proxy_on
```





### 终端软件

Iterm

下载地址：https://iterm2.com/version3.html

下载的是压缩文件，解压后是执行程序文件，你可以直接双击，或者直接将它拖到 Applications 目录下。

https://www.cnblogs.com/xishuai/p/mac-iterm2.html

Iterm快捷键

|          命令           |      说明      |
| :---------------------: | :------------: |
|        Command+t        |    新建标签    |
|        Command+w        |    关闭标签    |
| Command+左右方向键/数字 |    切换标签    |
|      Command+enter      |    切换全屏    |
|        Command+f        |      查找      |
|        Command+d        |    垂直分屏    |
|     Command+shift+d     |    水平分屏    |
|        Command+;        |  查看历史命令  |
|     Command+shift+h     | 查看剪贴板历史 |



|   命令   |     说明     |
| :------: | :----------: |
|  ctrl+l  |     清屏     |
|  ctrl+a  |    到行首    |
|  ctrl+e  |    到行尾    |
| ctrl+f/b |  前进/后退   |
|  ctrl+p  |  上一条命令  |
|  ctrl+r  | 搜索命令历史 |
|  ctrl+u  |  清除当前行  |



tmux





### 设置终端快捷键

打开automator，

双击运行apple script，输入代码

```apl
on run(input,parameters)
     tell application "Terminal"
          reopen
          activate
         end tell
end run 
```

点击右上角运行，运行成功

关闭界面，保存为“Open Terminal”

　　打开系统偏好设置，选择键盘

选择快捷键--服务--通用--open terminal

设置快捷键为ctrl+alt+t



## 好用的软件

### Bob

翻译软件

https://github.com/ripperhe/Bob



### SwitchHosts



### Notion客户端

https://notion-enhancer.github.io/getting-started/installation/

### nushell



### fig





## Nginx

安装nginx

```shell
brew install nginx
```

mac osnginx默认配置目录

```mac
/usr/local/etc/nginx/nginx.conf
```

启动nginx

```mac
ngxin
```

重启nginx

```mac
nginx -s reload
```

关闭nginx

```mac
//先查询nginx对应端口号
ps -ef | grep nginx
501 53536 1 0 3:34下午 ?? 0:00.00 nginx: master process nginx
501 53569 53536 0 3:36下午 ?? 0:00.00 nginx: worker process
501 53611 52121 0 3:38下午 ttys000 0:00.00 grep nginx
kill nginx: master 端口号，即53536
kill -QUIT 53536
```





## 保护电池，减少循环

　　

## 

　　

## 

