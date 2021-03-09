import longestCommonSuffix from '../src/longestCommonSuffix'
import { expect } from 'chai'

describe('longestCommonSuffix', () => {
    it('nums=[620029, 318029, 404029, 1829]', () => {
        let nums = [620029, 318029, 404029, 1829]
        expect(longestCommonSuffix(nums)).to.equal('29')
    })
})
