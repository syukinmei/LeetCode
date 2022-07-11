// 你总共有 n 枚硬币，并计划将它们按阶梯状排列。对于一个由 k 行组成的阶梯，其第 i 行必须正好有 i 枚硬币。阶梯的最后一行 可能 是不完整的。

// 给你一个数字 n ，计算并返回可形成 完整阶梯行 的总行数。


// - 
// - -
// - -
// 输入：n = 5
// 输出：2
// 解释：因为第三行不完整，所以返回 2 

// - 
// - -
// - - -
// - -
// 输入：n = 8
// 输出：3
// 解释：因为第四行不完整，所以返回 3 。


/**
 * @param {number} n
 * @return {number}
 */
// 方法一：二分查找
// 根据等差数列求和公式 Sn = n * a1 + n(n-1)d / 2  Sn = n(a1+an)/2
// 得前k个完整阶梯所需的银币数量为：toatl = k*(k+1) / 2
// 我们通过第 mid 行所需的硬币数量 和 硬币总数的关系进行二分搜索。
var arrangeCoins = function (n) {
    let left = 1, right = n;
    while (left <= right) {
        const mid = left + ((right - left) >> 1);
        const total = mid * (mid + 1) / 2; // 第 mid 行需要的硬币数量。
        if (total === n) return mid;
        else if (total < n) left = mid + 1;
        else right = mid - 1;
    }
    return left - 1;
};
// 时间复杂度：O(logn)
// 空间复杂度：O(1)，只需要常数的空间存放若干变量。
