# shell使用for循环

### 通过数组下标循环

```sh
arr=('html' 'JavaScript' 'css')
for i in ${!arr[*]}
do
  echo ${arr[i]}
done
```

### 通过数组值循环

```sh
arr=('html' 'JavaScript' 'css')
for value in ${arr[*]}
do
  echo $value
done
```

### 通过awk执行for循环

```sh
awk 'BEGIN{for(i=1; i<=10; i++) print i}'
```

### 通过seq进行数字循环

```sh
for i in $(seq 1 10)  
do   
echo $(expr $i \* 3 + 1);  
done   
```

### 通过..进行数字循环

```sh
for i in {1..10}
do
echo $(expr $i \* 3 + 1);
done
```

### 通过常规for循环进行数字循环

```sh
for((i=1;i<=10;i++));  
do
echo $(expr $i \* 3 + 1);
done
```
