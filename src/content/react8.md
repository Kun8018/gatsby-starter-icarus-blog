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

### 推荐的配置

https://github.com/tsconfig/bases

## Prettier

Prettier是

- 一个代码格式工具,支持基本主流前端的语言(js, ts, Es6, Es7,markdown等等)；
- 会根据书写的代码，重新解析和构建显示格式（即，它清除原来的格式，按照自己认为美丽的方式重新显示代码格式）
- Prettier 不会像EsLint，TsLint，StyleLint 那样告诉你，语法哪里错了，它只会告诉你代码这么写不美观

编写.prettierrc

```prettierrc
{
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 80,
  "overrides": [
    {
      "files": ".prettierrc",
      "options": { "parser": "json" }
    }
  ]
}
```



## stylelint

stylelint是现代化的前端项目中一个强大的代码检查工具。可以帮忙检查样式文件并在样式中强制执行约定。

stylelint 默认地能*解析*如下的非标准语法，包括Sass、Less 和 SugarSS，非标准语法可以从以下文件扩展名 `.sass`、`.scss`、`.less` 和 `.sss` 中自动推断出来。或者您也可以自己指定语法。

此外，在使用命令行界面或 Node.js 应用程序接口时，stylelint 可以接受任何[PostCSS兼容语法](https://github.com/postcss/postcss#syntaxes)。但请注意，stylelint 无法保证核心规则可以在上面列出的默认值以外的语法中正常工作



### lint-staged

lint-staged 是一个在git暂存文件上运行linters的工具，当然如果你觉得每次修改一个文件就给所有文件执行一次lint检查不恶心的话，这个工具对你来说就没有什么意义了，请直接关闭即可

```shell
npx mrm lint-staged
```

配置

在package.json中配置

```json
{
  "name": "My project",
  "version": "0.1.0",
  "scripts": {
    "my-custom-script": "linter --arg1 --arg2"
  },
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.{js}": [
      "eslint --cache --fix",
      "prettier --write"
    ],
    "*.css": [
      "stylelint --cache --fix",
      "prettier --write"
    ]
  }
}
```

使用`prettier`自动修复`javascript`、`typescript`、`markdown`、`HTML`或`CSS`的代码样式

```lint
{
  "*.{js,jsx,ts,tsx,md,html,css}": "prettier --write"
}
```

Stylelint用于具有默认值的CSS和具有SCSS语法的SCSS

```lint
{
  "*.css": "stylelint",
  "*.scss": "stylelint --syntax=scss"
}
```

自动修复代码

```lint
{
  "*.js": "eslint --fix"
}
```

过滤文件原则

Linter命令处理由glob模式定义的所有暂存文件的子集

如果全局模式不包含斜杠（`/`），matchBase则将启用micromatch的选项，因此无论目录如何，全局匹配文件的基本名称：

1. `"*.js"`将匹配所有JS文件，例如`/test.js`和`/foo/bar/test.js`
2. `"!(*test).js"`。将匹配所有以结尾的JS文件`test.js`，因此`foo.js`但不匹配`foo.test.js`

如果全局模式确实包含斜杠（`/`），则它也将与路径匹配：

1. `"./*.js"`将匹配git repo根目录中的所有JS文件，因此`/test.js`但不匹配`/foo/bar/test.js``
2. ``"foo/**/\*.js"`将匹配`/foo`目录中的所有JS文件，所以`/foo/bar/test.js`但不匹配`/test.js`

## JSdoc

JSDoc 是一个针对 JavaScript 的 API 文档生成器，类似于 Java 中的 Javadoc 或者 PHP 中的 phpDocumentor；在源代码中添加指定格式的注释，JSDoc 工具便会自动扫描你的代码并生成一个 API 文档网站（在指定目录下生成相关的网页文件）

生成 API 文档只是一方面，其更主要的贡献在于对代码注释格式进行了规范化

安装

```shell
npm install -g jsdoc
```

在js文件中写入对应的函数和注释

```javascript
/**
 * Returns the sum of a and b
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function sum(a, b) {
    return a + b;
}
/**
 * Return the diff fo a and b
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function diff(a, b) {
    return a - b;
}
```

然后就是在当前目录执行以下命令

```shell
jsdoc doc.js
```

最后就会在当前目录下生成一个名为 `out` 的目录（也可以另外指定），里面有包含接口文档的html页面

常用写法：

@description：也可写作 `@desc`，描述当前注释对象的详细信息

@file：注释写在文件开头，用于描述当前文件的相关信息

@class 描述一个 `class` 类

@returns 或者写作 `@return`，描述函数的返回值的信息；

@param 与 `@arg`, `@argument` 含义相同，描述一个函数的参数信息；

@function 与 `@func`, `@method` 含义相同，描述一个函数；

@todo 描述接下来准备做的事情；

@copyright 描述当前文件的版权相关信息

@file 注释写在文件开头，用于描述当前文件的相关信息

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



### CSS属性类型

有时候会在props或者state中使用css属性，这个时候就使用react自带的css类型

```react
import React from 'react';

export type EdgeTextProps = {
  style?: React.CSSProperties;
  color: React.CSSProperties['color'];
};
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





## react库

### recomponse



### loadable-components

懒加载

安装

```react
npm install @loadable/component
```

使用

```react
import loadable from '@loadable/component'

const OtherComponent = loadable(() => import('./OtherComponent'))

function MyComponent() {
  return (
    <div>
      <OtherComponent />
    </div>
  )
}
```



### react-media-recorder

安装

```shell
npm i react-media-recorder
```

使用

```react
import { ReactMediaRecorder } from "react-media-recorder";

const RecordView = () => (
  <div>
    <ReactMediaRecorder
      video
      render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
        <div>
          <p>{status}</p>
          <button onClick={startRecording}>Start Recording</button>
          <button onClick={stopRecording}>Stop Recording</button>
          <video src={mediaBlobUrl} controls autoPlay loop />
        </div>
      )}
    />
  </div>
);

import { useReactMediaRecorder } from "react-media-recorder";

const RecordView = () => {
  const {
    status,
    startRecording,
    stopRecording,
    mediaBlobUrl,
  } = useReactMediaRecorder({ video: true });

  return (
    <div>
      <p>{status}</p>
      <button onClick={startRecording}>Start Recording</button>
      <button onClick={stopRecording}>Stop Recording</button>
      <video src={mediaBlobUrl} controls autoPlay loop />
    </div>
  );
};
```



### react-three-fiber

在react中使用three.js的插件

安装

```shell
npm install three @react-three/fiber
##  如果使用ts还要安装ts包
npm install @types/three
```

使用

```react
/* eslint-disable */
import * as THREE from 'three'
import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'

function Box(props: JSX.IntrinsicElements['mesh']) {
  // This reference will give us direct access to the THREE.Mesh object
  const ref = useRef<THREE.Mesh>(null!)
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  // Rotate mesh every frame, this is outside of React without overhead
  useFrame((state, delta) => (ref.current.rotation.x += 0.01))

  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

export default function App() {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Box position={[-1.2, 0, 0]} />
      <Box position={[1.2, 0, 0]} />
    </Canvas>
  )
}
```



### prop-types

使用第三方包 `prop-types` 可以对react的 `props` 进行类型校验

```react
 import React from 'react'
 // 导入包
 import PropTypes from 'prop-types'
 
 function About (props) {
   const { name, age } = props
   console.log(name, age)
     return (
       <div>
         <p>{ name }</p>
         <p>{ age }</p>
       </div>
     )
 }
 
 About.defaultProps = {
   name: 'ReoNa',
   age: 22
 }
 
 // 这里通过函数组件的 propTypes 属性设置类型校验
 // PropType.类型：规定传入类型
 // PropType.类型.isRequired：规定必须传入
 About.propTypes = {
   name: PropTypes.string.isRequired,
   age: PropTypes.number
 }
 
 export default About
```



### react-helmet

React Helmet是一个HTML文档head管理工具，管理对文档头的所有修改。React Helmet采用纯HTML标记并输出纯HTML标记，非常简单，对react初学者友好

特点：

支持所有有效的head标签，title、base、meta、link、script、noscript和style

支持body、html和title的属性

支持服务端渲染

嵌套组件覆盖重复的head标签修改

同一组件中定义时将保留重复的head标签修改(比如“apple-touch-icon”)

支持跟踪DOM更改的回调

安装

```shell
npm i react-helmet
```

使用

```react
import {Helmet} from "react-helmet"

class Application extends React.Component {
  render(){
   return(
      <div className="application">
        <Helmet>
          <meta charSet="utf-8"/>
          <title>My title</title>
          <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
        <Child>
       			<Helmet>
                <title>new Title</title>
            </Helmet>
       </Child>
      </div>
   )
  }
}
```

上面代码中，后面的helmet会覆盖前面的helmet

服务端渲染时，需要在ReactDOMServer.renderToString或ReadDOMServer.renderToStaticMarkup后调用Helmet.renderStatic()来获得你预渲染的head数据

```react
ReactDOMServer.renderToString(<Handler />);
const helmet = Helmet.renderStatic();
```

### 二维码

QR Code数据表示方法 : 深色模块表示二进制"1"，浅色模块表示二进制"0"。

纠错能力:

- L级：约可纠错7%的数据码字；
- M级：约可纠错15%的数据码字；
- Q级：约可纠错25%的数据码字；
- H级：约可纠错30%的数据码字；

使用qrcode.react npm包

安装

```shell
npm install qrcode.react
```

api

| prop          | type                     | default value |
| ------------- | ------------------------ | ------------- |
| value         | string                   |               |
| renderAs      | string ('canvas' 'svg')  | 'canvas'      |
| size          | number                   | 128           |
| bgColor       | string (CSS color)       | "#FFFFFF"     |
| fgColor       | string (CSS color)       | "#000000"     |
| level         | string ('L' 'M' 'Q' 'H') | 'L'           |
| includeMargin | boolean                  | false         |
| imageSettings | object (see below)       |               |

图片设置参数imageSettings

| field    | type    | default value     |
| -------- | ------- | ----------------- |
| src      | string  |                   |
| x        | number  | none, will center |
| y        | number  | none, will center |
| height   | number  | 10% of size       |
| width    | number  | 10% of size       |
| excavate | boolean | false             |

示例代码

```react
<QRCode
  id="qrCode"
  value={"https://gongyi.m.jd.com/oneDetails.html?id=930"}
  imageSettings={{
    // 中间有图片logo
    src: `http://img13.360buyimg.com/imagetools/jfs/t1/203384/29/6713/37826/6142ef39E5f79ed2b/47200134bf8d0571.jpg`,
    height: 30,
    width: 30,
    excavate: true,
  }}
  size={99} // 二维码的大小
  fgColor="#000000" // 二维码的颜色
/>
//转换为图片
changeCanvasToPic = () => {
    const canvasImg = document.getElementById('qrCode'); // 获取canvas类型的二维码
    const img = new Image();
    img.src = canvasImg.toDataURL('image/png'); 
// canvas.toDataUrl() 可以将canvas格式的文件转换成基于base64的指定格式的图片
// 注意这个api ie9以下不支持    
    const downLink = document.getElementById('down_link');
    downLink.href = img.src;
    downLink.download = '二维码'; //下载图片name
  };
//定时刷新
//定时刷新功能是使用 setInterval 定时更新 value 值来更新二维码，跳转地址后面拼上一个radomCode, radomCode定时更新，就实现二维码的刷新了，需要及时清理定时器。
```



### antd

Ant-Design是蚂蚁金服开发的面向React和Vue的类似于bootstrap的框架，官网链接为：https://ant.design/index-cn

安装包

```node
npm install antd --save
cnpm i antd -S
```

在App.css文件中导入样式

```css
@import '~antd/dist/antd.css';
```

按需导入包

```node
import {  } from 'antd';

```



组件

Upload

```react

```

Table

`antd` 的 `table` 组件，`table` 的 `columns` 有一个属性叫做 `align`，它的使用是控制当前列是居左、居中、居右的。

它的类型为AlignType,在`node_modules/rc-table/lib/interface.d.ts`中可以找到

```typescript
export declare type AlignType = 'left' | 'center' | 'right';
```

在使用时，如果对table进行二次封装，它的值

```react
const columns = [{
  align: 'right',
}]
```

此时会报错，类型推论会将align推论为string，而AlignType是字面量类型，没有string

使用as进行断言就不会报错

```typescript
import { AlignType } from 'rc-table/lib/interface.d.ts';

columns: [{
  align: 'right' as 'right'
  // 或者 align: 'right' as AlignType
}]
```

table的filteredValue属性会使表格的filter字段受控 如果没设置好会导致table所有列的fliter失效，所以尽量不要用这个属性



tooltip

tooltip组件需要禁用时没有直接的disable属性，使用onchange事件进行回调

```react
const checkTipVisible = (visible: boolean) => {
  VisibleCrtl.toggle(!Boolean(enableCreatePlan) ? visible : false);
};

<Tooltip
  title={formatMessage({
    id: 'CREATE_OPERATING_PLAN_ERROR',
  })}
  visible={visible}
  onVisibleChange={checkTipVisible}
  >
</Tooltip>
```

Form

在form.item中可以使用shouldUpdate包一层，然后将Form传入item的回调函数中

这样做:

1.可以在item中取到form的其他值，从而进行表单联动

2.可以确保字段在更新时及时更新，相当于一次setState

```react
<Form.Item shouldUpdate>
  {(form) => {
    const branches = form.getFieldValue('branches') || [];
    return (
      <>
      <Form.List name="branches">
        {(fields, operation) => {
          return (
            <BranchSortTable
              readonly={readonly}
              data={branches}
              fields={fields}
              operation={operation}
              />
          );
        }}
      </Form.List>
      </>
    );
  }}
</Form.Item>
```

验证

表单提交时对有rules的item要进行校验，比较繁琐的写法像这样

```react
const handleSubmit = async () => {
  await form.validateFields();
}
```

如果有单独的需要提前校验/接口校验的可以用validateFirst

校验时可以用validator写

```react
<ProFormText
  readonly={readOnly}
  label={
    <Text
      style={{ maxWidth: 110 }}
      ellipsis={{
        tooltip: formatMessage({ id: 'FORM_LABEL_NODE_NAME' }),
      }}
      >
      {formatMessage({ id: 'FORM_LABEL_NODE_NAME' })}
    </Text>
  }
  required
  validateFirst
  name="name"
  rules={[
    {
      required: true,
      message: formatMessage({
        id: 'FORM_LABEL_PLACEHOLDER_INPUT',
      }),
    },
    {
      validator: async (_rule, value) => {
        if (!validateNameUnique(value, element.id)) {
          throw formatMessage({
            id: 'AUTO_FLOW_NAME_UNIQ_ERROR_MESSAGE',
          });
        }
      },
    },
  ]}
  fieldProps={{
    placeholder: formatMessage({
      id: 'AUTO_FLOW_LIMIT_CHAR_LENGTH_MESSAGE',
    }),
  }}
  />
```

获取字段的校验状态可以使用getFieldError/getFieldsError获取字段或者全部字段的验证信息



namePath

在form.item的name中使用数组，能够把不同的表单放到同一个对象中，而不是普通的key-value

```react
<Form.Item
  name={['a', 'select']}
  options={listData as treeItemType[]}
  readonly={isView}
>
</Form.Item>
<Form.Item
  name={['a', 'input']}
  options={listData as treeItemType[]}
  readonly={isView}
>
</Form.Item>
```

如果namePath后面跟的是index，可以自动合并成数组

namePath可以进行嵌套，输出对象数组的表单项

```react
['1', '2','3'].map((index)=> {
  <Form.Item
    name={['a', 'select', index]}
    options={listData as treeItemType[]}
    readonly={isView}
  >
  </Form.Item>
})
```



自定义表单组件

表单组件不一定非要input、select，也可以自己通过form.item填充，取值的时候使用get和set就比较方便

```react
const handleChange = () => {
  labelsForm.setFieldsValue({
    tree: []
  });
}

const FormTree: React.FC<{ value?: any }> = (value) => {
  return (
    <Tree
      isDirectoryTree
      searchAble
      searchingMode="filter"
      treeData={value.value || []}
      onSelect={(selectKey, info) => {
        setSelectId({ key: selectKey, title: info?.node.title });
                    }}
      />
  );
};

<ProForm.Item name="tree" noStyle shouldUpdate>
  <FormTree />
</ProForm.Item>
```

form之外的dom需要在form字段更新时重新render可以使用useWatch

```react
import React from 'react';
import { Form, Input, InputNumber, Typography } from 'antd';

const Demo = () => {
  const [form] = Form.useForm<{ name: string; age: number }>();
  const nameValue = Form.useWatch('name', form);

  return (
    <>
      <Form form={form} layout="vertical" autoComplete="off">
        <Form.Item name="name" label="Name (Watch to trigger rerender)">
          <Input />
        </Form.Item>
        <Form.Item name="age" label="Age (Not Watch)">
          <InputNumber />
        </Form.Item>
      </Form>

      <Typography>
        <pre>Name Value: {nameValue}</pre>
      </Typography>
    </>
  );
};

export default Demo;
```

给form item添加提示和自定义图标

```react
<Form.Item
  label="Field B"
  tooltip={{ title: 'Tooltip with customize icon', icon: <InfoCircleOutlined /> }}
  >
  <Input placeholder="input placeholder" />
</Form.Item>
```

form的setFieldsValue 和 resetFields 不会触发 Form 的 onValuesChange，



Modal

如果在Modal的content中使用国际化，需要使用Modal的hooks

```react
const [modal, contextHolder] = Modal.useModal();

modal.info({
  title: null,
  icon: null,
  okText: formatMessage({ id: 'ACTION_CONFIRM' }),
  className: styles.deleteCheckModal,
  content: (
    <div>
      <div className={styles.deleteCheckModalTitle}>
        {formatMessage({ id: 'TIPS' })}
      </div>
      <div className={styles.deleteCheckModalTips}>
        <InfoCircleFilled className="mr-6" />
        {formatMessage({ id: 'CANOT_DELETE_TIPS' })}
      </div>
      <div className={styles.deleteCheckModalTable}>
        <ProTable
          pagination={false}
          scroll={{ y: 200 }}
          size="small"
          dataSource={data}
          >
          <ProTable.Column title="ID" dataIndex="id" width={100} />
          <ProTable.Column
            title={formatMessage({ id: 'PLAN_NAME' })}
            dataIndex="name"
            />
        </ProTable>
      </div>
    </div>
  ),
});

return (
	<>{contextHolder}</>
)
```

如果在modal中使用ref，在初次modal渲染时ref拿不到值，此时应该手动强制刷新一次modal子组件

```react
const [Key, setKey] = useState(
  `${+new Date()}`,
);
// ref相关的事件改变时也要reset key，防止拿不到
const handleChange = () => {
  setKey(() => `${+new Date()}`);
};
<Modal
  visible={visible}
  form={modalForm}
  title={formatMessage({
    id: 'ATTACHMENT_ADD',
  })}
  modalProps={{
    onCancel: () => {
      setVisible(false);
    },
  }}
  onVisibleChange={(visible) => {
    if (visible) {
      // 当modal打开后强制渲染一次 RichTextInput 否则获取不到ref
      setTimeout(() => {
        setImageAddressInputKey(() => `${+new Date()}`);
      }, 0);
    }
  }}>
</ModalForm>
```

原因：

ant design的modal在渲染时如果同步渲染会堵塞react的事件，因此ant design的modal使用异步渲染，初次渲染是ref就绑定不到

```react
// components/modal/confirm.tsx
  function render({ okText, cancelText, prefixCls: customizePrefixCls, ...props }: any) {
    /**
     * https://github.com/ant-design/ant-design/issues/23623
     *
     * Sync render blocks React event. Let's make this async.
     */
    setTimeout(() => {
      const runtimeLocale = getConfirmLocale();
      const { getPrefixCls, getIconPrefixCls } = globalConfig();
      // because Modal.config  set rootPrefixCls, which is different from other components
      const rootPrefixCls = getPrefixCls(undefined, getRootPrefixCls());
      const prefixCls = customizePrefixCls || `${rootPrefixCls}-modal`;
      const iconPrefixCls = getIconPrefixCls();

      reactRender(
        <ConfirmDialog
          {...props}
          prefixCls={prefixCls}
          rootPrefixCls={rootPrefixCls}
          iconPrefixCls={iconPrefixCls}
          okText={okText || (props.okCancel ? runtimeLocale.okText : runtimeLocale.justOkText)}
          cancelText={cancelText || runtimeLocale.cancelText}
        />,
        container,
      );
    });
  }
```

可以基于modal的命令式包装弹框hooks，实现命令式的自定义弹框组件

```react
export const useCustomModal = () => {
  const { formatMessage } = useIntl();
  const [modal, contextHolder] = Modal.useModal();
  
  const showModal = (props: showModalProps) => {
    const { tip, okText, onOk, className } = props;
    
    modal.info({
      title: null,
      icon: null,
      okText: okText ?? formatMessage('ACTION_CONFIRM'),
      className: className,
      content: (
        <div className={styles.quotePlanModal}>
          {data}
        </div>
      ),
      onOk: () => {
        onOk?.();
      },
    });
  }
	return [showModal, contextHolder];
}
```



Select

select的下拉框展开时，如果滚动页面的话会下拉框会移动位置，需要添加一个属性防止下拉框滚动

```react
<Select
getPopupContainer={(triggerNode) =>triggerNode.parentNode}
  />
```

TreeSelect

triggerNode.props非公开api



### pro-components

ProComponents 是基于 Ant Design 而开发的模板组件，提供了更高级别的抽象支持，开箱即用。可以显著的提升制作 CRUD 页面的效率，更加专注于页面。

ProLayout 解决布局的问题，提供开箱即用的菜单和面包屑功能

ProTable表格模板组件，抽象网络请求和表格格式化

ProForm表单模板组件，预设常见布局和行为

ProCard提供卡片切分以及栅格布局能力

ProDescription定义列表模板组件，ProTable 的配套组件

ProSkeleton页面级别的骨架屏

Proform有很多ProFormFields 表单项组件。这些组件本质上是 Form.Item 和 组件的结合，我们可以帮他们当成一个 FormItem 来使用，并且支持各种 `props`。每个表单项都支持 `fieldProps` 属性来支持设置输入组件的`props`。 同时支持了 `placeholder` 的透传，你可以直接在组件上设置 `placeholder`。

每个表单项同时也支持了 `readonly` ，不同的组件会有不同的只读样式，与 `disable` 相比 `readonly` 展示更加友好。生成的 dom 也更小，比如 ProFormDigit 会自动格式化小数位数。

```react
<ProFormText
  width="md"
  name="name"
  label="签约客户名称"
  tooltip="最长为 24 位"
  placeholder="请输入名称"
  />
<ProFormDateRangePicker name="contractTime" label="合同生效时间" />
<ProFormSelect
  width="xs"
  options={[
    {
      value: 'time',
      label: '履行完终止',
    },
  ]}
  name="unusedMode"
  label="合同约定失效效方式"
  />
```

### react-query

React Query 通常被描述为 React 缺少的数据获取(data-fetching)库，但是从更广泛的角度来看，它使 React 程序中的**获取，缓存，同步和更新服务器状态**变得轻而易举

尽管大多数传统状态管理库非常适合用于处理客户端状态，但是它们**并不适合处理异步或服务器状态**。 这是因为**服务器状态完全不同**。对于初学者，服务器状态

- 远程保留在您无法控制或拥有的位置
- 需要异步 API 进行获取和更新
- 意味着共享所有权，可以在你不知情的情况下被其他人改变
- 如果不小心，可能会在应用中变得"过时"

一旦你掌握了应用中服务器状态的本质，你会遇到更多的挑战，例如:

- 缓存...（这可能是编程中最难的事情）
- 将对同一数据的多个请求重复数据集合到单个请求中
- 在后台更新"过时"的数据
- 知道数据何时"过时"
- 尽可能快地反映数据更新
- 分页和延迟加载数据等性能优化
- 管理服务器状态的内存和 GC
- 结构化共享并存储查询结果s

如果您没有被这个列表压垮，那么这一定意味着您可能已经解决了所有的服务器状态问题，值得获奖。 然而，如果你和大多数人一样，你要么还没有解决所有这些挑战，要么还没有解决大部分挑战，我们只是触及了表面!

React Query 无疑是管理服务器状态的最佳库之一。它非常好用，**开箱即用，无需配置**，并且可以随着应用的增长而根据自己的喜好**进行定制**。

React Query 使您可以击败并征服棘手的服务器状态挑战和障碍，并在开始控制您的应用数据之前对其进行控制。

从更专业的角度来说，React Query 可能会:

- 帮助您从应用中删除许多复杂和容易引起误解的代码行，用少量的 React 查询逻辑代替
- 使您的应用更易于维护，更易于构建新功能，而不必担心如何连接新的服务器状态数据源
- 通过应用的 GUI 及执行层面的更快的数据响应，直接影响您的最终用户
- 潜在地帮助您节省带宽和提高内存性能

安装

```shell
$ npm i react-query
# or
$ yarn add react-query
```

使用

```javascript
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

#### 开发工具

React Query 自带了专用的开发工具。它们有助于可视化 React Query 的所有内部工作原理

devtools 包被拆分为`react-query/devtools`包。不需要安装任何额外的东西

```javascript
import { ReactQueryDevtools } from 'react-query/devtools'

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* The rest of your application */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
```

