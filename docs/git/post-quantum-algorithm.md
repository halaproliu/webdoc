# post-quantum algorithmw warning

# 问题描述

git命令执行后warning提示

```bash
** WARNING: connection is not using a post-quantum key exchange algorithm.
** This session may be vulnerable to "store now, decrypt later" attacks.
** The server may need to be upgraded. See https://openssh.com/pq.html
```

# 解决方法

在~/.ssh/config添加配置

```bash
Host *
  IgnoreUnknown WarnWeakCrypto
  WarnWeakCrypto no-pq-kex
```