# homebrew 安装

## 前言

这两天我的电脑电池鼓包，拿到售后更换了之后，系统被格式化了，于是需要重新安装环境，发现 homebrew 怎么也安装不上，于是 google 了半天，应该是网络的代理问题，总算找到了解决方案，以下是操作步骤。

### 解决方案

##### 方法一

一、获取 install 文件

```ruby
curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install >> brew_install
```

二、更改脚本中的资源链接，替换成清华大学的镜像

```sh
BREW_REPO = “https://github.com/Homebrew/brew“.freeze
CORE_TAP_REPO = “https://github.com/Homebrew/homebrew-core“.freeze
替换成
BREW_REPO = “https://mirrors.ustc.edu.cn/brew.git “.freeze
CORE_TAP_REPO = “https://mirrors.ustc.edu.cn/homebrew-core.git“.freeze
```

三、执行脚本

```sh
ruby brew_install
```

安装后会看到如下这句：

```sh
==> Tapping homebrew/core
```

出现这个原因是因为源不通，代码来不下来，解决方法就是更换国内镜像源：

执行下面这句命令，更换为中科院的镜像：

```sh
git clone git://mirrors.ustc.edu.cn/homebrew-core.git/ /usr/local/Homebrew/Library/Taps/homebrew/homebrew-core --depth=1
```

然后把 homebrew-core 的镜像地址也设为中科院的国内镜像

```sh
cd "$(brew --repo)"

git remote set-url origin https://mirrors.ustc.edu.cn/brew.git


cd "$(brew --repo)/Library/Taps/homebrew/homebrew-core"

git remote set-url origin https://mirrors.ustc.edu.cn/homebrew-core.git
```

接着

```sh
brew update
```

最后用以下命令检查:

```sh
brew doctor
```

这样就完成了。

### 方法二

```js
安装homebrew， 终端执行 /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"，安装相关提示操作即可。

出现【curl: (35) error:02FFF036:system library:func(4095):Connection reset by peer】该报错，尚未能解决，最终手动安装homebrew，在https://github.com/Homebrew/homebrew-core下载源码，然后把整个zip包解压，复制到/usr/local/Homebrew/Library/Taps/homebrew/homebrew-core目录下。
```
