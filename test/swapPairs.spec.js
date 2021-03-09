import swapPairs from '../src/swapPairs'
import { initListNode, transformNodeToArray } from '../utils/listNode'
import { expect } from 'chai'

describe('swapPairs', () => {
    it('test head=1->2->3->4, res=2->1->4->3', () => {
        let headArr = [1, 2, 3, 4]
        let head = initListNode(headArr)
        let res = [2, 1, 4, 3]
        let ansNode = swapPairs(head)
        let ans = transformNodeToArray(ansNode)
        expect(JSON.stringify(ans)).to.equal(JSON.stringify(res))
    })
})
