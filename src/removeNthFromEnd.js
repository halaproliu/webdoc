/*
 * @Author: liuwenjian
 * @Date: 2022-12-09 10:26:54
 * @LastEditors: liuwenjian
 * @LastEditTime: 2022-12-23 10:27:26
 * @FilePath: /webdoc/src/removeNthFromEnd.js
 * @Description:
 */
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
var removeNthFromEnd = function (head, n) {
    const dummy = new ListNode(0);
    dummy.next = head;
    let l = dummy;
    let r = dummy;
    let offset = n + 1;

    while (offset--) {
        r = r.next;
        if (offset > 1 && r === null) {
            return dummy.next;
        }
    }

    while (r) {
        r = r.next;
        l = l.next;
    }

    l.next = l.next.next;

    return dummy.next;
};

// 删除链表的倒数第N个节点
// function removeNthFromEnd(head, n) {
//     let dummy = new ListNode(0, head)
//     let fast = dummy
//     let slow = dummy
//     // fast先移动n个位置
//     while(n--) {
//         fast = fast.next
//     }
//     // fast走到最后，slow刚好处于倒数n个元素的前一个
//     while(fast.next) {
//         fast = fast.next
//         slow = slow.next
//     }
//     // slow的下一个节点就是要删除的节点
//     slow.next = slow.next.next
//     return dummy.next
// }

export default removeNthFromEnd;
