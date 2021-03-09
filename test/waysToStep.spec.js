import waysToStep from '../src/waysToStep'
import { expect } from 'chai'

describe('waysToStep', () => {
    it('test n=1', () => {
        expect(waysToStep(1)).to.equal(1)
    })
    it('test n=2', () => {
        expect(waysToStep(2)).to.equal(2)
    })
    it('test n=3', () => {
        expect(waysToStep(3)).to.equal(4)
    })
    it('test n=5', () => {
        expect(waysToStep(5)).to.equal(13)
    })
    it('test n=999999', () => {
        expect(waysToStep(999999)).to.equal(71313044)
    })
})
