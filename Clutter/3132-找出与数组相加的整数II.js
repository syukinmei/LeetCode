// 给你两个整数数组 nums1 和 nums2。
// 从 nums1 中移除两个元素，并且所有其他元素都与变量 x 所表示的整数相加。如果 x 为负数，则表现为元素值的减少。
// 执行上述操作后，nums1 和 nums2 相等 。当两个数组中包含相同的整数，并且这些整数出现的频次相同时，两个数组 相等 。
// 返回能够实现数组相等的 最小 整数 x 。

// 输入：nums1 = [4,20,16,12,8], nums2 = [14,18,10]
// 输出：-2
// 解释：
// 移除 nums1 中下标为 [0,4] 的两个元素，并且每个元素与 -2 相加后，nums1 变为 [18,14,10] ，与 nums2 相等。

// 输入：nums1 = [3,5,5,3], nums2 = [7,7]
// 输出：2
// 解释：
// 移除 nums1 中下标为 [0,3] 的两个元素，并且每个元素与 2 相加后，nums1 变为 [7,7] ，与 nums2 相等。

// 提示：
// 3 <= nums1.length <= 200
// nums2.length == nums1.length - 2
// 0 <= nums1[i], nums2[i] <= 1000
// 测试用例以这样的方式生成：存在一个整数 x，nums1 中的每个元素都与 x 相加后，再移除两个元素，nums1 可以与 nums2 相等。

// 方法一：排序+判断子序列
// 由于题目限制只能移除两个元素，所以 nums1 的前三小的元素必定有一个是保留下来的，我们可以枚举保留下来的最小元素是 nums1[0]、nums1[1] 还是 nums1[2]（对 nums1 进行升序排序后）。
//   tips：保留下来的最小的元素绝对不可能是 nums1[3] 或者更大的数，因为这意味着我们把 nums1 中前三小的元素都移除了，而题目要求只能移除两个元素。
// 例如升序排序后 nums1 = [2, 5, 6, 7, 8, 10]，nums2 = [3, 4, 5, 8]，如果 nums1 中保留下来的最小元素是 nums1[1] = 5 ，那么 x = nums2[0] - nums1[1] = 3- 5 = -2。
// 这意味着如果我们把 nums1 中的每个数都加上 x = -2 ，得到 nums1' = [0, 3, 4, 5, 6, 8]，问题就变成了判断 nums2 是否为 nums1' 的子序列，如果是子序列，那么我们就可以放心地移除多余的两个数了。

// 代码实现时的细节：
// 我们可以先判断保留下来的最小元素是 nums1[2]，再判断是 nums1[1]，最后判断是 nums1[0]。这是因为 nums1[i] 越大，答案 x 越小，第一个满足的就是答案。
// 由于题目保证答案一定存在，所以当 nums1[2] 和 nums1[1] 都不满足时，直接返回 nums2[0] - nums1[0] 即可。

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var minimumAddedInteger = function (nums1, nums2) {
  // 对 nums1、nums2 进行升序排序
  nums1.sort((a, b) => a - b);
  nums2.sort((a, b) => a - b);
  // 枚举保留 nums1[2] 或者 nums1[1]
  // 倒着枚举是因为 nums1[i] 越大答案越小，第一个满足的就是答案
  for (let i = 2; i > 0; i--) {
    const x = nums2[0] - nums1[i];
    // 双指针判断 nums1 所有元素 + x 后，nums2 是否为其子序列。
    let left = 0;
    let right = 0;
    while (left < nums1.length && right < nums2.length) {
      if (nums1[left] + x === nums2[right]) right++;
      left++;
    }
    // 是子序列，返回 x。
    if (right === nums2.length) return x;
  }

  // nums1[2] 和 nums1[1] 都不满足，直接返回 nums2[0] - nums1[0]。
  return nums2[0] - nums1[0];
};
// 时间复杂度：O(nlogn)，其中 n 是 nums1 的长度。排序的时间复杂度是 O(nlogn)，双指针判断子序列的时间复杂度是 O(n)。
// 空间复杂度：O(logn)，排序需要O(logn)的递归栈空间。
