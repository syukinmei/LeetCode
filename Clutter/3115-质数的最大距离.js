// 给你一个整数数组 nums。
// 返回两个（不一定不同的）质数在 nums 中 下标 的 最大距离。

// 输入： nums = [4,2,9,5,3]
// 输出： 3
// 解释： nums[1]、nums[3] 和 nums[4] 是质数。因此答案是 |4 - 1| = 3。

// 输入： nums = [4,8,2,8]
// 输出： 0
// 解释： nums[2] 是质数。因为只有一个质数，所以答案是 |2 - 2| = 0。

// 提示：
// 1 <= nums.length <= 3 * 10^5
// 1 <= nums[i] <= 100
// 输入保证 nums 中至少有一个质数。

// 方法一：模拟
// 这道题实际要找到数组中首个质数和最后一个质数的位置，然后返回它们之间的距离。
// 因此，我们可以分别从左到右找到首个质数，从右到左找到最后一个质数，然后返回它们之间的距离。
// 具体实现时，我们可以使用哈希集合来存储质数，并使用两个指针分别从左到右和从右到左遍历数组。

// 关于对质数的判断，我们可以从它的定义入手：如果一个数的约数只有 1 和它本身，那么这个数就是质数（并且 0 和 1 除外）
// 因此对于一个数 n ，我们可以枚举 [2, n-1] 判断是否存在除了 1 和它本身以外的约数。
// 更进一步的：
// n 的两个因子一定是一个 小于等于 √n ，一个 大于等于 √n 的数，这样乘起来才可能等于 n 。
// 如果没有 小于等于 √n 的因子，也就一定没有 大于等于 √n 的因子。
// 因此，我们可以从 2 开始枚举到 √n ，判断 n 是否为质数。

/**
 * @param {number[]} nums
 * @return {number}
 */
var maximumPrimeDifference = function (nums) {
  let first = 0;
  let last = nums.length - 1;

  while (first <= last && !isPrime(nums[first])) first++; // 找到首个质数

  while (first <= last && !isPrime(nums[last])) last--; // 找到最后一个质数

  return last - first; // 返回最大距离
};

/**
 * 判断数字 n 是否为质数
 * @param {number} n
 * @returns {boolean}
 */
const isPrime = function (n) {
  if (n < 2) return false;

  // for (let i = 2; i <= Math.sqrt(n); i++) {
  for (let i = 2; i <= n / i; i++) {
    if (n % i === 0) return false;
  }

  return true;
};
// 时间复杂度：O(√n * m)，判断一个数字的 n 是否为质数需要 O(√n) 的时间复杂度，而 m 是数组的长度，最多完整的遍历一次数组。因此总的时间复杂度为 O(√n * m)。
// 空间复杂度：O(1)，只需要常数的空间存放若干变量。

// 注意到 isPrime 函数有两种写法，对于循环条件 i <= n / i ：
//   这实际上是一个巧妙的方式来避免计算平方根。
//   在第一次迭代中，如果 i 小于或等于 n 的平方根，那么 n / i 将大于或等于平方根。
//   随着 i 增大，i 超过平方根时，n / i 将小于或等于平方根。因此，i <= n / i 条件与 i <= Math.sqrt(n) 是等价的。
