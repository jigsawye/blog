---
title: JavaScript 的 Object.assign 陷阱
date: 2015-10-06 18:05:14
categories:
  - note
tags:
  - javascript
  - trap
---

> 以下開發情境為 ES2015（ES6）

一般在寫 React 的時候，通常會希望資料是 immutable（不可變的），讓開發時對資料的流向即處理更容易，所以通常會使用 `Object.assign` 來複制 object。但今天在寫時遇到一個問題，我一直以為 `Object.assign` 會連同子項目都複製，結果兩個不同的資料改 A 竟然連 B 都跟著動，就做個紀錄。

<!-- more -->

假設我們有個 object，接著透過 `Object.assign` 複製兩個 object：
```js
const test = {
  childrenKey: 'value',
  childrenObject: {
    keyA: 'value a',
    keyB: 'value b'
  }
}

const cloneA = Object.assign({}, test);
const cloneB = Object.assign({}, test);
```

改變 `cloneA` 中 `childrenKey` 的 value，`cloneB` 中 `childrenKey` 的 value 並不會被改變：
```js
cloneA.childrenKey = 'change value';

// cloneA
{
  childrenKey: 'change value',
  childrenObject: {
    keyA: 'value a',
    keyB: 'value b'
  }
}

// cloneB
{
  childrenKey: 'value',
  childrenObject: {
    keyA: 'value a',
    keyB: 'value b'
  }
}
```

可是當改變 `childrenObject` 的值時，卻會連動改變：
```js
cloneA.childrenObject.keyA = 'change value a';

// cloneA
{
  childrenKey: 'change value',
  childrenObject: {
    keyA: 'change value a',
    keyB: 'value b'
  }
}

// cloneB
{
  childrenKey: 'value',
  childrenObject: {
    keyA: 'change value a',
    keyB: 'value b'
  }
}
```

原因是 `Object.assign` 只會對 object 的子項目做 clone，下一層的則會建立 reference，所以指向的 `childrenObject` 會是同一個。
要解決這個問題的話可以使用 `lodash` 的 `clonedeep`：

```js
import cloneDeep = from 'lodash.clonedeep';

const test = {
  childrenKey: 'value',
  childrenObject: {
    keyA: 'value a',
    keyB: 'value b'
  }
}

const cloneA = cloneDeep(test);
const cloneB = cloneDeep(test);
```

或是使用 [immutable.js](https://facebook.github.io/immutable-js/)。

reference: [搞定immutable.js](http://boke.io/immutable-js/)
