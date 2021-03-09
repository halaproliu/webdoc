import romanToInt from '../src/romanToInt'
import { expect } from 'chai'

describe('romanToInt', () => {
    it('test III === 3', () => {
        expect(romanToInt('III')).to.equal(3)
    })

    it('test IV === 4', () => {
        expect(romanToInt('IV')).to.equal(4)
    })

    it('test IX === 9', () => {
        expect(romanToInt('IX')).to.equal(9)
    })

    it('test LVIII === 58', () => {
        expect(romanToInt('LVIII')).to.equal(58)
    })

    it('test MCMXCIV === 1994', () => {
        expect(romanToInt('MCMXCIV')).to.equal(1994)
    })
})
