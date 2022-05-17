

/**
 * @param {string[]} words
 * @param {string} order
 * @return {boolean}
 */
var isAlienSorted = function (words, order) {
    // map[1]表示a在外星语中的排序，map[2]表示b在外星语中的排序。
    // 或者使用哈希表，key为字母，value为该字母在外星语中的排序。
    const map = new Array(26).fill(0);
    for (let i = 0; i < 26; i++) {
        map[order[i].charCodeAt() - 'a'.charCodeAt()] = i;
    }

    for (let i = 0; i < words.length - 1; i++) {
        if (compare(words[i], words[i + 1], map) > 0) return false;
    }
    return true;
};

// 辅助函数
/**
 * 比较两个字符串的排序
 * @param {string} s1 - 字符串1 
 * @param {string} s2 - 字符串2 
 * @param {number[]} map - 字典序数组
 * @return {number} 字符串s1和s2第一个不同字符在外星语字典序的差
 */
var compare = function (s1, s2, map) {
    const Len1 = s1.length;
    const Len2 = s2.length;
    for (let i = 0; i < Len1 && i < Len2; i++) {
        if (s1[i] !== s2[i]) {
            const c1Index = s1[i].charCodeAt() - 'a'.charCodeAt();
            const c2Index = s2[i].charCodeAt() - 'a'.charCodeAt();
            return map[c1Index] - map[c2Index];
        }
    }
    // 如果两个字符串是存在父子串关系（如'apple'和'app'），返回长度差
    return Len1 - Len2;
}
// 时间复杂度：O(m*n)，m 为 words 字符串数组的长度，n 为数组中字符串的平均长度，每个字符串需要和后一个字符串进行比较，因此时间复杂度为O(m*n)
// 空间复杂度：O(C)，C 为字母表的长度，需要存储字母表 order 每个字母的字典序索引，题目给定的字母表长度为C=26