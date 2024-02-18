// 给定一个二叉树的 根节点 root，请找出该二叉树的 最底层 最左边 节点的值。
// 假设二叉树中至少有一个节点。

//     2
//   /   \
//  1     3

// 输入: root = [2,1,3]
// 输出: 1

//             1
//          /    \
//         2       3
//       /        /  \
//      4        5    6
//              /
//             7

// 输入: [1,2,3,4,null,5,6,null,null,7]
// 输出: 7

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
// 方法一：BFS
// 题目要找到最后一层最左边的节点，那既然要考虑到层次，就可以很快想到层序遍历的思想。
// 使用层序遍历遍历每一层的节点，在遍历一个节点时，优先将非空的右子节点放入队列，然后再将非空左子节点放入队列。
// 这样可以确保「从右到左」遍历每一层节点。此时，层序遍历的最后一个节点就是最底层最左边的节点。
var findBottomLeftValue = function (root) {
    let res = null;
    // 声明队列，用于存储下一层需要遍历的结点
    const queue = [root];

    while (queue.length !== 0) {
        // 记录当前层结点数量
        const count = queue.length;

        // 更新当前层最左侧的节点值
        res = queue[count - 1].val;

        for (let i = 0; i < count; i++) {
            // 将遍历过的结点出队
            const curNode = queue.shift();
            // 「从右到左」将子节点加入队列
            if (curNode.right) queue.push(curNode.right);
            if (curNode.left) queue.push(curNode.left);
        }
    }

    return res;
};
// 时间复杂度：O(n)，n 为二叉树的节点数目，每一个结点入队出队各一次。
// 空间复杂度：O(n)，取决于队列中存储的节点数量，即最多是一层的节点数量。在最坏情况下，二叉树是一个完全二叉树，此时一层的节点数量为 n/2。因此，空间复杂度是 O(n/2)，简化后仍为 O(n)。

// 方法二：BFS优化
// 我们发现这道题虽然我们用到了层序遍历，但是我们不关心哪些节点属于同一层，即不需要分层处理。
// 因此，我们可以忽略 count 当前层结点数量字段。也不需要循环每层结点。而是只做「从右到左的层序遍历」对于每个节点都更新 res 。依据这个顺序遍历完所有节点，res 既是最底层最左边的节点。
var findBottomLeftValue = function (root) {
    let res = null;
    // 声明队列，用于存储下一层需要遍历的结点
    const queue = [root];

    while (queue.length !== 0) {
        // 将遍历过的结点出队
        const curNode = queue.shift();

        // 更新 res 节点值
        res = curNode.val;

        // 「从右到左」将子节点加入队列
        if (curNode.right) queue.push(curNode.right);
        if (curNode.left) queue.push(curNode.left);
    }

    // 此时 res 既是最底层最左边的节点
    return res;
};
// 时间复杂度和空间复杂度同方法一。
