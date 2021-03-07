# leetcode算法-23-合并K个排序链表

### 问题描述

合并 k 个排序链表，返回合并后的排序链表。请分析和描述算法的复杂度。

***示例:***

```js
输入:
[
  1->4->5,
  1->3->4,
  2->6
]
输出: 1->1->2->3->4->4->5->6
```

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/merge-k-sorted-lists
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

### 求解

```js
function ListNode(val) {
    this.val = val;
    this.next = null;
}

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
        prev = prev.next
    }

    prev.next = l1 || l2
    return dummy.next
};

/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function(lists) {
    if (lists.length === 0) return null
    if (lists.length === 1) return lists[0]
    if (lists.length === 2) return mergeTwoLists(lists[0], lists[1])
    let mid = ~~(lists.length / 2)
    let l1 = lists.slice(0, mid)
    let l2 = lists.slice(mid)
    return mergeTwoLists(mergeKLists(l1), mergeKLists(l2))
};
```

### 执行结果

```js
执行用时 :108 ms, 在所有 JavaScript 提交中击败了71.19%的用户
内存消耗 :41.4 MB, 在所有 JavaScript 提交中击败了25.00%的用户
```

| 提交结果 | 执行用时 | 内存消耗 |
|:------:|:------:|:-------:|
|   通过  | 108ms  |  41.4MB |


