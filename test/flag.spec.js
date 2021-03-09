import flat from '../src/flat'
import { expect } from 'chai'

describe('flat', () => {
    it('input=[[1,2,2],[3,4,5,5],[6,7,8,9,[11,12,[12,13,[14]]]],10]', () => {
        let arr = [[1,2,2],[3,4,5,5],[6,7,8,9,[11,12,[12,13,[14]]]],10]
        let res = [1,2,3,4,5,6,7,8,9,10,11,12,13,14]
        expect(flat(arr)).to.deep.equal(res)
    })
})
