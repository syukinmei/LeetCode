// 给你一个字符串 text，你需要使用 text 中的字母来拼凑尽可能多的单词 "balloon"（气球）。
// 字符串 text 中的每个字母最多只能被使用一次。请你返回最多可以拼凑出多少个单词 "balloon"。

// 输入：text = "nlaebolko"
// 输出：1

// 输入：text = "loonbalxballpoon"
// 输出：2

// 输入：text = "leetcode"
// 输出：0

/**
 * @param {string} text
 * @return {number}
 */
// 模拟
// 构成单词 balloon 因此只需要统计 b a l o n 的数量即可，其中 l 和 o 需要两个，因此将该两个字母的数量除以2，之后所需单词中数量最小的即为可构成的单词数。
var maxNumberOfBalloons = function (text) {
    // 2l 2o 1a 1b 1n
    const needLetter = {
        'b': 1,
        'a': 2,
        'l': 3,
        'o': 4,
        'n': 5,
    }
    const haveLetter = new Array(5).fill(0);
    for (const ch of text) {
        if (needLetter[ch]) {
            haveLetter[needLetter[ch] - 1]++;
        }
    }
    // l 和 o 的数量除以 2，haveLetter 中数量最小的就是可构成气球的最大数量
    haveLetter[2] = Math.floor(haveLetter[2] / 2);
    haveLetter[3] = Math.floor(haveLetter[3] / 2);
    return Math.min(...haveLetter);
};
// 时间复杂度：O(n)，n 为字符串 text 的长度，需要遍历一次字符串，统计 text 的词频。
// 空间复杂度：O(C)，C 表示单词中字符的种类数，本题中 C = 5。需要O(C)的空间存放字符的统计数目。
