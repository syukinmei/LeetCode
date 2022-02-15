// 句子仅由小写字母（'a' 到 'z'）、数字（'0' 到 '9'）、连字符（'-'）、标点符号（'!'、'.' 和 ','）以及空格（' '）组成。每个句子可以根据空格分解成 一个或者多个 token ，这些 token 之间由一个或者多个空格 ' ' 分隔。
// 如果一个 token 同时满足下述条件，则认为这个 token 是一个有效单词：
//  -  仅由小写字母、连字符和/或标点（不含数字）。
//  -  至多一个 连字符 '-' 。如果存在，连字符两侧应当都存在小写字母（"a-b" 是一个有效单词，但 "-ab" 和 "ab-" 不是有效单词）。
//  -  至多一个 标点符号。如果存在，标点符号应当位于 token 的 末尾 。
// 这里给出几个有效单词的例子："a-b."、"afad"、"ba-c"、"a!" 和 "!" 。
// 给你一个字符串 sentence ，请你找出并返回 sentence 中 有效单词的数目 。


// 输入：sentence = "cat and  dog"
// 输出：3
// 解释：句子中的有效单词是 "cat"、"and" 和 "dog"

// 输入：sentence = "!this  1-s b8d!"
// 输出：0
// 解释：句子中没有有效单词
// "!this" 不是有效单词，因为它以一个标点开头
// "1-s" 和 "b8d" 也不是有效单词，因为它们都包含数字

// 输入：sentence = "alice and  bob are playing stone-game10"
// 输出：5
// 解释：句子中的有效单词是 "alice"、"and"、"bob"、"are" 和 "playing"
// "stone-game10" 不是有效单词，因为它含有数字

// 输入：sentence = "he bought 2 pencils, 3 erasers, and 1  pencil-sharpener."
// 输出：6
// 解释：句子中的有效单词是 "he"、"bought"、"pencils,"、"erasers,"、"and" 和 "pencil-sharpener."


/**
 * @param {string} sentence
 * @return {number}
 */
// 方法一：遍历模拟
// 由题意得，不满足条件的 token 为以下其中之一：
//  - 单词中有数字
//  - 单词中有两个连字符 '-‘
//  - 连字符在单词开头或者尾部 '-'
//  - 连字符的左/右字符不是小写字母
//  - 单词中的标点符号不在单词的尾部
var countValidWords = function (sentence) {
    const wordsArr = sentence.split(' ');
    let res = 0;
    for (let token of wordsArr) {
        if (isValid(token)) res++;
    }
    return res;
};
// 辅助函数 判断该 token 是否有效
const isValid = (token) => {
    if (token === '') return false;
    const n = token.length;
    let hasHyphens = false; // 表示连字符是否出现过
    for (let i = 0; i < n; i++) {
        const ch = token.at(i);
        if (!isNaN(parseInt(ch))) return false; // 如果单词中包含数字则无效

        if (ch === '-') {
            // 判断是否 出现过连字符 或者 连字符出现在 token 开头或尾部
            // 判断连字符左右是否是小写字母
            // 满足其一则无效
            if (hasHyphens === true || i === 0 || i === n - 1 || !isLetter(token.at(i - 1)) || !isLetter(token.at(i + 1))) {
                return false;
            }
            hasHyphens = true; // 更新 hasHyphens 表示出现过
        }

        // 遇到标点符号判断是否是 token 的尾部 ，不是则无效
        if (ch === '!' || ch === '.' || ch === ',') {
            if (i !== n - 1) return false;
        }
    }
    // 到达这里没有被return出去则说明该 token 有效
    return true;
}
// 辅助函数 判断是否是小写字母
const isLetter = (ch) => {
    if (ch >= 'a' && ch <= 'z') return true;
    return false;
}
// 时间复杂度：O(n)，n 为字符串 sentence 的长度。切分整个句子，并且处理单词需要O(n)。
// 空间复杂度：O(1)。只需要常数的空间存放若干变量。


// 方法二：正则
// 完整正则表达式：/^([,.!]|[a-z]+(-[a-z]+)?[,.!]?)$/
// 其中用 () 和 | 把正则中间部分分成两种情况，实际可以当成两个正则：/^[,.!]$/ 与 /^[a-z]+(-[a-z]+)?[,.!]?$/
// 要匹配完整的token：用 ^ 表示匹配到字符串起始位置，用 $ 表示匹配到字符串末尾
// token只有1个标点符号，即第一种情况 /^[,.!]$/，表示整个字符串是3个标点中任意1个
// token有字母的情况下，即第二种情况 /^[a-z]+(-[a-z]+)?[,.!]?$/，一定是1个或多个字母开头即 ^[a-z]+，后面可能有连字符 - 和字母即 (-[a-z]+)?，末尾可能有标点即 [,.!]?$

var countValidWords = function (sentence) {
    return sentence.split(' ').filter(w => /^([,.!]|[a-z]+(-[a-z]+)?[,.!]?)$/.test(w)).length;
};