// 给你一个整数数组 nums，和一个整数 k 。
// 在一个操作中，您可以选择 0 <= i < nums.length 的任何索引 i 。将 nums[i] 改为 nums[i] + x ，其中 x 是一个范围为 [-k, k] 的任意整数。对于每个索引 i ，最多 只能 应用 一次 此操作。
// nums 的 分数 是 nums 中最大和最小元素的差值。
// 在对  nums 中的每个索引最多应用一次上述操作后，返回 nums 的最低 分数 。

// 输入：nums = [1], k = 0
// 输出：0
// 解释：分数是 max(nums) - min(nums) = 1 - 1 = 0。

// 输入：nums = [0,10], k = 2
// 输出：6
// 解释：将 nums 改为 [2,8]。分数是 max(nums) - min(nums) = 8 - 2 = 6。

// 输入：nums = [1,3,6], k = 3
// 输出：0
// 解释：将 nums 改为 [4,4,4]。分数是 max(nums) - min(nums) = 4 - 4 = 0。

// 方法一：数学
// 为了让差值最小，就是要让最大值和最小值更接近，也就是让最大值变小，最小值变大。最大值最小可以 -k，最小值最大可以 +k，所以最大值和最小值的差值最大为 2k，所以最终结果为 max(nums) - min(nums) - 2k。
// 如果差值小于 0 说明最大值和最小值可以变成相同的数，差值为 0。
// 总结：输出极差减 2k，如果小于 0 就输出 0

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var smallestRangeI = function (nums, k) {
    const minNum = Math.min(...nums);
    const maxNum = Math.max(...nums);
    return Math.max(maxNum - minNum - 2 * k, 0);
};
// 时间复杂度：O(n)，n 为数组 nums 的长度，需要 O(n) 的时间求出数组中的最大值和最小值。
// 空间复杂度：O(1)，只需要常数的空间存放若干变量。
