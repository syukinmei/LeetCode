// 给你一个长度为 n 的整数数组 nums 和 一个目标值 target。请你从 nums 中选出三个整数，使它们的和与 target 最接近。
// 返回这三个数的和。
// 假定每组输入只存在恰好一个解。

// 输入：nums = [-1,2,1,-4], target = 1
// 输出：2
// 解释：与 target 最接近的和是 2 (-1 + 2 + 1 = 2) 。

// 输入：nums = [0,0,0], target = 1
// 输出：0

// 方法一：排序+双指针
// 这题解法和上题目 「15-三数之和」类似。对 nums 升序排序后固定一个数 nums[i]，再使用双指针寻找剩下两个数，使得三数之和最接近 target。
// 使用 res 维护最接近 target 的三数之和。
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var threeSumClosest = function (nums, target) {
  nums.sort((a, b) => a - b); // nums 升序排序
  const len = nums.length;
  let res = Number.MAX_SAFE_INTEGER;
  // 从小到大遍历数组，以当前元素作为第一个数。
  for (let i = 0; i < len - 2; i++) {
    // 使用双指针查询剩下的两个数
    let left = i + 1;
    let right = len - 1;
    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];

      if (Math.abs(target - sum) < Math.abs(target - res)) res = sum; // 更新结果值，此时 sum 是三个元素和最接近 target 的

      if (sum === target) return sum; // 距离为0，无更近可能，直接返回 sum。
      else if (sum < target) left++; // 和小于目标值，左指针右移动。
      else if (sum > target) right--; // 和大于目标值，右指针左移。
    }
  }
  return res;
};
// 时间复杂度：O(n^2)，n 为数组 nums 的长度，排序需要 O(nlogn)的时间，搜索解需要O(n^2)，分别为外层循环确认第一个数O(n)，内层循环使用双指针枚举剩余两个数也需要O(n)，因此总的时间复杂度为O(n^2)。
// 空间复杂度：O(logn)，排序需要O(logn)的递归栈空间。
