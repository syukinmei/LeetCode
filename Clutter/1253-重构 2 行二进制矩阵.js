// 给你一个 2 行 n 列的二进制数组：
//  - 矩阵是一个二进制矩阵，这意味着矩阵中的每个元素不是 0 就是 1。
//  - 第 0 行的元素之和为 upper。
//  - 第 1 行的元素之和为 lower。
//  - 第 i 列（从 0 开始编号）的元素之和为 colsum[i]，colsum 是一个长度为 n 的整数数组。
// 你需要利用 upper，lower 和 colsum 来重构这个矩阵，并以二维整数数组的形式返回它。
// 如果有多个不同的答案，那么任意一个都可以通过本题。
// 如果不存在符合要求的答案，就请返回一个空的二维数组。

// 输入：upper = 2, lower = 1, colsum = [1,1,1]
// 输出：[[1,1,0],[0,0,1]]
// 解释：[[1,0,1],[0,1,0]] 和 [[0,1,1],[1,0,0]] 也是正确答案。

// 输入：upper = 2, lower = 3, colsum = [2,2,1,1]
// 输出：[]

// 输入：upper = 5, lower = 5, colsum = [2,1,2,0,1,0,1,2,0,1]
// 输出：[[1,1,1,0,1,0,0,1,0,0],[1,0,1,0,0,0,1,1,0,1]]

// 方法一：贪心
// 设 colsum 中元素和为 sum，元素为2的个数为 two。
// 显然的，如果 sum === upper + lower && two <= Math.min(upper, lower)，则一定能够构造出符合条件的二进制矩阵。
// 如果 colsum[i] 为 2 或者 0 ，构建出符合条件的任意一种矩阵 i 的位置一定是相同的，matrix[i][0] = matrix[i][1] = colsum[i]
// 因此，我们只需要关注 colsum[i] = 1 的情况，我们贪心的优先将行中 1 个数多的行进行赋值为 1。
/**
 * @param {number} upper
 * @param {number} lower
 * @param {number[]} colsum
 * @return {number[][]}
 */
var reconstructMatrix = function (upper, lower, colsum) {
  const n = colsum.length;
  const matrix = Array.from({ length: 2 }, () => new Array(n).fill(0));
  //  计算 colsum 数组中元素和，及 2 的个数。
  let sum = 0;
  let two = 0;
  for (let i = 0; i < n; i++) {
    if (colsum[i] === 2) {
      two++;
    }
    sum += colsum[i];
  }

  // 如果无法构建符合条件的二进制矩阵返回 []。
  if (!(sum === upper + lower && two <= Math.min(upper, lower))) {
    return [];
  }

  //  构造符合条件的二进制矩阵。
  for (let i = 0; i < n; i++) {
    if (colsum[i] === 2) {
      upper--;
      lower--;
      matrix[0][i] = 1;
      matrix[1][i] = 1;
    } else if (colsum[i] === 1) {
      if (upper > lower) {
        upper--;
        matrix[0][i] = 1;
      } else {
        lower--;
        matrix[1][i] = 1;
      }
    }
  }
  return matrix;
};
// 时间复杂度：O(n)，n 为数组 colsum 的长度，需要遍历2次 colsum 数组，分别计算其 元素和、2的个数 和构建符合条件的二进制数。
// 空间复杂度：O(1)，只需要常数的空间存放若干变量。
console.log(reconstructMatrix(4, 2, [1, 2, 1, 2, 0]));
