---
title: Redux 起手式：Actions、Reducers 及 Store
tags:
  - javascript
  - react
  - redux
categories:
  - tutorial
date: 2015-11-29 11:23:33
---
真正開始寫 [React](https://facebook.github.io/react/) 大概是這一兩個月的時間吧，印象中前幾個月正火紅的時候，觀望著開發架構，從 Facebook 剛開始的 [Flux](https://github.com/facebook/flux)，一路看到 [fluxxor](https://github.com/BinaryMuse/fluxxor)、[alt](https://github.com/goatslacker/alt) 這些 Library 等等，真的是多到爆，然後那個 Flux 的概念圖看了不下 N 次，但還是不得其門而入。

直到不久前出現了一個叫 [Redux](github.com/rackt/redux) 的東西，剛好有新 project 要用 React 寫，看著各方大神推薦就順勢跳進 Redux 的世界了。最近也利用 Redux 寫了個 [Proxy manager](https://github.com/jigsawye/node-proxy-manager-client)，趁最近期中考完，回頭寫一下 Redux 的核心概念。

<!-- more -->
<!-- toc -->

### 那些在 React 遇到的麻煩事

你會有個 Root Component，然後它負責：
- 有一株肥美的 state tree（狀態樹）管理下層元件的資料
- 有一坨負責處理資料的 function 透過 props 傳遞給下層元件呼叫，以改變上面那棵樹

所以呢，Facebook 就建議了一種 Flux 架構，把那些 function 及 state tree 給抽出來集中管理。

### 為什麼選 Redux

以我來說有這幾個原因：
- 概念很簡單，只要清楚 Actions 及 Reducer 就可以開始實做了
- API 很少，而且只是幾個單純的 function，還有很方便的 Middleware 可以用
- 有完善的 devtools，可回溯的 state
- 社群資源多，而且我觀察台灣大多數 React 開發者都選用 Redux
- 官方文件有中文版（[由此去](http://chentsulin.github.io/redux/)），而且有完整的 step by step example

### 所以那個流程

我以很常見的 counter（計數器）為例，假設我要將目前的數字 + 1：
- dispatch（發送）一個 increment（+ 1）的 Action（動作）
- 管理 counter 的 reducer 接收到 action 後將 state 中目前的數字 + 1
- state tree 及 reducers 由 store 集中管理，並由 React 取用

###### Action

就以剛剛的 Todo 為例，actions 基本上就只是一個 JavaScript 物件，只需要定義好這個 action 的 type（類型）即可，當這個 action 被 dispatch 時，這個物件就會被傳至 reudcer，所以若有資料需要傳入，只需要加在這個 action 物件中：
```js
{
  type: 'INCREMENT'
}
```

一般來說會向下方這樣把 type 定義成常數做取用，不過這邊就盡量精簡化了：
```js
const INCREMENT = 'INCREMENT';
```

###### Reducer

reducer 則是一個 function，負責接收被 dispatch 的 action 並處理 state，要注意的是需傳入兩個參數到這個 function，第一個是目前的 state，第二個則是我們定義的 action 物件：
```js
function counter(state = 0, action) {
  // 在這邊回傳處理好的 state
}
```

就是這麼簡單的 function，要注意的是，初始化的時候 state 是空的，所以在第一個參數放了預設的 state。
接著就是撰寫處理 state 的部分：
```js
function counter(state = 0, action) {
  switch (action.type) {
  case 'INCREMENT':
    return state + 1;
  default:
    return state;
  }
}
```

還記得在 action 定義的 type 吧？我們會在 reducer 中根據 action 物件中的 type 去對應要執行的動作，接著回傳處理完的 state。

###### Store

我們現在知道了定義的 action 及處理 state 的 reducer，最後我們則需要透過 redux 的 `createStore` 將 reducer 轉換成 store：
```js
import { createStore } from 'redux';
// 如果透過瀏覽器的方式執行的話可以寫成下面這樣
// const { createStore } = Redux;

// 產生 store
let store = createStore(counter);
```

對，就這麼一行，接著你就可以開始透過 action 操作 state 了：
```js
// 透過 getState() 取得目前的 state
console.log(store.getState());

// 透過 dispatch() 發送我們剛剛所定義的 action
store.dispatch({
  type: 'INCREMENT'
});

// 看執行後的 state
console.log(store.getState());
```

### Done!

想像一下，Redux 就是個超級狀態機，藉由我們定義的 action 去改變 state。而我們只用了 Redux 提供的 `createStore()` 產生 store，API 相當簡單。上面的程式我放在 [jsbin](http://jsbin.com/conezo/edit?js,console) 上，點右上角的 run 即可看執行的結果。搞懂基本概念後，接著可以去查看[官方文件的 Todo Example](http://rackt.org/redux/docs/basics/Actions.html)，或是 Redux 的 Creator [Dan Abramov](https://github.com/gaearon) 在 egghead 上的[影片教學](https://egghead.io/lessons/javascript-redux-the-single-immutable-state-tree?series=getting-started-with-redux)。

### References
- http://rackt.org/redux/
