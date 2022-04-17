// 给定一个段落 (paragraph) 和一个禁用单词列表 (banned)。返回出现次数最多，同时不在禁用列表中的单词。
// 题目保证至少有一个词不在禁用列表中，而且答案唯一。
// 禁用列表中的单词用小写字母表示，不含标点符号。段落中的单词不区分大小写。答案都是小写字母。


// 输入: 
// paragraph = "Bob hit a ball, the hit BALL flew far after it was hit."
// banned = ["hit"]
// 输出: "ball"
// 解释: 
// "hit" 出现了3次，但它是一个禁用的单词。
// "ball" 出现了2次 (同时没有其他单词出现2次)，所以它是段落里出现次数最多的，且不在禁用列表中的单词。 
// 注意，所有这些单词在段落里不区分大小写，标点符号需要忽略（即使是紧挨着单词也忽略， 比如 "ball,"）， 
// "hit"不是最终的答案，虽然它出现次数更多，但它在禁用单词列表中。

/**
 * @param {string} paragraph
 * @param {string[]} banned
 * @return {string}
 */
// 方法一：哈希表 + 计数
// 为了判断给定段落的单词是否在禁用单词列表中，使用哈希合集存储禁用单词列表的单词。
// 遍历 paragraph 得到段落中所有的单词，并且使用哈希表对每个单词计数，同时维护一个 maxFrequency 表示出现次数最多的单词的次数
// 遍历计数哈希表，根据 maxFrequency 寻找对应单词。
var mostCommonWord = function (paragraph, banned) {
    // 生成禁用集
    const bannedSet = new Set();
    for (let word of banned) {
        bannedSet.add(word);
    }

    const map = new Map();
    let maxFrequency = 0;
    let sb = '';
    for (let i = 0; i <= paragraph.length; i++) {
        if (i < paragraph.length && isLeeter(paragraph[i])) {
            sb += paragraph[i].toLowerCase();
        } else if (sb.length > 0) {
            if (!bannedSet.has(sb)) {
                map.set(sb, map.has(sb) ? map.get(sb) + 1 : 1);
                maxFrequency = Math.max(maxFrequency, map.get(sb));
            }
            sb = '';
        }
    }
    // 寻找出现次数最多的单词
    for (let [word, frequency] of map.entries()) {
        if (frequency === maxFrequency) return word;
    }
};

// 辅助函数 判断ch是否是字母
const isLeeter = function (ch) {
    return (ch.charCodeAt() >= 97 && ch.charCodeAt() <= 122) || (ch.charCodeAt() >= 65 && ch.charCodeAt() <= 90);
}
// 时间复杂度：O(n+m)，n 为 段落 paragraph 的长度，m 为 禁用单词列表 banned 的长度。遍历禁用单词列表一次将禁用单词存入哈希集合需要O(m)的时间，遍历段落得到每一个非禁用单词的计数需要O(n)的时间，遍历哈希表得到最常见的单词需要O(n)的时间。
// 空间复杂度：O(n+m)，n 为 段落 paragraph 的长度，m 为 禁用单词列表 banned 的长度。存储禁用单词的哈希集合需要O(m)的空间，记录每个单词的计数的哈希表需要O(n)的空间。