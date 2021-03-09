import intToRoman from '../src/intToRoman'
import { expect } from 'chai'

describe('intToRoman', () => {
    it('test 3 === III', () => {
        expect(intToRoman(3)).to.equal('III')
    })

    it('test 4 === IV', () => {
        expect(intToRoman(4)).to.equal('IV')
    })

    it('test 9 === IX', () => {
        expect(intToRoman(9)).to.equal('IX')
    })

    it('test 58 === LVIII', () => {
        expect(intToRoman(58)).to.equal('LVIII')
    })

    it('test 1994 === MCMXCIV', () => {
        expect(intToRoman(1994)).to.equal('MCMXCIV')
    })

    it('test 4000 === ""', () => {
        expect(intToRoman(4000)).to.equal('')
    })
})
