// 在一个 m*n 的棋盘的每一格都放有一个礼物，每个礼物都有一定的价值（价值大于 0）。你可以从棋盘的左上角开始拿格子里的礼物，并每次向右或者向下移动一格、直到到达棋盘的右下角。给定一个棋盘及其上面的礼物的价值，请计算你最多能拿到多少价值的礼物？

// 输入:
// [
//   [1,3,1],
//   [1,5,1],
//   [4,2,1]
// ]
// 输出: 12
// 解释: 路径 1→3→5→2→1 可以拿到最多价值的礼物


// 方法一：动态规划
// 使用 dp[i][j] 表示从左上角到第 i 行、第 j 列格子时能够拿到第最大礼物价值。状态移动方程为：
//  - dp[i][j] = max(dp[i][j-1], dp[i-1][j]) + grid[i][j]
// 即从左边或者上面的格子过来，并加上当前格子的价值。
// 最后的答案即为 dp[m-1][n-1]。

// 额外的，对于第一行和第一列，因为只能向右或者向下移动，所以第一行和第一列只有一种方案，即走到这个格子的路径只有一条。
// 所以对于第一行有 dp[0][i] = dp[0][i-1] + grid[0][i]。
//    对于第一列有 dp[j][0] = dp[j-1][0] + grid[j][0]。
//    对于起点 dp[0][0] = grid[0][0]
/**
 * @param {number[][]} grid
 * @return {number}
 */
var maxValue = function (grid) {
  // step1：初始化 f 赋予初始值
  const [row, col] = [grid.length, grid[0].length];
  const f = new Array(row).fill(0).map(() => new Array(col).fill(0));
  f[0][0] = grid[0][0];
  // step2：初始化 f 单方向移动的情况下的最大收益
  for (let i = 1; i < row; i++) {
    f[i][0] = f[i - 1][0] + grid[i][0];
  }
  for (let j = 1; j < col; j++) {
    f[0][j] = f[0][j - 1] + grid[0][j];
  }
  // step3：状态移动方程
  for (let i = 1; i < row; i++) {
    for (let j = 1; j < col; j++) {
      const left = f[i][j - 1];
      const top = f[i - 1][j];
      f[i][j] = Math.max(left, top) + grid[i][j];
    }
  }
  // 返回末端结果即可
  return f[row - 1][col - 1];
};
// 时间复杂度：O(m*n)，m 和 n 分别为矩阵行高、列宽，动态规划的需要遍历整个 grid 矩阵，因此时间复杂度为O(m*n)。
// 空间复杂度：O(m*n)，使用一个 m*n 的二维数组 dp 来保存状态。
