// 给你一个字符串 s，由若干单词组成，单词前后用一些空格字符隔开。返回字符串中最后一个单词的长度。
// 单词 是指仅由字母组成、不包含任何空格字符的最大子字符串。

// 输入：s = "Hello World"
// 输出：5

// 输入：s = "   fly me   to   the moon  "
// 输出：4

// 输入：s = "luffy is still joyboy"
// 输出：6

var lengthOfLastWord = function (s) {
    // let index = s.length - 1;
    // while (s[index] === ' ') {
    //     index--;
    // }
    // let wordLength = 0;
    // while (index >= 0 && s[index] !== ' ') {
    //     wordLength++;
    //     index--;
    // }
    // return wordLength;

    let end = s.length - 1;
    while (s[end] === ' ') end--; // 取得最后一个为空字符的索引位置
    if (end < 0) return 0; // 排除全是空格的情况
    let start = end;
    while (start >= 0 && s[start] !== ' ') start--; // 取得最后一个不为空字符的索引位置
    return end - start;
};

// 思路：先从后过滤掉空格找到单词尾部，再从尾部向前遍历，找到单词头部，最后两者相减，即为单词的长度
// 时间复杂度：O(n)，n为结尾空格和结尾单词总体长度
// 空间复杂度：O(1)。