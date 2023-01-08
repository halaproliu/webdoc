// 链表
function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
}

// 删除中间节点
function deleteNode(node) {
    let dummy = node.next
    node.val = dummy.val
    node.next = dummy.next
    dummy.next = null
}