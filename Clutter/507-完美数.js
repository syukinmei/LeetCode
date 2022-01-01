// 对于一个 正整数，如果它和除了它自身以外的所有 正因子 之和相等，我们称它为 「完美数」。
// 给定一个 整数 n， 如果是完美数，返回 true，否则返回 false

// 输入：num = 28
// 输出：true
// 解释：28 = 1 + 2 + 4 + 7 + 14
// 1, 2, 4, 7, 和 14 是 28 的所有正因子。

// 输入：num = 6
// 输出：true

// 输入：num = 496
// 输出：true

// 输入：num = 8128
// 输出：true

// 输入：num = 2
// 输出：false

/**
 * @param {number} num
 * @return {boolean}
 */
// 方法一：投机取巧
var checkPerfectNumber = function (num) {
    const Perfects = [6, 28, 496, 8128, 33550336]; // 完美数只有这些
    return Perfects.some(item => {
        return item === num;
    })
};
// 时间复杂度：O(1)
// 空间复杂度：O(1)


// 方法二：枚举
// 枚举 num 的所有正因子并列加，记作 sum 。若 sum === num 则返回 true ，反之 false 。
// 正因子必然是成对出现的，故而我们只需要遍历到 num 的平方根 sqrt 即可。
// 需要注意的是 i*i = num 时这两个因子 i 相同，需避免重复计算。

var checkPerfectNumber = function (num) {
    // 首先由于完美数的定义，需要排除自身，所以数字 1 一定不是完美数。
    if (num === 1) return false;
    let sum = 1; // 正因子一定会有一个 1 ，同时不用考虑自身，所以单独处理
    let sqrt = Math.sqrt(num);
    let i = 2;
    for (; i < sqrt; i++) {
        if (num % i === 0) {
            sum += i + num / i;
        }
    }
    if (i * i === num) sum += i; // 避免重复计算，所以单独处理
    return sum === num;
};
// 时间复杂度：O(√num)。
// 空间复杂度：O(1)，只需要常数的空间存放若干变量。