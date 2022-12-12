// 一个字符串的 美丽值 定义为：出现频率最高字符与出现频率最低字符的出现次数之差。

//  - 比方说，"abaacc" 的美丽值为 3 - 1 = 2 。
// 给你一个字符串 s ，请你返回它所有子字符串的 美丽值 之和。


// 输入：s = "aabcb"
// 输出：5
// 解释：美丽值不为零的字符串包括 ["aab","aabc","aabcb","abcb","bcb"] ，每一个字符串的美丽值都为 1 。


// 输入：s = "aabcbaa"
// 输出：17

// 使用双指针枚举出该字符串中的所有子串。对于每一子串，我们维护其词频表。计算每个子串的美丽值，将其累加到答案中即可。
/**
 * @param {string} s
 * @return {number}
 */
var beautySum = function (s) {
    let res = 0;
    for (let i = 0; i < s.length; i++) {
        const cnt = new Array(26).fill(0); // 词频表。下标对应小写字母顺序，值对应字母出现的次数。
        let maxFreq = 0; // 最高频次
        for (let j = i; j < s.length; j++) {
            let chIdx = s[j].charCodeAt() - 'a'.charCodeAt();
            cnt[chIdx]++;
            // 对于[s[i], s[s.length-1]]之间的子字符串最大频率一定是通用的，所有在这里维护。
            maxFreq = Math.max(maxFreq, cnt[chIdx]);
            let minFreq = s.length;
            for (let k = 0; k < 26; k++) {
                if (cnt[k] > 0) minFreq = Math.min(minFreq, cnt[k]);
            }
            res += maxFreq - minFreq; // 更新这个子字符串对美丽值的贡献
        }
    }
    return res;
};
// 时间复杂度：O(C*n^2)，C为 s 的元素种类，此题为26个小写字母，n 为字符串 s 的长度。
// 空间复杂度：O(C)，即为词频表所需要的空间。
