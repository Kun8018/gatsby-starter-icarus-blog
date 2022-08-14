---

title: PHP与Laravel开发 
date: 2020-04-15 21:40:33
categories: IT
tags:
    - IT，Web,PHP
toc: true
thumbnail: https://s1.ax1x.com/2020/03/27/G9O590.png
---

## php是世界上最好的语言？

　　（大概）

<!--more-->

## 配置环境

WAMP是指Windows下Apache+Mysql+PHP的免费软件包集合，下载地址为https://sourceforge.net/projects/wampserver/files/latest/download

安装WAMP后运行软件，即同时运行Apache、Mysql和PHP

如果启动不了，可能是locahost80端口被占用，改成8080端口即可



### 设置虚拟机域名

左键点击wamp图标，在Your Virtual Hosts下面选择Virtual Hosts Managerment，选择

或者在浏览器输入localhost/add_vhost.php,直接访问

或者在http.conf文件中直接修改



修改完之后需要重新启动服务，不然无法更新路径

### LNMP

https://www.jianshu.com/p/114514221922



## 编辑器

Vs code

插件：



**PHP Debug** 在 VS Code 中使用 XDebug，使用该扩展需要确保系统已安装 PHP XDebug 扩展。

**PHP Intellisense** PHP 代码补全支持、工作区搜索、代码跳转/提示、格式化、错误提示等

**PHP Namespace Resolver** 导入 PHP 命名空间。

**PHP DocBlocker** PHP 文档区块快速生成。

**Git History** 查看 Git 历史版本，提交细节



## Composer

Composer是php的包管理工具，类似于node至于vue和react，可以快速安装包

下载安装包，在https://docs.phpcomposer.com/00-intro.html#Installation-Windows

选择安装路径时选择PHP目录：



打开windows命令提示符（cmd）输入composer，效果如下则安装成功：





设置镜像源

```composer
composer config -g repo.packagist composer https://packagist.phpcomposer.com
```

## 创建Laravel项目

创建项目

```composer
composer create-project  --prefer-dist  laravel/laravel=5.5.*  blog
//--prefer-dist表示用dist方式安装
//laravel/laravel=5.5.*指定laravel版本为5.5,不指定默认安装最新版
//blog为项目文件夹名
```

创建的默认应用内容

文件夹内容

- app：存放应用核心代码，如模型、控制器、命令、服务等
- bootstrap：存放 Laravel 框架每次启动时用到的文件
- config：用于存放项目所有配置文件,如数据库、邮件等
- database：存放数据库迁移和填充类文件
- public：Web 应用入口目录，用于存放入口文件 `index.php` 及前端资源文件（CSS、JS、图片等）
- resources：用于存放与非 PHP 资源文件，如视图模板、语言文件、待编译的 Vue 模板、Sass、JS 源文件
- routes：项目的所有路由文件都定义在这里
- storage：用于存放缓存、日志、上传文件、已经编译过的视图模板等
- tests：存放单元测试及功能测试代码
- vendor：通过 Composer 安装的依赖包都存放在这里，通常该目录会放到 `.gitignore` 文件里以排除到版本控制系统之外



## 登录





```
php artisan make auth
```

laravel会生成数据库迁移文件以及登录、注册路由及首页、登录、注册页面，执行数据库迁移生成表

```php
php artisan migrate
```

同时会生成控制类

```php
php artisan migrate:refresh
```



```php
composer require laravel/passport
```





## Dingo





## 七牛云

安装



导入

```php
require 'verdor/autoload.php'
    
use Qiniu\Auth
$accessKey = ''
$secretKey = ''

$auth = new Auth($accessKey,$secretKey)

$bucket = ''

$token = $auth->uploadToken($bucket)

$uploadMgr = new UploadManager();

```



## Markdown



```php
composer require chenhua/larave5-markdown-editor
```



修改`config/app.php`

```php
'provider'=>{
    Chenhua\MarkdownEdito\MarkdownEditorServiceProvider::class
}
'aliases'=>{
    'MarkdownEditor'=> Chenhua\MarkdownEditor\Facadas\MarkdownEditor::class
}
```

执行命令

```php
php artisan vendor:publish --tag=markdown
```

在php文件中插入

```php
@include('markdown::decode,['editors'=>['doc-content']])
echo MarkdownEditor::parse("中间填写markdown格式的文本")
```





## 验证码



```php
composer require mews/captcha
```

在`config/app.php`下修改

```php
Mews\Captcha\CaptchaServiceProvider::class
    
'Captcha'=>Mews\Captcha\Facades::class
```



```php
php artisan vendor:publish
```





## 路由

在 Laravel 应用中，定义路

由有两个入口，一个是 `routes/web.php`，用于处理终端用户通过 Web 浏览器直接访问的请求，另一个是 `routes/api.php`，用于处理其他接入方的 API 请求（通常是跨语言、跨应用的请求）。

对于简单的静态网页，使用基本的路由视图就可以，代码

```node
// 首页
Route::get('/', function () { 
    return view('welcome'); 
});

// 关于我们
Route::get('about', function () { 
    return view('about'); 
});


Route::post('/', function () {}); 
Route::put('/', function () {});
Route::delete('/', function () {});
```

对于复杂业务处理，可以将路由指向控制器，代码

```php
Route::get('/', 'WelcomeController@index');
//这段代码的含义是将针对 / 路由的 GET 请求传递给 App\Http\Controllers\WelcomeController 控制器的 index 方法进行处理。
Route::get('/','IndexController@home')->name('home');
```

#### 路由传参

```php
Route::get('user/{id}', function ($id) {
    return "用户ID: " . $id;
});
```



#### 路由嵌套

如果某些路由拥有共同的路径前缀，例如，所有 API 路由都以 `/api` 前缀开头，我们可以使用 `Route::prefix` 为这个分组路由指定路径前缀并对其进行分组：

```php
Route::prefix('api')->group(function () {
    Route::get('/', function () {
        // 处理 /api 路由
    })->name('api.index');
    Route::get('users', function () {
        // 处理 /api/users 路由
    })->name('api.users');
});
```

子域名路由



```php
Route::domain('{account}.blog.test')->group(function () {
    Route::get('/', function ($account) {
        //
    });
    Route::get('user/{id}', function ($account, $id) {
        //
    });
});
```

#### 兜底路由

在Laravel中，当路由文件中定义的所有路由都无法匹配用户请求的 URL 时，用来处理用户请求的路由，在此之前，Laravel 默认会通过异常处理器为这种请求返回 404 响应，使用兜底路由的好处是我们可以对这类请求进行统计并进行一些自定义的操作，比如重定向，或者一些友好的提示什么的，兜底路由可以通过 `Route::fallback` 来定义：

```php
Route::fallback(function () {
    return '我是最后的屏障';
});
```

#### 重定向路由

如果你需要定义一个重定向到其他 URI 的路由，可以使用 `Route::redirect` 方法，

```php
Route::redirect('/here', '/there', 301);
```





## 控制器

控制器的主要职责就是获取 HTTP 请求，进行一些简单处理（如验证）后将其传递给真正处理业务逻辑的职能部门，如 Service。

### 创建控制器

```php
php artisan make:controller TaskController
```

该命令会在 `app/Http/Controllers` 目录下创建一个新的名为 `TaskController.php` 的文件，默认生成的控制器代码如下：

```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TaskController extends Controller
{
    //
}
```

结合路由设置控制器的方法

```php
Route::get('/test','TestController@show')//不带参数
Route::get('/test/{id}','TestController@show')//带参数
Route::get('/test/{id}','TestController@jingyong')->middleware('login')//带中间件
```

隐式控制器



restful控制器



##  模型



```php
php artisan make:mode Models/Cafe -m
```

模型文件创建在/App文件夹下，在模型中定义与数据库的关联



继承

一个类通过extends创建子类，子类可以覆盖父类的变量或者函数，也可以重写父类方法，要求父类不能声明final或者定义为abstract，使用关键字implement使用一个或多个接口，接口的方法为空，不能直接使用需要重写

```php
class A extends B implement C
```

implement举例

定义接口类shop,定义了三个方法：buy,sell,view，

```php
interface shop 
{
    public function buy($gid)
    public function sell($gid)
    public function view($gid)
}
```

所有继承此类的子类都必须实现三个方法，如果子类没有使用这几个方法就无法运行

```php
class BaseShop implements Shop{
    public function buy($gid){
        echo '你买了$gid的物品'
    }
    public function sell($gid){
        echo '你卖了$gid的物品'
    }
    public function view($gid){
        echo '你查看了$gid的物品'
    }
}
```

extends示例

```php
class A//父类
{
    protected static $item = 'foo'
    protected static $other = 'foo'
        
    public static function method()
    {
        print self::$item."\r\n";
        print self::$other."\r\n";
    }
    public static function othermethod()
    {
        self::$other = $val;
    }
}
```

extends子类及引用

```php
class B extends A
{
    protected static $item = '22';
}
class C extends A
{
    protected static $item = '33';
    
    public static function method()
    {
        print self::$item."\r\n";
        print self::$other."\r\n";
    }
}
class D extends A
{
    protected static $item = '44';
    public static function othermethod()
    {
        self::$other = $val;
    }
}
//调用
B::setOther('CB')
B::method()
C::setOther('CB')
C::method()
D::setOther('CB')
D::method()
```



##  设计模式



## 垃圾回收机制



## Blade引擎模板

Laravel的界面大部分的html文件和php文件，同时Laravel自带Blade引擎解析（与其他模板引擎类似），实现视面的效果。

页面的文件在`resources/views`目录下，引入时代码

```php
return view('以.分隔的视图模板路径');
```

Blade 模板引擎有三种常见的语法：

- 通过以 `@` 作为前缀的 Blade 指令执行一些控制结构和继承、引入之类的操作
- 通过 渲染 PHP 变量（最常用）
- 通过  渲染原生 HTML 代码（用于富文本数据渲染）

#### 引入其他视图组件

使用@include



#### 循环引入某组件



## 中间件

中间件为过滤进入应用的 HTTP 请求提供了一套便利的机制，如验证用户是否登陆。中间件还被用来处理加密事件，跨域等。所有的





Laravel 框架自带了一些中间件，包括认证、CSRF 保护中间件等等。所有的中间件都位于 `app/Http/Middleware` 目录下。

创建中间件：

```php
php artisan make:middleware CheckToken
```

这个命令会在 `app/Http/Middleware` 目录下创建一个新的中间件类 `CheckToken`，

#### 中间件属性

中间件需要指定在执行请求前还是执行请求后执行，执行请求前后的代码分别为：

```php
<?php

namespace App\Http\Middleware;

use Closure;

class BeforeMiddleware
{
    public function handle($request, Closure $next)
    {
        // 执行动作
        return $next($request);
    }
}
```



```php
<?php

namespace App\Http\Middleware;

use Closure;

class AfterMiddleware
{
    public function handle($request, Closure $next)
    {
        $response = $next($request);

        // 执行动作

        return $response;
    }
}
```





#### 不同类型中间件

中间件可以指定为全局中间件、中间件组和指定路由中间件。不同类型中间件的注册都在`\Http\MiddleWare\`.全局中间件在每一个 HTTP 请求时都被执行，分配中间件到指定路由，首先应该在 `app/Http/Kernel.php` 文件中分配给该中间件一个 `key`，默认情况下，该类的 `$routeMiddleware` 属性包含了 Laravel 自带的中间件，要添加你自己的中间件，只需要将其追加到后面并为其分配一个 `key`，中间件组通过指定一个键名的方式将相关中间件分到同一个组里面，这样可以更方便地将其分配到路由中，这可以通过使用 HTTP Kernel 提供的 `$middlewareGroups` 属性实现。





#### CSRF中间件







## Http请求与响应

#### Http请求方式概述

GET:请求指定的页面信息，并返回请求实体

POST:向指定资源提交数据，请求服务器进行处理，如表单数据提交，文件上传等

PUT：向指定资源位置上传其最新内容

DELETE:请求服务器删除所请求的URI所标识的资源



控制器获取请求需要在构造函数或方法中添加request类

```php
use Illuminate\Http\Request;
```



获取请求上传文件

可以使用 `Illuminate\Http\Request` 实例提供的 `file` 方法或者动态属性来访问上传文件， `file` 方法返回 `Illuminate\Http\UploadedFile` 类的一个实例，

保存上传文件



请求



响应返回字符串、数组

响应返回视图

响应返回

响应下载文件

response的download方法是用于生成浏览器下载路径文件的响应，官方定义的函数有三个参数

$pathToFile为文件路径，$name为下载文件显示的名称，$header是http头信息传递

```
return response()->download($pathToFile);
return response()->download($pathToFile,$name,$headers);
```

使用例程如下

```php
$files = './public/images/test.zip';

$name = basename($files);       // basename() 函数返回路径中的文件名部分。

return response()->download($files, $name ,$headers = ['Content-Type'=>'application/zip;charset=utf-8']);
```





## Session与Cookie

Laravel 通过简洁的 API 统一处理后端各种 Session 驱动，目前支持的流行后端驱动包括 [Memcached](https://memcached.org/)、[Redis](https://redis.io/) 和数据库。





## Vue

默认情况下，新安装的 Laravel 应用将会在 `resources/assets/js/components` 目录下包含一个 Vue 组件 `ExampleComponent.vue`，这个组件在`app.js`中注册

```php
Vue.component(
    'example', 
    require('./components/ExampleComponent.vue')
);
```

把在resources/views目录下的welcome.blade.php中的显示内容清理掉。只保留基本的html结构。然后引入`\resource\assets\js`下的app.js文件作为启动入口，

```php
<script type="text/javascript" src="/js/app.js"></script>
<link rel="stylesheet" type="text/css" href="/sass/app.scss">
```

配置好之后，我们先在welcome.blade.php中添加上vue的路由放在div中，

```php
<router-view />
```



引入element-ui

```js
npm i element-ui -S
```

在app.js中添加

```js
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
```



使用时在php文件中引入

安装。

另外，每次修改 Vue 组件后都要运行一次 `npm run dev` 命令，

或者运行 `npm run watch` 命令进行监听，一旦组件被修改后可以自动进行重新编译。

### 使用vue-router管理页面跳转

```php
npm install vue-router --save-dev
```

在`\resource\assets\js`下新建route.js,并配置路由

```js
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use( VueRouter )
```

添加路由路径和对应组件

```php
export default new VueRouter({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Vue.component( 'Home', require( './pages/Home.vue' ) )
        },
        {
            path: '/cafes',
            name: 'cafes',
            component: Vue.component( 'Cafes', require( './pages/Cafes.vue' ) )
        },
        {
            path: '/cafes/new',
            name: 'newcafe',
            component: Vue.component( 'NewCafe', require( './pages/NewCafe.vue' ) )
        },
        {
            path: '/cafes/:id',
            name: 'cafe',
            component: Vue.component( 'Cafe', require( './pages/Cafe.vue' ) )
        }
    ]
});
```

在app.js中引用

```js
import router from './routes.js'

new Vue({
    router
}).$mount('#app')
```

在后端生成对应路由







### 使用axios获取后端数据

浏览器具有同源策略，域名、http协议、端口均相同的才能操作dom

axios可以跨域获取数据，首先安装

```js
npm install axios
npm install --save axios vue-axios
```

axios可以进行跨域请求，它是基于es 6 Promise进行封装的

Promise是一个构造函数，参数有resolve和reject，分别表示异步操作成功和失败后的回调函数，promise函数执行完生成一个promise对象，对象有.then方法，继续进行



.catch方法是.then（null,rejection)的别名，处理错误信息

全局配置axios

```js
import axios from 'axios
'
Vue.prototype.$axios=axios
axios.defaults.baseURL='https://local.newerp.com'
Vue.prototype.$http = axios//将axios全局注册
```



axios只能使用get和post请求数据

```php
import axios from 'axios'
axios.get('/user?ID=12345')
    .then(function(response){
        
    })
    .catch(function (error){
        
    })

axios.post('/user',{
    firstname:'',
    lastname:'',
})
   .then(function(response){

    })
    .catch(function(error){

    })
        
//执行多个请求
function getUserAccout(){
     return axios.get('/user/12345')
    }
function getUserPermission(){
     return axios.get('/user/12345/permission')
    }
axios.all([getUserAccout(),getUserPermission()])
    .then(axios.spread(function(acct,perms){
        
    }))
```



可以利用axios设置拦截器

```js
//请求拦截器
axios.interceptor.request.use(config=>{
    
},err=>{
    
});
//响应拦截器
axios.interceptor.response.use(res=>{
    
},err=>{
    
})
```





### 使用vuex进行状态树管理

使用vuex对数据状态进行管理，安装

```js
npm install vuex
```

在js下创建store.js,用以储存数据状态

```js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use( Vuex )

export default new Vuex.Store({
    modules: {

    }
});
```

在app.js中引入

```js
import store from './store.js'

new Vue({
    router,
    store
}).$mount('#app');
```

用module定义状态

```
export default{
state:{

},
action:{

},
mutation:{

}
}

import Authuser from './modules/auth'
```





## 数据库操作

数据库的连接配置文件位于 `config/database.php`，和很多其他 Laravel 配置一样，你可以为数据库配置多个「连接」，然后决定将哪个「连接」作为默认连接。

### ORM模型

ORM是Object Relational Mapping,意为对象关系映射，构建类与数据表之间的映射关系，



### Mysql

配置.env文件

```php
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=
DB_USERNAME=root
DB_PASSWORD=密码
```

增删改查

先生成迁移文件

```pphp
php artisan make:migration create_users_table
```

laravel生成的迁移文件前面带有日期，可以忽略。

迁移文件中至少包含两个方法up和down，根据需求修改生成的表字段

```php
//三个字段 id、name、password
public function up()
{
    Schema::create('user',function(Blueprint $table){
        $table->increment('id');
            $table->string('name');
            $table->string('pwd');    
        $tabel->timestamps();
    });
}
```

表中的列类型

```php
$table->increment('id');//自动递增的主键

$table->integer('age')->comment('用户id');//整数型
$table->integer('age')->unsigned();//无符号整数型
$table->string('name');//字符串型
$table->string('name')->unsigned();//无符号字符串型
$table->float('age');//浮点数型
$table->boolean('')//布尔型
$table->text('')//文本型
$table->dateTime('')//日期时间型
$table->date('')//日期型
$table->time('')//时间型
```

删除列

```suo
$table->dropColumn(['name','age'])
```

创建索引

```php
$table->primary('id')//主键索引
$table->primary(['first','last'])//主键索引
$table->unique('mobile')//唯一索引
$table->index('state')//普通索引
```





生成数据表(迁移)

```php
php artisan migrate
```





### Redis

在 Laravel 中使用 Redis 之前，需要通过 Composer 安装 `predis/predis` 包：

```php
composer require predis/predis
```



### Mongo

使用推荐组件

```php
composer require jenssegers/mongodb ^3.3
```

在`\config\app.php`下注册服务

```php
'providers'  中加入
Jenssegers\Mongodb\MongodbServiceProvider::class,
'aliases' 中加入
'Moloquent' => Jenssegers\Mongodb\Eloquent\Model::class,
'Mongo'     => Jenssegers\Mongodb\MongodbServiceProvider::class,
```

在`\config\database.php`下添加Mongo配置信息

```php
'mongodb' => [            
    'driver'   => 'mongodb', 
    'host'     => 'localhost',     
    'port'     => 27017,         
    'database' => 'mydb',         
    'username' => '',          
    'password' => '',
],
```

默认的数据库改为Mongodb

```php
'default' => env('DB_CONNECTION', 'mongodb'),
```

项目中使用

在app下新建Mongodb.php

```ph
<?php、
/** * Created by PhpStorm. 
* User: Administrator 
* Date: 2018/6/27 0027 
* Time: 上午 11:19 
*/
namespace App; 
use DB; 
class Mongodb
{   
        public static function connectionMongodb($tables)  
        {        
             return $users = DB::connection('mongodb')->collection($tables); 
        }
}

```

在控制器里增删改查

```php
//增
$connection = Mongodb::connectionMongodb('xxx表名');
$result= $connection ->insert($data);
//删
$connection = Mongodb::connectionMongodb('xxx表名');
$result= $connection ->where('id', $id)->delete();
//改
$connection = Mongodb::connectionMongodb('xxx表名');
$result= $connection ->where('id',$id)->update($data);
//查
$connection = Mongodb::connectionMongodb('xxx表名'); 
$result= $connection ->where('id',$id)->get();
如果用了软删除，此处要加上
$result=$connection->whereNull('deleted_at')->get();

```

使用ORM

```php
<?php 
namespace App; 
use Emadadly\LaravelUuid\Uuids;
use Jenssegers\Mongodb\Eloquent\Model;
use Jenssegers\Mongodb\Eloquent\SoftDeletes;
class ExampleModel extends Model{    
    //    use Uuids;     
    /**     
    * Indicates if the IDs are auto-incrementing. 
    *     * @var bool  
    */    
    public $incrementing = false;    
    use SoftDeletes;    
    protected $connection = 'mongodb';
    protected $collection = 'xxx表名'; 
    //表名   
    protected $primaryKey = 'id';   
    //设置主键  
    protected $fillable = [ 'id','title', 'type','xx']; 
    //设置字段白名单   
    /**   
    * 需要被转换成日期的属性。  
    *     * @var array  
    */   
    protected $dates = ['deleted_at']; 
}

```

增删改查

```php
$result= ExampleModel ::create($data);
$result= ExampleModel ::where('id', $id)->delete();
$result= ExampleModel ::where('id',$id)->update($data);
$result= ExampleModel ::all();
$result= ExampleModel ::where('id',$id)->get();
```





## 发送邮件

Laravel支持STMP,

## 



## 第三方账号登陆

Laravel官方拓展包Laravel Socialite支持Facebook、Twitter、Google、LinkedIn、GitHub 和 Bitbucket，国内使用QQ或者微信登录的话，使用别的拓展包，这里以QQ和微信为例

composer安装微信扩展包

```php
composer require socialiteproviders/weixin
```

composer安装qq扩展包

```php
composer require socialiteproviders/qq
```

从微信开发者工具和qq开发者工具申请获取appid和appkey



## 使用React

除了Laravel支持的Vue框架，也可以使用React来构建页面，但在同一应用中只能同时使用一种。在Laravel应用中，使用带 `react` 选项的 `preset` 命令即可：

```php
php artisan preset react
```

这个命令将会移除 Vue 脚手架代码并将其替换为 React 脚手架代码，同时包含一个示例组件。





## 部署到服务器

服务器的node、php、composer版本都要与本地一致，否则会出错或者编译出错

### Ubuntu LNMP

nginx需要php-ftm去与php联合解析

在服务器上安装LNMP，系统以ubuntu18.0为例

```ubuntu
do-release-upgrade
apt-get install nginx
apt-get install mysql-server
apt-get install php-fpm
```

安装php扩展包

```linux
apt-get install php-mysql php-xml php-mbstring php-ctype php-zip php-curl
```

安装composer

```linux
wget https://getcomposer.org/download/1.8.0/composer.phar
mv composer.phar /usr/local/bin/composer
chmod u+x /usr/local/bin/composer
```

安装npm

```linux
apt-get install npm
```

将项目下载到服务器

```git
git clone 
```

进入博客项目，安装前端和后端依赖项，编译前端

```linux
composer install
npm install
npm run prod
```

创建线上数据库

```php
php artisan migrate
```

将nginx指向laravel

```linux
cd /etc/nginx/sites-available
touch laravel-blog.conf
```

启动服务

```linux
service nginx start
service php7.2-fpm start
service mysql start
```



### Centos LAMP

使用

安装apache

```php
yum -y install httpd
```

启动

```linux
systemctl start httpd.service
```

安装php

```linux

```



安装mysql

```php

```

安装composer、node





## 其他电脑端使用

在其他电脑上运行时首先确保安装php、mysql、apache、node、composer、

首先将代码下载到本地

```
git clone
```

下载依赖项

```
composer install//下载laravel依赖项
npm install//前端依赖项
```

l

```php
copy .env.example .env
php artisan key:generate
```



如果使用数据库，配置数据库，进行数据库迁移

```php
php artisan migrate
php artisan passport:install
```





## laravel的核心思想

服务容器

依赖注入和绑定

Contract和Facades(合同和假象)

在配置文件中指明所需的缓存驱动（redis、memcached等），laravel就会自动切换到这种驱动，你不需要