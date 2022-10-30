// 给定一个字符串 s ，通过将字符串 s 中的每个字母转变大小写，我们可以获得一个新的字符串。

// 返回 所有可能得到的字符串集合 。以 任意顺序 返回输出。

// 输入：s = "a1b2"
// 输出：["a1b2", "a1B2", "A1b2", "A1B2"]

// 输入: s = "3z4"
// 输出: ["3z4","3Z4"]


// 方法一dfs+回溯算法
// DFS 回溯 看到题目要求组合或者集合，马上想到可以用回溯法：回溯法本来是说对于每个元素都先考虑放它的情况，再考虑不放它的情况；放在这道题的背景里就是，对于每个字母，先考虑放它，再考虑放它的另一种大小写形式。
// index 表示当前遍历下标
//  - 如果是数字，直接加入到当前字符中，进行下一层递归
//  - 如果是字母，先加入到当前字符中进行下一层递归，再加入对立的大小写进行下一层递归

// 以事例1的 'a1b2' 为例子
//                    ''
//              /           \
//            a               A
//            |               |
//           a1              A1
//          /  \           /    \
//      a1b    a1B      A1b     A1B
//       ｜     ｜       ｜       ｜
//     a1b2    a1B2    A1b2    A1B2
// 
// 遍历顺序: '' a a1 a1b a1b2 a1B a1B2 A A1 A1b A1b2 A1B A1B2
/**
 * @param {string} s 
 * @return {string[]} 
 */
var letterCasePermutation = function (s) {
    const dfs = (current, index, res) => { // a1 2 []
        // console.log(current);
        if (index === s.length) { // 抵达叶子节点，收集答案
            res.push(current);
            return;
        }
        const ch = s[index];
        if (isDigit(ch)) {
            dfs(current + ch, index + 1, res);
        } else {
            dfs(current + ch, index + 1, res); // a1b 3 
            const turn = String.fromCharCode(ch.charCodeAt() ^ 32); // 转换大小写
            dfs(current + turn, index + 1, res); // a1B 3
        }
    }

    const ans = [];
    dfs('', 0, ans);
    return ans;
};

// 辅助函数 判断字符是否为数字
const isDigit = (ch) => {
    return parseFloat(ch).toString() === 'NaN' ? false : true;
}
// 时间复杂度：O(n * 2**n)，n 为字符串 s 的长度。递归深度最多为 n，所有可能的递归子状态最多为 2**n 个（即每一位均为字母），每次个子状态的搜索时间为O(n)，因此时间复杂度为O(n * 2**n)。
// 空间复杂度：O(n * 2**n)。
