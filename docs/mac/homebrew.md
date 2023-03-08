# homebrew安装

```js
安装homebrew， 终端执行 /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"，安装相关提示操作即可。

出现【curl: (35) error:02FFF036:system library:func(4095):Connection reset by peer】该报错，尚未能解决，最终手动安装homebrew，在https://github.com/Homebrew/homebrew-core下载源码，然后把整个zip包解压，复制到/usr/local/Homebrew/Library/Taps/homebrew/homebrew-core目录下。
```