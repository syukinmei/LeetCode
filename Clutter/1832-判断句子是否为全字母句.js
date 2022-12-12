// 全字母句 指包含英语字母表中每个字母至少一次的句子。
// 给你一个仅由小写英文字母组成的字符串 sentence ，请你判断 sentence 是否为 全字母句 。
// 如果是，返回 true ；否则，返回 false 。


// 输入：sentence = "thequickbrownfoxjumpsoverthelazydog"
// 输出：true
// 解释：sentence 包含英语字母表中每个字母至少一次。

// 输入：sentence = "leetcode"
// 输出：false

/**
 * @param {string} sentence
 * @return {boolean}
 */
// 方法一：循环
// 由于字符串 sentence 仅由小写英文字母组成，所以我们用一个长度为 26 的数组 Map_freq 作为词频表来统计每个字母的出现次数。
// 遍历字符串 sentence 构建词频表，最后检测词频表是否存在出现0次的字母，存在返回false，否则返回true。
var checkIfPangram = function (sentence) {
    const Map_freq = new Array(26).fill(0); // 词频表。下标对应小写字母顺序，值对应字母出现的次数。
    for (let i = 0; i < sentence.length; i++) {
        const chIdx = sentence[i].charCodeAt() - 'a'.charCodeAt();
        Map_freq[chIdx]++;
    }
    for (const x of Map_freq) {
        if (x === 0) return false;
    }
    return true;
};
// 时间复杂度：O(n+C)，n 为字符串 sentence 的长度，C 为字符集（词频表）的大小，本题词频表只包含26个小写英文字母，所以 C 为26，整个过程需要遍历一次 sentence 和 Map_freq。
// 空间复杂度：O(C)，C 为字符集（词频表）的大小，本题词频表只包含26个小写英文字母，所以 C 为26。