// 给你两棵二叉树： root1 和 root2 。
// 想象一下，当你将其中一棵覆盖到另一棵之上时，两棵树上的一些节点将会重叠（而另一些不会）。你需要将这两棵树合并成一棵新二叉树。合并的规则是：如果两个节点重叠，那么将这两个节点的值相加作为合并后节点的新值；否则，不为 null 的节点将直接作为新二叉树的节点。
// 返回合并后的二叉树。
// 注意: 合并过程必须从两个树的根节点开始。

//    root1            root2                        合并后

//      1               2                              3
//    /   \           /   \                         /     \
//   3     2         1     3         ==>           4       5
//  /                 \     \                    /   \      \
// 5                   4     7                  5     4      7

// 输入：root1 = [1,3,2,5], root2 = [2,1,3,null,4,null,7]
// 输出：[3,4,5,5,4,null,7]

// 输入：root1 = [1], root2 = [1,2]
// 输出：[2,2]

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @return {TreeNode}
 */
// 方法一：递归
// 递归边界：
// 1、当两个根节点都为空时，表示已经遍历到了叶子节点的下一层，此时返回空。这是递归的终止条件。
// 2、其中一个根节点为空，那么我们可以直接返回另一个非空的根节点。
// 递归内容：
// 如果两个根节点都不为空，递归地合并它们的左子树和右子树
// 对于左子树的合并，我们可以递归地调用mergeTrees函数，将两个根节点的左子树作为参数传入。这将返回合并后的左子树。
// 对于右子树的合并，我们也可以递归地调用mergeTrees函数，将两个根节点的右子树作为参数传入。这将返回合并后的右子树。

// 最后，我们创建一个新的根节点，其值为两个根节点值的和，左子树为合并后的左子树，右子树为合并后的右子树。然后将该根节点返回。

// 通过递归的方式，我们可以将两个二叉树合并为一个新的二叉树。在每一层递归中，我们都会处理当前节点及其子节点，并将合并后的子树连接到当前节点上。最终，我们将得到一个合并后的二叉树。
var mergeTrees = function (root1, root2) {
  // 设置递归出口
  if (root1 === null && root2 === null) return null;

  // 如果其中一棵树的当前节点为空，则返回另一棵树的当前节点作为合并后节点。
  if (root1 === null) return root2;
  if (root2 === null) return root1;

  // 如果两棵树的当前节点都不为空，则将它们的值相加作为合并后节点的新值，然后递归合并它们的左右子节点。
  const left = mergeTrees(root1.left, root2.left); // 递归合并左子树
  const right = mergeTrees(root1.right, root2.right); // 递归合并右子树

  return new TreeNode(root1.val + root2.val, left, right); // 返回合并后的节点，节点值为两个根节点值的和，左子树为合并后的左子树，右子树为合并后的右子树
};
// 时间复杂度：O(min(n, m))，n 和 m 分别为二叉树 root1 和 root2 的节点树，需要范围两颗二叉树的结点，被访问到的节点数不会超过较小的二叉树的节点数。
// 空间复杂度：O(min(n, m))，为递归所用的递归调用栈空间。递归深度不会超过较小二叉树的最大高度。
