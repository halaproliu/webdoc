# SINGLE-SPA的简单介绍与遇到的问题小结

其实本来应该写个介绍的，但是我看到其他的文章写得很完善了，所以就来写写我在其中遇到的一些问题就好了。

安装[single-spa](https://single-spa.js.org/)请看沉末的[这篇文章](https://juejin.im/post/5e1d2a02f265da3e4d5ba94c#heading-4)。

## 背景

简单介绍下背景吧～

为什么要用`single-spa`呢，是因为公司的项目需要拆项目了，这个时候就需要知道微前端的概念了，那么什么是微前端呢。

### 微前端服务

> 微前端架构是一种类似于微服务的架构，由ThoughtWorks 2016年提出，它将微服务的理念应用于浏览器端，即将 Web 应用由单一的单体应用转变为多个小型前端应用聚合为一的应用。

由此带来的变化是，这些前端应用可以独立运行、独立开发、独立部署。

在项目中是运用`single-spa`去搭建微前端框架的，在搭建框架之前，我们需要知道两个知识点，什么是`single-spa`和`importmap`。

### single-spa

而`single-spa`是一个用于前端微服务化的`JavaScript`前端解决方案。

特点：

-   (兼容各种技术栈)在同一个页面中使用多种技术框架(React, Vue, AngularJS, Angular, Ember等任意技术框架),并且不需要刷新页面.
-   (无需重构现有代码)使用新的技术框架编写代码,现有项目中的代码无需重构.
-   (更优的性能)每个独立模块的代码可做到按需加载,不浪费额外资源.  
    每个独立模块可独立运行.

### importmap

我们先来看两段代码

```
import moment from 'moment';
import 'http://momentjs.com/downloads/moment.js';
```

在一个文件中我们写入如上代码，显然第一行是无法正常运行的，第二行是可以正常运行的，但如果我们想要第一行正常运行的话，`importmap`就可以粉墨登场啦。只需要在`html`文件书写如下：

```
<script type="importmap">
    {
        "imports": {
            "moment": "https://momentjs.com/downloads/moment.js",
        }
    }
</script>
```

就可以了。

但是现在浏览器并不支持，想要让它支持的话，需要引入`system.js`。

```

<script type="systemjs-importmap">
    {
        "imports": {
            "moment": "https://momentjs.com/downloads/moment.js",
        }
    }
</script>
<script src="https://cdn.jsdelivr.net/npm/systemjs/dist/system.js"></script>

```

而在`single-spa`的使用过程中，我们需要用`importmap`在根项目中引入所有的模块文件和子项目，从而在其余项目中可以进行模块的引用，就像上面说的那样，可以把`moment`想象成一个子项目。

`single-spa`用于将项目打包为可引用的模块。

其他的就不多加介绍了，具体可以看原作者@Joel Denning发的[视频](https://www.youtube.com/watch?v=vjjcuIxqIzY&t=406s)，需要🔬上网。

## 遇到的问题

### 怎么打开importmap的插件

在浏览器的console中输入

> localStorage.setItem(‘devtools’, true);

![](https://www.freesion.com/images/203/6c88db7739eba0798e667e1918dd72b3.png)

这个小可爱就出现了。

### 子项目打包

在微服务的组件引用中，由于运用cdn引入，因此文件需要打包成**单一的`js`文件**，而`vue-cli3-service`（文件路径位于`node_modules/_@vue_cli-service@4.3.1@@vue/cli-service/lib/config`, 并没有找到`github`地址）内置了一些`webpack`配置，在子项目的打包过程中需要把某些配置关掉，并且将其打包成支持`system.js`的文件，我们需要做如下事情:

-   将项目打包成可引入的文件
-   去除代码分割的配置 (代码分割会生成`chunk-vendors`文件)
-   去除`mini-css-extract-plugin`(该插件会将组件中的`css`抽离出来)

代码如下

```
> vue.config.js

process.env.VUE_CLI_CSS_SHADOW_MODE = true; // 去除将css从js分出去的配置

module.exports = {
    chainWebpack: config => {
        config.optimization.delete('splitChunks') // 关闭代码分割
        config.output
            .filename('app.js')
            .library('@[library]/[sub-project]')
            .libraryTarget('amd') // 打包方式
            .end()
    }
    ...
}
```

但是上面都是屁话。。。。这些事情其实只要一个插件就可以解决了，原作者写了`vue-cli-plugin-single-spa`这个插件，直接安装即可。

> npm install vue-cli-plugin-single-spa -D

### 子项目的文件路径404了

经过如上的过程打包之后，打包后的文件为`/dist/js/app.js`，在原作者写的插件中，改写文件路径如下：

![](https://www.freesion.com/images/161/bbc9c97b02a03ae1175f910433ea2c71.png)

就可以了。

假如还是`404`，可能项目被打包到了不同的路径，需要打开子项目的`tab`在浏览器中查看文件地址。

![](https://www.freesion.com/images/659/c16a6d76ae1f6b7c2f2faa4d729e1f53.png)

### element-ui 图标显示不出

需要注意的是`vue-cli-plugin-single-spa`这个插件并没有处理文字等静态资源，因此尽管`npm run build`没有显示静态资源被打包成单独的文件，事实上其还是被打包成了静态文件了。解决这个问题最好的方法是把`element-ui`转化为`cdn`引入的而不是通过`node_module`引入的。

### 渲染错项目

明明指向的是项目A，但是却渲染成了项目B。

![](https://www.freesion.com/images/102/82ce301dc9de6e66eba6b3e521221c96.png)

插件中配置的文件路径错了，可能A项目是8080端口配置成了8081端口，在多项目开发的时候尤其容易出现该问题。

### 怎么实现两栏布局右边可切换项目

之前的我天真得以为可以将子项目变成一个`router`的组件直接引入，但事实上是实现不了的。由于项目的耦合程度过大，依赖于各个插件，是无法将其打包成一个组件的。所以其实质上是两个并排的`DOM`节点。但是我们可以实现一个假的效果。

在菜单栏的`router`中设置，

```
{
    path: '/',
    component: Home,
    name: 'home',
    redirect: '/sub-project',
    children: [{
      path: 'sub-project/*',
      name: 'sub-project',
    }]
  },
```

为什么要加星号呢，是为了解决另一个问题，不加通配符的话会导致`navbar`无法正常匹配，如果`sub-project`具有一些`router`转换的话。

为了在子项目中能匹配相应的`router`，需要设置

> base: ‘sub-project’

接着在菜单栏中设置浮动，右边`margin`相应的宽度就可以了。

## 更多