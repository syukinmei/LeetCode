// 实现 pow(x, n) ，即计算 x 的 n 次幂函数（即，xn）。

// 输入：x = 2.00000, n = 10
// 输出：1024.00000

// 入：x = 2.10000, n = 3
// 输出：9.26100

// 输入：x = 2.00000, n = -2
// 输出：0.25000
// 解释：2-2 = 1/22 = 1/4 = 0.25


/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */

// 暴力解法
 var myPow = function (x, n) {
    //  处理n为负数的情况
    if (n < 0) {
        x = 1 / x;
        n = -n;
    }
    let ans = 1;
    for (let i = 1; i <= n; i++) {
        ans *= x;
    }
    return ans;
};
// 时间复杂度为O(n)
// 空间复杂度为O(1)