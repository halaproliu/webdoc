# React hooks常见问题

### hooks规则

- 只能在函数组件或者自定义 Hook 的最顶层或者是 return 语句之前使用 Hook

由于React hooks是使用链表的形式创建的hooks，每次render时，都按顺序进行更新hooks，因此若是某个hooks存在于循环，条件语句中，就会出现链表取值错误。

### function组件和class组件的区别

function组件拥有capture value特性，在props更新时，默认情况下会去捕获props和state，而class组件使用this.props和this.state去获取值时，总是会获取最新值。