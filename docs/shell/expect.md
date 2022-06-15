# 使用shell脚本连接远程跳板机

### 前言
该脚本主要的使用场景是，需要连接远程跳板机操作的时候。每次输入远程地址和密码会显得有些繁琐。使用该脚本，可以自动输入密码，并连接到跳板机。

**以mac为例：**
1. 安装[HomeBrew](https://brew.sh/)
2. 安装expect
   
```bash
brew install expect # 需要先安装HomeBrew
```

```bash
#!/usr/bin/expect
set username zhangsan
#设置密码的值
set password "IF1X1VYrtiBJ42ys"
set server 222.222.222.222

#添加pem文件到私钥池
spawn ssh -i xxx.pem $username@$server

#expect对通过spawn执行的shell脚本的返回进行判断，是否包含Password字符串
expect "passphrase"

#如果expect监测到了包含的字符串，将输入send中的内容，\n相当于回车
send "$password\r"

#退出expect返回终端，可以继续输入，否则将一直在expect不能退出到终端
#执行完成后保持交互状态，把控制权交给控制台
interact
```
