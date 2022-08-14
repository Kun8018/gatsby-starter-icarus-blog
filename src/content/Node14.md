---
title: NodeJs开发（五） 
date: 2021-1-23 21:40:33
categories: IT
tags:
    - IT，Web
toc: true
thumbnail: http://cdn.kunkunzhang.top/nestjs.png
---

万万万万万万没想到会来到第十一篇，第十一篇写Nest和Nodejs游戏框架

<!--more-->

## Fastify.js



## thinkjs





## Nestjs

https://segmentfault.com/a/1190000018153359

nest之于javascript就像spring boot之于java，nest可以使用typescrip或者JavaScript开发，默认使用express作为底层服务框架

nest基于typescript编写并且结合了OOP(面向对象编程)、FP(函数式编程)、FRP(函数式响应编程)

熟悉spring或者angular的同学可以快速上手Nestjs，因为它大量借鉴了Spring和Angular中的思想和概念。nest 的核心思想是提供一个层与层之间直接耦合度极小、抽象化较高的架构体系。

安装nest

```js
npm i -g @nestjs/cli
```

检查安装是否成功

```js
nest -h
```

创建nest项目

```js
nest  new nest-demo
```

进入项目，npm run start

```js
//nest常用指令
nest new []//创建项目
nest -h//帮助
nest g co [名称]//创建控制器
nest g s [名称]//创建服务
nest g mi [名称]//创建中间件
nest g pi [名称]//创建管道
nest g mo [名称]//创建模块
nest g gu [名称]//创建守卫
```

### 依赖注入

依赖注入是面向对象中控制反转最常见的实现方式，主要降低代码的耦合度，

实例

```js
import { Engine } from './engine'
import { Tire } from './tire'

class Container {
    private constructorPool;

    constructor() {
        this.constructorPool = new Map();
    }
    
    register(name,constructor) {
        this.constructorPool.set(name,constructor);
    }
    
    get(name){
       const target = this.constructorPool.get(name);
       return new target();
    }
}

const container = new Container();
container.bind('engine',Engine);
container.bind('tire',Tire);

class Car {
    private engine;
    private tire;
    
    constructor() {
        this.engine = container.get('engine');
        this.tire = container.get('tire');
    }
}
```

在nestjs中，通过@injectable装饰器向IoC容器注册

```js
import { Injectable } from '@nestjs/common';

```



### 控制器

控制器负责处理传入的请求和向客户端返回响应。每个控制器有多个路由，每个路由能执行不同的操作

通过命令行创建控制器

```shell
$ nest g co cats
```



实例

```js
import { Controller ,Get，Post} from '@nestjs/common'

@Controller('cats')
export class CatsController {
    @Post
    create(): string {
        return 'this is a cat';
    }
    @Get
    findAll(): string {
        return 'this return all cats';
    }
}

```

Nest还提供其他端点装饰器@Put()、@Delete()、@Patch()、

#### 状态码





#### 自定义响应头

可以使用 `@header()` 修饰器或类库特有的响应对象,

```ts
@Post()
@Header('Cache-Control', 'none')
create() {
  return 'This action adds a new cat';
}
```

#### 重定向

可以使用 `@Redirect()`装饰器或特定于库的响应对象(并直接调用 `res.redirect()`)。

`@Redirect()` 带有必需的 `url`参数和可选的 `statusCode`参数。 如果省略，则 `statusCode` 默认为 `302`。

```ts
@Redirect('https://nestjs.com', 301)
```

#### 动态路由

当您需要接受**动态数据**作为请求的一部分时，



### 模块化

nest把controller、service、pipe等打包成内部的功能块，每个模块聚焦一个特性区域、业务领域、工作流等。

在nest中通过@Module装饰器声明一个模块，每个nest程序至少有一个模块，即根模块，根模块是Nest开始安排应用程序树的地方

@module()装饰器接受哦一个描述模块属性的对象

```js
provider 
controller
imports 
exports
```

把模块到处就能在其他任意模块中重复使用，模块导出时可以导出他们的内部提供者，也可以再导出自己导入的模块

#### 全局模块

当你在很多地方需要导入同一模块时，可以将模块定义为全局模块。一旦定义，他们到处可用。

@Global装饰器使模块注册为全局模块。全局模块只注册一次，最好在根模块或者核心模块注册

实例

```js
import { Module,Global } from '@nestjs/common'
import { CatsController } from './cats.controller'
import { CatsService } from './cats.service'

@Global()
@Module({
   controllers: [CatsController],
   provider: [CatsService],
   exports: [CatsService],
})
export class CatModule {}
```

### 提供者

Providers 是 `Nest` 的一个基本概念。许多基本的 `Nest` 类可能被视为 provider - `service`,`repository`, `factory`, `helper` 等等。



### 装饰器和注解

@

#### 自定义装饰器



### 面向切面编程

面向切面编程是针对业务处理过程中的切面进行提取，在某个步骤和阶段进行一些操作。面向切面编程是对面向对象编程的一种补充。

在nest中，面向切面编程主要分为下面几个部分：中间件、守卫、拦截器、管道、过滤器

洋葱模型

#### 中间件

nest的中间件和express的语言，可以直接使用express的中间件



#### 管道

管道有两种类型：

将输入数据转化为所需的数据输出，或者对输入数据进行验证，验证成功则继续传递，否则抛出异常。即转换管道和验证管道。管道也是具有@Injecttable装饰器的类

nest自带5个开箱即用的管道，从@nestjs/common包中导出，ValidationPipe、ParseIntPipe、ParseBoolPipe、ParseArrayPipe、ParseUUIDPipe。

Pipe 是具有 `@Injectable()` 装饰器的类，并实现了 `PipeTransform` 接口。

实例

验证管道

Nest 与 [class-validator](https://github.com/pleerock/class-validator) 配合得很好。class-validator库允许您使用基于装饰器的验证。装饰器的功能非常强大，尤其是与 Nest 的 Pipe 功能相结合使用时，因为我们可以通过访问 `metatype` 信息做很多事情，



转换管道

管道一般作为全局pipe使用

```javascript
async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);
  app.setGlobalPrefix('api/v1');
  
  app.useGlobalPipes(new ValidationPipe());
  
  await app.listen(3000);
}
bootstrap();
```

假设我们没有这层 pipe，那在 controller 中就会进行参数校验，这样就会打破单一职责的原则。有了这一层 pipe 帮助我们校验参数，有效地降低了类的复杂度，提高了可读性和可维护性。

#### 守卫

守卫与前端(vue)中的路由守卫一样，主要确定请求是否由该路由程序处理，通过守卫可以知道上下文的信息，所以与中间件相比，守卫可以确切知道在next之后要执行什么

守卫在中间件之后执行，在拦截器和管道之前

在控制器中绑定守卫

守卫可以是全局范围或者控制范围内的，使用@UserGuards()装饰器设置一个控制范围的守卫，这个装饰器可以传递单个或多个守卫，用逗号隔开

```js
import { UseGuards } from '@nestjs/common'
@Controller('cats')
@UseGuards(RolesGuard)
export  default CatsControllers {}
```

全局守卫用于整个应用程序, 每个控制器和每个路由处理程序。全局守卫

为了设置一个全局守卫，使用Nest应用程序实例的 `useGlobalGuards()` 方法：

```ts
const app = await NestFactory.create(AppModule);
app.useGlobalGuards(new RolesGuard());
```





#### 拦截器

拦截器可以：

在函数执行之前/之后绑定额外的逻辑

转换从函数返回的结果 

转换从函数抛出的异常

扩展基本函数行为

根据所选条件完全重写函数

实例



#### 异常处理/过滤器

内置的 Exception filters 负责处理整个应用程序中的所有抛出的异常，也是 Nestjs 中在 response 前，最后能捕获异常的机会。

```js
import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';

@Catch()
export class AnyExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    response
      .status(status)
      .json({
        statusCode: exception.getStatus(),
        timestamp: new Date().toISOString(),
        path: request.url,
      });
  }
}
```

而 Interceptor 则负责对成功请求结果进行包装：

```javascript
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

interface Response<T> {
  data: T
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map(rawData => {
          return {
            data: rawData,
            status: 0,
            message: '请求成功',
          }
        }
      )
    )
  }
}
```

同样 Interceptor 和 Exception Filter 需要把它定义在全局范围内：

```javascript
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');

  app.useGlobalFilters(new ExceptionsFilter());
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
```

### 微服务

安装包

```js
npm i --save @nestjs/microservices
```

创建微服务

```js

```



#### Redis





### GraphQL

在nest中开发GraphQL有两种方式，一种是代码先行，一种是架构先行

安装包

```js
npm i @nestjs/graphql graphql-tools graphql apollo-server-express
```

@nestjs/graphql是对apollo server的封装

数据量较少时可以将schema和resolver写在一个文件内，数据量较多时最好写在不同的js/ts文件中

定义模型schema

```js
import {Field,Int,ObjectType} from '@nestjs/graphql';
//也可以从其他模型文件中引入schema
import { Post } from './post.graphql'

@ObjectType()
export class Author {
  @Field(type =>Int)
  id: number;

  @Field({ nullable: true})
  firstName?: String;
  
  @Field({ nullable: true})
  lastName?: String;
  
  @Field(type => [Post])
  posts: Post[];
}

//post.graphql.ts
import {Field,Int,ObjectType} from '@nestjs/graphql';

@ObjectType()
export class Post {
    @Field(type => Int)
    id: number;

    @Field()
    title: string;

    @Field(type =>Int,{nullable:true})
    votes?: number;
}
```

定义resolver

```js
import {
  Resolver,
  Query,
  Parent,
  ResolveField,
  Args,
  Int,
} from '@nestjs/graphql';
import { Author } from './graphql/author.graphql';
import { Post } from './graphql/post.graphql';

@Resolver(() => Author)
export class AuthorsResolver {
  constructor(
  private authorsService: AuthorsService,
  private postsService: PostsService) {}

  // @Query 表示创建Query 操作类型
  // @Args 表示传入的参数
  @Query(() => Author)
  async author(@Args('id', { type: () => Int }) id: number): Promise<any> {
    // 这里注释掉的是启用 `service` 对数据库进行访问
    // return this.authorsService.findOneById(id);
    return {
      id,
      firstName: 'name',
      lastName: 'mase',
    };
  }
  
  // @ResolveField 表示下面装饰的方法与父类型（在当前示例中为Author类型）相关联
  @ResolveField()
  async posts(@Parent() author: Author): Promise<any> {
    const { id } = author;
    return [
      {
        id: 4,
        title: 'hello',
        votes: 2412,
      },
    ];
  }
}
```

在module文件中引入

```ts
import { Module } from '@nestjs/common';
import { AuthorsResolver } from './authors.resolver'

@Module({
  providers: [AuthorsResolver],
})
export class AuthorModule {}
```

在主文件中引入module

```ts
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthorModule } from './author/author.module'
import { join } from 'path';

@Module({
  imports: [
    ...
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'), // 最后生成的`Schema 文件，不可修改`
    }),
    ConfigModule.forRoot({
      load: [configuration],
    }),
    AuthorModule
  ],
})
```



### Websocket

安装包

```js
npm i --save @nestjs/websockets @nestjs/platform-socket.io
npm i --save-dev @types/socket.io
```



### JWT认证

通过用户认证可以判断该访问角色的合法性和权限。通常认证要么基于 Session，要么基于 Token。这里就以基于 Token 的 JWT（JSON Web Token） 方式进行用户认证。

```shell
$ npm install --save @nestjs/passport passport @nestjs/jwt passport-jwt
```

创建`jwt.strategy.ts`，用来验证 token，当 token 有效时，允许进一步处理请求，否则返回`401(Unanthorized)`



### 模版引擎

在 Nestjs 中，可以使用 hbs 作为模板渲染引擎：

```shell
$ npm install --save hbs
```

在`main.ts`中，我们告诉 express，`static`文件夹用来存储静态文件，`views`中含了模板文件：

```javascript
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { join } from 'path'

import { AppModule } from './app.module'
import config from './config'
import { Logger } from './shared/utils/logger'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  })

  app.setGlobalPrefix('api/v1')

  app.useStaticAssets(join(__dirname, '..', 'static'))
  app.setBaseViewsDir(join(__dirname, '..', 'views'))
  app.setViewEngine('hbs')

  await app.listen(config.port, config.hostName, () => {
    Logger.log(
      `Awesome-nest API server has been started on http://${config.hostName}:${config.port}`,
    )
  })
}
```

在`views`下新建一个`catsPage.hbs`的文件，假设，我们需要在里面填充的数据结构是这样：

```javascript
{
  cats: [
    {
      id: 1,
      name: 'yyy',
      age: 12,
      breed: 'black cats'
    }
  ],
  title: 'Cats List',
}
```

此时，可以这样写模板：

```javascript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
    <style>
        .table .default-td {
            width: 200px;
        }

        .table tbody>tr:nth-child(2n-1) {
            background-color: rgb(219, 212, 212);
        }

        .table tbody>tr:nth-child(2n) {
            background-color: rgb(172, 162, 162);
        }
    </style>
</head>
<body>
<p>{{ title }}</p>
<table class="table">
    <thead>
    <tr>
        <td class="id default-td">id</td>
        <td class="name default-td">name</td>
        <td class="age default-td">age</td>
        <td class="breed default-td">breed</td>
    </tr>
    </thead>
    <tbody>
    {{#each cats}}
        <tr>
            <td>{{id}}</td>
            <td>{{name}}</td>
            <td>{{age}}</td>
            <td>{{breed}}</td>
        </tr>
    {{/each}}
    </tbody>
</table>
</body>
</html>
```



### http请求

Nestjs 中对[Axios](https://github.com/axios/axios)进行了封装，并把它作为 `HttpService` 内置到`HttpModule`中。`HttpService`返回的类型和 Angular 的 `HttpClient Module`一样，都是`observables`，所以可以使用 [rxjs](https://rxjs.dev/) 中的操作符处理各种异步操作。

```javascript
import { Global, HttpModule, Module } from '@nestjs/common'

import { LunarCalendarService } from './services/lunar-calendar/lunar-calendar.service'

@Global()
@Module({
  imports: [HttpModule],
  providers: [LunarCalendarService],
  exports: [HttpModule, LunarCalendarService],
})
export class SharedModule {}
```



### ORM

通过ORM可以使用面向对象编程的方式操作关系型数据库。Java中通常会有DAO(data access object，数据访问对象)层，DAO包含了各种数据库的操作方法，通过DAO对数据进行相关的操作。DAO的主要作用是分离数据层与业务层，避免业务层与数据层耦合。

在nestjs中，使用typeORM作为DAO层，支持MySQL、MariaDB、MongoDB、NoSQL、SQLite、Postgres、CockroachDB、Oracle。

安装库

```javascript
$ npm install --save @nestjs/typeorm
```

在typeORM中数据库的表对应的就是一个类，通过一个类创建实体，实体是一个映射到数据库表的类，通过@Entity来标记

```js
import {Entity,PrimaryGeneratedColumn,Column} from "typeorm";

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    firstName: String;

    @Column()
    lastName: String;

    @Column()
    age: number;
}
```

通过@InjectRepository()修饰器注入对应的Repository，就可以在Repository对象上

进行数据库的操作。

```js
import {Injectable} from '@nestjs/common';
import {InjectRepository } from '@nestjs/typeorm';
import {Rspository } from '@nestjs/typeorm';
import {User} from './user.entity'

@Injectable()
export class UserService{
    constructor(
     @InjectRepository(User)
     private readonly userRepository: Repository<User>,
     ){}
    
    async findAll() Promise<User[]>{
        return await this.userRepository.find();
    }
}

```

#### Mongo

安装包

```ts
yarn add @nestjs/typeorm typeorm mongodb
```

在app.module.ts中配置数据库连接

```ts
@Module({
      imports: [
        TypeOrmModule.forRoot({
          type: 'mongodb',
          host: 'localhost',
          port: 27017,
          database: 'typeorm', // 数据库名
          entities: [join(__dirname, '**/entity/*.{ts,js}')], // 需要自动实体映射的文件路径匹配
          useNewUrlParser: true, // 使用新版mongo连接Url解析格式
          synchronize: true, // 自动同步数据库生成entity
        })
      ],
```



#### Mysql

安装包

```js
npm install --save typeorm mysql
```

配置数据库连接

```js
import { createConnection } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () => await createConnection({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'test',
      entities: [
          __dirname + '/../**/*.entity{.ts,.js}',
      ],
      synchronize: true,
    }),
  },
];

```

### 数据库迁移

在持续交付项目中，项目会不断迭代上线，这时候就会出现数据库改动的问题，对一个投入使用的系统，通常会使用 migration 帮我们同步数据库。TypeORM 也自带了一个 [CLI 工具](https://github.com/typeorm/typeorm/blob/master/docs/zh_CN/using-cli.md)帮助我们进行数据库的同步。



### CRUD

对于一般的 CRUD 的操作，在 Nestjs 中可以使用[@nestjsx/crud](https://github.com/nestjsx/crud/wiki/Controllers#getting-started)这个库来帮我们减少开发量。

首先安装相关依赖：

```javascript
npm i @nestjsx/crud @nestjsx/crud-typeorm class-transformer class-validator --save
```



### 安全防范

对 JWT 的认证方式，因为没有 cookie，所以也就不存在 CSRF。如果你不是用的 JWT 认证方式，可以使用[csurf](https://github.com/expressjs/csurf)这个库去解决这个安全问题。

对于 XSS，可以使用[helmet](https://github.com/helmetjs/helmet)去做安全防范。helmet 中有 12 个中间件，它们会设置一些安全相关的 HTTP 头。比如`xssFilter`就是用来做一些 XSS 相关的保护。

对于单 IP 大量请求的暴力攻击，可以用[express-rate-limit](https://github.com/nfriedly/express-rate-limit)来进行限速。

对于常见的跨域问题，Nestjs 提供了两种方式解决，一种通过`app.enableCors()`的方式启用跨域，另一种像下面一样，在 Nest 选项对象中启用。

最后，所有这些设置都是作为全局的中间件启用，最后`main.ts`中，和安全相关的设置如下：

```javascript
import * as helmet from 'helmet'
import * as rateLimit from 'express-rate-limit'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true })

  app.use(helmet())
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
  )

  await app.listen(config.port, config.hostName, () => {
    Logger.log(
      `Awesome-nest API server has been started on http://${config.hostName}:${config.port}`,
    )
  })
}
```



### Swagger

Nest提供对Swagger的支持，方便追踪和测试api。

安装npm包

```shell
$ npm install --save @nestjs/swagger swagger-ui-express
```

在`main.ts`中构建文档：

```typescript
const options = new DocumentBuilder()
    .setTitle('Awesome-nest')
    .setDescription('The Awesome-nest API Documents')
    .setBasePath('api/v1')
    .addBearerAuth()
    .setVersion('0.0.1')
    .build()

const document = SwaggerModule.createDocument(app, options)
SwaggerModule.setup('docs', app, document)
```

访问`http://localhost:3300/docs`就可以看到 swagger 文档的页面。

对于不同的 API 可以在 controller 中使用`@ApiUseTags()`进行分类，对于需要认证的 API，可以加上`@ApiBearerAuth()`，这样在 swagger 中填完 token 后，就可以直接测试 API：

```javascript
@ApiUseTags('cats')
@ApiBearerAuth()
@Controller('cats')
@UseGuards(AuthGuard())
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get('page')
  @Render('catsPage')
  getCatsPage(): Promise<any> {
    return this.catsService.getCats()
  }
}
```

### 热重载

在开发的时候，运行`npm run start:dev`的时候，是进行全量编译，如果项目比较大，全量编译耗时会比较长，这时候我们可以利用 webpack 来帮我们做增量编译，这样会大大增加开发效率。

首先，安装 webpack 相关依赖：

```shell
$ npm i --save-dev webpack webpack-cli webpack-node-externals ts-loader
```

在根目录下创建一个`webpack.config.js`：

```javascript
const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: ['webpack/hot/poll?100', './src/main.ts'],
  watch: true,
  target: 'node',
  externals: [
    nodeExternals({
      whitelist: ['webpack/hot/poll?100'],
    }),
  ],
  module: {
    rules: [
      {
        test: /.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  mode: 'development',
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'server.js',
  },
};
```

在main.ts中启动HMR，

```javascript
declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);
  await app.listen(3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
```

在`package.json`中增加下面两个命令：

```javascript
{
  "scripts": {
    "start": "node dist/server",
		"webpack": "webpack --config webpack.config.js"
  }
}
```

运行`npm run webpack`之后，webpack 开始监视文件，然后在另一个命令行窗口中运行`npm start`。



## Nodejs游戏框架pomelo

http://nextzeus.github.io/pomelo/#



