---
title: 在 Laravel 使用 Route Model Binding
date: 2015-07-23 16:56:49
categories:
- tutorial
tags:
- laravel
- laravel5
- route-model-binding
---
> 本文適用於 Laravel 5.0 以上版本。

#### 什麼是 Route Model Binding？

> Laravel model binding provides a convenient way to inject class instances into your routes. For example, instead of injecting a user's ID, you can inject the entire User class instance that matches the given ID.
(http://laravel.com/docs/5.0/routing#route-model-binding)

<!-- more -->

中文版：
> Laravel 模型綁定提供方便的方式將模型實例注入到你的路由中。例如，比起注入 User 的 ID ，你可以選擇注入符合給定 ID 的 User 類別實例。
(http://laravel.tw/docs/5.0/routing#route-model-binding)

文字敘述不懂沒關係，更快的方式就是舉個例子，假設我們有一個 Resource Route 及對應的 Resource Controller：

```php
Route::resource('articles', 'ArticlesController');
```

```php
class ArticlesController extends Controller
{
    // 省略七個標準 RESTful method
}
```

一般來說，在 `show` method 裡我們通常會這樣實作：

```php
public function show($id)
{
    $article = Article::find($id);

    return view('articles.show', compact('article'));
}
```

但是只要透過 Route Model Binding，我們的程式碼就可以改成這樣：

```php
public function show(Article $article)
{
    return view('articles.show', compact('article'));
}
```

對於我這種超懶的開發者很受用，少寫一行算一行，幫助開發更快速。

#### 設定 Route Model Binding

##### 綁定 Model
一般來說都會將綁定設定在 `RouteServiceProvider`（App/Provider/RouteServiceProvider.php）中，在這裡我用上述的範例做綁定：

```php
public function boot(Router $router)
{
    parent::boot($router);

    $router->bind('articles', 'App\Article');
}
```

接著在我們的 method 直接使用 type-hine 注入 Model，就可以直接存取 `$article` 了：

```php
public function show(Article $article)
{
    return view('article.show', compact('article'));
}
```

也就是說，如果 Request 是 `/articles/7`，那麼 `$article` 就會是 `Article::findOrFail(7)`，若該筆資料不存在則會拋出 404。

#### 綁定做了什麼？

那麼 `bind` 做了什麼事呢？讓我們看一下 Route list：

```
+-----------+---------------------------+------------------+----------------------------+
| Method    | URI                       | Name             | Action                     |
+-----------+---------------------------+------------------+----------------------------+
| GET|HEAD  | articles                  | articles.index   | ArticlesController@index   |
| GET|HEAD  | articles/create           | articles.create  | ArticlesController@create  |
| POST      | articles                  | articles.store   | ArticlesController@store   |
| GET|HEAD  | articles/{articles}       | articles.show    | ArticlesController@show    |
| GET|HEAD  | articles/{articles}/edit  | articles.edit    | ArticlesController@edit    |
| PUT       | articles/{articles}       | articles.update  | ArticlesController@update  |
| PATCH     | articles/{articles}       | articles         | ArticlesController@update  |
| DELETE    | articles/{articles}       | articles.destroy | ArticlesController@destroy |
+-----------+---------------------------+------------------+----------------------------+
```

注意到有 `{articles}` 的 Route，這邊的變數 `articles` 也就是我們在 `bind()`傳入的第一個參數，Route Model Binding 會自動在你綁定的 Model（第二個參數 `\App\Article`） 搜尋（`findOrFail`）主鍵為 `{articles}` 的資料。所以不只在 `show` method，只要任何有 `{articles}` 的 Route 都會自動做綁定，相當的方便（懶人）。

#### 自定搜尋條件

有些情況並不適用於預設的 `Model::findOrFail($id)`，例如只希望找出已經發佈的 Article，這時候可以改變 `bind()` 的第二個參數為包含自訂搜尋的條件的 Closure：

```php
public function boot(Router $router)
{
    parent::boot($router);

    $router->bind('articles', function ($id) {
        return \App\Article::where('published_at', '<=', Carbon::now())->findOrFail($id);
    });
}
```

到此你已經瞭解如何運用 Route Model Binding 囉！未來如果搭上 Form Model binding 在開發上會更加的快速（懶人）！
