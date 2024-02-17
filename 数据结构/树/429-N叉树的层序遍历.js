// 给定一个 N 叉树，返回其节点值的层序遍历。（即从左到右，逐层遍历）。
// 树的序列化输入是用层序遍历，每组子节点都由 null 值分隔（参见示例）。

//        1
//    /   |    \
//   3    2     4
//  / \
// 5   6
// 输入：root = [1,null,3,2,4,null,5,6]
// 输出：[[1],[3,2,4],[5,6]]


//           1
//    /   |     |    \
//   2    3     4     5
//      / \     |     / \ 
//     6   7    8    9   10
//         |    |    |
//         11   12   13
//         |    
//         14    
// 输入：root = [1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]
// 输出：[[1],[2,3,4,5],[6,7,8,9,10],[11,12,13],[14]]

/**
 * // Definition for a Node.
 * function Node(val,children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */


/**
 * @param {Node|null} root
 * @return {number[][]}
 */
// 方法一：广度优先搜索
// 对于「层序遍历」的题目，直接使用广度优先搜索。在广度优先搜索的每一轮，我们会遍历同一层的所有节点。
// 具体地
// 我们先把根节点 root 放入队列中，随后在广度优先搜索的每一轮中，记录下当前队列中的节点数量（记作 count），即表示当前层的节点个数，然后从队列中依次取出节点，直到取出当前层的全部 count 个节点位置。
// 当取出节点 curNode 时，我们将 curNode 当值放入一个临时数组（记作 level）中，再将 curNode 的所有子节点全部存入队列中。
// 当一轮遍历完成后，临时数组 level 中存放的既是当前层的所有节点值，这样一来，当整个广度优先搜索完成后，我们就可以得到层序遍历的结果。
var levelOrder = function (root) {
    // 判断树为空的情况
    if (root === null) return [];
    const res = [];
    const queue = [root];
    while (queue.length !== 0) {
        // 记录当前层结点数量
        const count = queue.length;
        // 临时数组，用于存储当前层的全部节点 最后一起加入结果数组 res 中
        const level = [];
        for (let i = 0; i < count; i++) {
            const curNode = queue.shift();
            level.push(curNode.val);
            // 记录当前层节点的子节点，入栈用于下层遍历。
            for (let childNode of curNode.children) {
                queue.push(childNode);
            }
        }
        res.push(level);
    }
    return res;
};
// 时间复杂度：O(n)，n 为数中包含的节点个数。在广度优先搜索过程中，我们需要遍历每一个节点恰好一次。
// 空间复杂度：O(n)，为队列需要使用的空间，在最坏情况为树只有两层，且最后一层有 n-1 个节点，此时就需要O(n)的空间。
