# JS判断页面是否到达底部

```js
import throttle from 'lodash/throttle'

const _lazyLoad = (box, pageNum, callback) => {
  let scrollTop = box.scrollTop
  let clientHeight = box.offsetHeight
  let scrollHeight = box.scrollHeight
  let gap = scrollTop + clientHeight * pageNum - scrollHeight
  if (gap >= 0) {
    if (typeof callback === 'function') {
      callback(gap)
    }
  }
}

/**
 * @description: 懒加载
 * @param {String|HTMLElement} el 监听dom节点
 * @param {Function} callback 回调函数
 * @return {*}
 **/
const lazyLoad = (rootEl, pageNum, callback) => {
  let box = document.querySelector(rootEl)
  box.onscroll = throttle(() => {
    _lazyLoad(box, pageNum, callback)
  }, 200)
}

export default lazyLoad
```