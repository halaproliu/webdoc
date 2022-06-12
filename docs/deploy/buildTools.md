# 现代组合构建方法论之swc、esbuild、mfsu秒级时代的开端

### 前言

时过境迁，经过 2021 年的工程链疯狂 involution 之后，到了 2022 俨然已形成了三分天下的趋势，即 babel、[swc](https://github.com/swc-project/swc) 、esbuild 。

那么他们之间有什么区别？如何考量和选择？需要考虑的波及场景有哪些？有没有体系化的打法？

为了解该问题，下面我们将循序渐进的，逐步推导一个现代化的组合构建方法论。


### 解法方向

在进入正文之前，我们先看一个 [babel](https://babeljs.io/docs/en/) 、[swc](https://github.com/swc-project/swc)、[esbuild](https://esbuild.github.io/api/) 他们的笼统区别：

| powered | speed | polyfill |
|:------:|:------:|:-------:|
|   babel  | 😭  |  🥰 |
|   swc  | 🥰  |  😄 |
|   esbuild  | 🥰  |  😭 |

初入眼帘会被 [swc](https://github.com/swc-project/swc) 和 esbuild 的性能所吸引，解法方向即是用他们来代替 babel ，但其代替过程实际上却是困难重重，我们需要考虑很多相关工具搭配的问题，这将影响到 DX 、速度、功能 等等多个方面，深入思考折中衡取才是王道，在正文中我们将论断这一部分。

### 重要插曲：mfsu

在国内 FE 圈内，mfsu 也是一个很优秀的提速方案。

mfsu 通过预构建第三方库，通过搭配 webpack5 MF 机制加载，将极大的提升 冷/热开发 的速度和体验，由于目前支持独立使用在任何纯 webpack 项目（非 cra 等脚手架项目），可以给我们带来极大的赋能收益。

在即将发布的 umi@4 版本，mfsu 将作为一个单体支持独立使用，而且将可以和 [swc](https://github.com/swc-project/swc) / [esbuild](https://esbuild.github.io/api/) 打组合拳，获得更好的提速效果。

所以本次我们将一并将 [mfsu](https://umijs.org/zh-CN/docs/mfsu) 纳入考虑因素。

### 正文

下面我们细致论断各个环境的 transpiler 和 minify 如何选择。

### 生产 transpiler

生产构建时只要考虑 快速、polyfill 两个问题。

考虑到 polyfill 我们应该在生产使用 [swc](https://github.com/swc-project/swc) ，兼容到 es6 / es7 ，差不多 chrome 50 系是足够的，对于中台来说，es7 是非常戳戳有余，所以我们首选 [swc](https://github.com/swc-project/swc) 是毫无疑问的。

我们考虑一些特殊场景：

| scene | think |
|:------:|:------:|
|css-in-js|由于 css in js 必须要有 babel 插件才能做压缩，否则标签函数将增大产物体积，就以最经典的 sc 和 emotion 来看，目前 nextjs 正在 roadmap sc 的 swc 插件编写来弥补这一问题，而 emotion 却毫无进展，所以对于此问题的结论是：短时微痛，未来有解。|
|babel plugin|对于 babel 插件来说，默认 preset 部分 swc 均支持，如果无自定义转译行为，babel 插件将构不成问题点。如果有自定义插件，轻则重写至 swc 插件（如处理字符串等），重则放弃（如低 stage 语法特性）。|
|polyfill|	如面临手机端或低版本 to C 场景，为保证业务收益，没有理由迭代至 swc|

综合来看，由于 swc 存在插件机制可以缓解很多问题，少数情况我们最多只是短痛，通常情况下我们没有痛点，所以：

> 使用 swc 在生产做转译是最优解

注：如果你需要兼容低版本场景，可以终止阅读此文，因为这将不会使你得到收益。

### 开发 transpiler

对于开发环境转译的选取，先看各场景影响的分类讨论：

|scene|	think|
|:----:|:-----:|
|css-in-js|	为了获得良好的开发体验，使用 babel 插件获得类名显示支持是很重要的，但是目前 sc 和 emotion 在这一块均无 swc 或 esbuild 的支持（或正在进行中），如果使用 css-in-js ，虽然可以编译，但开发体验这将是一个痛点
Ts type check	由于 swc 和 esbuild 不存在 type check，但是我们可以直接使用 [fork-ts-checker-webpack-plugin](https://github.com/TypeStrong/fork-ts-checker-webpack-plugin) 秒解此问题，另外 tsc 的 golang 版也已经启动了，详见 tsc-go|
|babel plugin	|此处同上面我们说的，需要重写至 swc plugin，由于 esbuild transform 不支持 plugin，所以复杂的功能将很难迁移 esbuild 实现|
|mfsu	|由于 mfsu 需要 top level await 特性，webpack5 已经支持，但 swc 目前不支持（issue#31054）， 但 esbuild 在 target 为 esnext 情况时可以极限支持|
|polyfill	|开发时无需考虑 polyfill 问题|

综合来看：

1. css-in-js ：不管是 [swc](https://github.com/swc-project/swc) 还是 esbuild，要痛都痛，但不致命，因为很多情况我们选择写样式文件

2. Ts type check：有解

3. babel plugin：如果没有特殊转译需求，完全不痛

4. mfsu：使用 esbuild 可以极限存活，保证不痛，但 mfsu 不能与 swc 共存

折合来看，为了享受 mfsu 带来的好处：

> 选择 esbuild 作为开发的转译器是最优解

### 生产 minify

对于 minify ，我们只需要关注速度问题即可，因为转译已经做好了，我们早期是 TerserPlugin + CssMinimizerPlugin 的方案，现在使用 esbuild 做 minify 是比较好的方案，因为 esbuild 在速度上将比 [swc](https://github.com/swc-project/swc) 胜出一筹（微弱），且 ESBuildMinifyPlugin 将支持 css 和 js 的双压缩，减少多重配置心智成本。

所以：

> 选择 esbuild 作为生产的 minify 是最优解

### 开发 minify

开发环境无需 minify 。

### 总结与思考

通过上文的推导，我们得到一个组合构建方法论：

|env|	transpiler|	minify|	additional|	polyfill|
|:----:|:-----:|:-----:|:-----:|:-----:|
|development	|esbuild|	-|	mfsu|	esnext|
|production|	swc|	esbuild|	-|	es7+|

这相对是一个在各种影响因素中折合的最优解。

到此，本文结束，但也许你仍对几个问题存在疑惑：

### 为什么选择 swc / esbuild

发展大势。由于主题重心不在此处，本文不会细致论证该问题的必要性，留给读者自行思考。

### 怎么配置 swc 与 esbuild

具体实践请参见：

[《 使用 swc 与 esbuild 闪电加速你的 webpack 打包链路 》](https://blog.csdn.net/qq_21567385/article/details/121345739)

### 未来的未来

在超级 involution 的工程时代中，我逐渐发现 JavaScript 的赋能力逐渐减弱，对此的破局，这里给出两个我的思考：

全面拥抱赋能力强的语言 Typescript，因为未来编译到 js 的链路成本将越来越低。

全面拥抱 rust / golang 工程链和工具，因为速度会令人窒息的进化。

最大的不变就是变化，变革一定是剧痛的，如果你无心入卷工程链，请选择一个大而美的全家桶来弥补你的短板，比如 nextjs 、umijs 等，这将使你更专注于业务层，同时享受到不断迭代的先进技术。