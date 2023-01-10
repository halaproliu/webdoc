/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
import { ListNode } from "../utils/listNode";
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var rotateRight = function(head, k) {
    if (k === 0 || !head || !head.next) return head
    let n = 1
    let cur = head
    while(cur.next) {
        cur = cur.next
        n++
    }

    let add = n - k % n
    if (add === n) {
        return head
    }
    cur.next = head
    while(add) {
        cur = cur.next
        add--
    }
    const ret = cur.next
    cur.next = null
    return ret
};

export default rotateRight
