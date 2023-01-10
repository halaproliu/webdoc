export function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
}

export function initListNode (arr) {
    let tmpArr = []
    for (let i = 0; i < arr.length; i++) {
        let next = new ListNode(arr[i])
        tmpArr.push(next)
    }

    for (let j = 0; j < tmpArr.length; j++) {
        tmpArr[j].next = tmpArr[j + 1]
    }

    return tmpArr[0]
}

export function transformNodeToArray (listNode) {
    let arr = []
    let val = listNode.val
    arr.push(val)
    while (listNode.next) {
        listNode = listNode.next
        arr.push(listNode.val)
    }
    return arr
}
