---
title: Vue.js前端框架(二)
date: 2020-10-02 21:40:33
categories: IT
tags:
    - IT，Web,Vue
toc: true
thumbnail: https://s1.ax1x.com/2020/03/27/G9XCuD.th.jpg
---

　　本篇属于vue的应用篇

<!--more-->

## vue进阶

### 自定义指令

除了核心功能默认内置的指令 (`v-model` 和 `v-show`)，Vue 也允许注册自定义指令。然而，有的情况下，你仍然需要对普通 DOM 元素进行底层操作，这时候就会用到自定义指令。

比如，你需要当页面加载时，某元素将获得焦点 (注意：`autofocus` 在移动版 Safari 上不工作)。事实上，只要你在打开这个页面后还没点击过任何内容，这个输入框就应当还是处于聚焦状态。

```vue
<template>
	<input v-focus>
</template>
<script>
// 注册一个全局自定义指令 `v-focus`
Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
})
//局部自定义
directives: {
  focus: {
    // 指令的定义
    inserted: function (el) {
      el.focus()
    }
  }
}
</script>
```

自定义指令具有几个钩子函数

- `bind`：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
- `inserted`：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
- `update`：所在组件的 VNode 更新时调用，**但是可能发生在其子 VNode 更新之前**。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新 (详细的钩子函数参数见下)。

- `componentUpdated`：指令所在组件的 VNode **及其子 VNode** 全部更新后调用。
- `unbind`：只调用一次，指令与元素解绑时调用。

### vue.set、this.set

vue.js默认不能检测到对象属性的添加或者删除，因为受到es5的限制，vuejs在初始化实例时将属性转换为getter/setter，所以属性必须在对象上才能让vuejs转换它，并且成为响应式的数据。

因此，要添加对象的新属性，使用this.$set语法

```vue
<script>
export default(){
  data(){
    return{
      student:{
         name:'',
         sex:'',
      }
    }
	}
 mounted(){
   this.$set(this.student,"age",24)
 }
}
</script>
```

或者也可以使用vue.set向嵌套对象添加响应式属性

```javascript
var vm = new Vue({
  el:'#test',
  data:{
    info:{
      name:'小明';
    }
  }
});
//给info添加属性
Vue.set(vm.info,'sex','男')
```

vue不允许动态添加根级响应式属性



### vue动画

Vue 在插入、更新或者移除 DOM 时，提供多种不同方式的应用过渡效果。包括以下工具：

- 在 CSS 过渡和动画中自动应用 class
- 可以配合使用第三方 CSS 动画库，如 Animate.css
- 在过渡钩子函数中使用 JavaScript 直接操作 DOM
- 可以配合使用第三方 JavaScript 动画库，如 Velocity.js

V-enter:定义进入过渡的开始。v-enter-active:定义进入过渡生效时的状态  v-enter-to：定义进入过渡的结束状态

V-leave:定义离开过度的开始状态 v-leave-active:定义离开过渡生效时的状态 v-leave-to:定义离开过渡的结束状态

动画钩子函数：

```vue
<transition
   v-on:before-enter="beforeEnter"
   v-on:enter="enter"
   v-on:after-enter="afterEnter"
   v-on:enter-cancelled="enterCancelled"
            
   v-on:before-leave="beforeleave"
   v-on:leave="leave"
   v-on:after-leave="afterleave"
   v-on:leave-cancelled="leaveCancelled"
>
   
</transition>
```



### axios

跨域包

```js
//get请求
// 为给定 ID 的 user 创建请求
axios.get('/user?ID=12345')
  .then(response=>{
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
//换个姿势实现
axios.get('/user', {
    params: {                         //区别：  get是用params传值
      ID: 12345
    }
  })
  .then(response=>{
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
//post请求
axios.post('/user', {                  //        post是用对象传值      
    firstName: 'Fred',
    lastName: 'Flintstone'
  })
  .then(response=>{
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

```



## Vue语法总结

想学习几个模块或者模板的使用并非难事，对于想从事前端开发的人来说，强调更懂vue底层原理。此部分也是vue的面试题

### mini Vue

vue由三大模块组成

1.数据响应模块：

数据响应模块将数据对象初始化为响应式数据对象

2.编译器：

编译器将视图模版编译为渲染函数

3.视图渲染函数



编译器原理：

Parse模版字符串

Transform转换标记：如v-if v-on v-for

Generate AST:

渲染函数



Patch phase:数据模型一旦变化，会被调用生成新的虚拟DOM



### new Vue

`vue`的架构设计，它的架构是分层式的。最底层是一个`ES5`的构造函数，再上层在原型上会定义一些`_init`、`$watch`、`_render`等这样的方法，再上层会在构造函数自身定义全局的一些`API`，如`set`、`nextTick`、`use`等(以上这些是不区分平台的核心代码)，接着是跨平台和服务端渲染(这些暂时不在讨论范围)及编译器。将这些属性方法都定义好了之后，最后会导出一个完整的构造函数给到用户使用，而`new Vue`就是启动的钥匙。

在`vue`的内部，`_`符号开头定义的变量是供内部私有使用的，而`$` 符号定义的变量是供用户使用的，而且用户自定义的变量不能以`_`或`$`开头，以防止内部冲突

new Vue时依次执行方法：

initMixin(Vue)：定义`_init`方法。

stateMixin(Vue)：定义数据相关的方法`$set`,`$delete`,`$watch`方法。

eventsMixin(Vue)：定义事件相关的方法`$on`，`$once`，`$off`，`$emit`。

lifecycleMixin(Vue)：定义`_update`，及生命周期相关的`$forceUpdate`和`$destroy`。

renderMixin(Vue)：定义`$nextTick`，`_render`将render函数转为`vnode`。



### v-model原理-vue2、vue3

v-model基于object.defineproperty实现

vue官方文档中提到：

由于JavaScript语言的限制，vue不能检测数组和对象的变化

对于对象，vue无法检测property的添加或移除

对于数组，当你利用数组的索引设置值，或者修改数组的长度时，无法检测到变动

```javascript
var vm = new Vue({
  data:{
    a:1;
    items:['a','b','c']
  }
})

vm.b = 2; //添加vm.b为2，但是vm.b是非响应的

vm.items[1] = 'x' //不是响应式的
vm.items.length = 2 //不是响应式的
```

原因：

ES6中对象有两种属性，数据属性和访问属性，数据属性的描述符为：Configurable、Enumerable、Writable、Value，访问属性的描述符为：Configurable、Enumerable、set、get属性

vue初始化时将对象和数组中的数据属性转换为访问属性，而我们后面再次使用普通的赋值，仅仅是赋值了一个数据属性，这个属性不会有访问器属性的事件监听功能。

对于数组，js中length属性初始为non-configurable、non-enumerable、writable，也就是通过object.defineproperty是不可枚举或者改变length属性的

官方解决方法：

vue2中：

对于对象，使用vue.set进行响应式数据的添加

```javascript
Vue.set(vm.someObject,'b',2)
//this.$set是Vue.set的别名
this.$set(this.someObject,'b',2)
```

对于数组使用同样的方法

```javascript
Vue.set(vm.items,indexOfItem,1,newValue)
vm.$set(vm.items,indexOfItem,1,newValue)

vm.items.splice(indexOfItem,1,newValue)

//改变数组长度
vm.items.splice(newLength)
```

vue3中使用proxy进行劫持

vue3中proxy与reflect进行搭配使用，proxy的语法是在语言层面作出修改，属于一种元编程，proxy在对象之前设置一层拦截，当被监听的对象被访问时，都必须经过这层拦截，可以在拦截中对原对象处理，返回需要的数据格式。也就是无论访问对象的什么属性，不管是定义好的还是新增的，都会走到拦截中进行处理，而不是像vue2中初始化时通过object.defineproperty遍历对象转换成访问器属性再进行监听

Reflect是一个内置对象，不是一个函数对象不可构造，它提供拦截JavaScript操作的方法，这些方法与proxy handler的方法相同



### diff算法

Vue diff 算法就是用来比较新老 virtal DOM 的差别，然后尽可能少的调用 api 来操作真实 DOM。

patch比对新旧节点后，为 DOM 进行打补丁操作。





### vue-cli原理

下载模版、生成模版、

构建自定义模版

### 响应式原理data、props

在组件`new Vue()`后的执行`vm._init()`初始化过程中，当执行到`initState(vm)`时就会对内部使用到的一些状态，如`props`、`data`、`computed`、`watch`、`methods`分别进行初始化，再对`data`进行初始化的最后有这么一句：

```javascript
function initData(vm) {  //初始化data
  ...
  observe(data) //  info:{name:'cc',sex:'man'}
}
```

`observe`方法就是`Observer`这个类的工厂方法，

```javascript
export class Observer {
  constructor(value) {
    this.value = value
    this.walk(value)  // 遍历value
  }
  
  walk(obj) {
    const keys = Object.keys(obj)
    for(let i = 0; i < keys.length; i++) {
      defineReactive(obj, keys[i])  // 只传入了两个参数
    }
  }
}
```

当执行`new Observer`时，首先将传入的对象挂载到当前`this`下，然后遍历当前对象的每一项，执行`defineReactive`这个方法，看下它的定义：

```javascript
export function defineReactive(obj, key, val) {

  const dep = new Dep()  // 依赖管理器
  
  val = obj[key]  // 计算出对应key的值
  observe(val)  // 递归包装对象的嵌套属性
  
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get() {
      ... 收集依赖
    },
    set(newVal) {
      ... 派发更新
    }
  })
}
```

这个方法的作用就是使用`Object.defineProperty`创建响应式数据。首先根据传入的`obj`和`key`计算出`val`具体的值；如果`val`还是对象，那就使用`observe`方法进行递归创建，在递归的过程中使用`Object.defineProperty`将对象的**每一个**属性都变成响应式数据：

https://juejin.cn/post/6844903911669628941

### computed、watch、data异同

computed与watch异同

1.watch监听是`vm.data`的一个属性，它的getter不需另做处理，而computed监听是一个新的属性，它需要被代理到`vm`实例上，并且getter需要重新创建

2.底层都是watcher：watch创建watcher内部默认会对属性取值，它要有老值嘛；computed watcher的创建就不会取值，只有组件渲染需要计算属性值时，才会取值

3.computed对计算属性的值有缓存处理，只要依赖的`vm.data`属性值不变，重复取值，不会重复计算

data与computed异同

data与computed的最核心的区别在于data中的属性并不会随着赋值变量的改动而改动，而computed会

### v-bind原理

v-bind常用于绑定输入框的值等

获取输入框的value并赋值给vm实例的text属性，利用obj.defineproperty将data中的text劫持为vm的访问器属性，就会给vm.text赋值就会触发set方法。

在set方法中做两件事，一件是更新属性的值，第二是提供发布/订阅模式通知dom元素值的变化。让多个观察者同时监听某一个主题对象，这个主题对象的状态发生改变时会通知所有的观察者对象。set方法的第二件事就是作为发布者发出通知：有值改变，DOM节点是订阅者，收到通知后就会执行相应的更新操作。

更具体地来说，new一个vue对象时，会做两件事：一是监听数据observe(data)，二是编译html：nodeToFragement(id)

在一监听数据的过程中，会为每个data中的属性生成一个主题对象dep

在编译HTML的过程中，会为每个与数据绑定相关的节点生成一个订阅者watcher，watcher会将自己添加到相应属性的dep中

watcher函数的实现

```js
function Watcher(vm,node,name){
  Dep.target = this;
  this.name = name;
  this.node = node；
  this.vm = vm;
  this.update();
  Dep.target = null;
}

Watcher.prototype = {
  update:function(){
    this.get();
    this.node.nodeValue = this.value;
  }
}
```



#### v-model与v-bind的区别

v-model本质是语法糖，双向绑定表单元素实际上是绑定了value、checked、select属性，表单可以拿到vue的数据，表单中的数据也可以传到vue中。

v-bind：value只能是表单拿到vue的数据，vue无法拿到表单的数据。

### vue父组件与子组件生命周期钩子执行顺序

加载渲染过程：

​	父组件：beforecreate ->created -> beforemount

​	子组件：-> beforeCreate -> created -> beforeMount -> mounted

​	父组件：->mounted

子组件更新过程：

​	父组件beforeUpdate -> 子组件beforeUpdate -> 子组件updated -> 父组件updated

父组件更新过程：

​	父组件beforeUpdate -> (子组件deactivated) -> 父组件updated

销毁过程：

​	父组件beforeDestroy->子组件beforeDestroy->父组件destroyed

总结：由外到内，再由内到外



### vue3.0与2.0的区别

vue3.0有一个基于 Proxy 的观察者，它会提供全语言覆盖的响应式跟踪。相比于 2.x 版本里基于 Object.defineProperty 的观察者，新的实现更加强大:

​		可以检测属性的新增和删除

​		可以检测数组索引的变化和 length 的变化

​		支持 Map、Set、WeakMap 和 WeakSet

支持typescript

https://juejin.im/post/6854573210717929480#heading-1

### vue模版解析原理

vue解析器将模版解析为AST（抽象语法树）

#### html解析器

实例

```vue
<div>
    <h1>我是Berwin</h1>
    <p>我今年23岁</p>
</div>
```

上述模版解析过程：

模板的开始位置是`div`的开始标签，于是会触发钩子函数`start`。`start`触发后，会先构建一个`div`节点。此时发现栈是空的，这说明`div`节点是根节点，因为它没有父节点。将`div`节点推入栈中，并将模板字符串中的`div`开始标签从模板中截取掉。

第二行模板的开始位置是一些空格，这些空格会触发文本节点的钩子函数，在钩子函数里会忽略这些空格。同时会在模板中将这些空格截取掉。

空格去掉之后是`h1`的开始标签，于是会触发钩子函数`start`。与前面流程一样，`start`触发后，会先构建一个`h1`节点。此时发现栈的最后一个节点是`div`节点，这说明`h1`节点的父节点是`div`，于是将`h1`添加到`div`的子节点中，并且将`h1`节点推入栈中，同时从模板中将`h1`的开始标签截取掉。

h1标签之后是一段文本，于是会触发钩子函数`chars`。`chars`触发后，会先构建一个文本节点，此时发现栈中的最后一个节点是`h1`，这说明文本节点的父节点是`h1`，于是将文本节点添加到`h1`节点的子节点中。由于文本节点没有子节点，所以文本节点不会被推入栈中。最后，将文本从模板中截取掉。


文本后是`h1`结束标签，于是会触发钩子函数`end`。`end`触发后，会把栈中最后一个节点弹出来。

p标签与h1标签的解析过程相同，解析空格、钩子函数start、解析文本、结束钩子函数end

到了`div`的结束标签，于是会触发钩子函数`end`。其逻辑与之前一样，把栈中的最后一个节点弹出来，也就是把`div`弹了出来，并将`div`的结束标签从模板中截取掉。

此时模板已经被截取空了，也就代表着HTML解析器已经运行完毕。这时我们会发现栈已经空了，但是我们得到了一个完整的带层级关系的AST语法树。这个AST中清晰写明了每个节点的父节点、子节点及其节点类型。

html解析器是一个函数，用伪代码实现的话如下

```js
parseHTML(template, {
    start (tag, attrs, unary) {
        // 每当解析到标签的开始位置时，触发该函数
    },
    end () {
        // 每当解析到标签的结束位置时，触发该函数
    },
    chars (text) {
        // 每当解析到文本时，触发该函数
    },
    comment (text) {
        // 每当解析到注释时，触发该函数
    }
})
```

#### 文本解析器

vue中允许文本中带有变量，遇到带有变量的文本需要调用文本解析器进行解析



### vue-router的实现原理

vue属于spa（单一页面应用），当它加载页面时不会加载整个页面的内容，而是更新某个指定容器的内容

单页面应用的核心之一是

1.更新视图而不请求页面

2.vue-router的三种模式

vue-router提供三种模式：

hash：使用url hash值来作为路由，为默认模式

history：依赖HTML5 History API和服务器配置

abstract：支持所有javascript运行环境

移动端weex使用abstract模式

`vue-router` 源码分析部分

- 注册: 执行 `install` 方法，注入生命周期钩子初始化
- vueRouter: 当组件执行 `beforeCreate` 传入 `router` 实例时,执行 `init` 函数，然后执行 `history.transitionTo` 路由过渡
- matcher : 根据传入的 `routes` 配置创建对应的 `pathMap` 和 `nameMap` ,可以根据传入的位置和路径计算出新的位置并匹配对应的 `record`
- 路由模式: 路由模式在初始化 `vueRouter` 时完成匹配，如果浏览器不支持则会降级
- 路由 切换: 哈希模式下底层使用了浏览器原生的 `pushState` 和 `replaceState` 方法
- router-view: 调用父组件上存储的 `$route.match` 控制路由对应的组件的渲染情况，并且支持嵌套。
- router-link: 通过 `to` 来决定点击事件跳转的目标路由组件，并且支持渲染成不同的 `tag`,还可以修改激活路由的样式。

hash模式js实现代码

```javascript
class Routers {
  constructor() {
    // 储存hash与callback键值对
    this.routes = {};
    // 当前hash
    this.currentUrl = '';
    // 记录出现过的hash
    this.history = [];
    // 作为指针,默认指向this.history的末尾,根据后退前进指向history中不同的hash
    this.currentIndex = this.history.length - 1;
    this.refresh = this.refresh.bind(this);
    this.backOff = this.backOff.bind(this);
    // 默认不是后退操作
    this.isBack = false;
    window.addEventListener('load', this.refresh, false);
    window.addEventListener('hashchange', this.refresh, false);
  }

  route(path, callback) {
    this.routes[path] = callback || function() {};
  }

  refresh() {
    this.currentUrl = location.hash.slice(1) || '/';
    if (!this.isBack) {
      // 如果不是后退操作,且当前指针小于数组总长度,直接截取指针之前的部分储存下来
      // 此操作来避免当点击后退按钮之后,再进行正常跳转,指针会停留在原地,而数组添加新hash路由
      // 避免再次造成指针的不匹配,我们直接截取指针之前的数组
      // 此操作同时与浏览器自带后退功能的行为保持一致
      if (this.currentIndex < this.history.length - 1)
        this.history = this.history.slice(0, this.currentIndex + 1);
      this.history.push(this.currentUrl);
      this.currentIndex++;
    }
    this.routes[this.currentUrl]();
    console.log('指针:', this.currentIndex, 'history:', this.history);
    this.isBack = false;
  }
  // 后退功能
  backOff() {
    // 后退操作设置为true
    this.isBack = true;
    this.currentIndex <= 0
      ? (this.currentIndex = 0)
      : (this.currentIndex = this.currentIndex - 1);
    location.hash = `#${this.history[this.currentIndex]}`;
    this.routes[this.history[this.currentIndex]]();
  }
}

```

history模式js实现代码

```javascript
class Routers {
  constructor() {
    this.routes = {};
    // 在初始化时监听popstate事件
    this._bindPopState();
  }
  // 初始化路由
  init(path) {
    history.replaceState({path: path}, null, path);
    this.routes[path] && this.routes[path]();
  }
  // 将路径和对应回调函数加入hashMap储存
  route(path, callback) {
    this.routes[path] = callback || function() {};
  }

  // 触发路由对应回调
  go(path) {
    history.pushState({path: path}, null, path);
    this.routes[path] && this.routes[path]();
  }
  // 监听popstate事件
  _bindPopState() {
    window.addEventListener('popstate', e => {
      const path = e.state && e.state.path;
      this.routes[path] && this.routes[path]();
    });
  }
}
```

调用上述方法

```html
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>h5 router</title>
</head>
<body>
  <ul>
      <li><a href="/">turn yellow</a></li>
      <li><a href="/blue">turn blue</a></li>
      <li><a href="/green">turn green</a></li>
  </ul>
</body>
</html>
<script>
window.Router = new Routers();
Router.init(location.pathname);
const content = document.querySelector('body');
const ul = document.querySelector('ul');
function changeBgColor(color) {
  content.style.backgroundColor = color;
}

Router.route('/', function() {
  changeBgColor('yellow');
});
Router.route('/blue', function() {
  changeBgColor('blue');
});
Router.route('/green', function() {
  changeBgColor('green');
});

ul.addEventListener('click', e => {
  if (e.target.tagName === 'A') {
    e.preventDefault();
    Router.go(e.target.getAttribute('href'));
  }
});
</script>
```

router-view & router-link

`vue-router` 在 `install` 时全局注册了两个组件一个是 `router-view` 一个是 `router-link`，这两个组件都是典型的函数式组件



路由切换原理

route.push



`hash` 模式的 `push` 方法会调用路径切换方法 `transitionTo`,接着在回调函数中调用`pushHash`方法，这个方法调用的 `pushState` 方法底层是调用了浏览器原生 `history` 的方法。`push` 和 `replace` 的区别就在于一个将 `url` 推入了历史栈，一个没有，最直观的体现就是 `replace` 模式下浏览器点击后退不会回到上一个路由去 ,另一个则可以。

### vue.use

可以看到 `Vue` 的 `use` 方法会接受一个 `plugin` 参数，然后使用 `installPlugins` 数组保存已经注册过的 `plugin` 。 

首先保证 `plugin` 不被重复注册，然后将 `Vue` 从函数参数中取出，将整个 `Vue` 作为 `plugin` 的`install` 方法的第一个参数，这样做的好处就是不需要麻烦的另外引入 `Vue`,便于操作。 

接着就去判断 `plugin` 上是否存在 `install` 方法。存在则将赋值后的参数传入执行 ，最后将所有的存在 `install` 方法的 `plugin` 交给 `installPlugins`维护。



### vue.$nextTick原理

vue的nextTick方法的实现原理了：

vue用异步队列的方式来控制DOM更新和nextTick回调先后执行

microtask因为其高优先级特性，能确保队列中的微任务在一次事件循环前被执行完毕

因为兼容性问题，vue不得不做了microtask向macrotask的降级方案

在vue2.5的源码中，macrotask降级的方案依次是：setImmediate、MessageChannel、setTimeout.

setImmediate是最理想的方案了，可惜的是只有IE和nodejs支持。

MessageChannel的onmessage回调也是microtask，但也是个新API，面临兼容性的尴尬...

所以最后的兜底方案就是setTimeout了，尽管它有执行延迟，可能造成多次渲染，算是没有办法的办法了。



### vuex实现原理

Vuex是一个专为Vue服务，用于管理页面数据状态、提供统一数据操作的生态系统。它集中于MVC模式中的Model层，规定所有的数据操作必须通过 `action - mutation - state change` 的流程来进行，再结合Vue的数据视图双向绑定特性来实现页面的展示更新

统一的页面状态管理以及操作处理，可以让复杂的组件交互变得简单清晰，同时可在调试模式下进行时光机般的倒退前进操作，查看数据改变过程，使code debug更加方便。

利用vue的[插件机制](https://link.zhihu.com/?target=https%3A//cn.vuejs.org/v2/guide/plugins.html)，使用Vue.use(vuex)时，会调用vuex的install方法，装载vuex

vuex是利用vue的mixin混入机制，在beforeCreate钩子前混入vuexInit方法，vuexInit方法实现了store注入vue组件实例，并注册了vuex store的引用属性$store。applyMixin方法使用vue[混入机制](https://link.zhihu.com/?target=https%3A//cn.vuejs.org/v2/guide/mixins.html)，vue的生命周期beforeCreate钩子函数前混入vuexInit方法，

Vuex的state状态是响应式，是借助vue的data是响应式，将state存入vue实例组件的data中；Vuex的getters则是借助vue的计算属性computed实现数据实时监听。



### 组件keep-alive实现原理





## chromevue调试工具

在谷歌应用商店搜索vuejsdevtools，不使用beta版使用正式版，添加至chrome扩展程序并启动。

启动之后本地在chrome中打开vue调试页面时，vuedevtool会自动检测到vue页面，变成绿色，不是vue页面则默认为灰色。

打开开发者工具，在最后一栏为vue，打开就能显示页面的组件和动画，以及组件所用到的props、data、computed。

非常方便。



## 阿里巴巴图标库

在线上选择对应的图标，然后完整地下载css文件和js文件



## Graphql

graphql客户端写法

安装包

```js
npm install apollo-boost graphql-tag
```

设置client和url

```js
import ApplloCient from "apollo-boost"

const client = new ApplloCient({
    uri:"gql"
})

export default client;
```

实例

```js
import gql from "graphql-tag"
//query操作
  client
    .query({
        query: gql`
            query($input: SendSmsCodeType!) {
                sendSmsCode(input: $input) {
                    success
                    msg
                }
            }
           `,
    variables: {
            input: {
                phone: this.phone,
                },
            },
    })
    //返回数据后执行的函数，res为返回结果
    .then((res) => {
        const rlt = res.data.sendSmsCode;
        if (rlt.success) {
            zs.$toast("发送成功");
        } else {
            zs.$toast(zs.msg);
        }
    });
//mutation操作
     client
        .mutate({
          mutation: gql`
            mutation($input: RegisterType!) {
              register(input: $input) {
                success
                msg
              }
            }
          `,
          variables: {
            input: {
              phone: this.phone,
              code: this.phonecode,
              password: this.password,
              invite_code: this.invitecode,
            },
          },
        })
       //返回数据后执行的函数，res为返回结果
        .then((res) => {
          console.log(res);
          const rlt = res.data.register;
          if (rlt.success) {
            zs.$toast("注册成功");
            this.$router.push({
              name: "success",
            });
          } else {
            zs.$toast(rlt.msg);
          }
        });
    },

```

以上代码为带参数的query和mutation，copy时需要根据后端的grapgql playground去查schema和docs，修改对应的参数

官网链接：

"https://apollo.vuejs.org/guide/apollo"

https://www.jianshu.com/p/95954887271f

https://blog.csdn.net/winnie__wei/article/details/80598309

https://www.cnblogs.com/lhxsoft/p/11904388.html



## 使用bootstrap

安装

```node
npm install vue bootstrap-vue bootstrap
```

全局注册bootstrap组件

```js
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
```





## 使用antd

安装

```js
npm install ant-design-vue --save
```

在app.js中引用

```js
import ant from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
Vue.use(ant)
```

在组件中添加antd代码

　

表单

```vue

```

日期选择表单

```vue
<a-form-item label=“success" has-feedback validate-status="success">
<a-date-picker style="width:100%"/>
</a-form-item>
```



## Element-UI



### 选择框

单选/多选框

多个选项单选互斥框

```vue
<template>
  <el-radio-group v-model="radio">
    <el-radio :label="3">备选项</el-radio>
    <el-radio :label="6">备选项</el-radio>
    <el-radio :label="9">备选项</el-radio>
  </el-radio-group>
</template>
```

多个选项多选不互斥框

```vue
<template>
  <el-checkbox-group v-model="checkList">
    <el-checkbox label="复选框 A"></el-checkbox>
    <el-checkbox label="复选框 B"></el-checkbox>
    <el-checkbox label="复选框 C"></el-checkbox>
    <el-checkbox label="禁用" disabled></el-checkbox>
    <el-checkbox label="选中且禁用" disabled></el-checkbox>
  </el-checkbox-group>
</template>
```

下拉选择框

普通单选下拉选择框

```vue
<template>
  <el-select 
     v-model="value" 
     clearable <!--可选择是否具有一键清除选项-->
     disabled  <!--可选择是否具有一键禁用选项-->
     placeholder="请选择"
   >
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
      :disabled="item.disabled" <!--可选择是否具有禁用单独选项选项-->
    >
    </el-option>
  </el-select>
</template>

```

可多选下拉选择框

```vue
<template>
  <el-select 
    v-model="value1" 
    multiple  <!--添加多选选项-->
    collapse-tags <!--可选择是否展示全部标签-->
    placeholder="请选择"
    >
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</template>
```

多选下拉框返回数组

时间/日期选择框



穿梭选择框



布尔开关



### 弹出框

抽屉

通知

消息提示

消息盒

对话框

#### 弹出框可移动功能

在项目中新建directives.js文件

```javascript
import Vue from 'vue'

// v-dialogDrag: 弹窗拖拽
Vue.directive('dialogDrag', {
  bind(el, binding, vnode, oldVnode) {
    const dialogHeaderEl = el.querySelector('.el-dialog__header')
    const dragDom = el.querySelector('.el-dialog')
    dialogHeaderEl.style.cursor = 'move'

    // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
    const sty = dragDom.currentStyle || window.getComputedStyle(dragDom, null)

    dialogHeaderEl.onmousedown = (e) => {
      // 鼠标按下，计算当前元素距离可视区的距离
      const disX = e.clientX - dialogHeaderEl.offsetLeft
      const disY = e.clientY - dialogHeaderEl.offsetTop

      // 获取到的值带px 正则匹配替换
      let styL, styT

      // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
      if (sty.left.includes('%')) {
        styL = +document.body.clientWidth * (+sty.left.replace(/\%/g, '') / 100)
        styT = +document.body.clientHeight * (+sty.top.replace(/\%/g, '') / 100)
      } else {
        styL = +sty.left.replace(/\px/g, '')
        styT = +sty.top.replace(/\px/g, '')
      }

      document.onmousemove = function(e) {
        // 通过事件委托，计算移动的距离
        const l = e.clientX - disX
        const t = e.clientY - disY

        // 移动当前元素
        dragDom.style.left = `${l + styL}px`
        dragDom.style.top = `${t + styT}px`

        // 将此时的位置传出去
        // binding.value({x:e.pageX,y:e.pageY})
      }

      document.onmouseup = function(e) {
        document.onmousemove = null
        document.onmouseup = null
      }
    }
  }
})

// v-dialogDragWidth: 弹窗宽度拖大 拖小
Vue.directive('dialogDragWidth', {
  bind(el, binding, vnode, oldVnode) {
    const dragDom = binding.value.$el.querySelector('.el-dialog')

    el.onmousedown = (e) => {
      // 鼠标按下，计算当前元素距离可视区的距离
      const disX = e.clientX - el.offsetLeft

      document.onmousemove = function(e) {
        e.preventDefault() // 移动时禁用默认事件

        // 通过事件委托，计算移动的距离
        const l = e.clientX - disX
        dragDom.style.width = `${l}px`
      }

      document.onmouseup = function(e) {
        document.onmousemove = null
        document.onmouseup = null
      }
    }
  }
})
```

在main.js中导入该文件

```javascript
import ‘./utils/directives.js’
```

在使用 `el-dialog` 的地方加入 `v-dialogDrag`

```vue
		<el-dialog
      :visible.sync="dialogVisible"
      v-dialogDrag>
      // ...
    </el-dialog>
```



### 数据展示页面

table表格

进度条

分页

树形展示

标签

标记

### 展示页面

走马灯

加载中

卡片

日历

折叠面板

### 布局导航组件

导航条

tabs标签页

页头

面包屑

下拉菜单

步骤条

### 表单

form

input

上传

评分

滑块

计数器

### 灵活小组件

小弹出框

小提示框

文字提示框

气泡确认框

时间线/分割线

回到顶部

### 自定义样式

element-u支持自定义样式

比如默认的时间选择控件time-picker，默认为padding-left：30px，padding-right：30px，使用chrome工具调试后，发现该样式在.el-input-prefix、.el-input-inner下,这是element自带的样式，所以在组件对应的样式下添加.el-input-inner：padding-left：0px；padding-right：0px；就可以修改默认的样式



## 移动端组件库vant

轻量、可靠的移动端库

安装

```js
npm install vant -S
```

一次性导入所有组件

```js
import Vant from 'vant';
import 'vant/lib/index.css'

Vue.use(Vant);
```

或者按需导入组件,首字母要大写,多个组件使用.use的方法链式调用注册到全局

```js
import {
    Tab, Tabs, Toast, Popup, DatetimePicker, Area, Icon, Uploader, Picker, List, Rate,       Field, Tag, Collapse, CollapseItem, Button, Image, Grid, GridItem, RadioGroup, Radio,     Loading, Cell, CellGroup, NoticeBar, Checkbox, CheckboxGroup, Progress, ActionSheet,     Dialog
} from 'vant'

Vue.use(Tab).use(Tabs)
```

底部安全区适配

iphone x等机型底部存在指示条，指示条的操作区域与页面底部容易重合，容易导致用户误操作。Vant组件提供safe-area-inset-bottom属性。

```vue
<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,viewport-fit=cover"

<vant-number-keyboard safe-area-inset-bottom />
```



## Spata-UI(IE)

