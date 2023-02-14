# webpack5新特性

### 功能清除

- 不再为 Node.js 模块自动引用 Polyfills
- ​​require.include​​ 语法已经被废弃
- 移除 v4 版本的废气能力的代码

### 长期缓存

- 新增长期缓存算法，确定的 Chunk、模块 ID 和导出名称，在生产模式下默认启用。
- 真正的内容 Hash

###  开发支持

- 命名代码块 ID：在开发模式下默认启用的新命名块 id 算法为块（和文件名）提供人类可读的名称。
- 模块联邦：模块可以从指定的远程构建中导入，并以最小的限制使用。

### 支持崭新的 web 平台特性

  - JSON 模块

    在使用非默认导出时发出警告
    使用默认导出，未使用的属性也会被​​optimization.usedExports​​​ 优化丢弃，属性会被​​optimization.mangleExports​​ 优化打乱

  - 资源模块

    支持浏览器原生提供的写法：​​new URL("./image.png", import.meta.url)​​(新方式)
​    ​import url from "./image.png")​​(老方法)
  - 原生 Worker 支持
    支持​​new Worker(new URL("./image.png", import.meta.url))​​ 浏览器默认支持的语法

  - URIs

    - 支持 data
    - 支持 file
    - 支持 http(s) ：需要通过​​new webpack.experiments.schemesHttp(s)UriPlugin()​​ 选择加入

  - 异步模块

    - 异步的外部资源(async externals)
    - 新规范中的 WebAssembly 模块
    - 使用顶层 Await 的 ECMAScript 模块

### 支持安全的 node.js 生态特性解析

- 现在支持 package.json 中的 exports 和 imports 字段
- 原生支持 Yarn PnP

### 构建优化

- 嵌套的 tree-shaking
- 内部模块 tree-shaking
- CommonJs Tree Shaking
- 副作用分析

### 性能优化

- 持久缓存
- 编译器闲置和关闭
- 文件生成

下面选取一些分析一下。

### 最小 Node.js 版本：10.13.0

最低支持的 Node.js 版本从 6 增加到 ​​10.13.0​​