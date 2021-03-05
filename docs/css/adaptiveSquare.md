# css实现自适应正方形

### 介绍

如何实现css的自适应正方形

### 方案一

- 设置垂直方向的padding撑开容器

在 CSS 盒模型中，一个比较容易被忽略的就是 margin, padding 的百分比数值计算。按照规定，margin, padding 的百分比数值是相对 父元素宽度 的宽度计算的。由此可以发现只需将元素垂直方向的一个 padding 值设定为与 width 相同的百分比就可以制作出自适应正方形了。

```html
<div class="box">
    <div class="inner-1"></div>
    <div class="inner-2"></div>
</div>
```

```css
.inner-1 {
    width: 50%;
    padding-bottom: 50%;
    background: #39f;
}
```

### 方案二

利用伪元素的 margin(padding)-top 撑开容器
在inner-2中使用max-height进行限制最大高度
由于容器与伪元素在垂直方向发生了外边距折叠，需要使用overflow: hidden触发bfc撑开高度

```css
.inner-2 {
    width: 50%;
    background: pink;
    overflow: hidden;
    min-height: 100%;
}

.inner-2:after {
    content: '';
    display: block;
    margin-top: 100%;
}
```
