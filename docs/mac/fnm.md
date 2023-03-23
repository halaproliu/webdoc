# Node版本管理工具fnm

### 介绍

fnm(Fast Node Manager)基于Rust开发，看到Rust就感觉到它的快了，同时它是跨平台的，支持MacOS，Linux，Windows。

```
🚀 Fast and simple Node.js version manager, built in Rust.
```

### fnm安装与使用

1. 安装fnm（以MacOS为例）

```bash
brew install fnm
```

2. 配置 fnm 所需的环境变量到 bash 或 zsh 配置文件中，以 zsh 为例：

```bash
fnm env --use-on-cd >> ~/.zshrc
```

亦可执行 fnm env --use-on-cd，将输出内容手动添加至 .bash_profile 或 .zshrc 里。

3. fnm安装Node

```bash
# 安装 LTS 版本
fnm install --lts

# 安装指定大版本的最新版本
fnm install 18

# 安装指定版本
fnm install 18.21.1
```

相反地，可通过 fnm uninstall <version> 或 fnm uninstall <alias-name> 来删除指定版本，后者会同时移除别名。

4. 通过 fnm 来指定 Node 版本

```bash
# 使用系统版本
$ fnm use system

# 使用 fnm 所安装，且版本号为 18.21.1 的 Node 程序
$ fnm use 18.21.1

# 使用 fnm 所安装，且主版本号为 18 的最新版本的 Node 程序
$ fnm use 18
```

只要用 fnm use <version> 指定后，每次启动 Shell 将会默认使用对应的 Node 版本。

5. 设置别名

```bash
# 形式如：fnm alias <指定版本号> <别名>
$ fnm alias 18.21.1 v18

# 设置别名后，可以简化指令为：
$ fnm use v18
```

其实以上示例的别名意义不大，仅用于举例而已。原因是：在「不设置别名」的情况下，使用 fnm use 18，也能切换至 18.21.1。使用 fnm use <major> 会切换至对应主版本号对应的最新版本。

6. 项目中指定特定版本

```bash
echo '16' > .node-version
```


前提是，配置 fnm 环境用的是 fnm env --use-on-cd 命令，而不是 fnm env。后者没有添加 Hook，因此不会是检查对应配置文件。有兴趣的可以对比两条命令的差别就明白了。

7. 卸载fnm

若是通过brew安装的fnm，则：

```bash
brew uninstall fnm
```

接着，再移除 ~/.fnm 目录。

```bash
rm -rf ~/.fnm
```

最后，移除 bash 或 zsh 的配置文件中与 fnm 相关的配置。比如：

```js
export PATH="/Users/frankie/Library/Caches/fnm_multishells/49559_1670052262156/bin":$PATH
export FNM_VERSION_FILE_STRATEGY="local"
export FNM_DIR="/Users/frankie/Library/Application Support/fnm"
export FNM_NODE_DIST_MIRROR="https://nodejs.org/dist"
export FNM_MULTISHELL_PATH="/Users/frankie/Library/Caches/fnm_multishells/49559_1670052262156"
export FNM_ARCH="x64"
export FNM_LOGLEVEL="info"
autoload -U add-zsh-hook
_fnm_autoload_hook() {
  if [[ -f .node-version || -f .nvmrc ]]; then
    fnm use --silent-if-unchanged
  fi
}

add-zsh-hook chpwd _fnm_autoload_hook &&
  _fnm_autoload_hook

rehash
```