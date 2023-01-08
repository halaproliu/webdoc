function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val)
    this.left = (left===undefined ? null : left)
    this.right = (right===undefined ? null : right)
}

// 二叉树的后序遍历
function postorderTraversal(root) {
    if (!root) return []
    const res = []
    const stack = []
    stack.push(root)
    while(stack.length) {
        const cur = stack.pop()
        res.unshift(cur.val)
        if (cur.left !== null) stack.push(cur.left)
        if (cur.right !== null) stack.push(cur.right)
    }
    return res
}