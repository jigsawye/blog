---
title: 充分利用 lodash 讓你的程式碼更易讀及維護
categories:
  - note
tags:
  - javascript
  - lodash
date: 2017-09-04 12:00:00
---

一般在開發 JavaScript 的專案的時候，一定會大量的操作 `Array` / `Object` / `String`…等，但大部分人通常會使用 prototype fucntion，例如使用 `Array.prototype.push`、`Array.prototype.map` 等等，此文將會講解透過 [lodash](https://lodash.com/) 所提供的方法，可以如何讓程式碼更佳的簡潔及好維護。

<!-- more -->

>以下程式碼均在 Webpack 且使用 EcmaScript 2015 的環境下執行。

#### 什麼是 lodash

擷取自官方：

> A modern JavaScript utility library delivering modularity, performance & extras.

簡單來說就是一個擴充 / 增加 JavaScript 的 Library，裡面提供的很多讓你的 JavaScript 更威猛的方法。

##### 在專案中使用 lodash

想要在專案中使用 lodash 相當簡單，只需要透過 `npm` or `yarn` 安裝：

```bash
$ npm install lodash
# or
$ yarn add lodash
```

接著在你的程式碼中 import 即可：

```js
import map from 'lodash/map';
import filter from 'lodash/filter';
```

##### 避免將 lodash lib 全數引入

應該有人發現上方 import 的 code 為什麼是分別 import 所需的方法，而不是使用以下簡潔方式：

```js
import { map, filter } from 'lodash';
```

因為如果透過以上方式 import，你會將整個 lodash library 都 bundle 起來，若是分別 import，則只會 bundle 你所 import 的方法。

但是這樣很不美觀，尤其在一個 JS 檔案不可能只使用一兩個 lodash 方法，所以我推薦使用 [babel-plugin-lodash](https://github.com/lodash/babel-plugin-lodash)，就可以採用以上方式 import 了。

#### 幾個常用方法

以下就介紹幾個我在開發專案時常常使用到的 lodash 方法，lodash 的完整文件由此去。

##### Collection
Collection 指的就是 `Array` 及 `Object` 此類可迭代的方法，比較常見的就是 `map` 及 `filter`，這兩個方法在原生 JavaScrtip 中是不支援 `Object` 的，所以通常一般遇到 `Object` 需要迭代時都會使用 `Object.keys` 或是 `for in` 這種很醜的方式去做，但是在 lodash 中則可以將此類方法用在 `Object`，相當推薦！

> 這邊要注意的是，不論傳入的是 `Array` 還是 `Object`，一律會回傳 `Array`

`map()`

迭代每個元素，並回傳新的 Array。

```js
import { map } from 'lodash';

const square = n => n * n;

map([4, 8], square);
// => [16, 64]

map({ 'a': 4, 'b': 8 }, square);
// => [16, 64] (不保證迭代順序)

const users = [
  { 'user': 'barney' },
  { 'user': 'fred' },
];

// `_.property` 迭代縮寫
map(users, 'user');
// => ['barney', 'fred'] (取得指定屬性的 Array)

// 如果 API 收到奇怪的 Object
const weireUsers = {
  1: { 'user': 'barney' },
  2: { 'user': 'fred' },
};

map(weireUsers, (user, id) => { id: Number(id), ...user });
// => [{ id: 1, user: 'barney' }, { id: 2, user: 'fred' }];
```

`each()` / `forEach()`

迭代每個元素，但不回傳任何東西。

```js
import { forEach } from 'lodash';

forEach([1, 2], value => console.log(value));
// => 先印出 `1` 接著是 `2`.

forEach({ 'a': 1, 'b': 2 }, (value, key) => console.log(key));
// => 先印出 'a' 接著是 'b' (不保證迭代順序)。
```

`filter()`

迭代每個元素，並回傳符合條件的 Array，另外還有與此相反的方法 `reject()`。

```js
import { filter } from 'lodash';

const users = [
  { 'user': 'barney', 'age': 36, 'active': true },
  { 'user': 'fred',   'age': 40, 'active': false }
];

filter(users, o => !o.active);
// => ['fred'] 的 objects

// `_.matches` 迭代縮寫
filter(users, { 'age': 36, 'active': true });
// => ['barney'] 的 objects

// `_.matchesProperty` 迭代縮寫
filter(users, ['active', false]);
// => ['fred'] 的 objects

// `_.property` 迭代縮寫
filter(users, 'active');
// => ['barney'] 的 objects
```

`find()`

尋找指定的元素。

```js
import { find } from 'lodash';

const users = [
  { 'user': 'barney',  'age': 36, 'active': true },
  { 'user': 'fred',    'age': 40, 'active': false },
  { 'user': 'pebbles', 'age': 1,  'active': true }
];

find(users, o => o.age < 40);
// => 'barney' 的 object

// `_.matches` 迭代縮寫
find(users, { 'age': 1, 'active': true });
// => 'pebbles' 的 object

// `_.matchesProperty` 迭代縮寫
find(users, ['active', false]);
// => 'fred' 的 object

// `_.property` 迭代縮寫
find(users, 'active');
// => 'barney' 的 object
```

`some()`

判斷是否有符合條件的元素，與此相反的有 `every()`。

```js
import { some } from 'lodash';

some([null, 0, 'yes', false], Boolean);
// => true

const users = [
  { 'user': 'barney', 'active': true },
  { 'user': 'fred',   'active': false }
];

// `_.matches` 迭代縮寫
some(users, { 'user': 'barney', 'active': false });
// => false

// `_.matchesProperty` 迭代縮寫
some(users, ['active', false]);
// => true

// `_.property` 迭代縮寫
some(users, 'active');
// => true
```

##### Array

除非是使用 FP，不然 Array 的方法其實用到的比較少，因為很大一部分都只是將 `array.f(...arguments)` 方法轉成 `f(array, ...arguments)` 的方法而已。

`findIndex()`

尋找 Array 中指定條件的 index。

```js
import { findIndex } from 'lodash';

const users = [
  { 'user': 'barney',  'active': false },
  { 'user': 'fred',    'active': false },
  { 'user': 'pebbles', 'active': true }
];

findIndex(users, o => o.user == 'barney');
// => 0

// `_.matches` 迭代縮寫
findIndex(users, { 'user': 'fred', 'active': false });
// => 1

// `_.matchesProperty` 迭代縮寫
findIndex(users, ['active', false]);
// => 0

// `_.property` 迭代縮寫
findIndex(users, 'active');
// => 2
```

##### Object

比較特別的就是以下兩種，至於其他方法也是在 FP 時才會用到，一般情形下不常用。

`mapKeys()`

迭代 Object 並回傳修改 Key 的 Object。

```js
import { mapKeys } from 'lodash';

mapKeys({ 'a': 1, 'b': 2 }, (value, key) => key + value);
// => { 'a1': 1, 'b2': 2 }
```

`mapValue()`

迭代 Object 並回傳修改 Value 的 Object。

```js
const users = {
  'fred':    { 'user': 'fred',    'age': 40 },
  'pebbles': { 'user': 'pebbles', 'age': 1 }
};

mapValues(users, o => o.age);
// => { 'fred': 40, 'pebbles': 1 } (不保證迭代順序)

// `_.property` 迭代縮寫
mapValues(users, 'age');
// => { 'fred': 40, 'pebbles': 1 } (不保證迭代順序)
```

##### String

lodash 提供的方法在 `String.prototype` 其實都有了，不過個人為了美觀也會一併使用 lodash 的方法，有興趣的人可以直接去看官方文件，這邊就不多介紹了。

##### Others

除此之外 lodash 還有提供很多不同的方法，這邊介紹幾個我常用到的

`isEmpty()`

用於判斷是否是空的 object, collection, map, 或 set，相當於 `value.length === 0`。

```js
import { isEmpty } from 'lodash';

isEmpty(null);
// => true

isEmpty(true);
// => true

isEmpty(1);
// => true

isEmpty([1, 2, 3]);
// => false

isEmpty({ 'a': 1 });
// => false
```

`isEqual()`

判斷兩個值是否完全相同，常用於兩個不同的 Object 比較。

```js
import { isEqual } from 'lodash';

const object = { 'a': 1 };
const other = { 'a': 1 };

isEqual(object, other);
// => true

object === other;
// => false
```

`range()`

產生指定形式的 Array

- `[start=0] (number)`: 起始值
- `end (number)`: 結束值
- `[step=1] (number)`: 遞增間隔

```js
import { range } from 'lodash';

range(4);
// => [0, 1, 2, 3]

range(-4);
// => [0, -1, -2, -3]

range(1, 5);
// => [1, 2, 3, 4]

range(0, 20, 5);
// => [0, 5, 10, 15]

range(0, -4, -1);
// => [0, -1, -2, -3]

range(1, 4, 0);
// => [1, 1, 1]

range(0);
// => []
```

#### 結語
如此之外，lodash 還有提供 [lodash/fp](https://github.com/lodash/lodash/wiki/FP-Guide)，學會一點簡單的 FP( Fucntional Programming )可以讓你的程式碼更簡潔易維護，有興趣的人可以去官方文件看看。

如果不知道什麼是 FP，可以參考我翻譯到一半的 [JavaScript Functional Programming 指南](https://jigsawye.gitbooks.io/mostly-adequate-guide/content/)。
