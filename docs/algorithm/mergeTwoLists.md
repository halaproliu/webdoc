# leetcode算法-21-合并两个有序链表

### 问题描述

将两个升序链表合并为一个新的 升序 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。 

***示例：***

```js
输入：1->2->4, 1->3->4
输出：1->1->2->3->4->4
```

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/merge-two-sorted-lists
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

### 求解

- 使用迭代的方法
- 通过迭代比较两个链表的值
- 当前节点的下一项则为较小的值
- 接着获取next值，继续比较，直到next为null为止


```js
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function(l1, l2) {
    // 创建头节点
    let dummy = new ListNode(0)
    // 创建指针
    let prev = dummy
    while (l1 && l2) {
        if (l1.val <= l2.val) {
            prev.next = l1
            l1 = l1.next
        } else {
            prev.next = l2
            l2 = l2.next
        }
        // 指针移动到下一项
        prev = prev.next
    }

    prev.next = l1 || l2
    return dummy.next
};
```

### 执行结果

```js
执行用时 :80 ms, 在所有 JavaScript 提交中击败了56.25%的用户
内存消耗 :35.5 MB, 在所有 JavaScript 提交中击败了94.12%的用户
```

| 提交结果 | 执行用时 | 内存消耗 |
|:------:|:------:|:-------:|
|   通过  | 80ms  |  35.5MB |


