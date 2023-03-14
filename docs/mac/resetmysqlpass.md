# 重置Mysql密码

### 步骤一

关闭mysql服务：  苹果->系统偏好设置->最下边点mysql 在弹出页面中 关闭mysql服务（点击stop mysql server）

### 步骤二

```js

cd /usr/local/mysql/bin

sudo su

 ./mysqld_safe --skip-grant-tables &
 
```
回车后mysql会自动重启（偏好设置中mysql的状态会变成running）

### 步骤三

输入命令 ./mysql
回车后，输入命令 FLUSH PRIVILEGES; 
回车后，输入命令 SET PASSWORD FOR 'root'@'localhost' = PASSWORD('你的新密码');