// 给你一个整数数组 nums 。一个子数组 [numsl, numsl+1, ..., numsr-1, numsr] 的 和的绝对值 为 abs(numsl + numsl+1 + ... + numsr-1 + numsr) 。

// 请你找出 nums 中 和的绝对值 最大的任意子数组（可能为空），并返回该 最大值 。

// abs(x) 定义如下：
//  - 如果 x 是负整数，那么 abs(x) = -x 。
//  - 如果 x 是非负整数，那么 abs(x) = x 。

// 输入：nums = [1,-3,2,3,-4]
// 输出：5
// 解释：子数组 [2,3] 和的绝对值最大，为 abs(2+3) = abs(5) = 5 。

// 输入：nums = [2,-5,1,-4,3,-2]
// 输出：8
// 解释：子数组 [-5,1,-4] 和的绝对值最大，为 abs(-5+1-4) = abs(-8) = 8 。

// 方法一：动态规划
// 一个变量的绝对值的最大值，可能是这个变量的最大值的绝对值，也可能是这个变量的最小值的绝对值。
// 因此，题目要求任意子数组和的绝对值的最大值，可以分别求出子数组和的最大值 max 和最小值 min。那么任意子数组的绝对值的最大值即是 max(max, -min) 。
// 我们定义 f[i] 表示以 nums[i] 结尾的子数组的和的最大值，g[i] 表示以 nums[i] 结尾的子数组的和的最小值。
// 对于 f[i] 和 g[i]，我们都可以选择 「将当前元素加入到前一个子数组中，或者以当前元素作为新的子数组的起点」 ，那么就可以轻易的得到如下状态移动方程：
//  - f[i] = max(f[i - 1] + nums[i], nums[i]);
//  - g[i] = min(g[i - 1] + nums[i], nums[i]);

// 再转化一下即可得到：
//  - f[i] = max(f[i - 1], 0) + nums[i];
//  - g[i] = min(g[i - 1], 0) + nums[i];

// 最后答案为 max(f[i], -g[i])
var maxAbsoluteSum = function (nums) {
  const f = [0];
  const g = [0];
  let max = 0;
  let min = 0;
  for (let i = 0; i < nums.length; i++) {
    f[i + 1] = Math.max(f[i], 0) + nums[i];
    g[i + 1] = Math.min(g[i], 0) + nums[i];
    max = Math.max(f[i + 1], max);
    min = Math.min(g[i + 1], min);
  }
  return Math.max(max, -min);
};
// 时间复杂度：O(n)，n 为数组 nums 的长度，需要遍历数组一次。
// 空间复杂度：O(n)，使用一个长度为 n 的数组 dp 来保存状态。

// 方法二：变量滚动计算优化空间复杂
var maxAbsoluteSum = function (nums) {
  let max = 0; // 记录以 x 为结尾的子数组的最大和
  let min = 0; // 记录以 x 为结尾的子数组的最小和
  let res = 0; // 记录最大绝对和
  for (let x of nums) {
    // 如果以前一个元素为结尾的子数组最大和大于0，则当前元素加入到前一个子数组中，否则以当前元素作为新的子数组的起点
    max = Math.max(max, 0) + x;

    // 如果以前一个元素为结尾的子数组最小和小于0，则当前元素加入到前一个子数组中，否则以当前元素作为新的子数组的起点
    min = Math.min(min, 0) + x;

    // 更新最大绝对和，取最大和、最小和的绝对值 和 当前最大绝对和的最大值
    res = Math.max(res, max, -min);
  }
  return res; // 返回最大绝对和
};
// 时间复杂度：O(n)，n 为数组 nums 的长度，需要遍历数组一次。
// 空间复杂度：O(1)，只需要常数的空间存放若干变量。
