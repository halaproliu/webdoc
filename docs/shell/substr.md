# shell截取字符串

##### 获取字符串长度

```sh
str=Alan
echo ${#str}
```


```
**[terminal]
**[prompt halapro.liu@user]**[path ~]**[delimiter $]**[command ./fn.sh]
4
```

##### 最小限度从前面截取字符串

```sh
str=https://www.runoob.com/linux/linux-shell-passing-arguments.html
echo ${str#*/}
```

```
**[terminal]
**[prompt halapro.liu@user]**[path ~]**[delimiter $]**[command ./fn.sh]
/www.runoob.com/linux/linux-shell-passing-arguments.html
```

##### 最大限度从前面截取字符串

```sh
str=https://www.runoob.com/linux/linux-shell-passing-arguments.html
echo ${str##*/}
```

```
**[terminal]
**[prompt halapro.liu@user]**[path ~]**[delimiter $]**[command ./fn.sh]
linux-shell-passing-arguments.html
```

##### 最小限度从后面截取字符串

```sh
str=https://www.runoob.com/linux/linux-shell-passing-arguments.html
echo ${str%/*}
```

```
**[terminal]
**[prompt halapro.liu@user]**[path ~]**[delimiter $]**[command ./fn.sh]
https://www.runoob.com/linux
```

##### 最大限度从后面截取字符串

```sh
str=https://www.runoob.com/linux/linux-shell-passing-arguments.html
echo ${str%%/*}
```

```
**[terminal]
**[prompt halapro.liu@user]**[path ~]**[delimiter $]**[command ./fn.sh]
https:
```

##### 使用${var:} 模式获取子字符串

语法：

```sh
${var:start:len}
```

```sh
str=https://www.runoob.com/linux/linux-shell-passing-arguments.html
echo ${str:0:6}
```

```
**[terminal]
**[prompt halapro.liu@user]**[path ~]**[delimiter $]**[command ./fn.sh]
https:
```

##### 从左边第几个字符开始一直到结束

语法：
```sh
${var:start}
```

```sh
str=https://www.runoob.com/linux/linux-shell-passing-arguments.html
echo ${str:6}
```

```
**[terminal]
**[prompt halapro.liu@user]**[path ~]**[delimiter $]**[command ./fn.sh]
//www.runoob.com/linux/linux-shell-passing-arguments.html
```

##### 从右边第几个字符开始以及字符的个数

语法：
```sh
${var:0-start:len}
```

```sh
str=https://www.runoob.com/linux/linux-shell-passing-arguments.html
echo ${str:0-15:5}
```

```
**[terminal]
**[prompt halapro.liu@user]**[path ~]**[delimiter $]**[command ./fn.sh]
-argu
```

##### 从右边第几个字符开始一直到结束

语法：
```sh
${var:0-start}
```

```sh
str=https://www.runoob.com/linux/linux-shell-passing-arguments.html
echo ${str:0-15}
```

```
**[terminal]
**[prompt halapro.liu@user]**[path ~]**[delimiter $]**[command ./fn.sh]
-arguments.html
```
