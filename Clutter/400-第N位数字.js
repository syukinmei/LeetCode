// 给你一个整数 n ，请你在无限的整数序列 [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, ...] 中找出并返回第 n 位数字。

// 输入：n = 3
// 输出：3

// 输入：n = 11
// 输出：0
// 解释：第 11 位数字在序列 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, ... 里是 0 ，它是 10 的一部分。



/**
 * @param {number} n
 * @return {number}
 */
// 数学模拟
// 1位数 有 9个 [1,9] 9个数字
// 2位数 有 90个 [10,99] 90个数字
// 3位数 有 900个 [100,999] 900个数字
// 则有 d位数的数字范围为[10^(d - 1), 10^d - 1]，共有9*10^(d - 1)个数字，有d*9*10^(d - 1)位数字。
var findNthDigit = function (n) {
    let d = 1, count = 9;
    while (n > d * count) {
        n -= d * count;
        d++;
        count *= 10;
    }
    // 此时d就是目标数组所在的整数的位数

    // 确认n是具体哪个整数
    const num = Math.floor((n - 1) / d) + Math.pow(10, d - 1);
    // 确认是这个整数的哪个下标
    const digitIndex = (n - 1) % d;
    // 取出这个数字
    const digit = (num + '')[digitIndex];
    // 下面这种方法看不懂 绕晕
    // const digit = Math.floor(num / Math.pow(10, d - digitIndex - 1)) % 10;
    return digit;
};
// 时间复杂度：O(log10 n)。用d表示n位数字是几位数，循环循环需要遍历d次，由于d = O(log10 n)，因此时间复杂度是O(log10 n)
// 空间复杂度：O(1)。只需要常数的空间存放若干变量。