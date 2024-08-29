// 给你一个大小为 m x n 的二维矩阵 grid 。你需要判断每一个格子 grid[i][j] 是否满足：

//  - 如果它下面的格子存在，那么它需要等于它下面的格子，也就是 grid[i][j] == grid[i + 1][j] 。
//  - 如果它右边的格子存在，那么它需要不等于它右边的格子，也就是 grid[i][j] != grid[i][j + 1] 。

// 如果 所有 格子都满足以上条件，那么返回 true ，否则返回 false 。

// 输入：grid = [[1,0,2],[1,0,2]]
// 输出：true
// 解释：
// [1, 0, 2]
// [1, 0, 2]
// 网格图中所有格子都符合条件。

// 输入：grid = [[1,1,1],[0,0,0]]
// 输出：false
// 解释：
// [1, 1, 1]
// [0, 0, 0]
// 同一行中的格子值都相等。

// 输入：grid = [[1],[2],[3]]
// 输出：false
// 解释：
// [1]
// [2]
// [3]
// 同一列中的格子值不相等。

// 方法一：模拟
// 根据题意，遍历矩阵 grid ，对于每个格子 grid[i][j] ，判断其是否满足条件即可。
/**
 * @param {number[][]} grid
 * @return {boolean}
 */
var satisfiesConditions = function (grid) {
    const m = grid.length;
    const n = grid[0].length;
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (i + 1 < m && grid[i][j] !== grid[i + 1][j]) return false; // 不等于下面的格子
            if (j + 1 < n && grid[i][j] === grid[i][j + 1]) return false; // 等于右边的格子
        }
    }
    return true; // 满足条件
};
// 时间复杂度：O(mn)，m 和 n 分别表示矩阵 grid 的行数和列数。需要矩阵进行一次遍历，以判断是否满足条件。
// 空间复杂度：O(1)，只需要常数的空间存放若干遍历即可。
