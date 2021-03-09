import nextPermutation from '../src/nextPermutation'
import { expect } from 'chai'

describe('nextPermutation', () => {
    it('nextPermutation test nums=[1, 2, 3], ans=[1, 3, 2]', () => {
        let nums = [1, 2, 3]
        nextPermutation(nums)
        expect(nums).to.have.ordered.members([1, 3, 2])
    })

    it('nextPermutation test nums=[1, 3, 2], ans=[2, 1, 3]', () => {
        let nums = [1, 3, 2]
        nextPermutation(nums)
        expect(nums).to.have.ordered.members([2, 1, 3])
    })

    it('nextPermutation test nums=[3, 2, 1], ans=[1, 2, 3]', () => {
        let nums = [3, 2, 1]
        nextPermutation(nums)
        expect(nums).to.have.ordered.members([1, 2, 3])
    })

    it('nextPermutation test nums=[1, 1, 5], ans=[1, 5, 1]', () => {
        let nums = [1, 1, 5]
        nextPermutation(nums)
        expect(nums).to.have.ordered.members([1, 5, 1])
    })

    it('nextPermutation test nums=[1, 5, 1], ans=[5, 1, 1]', () => {
        let nums = [1, 5, 1]
        nextPermutation(nums)
        expect(nums).to.have.ordered.members([5, 1, 1])
    })
})
