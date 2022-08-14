---
title: Linux
date: 2021-09-02 21:40:33
categories: 技术博客
tags:
    - IT，
toc: true
thumbnail: https://s1.ax1x.com/2020/03/27/G9OI3V.th.jpg
---

　　在我看来，Linux是一个对软件开发非常友好的操作系统。它去除了很多windows下的杂质，保留了非常干净的系统。Mac系统也是与它有很多相似的地方，才这样好用。

　　<!--more-->

## 下载与安装

​       以linux为内核的有Ubuntu，Debian、Centos，操作方式大同小异

​       因为linux是开源系统，所以在百度或者谷歌直接搜索ubuntu16.0，就能找到安装包。安装的时候找阿里镜像源，会下载的快一些。



## 修改镜像源和网络



清华大学镜像源网站：https://mirrors.tuna.tsinghua.edu.cn/



## 常用命令

查看进程

```shell
ps aux
ps -elf
```

查看端口状态

```shell
lsof -i:端口号
##查看tcp udp端口和进程等情况
netstat -tunlp | grep 端口号
netstat -ntlp ## 查看当前所有tcp端口
netstat -ntulp | grep 80 ##查看所有80端口使用情况
netstat -l ##只显示监听端口
netstat -lt ## 只列出所有监听TCP端口
netstat -lu ## 只列出所有监听UDP端口
netstat -lx ## 只列出所有监听UNIX端口
netstat -pt ## 在netstat输出中显示PIC和进程名称
netstat -an | grep ':80' ##找出运行在指定端口的进程
```

服务器常用端口

21 ftp ftp服务器所开放的端口，用于上传下载

22 ssh 22端口就是ssh端口，用于通过命令行模式远程连接Linux系统的服务器

25 SMTP SMTP服务器所开放的端口，用于发送邮件

80 HTTP 用于网站服务例如IIS、Apache、Nginx等提供对外访问

113 POP3 110端口是为POP3服务开放的

143 IMAP 143端口主页用于Internet Message

443 HTTPS 网页浏览端口，能提供加密和通过安全端口传输的另一种HTTP

3306 MySQL  3306端口是MySQL数据库的默认端口，用于MySQL对外提供服务

8080 代理端口 8080端口同80端口，是被用于www代理服务的，可以实现网页浏览，经常在访问某个网站或使用代理服务器时会加上8080端口，此外Apache Tomcat web server默认服务端口就是8080

清除端口进程

```shell
kill [信号] PID//pid号
```

kill信号

```shell
kill -0:程序退出时收到该信息
kill -1:挂掉电话线或者终端连接的挂起信号，这个信号也会造成某些进程在没有终止的情况下重新初始化
kill -2:表示结束进程，但不是强制性的，常用的ctrl+c就是发出一个kill -2命令
kill -3:退出
kill -9:杀死进程，即强制结束进程，有可能会导致程序崩溃等
kill -11:段错误
kill -15:正常结束进程，是kill命令段默认信号
```

删除文件/文件夹

```shell
rm -f filename

rm -rf filename
```

set

set命令用于设置shell



关机/重启

```shell
## 立即关机
shutdown -h now
## 10分钟后关机
shutdown -h 10
## 立刻关机
power off
## 重启
reboot
## 重启
shutdown -r now
```

传输文件

```shell
## 从服务器上下载文件
scp username@servernama:/path/filename /var/www/local_dir

## 上传文件到服务器
scp /path/filename username@servernama:/path

## 下载目录
scp -r username@servernama:/path/ /var/www/local_dir

## 上传目录
scp -r /var/www/local_dir username@servernama:/path
```

修改文件

```shell
sed 's/properties/property/g' build.xml
## 批量替换
grep -ilr 'log(' *|xargs-|@ sed -i "'s/print(///Log(/g'@
## 
sed -i "s/hello/hi/g" test.txt
## 删除行首空格
sed -i 's/^ //g'test
## 删除行尾空格
sed -i 's/$//g' test
## 替换当前目录中所有含有hello字符的文件中的hello为hi
sed -i "s/hello/hi/g" `grep "hello" -rl ./`
## 批量操作当前目录以m开头的文件
sed -i 's/foo/bar/g' ./m*
## 查找所有子目录中m开头的文件并进行替换
sed -i 's/foo/bar/g' `grep foo -rl --include="m*" ./`
```



### systemd

历史上，linux的启动一直采用init进程

init进程有两个缺点：

启动时间长、启动脚本复杂

systemd就是为解决这个问题而生的，d是守护进程daemon的缩写。

systemd取代了initd，成为了系统的第一个进程（pid等于1），其他进程都是它的子进程

systemd的优点是功能强大，使用方便，缺点是体系庞大，非常复杂

systemd的常用命令

```shell
## 重启系统
sudo systemctl reboot
## 关闭系统，切断电源
sudo systemctl poweroff
## cpu停止工作
sudo systemctl halt
## 暂停系统
sudo systemctl suspend
## 让系统进入冬眠状态
sudo systemctl hibernate
## 让系统进入交互式休眠状态
sudo systemctl hybrid-sleep
## 启动救援状态
sudo systemctl rescue
```

查看本机信息

```shell
## 查看当前主机信息
hostnamectl

## 设置主机名
sudo hostnamectl set-hostname rhel7

## 查看本地化设置
localectl

## 设置本地化参数
sudo localectl set-locale LANG=en_GB.utf8
sudo lccalectl set-keymap en_GB

## 查看当前登陆的用户
loginctl list-users

## 列出当前session
loginctl list-sessions

## 列出显示指定用户的信息
loginctl show-user ruanyf

## 查看当前时区设置
timedatectl 

## 显示所有可用的时区
timedatectl list-timezones

## 设置当前时区
sudo timedatectl set-timezone America/New_York
sudo timedatectl set-time YYYY-MM-DD
sudo timedatectl set-time HH:MM:SS
```

查看Unit信息



nohup命令

nohup命令用于在后台不挂断地运行命令，挂起进程，退出终端不会影响程序的运行

nohup命令在默认情况下，也就是非重定向时，会输出一个名叫nohup。out的文件到当前目录，如果当前目录到nohup。out文件不可写，输出到HOME/nohu。pout文件中

```shell
nohup ./nebula-httpd &
```



#### node应用的systemd启动

创建配置文件,后缀为service

```bash
[Unit]
Description=node simple server

[Service]
##启动命令
ExecStart=
Restart=always
User=nobody
Group=nobody
Environment=PATH=/usr/bin:/user/local/bin
Environment=NODE_ENV=production
WorkingDirectory=/tmp/node-systemd-demo

[Install]
WantedBy=multi-user.target
```

将配置文件拷贝到systemd之中

```shell
sudo cp node-server.service /etc/systemd/system
```

重载配置文件

```shell
sudo systemctl daemon-reload
```



### 内存信息

free命令可以显示Linux系统中空闲的、已用的物理内存及swap内存,及被内核使用的buffer。在Linux系统监控的工具中，free命令是最经常使用的命令之一

free 命令显示系统使用和空闲的内存情况，包括物理内存、交互区内存(swap)和内核缓冲区内存。共享内存将被忽略

-b 以Byte为单位显示内存使用情况。 

-k 以KB为单位显示内存使用情况。 

-m 以MB为单位显示内存使用情况。

-g  以GB为单位显示内存使用情况。 

-o 不显示缓冲区调节列。 

-s<间隔秒数> 持续观察内存使用状况。 

-t 显示内存总和列。 

-V 显示版本信息。

为了提高磁盘存取效率, Linux做了一些精心的设计, 除了对dentry进行缓存(用于VFS,加速文件路径名到inode的转换), 还采取了两种主要Cache方式：Buffer Cache和Page Cache。前者针对磁盘块的读写，后者针对文件inode的读写。这些Cache有效缩短了 I/O系统调用(比如read,write,getdents)的时间。

磁盘的操作有逻辑级（文件系统）和物理级（磁盘块），这两种Cache就是分别缓存逻辑和物理级数据的。

### 什么命令都不能用了

环境变量配置错误造成的，输入

```shell
export PATH=/usr/local/sbin:usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin:/root/bin
```

或者手动在/etc/profile中添加此行



## 用户



普通用户可以用sudo

如果提示不再sudoers文件中，在sudoers文件中添加用户

```shell
vim /etc/sudoers
```

添加语句

```properties
username ALL=(ALL)  ALL
```





## 连接

linux最重要的用途还是服务器吧，目前绝大多数服务器都是linux系统。centos或者ubuntu、debian，在本地可以远程连接服务器进行操作

通过密码连接服务器

直接输入命令

```linux
ssh 用户名@IP地址 -p 端口号
```

运行后会要求输入密码，输入即可登录

通过密钥连接服务器

首先在服务器端创建密钥对，下载私钥

将私钥保存在.ssh文件下，如果没有.ssh目录，创建一个

```mac
cd ~
mkdir .ssh
```

修改密钥权限

```mac
cd ~/.ssh
chmod 400 密钥文件名
```

通过ssh密钥方式连接服务器

```linux
ssh -i ~/.ssh/mac root@192.168.0.1
```

~/.ssh/mac为下载的私钥的路径和文件名

root是服务器端管理员账号，一般是root

192.168.0.1是服务器的公网ip

终端变成root就说明连接成功

让mac终端始终保持与远程连接状态（Broken pipe）

```linux
sudo vim /etc/ssh/ssh_config
```

添加设置

```linux
# 断开时重试连接的次数
ServerAliveCountMax 5
# 每隔5s发送一个空请求以保持连接
ServerAliveInterval 5
```





## 快捷键

　　启动终端：ctrl+alt+T

​        创建目录：mkdir

​        返回上层目录：cd ..

​        停止运行：Ctrl+c

​        关闭终端   Ctrl+alt+Q

​        新建终端   Ctrl+alt+N



## 增加CPU占有率

```shell
for i in `seq 1 $(cat/proc/cpuinfo |grep "physical id" |wc -l)`;do dd if=/dev/zero of=/dev/null & done
```



## centos

查找操作系统的内核版本

```shell
uname -r
```

更新系统底层的库文件

```centos
yum update
```





## Vim

vim命令

```vim
:w 保存文件但不退出vim 
:w! 强制保存文件但不退出vim 
:wq 保存文件并退出vim
:wq!强制保存文件并退出vim
:q 不保存文件直接退出
:q! 不保存文件强制退出vim
:e! 放弃所有修改，从上次保存文件开始再编辑命令历史
```



## linux下软件包

linux下应用程序的软件包按**内容类别**分为两类：

1.可执行文件(编译后的二进制软件包)

解压包之后就可以直接运行，类似于windows下的软件包，安装完可以直接使用，但是看不到源程序，而且下载时要注意这个软件是否是你所使用的平台，否则无法正常安装，如centos与ubuntu

优点：使用简单，只需要几个命令就能实现软件包的安装、卸载、升级、查询，安装速度快

缺点：不能看源代码，功能选择不如源代码灵活，依赖性

2.源程序(源码包)

解开包之后你还需要使用编译器将其编译为可执行文件，这是linux独有的，windows的思想是不开放源程序

优点：开源，可以自由选择所需功能，可看源码，卸载方便

缺点：安装步骤过多，编译时间过长

二进制软件包与源码包区别：

与直接从源代码安装相比，软件包管理易于安装和卸载，易于更新已安装的软件包，易于保护配置文件，易于跟踪已安装文件

通常用tar打包的都是源程序，用rpm、dpkg打包的则常是可执行程序，一般来说，自己动手打包源程序更具灵活性，但是容易遇到各种问题，而可执行程序包更容易安装，但是灵活性会差很多，所以一般一个软件会提供多种打包格式的安装程序。

linux下应用程序的软件包按**格式**分类：

linux下的软件安装包主要有rpm、deb、tar.gz三种格式

软件后缀为.rpm最初是Red Hat Linux提供的一种包封装格式，rpm较deb发行早，所以现在许多linux发行版本都使用。rpm包本质就是一个可以在特定机器上运行的Linux软件，可以在红帽Linux、Suse、Fedora直接进行安装，但在Ubuntu上无法识别

软件后缀为.deb是Debian linux提供的包封装格式。deb的包管理器dpkg只在debian上有，ubuntu也支持，可以在ubuntu上进行安装

软件后缀.tar.gz、tar.Z、tar.bz2、.tgz是使用unix系统打包工具tar打包的。tar包在所有Linux版本中都能运行，但是安装过程也最麻烦，tar包就是一个压缩包，是为了便于传输所产生的一种专门用于网络流通的文件格式，tar包与deb、rpm包相比，tar包不一定是软件，也可能是图片、文本等等

软件后缀为.bin的一般是一些商业软件

### 安装方法

rpm包：

查询系统中所有的rpm包

```shell
rpm -qa

## 查询所有包含某个字符串sql的软件包
rpm -qa |grep sql
```

安装

```shell
rpm -i your-package.rpm
## 强制安装
rpm -i --force your-package.rpm
```

卸载（后缀不能包含rpm）

```shell
rpm -e your-package
```

升级软件包

```shell
rpm -Uvh your-package.rpm
```

安装rpm-build

```shell
yum list |grep rpm-build
yum install -y rpm-build.x86_64
```





tar包：



### 下载方法

wget可以下载整个页面和文件

wget会遵守robots.txt文件。

```shell
 wget -r -p -e robots=off http://www.example.com
```



### 安装cmake

准备编译环境

```shell
yum -y install gcc gcc-c++
```

获取源码并解压

```shell
wget https://github.com/Kitware/CMake/releases/download/3.15.5/cmake-3.15.5.tar.gz
## 备用下载地址 https://down.24kplus.com/linux/cmake/cmake-3.15.5.tar.gz

tar -zxf cmake-3.15.5.tar.gz

cd cmake-3.15.5
```

编译安装

```shell
./bootstrap --prefix=/usr --datadir=share/cmake --docdir=doc/cmake && make 
sudo make install
```

验证安装

```shell
cmake --version
```



### rpm-build

如果你想打包rpm包，可能还需要rpm-build包

```shell
sudo yum install rpm-build 
```





## Selinux

安全增强型 Linux（SELinux）是一种采用安全架构的 [Linux® 系统](https://www.redhat.com/zh/topics/linux/what-is-linux)，它能够让管理员更好地管控哪些人可以访问系统。它最初是作为 [Linux 内核](https://www.redhat.com/zh/topics/linux/what-is-the-linux-kernel)的一系列补丁，由美国国家安全局（NSA）利用 Linux 安全模块（LSM）开发而成。

SELinux 于 2000 年发布到开源社区，并于 2003 年集成到上游 Linux 内核中。

SELinux 定义了每个人对系统上的应用、进程和文件的访问权限。它利用安全策略（一组告知 SELinux 哪些能访问，哪些不能访问的规则）来强制执行策略所允许的访问。

当应用或进程（称为主体）发出访问对象（如文件）的请求时，SELinux 会检查访问向量缓存（AVC），其中缓存有主体和对象的访问权限。

查看selinux状态

```shell
## 命令1
/usr/sbin/sestatus -v
## SELinux status:                 enabled
## 命令2
getenforce
```

临时关闭

```shell
setenforce 0 ##设置SELinux 成为permissive模式
##setenforce 1 设置SELinux 成为enforcing模式
```

也可以修改/etc/selinux/config 文件

将SELINUX=enforcing改为SELINUX=disabled

## firewalld和utf



### 全局端口转发

iptables 是一个配置 Linux 内核 防火墙 的命令行工具，是 netfilter 项目的一部分。
 术语 iptables 也经常代指该内核级防火墙。
 iptables 用于 ipv4，ip6tables 用于 ipv6。
 需要root账户执行以下操作

开启iptables

```shell
echo 1 >/proc/sys/net/ipv4/ip_forward
```

默认值0是禁止ip转发，修改为1即开启ip转发功能。

简单转发

```shell
#-- 把访问本机 8091 端口的请求转发到 8090端口
$ iptables -t nat -A PREROUTING -p tcp --dport 8091 -j REDIRECT --to-ports 8090
#-- 把访问本机 8093 端口的请求转发到 192.168.1.3 的 8090端口
$ iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 8093 -j DNAT --to 192.168.1.3:8090
```



## 定时执行脚本

crontab可以在指定的时间执行一个shell脚本以及一系列Linux命令

常用于定时备份数据库、日志等

常用命令

```shell
crontab -e     ##修改crontab文件，
crontab -l     ##显示crontab文件
crontab -r     ##删除crontab文件
crontab -ir    ##删除crontab文件之前提醒用户

service crond status
service crond start
service crond stop
service crond restart
service crond reload
```

基本格式

```shell
* * * * * command
#分 时 日 月 周 + 命令
10 0 * * * command ./a.sh
## 每天0点10分执行命令
```



## Apache

apache在linux下的文件是httpd，centos自带apache,文件目录为cd/etc/init.d

启动apache服务

```centos
service httpd start
service httpd restart
service httpd stop
```



## 部署项目

### react

system limit for number of file watchers reached 

文件监控数量超过了系统限制，直接修改系统参数

```shell
cat /proc/sys/fs/inotify/max_user_matches
##8192
sudo vim /etc/sysctl.conf

## 添加语句 fs.inotify.max_user_watches=524288

sudo sysctl -p 

cat /proc/sys/fs/inotify/max_user_matches
##524288
```

### Node

运行命令

```shell
## 14.*
curl -sL https://rpm.nodesource.com/setup_14.x | bash -
## 12.*
curl -sL https://rpm.nodesource.com/setup_12.x | bash -

yum -y install nodejs

## 安装gcc插件
yum install gcc-c++ cmake
```



## 服务器翻墙GitHub太慢问题

使用代理网址https://github.com.cnpmjs.org/



## linux端口无法访问问题排查

1.确认服务器的项目部署成功

2.确认访问地址是否存在。访问地址和端口是否正常。

3.确定服务器安全规则是否添加了要访问的端口。在控制台检查安全规则。

4.连接服务器的用户。一般服务器有root管理员，和其他个人创建用户。

5.服务器防火墙问题。服务器一般配置80端口为开放端口，在外网访问服务器80端口



使用telnet判断端口是否可以访问

```shell
telnet 47.49.182.93:7001
```





　　

## docker

Docker作为容器管理的平台，早已在服务部署等领域有非常广泛的应用。容器是轻量级的虚拟化方案，依托于overlayfs、Linux下的namespace、cgroups等OS级别的虚拟化技术，性能相比于基于VM的虚拟化更加突出。

更重要的是，通过Docker安装和配置软件更加方便

移除可能有旧的Docker版本

```shell
yum erase -y docker docker-common docker-engine
```

安装工具包和依赖，设置仓库源

```linux
yum install -y yum-utils device-mapper-persistent-data lvm2
yum-config-manager \ 
    --add-repo \
    https://download.docker.com/linux/centos/docker-ce.repo
```

使用yum安装docker-ce

```linux
##最新稳定版
yum install docker-ce docker-ce-cli containerd.io
##指定版本
yum install docker-ce-18.09.6 docker-ce-cli-18.09.6 containerd.io
```

启动docker服务

```centos
systemctl start docker
```

检查docker的信息和版本

```dockerfile
docker version
docker info
```

验证docker，通过下载镜像和创建容器来看看Docker是否可以运转起来。可以使用下面的命令从Docker的镜像仓库下载名为hello-world的镜像文件。

```shell
docker pull hello-world
```

docker安装容器

```shell
docker pull gitlab/gitlab-ce
```

如果docker拉取较慢更换docker源，docker默认为docker国内镜像，可以腾讯源、中科大源或者dcloud

启动容器

```dockerfile
docker run 
```

查看容器



## V2ray

一键安装脚本

```linux
bash <(curl -s -L https://git.io/v2ray.sh)
```

运行后自动安装，安装过程中：

输入1进行安装

选择tcp协议（默认）

选择端口号：为了不和别的软件冲突，推荐使用10000以上不超过65535的端口号，我选的10086

广告拦截：是否开启广告拦截，推荐不要开启，开启广告拦截会消耗服务器资源，且国外环境略由于国内环境

配置shadowsocks：选择开启，后面使用游戏加速器会用上

选择shadowsocks端口号：随意，不要和上面v2ray一样，我选2333

ss连接密码：123456

ss加密协议：选择默认

然后继续回车，直到安装完毕

开启BBR加速：google BBR是一款免费开源的TCP拥塞控制传输协议，可以使linux服务器显著提高吞吐量和减少TCP连接的延迟

修改系统变量

```linux
echo "net.core.default_qdisc=fq" >> /etc/sysctl.conf
echo "net.ipv4.tcp_congestion_control=bbr" >>/etc/sysctl.conf
```

保存生效

```linux
sysctl -p
```

检查BBR是否开启

```linux
sysctl net.ipv4.tcp_available_congestion_control
```

返回变量==bbr则说明开启成功

检查BBR是否启动成功

```linux
lsmod | grep bbr
```

如果返回tcp_bar 20480说明启动成功

### 客户端使用

windows客户端使用v2rayN

​       在服务器端输入v2ray url，复制vmess链接

​      下载v2rayN软件，打开软件点击服务器，点击从剪贴板批量导入url

​      右键点击刚刚导入的服务器，测试服务器延迟，表示连接成功

​      在小图标点击右键，选择pcahttp代理模式，表示只有被墙的网站才会启用代理，全局模式是所有链接都走代理

mac端使用v2rayU

ios端使用shadowsocks扫描

Android端使用v2rayNG

在服务器端输入

```linux
v2ray qr
```

打开二维码链接，然后在手机上下载v2rayNG，打开客户端用扫一扫扫描二维码就能添加到节点

路由器端

在服务器段输入

```linux
v2ray url
```

复制链接，代开路由器端openwrt，勾选代理开关，点击服务器列表，在通过vmess链接添加节点处粘贴刚刚复制的链接

然后点击账号设置，代理模式选择gtwlist模式，服务器选择刚刚添加的服务器，点击提交就完成

https://noobyy.com/31.html

## Nextcloud个人网盘服务器















