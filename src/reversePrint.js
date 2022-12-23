// 链表
function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
}

// 从尾到头打印链表
function reversePrint(head) {
    const prints = []
    while (head !== null) {
        prints.unshift(head.val)
        head = head.next
    }
    return prints
}