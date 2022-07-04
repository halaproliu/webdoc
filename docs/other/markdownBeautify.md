# 你的掘金文章本可以这么炫（博客美化工具一波带走

## 前言

你盼世界， 我盼望你无`bug`。Hello 大家好！我是霖呆呆！

这篇文章不是一篇技术文，主要是提供给大家一些美化掘金文章的方法。

对比各大博客平台，掘金的文章样式算是这个👍了，但是有人曰：

> 👣
> 
> 没有最好，只有更好
> 
> ”

也许我们还可以用一些别的方式来让我们的文章更具有个性化, 试想一下，在你辛辛苦苦精心尽力的写完了一篇文章之后，再花上一小点时间来美化你的文章样式。

这样不仅你自己看着舒服，读者在阅读到你的文章之后也会眼前一亮：“咦～ 这小伙子（小姑娘）的文章是挺有特点的哈！”

![加油.jpg](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/2/19/1705b82222344301~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

加油.jpg

所以在此我就向大家`pick`一些我写博客时用到的好的工具。

我本身是一名前端开发，不过这篇文章的内容对职业没有限制，如果涉及到一些前端方面的内容我也会尽量说的详细，所以请放心“食用”吧 😁。

通过阅读本篇文章你可以学习到：

-   使用`markdown-nice`来美化文章样式
-   `markdown`代码片段中的`diff`类型
-   设计制作封面大图
-   使用`vscode`插件-`Polacode-2019`截取代码图

## 使用`markdown-nice`来美化文章样式

大家可以看到我的文章样式会有点特别（也有点好看），这是因为我使用了一个名为`markdown-nice`的排版工具。

这个排版工具支持微信公众号排版、知乎、掘金、博客园和 CSDN 等平台。

我个人主要是用在掘金、微信公众号上比较多（简书上我也有写文章，不过貌似不支持）。

这是体验地址：[markdown-nice体验地址](https://mdnice.com/)

### 工具简介

在`markdown-nice`中有非常多的主题可以供大家使用：

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/2/19/1705b923603c4358~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

例如我就比较喜欢用`红绯`这一主题（毕竟本命年希望红一点\[表情包害羞\]）

下面是一些主题的截图：

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/2/19/1705b9bc0a7869ec~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

橙心👆

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/2/19/1705b9c503d54bf1~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

绿意（绿绿的多好看）👆

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/2/19/1705ba084b353f51~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

红绯👆

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/2/19/1705ba170ac1783d~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

山吹👆

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/2/19/1705ba24c536adb0~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

蔷薇紫（紫色代表着高贵）👆

当然如果你觉得上面提供给你的这些主题都还差了点意思，你也可以自定义`CSS`来编写自己的主题。

另外对于我们程序员来说，代码块也是经常用到的，`markdown-nice`也提供了几种代码块的主题：

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/2/19/1705ba70bcb4ca78~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

几种好看的代码块截图：

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/2/19/1705ba91dad43501~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

auto-one-dark 主题 👆

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/2/19/1705ba7d67018fe1~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

auto-one-light 主题 👆

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/2/19/1705ba81b238b24b~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

monokai 主题 👆

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/2/19/1705baa01f92f326~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

github 主题 👆

### 如何使用`markdown-nice`

好了 😊， 说了这么多让我们来看看如何使用它吧。

使用方式有两种，分为**在线使用**和**下载项目到本地运行使用**，无论哪一种都可以。

#### 1\. 在线使用

第一种方式你可以直接在刚刚我介绍的 [markdown-nice体验地址](https://mdnice.com/) 中使用它。

在左侧编辑好你的文章内容， 选好主题之后，点击这个页面右上角的`微信图标`或者`知乎图标`，此时就已经复制成功了。

(不过最新的版本已经支持掘金了，在知乎图标的下方有一个掘金图标)

之后到掘金或者其它平台上点击「写文章」，然后`Ctrl + V` 粘贴一下就可以了。

![第一步](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/2/19/1705bb62074834ed~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

第一步

![第二步](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/2/19/1705bb780890fd01~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

第二步

（感谢该项目的作者[画手](https://juejin.cn/user/1521379822285128)特意跑到本文中指出还可以进行自定义`CSS`，之前一直忽视了这个功能，抱歉）

如果你对于样式有一些自己的想法的话，还可以使用这里的`自定义功能`，点击主题中的`"自定义"`，还有把下面的`"查看自定义"`主题打开，就可以进行自定义了：

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/3/20/170f822caf731918~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

例如我这里的`红绯`主题，在使用「引用」功能的时候，会将引用的内容设置为黑色底，同时边上有一个苹果的`icon`：

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/2/19/1705c732b097bbba~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

但是这个苹果的`icon`在非`IOS`系统的手机和电脑上就显示不出来了，也许我们可以将它替换成自己想要的字或表情。

通过元素查找，我发现它是用伪类来实现的：

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/3/20/170f823691da595e~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

因此我在`主题CSS`中对该样式进行修改：

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/3/20/170f823943927977~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

如上图，原来的苹果图标变成了我修改的脚印。

#### 2\. 克隆项目到本地运行

由于该项目是开源免费的，所以你也可以直接去`github`上克隆至本地使用：

（不过线上地址已经满足了几乎所有的需求，所以不用本地运行也可以）

**GitHub项目地址：https://github.com/mdnice/markdown-nice**

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/2/19/1705c516d85bdd2e~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

其实到了这一步如果你是前端童鞋的话应该都知道怎么使用了，无非就是安装依赖再本地运行就可以了。

如果你没接触过这一块的可以接着往下看。

1.  项目下载到了本地之后，我们需要先安装上依赖。因此你得保证你的本地电脑中安装了`node.js`，如果没有安装的话，可以在[node.js下载](https://nodejs.org/zh-cn/)这个链接中下载安装。你可以在终端通过一下命令检查你有没有安装成功：

```
node -v// ornpm -v
```

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/2/19/1705c5987a0c4039~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

以上两个指令都可以，`-v`表示查看版本号。

2.  将项目用编辑器打开，`vscode`, `HBuilder`等等都可以, 然后在项目根目录输入命令：

```
npm install// or 简写为npm i
```

这一步是为了根据`package.json`中的配置安装相应的依赖，执行完之后你应该可以看到根目录下多出了一个`node_modules`文件夹。

3.  执行指令，本地启动项目：

```
npm run start
```

完了之后，它会自己打开`localhost:3000`页面，效果和在线编辑的一样。

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/2/19/1705c6f5fda66ed6~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

另外`markdown-nice`也可以允许你把它当成组件在项目中使用，具体可以看官方给出的文档，很详细。

## `markdown`代码片段中的`diff`类型

还有一些小伙伴比较好奇我代码片段中的 `"+"、"-"` 是怎么来的, 比如这样：

```
这里是你的代码片段+ 我是一段新增的- 我是一段被删除的
```

这其实只要把代码片段的类型设置为`diff`就可以了：

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/2/19/1705c7bca79c99a9~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

在Typora中：

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/2/19/1705c7c95a3bde71~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

## 设计制作封面大图

另外在掘金中，是如何给文章加上自己的封面大图的呢，比如下面这种效果：

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/2/19/1705c7f118bf2bc8~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

可以在你要发布的时候，点击这个图片`icon`进行添加封面：

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/2/19/1705c80161368907~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

那么问题来了，你说的这些我都知道，那我可得到哪去画这些好看的图片呢？你总不能让我先从`photoshop`入门开始学吧？

![你把我当成了什么.jpg](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/2/19/1705c83b347c86a9~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

你把我当成了什么.jpg

对于这一块，其实你度娘 🔍`公众号封面图片` 应该会有很多的工具，这边我就介绍一下我常用的工具吧。

一个是 [Canva](https://www.canva.cn/), 主页长成这样：

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/2/19/1705c8723ec6742e~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

还一个是[图怪兽](https://818ps.com/)：

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/2/19/1705c89bbdab258c~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

再就是可以在线PS的 [uupoop](https://www.uupoop.com/):

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/2/19/1705cb31f9dfac06~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/2/19/1705cb38ceb41706~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

里面不管是公众号封面还是海报封面都应该够满足我们爱美的需求了。

## 如何制作GIF动图

制作`GIF`动图分为两块：

-   录制屏幕并制作`GIF`图
-   制作公众号`GIF`图

### 录制屏幕并制作`GIF`图

有时候我们在写博客时可能需要一张这种的`GIF`图使我们介绍的内容更加有灵性:

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/2/19/1705cd6d5d2494df~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

#### `Mac`制作`GIF`动图

在`Mac`上你只需要简单的两步：

1.  使用电脑本身的`屏幕快照`来进行屏幕录制，录制的文件为`mov`格式的视频

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/2/19/1705cd8f4326e1c3~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

2.  在`AppStore`中下载并安装`PicGif Lite`, 然后在这里面将前面录制好的`mov`视频转成`GIF`动图

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/2/19/1705cd62fbfc4fe6~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

现在你就可以将你的`GIF`图片运用到文章中了！

#### 在`Windows`制作`GIF`动图

`Windows`上录制并制作`GIF`动图的工具好像更多，由于霖呆呆身边暂时也没有`Windows`电脑，所以度娘 🔍 了一些来仅供参考，当然有推荐的比较好的工具的小伙伴可以评论中留言，霖呆呆会更新到文章中，感谢🙏。

-   [LICEcap](https://licecap.en.softonic.com/download)
-   [迅捷GIF制作](https://www2.tianduntech.com/xjgif/index.html)

### 制作公众号`GIF`图

有些时候你可能还需要一张类似下面👇公众号二维码的`GIF`动图，让人感觉你是个阳光帅气（超 级 自 恋）的小靓仔。

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/2/19/1705cb95f7806ab3~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

你可以通过前面我介绍的[稿定设计](https://www.gaoding.com/)来制作自己的`GIF`动图：

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/2/19/1705ce5ffc989166~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

**注意**⚠️：

想要将`GIF`动图上传到掘金文章中来，最好不要使用**复制粘贴**的方式上传，而是点击「编写文章」页面中左下角的「点击上传图片」的`icon`来上传：

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/2/19/1705ce87a4c5226e~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

(因为我发现我直接CV进来的图并不是动态的`GIF`图片，不知道是不是我姿势不对...)

## 使用`vscode`插件-`Polacode-2019`截取代码图

这里再安利一波`vscode`的插件`Polacode-2019`（主要是看[胖哥](https://space.bilibili.com/165659472/)的视频知道的）。

它支持帮我们截取好看的代码图：

![code.png](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/2/19/1705ca767dc39faa~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

code.png

（当然这对于想要复制你代码的小伙伴好像不太友好了。。。）

![能不能愉快的玩耍了.jpeg](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/2/19/1705cab4ee9db7cd~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

能不能愉快的玩耍了.jpeg

这里就需要你的编辑器是[VSCode](https://code.visualstudio.com/)了。

在`VSCode`左侧的插件商场中搜索：`Polacode-2019`（还有一个插件是`Polacode`, 但是`2019`功能要更多一些）

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/2/19/1705ceb90d78ab4d~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

关于它的使用说明，在插件介绍中也说的比较详细了，或者你可以看胖哥的这期视频来了解它：[技术胖-VSCode中快速生成漂亮的代码截图](https://www.bilibili.com/video/av87677739)

## 后语

你盼世界， 我盼望你无`bug`。这篇文章就介绍到这里了，主要是分享一些我平常写博客的工具。当然如果您不喜欢这些“花里胡哨”的东西的话也可以不使用它们。不过，不喜勿喷哦。

最后，点个赞再走呗 😊 ～

喜欢**霖呆呆**的小伙还可以关注霖呆呆的公众号 `LinDaiDai` 或者扫一扫下面的二维码👇👇👇.

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/2/19/1705cb95f7806ab3~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

我会不定时的更新一些前端方面的知识内容以及自己的原创文章🎉

你的鼓励就是我持续创作的主要动力 😊.

相关推荐:

[《全网最详bpmn.js教材》](https://juejin.cn/post/6844904017567416328)

[《JavaScript进阶-执行上下文(理解执行上下文一篇就够了)》](https://juejin.cn/post/6844903983438381069)

[《霖呆呆你来说说浏览器缓存吧》](https://juejin.cn/post/6844904053223358471)

[《怎样让后台小哥哥快速对接你的前端页面》](https://juejin.cn/post/6844903951993667592)

[《建议改成: 读完这篇你还不懂Babel我给你寄口罩》](https://juejin.cn/post/6844904065223098381)

本文使用 [mdnice](https://mdnice.com) 排版