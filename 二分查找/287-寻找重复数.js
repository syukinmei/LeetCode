// 给定一个包含 n + 1 个整数的数组 nums ，其数字都在 1 到 n 之间（包括 1 和 n），可知至少存在一个重复的整数。
// 假设 nums 只有 一个重复的整数 ，找出 这个重复的数 。
// 你设计的解决方案必须不修改数组 nums 且只用常量级 O(1) 的额外空间。

// 输入：nums = [1,3,4,2,2]
// 输出：2

// 输入：nums = [3,1,3,4,2]
// 输出：3

// 输入：nums = [1,1]
// 输出：1

// 输入：nums = [1,1,2]
// 输出：1

/**
 * @param {number[]} nums
 * @return {number}
 */

// 方法一：哈希表（一旦涉及出现次数/找重复，就可以使用哈希表）
/* var findDuplicate = function (nums) {
    let dic = new Set()
    for (let item of nums) {
        if (dic.has(item)) return item
        dic.add(item)
    }
    return -1;
}; */

// 时间复杂度：O(n)
// 空间复杂度：O(n)


// 方法二：二分查找