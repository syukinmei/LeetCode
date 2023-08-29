// 给你一棵根为 root 的二叉树，请你返回二叉树中好节点的数目。

// 「好节点」X 定义为：从根到该节点 X 所经过的节点中，没有任何节点的值大于 X 的值。

//            (3)
//          /     \
//         1      (4)
//       /        /  \
//     (3)       1   (5)
// 输入：root = [3,1,4,3,null,1,5]
// 输出：4
// 解释：图中蓝色节点为好节点。
// 根节点 (3) 永远是个好节点。
// 节点 4 -> (3,4) 是路径中的最大值。
// 节点 5 -> (3,4,5) 是路径中的最大值。
// 节点 3 -> (3,1,3) 是路径中的最大值。

//       (3)
//       /
//     (3)
//    /   \
//  (4)    2
// 输入：root = [3,3,null,4,2]
// 输出：3
// 解释：节点 2 -> (3, 3, 2) 不是好节点，因为 "3" 比它大。

// 输入：root = [1]
// 输出：1
// 解释：根节点是好节点。

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
 * @return {number}
 */
// 方法一：深度优先搜索（前序遍历）
// 定义一个变量 count 记录好节点个数。然后，我们可以使用递归函数来实现DFS算法。递归函数需要传入当前节点 root 和根节点到当前节点到路径上（不包括当前节点）的最大值 maxVal。

// 递归边界：当前节点为空。直接返回。
// 递归内容：判断当前节点的值是否大于等于路径上节点的最大值，是则该节点是好节点 count++ ，更新路径上节点的最大值。然后分别调用递归函数处理当前节点的左子树和右子树。
var goodNodes = function (root) {
    let count = 0; // 记录好节点的个数
    // 计算以 root 为根节点的子树中好节点的个数。
    const dfs = (root, maxVal) => {
        // 递归出口。
        if (root === null) return;

        // 如果当前节点的值大于等于路径上节点的最大值，则该节点是好节点 count++ ，更新路径上节点的最大值。
        if (root.val >= maxVal) {
            count++;
            maxVal = root.val;
        }

        dfs(root.left, maxVal); // 递归处理左子树
        dfs(root.right, maxVal); // 递归处理右子树
    };

    // 调用深度优先搜索函数，初始化最大值为根节点的值（根节点本身是一个好节点）
    dfs(root, root.val);

    return count; // 返回好节点的个数
};
// 时间复杂度：O(n)，n 为二叉树的节点数，我们需要遍历每一个节点，对每一个节点进行常数时间的操作。
// 空间复杂度：O(n)，n 为二叉树的高度，为递归过程中栈的开销。平均情况为O(logn)，最坏情况为树呈现链状，为O(n)。
