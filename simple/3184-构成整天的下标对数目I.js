// 给你一个整数数组 hours，表示以 小时 为单位的时间，返回一个整数，表示满足 i < j 且 hours[i] + hours[j] 构成 整天 的下标对 i, j 的数目。
// 整天 定义为时间持续时间是 24 小时的 整数倍 。
// 例如，1 天是 24 小时，2 天是 48 小时，3 天是 72 小时，以此类推。

// 输入： hours = [12,12,30,24,24]
// 输出： 2
// 解释：
// 构成整天的下标对分别是 (0, 1) 和 (3, 4)。

// 输入： hours = [72,48,24,3]
// 输出： 3
// 解释：
// 构成整天的下标对分别是 (0, 1)、(0, 2) 和 (1, 2)。

// 方法一：暴力枚举
// 枚举每一对 (i, j)，如果 hours[i] + hours[j] 是 24 的倍数，那么就满足要求，答案 +1。

/**
 * @param {number[]} hours
 * @return {number}
 */
var countCompleteDayPairs = function (hours) {
    let count = 0;
    for (let i = 0; i < hours.length; i++) {
        for (let j = i + 1; j < hours.length; j++) {
            if ((hours[i] + hours[j]) % 24 === 0) {
                count++;
            }
        }
    }
    return count;
};
// 时间复杂度：O(n^2)，n 为数组 hours 的长度。
// 空间复杂度：O(1)，只需要常数的空间存放若干变量。

