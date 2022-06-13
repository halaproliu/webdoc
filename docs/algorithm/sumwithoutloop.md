# 数组求和，不使用循环，不使用标准库函数

```js
const sum = (nums) => {
  const f = (i) => i >= nums.length ? 0 : nums[i] + f(i + 1)
  return f(0)
}
```