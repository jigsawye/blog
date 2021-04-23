---
title: 在 OSX 使用 Homebrew 打造精巧的 Laravel 開發環境
categories:
  - notes
tags:
  - php
  - laravel
  - mariadb
  - redis
  - terminal
  - homebrew
date: 2016-02-01 17:08:14
---

> 更新於 2017/1/10：Laravel 官方已推出 [Laravel Valet](https://laravel.com/docs/5.3/valet)，建議採用 Valet 方式進行安裝。

>建議你熟悉 Terminal 的操作再參考本篇，否則容易把系統環境搞亂。

在開發 Laravel Application 時，新手可能使用 *AMP 的系統環境整合包，而大多數人會選擇官方所提供的 [Homestead](https://laravel.tw/docs/5.2/homestead)。但 Homestead 其實就是一包很大包的虛擬機再配上 Vargrant，曾幾何時我也是使用 Homestead，但是因為我的小 Macbook Air 實在是受不了虛擬機容量一大包，又吃一堆記憶體。

雖然標題是寫 Laravel，但是要應用在其他的 PHP Application 也是可行的。本篇就以 Homebrew 為主軸，打造 Laravel 的開發環境。

<!-- more -->

### 啥？Homebrew

如同 ubuntu 有 `apt-get`、CentOS 有 `yum` 一樣，[Homebrew](http://brew.sh/index_zh-tw.html) 就是 OSX 的套件管理器。不同的是前者都是系統內建的，而 Homebrew 則是因為 OSX 本身沒有這種東西，所以就有大神為 OSX 打造了套件管理器。

### 需要什麼？

在開始之前，先說說開發 Laravel 需要哪些需求？

###### PHP-CLI

Laravel 是目前在 PHP 中最熱門的 Framework，其實除了透過 *AMP 指向 `public` 資料夾及使用 Homestead 外，Laravel 也提供了 command line 的方式啟動 development server。

```bash
$ php artisan serve
Laravel development server started on http://localhost:8000/
```

只要在專案目錄中執行 `php artisan serve`，就會執行 development server。也就是說我們至少需要 php-cli 來執行 development server。

> PHP-CLI 為 PHP Command Line Interface，也就是 Command Line 的 PHP 執行環境。

###### MariaDB

沒錯，開發一個 Web Application 一定需要資料庫，而我平常是使用 MariaDB，所以我們也必須安裝 MariaDB。

###### Redis

而我平常在開發的時候，會把 Cache、Session、及 Queue 的 Driver 都設定為 Redis，所以我們會安裝 Redis。

###### 總結

所以我們必須透過 Homebrew 安裝這些東西：
- php
- mariadb
- redis

### Getting started

###### Homebrew

#####安裝
開始之前，當然必須先安裝 [Homebrew](http://brew.sh/index_zh-tw.html)，官方網站已有提供指令進行安裝，打開 terminal 並輸入即可：

```bash
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

```

> 此指令會透過 curl 下載官方安裝檔，並透過 ruby 執行。他會在你的電腦安裝 homebrew。

#####使用

Homebrew 的使用方式很簡單，以下介紹幾個常用指令：

- `brew update`：更新 Homebrew。
- `brew search wget`：透過 `brew search` 可以搜尋套件，範例為搜尋名字有 wget 的套件。
- `brew install wget`：你可以使用 `brew intsall` 來安裝套件，範例會安裝 wget。

更多指令可以輸入 `brew help`，或參考[官方的 FAQ](https://github.com/Homebrew/homebrew/blob/master/share/doc/homebrew/FAQ.md)。

###### PHP

#####安裝
當然，我們首先必須安裝 PHP，我們先執行以下指令尋找 php：

```bash
$ brew search php
```

你應該會看到非常多的 php，像是 `homebrew/php/php53`、`homebrew/php/php54`⋯⋯一直到最新的 `homebrew/php/php70`。而 php 7.0 有相容舊版本，所以我是使用 php 7.0 開發，所以我們來搜尋一下 php 7.0：

```bash
$ brew search php70
```

你會看到 PHP 7.0，及 PHP 7.0 的 extenstions。我們直接安裝 php70 即可：

```bash
$ brew install php70
```

#####使用

安裝完後，執行以下指令看看是否有安裝完成：

```bash
$ php -v
PHP 7.0.2 (cli) (built: Jan  7 2016 10:40:26) ( NTS )
Copyright (c) 1997-2015 The PHP Group
Zend Engine v3.0.0, Copyright (c) 1998-2015 Zend Technologies
```

你可以進入一個 Laravel 專案，並執行 development server 看看：

```bash
$ laravel new awesome_homebrew
$ cd awesome_homebrew
$ php artisan serve
Laravel development server started on http://localhost:8000/
```

你也可以指定 Port：

```bash
$ php artisan serve --port=8080
Laravel development server started on http://localhost:8080/
```

如果是一般的 PHP 專案，可以用以下方式開啟 development server：

```bash
$ php -S localhost:8000 -t public
PHP 7.0.2 Development Server started at Mon Feb  1 17:02:58 2016
Listening on http://localhost:8000
Document root is /Users/jigsawye/Projects/laravel/demo/public
Press Ctrl-C to quit.
```

其中 `localhost:8000` 的部分是指你要開在哪個 Host，後面的 public 則是選擇你 `indxe.php` 的目錄，也就是 Application 進入點。

###### MariaDB

#####安裝

安裝方式一樣，先搜尋再安裝：

```bash
$ brew search mariadb
$ brew install mariadb
```
#####使用

安裝完成後，Homebrew 會提示你可以使用以下指令開啟 MySQL：

```bash
$ mysql.server start
Starting MySQL
. SUCCESS!
```

然後你可以連接至你的 MySQL：

```bash
$ mysql -uroot
```

###### Redis

#####安裝

```bash
$ brew search redis
$ brew install redis
```

#####使用

同樣的，Homebrew 提示使用以下指令開啟 Redis：

```bash
$ redis-server /usr/local/etc/redis.conf
5725:M 01 Feb 15:53:36.291 * Increased maximum number of open files to 10032 (it was originally set to 2560).
                _._
           _.-``__ ''-._
      _.-``    `.  `_.  ''-._           Redis 3.0.7 (00000000/0) 64 bit
  .-`` .-```.  ```\/    _.,_ ''-._
 (    '      ,       .-`  | `,    )     Running in standalone mode
 |`-._`-...-` __...-.``-._|'` _.-'|     Port: 6379
 |    `-._   `._    /     _.-'    |     PID: 5725
  `-._    `-._  `-./  _.-'    _.-'
 |`-._`-._    `-.__.-'    _.-'_.-'|
 |    `-._`-._        _.-'_.-'    |           http://redis.io
  `-._    `-._`-.__.-'_.-'    _.-'
 |`-._`-._    `-.__.-'    _.-'_.-'|
 |    `-._`-._        _.-'_.-'    |
  `-._    `-._`-.__.-'_.-'    _.-'
      `-._    `-.__.-'    _.-'
          `-._        _.-'
              `-.__.-'

5725:M 01 Feb 15:53:36.293 # Server started, Redis version 3.0.7
5725:M 01 Feb 15:53:36.293 * DB loaded from disk: 0.000 seconds
5725:M 01 Feb 15:53:36.293 * The server is now ready to accept connections on port 6379
```

不過你會發現，Redis 會佔用一個 terminal，相當不便。

###### Homebrew Services

相信有些人可能會發現，在啟動 MariaDB 及 Redis 時，指令有些微的不同，沒有一個統一管理這些 services 的工具，像是 ubuntu 的 `service <servicename> start`。雖然 Homebrew 有提供 `launchctl` 來管理，不過操作起來實在是太麻煩了。其實 Homebrew 額外有提供一個 services 的管理工具，透過這個工具就可以統一管理所有的 services。

#####安裝

執行以下指令安裝：

```bash
$ brew tap homebrew/services
```

如果你剛剛有透過指令啟動 MariaDB 與 Redis，現在我們先將它關閉。Redis 直接透過 `Ctrl + C` 關閉即可，MariaDB 請使用以下指令關閉：

```bash
$ mysql.server stop
Shutting down MySQL
... SUCCESS!
````

#####使用

使用以下指令可以查看目前所安裝的 services：

```bash
$ brew services list
Name    Status  User Plist
mariadb stopped
php70   stopped
redis   stopped
```

很方便吧！接著我們來啟動 MariaDB 及 Redis：

```bash
$ brew services start mariadb
==> Successfully started `mariadb` (label: homebrew.mxcl.mariadb)

$ brew services start redis
==> Successfully started `redis` (label: homebrew.mxcl.redis)
```

查看一下啟用之後的 services 列表：

```bash
$ brew sercies list
Name    Status  User     Plist
mariadb started jigsawye /Users/jigsawye/Library/LaunchAgents/homebrew.mxcl.mariadb.plist
php70   stopped
redis   started jigsawye /Users/jigsawye/Library/LaunchAgents/homebrew.mxcl.redis.plist
```

若要關閉 servies，執行 `brew services stop <servicename>` 即可！

### 額外補充

###### 多版本 PHP 切換

在一些專案可能需不同的 PHP 版本來執行，以下就說明如何接換多版本的 PHP。

#####安裝其他版本的 PHP

像前面說明的一樣，我們可以直接安裝其他版本的 PHP：

```bash
$ brew install php56
Error: Cannot install homebrew/php/php56 because conflicting formulae are installed.

  php70: because different php versions install the same binaries.

Please `brew unlink php70` before continuing.

Unlinking removes a formula's symlinks from /usr/local. You can
link the formula again after the install finishes. You can --force this
install, but the build may fail or cause obscure side-effects in the
resulting software.
```

你應該看到這個錯誤，他的意思是指你已經安裝了其他版本的 PHP，請 `unlink` 其他版本後再安裝。`unlink` 意指你必須將原本綁的 `php70` 給卸除掉（並非移除），再接著安裝。

```bash
$ brew unlink php70
$ brew install php56
```

接著就可以查看 PHP 版本，你應該切換成 PHP 5.6：

```bash
$ php -v
PHP 5.6.17 (cli) (built: Jan  8 2016 10:27:48)
Copyright (c) 1997-2015 The PHP Group
Zend Engine v2.6.0, Copyright (c) 1998-2015 Zend Technologies
```

#####切換回 PHP 7.0

若要切換回去也相當簡單，`unlink` PHP 5.6 再 `link` PHP 7.0 即可：

```bash
$ brew unlink php56
Unlinking /usr/local/Cellar/php56/5.6.17... 18 symlinks removed
$ brew link php70
Linking /usr/local/Cellar/php70/7.0.2... 17 symlinks created
$ php -v
PHP 7.0.2 (cli) (built: Jan  7 2016 10:40:26) ( NTS )
Copyright (c) 1997-2015 The PHP Group
Zend Engine v3.0.0, Copyright (c) 1998-2015 Zend Technologies
```

###### PHP extenstions

有時你可能需要安裝 PHP 的 extenstions，像是為了產生 PHPUnit 的 coverage report 就必須安裝 Xdebug，為了提升執行速度則裝 OPCache。

#####安裝 extenstions

所有的 PHP extenstions 都是以 `phpXX-*` 來命名，也就是說如果你現在使用 PHP 7.0，那麼就會是 `php70-*`。讓我們來搜尋 PHP 7.0 有哪些 extenstions 可以安裝：

```bash
$ brew search php70
homebrew/php/php70                  homebrew/php/php70-imagick          homebrew/php/php70-mongodb          homebrew/php/php70-pthreads
homebrew/php/php70-amqp             homebrew/php/php70-intl             homebrew/php/php70-msgpack          homebrew/php/php70-rdkafka
homebrew/php/php70-apcu             homebrew/php/php70-kafka            homebrew/php/php70-mustache         homebrew/php/php70-redis
homebrew/php/php70-apcu-bc          homebrew/php/php70-libsodium        homebrew/php/php70-oauth            homebrew/php/php70-snmp
homebrew/php/php70-ast              homebrew/php/php70-lzf              homebrew/php/php70-opcache          homebrew/php/php70-tidy
homebrew/php/php70-blitz            homebrew/php/php70-mailparse        homebrew/php/php70-pcntl            homebrew/php/php70-uuid
homebrew/php/php70-ev               homebrew/php/php70-mcrypt           homebrew/php/php70-pdo-dblib        homebrew/php/php70-v8js
homebrew/php/php70-gmp              homebrew/php/php70-mecab            homebrew/php/php70-pdo-pgsql        homebrew/php/php70-xdebug
homebrew/php/php70-hprose           homebrew/php/php70-memcached        homebrew/php/php70-pspell           homebrew/php/php70-yaml
```

你會看到一拖車的 extenstions，這邊我以 Xdebug 為例：

```bash
$ brew install php70-xdebug
```

然後看看你的 PHP 版本，Xdebug 應該已經安裝完成：

```bash
$ php -v
PHP 7.0.2 (cli) (built: Jan  7 2016 10:40:26) ( NTS )
Copyright (c) 1997-2015 The PHP Group
Zend Engine v3.0.0, Copyright (c) 1998-2015 Zend Technologies
    with Xdebug v2.4.0RC3, Copyright (c) 2002-2015, by Derick Rethans
```

#####關閉 extenstions

所有的 extenstions 啟用檔案都會存放在 `/usr/local/etc/php/X.X/conf.d/ext-*.ini`，以剛剛安裝的 Xdebug 為例，他的檔案會存放在 `/usr/local/etc/php/7.0/conf.d/ext-xdebug.ini`。若要關閉該 extenstions，用編輯器編輯他即可：

```bash
sudo vim /usr/local/etc/php/7.0/conf.d/ext-xdebug.ini
```

檔案內容很簡單：

```bash
[xdebug]
zend_extension="/usr/local/opt/php70-xdebug/xdebug.so"
```

若要關閉，把第二行註解掉在存檔即可：

```bash
[xdebug]
# zend_extension="/usr/local/opt/php70-xdebug/xdebug.so"
```

註解完後就關閉了：

```bash
$ php -v
PHP 7.0.2 (cli) (built: Jan  7 2016 10:40:26) ( NTS )
Copyright (c) 1997-2015 The PHP Group
Zend Engine v3.0.0, Copyright (c) 1998-2015 Zend Technologies
```

### Done！

到此就完成囉，其實安裝起來不會很困難，操作起來也很簡單。相比 *AMP 與 Homestead，使用的資源及容量也輕巧很多。希望本篇可以提供給操作 terminal 一段時間的人做參考，畢竟自幹環境比起一鍵安裝包安心多了 XD，想裝就裝，想砍就砍！
