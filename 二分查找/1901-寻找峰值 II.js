// 一个 2D 网格中的 峰值 是指那些 严格大于 其相邻格子(上、下、左、右)的元素。

// 给你一个 从 0 开始编号 的 m x n 矩阵 mat ，其中任意两个相邻格子的值都 不相同 。找出 任意一个 峰值 mat[i][j] 并 返回其位置 [i,j] 。

// 你可以假设整个矩阵周边环绕着一圈值为 -1 的格子。

// 要求必须写出时间复杂度为 O(m log(n)) 或 O(n log(m)) 的算法

// 输入: mat = [[1,4],[3,2]]
// 输出: [0,1]
// 解释: 3 和 4 都是峰值，所以[1,0]和[0,1]都是可接受的答案。

// 输入: mat = [[10,20,15],[21,30,14],[7,16,32]]
// 输出: [1,1]
// 解释: 30 和 32 都是峰值，所以[1,1]和[2,2]都是可接受的答案。

// 方法一：二分查找
/**
 * @param {number[][]} mat
 * @return {number[]}
 */
var findPeakGrid = function (mat) {
    const m = mat.length;
    // high 表示 ⬆上侧，low 表示⬇下侧，这样好描述方位。
    let high = 0;
    let low = m - 1;
    while (high <= low) {
        let mid = low + ((high - low) >> 1);
        let maxIdx = maxElement(mat[mid]);

        // mid 行最大元素 < 上面的元素，说明 顶峰在上侧。low 指针上移
        if (mid - 1 >= 0 && mat[mid][maxIdx] < mat[mid - 1][maxIdx]) {
            low = mid - 1;
            continue;
        }
        // mid 行最大元素 < 下面的元素，说明 顶峰在下侧。high 指针下移
        if (mid + 1 < m && mat[mid][maxIdx] < mat[mid + 1][maxIdx]) {
            high = mid + 1;
            continue;
        }

        // 当前行最大 且 不比相邻上下值小，则该点即为一个峰值
        return [mid, maxIdx];
    }
    return [];
};

// 辅助函数
// 返回数组中最大元素的下标
var maxElement = function (arr) {
    let i = 0;
    for (let j = 1; j < arr.length; j++) {
        if (arr[i] < arr[j]) i = j;
    }
    return i;
};
// 时间复杂度：O(nlogm)，m 和 n 分别为矩阵 mat 的行数和列数。二分找峰值所在行需要 O(logm) 的复杂度，对于每行都需要遍历整行，寻找当前行最大值位置消耗 O(n)的复杂度。因此，总共需要 O(nlogm) 的时间复杂度。
// 空间复杂度：O(1)，只需要常数的空间存放若干变量。
