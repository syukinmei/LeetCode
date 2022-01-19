// 给你一个整数数组 nums 和一个整数 k ，判断数组中是否存在两个 不同的索引 i 和 j ，满足 nums[i] == nums[j] 且 abs(i - j) <= k 。如果存在，返回 true ；否则，返回 false 。

// 输入：nums = [1,2,3,1], k = 3
// 输出：true

// 输入：nums = [1,0,1,1], k = 1
// 输出：true

// 输入：nums = [1,2,3,1,2,3], k = 2
// 输出：false

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var containsNearbyDuplicate = function (nums, k) {
    const map = new Map();
    const length = nums.length;
    for (let i = 0; i < length; i++) {
        const num = nums[i];
        if (map.has(num) && i - map.get(num) <= k) {
            return true;
        }
        map.set(num, i);
    }
    return false;
};