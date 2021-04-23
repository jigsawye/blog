---
title: 告別 JavaScript 的 Promise！迎接 Async/Await 的到來
categories:
  - tutorial
tags:
  - es2015
  - es2016
  - javascript
  - nodejs
date: 2016-04-18 19:33:55
---
最近在做一個自己的 [API boilerplate](https://github.com/jigsawye/koa2-boilerplate)，選用了 [koa](https://github.com/koajs/koa) 這個 library。而其中除了 stable 的 `1.x` 外，它還 release `2.x`！有什麼不同呢？`1.x` 是用 generator 來實作，而到了 `2.x` 竟然是用 Async/Await！身為一個熱血碼農，怎能錯過這個進場 Async/Await 的大好機會 XD。

<!-- more -->

#### 說說 Promise

在很久以前，那是個 JavaScript callback hell 的年代，為了處理這種處境，有人提出了 Promise 的寫法。而 Promise 也是近年開發 JavaScript 程式不可或缺的一門基礎，在 ES2015 也將 Promise 納為其中的一項標準。

##### 非同步 function

關於非同步的文章網路上已經很多了，就不在此贅述。在這裡我直接先以 Promise 實作一個簡易的非同步程式：

```js
const posts = [
  { title: 'Post 1', content: 'fake content'},
  { title: 'Post 2', content: 'fake content'},
];

const getPosts = () => new Promise(resolve => setTimeout(() => resolve(posts), 1000));
```

我習慣寫 ES2015 的 arrow function，如果看不習慣的話，在一般 function 會像下面這樣：

```js
function getPosts() {
  return new Promise(function(resolve) {
    setTimeout(function() {
      resolve(posts);
    } , 3000);
  });
}
```

這支程式會回傳一個 Promise，而模擬在 1 秒後 resolve 一個模擬的 `posts`。

##### 呼叫一個非同步 function

在 Promise 的做法中，我們就會這樣來實作取得 posts 的程式：

```js
const printPostsToConsole = () => getPosts().then(posts => console.log(posts));

printPostsToConsole();
```

除此之外還會加上 error handler：

```js
const printPostsToConsole = () => getPosts()
  .then(posts => console.log(posts))
  .catch(err => console.log(err));

printPostsToConsole();
```

#### 如果是 Async/Await？

Async/Await 被規範在 ES2016 的標準中，很多的討論都指向 Async/Await 會是非同步的終極解決方案。

##### 用 Async/Await 處理非同步 function

換成 Async/Await 的話，就不必寫下 `.then()` 了！就像同步的程式一般，不必理會它是否為非同步。

```js
const printPostsToConsole = async () => {
  const posts = await getPosts();
  console.log(posts);
};

printPostsToConsole();
```

也可以寫成這樣：

```js
async function printPostsToConsole() {
  const posts = await getPosts();
  console.log(posts);
};

printPostsToConsole();
```

宣告在 `printPostsToConsole` 的 `async` 表示該 function 是個非同步的。而在 function 內 `getPosts` 之前的 `await` 表示要等待這個非同步的結果回傳後才會繼續執行，也就是說這個 function 內的程式都變為同步了！

當然在也要加上 error handler。在 Async/Await 中請使用 `try/catch`：

```js
const printPostsToConsole = async () => {
  try {
    const posts = await getPosts();
    console.log(posts);
  } catch(err) {
    console.log(err);
  }
};
```

#### 現在就開始用 Async/Await！

##### 在前端

如何在現在的環境實作 Async/Await 呢？其實如果有在寫 Front-end（尤其是 React），基本上應該已經使用了 [babel](babeljs.io)。如果要使用 Async/Await，presets 除了原本的 `es2015` 外，只要加上 `stage-3`：

```json
{
  "presets": ["es2015", "stage-3"]
}
```

或是將 `transform-async-to-generator` 加入 plugins 就行了：

```json
{
  "presets": ["es2015"],
  "plugins": ["transform-async-to-generator"]
}
```

##### 在後端

在 backend 的情況則比較不同，雖然一樣要透過 babel，不過請裝 [es2015-node4](babel-preset-es2015-node4) 或是 [es2015-node5](https://github.com/alekseykulikov/babel-preset-es2015-node5)（根據你的 node 版本做選擇），其餘則跟前端一樣。

> Node 7.0.0 起已經支援 Async/Await，建議直接更新你的 Node 版本！

接著如果要讓你的程式能夠執行 Async/Await，請額外建立一個檔案，並 require `babel-register` 及你程式的 entry：

```js
require('babel-register');
require('../app.js');
```

接著只要用 node 執行 `index.js` 就行了。

關於詳細的設定可以參考我的 [koa2-boilerplate](https://github.com/jigsawye/koa2-boilerplate)

#### 後記

緊接在 ES2015 之後的 ES2016 也增加了不少的新 feature，除了 Async/Await 也有 [object-rest-spread](https://github.com/sebmarkbage/ecmascript-rest-spread)、[class-constructor-call](https://github.com/tc39/ecma262/blob/master/workingdocs/callconstructor.md)、[class-properties](https://github.com/jeffmo/es-class-fields-and-static-properties)等等。

在 ES2015 泛用的現在，其實有機會的話可以慢慢接觸 ES2016 的功能了，對開發可以增添一股助力！
