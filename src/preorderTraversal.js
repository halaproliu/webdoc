// 二叉树的前序遍历
function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val)
    this.left = (left===undefined ? null : left)
    this.right = (right===undefined ? null : right)
}
// 递归
function preorderTraversal(root) {
    function preorder(root, res = []) {
        if (!root) return res
        res.push(root.val)
        preoder(root.left, res)
        preoder(root.right, res)
        return res
    }
    return preorder(root)
}

// 栈
function preorderTraversal(root) {
    if (root === null) return []
    const res = []
    const stack = []
    stack.push(root)
    while (stack.length) {
        const cur = stack.pop()
        res.push(cur.val)
        // 右侧必须在前，栈是先进后出的
        if (cur.right !== null) stack.push(cur.right)
        if (cur.left !== null) stack.push(cur.left)
    }
    return res
}