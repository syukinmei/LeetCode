// 给你两个正整数 n 和 limit 。
// 请你将 n 颗糖果分给 3 位小朋友，确保没有任何小朋友得到超过 limit 颗糖果，请你返回满足此条件下的 总方案数 。

// 输入：n = 5, limit = 2
// 输出：3
// 解释：总共有 3 种方法分配 5 颗糖果，且每位小朋友的糖果数不超过 2 ：(1, 2, 2) ，(2, 1, 2) 和 (2, 2, 1) 。

// 输入：n = 3, limit = 3
// 输出：10
// 解释：总共有 10 种方法分配 3 颗糖果，且每位小朋友的糖果数不超过 3 ：(0, 0, 3) ，(0, 1, 2) ，(0, 2, 1) ，(0, 3, 0) ，(1, 0, 2) ，(1, 1, 1) ，(1, 2, 0) ，(2, 0, 1) ，(2, 1, 0) 和 (3, 0, 0) 。

// 方法一：暴力枚举
// 该题需要我们计算三元组（a, b, c）的数目，其中 a, b 和 c 分别代表三个小朋友得到的糖果数，需要其满足以下条件：
//  1. a + b + c = n
//  2. a, b 和 c 均不超过 limit，即 0 <= a, b, c <= limit
// 我们可以使用二重循环来枚举所有可能的 a, b 和 c 的值，并统计满足条件的三元组数目。

/**
 * @param {number} n
 * @param {number} limit
 * @return {number}
 */
var distributeCandies = function (n, limit) {
    let count = 0;

    // 枚举第一个小朋友 a 的糖果数
    for (let a = 0; a <= limit; a++) {
        // 枚举第二个小朋友 b 的糖果数
        for (let b = 0; b <= limit; b++) {
            // 计算第三个小朋友 c 的糖果数目，并判断其是否在合法范围内
            if (a + b > n) break;

            if (n - a - b <= limit) count++;
        }
    }

    // 返回符合条件的三元组数目
    return count;
};
// 时间复杂度：O(n^2)，n 为 limit，用于枚举三个小朋友分得的糖果数。
// 空间复杂度：O(1)，只需要常数的空间存放若干变量。
