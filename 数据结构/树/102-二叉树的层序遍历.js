// 给你二叉树的根节点 root ，返回其节点值的 层序遍历 。 （即逐层地，从左到右访问所有节点）。

//   3
//  / \
// 9  20
//   /  \
//  15   7
// 输入：root = [3,9,20,null,null,15,7]
// 输出：[[3],[9,20],[15,7]]

// 输入：root = [1]
// 输出：[[1]]

// 输入：root = []
// 输出：[]

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
 * @return {number[][]}
 */
// 方法一：BFS广度优先搜索
var levelOrder = function (root) {
    const res = []; // 存放结果数组
    if (root === null) return res;
    // 声明队列，用于存储下一层需要遍历的结点
    const queue = [];
    queue.push(root);
    // 遍历队列
    while (queue.length !== 0) {
        // 针对本轮操作，创建一个新的二维数组，对于本层找到的结点值都存储在该数组中。
        res.push([]);
        const len = queue.length; // 记录本层结点数
        for (let i = 0; i < len; i++) {
            // 将遍历过的结点出队
            const curNode = queue.shift();
            res[res.length - 1].push(curNode.val);
            // 检测该结点是否存在左右子结点，有则入队，作为下一层的遍历结点
            if (curNode.left) queue.push(curNode.left);
            if (curNode.right) queue.push(curNode.right);
        }
    }
    return res;
};
// 时间复杂度：O(n)，n 为二叉树的结点数目，每一个结点入队出队各一次。
// 空间复杂度：O(n)，n 为二叉树的结点数目，队列中存储的结点数目不超过 n 个。
