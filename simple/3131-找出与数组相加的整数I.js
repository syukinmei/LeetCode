// 给你两个长度相等的数组 nums1 和 nums2。
// 数组 nums1 中的每个元素都与变量 x 所表示的整数相加。如果 x 为负数，则表现为元素值的减少。
// 在与 x 相加后，nums1 和 nums2 相等 。当两个数组中包含相同的整数，并且这些整数出现的频次相同时，两个数组 相等 。
// 返回整数 x 。

// 输入：nums1 = [2,6,4], nums2 = [9,7,5]
// 输出：3
// 解释：
// 与 3 相加后，nums1 和 nums2 相等。

// 输入：nums1 = [10], nums2 = [5]
// 输出：-5
// 解释：
// 与 -5 相加后，nums1 和 nums2 相等。

// 输入：nums1 = [1,1,1,1], nums2 = [1,1,1,1]
// 输出：0
// 解释：
// 与 0 相加后，nums1 和 nums2 相等。

// 提示：
// 1 <= nums1.length == nums2.length <= 100
// 0 <= nums1[i], nums2[i] <= 1000
// 测试用例以这样的方式生成：存在一个整数 x，使得 nums1 中的每个元素都与 x 相加后，nums1 与 nums2 相等。

// 方法一：最小值之差
// 根据题意，可知对两个数组进行排序后，每个元素之间存在一一对应的关系。
// 将两个数组排序后，将第一个数组中的每个元素加上 x 就等于第二个数组中的对应元素。
// 因此我们考虑数组中最小的元素,有:
//   min(nums1) + x = min(nums2)
//   x = min(nums2) - min(nums1)

// 具体实现：
// 我们分别求出两个数组的最小值，然后返回两个最小值的差值即可。
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var addedInteger = function (nums1, nums2) {
    return Math.min(...nums2) - Math.min(...nums1);
};
// 时间复杂度：O(n)，n 为数组 nums1 和 nums2 的长度。
// 空间复杂度：O(1)，只需要常数的空间存放若干变量。
