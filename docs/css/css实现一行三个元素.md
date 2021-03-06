# css实现一行三个元素

```html
<ul class="box">
    <li class="item">1</li>
    <li class="item">2</li>
    <li class="item">3</li>
    <li class="item">4</li>
    <li class="item">5</li>
    <li class="item">6</li>
    <li class="item">7</li>
    <li class="item">8</li>
    <li class="item">9</li>
</ul>
```

```css
.box {
    display: flex;
    flex-wrap: wrap;
}

.item {
    list-style: none;
    border: 1px solid #ccc;
    height: 100px;
    text-align: center;
    flex-basis: 30%;
    line-height: 100px;
}
```
