// 给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。如果目标值不存在于数组中，返回它将会被按顺序插入的位置。
// 请必须使用时间复杂度为 O(log n) 的算法。

// 输入: nums = [1,3,5,6], target = 5
// 输出: 2

// 输入: nums = [1,3,5,6], target = 2
// 输出: 1

// 输入: nums = [1,3,5,6], target = 7
// 输出: 4

// 输入: nums = [1,3,5,6], target = 0
// 输出: 0

// 输入: nums = [1], target = 0
// 输出: 0

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
 var searchInsert = function (nums, target) {
    let left = 0, right = nums.length - 1, mid;
    while (left <= right) {
        mid = left + ((right - left) >> 1);
        if (nums[mid] < target) {
            left = mid + 1;
        } else if (nums[mid] > target) {
            right = mid - 1;
        } else if (nums[mid] === target) {
            return mid;
        }
    }
    // 此时有left > right left 即是target不存在时的插入位置
    return left;
};

// 时间复杂度：O(logn)，其中 n 为数组的长度。二分查找所需的时间复杂度为 O(logn)。
// 空间复杂度：O(1)。我们只需要常数空间存放若干变量。