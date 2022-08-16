---
title: Windows免费翻墙技巧
date: 2020-03-11 21:40:33
categories: 技术博客
tags:
    - 技术宅、IT
toc: true
thumbnail: 
---

## 墙外的世界比较精彩

　　如果你是一个技术宅，你肯定需要翻墙寻找各种各样的工具

　　如果你是一个科研人员，毫无疑问谷歌学术比知网要好用的多

　　如果你有外国朋友，他们可以用微信联系你，你却不能上Ins和Fb回复他们消息

　　如果你是一个视频制作者，外网的音乐库比国内的要多得多

　　如果你要追剧，Youtube上的视频也比优酷多

 那么国内如何翻墙呢？免费的VPN总是不太好用，这里我推荐一种免费无广告的科学上网方式。

<!--more-->

## 方法一：通过Chrome插件翻墙

​       Chrome插件翻墙是三种方式中最简单的，也是免费的，可以上google和youtube，速度由插件而定，相对而言对小白友好，因此第一个介绍。

### 下载Chrome浏览器

　　本方法是基于谷歌Chrome浏览器的，所以你需要先安装一个Chrome浏览器，这个浏览器非常好用，也推荐日常使用。可以在软件管家里安装，也可以去[官网](https://www.google.cn/intl/zh-CN/chrome/)下载。

### 安装谷歌安装助手

　　这一步是确保你的Chrome浏览器可以访问Google

　　打开[这个链接](https://chrome.zzzmh.cn/info?token=gocklaboggjfkolaknpbhddbaopcepfp)，下载谷歌访问助手，下载解压后为CRX文件，再把CRX文件解压为文件夹，打开谷歌浏览器，点击更多工具-->扩展程序，拖动文件夹到谷歌浏览器或者导入这个文件夹

　　如果你的解压软件不能解压CRX文件，把.crx文件后缀修改为zip或者rar之后再进行解压，导入Chrome时以文件夹的方式导入

### 备用方法

　　打开Bing国内版，搜索 `Chrome插件` ，打开第一个链接就可以下载谷歌安装助手

　　到此步骤只能访问Google，不算VPN，如果你只用Google可以到此结束，如果还想访问Youtube等网站需要进行接下来的步骤。 

### 在谷歌浏览器中设置VPN插件

　　在谷歌浏览器左上角打开应用商店，搜索Astar VPN，添加到浏览器中。

　　在更多工具-->扩展程序下，找到Astar VPN，点击添加，Astar VPN就添加到你的浏览器中。打开右上方开发者模式，在域名栏的右侧开发者工具下点击Astar VPN图标，开启即可。

　　使用时注意选择站点，正常来说新加坡和日本的节点速度会比较快，但是我用的时候美国站点也比较快，可以自己多尝试几次。



## 方法二：VPS搭建v2ray

V2ray是一种比较稳定的方式，可以通过自己搭建服务器的方式进行翻墙。通常来说费用只有外国服务器的费用。v2ray支持mac客户端(v2rayU)、windows客户端(v2rayN)、安卓客户端(v2rayNG)、IOS客户端(小火箭)，一次搭建多端共用，且可以通过二维码分享给朋友一起使用，非常方便。

服务器推荐vultr或者搬瓦工的vps，linux系统，不推荐阿里云香港或者腾讯云香港的，腾讯云或者阿里云一旦被发现服务器用于境内翻墙，则直接封锁服务器。搬瓦工用于翻墙被发现时IP会被封。vultr vps可以随时摧毁或新建，且不花费费用，速度尚可，因此推荐。

windows客户端下载地址：https://github.com/v2ray/v2ray-core

mac客户端下载地址：https://github.com/yanue/V2rayU

安卓客户端下载地址：https://github.com/2dust/v2rayNG

安装步骤：

本步骤按照233boy的v2ray搭建教程而来，原文地址https://github.com/233boy/v2ray/wiki/V2Ray%E6%90%AD%E5%BB%BA%E8%AF%A6%E7%BB%86%E5%9B%BE%E6%96%87%E6%95%99%E7%A8%8B，本文仅作收录。

支持： V2Ray 绝大多数传输协议，WebSocket + TLS，HTTP/2，Shadowsocks，动态端口，集成 BBR 和锐速优化等。

V2Ray 官网：[https://www.v2ray.com](https://www.v2ray.com/)

大致流程如下：

- 购买一个 VPS。想要搭建 V2Ray，就必须要拥有一台 VPS。

- 获取 VPS 信息。我们必须要知道 VPS IP 地址，root 用户密码，SSH 端口

- 安装 Xshell。对于windows，Xshell 是一个 SSH 客户端，要登录 VPS，当然需要 SSH 客户端。对于mac或linux，直接使用terminal

- 登录 VPS。使用 Xshell 或者terminal配置 VPS SSH 信息，然后登录

- 安装 V2Ray。安装过程你可以随意选择你喜欢的传输协议或者配置 Shadowsocks

- V2Ray 安装完成。此时你可以使用客户端配置 V2Ray 使用了

- V2Ray 高级玩法。配置 WebSocket + TLS ， HTTP/2 ， mKCP 等

安装v2ray

在xshell或者terminal中输入下面命令回车，或者也可以复制过去，

```
bash <(curl -s -L https://git.io/v2ray.sh)
```

开始后选择安装，即是输入 1 回车

然后选择传输协议，如果没有特别的需求，使用默认的 TCP 传输协议即可，直接回车

然后选择端口，如果没有特别的需求，使用默认的端口即可，直接回车

然后选择是否屏蔽广告，除非你真的需要，一般来说，直接回车即可

是否配置 Shadowsocks ，如果不需要就直接回车，否则就输入 Y 回车
Shadowsocks 端口，密码，加密方式这些东西自己看情况配置即可，我个人当然是全部直接回车。。

v2ray常用命令

```shell
v2ray info 查看 V2Ray 配置信息
v2ray config 修改 V2Ray 配置
v2ray link 生成 V2Ray 配置文件链接
v2ray infolink 生成 V2Ray 配置信息链接
v2ray qr 生成 V2Ray 配置二维码链接
v2ray ss 修改 Shadowsocks 配置
v2ray ssinfo 查看 Shadowsocks 配置信息
v2ray ssqr 生成 Shadowsocks 配置二维码链接
v2ray status 查看 V2Ray 运行状态
v2ray start 启动 V2Ray
v2ray stop 停止 V2Ray
v2ray restart 重启 V2Ray
v2ray log 查看 V2Ray 运行日志
v2ray update 更新 V2Ray
v2ray update.sh 更新 V2Ray 管理脚本
v2ray uninstall 卸载 V2Ray
```



## 方法三：路由器翻墙

   路由器翻墙适用于家用，且路由器的配置不能太低，因为路由器翻墙需要刷路由器固件程序，而这对路由器的CPU和RAM的大小都有要求。正常来说100元以下的路由器一般是不满足要求的

## 总结

　　这个方法是基于Chrome浏览器插件使用的，也就是说你只能在Chrome浏览器下翻墙，但是Chrome浏览器绝对比windows edge好用，如果你同时用Gmail或者别的插件就会发现非常好用，我认识的老外都非常喜欢Google。

　　本文最后更新时Astar VPN由于使用（白嫖）人数过多已经崩掉了，在Google商店下搜索另一款VPN插件Adguard VPN,选择日本或者新加坡节点

　　这里也建议如果大家有比较强烈的翻墙的想法或者需要，建议多准备几种翻墙方式，以备不时之需。

　　本文引自空谷小莜蓝博客，原文在此 

[windows上长期有效的免费且高速稳定翻墙法](https://lures2019.github.io/2020/02/04/Windows上长期有效的免费且高速稳定翻墙法%EF%BC%81/#more)，

大家感兴趣可以去关注他





