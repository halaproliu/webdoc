# JavaScript深入之引擎解析过程

### 介绍

JavaScript引擎就是一段可以”读懂“JavaScript代码，并且给出代码运行结果的程序。
对于静态语言（如：C、C++、Java），处理上述这些事情的叫编译器Compiler。对于JavaScript这样的动态语言则被称为解释器Interpreter。不同的地方在于编译器是将源代码编译为另一种代码（比如：机器码或者字节码），而解释器是直接解析并将代码运行结果输出。 

但是JavaScript引擎很难界定算是解释器还是编译器。```Chrome JS```引擎```V8```是用```C++```编写的，为了提高浏览器执行JavaScript的性能，```V8```将JavaScript转为了更高效的机器码(JIT编译器：Just-In-Time Compiler)，而不是使用解释器。

### JavaScript执行

JavaScript代码的执行过程大致可以分为语法检查和运行两个阶段

- 语法检查
    包含词法分析和语法分析

    - 词法分析：会将字符组成的字符串分解为有意义的代码块，这些代码块被分为词法单元。
    - 语法分析：会将词法单元流转换成一个由元素逐级嵌套所组成的代表了程序语法结构的树。

这个树被称为```抽象语法树(Abstract Syntax Tree, AST)```

例如：对于程序var a = 2;,  会被分解为 ```var``` ```a``` ```=``` ```2``` ```;```

转换为AST如下：

```js
{
    "type": "Program",
    "body": [
        {
            "type": "VariableDeclaration",
            "declarations": [
                {
                    "type": "VariableDeclarator",
                    "id": {
                        "type": "Identifier",
                        "name": "a"
                    },
                    "init": {
                        "type": "Literal",
                        "value": 2,
                        "raw": "2"
                    }
                }
            ],
            "kind": "var"
        }
    ],
    "sourceType": "script"
}
```

- 运行阶段

运行阶段包含预编译和执行

- 预编译：将生成的AST复制到当前的执行上下文中。对当前```AST```中的变量声明、函数声明及函数形参进行属性填充。
- JavaScript逐行读取并运行代码。
