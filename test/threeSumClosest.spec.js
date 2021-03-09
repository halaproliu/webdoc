import threeSumClosest from '../src/threeSumClosest'
import { expect } from 'chai'

describe('threeSumClosest', () => {
    it('test nums = [-1, 2, 1, -4], target = 1', () => {
        let nums = [-1, 2, 1, -4]
        let target = 1
        expect(threeSumClosest(nums, target)).to.equal(2)
    })

    it('test nums = [-1, 2, 1, -4, 3], target = 0', () => {
        let nums = [-1, 2, 1, -4, 3]
        let target = 0
        expect(threeSumClosest(nums, target)).to.equal(0)
    })

    it('test nums = [-1, 2, 1, -4, 3], target = 7', () => {
        let nums = [-1, 2, 1, -4, 3]
        let target = 7
        expect(threeSumClosest(nums, target)).to.equal(6)
    })

    it('test nums = [1, 1, 1, 1], target = 0', () => {
        let nums = [1, 1, 1, 1]
        let target = 0
        expect(threeSumClosest(nums, target)).to.equal(3)
    })

    it('test nums = [1, 1, 1, 0], target = -100', () => {
        let nums = [1, 1, 1, 0]
        let target = -100
        expect(threeSumClosest(nums, target)).to.equal(2)
    })

    it('test nums = [1, 1, -1, -1, 3], target = -1', () => {
        let nums = [1, 1, -1, -1, 3]
        let target = -1
        expect(threeSumClosest(nums, target)).to.equal(-1)
    })
})
