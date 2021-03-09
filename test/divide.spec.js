import divide from '../src/divide'
import { expect } from 'chai'

describe('divide', () => {
    it('test dividend = 10, divisor = 3, ans = 3', () => {
        expect(divide(10, 3)).to.equal(3)
    })

    it('test dividend = 7, divisor = -3, ans = -2', () => {
        expect(divide(7, -3)).to.equal(-2)
    })

    it('test dividend = -2147483648, divisor = -1, ans = 2147483647', () => {
        expect(divide(-2147483648, -1)).to.equal(2147483647)
    })

    it('test dividend = -2147483648, divisor = 1, ans = -2147483648', () => {
        expect(divide(-2147483648, 1)).to.equal(-2147483648)
    })

    it('test dividend = 2147483647, divisor = 2, ans = 1073741823', () => {
        expect(divide(2147483647, 2)).to.equal(1073741823)
    })
})
