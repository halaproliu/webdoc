function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val)
    this.left = (left===undefined ? null : left)
    this.right = (right===undefined ? null : right)
}

// 二叉树的最大深度
function maxDepth(root) {
    if (!root) return 0
    const left = maxDepth(root.left)
    const right = maxDepth(root.right)
    return Math.max(left, right) + 1
}