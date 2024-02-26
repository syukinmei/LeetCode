// 给定二叉搜索树的根结点 root，返回值位于范围 [low, high] 之间的所有结点的值的和。

//            10
//          /    \
//         5      15
//       /   \      \
//      3     7      18
// 输入：root = [10,5,15,3,7,null,18], low = 7, high = 15
// 输出：32

//           10
//         /    \
//        5      15
//      /  \    /  \
//     3    7  13  18
//    /    /
//   1    6
// 输入：root = [10,5,15,3,7,13,18,1,null,6], low = 6, high = 10
// 输出：23

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
 * @param {number} low
 * @param {number} high
 * @return {number}
 */
// 方法一：dfs
// 思考：如果题目提供的是普通二叉树要怎么做？
// 遍历树的所有节点，累加节点值在 [low, high] 的节点。
// 由于本题提供的二叉树是「二叉搜索树」，因此我们可以根据每棵树的根节点 root 和 [low, high] 的大小关系避免遍历这颗树。

// 具体的：
// 按深度优先搜索的顺序计算范围和。记当前子树根节点为 root，根据二叉搜索树的特性左子树的结点小于根结点，右子树的结点大于根结点。分以下四种情况讨论：
//  - root 节点为空，返回0
//  - root 节点的值大于 high
//      二叉搜索树 root 的右子树上的节点值均大于 root 的值，因此无需考虑右子树，返回左子树的范围和。
//  - root 节点值小于 low
//      二叉搜索树 root 的左子树上的节点值均小于 root 的值，因此无需考虑左子树，返回右子树的范围和。
//  - root 节点值在 [low, high] 范围内
//      返回 root 节点的值、左子树的范围和、右子树的范围和这三者之和。

// 递归函数的含义：
// 计算以 root 为根节点的二叉搜索树中节点值在指定范围内的节点值之和。
// 递归边界：
// 当前节点为空时，返回0。这是因为在空节点上没有节点值，所以范围和为0。
// 递归内容：
// 根据 root 和 [low, high] 的大小关系计算其范围和
// 递归返回值：以 root 为根节点的二叉搜索树的范围和。
var rangeSumBST = function (root, low, high) {
    if (root === null) return 0;

    // 根节点值大于 high，则右子树均大于 high，不考虑右子树范围和，返回左子树的范围和。
    if (root.val > high) return rangeSumBST(root.left, low, high);
    // 根节点值小于 low，则左子树均小于 low，不考虑左子树范围和，返回右子树的范围和。
    if (root.val < low) return rangeSumBST(root.right, low, high);

    // 否则返回 root 节点的值 + 左子树的范围和 + 右子树的范围和。
    return (
        root.val +
        rangeSumBST(root.left, low, high) +
        rangeSumBST(root.right, low, high)
    );
};
// 时间复杂度：O(n)，n 为二叉搜索树的节点数目，最坏情况下树退化成链表，每一个节点均被访问一次。
// 空间复杂度：O(n)，，n 为二叉树搜索的深度，递归函数需要栈空间，栈空间取决于递归的深度。
