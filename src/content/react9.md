---
title: React（七）
date: 2020-06-02 21:40:33
categories: IT
tags:
    - IT，Web,Node，React
toc: true
thumbnail: https://cdn.kunkunzhang.top/redux.jpeg
---

​      前端框架，快速开发页面，函数式编程，与后端api快速搭建

<!--more-->

## react库

### chakra-UI



### Material-UI

推出很久 很好用

### Elastic-UI



### rsuitejs

Charts.rsuite.js



### blueprint.js



### NextUI

看起来很好看



### HeadlessUI

tailwind的公司开源的UI库



### geist-ui



### react-icons

包含比较流行的icons

安装

```shell
npm install react-icons --save
```

使用

```react
import { FaBeer } from 'react-icons/fa';

class Question extends React.Component {
    render() {
        return <h3> Lets go for a <FaBeer />? </h3>
    }
}
```

https://github.com/react-icons/react-icons

### swr

swr是用于数据请求的react hooks库。SWR 由 [Next.js](https://nextjs.org/)（React 框架）背后的同一团队创建

“SWR” 这个名字来自于 `stale-while-revalidate`：一种由 [HTTP RFC 5861](https://tools.ietf.org/html/rfc5861) 推广的 HTTP 缓存失效策略。这种策略首先从缓存中返回数据（过期的），同时发送 fetch 请求（重新验证），最后得到最新数据。

安装

```shell
npm install swr
```

对于返回 JSON 数据的普通 RESTful APIs，首先需要创建一个 `fetcher` 函数，这个函数只是原生 `fetch` 的包装

```javascript
const fetcher = (...args) => fetch(...args).then((res) => res.json())
```

然后在组件中使用useSWR使用数据

```react
import useSWR from "swr";

function Profile() {
  const { data, error } = useSWR("/api/user/123", fetcher)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  // 渲染数据
  return <div>hello {data.name}!</div>
}
```



### echarts-for-react

安装

```shell
npm install --save echarts-for-react
```

使用

```react
import React from 'react';
import ReactECharts from 'echarts-for-react';  // or var ReactECharts = require('echarts-for-react');

<ReactECharts
  option={this.getOption()}
  notMerge={true}
  lazyUpdate={true}
  theme={"theme_name"}
  onChartReady={this.onChartReadyCallback}
  onEvents={EventsDict}
  opts={}
/>
```



### @monaco-editor/react

在页面内插入文本编辑器，可以提供代码高亮、错误提示等功能

```shell
npm install @monaco-editor/react 
```

使用

```javascript
import Editor, { DiffEditor, useMonaco, loader } from "@monaco-editor/react";

function App() {
  const editorRef = useRef(null);

  useEffect(() => {
    if (monaco) {
      console.log("here is the monaco isntance:", monaco);
    }
  }, [monaco]);
  
  function handleEditorWillMount(monaco) {
    // here is the monaco instance
    // do something before editor is mounted
    monaco.languages.typescript.javascriptDefaults.setEagerModelSync(true);
  }
  
  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor; 
  }
  
  function handleEditorChange(value, event) {
    console.log("here is the current model value:", value);
  }
  
  function showValue() {
    alert(editorRef.current.getValue());
  }

  return (
   <>
     <button onClick={showValue}>Show value</button>
     <Editor
       height="90vh"
       defaultLanguage="javascript"
       defaultValue="// some comment"
       beforeMount={handleEditorWillMount}
       onMount={handleEditorDidMount}
			 onChange={handleEditorChange}
     />
   </>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
```





### classnames

当react原生动态添加多个className时就会报错，这时我们就可以利用classnames库添加多个className,这也是react官方推荐使用

安装

```shell
npm install classnames --save
```

支持动态导入

```react
import classnames from 'classnames'

<div className=classnames({
    'class1': true,
    'class2': true
    )>
</div>    
```

支持class动态传入变量，或者传入数组

```react
import classNames from 'classnames';

render() {
  const classStr = classNames({
    'class1': true,
    'class2': this.props.isCompleted,
    'class3': !this.props.isCompleted
    [a]: this.props.isCompleted
  });
  return (<div className={classStr}></div>);
}
```



### GraphQL

Apollo是基于GraphQL的全栈解决方案集合，包括了apollo-client和apollo-server，从后端到前端提供了对应的lib使得开发GraphQL更加方便

```toml
apollo-boost 包含启动阿波罗客户端的所有依赖
react-apollo 视图层面的集合
graph-tag 解析查询语句
graphql 也是解析查询语句
```



```react
import ApolloClient from 'apollo-boost' 

const client = new ApolloClient({
    uri: 'http://localhost:5000/graphql'
})

import { ApolloProvider,Query } from 'react-apollo'
import { Mutation,MutationFunc } from 'react-apollo'

```



```shell
npm install @apollo/client graphql
```



使用hooks



### react-hook-form

简单好看的react form表单

安装

```shell
npm install react-hook-form
```

使用

```react
import React from 'react';
import { useForm } from 'react-hook-form';

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('firstName')} /> {/* register an input */}
      <input {...register('lastName', { required: true })} />
      {errors.lastName && <p>Last name is required.</p>}
      <input {...register('age', { pattern: /\d+/ })} />
      {errors.age && <p>Please enter number for age.</p>}
      <input type="submit" />
    </form>
  );
}
```



### eventbus

安装

```shell
yarn add events
```



```javascript
//event.ts
import {EventEmitter} from 'events'
export default new EventEmitter()

//发布
import emitter from './event'

class Father extends React.Component {
  constructor(props){
    super(props)
  }
  handleClick = () =>{
    emitter.emit('info','来自father的info')
  }
}

export default Father
//订阅
//emitter.addListener()事件监听订阅
//emitter.removeListener()进行事件销毁，取消订阅
import emitter from './event'

class Son extends React.Component {
  constructor(props){
    super(props)
  }
}
```



### react-flow

安装

```shell
npm install --save react-flow-renderer
```

使用

```react
import React from 'react';
import ReactFlow from 'react-flow-renderer';

const elements = [
  { id: '1', type: 'input', data: {lable: 'Node 1'},position: {x: 250, y: 50}},
  { id: '2', data: {lable: <div>Node 2</div>}, position: {x: 100, y: 100}},
  { id: 'el-2', source: '1', targetL '2', animated: true}
]

export default ()=> <ReactFlow elements={elements}></ReactFlow>
```

React Flow有两个背景变体：点和线。您可以通过将其作为子级传递给`ReactFlow`组件来使用它

```react
import ReactFlow, { Background } from 'react-flow-renderer';

const FlowWithBackground = () => (
  <ReactFlow elements={elements}>
    <Background
      variant="dots"
      gap={12}
      size={4}
    />
  </ReactFlow>
);
```

可以通过将mini-map插件作为子级传递给`ReactFlow`组件来使用它：

```react
import ReactFlow, { MiniMap } from 'react-flow-renderer';

const FlowWithMiniMap = () => (
  <ReactFlow elements={elements}>
    <MiniMap
      nodeColor={(node) => {
        switch (node.type) {
          case 'input': return 'red';
          case 'default': return '#00ff00';
          case 'output': return 'rgb(0,0,255)';
          default: return '#eee';
        }
      }}
    />
  </ReactFlow>
);
```

控制面板包含zoom-in、zoom-out、fit-view和一个锁定/解锁按钮。

```react
import ReactFlow, { Controls } from 'react-flow-renderer';

const FlowWithControls = () => (
  <ReactFlow elements={elements}>
    <Controls />
  </ReactFlow>
);
```

如果需要访问`ReactFlow`组件外部的React Flow的内部状态和操作，可以用`ReactFlowProvider`组件包装它

```react
import ReactFlow, { ReactFlowProvider } from 'react-flow-renderer';

const FlowWithOwnProvider = () => (
  <ReactFlowProvider>
    <ReactFlow
      elements={elements}
      onElementClick={onElementClick}
      onConnect={onConnect}
    />
  </ReactFlowProvider>
);
```

https://www.5axxw.com/wiki/content/obkffc

### react-children-utilities

返回组件中的文字

```shell
npm install --save react-children-utilities
```

使用

```react
import React from 'react';
import Children from 'react-children-utilities';

const MyComponent = ({ children }) => {
  const onlySpans = Children.filter(children, (child) => child.type === 'span');
  return <div>{onlySpans}</div>;
};
```

其他api：

 https://www.npmjs.com/package/react-children-utilities

### react-beautiful-dnd



```react
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

class DraggableTags extends Component {
  render() {
    return (
    	<DragDropContext onDragEnd={this.onDragEnd}>
      	<Droppable droppableId="droppable" direction="horizontal">
          {(provided, _snapshot)=> (
            <Draggable>
							{(provided, _snapshot)=> (
              	style={
                  
                }
              )}
            </Draggable>
          )}
        </Droppable>
      </DragDropContext>
    )
  }
}
```





### react-dnd



Https://juejin.cn/post/6933036276660731912　



### dnd-kit

react拖动组件

```shell
npm install @dnd-kit/core
```

拖动排序组件

```shell
npm install @dnd-kit/sortable
```

使用

```react
import React, {useState} from 'react';
import {DndContext} from '@dnd-kit/core';

import {Droppable} from './Droppable';
import {Draggable} from './Draggable';

function App() {
  const [isDropped, setIsDropped] = useState(false);
  const draggableMarkup = (
    <Draggable>Drag me</Draggable>
  );
  
  return (
    <DndContext onDragEnd={handleDragEnd}>
      {!isDropped ? draggableMarkup : null}
      <Droppable>
        {isDropped ? draggableMarkup : 'Drop here'}
      </Droppable>
    </DndContext>
  );
  
  function handleDragEnd(event) {
    if (event.over && event.over.id === 'droppable') {
      setIsDropped(true);
    }
  }
}

// Droppable.jsx
import React from 'react';
import {useDroppable} from '@dnd-kit/core';

export function Droppable(props) {
  const {isOver, setNodeRef} = useDroppable({
    id: 'droppable',
  });
  const style = {
    color: isOver ? 'green' : undefined,
  };
  
  
  return (
    <div ref={setNodeRef} style={style}>
      {props.children}
    </div>
  );
}

// Draggable.jsx
import React from 'react';
import {useDraggable} from '@dnd-kit/core';

export function Draggable(props) {
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: 'draggable',
  });
  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  
  return (
    <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {props.children}
    </button>
  );
}
```





### fullcalendar

基于日历的拖动组件

安装

```shell
$ npm install @fullcalendar/core @fullcalendar/daygrid @fullcalendar/timegrid @fullcalendar/list
```

使用

```react
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
...
let calendar = new Calendar(calendarEl, {
  plugins: [ dayGridPlugin, timeGridPlugin, listPlugin ],
  initialView: 'dayGridMonth',
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,listWeek'
  }
});

var calendar = new Calendar(calendarEl, {
  dateClick: function() {
    alert('a day has been clicked!');
  }
});
```

时间线插件

安装

```shell
npm install --save @fullcalendar/core @fullcalendar/resource-timeline
```

使用

```react
import { Calendar } from '@fullcalendar/core';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
...
let calendar = new Calendar(calendarEl, {
  plugins: [ resourceTimelinePlugin ],
  initialView: 'resourceTimeline',
  resources: [
    // your resource list
  ]
});
```



https://github.com/fullcalendar/fullcalendar



### react-intl-universal

不建议使用react-intl，而使用React-intl-universal实现

建立英文和中文语言包,可以是json或者js文件

```javascript
const en_US = {
  'hello':'nihao',
  'name': 'zhangsan',
  'age': '30',
  'changelang': 'qiehuanyuyan',
}

export default en_US
```

中文包

```js
const zh_CN = {
  'hello':'nihao',
  'name': 'zhangsan',
  'age': '30',
  'changelang': 'qiehuanyuyan',
}

export default zh_CN
```

使用

```react
import intl from 'react-intl-universal'
import cn from '../../assets/locals/zh-CN'
import us from '../../assets'

class IntlExample extends React.Component{
  constructor(){
    super();
    this.locals = {
      'zh_CN': cn,
      'en_US': us
    }
    this.state = {
      intl: cn
    }
  }
  
  componentDidMount() {
    this.initLocale();
  }
  initLocale(locale="zh_CN"){
    
  }
}
```



### react-hot-loader

React-Hot-Loader 使用了 Webpack HMR API，针对 React 框架实现了对单个 component 的热替换，并且能够保持组件的 state。
React-Hot-Loader 在编译时会在每一个 React component 外封装一层，每一个这样的封装都会注册自己的 module.hot.accept 回调，它们会监听每一个 component 的更新，在当前 component 代码更新时只替换自己的模块，而不是整个替换 root component。
同时，React-Hot-Loader 对 component 的封装还会代理 component 的 state，所以当 component 替换之后依然能够保持之前的 state。

安装

```shell
npm install --save-dev react-hot-loader
```

 hot-loader 是基于 webpack-dev-server，所以还得安装 webpack-dev-server

```shell
npm install --save-dev webpack-dev-server
```

首先还是要让 webpack-dev-server 打开。

```javascript
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true
}).listen(3000, 'localhost', function (err, result) {
  if (err) {
    return console.log(err);
  }

  console.log('Listening at http://localhost:3000/')
});
```

然后在 webpack 的配置文件里添加 react-hot-loader。

```javascript
var webpack = require('webpack');

module.exports = {
  // 修改 entry
  entry: [
    // 写在入口文件之前
    "webpack-dev-server/client?http://0.0.0.0:3000",
    "webpack/hot/only-dev-server",
    // 这里是你的入口文件
    "./src/app.js",
  ],
  output: {
    path: __dirname,
    filename: "build/js/bundle.js",
    publicPath: "/build"
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        // 在这里添加 react-hot，注意这里使用的是loaders，所以不能用 query，应该把presets参数写在 babel 的后面
        loaders: ['react-hot', 'babel?presets[]=react,presets[]=es2015']
      }
    ]
  },
  // 添加插件
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
```



### react-hot-toast

全屏的通知组件

安装

```shell
npm install react-hot-toast
```

使用

```react
import toast, { Toaster } from 'react-hot-toast';

const notify = () => toast('Here is your toast.');

const App = () => {
  return (
    <div>
      <button onClick={notify}>Make me a toast</button>
      <Toaster />
    </div>
  );
};
```



### remotion

用react写video

使用

```react
import { useCurrentFrame } from "remotion";
 
export const MyVideo = () => {
  const frame = useCurrentFrame();
 
  return (
    <div
      style={{
        flex: 1,
        textAlign: "center",
        fontSize: "7em",
      }}
    >
      The current frame is {frame}.
    </div>
  );
};
```

配置帧数

```react
import { useVideoConfig } from "remotion";
 
export const MyVideo = () => {
  const { fps, durationInFrames, width, height } = useVideoConfig();
 
  return (
    <div
      style={{
        flex: 1,
        textAlign: "center",
        fontSize: "7em",
       }}
      >
      This {width}px x {height}px video is {durationInFrames / fps} seconds long.
    </div>
  );
};
```

### react-player

react视频播放组件，比原生的h5 video标签好用

安装

```shell
npm install react-player # or yarn add react-player
```

使用

```react
import React, {useEffect} from 'react'
import ReactPlayer from 'react-player'

const App = () => {
  
  useEffect(() => {
    ReactPlayer.canPlay(url)
  },[url])

  return <ReactPlayer url={url} light="xxx.jpg" onReady={} onError={} />
}
```

https://cookpete.com/react-player/

### react-motion





### uuid

uuid是通用唯一识别码(Universally Unique Identifier)的缩写。是一种软件建构辨准，亦为开发软件基金会组织在分布式计算环境领域的一部分。其目的是让分布式系统中的所有元素具有唯一的辨识信息，而不需要通过中央控制端来做辨识信息的指定。

UUID由一组32位数的16进制数字构成。对于UUID，就算每纳秒产生一百万个UUID，要花100亿年才会将所有UUID用完。

格式

uuid32个16进制数字用连字号分成五组来显示，所以共有36个字符

UUID版本通过M表示，当前规范有5个版本，可选值为1、2、3、4、5，这5个版本使用不同的算法，利用不同的信息产生UUID，各版本有各版本的优势，具体来说：

uuid.v1()：创建版本1(时间戳)UUID

uuid.v3()：创建版本3(md5命名空间)UUID

uuid.v4()：创建版本4(随机)UUID

uuid.v5()：创建版本5(带SHA-1的命名空间)IIOD

安装

```shell
npm install uuid 
```

使用

```javascript
import { v4 as uuidv4} from 'uuid'

uuidv4()
```

可以使用uuid进行验证登陆,未登陆状态下生产uuid

```javascript
let uuid = sessionStorage.getItem('uuid')
if(!uuid){
  sessionStorage.setItem('uuid')
}

if(getToken()){
  sessionStorage.removeItem('uuid');
}else {
  let uuid = sessionStorage.getItem('uuid');
  if(!uuid){
    sessionStorage.setItem('uuid',uuidv4());
  }
}
```



### react-sortable-hoc

拖动排序

安装

```shell
npm install react-sortable-hoc --save
```

使用

```react
import React, {Component} from 'react';
import {render} from 'react-dom';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import arrayMove from 'array-move';

const SortableItem = SortableElement(({value}) => <li>{value}</li>);

const SortableList = SortableContainer(({items}) => {
  return (
    <ul>
      {items.map((value, index) => (
        <SortableItem key={`item-${value}`} index={index} value={value} />
      ))}
    </ul>
  );
});

class SortableComponent extends Component {
  state = {
    items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6'],
  };
  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState(({items}) => ({
      items: arrayMove(items, oldIndex, newIndex),
    }));
  };
  render() {
    return <SortableList items={this.state.items} onSortEnd={this.onSortEnd} />;
  }
}

render(<SortableComponent />, document.getElementById('root'));
```

参数说明：

axis: 拖动时的轴。默认为y，当需要有多个方向时需要指定为xy

lockAxis：锁定子项目拖动的轴，可以为x或者y

useDragHandle：使用拖动图标。不是整个子项拖动



### K-bar

k-bar可以给react部署的站点提供一个舒服的搜索框样式

安装

```shell
npm install kbar
```

使用

```react
import {
  KBarProvider,
  KBarPortal,
  KBarPositioner,
  KBarAnimator,
  KBarSearch,
  useMatches,
  NO_GROUP
} from "kbar";

function MyApp() {
  const actions = [
    {
      id: "blog",
      name: "Blog",
      shortcut: ["b"],
      keywords: "writing words",
      perform: () => (window.location.pathname = "blog"),
    },
    {
      id: "contact",
      name: "Contact",
      shortcut: ["c"],
      keywords: "email",
      perform: () => (window.location.pathname = "contact"),
    },
  ]
  
  return (
    <KBarProvider actions={actions}>
      <KBarPortal> // Renders the content outside the root node
        <KBarPositioner> // Centers the content
          <KBarAnimator> // Handles the show/hide and height animations
            <KBarSearch /> // Search input
            <RenderResults />;
          </KBarAnimator>
        </KBarPositioner>
      </KBarPortal>
      <MyApp />
    </KBarProvider>;
  );
}
```

自定义搜索结果样式

```react
import {
  // ...
  KBarResults,
  useMatches,
  NO_GROUP,
} from "kbar";

function RenderResults() {
  const { results } = useMatches();

  return (
    <KBarResults
      items={results}
      onRender={({ item, active }) =>
        typeof item === "string" ? (
          <div>{item}</div>
        ) : (
          <div
            style={{
              background: active ? "#eee" : "transparent",
            }}
          >
            {item.name}
          </div>
        )
      }
    />
  );
}
```



### nanoid





### react-virtualized

使用

```react
import {AutoSizer, List, CellMeasurerCache, CellMeasurer} from 'react-virtualized'

// 宽度固定
const measureCache = new CellMeasurerCache({
    fixedWidth: true,
    minHeight: 60, 
})

// 每一行内容
const rowRenderer = ({ index, key, parent, style }) => {
    const item = records[index]

    return (
        <CellMeasurer cache={measureCache} key={key} parent={parent} rowIndex={index}>
            <div style={style}>
                content
            </div>
        </CellMeasurer>
    )
}

<AutoSizer>
    {({width, height}) => (
        <List
            width={width}
            height={height}
            deferredMeasurementCache={measureCache}
            rowCount={records.length}
            rowHeight={measureCache.rowHeight}
            rowRenderer={rowRenderer}
            className={styles.list}
        />
    )}
</AutoSizer>
```

无限滚动 + 可编辑表格

```react
import {Table, Column} from 'react-virtualized'
import {Input, Empty} from 'antd'

// 防止Input组件不必要的渲染
const MemoInput = React.memo(function (props) {
    const {rowIndex, field, handleFieldChange, ...restProps} = props
    return <Input {... restProps} onChange={(e) => handleFieldChange(field, e, rowIndex)} />
})

function VirtualTable(props) {
    // ...

    // 列, 使用useCallback优化
    const nameColumn = ({cellData, rowIndex, dataKey }) => {
        // ...
        return (
            <div>
                <MemoInput
                    placeholder="请输入姓名"
                    value={cellData}
                    rowIndex={rowIndex}
                    field="姓名"
                    handleFieldChange={handleFieldChange}
                />
            </div>
        )
    }
    
    // 表头
    const columnHeaderRenderer = useCallback(({dataKey}) => dataKey, [])

    const rowGetter = useCallback(({index}) => dataSource[index], [dataSource])

    const noRowsRenderer = useCallback(() => <Empty className={styles.empty} />, [])

    return <Table
        ref={tableRef}
        className={styles.virtualTable}
        headerClassName={styles.header}
        rowClassName={styles.row}
        headerHeight={TableHeaderHeight}
        width={TableWidth}
        height={TableHeight}
        noRowsRenderer={noRowsRenderer}
        rowHeight={TableRowHeight}
        rowGetter={rowGetter}
        rowCount={dataSource.length}
        overscanRowCount={OverscanRowCount}
    >
        <Column
            width={120}
            dataKey="姓名"
            headerRenderer={columnHeaderRenderer}
            cellRenderer={nameColumn}
        />
    </Table>
}
```



### react-window

react虚拟列表库 
React Window是一个有效呈现大型列表和表格数据的组件，是React-virtualized的完全重写。

React Window专注于使软件包更小，更快，同时API（和文档）对初学者尽可能友好。

安装

```shell
npm i react-window
```

固定高度列表

```react
import { FixedSizeList as List } from 'react-window';

const Row = ({ index, style }) => (
  <div style={style}>Row {index}</div>
);

const Example = () => (
  <List
    height={150}
    itemCount={1000}
    itemSize={35}
    width={300}
  >
    {Row}
  </List>
);
```

VariableSizeList （可变尺寸列表）

```react
import { VariableSizeList } from 'react-window';
 
const rowHeights = new Array(1000)
  .fill(true)
  .map(() => 25 + Math.round(Math.random() * 50));
 
const getItemSize = index => rowHeights[index]; // 此处采用随机数作为每个列表项的高度
 /** 
    * 每个列表项的组件
    * @param index：列表项的下标；style：列表项的样式（此参数必须传入列表项的组件中，否则会出现滚动到下方出现空白的情况）
    **/ 
const Row = ({ index, style }) => (
  <div style={style}>Row {index}</div>
);
 
const Example = () => (
  <VariableSizeList
    height={150} // 列表可视区域的高度
    itemCount={1000} // 列表数据长度
    itemSize={getItemSize} // 设置列表项的高度
    layout= "vertical" // （vertical/horizontal） 默认为vertical，此为设置列表的方向
    width={300}
  >
    {Row}
  <VariableSizeList>
);
```

结合react-virtualized-auto-sizer使列表自适应当前页面的宽高

```react
import { FixedSizeList } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
const Example = () => (
  <AutoSizer>
    {({ height, width }) => (
      <FixedSizeList
        className="List"
        height={height}
        itemCount={1000}
        itemSize={35}
        width={width}
      >
        {Row}
      </FixedSizeList>
    )}
  </AutoSizer>
);
```

### react-virtuoso

虚拟列表/表格库

安装

```shell
npm install react-virtuoso
```

使用

```react
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Virtuoso } from 'react-virtuoso'

const App = () => {
  return <Virtuoso style={{ height: '400px' }} totalCount={200} itemContent={index => <div>Item {index}</div>} />
}

ReactDOM.render(<App />, document.getElementById('root'))
```



### react-sticky

让组件实现类似position-sticky的效果

安装

```shell
npm install react-sticky
```

使用

```react
import React from 'react';
import { StickyContainer, Sticky } from 'react-sticky';

class App extends React.Component {
  render() {
    return (
      <StickyContainer>
        {/* Other elements can be in between `StickyContainer` and `Sticky`,
        but certain styles can break the positioning logic used. */}
        <Sticky>
          {({
            style,
 
            // the following are also available but unused in this example
            isSticky,
            wasSticky,
            distanceFromTop,
            distanceFromBottom,
            calculatedHeight
          }) => (
            <header style={style}>
              {/* ... */}
            </header>
          )}
        </Sticky>
        {/* ... */}
      </StickyContainer>
    );
  },
}
```

sticky上可以添加不同的属性

```react
<StickyContainer>
  ...
  <Sticky topOffset={80} bottomOffset={80} disableCompensation>
    { props => (...) }
  </Sticky>
  ...
</StickyContainer>
```



### crypto-browserify

加密



### react-text-loop

react文字循环的小组件

安装

```shell
npm install react-text-loop
```

使用

```react
import TextLoop from "react-text-loop";
import Link from "react-router";
import { BodyText } from "./ui";

class App extends Component {
    render() {
        return (
            <h2>
                <TextLoop>
                    <span>First item</span>
                    <Link to="/">Second item</Link>
                    <BodyText>Third item</BodyText>
                </TextLoop>{" "}
                and something else.
            </h2>
        );
    }
}
```



### js-cookie

cookie插件

```shell
npm install js-cookie --save
```

引用

```javascript
import Cookies from 'js-cookie'

//设置cookie
Cookies.set('name','value',{expire:7,path:''}); //7天过期
Cookies.set('name',{foo:'bar'}); //设置一个json
//获取cookie
Cookies.get('name'); //获取cookie
Cookies.get();  //读取所有cookie

//删除cookie
Cookies.remove('name'); //删除cookie
```



### react-color

react-color是一个拾色器，通过它获取颜色值

安装

```shell
npm i react-color -S
```

使用

```react
import { TwitterPicker } from 'react-dom'

function () {
  render() {
    <TwitterPicker 
      width="240px"
      
      />
  }
}
```



### react-lazyload

安装

```shell
npm install --save react-lazyload
```

懒加载图片

```react
import React from 'react';
import ReactDOM from 'react-dom';
import LazyLoad from 'react-lazyload';
import MyComponent from './MyComponent';

const App = () => {
  return (
    <div className="list">
      <LazyLoad height={200}>
        <img src="tiger.jpg" /> /*
                                  Lazy loading images is supported out of box,
                                  no extra config needed, set `height` for better
                                  experience
                                 */
      </LazyLoad>
      <LazyLoad height={200} once >
                                /* Once this component is loaded, LazyLoad will
                                 not care about it anymore, set this to `true`
                                 if you're concerned about improving performance */
        <MyComponent />
      </LazyLoad>
      <LazyLoad height={200} offset={100}>
                              /* This component will be loaded when it's top
                                 edge is 100px from viewport. It's useful to
                                 make user ignorant about lazy load effect. */
        <MyComponent />
      </LazyLoad>
      <LazyLoad>
        <MyComponent />
      </LazyLoad>
    </div>
  );
};

ReactDOM.render(<App />, document.body);
```

默认懒加载组件

```react
import { lazyload } from 'react-lazyload';

@lazyload({
  height: 200,
  once: true,
  offset: 100
})
class MyComponent extends React.Component {
  render() {
    return <div>this component is lazyloaded by default!</div>;
  }
}
```



### react-imported-component

懒加载组件，相似组件有React.lazy react-loadable @loadable/component

使用预加载

```react
import importedComponent from 'react-imported-component';
const Component = importedComponent( () => import('./Component'));

const Component = importedComponent( () => import('./Component'), {
  LoadingComponent: Spinner, // what to display during the loading
  ErrorComponent: FatalError // what to display in case of error
});

Component.preload(); // force preload

// render it
<Component... />
```

懒加载与React.lazy基本相同

```react
import { lazy, LazyBoundary } from 'react-imported-component';
const Component = lazy(() => import('./Component'));

const ClientSideOnly = () => (
  <Suspense>
    <Component />
  </Suspense>
);

// or let's make it SSR friendly
const ServerSideFriendly = () => (
  <LazyBoundary>
    {' '}
    // LazyBoundary is Suspense* on the client, and "nothing" on the server
    <Component />
  </LazyBoundary>
);
```

hooks

```react
import {useImported} from 'react-imported-component'

const MyCalendarComponent = () => {
  const {
      imported: moment,
      loading
    } = useImported(() => import("moment"));

  return loading ? "..." : <span>today is {moment(Date.now).format()}</span>
}

// or we could make it a bit more interesting...

const MyCalendarComponent = () => {
  const {
      imported: format  = x => "---", // default value is used while importing library
    } = useImported(
      () => import("moment"),
      moment => x => moment(x).format // masking everything behind
    );

  return <span>today is {format(Date.now())</span>
}
```



### Ladda

按钮组件

安装

```shell
npm install ladda
```

使用

```react
import * as Ladda from 'ladda';

// Create a new instance of ladda for the specified button
var l = Ladda.create(document.querySelector('.my-button'));

// Start loading
l.start();

// Will display a progress bar for 50% of the button width
l.setProgress(0.5);

// Stop loading
l.stop();

// Toggle between loading/not loading states
l.toggle();

// Check the current state
l.isLoading();

// Delete the button's ladda instance
l.remove();
```

### redux-form

使用redux中的state管理form

```shell
npm install --save redux-form
```

使用

创建form的reducer

```react
import { createStore, combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

const rootReducer = combineReducers({
  // ...your other reducers here
  // you have to pass formReducer under 'form' key,
  // for custom keys look up the docs for 'getFormState'
  form: formReducer
})
```

使用reducer

```react
import React from 'react'
import { Field, reduxForm } from 'redux-form'

let ContactForm = props => {
  const { handleSubmit } = props
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="firstName">First Name</label>
        <Field name="firstName" component="input" type="text" />
      </div>
      <div>
        <label htmlFor="lastName">Last Name</label>
        <Field name="lastName" component="input" type="text" />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <Field name="email" component="input" type="email" />
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}

ContactForm = reduxForm({
  // a unique name for the form
  form: 'contact'
})(ContactForm)
```

在外部的组件中使用该form组件

```react
import React from 'react'
import ContactForm from './ContactForm'

class ContactPage extends React.Component {
  submit = values => {
    // print the form values to the console
    console.log(values)
  }
  render() {
    return <ContactForm onSubmit={this.submit} />
  }
}
```

### Formik

安装

```shell
npm install formik --save
```

使用

```react
 // Render Prop
 import React from 'react';
 import { Formik, Form, Field, ErrorMessage } from 'formik';
 
 const Basic = () => (
   <div>
     <h1>Any place in your app!</h1>
     <Formik
       initialValues={{ email: '', password: '' }}
       validate={values => {
         const errors = {};
         if (!values.email) {
           errors.email = 'Required';
         } else if (
           !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
         ) {
           errors.email = 'Invalid email address';
         }
         return errors;
       }}
       onSubmit={(values, { setSubmitting }) => {
         setTimeout(() => {
           alert(JSON.stringify(values, null, 2));
           setSubmitting(false);
         }, 400);
       }}
     >
       {({ isSubmitting }) => (
         <Form>
           <Field type="email" name="email" />
           <ErrorMessage name="email" component="div" />
           <Field type="password" name="password" />
           <ErrorMessage name="password" component="div" />
           <button type="submit" disabled={isSubmitting}>
             Submit
           </button>
         </Form>
       )}
     </Formik>
   </div>
 );
 
 export default Basic;
```

### Yup

验证器，用在form上

使用

```react
import { object, string, number, date, InferType } from 'yup';

let userSchema = object({
  name: string().required(),
  age: number().required().positive().integer(),
  email: string().email(),
  website: string().url().nullable(),
  createdOn: date().default(() => new Date()),
});

// parse and assert validity
const user = await userSchema.validate(await fetchUser());

type User = InferType<typeof userSchema>;
/* {
  name: string;
  age: number;
  email?: string | undefined
  website?: string | null | undefined
  createdOn: Date
}*/
```



### Million.js

Millionjs是一个轻量级的虚拟DOM库。

据开发者称像React和Svelte的结合体，不需要编译

安装

```shell
npm install million
```

使用

m()函数创建虚拟dom，render()渲染

```react
import { m, className, style } from 'million';

const vnode = m('div', { key: 'foo' }, ['Hello World']);

const vnode = m(
  'div',
  {
    className: className({ class1: true, class2: false, class3: 1 + 1 === 2 }),
    style: style({ color: 'black', 'font-weight': 'bold' }),
  },
  ['Hello World'],
);

import { _, m, render } from 'million';

let seconds = 0;

setInterval(() => {
  render(document.body, m(vnode));
  seconds++;
}, 1000);
```

createElement创建元素

```react
import { m, createElement, Flags } from 'million';

const vnode = m(
  'div',
  { id: 'app' },
  ['Hello World'],
  Flags.ELEMENT_TEXT_CHILDREN,
);
const el = createElement(vnode);

document.body.appendChild(el);
```

#### 适配jsx

在.bablerc中配置插件

```rc
{
  "plugins": [
    [
      "@babel/plugin-transform-react-jsx",
      {
        "runtime": "automatic",
        "importSource": "million"
      }
    ]
  ]
}
```

### toast-ui-Editor

Markdown js编辑器

有纯js 版本、react版本和vue版本

安装

```shell
npm install --save @toast-ui/react-editor
```

使用

```javascript
import '@toast-ui/editor/dist/toastui-editor.css';

import { Editor } from '@toast-ui/react-editor';

class MyComponent extends React.Component {
  editorRef = React.createRef();

  handleClick = () => {
    this.editorRef.current.getInstance().exec('Bold');
  };

  handleFocus = () => {
    console.log('focus!!');
  };
  render() {
    return (
      <>
        <Editor
          previewStyle="vertical"
          height="400px"
          initialEditType="markdown"
          initialValue="hello"
          ref={this.editorRef}
  				onFocus={this.handleFocus}
        />
        <button onClick={this.handleClick}>make bold</button>
      </>
    );
  }
}
```

### HyperFormula

像excel一样操作数据，适合特殊场景下

安装

```shell
npm install hyperformula
```

使用

```javascript
import { HyperFormula } from 'hyperformula';

// define the options
const options = {
  licenseKey: 'gpl-v3',
};

// define the data
const data = [['10', '20', '30', '=SUM(A1:C1)']];

// build an instance with defined options and data 
const hfInstance = HyperFormula.buildFromArray(data, options);

// call getCellValue to get the calculation results
const mySum = hfInstance.getCellValue({ col: 3, row: 0, sheet: 0 });

// print the result in the browser's console
console.log(mySum);
```

### react-grid-layout

react拖动布局组件

安装

```shell
npm install react-grid-layout
```

使用

```react
import GridLayout from "react-grid-layout";

class MyFirstGrid extends React.Component {
  render() {
    // layout is an array of objects, see the demo for more complete usage
    const layout = [
      { i: "a", x: 0, y: 0, w: 1, h: 2, static: true },
      { i: "b", x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
      { i: "c", x: 4, y: 0, w: 1, h: 2 }
    ];
    return (
      <GridLayout
        className="layout"
        layout={layout}
        cols={12}
        rowHeight={30}
        width={1200}
      >
        <div key="a">a</div>
        <div key="b">b</div>
        <div key="c">c</div>
      </GridLayout>
    );
  }
}
```

### unimported

检查当前代码系统中没有被引用的文件

```shell
$ npx unimported
```

https://www.npmjs.com/package/unimported

### why-did-you-render

检查react代码，避免不必要的渲染，可以使用在react16 react17和react18， RN中也同样可以使用

安装

```shell
npm install @welldone-software/why-did-you-render --save-dev
```

使用

创建一个wdyr.js, 并在应用的最开始引入

```javascript
import React from 'react';

if (process.env.NODE_ENV === 'development') {
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  whyDidYouRender(React, {
    trackAllPureComponents: true,
  });
}
```



### deku

虚拟dom库

安装

```shell
npm install --save deku
```

使用

```react
/** @jsx element */
import {element, createApp} from 'deku'
import {createStore} from 'redux'
import reducer from './reducer'

// Dispatch an action when the button is clicked
let log = dispatch => event => {
  dispatch({
    type: 'CLICKED'
  })
}

// Define a state-less component
let MyButton = {
  render: ({ props, children, dispatch }) => {
    return <button onClick={log(dispatch)}>{children}</button>
  }
}

// Create a Redux store to handle all UI actions and side-effects
let store = createStore(reducer)

// Create an app that can turn vnodes into real DOM elements
let render = createApp(document.body, store.dispatch)

// Update the page and add redux state to the context
render(
  <MyButton>Hello World!</MyButton>,
  store.getState()
)
```



### react-charts-2

react图表组件

```shell
pnpm add react-chartjs-2 chart.js
# or
yarn add react-chartjs-2 chart.js
# or
npm i react-chartjs-2 chart.js
```

使用

```react
import { Doughnut } from 'react-chartjs-2';

<Doughnut data={...} />
```



### await-to-js

捕获await的错误，相当于try-catch的语法糖

```shell
npm i await-to-js --save
```

使用

```javascript
import to from 'await-to-js';
// If you use CommonJS (i.e NodeJS environment), it should be:
// const to = require('await-to-js').default;

async function asyncTaskWithCb(cb) {
     let err, user, savedTask, notification;

     [ err, user ] = await to(UserModel.findById(1));
     if(!user) return cb('No user found');

     [ err, savedTask ] = await to(TaskModel({userId: user.id, name: 'Demo Task'}));
     if(err) return cb('Error occurred while saving task');

    if(user.notificationsEnabled) {
       [ err ] = await to(NotificationService.sendNotification(user.id, 'Task Created'));
       if(err) return cb('Error while sending notification');
    }

    if(savedTask.assignedUser.id !== user.id) {
       [ err, notification ] = await to(NotificationService.sendNotification(savedTask.assignedUser.id, 'Task was created for you'));
       if(err) return cb('Error while sending notification');
    }

    cb(null, savedTask);
}

async function asyncFunctionWithThrow() {
  const [err, user] = await to(UserModel.findById(1));
  if (!user) throw new Error('User not found');
  
}
```



### qs

解析路由 queryString

```javascript
var qs = require('qs');
var assert = require('assert');

var obj = qs.parse('a=c');
assert.deepEqual(obj, { a: 'c' });

var str = qs.stringify(obj);
assert.equal(str, 'a=c');
```

https://github.com/ljharb/qs



### 更多组件

在写前端的前两年，我总是热衷于找寻各种各样的组件，试图不断地充实自己使用过的组件库

但是随着前端技术的积累，我发现使用组件总是很简单的，难的是体会组件的设计思路、并能够自己根据实际情况进行修改

所以提醒自己还需潜心修炼js和多写不同场景的代码 只是沉迷组件的话。进步不大

https://ant.design/docs/react/recommendation-cn

Ant design站点下有推荐社区北京好的组件，可以在其中找到合适的组件使用
