import { violence } from '../src/isPalindrome'
import { expect } from 'chai'

describe('isPalindrome', () => {
    it('violence function', () => {
        expect(violence(121)).to.equal(true)
        expect(violence(13231)).to.equal(true)
        expect(violence(12345)).to.equal(false)
        expect(violence(333)).to.equal(true)
        expect(violence(78987)).to.equal(true)
    })
})
