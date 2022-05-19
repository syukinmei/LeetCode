// 给你一个长度为 n 的整数数组 nums ，返回使所有数组元素相等需要的最少移动数。
// 在一步操作中，你可以使数组中的一个元素加 1 或者减 1 。


// 输入：nums = [1,2,3]
// 输出：2
// 解释：
// 只需要两步操作（每步操作指南使一个元素加 1 或减 1）：
// [1,2,3]  =>  [2,2,3]  =>  [2,2,2]

// 输入：nums = [1,10,2,9]
// 输出：16


// 本题难点就是找到一个数字 target ，数组中的所有元素移动到 target 次数最小。
// 那么这个 target 满足那些要求呢？ 其实 target 就是 数组到中位数。

// 为什么是中位数？
// 首先我们将数组进行收尾配对 [nums0, numsN-1], [nums1, numsN-2], ... ,[numsN/2 -1,numsN/2 ]

// 我们分情况讨论：
//  - 情况一：target 在数组取值范围外，即 target > nums数组最大值 || target < nums数组最小值
//      此时数组中所有元素移动到 target 一定比移动到边界的移动次数更多。
//      如：nums = [1, 2, 3] target = 4。移动到4需要 3+2+1 ，而移动到边界 1 或者 3 需要3次。
//      因此，target一定在 nums 的最小值和最大值之间。
//  - 情况二：target 在数组取值范围内
//      当 target 在数组取值范围内，那么无论 target 选择何值，对于数组的最小值和最大值而言，它们移动到 target 的次数之和一定是固定的！都等于 最大值 - 最小值。
//      如：nums = [1, 2, 4, 9] ，target = 区间[1,9] 之间的任何数，nums的最大数9和最小数字1 移动到 target 的次数一定是 9-1=8
//      然后，我们考虑去除 nums 的最大值、最小值之后的「子数组」。由情况一种得出结论， target 也需要满足在「子数组」范围内。
//      如上例，当第一次 target 取值为 1-9 之间，却在 2-4 之外，此时 target 对于「子数组」不是最优解。
// 综上所述， target 必须是不断选择 数组（以及子数组）最大值、最小值之间的数字，最终就是「中位数」。

// 证明为什么该题要求的是中位数另种思路：
// 假设数组中 有 m 个元素小于等于target ，有 n 个元素大于target，若将 target向上加一位到 target+1 ，则总移动数变化为：
// Steps = Steps + m - n
// 显然，当 n>m 时候，总步数会减少，因此，应该不断将 target 向数字更多的方向移动，直到 target 上下数字一样多，此时 target 就是「中位数」。


/**
 * @param {number[]} nums
 * @return {number}
 */
// 方法一：排序
// 思路：1. 对nums排序    2. 求出nums中位数    3. 计算将nums数组中所有数字移动到中位数需要多少次。
var minMoves2 = function (nums) {
    nums.sort((a, b) => a - b);

    const Len = nums.length;
    const Median = nums[Len >> 1];

    let count = 0;
    for (let i = 0; i < Len; i++) {
        count += Math.abs(nums[i] - Median);
    }

    return count;
};
// 时间复杂度：O(nlogn)，n 为数组 nums 的长度。排序需要 O(nlogn)的时间。
// 空间复杂度：O(logn)，快排需要 O(logn)的递归栈空间。

