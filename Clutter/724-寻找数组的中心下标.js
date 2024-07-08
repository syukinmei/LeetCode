// 给你一个整数数组 nums ，请计算数组的 中心下标 。
// 数组 中心下标 是数组的一个下标，其左侧所有元素相加的和等于右侧所有元素相加的和。
// 如果中心下标位于数组最左端，那么左侧数之和视为 0 ，因为在下标的左侧不存在元素。这一点对于中心下标位于数组最右端同样适用。
// 如果数组有多个中心下标，应该返回 最靠近左边 的那一个。如果数组不存在中心下标，返回 -1 。

// 输入：nums = [1, 7, 3, 6, 5, 6]
// 输出：3
// 解释：
// 中心下标是 3 。
// 左侧数之和 sum = nums[0] + nums[1] + nums[2] = 1 + 7 + 3 = 11 ，
// 右侧数之和 sum = nums[4] + nums[5] = 5 + 6 = 11 ，二者相等。

// 输入：nums = [1, 2, 3]
// 输出：-1
// 解释：
// 数组中不存在满足此条件的中心下标。

// 输入：nums = [2, 1, -1]
// 输出：0
// 解释：
// 中心下标是 0 。
// 左侧数之和 sum = 0 ，（下标 0 左侧不存在元素），
// 右侧数之和 sum = nums[1] + nums[2] = 1 + -1 = 0 。

// 方法一：前缀和
// 记数组的全部元素和为 sum，当遍历到第 i 个元素 nums[i] 的时候，设其左侧元素之和为 prefixSum，则其右侧元素之和为 sum - prefixSum - nums[i]。
// 左右侧元素和相等的条件即为：prefixSum = sum - nums[i] - prefixSum，即 2 * prefixSum + nums[i] = sum。
// 因此我们只需要遍历数组每个下标 i ，求出全部元素和 sum，并记录每一时刻的前缀和 prefixSum，判断 2 * prefixSum + nums[i] 是否等于 sum 即可。
/**
 * @param {number[]} nums
 * @return {number}
 */
var pivotIndex = function (nums) {
    const sum = nums.reduce((a, b) => a + b, 0);
    let prefixSum = 0; // 前缀和，即中心下标左侧元素和
    // 枚举每一个可能的中心下标
    for (let i = 0; i < nums.length; i++) {
        // 符合要求返回其下标
        if (prefixSum * 2 + nums[i] === sum) return i;
        prefixSum += nums[i]; // 累计前缀和
    }

    // 没有符合要求的中心下标，返回-1
    return -1;
};
// 时间复杂度：O(n)，其中 n 是数组 nums 的长度。需要遍历数组两次，分别为求数组总和、求每一刻的前缀和。
// 空间复杂度：O(1)，只需要常数的空间存放若干变量。
