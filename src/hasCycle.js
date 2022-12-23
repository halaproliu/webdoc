/*
 * @Author: liuwenjian
 * @Date: 2022-12-23 10:27:38
 * @LastEditors: liuwenjian
 * @LastEditTime: 2022-12-23 10:27:51
 * @FilePath: /webdoc/src/hasCycle.js
 * @Description: 
 */
function ListNode(val) {
    this.val = val;
    this.next = null;
}

// 环形链表
function hasCycle(head) {
    let map = new Map()
    while(head) {
        if (map.has(head)) return true
        map.set(head, true)
        head = head.next
    }
    return false
}