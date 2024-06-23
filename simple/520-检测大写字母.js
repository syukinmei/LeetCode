// 我们定义，在以下情况时，单词的大写用法是正确的：
//  - 全部字母都是大写，比如 "USA" 。
//  - 单词中所有字母都不是大写，比如 "leetcode" 。
//  - 如果单词不只含有一个字母，只有首字母大写， 比如 "Google" 。
// 给你一个字符串 word 。如果大写用法正确，返回 true ；否则，返回 false 。

// 输入：word = "USA"
// 输出：true

// 输入：word = "FlaG"
// 输出：false

// 方法一：遍历
// 我们可以统计字符串中大写字母的个数，然后根据大写字母的个数判断是否符合题目要求。
// 具体的：
// 遍历字符串 word，统计其中大写字母的个数 cnt。
//  - 如果 cnt = n，说明所有字母均为大写，符合要求。
//  - 如果 cnt = 0，说明所有字母均为小写，符合要求。
//  - 如果 cnt = 1，且 word[0] 是大写字母，说明 word 只有首字母大写，其余字母都是小写字母，符合要求。
//  - 其余情况均不符合要求。
/**
 * @param {string} word
 * @return {boolean}
 */
var detectCapitalUse = function (word) {
    const n = word.length;
    let cnt = 0;
    // 统计大写字母个数
    for (let i = 0; i < n; i++) {
        if (word[i] === word[i].toUpperCase()) cnt++;
    }

    // 符合要求的情况
    if (cnt === n) return true;
    if (cnt === 0) return true;
    if (cnt === 1 && word[0] === word[0].toUpperCase()) return true;

    // 其余情况均不符合要求
    return false;
};
// 时间复杂度：O(n)，n 为字符串 word 的长度。需要遍历一次字符串以统计大写字母的个数。
// 空间复杂度：O(1)，只需要常数的空间存放若干变量。
