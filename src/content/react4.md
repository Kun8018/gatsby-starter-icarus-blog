---
title: React（三）
date: 2020-06-02 21:40:33
categories: IT
tags:
    - IT，Web,Node，React
toc: true
thumbnail: https://cdn.kunkunzhang.top/hooks.jpeg
---

​      前端框架，快速开发页面，函数式编程，与后端api快速搭建

<!--more-->

## Hooks 原理

### hook的使用规则

hook有以下使用规则：

1. 不要在循环，条件或嵌套函数中调用 Hook
2. 确保总是在你的 React 函数的最顶层调用他们。
3. 顺序调用。遵守这条规则，你就能确保 Hook 在每一次渲染中都按照同样的顺序被调用。这让 React 能够在多次的 useState 和 useEffect 调用之间保持 hook 状态的正确。

在单个组件中可以使用多个 State Hook 或 Effect Hook，但是React 怎么知道哪个 state 对应哪个 `useState`？答案是 React 靠的是 Hook 调用的顺序。因为我们的示例中，Hook 的调用顺序在每次渲染中都是相同的，所以它能够正常工作。只要 Hook 的调用顺序在多次渲染之间保持一致，React 就能正确地将内部 state 和对应的 Hook 进行关联。

如果在语句中使用hook

```javascript
 // 🔴 在条件语句中使用 Hook 违反第一条规则
  if (name !== '') {
    useEffect(function persistForm() {
      localStorage.setItem('formData', name);
    });
  }
```

在第一次渲染中 `name !== ''` 这个条件值为 `true`，所以我们会执行这个 Hook。但是下一次渲染时我们可能清空了表单，表达式值变为 `false`。此时的渲染会跳过该 Hook，Hook 的调用顺序发生了改变：

```javascript
useState('Mary')           // 1. 读取变量名为 name 的 state（参数被忽略）
// useEffect(persistForm)  // 🔴 此 Hook 被忽略！
useState('Poppins')        // 🔴 2 （之前为 3）。读取变量名为 surname 的 state 失败
useEffect(updateTitle)     // 🔴 3 （之前为 4）。替换更新标题的 effect 失败
```

React 不知道第二个 `useState` 的 Hook 应该返回什么。React 会以为在该组件中第二个 Hook 的调用像上次的渲染一样，对应的是 `persistForm` 的 effect，但并非如此。从这里开始，后面的 Hook 调用都被提前执行，导致 bug 的产生。

#### 为什么不能在条件语句和循环语句中使用hook

react hook执行时以数组的结构执行，按顺序执行，如果使用条件语句就会出现缺少某一个hook，然后出现错位导致错误。

react hook底层是链表，每一个hook的next是指向下一个hook的，if会导致顺序不正确，从而导致报错，所以react是不允许这样使用hook的。

循环语句也是一样，不能绝对保证hook的执行顺序。如果非要在循环中使用，可以使用react官方的lint



### Hook的闭包陷阱(useEffect中定时器的使用，过期闭包)

闭包陷阱就是在React Hook进行开发时，通过useState定义的值拿到的都不是最新的值

上代码

```react
const App = () =>{
   const [count,setCount] = useState(0)
   useEffect(()=>{
     const timeId = setInterval(()=>{
        setCount(count+1)
     },1000)
     return ()=>{clearInterval(timeId)}
   },[])
   return (
      <span>{count}</span>
   )
}
```

上面的代码中，count并不会和理想中一样每过一秒自动+1并更新DOM，而是从0变成1后，console打印出的count一直是设立的默认值0

因为useEffect的依赖数组是空数组，那setInterval里面的count是通过闭包取得的值，他读取到的第一次的count，并且useEffect并没有更新，因为每次都是0

如果去掉useEffect的依赖数组可以解决这个问题，然而会造成每次App组件渲染都会运行useEffect里面的函数，就会造成不必要的浪费和隐藏的bug

#### 产生的原因

React从react16之后，更换了fiber架构，引入了hooks。Fiber架构中，一个 Fiber节点就对应的是一个组件。对于 `classComponent` 而言，有 `state` 是一件很正常的事情，Fiber对象上有一个 `memoizedState` 用于存放组件的 `state`。ok，现在看 hooks 所针对的 `FunctionComponnet`。 无论开发者怎么折腾，一个对象都只能有一个 `state` 属性或者 `memoizedState`  属性，可是，谁知道可爱的开发者们会在 `FunctionComponent` 里写上多少个 `useState`，`useEffect` 等等 ? 所以，react用了链表这种数据结构来存储 `FunctionComponent` 里面的 hooks

比如

```react
function App(){
    const [count, setCount] = useState(1)
    const [name, setName] = useState('chechengyi')
    useEffect(()=>{
        
    }, [])
    const text = useMemo(()=>{
        return 'ddd'
    }, [])
}
```

在组件第一次渲染的时候，为每个hooks都创建了一个对象

```typescript
type Hook = {
  memoizedState: any,
  baseState: any,
  baseUpdate: Update<any, any> | null,
  queue: UpdateQueue<any, any> | null,
  next: Hook | null,
};
```

这个对象的`memoizedState`属性就是用来存储组件上一次更新后的 `state`,`next`毫无疑问是指向下一个hook对象。在组件更新的过程中，hooks函数执行的顺序是不变的，就可以根据这个链表拿到当前hooks对应的`Hook`对象，函数式组件就是这样拥有了state的能力。

所以hooks不能写到if else语句中了。因为这样可能会导致顺序错乱，导致当前hooks拿到的不是自己对应的Hook对象。

回到useEffect中闭包的问题。

比如组件第一次渲染执行 `App()`，执行 `useState` 设置了初始状态为1，所以此时的 `count` 为1。然后执行了 `useEffect`，回调函数执行，设置了一个定时器每隔 1s 打印一次 `count`。

接着想象如果 `click` 函数被触发了，调用 `setCount(2)` 肯定会触发react的更新，更新到当前组件的时候也是执行 `App()`，之前说的链表已经形成了哈，此时 `useState` 将 `Hook` 对象 上保存的状态置为2， 那么此时 `count` 也为2了。然后在执行 `useEffect` 由于依赖数组是一个空的数组，所以此时回调并不会被执行。

ok，这次更新的过程中根本就没有涉及到这个定时器，这个定时器还在坚持的，默默的，每隔1s打印一次 `count`。 注意这里打印的 `count` ，是组件第一次渲染的时候 `App()` 时的 `count`， `count`的值为1，**因为在定时器的回调函数里面被引用了，形成了闭包一直被保存**

所以useEffect或者useMemo依赖数组存在的意义，是react为了判定，在**本次更新**中，是否需要执行其中的回调函数，这里依赖了的num2，而num2改变了。回调函数自然会执行， 这时形成的闭包引用的就是最新的num1和num2，所以，自然能够拿到新鲜的值。问题的关键，在于回调函数执行的时机，闭包就像是一个照相机，把回调函数执行的那个时机的那些值保存了下来。


useRef的原理

初始化的 `useRef` 执行之后，返回的都是同一个对象。

也就是说，在组件每一次渲染的过程中。 比如 `ref = useRef()` 所返回的都是同一个对象，每次组件更新所生成的`ref`指向的都是同一片内存空间， 那么当然能够每次都拿到最新鲜的值了。

```react
    /* 将这些相关的变量写在函数外 以模拟react hooks对应的对象 */
	let isC = false
	let isInit = true; // 模拟组件第一次加载
	let ref = {
		current: null
	}

	function useEffect(cb){
		// 这里用来模拟 useEffect 依赖为 [] 的时候只执行一次。
 		if (isC) return
		isC = true	
		cb()	
	}

	function useRef(value){
		// 组件是第一次加载的话设置值 否则直接返回对象
		if ( isInit ) {
			ref.current = value
			isInit = false
		}
		return ref
	}

	function App(){
		let ref_ = useRef(1)
		ref_.current++
		useEffect(()=>{
			setInterval(()=>{
				console.log(ref.current) // 3
			}, 2000)
		})
	}

		// 连续执行两次 第一次组件加载 第二次组件更新
	App()
	App()
```

另外的解决方式是，只要我们能保证每次组件更新的时候，`useState` 返回的是同一个对象的话？我们也能绕开闭包陷阱这个情景

```react
function App() {
  // return <Demo1 />
  return <Demo2 />
}

function Demo2(){
  const [obj, setObj] = useState({name: 'chechengyi'})

  useEffect(()=>{
    setInterval(()=>{
      console.log(obj)
    }, 2000)
  }, [])
  
  function handClick(){
    setObj((prevState)=> {
      var nowObj = Object.assign(prevState, {
        name: 'baobao',
        age: 24
      })
      console.log(nowObj == prevState)
      return nowObj
    })
  }
  return (
    <div>
      <div>
        <span>name: {obj.name} | age: {obj.age}</span>
        <div><button onClick={handClick}>click!</button></div>
      </div>
    </div>
  )
}
```



#### 解决方案

**使用setstate回调**

把setCount(count+1)改成setCount(count=>count+1)，函数式更新

它允许我们指定state如何改变而不引用当前的state，因为回调函数中的参数是最新的count值

**使用useReducer代替**

把setCount改成useReducer的dispatch，因为useReducer的dispatch的身份永远是稳定的。即使reducer函数是定义在函数内部且依赖props

```react
const setCountReducer = (state,action)=>{
   switch(action.type){
     case 'add':
       return state+action.value 
     case 'minus':
       return state-action.value
     default: 
       return state
   }
}

const App = () =>{
  const [count,dispatch] = useReducer(setCountReducer,0)
  useEffect(()=>{
    const timeId = setInterval(()=>{
      dispatch({type:'add',value:1})
    },1000)
    return ()=> clearInterval(timeId)
  },[])
  return (
     <span>{count}</span>
  )
} 
```

**使用useRef存储变量**

通过useRef生成的对象默认都是{current:{}},每次组件重新渲染时，他也是同一个对象的引用，不会因为组件的重新渲染导致取得闭包的对象引用，因此它不仅可以绑定DOM，也可以绑定任意我们想绑定的数据

改造代码如下

```react
const App = () =>{
  const [count,setCount] = useState(0)
  const countRef = useRef()
  countRef.current = count
  useEffect(()=>{
    const timeId = setInterval(()=>{
      setCount(countRef.current+1)
    },1000)
    return ()=> clearInterval(timeId)
  },[])
  return (
     <span>{countRef.current}</span>
  )
}
```

#### 其他会导致闭包陷阱的情况

异步函数

使用setInterval和setTimeout函数时，内部的变量读取的是异步函数在运行时组件处在闭包情况下的当前值，因为在异步函数内部的数据并不会在dom更新之后更新为新的值，他们的变量引用已经不是同一个了

上代码

```react
const App = ()=>{
  const [count,setCount] = useState(0)
  const consoleCount = ()=>{
    const timeId = setTimeout(()=>{
       console.log(count)
    },2000)
    return ()=> clearTimeout(timeId)
  }
  return (
    <div>
      <span>{count}</span>
      <button onClick={()=>setCount(count+1)}>按我加1</button>
      <button onClick={consoleCount}>输出count</button>
    </div>
  )
}
```

先点击三次加1按钮，把count变成3，然后点击输出按钮，此时再点击加1按钮，可以看到输出的count还是3，即输出的count是旧值

dom监听函数事件中的匿名函数

```react
const App = () =>{
    const [count,setCount] = useState(0)
    const consoleCount = ()=>{
      console.log(count)
    }
    useEffect(()=>{
      window.addEventListener('scroll',consoleCount)
      return ()=>{
         window.removeEventListener('scroll',consoleCount)
      }
    },[])
  
    return (
       <div style={{height:'400vh'}}>
         <span>{count}</span>
        <button onClick={()=>setCount(count+1)}>按我加1</button>
      <button onClick={consoleCount}>输出count</button>
      </div>
    )
}
```

可以看到不管页面怎么滚动，输出的count永远是0。因为addEventListener只在useEffect初始化的时候进行了绑定，执行函数的时候，count读取的是绑定函数时的旧值

使用useRef()存储实例变量也能解决这两个问题，也是react官方推荐的方法。

比如上面的count，我们可以添加useref与state进行对比

```react
import React, { useState, useRef, useEffect } from "react";

export default function App() {

  const [count, setCount] = useState(0);
  const latestCount = useRef(count);

  useEffect(() => {
    latestCount.current = count;
  });

  function handleAlertclick() {
    setTimeout(() => {
      alert("latestCount.current:" + latestCount.current + '.. count: ' + count);
    }, 2000);
  }
  
  return (
    <div>
      <p>当前count： {count} </p>
      <button onClick={() => setCount(count + 1)}>count + 1</button>
      <button onClick={handleAlertclick}> 提示 </button>
    </div>
  )
}
```



### 使用react hooks如何让下面的子组件只render一次

使用useRef保存子组件状态，当父组件更新时，直接更新ref值，当子组件click时，在更新ref值后，再调用一次update触发子组件渲染

```react
import React,{useEffect,useMemo,useState,useRef} from 'react'
function A(){
   const [count,setCount] = useState(0);
   
   return (
      <div>
        <p>我是父组件</p>
        <p>父组件的count是{count}</p>
        <button>click</button>
        <B count={count}/>
      </div>
   );
}

const B = React.memo(({count:}{count:number})=>{
  const numberRef = useRef(0);
  const [,update] = useState({});
  const updateNumber = () =>{
    numberRef.current++;
    update({});
  };
  
  useMemo(()=>{
    numberRef.current = count;
  },[count])
  
  console.log('子组件Render')
  
  return(
     <div>
       <p>我是子组件</p>
       <p>子组件的number是{numberRef.current}</p>
       <button onClick={updateNumber}>click</button>
     </div>
  )
})
```

### Hook与普通函数的区别

Hook本身是一个函数，它与普通函数有什么区别呢

1。调用时机和调用方法不同

在FC中使用时，自定义hook和common function都通过import作为FC的一部分，但是调用的时机不同，hook是在每次渲染的时候都会调用，而通用函数则需要手动调用

2.命名方式不同

hook一般使用useXXX命名，CF就会比较灵活

3.能使用的工具不同

自定义hook中一般会调用其他hook，比如useeffect、useState，但是普通函数只能处理没有hook的逻辑

4.使用场景不同

CF可以被使用在任何地方，但hook只能被用在FC或其他hook中

### 更新次数

```react
function setStateProps () {
  const [count, setCount] = useState(-1);
  
  useEffect(()=> {
    setCount(1)
  })
  
  console.log('render') 
  
  return (
 		<div>
    	<h3>page</h3>
      <p>{count}</p>
    </div>
  )
}
```

上面的代码会log三次，一次在初始化，一次在setState，还有一次是比较props，相同则不再执行



## Hook写法

### Hook调用异步接口写法

```react
import React, { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [data, setData] = useState({ products: [{
    productId: '123',
    productName: 'macbook'
  }] });
  const [isLoading, setIsLoading] = useState(false);
  const [isError,setIsError] = useState(false);
  
  useEffect(()=> {
    const fetchData = async()=> {
      setIsError(false);
      setIsLoading(true);
      
      try {
        const result = await axios (
        	'https://c.com/api/products?date=today',
        )
        setData(result.data);
      }catch(e){
        setIsError(true);
      }
      
      setIsLoading(false);
    }
    fetchData();
  },[]);
  
  return (
  	<div>
      { isError && <div></div>}
      { isLoading ? (
      	<div>Loading...</div>
      ):(
      	<ul>
        	{data.products.map(i=> (
          	<li key="{i.productId}">
              {i.productName}
            </li>
          ))}
        </ul>
      )};
    </div>
  )
}

export default App;
```

也可以使用立即执行函数

```react
const MyFunctionnalComponent: React.FC = props => {
  useEffect(()=>{
    (async function anyNameFunction() {
      await loadContent();
    })();
  },[]);
  return <div></div>
}
```

### hook ts写法

usestate如果初始值不是null/undefined，是具备类型推导能力的。根据传入的初始值推断出类型。初始值如果是null/undefined则需要传递类型定义才能进行约束。一般情况下还是推荐传入类型

```react
const [value, setValue] = useState(0)

const [value, setValue] = useState<number>(0)

const [string, setString] = useState<string>('')

const [array, setArray] = useState<any[]>([])
```

useContext一般根据传入的context值就可以推断出返回类型，不需要传递类型

useEffect和useLayoutEffect无返回值，无需传递类型

useMemo无需传递类型，根据函数的返回值可以判断类型

useCallback无需传递类型，根据函数的返回值可以推断类型，但是注意函数的入参需要定义类型，不然就是推断为any

useRef需要约束ref.current的类型

useReducer需要对reducer函数的入参state和action进行类型约束推断类型

### hooks实现请求状态

useState

```react
import React, { useState, useEffect } from 'react'
import axios from 'axios'

interface postType {
  userId: number
  id: number
  title: string
  body: string
}

function DataFetchingOne() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [post, setPost] = useState({} as postType)

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts/1').then((res) => {
      setLoading(false)
      setPost(res.data)
      setError('')
    }).catch(() => {
      setLoading(false)
      setPost({} as postType)
      setError('something went wrong')
    })
  }, [])

  return (
    <div>
      {
        loading
          ? 'Loading...'
          : post.title
      }
      {
        error
          ? error
          : null
      }
    </div>
  )
}

export default DataFetchingOne
```

useReducer

```react
import React, { useEffect, useReducer } from 'react'
import axios from 'axios'

interface postType {
  userId: number
  id: number
  title: string
  body: string
}

type stateType = {
  loading: boolean
  error: string
  post?: postType | {}
}

type actionType = {
  type: 'FETCH_SUCCESS' | 'FETCH_ERROR'
  payload?: postType | {}
}

const initialState = {
  loading: true,
  error: '',
  post: {},
}

const reducer = (state: stateType, action: actionType) => {
  switch (action.type) {
    case 'FETCH_SUCCESS':
      return {
        loading: false,
        error: '',
        post: action.payload,
      }
    case 'FETCH_ERROR':
      return {
        loading: false,
        error: 'something went wrong',
        post: {},
      }
    default:
      return state
  }
}

function DataFetchingTwo() {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts/1').then((res) => {
      dispatch({
        type: 'FETCH_SUCCESS',
        payload: res.data,
      })
    }).catch(() => {
      dispatch({
        type: 'FETCH_ERROR'
      })
    })
  }, [])

  return (
    <div>
      {
        state.loading
          ? 'Loading...'
          // @ts-ignore
          : state.post.title
      }
      {
        state.error
          ? state.error
          : null
      }
    </div>
  )
}

export default DataFetchingTwo
```

### 使用react-hook重写react-redux

react-redux主要提供的功能是将redux和react链接起来。 使用提供的connect方法可以使得任意一个react组件获取到全局的store上的状态。 实现方法是将store存放于由provider提供的context上，在调用connect时， 就可将组件的props替换， 让其可以访问到定制化的数据或者方法

重写要实现：

- 全局维护一个store。
- 任何组件都可以获取到store，最好props可以定制（mapStatetoProps）。
- 提供可以派发action的能力（mapDispatchtoProps）

先使用useContext创建一个上下文

```javascript
import { createContext, useContext } from 'react';

const context = createContext(null);
export const StoreProvider = context.provider;

const store = useContext(context)
```

创建一个dispatch分发状态

```javascript
export function useDispatch() {
  const store = useContext(Context);
  return store.dispatch
}
```

然后使用useStoreState拿到状态

```javascript
export function useStoreState (mapState){
		const store = useContext(context);
    
		const mapStateFn = () => mapState(store.getState());

		const [mappedState, setMappedState] = useState(() => mapStateFn());
  
		// If the store or mapState change, rerun mapState    
		const [prevStore, setPrevStore] = useState(store);

		const [prevMapState, setPrevMapState] = useState(() => mapState);

    if (prevStore !== store || prevMapState !== mapState) {
            setPrevStore(store);
            setPrevMapState(() => mapState);
            setMappedState(mapStateFn());    
    }

		const lastRenderedMappedState = useRef();

    // Set the last mapped state after rendering.
    useEffect(() => {
       lastRenderedMappedState.current = mappedState;    
    });

    useEffect(() =>
     {
       // Run the mapState callback and if the result has changed, make the      
       // component re-render with the new state.         
      const checkForUpdates = () => {  
        const newMappedState = mapStateFn();

        if (!shallowEqual(newMappedState, lastRenderedMappedState.current)) {
          setMappedState(newMappedState);
        }
      };

       // Pull data from the store on first render.

       checkForUpdates();        
       // Subscribe to the store to be notified of subsequent changes.

       const unsubscribe = store.subscribe(checkForUpdates);

       // The return value of useEffect will be called when unmounting, so           
       // we use it to unsubscribe from the store.

       return unsubscribe;
    	},[store, mapState],    
		);  
	return mappedState
}
```

当store变化过后，并没有和视图关联起来。另一个问题是没有关注mapState变化的情况。 我们可以利用useEffect这个内置hook，在组件mount时完成在store上的订阅，并在unmont的时候取消订阅。 mapState的变更可以使用useState来监听， 每次有变更时就执行向对应的setter方法

## Hook包

### ahooks

安装

```shell
npm install --save ahooks
```

ahooks 默认支持基于 ES module 的 tree shaking，对于 js 部分，直接引入 `import { useToggle } from 'ahooks'` 也会有按需加载的效果。

常用hook

#### 增强版state

`useRequest` 是一个强大的异步数据管理的 Hooks，React 项目中的网络请求场景使用 `useRequest` 就够了。

```react
const { data, error, loading } = useRequest(getUsername, {
  manaul: true;
});
```

`useRequest` 提供了以下几个生命周期配置项，供你在异步函数的不同阶段做一些处理。

- `onBefore`：请求之前触发
- `onSuccess`：请求成功触发
- `onError`：请求失败触发
- `onFinally`：请求完成触发

通过设置 `options.pollingInterval`，进入轮询模式，`useRequest` 会定时触发 service 执行。

通过设置 `options.debounceWait`，进入防抖模式，此时如果频繁触发 `run` 或者 `runAsync`，则会以防抖策略进行请求。

通过设置 `options.throttleWait`，进入节流模式，此时如果频繁触发 `run` 或者 `runAsync`，则会以节流策略进行请求。

如果设置了 `options.cacheKey`，`useRequest` 会将当前请求成功的数据缓存起来。下次组件初始化时，如果有缓存数据，我们会优先返回缓存数据，然后在背后发送新请求，也就是 SWR 的能力。

你可以通过 `options.staleTime` 设置数据保持新鲜时间，在该时间内，我们认为数据是新鲜的，不会重新发起请求。

你也可以通过 `options.cacheTime` 设置数据缓存时间，超过该时间，我们会清空该条缓存数据。

通过设置 `options.retryCount`，指定错误重试次数，则 useRequest 在失败后会进行重试。



useTitle

改变页面在tab页中的标题

```react
import React, { useState } from "react";
import { useTitle } from "react-use";

const Demo = () => {
  useTitle("Hello world!", {
    restoreOnUnmount: true,
  });

  return <h1>document.title has changed</h1>;
};

export default () => {
  const [showDemo, setShowDemo] = useState(true);

  return (
    <div>
      <button onClick={() => setShowDemo(!showDemo)}>
        {showDemo ? "unmount" : "mount"}
      </button>
      {showDemo ? <Demo /> : ""}
    </div>
  );
};
```

源码

```typescript
// src/useTitle.ts

/* eslint-disable */
import { useRef, useEffect } from "react";
export interface UseTitleOptions {
  restoreOnUnmount?: boolean;
}
const DEFAULT_USE_TITLE_OPTIONS: UseTitleOptions = {
  restoreOnUnmount: false,
};
function useTitle(
  title: string,
  options: UseTitleOptions = DEFAULT_USE_TITLE_OPTIONS
) {
  const prevTitleRef = useRef(document.title);
  document.title = title;
  useEffect(() => {
    if (options && options.restoreOnUnmount) {
      return () => {
        document.title = prevTitleRef.current;
      };
    } else {
      return;
    }
  }, []);
}

export default typeof document !== "undefined"
  ? useTitle
  : (_title: string) => {};
```

useBoolean

useToggle

用于在两个状态值间切换的 Hook。

useUrlState

通过 url query 来管理 state 的 Hook。

该 Hooks 基于 `react-router` 的 useLocation & useHistory & useNavigate 进行 query 管理，所以使用该 Hooks 之前，你需要保证

1. 你项目正在使用 `react-router` 5.x 或 6.x 版本来管理路由

2. 独立安装了 @ahooksjs/use-url-state

该hooks可以改变当前url中的query

#### 存储相关的hooks

useCookieState

将状态存储在 Cookie 中的 Hook 。

useLocalStorageState

将状态存储在 localStorage 中的 Hook 。

useSessionStorageState

将状态存储在 sessionStorage中的 Hook 。

#### 性能优化hooks

`useCreation` 是 `useMemo` 或 `useRef` 的替代品。

因为 `useMemo` 不能保证被 memo 的值一定不会被重计算，而 `useCreation` 可以保证这一点。

而相比于 `useRef`，你可以使用 `useCreation` 创建一些常量，这些常量和 `useRef` 创建出来的 ref 有很多使用场景上的相似，但对于复杂常量的创建，`useRef` 却容易出现潜在的性能隐患。

useMemoizedFn

持久化 function 的 Hook，理论上，可以使用 useMemoizedFn 完全代替 useCallback。

在某些场景中，我们需要使用 useCallback 来记住一个函数，但是在第二个参数 deps 变化时，会重新生成函数，导致函数地址变化。

使用 useMemoizedFn，可以省略第二个参数 deps，同时保证函数地址永远不会变化。

useThrottleFn

处理函数节流的hooks

useThrottleEffect

为 `useEffect` 增加节流的能力。

useDebounceFn

用来处理防抖函数的 Hook。

**防抖实现**：useDebounceFn的内部是使用useMemo + lodash的debounce方法

```javascript
  const debounced = useMemo(
    () =>
      debounce(
        (...args: Parameters<T>): ReturnType<T> => {
          return fnRef.current(...args);
        },
        wait,
        options,
      ),
    [],
  );
```

useDebounceEffect

为 `useEffect` 增加防抖的能力。

**实现**：useState + useDebounce

```javascript
  const [flag, setFlag] = useState({});

  const { run } = useDebounceFn(() => {
    setFlag({});
  }, options);

  useEffect(() => {
    return run();
  }, deps);

  useUpdateEffect(effect, [flag]);
```



#### Dom相关 功能型Hook

useKeyPress

监听键盘按键，支持组合键，支持按键别名。

useLongPress

监听目标元素的长按事件。

useMouse

监听鼠标位置

useResponsive

获取屏幕宽度响应式信息。

useSize

监听 DOM 节点尺寸变化的 Hook。

useFavicon

设置页面的 favicon。

useInViewport

观察元素是否在可见区域，以及元素可见比例。

useFocusWithin

监听当前焦点是否在某个区域之内，同 css 属性 focus-within

useScroll

监听元素的滚动位置。

useFullscreen

管理 DOM 全屏的 Hook。

#### 开发者hook

useWhyDidYouUpdate

帮助开发者排查是那个属性改变导致了组件的 rerender。

useTrackedEffect

追踪是哪个依赖变化触发了 `useEffect` 的执行。



### react-use



### react-hooks

https://github.com/ecomfe/react-hooks



### usehooks

https://github.com/uidotdev/usehooks

https://usehooks-ts.com/react-hook/use-window-size



### react-router

useHistory useLocation useParams useRouteMatch 

```react
import {
  useHistory,
  useLocation,
  useParams,
  useRouteMatch,
} from "react-router-dom"

function HomeButton() {
  let history = useHistory();
  function haddleClick() {
    history.push("/home");
  }
  
  function usePageViews() {
      let location = useLocation();
    	React.useEffect(()=>{
        ga.send(["pageview", location.pathname]);
      },[location])
  }
  
  let { slug } = useParams();
  return <div>Now showing post {slug}</div>
  
  let match = useRouteMatch("/blog/:slug")
  const match = useRouteMatch({
    path: "/BLOG/:slug",
    strict: true,
    sensitive: true
  })
}
```

