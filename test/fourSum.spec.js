import fourSum from '../src/fourSum'
import { isArrayEqual } from '../utils/array'
import { expect } from 'chai'

describe('fourSum', () => {
    it('test nums = [1, 0, -1, 0, -2, 2], target = 0', () => {
        let arr = [1, 0, -1, 0, -2, 2]
        let target = 0
        let res = [
            [-1, 0, 0, 1],
            [-2, -1, 1, 2],
            [-2, 0, 0, 2]
        ]
        expect(isArrayEqual(fourSum(arr, target), res)).to.equal(true)
    })

    it('test nums = [0, 0, 0, 0], target = 0', () => {
        let arr = [0, 0, 0, 0]
        let target = 0
        let res = [
            [0, 0, 0, 0]
        ]
        expect(isArrayEqual(fourSum(arr, target), res)).to.equal(true)
    })

    it('test nums = [2, 1, 0, -1], target = 2', () => {
        let arr = [2, 1, 0, -1]
        let target = 2
        let res = [
            [-1, 0, 1, 2]
        ]
        expect(isArrayEqual(fourSum(arr, target), res)).to.equal(true)
    })
})
