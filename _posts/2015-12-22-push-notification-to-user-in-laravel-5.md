---
title: 在 laravel 5 實作瀏覽器推播通知
date: 2015-12-22 01:01:00
categories: tutorial
tags:
  - php
  - laravel
  - laravel5
  - notification
  - javascript
  - socket-io
---

> 更新於 2017/1/10：Laravel 官方已推出 [Laravel Echo](https://laravel.com/docs/5.3/broadcasting#receiving-broadcasts)，可簡化整個建置流程，有興趣可前往參考。

今天在逛 [PHPHub](https://phphub.org) 時剛好看到[這篇](https://phphub.org/topics/1585)，想著之前也想做類似 Facebook 的通知服務，剛好之前也有碰過一陣子的 socket.io，所以就試著實做看看了。不過推播通知在手機上是相當常見的，但在 Web 上不知為何卻相當少見，也可能是我見識太淺了，看過的網站太少 XD。

[本文的原始碼](https://github.com/jigsawye/laravel-push-notification-demo)

<!-- more -->

### 起手式

首先我們需要先建 Laravel 專案：

```bash
$ laravel new notification
$ cd notification
$ composer install
$ npm install
```

設定你的 `.env`，除了資料庫外我們還會使用到**隊列（Queue）**及**廣播（broadcast）**，看起來會像：

```bash .env
...
QUEUE_DRIVER=redis
BROADCAST_DRIVER=redis
...
```

要使用 Redis 必須在 Composer 安裝 `predis/predis`：

```bash
$ composer require predis/predis
```

接著執行遷移，跟 5.2 提供的 Auth scaffold（幫我們把 Auth 的部分連 View 都建完）：

```bash
$ php artisan migrate
$ php artisan make:auth
```

試試看應用程式有沒有正常執行，最後新增兩個使用者，看要在瀏覽器直接建立，或是其他方式也可以。

### 什麼是隊列

[隊列](https://laravel.tw/docs/5.1/queues#introduction)簡單來說就像是 JavaScript 的非同步機制，讓你把一個耗時的工作丟給別人做，你的程式會跳過這部分繼續執行。最常見到的案例就是寄 e-mail 跟簡訊。

### 什麼是廣播

我們會利用 Laravel 的[廣播事件](https://laravel.tw/docs/5.1/events#broadcasting-events)做推送通知的服務，開始之前建議大概瀏覽一下文件，廣播的方式大概如下圖：

![Imgur](https://i.imgur.com/LiEna61.png)

流程如下：

- 在 Laravel 執行一個推播通知事件
- 推播通知事件的資訊會推送至 Redis 中
- Node 端會訂閱該 Redis 的頻道，接收到推播通知事件的資訊
- 透過 websocket 將推播通知送給使用者

### 建立推播通知事件

首先先讓我們建立一個推播通知事件，所有的推播都會透過此事件推送到 Redis：

```bash
$ php artisan make:event PushNotification
```

程式碼如下：

```php
<?php

namespace App\Events;

use App\Events\Event;
use App\User;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class PushNotification extends Event implements ShouldBroadcast
{
    use SerializesModels;

    /**
     * @var string
     */
    public $token;

    /**
     * @var string
     */
    public $message;


    /**
     * Create a new event instance.
     *
     * @param User $user
     * @param      $message
     */
    public function __construct(User $user, $message)
    {
        $this->token = sha1($user->id . '|' . $user->email);
        $this->message = $message;
    }


    /**
     * Get the channels the event should be broadcast on.
     *
     * @return array
     */
    public function broadcastOn()
    {
        return ['notification'];
    }
}
```

我們的事件會有兩個屬性，一個是要推播的 `message`，另一個比較特別的則是 `token`。`token` 會作為 socket.io 中 room 的名稱，代表一個使用者。也就是說一個使用者只會有一個 room（`token`），這麼做可以讓我們指定要推播給哪個使用者。

`broadcastOn` 則是設定在 Redis 中的頻道名稱，我們會在 socket.io server 端透過這個名稱來訂閱由此事件傳遞的資訊。

若不太明白可以先接著往下看，會有更詳細的說明。

> `token` 的雜湊方式可以隨你喜歡更改，但要確定每次雜湊出來的值都相同，因為我們在 render view 給使用者的時候也會雜湊一組 token 給前端的 JavaScript，以加入 socket.io 中特定的 room。

### 建立 Socket.io Server

我們的 socket.io 會有兩個任務：

- 接收由 Laravel 的 PushNotification 事件送來的推播資訊
- 將內容透過 websocket 推播給使用者

讓我們先使用 npm 安裝必要的套件：分別是 `express`（http server）、`socket.io`（websocket server）及 `ioredis`（訂閱 redis）：

```bash
$ npm install express socket.io ioredis --save
```

接著我們建立 `socket.js`，先寫 redis 部份的程式碼測試與 Laravel 廣播事件的串接是否有問題：

```js
var Redis = require('ioredis');
var redis = new Redis();

// 訂閱 redis 的 notification 頻道，也就是我們在事件中 broadcastOn 所設定的
redis.subscribe('notification', function(err, count) {
  console.log('connect!');
});

// 當該頻道接收到訊息時就列在 terminal 上
redis.on('message', function(channel, notification) {
  console.log(notification);
});
```

###### 測試與 Laravel 是否正確串接

首先你必須先確認這些東西有沒有執行：

- Laravel Application（Nginx or `php artisan serve`）
- Redis server
- 隊列監聽器（`php artisan queue:listen`）
- socket.io server（`node socket.js`）

確認完畢後，我們進入 Laravel 的 Tinker 做測試：

```
$ php artisan tinker
```

![Imgur](https://i.imgur.com/THwUJG2.gif)

我們直接觸發事件：

```php
event(new App\Events\PushNotification(App\User::first(), 'banana!'))
```

你應該在 node 的 terminal 看到：

```bash
{"event":"App\\Events\\PushNotification","data":{"token":"long-hash-string","message":"banana!"}}
```

### 連接前端與 socket.io

###### 前端

首先我們必須先安裝 `socket.io-client`，這是 socket.io 在前端所使用的套件，我們會透過 server side 的開發方式，再透過 elixir 的 browserify 轉成前端可執行的 JavaScript。

```bash
$ npm install socket.io-client --save
```

建立 `resources/assets/js/app.js`，撰寫以下程式碼：

```js
var io = require('socket.io-client');

// 建立 socket.io 的連線
var notification = io.connect('http://localhost:3000');

// 當從 socket.io server 收到 notification 時將訊息印在 console 上
notification.on('notification', function(message) {
  console.log(message);
});
```

接著修改 `gulpfile.js`，然後執行 `gulp`，他會將編譯結果放在 `public/js/app.js`：

```js
elixir(function(mix) {
  mix.browserify('app.js');
});
```

接著我們希望在 `/home` 能接收推播（5.2 的 `make:auth` 預設提供 `/home` 作為登入後的首頁），所以先在 `resources/views/layouts/app.blade.php` 下方加上 `@yield('scripts')` ，看起來會像這樣：

```html
    ...
        </div>
    </nav>

    @yield('content')

    @yield('scripts')

    <!-- JavaScripts -->
    {{-- <script src="{{ elixir('js/app.js') }}"></script> --}}
    ...
```

然後在 `resources/views/home.blade.php` 下面載入剛剛寫好的 JavaScript：

```html
@section('content')
<script src="/js/app.js"></script>
@endsection
```

###### 後端

修改剛剛的 `socket.js`，增加 socket.io 及推送通知至前端的程式碼：

```js
var app = require('express');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Redis = require('ioredis');
var redis = new Redis();

redis.subscribe('notification', function(err, count) {
  console.log('connect!');
});

redis.on('message', function(channel, notification) {
  console.log(notification);
  notification = JSON.parse(notification);

  // 將訊息推播給使用者
  io.emit('notification', notification.data.message);
});

// 監聽 3000 port
http.listen(3000, function() {
  console.log('Listening on Port 3000');
});
```

接著就可以測試前端是否可以收到通知了！

![Imgur](https://i.imgur.com/zDsnFdd.gif)

### 區分使用者

如果你有開不同瀏覽器登入不同使用者的話會發現，不管你在事件的 `User` 傳入誰，每個使用者都會收到通知。

因為所有使用者都屬於同一個 channel（`notification`）。這時就要使用 `token` 及 socket.io 的 room 來區分使用者。每個 `token` 代表一個 room，也就是一個使用者，我們就可以由 Laravel 廣播事件內的 token 決定要接推播通知傳給哪個使用者：

![Imgur](https://i.imgur.com/MgYnVql.png)

###### 前端

我們要做的事情有：

- 在 Controller 產生 `token`（與事件中的相同），並傳遞至 View
- 前端的 JavaScript 取得 `token`，並傳給 socket.io server 加入指定的 room

首先，先修改 `HomeControllr@index`

```php
/**
 * Show the application dashboard.
 *
 * @return Response
 */
public function index(Request $request)
{
    $user = $request->user();
    $token = sha1($user->id . '|' . $user->email);

    return view('home', compact('token'));
}
```

接著修改剛剛新增在 `resources/views/home.blade.php` 的部分，將 `token` 傳至 JavaScript 中：

```html
...
@section('content')
<script>
    Notification.TOKEN = '{{ $token or null }}';
</script>
<script src="/js/app.js"></script>
@endsection
```

修改 `resources/assets/js/app.js`，使用 `token` 加入使用者的 room：

```js
var io = require('socket.io-client');

var notification = io.connect('http://localhost:3000');

// 當連接到 socket.io server 時觸發 set-token 設定使用者的 room
notification.on('connect', function() {
  notification.emit('set-token', Notification.TOKEN);
});

notification.on('notification', function(message) {
  console.log(message);
});
```

###### 後端

修改 `socket.js`，讓使用者加入屬於他的 room，並由 Laravel 廣播事件資訊內的 token 決定要傳給哪個使用者（room）：

```js
var app = require('express');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Redis = require('ioredis');
var redis = new Redis();

redis.subscribe('notification', function(err, count) {
  console.log('connect!');
});

io.on('connection', function(socket) {
  // 當使用者觸發 set-token 時將他加入屬於他的 room
  socket.on('set-token', function(token) {
    console.log(token);
    socket.join('token:' + token);
  });
});

redis.on('message', function(channel, notification) {
  console.log(notification);
  notification = JSON.parse(notification);

  // 使用 to() 指定傳送的 room，也就是傳遞給指定的使用者
  io.to('token:' + notification.data.token).emit(
    'notification',
    notification.data.message
  );
});

// 監聽 3000 port
http.listen(3000, function() {
  console.log('Listening on Port 3000');
});
```

### Demo

![Imgur](https://i.imgur.com/Ar2N95e.gif)

基本上前端收的到通知之後，如何呈現就不是困難的問題了。

[本文的原始碼](https://github.com/jigsawye/laravel-push-notification-demo)

### 後記

實作其實沒那麼困難，不過如果真的要上 Production 的話還是得再思考一下！因為感覺這個 Solution 沒有很透徹 XD！

像是 token 的部分這樣安全性不知道會不會不佳，如果想更安全可以用更複雜的演算法，或是在 Laravel 跟 socket.io server 用相同的加密演算法，互相加解密也可以。作法應該還很多種，有厲害的大大還麻煩幫忙補充 XD
