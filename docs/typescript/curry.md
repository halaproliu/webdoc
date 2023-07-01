# 柯里化 TS 定义

### curry 函数定义 TS

```ts
type Curried<A, R> = A extends []
    ? () => R
    : A extends [infer ARG]
    ? (param: ARG) => R
    : A extends [infer ARG, ...infer REST]
    ? (param: ARG) => Curried<REST, R>
    : never;

declare function curry<A extends any[], R>(
    fn: (...args: A) => R
): Curried<A, R>;
```
