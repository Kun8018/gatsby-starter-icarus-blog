---
title: NodeJs开发（五） 
date: 2021-1-23 21:40:33
categories: IT
tags:
    - IT，Web
toc: true
thumbnail: http://cdn.kunkunzhang.top/nestjs.png
---

  Node的seveless服务

<!--more-->

## firebase

[Firebase](https://firebase.google.com/)是Google Cloud Platform为应用开发者们（特别是全栈开发）推出的应用后台服务。借助Firebase，应用开发者们可以快速搭建应用后台，集中注意力在开发client上，并且可以享受到Google Cloud的稳定性和scalability。

Firebase为后台开发提供以下几个功能：

- 实时数据库（Realtime database）
- 用户认证（Authentication）
- 自定义API（Cloud function）
- 消息推送（Cloud messaging）
- 静态网页Hosting
- 云存储（Cloud storage）

实时数据库是Firebase提供的核心功能。通过为Android， iOS跟Web（JavaScript）提供SDK，前端开发者们可以轻松的读写Firebase的数据库（no-SQL，Json）

```javascript
// 更新用户信息（username， email）记录到/users表
// userId是为用户表的"主键"
firebase.database().ref('users/' + userId).set({
    username: name,
    email: email,
});
```

实时数据库中的另一个关键字是实时。开发者可以利用SDK在client中监听数据库的变化，并实时获得结果

```javascript
// /messages表发生变化执行function
firebase.database().ref("messages/").on('value', function(dataSnapshot) {
  ...
});
// /messages表添加纪录执行function
firebase.database().ref("messages/").on('child_added', function(childSnapshot, prevChildKey) {
  ...
});
...
```

实时数据库也有Authorization，可以在firebase console中通过一个Json文件轻松设置：

```shell
// /users表中每个用户只可以修改自己的信息 （uid来自Firebase另一个功能，下面会介绍）
{
  "rules": {
    "users": {
      "$uid": {
        ".write": "$uid === auth.uid"
      }
    }
  }
}
```

### 用户认证

Firebase提供了基于email的用户认证。通过client SDK，开发者可以轻松的实现账户注册，登陆登出，修改密码，忘记密码等常用功能。并且可以轻松集成3rd party Authentication方式（Google Signin，Facebook Login，Github，Twitter）以及任何customize的认证服务。支持手机号登陆，短信功能。

```javascript
// 注册新账户
firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
});
// 账户登陆
firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
});
// 认证信息更新监听（认证成功，认证失效，密码更改）
firebase.auth().onAuthStateChanged(function(user) {
});
...
```

在Firebase server端，可以与Cloud function（下面会详细介绍）集成，实现例如新用户注册后发送verification邮件等功能

```javascript
// 账户创建监听
exports.sendWelcomeEmail = functions.auth.user().onCreate(event => {
});
// 账户删除监听
exports.sendByeEmail = functions.auth.user().onDelete(event => {
});
```

Cloud function相当于Firebase提供的一个node.js的server附加Firebase与其他功能的集成（例如上面与Authentication集成的案例），与Amazon AWS的[lambda](https://aws.amazon.com/lambda/)有异曲同工之妙。通过Cloud function，开发者可以自己定义cloud API，将原本client的部分功能迁移到server端，轻量化client。该功能在密集迭代中，相信未来会提供更多与Google产品的集成。

### 自定义API

Cloud function相当于Firebase提供的一个node.js的server附加Firebase与其他功能的集成（例如上面与Authentication集成的案例），与Amazon AWS的[lambda](https://aws.amazon.com/lambda/)有异曲同工之妙。通过Cloud function，开发者可以自己定义cloud API，将原本client的部分功能迁移到server端，轻量化client。该功能在密集迭代中，相信未来会提供更多与Google产品的集成

### 消息推送

Firebase提供了消息推送功能。通过client side SDK产生token注册至firebase服务器，并自动监听任何消息推送。开发者或者管理者可以在任何地方（服务器或者个人电脑）对任何一个device发送推送消息，提高engagement。

```javascript
// 初次请求用户允许推送消息
messaging.requestPermission().then(function() {

}).catch(function(err) {

});
// 获得token并自动注册至cloud messaging服务器
messaging.getToken().then(function(currentToken) {
});
// 定期刷新token
messaging.onTokenRefresh(function() {
});
```

### 静态网页Host

Firebase提供了最基本的web hosting功能。对于web应用开发者来说提供了极大的便利，client的代码不需要另外host，而与Firebase API server共同host在Google Cloud中，提供了效率，降低了成本。Firebase会为web hosting提供一个免费的hostname，允许开发者可以随意更换为任何自己拥有的hostname。

### 云存储

Firebase除了通过实时数据库对structured数据的支持，还通过云存储来提供上传下载大文件（blob file）。通过下面client代码案例来说明开发者如何操作云存储（上传为例）

```javascript
// 上传文件file到云存储的images/rivers.jpg位置
var uploadTask = storageRef.child('images/rivers.jpg').put(file);
// 监听上传任务的状态（进度，完成，异常等）
uploadTask.on('state_changed', function(snapshot){
})
// 暂停上传
uploadTask.pause();
// 继续上传
uploadTask.resume();
// 取消上传
uploadTask.cancel();
```

### 在web项目中引入firebase

安装

```shell
npm install firebase
```

使用

```javascript
import { initializeApp } from 'firebase/app';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  //...
};

const app = initializeApp(firebaseConfig);
```

Firebase 应用是一种类似于容器的对象，用于存储常见配置并在各种 Firebase 服务之间共享身份验证凭据。在代码中初始化 Firebase 应用对象后，可以添加并开始使用 Firebase 服务。

https://github.com/marketplace/actions/qiniu-upload

firebase 控制台：https://console.firebase.google.com/project/kun-extension/appcheck?hl=zh-cn

## supabase

**Supabase** 是一个开源的 **Firebase** 替代方案。官方表示，其正在使用企业级开源工具构建 Firebase 的功能。Supabase 可以：

- 监听数据库的变化。
- 查询你的表，包括过滤、分页和深度嵌套关系（如GraphQL）。
- 创建、更新和删除行。
- 管理你的用户和他们的权限。
- 使用一个简单的用户界面与你的数据库进行交互。

Supabase的美妙之处在于，在可能的情况下，他们选择了使用现有的库和数据库。他们没有利用最先进的技术，而是使用PostgreSQL来实现大量的功能，并使用其他库来实现其他功能。从锁定的角度来看，缺乏自定义的功能是一件好事。

https://zhuanlan.zhihu.com/p/408299698

https://chinese.freecodecamp.org/news/the-complete-guide-to-full-stack-development-with-supabas/

### 基本使用

安装

```shell
npm install --save @supabase/supabase-js
```

使用

```javascript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://csmnbjrgnfzppgevieas.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)
```



### Next.js

https://supabase.com/docs/guides/with-nextjs



```react
import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'
import Auth from '../components/Auth'
import Account from '../components/Account'

export default function Home() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    setSession(supabase.auth.session())

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <div className="container" style={{ padding: '50px 0 100px 0' }}>
      {!session ? <Auth /> : <Account key={session.user.id} session={session} />}
    </div>
  )
}
```



### 控制台

https://app.supabase.com/#

### 常用js Api

查询数据

```javascript
import { supabase } from '../path/to/api'

const { data, error } = await supabase
  .from('posts')
  .select()
```

过滤数据

```javascript
const { data, error } = await supabase
  .from('cities')
  .select('name, country_id')
  .eq('name', 'The Shire')    // Correct

const { data, error } = await supabase
  .from('cities')
  .eq('name', 'The Shire')    // Incorrect
  .select('name, country_id')
```

创建新条目

```javascript
const { data, error } = await supabase
  .from('posts')
  .insert([
    {
      title: "Hello World",
      content: "My first post",
      user_id: "some-user-id",
      user_email: "myemail@gmail.com"
    }
  ])
```

注册/登录

```javascript
const { user, session, error } = await supabase.auth.signUp({
  email: 'example@email.com',
  password: 'example-password',
})

const { user, session, error } = await supabase.auth.signIn({
  email: 'example@email.com',
  password: 'example-password',
})
```



