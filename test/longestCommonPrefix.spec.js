import longestCommonPrefix from '../src/longestCommonPrefix'
import { expect } from 'chai'

describe('longestCommonPrefix', () => {
    it('violence function', () => {
        expect(longestCommonPrefix(["flower","flow","flight"])).to.equal('fl')
        expect(longestCommonPrefix(["dog","racecar","car"])).to.equal('')
        expect(longestCommonPrefix(["a"])).to.equal('a')
        expect(longestCommonPrefix(["c", "c"])).to.equal('c')
        expect(longestCommonPrefix(["aaa", "aa", "aaa"])).to.equal('aa')
        expect(longestCommonPrefix(["c", "acc", "ccc"])).to.equal('')
    })
})
