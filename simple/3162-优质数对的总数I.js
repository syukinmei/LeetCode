// 给你两个整数数组 nums1 和 nums2，长度分别为 n 和 m。同时给你一个正整数 k。
// 如果 nums1[i] 可以被 nums2[j] * k 整除，则称数对 (i, j) 为 优质数对（0 <= i <= n - 1, 0 <= j <= m - 1）。
// 返回 优质数对 的总数。

// 输入：nums1 = [1,3,4], nums2 = [1,3,4], k = 1
// 输出：5
// 解释：
// 5个优质数对分别是 (0, 0), (1, 0), (1, 1), (2, 0), 和 (2, 2)。

// 输入：nums1 = [1,2,4,12], nums2 = [2,4], k = 3
// 输出：2
// 解释：
// 2个优质数对分别是 (3, 0) 和 (3, 1)。

// 方法一：枚举
// 根据题意枚举所有的数对，判断是否优质，返回优质数对的个数。
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number} k
 * @return {number}
 */
var numberOfPairs = function (nums1, nums2, k) {
    let count = 0;
    for (const a of nums1) {
        for (const b of nums2) {
            if (a % (b * k) === 0) count++;
        }
    }
    return count;
};
// 时间复杂度：O(n*m)，n 和 m 分别为数组 nums1 和 nums2 的长度。
// 空间复杂度：O(1)，只需要常数的空间存放若干变量。
