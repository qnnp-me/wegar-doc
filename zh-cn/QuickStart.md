# <span class="icon-startup-rocket"></span> 快速开始

## <span class="icon-yunhang"></span> 基本使用

### <span class="icon-songhuoanzhuang-"></span> 安装

```bash
composer require qnnp/wegar
```

### <span class="icon-startup"></span> 使用

```php
<?php

namespace App\controller;

use plugin\admin\api\Middleware as AccessControl;
use qnnp\wegar\Attribute\Middleware;
use qnnp\wegar\Attribute\RemoveFromDoc;
use qnnp\wegar\Attribute\Route;
use support\Response;

#[RemoveFromDoc] // 加上这个注解时这个类之下的所有路由将不会在 API 文档中显示
#[Middleware([AccessControl::class])] // 加载中间件
class IndexController
{
    #[Route] // 声明自动路由
    function test(): Response
    {
        return response('index/test');
    }

    #[Route('/')] // 声明自定义路由
    function index(): Response
    {
        return response('Hello Wegar');
    }
    
    // 声明需要参数的路由，如果没有声明 RemoveFromDoc 将会在 OpenAPI 文档和 Swagger 中显示
    #[Route(post: ['field1', 'field2'])]
    function post(): Response
    {
        return response('Hello Wegar');
    }
}
```

!> **请注意！** 安装 Wegar 之后为安全起见将会默认关闭 webman 的默认路由加载方式！如需开启请修改文件 config/plugin/qnnp/wegar/route.php 并评估安全问题！

## <span class="icon-EC_gerenwengao-chanpinshuoming"></span> 前期准备

### <span class="icon-php"></span> 安装 PHP

> #### PHP 相关知识请阅读 PHP 官方文档 :
> - [PHP 是什么？](https://www.php.net/manual/zh/intro-whatis.php)
> - [PHP 能做什么？](https://www.php.net/manual/zh/intro-whatcando.php)
> - [PHP 的安装与配置](https://www.php.net/manual/zh/install.php)

### <span class="icon-php_elephant"></span> 安装 composer

> #### 安装 Composer 请参考《 [如何安装 Composer](https://pkg.xyz/#how-to-install-composer) 》
> Composer 是 PHP 的一个依赖管理工具。它允许你申明项目所依赖的代码库，它会在你的项目中为你安装他们。

### ![](https://www.workerman.net/favicon.ico ':size=18') 创建 webman 项目

> webman是一款基于workerman开发的高性能HTTP服务框架。webman用于替代传统的php-fpm架构，提供超高性能可扩展的HTTP服务。你可以用webman开发网站，也可以开发HTTP接口或者微服务。
>
> #### ➜ [安装/创建 webman 项目](https://www.workerman.net/doc/webman/install.html)
> #### ➜ [webman 项目简单示例](https://www.workerman.net/doc/webman/tutorial.html)

Wegar 自动配置并完成了 webman 的路由注册、中间件加载功能，安装完 Wegar 之后只需要关注控制器内相关实现即可


## <span class="icon-tubiao-"></span> 使用 Wegar 插件

### ![](./../_media/img/logo.256.png ':size=18') 安装 Wegar

> 使用 Wegar 之前请确认已经安装/创建了 webman 项目

1. 创建好 webman 项目之后在终端窗口进入项目对应目录
2. 执行命令行 [`composer require qnnp/wegar` bash] 安装 Wegar 插件

> 安装 Wegar 插件之后将会自动安装对应的 webman/admin 插件，可使用 webman/admin 权限管理功能控制哪些人员可访问 Wegar
生成的接口文档。

> #### 在使用 Wegar 之前请掌握以下相关知识：
> - [webman 的目录结构](https://www.workerman.net/doc/webman/directory.html)
> - [webman 的控制器](https://www.workerman.net/doc/webman/controller.html)
> - [HTTP 请求方法规范](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods)

Wegar 用于自动完成 webman 控制器的路由注册、控制器对应接口文档的生成、用于控制器的中间件注入以及将来会支持的对应用户输入参数校验等工作。

> #### 深入了解 Wegar 源码还需要了解：
> - webman 相关知识
>   - [请求](https://www.workerman.net/doc/webman/request.html)
>   - [响应](https://www.workerman.net/doc/webman/response.html)
>   - [路由](https://www.workerman.net/doc/webman/route.html)
>   - [中间件](https://www.workerman.net/doc/webman/middleware.html)
> - PHP 相关知识
>   - [反射](https://www.php.net/manual/zh/book.reflection.php)
>   - [注解](https://www.php.net/manual/zh/language.attributes.php)

### <span class="icon-ercikaifashili"></span> 控制器示例
```php
<?php

namespace App\controller;

use plugin\admin\api\Middleware as AccessControl;
use plugin\user\api\Middleware as UserMiddleware;
use qnnp\wegar\Attribute\Helper\wegar\post;
use qnnp\wegar\Attribute\Middleware;
use qnnp\wegar\Attribute\Route;
use support\Request;
use support\Response;

// 为当前控制器类文件内的所有方法配置中间件
#[Middleware([AccessControl::class, UserMiddleware::class])]
class IndexController
{
    // 注册路由 /index/test 以访问此方法，默认 HTTP 请求方式为 GET
    // 访问 URL 为 http://example.com/index/test
    #[Route]
    function test(): Response
    {
        return response('index/test');
    }

    // 注册路由 / 以访问此方法
    // 访问 URL 为 http://example.com/
    #[Route('/')]
    function index(): Response
    {
        return response('Hello Wegar');
    }

    // 注册路由 /index/save 以访问此方法
    // 访问 URL 为 http://example.com/save
    // 查看 Wegar 文档时可看到此方法需要两个参数 field1 和 field2
    // 其中 field2 要求为必填
    #[Route(methods: 'post', post: ['field1', 'field2' => [post::required => true]])]
    function save(Request $request): Response
    {
        $data = $request->post();
        var_dump($data);
        return response('Data received');
    }
}
```

### <span class="icon-songhuoanzhuang-"></span> 加载其他目录 App

#### 在需要加载路由的项目根文件夹新建文件引导文件

**如 TestApp：**

- App路径： `/plugin/TestApp`
- 控制器目录：`/plugin/TestApp/app`

1. 新建引导文件： `/plugin/TestApp/app/TestApp.php`

```php
<?php # /plugin/TestApp/app/TestApp.php

namespace plugin\TestApp\app;

class TestApp {}

```

2. 修改文件： `/config/plugin/qnnp/wegar/route.php` 中的

```php
Wegar::scan(init: true);
```

为

```php
Wegar::scan([plugin\TestApp\app\Test::class], init: true);
```

3. 或者新建文件： `/plugin/TestApp/config/route.php`

```php 
<?php # /plugin/TestApp/config/route.php

use qnnp\wegar\Module\Wegar;

Wegar::scan([ plugin\TestApp\app\Test::class ]);
```
