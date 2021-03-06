// 给你一个大小为 m x n 的矩阵 mat ，请以对角线遍历的顺序，用一个数组返回这个矩阵中的所有元素。

// 输入：mat = [[1,2,3],[4,5,6],[7,8,9]]
// 输出：[1,2,4,7,5,3,6,8,9]

// 输入：mat = [[1,2],[3,4]]
// 输出：[1,2,3,4]


//  [1,  2,  3,  4,  5]
//  [6,  7,  8,  9,  10]
//  [11, 12, 13, 14, 15]
//  [16, 17, 18, 19, 20]

// 横坐标 x 最大值为 n = mat[0].length = 5；
// 纵坐标 y 最大值为 m = mat.length = 4;

// 对角线第 i 层遍历结果为：
// i = 0 (0, 0)
// i = 1 (1, 0) (0, 1)
// i = 2 (0, 2) (1, 1) (2, 0)
// i = 3 (3, 0) (2, 1) (1, 2) (0, 3)
// i = 4 (1, 3) (2, 2) (3, 1) (4, 0)
// i = 5 (4, 1) (3, 2) (2, 3) 
// i = 6 (3, 3) (4, 2)
// i = 7 (4, 3)

// 观察规律可知：遍历方向由层数决定。而层数即为横纵坐标之和。
//  - 我们需要遍历对角线的次数为 m + n -1 次，
//  - 第 i 次，x y 坐标之和 = i 。 x + y = i。
//  - x 的范围为[0, n)，y 的范围为[0, m)
//  - i 为 偶数时，遍历方向为 ↗️ 从左下向右上，y 坐标为 Math.min(i, m - 1)，x = i - y，遍历时坐标变化为 x++ y--
//  - i 为 奇数时，遍历方向为 ↙️ 从右上向左下，x 坐标为 Math.min(i, n - 1)，y = i - x，遍历时坐标变化为 x-- y++
//  - 坐标(x, y) 对应的元素为 mat[y][x]

/**
 * @param {number[][]} mat
 * @return {number[]}
 */
// 方法一：模拟
var findDiagonalOrder = function (mat) {
    const m = mat.length, n = mat[0].length;
    const ans = [];
    for (let i = 0; i < m + n - 1; i++) {
        let x, y = 0;
        if (i % 2 === 0) {
            // 偶数的起始位置
            y = Math.min(i, m - 1);
            x = i - y;
            // 从左下向右上遍历 ↗️ 。
            while (y >= 0 && x < n) {
                ans.push(mat[y][x]);
                x++;
                y--;
            }
        } else {
            // 奇数的起始位置
            x = Math.min(i, n - 1);
            y = i - x;
            // 从右上向左下便利 ↙️ 。
            while (x >= 0 && y < m) {
                ans.push(mat[y][x]);
                x--;
                y++;
            }
        }
    }
    return ans;
};
// 时间复杂度：O(m*n)，m 为矩阵行数，n 为矩阵列数。需要遍历一次矩阵中所有元素。
// 空间复杂度：O(1)，只需要常数的空间存放若干变量。
