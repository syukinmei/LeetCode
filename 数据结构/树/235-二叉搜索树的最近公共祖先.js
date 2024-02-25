// 给定一个二叉搜索树, 找到该树中两个指定节点的最近公共祖先。
// 百度百科中最近公共祖先的定义为：“对于有根树 T 的两个结点 p、q，最近公共祖先表示为一个结点 x，满足 x 是 p、q 的祖先且 x 的深度尽可能大（一个节点也可以是它自己的祖先）。”
// 例如，给定如下二叉搜索树:  root = [6,2,8,0,4,7,9,null,null,3,5]

//       6
//      / \
//     2   8
//    / \ / \
//   0  4 7  9
//     / \
//    3   5
// 输入: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8
// 输出: 6
// 解释: 节点 2 和节点 8 的最近公共祖先是 6。

// 输入: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 4
// 输出: 2
// 解释: 节点 2 和节点 4 的最近公共祖先是 2, 因为根据定义最近公共祖先节点可以为节点本身。

// 说明：
//  - 所有节点的值都是唯一的。
//  - p、q 为不同节点且均存在于给定的二叉搜索树中。

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
 * @param {TreeNode} q
 * @return {TreeNode}
 */
// 方法一：深度优先搜索 + 分类讨论
// 根据二叉搜索树的性质：左子树的节点小于根节点，右子树的节点大于根节点，快速寻找第一个节点值位于 [p.val, q.val] 之间的节点，其就是 p 和 q 的最近公共祖先。

// 递归函数的含义：
// 在以 root 为根节点的二叉搜索树中，查找节点 p 和节点 q 的最近公共祖先，并将其返回。
// 递归边界：当前子树为空，返回 null（由于p、q 为不同节点且均存在于给定的二叉搜索树中，因此一定可以找到其公共祖先，因此可以无边界条件）
// 递归内容：
// 比较节点值，寻找第一个值位于 [p.val, q.val] 之间的节点值。
//  - 如果 p 和 q 都在当前节点的左子树，则递归调用左子树。
//  - 如果 p 和 q 都在当前节点的右子树，则递归调用右子树。
//  - 如果 p 和 q 分别在左右子树，或其中一个是根节点，当前节点即为最近公共祖先。
// 递归返回值：返回最近公共祖先节点。

var lowestCommonAncestor = function (root, p, q) {
    if (root === null) return null; // 递归设置出口

    // 递归内容：比较节点值，寻找第一个值位于 [p.val, q.val] 之间的节点值。
    if (root.val > p.val && root.val > q.val) {
        // 当前节点值 大于 p 和 q，p 和 q 都在左子树中。
        return lowestCommonAncestor(root.left, p, q);
    } else if (root.val < p.val && root.val < q.val) {
        // 当前节点值 小于 p 和 q，p 和 q 都在右子树中
        return lowestCommonAncestor(root.right, p, q);
    } else {
        // 当前节点为 p 或 当前节点为 q，或者p 和 q 分别在当前节点的左右两侧
        // 说明当前节点即为 p 和 q 的公共祖先
        return root;
    }
};
// 时间复杂度：O(n)，n 为二叉搜索树的结点数目，最坏情况下，树退化成链表，每一个节点均被访问一次。
// 空间复杂度：O(n)，n 为二叉树搜索的深度，递归函数需要栈空间，栈空间取决于递归的深度。
