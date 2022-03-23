// 你需要采用前序遍历的方式，将一个二叉树转换成一个由括号和整数组成的字符串。
// 空节点则用一对空括号 "()" 表示。而且你需要省略所有不影响字符串与原始二叉树之间的一对一映射关系的空括号对。

// 输入: 二叉树: [1,2,3,4]

//        1
//      /   \
//     2     3
//    /    
//   4     

// 输出: "1(2(4))(3)"
// 解释: 原本将是“1(2(4)())(3())”，
// 在你省略所有不必要的空括号对之后，
// 它将是“1(2(4))(3)”。


// 输入: 二叉树: [1,2,3,null,4]

//        1
//      /   \
//     2     3
//      \  
//       4 

// 输出: "1(2()(4))(3)"
// 解释: 和第一个示例相似，
// 除了我们不能省略第一个对括号来中断输入和输出之间的一对一映射关系。


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
 * @return {string}
 */
// 方法一：递归实现
// 对于每个节点将其子树转化为字符串的规则可以规约如下：
// root.val + '(' + tree2str(root.left) + ')(' + tree2str(root.right) + ')';
// 由于题目要求去掉一些无用的括号：
//  - 1()(2) 左子树为空，但是括号不能去掉，否则无法区分2是右子树。
//  - 1(2)() 左子树为空，则可以省略直接返回 1(2)。
//  - 1()() 可以直接简化为 1 。
var tree2str = function (root) {
    // 设置递归出口
    if (root === null) return '';
    if (root.left === null && root.right === null) {
        return '' + root.val;
    }

    // 如果右子树为空 递归 'root ( tree2str(root.left) )'
    if (root.right === null) {
        return root.val + '(' + tree2str(root.left) + ')';
    }
    // 否则 递归 'root ( tree2str(root.left) )( tree2str(root.right) )'
    return root.val + '(' + tree2str(root.left) + ')(' + tree2str(root.right) + ')';
};
// 时间复杂度：O(n)，n 为二叉树的节点，每一个节点只被遍历一次。
// 空间复杂度：O(n)，为递归过程中栈的开销，平均情况为O(logn)，最坏情况为树呈现链状，为O(n)。


// 方法二：递归
// 思路：需要在 开始前序遍历当前子树时候添加 '(' ，结束前序遍历时添加 ')' ，因此某个节点需要出入队伍两次，我们使用一个集合，判断节点在集合中存在，来区分首次出队（开始前序遍历）还是二次出队（结束前序遍历）。
// 如果当前节点有两个子树，那么我们先将右子树入栈，再将左子树入栈，从而保证前序遍历的顺序；
// 如果当前节点没有子树，我们什么都不做；
// 当前节点只有左子树，那么我们将左子树入栈；
// 当前节点只有右子树，那么我们需要在答案末尾添加 '()' 表示左子树为空，再将右子树入栈。
var tree2str = function (root) {
    let ans = '';
    const stack = [root];
    const visited = new Set();
    while (stack.length !== 0) {
        const curNode = stack[stack.length - 1];
        if (visited.has(curNode)) {
            if (curNode !== root) ans += ')';
            stack.pop(); // 出栈
        } else {
            visited.add(curNode); // 标记为访问过

            if (curNode !== root) ans += '(';
            ans += '' + curNode.val;

            if (curNode.left === null && curNode.right) ans += '()';

            // 前序遍历，右子树先入栈
            if (curNode.right !== null) stack.push(curNode.right);
            if (curNode.left !== null) stack.push(curNode.left);
        }
    }
    return ans;
};
// 时间复杂度：O(n)，其中 n 为二叉树的节点数目。
// 空间复杂度：O(n)，为Set集合和栈需要的空间开销。

// 方法二的优化 不判断是否是根节点，最后统一删除最外层括号
var tree2str = function (root) {
    let ans = '';
    const stack = [root];
    const visited = new Set(); // 表示访问过的结点集合，来区分首次出队（开始前序遍历）还是二次出队（结束前序遍历）
    while (stack.length !== 0) {
        const curNode = stack[stack.length - 1];
        if (visited.has(curNode)) {
            // 二次出队添加 ')' 表示该节点为根的子树遍历完了
            ans += ')';
            stack.pop();
        } else {
            visited.add(curNode); // 标记为访问过
            ans += '(' + curNode.val;

            if (curNode.left === null && curNode.right) ans += '()'; // 表示左子树为空

            // 前序遍历
            if (curNode.right !== null) stack.push(curNode.right);
            if (curNode.left !== null) stack.push(curNode.left);
        }
    }
    return ans.slice(1, -1); // 返回结果字符串，需要删除最外层多余括号。
};

