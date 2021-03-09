import { addTwoNumbers } from '../src/addTwoNumbers'
import { expect } from 'chai'

function ListNode (val) {
  this.val = val
  this.next = null
}

function initListNode (arr) {
  var node = null
  var len = arr.length
  var tempArr = []
  for (var i = 0; i < len; i++) {
    node = new ListNode(arr[i])
    tempArr.push(node)
  }
  for (var j = 0; j < len; j++) {
    if (j !== len - 1) {
      tempArr[j].next = tempArr[j + 1]
    }
  }
  return tempArr[0]
}


describe('addTwoNumbers', () => {
  it('should return the right ListNode', () => {
    var l1 = initListNode([2, 4, 3])
    var l2 = initListNode([5, 6, 4])
    var l3 = initListNode([7, 0, 8])
    expect(addTwoNumbers(l1, l2)).to.have.all.keys('val', 'next')
    expect(addTwoNumbers(l1, l2)).to.eql(l3).but.not.equal(l3)
  })
})
