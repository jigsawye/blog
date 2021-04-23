---
title: 在 React.memo 實作 re-render 條件
categories:
  - tutorial
tags:
  - javascript
  - react
date: 2018-11-30 11:00:00
---

幾週前 React 發佈了版本 [16.6](https://reactjs.org/blog/2018/10/23/react-v-16-6.html)，一口氣推出了 `lazy`、`memo` 及 `contextType` 等新功能。而其中的 `React.memo` 就是過去 `React.PureComponent` 的 HOC 版本，比起過去改動成 PureComponent 要動到較大量的程式碼，如今只要套上 `React.memo` 即可。不過在 class component 可以寫 class method 自定 `shouldComponentUpdate` 的實作，function component 好像不能這樣搞？其實 memo 是有第二個參數可以使用的。

<!-- more -->

## 使用 `PureComponent`

以往要讓 Component 的 `shouldComponentUpdate` 自動進行 shallow equal 比對進行 re-render，只要把 class component 的 `extends React.Component` 部分改為 `extends React.PureComponent` 即可：

```js
// before
class Demo extends React.Component {
  // Something else...
  render() {
    return <div>{this.props.children}</div>;
  }
}

// after
class Demo extends React.PureComponent {
  // Something else...
  render() {
    return <div>{this.props.children}</div>;
  }
}
```

你也可以自己寫 `shouldComponentUpdate` 來判斷 component 的 re-render 條件：

```js
class Demo extends React.PureComponent {
  shouldComponentUpdate(nextProps, nextState) {
    // write something...
    return true;
  }

  // Something else...
  render() {
    return <div>Demo</div>;
  }
}
```

但假設 Component 是個 function component，那就必須改寫成單單只有 `render` function 的 class component，整體看起來會相當的不直觀：

```js
// before
const Demo = ({ children }) => <div>{children}</div>;

// after
class Demo extends React.PureComponent {
  render() {
    return <div>{this.props.children}</div>;
  }
}
```

## 使用 `React.memo`

但在 16.6 以後，只需要用 `React.memo` 並將 function component 作為參數即可：

```js
// before
const Demo = ({ children }) => <div>{children}</div>;

// after
const Demo = React.memo(({ children }) => <div>{children}</div>);
```

可是如果想要自己實作 shouldComponentUpdate 的話好像就不知道怎麼寫了：

```js
// ??? how to add shouldComponentUpdate?
const Demo = React.memo(({ children }) => <div>{children}</div>);
```

## `React.memo(Component, areEqual)`

其實 `React.memo` 可以接受第二個參數，透過第二個參數的 function 來決定要不要 re-render。但是這邊要注意到的是：

- `shouldComponentUpdate`: 若 return `true` 就進行 re-render，否則不會 re-render。
- `areEqual`: 若 return `true` 代表 `props` 相同，不進行 re-render，否則皆會 re-render。

詳細的說明可以到 [官方文件 的 React.memo 章節](https://reactjs.org/docs/react-api.html#reactmemo) 查閱。

```js
const Demo = React.memo(
  ({ children }) => <div>{children}</div>,
  (prevProps, nextProps) => {
    /*
     return true if passing nextProps to render would return
     the same result as passing prevProps to render,
     otherwise return false
    */

    return false;
  });
```

## References

- [React Docs](https://reactjs.org/docs/react-api.html#reactmemo)
