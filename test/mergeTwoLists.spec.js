import mergeTwoLists from '../src/mergeTwoLists'
import { initListNode, transformNodeToArray } from '../utils/listNode'
import { expect } from 'chai'

describe('mergeTwoLists', () => {
    it('test l1=1->2->4, l2=1->3->4, ans=1->1->2->3->4->4', () => {
        let l1Arr = [1, 2, 4]
        let l2Arr = [1, 3, 4]
        let res = [1, 1, 2, 3, 4, 4]
        let l1 = initListNode(l1Arr)
        let l2 = initListNode(l2Arr)
        let ansNode = mergeTwoLists(l1, l2)
        let ans = transformNodeToArray(ansNode)
        expect(JSON.stringify(ans)).to.equal(JSON.stringify(res))
    })
})
