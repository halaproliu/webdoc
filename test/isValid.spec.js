import isValid from '../src/isValid'
import { expect } from 'chai'

describe('isValid', () => {
    it('test s="()"', () => {
        expect(isValid('()')).to.equal(true)
    })

    it('test s="()[]{}"', () => {
        expect(isValid('()[]{}')).to.equal(true)
    })

    it('test s="(]"', () => {
        expect(isValid('(]')).to.equal(false)
    })

    it('test s="([)]"', () => {
        expect(isValid('([)]')).to.equal(false)
    })

    it('test s="{[]}"', () => {
        expect(isValid('{[]}')).to.equal(true)
    })

    it('test s="[({(())}[()])]"', () => {
        expect(isValid('[({(())}[()])]')).to.equal(true)
    })
})
