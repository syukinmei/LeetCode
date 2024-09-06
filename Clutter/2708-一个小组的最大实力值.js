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

// 方法三：动态规划
// 题目要求从给定的数组 nums 中选择若干个元素（至少 1 个），是的这些元素的乘积最大。
// 那么对于每个元素都有 选或不选 两种情况，因此可以使用动态规划来解决。

// 我们来分析一下对于任意元素 nums[i] 选和不选的情况：
//  - 如果不选 nums[i]，那么 [0, i] 的最大实力值等于 [0, i-1] 的最大实力值。
//  - 如果选 nums[i]，则三种情况有：
//    - [0, i-1] 可产生的最大实力值小于 nums[i] 单独为一组的实力值，如 [0, 0, 0, 9] 此时，元素 9 自己构成一个小组能够得到最大实力值。
//    - nums[i] 为正数，正数乘以的数越大结果越大，因此 nums[i] 应乘以 nums[0, i-1] 可产生的最大实力值。
//    - nums[i] 为负数，负数乘以的数越小结果越大，因此 nums[i] 应乘以 nums[0, i-1] 可产生的最小实力值。

// 1.定义动态数组的含义
//  - 不难发现我们既要维护 [0, i] 可产生的最大实力值，也要维护 [0, i] 可产生的最小实力值，因此我们定义动态数组的含义如下：
//  - dp[i][0] 表示 nums[0, i] 的数组可产生的最大实力值；
//  - dp[i][1] 表示 nums[0, i] 的数组可产生的最小实力值；

// 2.状态移动方程
//  - [0, i] 可产生的最大实力值：
//    - dp[i][0] = max(dp[i-1][0], nums[i], dp[i-1][0] * nums[i], dp[i-1][1] * nums[i])
//    - 分别表示：不选 nums[i]，选 nums[i] 单独构成一个小组，nums[i] 为正数乘以 [0, i-1] 可产生的最大实力值，nums[i] 为负数乘以 [0, i-1] 可产生的最小实力值。

//  - [0, i] 可产生的最小实力值：
//    - dp[i][1] = min(dp[i-1][1], nums[i], dp[i-1][0] * nums[i], dp[i-1][1] * nums[i])
//    - 分别表示：不选 nums[i]，选 nums[i] 单独构成一个小组，nums[i] 为负数乘以 [0, i-1] 可产生的最大实力值，nums[i] 为正数乘以 [0, i-1] 可产生的最小实力值。

// 3.结果
//  - 最终结果为 dp[n-1][0]，表示数组 nums 可构建的最大实力值。

// 4.初始条件
//  - i = 0 时，由于 nums[0, 0] 只有一个元素 nums[0] 且题目要求组成一个 非空 小组，则此时最大值和最小值均为这个元素
//  - 即 dp[0][0] = dp[0][1] = nums[0]。

//  5. 滚动数组进行空间优化
//  - 由于 dp[i] 只与 dp[i-1] 有关，因此可以使用两个变量 mx 和 mn 来代替 dp[i-1][0] 和 dp[i][1] 即可。
