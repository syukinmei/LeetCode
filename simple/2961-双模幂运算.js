// 给你一个下标从 0 开始的二维数组 variables ，其中 variables[i] = [ai, bi, ci, mi]，以及一个整数 target 。
// 如果满足以下公式，则下标 i 是 好下标：
//  - 0 <= i < variables.length
//  - ((aibi % 10)ci) % mi == target
// 返回一个由 好下标 组成的数组，顺序不限 。

// 输入：variables = [[2,3,3,10],[3,3,3,1],[6,1,1,4]], target = 2
// 输出：[0,2]
// 解释：对于 variables 数组中的每个下标 i ：
// 1) 对于下标 0 ，variables[0] = [2,3,3,10] ，(23 % 10)3 % 10 = 2 。
// 2) 对于下标 1 ，variables[1] = [3,3,3,1] ，(33 % 10)3 % 1 = 0 。
// 3) 对于下标 2 ，variables[2] = [6,1,1,4] ，(61 % 10)1 % 4 = 2 。
// 因此，返回 [0,2] 作为答案。

// 输入：variables = [[39,3,1000,1000]], target = 17
// 输出：[]
// 解释：对于 variables 数组中的每个下标 i ：
// 1) 对于下标 0 ，variables[0] = [39,3,1000,1000] ，(393 % 10)1000 % 1000 = 1 。
// 因此，返回 [] 作为答案。

// 方法一：模拟 + 快速幂计算
// 对幂运算取模，然后根据题意模拟即可。
// 额外的，这道题的幂运算结果都进行取模。根据模运算的性质：(a * b) % mod = ((a % mod) * (b % mod)) % mod ，同时为了保证计算过程中不会溢出，我们进行每一步乘法的时候都取模运算。
/**
 * @param {number[][]} variables
 * @param {number} target
 * @return {number[]}
 */
var getGoodIndices = function (variables, target) {
    const res = [];
    for (let i = 0; i < variables.length; i++) {
        const [a, b, c, m] = variables[i];
        const val = qpow(qpow(a, b, 10), c, m);
        if (val === target) res.push(i);
    }
    return res;
};

// 辅助函数，快速幂算法
var qpow = function (x, n, mod) {
    if (n < 0) {
        x = 1 / x;
        n = -n;
    }
    if (n === 0) return 1;

    let res = 1;
    while (n > 1) {
        // 按位与 等价n % 2 === 1
        if (n & 1) {
            res = (res * x) % mod;
            n--;
        }
        x = (x * x) % mod;
        n = n >>> 1;
    }
    return (res * x) % mod;
};
// 时间复杂度：O(nlogv)，n 为数组的长度，v为元素的取值，本题最大为 1000。
// 空间复杂度：O(1)，只需要常数的空间存放若干变量。
