// 给你一个下标从 0 开始的数组 words ，数组中包含 互不相同 的字符串。
// 如果字符串 words[i] 与字符串 words[j] 满足以下条件，我们称它们可以匹配：
// 字符串 words[i] 等于 words[j] 的反转字符串。
// 0 <= i < j < words.length
// 请你返回数组 words 中的 最大 匹配数目。
// 注意，每个字符串最多匹配一次。

// 输入：words = ["cd","ac","dc","ca","zz"]
// 输出：2
// 解释：在此示例中，我们可以通过以下方式匹配 2 对字符串：
// - 我们将第 0 个字符串与第 2 个字符串匹配，因为 word[0] 的反转字符串是 "dc" 并且等于 words[2]。
// - 我们将第 1 个字符串与第 3 个字符串匹配，因为 word[1] 的反转字符串是 "ca" 并且等于 words[3]。
// 可以证明最多匹配数目是 2 。

// 输入：words = ["ab","ba","cc"]
// 输出：1
// 解释：在此示例中，我们可以通过以下方式匹配 1 对字符串：
// - 我们将第 0 个字符串与第 1 个字符串匹配，因为 words[1] 的反转字符串 "ab" 与 words[0] 相等。
// 可以证明最多匹配数目是 1 。

// 输入：words = ["aa","ab"]
// 输出：0
// 解释：这个例子中，无法匹配任何字符串。

// 提示：
// - 1 <= words.length <= 50
// - words[i].length == 2
// - words 包含的字符串互不相同。
// - words[i] 只包含小写英文字母。

// 方法一：哈希集合
// 看到题目可以很快的想到流程是：遍历字符串数组 words 。对于每个字符串 xy 查找 yx 是否在哈希集合中存在过。
// 为了方便，我们可以存储字符串的哈希值，对于每个字符串 words[i] 判断其反转字符串的哈希值是否存在。
// 哈希值需要确保不冲突，本题字符串的长度为 2，并且只有小写字母，因此可以使用 100a + b 作为哈希值，其中 a 和 b 分别为两个字符的 ASCII 值。

// Q：100a+b 作为哈希值 这个咋理解？
// A：如果不是 100a + b 的话，是 a + b 的话 “ad” 和 “bc” 字符串他们 ASCII 码就会一样，使用a前面要乘一个数，也可以不是100，可以是50和其他数字。
/**
 * @param {string[]} words
 * @return {number}
 */
var maximumNumberOfStringPairs = function (words) {
    const seen = new Set();

    let count = 0;

    for (const word of words) {
        const wordHash = word.charCodeAt(0) * 100 + word.charCodeAt(1);
        const reversalWordHash = word.charCodeAt(1) * 100 + word.charCodeAt(0);

        if (seen.has(reversalWordHash)) count++;
        else seen.add(wordHash);
    }

    return count;
};
// 时间复杂度：O(n)，n 为字符串数组 words 的长度，只需要对其进行一次遍历。
// 空间复杂度：O(n)，n 为字符串数组 words 的长度，用作哈希集合的空间，最坏情况没有匹配的字符串，所有字符都会加入哈希集合中。
