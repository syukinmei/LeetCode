// 给你一个下标从 0 开始的整数数组 nums ，它表示一个班级中所有学生在一次考试中的成绩。老师想选出一部分同学组成一个 非空 小组，且这个小组的 实力值 最大。
// 如果这个小组里的学生下标为 i0, i1, i2, ... , ik ，那么这个小组的实力值定义为 nums[i0] * nums[i1] * nums[i2] * ... * nums[ik​] 。
// 请你返回老师创建的小组能得到的最大实力值为多少。

// 输入：nums = [3,-1,-5,2,5,-9]
// 输出：1350
// 解释：一种构成最大实力值小组的方案是选择下标为 [0,2,3,4,5] 的学生。实力值为 3 * (-5) * 2 * 5 * (-9) = 1350 ，这是可以得到的最大实力值。

// 输入：nums = [-4,-5,-4]
// 输出：20
// 解释：选择下标为 [0, 1] 的学生。得到的实力值为 20 。我们没法得到更大的实力值。

// 方法一：排序
// 对整数数组 nums 进行排序，使用所有整数 以及 仅成对使用负整数（以便它们的乘积变为正数），可以在 O(nlogn) 的时间复杂度内得到最大实力值。

// 方法二：分类讨论
// 这道题应该算不上中等题，是小学数学题。
// 先把所有 0 去掉，其他的数全部乘起来，得到一个绝对值最大的乘积 prod ，然后根据 prod 的正负情况，分类讨论：
//  - prod 为正数，直接返回
//  - prod 为负数，根据乘积数（非 0 数）又有两种情况：
//    - 有多个乘积，除去最大的负数即可，
//    - 只有一个乘积，即数组 nums 由 1 个负数和 n 个 0 组成，有 0 返回 0，没 0 返回 prod。
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxStrength = function (nums) {
  let maxNegative = -10; // 最大负数，题目区间为[-9, 9]
  let prod = 1; // 乘积
  let zeroCount = 0; // 0 的个数
  let negativeCount = 0; // 负数个数

  for (const num of nums) {
    if (num === 0) zeroCount++;
    else prod *= num;

    if (num < 0) {
      negativeCount++;
      maxNegative = Math.max(maxNegative, num);
    }
  }

  // 当数组仅有 1 个元素且为负数时，最大积为该负数。
  if (nums.length === 1 && negativeCount === 1) return nums[0];

  // 至多只有一个非 0 数字 且 没有正数 且 存在 0，最大积为 0
  if (
    nums.length - zeroCount <= 1 &&
    zeroCount + negativeCount === nums.length &&
    zeroCount > 0
  )
    return 0;

  // 奇数个负数会导致乘为负数，除以最大负数即可获得最大积
  if (negativeCount & 1) prod /= maxNegative;

  return prod;
};
// 时间复杂度：O(n)，n 为数组 nums 的长度，需要对其进行一次遍历以计算乘积和。
// 空间复杂度：O(1)，只需要常数的空间存放若干变量。
