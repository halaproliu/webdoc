# shell脚本设置git代理

### 前言
该脚本主要是为了满足日常使用npm，brew等工具时的网络问题，自动配置代理。

```bash
#!/bin/bash
proxy_url='socket://127.0.0.1:1086' # 修改代理url，可以是socks，也可以是http
echo 'Please choose your operation:'
echo '1: add git http proxy'
echo '2: delete git http proxy'
read num

proxy(){
	if [[ 1 == $num ]]; then
		git config --global http.proxy $proxy_url
		git config --global https.proxy $proxy_url
		return 1
	elif [[ 2 == $num ]]; then
		git config --global --unset http.proxy $proxy_url
		git config --global --unset https.proxy $proxy_url
		return 2
	fi
}

proxy

if [ 1 == $? ]; then
	echo "git proxy was setted to $proxy_url!"
else
	echo 'git proxy was deleted!'
fi
```

执行代码时，选择1则是添加代理，选择2位删除代理

效果如下所示：

```
**[terminal]
**[prompt halapro.liu@user]**[path ~]**[delimiter $]**[command ./gitProxy.sh]
Please choose your operation:
1: add git http proxy
2: delete git http proxy
1
git proxy was setted to socket://127.0.0.1:1086 !

```
