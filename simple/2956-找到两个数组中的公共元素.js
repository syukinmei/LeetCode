// 给你两个下标从 0 开始的整数数组 nums1 和 nums2 ，它们分别含有 n 和 m 个元素。
// 请你计算以下两个数值：
//  - 统计 0 <= i < n 中的下标 i ，满足 nums1[i] 在 nums2 中 至少 出现了一次。
//  - 统计 0 <= i < m 中的下标 i ，满足 nums2[i] 在 nums1 中 至少 出现了一次。
// 请你返回一个长度为 2 的整数数组 answer ，按顺序 分别为以上两个数值。

// 输入：nums1 = [4,3,2,3,1], nums2 = [2,2,5,2,3,6]
// 输出：[3,4]
// 解释：分别计算两个数值：
// - nums1 中下标为 1 ，2 和 3 的元素在 nums2 中至少出现了一次，所以第一个值为 3 。
// - nums2 中下标为 0 ，1 ，3 和 4 的元素在 nums1 中至少出现了一次，所以第二个值为 4 。

// 输入：nums1 = [3,4,2,3], nums2 = [1,5]
// 输出：[0,0]
// 解释：两个数组中没有公共元素，所以两个值都为 0 。

// 方法一：哈希集合
// 分别将 nums1 和 nums2 的元素分别存入两个哈希集合中，就可以 O(1) 的时间判断元素是否在数组中了。
// 然后遍历两个数组，统计每个元素在另一个哈希集合中出现的次数，最后返回两个统计值的和。
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var findIntersectionValues = function (nums1, nums2) {
    const set1 = new Set(nums1);
    const set2 = new Set(nums2);

    // 统计 nums1 中的元素在 nums2 中至少出现一次的个数
    let count1 = 0;
    for (const num of nums1) {
        if (set2.has(num)) count1++;
    }

    // 统计 nums2 中的元素在 nums1 中至少出现一次的个数
    let count2 = 0;
    for (const num of nums2) {
        if (set1.has(num)) count2++;
    }

    return [count1, count2];
};
// 时间复杂度：O(m+n)，m 和 n 分别为两个数组的长度，构建 2 个哈希表分别需要 O(m) 和 O(n) 的时间，统计次数分别也需要 O(m) 和 O(n) 的时间，因此总的时间为 O(m+n)。
// 空间复杂度：O(m+n)，m 和 n 分别为两个数组的长度，用于存储两个哈希集合。
