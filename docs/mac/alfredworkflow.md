# Alfred Workflow使用python实现周报插件

### 介绍

此workflow的作用如下，
1. zhoubao关键词加上参数，将当前的工作内容写入以本周一日期命名的txt文件中，
如：zhoubao 1. 今天完成了xxxx。
2. zhoubao不加参数，可以获取当前已记录的周报内容，并输出到当前的输入框
3. zhoubao clear清空周报内容。


### 步骤

1. 在workflow中创建一个空白的workflow

![](../imgs/alfred/img_9fbb730e733ddaceaf2b07416f2bcfe9.png ':size=500')

![](../imgs/alfred/Snipaste_2023-04-06_14-05-54.png ':size=500')

2. 选择一个input keyword

![](../imgs/alfred/Snipaste_2023-04-06_14-07-54.png ':size=500')

![](../imgs/alfred/Snipaste_2023-04-06_14-08-47.png ':size=500')

3. 添加一个Actions -> Run Script

![](../imgs/alfred/Snipaste_2023-04-06_14-09-37.png ':size=500')

![](../imgs/alfred/img_c552eba47e6f732f1979158c2551df62.png ':size=500')

其中zhoubao.py存放目录的路径基本在~/Library/Application\ Support/Alfred/Alfred.alfredpreferences/workflows/user.workflow.xxxxxxxxxxxxx这样一个目录地址下。

4. 编写周报插件的python脚本

```python
import sys
import os
from datetime import datetime, timedelta 

home=os.environ['HOME']

query = sys.argv
fpath = home + '/zhoubao/'

def zhoubao(monday):
    filename = monday + '.txt'
    fullpath = fpath + filename
    if len(query) == 1:
         with open(fullpath) as f:
            print(f.read())
    else:
        if query[1] == 'clear':
            with open(fullpath, 'w') as file:
                file.truncate(0)
        else:
            if not os.path.exists(fpath):
                os.makedirs(fpath)
                with open(fullpath, 'w') as f:
                    f.write(query[1] + '\n')
            else:
                with open(fullpath, mode='a') as f:
                    f.write(query[1] + '\n')



now = datetime.now()
weekStart = now - timedelta(days=now.weekday())
weekStartStr = datetime.strftime(weekStart, "%Y%m%d")
zhoubao(weekStartStr)
```

5. 为python组件安装依赖包

进入目录

```bash
cd ~/Library/Application\ Support/Alfred/Alfred.alfredpreferences/workflows/user.workflow.xxxxxxxxxxxxx
# target指安装到当前目录下
pip install datetime target=.
```

6. 添加copy to clipboard组件

勾选Automatically paste to frontmost app，会自动将workflow获得的结果自动黏贴到当前窗口输入光标下的，无论是什么app。

![](../imgs/alfred/Snipaste_2023-04-06_14-17-42.png ':size=500')

![](../imgs/alfred/Snipaste_2023-04-06_14-18-00.png ':size=500')

7. 对三个组件进行连线,使整个workflow连接起来形成一个工作流

![](../imgs/alfred/Snipaste_2023-04-06_14-18-24.png ':size=500')

至此这个周报组件就完成了。

8. 插件的使用

![](../imgs/alfred/Snipaste_2023-04-06_14-26-39.png ':size=500')

![](../imgs/alfred/screen2023-04-06-14.28.27.mp4)