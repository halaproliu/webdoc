function ListNode(val) {
    this.val = val;
    this.next = null;
}

class LinkedList {
    constructor () {
        this.head = new ListNode('head')
    }

    find (val) {
        let curNode = this.head
        while (curNode.val !== val) {
            curNode = curNode.next
        }
        return curNode
    }

    findPrevious (val) {
        let curNode = this.head
        while (curNode !== null && curNode.next.val !== val) {
            curNode = curNode.next
        }
        return curNode
    }

    findLast () {
        let curNode = this.head
        while (curNode.next !== null) {
            curNode = curNode.next
        }
        return curNode
    }

    insert (newVal, val) {
        let newNode = new ListNode(newVal)
        let current = this.find(val)
        newNode.next = current.next
        current.next = newNode
    }

    remove (val) {
        let prevNode = this.findPrevious(val)
        if (prevNode.next !== null) {
            prevNode.next = prevNode.next.next
        }
    }

    display () {
        let curNode = this.head
        while (curNode !== null) {
            console.log(curNode.next.val)
            curNode = curNode.next
        }
    }
}

export default LinkedList
