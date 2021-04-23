---
title: 使用 Docker 建置 Gitlab CE 的 Source Control 及 CI 環境
date: 2015-09-25 19:23:30
categories:
  - tutorial
tags:
  - docker
  - source-control
  - continuous-integration
  - devops
  - nodejs
---

> 更新於 2017/1/10：此文年久失修，可能有許多情形與現實不符，請斟酌參考。

> 本文建議了解 unix-like 基礎指令及 Docker 基本操作者閱讀。

這幾天在我們的 imaclab 試著建置 CI 環境，順便就學了 Docker，發現 Docker 這東西真的非常方便，直接把環境都放進 container 裡，也不怕把環境搞爛。對環境建置的苦手真的是一番福音，網路上也很多關於 Docker 的文章，在這邊也不贅述了。
原本在架設的時候想使用 Gitlab + Jenkins，不過因專案的需求沒有需要 Jenkins 這麼開放客製化的 CI 工具（其實是我覺得很囉唆一堆東西要設定），剛好 Gitlab 也有提供 CI，需求上也符合，所以就決定使用 Gitlab + Gitlab CI。

<!-- more -->

### Gitlab

以自行架設私有的版本控制環境來說，Gitlab 肯定是首選（因為我不知道還有哪些版控可以自己架），很久以前曾經自己在 ubuntu 上用官方提供的一鍵安裝包裝過一次，用過這種懶人包的都知道，裝的時候完全不知道發生什麼事，尤其當時還很菜。那時是成功架起來沒錯，不過完全不知道發生了什麼事。

###### 環境

我是直接用了學長架的 OpenStack 叢集開一個 instance 當建置環境，基本上要照這份筆記安裝 Gitlab CE，應該只要隨便一個有裝 Docker 的 unix-like 系統都可以。

![Imgur](https://i.imgur.com/sCxpbLf.png)

###### 安裝

透過 Docker 安裝 Gitlab CE 很簡單，只要在 [Docker Hub](https://hub.docker.com) 上找 gitlab 就可以找到很多的 images，我選了 star 最多的 [sameersbn/gitlab](https://hub.docker.com/r/sameersbn/gitlab/) ，基本上只要照 image 的文件做就可以了。

首先將 `sameersbn/gitlab` 的 image pull 下來。

```bash
docker pull sameersbn/gitlab:8.0.2
```

接著有兩種方式可以啟動 Gitlab：最簡單的是使用 `docker-compose`，透過設定檔啟動。另外就是手動執行 `docker run` 指令將 gitlab 所需的 service 逐一啟動。這邊我選擇後者，因為我沒裝 docker-compose，未來有安裝在補充這部分的使用方式。

除了 Gitlab 本身，他還需要額外啟用 `PostgreSQL` 及 `Redis` 的 servcie，基本上只要按照文件啟動 container 就可以了：

啟動 PostgreSQL container：

```bash
docker run --name gitlab-postgresql -d \
    --env 'DB_NAME=gitlabhq_production' \
    --env 'DB_USER=gitlab' --env 'DB_PASS=password' \
    --volume /srv/docker/gitlab/postgresql:/var/lib/postgresql \
    sameersbn/postgresql:9.4-3
```

啟動 Redis container：

```bash
docker run --name gitlab-redis -d \
    --volume /srv/docker/gitlab/redis:/var/lib/redis \
    sameersbn/redis:latest
```

最後啟動 Gitlab container。這邊要注意我除了照原文件之外，還額外加上 `GITLAB_HOST`，因為我的建置環境不在本機上，所以要加上該環境的 ip，否則 user 的大頭貼會是死圖。另外指令中的 `long-and-random-alpha-numeric-string` 請替換成一組隨機字串，可以使用 `pwgen -Bsv1 64` 來產生：

```bash
docker run --name gitlab -d \
    --link gitlab-postgresql:postgresql --link gitlab-redis:redisio \
    --publish 10022:22 --publish 10080:80 \
    --env 'GITLAB_HOST=your-gitlab-ip' \
    --env 'GITLAB_PORT=10080' --env 'GITLAB_SSH_PORT=10022' \
    --env 'GITLAB_SECRETS_DB_KEY_BASE=long-and-random-alpha-numeric-string' \
    --volume /srv/docker/gitlab/gitlab:/home/git/data \
    sameersbn/gitlab:8.0.2
```

###### 完成！

![Imgur](https://i.imgur.com/nzIAG0F.png)

打開瀏覽器瀏覽 `http://your-gitlab-ip:10080`，就可以看到 Gitlab 架設好了，輸入預設的帳號密碼就可以直接登入：

- username: **root**
- password: **5iveL!fe**

### Gitlab CI

這次安裝的時候原本第一天裝 Gitlab CE 7.14.3，Gitlab CI 還要另外做安裝，後來更新到 8.0.0 的時候 Gitlab 把 CI 整合進了 Gitlab CE 裡，所以只需要裝 Gitlab CE 就包含了 CI 的功能了！兩個願望一次滿足！

以下以簡單的 Node.js project 為例，做一次完整的 CI Flow：

###### 建立 repository

首先在 Gitlab 上建立一個 `ci-flow` 的 repository：

![Imgur](https://i.imgur.com/KSkMits.png)

接著點選 CI 選項，點選 **Add project to CI** 將剛剛建立的 `ci-flow` 加入至 CI 中：

![Imgur](https://i.imgur.com/wvhHuHd.png)

點選 runner 分頁，記下 url 及 token：

![Imgur](https://i.imgur.com/i1kpNnD.png)

###### gitlab-runner

什麼是 `gitlab-runner` 呢？簡單來說就是透過這個 runner 去執行 CI 所要執行的工作。例如我以 docker 做測試環境，runner 會建立預先設定好 image 的 container，CI 被觸發時會自動 start 該 container，並把 repository pull 至 container 內，接著執行指定的動作。在這部分我們要安裝及設定 `gitlab-runner`，並註冊讓它執行。

透過 Docker 安裝 gitlab-runner，參考[官方文件](https://gitlab.com/gitlab-org/gitlab-ci-multi-runner/blob/master/docs/install/docker.md)：

```bash
docker run -d --name gitlab-runner --restart always \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v /srv/gitlab-runner/config:/etc/gitlab-runner \
  gitlab/gitlab-runner:latest
```

執行 gitlab-runner 進行註冊，這邊的 url 及 token 就是剛剛 runner 分頁對應的資料。其餘部分根據需求做選擇，像我不需要 DB 的 Service 所以一律 enter 略過：

```bash
docker exec -it gitlab-runner gitlab-runner register

Please enter the gitlab-ci coordinator URL (e.g. https://gitlab.com/ci )
https://your-gitlab-ip:10080/ci

Please enter the gitlab-ci token for this runner
your-gitlab-ci-token

Please enter the gitlab-ci description for this runner
[86598ea6394b]: node-4.1.1

INFO[0034] 08cc0e60 Registering runner... succeeded
Please enter the executor: docker, docker-ssh, ssh, shell, parallels:
[shell]: docker

Please enter the Docker image (eg. ruby:2.1):
node:4.1.1

If you want to enable mysql please enter version (X.Y) or enter latest?

If you want to enable postgres please enter version (X.Y) or enter latest?

If you want to enable redis please enter version (X.Y) or enter latest?

If you want to enable mongo please enter version (X.Y) or enter latest?

INFO[0045] Runner registered successfully. Feel free to start it, but if it's running already the config should be automatically reloaded!
```

現在前往 CI 的 runner 分頁應該就會看到 node-4.1.1 並且是 active 的。

![Imgur](https://i.imgur.com/ku19Gss.png)

> 注意，這邊我們要編輯 node-4.1.1 這個 runner，並增加名為 node-4.1.1 的 tag 讓 CI 能夠啟動對應的 runner。

![Imgur](https://i.imgur.com/N2dSh45.png)

###### 建立 project

建立一個 project，並使用 `npm init`（enter 到底就可以了）產生 `package.json`，接著安裝 node.js 的測試工具 `mocha`：

```bash
mkdir ci-flow
cd ci-flow
npm init
npm install mocha --save-dev
```

接著建立檔案 `test/test.js` 並撰寫簡單的測試程式：

```js test/test.js
var assert = require('assert');

describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal(-1, [1, 2, 3].indexOf(5));
      assert.equal(-1, [1, 2, 3].indexOf(0));
    });
  });
});
```

寫完測試當然要在 local 測試一下，直接執行 project 中安裝的 `./node_modules/mocha/bin/mocha`：

```bash
$ ./node_modules/mocha/bin/mocha

  Array
    #indexOf()
      ✓ should return -1 when the value is not present


  1 passing (9ms)
```

測試成功！接著我們來設定 CI 所要使用的 image 及執行的 script。

###### .gitlab-ci.yml

重點來了，我們要在專案的根目錄建立 `.gitlab-ci.yml` 的檔案，用於決定 Gitlab CI 要如何對專案 build、test、deploy...等等，類似於 Travis CI 的 `.travis.yml`。詳細的可用選項可以參考[官方文件](http://doc.gitlab.com/ci/yaml/README.html)，這邊以我的例子做解說：
`before_script` 是執行 job 前會執行的 script，我在這邊設定安裝 node 的 dependencies，也就是 `mocha` 這個 test tool。`stages` 為設定有幾種工作階段，一般可能就會有 `build`、`test`、`deploy`，並按照順序逐一執行對應的 job，我這邊單獨以 `test` 做例子。接著制定第一個 job，對應的就是 `test` 這個 stage，在 `script` 增加執行 project 內的 `mocha` 做測試，並指在 `master` 這個 branch，最後加上一個 `node-4.1.1` 的 tag 去啟動對應 tag 為 `node-4.1.1` 的 `gitlab-runner`，因為一般在測試時可能會針對多個不同版本的環境做測試，所以會使用 tag 這個功能來做設定。

```ruby .gitlab-ci.yml
before_script:
  - npm install
stages:
  - test
job1:
  stage: test
  script:
    - ./node_modules/mocha/bin/mocha
  only:
    - master
  tags:
    - node-4.1.1
```

在版本控制上並不希望 `node_modules` 放入版本控制中，所以增加 `.gitignore` 檔案並排除該目錄：

```bash
touch .gitignore
echo node_modules > .gitignore
```

加入版本控制：

```bash
git init
git add .
git commit -m 'Test gitlab-ci with <3'
```

Push 至 Repository：

```bash
git remote add origin your-project-repository
git push -u origin master
```

最後等待 CI 自動執行測試！

###### 執行結果

Push 至 Repository 後可以在 CI 的 Dashboard 看見剛剛的 commit 已經 pending 了：

![Imgur](https://i.imgur.com/P8qn1rQ.png)

點進去後可以看到目前須執行的所有 job，根據你的 `.gitlab-ci.yml` 而定，一般來說會在多個環境測試，並包含 deploy 等多種不同的 job：

![Imgur](https://i.imgur.com/HElBwtE.png)

等待一段時間後就成功就會顯示 Success：

![Imgur](https://i.imgur.com/rLqbgsW.png)

你也可以點進 build 中看執行的結果：

![Imgur](https://i.imgur.com/h3B39rH.png)

###### Slack Integration

Gitlab CI 也有提供 Slack 的整合，提供即時的 CI 狀態，只要填入 Webhook 即可：

![Imgur](https://i.imgur.com/eh79dAw.png)

### 總結

搞了三天左右都在學 Docker 跟弄這些環境，在精疲力乏與中秋烤肉之際順便記錄一下過程。
文中一些細節可以在根據需求做修改，像是在 test 的 docker image 就可以把 `mocha` 裝進去，不用在 project 中額外安裝。Gitlab 的 CI 雖然不像 Jenkins CI 那麼容易的客製化，但是基本的功能也能滿足一些需求。當然 Gitlab CI 的功能我可能也沒完全摸透，可能有更強大的功能也說不定。

另外未來還會串上 CD，另外加開一台 staging 的 instance 來 deploy，之後若串起來有空再寫下一篇分享。
