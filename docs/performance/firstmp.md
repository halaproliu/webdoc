# first-meaningful-paint

### What is first meaningful paint?

First Meaningful Paint is the time when page's primary content appeared on the screen. This is going to be our primary metric for user-perceived loading experience.

This concept was raised by Google, [see this](https://docs.google.com/document/d/1BR94tJdZLsin5poeet0XoTW60M0SjvOJQttKT-JK8HI/view?hl=zh-cn). However, google has not yet implement first meaningful paint in performance api for some reason.

### What we do

Google has not yet implement first meaningful paint in performance api for some reason. But we found first meaningful paint is a good way to estimate the first srceen time in our page, which is critical for user experience. We want to monitor user's real first srceen time in production environment. So First-Meaningful-Paint can help you to retrieve this value in a easy way, no matter what structure your web is, React, Jquery or any other.

```js
class FMP {
  /**
   * get first-meaningful-paint
   */
  static getFmp(observeTime = 3000) {
    if (!Promise
      || !window.performance
      || !window.performance.timing
      || !window.requestAnimationFrame
      || !window.MutationObserver) {
      console.log('fmp can not be retrieved');
      Promise.reject(new Error('fmp can not be retrieved'));
    }

    const promise = new Promise((resolve) => {
      const observedPoints = [];
      const observer = new window.MutationObserver(() => {
        const innerHeight = window.innerHeight;
        function getDomMark(dom, level) {
          const length = dom.children ? dom.children.length : 0;
          let sum = 0;
          const tagName = dom.tagName;
          if (tagName !== 'SCRIPT' && tagName !== 'STYLE' && tagName !== 'META' && tagName !== 'HEAD') {
            if (dom.getBoundingClientRect && dom.getBoundingClientRect().top < innerHeight) {
              sum += (level * length);
            }
            if (length > 0) {
              const children = dom.children;
              for (let i = 0; i < length; i++) {
                sum += getDomMark(children[i], level + 1);
              }
            }
          }
          return sum;
        }
        window.requestAnimationFrame(() => {
          const timing = window.performance.timing;
          const startTime = timing.navigationStart || timing.fetchStart;
          const t = new Date().getTime() - startTime;
          const score = getDomMark(document, 1);
          observedPoints.push({
            score,
            t,
          });
        });
      });
      observer.observe(document, {
        childList: true,
        subtree: true,
      });

      setTimeout(() => {
        observer.disconnect();
        const rates = [];
        for (let i = 1; i < observedPoints.length; i++) {
          if (observedPoints[i].t !== observedPoints[i - 1].t) {
            rates.push({
              t: observedPoints[i].t,
              rate: observedPoints[i].score - observedPoints[i - 1].score,
            });
          }
        }
        rates.sort((a, b) => b.rate - a.rate);
        if (rates.length > 0) {
          resolve(rates[0].t);
        } else {
          resolve(observeTime);
        }
      }, observeTime);
    });
    return promise;
  }
}
```

### Usage

```js
import FMP from 'first-meaningful-paint';

FMP.getFmp(3000).then((fmp) => {
    // do sth with fmp, which is a millisecond value
});
```
