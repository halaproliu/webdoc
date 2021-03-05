# 伪元素的妙用

### 1. 使用自增功能实现列表序号
```html
<ul class="sort-list">
  <li class="sort">元素列表</li>
  <li class="sort">元素列表</li>
  <li class="sort">元素列表</li>
  <li class="sort">元素列表</li>
  <li class="sort">元素列表</li>
</ul>
```
```css
.sort-list {
  counter-reset: li;
  list-style-type: none;
}
.sort {
  color: #000;
  background: #ccc;
  margin-top: 14px;
  padding: 15px;
  opacity: .8;
  width: 300px;
}
.sort::before {
  content: counter(li)". ";
  counter-increment: li;
}
```


### 2. 使用after实现自动换行
```html
<div class="poem">
  <span class="break-line">故人西辞黄鹤楼</span>
  <span class="break-line">烟花三月下扬州</span>
</div>
```
```css
.break-line::after {
  content: "\A";
  white-space: pre;
}
```
### 3. 使用css的attr函数实现placeholder
```html
<div class="input-text attr-placeholder" contenteditable="true" data-placeholder="请输入文字"></div>
```
```css
.input-text {
  width: 300px;
  padding: 10px;
  font-size: 20px;
  line-height: 1.4;
  border: 1px solid #ccc;
  outline: none;
}

.attr-placeholder:empty::before {
  content: attr(data-placeholder);
  color: #b2b2b2;
}
```
### 4. 使用伪元素实现背景图片
```html
<div class="fake-el-img"></div>
```
```css
.fake-el-img::before {
  content: url('../imgs/yaowei.jpg');
}
```
![妖尾图片](../imgs/yaowei.jpg)

### 5. 使用伪元素扩大可点击区域
```html
<span class="btn">button</span>
```

```css
.btn {
  font-size: 18px;
  font-family: Helvetica, Tahoma, Arial;
  line-height: 1em;   /*使用em作为单位，即使字体变化，按钮的整体样式也会按比例跟随变化*/
  color: #fff;
  background: linear-gradient(135deg,#fce,#cce);
  padding: .5em 1.5em;
  border-radius: 2em;
  display: inline-block;
  position: relative;
}

.btn::before {
  content: '';
  position: absolute;
  left: -5px;
  right: -5px;
  top: -5px;
  bottom: -5px;
}
```
可以根据自己想要添加的范围，修改值，目前为5px
