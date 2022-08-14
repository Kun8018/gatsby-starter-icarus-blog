---
title: Vue.js前端框架(一)
date: 2020-10-02 21:40:33
categories: IT
tags:
    - 
- IT，Web,Vue
toc: true
thumbnail: http://cdn.kunkunzhang.top/vue.jpeg
---

​      三大前端框架之一，数据驱动的MVVM单页面应用，第一篇介绍框架的基础内容。

<!--more-->

## 安装

预安装node

安装vue

```shell
npm i -g @vue/cli
```

添加element-UI

```vue
vue add element
```

添加路由

```vue
vue add router
```

使用Scss(super css)

```shell
npm i -D sass sass-loader
```

vue创建项目

```shell
vue create [项目名]
```

## 构建路由

创建router.js或者在router文件夹下创建index.js，添加代码

```js
import Vue from 'vue'
import VueRouter from 'vue-router'

import home from './views/home.vue'
Vue.use(VueRouter)

const router = new VueRouter[{
    routes[
    {
    path:'/',
    name'home',//命名路由方便进行操作
    component:home,
	}
    ]
}]

export default router
```

创建对应组件`home.vue`

```vue
<template>
</template>
<script>
export default{
    
}
</script>
```

在app.js中引用

```js
import router from  './routes.js'

new Vue({
    router
}) 
```

在组件里调用

```vue
<div>
  <router-view/>
</div>

<router-link to="/login"></router-link>//字符串跳转
<router-link to="{path:'login'}"></router-link>//对象跳转
<router-link to="{name:'login'}"></router-link>//命名跳转
```

`<router-link>`导航组件，与a标签类似，用to定目标地址

router-link可以赋值active-class和exact-active-class，指定模糊匹配和精确匹配。模糊匹配只要router-link中有对应的name就可以激活，精确匹配则必须匹配到

`<router-view>`路由的出口，路由匹配到的组件将在这里进行渲染

不同的路由可以渲染到一个`<router-view>`

注意：vue-router的路径自带#号，为hash模式，使用history模式没有#号，但直接刷新时会导致找不到页面，vue-router的路径是虚拟路径，使用历史模式直接发布需要重新设置，

路由元信息

配置路由信息可以提供更多路由操作，定义meta信息

### 路由嵌套

子路由

```javascript
{
path:'/about',
component:About,
    children:[
        {
           path:'/',
           name:'express',
           component:Express
        },
        {
           path:'/about/contact',
           name:'contact',
           component:contact
        },
    ]
}
```

### 动态路由

路由携带参数

```vue
this.$router.push(name:'',params:{})
```

this方法指向当前的vue实例

### 路由懒加载

```vue
component: resolve=>require(['@/components/home'],resolve)
```

### 路由钩子函数

在定义路由时添加路由钩子函数

全局钩子

```javascript
Router.beforeEach((to,from,next)=>{
    next()
})//to表示即将进入的路由，from表示将要离开的路由，next表示函数
Router.afterEach((to,from,next)=>{
    next()
})
```

某个路由的钩子函数

```javascript
beforeEnter:(to,from,next)=>{

},
beforeleave:(to,from,next)=>{

}
```

路由组件内的钩子函数

```javascript
beforeRouteLeave（to,from,next){

},
beforeRouteEnter（to,from,next){

},
beforeRouteUpdate（to,from,next){

}
```

### 路由实例

```javascript
//直接添加一个路由，表现为切换路由，往历史纪录里添加一个历史记录
this.$router.push({'path:'home'})
//替换路由，历史纪录里没有添加记录
this.$router.replace({path:'news'})
```



## 生命周期函数

vue的生命周期函数如下图所示

```javascript
beforeCreate(){},//生命周期，创建之前
created(){},//生命周期，创建之后
beforeMount(){},//生命周期，挂载之前
mounted(){},//生命周期，挂载之后
beforeupdate(){},//生命周期，更新之前
updated(){},//生命周期，更新之后    
beforeDestroy(){},//生命周期，销毁之前
destroyed(){},//生命周期，销毁完成
activated(){},//如果这个页面有keep-alive缓存功能，这个函数会触发
```

这些函数引用时与data、methods、computed等并列使用

在beforecreate函数中修改data中的属性

```javascript
//showmodal为data中数据，checkdevice为引入的方法
beforeCreate(){
   this.$nextTick(function(){
      if(checkdevice() == 'ios'){
          this.showModal = false;
		}
      else if(checkdevice() == 'anzhuo'){
          this.showModal = true;
		}
	})
},
```



## 组件化

### 组件分类

按组件注册方式分为全局组件和局部组件

全局注册

对于一些比较基础的组件，在各个组件中会比较被频繁地用到，那么在每个组件中都引入就会导致一个包含基础组件的长列表，此时在入口文件中引入这些组件，全局导入基础组件

局部注册

只在需要引用的组件中注册

```vue
<script>
import A from './componentA'
import B from './componentA'
export default {
    components: {
      A,B  
    }
}
</script>
```

按组件的功能分类，分为展示组件、业务组件、独立组件(难度逐渐递增)：

展示组件：也就是平常业务开发还原设计稿，将信息展示在页面上，是呀route切换

业务组件：将当前公司的业务封装抽取出来的组件，不具有很强的通用性，

独立组件：不针对具体的业务，例如日期、表单，也就是标准组件库里的那些，通用性强

### 动态加载组件

点击不同的按钮加载不同的组件

通过 Vue 的 `<component>` 元素加一个特殊的 `is` attribute 来实现：

```vue
<div id="dynamic-component-demo" class="demo">
      <button
        v-for="tab in tabs"
        v-bind:key="tab"
        v-bind:class="['tab-button', { active: currentTab === tab }]"
        v-on:click="currentTab = tab"
      >
        {{ tab }}
      </button>
<component v-bind:is="currentTabComponent" class="tab"></component>
<script>
      Vue.component("tab-home", {
        template: "<div>Home component</div>"
      });
      Vue.component("tab-posts", {
        template: "<div>Posts component</div>"
      });
      Vue.component("tab-archive", {
        template: "<div>Archive component</div>"
      });

      new Vue({
        el: "#dynamic-component-demo",
        data: {
          currentTab: "Home",
          tabs: ["Home", "Posts", "Archive"]
        },
        computed: {
          currentTabComponent: function() {
            return "tab-" + this.currentTab.toLowerCase();
          }
        }
      });
    </script>
```

动态加载组件时每次切换都会重新渲染组件，如果需要缓存组件的状态，可以使用keep-alive

```vue
<keep-alive>
  <component v-bind:is="currentTabComponent"></component>
</keep-alive>
```



### 异步组件

使用factory工厂函数创建异步组件，只有在子组件需要渲染时再加载。



### 抽象组件

vue框架中存在内置组件（transition、keep-alive、<slot>）,这两个内置组件均为**抽象组件**，抽象了通用的功能：动画过渡 和 缓存未活动的组件。

抽象组件和普通的组件类似，只是他们添加额外的行为，不向DOM呈现任何内容。有点像react中的高阶组件

实现：

首先实现抽象组件，不用设置template，否则Vue会优先渲染tempplate里面的东西，就不能额外添加行为了.

防抖抽象组件

```vue
<script>
import {get,set,debounce} from 'lodash';
export default {
  name:'debounce',
  abstract:true,
  render(){
      //从$slots中获取子组件
      let vnode = this.$slots.default[0]
       
      console.log(vnode)
     
      if(vnode){
         let event = get(vnode,'data.on.click')  
         if(typeof event === 'function'){
             set(vnode,"data.on.click",debounce(event,1000))
         }
         //如果有DOM的操作，必须是在$nextTick中操作，因为在$nextTick中真是的DOM才能获取到
         this.$nextTick(function(){
            console.log(vnode.elm)
              set(vnode,'elm.style.backgroundColor','red')
         })
       
      }
      return vnode;
  }
};
</script>
```

使用

```vue
<template>
   <Debounce >
     <button @click-"click">Debounce</button>
  </Debounce>
</template>
<script>
import Debounce from "../Debounce";
export default{
  name："HelloWorld";
  components:{
			Debounce
	}
}
</script>
```



权限控制抽象组件

场景：

作者及其团队经常需要实现新feature，且为了避免新feature的可能存在bug或让用户不舒服，会依靠权限配置先将新开发的feature隐藏起来，只对administrators可见。待administrators认为新功能可以向用户开发时，通过配置权限向用户开放功能。

```vue
<script>
  export default {
    name: 'permission-control',
    props: ['permission-name'],
    render() {
      // EDITABLE case. Don't change anything and just render control as is.
      if (userHasPermission(this.permissionName, EDITABLE)) {
        return this.$slots.default[0];
      }
      // If user has no EDITABLE permission, but he has 'VISIBLE',
      // let's change "disabled" prop value to the true
      if (userHasPermission(this.permissionName, VISIBLE)) {
        this.$slots.default[0].componentOptions.propsData.disabled = true;
        return this.$slots.default[0];
      }
      // User has permission for nothing! Let's don't show him anything!
      return null;
    }
  }
</script>
```

使用

```vue
<template>
  <div>
    <permission-control permission-name="team.trainingTime">
      <my-time-input label="Next Training Time" :disabled="!hasNextTraining" />
    </permission-control>
  </div>
</template>

<script>
  export default {
    name: 'football-team-form',
  }
</script>
```

https://www.yuque.com/loway/zh3lby/tv2zcq

事实上，Vue的文档中没有对抽象组件和关键字**abstract: true**做出解释。实际上，**abstract: true**仅是一个标记的作用，当组件实例在建立父子关系的过程中，会忽略掉抽象组件，此过程发生在initLifecycle。具体可见源码：

```javascript
// locate first non-abstract parent
let parent = options.parent
if (parent && !options.abstract) {
  while (parent.$options.abstract && parent.$parent) {
    parent = parent.$parent
  }
  parent.$children.push(vm)
}
vm.$parent = parent
```

### 高阶组件

高阶组件（HOC）英文全称是“high-order-component”, 出自react生态，主要作用是“重用组件逻辑”，但这种高阶组件的思想不限制于框架和api，它只是一种最佳实践。React文档中简单明了的描述了HOC的概念：高阶组件就是一个（纯）函数，且该函数接受一个组件作为参数，并返回一个新的组件

使用高阶组件实现拦截props

```javascript
export function EnhancePropsComponent (WrappedComponent, description) {
  return {
    props: WrappedComponent.props,
    render (h) {
      // 包装props
      self = this
      Object.keys(description)
        .forEach(key => {
          const property = Object.getOwnPropertyDescriptor(this._props, key)
          const getter = property && property.get
          const setter = property && property.set
          Object.defineProperty(this._props, key, {
            enumerable: true,
            configurable: true,
            get: function reactiveGetter () {
              const value = getter.call(self._props)
              return description[key](value)
            },
            set: setter
          })
        })
      const slots = Object.keys(this.$slots)
        .reduce((arr, key) => arr.concat(this.$slots[key]), [])
        .map(vnode => {
          vnode.context = this._self
          return vnode
        })
      return h(WrappedComponent, {
        on: this.$listeners,
        attrs: this.$attrs,
        props: this.$props,
        scopedSlots: this.$scopedSlots
      }, slots)
    }
  }
}
```

https://www.yuque.com/loway/zh3lby/wzgzti

## 组件间通信

### 父子组件、eventbus、provide/inject

父子组件通信：props/$emit

父组件向子组件传递值：子组件中定义props，父组件调用子组件时通过使用props的值传递到自组件，每当父组件中的值更新时子组件中的props也会自动更新。同时你也可以为props提供一些类型检查、设置默认值等，验证不满足时会发出警告。子组件的非父组件传递数据（自有数据）定义在data中

子组件向父组件传递值：子组件使用this.$emit(param)调用父组件的方法。在父组件调用中$on 事件进行监听，自组件传回值则调用对应方法。

实例

```vue
//父组件
<sss
 :isEdit = "isEdit"
 :TimeArray = "TimeArray"
 :update="updatedata"
         />
  
<script>
 export default{
   name:"",
   data:{
     
   },
   methods:{
     updatedata(){
       
     }
   }
 }
</script>
//子组件
<template>
</template>
<script>
export default{
  name: "",
  props: {
    isEdit:{
      type: Boolean,
      default:false,
    },
    TimeArray:{
      type: Array,
      default => [],//默认为空数组
    } 
  },
  data(){
    return {

    }
  },
  methods:{
    this.$emit(update)
  }
}
</script>
```

**需要注意的是，在vue2中，如果prop是数组或者对象这种引用数据类型，可以在子组件中直接修改props，如果是字符串、布尔值等基本数据类型则需要在父组件中修改，使用子组件提交到父组件的方法更新props的数据**

兄弟组件通信：

方式1：可以先把需要改变的值放到父组件中，子组件通过props来获取父组件的值

方式2：通过eventbus 来实现兄弟组件之间的传值，其原理还是通过$on和$emit来时实现的，区别是现在全局建立一个空的vue对象，然后将事件绑定到该空对象上，最后通过该空对象来触发$on监听的事件

几乎所有的模块通信都是基于类似events的模式,包括安卓开发中的`Event Bus`,Node.js中的`Event`模块(Node中几乎所有的模块都依赖于Event,包括不限于`http、stream、buffer、fs`等).

可以全局注册eventbus，也可以部分使用。

使用实例

```javascript
//A组件

//B组件

```

跨级通信：provide/inject

这是`vue@2.2`版本添加的一对需要一起使用的`API`，它允许父级组件向它之后的所有子孙组件提供依赖，让子孙组件无论嵌套多深都可以访问到

`provide` 和 `inject` 主要为高阶插件/组件库提供用例。并不推荐直接用于应用程序代码中。

provide/inject会让组件数据层级关系变的混乱的缘故，但在开发组件库时会很好使。

```vue
<!--父组件 提供-->
{
    provide() {
        return {
            parent: this
        }
    }
}
<!--子组件 注入-->
{
    // 写法一
    inject: ['parent']
    // 写法二
    inject: { parent: 'parent' }
    // 写法三
    inject: {
        parent: {
            from: 'parent',
            default: 222
        }
    }
}

```

复杂系统使用vuex，相当于单独维护的数据



### 插槽

```vue
<template>
    <div>
        <!--默认插槽-->
        <slot></slot>
        <!--另一种默认插槽的写法-->
        <slot name="default"></slot>
        <!--具名插槽-->
        <slot name="footer"></slot>
        <!--传参插槽-->
        <slot v-bind:user="user" name="header"></slot>
    </div>
</template>

<!--使用-->
<children>
    <!--跑到默认插槽中去-->
    <div>123</div>
    <!--另一种默认插槽的写法-->
    <template v-slot:default></template>
    <!--跑到具名插槽 footer 中去-->
    <template v-slot:footer></template>
    <!--缩写形式-->
    <template #footer></template>
    <!--获取子组件的值-->
    <template v-slot:header="slot">{{slot.user}}</template>
    <!--结构插槽值-->
    <template v-slot:header="{user: person}">{{person}}</template>
    <!--老式写法，可以写到具体的标签上面-->
    <template slot="footer" slot-scope="scope"></template>
</children>
```

**具名插槽和普通插槽最大的区别在于，给普通插槽赋予了名字，这就是最大的一点区别，这就有点类似`ES6`中新出的特性，`解构赋值`。现在我们来改写上面的案例，新增加一个明明为`header`的插槽，并且，用`v-slot:header`的方式给传入的`html代码`进行命名，可以看到成功地将名字为header的插槽替换了，所以输出结果为`Header defaultContent`**

#### 作用域插槽

父组件拿子组件中的信息。可以看到我们在插槽上动态绑定了`data`，值为`user对象`，那么，在父组件引用中的`v-slot值.data`就可以访问到子组件中的`user对象`的值了。

```vue
//Parent.vue
<Child>
    <template v-slot="scope">
        {{scope.data.name}}
        {{scope.data.age}}
    </template>
</Child>

//Child.vue
<template>
    <div>
        <slot :data="user">default</slot>
    </div>
</template>

<script>
    export default {
        name: "Child",
        data(){
            return{
                user:{
                    name:'jack',
                    age:18
                }
            }
        }
    }
</script>
```

#### 动态名称插槽

**通过`[ ]`将变量名称括起来，可以实现动态名称的插槽，配合条件渲染，选择相应的具名插槽，能让组件的封装更加地灵活，因为`args=other`，所以，输出结果为`default jack`**

```vue
//Parent.vue
<template>
    <div>
        <Child>
            <template v-slot:[args]="scope">
                {{scope.data.name}}
            </template>
        </Child>
    </div>
</template>

<script>
    import Child from "../components/Child";

    export default {
        name: "Parent",
        components:{
            Child
        },
        data(){
            return{
                args:'other'
            }
        }
    }
</script>

//Child.vue
<template>
    <div>
        <slot :data="user">default</slot>
        <slot name="other" :data="user"></slot>
    </div>
</template>

<script>
    export default {
        name: "Child",
        data(){
            return{
                user:{
                    name:'jack',
                    age:18
                },
            }
        }
    }
</script>
```



### 驼峰命名法

如果注册组件时使用驼峰命名法，在使用时需要转换成短横线分隔命名。

父组件向子组件传递数据时使用短横线分隔命名法，则自组件接收时采用驼峰命名法。

传递方法时双方只能用短横线命名法，都不能使用驼峰命名法

## 模板语法



```vue
<script>
export default{
    components:{ },
    data(){
        return{
            
        }
    },
    methods:{
        
    },
    
}
</script>
```

data：定义以及初始化数据。一般定义视图上的数据，否则定义在外部或者vm对象内

props用来接收来自父组件的数据，可以是数组或者使用对象替代

props是单向数据流，父组件prop的更新会向下流动到子组件中，反之不行

computed是计算属性,提供相对简单的数据计算，与methods相比缓存输出，只有当依赖的值发生改变时才会重新求值，且不需要绑定方法，只要依赖值有变化就会执行，称作响应式

场景：如果同一函数被大量重复调用，会消耗大量资源，此时就可以用computed。

每个计算属性都包含get和set属性，默认是get，set不常用，了解即可。

method：提供相对复杂的数据计算，methods是非响应式的，只有在调用时才执行而不会自动执行

watch：监听属性,与computed都是监听器，都起到监听/依赖数据并进行输出的作用，一般情况下使用computed，只有在数据变化需要执行异步是或者开销比较大时选用watch。

需要注意的是

1.computed只是单纯的计算，依赖某个值得到某个值，赋值、修改dom等操作只能在watch中完成

2.使用watch有两点需要注意：

(1)watch默认在最初绑定的时候是不会执行的，要等到数据在当前页面改变时才会监听。可以改变写法使得一开始最初绑定的时候就执行。

(2)watch监听引用变量类型，如数组和对象，只能在语句中执行赋值语句后才能监听，直接进行修改、添加或者删除属性无法监听，采用deep深度监听，监听器会向下一层一层遍历，给所有的属性都加上监听器。这样做的缺点时性能开销会加大。

也可以直接监听对象的某个属性

```vue
<script>
export default(){
  data(){
     a:1,
     b:{
       c:1;
     }
     d:""
   }
  watch:{
    a(val,oldVal){
      console.log("a",val,oldVal)
    },
    b:{
      handler(val,oldVal){
        console.log("b,c" val.c,oldVal.c)
      },
      deep:true // true 深度监听
    },
    d:{
      handler(newval,oldval){
        console.log()
      },
      immediate: true;
    }
  }
}
</script>
```

### 执行机制

在new vue时，index.js初始化各项功能：

```javascript
function Vue(options){
  if(process.env.NODE_ENV !== 'production' && !(this instanceof Vue)){
     warn ('Vue is  a. constructor and should be called with the new keyword')
  }
  this._init(options)
}
```

this._init的执行顺序为：

```javascript
initInjections(vm)
initState(vm);
initProvide(vm) 
callHook(vm,'created')
```

在initState中做了这些事情

```javascript
if(opts.props) initProps(vm,opts.props)//初始化props
if(opts.methods) initMethods(vm,opts.methods)//初始化methods
if(opts.data) {
  initData(vm)}
  else{
   observe(vm._data = {},true /* asRootData */)
  }
//初始化data
if(opts.computed) initComputed(vm,opts.computed)//初始化computed
```

computed、props、data和computed的初始化都是在beforecreated和created之间完成的。

deep、immediate、handler

### 局部样式、多个样式

当 `<style>` 标签有 `scoped` 属性时，它的 CSS 只作用于当前组件中的元素。

```vue
<style scoped>
</style>
```

没有scoped时为全局

：class

## v-bind、v-on、v-for

v-bind属性绑定，class、style、href等属性

实例

```vue
<template>
    <a v-bind:href="link">link</a>
</template>
<script>
export default{
    data() {
       return{
           link:''
       }
    }
}
</script>
```

v-on事件绑定，监听dom事件，接受需要调用的方法

```vue
<a v-on:click=""></a>
<a @click=""></a>
```

v-on事件修饰符

```vue
<!-- 点击事件将只会触发一次 -->
<a v-on:click.once="doThis"></a>
<!-- 阻止单击事件继续传播 -->
<a v-on:click.stop="doThis"></a>
<!-- 提交事件不再重载页面 -->
<form v-on:submit.prevent="onSubmit"></form>
```

v-on支持监听绑定键盘事件和鼠标事件

```vue
//键盘
<input v-on:keyup.enter="submit">//按下enter键触发submit事件
.enter
.tab
.delete (捕获“删除”和“退格”键)
.esc
.space//空格键
.up//方向上键
.down//方向下键
.left//方向左键
.right//方向右键
//鼠标
.left   //鼠标左键
.right  //鼠标右键
.middle  //中间滚轮
```

v-for使用于列表渲染

v-for是基于一个数组来渲染列表。循环指令为item in items。其中items是源数据数组，item是被迭代的数组元素的别名。in可以使用of代替。

```vue
<ul id="example">
  <li v-for"item in items" :key="item.message">
    {{ item.message}}
  </li>
</ul>
<script>
   var example = new Vue({
     el:'example',
     data:{
       items:[
         {message:'Foo'},
         {message:'Bar'},
       ]
     }
   })
</script>
```

v-for还支持第二个参数，数组的索引，可以作为选项的key或者对选项中引用别的数组进行逐项操作

```vue
<ul id="example">
  <li v-for"(item,index in items" :key="index">
    {{ item.message}}--{{ index }}
  </li>
</ul>
<script>
   var example = new Vue({
     el:'example',
     data:{
       items:[
         {message:'Foo'},
         {message:'Bar'},
       ]
     }
   })
</script>
```

v-for比v-if 的优先级更高，性能优化将v-for中的一些元素过滤，再进行v-if判断

v-for中一般带有key，为了高效更新虚拟DOM而不出错，在新旧辨识时辨别组件，如果不使用vue会使用一种最大限度减少动态元素并且尽可能尝试就地修改、复用相同的元素的算法。使用key后就会基于key重新排列元素，排除key不存在的元素

使用v-for遍历部分数据时，可以使用v-show，不能使用v-if,用v-if会报错

```vue
<tr v-for="(item,index) in showList" v-show="index < 4" :key="index">
</tr>
```



## v-if、v-show、v-model

v-if 用于条件性地渲染内容，可以跟v-else或者v-else-if搭配使用

```vue
<div v-if="type === 'A'">
   A
</div>
<div v-else-if="type === 'B'">
   B
</div>
<div v-else-if="type === 'C'">
   C
</div>
<div v-else="type === 'D'">
   D
</div>
```

v-show与v-if都是条件展示，v-if有组件的销毁和重建，v-show只切换css

v-model用在表单<input>、<textarea>、<select>上创建双向数据绑定，监听用户的输入事件

```vue
<input v-model="message" placeholder="edit me">
<p>
  {{ message }}
</p>
```

v-model会直接将vue实例的数据作为数据来源，所以绑定时确保在data选项中声明，绑定时不需要this参数

## 过滤器

在组件的选项中定义本地的过滤器,使用时与computed类似，用于将外部传来的值进行处理，用于一些常见的文本格式化。

```vue
<div>
  <!-- 在双花括号中 -->
{{ message | capitalize }}
  <!-- 在 `v-bind` 中 -->
<div v-bind:id="rawId | formatId"></div>
</div>
<script>
filters:{
  capitalize: function (value) {
    if (!value) return ''
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
  }
}
</script>
```

filterId: 过滤器ID，用来做为你的过滤器的唯一标识；

VueJs允许你链式调用过滤器，简单的来说，就是一个过滤器的输出成为下一个过滤器的输入，然后再次过滤。



## ref

尽管存在 prop 和事件，有的时候你仍可能需要在 JavaScript 里直接访问一个子组件的data或者methods。为了达到这个目的，你可以通过 `ref` 调用。子组件也可以通过ref调用父组件的方法，也可以调用组件内部的dom。

实例

子组件正常写，父组件引用时添加ref属性。

```vue
<template>
  <div>
      {{ msg }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "hello world"
    }
  },
  methods: {
    open() {
      console.log("调用到了")
    }
  }
}
</script>
```

父组件

```vue
<template>
  <div id="app">
    <HelloWorld ref="hello"/>
    <button @click="getHello">获取helloworld组件中的值</button>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";

export default {
  components: {
    HelloWorld
  },
  data() {
    return {}
  },
  methods: {
    getHello() {
      console.log(this.$refs.hello.msg);
      this.$refs.hello.open();
    }
  }
};
</script>
```

获取本页面dom

```vue
<template>
  <div id="app">
    <div ref="testDom">11111</div>
    <button @click="getTest">获取test节点</button>
  </div>
</template>

<script>
export default {
  methods: {
    getTest() {
      console.log(this.$refs.testDom)
    }
  }
};
</script>
```



## Vuex状态管理

对于大型应用，由于状态零散地分布在许多组件中，复杂度会逐渐增长，尤其对于多个视图依赖同一状态，或者来自不同视图需要变更同一状态。vue提供vuex解决状态管理问题。

安装

```npm
npm install vuex --save
```

引入vuex

```js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
```

通过store对象创建

```javascript
const store = new Vuex.Store({
  state:{
    count:0
  },
  mutation:{
    increment(state){
      state.count++
    }
  }
})
```

核心概念

```vue
state:唯一的数据源
getter：getter的返回值会根据它的依赖被缓存起来，依赖值变化时会重新计算，类似于计算属性
mutation:提交mutation更改store中的状态
action：action提交mutation，可以执行任意异步操作
modules：vuex允许将store分割成模块，每个模块拥有自己的state、mutation、action、
```

store中的数据是响应式的，通过 this.$store.state 访问其中的数据。state的修改完全由mutation控制

getter类似于computed或者watch，当`state`中的某些状态在各个组件中都被频繁进行计算、筛选、过滤, 如果在每个组件中都操作一次, 将会变得非常繁琐，可以看作`Vuex`的计算属性。通过this.$store.getter.** 调用getter中的方法

```vue
<script>
const store = new Vuex.store({
  state:{
    todos:[
      {id:1,done:true},
      {id:1,done:true},
    ]
  }
})
</script>
```

mutation是更新state的唯一方式，在组件中通过this.$store.commit提交mutation。mutation中的回调函数一般接收一个state参数进行修改，也可以增加payload对象作为参数，mutation提交前一般要现在state中定义初始属性，如果需要添加新属性或者删除旧属性，使用vue.set添加，如果用新属性替代旧属性，使用对象展开运算符

```vue
<script>
state:{
  info:{
    name:'zhangsan',
    age:17,
  }
}
mutations:{
   updatestatu(state){
     //添加address属性
     Vue.set(state.info,'address','洛杉矶')
     //删除age属性
     Vue.delete(state.info,'age')
   }
}
</script>
```

Action 类似于 mutation，不同在于：

- Action 提交的是 mutation，而不是直接变更状态。
- Action 可以包含任意异步操作。

通过this.$store.dispatch调用action中的方法

`Vuex` 由于使用单一状态树, 应用所有状态都会集中到一个较大的对象，当应用变得非常复杂时，store 对象就有可能变得相当臃肿。每个模块内部拥有自己的 state、mutation、action、getter。模块内mutation和getter，接收的对象都是局部状态对象，模块内部的 `action`，局部状态通过 `context.state` 暴露出来，根节点状态则为 `context.rootState`

模块化

```javascript
const moduleA ={
  state:()=>({}),
  mutations:{},
  actions:{},
  getter:{}
}

const moduleB={
  state:()=>({}),
  mutations:{},
  actions:{},
  getter:{}
}

const store = new Vuex.Store({
  modules: {
    a:moduleA,
    b:moduleB
  }
})

store.state.a//moduleA的状态
store.state.b//moduleB的状态
```

手撸vuex：https://juejin.im/post/6845166891204345870

### pinia

Pinia 是一个用于 Vue 的状态管理库，类似 Vuex, 是 Vue 的另一种状态管理方案
Pinia 支持 Vue2 和 Vue3

安装

```shell
# 使用 npm
npm install pinia@next
# 使用 yarn
yarn add pinia@next
```

创建pinia实例，挂载到app上

```javascript
import { createPinia } from 'pinia';

app.use(createPinia());
```

创建store

```javascript
// store.js
import { defineStore } from "pinia";

// defineStore 调用后返回一个函数，调用该函数获得 Store 实体
export const useStore = defineStore({
  // id: 必须的，在所有 Store 中唯一
  id: "myGlobalState",
  // state: 返回对象的函数
  state: ()=> ({
    count: 1
  }),
});
```

使用store

```vue
// xxx.vue
<template>
  <div>
    {{store.count}}
  </div>
</template>
<script>
  // 导入 Store， 使用自己的路径
  import { useStore } from "@/store/store.js";
  export default {
    setup() {
      // 调用函数 获得Store
      const store = useStore();
      return {
        store
      }
    }
  }
</script>
```

getter

Getter 第一个参数是 state，是当前的状态，也可以使用 this.xx 获取状态

```javascript
// 修改 store.js
import { defineStore } from "pinia";

import { otherState } from "@/store/otherState.js";

export const useStore = defineStore({
  id: "myGlobalState",
  state: ()=> ({
    count: 2
  }),
  getters: {
    // 一个基本的 Getter： 计算 count 的平方
    // 使用参数
    countPow2(state) {
      return state.count ** 2;
    },
    // 使用 this
    /* 
    countPow2() {
      return this.count ** 2;
    }, 
    */
    // 简单的 Getter 直接使用箭头函数
    // countPow2: state=> state.count ** 2

    // 获取其它 Getter， 直接通过 this
    countPow2Getter() {
      return this.countPow2;
    }

    // 使用其它 Store
    otherStoreCount(state) {
      // 这里是其他的 Store，调用获取 Store，就和在 setup 中一样
      const otherStore = useOtherStore();
      return otherStore.count;
    },
  }
});

// otherState.js
import { defineStore } from "pinia";

export const useStore = defineStore({
  id: "otherState",
  state: ()=> ({
    count: 5
  }),
});
```

action

Pinia 没有 Mutations，统一在 actions 中操作 state，通过this.xx 访问相应状态
虽然可以直接操作 Store，但还是推荐在 actions 中操作，保证状态不被意外改变
action 和普通的函数一样

```javascript
// store.js
export const useStore({
  state: ()=> ({
    count: 2,
    // ...
  })
  // ...
  actinos: {
    countPlusOne() {
      this.count++;
    },
    countPlus(num) {
      this.count += num;
    }
  }
})
```



### hami-vuex

Hami-Vuex 是一个 Vue 状态管理的库，基于 Vuex 实现，提供了更「香甜」的使用方式





## 客户端存储

客户端存储涉及到cookies、webstorage

### vue-cookies

https://www.jianshu.com/p/60c13168cc8f



### localstorage

使用方法

```js
localStorage.setItem("b","isaac");//设置b为"isaac"
var b = localStorage.getItem("b");//获取b的值,为"isaac"
var a = localStorage.key(0); // 获取第0个数据项的键名，此处即为“b”
localStorage.removeItem("b");//清除c的值
localStorage.clear();//清除当前域名下的所有localstorage数据
```

vue中实例

```vue
<script>
mounted() {
    if (localStorage.name) {
      this.name = localStorage.name;
    }
  },
</script>
```

https://cn.vuejs.org/v2/cookbook/client-side-storage.html



## SSR

服务端渲染

安装

```shell
npm install vue vue-server-renderer --save
```

Nust

Nust是基于vue生态的

## vue.config.js

vue.config.js是一个可选的，用于更改全局vue-cli的配置

https://cli.vuejs.org/zh/config/

## 学习资源

Vue2所有api：https://cn.vuejs.org/v2/api

Vue3: https://v3.cn.vuejs.org/guide

