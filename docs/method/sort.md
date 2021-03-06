# 排序算法

### 冒泡排序

平方级复杂度，典型情况是当存在双重循环的时候，即把 O(n) 的代码再嵌套循环一遍，它的时间复杂度就是 O(n²) 了，代表应用是冒泡排序算法。

> 实现原理： 以最终目标为升序排列为例：

1. 比较相邻的两个元素，如果第一个元素小于第二个，则交换位置。
2. 从开始的两个元素开始对比，一直对比到最后，直到最后一个数为最大值。
3. 不断重复以上的步骤，得到最终的结果

```js
// 冒泡排序
function bubbleSort(arr) {
  for (var i = 0; i < arr.length - 1; i++) {
    for (var j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        var temp = arr[j]
        arr[j] = arr[j + 1]
        arr[j + 1] = temp
      }
    }
  }
  return arr
}
```

### 快速排序

当数据增大n倍时，执行时间随着增大nlogn倍，这个复杂度高于线性复杂度，低于平方复杂度。归并排序和快速排序就是典型的代表。

> 实现原理：

1. 将要排序的数据分割成独立的两部分
2. 其中一部分的所有数据要比另外一部分的所有数据要小
3. 然后按这两部分数据分别进行快速排序，可以使用递归进行
4. 以此达到整个数据变成有序序列

```js
// 快速排序
function quickSort(arr) {
  if (arr.length <= 1) {
    return arr
  }
  var pivotIndex = Math.floor(arr.length / 2)
  var pivot = arr.splice(pivotIndex, 1)[0]
  var left = []
  var right = []
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] <= pivot) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }
  return quickSort(left).concat([pivot], quickSort(right))
}
```

### 归并排序

当数据增大n倍时，执行时间随着增大nlogn倍，这个复杂度高于线性复杂度，低于平方复杂度。归并排序和快速排序就是典型的代表。

> 实现原理：

1. 把一个长度为n的数组分为n/2长度的两个子数组
2. 对两个数组分别执行归并排序
3. 最终合并两个数组

```js
function mergeSort(arr) {
  //采用自上而下的递归方法
  var len = arr.length
  if (len < 2) {
    return arr
  }
  var middle = Math.floor(len / 2),
    left = arr.slice(0, middle),
    right = arr.slice(middle)
  return merge(mergeSort(left), mergeSort(right))
}

function merge(left, right) {
  var result = []
  console.time('归并排序耗时')
  while (left.length && right.length) {
    if (left[0] <= right[0]) {
      result.push(left.shift())
    } else {
      result.push(right.shift())
    }
  }

  while (left.length) result.push(left.shift())

  while (right.length) result.push(right.shift())
  console.timeEnd('归并排序耗时')
  return result
}
```
