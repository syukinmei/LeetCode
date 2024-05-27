// 现有一份 n + m 次投掷单个 六面 骰子的观测数据，骰子的每个面从 1 到 6 编号。观测数据中缺失了 n 份，你手上只拿到剩余 m 次投掷的数据。幸好你有之前计算过的这 n + m 次投掷数据的 平均值 。
// 给你一个长度为 m 的整数数组 rolls ，其中 rolls[i] 是第 i 次观测的值。同时给你两个整数 mean 和 n 。
// 返回一个长度为 n 的数组，包含所有缺失的观测数据，且满足这 n + m 次投掷的 平均值 是 mean 。如果存在多组符合要求的答案，只需要返回其中任意一组即可。如果不存在答案，返回一个空数组。
// k 个数字的 平均值 为这些数字求和后再除以 k 。
// 注意 mean 是一个整数，所以 n + m 次投掷的总和需要被 n + m 整除。

// 输入：rolls = [3,2,4,3], mean = 4, n = 2
// 输出：[6,6]
// 解释：所有 n + m 次投掷的平均值是 (3 + 2 + 4 + 3 + 6 + 6) / 6 = 4 。

// 输入：rolls = [1,5,6], mean = 3, n = 4
// 输出：[2,3,2,2]
// 解释：所有 n + m 次投掷的平均值是 (1 + 5 + 6 + 2 + 3 + 2 + 2) / 7 = 3 。

// 输入：rolls = [1,2,3,4], mean = 6, n = 4
// 输出：[]
// 解释：无论丢失的 4 次数据是什么，平均值都不可能是 6 。

// 输入：rolls = [1], mean = 3, n = 1
// 输出：[5]
// 解释：所有 n + m 次投掷的平均值是 (1 + 5) / 2 = 3 。

// 方法一：模拟
// 根据题意，我们可知缺失的 n 次投掷的总和 missingSum。
// 由于骰子每次的投掷结果都在 1 到 6 之间，因此 missingSum 的取值范围为 [n, 6n]。不在这个区间内，说明不存在答案。
// 对于构建答案数组：
//  - 如果 missingSum 在合理范围内，我们可以生成一个长度为 n 的数组，使其总和长度为 missingSum。
//  - 优先将所有元素设为 1，然后逐步增加每个元素直到综合达到 missingSum。
/**
 * @param {number[]} rolls
 * @param {number} mean
 * @param {number} n
 * @return {number[]}
 */
var missingRolls = function (rolls, mean, n) {
    const m = rolls.length;
    const sum = mean * (m + n); // 测试数据合

    // 计算缺失数据的和
    let missingSum = sum;
    for (const roll of rolls) {
        missingSum -= roll;
    }

    // 判断是否存在答案
    if (missingSum < n || 6 * n < missingSum) return [];

    // 构建答案数组
    const ans = new Array(n).fill(1);
    missingSum -= n;
    for (let i = 0; i < n; i++) {
        const increment = Math.min(missingSum, 5); // 每次最多增加 5
        ans[i] = increment + 1;
        missingSum -= increment;
    }
    return ans;
};
// 时间复杂度：O(n+m)，n 和 m 分别是缺失的观测数据个数 和 rolls 已知的观测数据数组的长度，需要 O(n) 的时间计算缺失的观测数据之和，需要 O(m) 的时间构建答案数组，因此总的时间复杂度为 O(n+m)。
// 空间复杂度：O(1)，只需要常数的空间存放若干变量。
