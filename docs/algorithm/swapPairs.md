# leetcode算法-24-两两交换链表中的节点

### 问题描述

给定一个链表，两两交换其中相邻的节点，并返回交换后的链表。

你不能只是单纯的改变节点内部的值，而是需要实际的进行节点交换。

 

***示例:***

```js
给定 1->2->3->4, 你应该返回 2->1->4->3.
```

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/swap-nodes-in-pairs
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

### 求解

```js
function ListNode(val) {
    this.val = val;
    this.next = null;
}

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var swapPairs = function(head) {
    const dummyHead = new ListNode(0)
    dummyHead.next = head

    let prev = dummyHead
    let first = prev.next

    while (first && first.next) {
        let second = first.next
        let next = second.next

        second.next = first
        first.next = next
        prev.next = second

        prev = first
        first = first.next
    }

    return dummyHead.next
}
```

### 执行结果

```js
执行用时 : 68ms, 在所有 JavaScript 提交中击败了59.85%的用户
内存消耗 : 32.6MB, 在所有 JavaScript 提交中击败了100.00%的用户
```

| 提交结果 | 执行用时 | 内存消耗 |
|:------:|:------:|:-------:|
|   通过  | 68ms  |  32.6MB |


