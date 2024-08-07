// 给你一个二维 boolean 矩阵 grid 。
// 请你返回使用 grid 中的 3 个元素可以构建的 直角三角形 数目，且满足 3 个元素值 都 为 1 。
// 注意：
//  - 如果 grid 中 3 个元素满足：一个元素与另一个元素在 同一行，同时与第三个元素在 同一列 ，那么这 3 个元素称为一个 直角三角形 。这 3 个元素互相之间不需要相邻。

// [0, 1, 0]
// [0, 1, 1]
// [0, 1, 0]
// 输入：grid = [[0,1,0],[0,1,1],[0,1,0]]
// 输出：2
// 解释：
// 有 2 个直角三角形。

// [1, 0, 0, 0]
// [0, 1, 0, 1]
// [1, 0, 0, 0]
// 输入：grid = [[1,0,0,0],[0,1,0,1],[1,0,0,0]]
// 输出：0
// 解释：
// 没有直角三角形。

// [1, 0, 1]
// [1, 0, 0]
// [1, 0, 0]
// 输入：grid = [[1,0,1],[1,0,0],[1,0,0]]
// 输出：2
// 解释：
// 有两个直角三角形。

// 枚举
// 直接枚举三个点判断是否为直角三角形的方法过于低效，不仅不好确定是否为三角形还会有重复情况。
// 因此我们可以固定一个点，将其作为三角形的直角，然后来统计其他两个点的合法方法数。

// 例如：
// [x, x, 1, x, x]
// [x, x, 0, x, x]
// [1, 1, 1, 1, x]
// [x, x, 1, x, x]
// [x, x, 1, x, x]

// 我们以 (2, 2) 为直角，统计其他两个点的合法方法数。
// 上侧有 1 个 1， 左侧有 2 个 1，左侧的每个 1都可以和上侧的每个 1 构成一个直角三角形，共 2 * 1 = 2 个。
// 假设上侧有 a 个 1，左侧有 x 个 1，那么直角三角形有 ax 个。
// 假设上侧有 a 个 1，右侧有 y 个 1，那么直角三角形有 ay 个。
// 假设下侧有 b 个 1，左侧有 x 个 1，那么直角三角形有 bx 个。
// 假设下侧有 b 个 1，右侧有 y 个 1，那么直角三角形有 by 个。
// 那么构成直角三角形的总数为：
// ax + ay + bx + by = a(x+y) + b(x+y) = (a+b)(x+y)
// a + b 即为中心点所在列 j 的除了中心点的 1 的个数。
// x + y 即为中心点所在行 i 的除了中心点的 1 的个数。

// 因此我们可以统计每一行 1 的个数 rowTotalOnes[i] 和每一列 1 的个数 colTotalOnes[j]，那么计算公式就变成了 (rowTotalOnes[i] - 1) * (colTotalOnes[j] - 1)。

// 具体的：
// 我们先遍历一遍矩阵统计每一行的 1 的个数和每一列 1 的个数，分别存储到 rowTotalOnes 和 colTotalOnes 中。
// 然后再遍历一遍矩阵，根据计算公式统计所有的直角三角形个数。

/**
 * @param {number[][]} grid
 * @return {number}
 */
var numberOfRightTriangles = function (grid) {
    const n = grid.length; // 矩阵行数
    const m = grid[0].length; // 矩阵列数
    const rowTotalOnes = new Array(n).fill(0); // 每一行的 1 的个数
    const colTotalOnes = new Array(m).fill(0); // 每一列的 1 的个数

    // 遍历一次矩阵，统计每一行的 1 的个数和每一列 1 的个数
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (grid[i][j] === 1) {
                rowTotalOnes[i]++; // 统计每一行的 1 的个数
                colTotalOnes[j]++; // 统计每一列的 1 的个数
            }
        }
    }

    let res = 0; // 可构成的直角三角形的个数
    //  遍历一次矩阵
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            // 如果当前点为 1 则将其视为直角，计算其他两个点的合法方法数
            if (grid[i][j] === 1) {
                res += (rowTotalOnes[i] - 1) * (colTotalOnes[j] - 1); // 套用计算公式
            }
        }
    }

    return res; // 返回可构成的直角三角形的个数
};
// 时间复杂度：O(nm)，n 为 grid 的行数，m 为 grid 的列数。需要对矩阵进行 2 次遍历，因此总的时间复杂度为 O(nm)。
// 空间复杂度：O(n+m)，n 为 grid 的行数，m 为 grid 的列数。需要额外开辟两个长度为 n 和 m 的数组存储每一行和每一列 1 的个数，因此总的空间复杂度为 O(n+m)。
