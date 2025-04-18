// 给你一个下标从 0 开始的整数数组 nums 。如果 i < j 且 j - i != nums[j] - nums[i] ，那么我们称 (i, j) 是一个 坏数对 。

// 请你返回 nums 中 坏数对 的总数目。

// 示例 1：

// 输入：nums = [4,1,3,3]
// 输出：5
// 解释：数对 (0, 1) 是坏数对，因为 1 - 0 != 1 - 4 。
// 数对 (0, 2) 是坏数对，因为 2 - 0 != 3 - 4, 2 != -1 。
// 数对 (0, 3) 是坏数对，因为 3 - 0 != 3 - 4, 3 != -1 。
// 数对 (1, 2) 是坏数对，因为 2 - 1 != 3 - 1, 1 != 2 。
// 数对 (2, 3) 是坏数对，因为 3 - 2 != 3 - 3, 1 != 0 。
// 总共有 5 个坏数对，所以我们返回 5 。
// 示例 2：

// 输入：nums = [1,2,3,4,5]
// 输出：0
// 解释：没有坏数对。

// 方法一：式子转换 + 哈希表
// 题目要求 j - i != nums[j] - nums[i] ，我们可以将式子进行转换，得到 nums[i] - i != nums[j] - j 。
// 定义 x = nums[i] - i 为元素 i 的特征值。
// 我们可以使用哈希表来记录每个元素其特征值 x 出现的次数。哈希表 cnt 的 key 为 nums[i] - i ，value 为该特征值 x 出现的次数。
// 具体的
// 从左到右遍历 nums 数组，对于当前元素 nums[i]，其特征值为 x = nums[i] - i 。
// 其坏数对数目为：当前元素下标 i 减去哈希表 cnt 中与 nums[i] 具有相同特征值的元素个数 cnt[x]，即 i - cnt.get(x) 。
//  - i 为当前可组的数对，对于第 i 个元素，它可以与前面 i - 1 个元素组成 i 个数对。
//  - cnt.get(x) 为当前已处理的元素中具有相同特征值的元素个数，即好数对数目
//  - 总数对 - 好数对 = 坏数对

/**
 * @param {number[]} nums
 * @return {number}
 */
var countBadPairs = function (nums) {
    const cnt = new Map(); // 存储每种特征值的数量，键为特征值 nums[i] - i，值为该特征值 x 出现的次数
    let res = 0; // 坏数对计数器

    for (let i = 0; i < nums.length; i++) {
        const x = nums[i] - i; // 当前元素的特征值
        res += i - (cnt.get(x) || 0); // 当前元素与之前元素可以组成的坏数对数量
        cnt.set(x, (cnt.get(x) || 0) + 1); // 更新当前特征值出现的次数
    }

    return res;
};
// 时间复杂度：O(n)，n 为数组 nums 的长度。需要遍历数组一次，对于每个元素，哈希表的操作时间复杂度均为 O(1)。
// 空间复杂度：O(n)，n 为数组 nums 的长度，最坏情况下哈希表最多存储 n 个元素。
