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

export default mergeKLists
