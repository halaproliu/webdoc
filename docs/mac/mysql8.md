# Sequel Pro无法连接mysql8的问题解决

### 解决方法

1. 管理员权限运行命令提示符

```bash
mysql -u root -p
# 输入密码登录
```

2. 修改账户密码加密规则并更新用户密码


```bash
  ALTER USER 'root'@'localhost' IDENTIFIED BY 'password' PASSWORD EXPIRE NEVER;   #修改加密规则 
  ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';   #更新一下用户的密码 
```

3. 刷新权限并重置密码

```bash
FLUSH PRIVILEGES;   #刷新权限 
```

4. 最后

```bash
# 单独重置密码命令：
alter user 'root'@'localhost' identified by '111111';
```

现在再次打开Sequel Pro连接MySQL问题数据库就会发现可以连接成功了