// 给定一个二进制数组， 计算其中最大连续 1 的个数。
// 输入的数组只包含 0 和 1 。
// 输入数组的长度是正整数，且不超过 10,000。

// 输入：[1,1,0,1,1,1]
// 输出：3
// 解释：开头的两位和最后的三位都是连续 1 ，所以最大连续 1 的个数是 3.

/**
 * @param {number[]} nums
 * @return {number}
 */
var findMaxConsecutiveOnes = function (nums) {
    let count = 0, maxCount = 0;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === 1) {
            count++;
        } else {
            maxCount = Math.max(maxCount, count);
            count = 0;
        }
    }
    maxCount = Math.max(maxCount, count);
    return maxCount;
};
// 时间复杂度：O(n)，n为数组的长度。需要遍历数组一次。
// 空间复杂度：O(1)


// 方法二：DP
// 记录数组的每一项前面有几个连续的1，返回数组中的最大值
var findMaxConsecutiveOnes = function (nums) {
    const dp = new Array(nums.length);
    dp[0] = nums[0] === 1 ? 1 : 0;
    for (let i = 1; i < nums.length; i++) {
        dp[i] = nums[i] === 1 ? dp[i - 1] + 1 : 0;
    }
    // 如果nums = [1,1,0,1,1,0,1,1,1,1,1,1]
    // 此时有dp = [1, 2, 0, 1, 2, 0, 1, 2, 3, 4, 5, 6];
    return Math.max.apply(null, dp);
    // return Math.max(...dp);  // 效果相同
};
