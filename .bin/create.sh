#!/bin/bash
execDir=$(pwd)
dist=$execDir/docs/algorithm/$1.md
echo "# leetcode算法-$1" >>$dist
echo >>$dist
echo "### 问题描述" >>$dist
echo >>$dist
echo >>$dist
echo >>$dist
echo >>***示例 1：***
echo >>$dist
echo "\`\`\`js" >>$dist
echo >>$dist
echo "\`\`\`" >>$dist
echo >>$dist
echo >>***示例 2：***
echo "\`\`\`js" >>$dist
echo >>$dist
echo "\`\`\`" >>$dist
echo >>$dist
echo >>***示例 3：***
echo "\`\`\`js" >>$dist
echo >>$dist
echo "\`\`\`" >>$dist
echo >>$dist
echo >>***提示:***
echo >>$dist
echo "### 求解" >>$dist
echo >>$dist
echo "\`\`\`js" >>$dist
echo >>$dist
echo "\`\`\`" >>$dist
echo >>$dist
echo "### 执行结果" >>$dist
echo >>$dist
echo "\`\`\`js" >>$dist
echo "执行用时 : $2ms, 在所有 JavaScript 提交中击败了$4%的用户">>$dist
echo "内存消耗 : $3MB, 在所有 JavaScript 提交中击败了$5%的用户">>$dist
echo "\`\`\`" >>$dist
echo >>$dist
echo "| 提交结果 | 执行用时 | 内存消耗 |" >> $dist
echo "|:------:|:------:|:-------:|" >> $dist
echo "|   通过  | $2ms  |  $3MB |" >> $dist
# echo >>$dist
# echo "更多前端资料请关注公众号 \`【三分钟热度工程师】\`">>$dist
# echo >>$dist
# echo "![](../imgs/qrcode.jpg)">>$dist
# echo >>$dist
# echo "如果觉得写得还不错，可以关注[gitbook小册](https://halaproliu.github.io/gitbook/shellmd5/2596084d37a462e93b62f7c136e9eb0e.html)">>$dist
