// 给定一个包含 [0, n] 中 n 个数的数组 nums ，找出 [0, n] 这个范围内没有出现在数组中的那个数。

// 输入：nums = [3,0,1]
// 输出：2
// 解释：n = 3，因为有 3 个数字，所以所有的数字都在范围 [0,3] 内。2 是丢失的数字，因为它没有出现在 nums 中。

// 输入：nums = [0,1]
// 输出：2
// 解释：n = 2，因为有 2 个数字，所以所有的数字都在范围 [0,2] 内。2 是丢失的数字，因为它没有出现在 nums 中。

// 输入：nums = [9,6,4,2,3,5,7,0,1]
// 输出：8
// 解释：n = 9，因为有 9 个数字，所以所有的数字都在范围 [0,9] 内。8 是丢失的数字，因为它没有出现在 nums 中。

// 输入：nums = [0]
// 输出：1
// 解释：n = 1，因为有 1 个数字，所以所有的数字都在范围 [0,1] 内。1 是丢失的数字，因为它没有出现在 nums 中。

// tips:
// 0 <= nums[i] <= n
// nums 中的所有数字都 独一无二

// 方法一：排序
// 具体的，将 nums 数组排序，如何遍历排序后的数组，比较当前值和下标是否相等，不想等则丢失的数为下标 i。
// 注意的是，当丢失数字等于 n 时，遍历数组比较下标都想等的情况，因此再遍历玩排序后的数组后为找到丢失数组，则丢失数字为 n。
var missingNumber = function (nums) {
  nums.sort((a, b) => a - b);
  const n = nums.length;
  for (let i = 0; i < n; i++) {
    if (nums[i] !== i) {
      return i;
    }
  }
  return n;
};
// 时间复杂度：O(nlogn)，n 为数组 nums 的长度。排序需要 O(nlogn)的时间。
// 空间复杂度：O(logn)，快排需要 O(logn) 的递归栈空间。

// 方法二：哈希表
// 遍历数组 nums，将数组中的每个元素加入哈希表中，然后依次检查从 0 到 n 的每个元素是否在哈希表中，不在的即为丢失的数字。
// 时间复杂度：O(n)，n 为数组 nums 的长度，遍历数组 nums 将元素加入哈希表中的时间为 O(n)，遍历 0 到 n 到每个整数并判断是否在哈希表中需要的时间也为O(n)，因此总的时间复杂度为 O(n)。
// 空间复杂度：O(n)，哈希表需要完整的存储 nums 中的每个元素。

// 方法三：差值法
// 利用差值，nums 数组中所以元素和 与 有 [0, n] 中所有元素和，之间的差就是丢失的那个数字。
// 具体的，可以利用高斯求和公式：
// sum = (首项 + 尾项) * 项数 / 2。即 sum = (n) ∑ (i=1) = n(n+1)/2
var missingNumber = function (nums) {
  const n = nums.length;
  // return Math.floor(((n + 1) * n) / 2) - nums.reduce((a, b) => a + b, 0);
  return Math.floor(((n + 1) * n) / 2) - _.sum(nums);
};
// 时间复杂度：O(n)，为计算数组 nums 元素之和的时间开销。
// 空间复杂度：O(1)，只需要常数的空间存放若干变量。

// 方法四：位运算 异或
// 利用相同的元素异或的值为0，以及 交换律和结合律。
// nums 中的所有元素 和 [0,n]中的所有元素进行异或处理，最终结果即为丢失的那个元素。
// 因为只有缺失的元素出现了 1 次，其余元素均出现了两次，然后被 x ^ x = 0，抵消掉了。
/**
 * @param {number[]} nums
 * @return {number}
 */
var missingNumber = function (nums) {
  let n = nums.length;
  let missing = n;
  for (let i = 0; i < nums.length; i++) {
    missing = missing ^ i ^ nums[i];
  }
  return missing;
};

// 好理解版
var missingNumber = function (nums) {
  let xor = 0;
  let n = nums.length;
  for (let i = 0; i < n; i++) {
    xor ^= nums[i];
  }
  for (let i = 0; i <= n; i++) {
    xor ^= i;
  }
  return xor;
};
// 时间复杂度：O(n)，n 为数组 nums 的长度，需要计算 2n+1 个数组计算按位异或的结果。
// 空间复杂度：O(1)，只需要常数的空间存放若干变量。
