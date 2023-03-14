// 给你两个非负整数数组 rowSum 和 colSum ，其中 rowSum[i] 是二维矩阵中第 i 行元素的和， colSum[j] 是第 j 列元素的和。换言之你不知道矩阵里的每个元素，但是你知道每一行和每一列的和。
// 请找到大小为 rowSum.length x colSum.length 的任意 非负整数 矩阵，且该矩阵满足 rowSum 和 colSum 的要求。
// 请你返回任意一个满足题目要求的二维矩阵，题目保证存在 至少一个 可行矩阵。

// 输入：rowSum = [3,8], colSum = [4,7]
// 输出：[[3,0],
//       [1,7]]
// 解释：
// 第 0 行：3 + 0 = 3 == rowSum[0]
// 第 1 行：1 + 7 = 8 == rowSum[1]
// 第 0 列：3 + 1 = 4 == colSum[0]
// 第 1 列：0 + 7 = 7 == colSum[1]
// 行和列的和都满足题目要求，且所有矩阵元素都是非负的。
// 另一个可行的矩阵为：[[1,2],
//                   [3,5]]

// 输入：rowSum = [5,7,10], colSum = [8,6,8]
// 输出：[[0,5,0],
//       [6,1,0],
//       [2,0,8]]

// 输入：rowSum = [14,9], colSum = [6,9,8]
// 输出：[[0,9,5],
//       [6,0,3]]

// 输入：rowSum = [1,0], colSum = [1]
// 输出：[[1],
//       [0]]

// 输入：rowSum = [0], colSum = [0]
// 输出：[[0]]

/**
 * @param {number[]} rowSum
 * @param {number[]} colSum
 * @return {number[][]}
 */
// 方法一：贪心
// 贪心策略：
// 我们从左上角开始遍历矩阵，并填充满足行列和条件的元素。对于矩阵中的每个元素 (i, j)，我们要填充一个值 mat[i][j]，这个值应该是 rowSum[i] 和 colSum[j] 中的较小值。
// 具体的：首先创建一个大小为 rowSum.length * colSum.length 的二维数组 mat，初始化为0。然后，从左上角开始遍历二维数组，逐步填充满足行列和条件的元素。
// 对于二维数组中的每一个元素 (i, j)，依据我们的贪心策略进行填充。填充完毕后，我们需要将 rowSum[i] 和 colSum[j] 分别减去已填充的值。直到填充完所有元素为止。最后返回矩阵 mat 即可。
function restoreMatrix(rowSum, colSum) {
  const m = rowSum.length;
  const n = colSum.length;
  const mat = Array.from(Array(m), () => new Array(n).fill(0));
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      const val = Math.min(rowSum[i], colSum[j]);
      mat[i][j] = val;
      rowSum[i] -= val;
      colSum[j] -= val;
    }
  }
  return mat;
}
// 时间复杂度：O(n*m)，n 和 m 分别为数组 rowSum 和 colSum 的长度，主要为构建 matrix 结果矩阵的时间开销，填充 matrix 的时间复杂度为O(n*m)
// 空间复杂度：O(1)，只需要常数的空间存放若干变量。
