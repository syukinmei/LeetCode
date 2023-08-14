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
var mergeTrees = function (root1, root2) {
    // 设置递归出口·
    if (root1 === null && root2 === null) return null;

    // 如果其中一棵树的当前节点为空，则返回另一棵树的当前节点作为合并后节点。
    if (root1 === null) return root2;
    if (root2 === null) return root1;

    // 如果两棵树的当前节点都不为空，则将它们的值相加作为合并后节点的新值，然后递归合并它们的左右子节点。
    const left = mergeTrees(root1.left, root2.left); // 合并左子树
    const right = mergeTrees(root1.right, root2.right); // 合并右子树

    return new TreeNode(root1.val + root2.val, left, right); // 返回合并后的节点
};
// 时间复杂度：O(min(n, m))，n 和 m 分别为二叉树 root1 和 root2 的节点树，需要范围两颗二叉树的结点，被访问到的节点数不会超过较小的二叉树的节点数。
// 空间复杂度：O(min(n, m))，为递归所用的递归调用栈空间。递归深度不会超过较小二叉树的最大高度。
