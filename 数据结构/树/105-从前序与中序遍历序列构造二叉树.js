// 给定两个整数数组 preorder 和 inorder ，其中 preorder 是二叉树的先序遍历， inorder 是同一棵树的中序遍历，请构造二叉树并返回其根节点。

//   3
//  / \
// 9  20
//   /  \
//  15   7
// 输入: preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]
// 输出: [3,9,20,null,null,15,7]

// 输入: preorder = [-1], inorder = [-1]
// 输出: [-1]

// 提示：
//  - 1 <= preorder.length <= 3000
//  - inorder.length == preorder.length
//  - -3000 <= preorder[i], inorder[i] <= 3000
//  - preorder 和 inorder 均 无重复 元素
//  - inorder 均出现在 preorder
//  - preorder 保证 为二叉树的前序遍历序列
//  - inorder 保证 为二叉树的中序遍历序列

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
// 方法一：哈希表 + 递归
// 在开始之前，我们需要明确，二叉树的「前序遍历」和「中序遍历」的顺序。
// 前序遍历：根 - 左 - 右
// 中序遍历：左 - 根 - 右
// 显然这题思路和力扣 106「从中序与后序遍历序列构造二叉树」一样的，可以利用 哈希表 + 递归 的方式解决。
// 1. 获取当前子树的根节点的值，为其的前序遍历序列的第一个元素
// 2. 找到根节点在中序遍历序列中的位置。
// 3. 然后根据根节点将子树切分为左右子树（计算左右子树的序列区间）
// 4. 递归构建左右子树
var buildTree = function (preorder, inorder) {
    const n = inorder.length;

    const indexMap = new Map(); // 哈希表，key 为 节点值，value 为该节点在中序遍历序列中的下标。

    // 遍历一次 中序遍历序列 以构建哈希表
    for (let i = 0; i < n; i++) {
        indexMap.set(inorder[i], i);
    }

    // 递归函数：根据前序和中序遍历序列构造二叉树，接收的参数分别为 当前子树在中序遍历序列中的起始位置、结束位置 及 前序遍历序列中的起始位置、结束位置。
    const build = function (inStart, inEnd, preStart, preEnd) {
        // 设置递归出口，当前子树的序列为空。
        if (inStart > inEnd || preStart > preEnd) return null;

        // 递归内容：
        // 1. 获取当前子树的根节点的值，为其的前序遍历序列的第一个元素
        const rootVal = preorder[preStart];

        // 2. 找到根节点在中序遍历序列中的位置。
        const rootIndex = indexMap.get(rootVal);

        // 3. 计算该子树的左右子树的序列区间，并根据左右子树的序列区间构建其对应的左右子树
        const leftTreeLength = rootIndex - inStart; // 以 rootIndex 为根节点的左子树长度

        const leftTree = build(
            inStart,
            rootIndex - 1,
            preStart + 1,
            preStart + leftTreeLength
        );
        const rightTree = build(
            rootIndex + 1,
            inEnd,
            preStart + leftTreeLength + 1,
            preEnd
        );

        // 4. 返回以当前前序和中序遍历序列构造二叉树的根节点
        return new TreeNode(rootVal, leftTree, rightTree);
    };

    // 调用递归函数 获取构建完成的二叉树根节点。
    return build(0, n - 1, 0, n - 1);
};
// 时间复杂度：O(n)，n 为二叉树节点个数，构建哈希表的时间为O(n)，构建子树时每个节点都会被访问一次，因此总的时间复杂度是 O(n)。
// 空间复杂度：O(n)，n 为二叉树节点个数，需要O(n)的空间存储哈希表，以及 O(h) 的空间用于递归过程中栈道开销，当树呈链状时 h 达到最大及为 n。因此总的空间复杂度为O(n)。
