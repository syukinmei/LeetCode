// 字母序连续字符串 是由字母表中连续字母组成的字符串。换句话说，字符串 "abcdefghijklmnopqrstuvwxyz" 的任意子字符串都是 字母序连续字符串 。

//  - 例如，"abc" 是一个字母序连续字符串，而 "acb" 和 "za" 不是。

// 给你一个仅由小写英文字母组成的字符串 s ，返回其 最长 的 字母序连续子字符串 的长度。

// 输入：s = "abacaba"
// 输出：2
// 解释：共有 4 个不同的字母序连续子字符串 "a"、"b"、"c" 和 "ab" 。
// "ab" 是最长的字母序连续子字符串。

// 输入：s = "abcde"
// 输出：5
// 解释："abcde" 是最长的字母序连续子字符串。

// 方法一：模拟
// 从左到右遍历字符串，过程中维护以当前字符为结尾的最长【字母序连续字符串】的长度 cur 和 全局最长【字母序连续字符串】的长度 max。
//  - 若当前字符 s[i] 为上一个字符 s[i-1] 在字母序上的下一个字符，则令 cur + 1 并更新 max。
//  - 否则，令 cur = 1，表示当前字符 s[i] 为新的【字母序连续字符串】的起始字符。
// 遍历结束后，返回 max 即可。
/**
 * @param {string} s
 * @return {number}
 */
var longestContinuousSubstring = function (s) {
    let max = 1;
    let cur = 1;
    for (let i = 1; i < s.length; i++) {
        if (s[i].charCodeAt() === s[i - 1].charCodeAt() + 1) {
            cur++;
            max = Math.max(max, cur);
        } else {
            cur = 1;
        }
    }
    return max;
};
// 时间复杂度：O(n)，其中 n 为字符串 s 的长度，需要遍历字符串一次以获得最长的字母序连续子字符串的长度。
// 空间复杂度：O(1)，只需要常数的空间存放若干变量。
