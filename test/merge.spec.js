import merge from '../src/merge'
import { expect } from 'chai'

describe('merge', () => {
    it('nums1 = [1,2,3,0,0,0],m=3,nums2 = [2, 5, 6],n=3', () => {
        const arr = [
            [1,2,3,0,0,0],
            3,
            [2, 5, 6],
            3
        ]
        merge(arr[0], arr[1], arr[2], arr[3])
        expect(arr[0]).to.deep.equal([1,2,2,3,5,6])
    })

    it('nums1 = [0],m=1,nums2=[1],n=1', () => {
        const arr = [
            [0],
            0,
            [1],
            1
        ]
        merge(arr[0], arr[1], arr[2], arr[3])
        expect(arr[0]).to.deep.equal([1])
    })

    it('nums1 = [2,0],m=1,nums2 = [1],n=1', () => {
        const arr = [
            [2,0],
            1,
            [1],
            1
        ]
        merge(arr[0], arr[1], arr[2], arr[3])
        expect(arr[0]).to.deep.equal([1,2])
    })
})
