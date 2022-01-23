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
// 方法一：哈希表
// 创建哈希表
// 遍历数组 nums，记录 每个元素 上次出现的位置 和 当前位置 距离和 k 的大小关系
var containsNearbyDuplicate = function (nums, k) {
    // 建立哈希表 键：为nums中的元素 值：为该元素上一次出现位置的下标
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        // 当前元素出现过 且 上次出现的位置和当前位置 差小于等于 k
        if (map.has(nums[i]) && i - map.get(nums[i]) <= k) {
            return true;
        } else {
            // 否则 将当前元素和下标 记录于字典中。
            map.set(nums[i], i);
        }
    }
    return false;
}
// 时间复杂度：O(n)，n 为数组 nums 的长度。需要遍历一次数组，对于每个元素，哈希表的操作时间都是O(1)。
// 空间复杂度：O(1)，只需要常数的空间存放若干变量。


// 方法二：滑动窗口
// 使用哈希集合存储滑动窗口中的元素。
// 从左到右遍历数组 nums ，并做如下操作：
//  - 如果 i > k，则下标 i−k−1 处的元素被移出滑动窗口
//  - 判断 nums[i] 是否在哈希集合中，存在返回 true，不在则加入哈希集合。
// 当结束遍历时，如果所有滑动窗口中都没有重复元素，返回false。
var containsNearbyDuplicate = function (nums, k) {
    const window = new Set();
    for (let i = 0; i < nums.length; i++) {
        // 1、窗口满足缩小条件
        if (i > k) window.delete(nums[i - k - 1]);

        // 2、判断窗口中是否存在当前元素，存在返回true
        if (window.has(nums[i])) {
            return true;
        } else {
            // 当前元素添加入窗口中
            window.add(nums[i]);
        }
    }
    return false;
}
// 时间复杂度：O(n)，n 为数组 nums 的长度。需要遍历一次数组，对于每个元素，哈希集合的操作时间都是O(1)。
// 空间复杂度：O(k)，需要使用哈希集合存储滑动窗口中的元素，任意时刻滑动窗口中的元素个数最多为 k+1 个。