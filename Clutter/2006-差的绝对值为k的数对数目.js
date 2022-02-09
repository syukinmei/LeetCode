// 给你一个整数数组 nums 和一个整数 k ，请你返回数对 (i, j) 的数目，满足 i < j 且 |nums[i] - nums[j]| == k 。
// |x| 的值定义为：

// 如果 x >= 0 ，那么值为 x 。
// 如果 x < 0 ，那么值为 -x 。

// 输入：nums = [1,2,2,1], k = 1
// 输出：4
// 解释：差的绝对值为 1 的数对为：
// - [1,2]
// - [1,2]
// - [2,1]
// - [2,1]

// 输入：nums = [1,3], k = 3
// 输出：0
// 解释：没有任何数对差的绝对值为 3 。

// 输入：nums = [3,2,1,5,4], k = 2
// 输出：3
// 解释：差的绝对值为 2 的数对为：
// - [3,1]
// - [3,5]
// - [2,4]


/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
// 方法一：暴力解法
// 思路：我们可以使用两层循环，一层遍历 ii，一层遍历 jj，对每个 (i，j)(i，j) 的组合，判断差的绝对值是否为 kk，统计所有符合条件的数对。
var countKDifference = function (nums, k) {
    let count = 0;
    for (let i = 0; i < nums.length - 1; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            const ijAbsolute = Math.abs(nums[i] - nums[j]);
            if (ijAbsolute === k) count++;
        }
    }
    return count;
};
// 时间复杂度：O(n^2)，n 为数组 nums 的长度。我们使用两层循环来寻找所有符合条件的数对。
// 空间复杂度：O(1)，只需要常数的空间存放若干变量。


// 方法二：哈希表 + 一次遍历
// 模式识别：一旦涉及出现次数，可是使用哈希表
// 思路：遍历 nums ，对于当前元素 num ，累加上符合要求的数（num - k 或 num + k）的数量
// 为了快速找到符合条件的数的数量，使用哈希表记录，键为 没个元素 num 符合条件的数（num - k 或 num + k） 值为 其数量
// // 例如：nums = [3, 5, 9] , k = 2，哈希表应构建成：
// { 3-2: 0,
//   3+2: 1,
//   5-2: 0,
//   5+2: 0,
//   9-2: 0,
//   9+2: 0, }
var countKDifference = function (nums, k) {
    let count = 0;
    const cnt = new Map();
    for (const num of nums) {
        count += (cnt.get(num - k) || 0) + (cnt.get(num + k) || 0);
        cnt.set(num, (cnt.get(num) || 0) + 1);
    }
    return count;
}
// 时间复杂度：O(n)，n 为数组 nums 的长度，我们需要遍历一次数组来寻找所有符合条件的数对(构建哈希表)。
// 空间复杂度：O(n)，哈希表大小为O(n)的空间。