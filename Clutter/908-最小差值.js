// 给你一个整数数组 nums，和一个整数 k 。
// 在一个操作中，您可以选择 0 <= i < nums.length 的任何索引 i 。将 nums[i] 改为 nums[i] + x ，其中 x 是一个范围为 [-k, k] 的整数。对于每个索引 i ，最多 只能 应用 一次 此操作。
// nums 的 分数 是 nums 中最大和最小元素的差值。 
// 在对  nums 中的每个索引最多应用一次上述操作后，返回 nums 的最低 分数 。


// 输入：nums = [1], k = 0
// 输出：0
// 解释：分数是 max(nums) - min(nums) = 1 - 1 = 0。


// 输入：nums = [0,10], k = 2
// 输出：6
// 解释：将 nums 改为 [2,8]。分数是 max(nums) - min(nums) = 8 - 2 = 6。

// 输入：nums = [1,3,6], k = 3
// 输出：0
// 解释：将 nums 改为 [4,4,4]。分数是 max(nums) - min(nums) = 4 - 4 = 0。


/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
// 方法一：数学
// 为了得到最低分数，我们希望最大值尽可能小，最小值尽可能大，来减少差异。
// 如果最大值和最小值 可以变为共同的某个数，那么所有数都可以变成这个数，最终答案为0。（Max-k <= min+k）
// 如果最大值的最小值（Max-k）都比最小值的最大值（Min+k）大大话，那么最终答案（最低分数）就是 Max - Min - 2 * k（Max-k>Min+k）
var smallestRangeI = function (nums, k) {
    const getMIN = Math.min(...nums);
    const getMAX = Math.max(...nums);
    return getMAX - getMIN <= 2 * k ? 0 : getMAX - getMIN - 2 * k;
};
// 时间复杂度：O(n)，n 为整数数组 nums 的长度，需要O(n)的时间遍历数组 nums 得到最小值和最大值，然后需要O(1)的时间计算最低分数。
// 空间复杂度：O(1)，只需要常数的空间存放若干变量。
