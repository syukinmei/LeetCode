// 给定一个字符串 s 和一个整数 k 。你可以从 s 的前 k 个字母中选择一个，并把它加到字符串的末尾。
// 返回 在应用上述步骤的任意数量的移动后，字典上最小的字符串。



// 输入：s = "cba", k = 1
// 输出："acb"
// 解释：
// 在第一步中，我们将第一个字符（“c”）移动到最后，获得字符串 “bac”。
// 在第二步中，我们将第一个字符（“b”）移动到最后，获得最终结果 “acb”。

// 输入：s = "baaca", k = 3
// 输出："aaabc"
// 解释：
// 在第一步中，我们将第一个字符（“b”）移动到最后，获得字符串 “aacab”。
// 在第二步中，我们将第三个字符（“c”）移动到最后，获得最终结果 “aaabc”。

/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
// 方法一：分类考虑
// 当 k > 1 时，我们能够构造出任意的字符串方案，因此当 k > 1 时，我们可以直接通过对字符串排序生成字典序最小的序列，复杂度为 O(nlogn)。
// 当 k == 1时，每次只能取 s 的首个字符并将其移动到末尾，即循环移动每个元素，无法改变相对位置。因此只需要获取循环移动过程中字典序最小的序列。
var orderlyQueue = function (s, k) {
    if (k === 1) {
        let ans = s;
        for (let i = 0; i < s.length - 1; i++) {
            s = s.slice(1) + s[0];
            ans = ans < s ? ans : s;
        }
        return ans;
    }
    // k<=2
    return [...s].sort().join('');
};
// 时间复杂度：O(n^2)，n 为字符串 s 的长度。当 k == 1时需要遍历n个可能的字符串，每个字符串需要 O(n)的时间生成和判断是否是字典序最小，时间复杂度总和为O(n^2)；当 k > 1 时需要对字符串排序，时间复杂度是 O(nlogn)。最坏的情况下时间复杂度为O(n^2)。
// 空间复杂度：O(logn)，即为快速排序所使用的栈空间。
