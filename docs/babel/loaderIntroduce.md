# loader详解

### 常见loader

目前常见的loader有sass-loader,css-loader,style-loader

- sass-loader（编译sass为css语法）
- css-loader（找出css中依赖的资源、压缩css等，转换css为commonjs语法）
- style-loader（转换成js代码，创建style标签，并插入html文件）
- postcss-loader（检查css，支持变量，mixins，转换新css语法，内联图片设置，Autoprefixer等）

### loader的特点

loader执行顺序为从右倒左，从下至上。

主要原因是Webpack选择的实现的方式为compose，而不是pipe方式

```js
function compose(...fns){
    if (fns.length === 0) {
        return arg => arg;
    }
    if (fns.length === 1) {
        return fns[0];
    }
    return fns.reduce((a, b) => (...args) => a(b(...args)));
}
```

可以通过enforce属性进行顺序的修改

1. pre 优先处理
2. normal 正常处理（默认）
3. inline 其次处理
4. post 最后处理

```js
{
    test: /\.js$/,
    exclude: /node_modules/,
    use: [
        'cache-loader',
        'babel-loader'
    ],
    include: [utils.resolve('src')],
    enforce: 'pre'
},
{
    test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
    use: [{
        loader: 'url-loader',
        options: {
            outputPath: fontsPath.outputPath,
            publicPath: fontsPath.publicPath,
            limit: 2048,
            name: '[name].[hash:7].[ext]'
        }
    }],
    include: [utils.resolve('src')]
}
```

如上：则上面的babel-loader优先执行

### resolveLoader

```ResolveLoader```用于配置Webpack如何寻找loader。默认情况下只会去```node_modules```目录下寻找，为了让Webpack加载放在本地项目中的```loader```需要修改```resolveLoader.modules```。
假如本地的```loader```在项目目录中的```./loaders/loaderName```中，则需要如下配置:

```js
module.exports = {
    resolveLoader: {
        modules: ['node_modules', './loaders/']
    }
}
```

加上以上配置后，Webpack会先去```node_modules```项目下寻找```Loader```，如果找不到，会再去```./loaders/```目录下寻找。