---
title: 在 Laravel 5 使用 PJAX 加快網頁載入速度
date: 2015-06-22 11:50:48
categories:
- tutorial
tags:
- laravel
- laravel5
- pjax
---
>本文適用於 Laravel 5.0 以上版本。

#### 什麼是 PJAX ？

簡單來說，以往使用的 `AJAX` 可以不重新載入網頁，異步載入伺服器的資料，並更新畫面。而 `PJAX` 則是加入了 HTML5 的 `PushState` 技術，在取得資料的同時改變 Url，可以保留瀏覽器上一頁的功能，而且不會從伺服器重新載入 js 及 css 之類的靜態檔案，加快網頁的載入速度。

<!-- more -->

#### 開始上手

##### 伺服器端安裝 `jacobbennett/pjax`

在 Laravel 我們需要安裝 `jacobbennett/pjax` 這隻 Package（[Github](https://github.com/JacobBennett/pjax)），他會根據 Request 是否為 PJAX 來回傳對應資料。安裝請直接修改 `composer.json`：

```js
...
"require": {
    ...
    "jacobbennett/pjax": "0.*",
}
...
```

接著執行 `composer update` 或是 `composer install` 安裝 package。

安裝完成後，我們要把 `jacobbennett/pjax` 的 middleware 加到我們預設的 middleware 中，打開 `app/Http/Kernel.php`，在 `$middleware` 增加：

```php
...
protected $middleware = [
    ...
    'JacobBennett\Pjax\PjaxMiddleware',
];
...
```

這樣 Laravel 的部分就準備完成了。

##### 前端安裝 `jQuery.pjax`
前端部分使用 `jQuery.pjax` 這隻 Library，`jQuery.pjax` 是基於 jQuery，並封裝了 pushState 與 AJAX ，讓你更容易使用 PJAX 的 Library，關於此 Library 可以參閱 [jQuery.pjax 的 Github](https://github.com/defunkt/jquery-pjax)。另外 `jQuery.pjax` 依賴於 `jQuery 1.8.x` 以上，所以安裝前請確保你的專案有載入 `jQuery`。

下載 `jquery.pjax.js` 至你的專案中，本範例下載至專案的 `/public/javascripts` 資料夾，我習慣使用 `wget`，你可以使用你習慣的方式下載，像是 `curl` 或是直接用瀏覽器：
```bash
$ wget -P public/javascripts https://raw.github.com/defunkt/jquery-pjax/master/jquery.pjax.js
```

接著在你的 `views` 中載入檔案：
```xml
<script src="{{ assets('javascripts/jquery.pjax.js') }}"></script>
```

最後增加 JavaScript：
```js
$(document).ready(function()
{
    $(document).pjax('a', 'body');
});
```
上方程式的第一個參數代表會攔截所有的 `a` 標籤，若瀏覽器有支援就改以 PJAX 的方式送出，第二個參數代表接收到的資料替換至 `body`。

另外，PushState 有瀏覽器支援的問題（萬惡的 IE），支援度可以至 [Can I use](http://caniuse.com/#search=pushstate) 查看，不過這不用擔心，若瀏覽器不支援 PushState，就會以原始方式打開超連結。

#### 完成！
完成上面的步驟後你的專案就擁有 PJAX 的功能了，打開 Devtools 的 Network 畫面，點擊任一 `a` 標籤，就會看到帶有 `_pjax=body` 的 Request ，接著畫面就會更新了！

![](http://i.imgur.com/xrKP9S0.png)

#### 加上載入動畫
不過這樣的 UX 不是很好，有時點擊連結後有某些原因造成等待的時間較久，使用者可能覺得沒反應就會重新載入，或是重複點擊，這樣的效果並不好，所以我們要加上載入動畫，實作效果可以參考 Youtube（下圖畫面上方的紅色讀取條）。

![](http://i.imgur.com/rXvQMSS.png)

###### 安裝 nprogress.js
`nprogress.js` 是一個載入動畫的 Library，效果可以參考[它的官方網站](http://ricostacruz.com/nprogress/)，也可在[它的 Github](https://github.com/rstacruz/nprogress) 參考使用的 API。

下載檔案至專案中：
```bash
$ wget -P public/javascripts http://ricostacruz.com/nprogress/nprogress.js
$ wget -P public/stylesheets http://ricostacruz.com/nprogress/nprogress.css
```

接著在 `views` 載入檔案：
```xml
<link rel="stylesheet" href="{{ asset('stylesheets/nprogress.css') }}">
<script src="{{ assets('javascripts/nprogress.js') }}"></script>
```

最後把效果加到 PJAX 的生命週期中：
```js
$(document).ready(function()
{
    $(document).pjax('a', 'body');

    $(document).on('pjax:start', function() {
        NProgress.start();
    });

    $(document).on('pjax:end', function() {
        NProgress.done();
    });
});
```
###### 噹啷！完成！
至此你的專案已經擁有完整的 PJAX 了！

#### Q & A：

Q：我不喜歡 nprogress 的效果，有沒有別的可以用？
A：你可以考慮使用 [PACE](http://github.hubspot.com/pace/docs/welcome/)、[Progress.js](http://usablica.github.io/progress.js/)，不過我都沒使用過，但方式應該是大同小異。

Q：為什麼我的一些 JavaScript Library 會爆掉沒反應？
A：你使用的 Library 如果需要在畫面載入完時重新初始化（像是 [portfolio.js](http://portfoliojs.com/)），請把相關程式碼放入 `PJAX` 的生命週期中，如下：
```js
$(document).on('pjax:end', function() {
    initPortfolio();
    NProgress.done();
});
```

有其他問題也可以留言，我會盡力幫助你的 :)

References: [PHPHub](https://phphub.org/topics/44)
