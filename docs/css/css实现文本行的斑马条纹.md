# css实现文本行的斑马条纹

### 介绍

使用非常规的方式实现间隔条纹。

### 实现方式

```html
<div class="code">
  <span class="line">function fabonacci (num) {</span>
  <span class="line">&nbsp;&nbsp;if (num === 1) return 0</span>
  <span class="line">&nbsp;&nbsp;if (num === 2) return 1</span>
  <span class="line">&nbsp;&nbsp;return fabonacci(num - 1) + fabonacci(num - 2)</span>
  <span class="line">}</span>
</div>
```

```css
.code {
  padding: .5em;
  line-height: 1.5;
  background: beige;
  background-size: auto 3em;
  background-origin: content-box;
  background-image: linear-gradient(rgba(0, 0, 0, .2) 50%, transparent 0);
}

.line:before {
  content: '\A';
  white-space: pre;
}
```
