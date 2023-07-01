# any与unknown的区别

### any类型

> 在 TypeScript 中，任何类型都可以被归为 any 类型，因为它可以被赋予任何值。

### unknown类型

> 为了解决 any 带来的问题，TypeScript 3.0 引入了 unknown 类型。就像所有类型都可以赋值给 any，所有类型也都可以赋值给 unknown。

### 二者区别

unknown类型的值只能赋值给any和unknown类型的其他变量，any可以赋值给任何值。