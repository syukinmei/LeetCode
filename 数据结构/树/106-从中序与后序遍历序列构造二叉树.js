// 给定两个整数数组 inorder 和 postorder ，其中 inorder 是二叉树的中序遍历， postorder 是同一棵树的后序遍历，请你构造并返回这颗 二叉树 。

//   3
//  / \
// 9  20
//   /  \
//  15   7
// 输入：inorder = [9,3,15,20,7], postorder = [9,15,7,20,3]
// 输出：[3,9,20,null,null,15,7]

// 输入：inorder = [-1], postorder = [-1]
// 输出：[-1]

// 提示：
//  - 1 <= inorder.length <= 3000
//  - postorder.length == inorder.length
//  - -3000 <= inorder[i], postorder[i] <= 3000
//  - inorder 和 postorder 都由 不同 的值组成
//  - postorder 中每一个值都在 inorder 中
//  - inorder 保证是树的中序遍历
//  - postorder 保证是树的后序遍历

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} inorder
 * @param {number[]} postorder
 * @return {TreeNode}
 */
// 方法一:哈希表 + 递归
// 在开始之前，我们需要明确，二叉树的「中序遍历」和「后序遍历」的顺序。
// 中序遍历：左 - 根 - 右
// 后序遍历：左 - 右 - 根
// 据上述，可知：
//  - 后序遍历数组中，最后一个元素即为根节点。
//  - 中序遍历数组中，根节点会将数组分成两部分，左边部分为其左子树，右边部分为其右子树。
// 知道这2个性质后，我们可以在后序遍历数组中找到根节点 root，再从中序遍历数组中找到 root 的下标，将中序遍历数组分为左子树和右子树两部分。针对每个部分可以用同样的方法继续递归下去进行构建。

// Q：如果后序遍历最后一个是 3，但是中序遍历有多个 3，此时我们应该如何切分左右子树？
// A：题目的提示中声明了 「inorder 和 postorder 都由 不同 的值组成」，即树中元素都是唯一的。

// Q：给定整棵树的中序遍历序，我们找到整颗树的根节点，并将整棵树分为左右子树后，根节点 rootIndex 的左侧是左子树，右侧是右子树，这是显而易见的（上面有说到），但是这也只是说明了左右子树的元素集合。为什么这个集合也是其中序遍历的序列呢？
// A：因为在二叉树的中序遍历中，左子树的元素总是在根节点之前，而右子树的元素总是在根节点之后。这是二叉树中序遍历的性质。前序遍历序列、后序遍历序列亦是如此。

// 递归函数的含义：
// 根据中序和后序遍历序列构造二叉树的根节点。
// 递归边界：
// 当序列为空，返回null。
// 递归内容：
// 1. 根据后序遍历找到当前子树的根节点
// 2. 在中序遍历中找到根节点的位置
// 3. 计算左右子树的序列区间
// 4. 递归构建左右子树
// 递归返回值：
// 以当前中序和后序遍历的数列构建成的二叉树根节点。

// 具体的：
// 因为要需要根据后序遍历的序列找到根节点，并快速定位到其在中序遍历的序列中找到其位置，以进行切分左右子树。我们使用「哈希表」indexMap 记录中序遍历序列中节点值对应的下标。
// 对于根据根节点进行分割后的左右子树，我们需要确定其中序遍历序列区间和后序遍历序列区间，即其左右边界。
//  - 对于中序遍历序列的区间，我们使用两个位置进行标记 [inStart, inEnd]。inStart 是起始位置，inEnd 是结束位置
//  - 对于中序遍历序列的区间，我们使用两个位置进行标记 [postStart, postEnd]。postStart 是起始位置，postEnd 是结束位置
// 由于，我们找到根节点后，需要进行下一轮构建，即需要确认下一轮左右子树在中序遍历序列和后序遍历序列中的位置。
//  - 左子树（中序遍历）：[inStart, rootIndex-1]
//  - 左子树（后序遍历）：[postStart, postStart+rootIndex-inStart-1]
//  - 右子树（中序遍历）：[rootIndex+1, inEnd]
//  - 右子树（后序遍历）：[postStart+rootIndex-inStart, postEnd-1]
// 然后根据这个序列区间进行递归构建即可。
var buildTree = function (inorder, postorder) {
    const n = inorder.length;

    const indexMap = new Map(); // 哈希表，key 为 节点值，value 为该节点在中序遍历序列中的下标。

    // 遍历一次 中序遍历序列 以构建哈希表
    for (let i = 0; i < n; i++) {
        indexMap.set(inorder[i], i);
    }

    // 递归函数：根据中序和后序遍历序列构造二叉树，接收的参数分别为 当前子树在中序遍历序列中的起始位置、结束位置 及 后序遍历序列中的起始位置、结束位置。
    const build = function (inStart, inEnd, postStart, postEnd) {
        // 设置递归出口，当前子树的序列为空。
        if (inStart > inEnd || postStart > postEnd) {
            return null;
        }
        // 递归内容：
        // 1. 获取当前子树的根节点的值，为其的后序遍历序列的最后一个元素
        const rootVal = postorder[postEnd];

        // 2. 找到根节点在中序遍历序列中的位置。
        const rootIndex = indexMap.get(rootVal);

        // 3. 计算该子树的左子树的序列区间，并根据左右子树的序列区间构建其对应的左右子树
        const leftTreeLength = rootIndex - inStart; // 以 rootIndex 为根节点的左子树长度

        const leftTree = build(
            inStart,
            rootIndex - 1,
            postStart,
            postStart + leftTreeLength - 1
        );
        const rightTree = build(
            rootIndex + 1,
            inEnd,
            postStart + leftTreeLength,
            postEnd - 1
        );

        // 4. 返回以当前中序和后序遍历序列构造二叉树的根节点
        return new TreeNode(rootVal, leftTree, rightTree);
    };

    // 调用递归函数 获取构建完成的二叉树根节点。
    return build(0, n - 1, 0, n - 1);
};
// 时间复杂度：O(n)，n 为二叉树节点个数，构建哈希表的时间为O(n)，构建子树时每个节点都会被访问一次，因此总的时间复杂度是 O(n)。
// 空间复杂度：O(n)，n 为二叉树节点个数，需要O(n)的空间存储哈希表，以及 O(h) 的空间用于递归过程中栈道开销，当树呈链状时 h 达到最大及为 n。因此总的空间复杂度为O(n)。
