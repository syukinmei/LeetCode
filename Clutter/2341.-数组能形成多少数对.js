// 给你一个下标从 0 开始的整数数组 nums 。在一步操作中，你可以执行以下步骤：
//  - 从 nums 选出 两个 相等的 整数
//  - 从 nums 中移除这两个整数，形成一个 数对
// 请你在 nums 上多次执行此操作直到无法继续执行。
// 返回一个下标从 0 开始、长度为 2 的整数数组 answer 作为答案，其中 answer[0] 是形成的数对数目，answer[1] 是对 nums 尽可能执行上述操作后剩下的整数数目。

// 输入：nums = [1,3,2,1,3,2,2]
// 输出：[3,1]
// 解释：
// nums[0] 和 nums[3] 形成一个数对，并从 nums 中移除，nums = [3,2,3,2,2] 。
// nums[0] 和 nums[2] 形成一个数对，并从 nums 中移除，nums = [2,2,2] 。
// nums[0] 和 nums[1] 形成一个数对，并从 nums 中移除，nums = [2] 。
// 无法形成更多数对。总共形成 3 个数对，nums 中剩下 1 个数字。


// 输入：nums = [1,1]
// 输出：[1,0]
// 解释：nums[0] 和 nums[1] 形成一个数对，并从 nums 中移除，nums = [] 。
// 无法形成更多数对。总共形成 1 个数对，nums 中剩下 0 个数字。


// 输入：nums = [0]
// 输出：[0,1]
// 解释：无法形成数对，nums 中剩下 1 个数字。

/**
 * @param {number[]} nums
 * @return {number[]}
 */
// 方法一：哈希表
// 遍历一次数组，用哈希表存储元素个数的奇偶性，偶数为false，奇数为true。每遇到一个元素，则将其奇偶性取反，若取反后为偶数个，则表明在上次偶数个之后又遇到了两个该元素，可以形成一个数对。最后返回一个数组，数组第一个元素是数对数目，第二个元素是数组长度减去数对数目的两倍。
var numberOfPairs = function (nums) {
    let count = 0;
    // 哈希表记录元素的奇偶性，偶数为false，奇数为true
    const cnt = new Map();
    for (const num of nums) {
        cnt.set(num, !cnt.get(num));

        // 如果该元素此时个数为偶数false，则生成了一个数对
        if (!cnt.get(num)) count++;
    }
    return [count, nums.length - 2 * count];
};
// 时间复杂度：O(n)，n 为数组 nums 的长度，需要遍历一次数组。
// 空间复杂度：O(n)，n 为数组 nums 的长度，哈希表中最多存储 n 个长度。
