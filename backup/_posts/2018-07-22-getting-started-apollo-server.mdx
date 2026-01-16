---
title: 透過 apollo-server 在 10 分鐘內打造你的第一個 GraphQL server
categories:
  - tutorial
tags:
  - javascript
  - node
  - apollo
  - graphql
date: 2018-07-22 14:00:00
---

在前些日子 GraphQL 界知名的 [Apollo 發佈了 Apollo Server 2](https://blog.apollographql.com/announcing-apollo-server-2-2b69fb4702ce)，這個版本其中一個特色就是加強了開發體驗。透過內建 server 減少開發上繁瑣的設定，比起前個版本，寫一個 hello world 的 demo 不再需要花費大量的時間。本文大部分內容都來自於[官方的 Getting Started](https://www.apollographql.com/docs/apollo-server/getting-started.html)，經過整理與翻譯過後發布。

<!-- more -->

閱讀完本文之後，你將會得到以下幾點：

- 一個基礎的 GraphQL server，你可以基於此打造更複雜的 server
- 了解 GraphQL 的基本原理
- 使用 GraphQL Playground 發送 query 及查看 response

為了確保過程無虞，請具備基礎的 JavaScript 的知識及版本 6 以上的 Node.js 後再繼續。

## Step 1：初始化 project

在此步驟中，我們會透過你的 terminal（e.g. Terminal, iTerm, PowerShell）建立名為 `graphql-server-example` 的資料夾，並建立簡單的 Node.js  程式。本步只是為了後續的操作作準備，將會在  terminal 及 editor 來回作切換

首先，使用 mkdir 指令建立一個名為 graphql-server-example 的資料夾。

```bash
mkdir graphql-server-example
```

進入資料夾。

```bash
cd graphql-server-example
```

使用 Node.js 的 npm 初始化資料夾

```bash
npm init --yes
```

> 我們使用 Node.js 預設的套件管理器 npm。其他套件管理器如 yarn 也有提供類似的功能，不過本篇不會介紹。

上述步驟執行完成後，資料夾內應該會產生 `package.json`，你可以使用 `ls` 來檢視並確認。

## Step 2：安裝 dependencies

接著，我們要安裝兩個用來建立 GraphQL request 的 response 所需的 dependencies：

- [apollo-server](https://npm.im/apollo-server)：Apollo server 套件讓你可以定義資料型態及獲取方式。
- [graphql](https://npm.im/graphql)：本套件讓你建構並查詢 schema。

> Note：本教學中不會使用 `graphql`，會單獨安裝是因為它是 Apollo Server 的 peer dependency。

雖然你可以自己寫所有必須的 code，但這兩個依賴會讓你在建構 GraphQL server 時容易許多，且在各種大小型的 application 中相當常見。

執行以下指令將 dependencies 安裝並儲存在 project 中：

```bash
npm install --save apollo-server graphql
```

在下個步驟我們將會使用這些 dependencies 來建構處理 GraphQL requests 並 response 的 server。

## Step 3：建立 server

在此步驟中，我們會提供一個 code block，用於設定 `apollo-server` 來處理 GraphQL requests 並 response。為了加快速度，我們希望你將這 code 複製並貼入你專案的 `index.js` 中。在讀這些 code 時，你可以透過這些有幫助的註解來理解 GraphQL 的核心概念。不用太擔心是否會漏掉一些必要的資訊；我們將在教學的末端提供給你。

在範例 code 中，會使用兩本書的靜態資料。在更複雜的例子中，可以從 web resource（e.g. Amazon 或 本機端的網站）或資料庫（e.g. MySQL 或 MongoDB）來取得資料。

- 使用 IDE 或 editor 打開在第一步中所建立的 `graphql-server-example` 資料夾。
- 在 project 的根目錄建立名為 `index.js` 的空白檔案。
- 「複製」以下的 code block，「貼上」至剛剛建立的 `index.js` 檔案，並「儲存」。

```js
const { ApolloServer, gql } = require('apollo-server');

// 這是一個（示範的）books 的 collection，我們可以透過 GraphQL server 來 query。
// 在更複雜的例子，我們會從像是 REST API 或資料庫等既有的 data soruce 取得資料。
const books = [
  {
    title: 'Harry Potter and the Chamber of Secrets',
    author: 'J.K. Rowling',
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton',
  },
];

// Type definitions 定義資料的「形狀」，
// 並指定從 GraphQL server 獲取的方式。
const typeDefs = gql`
  # GraphQL 的註解使用 hash（#）符號來定義

  # 「Book」型別可以使用其他的型別宣告
  type Book {
    title: String
    author: String
  }

  # 「Query」型別是所有 GraphQL 查詢的 root。
  # （「Mutation」會在稍後介紹）
  type Query {
    books: [Book]
  }
`;

// Resolvers 定義從 schema 獲取 type 的方式，
// 我們從上面的「books」array 回傳所有的書。
const resolvers = {
  Query: {
    books: () => books,
  },
};

// 基本上來說，ApolloServer 可以透過傳入 type definitions（typeDefs）
// 及 resolvers 來管理獲取這些資料的型別。
const server = new ApolloServer({ typeDefs, resolvers });

// `listen` method 啟動 web-server。現有的 apps 可以
// 使用 middleware options，我們將在晚點討論。
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
```

以上 code 包含了所有執行基礎 GraphQL server 的需求。在下一步中，我們會啟動 server，讓它可以 response 所有 request！

## Step 4：啟動 server

在此步驟中，我們回到 terminal/console 啟動在剛剛的步驟定義的 server。

- 使用 Node.js 執行在剛剛步驟中所建立的 `index.js`

```bash
node index.js
```

- 執行後你應該會看到以下的 output：

```bash
🚀 Server ready at http://localhost:4000/
```

- 在你的瀏覽器打開顯示的位址

- 如果所有東西都正常執行，你應該會看到 GraphQL Playground 資源管理工具，我們將在接下來的步驟使用它。

![](https://www.apollographql.com/docs/apollo-server/images/getting-started/graphql-playground.png)

在下個步驟，我們會使用 GraphQL Playground 工具來送出 query 至 GraphQL server。

## Step 5：執行你的第一個 query

現在，你可以使用 GraphQL Playground 開始向 GraphQL server 送出 query，GraphQL Playground 分為幾個部分：

- request（右側）
- response（左側）
- 文件 (點擊最右邊綠色的「SCHEMA」按紐)

因為我們在試著取得 books，因此可以在畫面左側輸入以下 query。此 query 會取得 books 列表，包含每個 book 的 title 跟 author。

```gql
{
  books {
    title
    author
  }
}
```

當按下中間的播放鈕，會看到右邊的 response 像這樣：

![](https://www.apollographql.com/docs/apollo-server/images/getting-started/graphql-playground-response.png)

## Next Steps

對於任何 GraphQL server，此 application 應該是一個很好的起點，不過下列資源是構建 GraphQL server 的下一步：

- [Adding Apollo Server to an existing app.](https://www.apollographql.com/docs/apollo-server/essentials/server.html#integrations)
- [Schema design](https://www.apollographql.com/docs/apollo-server/essentials/schema.html)
- [Deploy with Heroku](https://www.apollographql.com/docs/apollo-server/deployment/heroku.html)
