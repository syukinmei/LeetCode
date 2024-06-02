// 给你一个整数数组 nums，其中恰好有两个元素只出现一次，其余所有元素均出现两次。 找出只出现一次的那两个元素。你可以按 任意顺序 返回答案。
// 你必须设计并实现线性时间复杂度的算法且仅使用常量额外空间来解决此问题。

// 输入：nums = [1,2,1,3,2,5]
// 输出：[3,5]
// 解释：[5, 3] 也是有效的答案。

// 输入：nums = [-1,0]
// 输出：[-1,0]

// 输入：nums = [0,1]
// 输出：[1,0]

// 方法一：哈希表
// 我们可以使用一个哈希表统计数组中每一个元素出现的次数。
// 然后遍历哈希表，找到只出现一次的元素，并将其放入答案中。
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var singleNumber = function (nums) {
    // 构建哈希表
    const freq = new Map();
    for (const num of nums) {
        freq.set(num, (freq.get(num) || 0) + 1);
    }
    // 找出只出现一次的元素
    const ans = [];
    for (const [num, occ] of freq.entries()) {
        if (occ === 1) {
            ans.push(num);
        }
    }
    return ans;
};

// 时间复杂度：O(n)，n 为整数数组 nums 的长度，构建哈希表需要 O(n) 的时间，遍历哈希表找出只出现一次的元素需要 O(n) 的时间，因此总的时间复杂度为 O(n)。
// 空间复杂度：O(n)，即为哈希表需要使用的空间。
