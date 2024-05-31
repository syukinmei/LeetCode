// 给你一个下标从 0 开始的二维整数矩阵 grid，大小为 n * n ，其中的值在 [1, n2] 范围内。除了 a 出现 两次，b 缺失 之外，每个整数都 恰好出现一次 。
// 任务是找出重复的数字a 和缺失的数字 b 。
// 返回一个下标从 0 开始、长度为 2 的整数数组 ans ，其中 ans[0] 等于 a ，ans[1] 等于 b 。

// 输入：grid = [[1,3],[2,2]]
// 输出：[2,4]
// 解释：数字 2 重复，数字 4 缺失，所以答案是 [2,4] 。

// 输入：grid = [[9,1,7],[8,9,2],[3,4,6]]
// 输出：[9,5]
// 解释：数字 9 重复，数字 5 缺失，所以答案是 [9,5] 。

// 方法一：统计频数
// 用一个长度为 n * n + 1 的数组 cnt 统计 grid 中每个数字出现的次数，然后遍历一次频数数组 cnt 找出重复的数字和缺失的数字。最后返回结果即可。
// 由于数字访问为 [1, n^2]，为了不做哨位相关的逻辑处理（下标偏移），让数字 x 就存放在频数数组 cnt 的下标 x 处，因此需要长度为 n * n + 1。对应的寻找重复数字和缺失数字时直接从下标 1 开始即可。
/**
 * @param {number[][]} grid
 * @return {number[]}
 */
var findMissingAndRepeatedValues = function (grid) {
    const n = grid.length;
    const cnt = new Array(n * n + 1).fill(0); // 用于存放遍历到的数字。
    // 统计数字出现次数
    for (const row of grid) {
        for (const x of row) {
            cnt[x]++;
        }
    }

    // 查找重复数字 a 、缺失数字 b
    let a, b;
    for (let i = 1; i < cnt.length; i++) {
        if (cnt[i] > 1) a = i; // 重复出现
        else if (cnt[i] === 0) b = i; // 缺失
    }
    return [a, b];
};
// 时间复杂度：O(n^2)，n 为数组 grid 的长度，遍历 grid 统计频数需要 O(n^2) 的时间，遍历 cnt 寻找答案需要 O(n^2) 的时间。
// 空间复杂度：O(n^2)，n 为数组 grid 的长度，构建频数数组 cnt 需要 O(n^2) 的空间。
