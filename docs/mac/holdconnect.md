# mac保持远程连接长连接

```js
sudo vim /etc/ssh/ssh_config
```

在文件后面添加

```js
ClientAliveInterval 60  
ClientAliveCountMax 3
```

ClientAliveInterval指定了服务器端向客户端请求消息 的时间间隔, 默认是0, 不发送.
ClientAliveInterval 60表示每分钟发送一次, 然后客户端响应, 这样就保持长连接了.
ClientAliveCountMax, 使用默认值3即可.ClientAliveCountMax表示服务器发出请求后客户端没有响应的次数达到一定值, 就自动断开.

配合tmux使用即可
