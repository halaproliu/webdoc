
# shell脚本获取当前git分支并提交远程分支

### 写在开头

在工作中遇到个问题，希望统一所有人在git提交的时候的commit信息格式，于是想着用shell脚本读取统一的配置文件，进行拼接。

```bash
#!/bin/bash
hasGit=`which git` # 判断是否存在git
time=$(date "+%Y-%m-%d %H:%M:%S")
msg=${1:-"updated at $time"} # 获取终端输入的第一个参数，若为空则为auto commit
if [ ! $hasGit ];then
  echo 'Please download git first!';
  exit 1;
else 
  result=`git branch | grep "*"` # 获取分支名
  curBranch=${result:2} # 去除多余的*
  git add .
  git commit -m "$msg"
  git push github $curBranch # 提交代码到github(修改了远程项目名)
  git push gitee $curBranch # 提交代码到gitee
fi
```

通过在.env文件配置a和b变量，从而定制git commit的模板

```bash
#.env配置
a=测试标题
b=测试内容
```
```bash
#!/bin/bash
source `pwd`/.env
hasGit=`which git` #判断是否已安装git
if [ ! $hasGit ];then
  echo 'Please download git first!';
  exit 1;
else 
  # 获取当前分支
  branch=`git branch | grep "*"`
  # 截取分支名
  currBranch=${branch:2}
  commitMsg=${1:-'auto commit'} # 获取终端输入的第一个参数，若为空则为auto commit
  msg="title:$a;content:$b;$commitMsg"
  msg=`echo $msg | sed -e 's/;/\'$'\n/g'`
  echo $msg
  git add .
  git commit -m "$msg"
  git push origin $currBranch
fi
```

最终提交结果类似如下：

```git
title:测试标题
content:测试内容
添加git提交模板配置
```
