---
title: 在 React 前端自動產生 GraphQL operation 的 type 達到更好的開發體驗
categories:
  - tutorial
tags:
  - javascript
  - typescript
  - react
  - graphql
  - apollo-client
date: 2021-05-01 12:00:00
---

GraphQL 眾所皆知的就是會基於 schema 的定義自動產生文件，確保不會有開發者自寫文件，導致人為的失誤問題。

但是在前端使用時還是必須手動標記 type，才能準確知道 response 的 type，而不是面對一個 `any` type 的 data object。

以 `apollo-client` 為例，透過 useQuery 的 generic 傳入定義的 data 及 variable type 後，就可以在開發時準確知道 data 的 type，也能檢查傳入的參數是否正確︰

<!-- more -->

```typescript
interface Post {
  id: number;
  title: string;
  content: string;
}

interface PostData {
  post: Post;
}

interface PostVars {
  postId: number;
}

const GET_POST = gql`
  query GetPost($postId: Int!) {
    post(postId: $postId) {
      id
      title
      content
    }
  }
`;

const PostPage = () => {
  const { loading, data, error } = useQuery<PostData, PostVars>(GET_POST, {
    variables: {
      postId: 1,
    },
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!data || error) {
    return <p>Error :(</p>;
  }

  // with type
  return (
    <div>
      <p>Title {data.post.title}</p>
      <p>content {data.post.content}</p>
    </div>
  )
}
```

但是這部分是基於開發者的自行標記，未來 API 有任何改變，勢必得在回頭修正這些 type，加入了人為的因素，產生失誤的可能性就會大大提升。

現在 `server side api` <-> `api docs` <-> `client side types` 之間，前半段已經由 GraphQL 自動化處理了，那麼後半段呢？假設我們可以讓這三者間都透過自動化解決呢？是不是就能有效提升開發效率，降低失誤的可能性？

### Codegen

如果是使用 apollo-client 的話，官方有提供一套基礎的 [apollo-codegen](https://www.apollographql.com/docs/react/development-testing/developer-tooling/#apollo-codegen) 可用，但今天我想介紹的是另一套功能更強大的 [graphql-code-generator](https://www.graphql-code-generator.com/)。

`graphql-codegen` 除了 apollo client 以外也有完整的 plugin 提供，以支援各種不同實作的，像是前端也可以支援 flow type 或 reason，也支援 Vue Apollo 或 Urql，語言也不局限於 TypeScript，可以支援 Java、.Net 等等。

### Config



### Gen files



### 結語

