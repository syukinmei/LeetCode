// 如果一个整数能够被其各个数位上的数字之和整除，则称之为 哈沙德数（Harshad number）。给你一个整数 x 。如果 x 是 哈沙德数 ，则返回 x 各个数位上的数字之和，否则，返回 -1 。

// 输入： x = 18
// 输出： 9
// 解释：
// x 各个数位上的数字之和为 9 。18 能被 9 整除。因此 18 是哈沙德数，答案是 9 。

// 输入： x = 23
// 输出： -1
// 解释：
// x 各个数位上的数字之和为 5 。23 不能被 5 整除。因此 23 不是哈沙德数，答案是 -1 。

// 方法一：模拟
// 我们计算 x 的各数位和 digitSum 求出后，再用 x % digitSum 判断 x 是否为哈沙德数。
/**
 * @param {number} x
 * @return {number}
 */
var sumOfTheDigitsOfHarshadNumber = function (x) {
    let digitSum = 0; // 计算各位之和，初始位1
    let temp = x;
    while (temp !== 0) {
        const digit = temp % 10; // 获取当前位
        digitSum += digit; // 累加各位之和
        temp = (temp - digit) / 10; // 移除当前 temp 的最低位，数字减少为原来的十分之一，相当于右移了一位
    }
    return x % digitSum === 0 ? digitSum : -1;
};
// 时间复杂度：O(logn)，即为数字 n 的位数。
// 空间复杂度：O(1)，只需要常数的空间存放若干变量。
