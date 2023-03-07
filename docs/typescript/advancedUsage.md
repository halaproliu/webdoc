# Typescript高级用法

### Partial

作用：将传入属性变为可选项

```js
type Partial<T> = { [P in keyof T]?: T[P] };
```

### 给定的keys变为可选

```js
type Simplify<T> = {
  [P in keyof T]: T[P]
}

// Partial in 可有可无键值的那部分
// Pick 必须有的键值的那部分
type SetOptional<T, K extends keyof T> = Simplify<
  Partial<Pick<T, K>> & Pick<Exclude<keyof T, K>>
>
```

### 给定的keys变为必选

```js
// 设置属性变成必选: SetRequired
type SetRequired<T, K extends keyof T> = Simplify<
  // Required Pick 必须有的键值的那部分
  // Partial in 可有可无键值的那部分
  Required<Pick<T, K>> & Partial<Pick<T, Exclude<keyof T, K>>>
>;
```