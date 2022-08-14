---

title: Node、Vue、React引用包
date: 2020-03-11 21:40:33
categories: IT
tags:
    - IT，Web,Vue，Node、React
toc: true
thumbnail: 
---

## 

　　



<!--more-->

## React



## Node



## Vue

### 百度地图

安装

```node
npm i --save vue-baidu-map
```

初始化

```js
import Vue from 'vue'
import BaiduMap from 'vue-baidu-map'

Vue.use(BaiduMap, {
  /* Visit http://lbsyun.baidu.com/apiconsole/key for details about app key. */
  ak: 'YOUR_APP_KEY'
})
```



```vue
<template>
  <baidu-map class="map">
  </baidu-map>
</template>

<style>
/* The container of BaiduMap must be set width & height. */
.map {
  width: 100%;
  height: 300px;
}
</style>
```

