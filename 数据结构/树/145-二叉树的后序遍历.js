// 给你一棵二叉树的根节点 root ，返回其节点值的 后序遍历 。

// 输入：root = [1,null,2,3]
// 输出：[3,2,1]

// 输入：root = []
// 输出：[]

// 输入：root = [1]
// 输出：[1]

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
 var postorderTraversal = function (root) {
    // 用于存储遍历的结果
    const res = [];
    const postorder = function (root) { // 参数 root 为每个子树的根结点
        if (root === null) return; // 设置递归出口
        // 后序遍历左子树
        postorder(root.left);
        // 后序遍历右子树
        postorder(root.right);
        // 记录遍历到的根节点值
        res.push(root.val);
    }
    postorder(root);
    return res;
};
// 时间复杂度：O(n)，n 为二叉树的节点，每一个节点只被遍历一次。
// 空间复杂度：O(n)，为递归过程中栈的开销，平均情况为O(logn)，最坏情况为树呈现链状，为O(n)。

// 方法三：取巧 + 反转
// 后序遍历为 左右根 ，我们可以 根右左 遍历，然后反转。
// 或者我们在加入结果数组是使用 unshift 的方式加入。
var postorderTraversal = function (root) {
    if (root === null) return [];
    // 用于存储遍历的结果
    const res = [];
    // 用于存储未遍历的左子树
    const stack = [root];
    // 迭代二叉树 栈中有值
    while (stack.length !== 0) {
        const curNode = stack.pop();
        res.push(curNode.val); // 记录根节点
        if (curNode.left !== null) stack.push(curNode.left);
        if (curNode.right !== null) stack.push(curNode.right);
    }
    return res.reverse(); // 将 根右左 反转成后序遍历的 左右根
};
// 时间复杂度：O(n)，n 为二叉树的节点，每一个节点只被遍历一次。
// 空间复杂度：O(n)，为迭代过程中显示栈的开销，平均情况为O(logn)，最坏情况为树呈现链状，为O(n)。


