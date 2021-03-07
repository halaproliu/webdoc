# nginx入门学习

### 安装nginx

- mac安装

```sh
brew install nginx
```

- linux安装

```sh
yum -y install gcc pcre-devel zlib-devel openssl openssl-devel
```

nginx下载地址：https://nginx.org/download/

下载“nginx-1.9.9.tar.gz”，移动到/usr/local/下。

```sh
## 解压
tar -zxvf nginx-1.9.9.tar.gz

##进入nginx目录
cd nginx-1.9.9
## 配置
./configure --prefix=/usr/local/nginx

# make
make
make install
```

安装路径： /usr/local/nginx

### nginx配置

nginx分为三个模块，events，http，server模块，

##### user nobody;
定义nginx子进程数量，即提供服务的进程数量，该数值建议和服务cpu核数保持一致。
除了可以定义数字外，还可以定义为auto，表示让系统自动调整。

##### worker_processes 1;
定义运行nginx服务的用户,还可以加上组,如 user nobody nobody;

##### error_log logs/error.log;

定义错误日志的路径，可以是相对路径（相对prefix路径的），也可以是绝对路径。
该配置可以在此处定义，也可以定义到http、server、location里
mac的默认相对路径（/usr/local/etc/nginx）

###### pid logs/nginx.pid;

定义nginx进程pid文件所在路径，可以是相对路径，也可以是绝对路径。

##### worker_rlimit_nofile 100000;
定义nginx最多打开文件数限制。如果没设置的话，这个值为操作系统（ulimit -n）的限制保持一致。
把这个值设高，nginx就不会有“too many open files”问题了。

##### worker_connections 1024;

定义每个work_process同时开启的最大连接数，即允许最多只能有这么多连接。

##### accept_mutex on;

当某一个时刻只有一个网络连接请求服务器时，服务器上有多个睡眠的进程会被同时叫醒，这样会损耗一定的服务器性能。
Nginx中的accept_mutex设置为on，将会对多个Nginx进程（worker processer）接收连接时进行序列化，防止多个进程争抢资源。
默认就是on。

##### multi_accept on;

nginx worker processer可以做到同时接收多个新到达的网络连接，前提是把该参数设置为on。
默认为off，即每个worker process一次只能接收一个新到达的网络连接。

##### include mime.types

定义nginx支持的网络资源媒体类型库文件（如，html，javascript,css,video等）

##### log_format

```js
log_format main  '$remote_addr - $remote_user [$time_local] "$request" '
                  '$status $body_bytes_sent "$http_referer" '
                  '"$http_user_agent" "$http_x_forwarded_for"';
```
 
其中main为日志格式的名字，后面的为nginx的内部变量组成的一串字符串。

##### access_log logs/access.log main;

定义日志的路径以及采用的日志格式，该参数可以在server配置块中定义。

##### sendfile on;

是否调用sendfile函数传输文件，默认为off，使用sendfile函数传输，可以减少user mode和kernel mode的切换，从而提升服务器性能。
对于普通应用设为 on，如果用来进行下载等应用磁盘IO重负载应用，可设置为off，以平衡磁盘与网络I/O处理速度，降低系统的负载。

##### sendfile_max_chunk 128k;

该参数限定Nginx worker process每次调用sendfile()函数传输数据的最大值，默认值为0，如果设置为0则无限制。

##### tcp_nopush on;


当tcp_nopush设置为on时，会调用tcp_cork方法进行数据传输。
使用该方法会产生这样的效果：当应用程序产生数据时，内核不会立马封装包，而是当数据量积累到一定量时才会封装，然后传输。这样有助于解决网络堵塞问题。
默认值为on。举例：快递员收快递、发快递，包裹累积到一定量才会发，节省运输成本。

##### keepalive_timeout 65 60;

该参数有两个值，第一个值设置nginx服务器与客户端会话结束后仍旧保持连接的最长时间，单位是秒，默认为75s。
第二个值可以省略，它是针对客户端的浏览器来设置的，可以通过curl -I看到header信息中有一项Keep-Alive: timeout=60，如果不设置就没有这一项。
第二个数值设置后，浏览器就会根据这个数值决定何时主动关闭连接，Nginx服务器就不操心了。但有的浏览器并不认可该参数。


##### send_timeout

这个超时时间是发送响应的超时时间，即Nginx服务器向客户端发送了数据包，但客户端一直没有去接收这个数据包。
如果某个连接超过send_timeout定义的超时时间，那么Nginx将会关闭这个连接。

##### client_max_body_size 10m;

浏览器在发送含有较大HTTP包体的请求时，其头部会有一个Content-Length字段，client_max_body_size是用来限制Content-Length所示值的大小的。
这个限制包体的配置不用等Nginx接收完所有的HTTP包体，就可以告诉用户请求过大不被接受。会返回413状态码。
例如，用户试图上传一个1GB的文件，Nginx在收完包头后，发现Content-Length超过client_max_body_size定义的值，
就直接发送413(Request Entity Too Large)响应给客户端。

##### gzip on；

是否开启gzip压缩。

##### gzip_min_length 1k;

设置允许压缩的页面最小字节数，页面字节数从header头得content-length中进行获取。默认值是20。建议设置成大于1k的字节数，小于1k可能会越压越大。

##### gzip_buffers 4 16k;

设置系统获取几个单位的buffer用于存储gzip的压缩结果数据流。4 16k代表分配4个16k的buffer。

##### gzip_http_version 1.1;

用于识别 http 协议的版本，早期的浏览器不支持 Gzip 压缩，用户会看到乱码，所以为了支持前期版本加上了这个选项。
如果你用了Nginx反向代理并期望也启用Gzip压缩的话，由于末端通信是http/1.1，故请设置为 1.1。

##### gzip_comp_level 6;

gzip压缩比，1压缩比最小处理速度最快，9压缩比最大但处理速度最慢(传输快但比较消耗cpu)

### 常用配置

以下配置作用是监听8080端口，当在浏览器输入http://localhost:8080时，默认显示文件夹
/usr/share/nginx/html/blog中的index.html文件

```js
user nobody;
worker_processes  1;


events {
    worker_connections  1024;
}

http {
    include       mime.types;
    default_type  application/octet-stream;
    sendfile        on;
    keepalive_timeout 65;

    server {
        listen       8080;
        server_name  localhost;

        location / {
            root   /usr/share/nginx/html/blog;
            index  index.html index.htm;
        }
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }

    include servers/*;
}

```
