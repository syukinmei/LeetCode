// 给出一棵二叉树，其上每个结点的值都是 0 或 1 。每一条从根到叶的路径都代表一个从最高有效位开始的二进制数。
// 例如，如果路径为 0 -> 1 -> 1 -> 0 -> 1，那么它表示二进制数 01101，也就是 13 。
// 对树上的每一片叶子，我们都要找出从根到该叶子的路径所表示的数字。
// 返回这些数字之和。题目数据保证答案是一个 32 位 整数


//     1
//   /   \
//  0     1
// /  \  /  \
// 0   1  0   1
// 输入：root = [1,0,1,0,1,0,1]
// 输出：22
// 解释：(100) + (101) + (110) + (111) = 4 + 5 + 6 + 7 = 22

// 输入：root = [0]
// 输出：0

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
// 方法一：递归 + DFS
var sumRootToLeaf = function (root) {
    let sum = 0;
    function dfs(root, val) {
        if (root === null) return;
        val = (val << 1) + root.val;
        // val = val * 2 + root.val;
        if (root.left === null && root.right === null) sum += val;
        dfs(root.left, val);
        dfs(root.right, val);
    }
    dfs(root, 0);
    return sum;
};
// 时间复杂度：O(n)，n 为二叉树节点数目，总共需要访问 n 个节点。
// 空间复杂度：O(n)，递归栈需要O(n)的空间。
