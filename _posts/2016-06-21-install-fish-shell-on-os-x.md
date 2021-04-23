---
title: 在 OSX 使用 Fish shell 取代 bash/zsh
date: 2016-06-21 12:00:00
categories:
  -note
tags:
  -terminal
---

在 Mac 上用 [zsh](https://github.com/robbyrussell/oh-my-zsh) 已經有一陣子了，最讓我詬病的就是 zsh 的 auto suggestion 及 auto completion 速度相當慢，而且有一些很奇怪的問題（bugs?）。最近 [fish](https://fishshell.com/) 這個 shell 好像很紅，索性就把 zsh 換成 fish 了。

裝完後不只速度 ++，連 plugin / theme 的套件管理都有（[fisherman](https://github.com/fisherman/fisherman)），使用起來相當快速方便，要說缺點呢，就是與 bash 不相容，所以很常在寫 bash 的捧油只能看看囉。

<!-- more -->

> Updated on 2016/06/21
寫完這篇隔天就收到 oh-my-fish 已經不 maintain 了，所以換成 fisherman。

### fish

#####Installation

只要用 homebrew 安裝即可：

```bash
$ brew install fish
```

#####Usage

不論你預設是 bash 還是 zsh，執行 `fish` 就能切到 fish shell 了。

```bash
$ fish
```

#####Set fish as default shell

當然不可能每次開 terminal 就切換一次，我們可以把 fish 改成 terminal 的 default shell：

```bash
$ echo "/usr/local/bin/fish" | sudo tee -a /etc/shells
$ chsh -s /usr/local/bin/fish
```

### fisherman

`fisherman` 跟 `oh-my-zsh` 用起來是截然不同的感受，oh-my-zsh 是把 plugins 全部都裝好了，只需要啟動，fishermane 用起來則像是 `npm` 或 `composer` 的套件管理器一樣。

#####Installation

curl 拉下來就行了：

```bash
$ curl -Lo ~/.config/fish/functions/fisher.fish --create-dirs git.io/fisher
```

#####Usage

直接看官方 README 吧：https://github.com/fisherman/fisherman

### 額外補充

如果你有在使用 nvm 的話，因為 nvm 是透過 `source ~/.nvm/nvm.sh` 執行，但因為 fish 不支援 bash，所以這支檔案裡的 shell 會直接爆給你看。

要解決這個問題的話直接透過 fisherman 安裝 nvm 的 [plugin](https://github.com/fisherman/nvm) 即可：

```bash
$ fisher nvm
```

這樣還會發生一個問題，就是 nvm 不會自動使用 default 的 node 版本：

```bash
$ node -v
fish: Unknown command 'node'
```

用編輯器打開 `~/.config/fish/config.fish` 新增下面這行即可：

```bash
bass source ~/.nvm/nvm.sh
```

bass 是讓 fish 可以執行 bash 的一個橋接工具，透過 bass 就能執行 bash 了。
