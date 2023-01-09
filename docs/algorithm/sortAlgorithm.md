# 排序算法

### 冒泡排序

实现原理：
以最终目标为升序排列为例：
1. 比较相邻的两个元素，如果第一个元素小于第二个，则交换位置。
2. 从开始的两个元素开始对比，一直对比到最后，直到最后一个数为最大值。
3. 不断重复以上的步骤，得到最终的结果

```时间复杂度O(n^2)```

<!-- tabs: start -->
#### ** 冒泡排序 **
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
#### ** 冒泡排序增强版 **
```js
function bubbleSortEnhancement(arr) {
  let low = 0
  let high = arr.length - 1
  let i
  let temp
  while (low < high) {
    for (i = low; i < high; i++) {
      if (arr[i] > arr[i + 1]) {
        temp = arr[i]
        arr[i] = arr[i + 1]
        arr[i + 1] = temp
      }
    }
    high--

    for (i = high; i > low; i--) {
      if (arr[i] < arr[i - 1]) {
        temp = arr[i]
        arr[i] = arr[i - 1]
        arr[i - 1] = temp
      }
    }
    low++
  }
  return arr
}
```
<!-- tabs: end -->

### 快速排序

实现原理：

1. 将要排序的数据分割成独立的两部分
2. 其中一部分的所有数据要比另外一部分的所有数据要小
3. 然后按这两部分数据分别进行快速排序，可以使用递归进行
4. 以此达到整个数据变成有序序列

```时间复杂度O(nlogn)```

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

实现原理：
1. 把一个长度为n的数组分为n/2长度的两个子数组
2. 对两个数组分别执行归并排序
3. 最终合并两个数组

```时间复杂度O(nlogn)```

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

### 插入排序

```js
function insertSort(arr) {
    if (arr.length <= 1) return arr
    for (let i = 0; i < arr.length; i++) {
        let curr = arr[i]
        let j = i
        while(j > 0 && curr < arr[j - 1]) {
            arr[j] = arr[j - 1]
            j--
        }
        arr[j] = curr
    }
    return arr
}
```

### 选择排序

```js
function selectionSort(arr) {
    let len = arr.length
    for (let i = 0; i < len; i++) {
        let minIndex = i
        for (let j = i + 1; j < len; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j
            }
        }
        let tmp = arr[i]
        arr[i] = arr[minIndex]
        arr[minIndex] = tmp
    }
    return arr
}
```

### 二分查找

```js
/**
 * @description 二分查找（前提条件是数组有序）
 * @author halapro.liu
 * @param {*} arr
 * @param {*} target
 * @returns
 */
function binarySearch(arr, target) {
  let max = arr.length - 1
  let min = 0
  while (min < max) {
    let mid = Math.floor((max + min) / 2)
    if (target < arr[mid]) {
      max = mid - 1
    } else if (target > arr[mid]) {
      min = mid + 1
    } else {
      return mid
    }
  }
  return -1
}
```
