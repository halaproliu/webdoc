import numberOfSubarrays from '../src/numberOfSubarrays'
import { expect } from 'chai'

describe('numberOfSubarrays', () => {
    it('numberOfSubarrays test [1,1,2,1,1] with 3', () => {
        expect(numberOfSubarrays([1,1,2,1,1], 3)).to.equal(2)
    })
    it('numberOfSubarrays test [2,4,6] with 1', () => {
        expect(numberOfSubarrays([2,4,6], 1)).to.equal(0)
    })
})
