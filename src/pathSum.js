/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {number[][]}
 */
var pathSum = function(root, targetSum) {
    const arr = []
    const path = []
    const dfs = (root, path, arr, sum) => {
        if (!root) return
        path.push(root.val)
        if (root.val === sum && root.left === null && root.right === null) {
            arr.push([...path])
        }
        dfs(root.left, path, arr, sum - root.val)
        dfs(root.right, path, arr, sum - root.val)
        path.pop()
    }
    dfs(root, path, arr, targetSum)
    return arr
};