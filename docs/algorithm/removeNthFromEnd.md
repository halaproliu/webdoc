# leetcode算法-19-删除链表的倒数第N个节点

### 问题描述

给定一个链表，删除链表的倒数第 n 个节点，并且返回链表的头结点。

***示例：***

```js
给定一个链表: 1->2->3->4->5, 和 n = 2.

当删除了倒数第二个节点后，链表变为 1->2->3->5.
```
说明：

给定的 n 保证是有效的。

进阶：

你能尝试使用一趟扫描实现吗？

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/remove-nth-node-from-end-of-list
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

### 求解

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function(head, n) {
    const dummy = new ListNode(0)
    dummy.next = head
    let l = dummy
    let r = dummy
    let offset = n + 1

    while (offset--) {
        r = r.next
        if (offset > 1 && r === null) {
            return dummy.next
        }
    }

    while (r) {
        r = r.next
        l = l.next
    }

    l.next = l.next.next
    return dummy.next
}
```

### 执行结果

```js
执行用时 :76 ms, 在所有 JavaScript 提交中击败了46.67%的用户
内存消耗 :33.2 MB, 在所有 JavaScript 提交中击败了100.00%的用户
```

| 提交结果 | 执行用时 | 内存消耗 |
|:------:|:------:|:-------:|
|   通过  | 76ms  |  33.2MB |


