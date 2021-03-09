import myAtoi from '../src/myAtoi'
import { expect } from 'chai'

describe('myAtoi', () => {
    it('myAtoi test "   -42"', () => {
        expect(myAtoi('   -42')).to.equal(-42)
    })
    it('myAtoi test "4193 with words"', () => {
        expect(myAtoi('4193 with words')).to.equal(4193)
    })
    it('myAtoi test "words and 987"', () => {
        expect(myAtoi('words and 987')).to.equal(0)
    })
    it('myAtoi test "-91283472332"', () => {
        expect(myAtoi('-91283472332')).to.equal(-Math.pow(2, 31))
    })
    it('myAtoi test "+"', () => {
        expect(myAtoi('+')).to.equal(0)
    })
    it('myAtoi test "-"', () => {
        expect(myAtoi('-')).to.equal(0)
    })
    it('myAtoi test "-+55"', () => {
        expect(myAtoi('-+55')).to.equal(0)
    })
    it('myAtoi test "  -0012a42', () => {
        expect(myAtoi("  -0012a42")).to.equal(-12)
    })
    it('myAtoi test "3.14159"', () => {
        expect(myAtoi("3.14159")).to.equal(3)
    })
    it('myAtoi test "   +0 123"', () => {
        expect(myAtoi("   +0 123")).to.equal(0)
    })
})
