// 和谐数组是指一个数组里元素的最大值和最小值之间的差别 正好是 1 。
// 现在，给你一个整数数组 nums ，请你在所有可能的子序列中找到最长的和谐子序列的长度。
// 数组的子序列是一个由数组派生出来的序列，它可以通过删除一些元素或不删除元素、且不改变其余元素的顺序而得到。

// 输入：nums = [1,3,2,2,5,2,3,7]
// 输出：5
// 解释：最长的和谐子序列是 [3,2,2,2,3]

// 输入：nums = [1,2,3,4]
// 输出：2

// 输入：nums = [1,1,1,1]
// 输出：0

/**
 * @param {number[]} nums
 * @return {number}
 */
var findLHS = function (nums) {
    const dis = new Map();
    // 建立字典，统计每个数字出现的个数
    for (let i = 0; i < nums.length; i++) {
        dis.set(nums[i], dis.get(nums[i]) + 1 || 1);
    }
    // 根据哈希表分析最长和谐子序列长度，找到当前 元素的个数 和 当前元素+1 出现的个数之和最大值
    let ans = 0;
    for (const [key, value] of dis) {
        if (dis.get(key + 1)) {
            ans = Math.max(ans, value + dis.get(key + 1))
        }
    }
    // for (const key of dis.keys()) {
    //     if (dis.has(key + 1)) {
    //         ans = Math.max(ans, dis.get(key) + dis.get(key + 1));
    //     }
    // }
    return ans;
};
// 时间复杂度：O(n)，n为数组 nums 的长度，需要遍历数组建立一个记录每个数字出现个数的字典。
// 空间复杂度：O(n)，n为数组 nums 的长度。数组最多有 n 个不同元素，因此哈希表最多存储 n 个数据。