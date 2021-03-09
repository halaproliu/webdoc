import mergeKLists from '../src/mergeKLists'
import { initListNode, transformNodeToArray } from '../utils/listNode'
import { expect } from 'chai'

describe('mergeKLists', () => {
    it('test l1=1->2->4, l2=1->3->4, ans=1->1->2->3->4->4', () => {
        let lists = [
            initListNode([1, 4, 5]),
            initListNode([1, 3, 4]),
            initListNode([2, 6])
        ]
        let res = [1, 1, 2, 3, 4, 4, 5, 6]
        let ansNode = mergeKLists(lists)
        let ans = transformNodeToArray(ansNode)
        expect(JSON.stringify(ans)).to.equal(JSON.stringify(res))
    })
})
