// 给你一个 m * n 的矩阵，矩阵中的数字 各不相同 。请你按 任意 顺序返回矩阵中的所有幸运数。
// 幸运数是指矩阵中满足同时下列两个条件的元素：
//  - 在同一行的所有元素中最小
//  - 在同一列的所有元素中最大

// 输入：matrix = [[3,7,8],[9,11,13],[15,16,17]]
// 输出：[15]
// 解释：15 是唯一的幸运数，因为它是其所在行中的最小值，也是所在列中的最大值。

// 输入：matrix = [[1,10,4,2],[9,3,8,7],[15,16,17,12]]
// 输出：[12]
// 解释：12 是唯一的幸运数，因为它是其所在行中的最小值，也是所在列中的最大值。

// 输入：matrix = [[7,8],[1,2]]
// 输出：[7]



/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
// 方法一：模拟
// 遍历矩阵 matrix，判断matrix[i][j] 是否是它所在行的最小值和所在列的最大值
var luckyNumbers = function (matrix) {
    const res = [];
    const m = matrix.length; // 行数
    const n = matrix[0].length; // 列数
    for (let row = 0; row < m; row++) { // 遍历行
        for (let col = 0; col < n; col++) { // 遍历列
            let isRowMin = true, isColMax = true;
            // 判断当前元素 是否是所在行最小元素
            for (let k = 0; k < n; k++) {
                // 如果不是 isRowMin 更新为 false 不进行是否是所在列最大元素的判断
                if (matrix[row][k] < matrix[row][col]) {
                    isRowMin = false;
                    break;
                };
            }
            // 如果当前元素是所在行最小元素，则判断是否是所在列最大元素
            if (isRowMin) {
                for (let k = 0; k < m; k++) {
                    if (matrix[k][col] > matrix[row][col]) {
                        isColMax = false;
                        break;
                    }
                }
            }
            // 如果是当前元素是所在行的最小元素 所在列的最大元素，则加入结果数组
            if (isRowMin && isColMax) res.push(matrix[row][col])
        }
    }
    return res;
};
// 时间复杂度：O(mn * (m+n))，m 和 n 分别为矩阵 matrix 的行数和列数。遍历矩阵 matrix 需要O(mn)，查找行最小元素需要O(n)，查找列最大元素需要O(m)。
// 空间复杂度：O(1)，只需要常数的空间存放若干变量。


// 方法二：预处理
// 预处理出每行的最小值 minRow 和 每列最大值 maxCol，其中minRow[i] 表示第 i 行的最小值，maxCol[j] 表示第 j 列最大值。
// 遍历矩阵 matrix ，如果matrix[i][j] 同时满足 matrix[i][j] === minRow[i] === maxCol[j]，那么 matrix[i][j]是矩阵中的幸运数
var luckyNumbers = function (matrix) {
    const m = matrix.length; // 行数
    const n = matrix[0].length; // 列数
    // 预处理 minRow maxCol
    const minRow = new Array(m).fill(Number.MAX_SAFE_INTEGER);
    const maxCol = new Array(n).fill(0);
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            minRow[i] = Math.min(matrix[i][j], minRow[i]);
            maxCol[j] = Math.max(matrix[i][j], maxCol[j]);
        }
    }
    // 遍历矩阵 matrix 查找幸运数
    const res = [];
    for (let row = 0; row < m; row++) {
        for (let col = 0; col < n; col++) {
            const current = matrix[row][col]
            if (current === minRow[row] && current === maxCol[col]) res.push(current);
        }
    }
    return res;
};
// 时间复杂度：O(mn)，m 和 n 分别为矩阵 matrix 的行数和列数。预处理 minRow 和 maxCol 需要O(mn)，查找幸运数需要O(mn)。
// 空间复杂度：O(m + n)，保存 minRow 和 maxCol 需要O(m + n)的额外空间。