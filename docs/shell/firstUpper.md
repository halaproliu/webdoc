# shell首字母转换为大写

### 使用tr

```sh
toFirstLetterUpper(){
  str=$1
  firstLetter=${str:0:1}
  otherLetter=${str:1}
  firstLetter=$(echo $firstLetter | tr '[a-z]' '[A-Z]')
  result=$firstLetter$otherLetter
}
```

```sh
toFirstLetterUpper1(){
  str=$1
  firstLetter=${str:0:1}
  otherLetter=${str:1}
  firstLetter=$(echo $firstLetter | tr '[:lower:]' '[:upper:]')
  result=$firstLetter$otherLetter
}
```

### 使用awk

```sh
toFirstLetterUpper2() {
  str=$1
  firstLetter=`echo ${str:0:1} | awk '{print toupper($0)}'`
  otherLetter=${str:1}
  result=$firstLetter$otherLetter
}
```

