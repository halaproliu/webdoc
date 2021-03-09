import { violence, hashmap } from '../src/twoSum'
import { expect } from 'chai'

function test (fn, nums, target, result) {
  expect(fn(nums, target)).include(result[0])
  expect(fn(nums, target)).include(result[1])
  expect(fn(nums, target)[0]).to.equal(result[0])
  expect(fn(nums, target)[1]).to.equal(result[1])
}

describe('twoSum', () => {
  it('violence nums=[2, 7, 11, 15], target=9', () => {
    test(violence, [2, 7, 11, 15], 9, [0, 1])
  })
  it('violence nums=[2, 7, 11, 15], target=22', () => {
    test(violence, [2, 7, 11, 15], 22, [1, 3])
  })

  it('hashmap nums=[2, 7, 11, 15], target=9', () => {
    test(hashmap, [2, 7, 11, 15], 9, [0, 1])
  })
  it('hashmap nums=[2, 7, 11, 15], target=22', () => {
    test(hashmap, [2, 7, 11, 15], 22, [1, 3])
  })
})
