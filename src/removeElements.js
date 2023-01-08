// 链表
function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
}

// 移除链表元素
function removeElements(head, val) {
    let dummy = new ListNode(0)
    dummy.next = head
    let tmp = dummy
    while(tmp.next !== null) {
        if (tmp.next.val === val) {
            tmp.next = tmp.next.next
        } else {
            tmp = tmp.next
        }
    }
    return dummy.next
}