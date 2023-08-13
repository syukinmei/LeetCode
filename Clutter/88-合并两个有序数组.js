// 给你两个按 非递减顺序 排列的整数数组 nums1 和 nums2，另有两个整数 m 和 n ，分别表示 nums1 和 nums2 中的元素数目。
// 请你 合并 nums2 到 nums1 中，使合并后的数组同样按 非递减顺序 排列。
// 注意：最终，合并后数组不应由函数返回，而是存储在数组 nums1 中。为了应对这种情况，nums1 的初始长度为 m + n，其中前 m 个元素表示应合并的元素，后 n 个元素为 0 ，应忽略。nums2 的长度为 n 。

// 输入：nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
// 输出：[1,2,2,3,5,6]
// 解释：需要合并 [1,2,3] 和 [2,5,6] 。
// 合并结果是 [1,2,2,3,5,6] ，其中斜体加粗标注的为 nums1 中的元素。

// 输入：nums1 = [1], m = 1, nums2 = [], n = 0
// 输出：[1]
// 解释：需要合并 [1] 和 [] 。
// 合并结果是 [1] 。

// 输入：nums1 = [0], m = 0, nums2 = [1], n = 1
// 输出：[1]
// 解释：需要合并的数组是 [] 和 [1] 。
// 合并结果是 [1] 。
// 注意，因为 m = 0 ，所以 nums1 中没有元素。nums1 中仅存的 0 仅仅是为了确保合并结果可以顺利存放到 nums1 中。

// 方法一：三指针
// 如果从左往右地把 nums2 合并到 nums1 中，假设 nums2[0] < nums1[0] ，那么我们需要用 nums2[0] 覆盖掉 nums1[0] ，这不是我们期望的。
// 因此我们可以尝试 从右往左地把 nums2 合并到 nums1 中。
// 具体的：
// 定义三个指针 p1、p2、p，分别指向未排序的 nums1、nums2 的尾部元素和合并后的数组的末尾。
// 不断比较 nums1[p1] 和 nums2[p2] 的大小，将较大元素放入到 nums1[p] 位置。并不断更新 p1、p2、p 三个指针，直到 p2 < 0，即 nums2 所有元素都插入到了 nums1 中。
/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function (nums1, m, nums2, n) {
  let p1 = m - 1;
  let p2 = n - 1;
  let p = nums1.length - 1;
  while (p2 >= 0) {
    if (nums1[p1] >= nums2[p2]) {
      [nums1[p1], nums1[p]] = [nums1[p], nums1[p1]];
      p1--;
    } else {
      [nums2[p2], nums1[p]] = [nums1[p], nums2[p2]];
      p2--;
    }
    p--;
  }
  return nums1;
};
// 时间复杂度：O(n+m)， 需要遍历 nums1 和 nums2 将其升序的插入到 nums1 中。
// 空间复杂度：O(1)，只需要常数的空间存放若干变量。
