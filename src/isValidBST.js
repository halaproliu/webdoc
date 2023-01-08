function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val)
    this.left = (left===undefined ? null : left)
    this.right = (right===undefined ? null : right)
}

// 验证二叉搜索树
function isValidBST(root) {
    function helper(root, lower, upper) {
        if (!root) return true
        if (root.val <= lower || root.val >= upper) return false
        return helper(root.left, lower, root.val) && helper(root.right, root.val, upper)
    }
    return helper(root, -Infinity, Infinity)
}