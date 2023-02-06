// 给你一棵 完整二叉树 的根，这棵树有以下特征：
//  - 叶子节点 要么值为 0 要么值为 1 ，其中 0 表示 False ，1 表示 True 。
//  - 非叶子节点 要么值为 2 要么值为 3 ，其中 2 表示逻辑或 OR ，3 表示逻辑与 AND 。

// 计算 一个节点的值方式如下：
//  - 如果节点是个叶子节点，那么节点的 值 为它本身，即 True 或者 False 。
//  - 否则，计算 两个孩子的节点值，然后将该节点的运算符对两个孩子值进行 运算 。

// 返回根节点 root 的布尔运算值。
// 完整二叉树 是每个节点有 0 个或者 2 个孩子的二叉树。
// 叶子节点 是没有孩子的节点。


//    OR          =>        OR          =>        True
//   /   \                 /   \ 
// True  AND             True  False
//      /   \
//   False  True

// 输入：root = [2,1,3,null,null,0,1]
// 输出：true
// 解释：上图展示了计算过程。
// AND 与运算节点的值为 False AND True = False 。
// OR 运算节点的值为 True OR False = True 。
// 根节点的值为 True ，所以我们返回 true 。


// 输入：root = [0]
// 输出：false
// 解释：根节点是叶子节点，且值为 false，所以我们返回 false 。


// tips:
//  - 树中节点数目在 [1, 1000] 之间。
//  - 0 <= Node.val <= 3
//  - 每个节点的孩子数为 0 或 2 。
//  - 叶子节点的值为 0 或 1 。
//  - 非叶子节点的值为 2 或 3 。


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
// 方法一：递归
// 使用递归，如果要计算当前节点的值，我们需要先计算出两个叶子节点组成的子树的值，分别记为 Lval 与 Rval，然后再计算出当前节点组成的子树的值。
// 具体的：
// 如果当前节点为叶子节点，则直接返回当前节点的值。根据题意该树为完整二叉树，树中每个节点有 0 或者 2个孩子节点，只需要检测该节点是否有左孩子或者右孩子即可。
// 如果当前节点为非叶子节点（含有孩子节点），则需递归求解，计算出其左右孩子节点的值为 Lval 与 Rval。如果当前节点的值为 2，则返回 Lval || Rval；如果当前节点的值为 3，则返回 Lval && Rval;
var evaluateTree = function (root) {
    // 如果为叶子节点，节点的值为它本身，返回其表示的布尔值。
    if (!root.left) return root.val === 1;

    // 如果非叶子节点，节点的值为两个孩子节点的节点值的逻辑运算结果。
    if (root.val === 2) {
        return evaluateTree(root.left) || evaluateTree(root.right);
    } else {
        return evaluateTree(root.left) && evaluateTree(root.right);
    }
};
// 时间复杂度：O(n)，n 为 树中节点的数目。对于每个节点我们只需要遍历一次即可，因此时间复杂度为O(n)。
// 空间复杂度：O(n)，n 为 树中节点的数目。按照题目要求，含有 n 个节点的完整二叉树的深度最多为 n/2，最少为 O(logn)，因此递归的最大深度为 n/2，因此空间复杂度为O(n)。
