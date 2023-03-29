# Typescript实现Object工具类

### 实现Omit

1. 使用Array.reduce实现

```js
function omit<T extends Record<string, any>, P extends keyof T>(
  source: T,
  keys: P[]
) {
  return Object.keys(source).reduce((target: T, nowKey: P): T => {
    if (!keys.includes(nowKey)) target[nowKey] = source[nowKey];
    return target;
  }, {} as T);
}
```

2. 遍历keys数组，移除

```js
function omit<T extends Record<string, any>, P extends keyof T>(
  source: T,
  args: P[]
) {
  const target = {} as Omit<T, P>;
  const keys = Object.keys(source).filter(
    (key) => !args.includes(key as P)
  ) as Exclude<keyof T, P>[];
  keys.forEach((key) => {
    if (source[key] !== void 0) {
      target[key] = source[key];
    }
  });
  return target;
}
```

3. 直接删除原数组key

```js
function omit<T extends Record<string, any>, P extends keyof T>(
  source: T,
  keys: P[]
) {
  keys.forEach((key) => {
    delete source[key];
  });
  return source;
}
```

### 实现Pick

```js
function pick<T extends Record<string, any>, P extends keyof T>(
  source: T,
  keys: P[]
) {
  const target = {} as Pick<T, P>;
  keys.forEach((key) => {
    if (source[key] !== void 0) {
      target[key] = source[key];
    }
  });
  return target;
}
```