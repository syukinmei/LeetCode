// 给你一棵二叉树的根节点 root 和一个正整数 k 。
// 树中的 层和 是指 同一层 上节点值的总和。
// 返回树中第 k 大的层和（不一定不同）。如果树少于 k 层，则返回 -1 。
// 注意，如果两个节点与根节点的距离相同，则认为它们在同一层。

//           5
//         /    \
//        8      9
//      /  \    / \
//     2    1  3   7
//    / \
//   4   6
// 输入：root = [5,8,9,2,1,3,7,4,6], k = 2
// 输出：13
// 解释：树中每一层的层和分别是：
// - Level 1: 5
// - Level 2: 8 + 9 = 17
// - Level 3: 2 + 1 + 3 + 7 = 13
// - Level 4: 4 + 6 = 10
// 第 2 大的层和等于 13 。

//        1
//      /
//     2
//   /
//  3
// 输入：root = [1,2,null,3], k = 1
// 输出：3
// 解释：最大的层和是 3 。

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
 * @param {number} k
 * @return {number}
 */
// 方法一：广度优先搜索 + 排序
// 因为需要计算每层的层和，显而易见直接使用 BFS 进行层序遍历，记录每层的节点和，最后对其进行排序，返回第 k 大的节点和即可。注意，如果二叉树的层数小于 k，则返回 -1。
var kthLargestLevelSum = function (root, k) {
    const sums = []; // 存放层和数组，第 i 层的层和即 sums[i]。

    if (root === null) return -1; // 题目用例 k >= 1

    // 声明队列，用于存储下一层需要遍历的节点
    const queue = [root];

    // 遍历队列
    while (queue.length !== 0) {
        let levelSum = 0; // 记录本层节点和
        const len = queue.length; // 记录本层节点数
        for (let i = 0; i < len; i++) {
            // 将遍历过的节点出队，并累加层和。
            const curNode = queue.shift();
            levelSum += curNode.val;

            // 检测当前节点是否存在左右子节点，有则入队，作为下一层的遍历节点。
            if (curNode.left) queue.push(curNode.left);
            if (curNode.right) queue.push(curNode.right);
        }
        // 完整遍历完整层后，将当前层和存储到 sums 层和数组中
        sums.push(levelSum);
    }

    // 考虑二叉树层数长度小于 k 的边界情况
    if (sums.length < k) return -1;

    // 将层和数组进行「降序排序」，第 k 大元素即 二叉树中第 k 大层和，将其返回即可。
    sums.sort((a, b) => b - a);
    return sums[k - 1];
};
// 时间复杂度：O(nlogn)，n 为二叉树的节点数目，BFS 时每个节点入队出队各一次，因此其耗时为 O(n)，排序需要 O(nlogn)的时间，因此总的时间复杂度为 O(nlogn)。
// 空间复杂度：O(logn)，n 为二叉树的节点数目，BFS 时需要一个队列存储节点数目，其最多不超过 n 个，而快排需要 O(logn) 的递归栈空间，因此总的空间复杂度为 O(logn)。

// 方法二：深度优先搜索 + 排序
// 思路和方法一一样，只是在计算每层的层和时，采用 DFS 进行层序遍历。
// TODO DFS 代码

// 方法三：小顶堆优化快排
// 因为要返回「第 k 大的层和」，因此可以使用一个大小为 k 的小顶堆。
// 具体的：
// 将每一层的节点和加入堆，然后维护这个堆的尺寸不超过 k，如果最终堆的大小为 k，堆顶元素即为第 k 大层和。如果堆的大小小于 k，说明二叉树的层小于 k ，返回 -1。
// 因为 js 没有提供原生的堆，所以就不提供代码了 Orz
