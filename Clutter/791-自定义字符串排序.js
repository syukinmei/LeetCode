// 给定两个字符串 order 和 s 。order 的所有单词都是 唯一 的，并且以前按照一些自定义的顺序排序。
// 对 s 的字符进行置换，使其与排序的 order 相匹配。更具体地说，如果在 order 中的字符 x 出现字符 y 之前，那么在排列后的字符串中， x 也应该出现在 y 之前。
// 返回 满足这个性质的 s 的任意排列 。

// 输入: order = "cba", s = "abcd"
// 输出: "cbad"
// 解释: 
// “a”、“b”、“c”是按顺序出现的，所以“a”、“b”、“c”的顺序应该是“c”、“b”、“a”。
// 因为“d”不是按顺序出现的，所以它可以在返回的字符串中的任何位置。“dcba”、“cdba”、“cbda”也是有效的输出。

// 输入: order = "cbafg", s = "abcd"
// 输出: "cbad"

// 1 <= order.length <= 26
// 1 <= s.length <= 200
// order 和 s 由小写英文字母组成
// order 中的所有字符都 不同

/**
 * @param {string} order
 * @param {string} s
 * @return {string}
 */
// 方法一：模拟
// 根据题意进行模拟即可：先使用大小为 C = 26 的数组 freq 对 s 所有字符进行词频统计，然后根据 order 的优先级进行构造。
// 若 字符 x 在 order 中排在 y 前面，则先往答案中追究 freq[x] 个字符 x，再往答案追究 freq[y]个字符y，并更新对应词频，最后将仅出现在 s 中的字符追加到答案尾部。
var customSortString = function (order, s) {
    // 统计s中各字母数量
    const freq = new Array(26).fill(0);
    for (const c of s) {
        const cIndex = c.charCodeAt() - 'a'.charCodeAt();
        freq[cIndex]++;
    }

    let res = '';

    // 根据 order 的优先级进行构造
    for (const c of order) {
        const cIndex = c.charCodeAt() - 'a'.charCodeAt();
        while (freq[cIndex] > 0) {
            res += c;
            freq[cIndex]--;
        }
    }

    // 追加剩余字母
    for (let i = 0; i < 26; i++) {
        while (freq[i] > 0) {
            res += String.fromCharCode(i + 'a'.charCodeAt());
            freq[i]--;
        }
    }
    return res;
};
// 时间复杂度：O(n+C)，n 为 字符串 s 的长度，C 为字符集，本题 C = 26。
// 空间复杂度：O(C)，C = 26 为字符集的大小。
