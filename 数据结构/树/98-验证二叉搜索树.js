// 给你一个二叉树的根节点 root ，判断其是否是一个有效的二叉搜索树。
// 有效 二叉搜索树定义如下：
//  - 节点的左子树只包含 小于 当前节点的数。
//  - 节点的右子树只包含 大于 当前节点的数。
//  - 所有左子树和右子树自身必须也是二叉搜索树

//   2
//  / \
// 1  3
// 输入：root = [2,1,3]
// 输出：true

//   5
//  / \
// 1   4
//    / \
//   3   6 
// 输入：root = [5,1,4,null,null,3,6]
// 输出：false
// 解释：根节点的值是 5 ，但是右子节点的值是 4 。


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
// 方法一：递归中序遍历二叉树，将二叉搜索树转变成一个数组，判断结点数组是否是单调递增的，是返回true。
var isValidBST = function (root) {
    const arr = [];
    // 递归函数
    const inorder = function (root) {
        if (root === null) return;
        inorder(root.left);
        arr.push(root.val); // 将二叉搜索树转换为有序数组
        inorder(root.right);
    }
    inorder(root);
    let isasc = true;
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] <= arr[i - 1]) isasc = false;
    }
    return isasc;
};


// 方法二：递归
// 额外定义一个辅助函数 boolean recurse(TreeNode node, int lower, int upper)，参数分别为：
//  - 对于左子树 当前结点(curr) 当前结点的下限值(curr.left) 当前结点的上限值(root)
//  - 对于右子树 当前结点(curr) 当前结点的下限值(root) 当前结点的上限值(curr.right)
var isValidBST = function (root) {
    return helper(root, -Infinity, Infinity);
};
const helper = function (root, lower, upper) {
    if (root === null) return true;
    // 检测当前结点值是否超过上下边界，超过返回false
    if (root.val <= lower || root.val >= upper) return false;
    // 没超过边界，检测左右子结点。
    // 将当前结点的值作为上界对 node.left 进行递归
    // 将当前结点的值作为下界对 node.right 进行递归
    return helper(root.left, lower, root.val) && helper(root.right, root.val, upper);
}
// 时间复杂度：O(n)，n 为二叉树的结点数目，在递归调用过程中每一个节点只被遍历一次。
// 空间复杂度：O(n)，n 为二叉树的深度，递归函数需要栈空间，栈空间取决于递归的深度。

// 方法三：中序遍历
// 二叉搜索树「中序遍历」得到的值构成的序列一定是升序的，这启示我们在中序遍历的时候实时检查当前节点的值是否大于前一个中序遍历到的节点的值即可
var isValidBST = function (root) {
    const stack = [];
    // 声明一个变量，记录当前操作结点，用于与下次获取的节点进行对比
    let prev = -Infinity;
    while (root !== null || stack.length !== 0) {
        while (root !== null) {
            stack.push(root);
            root = root.left;
        }
        root = stack.pop();
        // 如果中序遍历得到的节点的值小于等于前一个 prev，说明不是二叉搜索树，返回false
        if (root.val <= prev) return false;
        prev = root.val; // 存储当前结点的值作为下一个节点的比较对象
        root = root.right;
    }
    return true;
};
// 时间复杂度：O(n)，n 为二叉树的节点，每一个节点只被遍历一次。
// 空间复杂度：O(n)，n 为二叉树的节点，栈栈最多存储 n 个节点。
