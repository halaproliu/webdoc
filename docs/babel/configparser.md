## Babel 配置用法解析

刚复工的时候我司业务太多了，我已不记得我们连续作战了多少天，最近算是有时间可以学习学习我的**babel**大宝贝了，上周末看了下**babel**的一些核心模块以及babel的一些配置，今天继续以博客的形式记录总结下来。

___

###### 写前面：babel默认是只会去转义js语法的，不会去转换新的API，比如像Promise、Generator、Symbol这种全局API对象，babel是不会去编译的。在我学会了babe配置l大法之后，看我一会儿怎么把这些新的API给它编译出来就完事儿了。

##### 本文基于babel7.8.0。我主要记录下babel配置需要的一些重要的模块儿包，来一步步进行babel的一个配置解析(以babel.config.js方式配置为例)。

##### 本文主要涉及到的一些babel包：`@babel/core`，`@babel/cli`，`@babel/plugin*`，`@babel/preset-env`，`@babel/polyfill`，`@babel/runtime`，`@babel/plugin-transform-runtime`。

##### 那，话不多说，发车？

  

## @babel/core

**@babel/core** 这个包里主要都是一些去对代码进行转换的核心方法，具体里面的一些api方法我就不做介绍了；引用官网的一句话：**“所有转换将使用本地配置文件”**，所以待会儿我们的**babel.config.js**配置文件就很重要了；再一个core就是核心的意思嘛，所以我们话不多说先把它装起来，gogogo

```
Copynpm install --save-dev @babel/core

```

  

## @babel/cli

这个 **@babel/cli**就是babel带有的内置cli，可以用来让我们从命令行来编译我们的文件，有了他我们就很方便的对**babel**进行学习了，那话不多说，先装起来？

```
Copynpm install --save-dev @babel/cli

```

装完之后你就可以这样来编译你的文件：

```
Copynpx babel study.js --watch --out-file study-compiled.js

```

简单介绍下上面命令用到的几个参数：`--out-file`用来把编译后的目标文件输出到对应的文件；如果希望在每次更改目标文件时都进行编译，可以加上 `--watch`选项；当然还有一些别的选项，不过在我学习**babel**以及配置的话，这两个选项已经够我用了。

**在操作的过程中如果改了babel配置发现编译出来的文件并没有实时编译的情况，需要注意下，如果改了配置文件那就需要重新执行这段命令，要不然babel读不到新的配置。**

如果你已经创建了study.js文件并且执行了这段命令，你会发现，对应的study-compiled.js还没发生变化，因为我们还没开始写babel的配置文件，莫慌，马上开始。

## @babel/plugin\*和@babel/preset-env[#](https://www.cnblogs.com/bai1218/p/12392180.html#1246000954)

**babel**插件和**babel**预设是**babel**配置的两个主要模块，所以我就放在一起说了。

### @babel/plugin\*

首先我们先来说下**babel**的**Plugins**，**babel**官网也说了，人**babel**是基于插件化的，大概就是说全是插件，所以说我们配置文件里如果什么插件也不配的话，那输入和输出就是一样的，插件插件，你得插上我才让你用。我来编译一个最简单的箭头函数来看下这个**babel**的插件怎么用，来了，这波我们就需要配置文件了，以下所有的配置都是说的在**babel.config.js**文件里，**相应的插件记得install**

```
Copy/* babel.config.js */

module.exports = {
  presets: [
  ],
  plugins: [
    "@babel/plugin-transform-arrow-functions"
  ]
}

```

然后执行我们上面那段cli的命令，就会得到这种效果：

```
Copy/* study.js */
const study = () => {}

/* study-compiled.js */
const study = function () {};

```

当然，如果我们想要使用es6给数值新增的指数运算符怎么办，只需要添加相应的 **@babel/plugin-transform-exponentiation-operator** 插件即可：

```
Copy/* babel.config.js */

module.exports = {
  presets: [
  ],
  plugins: [
    "@babel/plugin-transform-arrow-functions",
    "@babel/plugin-transform-exponentiation-operator"
  ]
}

```

对应的es6语法就会变成：

```
Copy/* study.js */
const exponentiation = 2 ** 2

/* study-compiled.js */
const exponentiation = Math.pow(2, 2);

```

  

### @babel/preset-env

从上面的插件化我们就知道需要哪个插件就去引入就完事儿，那么问题来了，es6新增的语法那么多，我总不能一个插件一个插件去添加吧，这样也太麻烦了，这个时候就要用到babel提供的**presets**了。

**presets**也就是预设的意思，大概意思就是可以预先设定好一些东西，就省得我们一个个的去引入插件了。官方提供了很多**presets**，比如**preset-env**（处理es6+规范语法的插件集合）、**preset-stage**（一些处理尚在提案阶段的语法的插件集合，当然这种预设的方式在 **babel 7+** 版本已经被废弃了）、**preset-react**（处理react语法的插件集合）等等。

我们主要来介绍下**preset-env**：**preset-env**是一个**智能**预设，配置了它就可以让你用es6+去书写你的代码，而且他会按需去加载所需要的插件，让你的生活更加美好。。。接下来我们记得先install这个 **@babel/preset-env**一波，不配任何插件，然后我们再来看看效果如何：

```
Copy/* babel.config.js */

module.exports = {
  presets: [
    "@babel/preset-env"
  ],
  plugins: [
  ]
}

```

对应的es6语法就会变成：

```
Copy/* study.js */
const study = () => {}

const arr1 = [1, 2, 33]
const arr2 = [...arr1]

const exponentiation = 2 ** 2

// 新增API
new Promise(() => {})
new Map()


/* study-compiled.js */
var study = function study() {};

var arr1 = [1, 2, 33];
var arr2 = [].concat(arr1);
var exponentiation = Math.pow(2, 2);

// 新增API
new Promise(function () {});
new Map();

```

你会发现es6+的语法都被编译了，我们并没有设置任何插件哦，应该也看到了新增的API方法并没有被编译，在这里我们埋下伏笔，等下文讲到**polyfill**的时候再治他。

##### Browserslist集成

关于**preset-env**，我们还可以提供一个`targets`配置项指定运行环境，就是我们可以配置对应目标浏览器环境，那么**babel**就会编译出对应目标浏览器环境可以运行的代码。相信有同学遇到过在低版本系统ios手机里自己的项目会白屏，其实是某些语法在ios低版本系统里不支持，这个时候我们可以直接配置ios 7浏览器环境都可以支持的代码：

```
Copy/* babel.config.js */

module.exports = {
  presets: [
    [
      "@babel/preset-env", {
        'targets': {
          'browsers': ['ie >= 8', 'iOS 7'] // 支持ie8，直接使用iOS浏览器版本7
        }
      }
    ]
  ],
  plugins: [
  ]
}

```

当然**babel**的**Browserslist**集成还支持在**package.json**文件里或者新建一个 **.browserslistrc** 文件来指定对应目标环境。[browserslist配置源](https://github.com/browserslist/browserslist#queries)

## @babel/polyfill(由core-js2和regenerator-runtime组成的一个集成包)

上文也提到了像Promise这种API咱们的**babel**并没有给转义，那是因为**babel**默认是只会去转义js语法的，不会去转换新的API，比如像Promise、Generator、Symbol这种全局API对象，**babel**是不会去编译的，这个时候就要掏出 **@babel/polyfill** 了。用法很简单，先安装一波，然后我们只需要在入口文件顶部引入 **@babel/polyfill** 就可以使用新增的API了。

```
Copy/* study.js */
import '@babel/polyfill'
// 新增API
new Promise(function () {});

/* study-compiled.js */
require("@babel/polyfill");
// 新增API
new Promise(function () {});

```

> 小细节：import被编译成了require，如果想要编译出来的模块引入规范还是import，则可以在preset-env的配置项中添加"modules": false即可。  
> modules的options："amd" | "umd" | "systemjs" | "commonjs" | "cjs" | "auto" | false，默认为"auto"

但是问题又来了，有时候我们项目里并没有用到那么多的新增API，但是 **@babel/polyfill** 会把所有浏览器环境的的polyfill都引入，整个包的体积就会很大，我们想要对目标环境按需引入相应的polyfill应该怎么办呢，这个时候我们就可以使用 **preset-env** 的配置项中的`useBuiltIns`属性来按需引入polyfill。

```
Copy/* babel.config.js */

module.exports = {
  presets: [
    [
      "@babel/preset-env", {
        "modules": false,
        "useBuiltIns": "entry",
        'targets': {
          'browsers': ['ie >= 8', 'iOS 7'] // 支持ie8，直接使用iOS浏览器版本7
        }
      }
    ]
  ],
  plugins: [
  ]
}

```

这个时候就会在入口处只把所有ie8以上以及iOS 7浏览器不支持api的polyfill引入进来。

最终效果：

```
Copy/* study.js */
import '@babel/polyfill'
// 新增API
new Promise(function () {});

/* study-compiled.js */
import "core-js/modules/es6.array.copy-within";
import "core-js/modules/es6.array.every";
...//省略若干
import "core-js/modules/web.immediate";
import "core-js/modules/web.dom.iterable";
import "regenerator-runtime/runtime";
// 新增API
new Promise(function () {});

```

此时你会发现，import '@babel/polyfill'没有了，引入的是我们目标环境相应的polyfill。但是有没有发现引入的都是import 'core-js/...'的内容，标题已经说啦，**@babel/polyfil**是由core-js2和regenerator-runtime组成的一个集成包。

这个时候你又会想，假如我的项目里面只用到了Promise这个API，能不能只给我引入Promise相应的API呢？答案是必可以！，让我们先来好好了解下**preset-env**的配置项中的`useBuiltIns`属性。

##### useBuiltIns

选项："usage"| "entry"| false，默认为false。

`entry`我们已经用过了，意义就是在入口处将根据我们配置的浏览器兼容，将目标浏览器环境所有不支持的API都引入。

`usage`就很nb了，当配置成usage的时候，babel会扫描你的每个文件，然后检查你都用到了哪些新的API，跟进我们配置的浏览器兼容，只引入相应API的polyfill，我们把`useBuiltIns`属性设置为`usage`再来看下编译效果：

```
Copy/* study.js */
import '@babel/polyfill'
// 新增API
new Promise(function () {});

/* study-compiled.js */
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.promise";
// 新增API
new Promise(function () {});

```

我就问你帅不帅！完全的按需引入，牛逼了！

相信你也看到了一个东西，当我们使用`useBuiltIns`选项的时候，你的命令行里面是不是显示了一坨这样的警告，大概是在配置文件中未指定core-js版本时，默认会使用core-js2：

> WARNING: We noticed you're using the `useBuiltIns` option without declaring a core-js version. Currently, we assume version 2.x when no version is passed. Since this default version will likely change in future versions of Babel, we recommend explicitly setting the core-js version you are using via the `corejs` option.

前面也说到了 **@babel/polyfil** 是由core-js2和regenerator-runtime组成的一个集成包，现在core-js3已经发布了，而且很稳定。但是core-js2在18年的时候已经不再维护了；**@babel/polyfil**引入的是2不是3，并且 **@babel/polyfill** 在babel7.4.0已经不再推荐使用了，要废掉(好像是因为@babel/polyfill不支持core-js2平滑的过渡到core-js3)。所以core-js官方现在推荐我们使用polyfill的时候直接引入core-js和regenerator-runtime/runtime这两个包完全取代 **@babel/polyfil** 来为了防止重大更改。

当然，我们需要在preset-env配置项中指定core-js版本，这样就不会再有警告⚠️了：

```
Copy/* babel.config.js */

module.exports = {
  presets: [
    [
      "@babel/preset-env", {
        "modules": false,
        "useBuiltIns": "entry",
        "corejs": "3",
        'targets': {
          'browsers': ['not ie >= 8', 'iOS 7'] // 支持ie8，直接使用iOS浏览器版本7
        }
      }
    ]
  ],
  plugins: [
  ]
}

```

  

## @babel/runtime(依赖@babel/helpers和regenerator-runtime)

有的时候一些语法的转换会比较复杂，babel会引入一些helper函数，比如说对es6的class进行转换：

```
Copy/* study.js */
class Test {}

/* study-compiled.js */
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Test = function Test() {
  _classCallCheck(this, Test);
};

```

可以看到上面引入了helper函数来处理class的转换。但是问题又来了，如果好多文件都使用到了复杂语法的转换，这个还是简单点的，有些helper函数是很复杂代码量很多的，那岂不是每个文件都会定义一遍这些个函数，每个文件的代码会很多？如果说可以把这些helper函数都抽离到一个公共的包里，用到的地方只需要引入对应的函数即可，我们的编译出来的代码量会大大滴减少，这个时候就需要用到 **@babel/plugin-transform-runtime** 插件来配合@babel/runtime进行使用。记得先安装一波，然后在插件选项中加入 **@babel/plugin-transform-runtime** 这个插件，然后我们来看看编译后的效果：

```
Copy/* study.js */
class Test {}

/* study-compiled.js */
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";

var Test = function Test() {
  _classCallCheck(this, Test);
};

```

当然如果我们只是为了减少编译出来的文件中代码量而使用这个插件的话就太小看他了，而且也没有必要。

**@babel/plugin-transform-runtime**还有一个最重要的作用：比如说像上面我们说的Promise就需要提供相应的polyfill去解决，这样做会有一个副作用，就是会污染全局变量。如果我们只是在一个业务项目这样搞还好，也没别人要用到。但是如果我们是在维护一个公共的东西，比如公共组件库，我们这样搞，你的一些polyfill可能会把一些全局的api给改掉，副作用就会很明显，别人用你的组件库的时候就可能会出问题。**@babel/plugin-transform-runtime**插件为我们提供了一个配置项corejs，他可以给这些polyfill提供一个[沙箱环境](https://baike.baidu.com/item/%E6%B2%99%E7%AE%B1/393318?fr=aladdin)，这样就不会污染到全局变量，无副作用你说美不美。

记得安装 **@babel/runtime-corejs2** 这个包(稳定版用2就可以)，注意如果不配置的话，是不会提供沙箱环境的。然后在 **@babel/plugin-transform-runtime** 插件配置corejs：

```
Copy/* babel.config.js */

module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        "modules": false,
        "useBuiltIns": "usage",
        "corejs": "3",
        'targets': {
          'browsers': ["ie >= 8", "iOS 7"] // 支持ie8，直接使用iOS浏览器版本7
        }
      }
    ]
  ],
  plugins: [
    [
      "@babel/plugin-transform-runtime",
      {
        "corejs": 2
      }
    ]
  ]
}

```

我们来看下编译后的效果：

```
Copy/* study.js */
new Promise(() => {})
class Test {}

/* study-compiled.js */
import _classCallCheck from "@babel/runtime-corejs2/helpers/classCallCheck";
import _Promise from "@babel/runtime-corejs2/core-js/promise";

new _Promise(function () {});
var Test = function Test() {
  _classCallCheck(this, Test);
};

```

### 小节

-   在你修改了babel配置项之后一定要记得重启编译命令，否则不会生效
-   维护公共组件库或者一些别的公共库推荐要使用@babel/runtime配合@babel/plugin-transform-runtime来建立沙箱环境

> 接下来本人会去继续研究babel是如何解析编译的，target：理解babel如何解析编译，能够手写一个babel插件出来。最近需求比较多，下一篇估计得等到Q2了。。。

### 写在最后：

最近也是疫情期间，大家一定要记得尽量少出门，出门必带口罩。像白衣天使们致敬！