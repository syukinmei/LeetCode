// 你有一个初始为空的浮点数数组 averages。另给你一个包含 n 个整数的数组 nums，其中 n 为偶数。
// 你需要重复以下步骤 n / 2 次：
//  - 从 nums 中移除 最小 的元素 minElement 和 最大 的元素 maxElement。
//  - 将 (minElement + maxElement) / 2 加入到 averages 中。

// 返回 averages 中的 最小 元素。

// 输入： nums = [7,8,3,4,15,13,4,1]
// 输出： 5.5
// 解释：
//  步骤	nums	           averages
//   0    [7,8,3,4,15,13,4,1]    []
//   1    [7,8,3,4,13,4]         [8]
//   2    [7,8,4,4]             [8,8]
//   3    [7,4]                 [8,8,6]
//   4    []                    [8,8,6,5.5]
// 返回 averages 中最小的元素，即 5.5。

// 输入： nums = [1,9,8,3,10,5]
// 输出： 5.5
// 解释：
//  步骤    nums              averages
//   0    [1,9,8,3,10,5]        []
//   1    [9,8,3,5]             [5.5]
//   2    [8,5]                 [5.5,6]
//   3    []                    [5.5,6,6.5]

// 输入： nums = [1,2,3,7,8,9]
// 输出： 5.0
// 解释：
//  步骤    nums              averages
//   0    [1,2,3,7,8,9]         []
//   1    [2,3,7,8]             [5]
//   2    [3,7]                 [5,5]
//   3    []	                [5,5,5]

// 方法一：排序+枚举
// 将 nums 进行从小到大的排序，然后枚举 i ∈ [0, n/2)，返回 (nums[i] + nums[n - i - 1]) / 2 的最小值即可。
// 额外的，由于需要每对 minElement 和 maxElement 进行相加再除以 2，因此我们可以寻找最小的 minElement 和 maxElement，然后返回 (minElement + maxElement) / 2 即可。

/**
 * @param {number[]} nums
 * @return {number}
 */
var minimumAverage = function (nums) {
  nums.sort((a, b) => a - b); // 升序排序
  const n = nums.length;
  let res = Number.MAX_SAFE_INTEGER;
  const t = (n / 2) | 0; // 枚举的结束边界
  for (let i = 0; i < t; i++) {
    res = Math.min(res, nums[i] + nums[n - i - 1]);
  }
  return res / 2;
};
// 时间复杂度：O(nlogn)，其中 n 是数组 nums 的长度。排序需要 O(nlogn)，枚举每对 minElement 和 maxElement 需要 O(n/2) 的时间，因此总的时间复杂度为 O(nlogn)。
// 空间复杂度：O(logn)，排序需要O(logn)的递归栈空间。
