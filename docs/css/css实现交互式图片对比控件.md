# css实现交互式图片对比控件

### 介绍

使用纯CSS实现交互式的图片对比控件

### 实现方式

```html
<div class="image-slider">
  <div>
    <img src="./imgs/darkBg.jpeg" alt="">
  </div>
  <img src="./imgs/sliderBg.jpeg" alt="">
</div>
```

```css
.image-slider {
  position: relative;
  display: inline-block;
}

.image-slider div {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 50%;
  overflow: hidden;
  resize: horizontal;
  max-width: 100%;
}

.image-slider div::before {
  content: '';
  position: absolute;
  right: 0;
  bottom: 0;
  width: 12px;
  height: 12px;
  padding: 5px;
  background: linear-gradient(-45deg, white 50%, transparent 0);
  background-clip: content-box;
  cursor: ew-resize;
}

.image-slider img {
  display: block;
  user-select: none;
  width: 600px;
  height: 400px;
}

::-webkit-resizer {
  width: 0;
  height: 0;
}
```


### 演示效果
![](../imgs/imageSlider.gif)
