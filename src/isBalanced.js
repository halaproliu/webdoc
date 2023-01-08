
function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val)
    this.left = (left===undefined ? null : left)
    this.right = (right===undefined ? null : right)
}
// 平衡二叉树
function isBalanced(root) {
    if (!root) return true
    function maxDepth(root) {
        if (!root) return 0
        // 计算最大深度，每递归一次+1层深度
        return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1
    }
    return isBalanced(root.left) && isBalanced(root.right) && Math.abs(maxDepth(root.left) - maxDepth(root.right)) <= 1
}