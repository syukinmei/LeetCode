// 给你一个长度为 n 的整数数组 nums ，表示由范围 [0, n - 1] 内所有整数组成的一个排列。

// 全局倒置 的数目等于满足下述条件不同下标对 (i, j) 的数目：
//  - 0 <= i < j < n
//  - nums[i] > nums[j]

// 局部倒置 的数目等于满足下述条件的下标 i 的数目：
//  - 0 <= i < n - 1
//  - nums[i] > nums[i + 1]

// 当数组 nums 中 全局倒置 的数量等于 局部倒置 的数量时，返回 true ；否则，返回 false 。


// 输入：nums = [1,0,2]
// 输出：true
// 解释：有 1 个全局倒置，和 1 个局部倒置

// 输入：nums = [1,2,0]
// 输出：false
// 解释：有 2 个全局倒置，和 1 个局部倒置。

// tips:
//  - n == nums.length
//  - 1 <= n <= 105
//  - 0 <= nums[i] < n
//  - nums 中的所有整数 互不相同
//  - nums 是范围 [0, n - 1] 内所有数字组成的一个排列



/**
 * @param {number[]} nums
 * @return {boolean}
 */
// 方法一：维护前缀最大值
// 根据题意可得：如果是局部倒置，那么一定就是全局倒置。所以，全局倒置是包含局部倒置的，即全局倒置的数量一定大于等于局部倒置数量。
// 那么我们只需要判断 是否存在非局部倒置的全局倒置上，即非相邻数字是否满足递增。
// 操作如下：
// 枚举每个数 nums[i]，其中 2 <= i < n-1 ，维护前缀数组 nums[0, ..., i-2] 中的最大值，记为 maxPrefix 。
// 如果存在 maxPrefix 大于 nums[i]，说明存在非局部倒置的全局倒置，即全局倒置的数量大于局部倒置的数量，直接返回 false 即可。
// 遍历结束后，未找到非局部倒置的全局倒置返回true
var isIdealPermutation = function (nums) {
    let maxPrefix = nums[0]; // 前缀最大值
    for (let i = 2; i < nums.length; i++) {
        if (nums[i] < maxPrefix) {
            return false; // 找到非局部倒置
        }
        maxPrefix = Math.max(maxPrefix, nums[i - 1]);
    }
    return true;
};
// 时间复杂度：O(n)，n 为 nums 的长度，最多需要遍历一次 nums 。
// 空间复杂度：O(1)，只需要常数的空间存放若干变量。


// 方法二：根据与有序数组的偏移值来判断
// 由于 nums 是有 0～n-1 组成的排列。设不存在非局部倒置的排列为「理想排列」。即 对于每个元素 nums[i] 都满足 ｜nums[i] - i｜ <= 1 。反之即说明存在非局部倒置。
// 也可以这么理解：
// 通过 nums[i] - i 计算出 i 位置的元素与有序后的位置之间的差值，来判断是否存在非局部倒置。
//  - 差值为0，表示 nums[i] 所在的位置就是排序后的位置。
//  - 差值为1，表示 nums[i] 所在的位置向前或者向后一位，属于局部倒置。
//  - 其他情况，表示 nums[i] 所在的位置偏差大于1位，属于全局倒置且非局部倒置。
var isIdealPermutation = function (nums) {
    for (let i = 0; i < nums.length; i++) {
        if (Math.abs(nums[i] - i) > 1) return false; // 全局倒置且非局部倒置(找到非局部倒置)
    }
    return true;
};
// 时间复杂度：O(n)，n 为 nums 的长度，最多需要遍历一次 nums 。
// 空间复杂度：O(1)，只需要常数的空间存放若干变量。
