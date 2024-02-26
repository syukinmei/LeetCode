// 给你一个 二叉搜索树 的根节点 root ，和一个由正整数组成、长度为 n 的数组 queries 。
// 请你找出一个长度为 n 的 二维 答案数组 answer ，其中 answer[i] = [mini, maxi] ：

//  - mini 是树中小于等于 queries[i] 的 最大值 。如果不存在这样的值，则使用 -1 代替。
//  - maxi 是树中大于等于 queries[i] 的 最小值 。如果不存在这样的值，则使用 -1 代替。

// 返回数组 answer 。

//       6
//      / \
//     2   13
//    / \ / \
//   1  4 9  15
//           /
//          14
// 输入：root = [6,2,13,1,4,9,15,null,null,null,null,null,null,14], queries = [2,5,16]
// 输出：[[2,2],[4,6],[15,-1]]
// 解释：按下面的描述找出并返回查询的答案：
// - 树中小于等于 2 的最大值是 2 ，且大于等于 2 的最小值也是 2 。所以第一个查询的答案是 [2,2] 。
// - 树中小于等于 5 的最大值是 4 ，且大于等于 5 的最小值是 6 。所以第二个查询的答案是 [4,6] 。
// - 树中小于等于 16 的最大值是 15 ，且大于等于 16 的最小值不存在。所以第三个查询的答案是 [15,-1] 。

//  4
//   \
//    9
// 输入：root = [4,null,9], queries = [3]
// 输出：[[-1,4]]
// 解释：树中不存在小于等于 3 的最大值，且大于等于 3 的最小值是 4 。所以查询的答案是 [-1,4] 。

// 方法一：中序遍历+二分查找
// 根据二叉搜索树的性质：对二叉查找树进行中序遍历，即可得到有序的数列。
// 因此，我们可以对树进行一次「中序遍历」获得一个升序数组 inorder。
// 然后在 inorder 数组中对每个 queries 元素 val 进行二分查找，寻找大于等于 val 最左侧的下标 index，此时分析如下：
//  - 如果 index 存在合法，则此时大于等于 val 的最小元素（maxi）即为 inorder[index]，否则为 -1。
//      - 如果此时 inorder[index] === val ，则小于等于 val 的最大元素（mini）也为 inorder[index]。
//  - 如果下标 index 大于 0，且 inorder[index] !== val ，则此时 小于等于 val 的最大元素（mini）为 inorder[index-1]，否则为 -1。

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
 * @param {number[]} queries
 * @return {number[][]}
 */
var closestNodes = function (root, queries) {
    const inorder = []; // 用于存储中序遍历结果的数组
    // 辅助函数：中序遍历二叉搜索树并将结果存储在数组中
    const dfs = function (root) {
        if (root === null) return null;
        dfs(root.left);
        inorder.push(root.val);
        dfs(root.right);
    };
    dfs(root);

    const res = []; // 存放结果数组

    // 对每个 queries 进行二分搜索，计算其满足条件的 mini 和 maxi
    for (const q of queries) {
        const index = binarySearch(inorder, q); // 使用二分查找在中序遍历结果中找到与查询值最接近的位置
        let mx = -1; // 存储大于等于查询值的最小节点值
        let mi = -1; // 存储小于等于查询值的最大节点值
        if (index < inorder.length) mx = inorder[index];
        if (inorder[index] === q) mi = inorder[index];
        else if (index > 0) mi = inorder[index - 1];
        res.push([mi, mx]);
    }
    return res;
};

/**
 * 辅助函数：二分查找升序数组 arr 数组中大于等于 target 的最小元素的下标
 * @param {number[]} arr 升序数组
 * @param {number} target 目标值
 * @returns {number} arr 数组中大于等于 target 的最小元素的下标，不存在则返回 -1。
 */
var binarySearch = function (arr, target) {
    const n = arr.length;
    let left = 0,
        right = n - 1;
    while (left <= right) {
        const mid = left + ((right - left) >> 1);
        if (arr[mid] >= target) {
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    return left;
};
// 时间复杂度:O(n+qlogn)，n 为给定二叉搜索树的节点数，q 为查询数组 queries 的长度，中序遍历二叉树需要 O(n) 的时间，对于每个查询需要在中序序列中进行二分查找需要O(logn)的时间，因此总的时间复杂度为 O(n+qlogn)
// 空间复杂度：O(n)，n 为给定二叉搜索树的节点数，为存储中序序列为递归过程中栈道开销。
