// 你和一群强盗准备打劫银行。给你一个下标从 0 开始的整数数组 security ，其中 security[i] 是第 i 天执勤警卫的数量。日子从 0 开始编号。同时给你一个整数 time 。

// 如果第 i 天满足以下所有条件，我们称它为一个适合打劫银行的日子：

// 第 i 天前和后都分别至少有 time 天。
// 第 i 天前连续 time 天警卫数目都是非递增的。
// 第 i 天后连续 time 天警卫数目都是非递减的。
// 更正式的，第 i 天是一个合适打劫银行的日子当且仅当：security[i - time] >= security[i - time + 1] >= ... >= security[i] <= ... <= security[i + time - 1] <= security[i + time].

// 请你返回一个数组，包含 所有 适合打劫银行的日子（下标从 0 开始）。返回的日子可以 任意 顺序排列。

/**
 * @param {number[]} security
 * @param {number} time
 * @return {number[]}
 */
// 动态规划
// 计算出第 i 天前警卫数目连续非递增的天数以及第 i 天后警卫数目连续非递减的天数即可判断第 i 天是否适合打劫。
// 一次遍历 找出所有的递增和递减情况
// 第二次遍历的时候 根据当前 time 值 去判断他是否满足前 i 天递增 和后 i+time 天递减
var goodDaysToRobBank = function (security, time) {
    const n = security.length;
    // left[i]  表示 第 i 天前连续 left[i]  天警卫数目都是非递增的。
    // right[i] 表示 第 i 天后连续 right[i] 天警卫数目都是非递减的。
    const left = new Array(n).fill(0), right = new Array(n).fill(0);
    for (let i = 1; i < n; i++) {
        if (security[i] <= security[i - 1]) {
            left[i] = left[i - 1] + 1;
        }
        if (security[n - i] >= security[n - i - 1]) {
            right[n - i - 1] = right[n - i] + 1;
        }
    }
    const res = [];
    for (let i = time; i < n - time; i++) {
        if (left[i] >= time && right[i] >= time) res.push(i);
    }
    return res;
};
// 时间复杂度：O(n)，n 为数组 security 的长度，需要遍历数组求递增递减情况，然后再遍历数组检测第 i 天是否适合打劫
// 空间复杂度：O(n)，n 为数组 security 的长度，需要O(n)的空间来存储第 i 天前连续非增减的天数和第 i 天后连续非递减天数。
