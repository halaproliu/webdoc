import threeSum from '../src/threeSum'
import { expect } from 'chai'

describe('threeSum', () => {
    it('test [-1, 0, 1, 2, -1, -4]', () => {
        let arr = [-1, 0, 1, 2, -1, -4]
        let res = [
            [-1, 0, 1],
            [-1, -1, 2]
        ]
        expect(threeSum(arr)).to.have.deep.members(res)
    })
})
