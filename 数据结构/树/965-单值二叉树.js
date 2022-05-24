// 如果二叉树每个节点都具有相同的值，那么该二叉树就是单值二叉树。
// 只有给定的树是单值二叉树时，才返回 true；否则返回 false。


//     1   
//    / \ 
//   1   1
//  / \   \
// 1   1   1
// 输入：[1,1,1,1,1,null,1]
// 输出：true

//     2   
//    / \ 
//   2   2
//  / \  
// 5   2    
// 输入：[2,2,2,5,2]
// 输出：false


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
 * @return {boolean}
 */
// 方法一：DFS
var isUnivalTree = function (root) {
    if (root === null) return true; // 递归出口

    if (root.left !== null && root.left.val !== root.val) return false;

    if (root.right !== null && root.right.val !== root.val) return false;

    return isUnivalTree(root.left) && isUnivalTree(root.right);
};
// 时间复杂度：O(n)，n为二叉树的节点数，我们遍历二叉树的每个节点至多一次。
// 空间复杂度：O(n)，为递归使用的栈开销。
