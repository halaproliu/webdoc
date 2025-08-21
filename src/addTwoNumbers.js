function ListNode(val) {
    this.val = val;
    this.next = null;
}

var addTwoNumbers = function (l1, l2) {
    let dummy = new ListNode(0); // 设置链表开头为0的节点
    let cur = dummy;
    let carry = 0; // 进位
    while (l1 != null || l2 != null) {
        let d1 = l1 == null ? 0 : l1.val;
        let d2 = l2 == null ? 0 : l2.val;
        const sum = d1 + d2 + carry; // 两数对应位和进位相加
        carry = Math.floor(sum / 10); // 计算进位
        cur.next = new ListNode(sum % 10);
        cur = cur.next;
        console.log('cur: ', cur);
        if (l1 != null) l1 = l1.next;
        if (l2 != null) l2 = l2.next;
    }
    if (carry > 0) cur.next = new ListNode(carry);
    return dummy.next; // return为0节点后的一个节点即为开始节点
};

module.exports = {
    addTwoNumbers
};
