# vue中批量生成computed属性

### 实现方式

```js
const isPlainObject = obj => {
  return Object.prototype.toString.call(obj) === '[object Object]'
}

/**
 * @description 批量生成computed
 * @param {Object} dataSourceProp
 * @param {string} dataSourceProp[key] key为生成的computed
 * @param {string} dataSourceProp[key].carrier computed获取值的对象
 * @param {string} dataSourceProp[key][carrier].key computed获取值的对象key
 * @param {any} dataSourceProp[key].boolVal computed比较值
 * @param {Function} dataSourceProp[key].getOption computed赋值适配器
 * @param {Function} dataSourceProp[key].setData computed赋值函数，入参为getOption的结果
 * @example {
 *  ...mapComputed({
 *    isServer: {
 *      carrier: 'task',
 *      key: 'sourceType',
 *      boolVal: 3
 *    }
 * })
 * @
 */
const mapComputed = (dataSourceProp) => {
  const computed = {}
  if (Array.isArray(dataSourceProp)) {
    dataSourceProp.forEach(({ key, prop }) => {
      computed[key] = {
        get () {
          // 如果存在boolVal，则比较结果值
          if (prop?.boolVal) {
            if (Array.isArray(prop?.boolVal)) {
              return this[prop.carrier] && prop?.boolVal.includes(this[prop.carrier][prop.key])
            } else {
              return this[prop.carrier] && this[prop.carrier][prop.key] === prop?.boolVal
            }
          }
          return this[prop.carrier] && this[prop.carrier][prop.key] || ''
        },
        set (newValue) {
          const option = prop.getOption(newValue)
          prop.setData(option)
        }
      }
    })
  } else if (isPlainObject(dataSourceProp)) {
    for (const [key, prop] of Object.entries(dataSourceProp)) {
      computed[key] = {
        get () {
          // 如果存在boolVal，则比较结果值
          if (prop?.boolVal) {
            if (Array.isArray(prop?.boolVal)) {
              return this[prop.carrier] && prop?.boolVal.includes(this[prop.carrier][prop.key])
            } else {
              return this[prop.carrier] && this[prop.carrier][prop.key] === prop?.boolVal
            }
          }
          return this[prop.carrier] && this[prop.carrier][prop.key] || ''
        },
        set (newValue) {
          const option = prop.getOption(newValue)
          prop.setData(option)
        }
      }
    }
  }
  return computed
}
```

### 使用

```vue
<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import mapComputed from './mapComputed'

@Component({
  computed: {
    ...mapComputed({
      isTest: {
        carrier: 'obj',
        key: 'test',
        boolVal: true
      }
    })
  }
})
export default class Test extends Vue {
  init () {
  }
}
</script>
```