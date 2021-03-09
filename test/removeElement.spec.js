import removeElement from '../src/removeElement'
import { expect } from 'chai'

describe('removeElement', () => {
    it('test nums = [3,2,2,3], val = 3', () => {
        const nums = [3, 2, 2, 3]
        const val = 3
        let res = removeElement(nums, val)
        expect(res).to.equal(2)
    })

    it('test nums = [0,1,2,2,3,0,4,2], val = 2', () => {
        const nums = [0,1,2,2,3,0,4,2]
        const val = 2
        let res = removeElement(nums, val)
        expect(res).to.equal(5)
    })
})
