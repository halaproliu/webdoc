# Ajax方法入参处理

### 实现方法

```js
import cloneDeep from 'lodash/cloneDeep'

/**
 * @description 判断是否为数组
 * @param {*} arr
 * @returns Boolean
 */
export const isArray = arr => {
  return Array.isArray(arr) || Object.prototype.toString.call(arr) === '[object Array]'
}

/**
 * @description 判断是否为纯对象
 * @param {*} obj
 * @returns Boolean
 */
export const isPlainObject = obj => {
  return Object.prototype.toString.call(obj) === '[object Object]'
}

/**
 * @description 判断是否为空
 * @param {*} obj
 * @returns Boolean
 */
export const isEmpty = (obj) => {
  if (isArray(obj)) {
    return obj.length === 0
  }
  if (isPlainObject(obj)) {
    return Object.keys(obj).length === 0
  }
  return obj === '' || obj === undefined || obj === null
}

const handleOptions = (props, { key, constant, value, convert }) => {
  const opts = {}
  if (convert && typeof convert === 'function') {
    opts[key] = convert(props)
  } else if (constant) {
    opts[key] = constant
  } else if (value && !isEmpty(props[value])) {
    opts[key] = props[value]
  } else {
    if (!isEmpty(props[key])) {
      opts[key] = props[key]
    }
  }
  return opts
}

/**
 * @description: Ajax请求入参转换
 * @param {Object} props 取值对象
 * ! @param {Array} options 取值配置
 * ! @param {Array|Object} options[i] 取值配置
 * * @param {Object} options[i].key 入参key
 * * @param {Object} options[i].value 入参key从props对象取值的key值
 * * @param {Object} options[i].convert 入参key从props对象取值的转换方法
 * ? @param {Object} options[i] 入参为字符串，则为key值
 * @return {*}
 **/
const setAjaxOptions = (props, options) => {
  const _options = cloneDeep(options)
  let opts = {}
  _options.forEach(o => {
    if (isPlainObject(o)) {
      const { key, value, convert, constant } = o
      opts = {
        ...opts,
        ...handleOptions(props, { key, value, convert, constant })
      }
    } else if (isArray(o)) {
      const key = o[0]
      const value = o[1]
      const convert = o[2]
      opts = {
        ...opts,
        ...handleOptions(props, { key, value, convert })
      }
    } else {
      if (!isEmpty(props[o])) opts[o] = props[o]
    }
  })
  return opts
}

export default setAjaxOptions
```

### 使用

```js
const fields = [
  { key: 'a', value: 'b' },
  { key: 'd', constant: 'Hello World' },
  { key: 'e', (p) => p.value },
  ['h', 'i']
  'f',
  'o'
]
const opts = setAjaxOptions(props, fields)
```