## mac 配置 clashx 代理忽略列表

发表于 2020-05-29 | 分类于 [other](https://wonderlq.github.io/categories/other/) | 阅读次数:

安装好 clashx 之后，内网网站打不开，需要代理配置忽略，但是 mac 没有找到可视化操作界面。

按照官方文档，操作如下：

-   在 ~/.config/clash/ 新建 proxyIgnoreList.plist 文件
-   编辑文件，内容如下

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br><span class="line">2</span><br><span class="line">3</span><br><span class="line">4</span><br><span class="line">5</span><br><span class="line">6</span><br><span class="line">7</span><br><span class="line">8</span><br><span class="line">9</span><br><span class="line">10</span><br><span class="line">11</span><br><span class="line">12</span><br><span class="line">13</span><br><span class="line">14</span><br></pre></td><td class="code"><pre><span class="line">&lt;?xml version="1.0" encoding="UTF-8"?&gt;</span><br><span class="line">&lt;!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd"&gt;</span><br><span class="line">&lt;plist version="1.0"&gt;</span><br><span class="line">&lt;array&gt;</span><br><span class="line">    &lt;string&gt;192.168.0.0/16&lt;/string&gt;</span><br><span class="line">    &lt;string&gt;10.0.0.0/8&lt;/string&gt;</span><br><span class="line">    &lt;string&gt;172.16.0.0/12&lt;/string&gt;</span><br><span class="line">    &lt;string&gt;127.0.0.1&lt;/string&gt;</span><br><span class="line">    &lt;string&gt;localhost&lt;/string&gt;</span><br><span class="line">    &lt;string&gt;*.local&lt;/string&gt;</span><br><span class="line">    &lt;string&gt;*.crashlytics.com&lt;/string&gt;</span><br><span class="line">    &lt;string&gt;my-custom-site.com&lt;/string&gt;</span><br><span class="line">&lt;/array&gt;</span><br><span class="line">&lt;/plist&gt;</span><br></pre></td></tr></tbody></table>

-   在 array 最后追加自定义需要忽略的网址

编辑保存后，重启 clashx 即可。

打开 mac 网络配置即可看到新加的配置  
![image](https://i.loli.net/2020/11/20/di6Zv2mw7bgtoNU.png)
