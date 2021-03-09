import reverseKGroup from '../src/reverseKGroup'
import { initListNode, transformNodeToArray } from '../utils/listNode'
import { expect } from 'chai'

describe('reverseKGroup', () => {
    it('test head=1->2->3->4->5, k=2', () => {
        let arr = [1, 2, 3, 4, 5]
        let head = initListNode(arr)
        let k = 2
        let res = reverseKGroup(head, k)
        let ans = transformNodeToArray(res)
        expect(ans.toString()).to.equal('2,1,4,3,5')
    })
})
