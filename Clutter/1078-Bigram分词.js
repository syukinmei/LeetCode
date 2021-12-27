// 给出第一个词 first 和第二个词 second，考虑在某些文本 text 中可能以 "first second third" 形式出现的情况，其中 second 紧随 first 出现，third 紧随 second 出现。
// 对于每种这样的情况，将第三个词 "third" 添加到答案中，并返回答案。

// 输入：text = "alice is a good girl she is a good student", first = "a", second = "good"
// 输出：["girl","student"]

// 输入：text = "we will we will rock you", first = "we", second = "will"
// 输出：["we","rock"]



/**
 * @param {string} text
 * @param {string} first
 * @param {string} second
 * @return {string[]}
 */

// 方法一：直接遍历（模拟）
// 思路：我们将文本 text 按空格分割成单词数组 words，然后遍历 words 数组，如果某一个单词的前两个单词分别按顺序等于 first 和 second ，则该单词符合第三个单词 third 的定义，将其加入结果数组中。
var findOcurrences = function (text, first, second) {
    const words = text.split(' ');
    const res = [];
    for (let i = 2; i < words.length; i++) {
        if (words[i - 2] === first && words[i - 1] === second) {
            res.push(words[i]);
        }
    }
    return res;
    // return text.match(new RegExp(`(?<=\\b${first} ${second} )[a-z]+`, 'g')) || [];
};

// 时间复杂度：O(n)，n为 text 的长度。分割text需要O(n)。
// 空间复杂度：O(n)，需要O(n)的空间来保存 words 数组。