// 给你二叉树的根节点 root ，返回它节点值的 前序 遍历。

// 输入：root = [1,null,2,3]
// 输出：[1,2,3]

// 输入：root = []
// 输出：[]

// 输入：root = [1]
// 输出：[1]

// 输入：root = [1,2]
// 输出：[1,2]

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
var preorderTraversal = function (root) {
    // 用于存储遍历的结果
    const res = [];
    const preorder = function (root) { // 参数root 为每个子树的根结点
        if (root === null) return; // 设置递归出口
        // 记录遍历到的根节点值
        res.push(root.val);
        // 前序遍历左子树
        preorder(root.left);
        // 前序遍历右子树
        preorder(root.right);
    };
    preorder(root);
    return res;
};
// 时间复杂度：O(n)，n 为二叉树的节点，每一个节点只被遍历一次。
// 空间复杂度：O(n)，为递归过程中栈道开销，平均情况为O(logn)，最坏情况为树呈现链状，为O(n)。


// 方法二：迭代
// 思路：
// 额外声明一个栈，迭代二叉树。
// 先遍历左子树，记录节点，并将之后要遍历的右子树存入栈中。
// 左子树遍历完，查看栈是否有值，有值则表示还有未遍历的右子树，栈顶的右子树出栈作为根节点继续迭代。
// 直到栈为空，结束循环。
var preorderTraversal = function (root) {
    // 用于存储遍历的结果
    const res = [];
    // 用于存储未遍历的右子树
    const stack = [];
    // 迭代二叉树 根节点不为null 或 栈中有值
    while (root !== null || stack.length) {
        // 遍历左子树
        while (root !== null) {
            res.push(root.val); // 记录根节点
            stack.push(root.right); // 未遍历的右子树入栈
            root = root.left; // 迭代
        }
        // 迭代 遍历右子树
        root = stack.pop();
    }
    return res;
};
// 时间复杂度：O(n)，n 为二叉树的节点，每一个节点只被遍历一次。
// 空间复杂度：O(n)，为迭代过程中显示栈道开销，平均情况为O(logn)，最坏情况为树呈链状，为O(n)。

