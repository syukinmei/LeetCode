// 给你一个正整数组成的数组 nums ，返回 nums 中一个 升序 子数组的最大可能元素和。
// 子数组是数组中的一个连续数字序列。
// 已知子数组 [numsl, numsl+1, ..., numsr-1, numsr] ，若对所有 i（l <= i < r），numsi < numsi+1 都成立，则称这一子数组为 升序 子数组。注意，大小为 1 的子数组也视作 升序 子数组。

// 输入：nums = [10,20,30,5,10,50]
// 输出：65
// 解释：[5,10,50] 是元素和最大的升序子数组，最大元素和为 65 。

// 输入：nums = [10,20,30,40,50]
// 输出：150
// 解释：[10,20,30,40,50] 是元素和最大的升序子数组，最大元素和为 150 。 

// 输入：nums = [12,17,15,13,10,11,12]
// 输出：33
// 解释：[10,11,12] 是元素和最大的升序子数组，最大元素和为 33 。 

// 输入：nums = [100,10,1]
// 输出：100

/**
 * @param {number[]} nums
 * @return {number}
 */

// 方法一：动态规划
// 设 dp[i] 表示以 nums[i] 结尾的最长升序子数组的元素和。
//  - nums[i] > nums[i-1] （升序时）dp[i] = nums[i] + dp[i-1]
//  - nums[i] <= nums[i-1] （非升序时） dp[i] = nums[i]
// 以上结论建立在 i > 0 的情况。我们还需要考虑动态规划的边界条件，即 i = 0 时，此时 nums[0] 前面没有任何元素，本身可以构建一个长度为 1 的升序子数组，所以 dp[0] = nums[0]
var maxAscendingSum = function (nums) {
    const dp = new Array(nums.length);
    dp[0] = nums[0];
    // 构建dp数组，dp[i] 表示以 nums[i] 结尾的最长升序子数组的元素和。
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] > nums[i - 1]) {
            dp[i] = nums[i] + dp[i - 1];
        }
        else {
            dp[i] = nums[i];
        }
    }
    return Math.max(...dp);
};
// 时间复杂度：O(n)，n 为 nums 数组的长度。
// 空间复杂度：O(n)，用于构建长度为 n 的dp数组。


// 方法二：滚动数组
// 由于动态规划的求解状态只与前一个状态相关，所以可以使用「滚动数组」进行空间优化
var maxAscendingSum = function (nums) {
    let res = 0;
    let l = 0;
    while (l < nums.length) {
        let curSum = nums[l++];
        // 如果是生序则继续增加curSum
        while (l < nums.length && nums[l] > nums[l - 1]) {
            curSum += nums[l++];
        }
        // 不是升序或者达到边界条件
        res = Math.max(res, curSum);
    }
    return res;
};
// 时间复杂度：O(n)，n 为 nums 的长度。
// 空间复杂度：O(1)，只需要常数的空间存放若干变量。
