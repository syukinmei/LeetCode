// 给定一个二叉树的 根节点 root，想象自己站在它的右侧，按照从顶部到底部的顺序，返回从右侧所能看到的节点值。


//   1     <-
//  / \  
// 2   3   <-
//  \   \
//  5    4 <-
// 输入: [1,2,3,null,5,null,4]
// 输出: [1,3,4]


// 输入: [1,null,3]
// 输出: [1,3]

// 输入: []
// 输出: []

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
 * @return {number[]}
 */
// 方法一：双端队列实现 广度优先搜索
// 求右视图就是求层序遍历最右边的节点。
var rightSideView = function (root) {
    if (root === null) return [];
    const res = [];
    const queue = [root];
    while (queue.length !== 0) {
        const len = queue.length; // 记录当前层节点数量。
        for (let i = 0; i < len; i++) {
            const curNode = queue.shift();
            if (i === len - 1) res.push(curNode.val); // 判断是否是当层最右边的节点。
            if (curNode.left !== null) queue.push(curNode.left);
            if (curNode.right !== null) queue.push(curNode.right);
        }
    }
    return res;
};
// 时间复杂度：O(n)，每个节点最多进队出队各一次，因此广度优先搜索的时间复杂度是线性的。
// 空间复杂度：O(n)，每个节点最多进队一次，所以队列长度最大不会超过 n。


// 方法二：深度优先搜索
// 前序遍历为[根节点 -> 左子树 -> 右子树]。我们可以按照 [根结点 -> 右子树 -> 左子树] 的顺序访问，维护一个 depth 表示当前层号，保证每一层第一个被访问的就是我们要求的右视图。
var rightSideView = function (root) {
    const res = [];

    const dfs = function (root, depth) {
        if (root === null) return; // 设置递归出口

        if (depth === res.length) res.push(root.val); // 如果当前节点所在深度还没有出现在res里，说明在该深度下当前节点是第一个被访问的节点，因此将当前节点加入res中。
        depth++;
        dfs(root.right, depth);
        dfs(root.left, depth);
    }

    dfs(root, 0); // 从根节点开始访问，根节点深度是0
    return res;
};
// 时间复杂度：O(n)，n 为二叉树的节点，每一个节点只被遍历一次。
// 空间复杂度：O(n)，为递归过程中栈的开销，因为不是平衡二叉树，平均深度为O(logn)，最坏情况为树呈现链状，为O(n)。
