---

title: Angular学习
date: 2020-03-02 21:40:33
categories: IT
tags:
    - 
toc: true
thumbnail: 
---

## 概述

　　angular属于spa框架之一，我学习的时候已经学习过vue和react，因此重在记录

<!--more-->



### 允许别的机器访问前端网页

-0.0.0.0指的是本机所有的IPV4地址，如果主机上的服务监听的地址是0.0.0.0，那么通过主机的ip地址可以访问该服务

-127.0.0.1是一个回环地址，通过这个地址只能访问发出此次访问的同一台主机，目标地址为127.0.0.1的数据包不会通过网关，因此该数据包不会出现在网络传输中，

在angular的package.json中ng serve规定host

```js
ng serve --host=0.0.0.0
```

