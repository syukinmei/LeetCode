// 给你一个整数数组 nums，每次 操作 会从中选择一个元素并 将该元素的值减少 1。
// 如果符合下列情况之一，则数组 A 就是 锯齿数组：
//  - 每个偶数索引对应的元素都大于相邻的元素，即 A[0] > A[1] < A[2] > A[3] < A[4] > ...
//  - 或者，每个奇数索引对应的元素都大于相邻的元素，即 A[0] < A[1] > A[2] < A[3] > A[4] < ...
// 返回将数组 nums 转换为锯齿数组所需的最小操作次数。

// 输入：nums = [1,2,3]
// 输出：2
// 解释：我们可以把 2 递减到 0，或把 3 递减到 1。

// 输入：nums = [9,6,1,6,2]
// 输出：4

// 枚举+贪心
// 我们可以分别枚举偶数位和奇数位作为“比相邻元素小”的元素，然后计算需要的操作次数。取两者的最小值即可。
// 对于每一个偶数(奇数)下标 i 满足要求的最小操作数为 ci = max(p[i]−q(i)+1,0) ，其中 p(i) 表示数组 p 中位置 i 相邻元素的最小值。
/**
 * @param {number[]} nums
 * @return {number}
 */
var movesToMakeZigzag = function (nums) {
  let count = [0, 0]; // 分别保存 操作(减少)偶数位和奇数位的操作次数。
  // 循环2次，分别计算操作(减少)偶数位和奇数位需要的操作次数
  for (let i = 0; i < 2; i++) {
    for (let j = i; j < nums.length; j += 2) {
      // 注意处理边界
      const p = Math.min(
        nums[j - 1] || Number.MAX_SAFE_INTEGER,
        nums[j + 1] || Number.MAX_SAFE_INTEGER
      );
      count[i] += Math.max(nums[j] - p + 1, 0);
    }
  }
  // 返回相对较少了操作次数。
  return Math.min(...count);
};
// 时间复杂度：O(n)，n 为数组 nums 的长度，我们需要遍历两次数组分别求操作(减少)偶数位和奇数位的操作次数，总的时间复杂度为O(n)。
// 空间复杂度：O(1)，只需要常数的空间存放若干变量。
