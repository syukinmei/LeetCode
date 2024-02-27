// 给定一个二叉树, 找到该树中两个指定节点的最近公共祖先。

// 百度百科中最近公共祖先的定义为：
// “对于有根树 T 的两个节点 p、q，最近公共祖先表示为一个节点 x，满足 x 是 p、q 的祖先且 x 的深度尽可能大（一个节点也可以是它自己的祖先）。”

//       3
//      / \
//     5   1
//    / \ / \
//   6  2 0  8
//     / \
//    7   4
// 输入：root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
// 输出：3
// 解释：节点 5 和节点 1 的最近公共祖先是节点 3 。

//       3
//      / \
//     5   1
//    / \ / \
//   6  2 0  8
//     / \
//    7   4
// 输入：root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4
// 输出：5
// 解释：节点 5 和节点 4 的最近公共祖先是节点 5 。因为根据定义最近公共祖先节点可以为节点本身。

// 输入：root = [1,2], p = 1, q = 2
// 输出：1

// 说明：
// 所有 Node.val 互不相同 。
// p、q 为不同节点且均存在于给定的二叉树中。

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
// 使用 dfs 遍历二叉树，对于每个节点进行分类讨论：
//  - 当前节点为空，返回当前节点
//  - 当前节点为 p 或者 q，返回当前节点
//  - 左右子树都找到 p 或者 q，返回当前节点
//  - 左右子树都没找到，返回 空节点
//  - 只有左子树找到 p 或者 q，返回递归左子树的结果
//  - 只有右子树找到 p 或者 q，返回递归右子树的结果

// 递归函数的含义：
// 在以 root 为根节点的二叉树中，查找节点 p 和节点 q 的最近公共祖先，并将其返回。
// 递归边界：如果当前节点为空，返回 null（由于p、q 为不同节点且均存在于给定的二叉树中，因此一定可以找到其公共祖先，因此可以无边界条件）
// 递归内容：
// 根据上述的不同情况进行递归
// 递归返回值：返回最近公共祖先节点。
var lowestCommonAncestor = function (root, p, q) {
  if (root === null) return null;

  // 当前节点为 p 或者 q，当前节点即为最近公共祖先，返回当前节点。
  if (root.val === p.val || root.val === q.val) return root;

  // 查看左子树是否存在 p 和 q 最近公共祖先。
  const leftTree = lowestCommonAncestor(root.left, p, q);
  // 查看右子树是否存在 p 和 q 最近公共祖先。
  const rightTree = lowestCommonAncestor(root.right, p, q);

  // 左右子树都存在，则当前节点即为 p 和 q 的最近公共祖先
  if (leftTree && rightTree) return root;
  // 只有左子树存在 p 和 q，则左子树为 p 和 q 的最近公共祖先
  else if (leftTree) return leftTree;
  // 只有右子树存在 p 和 q，则右子树为 p 和 q 的最近公共祖先
  else if (rightTree) return rightTree;
};
// 时间复杂度：O(n)，n 为二叉树的结点数目，每一个节点最多被访问一次。
// 空间复杂度：O(n)，n 为二叉树的深度，递归函数需要栈空间，栈空间取决于递归的深度。
