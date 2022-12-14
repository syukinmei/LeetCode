// 给你一个由小写字母组成的字符串 s ，以及一个整数 k 。
// 首先，用字母在字母表中的位置替换该字母，将 s 转化 为一个整数（也就是，'a' 用 1 替换，'b' 用 2 替换，... 'z' 用 26 替换）。接着，将整数 转换 为其 各位数字之和 。共重复 转换 操作 k 次 。
// 例如，如果 s = "zbax" 且 k = 2 ，那么执行下述步骤后得到的结果是整数 8 ：
//  - 转化："zbax" ➝ "(26)(2)(1)(24)" ➝ "262124" ➝ 262124
//  - 转换 #1：262124 ➝ 2 + 6 + 2 + 1 + 2 + 4 ➝ 17
//  - 转换 #2：17 ➝ 1 + 7 ➝ 8
// 返回执行上述操作后得到的结果整数。


// 输入：s = "iiii", k = 1
// 输出：36
// 解释：操作如下：
// - 转化："iiii" ➝ "(9)(9)(9)(9)" ➝ "9999" ➝ 9999
// - 转换 #1：9999 ➝ 9 + 9 + 9 + 9 ➝ 36
// 因此，结果整数为 36 。

// 输入：s = "leetcode", k = 2
// 输出：6
// 解释：操作如下：
// - 转化："leetcode" ➝ "(12)(5)(5)(20)(3)(15)(4)(5)" ➝ "12552031545" ➝ 12552031545
// - 转换 #1：12552031545 ➝ 1 + 2 + 5 + 5 + 2 + 0 + 3 + 1 + 5 + 4 + 5 ➝ 33
// - 转换 #2：33 ➝ 3 + 3 ➝ 6
// 因此，结果整数为 6 。

// 提示：
//  - 1 <= s.length <= 100
//  - 1 <= k <= 10
//  - s 由小写英文字母组成

// 模拟
// 在进行个位数求和前，我们需要根据给定的字符串 s，得到对应的数字串 digits。
//  - 字母转数字操作为 ch.charCodeAt() - 'a'.charCodeAt() + 1
// 然后进行 k 次对 digits 数字串各位数求和操作，得到新的数字串。
/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var getLucky = function (s, k) {
    // 字符串转数字串
    let digits = '';
    for (let i = 0; i < s.length; i++) {
        digits += s[i].charCodeAt() - 'a'.charCodeAt() + 1
    }
    // 根据题意进行 k 次计算各位数之和操作。
    // 注意，当 digits 长度为 1 时，后续的操作不会改变结果。
    while (k > 0 && digits.length > 1) {
        let sum = 0; // 本轮各位数字之和
        for (let j = 0; j < digits.length; j++) {
            sum += +digits[j];
        }
        digits = sum.toString(); // 更新数字串
        k--; // 更新次数
    }
    return +digits; // 一元加转数字返回
};
// 时间复杂度：O(n)，n 为字符串 s 的长度，构建 digits 数字串需要O(n)的时间。由于最坏情况 s 为 100个's'组成，也只需要4轮操作就会使得 digits 的长度变为1。这一部分的循环处理次数远小于 n ，可以看作O(n)，因此总的时间复杂度为O(n)。
// 空间复杂度：O(1)，只需要常数的空间存放若干变量。
