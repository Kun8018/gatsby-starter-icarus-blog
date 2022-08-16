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

## purecomponent

当使用component时，父组件的props或者state更新时，无论子组件的state、props是否更新，都会触发子组件的更新，这会造成很多没必要的render，浪费很多性能。pureComponent的优点在于，在shouldcomponentUpdate只进行浅层比较，只要外层对象没有变化，就不会触发render，也就是不需要开发者使用shouldComponentUpdate就可使用简单的判断来提升性能

缺点：

由于进行的时浅比较，可能由于深层的数据不一致导致产生错误的否定判断，从而导致页面得不到更新

不适合用于在含有多层嵌套对象的state和props中，一般是作为展示组件来使用。因为对于数组和对象等引用类型，需要引用不同才会渲染

尤其是当遇到复杂组件时，可以将一个组件拆分成多个pureComponent，以这种方式来实现复杂数据结构，以期达到节省不必要渲染的目的，如表单、复杂列表、文本域等

如果props和state每次都会变，建议使用Component

父组件是pureComponent时，子组件无论是purecomponent或者component都不影响，因为父组件不会重新渲染，

父组件是Component时，子组件是component时每次都会重新渲染，子组件是purecomponent时，props不变时不会重新渲染



### 与React.memo、usememo的区别

reacr.memo控制函数组件的重新渲染，reacr.purecomponent控制类组件的重新渲染

使用时将函数组件传递给react.memo函数就可以

实例

```react
const Funcomponent = () =>{
  return (
     <div>
     hiya!i am a functional component!
     </div>
  )
}
const MemoFuncComponent = React.memo(Funcomponent)
```

React.memo返回英国纯组件MemoFuncComponent，jsx中将标记次组件，每当组件的props和state发生变化时，react会检查上一个props和state与下一个pros和state是否相等，不相等重新渲染，相等则不会重新渲染

类组件中即成purecomponent实现

```react
import React from 'react'
class TestC extends React.PureComponent{
   constructor(props){
     super(props);
     this.state = {
       conut: 0
     }
   }
  
  render(){
    return(
      <div>
        {this.state.count}
        <button onClick={()=>this.setState({count:1})}>
          click me
        </button>
      </div>
    )
  }
}
```

### prop使用嵌套对象

使用immutable属性。



## Hook

Https://juejin.cn/post/6844903985338400782

Hook是react16.8新增的特性，可以在不编写class 的情况下使用state和其他react特性，reactnative从0.59版本开始支持hook。

### hook出现的原因以及解决的问题

Class component 劣势

1. 状态逻辑难复用：在组件之间复用状态逻辑很难，可能要用到 render props （渲染属性）或者 HOC（高阶组件），但无论是渲染属性，还是高阶组件，都会在原先的组件外包裹一层父容器（一般都是 div 元素），这样高阶组件多了会形成回调地狱类似的问题，导致层级冗余 趋向复杂难以维护：
2. 在生命周期函数中混杂不相干的逻辑（如：在 componentDidMount 中注册事件以及其他的逻辑，在 componentWillUnmount 中卸载事件，这样分散不集中的写法，很容易写出 bug ） 类组件中到处都是对状态的访问和处理，导致组件难以拆分成更小的组件
3. this 指向问题：父组件给子组件传递函数时，必须绑定 this

Hook不能在class中使用，只能在函数组件中，为函数组件勾入react state及生命周期等函数

react内置的hook有以下

基础hook：useState、useEffect、useContext

额外的hook：useReducer、useCallback、useMemo、useRef、useLayoutEffect、useDebugValue、useImperativeHandle

### 函数式组件与class组件对比

#### 性能对比

class组件中，setState之后要对比整个虚拟dom的状态。对于一个复杂页面，几十个状态要对比消耗性能。而hook阶段只对比一个值即可，性能更佳

闭包很多，值捕获现象严重，要尤其注意hook的依赖

大量的内联函数、函数嵌套，垃圾回收压力大。函数式组件每次渲染就像调用纯函数一样，调用之后产生一个作用域，并开辟对应的内容空间存储该作用域下的变量，函数返回结束后该作用域会被销毁，该作用域下的变量如果没有被作用域外的东西引用，在作用域销毁之后就需要在下一次GC时被回收。因此相对于Class组件额外的开销会多很多。因为Class组件所有的东西都是承载在一个对象上的，都是在这个对象上，每次更新组件，这个对象上的属性、方法和对象本身都不会被销毁，即不会出现频繁的开辟和回收内存空间。

#### 生命周期

constructor：函数组件不需要构造函数，可以直接调用useState来初始化State，如果代价比较昂贵可以穿一个函数给useState

getDerivedStateFromProps：改为在渲染时安排一次更新

shouldComponentUpdate：使用React.memo替代

使用react.memo包裹一个组件对props进行浅比较

```javascript
const Button = React.memo((props)=>{
  // component
})
```

react.memo不比较state，因为没有单一的state对象进行比较，可以用usememo优化子节点

render：函数组件本身就有

componentDidMount、componentDidUpdate、componentWillUnmount：通过使用UseEffect的不同方式可以分别表达这些生命周期

getSnapshotBeforeUpdate、ComponentDidCatch、getDerivedFromError：目前还没有这些方法的等价写法

#### 根本区别

函数式组件与class组件的心智模型不同。函数式组件捕获了渲染所用的值

hooks的最好的心智规则是"写代码时要认为任何值都可以随时更改"。

在react中，默认props在组件中是不可变的，这是在函数组件和类组件中都适用

但是，在类组件中，props要通过this取得，而this是永远可变的。这也是类组件 `this` 存在的意义：能在渲染方法以及生命周期方法中得到最新的实例。

```react
class ProfilePage extends React.Component {
  showMessage = () => alert('Followed ' + this.props.user);

  handleClick = () => setTimeout(this.showMessage, 3000);

  render() {
    return <button onClick={this.handleClick}>Follow</button>;
  }
}
```

所以如果在请求已经发出的情况下我们的组件进行了重新渲染， `this.props`将会改变。 `showMessage`方法从一个"过于新"的 `props`中得到了 `user`。

从 this 中读取数据的这种行为，调用一个回调函数读取 `this.props` 的 timeout 会让 `showMessage` 回调并没有与任何一个特定的渲染"绑定"在一起，所以它"失去"了正确的 props。。

解决上面的问题有两种方式

1.在调用事件之前读取 `this.props`，然后显式地传递到timeout回调函数中

```react
class ProfilePage extends React.Component {
  showMessage = (user) => alert('Followed ' + user);

  handleClick = () => {
    const {user} = this.props;
    setTimeout(() => this.showMessage(user), 3000);
  };

  render() {
    return <button onClick={this.handleClick}>Followbutton>;
  }
}
```

2.利用JavaScript的闭包

在render函数中获取渲染所用的props

```react
class ProfilePage extends React.Component {
  render() {
    const props = this.props;

    const showMessage = () => {
      alert('Followed ' + props.user);
    };

    const handleClick = () => {
      setTimeout(showMessage, 3000);
    };

    return <button onClick={handleClick}>Follow</button>;
  }
}
```

而在函数

`props`仍旧被捕获了 —— React将它们作为参数传递。 **不同于 `this` ， `props` 对象本身永远不会被React改变**

**捕获props和state通常是更好的默认值。** 然而，在处理类似于intervals和订阅这样的命令式API时，ref会十分便利。你可以像这样跟踪 任何值 —— 一个prop，一个state变量，整个props对象，或者甚至一个函数

### hook本质

React Hook 是一种特殊的函数，其本质可以是函数式组件（返回 Dom 或 Dom 及 State ），也可以只是一个工具函数（传入配置项返回封装后的数据处理逻辑）

Hooks 组件的目标并不是取代类组件，而是增加函数式组件的使用率，明确通用工具函数与业务工具函数的边界，**鼓励开发者将业务通用的逻辑封装成 React Hooks 而不是工具函数**



### useState

实例

```jsx
import React,{useState} from 'react';

function Example() {
    const [count,setCount] = useState(0);
    
    return (
     <div>
        <p>you click {count} times</p>
        <button onClick={()=> setCount(count + 1)}>
        click    
        </button>
     </div>
    )
}
```

上述useState方法定义了一个state变量count，并给他初始化的值0。通过setCount方法更新当前count的值。

调用count时不需要绑定this直接调用，更新count时也直接调用setCount方法

usestate定义state时返回一个有两个值的数组，第一个是当前state，第二个是更新state的函数，

count与setCount与class中的this.state.count和this.setstate类似，唯一的区别是需要成对地获取他们。

如果初始化state时需要复杂计算，可以调用函数，此函数只在初次渲染时被调用

```jsx
const [state,setState] = useState(() => {
    const initialState= someExpensiveComputation(props);
    return initialState;
})
```

count与setCount与class中的this.state.count和this.setstate类似，唯一的区别是需要成对地获取他们。

可以同时声明多个state变量

```jsx
function ExamplewithManyStates(){
    const [age,setAge] = usestate(42);
    const [fruit,setFruit] = usestate('banana');
    const [todos,setTodos] = usestate([{text:'学习'}]);
}
```

Hook只能在函数最外层调用，不要在循环、条件判断或者子函数中调用

useState更新数组时，必须用浅拷贝之后的新数组，如果只是简单赋值无法更新页面。因为react中如果数组引用地址不变，是不触发渲染的，但是值是设置进去的

```react
// 无法更新
const [lists, setLists] = useState([]);

const arr = lists;
arr.splice(index,1);
setLists(arr);

//扩展运算符浅拷贝
const [lists, setLists] = useState([]);

const arr = lists; //const arr = [...lists]
arr.splice(index,1);
setLists([...arr]);
```



#### useState与setState的异同

setState会自动合并，不同的useState不会



#### forceupdate

```react
import { useState, useCallback } from 'react'

export const useForceRender = () => {
  const [, updateState] = useState<any>();
  return useCallback(() => updateState({}),[])
}
```



#### 注意事项

useState初始化时不能直接使用props。因为props变化时并不会通知useState方法，所以使用props初始化state时一直是undefined，可以使用useEffect在组件初始化时手动set一次

```react
import React, { useState, useEffect } from 'react';

const FC = (initContent) => {
  const [content, setContent] = useState<Partial<ContentType[]>>([]);

  useEffect(() => {
      initContent?.length && setContent(initContent);
   }, [initContent]);
}
```



### useEffect和useLayoutEffect

对于class中的生命周期函数，为了能在函数组件中使用类似功能，使用useEffect方法，它相当于componentDidMount、componentDidupdate、componentWillUnmount三个函数的组合

```jsx

```

useEffect默认情况下会在第一次渲染之后和每次更新之后都会执行。

useEffect在全部渲染完毕后才会执行，而useLayoutEffect会在浏览器layout之后，painting之前执行

为了用户体验，一般先使用useEffect

使用步骤：

1. 作为 componentDidMount 使用，第二个参数为空数组 `[]`
2. 作为 componentDidUpdate 使用，第二个参数为指定依赖
3. 作为 componentWillUnmount 使用，空数组的情况下通过 return返回函数来清除。该函数将在组件卸载时被执行。如果不需要清理副作用则不用返回任何值
4. 如果useEffect当作ComponentDidUpdate使用时，每次Update之前会执行return中的返回函数以清理上一次渲染的副作用

```react
const BlinkyRender = () => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    document.querySelector('#x').innerText = `value: 1000`
  }, [value]);

  return (
    <div id="x" onClick={() => setValue(0)}>value: {value}</div>
  );
};

ReactDOM.render(
  <BlinkyRender />,
  document.querySelector("#root")
);
```

清除effect

通常，组件卸载时需要清除 effect 创建的诸如订阅或计时器 ID 等资源。要实现这一点，`useEffect` 函数需返回一个清除函数。

为防止内存泄漏，清除函数会在组件卸载前执行。另外，如果组件多次渲染（通常如此），则**在执行下一个 effect 之前，上一个 effect 就已被清除**。

需要注意的是，如果包括多个副作用，应该调用多个useEffect，而不能够合并在一起。

```react
//错误
useEffect(()=>{
  const timeoutA = setTimeout(()=> setVarA(varA + 1), 1000)
  const timeoutB = setTimeout(()=> setVarB(varB + 1), 2000)
  
  return () => {
    clearTimeout(timeoutA);
    clearTimeout(timeoutB);
  }
},[varA, varB])

//正确
useEffect(()=>{
  const timeout = setTimeout(()=> setVarA(varA + 1), 1000)
  return () => { clearTimeout(timeout)};
},[varA])

useEffect(()=>{
  const timeout = setTimeout(()=> setVarB(varB + 1), 1000)
  return () => { clearTimeout(timeout)};
},[varB])

```



useEffect与useLayoutEffect区别：

`useEffect` 是异步执行的，而`useLayoutEffect`是同步执行的。

`useEffect` 的执行时机是浏览器完成渲染之后，而 `useLayoutEffect` 的执行时机是浏览器把内容真正渲染到界面之前，和 `componentDidMount` 等价。

最好把操作 dom 、动画的相关操作放到 `useLayouteEffect` 中去，避免导致闪烁。

### useReducer

useState内部就是靠useReducer实现的。

useReducer可以理解为是用来代替 Redux 的，或者说，是一个加强版的 `useState`。

使用步骤：

1.创建初始值initialState

2.创建所有操作reduce(state,action)

3.传给useReducer，得到读和写api

4.调用，写({type: '操作类型'})

```js
const initial = {
  n: 0
};

const reducer = (state, action) => {
  if (action.type === "add") {
    return { n: state.n + action.number };
  } else if (action.type === "multi") {
    return { n: state.n * 2 };
  } else {
    throw new Error("unknown type");
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initial);
  const { n } = state;
  const onClick = () => {
    dispatch({ type: "add", number: 1 });
  };
  const onClick2 = () => {
    dispatch({ type: "add", number: 2 });
  };
  return (
    <div className="App">
      <h1>n: {n}</h1>

      <button onClick={onClick}>+1</button>
      <button onClick={onClick2}>+2</button>
    </div>
  );
}
```

useReducer 与js 数组的reduce方法这两者之间有巨大的相似之处。

| reduce in JavaScript                            | useReducer in React                                       |
| ----------------------------------------------- | --------------------------------------------------------- |
| `array.reduce(reducer, initialValue)`           | `useReducer(reducer, initialState)`                       |
| `singleValue = reducer(accumulator, itemValue)` | `newState = reducer(currentState, action)`                |
| reduce method returns a single value            | useReducer returns a pair of values. [newState, dispatch] |

#### useReducer vs useState

如果 state 的类型为 Number, String, Boolean 建议使用 useState，如果 state 的类型 为 Object 或 Array，建议使用 useReducer

如果 state 变化非常多，也是建议使用 useReducer，集中管理 state 变化，便于维护

如果 state 关联变化，建议使用 useReducer

业务逻辑如果很复杂，也建议使用 useReducer

如果 state 只想用在 组件内部，建议使用 useState，如果想维护全局 state 建议使用 useReducer

| Scenario                    | useState                | useReducer             |
| --------------------------- | ----------------------- | ---------------------- |
| Type of state               | Number, String, Boolean | Object or Array        |
| Number of state transitions | 1 or 2                  | Too many               |
| Related state transitions   | No                      | Yes                    |
| Business logic              | No business logic       | Complex business logic |
| local vs global             | local                   | global                 |

在react hooks的源码中，useState就是给useReducer的函数中传入一个固定的dispatch，其他与useReducer相同

```react
//  packages/react-reconciler/src/ReactFiberHooks.new.js
function mountReducer<S, I, A>(
  reducer: (S, A) => S,
  initialArg: I,
  init?: I => S,
): [S, Dispatch<A>] {
  const hook = mountWorkInProgressHook();
  let initialState;
  if (init !== undefined) {
    initialState = init(initialArg);
  } else {
    initialState = ((initialArg: any): S);
  }
  hook.memoizedState = hook.baseState = initialState;
  const queue: UpdateQueue<S, A> = {
    pending: null,
    lanes: NoLanes,
    dispatch: null,
    lastRenderedReducer: reducer,
    lastRenderedState: (initialState: any),
  };
  hook.queue = queue;
  const dispatch: Dispatch<A> = (queue.dispatch = (dispatchReducerAction.bind(
    null,
    currentlyRenderingFiber,
    queue,
  ): any));
  return [hook.memoizedState, dispatch];

// useState的处理函数
function basicStateReducer<S>(state: S, action: BasicStateAction<S>): S {
  // $FlowFixMe: Flow doesn't like mixed types
  return typeof action === 'function' ? action(state) : action;
}

function mountState<S>(
  initialState: (() => S) | S,
): [S, Dispatch<BasicStateAction<S>>] {
  const hook = mountWorkInProgressHook();
  if (typeof initialState === 'function') {
    // $FlowFixMe: Flow doesn't like mixed types
    initialState = initialState();
  }
  hook.memoizedState = hook.baseState = initialState;
  const queue: UpdateQueue<S, BasicStateAction<S>> = {
    pending: null,
    lanes: NoLanes,
    dispatch: null,
    lastRenderedReducer: basicStateReducer,
    lastRenderedState: (initialState: any),
  };
  hook.queue = queue;
  const dispatch: Dispatch<
    BasicStateAction<S>,
  > = (queue.dispatch = (dispatchSetState.bind(
    null,
    currentlyRenderingFiber,
    queue,
  ): any));
  return [hook.memoizedState, dispatch];
}
```



### useContext

接受一个context对象，并返回该context的当前值，用于在函数组件之间共享状态

使用方法：

1.使用C=createContext(initial)创建上下文

2.使用<C.provider>圈定作用域

3.在作用域内使用 `useContext(C)` 来使用上下文

```react
const C = createContext(null);

function App() {
  console.log("App 执行了");
  const [n, setN] = useState(0);
  return (
    <C.Provider value={{ n, setN }}>
      <div className="App">
        <Baba />
      </div>
    </C.Provider>
  );
}

function Baba() {
  const { n, setN } = useContext(C);
  return (
    <div>
      我是爸爸 n: {n} <Child />
    </div>
  );
}

function Child() {
  const { n, setN } = useContext(C);
  const onClick = () => {
    setN(i => i + 1);
  };
  return (
    <div>
      我是儿子 我得到的 n: {n}
      <button onClick={onClick}>+1</button>
    </div>
  );
}
```

`useContext(MyContext)` 相当于 class 组件中的 `static contextType = MyContext` 或者 `<MyContext.Consumer>`。

`useContext(MyContext)` 只是让你能够*读取* context 的值以及订阅 context 的变化。你仍然需要在上层组件树中使用 `<MyContext.Provider>` 来为下层组件*提供* context。

### usecallback与useMemo

**useMemo**

返回一个缓存值。

useMemo是一种缓存机制提速，当他的依赖未发生改变时就不会触发重新计算，与vue中computed类似

使用语法：useMemo(()=> fn,deps)

把创建函数和依赖项数组作为参数传入useMemo，它只会在某个依赖项改变时才重新计算memoized值。如果没有提供依赖项数组，useMemo在每次渲染时都会计算新的值

```tsx
const myValue: any = useMemo(() => {
    const item = allCrowdData[value as number] || {
      name: undefined,
    };
    if (value && item.name) {
      return {
        value: value,
        label: item.name,
      } as LabeledValue;
    }

    return undefined;
}, [allCrowdData, value]);
```

**useCallback**

返回一个缓存函数。把内联回调函数及依赖数组作为参数传入useCallback，它将返回该回调函数u的memorized版本，该回调函数仅在某个依赖项改变时才会更新，在组件中使用usecallback可以避免非必要渲染

**useCallback（fn，dep） 与useCallback( ()=>fn，dep）等效**

**useCallback（fn，dep）相当于useMemo( () => fn，deps）**

useMemo与usecallback的区别：`useMemo`可以缓存所有对象，`useCallback`只能缓存函数。

`useCallback(x => log(x), [m])` 等价于 `useMemo(() => x => log(x), [m])`

```tsx
const handleInputChange = useCallback(
    (e) => {
      handleUpdateSearchWord(e.target.value);
    },
    [handleUpdateSearchWord],
  );
```

普通的函数组件本身就是高内聚的，所以一般没有useCallback的事，比如

```react
// 用于记录 getData 调用次数
let count = 0;

function App() {
  const [val, setVal] = useState("");

  function getData() {
    setTimeout(()=>{
      setVal('new data '+count);
      count++;
    }, 500)
  }

  useEffect(()=>{
    getData();
  }, []);

  return (
    <div>{val}</div>
  );
}
```

实际上，在普通组件中使用useCallback可能性能会更差，比如普通的onChange函数

https://codesandbox.io/s/test-usecallback-xqvuc?file=/src/index.js

```react
function App() {
  const [val, setVal] = useState("");

  const onChange = (evt) => {
    setVal(evt.target.value);
  };

  // const onChange = useCallback(evt => {
  //   setVal(evt.target.value);
  // }, []);
  //可以看到onChange的定义是省不了的，而且额外还要加上调用useCallback产生的开销，性能怎么可能会更好
  return <input val={val} onChange={onChange} />;
}
```



useCallback能够改善性能的场景有两种：

- 函数`定义`时需要进行大量运算， 这种场景极少
- 需要比较引用的场景，如`useEffect`，又或者是配合`React.Memo`使用：

```react
const Child = React.memo(function({val, onChange}) {
  console.log('render...');
  
  return <input value={val} onChange={onChange} />;
});

function App() {
  const [val1, setVal1] = useState('');
  const [val2, setVal2] = useState('');

  const onChange1 = useCallback( evt => {
    setVal1(evt.target.value);
  }, []);

  const onChange2 = useCallback( evt => {
    setVal2(evt.target.value);
  }, []);

  return (
  <>
    <Child val={val1} onChange={onChange1}/>
    <Child val={val2} onChange={onChange2}/>
  </>
  );
}
```

在useEffect中的监听函数

```react
// 用于记录 getData 调用次数
let count = 0;

function App() {
  const [val, setVal] = useState("");

  function getData() {
    setTimeout(() => {
      setVal("new data " + count);
      count++;
    }, 500);
  }

  return <Child val={val} getData={getData} />;
}

function Child({val, getData}) {
  useEffect(() => {
    getData();
  }, [getData]);

  return <div>{val}</div>;
}
```

上面的代码中，是一个死循环，分析下代码的执行过程：

1. `App`渲染`Child`，将`val`和`getData`传进去
2. `Child`使用`useEffect`获取数据。因为对`getData`有依赖，于是将其加入依赖列表
3. `getData`执行时，调用`setVal`，导致`App`重新渲染
4. `App`重新渲染时生成新的`getData`方法，传给`Child`
5. `Child`发现`getData`的引用变了，又会执行`getData`
6. 3 -> 5 是一个死循环

 把函数用useCallback缓存就可以

```react
const getData = useCallback(() => {
  setTimeout(() => {
    setVal("new data " + count);
    count++;
  }, 500);
}, []);
```

还有一种情况是在`getData`中需要用到`val`( useState 中的值)，就需要将其加入依赖列表，这样的话又会导致每次`getData`的引用都不一样，死循环又出现了

如果我们希望无论`val`怎么变，`getData`的引用都保持不变，同时又能取到`val`最新的值，可以通过自定义 hook 实现。注意这里不能简单的把`val`从依赖列表中去掉，否则`getData`中的`val`永远都只会是初始值（闭包）

```react
function useRefCallback(fn, dependencies) {
  const ref = useRef(fn);

  // 每次调用的时候，fn 都是一个全新的函数，函数中的变量有自己的作用域
  // 当依赖改变的时候，传入的 fn 中的依赖值也会更新，这时更新 ref 的指向为新传入的 fn
  useEffect(() => {
    ref.current = fn;
  }, [fn, ...dependencies]);

  return useCallback(() => {
    const fn = ref.current;
    return fn();
  }, [ref]);
}

// 调用
const getData = useRefCallback(() => {
  console.log(val);

  setTimeout(() => {
    setVal("new data " + count);
    count++;
  }, 500);
}, [val]);
```



### useRef、forwardref与useImperativeHandle

useRef

主要作用是创建一个数据的引用，并让这个数据在 render 过程中始终**保持不变**。修改ref对象不会像修改state那样触发重绘。

基本语法： `const count = useRef(0)`，读取用 `count.current`

```react
export function ReactEcharts(props) {
  const {option, loading} = props
  const container = useRef(null)
  const chart = useRef(null)

  useEffect(() => {
    const width = document.documentElement.clientWidth
    const c = container.current
    console.log(c)
    c.style.width = `${width - 20}px`
    c.style.height = `${(width - 20) * 1.2}px`
    chart.current = echarts.init(c, 'dark')

  }, []) // [] - mounted on first time

  useEffect(() => {
    chart.current.setOption(option)
  }, [option]) // when option change 类似 vue 的 watch

  useEffect(() => {
    if (loading) chart.current.showLoading()
    else chart.current.hideLoading()
  }, [loading])
  return (
    <div ref={container}/>
  )
}
```

useRef使用时报错不能将类型“MutableRefObject<HTMLDivElement | undefined>”分配给类型“LegacyRef | undefined”。

原因：

 1.没赋初值

2. useRef里面没写对类型

useImperativeHandle

useImperativeHandle可以让你在使用转发ref时自定义暴露给父组件的实例值。通过`useImperativeHandle`减少暴露给父组件获取的DOM元素属性，只暴露特定的操作，从而提升性能

在大多数情况下，应当避免使用ref这样的命令式代码，useImperativeHandle应当与forwardRef一起使用

useImperativeHandle的语法：useImperativeHandle(ref, createHandle, [deps])

1. `ref`
   需要被赋值的`ref`对象。
2. `createHandle`：
   `createHandle`函数的返回值作为`ref.current`的值。
3. `[deps]`
   依赖数组，依赖发生变化会重新执行`createHandle`函数。

```react
import React, { useRef, forwardRef, useImperativeHandle } from 'react'

const JMInput = forwardRef((props, ref) => {
  const inputRef = useRef()
  // 作用: 减少父组件获取的DOM元素属性,只暴露给父组件需要用到的DOM方法
  // 参数1: 父组件传递的ref属性
  // 参数2: 返回一个对象,父组件通过ref.current调用对象中方法
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus()
    },
  }))
  return <input type="text" ref={inputRef} />
})

export default function ImperativeHandleDemo() {
  // useImperativeHandle 主要作用:用于减少父组件中通过forward+useRef获取子组件DOM元素暴露的属性过多
  // 为什么使用: 因为使用forward+useRef获取子函数式组件DOM时,获取到的dom属性暴露的太多了
  // 解决: 使用uesImperativeHandle解决,在子函数式组件中定义父组件需要进行DOM操作,减少获取DOM暴露的属性过多
  const inputRef = useRef()

  return (
    <div>
      <button onClick={() => inputRef.current.focus()}>聚焦</button>
      <JMInput ref={inputRef} />
    </div>
  )
}
```

useImperativeHandle更常用的写法是

```react
type Props = {
  content?: string;
};

type Instance = {
  insertParam: (text: string, value: string) => void;
};
const Setting = React.forwardRef<
  Instance,
  Props
>(function ContentSetting({ content }, ref) {
	const itemRefs = React.useRef<(RichTextInputInstance | null)[]>([]);
  useImperativeHandle(ref, () => ({
    insertParam(text, value) {
      const focusRef = itemRefs?.current?.[focusIndex as any];
      focusRef?.insertParam(text, value);
    },
  }));
  
  return (
  
    <RichTextInput
      placeholder={placeholder}
      readOnly={readOnly}
      ref={(inputRef) => (itemRefs.current[index] = inputRef)}
      onFocus={() => handleFocus(index)}
      className={classNames({ [styles.formReadOnly]: readOnly })}
      singleLine={singleLine}
      />)
}
```



#### useRef与createRef的区别

```react
import React, { useRef, createRef, useState } from "react";
import ReactDOM from "react-dom";

function App() {
  const [renderIndex, setRenderIndex] = useState(1);

  const refFromUseRef = useRef();
  const refFromCreateRef = createRef();

  if (!refFromUseRef.current) {
    // 赋值操作,赋值给useRef
    refFromUseRef.current = renderIndex;
  }
  if (!refFromCreateRef.current) {
    // 赋值操作，赋值给createRef
    refFromCreateRef.current = renderIndex;
  }
  return (
    <div className="App">
      Current render index: {renderIndex}
      <br />
      在refFromUseRef.current中记住的第一个渲染索引：
      {refFromUseRef.current}
      <br />
      在refFromCreateRef.current中未能成功记住第一个渲染索引：
      {refFromCreateRef.current}
      <br />
      <button onClick={() => setRenderIndex(prev => prev + 1)}>
        数值 + 1
      </button>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
```

上面的案例中无论如何点击按钮 `refFromUseRef.current` 将始终为 `1`，而 `renderIndex` 和 `refFromCreateRef.current` 会伴随点击事件改变

当 ref 对象内容发生变化时，useRef 并不会通知你。变更 `.current` 属性不会引发组件重新渲染。如果想要在 React 绑定或解绑 DOM 节点的 ref 时运行某些代码，则需要使用 `callback ref` 来实现

### useDebugValue



### 自定义hook

可以把不同的hook按照实际的需求混合起来，封装成一个新的函数使用

通过自定义 Hook，可以将组件逻辑提取到可重用的函数中。

```react
const useList = () => {
  const [list, setList] = useState(null);
  useEffect(() => {
    ajax("/list").then(list => {
      setList(list);
    });
  }, []); // [] 确保只在第一次运行
  return {
    list: list,
    setList: setList
  };
};
export default useList;
```

抽象useInput hooks

```react
import { useState } from 'react'

function useInput(initialValue: string) {
  const [value, setValue] = useState(initialValue)
  const reset = () => {
    setValue(initialValue)
  }
  const bind = {
    value,
    onChange(e: any) {
      setValue(e.target.value)
    }
  }
  return [value, bind, reset]
}

export default useInput
```

使用useInput Hook

```react
import React, { FormEvent } from 'react'
import useInput from './hooks/useInput'

function UserForm() {

  const [firstName, bindFirstName, resetFirstName] = useInput('')
  const [lastName, bindLastName, resetLastName] = useInput('')

  const submitHandler = (e: FormEvent) => {
    e.preventDefault()
    console.log(`Hello ${firstName} ${lastName}`)
    // @ts-ignore
    resetFirstName()
    // @ts-ignore
    resetLastName()
  }
  return (
    <div>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="">First name</label>
          <input
            type="text"
            {...bindFirstName}
          />
        </div>
        <div>
          <label htmlFor="">Last name</label>
          <input
            type="text"
            {...bindLastName}
          />
        </div>
        <button>submit</button>
      </form>
    </div>
  )
}

export default UserForm
```

返回 DOM 其实和最基本的 Hook 逻辑是相同的，只是在返回的数据内容上有一些差异

```react
import React, { useState } from 'react';
import { Modal } from 'antd';

function useModal() {
  const [visible, changeVisible] = useState(false);

  const toggleModalVisible = () => {
    changeVisible(!visible);
  };

  return [(
    <Modal
      visible={visible}
      onOk={toggleModalVisible}
      onCancel={toggleModalVisible}
    >
      弹窗内容
      </Modal>
  ), toggleModalVisible];
}

export default function HookDemo() {
  const [modal, toggleModal] = useModal();
  return (
    <div>
      {modal}
      <button onClick={toggleModal}>打开弹窗</button>
    </div>
  );
}
```



