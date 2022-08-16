---
title: React（五）
date: 2020-06-02 21:40:33
categories: IT
tags:
    - IT，Web,Node，React
toc: true
thumbnail: https://cdn.kunkunzhang.top/redux.jpeg
---

​      前端框架，快速开发页面，函数式编程，与后端api快速搭建

<!--more-->

## Redux

Facebook 有一个 Flux 的实现，但是我们会使用 Redux 库。 它使用相同的原理，但是更简单一些。 Facebook 现在也使用 Redux 而不是原来的 Flux

### 基本概念

redux中概念：

Store:储存state的地方，通过createStore方法创建store

Action:应用中的各种操作或动作，不同的操作会改变相应的state状态

Reducer:按照action更新state

Store.getState():获取整个状态数据对象

store.dispatch():分发Action

store.subscribe():设置监听函数，一旦state变化就会自动执行

以图书馆举例，react component就是一个要借书的用户，当你向图书馆借书时跟图书管理员说要什么书，这个语境就是Action Creators，图书馆的管理员就是store，负责数据状态的管理，图书馆收到请求后向图书系统中查询，这个系统就是Reducers。

安装

```js
yarn add redux
```

新建reducer.js

```js

```

新建store.js

```js
import { } from 'redux'

```

action.js

```javascript
const action = {
   type:'ADD_TODO',
   payload:'Learn Redux'
}
```

监听

```javascript
import {createStore} from 'redux'
const store = createStore(reducer);

store.subscribe(listener)
```

action发出后reducer立即执行即为同步，一段时间后执行为异步

对于异步，



### React-redux

react-redux提供connet方法，用于从UI组件生成容器组件，

```javascript
import {connet} from 'react-redux'

const VisibleTodoList = connect(
   mapStateToProps,
   mapDispatchToProps
)(TodoList)
```

connet生成容器之后，需要让容器组件拿到state对象，react-redux提供Provider组件让容器拿到state

```javascript
import {Provider} from 'react-redux'
import {createStore} from 'redux'

render(
 <Provider store= {store}>
  <App />
  </Provider>
)
```

### 中间件

redux-saga

功能类似redux-thunk，用于异步action，原理是通过generator函数，相比于thunk更复杂一些，集中处理了action，支持dispatch后的回调。



redux-thunk

用于异步action，允许你的action可以返回函数, 带有dispatch和getState两个参数, 在这个action函数里, 异步的dispatch action;



redux-logger

在控制台打印redux过程，类似的也可以按redux文档示范的中间件，但是感觉logger的颜色更好看



redux-persist

实现数据持久化，自动存入localStorage，配置略麻烦

### Hooks

react-edux最新版本([7.1](https://react-redux.js.org/api/hooks#using-hooks-in-a-react-redux-app)版本))也引入了Hooks风格的Api

首先还是通过createStore将state存入store

再通过Provider向子组件暴露store，通过store在父子组件之间共享状态

子组件可以通过`useSelector`访问name

也可以通过`useDispatch` 可以获取dispatch，几个子组件可以共享状态

```react
import React from "react";
import { createStore } from "redux";
import { Provider, useSelector, useDispatch } from "react-redux";

const initialState = { num: 0 };

const reducer = (state, action) => {
  switch (action.type) {
    case "decrement":
      return { ...state, num: state.num - 1 };
    case "increment":
      return { ...state, num: state.num + 1 };
    default:
    
      return state;
  }
};

const store = createStore(reducer, initialState);

const ComponentUseReactRedux = () => {
  return (
    <div>
      <h2>ComponentUseReactRedux</h2>
      <Provider store={store}>
        <ChildComponentUseReactRedux />
      </Provider>
    </div>
  )
}

const ChildComponentUseReactRedux = () => {
  const num = useSelector(state => state.num);
  const dispatch = useDispatch();
  return (
    <div>
      <h3>Using useSelector, useDispatch</h3>
      Number: {num}
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
    </div>
  );
};

export default ComponentUseReactRedux;
```



### 文档

Https://cn.redux.js.org



## mobx

mobx与redux相比：

- 函数式 VS 面向对象
- redux 需要 connect，也需要 Immutable Data，reducer，action，文件、代码量较多，概念也多。 mobx 直接引用对象组织，修改数据。
- redux 数据流动很自然，任何 dispatch 都会导致广播，需要依据对象引用是否变化来控制更新粒度。mobx 数据流流动不自然，只有用到的数据才会引发绑定，局部精确更新，但免去了粒度控制烦恼。
- redux 有时间回溯，每个 action 都被记录下来，可预测性，定位错误的优势。mobx 只有一份数据引用，不会有历史记录。
- redux 引入中间件去解决异步操作，以及很多复杂的工作。mobx 没有中间件，数据改了就是改了，没有让你增加中间件的入口。

为什么用mobx

- 简单，概念，代码少
- class 去定义、组织 store，数据、computed、action 定义到一块，结构更清晰，面向对象的思维更适合快速的业务开发
- 某个 store 的引用不一定非在组件中才能取到，因为是对象，可以直接引用。比如在 constant.js 文件中可以定义一些来自 store 的变量。
- 据说效率更高。mobx 会建立虚拟推导图 (virtual derivation graph)，保证最少的推导依赖

### 基本概念

Observable state

给数据对象添加可观测的功能，支持任何数据结构。

Computed values

某个 state 发生变化时，需要自动计算的值。比如说单价变化，总价的计算

Reactions

Reactions 和 Computed 类似，都是 state 变化后触发。但它不是去计算值，而是会产生副作用，比如 console、网络请求、react dom 更新等。mobx 提供了三个函数用于自定义 reactions。

Actions



### mobx的object与map区别



### mobx与redux的不同

redux与mobx的相同点：

1.统一维护管理状态应用

2.某一状态只有一个可信状态数据来源store

3.操作更新状态方式统一，并且可控，

4.支持将store与React组件连接，如react-redux、mobx-react

不同点：

1.Redux更多的是遵循函数式编程思想，比如reducer就是一个纯函数，mobx设计更多偏向于面向对象编程和响应式编程，通常将状态包装成一个可观察对象，使用可观察对象的能力，一旦状态对象变更，就能自动获得更新

2.redux总是将所有共享的应用数据集中在一个大的store中，而mobx则通常按模块将应用状态划分，在多个独立的store中管理

3.Redux默认以Javascript原生对象存储数据，Mobx使用可观察对象，Redux需要手动追踪所有状态对象的变更，Mobx可以监听可观察对象，当其变更时自动触发监听。

4.Redux中的对象通常是不可变的，我们不能直接操作状态对象，而总是在原来状态对象基础上返回一个新的状态对象，这样就能方便地返回应用上一状态，而mobx可以直接使用新值更新状态对象

5.连接组件使用react-redux和mobx-react。react-redux中提供Provider负责将Store注入react应用，使用connect负责将store state注入容器组件，并选择特定状态作为容器组件props传递。在mobx-react中，使用Provider将所有store注入应用，使用inject将特定store注入特定组件，然后使用Observer保证组件能响应store中的可观察对象变更，即store更新

mobx异步action不需要配置，redux则需要中间件redux-sage或者redux-thunk

选择mobx可能的原因：

1。学习成本低，不需要很多配置。

2.面向对象编程。mobx支持面向对象编程，也支持函数式，redux只支持函数式

3.模版代码少。

不选择mobx可能的原因：

1.过于自由

2.可扩展性、可维护性。mobx不适用于大型项目，需要手动约定规范

https://github.com/sunyongjian/blog/issues/28

## Recoil

`Recoil` 本身就是为了解决 `React` 全局数据流管理的问题，采用分散管理原子状态的设计模式。

`Recoil` 提出了一个新的状态管理单位 `Atom`，它是可更新和可订阅的，当一个 `Atom` 被更新时，每个被订阅的组件都会用新的值来重新渲染。如果从多个组件中使用同一个 `Atom` ，所有这些组件都会共享它们的状态。

可以把`Atom` 想象为为一组 `state` 的集合，改变一个 `Atom` 只会渲染特定的子组件，并不会让整个父组件重新渲染。

使用 `Redux、Mobx` 当然可以，并没有什么问题，主要原因是它们本身并不是 `React` 库，我们是借助这些库的能力来实现状态管理。像 `Redux` 它本身虽然提供了强大的状态管理能力，但是使用的成本非常高，你还需要编写大量冗长的代码，另外像异步处理或缓存计算也不是这些库本身的能力，甚至需要借助其他的外部库。

并且，它们并不能访问 `React` 内部的调度程序，而 `Recoil` 在后台使用 `React` 本身的状态，在未来还能提供并发模式这样的能力。

使用实例

初始化

```react
import React from 'react';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState
} from 'recoil';

function App() {
  return (
    <RecoilRoot>
      <CharacterCounter />
    </RecoilRoot>
  );
}
```

定义状态

`Atom` 是一种新的状态，但是和传统的 `state` 不同，它可以被任何组件订阅，当一个 `Atom` 被更新时，每个被订阅的组件都会用新的值来重新渲染。

定义atom

```react
export const nameState = atom({
  key: 'nameState',
  default: 'ConardLi'
});
```

这种方式意味着你不需要像 `Redux` 那样集中定义状态，可以像 `Mobx` 一样将数据分散定义在任何地方。

要创建一个 `Atom` ，必须要提供一个 `key` ，其必须在 `RecoilRoot` 作用域中是唯一的，并且要提供一个默认值，默认值可以是一个静态值、函数甚至可以是一个异步函数。

订阅和更新状态

`Recoil` 采用 `Hooks` 方式订阅和更新状态，常用的是下面三个 API：

`useRecoilState`：类似 useState 的一个 `Hook`，可以取到 `atom` 的值以及 `setter` 函

`useSetRecoilState`：只获取 `setter` 函数，如果只使用了这个函数，状态变化不会导致组件重新渲染

`useRecoilValue`：只获取状态

```react
import { nameState } from './store'
// useRecoilState
const NameInput = () => {
  const [name, setName] = useRecoilState(nameState);
  const onChange = (event) => {
   setName(event.target.value);
  };
  return <>
   <input type="text" value={name} onChange={onChange} />
   <div>Name: {name}</div>
  </>;
}

// useRecoilValue
const SomeOtherComponentWithName = () => {
  const name = useRecoilValue(nameState);
  return <div>{name}</div>;
}

// useSetRecoilState  
const SomeOtherComponentThatSetsName = () => {
  const setName = useSetRecoilState(nameState);
  return <button onClick={() => setName('Jon Doe')}>Set Name</button>;
}
```

派生状态

`selector` 表示一段派生状态，它使我们能够建立依赖于其他 `atom` 的状态。它有一个强制性的 `get` 函数，其作用与 `redux` 的 `reselect` 或 `MobX` 的 `@computed` 类似。

```react
const lengthState = selector({
  key: 'lengthState', 
  get: ({get}) => {
    const text = get(nameState);
    return text.length;
  },
});

function NameLength() {
  const length = useRecoilValue(charLengthState);
  return <>Name Length: {length}</>;
}
```

selector 是一个纯函数：对于给定的一组输入，它们应始终产生相同的结果（至少在应用程序的生命周期内）。这一点很重要，因为选择器可能会执行一次或多次，可能会重新启动并可能会被缓存。

异步状态

`Recoil` 提供了通过数据流图将状态和派生状态映射到 `React` 组件的方法。真正强大的功能是图中的函数也可以是异步的。这使得我们可以在异步 `React` 组件渲染函数中轻松使用异步函数。使用 `Recoil` ，你可以在选择器的数据流图中无缝地混合同步和异步功能。只需从选择器 `get` 回调中返回 `Promise` ，而不是返回值本身。

```react
const userNameQuery = selector({
  key: 'userName',
  get: async ({get}) => {
    const response = await myDBQuery({
      userID: get(currentUserIDState),
    });
    return response.name;
  },
});

function CurrentUserInfo() {
  const userName = useRecoilValue(userNameQuery);
  return <div>{userName}</div>;
}
```

`Recoil` 推荐使用 `Suspense`，`Suspense` 将会捕获所有异步状态，另外配合 `ErrorBoundary` 来进行错误捕获：

```react
function MyApp() {
  return (
    <RecoilRoot>
      <ErrorBoundary>
        <React.Suspense fallback={<div>Loading...</div>}>
          <CurrentUserInfo />
        </React.Suspense>
      </ErrorBoundary>
    </RecoilRoot>
  );
}
```

`Recoil` 推崇的是分散式的状态管理，这个模式很类似于 `Mobx`，使用起来也感觉有点像 `observable + computed` 的模式，但是其 API 以及核心思想设计的又没有  `Mobx` 一样简洁易懂，反而有点复杂，对于新手上手起来会有一定成本。

在使用方式上完全拥抱了函数式的 `Hooks` 使用方式，并没有提供 `Componnent` 的使用方式，目前使用原生的 `Hooks API` 我们也能实现状态管理，我们也可以使用 `useMemo` 创造出派生状态，`Recoil` 的 `useRecoilState` 以及 `selector` 也比较像是对 `useContext、useMemo` 的封装。

但是毕竟是 `Facebook` 官方推出的状态管理框架，其主打的是高性能以及可以利用 `React` 内部的调度机制，包括其承诺即将会支持的并发模式，这一点还是非常值得期待的。

另外，其本身的分散管理原子状态的模式、读写分离、按需渲染、派生缓存等思想还是非常值得一学的

https://juejin.cn/post/6881493149261250568#heading-2

## Rematch

https://rematchjs.org/docs

rematch是基于redux的状态管理框架，但是比redux简便很多。

rematch是没有boilerplate的Redux最佳实践，没有多余的action type，action creators、switch语句或者chunks

也就是说，rematch移除了redux中所需要的一些东西，并用更简单的方式替代了它们：

声明action类型、action创建函数、thunks、sagas、store配置、mapDispatchToProps

安装

```shell
npm install @rematch/core
```

rematch中的概念：

状态数据：state

改变state：reducer

异步action：effects with async/await

如何触发reducer和effects：不需编写action type或者action creator，dispatch标准化了action

创建state、model

```react
import { createModel } from '@rematch/core'

export const count = createModel({
  state:0,
  reducer:{
    upBy:(state,payload) => state + payload
  },
  effects:{
    async asyncGetAppInfo() {
      await console.log(2);
    }
  }
})
```

在组件中使用

```react
import { connect } from 'react-redux'

//Component

const mapStateToProps = (state) =>({
  count: state.count
})

const mapDispatchToProps = (dispatch) => ({
  countUpBy: dispatch.count.upBy
})

connect(mapStateToProps,mapDispatchToProps)(Component)
```

对比redux中

先创建action type

```react
export const COUNT_UP_BY = 'COUNT_UP_BY'
```

再创建action creator

```javascript
import { COUNT_UP_BY } from '../types/counter'

export const countUpBy = (value) => ({
  type: COUNT_UP_BY,
  payload: value,
})
```

创建reducer

```react
import { COUNT_UP_BY } from '../types/counter'

const initialState = 0

export default (state = initialState,action) => {
  switch (action.type){
    case COUNT_UP_BY:
      return state + action.paylaod
    default return state
  }
}
```

在模块中使用

```react
import { countUpBy } from '../actions/count'
import { connect } from 'react-redux'

//Component

const mapStateToProps = (state) => ({
  count: state.count
})

connect(mapStateToProps,{countUpBy})(Component)
```





demo地址：https://Xrr2016.github.io/rematch-todoså

### 其他插件



## jotai

`Jotai` 是一个原始且灵活的 `React` 状态管理库

Jotai的特点：

- 原始：API 都是以 `Hooks` 方式提供，使用方式类似于 `useState`，`useReducer`
- 灵活：可以组合多个 `Atom` 来创建新的 `Atom`，并且支持异步

`Jotai` 可以看作是 `Recoil` 的简化版，使用了 `Atom` + `Hook` + `Context`，用于解决 React 全局数据流管理的问题

`Atom` 是 `Jotai` 中状态管理单位，它是可以更新和订阅的，当 `Atom` 被更新时，订阅了这个 `Atom` 的组件便会使用新值重新渲染

并且，更新对应的 `Atom` 只会重新渲染订阅了这个 `Atom` 的组件，并不会像 `Context` 那样导致整个父组件重新渲染，所以可以做到精确渲染

与Recoil相比：

- `Jotai` 的 API 相对 `Recoil` 简洁很多，并且容易使用
- `Jotai` 不需要用 `RecoilRoot` 或 `Provider` 等组件包裹，使得结构可以更简洁
- `Jotai` 定义 `Atom` 时不用提供key
- `Jotai` 更小巧，大小仅 2.4 kB
- `Jotai` 对 `TypeScript` 的支持更好

安装

```bash
npm install jotai
```

使用

使用 `atom` 函数可以创建一个 `Atom` ，一个 `Atom` 代表一个状态，需要传入一个参数，用来指定初始值，值可以是字符串、数字、对象、数组等

```react
import { atom } from "jotai";

const valueAtom = atom(0);
```

在组件中使用atom状态

```react
import { useAtom } from 'jotai'

function Counter() {
  const [count, setCount] = useAtom(countAtom)
  return (
    <h1>
      {count}
      <button onClick={() => setCount(c => c + 1)}>one up</button>
```

一个atom可以由其他atom通过函数计算获得

```javascript
const count1 = atom(1)
const count2 = atom(2)
const count3 = atom(3)

const sum = atom((get) => get(count1) + get(count2) + get(count3))
```

也可以写成数组的形式进行叠加

```react
const atoms = [count1, count2, count3, ...otherAtoms]
const sum = atom((get) => atoms.map(get).reduce((acc, count) => acc + count))
```

异步atom状态

```react
const urlAtom = atom("https://json.host.com")
const fetchUrlAtom = atom(
  async (get) => {
    const response = await fetch(get(urlAtom))
    return await response.json()
  }
)

function Status() {
  // Re-renders the component after urlAtom changed and the async function above concludes
  const [json] = useAtom(fetchUrlAtom)
```



## zustand

特点：

不需要像`redux`那样在最外层包裹一层高阶组件，只绑定对应关联组件即可（当在其他组件/方法修改状态后，该组件会自动更新）

异步处理也较为简单，与普通函数用法相同

支持`hook`组件使用、组件外使用

提供`middleware`拓展能力（`redux`、`devtools`、`combine`、`persist`）

可通过 [github.com/mweststrate…](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fmweststrate%2Fimmer) 拓展能力（实现嵌套更新、日志打印）

安装

```shell
npm install zustand # or yarn add zustand
```

使用

创建store

```react
import create from 'zustand'

const useStore = create(set => ({
  bears: 0,
  increasePopulation: () => set(state => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 })
}))
```

在组件中使用

```react
// UI 组件，展示 bears 状态，当状态变更时可实现组件同步更新
function BearCounter() {
  const bears = useStore(state => state.bears)
  return <h1>{bears} around here ...</h1>
}

// 控制组件，通过 store 内部创建的 increasePopulation 方法执行点击事件，可触发数据和UI组件更新
function Controls() {
  const increasePopulation = useStore(state => state.increasePopulation)
  return <button onClick={increasePopulation}>one up</button>
}
```

在组件外使用

```javascript
import useStore from './index';

// const { getState, setState, subscribe, destroy } = store

export const sleep = (timeout: number) => {
  // 1. 获取方法 执行逻辑
  const { setLoading } = useStore.getState();
  // 2. 直接通过 setState 修改状态
  // useStore.setState({ loading: false });

  return new Promise((resolve) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      resolve(true);
    }, timeout);
  });
};
```

## storeon

storeon是一个类似于redux的管理库，可以使用于React、Preact、Angular、Vue和Svelte中

使用

创建store

```javascript
import { createStoreon } from 'storeon'

// Initial state, reducers and business logic are packed in independent modules
let count = store => {
  // Initial state
  store.on('@init', () => ({ count: 0 }))
  // Reducers returns only changed part of the state
  store.on('inc', ({ count }) => ({ count: count + 1 }))
}

export const store = createStoreon([count])
```

使用store

```javascript
import { useStoreon } from 'storeon/react' // or storeon/preact

export const Counter = () => {
  // Counter will be re-render only on `state.count` changes
  const { dispatch, count } = useStoreon('count')
  return <button onClick={() => dispatch('inc')}>{count}</button>
}
```

storeContext

```javascript
import { StoreContext } from 'storeon/react'

render(
  <StoreContext.Provider value={store}>
    <Counter />
  </StoreContext.Provider>,
  document.body
)
```

## XState

Xstate是用于现代 Web 的 JavaScript 和 TypeScript 的有限状态机和状态图，支持ts、react、vue、svelte

安装

```shell
npm install xstate
```

核心包

- 🤖 `xstate` - 有限状态机和状态图核心库 + 解释器
- [🔬 `@xstate/fsm`](https://github.com/statelyai/xstate/tree/main/packages/xstate-fsm) - 最小有限状态机库
- [📉 `@xstate/graph`](https://github.com/statelyai/xstate/tree/main/packages/xstate-graph) - XState 的图遍历实用工具包
- [⚛️ `@xstate/react`](https://github.com/statelyai/xstate/tree/main/packages/xstate-react) - 在 React 应用中使用 XState 的 React Hooks 和实用工具包
- [💚 `@xstate/vue`](https://github.com/statelyai/xstate/tree/main/packages/xstate-vue) - 用于在 Vue 应用中使用 XState 的 Vue 组合函数和实用工具包
- [🎷 `@xstate/svelte`](https://github.com/statelyai/xstate/tree/main/packages/xstate-svelte) - 用于在 Svelte 应用中使用 XState 的 Svelte 实用工具包
- [✅ `@xstate/test`](https://github.com/statelyai/xstate/tree/main/packages/xstate-test) - 基于模型测试的实用工具包（使用 XState）
- [🔍 `@xstate/inspect`](https://github.com/statelyai/xstate/tree/main/packages/xstate-inspect) - XState 的检查实用工具包

使用

```javascript
import { createMachine, interpret } from 'xstate';

// 无状态的状态机定义
// machine.transition(...) 是解释器使用的纯函数。
const toggleMachine = createMachine({
  id: 'toggle',
  initial: 'inactive',
  states: {
    inactive: {
      on: {
        TOGGLE: { target: 'active' }
      }
    },
    active: {
      on: {
        TOGGLE: { target: 'inactive' }
      }
    }
  }
});

// 具有内部状态的状态机实例
const toggleService = interpret(toggleMachine)
  .onTransition((state) => console.log(state.value))
  .start();
// => 'inactive'

toggleService.send({ type: 'TOGGLE' });
// => 'active'

toggleService.send({ type: 'TOGGLE' });
// => 'inactive'
```

### Promise

```javascript
import { createMachine, interpret, assign } from 'xstate';

const fetchMachine = createMachine({
  id: 'Dog API',
  initial: 'idle',
  context: {
    dog: null
  },
  states: {
    idle: {
      on: {
        FETCH: { target: 'loading' }
      }
    },
    loading: {
      invoke: {
        id: 'fetchDog',
        src: (context, event) =>
          fetch('https://dog.ceo/api/breeds/image/random').then((data) =>
            data.json()
          ),
        onDone: {
          target: 'resolved',
          actions: assign({
            dog: (_, event) => event.data
          })
        },
        onError: {
          target: 'rejected'
        }
      },
      on: {
        CANCEL: { target: 'idle' }
      }
    },
    rejected: {
      on: {
        FETCH: { target: 'loading' }
      }
    },
    resolved: {
      type: 'final'
    }
  }
});

const dogService = interpret(fetchMachine)
  .onTransition((state) => console.log(state.value))
  .start();

dogService.send({ type: 'FETCH' });
```

### React

安装react插件

```shell
npm i xstate @xstate/react
```

在react中使用

```react
import { useMachine } from '@xstate/react';
import { createMachine } from 'xstate';

const toggleMachine = createMachine({
  id: 'toggle',
  initial: 'inactive',
  states: {
    inactive: {
      on: { TOGGLE: 'active' }
    },
    active: {
      on: { TOGGLE: 'inactive' }
    }
  }
});

export const Toggler = () => {
  const [state, send] = useMachine(toggleMachine);

  return (
    <button onClick={() => send('TOGGLE')}>
      {state.value === 'inactive'
        ? 'Click to activate'
        : 'Active! Click to deactivate'}
    </button>
  );
};
```



### 分层状态机

```javascript
import { createMachine } from 'xstate';

const pedestrianStates = {
  initial: 'walk',
  states: {
    walk: {
      on: {
        PED_TIMER: { target: 'wait' }
      }
    },
    wait: {
      on: {
        PED_TIMER: { target: 'stop' }
      }
    },
    stop: {}
  }
};

const lightMachine = createMachine({
  id: 'light',
  initial: 'green',
  states: {
    green: {
      on: {
        TIMER: { target: 'yellow' }
      }
    },
    yellow: {
      on: {
        TIMER: { target: 'red' }
      }
    },
    red: {
      on: {
        TIMER: { target: 'green' }
      },
      ...pedestrianStates
    }
  }
});

const currentState = 'yellow';

const nextState = lightMachine.transition(currentState, { type: 'TIMER' })
  .value;
// => {
//   red: 'walk'
// }

lightMachine.transition('red.walk', { type: 'PED_TIMER' }).value;
// => {
//   red: 'wait'
// }
```

### 并行状态机

```javascript
import { createMachine } from 'xstate';

const wordMachine = createMachine({
  id: 'word',
  type: 'parallel',
  states: {
    bold: {
      initial: 'off',
      states: {
        on: {
          on: {
            TOGGLE_BOLD: { target: 'off' }
          }
        },
        off: {
          on: {
            TOGGLE_BOLD: { target: 'on' }
          }
        }
      }
    },
    underline: {
      initial: 'off',
      states: {
        on: {
          on: {
            TOGGLE_UNDERLINE: { target: 'off' }
          }
        },
        off: {
          on: {
            TOGGLE_UNDERLINE: { target: 'on' }
          }
        }
      }
    },
    italics: {
      initial: 'off',
      states: {
        on: {
          on: {
            TOGGLE_ITALICS: { target: 'off' }
          }
        },
        off: {
          on: {
            TOGGLE_ITALICS: { target: 'on' }
          }
        }
      }
    },
    list: {
      initial: 'none',
      states: {
        none: {
          on: {
            BULLETS: { target: 'bullets' },
            NUMBERS: { target: 'numbers' }
          }
        },
        bullets: {
          on: {
            NONE: { target: 'none' },
            NUMBERS: { target: 'numbers' }
          }
        },
        numbers: {
          on: {
            BULLETS: { target: 'bullets' },
            NONE: { target: 'none' }
          }
        }
      }
    }
  }
});

const boldState = wordMachine.transition('bold.off', { type: 'TOGGLE_BOLD' })
  .value;

// {
//   bold: 'on',
//   italics: 'off',
//   underline: 'off',
//   list: 'none'
// }

const nextState = wordMachine.transition(
  {
    bold: 'off',
    italics: 'off',
    underline: 'on',
    list: 'bullets'
  },
  { type: 'TOGGLE_ITALICS' }
).value;

// {
//   bold: 'off',
//   italics: 'on',
//   underline: 'on',
//   list: 'bullets'
// }
```

### 历史状态机

```javascript
import { createMachine } from 'xstate';

const paymentMachine = createMachine({
  id: 'payment',
  initial: 'method',
  states: {
    method: {
      initial: 'cash',
      states: {
        cash: {
          on: {
            SWITCH_CHECK: { target: 'check' }
          }
        },
        check: {
          on: {
            SWITCH_CASH: { target: 'cash' }
          }
        },
        hist: { type: 'history' }
      },
      on: {
        NEXT: { target: 'review' }
      }
    },
    review: {
      on: {
        PREVIOUS: { target: 'method.hist' }
      }
    }
  }
});

const checkState = paymentMachine.transition('method.cash', {
  type: 'SWITCH_CHECK'
});

// => State {
//   value: { method: 'check' },
//   history: State { ... }
// }

const reviewState = paymentMachine.transition(checkState, { type: 'NEXT' });

// => State {
//   value: 'review',
//   history: State { ... }
// }

const previousState = paymentMachine.transition(reviewState, {
  type: 'PREVIOUS'
}).value;

// => { method: 'check' }
```



## redux-toolkit

**Redux工具包** 致力于成为编写 Redux 逻辑的标准方式。它最初是为了帮助解决有关 Redux 的三个常见问题而创建的：

- "配置一个 Redux store 过于复杂"
- "做任何 Redux 的事情我都需要添加很多包"
- "Redux 需要太多的样板代码"

包括以下api

configureStore(): 包装 createStore 以提供简化的配置选项和良好的默认预设。它可以自动组合你的切片 reducers，添加您提供的任何 Redux 中间件，默认情况下包含 redux-thunk ，并允许使用 Redux DevTools 扩展。

createReducer(): 为 case reducer 函数提供 action 类型的查找表，而不是编写switch语句。此外，它会自动使用immer 库来让您使用普通的可变代码编写更简单的 immutable 更新，例如 state.todos [3] .completed = true 。

createAction(): 为给定的 action type string 生成一个 action creator 函数。函数本身定义了 toString()，因此它可以用来代替 type 常量。

createSlice(): 接受一个 reducer 函数的对象、分片名称和初始状态值，并且自动生成具有相应 action creators 和 action 类型的分片reducer。

createAsyncThunk: 接受一个 action type string 和一个返回 promise 的函数，并生成一个发起基于该 promise 的pending/fulfilled/rejected action 类型的 thunk。

createEntityAdapter: 生成一组可重用的 reducers 和 selectors，以管理存储中的规范化数据
createSelector 组件 来自 Reselect 库，为了易用再导出。





## react-query

React Query 无疑是管理服务器状态的最佳库之一。它非常好用，**开箱即用，无需配置**，并且可以随着应用的增长而根据自己的喜好**进行定制**。

React Query 使您可以击败并征服棘手的服务器状态挑战和障碍，并在开始控制您的应用数据之前对其进行控制。

安装

```shell
npm i react-query
```

代码示例

```react
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import { getTodos, postTodo } from '../my-api'

// 创建一个 client
const queryClient = new QueryClient()

function App() {
  return (
    // 提供 client 至 App
    <QueryClientProvider client={queryClient}>
      <Todos />
    </QueryClientProvider>
  )
}

function Todos() {
  // 访问 client
  const queryClient = useQueryClient()

  // 查询
  const query = useQuery('todos', getTodos)

  // 修改
  const mutation = useMutation(postTodo, {
    onSuccess: () => {
      // 错误处理和刷新
      queryClient.invalidateQueries('todos')
    },
  })

  return (
    <div>
      <ul>
        {query.data.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>

      <button
        onClick={() => {
          mutation.mutate({
            id: Date.now(),
            title: 'Do Laundry',
          })
        }}
      >
        Add Todo
      </button>
    </div>
  )
}

render(<App />, document.getElementById('root'))
```





## rtk-query





## ES-lint

react的代码规范库

```shell
yarn add eslint eslint-plugin-react
```

如果是typescript项目按照ts相关插件

```shell
yarn add @typescript-eslint/eslint-plugin @typescript-eslint/parser
```

使用yarn eslint --lint向导来完成配置，或者手动创建eslintrc。json填入如下配置

```json
{
  "extends": ["eslint:recommended","plugin:react/recommended"],
  "parser": "@typescript-eslint/parser",
  "plugins": ["react","@typescript-eslint"],
  "rules": {
    "react/self-closing-comp": ["error"] //组件无内容时自闭合
  }
}
```

在vscode中配置

```json
"eslint.validate": [
  "javascript",
  "javascriptreact",
  "typescript",
  "typescriptreact"
]
```

## react的Ts写法

### react、react-dom类型声明文件

使用tsx之前要安装react的声明文件，否则会报错找不到模块react

安装

```shell
npm install @types/react -s
npm install @types/react-dom -s
```



### 有状态组件

有状态组件中的state和props使用ts去定义类型

```tsx
import * as React from 'react'

interface IProps {
  color: string,
  size?: string
}
  
interface IState {
  count: number,
}

class App extends React.PureComponent<IProps, IState> {
  public readonly state: Readonly<IState> = {
    count: 1
  }
  public render () {
    return (
    	<div>Hello world</div>
    )
  }
  public componentDidMount () {
  }
}
```



### 事件类型

常用Event事件对象类型

ClipboardEvent<T = Element> 剪贴板事件对象

DragEvent<T = element> 拖拽事件对象

ChangeEvent<T = element> Change事件对象

KeyboardEvent<T = element>  键盘事件对象

MouseEvent<T = element> 鼠标事件对象

TouchEvent<T = element> 触摸事件对象

WheelEvent<T = element> 滚轮事件对象

AnimationEvent<T = element> 动画事件对象

TransitionEvent<T = element> 过渡事件对象

```tsx
import { MouseEvent } from 'react'

interface Iprops {
  onClick (event: MouseEvent<HTMLDivElement>): void,
}
```



### 泛型组件

```react
//泛型ts组件
function Foo<T>(props: Props<T>){
  return <div>{props.content}</div>
}

const App = () => {
  return (
  	<div className="App">
      <Foo content={42}></Foo>
      <Foo<string> content={"hello"}></Foo>
    </div>
  )
}
        
//普通ts组件
interface Props {
	content: string;          
}
        
function Foo(props: Props) {
	return <div>{props.content}</div>          
}
        
const App = () => {
  return (
  	<div className="App">
      // Type number not assignable to type string
      <Foo content={42}></Foo>
      <Foo<string> content={"hello"}></Foo>
    </div>
  )
}
```

