// 给你两个字符串 word1 和 word2 。请你从 word1 开始，通过交替添加字母来合并字符串。如果一个字符串比另一个字符串长，就将多出来的字母追加到合并后字符串的末尾。

// 返回 合并后的字符串 。

// 输入：word1 = "abc", word2 = "pqr"
// 输出："apbqcr"
// 解释：字符串合并情况如下所示：
// word1：  a   b   c
// word2：    p   q   r
// 合并后：  a p b q c r

// 输入：word1 = "ab", word2 = "pqrs"
// 输出："apbqrs"
// 解释：注意，word2 比 word1 长，"rs" 需要追加到合并后字符串的末尾。
// word1：  a   b 
// word2：    p   q   r   s
// 合并后：  a p b q   r   s

// 输入：word1 = "abcd", word2 = "pq"
// 输出："apbqcd"
// 解释：注意，word1 比 word2 长，"cd" 需要追加到合并后字符串的末尾。
// word1：  a   b   c   d
// word2：    p   q 
// 合并后：  a p b q c   d

// 方法一：双指针模拟
// 我们直接按照题目的要求模拟即可，我们使用两个指针 idx_w1、idx_w2，分别指向 word1、word2 当前循环位置。
// 循环过程中，进行如下两步操作：
//  - idx_w1 没有超出 word1 的范围，就将 word1[idx_w1] 加入答案，并且将 idx_1 后移一位。
//  - idx_w2 没有超出 word2 的范围，就将 word2[idx_w2] 加入答案，并且将 idx_2 后移一位。
// 当 idx_w1 和 idx_w2 都超出对应范围后，结束循环并返回答案即可。
/**
 * @param {string} word1
 * @param {string} word2
 * @return {string}
 */
var mergeAlternately = function (word1, word2) {
    const Len_W1 = word1.length, Len_W2 = word2.length;
    let idx_w1 = 0, idx_w2 = 0;

    let res = '';
    while (idx_w1 < Len_W1 || idx_w2 < Len_W2) {
        if (idx_w1 < Len_W1) {
            res += word1[idx_w1];
            idx_w1++;
        }

        if (idx_w2 < Len_W2) {
            res += word2[idx_w2];
            idx_w2++;
        }
    }
    return res;
};
// 时间复杂度：O(m+n)，m 和 n 分别为 word1 和 word2 的长度。
// 空间复杂度：O(1)，只需要常数的空间存放若干变量。
