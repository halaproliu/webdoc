# 理解 React Hooks 的 Capture Value 特性

由于刚使用 React hooks 不久，对它的脾气还拿捏不准，掉了很多次“坑”；这里的 “坑” 的意思并不是说 React hooks 的设计有问题，而是我在使用的时候，因为还没有跟上它的理念导致的一些问题。

在读了一些文章后，大致是找到自己总是掉坑的原因了 —— 没理解 React Hooks 中的 **Capture Value** 特性。

本文就以简单的示例来解释这个特性所产生的现象，对理解 Capture Value 特性做一个补充。

## 参考文章

-   [Using the Effect Hook](https://link.segmentfault.com/?enc=ZrL%2FqnhFJW5EUWjw6haqbw%3D%3D.%2FAVs%2BfJqHxuqsLI1oSAWMgoW30t0%2FN0jsT571meraghIoYSfoaeakDs2f4WMiQf1) : 官方的 useEffect 使用教程，用例详实 ，附 [useEffect - API文档](https://link.segmentfault.com/?enc=axb3RdRTwLvIDzS7O6t4qA%3D%3D.27gnLjg8pUmrryi1wEY%2BBwcJNVrjHMZ%2Bz6tUcEseiU7fpdthPyC6vSL3r4JeiZDTKyhm9Qlm4paLinQ9LMpr1A%3D%3D)
-   [精读《useEffect 完全指南》](https://segmentfault.com/a/1190000018639033)：如果你想用好 Function Component 或者 Hooks，这篇文章几乎是必读的，因为没有人能猜到什么是 Capture Value，然而不能理解这个概念，Function Component 也不能用的顺手。
-   [精读《Function VS Class 组件》](https://link.segmentfault.com/?enc=TXorU72Da2o7h9edeOvjcA%3D%3D.ZWeZcJyKVw17ffQR%2FErZnFkUz%2FcXSmaXGc9i3qEUeRrBkNloeAzzp%2BkskSbVvVwmg8RDKWy%2FO2nkvvMVRDaGxWISKP3dj9NhqtmeeTMM%2Frha8YNYBRkGnTXTsiJrJWgKcJ%2BZmu8uyXysqPmoUhFad5GNQVSeo5EHqmizhW7dY3G6mw7Q5d7ttv3WuX7ZQcDj) ：以后在 React 中经常使用 Class 的写法，在 React Hooks 需要转换成函数式编程风格，这篇文章对比了两种写法上的差异；（这两种写法没有好坏之分，性能差距也几乎可以忽略，而且 React 会长期支持这两种写法）

## 1、状态值为什么不是最新的？

-   官方相关 issue：[Why am I seeing stale props or state inside my function?](https://link.segmentfault.com/?enc=OBFQct2%2B6en8E7wcTecVhQ%3D%3D.LS0T5ADYQJjk6HxlEG1Xu6YhMM%2FOAjeEc1p5X051uWhVSniVOy0V0WZP12nd7qBPdrynBDPlrn3a%2BbahorpzBG9BNu5C2d9OK%2B%2FVdjHSqvs%3D)

“这个 effects 取的值怎么不是最新的？！”这个疑惑可以说是在使用 React Hooks 时经常遇到的疑问。

在下列代码中，当你点击按钮 3s 后，alert 显示的数值却是 3s 前的 count 变量 —— 即无法获取最新的值，获取的值是过去某个时刻的：

```
import React, { useState, useCallback } from "react";
 import ReactDOM from "react-dom";
 
 function Example() {
   const [count, setCount] = useState(0);
 
   const handleAlertClick = useCallback(()=>{
     setTimeout(() => {
       alert('You clicked on: ' + count);
     }, 3000)
   }, [count]);
 
   return (
     <div>
       <p>You clicked {count} times</p>
       <button onClick={() => setCount(count + 1)}>
         增加 count
       </button>
       <button onClick={handleAlertClick}>
         显示 count
       </button>
     </div>
   );
 }
 const rootElement = document.getElementById("root");
 ReactDOM.render(<Example />, rootElement);
```

> 示例代码：[https://codesandbox.io/s/k5pm...](https://link.segmentfault.com/?enc=mO10EfiMAO5U5O8apBM1aQ%3D%3D.bhaq%2BgYgaK%2FMY2AZDvPYKPdVDoWNmXFcwX4OLR5tQ62UIKGN%2FHnSgdA9FXyypQ7U)

**具体操作步骤**：

-   当我们先点击 显示 按钮，在 3s 后（模拟耗时任务）会出现弹层
-   在这 3s 期间快速点击 增加 count 按钮
-   3s 后看到的弹层计数仍旧为 0.

## 2、解释

这是官方特意设置的机制，官方原文是：**This prevents bugs caused by the code assuming props and state don’t change**；（强行翻译一下，大概意思是：**防止因 React 认为 `props` 或者 `state` 没有变更而引起的 bug**）

为了理解官方这么设定的意图，将上面代码稍微修改一下：

-   去掉 `显示 count` 按钮
-   增加一个 `减少 count` 的按钮
-   使用 `useEffect` 代替 `useCallback`，让每次更改 count 都会弹窗

```
...
useEffect(()=>{
    setTimeout(() => {
      alert('count: ' + count);
    }, 3000)
  }, [count]);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        增加 count
      </button>
      <button onClick={() => setCount(count - 1)}>
        减少 count
      </button>
    </div>
  );
}
...
```

我们先点击一次 `增加 count`，然后再紧接着点击一次 `减少 count`：

-   如果不是按照官方的机制设置，那么我们看到的两次弹层显示的 `count` 数值都是 0 —— 很明显这不是我们想要的
-   还好实际情况不是这样，会先显示 1，然后显示 0

总结起来，这个现象其实就是文章 [精读《useEffect 完全指南》](https://segmentfault.com/a/1190000018639033) 所提及的 **Capture Value** 特性（可以自行前往原文了解更多细节）

## 3、扩展：如何获取即刻的 `count` 变量

回到原来的问题，倔强如我，**我就是想要在 3s 后获取的是此时此刻的 `count` 变量，而不是我 3s 前点击时的 `count` 值**，该怎么操作？

官方给出的解决方案是，每次改变 `count` 的时候，将其放在 [ref](https://link.segmentfault.com/?enc=FobahRiRInyd05puDGduOw%3D%3D.Gd43bfO%2F9hSNhLLo%2Fx5mVzBe03pG1DHiLpD5iO4uZyVbtbEv2p%2BbQShXejAQFVsR5SseRbdS0wegmY8fSLws4ermB2KXMemDG%2FbzpXBsvp9hlzchdJGd0QEkUEwYDoOU) 类型的变量里即可。

修改一下原来的代码：

```
  const countRef = useRef(null);
  const handleAlertClick = useCallback(
    () => {
      setTimeout(() => {
        alert("You clicked on: " + countRef.current);
      }, 3000);
    },
    [count]
  );

  return (
    <div>
      <p>You clicked {count} times</p>
      <button
        onClick={() => {
          countRef.current = count + 1;
          setCount(count + 1);
        }}
      >
        增加 count
      </button>
      <button onClick={handleAlertClick}>显示 count</button>
    </div>
  );
```

更改过后的代码运行后，`3s` 后 alert 显示的 `count` 变量就是你页面上所见到的样子了：

> ref 类型的变量通常是用来存储 DOM 元素引用，但在 react hooks 中，它可以存放任何可变数据，就好比类实例属性一样，具体参考 [Is there something like instance variables?](https://link.segmentfault.com/?enc=vGw7hDvy7fRsdaIJj%2F%2BLXg%3D%3D.wtViW78UGH9nER9ahtQ5LzxXnLGnSZfgLpYxIESXLwI4BUbPqg3Mad%2BMtvWFlTQg7mKGILUwqBJN4%2BSGma1T%2FRQWh1MjWNdLwnJiiMBSjPZeskZx0Dj7N%2F310jdJ1suM)

这等操作，其实就是借助 `ref` 类型变量绕过 **Capture Value** 特性来达到目的。

## 4、总结

援引文章 [精读《useEffect 完全指南》](https://segmentfault.com/a/1190000018639033) 中对 Capture Value 概念的解释：**每次 Render 的内容都会形成一个快照并保留下来，因此当状态变更而 Rerender 时，就形成了 N 个 Render 状态，而每个 Render 状态都拥有自己固定不变的 Props 与 State**。

通过这个示例，相信会比较容易地理解 **Capture Value** 特性，并如何使用 `ref` 来暂时绕过它。在知道并理解这个特性后，有助于进一步熟悉了 React Hooks 的运行机制，减少掉坑的次数。

这里罗列几篇文章，方便自检是否掌握了这个概念：

-   [通过 React Hooks 声明式地使用 setInterval](https://link.segmentfault.com/?enc=xzsV4gAmvm7XMQJXXRUUfw%3D%3D.UHvfNivWGZUkTJ%2BxuKb1xnE1o1xV5Y1ghtEo3CvS6uPpJioo5LXhkyTkWWKCUmiF0AtXWAvi7YJ%2FlplYekXX2Q%3D%3D)：文章采用循序渐进的示例来解释问题。探索如何让 `setInterval` 和 `Hooks` 和谐地玩耍，为什么是这种方式，以及这种方式给你带来了什么新能力。
-   [How to get the previous props or state?](https://link.segmentfault.com/?enc=e5lJBbF6gHbJfHUuoVYvGA%3D%3D.juAxaS2XsnZMdHa2ZHXnqPPI214i%2Bd%2Bu104ISnTMH%2FK61dtpp%2FWMPyY19gTgwKc0jyS%2BM6%2Be2i5u4KQ3IedQ0SO2hC2tEvQRipYktC1G9oA%3D): 如何获取变更前的 props 和 state ？官网提供的 `useRef` 来解决，也有人针对它进行了封装（[How to compare oldValues and newValues on React Hooks useEffect?](https://link.segmentfault.com/?enc=bR0jRo850%2Flt7TVHkbPd1w%3D%3D.6tlq954AWKW4WYNuudlT3RTml8d%2BBrjYYQJFHIMcmyEa7UJz%2BJQVp73XaPI%2B4JV9UJNiqKkUAkWwJng3DC4%2Fh7muomelN7pRC0Tzyvon%2Fjexulo5fS7RSa1QH%2FFB3VqdJH3N%2Bfvq0MKRZcdYzIu6jQ%3D%3D)）