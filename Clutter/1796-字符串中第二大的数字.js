// 给你一个混合字符串 s ，请你返回 s 中 第二大 的数字，如果不存在第二大的数字，请你返回 -1 。
// 混合字符串 由小写英文字母和数字组成。

// 输入：s = "dfa12321afd"
// 输出：2
// 解释：出现在 s 中的数字包括 [1, 2, 3] 。第二大的数字是 2 。

// 输入：s = "abc1111"
// 输出：-1
// 解释：出现在 s 中的数字只包含 [1] 。没有第二大的数字。


/**
 * @param {string} s
 * @return {number}
 */
// 遍历
// 使用 first、second 分别记录 s 中第一大的数字和第二大的数字，且初始化时两者均为 -1。
// 遍历字符串 s ，如果遇到字母则跳过，如果是数字，则判断它的大小情况。
//  - num > first，则说明当前第一大数字为 num，第二大数字为 first。更新 first 和 second。
//  - first > num > second，则当前第一大数字还是 first，第二大数字为 nums。更新 second。
var secondHighest = function (s) {
    let first = -1; // 第一大
    let second = -1; // 第二大
    for (let c of s) {
        if (0 <= c && c <= 9) {
            if (c > first) {
                second = first;
                first = c;
            } else if (c < first && c > second) {
                second = c;
            }
        }
    }
    return second;
};
// 时间复杂度：O(n)，n 为字符串 s 的长度。
// 空间复杂度：O(1)，只需要常数的空间存放若干变量。
