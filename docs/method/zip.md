# JavaScript实现在线查看zip文件

### 前言

在线查看zip，属于比较小众的功能，由于遇到了，就顺便学习了一下。这边主要使用了第三方的类库，[JSZip](https://stuk.github.io/jszip/),以及请求远程zip文件的类库[JSZipUtils](http://stuk.github.io/jszip-utils/)。


### JSZipUtils

- 添加JSZipUtils类库

其中chrome和ie的类库是区分开来的，所以需要做一下区分，笔者当前使用的是**v0.0.2**版本的。

```js
<script type="text/javascript" src="dist/jszip-utils.js"></script>
<!--
Mandatory in IE 6, 7, 8 and 9.
-->
<!--[if IE]>
<script type="text/javascript" src="dist/jszip-utils-ie.js"></script>
<![endif]-->
```

### JSZip

- 添加类库

当前使用版本为**v3.1.5**

```js
<script src="./dist/jszip.js"></script>
```

### 获取远程zip



- 使用JSZipUtils获取远程zip

```js
JSZipUtils.getBinaryContent("path/to/file.zip", function (err, data) {
   if(err) {
      throw err; // or handle the error
   }
   var zip = new JSZip();
   zip.loadAsync(data).then(zipFile => {
     zip.file('data.json').async('string').then(content => {
       console.log(content)
     })
   })
});
```
