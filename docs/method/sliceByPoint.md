# 通过码元实现slice方法

### 介绍

JavaScript的length和下标获取的是码元的位置，而有些文字占据的不止一个码元，应该使用码点才能正确获取特殊字符的结果。

### 方法实现

```js
String.prototype.sliceByPoint = function(pStart, pEnd) {
    let result = '' // 截取的结果
    let pIndex = 0 // 码点的指针
    let cIndex = 0 // 码元的指针
    while(1) {
        if (pIndex >= pEnd || cIndex >= this.length) {
            break
        }
        pIndex++
        const point = this.codePointAt(cIndex)
        if (pIndex >= pStart) {
            result += String.fromCodePoint(point)
        }
        cIndex += point > 0xffff ? 2 : 1
    }
    return result
}
```