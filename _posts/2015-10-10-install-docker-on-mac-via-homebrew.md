---
title: 在 Mac 上使用 Homebrew 安裝 Docker
date: 2015-10-10 02:01:40
categories:
  - note
tags:
  - docker
  - terminal
---

>更新於 2017/1/10：Docker 官方已推出 [Docker for Mac](https://docs.docker.com/docker-for-mac/)，若有需求請前往該站參考，本安裝方式已不適用。

> 本文建議了解 unix-like 基礎指令及 Docker 基本操作者閱讀。

雖然 Docker 官方推薦使用 [Docker Toolbox](https://www.docker.com/toolbox)，不過我個人很不喜歡這種一鍵安裝包，連啟動還要用 GUI。可是動手搜尋 `docker via homebrew` 之類的關鍵字，出來的結果都是使用舊的 `boot2docker`（目前為 `docker-machine`），所以找不到只好自己做個紀錄了。

<!-- more -->
<!-- toc -->

### 安裝及設定

###### 安裝 docker 及 docker-machine

首先更新 `homebrew`：
```bash
❯ brew update
```

接著先安裝 `docker` 及 `docker-machine`：
```bash
❯ brew install docker docker-machine
```

###### 啟動 docker-machine

我們要透過 `docker-machine` 建立並啟動一個 VM 作為 docker 的環境，這邊我使用的 driver 為 VirtualBox，名字設定為 default：
```bash
❯ docker-machine create --driver virtualbox default
```

接下來為重點，我們執行 `docker-machine env default`，可以查看 `default` 所設定的參數，而這些參數用於指定 `docker` 的 client 所要連線的參數：
```bash
❯ docker-machine env default
export DOCKER_TLS_VERIFY="1"
export DOCKER_HOST="tcp://192.168.99.100:2376"
export DOCKER_CERT_PATH="/Users/jigsawye/.docker/machine/machines/default"
export DOCKER_MACHINE_NAME="default"
# Run this command to configure your shell:
# eval "$(docker-machine env default)"
```

在最後一行有提示 `Run this command to configure your shell`，所以我們直接在 terminal 執行，用於參數設定至 shell 中：

```bash
❯ eval "$(docker-machine env default)"
```

不過這樣的話每次開新的 terminal 都要執行一次，所以你可以把這行指令新增到你的 `~/.bashrc`（or `~/.zshrc` etc）：
```bash .zshrc
...
# configure the shell
eval "$(docker-machine env default)"
...
```

### Enjoy!

```
❯ docker images
REPOSITORY        TAG        IMAGE ID        CREATED        VIRTUAL SIZE
```

### 故障排除

如果沒執行 `eval "$(docker-machine env default)"` 設定 `docker` clinet 需要的參數，在執行指令時會顯示錯誤：

```bash
❯ docker images
Get http://%2Fvar%2Frun%2Fdocker.sock/v1.20/containers/json: dial unix /var/run/docker.sock: connect: no such file or directory.
* Are you trying to connect to a TLS-enabled daemon without TLS?
* Is your docker daemon up and running?
```

### [Reference](https://docs.docker.com/installation/mac/#from-your-shell)
