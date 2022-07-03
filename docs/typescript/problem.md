# Typescript常见问题及解决方法

### Module 'lodash can only be default-imported using the 'allowSyntheticDefaultImports' flagts(1259)

> 解决方案：tsconfig.json增加配置

```js
"allowSyntheticDefaultImports": true
```

