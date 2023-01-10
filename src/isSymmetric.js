/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
import { ListNode } from "../utils/listNode";
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isSymmetric = function(root) {
    const check = (p, q) => {
        if (!p && !q) return true
        if (!p || !q) return false
        return p.val === q.val && check(p.left, q.right) && check(p.right, q.left)
    }
    return check(root, root)
};

export default isSymmetric