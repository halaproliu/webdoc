import removeNthFromEnd from '../src/removeNthFromEnd'
import { initListNode, transformNodeToArray } from '../utils/listNode'
import { expect } from 'chai'

describe('removeNthFromEnd', () => {
    it('test head=[1, 2, 3, 4, 5], n = 2', () => {
        let arr = [1, 2, 3, 4, 5]
        let res = [1, 2, 3, 5]
        let input = initListNode(arr)
        let ansNode = removeNthFromEnd(input, 2)
        let ans = transformNodeToArray(ansNode)
        expect(JSON.stringify(ans)).to.equal(JSON.stringify(res))
    })

    it('test head=[1, 2, 3, 4, 5], n = 3', () => {
        let arr = [1, 2, 3, 4, 5]
        let res = [1, 2, 4, 5]
        let input = initListNode(arr)
        let ansNode = removeNthFromEnd(input, 3)
        let ans = transformNodeToArray(ansNode)
        expect(JSON.stringify(ans)).to.equal(JSON.stringify(res))
    })
})
