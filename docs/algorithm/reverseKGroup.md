<!--
 * @Author: brecht
 * @Date: 2021-05-25 16:20:45
 * @LastEditTime: 2021-08-18 13:21:57
 * @LastEditors: brecht
 * @Description: 
 * @FilePath: /webdoc/docs/algorithm/reverseKGroup.md
-->
# leetcode算法-25-K个一组翻转链表

### 问题描述

给你一个链表，每 k 个节点一组进行翻转，请你返回翻转后的链表。

k 是一个正整数，它的值小于或等于链表的长度。

如果节点总数不是 k 的整数倍，那么请将最后剩余的节点保持原有顺序。

 

***示例：***

```js
给你这个链表：1->2->3->4->5

当 k = 2 时，应当返回: 2->1->4->3->5

当 k = 3 时，应当返回: 3->2->1->4->5
```

 

***说明：***

- 你的算法只能使用常数的额外空间。
- 你不能只是单纯的改变节点内部的值，而是需要实际进行节点交换。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/reverse-nodes-in-k-group
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

### 求解

```js
function ListNode(val) {
    this.val = val;
    this.next = null;
}

const reverse = (head, tail) => {
    let prev = tail.next
    let p = head
    while (prev !== tail) {
        const nex = p.next;
        p.next = prev;
        prev = p;
        p = nex;
    }
    return [tail, head]
}

/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var reverseKGroup = function(head, k) {
    const dummy = new ListNode(0);
    dummy.next = head;
    let pre = dummy;

    while (head) {
        let tail = pre;
        // 查看剩余部分长度是否大于等于 k
        for (let i = 0; i < k; ++i) {
            tail = tail.next;
            if (!tail) {
                return dummy.next;
            }
        }
        const nex = tail.next;
        [head, tail] = reverse(head, tail);
        // 把子链表重新接回原链表
        pre.next = head;
        tail.next = nex;
        pre = tail;
        head = tail.next;
    }
    return dummy.next;
};
```

### 执行结果

```js
执行用时 : 88ms, 在所有 JavaScript 提交中击败了80.92%的用户
内存消耗 : 39MB, 在所有 JavaScript 提交中击败了100.00%的用户
```

| 提交结果 | 执行用时 | 内存消耗 |
|:------:|:------:|:-------:|
|   通过  | 88ms  |  39MB |