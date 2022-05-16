// 设计一个算法，找出二叉搜索树中指定节点的“下一个”节点（也即中序后继）。
// 如果指定节点没有对应的“下一个”节点，则返回null。

// 输入: root = [2,1,3], p = 1

//   2
//  / \
// 1   3

// 输出: 2


// 输入: root = [5,3,6,2,4,null,null,1], p = 6

//       5
//      / \
//     3   6
//    / \
//   2   4
//  /   
// 1

// 输出: null


/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @return {TreeNode}
 */
// 方法一：中序遍历递归
var inorderSuccessor = function (root, p) {
    let prev = null;
    let res = null;
    const inorder = function (root) {
        if (root === null) return;

        inorder(root.left);
        if (prev === p) { // 上个节点为p则将res赋值为当前节点值
            res = root;
        }
        prev = root;
        inorder(root.right)
    }
    inorder(root);
    return res;
};
// 时间复杂度：O(n)，n为二叉树的节点数，每一个节点都且只被遍历一次。
// 空间复杂度：O(n)，为递归过程中栈的开销，平均情况为O(logn)，最坏情况为树呈现链状，为O(n)。
