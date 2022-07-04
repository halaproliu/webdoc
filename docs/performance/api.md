# 初探Performance API

前段时间在读Vue源码的时候，发现了这样一个API——Window.Performance。当时完全不知道这是什么？在查阅了一些资料后，大致明白了这个API的作用。下面一起来看看什么是Performance。  
其实光看这个API的名字，我们就能大致猜到这一定是和性能相关的。来看看MDN上关于它的介绍。

> The Performance interface provides access to performance-related information for the current page. It's part of the High Resolution Time API, but is enhanced by the Performance Timeline API, the Navigation Timing API, the User Timing API, and the Resource Timing API.

Performace接口允许访问当前页面性能相关的信息。它是[High Resolution Time API](https://link.segmentfault.com/?enc=GjZwe%2F9FVcgqlOxDPASM1g%3D%3D.s9WLIVVlyNtB76KIRzdcuxplSKTUgmmmZMw6NrxqocnWYam5OLA1noCL2tXaMMwM)的一部分。但是它被Performance Timeline API, the Navigation Timing API, the User Timing API, and the Resource Timing API扩展增强了。实际上Performance的主要功能都是由这几个API提供的。  
单单看上面的内容，大家一定还是会感到疑惑，这performace究竟是个什么东西？ok，我们直接打开[百度的网页](https://link.segmentfault.com/?enc=0KJVhUaPAAqMyRRpMgAkwA%3D%3D.6vza3SWpAAy2VsvmT7Et929qjGkUN5X4wo7qh9YACc8%3D)，然后在控制台里输出Window.performance(window.performace返回的就是performance对象)

![图片描述](https://segmentfault.com/img/bV8p6A?w=2346&h=216 "图片描述")

Performance对象里出现了4个属性。我们分别来看看这4个属性都代表了什么意思？

## timing

timing对象提供了各种与浏览器处理相关的时间数据。具体如下表

| 名称 | 作用（这里所有时间戳都代表UNIX毫秒时间戳） |
| --- | --- |
| connectEnd | 浏览器与服务器之间的连接建立时的时间戳，连接建立指的是所有握手和认证过程全部结束 |
| connectStart | HTTP请求开始向服务器发送时的时间戳，如果是持久连接，则等同于fetchStart。 |
| domComplete | 当前网页DOM结构生成时，也就是Document.readyState属性变为“complete”,并且相应的readystatechange事件触发时的时间戳。 |
| domContentLoadedEventEnd | 当前网页DOMContentLoaded事件发生时，也就是DOM结构解析完毕、所有脚本运行完成时的时间戳。 |
| domContentLoadedEventStart | 当前网页DOMContentLoaded事件发生时，也就是DOM结构解析完毕、所有脚本开始运行时的时间戳。 |
| domInteractive | 当前网页DOM结构结束解析、开始加载内嵌资源时，也就是Document.readyState属性变为“interactive”、并且相应的readystatechange事件触发时的时间戳。 |
| domLoading | 当前网页DOM结构开始解析时,也就是Document.readyState属性变为“loading”、并且相应的readystatechange事件触发时的时间戳。 |
| domainLookupEnd | 域名查询结束时的时间戳。如果使用持久连接，或者从本地缓存获取信息的，等同于fetchStart |
| domainLookupStart | 域名查询开始时的时间戳。如果使用持久连接，或者从本地缓存获取信息的，等同于fetchStart |
| fetchStart | 浏览器准备通过HTTP请求去获取页面的时间戳。在检查应用缓存之前发生。 |
| loadEventEnd | 当前网页load事件的回调函数结束时的时间戳。如果该事件还没有发生，返回0。 |
| loadEventStart | 当前网页load事件的回调函数开始时的时间戳。如果该事件还没有发生，返回0。 |
| navigationStart | 当前浏览器窗口的前一个网页关闭，发生unload事件时的时间戳。如果没有前一个网页，就等于fetchStart |
| redirectEnd | 最后一次重定向完成，也就是Http响应的最后一个字节返回时的时间戳。如果没有重定向，或者上次重定向不是同源的。则为0 |
| redirectStart | 第一次重定向开始时的时间戳，如果没有重定向，或者上次重定向不是同源的。则为0 |
| requestStart | 浏览器向服务器发出HTTP请求时（或开始读取本地缓存时）的时间戳。 |
| responseEnd | 浏览器从服务器收到（或从本地缓存读取）最后一个字节时（如果在此之前HTTP连接已经关闭，则返回关闭时）的时间戳 |
| responseStart | 浏览器从服务器收到（或从本地缓存读取）第一个字节时的时间戳。 |
| secureConnectionStart | 浏览器与服务器开始安全链接的握手时的时间戳。如果当前网页不要求安全连接，则返回0。 |
| unloadEventEnd | 如果前一个网页与当前网页属于同一个域下，则表示前一个网页的unload回调结束时的时间戳。如果没有前一个网页，或者之前的网页跳转不是属于同一个域内，则返回值为0。 |
| unloadEventStart | 如果前一个网页与当前网页属于同一个域下，则表示前一个网页的unload事件发生时的时间戳。如果没有前一个网页，或者之前的网页跳转不是属于同一个域内，则返回值为0。 |

了解上面timeing提供的各种属性之后，我们可以计算出网页在加载时候某一部分消耗的具体时间，可以精确到千分之一毫秒。例如要计算出发送请求到接受完数据所消耗的时间。

```
const timing = window.performance.timing
const contactDuration = timing.responseEnd - timing.requestStart
```

## navagation

PerformanceNavigation接口呈现了如何导航到当前文档的信息。PerformanceNavigation有两个属性，一个是type，表示如何导航到当前页面的，主要有4个值。

-   type=0：表示当前页面是通过点击链接，书签和表单提交，或者脚本操作，或者在url中直接输入地址访问的。
-   type=1: 表示当前页面是点击刷新或者调用Location.reload()方法访问的。
-   type=2: 表示当前页面是通过历史记录或者前进后退按钮访问的。
-   type=255: 其他方式访问的

另外一个属性是redirectCount，表示到达当前页面之前经过几次重定向。

## 其他属性

### performance.timeOrigin

表示performance性能测试开始的时间。是一个高精度时间戳（千分之一毫秒）

### performance.onresourcetimingbufferfull

表示当浏览器资源时间性能缓冲区已满时会触发的回调函数。下面是mdn上关于这个属性的一个demo。这个demo的主要内容是当缓冲区内容满时，调用buffer\_full函数。

```
function buffer_full(event) {
  console.log("WARNING: Resource Timing Buffer is FULL!");
  performance.setResourceTimingBufferSize(200);
}
function init() {
  
  performance.onresourcetimingbufferfull = buffer_full;
}
<body onload="init()">
```

### performance.memory

一个非标准属性，由chrome浏览器提供。这个属性提供了一个可以获取到基本内存使用情况的对象。

## Performance.mark

先来看看MDN中关于mark方法的定义

> The mark() method creates a timestamp in the browser's performance entry buffer with the given name.

这段话可以分解出三个关键词。首先timestamp，这里的timestamp指的是高精度时间戳(千分之一毫秒)，其次是performance entry buffer。[performance entry buffer](https://link.segmentfault.com/?enc=CDJ%2FbOXZ8zTfAEQ5L74eAw%3D%3D.k4FvmX0tZA627K2n0nzrcG72%2B2%2FsLZgnT6IYwFRqYpSNC882i2kpytIVbEopjRAuj1GWCcDaMugrs5MPSim0qKamwbw1xjvqOoGI%2B%2F%2BlS%2FI%3D)指的是存储performance实例对象的区域，初始值为空。最后就是given name，表示生成的每一个timestamp都有相应的名称。  
所以这句话就可以理解成，在浏览器的performance entry buffer中，根据名称生成高精度时间戳。也就是很多人说过的“打点”。

## Performance.measure

同样先来看看MDN上关于measure的定义

> The measure() method creates a named timestamp in the browser's performance entry buffer between two specified marks (known as the start mark and end mark, respectively). The named timestamp is referred to as a measure.

这段定义和上面mark的定义有些类似，其最核心的不同点在于这句话。between two specified marks。所以measure是指定两个mark点之间的时间戳。如果说mark可以理解为"打点"的话，measure就可以理解为"连线"。

## 一个小例子

我们来看一个使用mark和measure的小demo，这个例子也是引用MDN，这里做一下简单讲解。

```
performance.mark("mySetTimeout-start");


setTimeout(function() {
  
  performance.mark("mySetTimeout-end");

  
  performance.measure(
    "mySetTimeout",
    "mySetTimeout-start",
    "mySetTimeout-end"
  );

  
  var measures = performance.getEntriesByName("mySetTimeout");
  var measure = measures[0];
  console.log("setTimeout milliseconds:", measure.duration)

  
  performance.clearMarks();
  performance.clearMeasures();
}, 1000);
```

结果如图  
![图片描述](https://segmentfault.com/img/bV8UVJ?w=702&h=40 "图片描述")  
可以看到，高精度的时间戳是非常精准的。（我们知道由于执行队列的原因，setTimeout不会在给定的1000ms之后就立即执行）  
Performance API提供了很多方便测试我们程序性能的接口。比如mark和measure。很多优秀的框架也用到了这个API进行测试，比如我最近在看的Vue框架。它里面就频繁用到了mark和measure来测试程序性能。所以想要开发高性能的web程序，了解Performace API还是非常重要的。

## 参考资料

【1】MDN Performance, [Performance](https://link.segmentfault.com/?enc=EfJ5NKSWBaOV1KHG4LDgew%3D%3D.QMLACHzbVssDUu4okEE5M33kM0MNy%2FNZvhXWiNXYosodKtPwZm0E%2BS%2B%2Bh0Bjdsswml%2BGg0iQzn0j77wEKs9tWQ%3D%3D)  
【2】[User Timing API](https://link.segmentfault.com/?enc=4Fdx5qV6ZdKrDX0JF%2BD3WA%3D%3D.w5mOliNgFJ%2FOobXy3Ved6lqiPcxLmIl446orJvzjFN9Cj16SFs9eH%2FkexT5oVLTeRDAFGm%2B4Oix%2BwT8nOVv0h54Ff5QqT%2B2iDyfAw9r5bic%3D)  
【3】[performace entry buffer](https://link.segmentfault.com/?enc=y%2BPBy4yKa7S5GyB8%2B8CSig%3D%3D.3LK4NvFcjVnmKGVp1nZowbRhZLSBCNw16gm0nGLAxUt1%2BQTWJub2CFzrABijKOmLLCycaWRUBsGHEyKbx%2BWeRCd4qmqV5APDQadr8DO0%2BEo%3D)