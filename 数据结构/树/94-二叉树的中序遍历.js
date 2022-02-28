// 给定一个二叉树的根节点 root ，返回它的 中序 遍历。

//  1
//   \
//    2
//   /
//  3
// 输入：root = [1,null,2,3]
// 输出：[1,3,2]

// 输入：root = []
// 输出：[]

// 输入：root = [1]
// 输出：[1]

// 输入：root = [1,2]
// 输出：[2,1]

// 输入：root = [1,null,2]
// 输出：[1,2]



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
 * @return {number[]}
 */
// 方法一：递归
var inorderTraversal = function (root) {
    const res = [];
    const inorder = function (root) {
        if (root === null) return;
        inorder(root.left);
        res.push(root.val);
        inorder(root.right);
    }
    inorder(root);
    return res;
};
// 时间复杂度：O(n)，n 为二叉树的节点，每一个节点只被遍历一次。
// 空间复杂度：O(n)，为递归过程中栈道开销，平均情况为O(logn)，最坏情况为树呈现链状，为O(n)。


// 方法二：迭代
// 思路：
// 额外声明一个栈，迭代二叉树
// 如果当前结点不为空就把当前结点入栈，然后节点指向左子树进行迭代。
// 当迭代的右子树为空时，栈顶的第一个节点就是我们需要记录的第一个节点，出栈并记录。
// 然后节点指向右子树进行迭代。
var inorderTraversal = function (root) {
    const res = [];
    const stack = [];
    while (root !== null || stack.length !== 0) {
        if (root !== null) {
            stack.push(root);
            root = root.left;
        } else {
            root = stack.pop();
            res.push(root.val);
            root = root.right;
        }
    }
    return res;
};

var inorderTraversal = function (root) {
    const res = [];
    const stack = [];
    while (root !== null || stack.length !== 0) {
        while (root !== null) {
            stack.push(root);
            root = root.left;
        }
        root = stack.pop();
        res.push(root.val);
        root = root.right;
    }
    return res;
};
// 时间复杂度：O(n)，n 为二叉树的节点，每一个节点只被遍历一次。
// 空间复杂度：O(n)，为迭代过程中显示栈道开销，平均情况为O(logn)，最坏情况为树呈链状，为O(n)。
