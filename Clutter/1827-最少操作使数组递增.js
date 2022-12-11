// 给你一个整数数组 nums （下标从 0 开始）。每一次操作中，你可以选择数组中一个元素，并将它增加 1 。
//  - 比方说，如果 nums = [1,2,3] ，你可以选择增加 nums[1] 得到 nums = [1,3,3] 。
// 请你返回使 nums 严格递增 的 最少 操作次数。
// 我们称数组 nums 是 严格递增的 ，当它满足对于所有的 0 <= i < nums.length - 1 都有 nums[i] < nums[i+1] 。一个长度为 1 的数组是严格递增的一种特殊情况。



// 输入：nums = [1,1,1]
// 输出：3
// 解释：你可以进行如下操作：
// 1) 增加 nums[2] ，数组变为 [1,1,2] 。
// 2) 增加 nums[1] ，数组变为 [1,2,2] 。
// 3) 增加 nums[2] ，数组变为 [1,2,3] 。

// 输入：nums = [1,5,2,4,1]
// 输出：14

// 输入：nums = [8]
// 输出：0


// 模拟
// 使用变量 pre 记录当前遍历的上一个元素值，初始值为nums[0]
// 从左到右遍历数组 nums ，如果当前遍历元素大于等于上一个元素 pre，那么我们需要将其增大到 pre+1 为止，这样才能保证数组严格递增。此次需要进行的操作次数为 pre+1-nums[i] 次。然后更新 pre 。直至遍历完整个数组。
// 注意：pre 的更新情况为以下两种：
//  - 不需要操作 pre 赋值操作即为 nums[i]
//  - 需要增大操作，增大到 pre+1
// 因此我们可以统一赋值为 pre = Math.max(pre+1, nums[i])
/**
 * @param {number[]} nums
 * @return {number}
 */
var minOperations = function (nums) {
    let pre = nums[0];
    let count = 0;
    for (let i = 1; i < nums.length; i++) {
        if (pre >= nums[i]) {
            count += pre + 1 - nums[i];
        }
        pre = Math.max(pre + 1, nums[i]);
        // 如果当前元素符合递增条件则pre就是当前元素nums[i]，否则就是增大本次count后的数，也就是pre+1。或者理解为pre+1。因为当前元素至少要 pre+1才符合递增条件。
    }
    return count;
};
// 时间复杂度：O(n)，n 为数组 nums 的长度，我们需要遍历一次数组。
// 空间复杂度：O(1)，只需要常数的空间存放若干变量。
