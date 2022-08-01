---
###title: Docker学习
date: 2020-05-02 21:40:33
categories: IT
tags:
    - 
toc: true
thumbnail: http://cdn.kunkunzhang.top/docker.png
---

## 概述

　　Docker容器部署

<!--more-->

## 安装

### 原理

由于 `Docker` 的容器隔离依赖于 `Linux` 内核中的相关支持，所以使用 `Docker` 首先需要确保安装机器的 `Linux kernel`中包含 `Docker` 所需要使用的特性。以目前 Docker 官方主要维护的版本为例，我们需要使用基于 `Linux kernel 3.10` 以上版本的 `Linux` 系统,也就是centos7、debian7、ubuntu14以上的系统版本来安装 `Docker.`

`Windows` 和 `macOS` 中没有 `Docker`能够利用的 `Linux` 环境，那么我们生造一个 `Linux` 环境就行啦！`Docker for Windows`和 `Docker for Mac` 正是这么实现的…

由于虚拟化在云计算时代的广泛使用，`Windows` 和 `MacOS` 也将虚拟化引入到了系统本身的实现中，这其中就包含了之前我们所提到的通过 `Hypervisor`实现虚拟化的功能。在 `Windows` 中，我们可以通过 `Hyper-V` 实现虚拟化，而在 `macOS` 中，我们可以通过 HyperKit 实现虚拟化

`Docker for Windows` 和 `Docker for Mac` 这里利用了这两个操作系统提供的功能来搭建一个虚拟 `Linux` 系统，并在其之上安装和运行 `docker daemon`

### Mac os

使用homebrew安装

```mac
brew cask install docker
```

手动安装

下载stable版本的dmg文件，

检查是否安装成功

```dockerfile
docker --version
```

查看docker配置

```dockerfile
docker info
```

### Linux

移除可能有旧的Docker版本

```shell
yum erase -y docker docker-common docker-engine
```

安装工具包和依赖，设置仓库源

```shell
yum install -y yum-utils device-mapper-persistent-data lvm2
yum-config-manager \ 
    --add-repo \
    https://download.docker.com/linux/centos/docker-ce.repo
```

用yum安装docker-ce

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

```shell
docker version
docker info
```

验证docker，通过下载镜像和创建容器来看看Docker是否可以运转起来。可以使用下面的命令从Docker的镜像仓库下载名为hello-world的镜像文件。

```shell
docker pull hello-world
```

docker安装容器

```dockerfile
docker pull gitlab/gitlab-ce
```

如果docker拉取较慢更换docker源，docker默认为docker国内镜像，可以腾讯源、中科大源或者dcloud

启动容器



## 基本概念

在 `Docker` 体系里，有四个对象 (`Object`) 是我们不得不进行介绍的，因为几乎所有 `Docker` 以及周边生态的功能，都是围绕着它们所展开的。它们分别是：镜像 ( `Image` )、容器 ( `Container` )、网络 ( `Network` )、数据卷 ( `Volume` )

所谓镜像，可以理解为一个只读的文件包，其中包含了虚拟环境运行最原始文件系统的内容

容器就是用来隔离虚拟环境的基础设施，而在 `Docker` 里，它也被引申为隔离出来的虚拟环境。

如果把镜像理解为编程中的类，那么容器就可以理解为类的实例。镜像内存放的是不可变化的东西，当以它们为基础的容器启动后，容器内也就成为了一个“活”的空间

一个容器由三个部分组成：一个docker镜像、一个程序运行环境、一个指令集合

网络：在 `Docker` 中，实现了强大的网络功能，我们不但能够十分轻松的对每个容器的网络进行配置，还能在容器间建立虚拟网络，将数个容器包裹其中，同时与其他网络环境隔离

在以往的虚拟机中，我们通常直接采用虚拟机的文件系统作为应用数据等文件的存储位置。然而这种方式其实并非完全安全的，当虚拟机或者容器出现问题导致文件系统无法使用时，虽然我们可以很快的通过镜像重置文件系统使得应用快速恢复运行，但是之前存放的数据也就消失了。

为了保证数据的独立性，我们通常会单独挂载一个文件系统来存放数据。这种操作在虚拟机中是繁琐的，因为我们不但要搞定挂载在不同宿主机中实现的方法，还要考虑挂载文件系统兼容性，虚拟操作系统配置等问题。值得庆幸的是，这些在 Docker 里都已经为我们轻松的实现了，我们只需要简单的一两个命令或参数，就能完成文件系统目录的挂载。

能够这么简单的实现挂载，主要还是得益于 `Docker` 底层的 Union File System 技术。在 `UnionFS` 的加持下，除了能够从宿主操作系统中挂载目录外，还能够建立独立的目录持久存放数据，或者在容器间共享。

在 `Docker` 中，通过这几种方式进行数据共享或持久化的文件或目录，我们都称为数据卷 ( `Volume` )…

## 报错处理

### rate limit

docker拉取镜像时报错

```shell
Error response from daemon:toomanyrequests: You have reached your pull rate limit
```

dockerhub从2020年11月2日起限制非付费用户的拉取频率：

匿名用户每6小时允许pull100次，

已登录用户每6小时允许pull200次

方法：修改拉取的镜像源

```shell
vim /etc/docker/daemon.json
```

添加中科大的镜像源

```json
{
  "registry-mirrors":["https://ustc-edu-cn.mirror.aliyuncs.com"]
}
```

重启docker服务

```shell
systemctl daemon-reload && systemctl restart docker
```





## Dockerfile

Dockerfile 是一个用来构建镜像的文本文件，文本内容包含了一条条构建镜像所需的指令和说明。通过 `Dockerfile` 我们可以更加清晰、明确的给定 `Docker` 镜像的制作过程，而由于其仅是简单、小体积的文件，在网络等其他介质中传递的速度极快，能够更快的帮助我们实现容器迁移和集群部署

`Dockerfile` 的指令简单分为五大类：

- **基础指令**：用于定义新镜像的基础和性质。
- **控制指令**：是指导镜像构建的核心部分，用于描述镜像在构建过程中需要执行的命令。
- **引入指令**：用于将外部文件直接引入到构建镜像内部。
- **执行指令**：能够为基于镜像所创建的容器，指定在启动时需要执行的脚本或命令。
- **配置指令**：对镜像以及基于镜像所创建的容器，可以通过配置指令对其网络、用户等内容进行配置

通常来说，我们不会从零开始搭建一个镜像，而是会选择一个已经存在的镜像作为我们新镜像的基础，这种方式能够大幅减少我们的时间。

在 `Dockerfile` 里，我们可以通过 `FROM` 指令指定一个基础镜像，接下来所有的指令都是基于这个镜像所展开的。在镜像构建的过程中，`Docker` 也会先获取到这个给出的基础镜像，再从这个镜像上进行构建操作。

实例

```dockerfile
FROM nginx
RUN echo '这是一个本地构建的nginx镜像' > /usr/share/nginx/html/index.html
```

RUN：用于执行后面跟着的命令行命令。有以下俩种格式：

执行命令 shell格式

```dockerfile
RUN <命令行命令>
```

执行可执行文件 exec格式

```dockerfile
RUN ["可执行文件", "参数1", "参数2"]
```

特别注意，Dockerfile 的指令每执行一次都会在 docker 上新建一层。所以过多无意义的层，会造成镜像膨胀过大。

通过 `EXPOSE` 指令就可以为镜像指定要暴露的端口。



VOLUME：定义匿名数据卷。在启动容器时忘记挂载数据卷，会自动挂载到匿名卷。

作用：避免重要的数据因容器重启而丢失，避免容器不断变大。

CMD：类似于RUN指令。RUN指令在docker build时运行，CMD是在docker run时运行。

在制作新的镜像的时候，我们可能需要将一些软件配置、程序代码、执行脚本等直接导入到镜像内的文件系统里，使用 `COPY` 或`ADD` 指令能够帮助我们直接从宿主机的文件系统里拷贝内容到镜像里的文件系统中。

构建镜像

```dock
docker build -t nginx:test .
```

最后的.点是上下文路径，上下文路径是指 docker 在构建镜像，有时候想要使用到本机的文件（比如复制），docker build 命令得知这个路径后，会将路径下的所有内容打包。

​       优点：在执行 <源文件> 为 tar 压缩文件的话，压缩格式为 gzip, bzip2 以及 xz 的情况下，会自动复制并解压到 <目标路径>。

​        缺点：在不解压的前提下，无法复制 tar 压缩文件。会令镜像构建缓存失效，从而可能会令镜像构建变得比较缓慢。具体是否使用，可以根据是否需要自动解压来决定。

### 使用技巧

在 `Dockerfile` 里，我们可以用 `ARG` 指令来建立一个参数变量，我们可以在构建时通过构建指令传入这个参数变量，并且在 `Dockerfile`里使用它。

例如，我们希望通过参数变量控制 `Dockerfile` 中某个程序的版本，在构建时安装我们指定版本的软件，我们可以通过 `ARG` 定义的参数作为占位符，替换版本定义的部分

环境变量也是用来定义参数的东西，与 `ARG`指令相类似，环境变量的定义是通过 `ENV` 这个指令来完成的



## 容器

Docker 容器的生命周期里分为五种状态，其分别代表着

- `Created`：容器已经被创建，容器所需的相关资源已经准备就绪，但容器中的程序还未处于运行状态。
- `Running`：容器正在运行，也就是容器中的应用正在运行。
- `Paused`：容器已暂停，表示容器中的所有程序都处于暂停 ( 不是停止 ) 状态。
- `Stopped`：容器处于停止状态，占用的资源和沙盒环境都依然存在，只是容器中的应用程序均已停止。
- `Deleted`：容器已删除，相关占用的资源及存储在 `Docker` 中的管理信息也都已释放和移除…

创建容器

```dockerfile
sudo docker create --name nginx nginx:1.12
```

--name后面跟的是指定容器的名称

启动容器

```shell
sudo docker start nginx
```

nginx为之前创建容器时指定的名称，启动之后为running状态，只要应用程序还在运行，那么容器的状态就会是 `Running`，除非进行一些修改容器的操作。

创建容器和启动容器也可以合并为一步run命令，

```shell
sudo docker run --name nginx -d nginx:1.12
```

通过 `docker run` 创建的容器，在创建完成之后会直接启动起来，不需要我们再使用 `docker start` 去启动了。

管理容器

容器创建和启动后，除了关注应用程序是否功能正常外，我们也会关注容器的状态等内容.使用docker ps罗列出 `Docker` 中的容器

```shell
docker ps
```

默认情况下，`docker ps` 列出的容器是处于运行中的容器，如果要列出所有状态的容器，需要增加 `-a` 或 `--all`选项

docker logs 显示容器的标准输出

停止和删除容器

docker stop 停止正在运行的容器

正在运行中的容器默认情况下是不能被删除的，我们可以通过增加 `-f` 或 `--force` 选项来让 `docker rm` 强制停止并删除容器，不过不建议这样做。

进入容器

很多时间，我们需要的操作并不仅仅是按镜像所给出的命令启动容器而已，我们还会希望进一步操作容器，这时候最佳的方式就是让我们进入到容器了

`Docker` 为我们提供了一个命令 `docker exec` 来让容器运行我们所给出的命令

```shell
sudo docker exec nginx more /etc/hostname
```



### 容器网络

容器网络模型为容器引擎提供了一套标准的网络对接范式，而在 `Docker` 中，实现这套范式的是 `Docker` 所封装的 `libnetwork` 模块。

`Docker` 官方为我们提供了五种 `Docker`网络驱动，分别是：`Bridge Driver`、`Host Driver`、`Overlay Driver`、`MacLan Driver`、`one Driver`。

`Bridge Driver` 和 `Overlay Driver` 在开发中使用频率较高。`Bridge` 网络是 `Docker` 容器的默认网络驱动，简而言之其就是通过网桥来实现网络通讯 ( 网桥网络的实现可以基于硬件，也可以基于软件 )。

`Overlay` 网络是借助 `Docker` 集群模块 `Docker Swarm`来搭建的跨 `Docker Daemon` 网络，我们可以通过它搭建跨物理主机的虚拟网络，进而让不同物理机中运行的容器感知不到多个物理机的存在。

创建网络

在 `Docker` 里，我们也能够创建网络，形成自己定义虚拟子网的目的。

在`docker CLI` 里与网络相关的命令都以 `network` 开头，创建网络的命令是 `docker network create`

```shell
sudo docker network create -d bridge individual
```

通过 `-d` 选项我们可以为新的网络指定驱动的类型，其值可以是刚才我们所提及的 `bridge`、`host`、`overlay`、`maclan`、`none`，也可以是其他网络驱动插件所定义的类型。这里我们使用的是 `Bridge Driver` ( 当我们不指定网络驱动时，`Docker`也会默认采用 `Bridge Driver`作为网络驱动 )

查看网络

通过 `docker network ls` 或是 `docker network list` 可以查看 `Docker` 中已经存在的网络



查看网络详情

我们通过 `docker inspect` 观察一下此时的容器网络



端口映射

有一个非常常见的需求，就是我们需要在容器外通过网络访问容器中的应用。最简单的一个例子，我们提供了 Web 服务，那么我们就需要提供一种方式访问运行在容器中的 Web 应用。

通过 `Docker` 端口映射功能，我们可以把容器的端口映射到宿主操作系统的端口上，当我们从外部访问宿主操作系统的端口时，数据请求就会自动发送给与之关联的容器端口

要映射端口，我们可以在创建容器时使用 `-p` 或者是 `--publish`选项

```shell
sudo docker run -d --name nginx -p 80:80 -p 443:443 nginx:1.12
```

使用端口映射选项的格式是 `-p <ip>:<host-port>:<container-port>`，其中 `ip` 是宿主操作系统的监听 `ip`，可以用来控制监听的网卡，默认为 `0.0.0.0`，也就是监听所有网卡。`host-port` 和 `container-port` 分别表示映射到宿主操作系统的端口和容器的端口，这两者是可以不一样的，我们可以将容器的 `80` 端口映射到宿主操作系统的 8080 端口，传入 `-p 8080:80` 即可。

在`Docker for Windows` 或 `Docker for` 中，这个端口映射的操作程序会自动帮助我们完成，所以我们不需要做任何额外的事情，就能够直接使用 `Windows` 或 `macOS` 的端口访问容器端口了。

而当我们使用 `Docker Toolbox` 时，由于其自动化能力比较差，所以需要我们在 `VirtualBox` 里单独配置这个操作系统端口到 `Linux` 端口的映射关系。



### 容器互联



## 镜像

### 镜像基本操作

镜像是由 `Docker` 进行管理的，所以它们的存储位置和存储方式等我们并不需要过多的关心，我们只需要利用 `Docker` 所提供的一些接口或命令对它们进行控制即可

要查看当前连接的 `docker daemon` 中存放和管理了哪些镜像，我们可以使用 `docker images`这个命令

```shell
docker images
```

可以输出镜像的iD、构建时间（created time）、大小（size）等数据

`username`： 主要用于识别上传镜像的不同用户，与 GitHub 中的用户空间类似。

`repository`：主要用于识别进行的内容，形成对镜像的表意描述。

`tag`：主要用户表示镜像的版本，方便区分进行内容的不同细节

查看镜像的详细信息

```shell
docker inspect redis:3.2
```



拉取镜像

```shell
docker pull ubuntu
```

`Docker` 会开始从镜像仓库中拉取我们所指定的镜像了，在控制台中，我们可以看到镜像拉取的进度。下载进度会分为几行，其实每一行代表的就是一个镜像层。`Docker` 首先会拉取镜像所基于的所有镜像层，之后再单独拉取每一个镜像层并组合成这个镜像。当然，如果在本地已经存在相同的镜像层 ( 共享于其他的镜像 )，那么 `Docker` 就直接略过这个镜像层的拉取而直接采用本地的内容。

当我们没有提供镜像的标签时，`Docker` 会默认使用 `latest` 这个标签

删除镜像

虽然 `Docker` 镜像占用的空间比较小，但日渐冗杂的镜像和凌乱的镜像版本会让管理越来越困难，所以有时候我们需要清理一些无用的镜像，将它们从本地的 `Docker Engine` 中移除

```shell
sudo docker rmi ubuntu:latest
```



### 保存和共享镜像

`Docker` 镜像的本质是多个基于 `UnionFS` 的镜像层依次挂载的结果，而容器的文件系统则是在以只读方式挂载镜像后增加的一个可读可写的沙盒环境。

基于这样的结构，`Docker` 中为我们提供了将容器中的这个可读可写的沙盒环境持久化为一个镜像层的方法。更浅显的说，就是我们能够很轻松的在 `Docker` 里将容器内的修改记录下来，保存为一个新的镜像。

将容器修改的内容保存为镜像的命令是 `docker` commit，由于镜像的结构很像代码仓库里的修改记录，而记录容器修改的过程又像是在提交代码，所以这里我们更形象的称之为提交容器的更改

```shell
sudo docker commit -m "Configured" webapp
```



我们发现提交容器更新后产生的镜像并没 `REPOSITORY` 和 `TAG` 的内容，也就是说，这个新的镜像还没有名字。

## Docker-hub

`Docker Hub` 是 `Docker` 官方建立的中央镜像仓库，除了普通镜像仓库的功能外，它内部还有更加细致的权限管理，支持构建钩子和自动构建，并且有一套精致的 Web 操作页面

由于定位是 `Docker` 的中央镜像仓库系统，同时也是 `Docker Engine` 的默认镜像仓库，所以 `Docker Hub` 是开发者共享镜像的首选，那么也就意味着其中的镜像足够丰富

`Docker Hub` 提供了一套完整的 `Web` 操作界面，所以我们搜索其中的镜像会非常方便

`OFFICIAL`代表镜像为 `Docker` 官方提供和维护，相对来说稳定性和安全性较高

`STARS` 代表镜像的关注人数，这类似 `GitHub` 的 `Stars`，可以理解为热度

`PULLS` 代表镜像被拉取的次数，基本上能够表示镜像被使用的频度

使用docker search能够搜索docker hub中的镜像

```shell
docker search ubuntu
```



## Docker-machine





## Docker-compose

是用于定义和运行多容器 Docker 应用程序的工具。通过 Compose，您可以使用 YML 文件来配置应用程序需要的所有服务。然后，使用一个命令，就可以从 YML 文件配置中创建并启动所有服务。

docker compose的三步：

1.编写容器所需镜像的 `Dockerfile`。（如果必要）。

2.编写用于配置容器的 `docker-compose.yml`

3.使用docker-compose启动



创建docker-compose.yml文件进行配置

```yml
# yaml 配置
version: '3'
services:
  web:
    build: .
    ports:
     - "5000:5000"
  redis:
    image: "redis:alpine"
```

`version` 这个配置，这代表我们定义的 `docker-compose.yml` 文件内容所采用的版本，目前 `Docker Compose` 的配置文件已经迭代至了第三版，其所支持的功能也越来越丰富，所以我们建议使用最新的版本来定义。

`services`这块，是整个 `-compose.yml` 的核心部分，其定义了容器的各项细节。

`docker-compose`命令默认会识别当前控制台所在目录内的 `docker-compose.yml` 文件，而会以这个目录的名字作为组装的应用项目的名称。如果我们需要改变它们，可以通过选项 -f 来修改识别的 `Docker Compose` 配置文件，通过 -p 选项来定义项目名。

输入docker compose命令启动容器

```dockerfile
docker-compose up
```

虽然 `Docker Compose` 目前也是由 `Docker`官方主要维护，但其却不属于 `Docker Engine` 的一部分，而是一个独立的软件。所以如果我们要在 Linux 中使用它，还必须要单独下载使用。

`Docker Compose` 是一个由 `Python` 编写的软件，在拥有 `Python` 运行环境的机器上，我们可以直接运行它，不需要其它的操作。

### couldn't connect to Docker daemonat http+docker

docker没启动

先启动docker

```shell
sudo systemctl start docker
```

docker启动了但是有一些缓存影响了

重启docker

```bash
sudo systemctk restart docker
```

当前用户不在docker用户组

把自己加入docker用户组

```shell
sudo gpasswd -a ${USER} docker
```

权限问题

sudo

```shell
sudo docker-compose up
```

docker-compose版本太老



重启系统

```shell
sudo reboot
```

## 数据管理

Docker虽然有很多优势，但也有很多弊端，其中显著的两点就是

沙盒文件系统是跟随容器生命周期所创建和移除的，数据无法直接被持久化存储。

由于容器隔离，我们很难从容器外部获得或操作容器内部文件中的数据

`Docker` 容器文件系统是基于 `UnionFS`。由于 `UnionFS` 支持挂载不同类型的文件系统到统一的目录结构中，所以我们只需要将宿主操作系统中，文件系统里的文件或目录挂载到容器中，便能够让容器内外共享这个文件。

基于底层存储实现，`Docker` 提供了三种适用于不同场景的文件系统挂载方式：Bind `Mount`、`Volume` 和 `Tmpfs Mount`

- `Bind Mount` 能够直接将宿主操作系统中的目录和文件挂载到容器内的文件系统中，通过指定容器外的路径和容器内的路径，就可以形成挂载映射关系，在容器内外对文件的读写，都是相互可见的。
- `Volume` 也是从宿主操作系统中挂载目录到容器内，只不过这个挂载的目录由 Docker 进行管理，我们只需要指定容器内的目录，不需要关心具体挂载到了宿主操作系统中的哪里。
- `Tmpfs Mount` 支持挂载系统内存中的一部分到容器的文件系统里，不过由于内存和容器的特征，它的存储并不是持久的，其中的内容会随着容器的停止而消失



## Docker-Swam

通常是使用 `Docker Compose` 来定义集群，而通过 `Docker Swarm` 来部署集群。

要搭建 `Overlay Network` 网络，我们就要用到 `Docker Swarm` 这个工具了。`Docker Swarm`是 `Docker`内置的集群工具，它能够帮助我们更轻松地将服务部署到 `Docker daemon` 的集群之中。

对于 `Docker Swarm`来说，每一个 `Docker daemon` 的实例都可以成为集群中的一个节点，而在 `Docker daemon` 加入到集群成为其中的一员后，集群的管理节点就能对它进行控制。我们要搭建的 `Overlay` 网络正是基于这样的集群实现的。

初始化docker-swam

既然要将 `Docker`加入到集群，我们就必须先有一个集群，我们在任意一个 `Docker`实例上都可以通过 `docker swarm init` 来初始化集群

```shell
sudo docker swarm init
```

在集群初始化后，这个 `Docker` 实例就自动成为了集群的管理节点，而其他 `Docker` 实例可以通过运行这里所打印的 `docker swarm join` 命令来加入集群。

加入到集群的节点默认为普通节点，如果要以管理节点的身份加入到集群中，我们可以通过 `ocker swarm join-token` 命令来获得管理节点的加入命令。



### 建立跨主机网络

通过 `docker network create` 命令来建立 `Overlay` 网络

```shell
 sudo docker network create --driver overlay --attachable mesh
```



在创建了这个网络之后，我们可以在任何一个加入到集群的`Docker`实例上使用 `docker network ls` 查看一下其下的网络列表。我们会发现这个网络定义已经同步到了所有集群中的节点

```shell
sudo docker network ls
```

修改 `Docker Compose` 的定义，让它使用这个我们已经定义好的网络，而不是再重新创建网络。

只需要在`Docker Compose` 配置文件的网络定义部分，将网络的 `external` 属性设置为 `true`，就可以让`Docker Compose` 将其建立的容器都连接到这个不属于 `Docker Compose` 的项目上了。



## 搭建私有docker仓库

通过官方提供的私有仓库镜像`registry`来搭建私有仓库。通过 [humpback](https://humpback.github.io/) 快速搭建轻量级的Docker容器云管理平台

拉去registry

```shell
docker pull registry:2.6.2
```

为了定制一些配置，和在 [humpback](https://humpback.github.io/) 中使用，我们还需要提供一个定制化的配置文件（使用yml来编写配置文件），文件放在`/etc/docker/registry/config.yml`，如下

```yaml
version: 0.1
log:
  fields:
    service: registry
storage: 
  cache:
    blobdescriptor: inmemory
  filesystem:
    rootdirectory: /var/lib/registry
http:
  addr: :7000
  secret: docker-registry
  headers:
    X-Content-Type-Options: [nosniff]
    Access-Control-Allow-Headers: ['*']
    Access-Control-Allow-Origin: ['*']
    Access-Control-Allow-Methods: ['GET,POST,PUT,DELETE']
health:
  storagedriver:
    enabled: true
    interval: 10s
    threshold: 3
```



推送镜像到私有仓库

```shell
# 从官方仓库拉取一个镜像
docker pull nginx:1.13
# 为镜像 `nginx:1.13` 创建一个新标签 `192.168.99.100:7000/test-nginx:1.13`
docker tag nginx:1.13 192.168.99.100:7000/test-nginx:1.13
# 推送到私有仓库中
docker push 192.168.99.100:7000/test-nginx:1.13
# The push refers to a repository [192.168.99.100:7000/test-nginx]
```

部署Humpback

首先创建放持久化数据文件夹，`mkdir -p /opt/app/humpback-web`，里面存放持久化数据文件，会存储站点管理和分组信息，启动后请妥善保存。

```shell
# 创建放持久化数据文件夹
mkdir -p /opt/app/humpback-web
# 下载humpback-web镜像到本地
docker pull humpbacks/humpback-web:1.0.0
# 启动 humpback-web 容器，将容器命名为 humpback-web
docker run -d --net=host --restart=always \
 -e HUMPBACK_LISTEN_PORT=7001 \
 -v /opt/app/humpback-web/dbFiles:/humpback-web/dbFiles \
 --name humpback-web \
 humpbacks/humpback-web:1.0.0
```

访问站点，打开浏览器输入：·[http://192.168.99.100:7001·](http://192.168.99.100:7001·/) ，默认账户：`admin` 密码：`123456`

## 镜像批量清理脚本

批量删除已经推出的容器

```docker
docker ps -a | grep "Exited" | awk '{print $1 }' | xargs docker rm
```

批量删除带有none字段的镜像

```dockerfile
# 方案1： 根据镜像id删除镜像
docker images| grep none |awk '{print $3 }'|xargs docker rmi
# 方案2: 根据镜像名删除镜像
docker images | grep wecloud | awk '{print $1":"$2}' | xargs docker rmi
```

批量删除镜像定时任务脚本

```dockerfile
#!/bin/bash
# create by wangduanduan
# when current free disk less then max free disk, you can remove docker images
#
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'
max_free_disk=5 # 5G. when current free disk less then max free disk, remove docker images
current_free_disk=`df -lh | grep centos-root | awk '{print strtonum($4)}'`
df -lh
echo "max_free_disk: $max_free_disk G"
echo -e "current_free_disk: ${GREEN} $current_free_disk G ${NC}"
if [ $current_free_disk -lt $max_free_disk ]
then
	echo -e "${RED} need to clean up docker images ${NC}"
	docker images | grep none | awk '{print $3 }' | xargs docker rmi
	docker images | grep wecloud | awk '{print $1":"$2}' | xargs docker rmi
else
	echo -e "${GREEN}no need clean${NC}"
fi
```

注意：`为了加快打包的速度，一般不要太频繁的删除镜像`。因为老的镜像中的某些不改变的层，可以作为新的镜像的缓存，从而大大加快构建的速度。

## 实战1：部署mysql和nginx

部署nginx

步骤：

1.在docker hub中查找nginx镜像

```shell
docker search nginx
```

2.拉取官方镜像

```shell
docker pull nginx
```

3.利用镜像启动容器

```shell
docker run --name my-nginx -d -p 8080:80 nginx
```

`--name`:为容器取名  -d：后台运行。-p：映射端口，-p host port:container port 

4.查看容器运行日志

```shell
docker logs my-nginx
```

部署mysql

步骤

拉取mysql镜像文件

```shell
docker pull mysql:5.7
```

创建目录

- `data`目录将映射为`mysql`容器配置的数据文件存放路径

- `logs`目录将映射为`mysql`容器的日志目录
- `conf`目录里的配置文件将映射为`mysql`容器的配置文件

```shell
mkdir -p ~/mysql/data ~/mysql/logs ~/mysql/conf
```

运行容器

```shell
docker run --name my-mysql \ 
-p 3306:3306 \ 
-v $PWD/conf/my.cnf:/etc/mysql/my.cnf \ 
-v $PWD/logs:/logs \ 
-v $PWD/data:/mysql_data \ 
-e MYSQL_ROOT_PASSWORD=123456 \ 
-d mysql:5.7
```

`-p 3306:3306`：将容器的`3306`端口映射到主机的`3306`端口

`-v $PWD/conf/my.cnf:/etc/mysql/my.cnf`：将主机当前目录下的`conf/my.cnf`挂载到容器的`/etc/mysql/my.cnf`

`-v $PWD/logs:/logs`：将主机当前目录下的`logs`目录挂载到容器的`/logs`

`-v $PWD/data:/mysql_data`：将主机当前目录下的`data`目录挂载到容器的`/mysql_data`

`-e MYSQL_ROOT_PASSWORD=123456`：初始化root用户的密码



## 实战2:部署php、mysql、nginx



## docker中文资源

- Docker中文网站：[http://www.docker.org.cn](http://www.docker.org.cn/)
- Docker中文文档：http://www.dockerinfo.net/document
- Docker安装手册：http://www.docker.org.cn/book/install.html
- 一小时Docker教程 ：https://blog.csphere.cn/archives/22
- Docker中文指南：http://www.widuu.com/chinese_docker/index.html

Docker官方资源

- Docker官网：[http://www.docker.com](http://www.docker.com/)
- Docker windows入门：https://docs.docker.com/windows/
- Docker Linux 入门：https://docs.docker.com/linux/
- Docker mac 入门：https://docs.docker.com/mac/
- Docker 用户指引：https://docs.docker.com/engine/userguide/
- Docker 官方博客：http://blog.docker.com/
- Docker Hub: https://hub.docker.com/
- Docker开源： https://www.docker.com/open-source

其他资源

- [Docker 快速手册！](https://github.com/eon01/DockerCheatSheet)
- [Docker 教程](http://www.runoob.com/docker/docker-tutorial.html)
- [MySQL Docker 单一机器上如何配置自动备份](http://blog.csdn.net/zhangchao19890805/article/details/52756865)
- https://segmentfault.com/t/docker
- https://github.com/docker/docker
- https://wiki.openstack.org/wiki/Docker
- https://wiki.archlinux.org/index.php/Docker