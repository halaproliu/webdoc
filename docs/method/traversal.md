# 实现前序遍历、中序遍历和后序遍历

### 生成二叉树

```js
// Node节点
class Node {
    constructor (key) {
        this.key = key
        this.left = null
        this.right = null
    }
}

// 生成二叉树
class BinaryTree {
    constructor () {
        this.root = null
    }

    insert (key) {
        // 初始化节点
        let node = new Node(key)
        // 如果根节点为空，则新节点作为根节点
        if (!this.root) {
            this.root = node
        }
        this.insertNode(this.root, node)
    }

    insertNode (node, child) {
        if (child.key < node.key) {
            if (!node.left) {
                node.left = child
            } else {
                this.insertNode(node.left, child)
            }
        } else if (child.key > node.key) {
            if (!node.right) {
                node.right = child
            } else {
                this.insertNode(node.right, child)
            }
        }
    }
}
```

下面生成一个二叉树

```js
let binaryTree = new BinaryTree()
let keys = [19, 8, 15, 24, 45, 12, 5]
keys.forEach(key => binaryTree.insert(key))
console.log(binaryTree)
```

### 前序遍历

- 递归方式

```js
let preOrderTraversal = function (node, res = []) {
    if (node !== null) {
        res.push(node.key)
        preOrderTraversal(node.left, res)
        preOrderTraversal(node.right, res)
    }
}
```

- 栈方式

```js
let preOrderTraversal = function (root) {
    let res = []
    let stack = []
    let node = root
    while (node !== null || stack.length) {
        if (node !== null) {
            res.push(node.key)
            stack.push(node)
            node = node.left
        } else {
            node = stack.pop()
            node = node.right
        }
    }
    return res
}
```

### 中序遍历

- 递归方式

```js
// 中序遍历
let inOrderTraversal = function (node, res = []) {
    if (node !== null) {
        inOrderTraversal(node.left, res)
        res.push(node.key)
        inOrderTraversal(node.right, res)
    }
}
```

- 栈方式

```js
let inOrderTraversal = function (root) {
    let res = []
    let stack = []
    let node = root
    while (node !== null || stack.length) {
        if (node !== null) {
            stack.push(node)
            node = node.left
        } else {
            node = stack.pop()
            res.push(node.key)
            node = node.right
        }
    }
    return res
}
```

### 后序遍历

- 递归方式

```js
// 后序遍历
let afterOrderTraversal = function (node, res = []) {
    if (node !== null) {
        res.push(node.key)
        afterOrderTraversal(node.left, res)
        afterOrderTraversal(node.right, res)
    }
}
```

- 栈方式

```js
let afterOrderTraversal = function (root) {
    let res = []
    let stack = []
    let node = root
    while (node !== null || stack.length) {
        if (node !== null) {
            stack.push(node)
            res.push(node.key)
            node = node.left
        } else {
            node = stack.pop()
            node = node.right
        }
    }
    return res
}
```

先序遍历：在第一次遍历到节点时就执行操作，一般只是想遍历执行操作（或输出结果）可选用先序遍历；
中序遍历：对于二分搜索树，中序遍历的操作顺序（或输出结果顺序）是符合从小到大（或从大到小）顺序的，故要遍历输出排序好的结果需要使用中序遍历
后序遍历：后续遍历的特点是执行操作时，肯定已经遍历过该节点的左右子节点，故适用于要进行破坏性操作的情况，比如删除所有节点
后序遍历的最后一个节点为根节点，中序遍历可以确认节点左边的为左节点，右边的为右节点
前序遍历的第一个节点为根节点
