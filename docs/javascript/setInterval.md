# setInterval你不得不知道的事情

在平时开发过程中，倒计时或轮询是一个很常见的功能，当我们需要一个倒计时功能时，我们一般会优先想到setInterval。

如下：
```js
function countDown(fn, wait, count) {
  let time = count || 5
  let interval = setInterval(() => {
    time--
    fn()
    if (time === 0) clearInterval(interval)
  }, wait)
}

let i = 0
countDown(() => {
  console.log(i++)
}, 1000)

```

但其实setInterval存在着一些弊端，将会在某些情况下影响达到的效果。
1、setInterval无视网络延迟，只要达到时间，就会进行下一次调用。假设我们在请求一个http接口，在上一次还未返回结果的情况下，继续发起请求，很有可能的结果就是一次性得到多次同样的结果。当http接口都报错的时候，可能同时出现多次错误提示。或者多次页面刷新的状况。
2、假设每100豪秒执行一次，若上次执行只花了5ms，则下次执行会在95ms以后。时间并不准确。
3、即使setInterval调用的方法报错了，他仍然会继续执行。


所以推荐的做法是使用setTimeout在进行模拟setInterval。
通过setTimeout递归调用进行模拟：
```
(function loop(){
   setTimeout(function(){

      // logic here

      // recurse
      loop();

  }, 1000);
})();
```

