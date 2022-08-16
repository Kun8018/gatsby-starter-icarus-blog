---
title: React（四）
date: 2020-06-02 21:40:33
categories: IT
tags:
    - IT，Web,Node，React
toc: true
thumbnail: 
---

​      前端框架，快速开发页面，函数式编程，与后端api快速搭建

<!--more-->

## React原理

### 合成事件

React合成事件是React模拟原生DOM事件所有能力的一个事件对象，即浏览器原生事件的跨浏览器包装器。它根据w3c规范来定义合成事件，兼容所有浏览器，拥有与浏览器原生事件相同的接口

在React中，所有事件都是合成的，不是原生DOM事件，但可以通过e。nativeEvent属性获取DOM事件

React合成事件存在的目的：

1.为了更好的进行浏览器兼容，更好地跨平台

React采用的是顶层事件代理机制，能够保证冒泡一致性，可以跨浏览器执行。React提供的合成事件用来抹平不同浏览器事件对象之间的差异，将不同平台事件模拟合成事件

2.避免垃圾回收

事件对象可能会被频繁创建和回收，因为react引入事件池，在事件池中获取或释放事件对象。即react事件对象不会被释放掉，而是存放在一个数组中，当事件触发时，就从这个数组中弹出，避免频繁地创建和销毁，垃圾回收

3.方便事件统一管理和事务机制

由于fiber架构的特点，生成一个fiber节点时，它对应的dom节点有可能还未挂载，事件处理函数作为fiber节点的props，也就不能直接绑定到真实的dom节点上。为此，react提供了一种顶层注册、事件收集、统一触发的事件绑定机制

在React中，合成事件会以事件委托的形式绑定在组件最上层，即React所有事件都挂载在document对象上（react16及之前），react17之后绑定在root element元素对象上，并在组件卸载阶段自动销毁绑定的事件。事件委托是对冒泡机制进行优化。
事件收集是指事件触发时构造合成事件对象，按照冒泡或者捕获的路径去组件中收集真正的事件处理函数

统一触发是

绑定到根组件而非document对象上的原因是为了react渐进升级，避免多版本react共同使用时事件系统发生冲突。

在react中人为地将事件划分等级，最终目的是确定调度任务的轻重缓急。

react按照事件的紧急程度，对事件的优先级分类：

离散事件discreteEvent：click、keydown、focus等，这些事件的触发不是连续的，优先级为0

用户阻塞事件User Blocking Event：drag、scroll、mouseover等，特点是连续触发，阻塞渲染，优先级为1

连续事件ContinuousEvent：canplay、error、audio标签等timeupdate等，优先级最高，为2

四种优先级：

事件优先级：按照用户事件的交互紧急程度，由事件本身决定

更新优先级：事件导致react产生的更新对象的优先级，由事件计算得出

任务优先级：产生更新对象之后，react去执行一个更新任务，这个任务所持有的优先级

调度优先级：Scheduler根据React更新任务生成一个调度任务，调度优先级根据任务优先级获取

事件优先级是在注册阶段被确定的。在root上注册事件时，会根据事件的类别，创建不同优先级的事件监听，最终将它绑定到root上。最终绑定到root上的事件监听其实是dispatchDiscreteEvent、dispatchUserBlockingUpdate、dispatchEvent三个事件中的一个

事件的执行会创建一个update对象，update对象创建完成后意味着需要对页面进行更新，会调用scheduleUpdateOnFiber进入调度，而真正开始调度之前会计算本次产生的更新任务的任务优先级，目的是与已有任务的任务优先级去做比较，便于作出多任务的调度决策

任务优先级被用来区分多个更新任务的紧急程度，它由更新优先级计算而来。任务优先级保证高优先级任务及时响应，收敛同等优先级的任务调度。

一旦事件被调度，那么它就会进入Scheduler，在Scheduler中这个任务会被包装一下，生成一个属于属于Schedule自己的task，这个task持有的优先级就是调度优先级

在Scheduler中，分别用过期任务和未过期任务的队列去管理它内部的task，过期任务的队列中的task根据过期事件去排序，最早过期的排在前面，便于被最先处理，而过期时间是有调度优先级计算出的，不同的调度优先级对应的过期时间不同

#### 原生事件/合成事件区分

在同一组件中同时使用原生事件和react合成事件

```react
import React, { useEffect, useRef } from 'react',
  
function Demo() {
  const demo = useRef(null)
  
  useEffect(()=>{
    addEventListener(demo.current, 'click', clickDOMButton, false);
  },[])
  
  function clickDOMButton() {
    console.log('DOM event')
  }
  
  function clickReactButton() {
    console.log('React event')
  }
  
  return (
  	<div>
    	<button ref={demo} onClick={clickReactButton} >
      	按钮
      </button>
    </div>
  )
}

export default Demo
```

React事件与DOM原生事件混用时，先执行原生事件，再去执行合成事件

原生事件中使用e.stopropagation会阻止合成事件的执行，但在合成事件中使用e.stoppropagation却不会阻止原生事件的执行

### Fiber架构

react16相比于react15，经过重构后Reconciliation和Rendering被分为两个不同的阶段。

#### fiber出现的背景

js引擎和UI渲染引擎是互斥的。当其中一个线程执行时，另一个线程只能挂起等待。在这样的机制下，如果js线程长时间的占用主线程，那么渲染层的更新就不得不长时间的等待，界面长时间不会更新，会导致页面响应度变差，用户可能会感觉到卡顿。

这就是react 15 stack reconciler所面临的问题，即hs对主线程的超时占用。stack reconciler是一个同步的递归过程。使用的是js引擎自身的函数调用栈。它会一直执行到栈空为止。所以当react在渲染组件时，从开始到渲染完整个过程是一气呵成的，如果渲染的组件比较庞大，js执行会占据主线程较长时间，导致页面响应度变差。

而且所有任务按照先后顺序被执行，没有区分优先级。这样就会导致优先级比较高的任务无法被执行。

#### fiber架构中的基本概念

Fiber的中文名字叫纤程，与进程、线程同为程序执行过程，fiber就是比线程还细的过程。纤程本意就是对渲染过程进行一个更加细度的控制。 Fiber 的架构有两个主要阶段：协调/渲染 和 提交。

**reconciler协调阶段**：当组件次初始化和其后的状态更新中，React会创建两颗不相同的虚拟树，React 需要基于这两棵树之间的差别来判断如何有效率的更新 UI 以保证当前 UI 与最新的树保持同步，计算树哪些部分需要更新。**react diff算法就发生在这个阶段**

**renderer阶段**：渲染器负责将拿到的虚拟组件树信息，根据其对应环境真实地更新渲染到应用中。有兴趣的朋友可以看一下dan自己的博客中的文章=》[运行时的react=》渲染器](https://overreacted.io/react-as-a-ui-runtime/#renderers)，介绍了react的Renderer渲染器如react-dom和react native等，其可以根据不同的主环境来生成不同的实例。

协调阶段的工作：

协调阶段这是React遍历组件树的阶段，并且：

- 更新状态和属性
- 调用生命周期钩子
- 获取组件的`children`
- 将它们与之前的`children`进行对比
- 并计算出需要执行的DOM更新

**fiber对象**

一个fiber对象是表征work的一个基本单元。

每一个React元素对应一个fiber对象，fibers是一个基于child, sibling 和 return属性构成的链表。 fiber对象核心的属性和含义如下所示：

```typescript
type Fiber = {
  tag: WorkTag,
  key: null | string,
  elementType: any,
  type: any,
  stateNode: any,
  
}
```

每个fiber节点对应一个React element，保存该组件的类型、对应的dom节点等信息。作为动态的工作单元来说，每个fiber节点保存了本次更新中该组件改变的状态、要执行的工作。

多个fiber节点连接靠三个属性

```javascript
this.return = null; // 
this.child = null;  //指向子fiber节点
this.sibling = null; //指向右边第一个兄弟fiber节点
```



**child、silbing、return**fiber对象的属性，这些属性指向其他fiber，表征当前工作单元的下一个工作单元，用于描述fiber的递归树结构。

child： 对应于父fiber节点的子fiber silbing： 对应于fiber节点的同类兄弟节点 return： 对应于fiber节点的父节点

相对于React v16之前的版本，正是得益于fiber对象的child、sibing和return属性构成的单链表结构以及fiber对象中存储的上下文信息，才使得scheduler可以达到暂停、中止、重新开始等并发模式的新特性。

**work**

在React reconciliation过程中出现的各种比如state update，props update 或 refs update等必须执行计算的活动，这些活动我们在Fiber架构体系里面统一称之为 “work”。

**worktag**

workTag 类型，用于描述一个React元素的类型，即为上述fiber对象的 fiber.tag

**stateNode**

一个组件、一个DOM节点或其他跟fiber节点相关联的React元素的实例的引用。通常，我们可以说这个属性是用于保存与一个fiber相关联的本地状态。即上述fiber对象的 fiber.stateNode。



#### 双缓存机制

**current树和workInProgress树** 

首次渲染后，React生成一个用于渲染UI并能映射应用状态的fiber树，我们通常称之为current树。当React遍历current树，它为每一个存在的fiber节点创建一个alternate属性的替代节点，该节点构成workInProgress树。

每次状态更新都会产生新的`workInProgress Fiber树`，通过`current`与`workInProgress`的替换，完成`DOM`更新。

所有发生update的work都在workInProgress树中执行，如果alternate属性还未创建，React将在处理update之前在createWorkInProgress函数中创建一个current树的副本，即形成workInProgress树，用于映射新的状态并在commit阶段刷新到屏幕。

**所有这些活动都被称为Fiber内部的工作。** 需要完成的工作类型取决于React Element的类型。 例如，对于 `Class Component` React需要实例化一个类，然而对于`Functional Component`却不需要。

在浏览器中GUI渲染线程与JS引擎线程是互斥的，当JS引擎执行时GUI线程会被挂起（相当于被冻结了），GUI更新会被保存在一个队列中等到JS引擎空闲时立即被执行。

**Stack Reconciler 和 fiber reconciliation**

React16 推出Fiber之前协调算法是Stack Reconciler，即递归遍历所有的 Virtual DOM 节点执行Diff算法，一旦开始便无法中断，直到整颗虚拟dom树构建完成后才会释放主线程，因其JavaScript单线程的特点，若当下组件具有复杂的嵌套和逻辑处理，diff便会堵塞UI进程，使动画和交互等优先级相对较高的任务无法立即得到处理，造成页面卡顿掉帧，影响用户体验。在`React15`及之前，`React`会递归比对`VirtualDOM`树，找出需要变动的节点，然后同步更新它们。这个过程`React`称为`Reconciliation(协调)`。

在`Reconciliation`期间，`React`会一直占用着浏览器资源，一则会导致用户触发的事件得不到响应, 二则会导致掉帧，用户可能会感觉到卡顿。

针对上述痛点，我们期望将**”找出有增删改的节点“，”然后同步更新他们“**这个过程分解成两个独立的部分，或者通过某种方式能让整个过程**可中断可恢复的执行**，类似于多任务操作系统的单处理器调度。

fiber的核心目标：

- 把可中断的工作拆分成多个小任务
- 为不同类型的更新分配任务优先级
- 更新时能够暂停，终止，复用渲染任务

这是一种**合作式调度**，需要程序和浏览器互相信任。浏览器作为领导者，会分配执行时间片（即requestIdleCallback）给程序去选择调用，程序需要按照约定在这个时间内执行完毕，并将控制权交还浏览器。

Fiber是一个执行单元，每次执行完一个执行单元，React就会检查现在还剩多少时间，如果没有时间就将控制权交还浏览器；然后继续进行下一帧的渲染。

从根节点开始遍历

如果没有长子，则标识当前节点遍历完成。`completeUnitOfWork`中收集

如果没有相邻兄弟，则返回父节点标识父节点遍历完成。`completeUnitOfWork`中收集

如果没有父节点，标识所有遍历完成。`over`

如果有长子，则遍历；`beginWork`中收集；收集完后返回其长子，回到`第2步`循环遍历

如果有相邻兄弟，则遍历；`beginWork`中收集；收集完后返回其长子，回到`第2步`循环遍历

#### 实现原理/架构

实现的方式是requestIdleCallback这个api，React团队polyfill了这个api，使其比原生的浏览器兼容性更好且拓展了特性。

requestIdleCallback回调的执行的前提条件是当前浏览器处于空闲状态。

Fiber架构可以分为三层：

Scheduler调度器-调度任务的优先级，高任务优先级优先任务reconciler

Reconciler协调器-负责找出变化的组件

Renderer-渲染器-负责将变化的组件渲染到页面上

Scheduler调度器就是react团队实现的功能更完备的requestIdleCallback polyfill，这就是scheduler。除了在空闲时触发回调的功能之外，scheduler还可以实现多种调度优先级供任务设置。

#### Reconciler协调器

在react15中是递归处理虚拟DOM的，react16中则是变成了可以中断的循环过程，每次循环都会调用shouldYield判断当前是否有剩余时间

```javascript
function workloopConcurrent() {
  while (workInProgress !== null && !shouldYield()) {
		workInProgress = performUnitOfWork(workInProgress)
  }
}
```

在react 16中，reconciler与renderer不再是交替工作，当Scheduler把任务交给Reconciler后，reconciler会为变化的虚拟DOM打上标记。

```javascript
export const Placement = /*          */ 0b000000000000010
export const Update = /*             */ 0b000000000000100
export const PlacementAndUpdate = /* */ 0b000000000000110
export const Deletion = /*           */ 0b000000000001000
```

placement表示插入操作

PlacementAndUpdate 表示替换操作

Update表示更新操作

Deletion表示删除操作

整个Scheduler和Reconciler的工作都在内存中进行，所以即使反复中断，用户也不会看见更新不完全的DOM，只有当所有组件都完成Reconciler的工作才会统一交给renderer。Renderer根据Reconciler为虚拟com打的标记同步执行对应的操作。

#### Render阶段

**enqueueSetState**

以类组件为例，ReactDOM中的updater对象是一个classComponentUpdater，用于获取fiber实例、update队列和调度 work

fiber.updateQueue是一个具有updates优先级的链表（UpdateQueue is a linked list of prioritized updates）

跟Fiber一样，update 队列也是成对出现：一个代表屏幕可见状态的 current 队列，一个在commit阶段之前可被异步计算和处理的work-in-progress 队列。如果一个work-in-progress队列在完成之前被丢弃，则将会通过克隆一个curent队列来创建一个新的work-in-progress队列。



函数调用栈：performUnitOfWork --> beginWork --> updateClassComponent --> finishedComponent --> completeUnitOfWork



**completeUnitOfWork**

React在completeUnitOfWork函数中构建effect-list

是深度优先搜索算法一部分，获取workInProgress.alternate、父节点workInProgress.return和workInProgress.sibling，如果存在兄弟节点则返回。否则，返回父节点。

#### Commit阶段

类似于`Git`的分支功能，从旧树里面fork一份，在新分支中进行**添加、删除、更新**操作，然后再进行提交。

fiber大量使用链表。由于数组的大小是固定的，从数组的起点或者中间插入或移除项的成本很高。链表相对于传统的数组的优势在于添加或移除元素的时候不需要移动其他元素，**需要添加和移除很多元素时，最好的选择是链表，而非数组。** 链表在React的Fiber架构和Hooks实现发挥很大的作用。

commit阶段被分为几个子阶段。每个子阶段都单独进行effect list传递。所有的mutation effects都会在所有的layout effects之前执行。

被分为如下三个子阶段：

- before mutation：React使用此阶段读取 host tree的state状态。 这是调用getSnapshotBeforeUpdate生命周期的地方，也会处理useEffect钩子函数的逻辑。
- mutation 阶段：在这个阶段，React 会改变host tree。 当该阶段执行结束时，work-in-progress树会变成current树，这必须发生在“mutation phase”阶段之后，以便于在componentWillUnmount生命周期内，仍然是之前的current树。但是，也要发生在“layout phase”阶段之前，以便于在componentDidMount / Update生命周期间，current树是已完成的work操作的。
- layout 阶段：在这个阶段hfost tree已经被更改并调用 effects。componentDidMount / Update,调用useLayoutEffect钩子函数的回调等生命周期在这个阶段被执行。此外它还会把fiberRoot的current指针指向workInProgress Fiber树

#### 废除生命周期的真正原因

react组件的生命周期中的

constructor、getDerivedStateFromProps、shouldComponentUpdate、render属于render阶段，render阶段主要在内存中做计算，明确dom树的更新点，render阶段没有副作用，可能会被react暂停、终止或者重新执行

getSnapshotBeforeUpdate属于pre-commit阶段，可以读取dom

componentdidmount、componentdidupdate、componentwillunmount属于commit阶段，可以使用dom，运行副作用，安排更新。

新老两种架构对生命周期的影响主要在render这个阶段，这个影响是通过增加Scheduler层和改写Reconciler层来实现的。在render阶段，一个庞大的更新任务被分解为一个一个的工作单元，这些工作单元有着不同的优先级，react可以根据优先级的高低去实现工作单元的打断和恢复。

从fiber的角度看，被废弃的三个生命周期componentwillmount、componentwillupdate、componentwillrecieveprops都处于render阶段，而这个阶段是允许暂停、终止和重启的，这就导致了render阶段的生命周期可能被重复执行，也就是废弃他们的原因之一

迁移指南：

componentwillmount中的代码可以迁移至componentDidmount

componentwillrecieveprops中的代码只更新props，替换state的代码放到componentdidupdate中执行

componentwillupdate中的代码迁移到componentdidupdate，如果出发回调函数需要用到dom的状态，则将对比或者计算过程放到getsnapshotbeforeUpdate，然后在componentdidupdate中统一出发更新

```react
// before
componentWillReceiveProps(nextProps) {
  if(nextProps.isLogin !== this.props.isLogin) {
    this.setState({
      isLogin: nextProps.isLogin;
    });
  }
  if(nextProps.isLogin) {
    this.handleClose()
  }
}

//after
static getDerivedStateFromProps(nextProps, prevState) {
  if(nextProps.isLogin !== this.props.isLogin) {
    return {
      isLogin: nextProps.isLogin;
    }
  }
  return null;
}

componentDidUpdate(prevProps, prevState) {
  if(!prevState.isLogin && this.props.isLogin) {
    this.handleClose();
  }
}
```

### props与state的区别

props和state都是普通的JavaScript对象，它们都是用来保存信息的，这些信息可以控制组件的渲染输出。不同点：

props是传递给组件的，而state是组件内被组件自己管理

props是不可修改的，所有react组件必须像纯函数一样保护它们的props不被修改，由于props是不可变的，因为如果一个组件中只有props，那么就视为pureComponent

state实在组件中创建的，一般在constructor中初始化state

state是多变的，可以修改的，每次setState都是异步更新的

在react中，this.props和this.state都代表已经被渲染了的值，即当前屏幕显示的值。而调用setstate通常是异步的，因此如果你想基于当前的state计算出新的值，那么应该传递一个新函数，而不是一个对象

```react
increment() {
  this.setState({count: this.state.count + 1})
}

increment() {
  this.setState({count: state.count + 1})
}
```



### setState原理

setState的执行过程：

1.将setState传入的`partialState`参数存储在当前组件实例的state暂存队列中。

2.判断当前React是否处于批量更新状态，如果是，将当前组件加入待更新的组件队列中。

3.如果未处于批量更新状态，将批量更新状态标识设置为true，用事务再次调用前一步方法，保证当前组件加入到了待更新组件队列中。

4.调用事务的`waper`方法，遍历待更新组件队列依次执行更新。

5.执行生命周期`componentWillReceiveProps`。

6.将组件的state暂存队列中的`state`进行合并，获得最终要更新的state对象，并将队列置为空。

7.执行生命周期`componentShouldUpdate`，根据返回值判断是否要继续更新。

8.执行生命周期`componentWillUpdate`。

9.执行真正的更新，`render`。

10.执行生命周期`componentDidUpdate`。

### setState的异步同步

简单来说，只要setState在react的调度流程中，就是异步的，只要没有进入react的流程中，那就是同步的。不会进入react调度流程的事件：setTimeout，setInterval、直接在DOM上绑定原生事件等，都不会走React调度流程。在这些情况里面调用setState就是同步的，否则就是异步的。

`setState`只在合成事件和钩子函数中是“异步”的，在原生事件和`setTimeout` 中都是同步的。

`setState` 的“异步”并不是说内部由异步代码实现，其实本身执行的过程和代码都是同步的，只是合成事件和钩子函数的调用顺序在更新之前，导致在合成事件和钩子函数中没法立马拿到更新后的值，形成了所谓的“异步”，当然可以通过第二个参数 `setState(partialState, callback)` 中的`callback`拿到更新后的结果。

在`react`的生命周期和合成事件中，`react`仍然处于他的更新机制中，这时`isBranchUpdate`为true。

按照上述过程，这时无论调用多少次`setState`，都会不会执行更新，而是将要更新的`state`存入`_pendingStateQueue`，将要更新的组件存入`dirtyComponent`。

当上一次更新机制执行完毕，以生命周期为例，所有组件，即最顶层组件`didmount`后会将`isBranchUpdate`设置为false。这时将执行之前累积的`setState`。

`setState` 的批量更新优化也是建立在“异步”（合成事件、钩子函数）之上的，在原生事件和setTimeout 中不会批量更新，在“异步”中如果对同一个值进行多次`setState`，`setState`的批量更新策略会对其进行覆盖，取最后一次的执行，如果是同时`setState`多个不同的值，在更新时会对其进行合并批量更新。

也就是说，一个方法里需要多次调用setState，setState了很多次，然后render（）只调用了一次

原因：

React会将多个this.setState产生的修改放在一个队列里，缓一缓，攒在一起，觉得差不多了再引发一次更新过程。

react为了提高整体的渲染性能，会将一次渲染周期中的state进行合并，在这个渲染周期中你对所有setState的所有调用都会被合并起来之后，再一次性的渲染，这样可以避免频繁的调用setState导致频繁的操作dom，提高渲染性能。具体的实现方面，可以简单的理解为react中存在一个状态变量isBatchingUpdates，当处于渲染周期开始时，这个变量会被设置成true，渲染周期结束时，会被设置成false，react会根据这个状态变量，当出在渲染周期中时，仅仅只是将当前的改变缓存起来，等到渲染周期结束时，再一次性的全部render。

```text
1.调用setState不会立即更新
2.所有组件使用的是同一套更新机制，当所有组件didmount后，父组件didmount，然后执行更新
3.更新时会把每个组件的更新合并，每个组件只会触发一次更新的生命周期。
```



#### setstate更新数组

对于数组和对象这种引用类型的数据，setstate只能改变引用地址，改变时只能用新的对象或者数组赋值，不能直接在原对象上改

可以使用原生js或者react官方推荐immutablejs更新数组

实例

```react
//错误例子
var list = [1];
list.push(2)
//list对象已经变化，然而引用的值依然还是同一个引用

//正确更新数组
var list = this.state.list;
this.setState({
  list:list.concat('otherData')
})

this.setState({
  list:[...list,'otherData']
})

//正确更新对象
//使用object.assign方法
var user = this.state.user;
this.setState({
  user.Object.assign({},user,{age:18})
})
//使用对象拓展语法
var user = this.state.user;
this.setState({
  user:{...user,age:18}
})
```

ImmutableJS更新数组

#### 连续调用setstate只有一次生效

实例1

```react
componentDidMount() {
    this.setState({ index: this.state.index + 1 }, () => {
      console.log(this.state.index);
    })
    this.setState({ index: this.state.index + 1 }, () => {
      console.log(this.state.index);
    })
}
//输出
1
1
```

实例2

```react
componentDidMount() {
    this.setState((preState) => ({ index: preState.index + 1 }), () => {
      console.log(this.state.index);
    })
    this.setState(preState => ({ index: preState.index + 1 }), () => {
      console.log(this.state.index);
    })
}
//输出
2
2
```

原因：

- 1.直接传递对象的`setstate`会被合并成一次
- 使用函数传递`state`不会被合并

#### setstate自动触发两次

严格模式下，

#### 定时器中的setstate

定时器中的 setState，每次都会引起新的 render，即使是同一个定时器中的多次 setState

因为定时器中的`setState`没走`react`的事物机制，执行时批量更新没被设置`true`，所以每次都直接 render 了。

在事件执行的时候，**当前上下文**执行的是`setTimeout`函数，但当执行`setTimeout`函数的回调时，原来的上下文已经结束了，**回调的上下文变成了 window**，所以依据的批量更新属性`isBatchingUpdates`没有被设置成`true`的过程，因此始终是`false`，因此`setState`就同步执行了。

```typescript
componentWillMount() {
    let me = this;
    setTimeout(() => {
        me.setState({
            count: me.state.count + 1
        });
        me.setState({
            count: me.state.count + 1
        });
    }, 0);
}

componentDidMount() {
    let me = this;
    setTimeout(() => {
        me.setState({
            count: me.state.count + 1
        });
        me.setState({
            count: me.state.count + 1
        });
    }, 0);
}

onClickTime() {
    let me = this;
    setTimeout(() => {
        me.setState({
            count: me.state.count + 1
        });
        me.setState({
            count: me.state.count + 1
        });
    }, 0);
}
```

其实在回调函数中，setState 是不会触发批量更新机制的，无论是 promise，ajax，setTimeout 回调等等，同时设置多次 setState，每个 setState 都会单独执行并 render，因为上下文发生了变化。

#### 原生事件中的setstate

在按钮原生事件中定义的`setState`,和定时器效果一样，每次`setState`都会引起新的`render`

```react
componentDidMount() {
       this.button.addEventListener('click', this.onClick.bind(this, '原生事件'), false);
}

onClick(info) {
       console.log(info);
       this.setState({
           count: ++count
       });
       this.setState({
           count: ++count
       });
   }

   render() {
       console.log(this.state.count);
       return <div>
           <input type="button" ref={input => this.button = input} onClick={this.onClick.bind(this, 'React事件')} value="生成计时器" />
           <div>Count:{this.state.count}</div>
       </div>
   }
```

#### 生命周期函数调用setstate

在componentDidMount()中，你 可以立即调用setState()。它将会触发一次额外的渲染，但是它将在浏览器刷新屏幕之前发生。这保证了在此情况下即使render()将会调用两次，用户也不会看到中间状态。谨慎使用这一模式，因为它常导致性能问题。在大多数情况下，你可以 在constructor()中使用赋值初始状态来代替。然而，有些情况下必须这样，比如像模态框和工具提示框。这时，你需要先测量这些DOM节点，才能渲染依赖尺寸或者位置的某些东西。

componentWillUpdate和componentDidUpdate这两个生命周期中不能调用`setState`。

在这两个生命周期里面调用`setState`会造成死循环，导致程序崩溃。

在调用`setState`时使用函数传递`state`值，在回调函数中获取最新更新后的`state`。

### react diff算法的机制

diff算法的瓶颈

由于diff操作本身也会带来性能损耗，react文档中提到，即使在最前沿的算法中，将前后两棵树完全对比的算法的复杂程度为O(n3)，其中n是树中元素的数量

如果在react中使用了该算法，那么展示1000个元素所需要执行的计算量将在10亿范围的量级，这个开销实在太高。

为了降低算法的复杂度，react的diff预设了3个限制：

1.同级元素进行diff。如果一个DOM节点在前后两次更新中跨越了层级，那么React不会尝试复用

2.不同类型的元素会产生出不同的树，如果元素由div变为p，react会销毁div及其子孙节点，并新建p及其子孙节点

3.开发者可以通过prop key暗示哪些子元素在不同的渲染下能保持稳定

举个例子

```react
//更新前
<div>
   <p key="ka">ka</p>
   <h3 key="song">song</h3>
</div>
//更新后
<div>
   <h3 key="song">song</h3>
   <p key="ka">ka</p>
</div>
```

如果没有key，react会认为div的第一个子节点由p变为h3，第二个子节点由h3变为p，这符合限制2的设定，因此会销毁并重建

当用key指明了节点的前后对应关系后，react知道key="ka"的p在更新之后还存在，因此节点可以复用，只需要交换一下顺序即可



### React渲染机制(work loop)

React 16 之前的组件渲染方式是递归渲染：渲染父节点 -> 渲染子节点

递归渲染看起来十分简单，但是如果想在子节点的渲染过程中执行优先级更高的操作，只能保留调用栈中子节点的渲染及子节点之前节点的渲染，这样是很复杂的，这种调和/渲染也叫做 Stack Reconciler。

Fiber 使用链表的结构去渲染节点，每一个节点都称之为 Fiber Node，每个节点会有三个属性：

- child 指向第一个子节点
- sibling 指向兄弟节点
- return 指向父节点

Fiber 的渲染方式：从父节点开始，向下依次遍历子节点，深度优先渲染完子节点后，再回到其父节点去检查是否有兄弟节点，如果有兄弟节点，则从该兄弟节点开始继续深度优先的渲染，直到回退到根节点结束。

综上，可以分为 Scheduler、Reconciliation、Commit 这三个阶段

Scheduer 流程主要是创建更新，创建更新的方式：

- ReactDOM.render
- setState

可以发现 React 将首次渲染和更新渲染统一了起来。



#### 什么时候重新渲染

1.组件的state发生变化，如props变化或者通过setstate变化

2.shouldComponentUpdate

3.forceupdate

shouldComponentUpdate方法默认总是返回true，可以重写shouldComponentUpdate方法来看它是否返回true



### Effect Hook机制

effect hook与其他hook的行为有一些区别

effect hook的属性：

​		在渲染时被创建，在浏览器执行绘制后运行；

​		如果给出销毁指令，会在下一次绘制前被销毁；

​		会按照定义的顺序被运行

hook effect 将会被保存在 fiber 一个称为 `updateQueue` 的属性上，每个 effect 节点都有如下的结构.

- `tag` —— 一个二进制数字，它控制了 effect 节点的行为（后文我将详细说明）。
- `create` —— 绘制**之后**运行的回调函数。
- `destroy` —— 它是 `create()` 返回的回调函数，将会在初始渲染**前**运行。
- `inputs` —— 一个集合，该集合中的值将会决定一个 effect 节点是否应该被销毁或者重新创建。
- `next` —— 它指向下一个定义在函数组件中的 effect 节点。

除了 `tag` 属性，其他的属性都很简明易懂。如果你对 hook 很了解，你应该知道，React 提供了一些特殊的 effect hook：比如 `useMutationEffect()` 和 `useLayoutEffect()`。这两个 effect hook 内部都使用了 `useEffect()`，实际上这就意味着它们创建了 effect hook，但是却使用了不同的 tag 属性值。

Default effect —— `UnmountPassive | MountPassive`.

Mutation effect —— `UnmountSnapshot | MountMutation`.

Layout effect —— `UnmountMutation | MountLayout`.



### State、Reducer Hook机制

`useReducer` 和 `useState` 本质上是一个原理，虽然我们平时会使用 `useState` 更多，但事实上 `useState` 是 `useReducer` 的封装；



### Hook系统原理

Dispatcher

dispatcher 是一个包含了 hook 函数的共享对象。基于 ReactDOM 的渲染状态，它将会被动态的分配或者清理，并且它能够确保用户不可在 React 组件之外获取 hook

在切换到正确的 Dispatcher 以渲染根组件之前，我们通过一个名为 `enableHooks` 的标志来启用/禁用 hook。在技术上来说，这就意味着我们可以在运行时开启或关闭 hook。React 16.6.X 版本中也有对此的实验性实现，但它实际上处于禁用状态

当我们完成渲染工作后，我们将 dispatcher 置空并禁止用户在 ReactDOM 的渲染周期之外使用 hook。这个机制能够保证用户不会做什么蠢事

dispatcher 在每次 hook 的调用中都会被函数 `resolveDispatcher()` 解析。正如我之前所说，在 React 的渲染周期之外，这些都无意义了，React 将会打印出警告信息：**“hook 只能在函数组件内部调用”**

Hook队列

在 React 后台，hook 被表示为以调用顺序连接起来的节点。这样做原因是 hook 并不能简单的被创建然后丢弃。它们有一套特有的机制，也正是这些机制让它们成为 hook。一个 hook 会有数个属性，在继续学习之前，我希望你能牢记于心：

- 它的初始状态会在初次渲染的时候被创建。
- 它的状态可以在运行时更新。
- React 可以在后续渲染中记住 hook 的状态。
- React 能根据调用顺序提供给你正确的状态。
- React 知道当前 hook 属于哪个 fiber。

hook 还有一些附加的属性，但是弄明白 hook 是如何运行的关键在于它的 `memoizedState` 和 `next` 属性。其他的属性会被 `useReducer()` hook 使用，可以缓存发送过的 action 和一些基本的状态，这样在某些情况下，reduction 过程还可以作为后备被重复一次：

- `baseState` —— 传递给 reducer 的状态对象。
- `baseUpdate` —— 最近一次创建 `baseState` 的已发送的 action。
- `queue` —— 已发送 action 组成的队列，等待传入 reducer。

### redux原理

Redux是将整个应用状态存储到一个地方上称为**store**,里面保存着一个状态树**store tree**,组件可以派发(dispatch)行为(action)给store,而不是直接通知其他组件，组件内部通过订阅**store**中的状态**state**来刷新自己的视图。

redux三大原则

- 1 唯一数据源
- 2 保持只读状态
- 3 数据改变只能通过纯函数来执行

`react-redux`的核心机制是通知订阅模式，源码中有一个`Subscription`类，它的作用主要是订阅父级的更新和通知子级的更新，也就是它既可以订阅别人，别人也可以订阅它，同时可以通知订阅它的`Subscription`

最外层的`Provider`组件的`Context`里包含了的`store`（也就是我们传入的）和生成的`Subscription`实例，它的`Subscription`实例订阅的则是`redux` 的`subscrib()`

当我们使用了`connect()`时，它会生成一个新组件`<Component1/>`，`<Component1/>`里会生成一个`Subscription`实例，它会订阅父级（这时是`Provider`）的`Subscription`实例，同时将自己的`Subscription`覆盖进`Context`，再包装我们传入的组件

如果在`<Component1/>`里的子组件又有`connect()`，那么生成的`<Component2/>`组件的`Subscription`实例会订阅父级`<Component1/>`的`Subscription`实例，同时再将自己的`Subscription`覆盖进`Context`

在组件挂载完成后，如果`store`有更新，`Provider`会通知下一级组件的`Subscription`，下一级组件又会通知自己的下一级组件

在订阅的时候，会将更新自己组件的方法通过回调`onStateChange()`传入父级的`Subscription`

一旦父级接收到通知，就会循环调用订阅自己的组件的`onStateChange`来更新它们

更新的原理就是使用我们传入的`mapStateToProps`和`mapDispatchToProps`，结合内置的`selectorFactor()`来对比`state`和`props`，一旦有改变就强制更新自己，所以我们传入的`WrappedComponent`也被强制更新了



### redux-reducer

reducer为什么要是纯函数？纯函数是什么？

纯函数：对于相同的输入，永远会得到相同的输出，而且没有任何可观察的副作用，也不依赖外部环境的状态。

原因：Redux只通过比较新旧两个对象的存储位置来比较新旧两个对象是否相同（**浅比较**）。如果你在reducer内部直接修改旧的state对象的属性值，那么新的state和旧的state将都指向同一个对象。因此Redux认为没有任何改变，返回的state将为旧的state。两个state相同的话，页面就不会重新渲染了。

#### 纯函数

纯函数是指不会产生任何副作用，也不会改变状态的函数

比如下面这段代码，就回改变外部的值

```javascript
const add = (arrayInput, value) => {
  arrayInput.push(value);

  return arrayInput;
};

const array = [1, 2, 3];

console.log(add(array, 4)); // [1, 2, 3, 4]
console.log(add(array, 5)); // [1, 2, 3, 4, 5]
```

上面的函数违反了这一规则，每次我们调用 **add** 方法，它都会改变**数组**变量导致结果不一样

```javascript
const add = (arrayInput, value) => {
  const copiedArray = arrayInput.slice(0);
  copiedArray.push(value);

  return copiedArray;
};

const array = [1, 2, 3];

const resultA = add(array, 4);
console.log(resultA); // [1, 2, 3, 4]

const resultB = add(array, 5);
console.log(resultB); // [1, 2, 3, 5]
```

现在我们可以多次调用这个函数，且相同的输入获得相同的输出，与预期一致。这是因为我们不再改变 **array** 变量。我们把这个函数叫做“纯函数”

### redux中间件机制

`redux`源码只有**同步**操作，也就是当`dispatch action` 时，`state`会被立即更新。若需要引入异步数据流，[Redux官方](https://cn.redux.js.org/docs/advanced/AsyncFlow.html)则建议使用中间件来增强`createStore`的能力，它对外暴露了`applyMiddleware`函数，接受任意个中间件作为入参，返回作为`createStore`的入参的值

```react
// 引入 redux
import { createStore } from 'redux'
// 创建 store
const store = createStore(
    reducer,
    initial_state,
    //引入中间件
    applyMiddleware(middleware1, middleware2, ...)
);
```

以 `middlewareAPI` 作为中间件的入参，逐个调用传入的中间件，获取一个由“内层函数”组成的数组 `chain`

调用 `compose` 函数，将 `chain` 中的 “内层函数” 逐个组合起来，并调用最终组合出来的函数，传入 `dispatch` 作为入参

返回一个新的 `store` 对象，这个 `store` 对象的 `dispatch` 已经被改写过了

`reduce` 会将数组中的每个元素执行指定的逻辑，并将结果汇总为单个返回值，假设有这样一个 `compose` 调用

```javascript
compose(f1,f2,f3,f4)
//会被解析为
(...args) => f1(f2(f3(f4(...args))))
```

即`f1,f2,f3,f4`这4个中间件的内层逻辑会被组合到一个函数中去，当这个函数被调用时，中间件会依次被调用

中间件的执行机制

我们知道 **任何的中间件都可以用自己的方式解析`dispatch`的内容，并继续传递`actions` 给下一个中间件**。但注意：当最后一个中间件开始 `dispatch action` 时，`action` 必须是一个普通对象，因为这是同步式的 `Redux` 数据流 开始的地方。

`redux-thunk`源码层面可知道，它主要做的一件事就是 拦截到`action`后，检查它是否是一个函数

- 若是函数，则执行它并返回执行的结果
- 若不是函数，则直接调用`next`，工作流继续往下走

中间件的工作模式：

- 中间件的执行时机：在`action`被分发之后、`reducer`触发之前
- 中间件的执行前提：`applyMiddleware`函数对`dispatch`函数进行改写，使得`dispatch`触发`reducer`之前，执行`Redux`中间件的链式调用。

### Redux compose实现

compose就是执行一系列的任务（函数），比如有以下任务队列

```javascript
let tasks = [step1, step2, step3, step4]
```

每一个step都是一个步骤，按照步骤一步一步的执行到结尾，这就是一个**compose**

compose在函数式编程中是一个很重要的工具函数，在这里实现的compose有三点说明

- 第一个函数是多元的（接受多个参数），后面的函数都是单元的（接受一个参数）
- 执行顺序的自右向左的
- 所有函数的执行都是同步的

用代码解释

```javascript
import {componse} from 'redux'
function add1(str) {
	return 1 + str;
}
function add2(str) {
	return 2 + str;
}
function sum(a, b) {
	return a + b;
}
let str = compose(add1,add2,add3)('x','y')
console.log(str)
//输出结果 '12xy'
```





### 利用context api实现redux

https://segmentfault.com/a/1190000023142285



### React-router原理

`React-Router`中的3个核心角色：

导航：负责触发路径的改变，比如 `Link`、`NavLink` 和 `Redirect`（以`Link`为代表）

路由：负责定义路径与组件之间的映射关系，比如`Route`和`Switch`（以`Route`为代表）

路由器：为新的路径匹配它对应的逻辑，比如`BrowserRouter`和`HashRouter`，根据`Route`定义出来的映射关系

负责感知路由的变化并作出反应的路由器，是整个路由系统中最为重要的一环。在`React-Router`中支持两种路由规则：`HashRouter`和`BrowserRouter`分别对应了`hash`和`history`两种背后模式，

在react-router源码中，HashRouter 调用 `createHashHistory`，History调用`createBrowserHistory`

`createHashHistory`通过使用hash tag(#) 来处理形如`https://www.huamu.com/#index`的 URL，即通过 URL 的 hash 属性来控制路由跳转

`createBrowserHistory` 它将在浏览器中使用 HTML 5 的 history API 来处理形如 `https://www.huamu.com/index`的 URL，即通过 HTML 5的 history API 来控制路由跳转

### 手写自定义hook，实现切换状态

```react
function SomeComponent() {
  const [state, toggleState] = useToggle(false);
  return <div>
    {state ? 'true' : 'false'}
    <button onClick={toggleState}></button>
  </div>
}

// 请实现 useToggle
function useToggle(initialValue) {
    const [value, setValue] = useState(initialValue);
    const toggle = () => {setValue(!value)};
    return [value, toggle];
}
```

### React Node与React Element的区别

在react的ts声明文件中有

```typescript
type ReactText = string | number;
type ReactChild = ReactElement | ReactText;

interface ReactNodeArray extends Array<ReactNode> {}
type ReactFragment = {} | ReactNodeArray;
type ReactNode = ReactChild | ReactFragment | ReactPortal | boolean | null | undefined;
```

ReactNode 是一个联合类型，其中的类型包括 ReactChild、ReactFragment、ReactPortal、boolean、null 以及 undefined。

在 ReactNode 的联合类型中，ReactChild 这个类型也是一个联合类型，该类型为 ReactElement 或者 ReactText。

也就是 ReactElement 这个类型只不过是 ReactNode 这个类型的一个子类型

然后看一下ReactElement 这个类型

```typescript
interface ReactElement<P = any, T extends string | JSXElementConstructor<any> = string | JSXElementConstructor<any>> {
        type: T;
        props: P;
        key: Key | null;
    }
```

ReactElement是一个接口，其中有 type、props、key 这三个属性

`JSX.Element` 通过执行 React.createElement 或是转译 JSX 获得

```typescript
const jsx = <div>hello</div>
const ele = React.createElement("div", null, "hello");
<p> // <- ReactElement = JSX.Element
  <Custom> // <- ReactElement = JSX.Element
    {true && "test"} // <- ReactNode
  </Custom>
</p>
```

JSX.Element 是一个 ReactElement，其 props 和 type 的泛型被设置为 any。之所以存在 JSX.Element 是因为不同的库实现 JSX 的方式不同，也就是说 JSX 是一个全局的命名空间，通过不同的库来设置，React 的设置如下：

```typescript
declare global {
  namespace JSX {
    interface Element extends React.ReactElement<any, any> { }
  }
}
```

可以得出 ReactElement 是 ReactNode 的一个子集。而在React 中 JSX.Element 和 ReactElement 是几乎等价的。在 React 中实现 JSX.Element 的方式就是 ReactElement

这样子在写React高级组件的时候就可以使用React Element来实现对props类型的控制

```react
import React, {FunctionComponent, ReactElement } from 'react';

const FatherComponent: React.FC<{children: ReactElement}> = ({children}) => {
	const newChildren = React.cloneElement(children, {age: 18})
  return <div> { newChildren }</div>
}

const SonComponent: React.FC<{name: string}> = (props) => {
  console.log(props)
  return <div>hello world</div>
}

const App: React.FC = () => {
  return (
  	<div>
    	<FatherComponent>
      	<SonComponent name={'hello world'}></SonComponent>
      </FatherComponent>
    </div>
  )
}

export default App;
```

## React优化

https://juejin.cn/post/6935584878071119885

### 懒渲染react-visibility-observer

当组件进入可视区域才渲染组件，如modal/drawer这种需要用户操作才会出现的组件。

使用react-visibility-observer监听

```react
import VisibilityObserver,{useVisibilityObserver,} from "react-visibility-observer"

const VisibilityObserverChildren = ({callback,children}) =>{
  const {isVisible} = useVisibilityObserver()
  useEffect(()=>{
    callback(isVisible)
  },[callback,isVisible])
  
  return <>{children}</>
}
```



