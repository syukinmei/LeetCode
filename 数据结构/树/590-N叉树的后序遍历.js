// 给定一个 n 叉树的根节点 root ，返回 其节点值的 后序遍历 。
// n 叉树 在输入中按层序遍历进行序列化表示，每组子节点由空值 null 分隔（请参见示例）。
//        1
//    /   |    \
//   3    2     4
//  / \
// 5   6

// 输入：root = [1,null,3,2,4,null,5,6]
// 输出：[5,6,3,2,4,1]

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
// 输出：[2,6,14,11,7,3,12,8,4,13,9,10,5,1]

/**
 * // Definition for a Node.
 * function Node(val,children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

/**
 * @param {Node|null} root
 * @return {number[]}
 */
// 方法一：递归
// 每次递归时，先递归访问每个孩子节点，然后再访问根节点即可。
// 递归函数的含义：
// 对 N 叉树进行后序遍历，并将遍历得到的节点值添加到结果数组中。
// 递归边界：
// 当前节点为空。直接返回。
// 递归内容：
// 遍历所有子节点，并对每个子节点进行递归处理。
// 递归返回值：无
var postorder = function (root) {
    // 用于存储遍历的结果
    const res = [];
    // 定义递归函数
    const postorder = function (root) {
        if (root === null) return; // 设置递归出口，当前节点为空时直接返回
        // 后序遍历所有子节点
        for (const childNode of root.children) {
            postorder(childNode);
        }
        // 记录遍历到的根节点值
        res.push(root.val);
    };

    // 调用递归函数从根节点开始后序遍历
    postorder(root);
    return res;
};
// 时间复杂度：O(n)，n 为 N叉树的节点数，每个节点只被访问一次。
// 空间复杂度：O(n)，为递归过程中栈道开销，平均情况为O(logn)，最坏情况为树呈现链状，为O(n)。
