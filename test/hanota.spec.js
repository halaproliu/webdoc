import hanota from '../src/hanota'
import { expect } from 'chai'

describe('hanota', () => {
    it('test A = [2, 1, 0], B = [], C = []', () => {
        let A = [2, 1, 0], B = [], C = []
        let res = hanota(A, B, C)
        expect(JSON.stringify(res)).to.equal(JSON.stringify([2, 1, 0]))
    })

    it('test A = [1, 0], B = [], C = []', () => {
        let A = [1, 0], B = [], C = []
        let res = hanota(A, B, C)
        expect(JSON.stringify(res)).to.equal(JSON.stringify([1, 0]))
    })
})
