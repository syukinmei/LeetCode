// 给你两个字符串数组 word1 和 word2 。如果两个数组表示的字符串相同，返回 true ；否则，返回 false 。
// 数组表示的字符串 是由数组中的所有元素 按顺序 连接形成的字符串。


// 输入：word1 = ["ab", "c"], word2 = ["a", "bc"]
// 输出：true
// 解释：
// word1 表示的字符串为 "ab" + "c" -> "abc"
// word2 表示的字符串为 "a" + "bc" -> "abc"
// 两个字符串相同，返回 true


// 输入：word1 = ["a", "cb"], word2 = ["ab", "c"]
// 输出：false

// 输入：word1  = ["abc", "d", "defg"], word2 = ["abcddefg"]
// 输出：true

/**
 * @param {string[]} word1
 * @param {string[]} word2
 * @return {boolean}
 */
// 方法一：api大法
var arrayStringsAreEqual = function (word1, word2) {
    return word1.join('') === word2.join('');
};

// 方法二：遍历
// 设两个指针 w1 和 w2 分别指向当前遍历的 word1[w1] 和 word2[w2]；
// 另外还需设置两个指针 i 和 j 指向当前正在对比的 word1[w1][i] 和 word[w2][j]；
//  - 如果 word1[w1][i] !== word2[w2][j] 则直接返回false。
//  - 否则 i+1 当前 i === word1[w1].length 时，表示对比到当前字符串末尾，需要将 w1+1，并将 i 赋值为0。w2 和 j 同理。
//  - 当前 w1<word1.length 或 w2<word2.length 不满足时，算法结束。
//  - 最终两个数组相等的条件为 w1 === word1.length 且 w2 === word2.length;
var arrayStringsAreEqual = function (word1, word2) {
    let w1 = 0, w2 = 0, i = 0, j = 0;
    while (w1 < word1.length && w2 < word2.length) {
        if (word1[w1][i] !== word2[w2][j]) return false;

        i++;
        if (i === word1[w1].length) {
            w1++;
            i = 0;
        }

        j++;
        if (j === word2[w2].length) {
            w2++;
            j = 0;
        }
    }
    return w1 === word1.length && w2 === word2.length;
};
// 时间复杂度：O(n+m)，n 和 n 分别是 ∑word1[i].length 和 ∑word2[i].length。
// 空间复杂度：O(1)，只需要常数的空间存放若干变量。
