# css权重

css作为web开发中的重要组成部分，已经被运用到web前端开发中的方方面面。然而在平时开发中，常常会在不同的地方为同一个元素定义了不同的样式。有时候往往会觉得声明的样式没有达到自己预期的效果，这时候就想要探究一下其中的奥秘。

其实，css选择器中存在着自己的规则，来规范各个样式的显示优先级，可以成为css的权重。

那么如何知道哪个样式的优先级更高呢，下面来介绍下css选择器的优先级。
选择器的优先级可以划分为0, 0, 0, 0四个等级。
其中：

- 内联元素： 1, 0, 0, 0
- ID选择器  0, 1, 0, 0
- 类选择器，属性选择， 伪类  0, 0, 1, 0
- 元素，伪元素 0, 0, 0, 1


**<font color="red">当一个元素设置为!important，即重要的时候，那么这个样式作为最高优先级，超越了其他所有的样式，优先显示。</font>**
下面请看如下样式：
```html
<div class="text">Google</div>
```

```css
.text {
  color: red;   /* 0, 0, 1, 0*/
}

.text {
  color: hotpink;   /* 0, 0, 1, 0*/
}
```
Google会显示为hotpink,虽然他们的权重相等，但是后声明的样式会覆盖先声明的样式。
若我们把样式改为如下样式
```css
div.text {
  color: red; /*0, 0, 1, 1*/
}

.text {
  color: hotpink; /*0, 0, 1, 0*/
}
```
由于div.text权重大于.text的权重，所以字体会显示为红色

考虑如下样式：
```html
<div id="parent" class="parent">
  工会
  <span class="child">人员</span>
</div>
```
```css
.parent {
  color: red; /*0, 0, 1, 0*/
}

div.parent {
  color: skyblue; /*0, 0, 1, 0*/
}

#parent {
  color: darkorchid; /*0, 1, 0, 0*/
}

div .child {
  color: greenyellow; /*0, 0, 1, 1*/
}

div span {
  color: blue; /*0, 0, 0, 2*/
}

.child {
  color: orange; /*0, 0, 1, 0*/
}
```

由图中的权重列表可知，对于工会两个文字来说，
优先级应该是#parent > div.parent > .parent
对于人员来说，则是div .child > .child > div span

css存在三种样式：
1. 内联样式
2. 内部样式
3. 外部样式

其中**内联样式 > 内部样式 > 外部样式**

css中分为三种样式来源：
1. 创作人员样式
2. 读者样式
3. 用户代理样式

**创作人员样式**：即前端开发者开发的样式
**读者样式**： 即浏览页面的用户，通过浏览器提供的外部api接口，进行修改页面的样式
**用户代理样式**： 即浏览器（如Chrome, IE, safari等)定义的默认样式，如链接默认显示的蓝色样式。


其中**创作人员样式 > 读者样式 > 用户代理样式**
