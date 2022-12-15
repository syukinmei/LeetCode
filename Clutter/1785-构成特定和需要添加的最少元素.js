// 给你一个整数数组 nums ，和两个整数 limit 与 goal 。数组 nums 有一条重要属性：abs(nums[i]) <= limit 。
// 返回使数组元素总和等于 goal 所需要向数组中添加的 最少元素数量 ，添加元素 不应改变 数组中 abs(nums[i]) <= limit 这一属性。
// 注意，如果 x >= 0 ，那么 abs(x) 等于 x ；否则，等于 -x 。


// 输入：nums = [1,-1,1], limit = 3, goal = -4
// 输出：2
// 解释：可以将 -2 和 -3 添加到数组中，数组的元素总和变为 1 - 1 + 1 - 2 - 3 = -4 。


// 输入：nums = [1,-10,9,1], limit = 100, goal = 0
// 输出：1


// 方法一：贪心
// 1. 用 sum 表示 nums 中所有元素的和，用 diff = |sum - goal| 表示 当前总和 与 目标总和 的差距。
// 2. 为了最少次添加元素，我们每次添加元素都应该尽量添加绝对值大小为 limit 的元素，直到最后一次添加一个绝对值小于 limit 的元素。因此我们需要计算使用多少个不超过 limit 绝对值大小的数字来凑齐 diff 即可，分两种情况：
//  - limit 整除 diff ，答案即为 diff/limit 
//  - limit 不整除 diff，答案为 diff/limit + 1
// 以上两种情况可以使用一个表达式来计算 diff/limit 向上取整。即为 Math.ceil(diff / limit)。
/**
 * @param {number[]} nums
 * @param {number} limit
 * @param {number} goal
 * @return {number}
 */
var minElements = function (nums, limit, goal) {
    const sum = nums.reduce((prev, curr) => prev + curr);
    const diff = Math.abs(sum - goal);
    return Math.ceil(diff / limit);
};
// 时间复杂度：O(n)，n 为 nums 数组的长度，需要遍历一次 nums 数组求初始情况的总和。
// 空间复杂度：O(1)，只需要常数的空间存放若干变量。
