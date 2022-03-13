// 给定一个 n 叉树的根节点  root ，返回 其节点值的 前序遍历 。
// n 叉树 在输入中按层序遍历进行序列化表示，每组子节点由空值 null 分隔（请参见示例）。
//        1
//    /   |    \
//   3    2     4
//  / \
// 5   6

// 输入：root = [1,null,3,2,4,null,5,6]
// 输出：[1,3,5,6,2,4]


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
// 输出：[1,2,3,6,7,11,14,4,8,12,5,9,13,10]

/**
 * // Definition for a Node.
 * function Node(val, children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

/**
 * @param {Node|null} root
 * @return {number[]}
 */
// 方法一：递归
var preorder = function (root) {
    if (root === null) [];
    const res = [];
    const helper = function (root) {
        if (root === null) return; // 设置递归出口
        res.push(root.val); // 记录遍历到的根节点值
        for (let subtree of root.children) {
            helper(subtree); // 前序遍历子树
        }
    }
    helper(root);
    return res;
};
// 时间复杂度：O(n)，n 为 N叉树的节点，每一个节点只被遍历一次。
// 空间复杂度：O(n)，为递归过程中栈道开销，平均情况为O(logn)，最坏情况为树呈现链状，为O(n)。

// 方法二：迭代
var preorder = function (root) {
    if (root === null) return [];
    const res = [];
    const stack = [];
    stack.push(root);
    while (stack.length !== 0) {
        root = stack.pop(); // 栈底元素作为根节点 记录并遍历子树
        res.push(root.val); // 记录节点
        for (let i = root.children.length - 1; i >= 0; i--) {
            stack.push(root.children[i]);
        }
    }
    return res;
};