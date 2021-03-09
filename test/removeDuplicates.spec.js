import removeDuplicates from '../src/removeDuplicates'
import { expect } from 'chai'

describe('removeDuplicates', () => {
    it('test nums=[1, 1, 2]', () => {
        let nums = [1, 1, 2]
        let len = removeDuplicates(nums)
        expect(len).to.equal(2)
        // expect(JSON.stringify(nums)).to.equal('[1,2]')
    })

    it('test nums=[1, 1, 2, 2, 3]', () => {
        let nums = [1, 1, 2, 2, 3]
        let len = removeDuplicates(nums)
        expect(len).to.equal(3)
        // expect(JSON.stringify(nums)).to.equal('[1,2,3]')
    })
})
