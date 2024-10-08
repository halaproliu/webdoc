# 你应该知道的前端——缓存

### web 缓存

web 缓存是可以通过自动保存常见文档副本的 HTTP 设备。当 Web 请求抵达缓存时,如果本地有以缓存的副本,就可以从本地存储设备而不是原始服务器中提取这个文档。

##### 1. 为什么需要缓存

> 冗余的数据传输

有很多客户端访问一个流行的原始服务器页面时,服务器会多次传输同一份文档,每次传送给一个客户端,一些相同的字节会在网络中一遍遍的传输。这些冗余的数据传输会耗尽昂贵的网络带宽。而通过缓存我们可以保留第一家服务器响应的副本,后继请求就可以由缓存的副本来应对

> 带宽瓶颈

缓存还可以缓解网络的瓶颈问题。很多网络会为本地网络客户端提供的带宽比为远程服务器提供的带宽要宽。客户端会以路径上最慢的网速访问服务器。如果客户端从一个快速局域网的缓存中得到一份副本,那么缓存就可以提高性能——尤其是要传输比较大的文件时

> 瞬间拥塞

缓存在破环瞬间拥塞时显得非常中重要。突发事件(比如爆炸性新闻,批量 E-mail 公告, 或者某个名人事件)是很多人几乎同时去访问一个 web 文档时,就会出现瞬间拥塞。由此造成的过多流量峰值可能会使网络和 web 服务器发生灾难性的崩溃

> 距离时延

即使带宽不是问题,距离也可能称为问题。每台网络路由器都会增加因特网流量的时延,即使客户端和服务器之间没有太多路由器,光速本身也会造成时延长。将缓存放在附近的机房里可以将文件传输距离从数千英里缩短为数十米


##### 2. 缓存的命中和未命中

但是缓存无法保存世界上每份文档的副本,这样就会分成两种情况：

> 可以用已有的副本为某些到达缓存的请求提供服务,这被称之为缓存命中

![](../imgs/cache1.awebp)

> 其他一些到达缓存的请求可能会由于没有副本可用,而被转发给原始服务器,这被称之为缓存未命中

![](../imgs/cache2.awebp)


### 3. 新鲜度检测规则

HTTP通过缓存将服务器文档的副本保留一段时间。在这段时间里,都认为文档时新鲜的,缓存可以在不联系服务器的情况下,直接提供该文档。我们称之为强缓存命中,此时浏览器会返回200状态码(from cache)

![](../imgs/cache3.awebp)

但一旦以缓存副本停留的时间太长,超过了文档的新鲜度限值,就认为文档过期了。

![](../imgs/cache4.awebp)

再提供文档之前,缓存要再次与服务器进行再验证,已查看文档是否发生了变化。我们称之为协商缓存

![](../imgs/cache5.awebp)


- 在验证命中: 如果服务器对象没有被修改,服务器会向客户端发送一个小的HTTP 304 Not Modeified响应
- 再验证未命中: 如果服务器对象与以缓存副本不同,服务器向客户端送一条普通的带有完整内容的HTTP 200 ok 响应
- 对象被删除: 如果服务器对象已经被删除了,服务器就回送一个404 Not Found 响应,缓存也会将其副本删除


### 4. 强缓存原理

通过特殊的HTTPCache-Control首部和Expries首部,HTTP让原始服务器向每个文档附加了一个过期日期,这些首部说明了在多长时间内可以将这些内容视为新鲜的。
浏览器第二次发送请求相同资源时,拿出过期时间和当前时间进行比较,如果在过期日期之前,则强缓存命中,如果缓存文档过期,缓存就必须与服务器进行核对,询问文档是否过期,如果被修改过,就要获取一份新鲜(带有新的过期日期)的副本
4.1 强缓存首部

- Cache-Control: max-age:

max-age值定义了文档的最大使用期——从第一次生成文档到文档不再新鲜,无法使用为止,最大的合法生存时间(以秒为单位)

- Expires:

指定一个绝对的过期日期,如果过期日期已经过了,就说明文档不在新鲜了,不过由于我们可以去更改客户端的时间,因此可以更改缓存命中的结果。因此我们优先使用Cache-Control

- Cache-Control指令：

  - no-cache和no-store:

no-cache表示必须先与服务器确认返回的响应是否发生了变化,然后才能使用响应来满足后续对同意网址的请求。因此如果存在合适的验证令牌(ETag),no-cache会发起往返通信来验证缓存的响应,但如果资源未发生变化,则可避免下载

no-store表示直接禁止浏览器以及所有中间缓存存储任何版本的返回响应,例如,包含个人隐私数据或银行业务数据的响应。每次用户请求该资产时,都会向服务器发送请求,并下载完整的响应

- public与private:

public出现再响应首部,则即使他有关联的HTTP验证,甚至响应状态代码代码通常无法缓存,也可以缓存响应。大多数情况下,public不是必须的,因为明确的缓存信息(例如max-age)已表示响应是可以缓存
相比之下,浏览器可以缓存private响应。不过这些响应通常只为单个用户缓存,因此不允许任何中间缓存对其进行缓存,例如,用户的浏览器可以缓存包含用户私人信息的HTML网页,但CDN不能缓存

- max-age:

指令指定从请求的时间开始,允许获取的响应被重用的最长时间。例如max-age=60表示可以在接下来的60s缓存和重用响应

- must-revalidate:

must-revalidate告诉缓存,再事先没有跟原始服务器进行再验证的情况下,不能提供这个对象的陈旧副本,缓存仍然可以随意提供新鲜的副本。如果在缓存进行must-revalidate新鲜度检查时,原始服务器不可用,缓存就必须返回一条504错误


最佳Cache-Control策略:

![](../imgs/cache6.awebp)

### 5. 协商缓存原理

仅仅是以缓存过期了并不意味着他和原始服务器目前处于活跃状态的文档有实际的区别,这只是意味着到了要进行核对的时间了,这种情况被称为协商缓存,说明缓存需要询问原始服务器是否发生变化


- 如果再验证显示内容发生了变化,缓存会获取一份新的文档副本,并将其存储在旧文档的位置上,然后将文档发送给客户端。


- 如果再验证内容没有发生变化,缓存只需要获取新的首部,包括一个新的过期日期,并对缓存中的首部进行更新,并对缓存中的首部进行更新就行了


### 5.1 用条件方法进行再验证

HTTP的条件方法可以高效的实现再验证。HTTP允许缓存向原始服务器发送一个条件GET,请求服务器只有在文档与缓存中现有的副本不同时,才回送对象主体,对于缓存在验证来说最有用的2个首部时

- If-Modified-Since: <date>:

如果从指定日期之后,文档被修改了,就执行请求的方法。可以与Last-Modfied服务器响应首部配合使用,只有在内容修改后与已缓存版本有所不同的时候才去获取内容

- If-None-Match:<tags>:

服务器可以为文档提供特殊的标签(ETag),而不是将其与最近修改日期向匹配,这些标签就像序列号一样。如果已缓存标签与服务器文档中的标签有所不同,If-None-Match首部就会执行所请求的方法

### 5.2 If-Modified-Since:  / Last-Modified

具体流程如下:


1. 客户端第一次向服务器发起请求,服务器将最后的修改日期(Last-Modified)附加到所提供的文档上去


2. 当再一次请求资源时间,如果没有命中强缓存,在执行在验证时,会包含一个If-Modifed-Since首部,其中携带有最后修改已缓存副本的日期: If-Modified-Since: <cached last-modified data>


3. 如果内容被修改了,服务器回送新的文档,返回200状态码和最新的修改日期


4. 如果内容没有被修改,会返回一个304 Not Modified响应


### 5.3 If-None-Match / ETag

有些情况下仅使用最后修改日期进行再验证是不够的


- 有些文档有可能会被周期性的重写(比如: 从一个后台进程中写入),但实际上包含的数据常常是一样分,尽管内容没有变化,但修改日期会发生变化


- 有些文档可能被修改了,但所做修改并不重要.不需要让世界范围内的缓存都重装数据(比如填写注释)


- 有些服务器无法准确判定其页面的最后修改日期


- 有些服务器提供的文档会在毫秒间隙发生变化(比如,实时监视器),对这些服务器来说,以一秒为粒度的修改日期可能就不够用了


因此HTTP允许用户对被称为实体标签的(ETag)的版本标识符进行比较。实体标签是附加到文档上的任意标签(引用字符串),服务器生成并返回的随机令牌通常是文件内容的哈希值或其他指纹。客户端不需要指纹是如何生成的，只需在下一次请求时将其发送至服务器。如果指纹仍然相同，则表示资源未发生变化，您就可以跳过下载。

![](../imgs/cache7.awebp)

在上例中，客户端自动在“If-None-Match” HTTP 请求标头内提供 ETag 令牌。服务器根据当前资源核对令牌。如果它未发生变化，服务器将返回304 Not Modified响应，告知浏览器缓存中的响应未发生变化，可以再延用 120 秒。请注意，您不必再次下载响应，这节约了时间和带宽。

### 更新和废弃响应

浏览器发出的所有HTTP请求会首先路由到浏览器缓存,已确认是否缓存可用于请求的有效响应。如果有匹配的响应,则从缓存中读取响应,这样就避免了网路延迟和传送产生的流量费用

不过如果我们向更新或废弃缓存的响应,该怎么办, 例如我们有一个css样式表缓存长达24小时,但是我们需要立即更新他,我们如何通知已过时的CSS缓存副本的所有访问者更新其缓存。在不更改资源网址的情况下,是做不到的。

所以,如何才能实现客户端缓存和快速更新,你可以在资源内容发生变化时,更改它的网址,强制用户下载新响应。通常情况下,可以通过再文件名中嵌入文件的指纹或版本号来实现

![](../imgs/cache8.awebp)

- HTML被标记为no-cache,这意味着浏览器再每次请求时都始终重新验证文档,并在内容变化时获取最新版本。此外再HTML标记内,再CSS和javascript中嵌入指纹,如果这些文件的内容发生变化,网页的HTML也会随之改变,并会下载HTML响应的新副本


- 允许浏览器和中间缓存(例如CDN)缓存CSS,并将CSS设置为1年后到期,因为再文件名中嵌入了文件的指纹,CSS更新时网址也会随之变化


- JavaScript同样设置为1年后到期,但标记为private,这或许是因为它包含的某些用户私人数据是CDN不应缓存的。


- 图像缓存时不包含版本或唯一指纹,并设置为一天后到期


### 参考资料

- [HTTP缓存](https://web.dev/http-cache/)
- [浏览器缓存知识小结及应用](https://www.cnblogs.com/lyzg/p/5125934.html#_label4)
- [http爆炸重点学习——缓存](http://www.yzmspirit.com/2017/03/28/http%E7%88%86%E7%82%B8%E9%87%8D%E7%82%B9%E5%AD%A6%E4%B9%A0%E2%80%94%E2%80%94%E7%BC%93%E5%AD%98/)