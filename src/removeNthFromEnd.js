function ListNode(val) {
    this.val = val;
    this.next = null;
}
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

export default removeNthFromEnd
