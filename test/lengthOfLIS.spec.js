import lengthOfLIS from '../src/lengthOfLIS'
import { expect } from 'chai'

describe('最长递增子序列', () => {
    it('输入：nums = [10,9,2,5,3,7,101,18]', () => {
        var len = lengthOfLIS([10,9,2,5,3,7,101,18])
        expect(len).to.equal(4)
    })

    it('输入：nums = [0,1,0,3,2,3]', () => {
        var len = lengthOfLIS([0,1,0,3,2,3])
        expect(len).to.equal(4)
    })

    it('输入：nums = [7,7,7,7,7,7,7]', () => {
        var len = lengthOfLIS([7,7,7,7,7,7,7])
        expect(len).to.equal(1)
    })
})
  