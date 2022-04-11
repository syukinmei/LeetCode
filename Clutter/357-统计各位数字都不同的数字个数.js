// 给你一个整数 n ，统计并返回各位数字都不同的数字 x 的个数，其中 0 <= x < 10n 。


// 输入：n = 2
// 输出：91
// 解释：答案应为除去 11、22、33、44、55、66、77、88、99 外，在 0 ≤ x < 100 范围内的所有数字。 

// 输入：n = 0
// 输出：1

// 提示：0 <= n <= 8


// n = 0, 0 <= x < 1, [0] 1种
// n = 1, 0 <= x < 10, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] 10种
// n = 2, 0 <= x < 100, 数字包含两部分之和，一部分为 n = 1 的所有10个答案(一位数)，另一部分为长度为 2 的新增数字。即是10 + 9*9个新增数字
// n = 3,0 <= x < 1000, 10 + 9*9 + 9*9*8 = 739
// 此时可以推导出一般公式：n = d(2<=d<=8), 小于d位数的数字个数 + 9*P(9,d-1) 。

/**
 * @param {number} n
 * @return {number}
 */
// 方法一：排列
var countNumbersWithUniqueDigits = function (n) {
    if (n === 0) return 1;
    if (n === 1) return 10;

    let count = 10, inc = 9;
    for (let i = 0; i < n - 1; i++) {
        inc *= 9 - i;
        count += inc;
    }
    return count;
};
// 时间复杂度：O(n)
// 空间复杂度：O(1)


// 方法二：动态规划
// n = 0, count = 1
// n = 1, count = 10
// n = 2, count = 10 + 9*9 = 91
// n = 3, count = 10 + 9*9 + 9*9*8 = 739
// n = 4, count = 10 + 9*9 + 9*9*8 + 9*9*8*7 = 5275
// 通过归纳不难得到，令dp[i] 表示 n = i 时的答案，则动态转移方程为：
// dp[i] = dp[i - 1] + (dp[i - 1] - dp[i - 2]) * (10 - i + 1)
// 转移的初始条件为:
// dp[0] = 1 , dp[1] = 10
var countNumbersWithUniqueDigits = function (n) {
    const dp = [1, 10];
    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + (dp[i - 1] - dp[i - 2]) * (10 - i + 1);
    }
    return dp[n];
};
// 时间复杂度：O(n)
// 空间复杂度：O(n)


// 方法三：滚动数组优化DP
// 观察方法二的动态规划代码，dp中存储了全部n个状态，但是只有两个状态会在更新下一个状态的过程中被使用到，如果只记录这两个状态我们就可以将空间复杂度从O(n)降到O(1)
var countNumbersWithUniqueDigits = function (n) {
    if (n === 0) return 1;
    if (n === 1) return 10;

    let first = 1, second = 10;
    for (let i = 2; i <= n; i++) {
        const third = second + (second - first) * (10 - i + 1);
        first = second;
        second = third;
    }
    return second;
};
// 时间复杂度：O(n)
// 空间复杂度：O(1)
