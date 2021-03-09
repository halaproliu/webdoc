import findSubstring from '../src/findSubstring'
import { expect } from 'chai'

describe('findSubstring', () => {
    it ('test s="barfoothefoobarman", words = ["foo","bar"], ans = [0, 9]', () => {
        let ans = findSubstring('barfoothefoobarman', ["foo","bar"])
        expect(ans).to.have.members([0, 9])
    })

    it ('test s="wordgoodgoodgoodbestword", words = ["word","good","best","word"], ans = [0, 9]', () => {
        let ans = findSubstring('wordgoodgoodgoodbestword', ["word","good","best","word"])
        expect(ans).to.be.empty
    })
})
