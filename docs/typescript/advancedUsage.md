# Typescript高级用法

### Partial

作用：将传入属性变为可选项

```js
type Partial<T> = { [P in keyof T]?: T[P] };
```

### Required

作用：将传入的属性变为必选项

```js
type Required<T> = { [P in keyof T]-?: T[P] };
```

### Pick

作用：取出一系列k的属性

```js
type Pick<T, K extends keyof T> = { [P in K]: T[P] };
```

### Exclude （排除）

作用：过滤出前者独有的属性（排除后者所有属性）

```js
type Exclude<T, U> = T extends U ? never : T;

const str: Exclude<'a' | '1' | '2', 'a' | 'y' | 'z'> = '1';
```

### Omit 

作用：把后者存在的属性，从前者中剔除

```js
interface User {
  id: number;
  age: number;
  name: string;
}

// 相当于: type OmitUser = { age: number; name: string; }

type OmitUser = Omit<User, 'id'>;
```

### Record

作用：以 typeof 格式快速创建一个类型，此类型包含一组指定的属性且都是必填

```js
type Coord = Record<'x' | 'y', number>;

// 等同于
type Coord = {
    x: number;
    y: number;
}
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