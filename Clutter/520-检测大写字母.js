// 我们定义，在以下情况时，单词的大写用法是正确的：
// - 全部字母都是大写，比如 "USA" 。
// - 单词中所有字母都不是大写，比如 "leetcode" 。
// - 如果单词不只含有一个字母，只有首字母大写， 比如 "Google" 。
// 给你一个字符串 word 。如果大写用法正确，返回 true ；否则，返回 false 。

// 输入：word = "USA"
// 输出：true

// 输入：word = "FlaG"
// 输出：false


/**
 * @param {string} word
 * @return {boolean}
 */
// 题意剖析：
// 若第 1 个字母为大写，则其他字母必须均为大写或者均为小写，即其他字母必须与第 2 个字母的大小写相同
// 若第 1 个字母为小写，则其他字母必须均为小写
// 则有：
// 无论第 1 个字母是否大小写，其他字母必须与第 2 个字母的大小写相同。
// 若第 1 个字母为小写，则需额外判断第 2 个字母是否为小写。
// 转化为：
// 判断下标0字母为小写时，下标1字母是否为小写 是则返回 false；
// 判断下标大于等于2的字母大小写是否与下标1字母相同 不同则返回 false；
var detectCapitalUse = function (word) {
    // 处理特殊情况，字符长度为1直接返回true
    if (word.length === 1) return true;
    // （word长度大于1）如果第一个字母为小写，第二个字母为大写则 返回false
    if (word[0] === word[0].toLowerCase() && word[1] === word[1].toUpperCase()) return false;
    // 判断下标大于等于2的字母大小写是否与下标1字母相同
    for (let i = 2; i < word.length; i++) {
        // ^ 位异或 运算符 布尔值不同返回true（1^1=0, 0^0=0, 1^0=1, 0^1=1）
        if (word[1] === word[1].toLowerCase() ^ word[i] === word[i].toLowerCase()) return false;
        // 与上面👆等价
        // if (word[1] === word[1].toLowerCase()) {
        //     if (word[i] !== word[i].toLowerCase()) return false;
        // } else {
        //     if (word[i] === word[i].toLowerCase()) return false;
        // }
    }
    return true;
};

// 时间复杂度：O(n)，其中 n 为字符串的长度。我们需要遍历字符串中的每个字符。
// 空间复杂度：O(1)。