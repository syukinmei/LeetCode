// 给定一个二叉树，找出其最大深度。

// 二叉树的深度为根节点到最远叶子节点的最长路径上的节点数。

// 说明: 叶子节点是指没有子节点的节点。

// 示例：
// 给定二叉树 [3,9,20,null,null,15,7]，
//   3
//  / \
// 9  20
//   /  \
//  15   7
// 返回它的最大深度 3 。

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
 * @return {number}
 */
// 方法一：递归 DFS
// 对于任意节点的最大深度 = max(其左子树的最大深度, 其右子树的最大深度) + 1
// 因此，可以通过递归遍历每个节点，不断计算左右子树的最大深度，最终返回整个二叉树的最大深度。

// 递归函数的含义：
// 计算以当前节点为根的子树的最大深度
// 递归边界：
// 当前节点为空，空节点的深度为 0，直接返回 0
// 递归内容：
// 计算当前节点左右子树的最大深度。
// 递归返回值：
// 以当前节点为根的子树的最大深度，即为左右子树深度的较大值加1。
var maxDepth = function (root) {
    if (root === null) return 0; // 递归设置出口
    // 计算左子树的最大深度
    const leftDepth = maxDepth(root.left);
    // 计算右子树的最大深度
    const rightDepth = maxDepth(root.right);
    return 1 + Math.max(leftDepth, rightDepth);
};
// 时间复杂度：O(n)，n 为二叉树的结点数目，每一个节点只被遍历一次。
// 空间复杂度：O(n)，n 为二叉树的深度，递归函数需要栈空间，栈空间取决于递归的深度。

// 方法二：BFS
// 时间复杂度：O(n)，n 为二叉树的结点数目，每一个结点入队出队各一次。
// 空间复杂度：O(n)，n 为二叉树的结点数目，队列中存储的结点数目不超过 n 个。
