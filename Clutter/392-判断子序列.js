// 给定字符串 s 和 t ，判断 s 是否为 t 的子序列。
// 字符串的一个子序列是原始字符串删除一些（也可以不删除）字符而不改变剩余字符相对位置形成的新字符串。（例如，"ace"是"abcde"的一个子序列，而"aec"不是）。

// 进阶：
// 如果有大量输入的 S，称作 S1, S2, ... , Sk 其中 k >= 10亿，你需要依次检查它们是否为 T 的子序列。在这种情况下，你会怎样改变代码？

// 输入：s = "abc", t = "ahbgdc"
// 输出：true

// 输入：s = "axc", t = "ahbgdc"
// 输出：false

/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
// 方法一：双指针
// 两个指针 i， j 分别指向字符串 s，t 的首个字符，遍历字符串 t：
//  - s[i] === t[j] 时，代表匹配成功，此时同时 i++，j++；
//    - 进而，若 i 已遍历完 s，则说明 s 是 t 的子序列，返回 true；
//  - s[i] !== t[j] 时，代表匹配失败，此时仅 j++；
// 若遍历完字符串 t 后，字符串 s 仍未遍历完，代表 s 不是 t 的子序列，此时返回 false。
var isSubsequence = function (s, t) {
    let left = 0;
    let right = 0;
    while (left < s.length && right < t.length) {
        if (s[left] === t[right]) {
            left++;
        }
        right++;
    }
    return left === s.length;
};
// 时间复杂度：O(n)，n 为字符串 t 的长度。循环体最多执行 n 次，即完整的遍历了字符串 t。
// 空间复杂度：O(1)，只需要常数的空间存放若干遍历。
