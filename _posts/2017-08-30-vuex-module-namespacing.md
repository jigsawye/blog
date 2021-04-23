---
title: 透過 namespacing 讓 Vuex 更結構化
categories:
  - note
tags:
  - javascript
  - vue
  - vuex
date: 2017-08-30 12:00:00
---

去年底退伍之後進入新公司開始工作，近一年來都在 Vue / Vuex / Vue-Router 之間打滾，也寫出一些心得了，就在睽違一年多之後可以來寫新的東西了 XD。

大部分人透過 Vue 開發 SPA（Single Page Application）時通常都會搭配 Vuex 一起使用，如果不知道 Vuex 的作用的話那可以先去參考一下[官方介紹](https://vuex.vuejs.org/en/intro.html)。

<!-- more -->

> 以下範例均來自於[官方文件](https://vuex.vuejs.org/en/modules.html)並依據本文加以修改、調整與翻譯

#### State
##### 基礎介紹
因為官方的文件中都有講解跟範例了，所以 mutation 跟 action 及 getters 的作用就不多提了，以下就大概提一下 state 的部分。

在 Vuex 中都會有個 State，裡面包含了儲存在 Vuex 中的所有資料，大致長得像這樣：

```js
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})
```

##### 實際情況

不過在一般專案開發不可能只有一兩個變數而已，所以會切分成好幾個 `module`，大致如下：

```js
const moduleA = {
  state: { ... },
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

const moduleB = {
  state: { ... },
  mutations: { ... },
  actions: { ... }
}

const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
})
```

如果你想存取 state 或是 dispatch actions 時會如下：

```js
store.state.a // -> `moduleA`'s state
store.state.b // -> `moduleB`'s state

this.$store.dispatch('ActionOfModuleA') // -> `moduleA`'s action
this.$store.dispatch('ActionOfModuleB') // -> `moduleB`'s action
```

因爲將多個 module 併入一個 Vuex Store 時，actions 及 mutations 都是在 root space 中，所以一般會為了避免 actions / mutations 的命名衝突，會自己加上 namespace 或是另外去建立這些名稱的 constants：

```js
// mutation-types.js
export const SOME_MUTATION_A = 'A/SOME_MUTATION'
export const SOME_MUTATION_B = 'B/SOME_MUTATION'
// store.js
import Vuex from 'vuex'
import { SOME_MUTATION_A, SOME_MUTATION_B } from './mutation-types'

const store = new Vuex.Store({
  modules: {
    moduleA: {
      state: { ... },
      mutations: {
        // 我們可以使用 ES2015 的 computed property name 功能定義一個 function name
        [SOME_MUTATION_A] (state) {
          // mutate state
        }
      }
    }
    moduleB: {
      state: { ... },
      mutations: {
        [SOME_MUTATION_B] (state) {
          // mutate state
        }
      }
    }
  }
})
```

#### Vuex namespacing

##### namespaced: true

Vuex 在 `2.1.0` 版時在 `module` 中加入了 `namespaced` 的選項，透過啟用這個選項，Vuex 會自動幫你在 module 的 actions / mutations / getters 加上 namespace 的 prefix：

```js
const moduleA = {
  namespced: true,
  state: { ... },
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

const moduleB = {
  namespced: true,
  state: { ... },
  mutations: { ... },
  actions: { ... }
}

const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
})

store.state.a // -> `moduleA`'s state
store.state.b // -> `moduleB`'s state

this.$store.dispatch('a/ActionOfModuleA') // -> `moduleA`'s action
this.$store.dispatch('b/ActionOfModuleB') // -> `moduleB`'s action
```

除此之外，namespaced 也支援巢狀的 module，e.g.

```js
const store = new Vuex.Store({
  modules: {
    a: {
      state: { ... },
      mutations: { ... },
      actions: { ... },
      modules: {
        moduleC
      }
    },
    b: moduleB
  }
})
```

##### How the namespecing do?

這邊稍微講一下 Vuex 的 namespacing 做了哪些事情：

- 所有的 actions、mutations 都會加上 prefix：

```js
// before
const store = new Vuex.Store({
  modules: {
    account: {
      namespaced: true,

      // module assets
      state: { ... }, // module 的 state 已經是巢狀的，不會受到 namespace 影響
      getters: {
        isAdmin () { ... } // -> getters['account/isAdmin']
      },
      actions: {
        login () { ... } // -> dispatch('account/login')
      },
      mutations: {
        login () { ... } // -> commit('account/login')
      },

      // nested modules
      modules: {
        // 從父 module 繼承 namespace
        myPage: {
          state: { ... },
          getters: {
            profile () { ... } // -> getters['account/profile']
          }
        },

        // 進一步的巢狀 namespace
        posts: {
          namespaced: true,

          state: { ... },
          getters: {
            popular () { ... } // -> getters['account/posts/popular']
          }
        }
      }
    }
  }
})
```

- 在 module 內的所有 actions、mudations、state 會自動加上 namespace

- 如果你要在 locale module 使用其他 module 的 actions / mutations，請在 `dispatch` / `commit` 的第三個參數帶入 `{ root: true }`

```js
modules: {
  foo: {
    namespaced: true,

    getters: {
      // `getters` 是 module 內的其他 getters，如果要存取 rootGetters 可以使用第四個參數
      someGetter (state, getters, rootState, rootGetters) {
        getters.someOtherGetter // -> 'foo/someOtherGetter'
        rootGetters.someOtherGetter // -> 'someOtherGetter'
        rootGetters['bar/someOtherGetter'] // -> 'bar/someOtherGetter'
      },
      someOtherGetter: state => { ... }
    },

    actions: {
      // dispatch 及 commit 是會自動加上 module 內的 namespace
      // 如果要存取 root dispatch 或 commit 可以加入 `root` 選項
      someAction ({ dispatch, commit, getters, rootGetters }) {
        getters.someGetter // -> 'foo/someGetter'
        rootGetters.someGetter // -> 'someGetter'

        dispatch('someOtherAction') // -> 'foo/someOtherAction'
        dispatch('someOtherAction', null, { root: true }) // -> 'someOtherAction'

        commit('someMutation') // -> 'foo/someMutation'
        commit('someMutation', null, { root: true }) // -> 'someMutation'
      },
      someOtherAction (ctx, payload) { ... }
    }
  }
}
```

#### Helpers

以下就講解一下 Vuex 的 helpers 在遇到 namespaced 的用法

##### mapState

```js
computed: {
  ...mapState({
    a: state => state.some.nested.module.a, // this.a
    b: state => state.some.nested.module.b  // this.b
  })
},

// to

computed: {
  ...mapState('some/nested/module', {
    a: state => state.a, // this.a
    b: state => state.b  // this.b
  }),
  // or
  ...mapState('some/nested/module', [
    'a',  // this.a
    'b'   // this.b
  ])
  // alias
  ...mapActions('some/nested/module', {
    dataA: 'a', // this.dataA
    dataB: 'b'  // this.dataB
  })
},
```

##### mapActions

```js
methods: {
  ...mapActions([
    'some/nested/module/foo', // this.foo()
    'some/nested/module/bar'  // this.bar()
  ])
}

// to

methods: {
  ...mapActions('some/nested/module', [
    'foo', // this.foo()
    'bar'  // this.bar()
  ]),
  // alias
  ...mapActions('some/nested/module', {
    fooA: 'foo', // this.fooA();
    barA: 'bar'  // this.barA()
  })
}
```

##### mapGetters

與 `mapActions` 用法相同

##### createNamespacedHelpers

`2.4.0` 加入的新 helper

```js
import { createNamespacedHelpers } from 'vuex'

const { mapState, mapActions } = createNamespacedHelpers('some/nested/module')

export default {
  computed: {
    // look up in `some/nested/module`
    ...mapState({
      a: state => state.a, // this.a
      b: state => state.b  // this.b
    })
    // or
    ...mapState([
      'a', // this.a
      'b'  // this.b
    ])
  },
  methods: {
    // look up in `some/nested/module`
    ...mapActions([
      'foo', // this.foo()
      'bar'  // this.bar()
    ])
  }
}
```
