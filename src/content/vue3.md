---
title: Vue.js前端框架(三)
date: 2020-10-02 21:40:33
categories: IT
tags:
    - IT，Web,Vue
toc: true
thumbnail: https://cdn.kunkunzhang.top/vue3.png
---

　　vue新版本解析，代号”one-piece“

<!--more-->

## 其他组件



clipboard-polyfill xgplayer qrcode

### vue-echarts

安装

```shell
npm install echarts vue-echarts
```

在vue2中使用还需要安装compostion包

```shell
npm i -D @vue/composition-api
```

如果在NuxtJS中使用还需要安装另外一个包

```shell
npm i -D @nuxtjs/composition-api
```

并且在nuxt.config.js中添加配置

```javascript
@nuxtjs/composition-api/module
```

在vue3中使用

```javascript
import { createApp } from 'vue'
import ECharts from 'vue-echarts'
import { use } from "echarts/core"

// import ECharts modules manually to reduce bundle size
import {
  CanvasRenderer
} from 'echarts/renderers'
import {
  BarChart
} from 'echarts/charts'
import {
  GridComponent,
  TooltipComponent
} from 'echarts/components'

use([
  CanvasRenderer,
  BarChart,
  GridComponent,
  TooltipComponent
])

const app = createApp(...)

// register globally (or you can do it locally)
app.component('v-chart', ECharts)

app.mount(...)
```

在vue2中使用

```javascript
import Vue from 'vue'
import ECharts from 'vue-echarts'
import { use } from 'echarts/core'

// import ECharts modules manually to reduce bundle size
import {
  CanvasRenderer
} from 'echarts/renderers'
import {
  BarChart
} from 'echarts/charts'
import {
  GridComponent,
  TooltipComponent
} from 'echarts/components'

use([
  CanvasRenderer,
  BarChart,
  GridComponent,
  TooltipComponent
]);

// register globally (or you can do it locally)
Vue.component('v-chart', ECharts)

new Vue(...)
```



### 轮播图

安装包

```js
npm install vue-awesome-swiper --save
```

引入

```js
//全局引入
import VueAwesomeSwiper from 'vue-awesome-swiper'

import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper)
//组件引入
import 'swiper/dist/css/swiper.css'

import {Swiper,swiperSlide} from 'vue-awesome-swiper'
```



修改swiper属性，自动播放与延时

```js

```

### vue-starport

提供页面与页面/组件与组件之间切换的动画

安装

```shell
npm i vue-starport
```

使用

```vue
<script setup>
import { StarportCarrier } from 'vue-starport'
</script>

<template>
  <StarportCarrier> <!-- here -->
    <RouterView />
  </StarportCarrier>
</template>
```



### volar

https://github.com/johnsoncodehk/volar



### 验证码

https://www.npmjs.com/package/vue2-verify



### 多级菜单

递归组件实现

子组件,MenuItem 是一个 li 标签和 slot 插槽，允许往里头加入各种元素

```vue
// Menuitem
<template>
  <li class="item">
    <slot />
  </li>
</template>
```

父组件Menu,Menu中有两种情况需要做判断，一种是 item 没有 children 属性，直接在 MenuItem 的插槽加入一个 span 元素渲染 item 的 title 即可；另一种是包含了 children 属性的 item 这种情况下，不仅需要渲染 title 还需要再次引入 Menu 做递归操作，将 item.children 作为路由传入到 router prop

```vue
<!-- Menu -->

<template>
  <ul class="wrapper">
    <!-- 遍历 router 菜单数据 -->
    <menuitem :key="index" v-for="(item, index) in router">
      <!-- 对于没有 children 子菜单的 item -->
      <span class="item-title" v-if="!item.children">{{item.name}}</span>

      <!-- 对于有 children 子菜单的 item -->
      <template v-else>
        <span @click="handleToggleShow">{{item.name}}</span>
        <!-- 递归操作 -->
        <menu :router="item.children" v-if="toggleShow"></menu>
      </template>
    </menuitem>
  </ul>
</template>

<script>
  import MenuItem from "./MenuItem";

  export default {
    name: "Menu",
    props: ["router"], // Menu 组件接受一个 router 作为菜单数据
    components: { MenuItem },
    data() {
      return {
        toggleShow: false // toggle 状态
      };
    },
    methods: {
      handleToggleShow() {
        // 处理 toggle 状态的是否展开子菜单 handler
        this.toggleShow = !this.toggleShow;
      }
    }
  };
</script>
```

路由数据

```javascript
[
  {
    name: "About",
    path: "/about",
    children: [
      {
        name: "About US",
        path: "/about/us"
      },
      {
        name: "About Comp",
        path: "/about/company",
        children: [
          {
            name: "About Comp A",
            path: "/about/company/A",
            children: [
              {
                name: "About Comp A 1",
                path: "/about/company/A/1"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    name: "Link",
    path: "/link"
  }
];
```

### markdown编辑器

mavon-editor

```js
npm install mavon-editor --save
```

在app.js引入

```js
import mavonEditor from 'mavon-editor'
Vue.use(mavonEditor)
```

在页面引入

```vue
<template>
<div>
    <mavon-editor v-model='content'/>
    </div>
</template>
<script>
export default{
    data(){
        return{
            content:'',
        }
    },
}
</script>
```





### 直播



播放器使用的是 [vue-video-player](https://github.com/surmon-china/vue-video-player)，其实就是 [video.js](https://github.com/videojs/video.js) 集成到 vue 中，后台主要输出 RTMP 和 HLS 的直播流

1. 如果需要播放 HLS 流，需要安装 [videojs-contrib-hls](https://github.com/videojs/videojs-contrib-hls) 插件，非原生支持的浏览器，直播服务端需要开启 CORS（后面会讲到）
2. 如果需要播放 RTMP 流，需要安装 [videojs-flash](https://github.com/videojs/videojs-flash) 插件
3. 如果两个流都需要播放，flash 插件需要安装到 hls 插件之前

兼容性：

1. RTMP: 上面说了 RTMP 是 Adobe 公司研发的协议，目前主要的直播服务都主推 RTMP 流，它延时小，但是需要 flash 插件的支持，也需要的上面提到的安装 `videojs-flash` 的插件。但是在 MAC 下对 flash 插件支持不友好，而且 MAC 下的 flash 插件 firefox 浏览器和 chrome 还是两个插件。。这就很尴尬。
2. HLS: 这个协议兼容性较好，但是最大的缺点是延迟较高，大概 20s 左右，所以只能当做备选方案。

说 HLS 兼容性较好，主要是指可以通过 JS 让用户免配置（不必安装flash），可以在 caniuse 看下 HLS 的支持程度

最后我们使用的方案是。优先使用 RTMP 流，如果不支持，就切换到 HLS 流。好在这个切换过程 video.js 会自动替我们做。下面贴一下相关配置代码。

https://segmentfault.com/a/1190000011346597



### 循环播放插件

Vue-seamless-scroll

安装

```shell
npm install vue-seamless-scroll --save
```

在文件中引入

```javascript
import vueSeamlessScroll from 'vue-seamless-scroll'

export default {
  data(){
    return {
     components:{
       vueSeamlessScroll
     }
    }
  }
}
```

在页面中使用

```vue
<template>
  <vue-seamless-scroll :data="Array" :class-option="classOption">
     	<ul>
      	<li>
          
				</li>
  		</ul>
  </vue-seamless-scroll>
</template>
<script>
export default {
  computed:{
    classOption () {
      return {
        //上下滚动时父容器指定height和overflow：hidden，左右滚动时指定width
        step:0.2 //数值越大，滚动速度越快
        limitMoveNum: 2 //开始无缝滚动的数据量
        hoverStop: true //是否开启鼠标悬停stop
        direction: 0 //0向下，1向上，2向左，3向右
      }
    }
  }
}
</script>
```







### vue-auth

安装包

```js
npm install @websnaova/vue-auth
```



### vue-pdf



### 输出导入excel文件

使用sheetjs库

安装

```shell
npm install xlsx
```



### 输出打印

vue-print-nb

安装

```shell
npm install --save vue-print-nb
```

在main.js中全局引入

```javascript
import Print from 'vue-print-nb'

Vue.use(Print)
```

通过id打印

```vue
<tr id="printInfo">
  
</tr>
<el-button 
   type = "primary"
   key = "printInfo"
   v-print = "'#printInfo'">
</el-button>
```

要打印的组件必须渲染出来，否则会报错。



### 地图

leafletjs

leaflet是一个对移动端优化的交互地图并且开源的JavaScript库，是一个十分轻量级的WebGIS库。

安装

```shell
npm install leaflet --save
```

引入 



vue-amap

安装包

```npm
npm install -S vue-amap // 可在package.json查看是否安装
```

在入口文件main.js引入

```javascript
    // 引入高德地图
    // 高德地图组件使用
    import VueAMap from 'vue-amap'
    
    Vue.config.productionTip = false
    Vue.use(VueAMap);
    VueAMap.initAMapApiLoader({
      key: 'your amap key', 
      plugin: [
      'AMap.Autocomplete', 
      'AMap.PlaceSearch', // POI搜索插件
      'AMap.Scale', // 右下角缩略图插件 比例尺
      'AMap.OverView', 
      'AMap.ToolBar', // 地图工具条
      'AMap.MapType', 
      'AMap.PolyEditor', 
      'AMap.CircleEditor',// 圆形编辑器插件
      'AMap.Geolocation'// 定位控件，用来获取和展示用户主机所在的经纬度位置
      ],
      // 默认高德 sdk 版本为 1.4.4
      v: '1.4.4'
    });
```

实例

```vue
<div class="getlocation">
  定位
</div>
<el-amap vid="amap" :plugin="plugin" class="amap-demo" :center="center">		</el-amap>
<div class="toolbar">
  <span v-if="loaded">location: lng = {{ lng }} lat = {{ lat }}</span>
	<span v-else>正在定位</span>
</div>
<script>
  export default {
    data() {
      let self = this;
      return {
        center: [121.59996, 31.197646],
        lng: 0, 
        lat: 0,
        loaded: false,
        plugin: [
          {
            pName: "Geolocation", //定位
            events: {
              init(o) {
                // o 是高德地图定位插件实例
                o.getCurrentPosition((status, result) => {
                  if (result && result.position) {
                    console.log(status, result);
                    self.lng = result.position.lng; //设置经度
                    self.lat = result.position.lat; //设置维度
                    self.center = [self.lng, self.lat]; //设置中心坐标
                    self.loaded = true;
                    self.$nextTick();
                  }
                });
              }
            }
          }
        ]
      };
    },
</script>    
<style>
  .getlocation{
    margin-left:4rem;
    font-size:15px;
    font-weight: 500;
    margin-top:0.3rem;
  }
  .amap-demo {
    height: 15rem;
    margin-top: 0.3rem;
  }
</style>
```

### 导航

使用ip定位，需要在head标签里面引入js

```html
<script src="https://pv.sohu.com/cityjson?ie=utf-8"></script>
```

在vue中使用

```vue
<script>
  mounted () {
    this.loadBaiduMapAsync()
  },
  methods: {
    /**
     * 初始化百度地图并定位用户当前位置
     */
    loadBaiduMapAsync() {
      // 加载百度地图js
      let script = document.createElement('script')
      script.src = 'https://api.map.baidu.com/api?v=2.0&ak=申请的key&callback=initMap'
      document.body.appendChild(script)
      script.onload = (data) => { // 地图js加载成功
        console.log('百度地图JS加载成功，开始定位')
        window.initMap = this.startLocate
      }
      script.onerror = (data) => { // 地图js加载失败
        console.log('百度地图JS加载失败，无法定位')
        common.showConfirm('温馨提示','地图加载出错，请重试！', () => { this.loadBaiduMapAsync() }, null, '重新加载')
      }
    },
    /**
     * 获取用户当前定位 -- APP端端
     */
    startLocate() {
      if (this.isApp) { // APP端
          this.getPositionByAPP().then(point => {
            console.log('APP定位成功--位置:', point);
            this.currPos = point
            this.showMapAndGuide() // 展示地图及导航
          }).catch(msg => {
            this.status = 0
            console.log(msg);
            // common.showToast(msg, CONSTANTS.ERR_TOAST_TIME)
            this.showDestination() // 展示地图和目的地
          })
      } else { // 浏览器端
        this.getPositionByH5().then(point => {
          console.log('浏览器定位成功--位置:', point);
          this.currPos = point
          this.showMapAndGuide() // 展示地图及导航
        }).catch(msg => {
          this.status = 0
          console.log(msg);
          // common.showToast(msg, CONSTANTS.ERR_TOAST_TIME)
          this.showDestination() // 展示地图和目的地
        })
      }
    },
    /**
     * 获取用户当前定位 -- APP端端
     */
    getPositionByAPP() {
      return new Promise(function(resolve, reject) {
        const cb = (err, data) => {
          if (err) {
            if (err.code === '001') { // 未开启定位服务
              reject('请检查您的定位服务是否开启')
            } else if (err.code === '002') { // 未授权应用访问定位功能
              reject('请授权APP访问您的位置信息')
            } else {
              console.warn(err);
              reject('定位失败,位置信息不可用')
            }
          } else { // app定位成功
            let point = {
              longitude: data.Longitude,
              latitude: data.Latitude
            }
            if (this.isiOS) { // IOS坐标转换
              console.log('IOS坐标转换')
              const convertor = new BMap.Convertor()
              convertor.translate([new BMap.Point(point.longitude, point.latitude)], 1, 5, res => { // 经纬度转换，否则会定位不准
                if (res.status === 0) {
                  point.latitude = res.points[0].lat
                  point.longitude = res.points[0].lng
                  resolve(point)
                }
              })
            } else { // Andorid坐标
              resolve(point)
            }
          }
        }
        app.getCurrentLocation(cb)
      })
    },
    /**
     * 获取用户当前定位 -- 浏览器端
     */
    getPositionByH5() {
      return new Promise(function(resolve, reject) {
        const locateByIP = function () {
          if (window.returnCitySN && window.returnCitySN.cip) { // 根据IP，通过百度api获得经纬度
            console.log('returnCitySN:', window.returnCitySN);
            $.getJSON("https://api.map.baidu.com/location/ip?callback=?", {
              'ak' : '申请的百度地图key',
              'coor' : 'bd09ll', // 百度经纬度坐标
              'ip' : window.returnCitySN.cip // {cip: "116.77.145.35", cid: "440300", cname: "广东省深圳市"}
            }, function(data) {
              if (data && data.content) {
                resolve({
                  longitude: data.content.point.x,
                  latitude: data.content.point.y
                })
              } else {
                reject('定位失败,位置信息不可用')
              }
            })
          }
        }

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(pos) {
            resolve({
              longitude: pos.coords.longitude,
              latitude: pos.coords.latitude
            })
          }, function(error) {
            let msg = ''
            switch(error.code) {
                case error.PERMISSION_DENIED:
                    msg="用户拒绝对获取地理位置的请求。"
                    break;
                case error.POSITION_UNAVAILABLE:
                    msg="位置信息是不可用的。"
                    break;
                case error.TIMEOUT:
                    msg="请求用户地理位置超时。"
                    break;
                case error.UNKNOWN_ERROR:
                    msg="未知错误。"
                    break;
            }
            reject(msg)
            // console.warn('浏览器端(geolocation定位失败)-根据IP定位');
            // locateByIP()
          }, {
            enableHighAccuracy: true, // 指示浏览器获取高精度的位置，默认为false
            timeout: 5000, // 指定获取地理位置的超时时间，默认不限时，单位为毫秒
            maximumAge: 2000 // 最长有效期，在重复获取地理位置时，此参数指定多久再次获取位置。
          })
        } else {
          reject('定位失败,当前浏览器不支持定位！')
          // console.warn('浏览器端(geolocation定位不支持)-根据IP定位');
          // locateByIP()
        }
      })

    },
    /**
     * 展示目标位置
     */
    showDestination() {
      if (Number.isNaN(this.lng)|| Number.isNaN(this.lat)) {
        common.showAlert('地址参数错误！', CONSTANTS.ERR_TOAST_TIME)
        return
      }
      // 展示地图
      const map = new BMap.Map("allmap")
      const endPos = new BMap.Point(this.urlParams.lng, this.urlParams.lat)
      // 展示目标位置
      this.status = 2
      map.centerAndZoom(endPos, 16)
      map.addOverlay(new BMap.Marker(endPos))
      map.enableScrollWheelZoom(true)
      // 在右上角添加缩放控件
      const zoom = new BMap.NavigationControl({
        anchor: BMAP_ANCHOR_TOP_RIGHT,
        type: BMAP_NAVIGATION_CONTROL_LARGE,
        enableGeolocation: true
      })
      map.addControl(zoom)
    },
    /**
     * 展示地图并导航
     */
    showMapAndGuide() {
      if (Number.isNaN(this.lng)|| Number.isNaN(this.lat)) {
        common.showAlert('页面地址参数错误！', CONSTANTS.ERR_TOAST_TIME)
        return
      }
      // 展示地图
      const map = new BMap.Map("allmap")
      const startPos = new BMap.Point(this.currPos.longitude, this.currPos.latitude) // {lng: 114.02597366, lat: 22.54605355}
      const endPos = new BMap.Point(this.lng, this.lat)

      // 逆地址解析用户当前所在地址
      const geoc = new BMap.Geocoder()
      geoc.getLocation(startPos, res => {
        const currCity = res.addressComponents.city // 用户当前定位所在城市
        console.log(`定位城市：${currCity} -- 球场地址：${this.address}`);
        if (this.cityName && this.cityName.indexOf(currCity) > -1) { // 用户和目标球场在同一城市
          this.status = 1
          map.centerAndZoom(startPos, 16)
          this.driveRoute(map, startPos, endPos, true)
        } else { // 用户和目标球场不在同一城市
          this.status = 2
          map.centerAndZoom(endPos, 16)
          map.addOverlay(new BMap.Marker(endPos))
          // this.driveRoute(map, startPos, endPos, true)
        }
      })

      map.enableScrollWheelZoom(true)
      // 在右上角添加缩放控件
      const zoom = new BMap.NavigationControl({
        anchor: BMAP_ANCHOR_TOP_RIGHT,
        type: BMAP_NAVIGATION_CONTROL_LARGE,
        enableGeolocation: true
      })
      map.addControl(zoom)
    },
    /**
     * 计算驾驶路线
     * @param startPos BMap.Point 起点位置
     * @param endPos BMap.Point 终点位置
     * @param show Boolean
     */
    driveRoute(map, startPos, endPos, show) {
      const DRIVE = new BMap.DrivingRoute(map, {
        renderOptions: {
          map: map,
          autoViewport: show,
        },
        onSearchComplete: res => {
          let plan = res.getPlan(0)
          console.warn('查询驾车方案结果:', plan);
          if (plan) {
            this.driveDistance = plan.getDistance(true)
            this.driveTime = plan.getDuration(true)
          }
        },
        onMarkersSet: routes => {
          // map.removeOverlay(routes[0].marker)
          // map.removeOverlay(routes[1].marker)
          // 解决百度地图起始点图标重叠问题
          const eles = $('.BMap_Marker img')
          if (eles.length > 0) {
            eles.forEach(v => {
              v.style.maxWidth = 'none'
              v.style.width = '94px'
            })
          }
        }
      })
      DRIVE.search(startPos, endPos)
    }
  }
}
</script>
```







## 与vue2相比重大变化

### 全局变量

Vue 2.x 有许多全局 API 和配置，这些 API 和配置可以全局改变 Vue 的行为，比如说创建全局组件、声明全局指令。

虽然这种声明方式很方便，但它也会导致一些问题。从技术上讲，Vue 2 没有“app”的概念，我们定义的应用只是通过 `new Vue()` 创建的根 Vue 实例。从同一个 Vue 构造函数**创建的每个根实例共享相同的全局配置**，

Vue3中新的api

createapp

调用 `createApp` 返回一个应用实例，进行挂载

```javascript
import { createApp } from 'vue'
import MyApp from './MyApp.vue'

const app = createApp(MyApp)
app.mount('#app')
```

其他全局api变化

| 2.x 全局 API               | 3.x 实例 API (`app`)                                         |
| -------------------------- | ------------------------------------------------------------ |
| Vue.config                 | app.config                                                   |
| Vue.config.productionTip   | *removed* ([见下方](https://vue3js.cn/docs/zh/guide/migration/global-api.html#config-productiontip-removed)) |
| Vue.config.ignoredElements | app.config.isCustomElement ([见下方](https://vue3js.cn/docs/zh/guide/migration/global-api.html#config-ignoredelements-is-now-config-iscustomelement)) |
| Vue.component              | app.component                                                |
| Vue.directive              | app.directive                                                |
| Vue.mixin                  | app.mixin                                                    |
| Vue.use                    | app.use ([见下方](https://vue3js.cn/docs/zh/guide/migration/global-api.html#a-note-for-plugin-authors)) |

利用这种方式，可以在应用之间共享全局组件和指令

```javascript
import { createApp } from 'vue'
import Foo from './Foo.vue'
import Bar from './Bar.vue'

const createMyApp = options => {
  const app = createApp(options)
  app.directive('focus' /* ... */)

  return app
}

createMyApp(Foo).mount('#foo')
createMyApp(Bar).mount('#bar')
```

上面代码中，createMyApp(Bar).mount('#bar')Foo 和 Bar 实例及其后代中都可以使用 focus 指令

### 模版语法变化(Fragment片段)

在 2.x 中，不支持多根组件，当用户意外创建多根组件时会发出警告，因此，为了修复此错误，许多组件被包装在一个 `<div>` 中。

在 3.x 中，组件现在可以有多个根节点！但是，这确实要求开发者明确定义属性应该分布在哪里。

```vue
//vue2
<template>
  <div>
    <header>...</header>
    <main>...</main>
    <footer>...</footer>
  </div>
</template>
//vue3
<template>
  <header>...</header>
  <main v-bind="$attrs">...</main>
  <footer>...</footer>
</template>
```



### 生命周期函数变化

filter将不再被继续允许使用，鼓励使用computed或mothod替代filter功能

其他生命周期函数：

被弃用/替换：

1. beforeCreate -> setup()
2. created -> setup()

重命名的生命周期：

beforeMount -> onBeforeMount

mounted -> onMounted

beforeUpdate -> onBeforeUpdate

updated -> onUpdated

beforeDestroy -> onBeforeUnmount

destroyed -> onUnmounted

errorCaptured -> onErrorCaptured



### 组合式API/composition

组合式API是vue中类似于react hook类似的功能，尤雨溪在关于此部分功能的考虑和征求意见稿的全文如下

https://vue3js.cn/vue-composition/

简言之，vue在两种情况下不太友好：

1.随着功能的增长，复杂组件的代码变得越来越难以阅读和理解。这种情况在开发人员阅读他人编写的代码时尤为常见。根本原因是 Vue 现有的 API 迫使我们通过**选项组织代码**，但是有的时候通过**逻辑关系**组织代码更有意义。

目前vue缺少一种简洁且低成本的机制来提取和重用多个组件之间的逻辑。

2.来自大型项目开发者的常见需求是更好的 TypeScript 支持，不支持typescript意味着意味推断不够好。Vue 当前的 API 在集成 TypeScript 时遇到了不小的麻烦，其主要原因是 Vue 依靠一个简单的 `this` 上下文来暴露 property，我们现在使用 `this` 的方式是比较微妙的。

3.缺少一种比较「干净」的在多个组件之间提取和复用逻辑的机制。

Vue 现有的 API 在设计之初没有照顾到类型推导，这使适配 TypeScript 变得复杂。

**composition核心函数：**

1.setup函数

- `setup` 就是将 Vue2.x 中的 `beforeCreate` 和 `created` 代替了，以一个 `setup` 函数的形式，可以灵活组织代码了。
- `setup` 还可以 return 数据或者 template，相当于把 `data` 和 `render` 也一并代替了！

实例：

```vue
<template>
  <div>{{ count }} {{ object.foo }}</div>
</template>

<script>
import { ref, reactive } from 'vue'

export default {
  setup() {
    const count = ref(0)
    const object = reactive({ foo: 'bar' })

    // expose to template
    return {
      count,
      object
    }
  }
}
</script>
```

需要注意的是，setup函数中取消this，取消了 `this`，取而代之的是 `setup` 增加了2个参数：props，组件参数和context，上下文信息

2.Reactive方法：

被 `reactive` 方法包裹后的 `对象` 就变成了一个代理对象，相当于 Vue2.x 中的 `Vue.observable()`。也就可以实现页面和数据之间的双向绑定了。

这个包裹的方法是 `deep` 的， [vue3.md](vue3.md) 对所有嵌套的属性都生效。

3.ref方法

被 `ref` 方法包裹后的 `元素` 就变成了一个代理对象。一般而言，这里的元素参数指 `基本元素` 或者称之为 `inner value`，如：number, string, boolean,null,undefined 等，object 一般不使用 `ref`，而是使用上文的 `reactive`。

也就是说 `ref` 一般适用于某个元素的；而 `reactive` 适用于一个对象。

4.isRef方法

判断一个对象是否 `ref` 代理对象。

```
const unwrapped = isRef(foo) ? foo.value : foo
```

5.toRefs 方法

将一个 `reactive` 代理对象打平，转换为 `ref` 代理对象，使得对象的属性可以直接在 `template` 上使用。

6.computed函数

与 Vue2.x 中的作用类似，获取一个计算结果。当然功能有所增强，不仅支持取值 `get`（默认），还支持赋值 `set`。

结果是一个 `ref` 代理对象，js中取值需要 `.value`。

当 computed 参数使用 object 对象书写时，使用 get 和 set 属性。set 属性可以将这个对象编程一个可写的对象。

也就是说 `computed` 不仅可以获取一个计算结果，它还可以反过来处理 `ref` 或者 `reactive` 对象

7.readonly函数

使用 `readonly` 函数，可以把 `普通 object 对象`、`reactive 对象`、`ref 对象` 返回一个只读对象。

返回的 readonly 对象，一旦修改就会在 console 有 warning 警告。程序还是会照常运行，不会报错。

8.watch函数

watch 函数用来侦听特定的数据源，并在回调函数中执行副作用。默认情况是惰性的，也就是说仅在侦听的源数据变更时才执行回调。

监听不同的数据

```javascript
//侦听reactive的数据
import { defineComponent, ref, reactive, toRefs, watch } from "vue";
export default defineComponent({
  setup() {
    const state = reactive({ nickname: "xiaofan", age: 20 });

    setTimeout(() => {
      state.age++;
    }, 1000);

    // 修改age值时会触发 watch的回调
    watch(
      () => state.age,
      (curAge, preAge) => {
        console.log("新值:", curAge, "老值:", preAge);
      }
    );

    return {
      ...toRefs(state),
    };
  },
});

//侦听ref定义的数据
const year = ref(0);

setTimeout(() => {
  year.value++;
}, 1000);

watch(year, (newVal, oldVal) => {
  console.log("新值:", newVal, "老值:", oldVal);
});


//侦听多个数据时进行合并监听
watch([() => state.age, year], ([curAge, newVal], [preAge, oldVal]) => {
console.log("新值:", curAge, "老值:", preAge); console.log("新值:", newVal,
"老值:", oldVal); });

//侦听复杂数据
const state = reactive({
  room: {
    id: 100,
    attrs: {
      size: "140平方米",
      type: "三室两厅",
    },
  },
});
watch(
  () => state.room,
  (newType, oldType) => {
    console.log("新值:", newType, "老值:", oldType);
  },
  { deep: true }
);
```



停止监听

```javascript
const stopWatchRoom = watch(() => state.room, (newType, oldType) => {
    console.log("新值:", newType, "老值:", oldType);
}, {deep:true});

setTimeout(()=>{
    // 停止监听
    stopWatchRoom()
}, 3000)
```

9.watcheffect函数

watcheffect与watch的区别：

1. watchEffect 不需要手动传入依赖
2. watchEffect 会先执行一次用来自动收集依赖
3. watchEffect 无法获取到变化前的值， 只能获取变化后的值

```javascript
import { reactive, watchEffect } from 'vue'

const state = reactive({
  count: 0,
})

function increment() {
  state.count++
}

const renderContext = {
  state,
  increment,
}

watchEffect(() => {
  // 假设的方法，并不是真实的 API
  renderTemplate(
    `<button @click="increment">{{ state.count }}</button>`,
    renderContext
  )
})
```

#### 自定义hook

约定这些「自定义 Hook」以 use 作为前缀，和普通的函数加以区分

```javascript
import { ref, Ref, computed } from "vue";

type CountResultProps = {
  count: Ref<number>;
  multiple: Ref<number>;
  increase: (delta?: number) => void;
  decrease: (delta?: number) => void;
};

export default function useCount(initValue = 1): CountResultProps {
  const count = ref(initValue);

  const increase = (delta?: number): void => {
    if (typeof delta !== "undefined") {
      count.value += delta;
    } else {
      count.value += 1;
    }
  };
  const multiple = computed(() => count.value * 2);

  const decrease = (delta?: number): void => {
    if (typeof delta !== "undefined") {
      count.value -= delta;
    } else {
      count.value -= 1;
    }
  };

  return {
    count,
    multiple,
    increase,
    decrease,
  };
}

```

使用useCount这个hook

```vue
<template>
  <p>count: {{ count }}</p>
  <p>倍数： {{ multiple }}</p>
  <div>
    <button @click="increase()">加1</button>
    <button @click="decrease()">减一</button>
  </div>
</template>

<script lang="ts">
import useCount from "../hooks/useCount";
 setup() {
    const { count, multiple, increase, decrease } = useCount(10);
        return {
            count,
            multiple,
            increase,
            decrease,
        };
    },
</script>
```

Vue2.x 实现，分散在`data`,`method`,`computed`等， 如果刚接手项目，实在无法快速将`data`字段和`method`关联起来，而 Vue3 的方式可以很明确的看出，将 count 相关的逻辑聚合在一起， 看起来舒服多了， 而且`useCount`还可以扩展更多的功能。 项目开发完之后，后续还会写一篇总结项目中使用到的「自定义 Hooks 的文章」，帮助大家更高效的开发，

### teleport

在子组件`Header`中使用到`Dialog`组件，我们实际开发中经常会在类似的情形下使用到 `Dialog` ，此时`Dialog`就被渲染到一层层子组件内部，处理嵌套组件的定位、`z-index`和样式都变得困难。 `Dialog`从用户感知的层面，应该是一个独立的组件，从 dom 结构应该完全剥离 Vue 顶层组件挂载的 DOM；同时还可以使用到 Vue 组件内的状态（`data`或者`props`）的值。简单来说就是,**即希望继续在组件内部使用`Dialog`, 又希望渲染的 DOM 结构不嵌套在组件的 DOM 中**。 此时就需要 Teleport 上场，我们可以用`<Teleport>`包裹`Dialog`, 此时就建立了一个传送门，可以将`Dialog`渲染的内容传送到任何指定的地方。

### Suspense

在前后端交互获取数据时， 是一个异步过程，一般我们都会提供一个加载中的动画，当数据返回时配合`v-if`来控制数据显示。 如果你使用过`vue-async-manager`这个插件来完成上面的需求， 你对`Suspense`可能不会陌生

Vue3.x 新出的内置组件`Suspense`, 它提供两个`template` slot, 刚开始会渲染一个 fallback 状态下的内容， 直到到达某个条件后才会渲染 default 状态的正式内容， 通过使用`Suspense`组件进行展示异步渲染就更加的简单。:::warning 如果使用 `Suspense`, 要返回一个 promise :::`Suspense` 组件的使用

```vue
  <Suspense>
        <template #default>
            <async-component></async-component>
        </template>
        <template #fallback>
            <div>
                Loading...
            </div>
        </template>
  </Suspense>

<<template>
<div>
    <h4>这个是一个异步加载数据</h4>
    <p>用户名：{{user.nickname}}</p>
    <p>年龄：{{user.age}}</p>
</div>
</template>

<script>
import { defineComponent } from "vue"
import axios from "axios"
export default defineComponent({
    setup(){
        const rawData = await axios.get("http://xxx.xinp.cn/user")
        return {
            user: rawData.data
        }
    }
})
</script>
```



### slot变化

vue2中使用slot插槽

```vue
<!-- 父组件中使用 -->
<template slot="content" slot-scope="scoped">
    <div v-for="item in scoped.data">{{item}}</div>
<template>
  
  // 子组件
<slot name="content" :data="data"></slot>
export default {
    data(){
        return{
            data:["走过来人来人往","不喜欢也得欣赏","陪伴是最长情的告白"]
        }
    }
}
```

Vue3将`slot`和`slot-scope`进行了合并同意使用。 Vue3.0 中`v-slot`：

```vue
<!-- 父组件中使用 -->
 <template v-slot:content="scoped">
   <div v-for="item in scoped.data">{{item}}</div>
</template>

<!-- 也可以简写成： -->
<template #content="{data}">
    <div v-for="item in data">{{item}}</div>
</template>
```

### 异步组件

Vue3 中 使用 `defineAsyncComponent` 定义异步组件，配置选项 `component` 替换为 `loader` ,Loader 函数本身不再接收 resolve 和 reject 参数，且必须返回一个 Promise，

```vue
<template>
  <!-- 异步组件的使用 -->
  <AsyncPage />
</tempate>

<script>
import { defineAsyncComponent } from "vue";

export default {
  components: {
    // 无配置项异步组件
    AsyncPage: defineAsyncComponent(() => import("./NextPage.vue")),

    // 有配置项异步组件
    AsyncPageWithOptions: defineAsyncComponent({
   loader: () => import(".NextPage.vue"),
   delay: 200,
   timeout: 3000,
   errorComponent: () => import("./ErrorComponent.vue"),
   loadingComponent: () => import("./LoadingComponent.vue"),
 })
  },
}
</script>

```

### tree-shaking

Vue3.x 在考虑到 `tree-shaking`的基础上重构了全局和内部 API, 表现结果就是现在的全局 API 需要通过 `ES Module`的引用方式进行具名引用

如vue中使用nextTick()

```javascript
// vue2.x
import Vue from "vue"

Vue.nextTick(()=>{
    ...
})

import { nextTick } from "vue"

nextTick(() =>{
    ...
})
```

类似的api变化

- `Vue.nextTick`
- `Vue.observable`（用 `Vue.reactive` 替换）
- `Vue.version`
- `Vue.compile`（仅限完整版本时可用）
- `Vue.set`（仅在 2.x 兼容版本中可用）
- `Vue.delete`（与上同）

## Element-plus





