// 句子 是一个单词列表，列表中的单词之间用单个空格隔开，且不存在前导或尾随空格。每个单词仅由大小写英文字母组成（不含标点符号）。
// 例如，"Hello World"、"HELLO" 和 "hello world hello world" 都是句子。
// 给你一个句子 s​​​​​​ 和一个整数 k​​​​​​ ，请你将 s​​ 截断 ​，​​​使截断后的句子仅含 前 k​​​​​​ 个单词。返回 截断 s​​​​​​ 后得到的句子。

// 输入：s = "Hello how are you Contestant", k = 4
// 输出："Hello how are you"
// 解释：
// s 中的单词为 ["Hello", "how" "are", "you", "Contestant"]
// 前 4 个单词为 ["Hello", "how", "are", "you"]
// 因此，应当返回 "Hello how are you"

// 输入：s = "What is the solution to this problem", k = 4
// 输出："What is the solution"
// 解释：
// s 中的单词为 ["What", "is" "the", "solution", "to", "this", "problem"]
// 前 4 个单词为 ["What", "is", "the", "solution"]
// 因此，应当返回 "What is the solution"

// 输入：s = "chopper is not a tanuki", k = 5
// 输出："chopper is not a tanuki"


/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
// 方法一：API
// 分隔成数组，取前k个，再拼成字符串。
var truncateSentence = function (s, k) {
    return s.split(' ').splice(0, k).join(' ');
};

// 方法二：遍历
var truncateSentence = function (s, k) {
    let end = 0;
    for (let i = 0; i <= s.length && k > 0; i++) {
        if (s.charAt(i) === ' ' || i === s.length) {
            k--;
            end = i;
        }
    }
    return s.slice(0, end);
};
// 时间复杂度：O(n)，n为字符串 s 的长度，遍历整个字符串需要O(n)。
// 空间复杂度：O(1)，返回值不计入空间复杂度，只需要常数的空间存放若干变量。