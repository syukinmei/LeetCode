// 给定平面上 n 对 互不相同 的点 points ，其中 points[i] = [xi, yi] 。回旋镖 是由点 (i, j, k) 表示的元组 ，其中 i 和 j 之间的距离和 i 和 k 之间的欧式距离相等（需要考虑元组的顺序）。

// 返回平面上所有回旋镖的数量。

// 示例 1：

// 输入：points = [[0,0],[1,0],[2,0]]
// 输出：2
// 解释：两个回旋镖为 [[1,0],[0,0],[2,0]] 和 [[1,0],[2,0],[0,0]]
// 示例 2：

// 输入：points = [[1,1],[2,2],[3,3]]
// 输出：2
// 示例 3：

// 输入：points = [[1,1]]
// 输出：0

// 方法一：枚举 + 哈希表
// 我们可以枚举 points 中的每个点作为回旋镖的点 i ，然后用哈希表 distanceMap 记录其它点到 i 的距离出现的次数
// 哈希表 distanceMap 的 key 表示其它点到 i 点距离， value 为这个距离出现的次数。
// 如果有 x 个点到 i 点距离相等，那么我们可以任意选择其中 2 个点作为回旋镖的 j 和 k 。
// 由于题目要求考虑元组的顺序。因此方案数为 x 个点中选 2 个点的排列数，即：
// P(x ,2) = x * (x - 1)。

// 据此，可以遍历 points ，计算并统计所有点到 points[i] 的距离，将每个距离的出现次数记录到哈希表中，然后遍历哈希表，并用上述公式计算并累加回旋镖的个数。
// 代码实现方面，我们可以直接保存距离的平方，避免复杂的开方运算。

/**
 * @param {number[][]} points
 * @return {number}
 */
var numberOfBoomerangs = function (points) {
    const n = points.length;
    let count = 0; // 回旋镖数量

    // 遍历所有点
    for (let i = 0; i < n; i++) {
        // 使用 Map 存储距离及其对应的点的数量。key 表示其它点到 i 点距离， value 为这个距离出现的次数。
        const distanceMap = new Map();

        // 遍历其他所有点，计算距离并更新 distanceMap。
        for (let j = 0; j < n; j++) {
            if (i !== j) {
                const dist = getDistance(points[i], points[j]);
                distanceMap.set(dist, (distanceMap.get(dist) || 0) + 1);
            }
        }
        // 遍历 distanceMap，计算回旋镖的数量。
        for (const [k, v] of distanceMap.entries()) {
            count += v * (v - 1);
        }
    }
    return count;
};

/**
 * 计算两点在二维平面上的欧式距离的平方
 * @param {number[]} point1
 * @param {number[]} point2
 * @returns {number}
 */
function getDistance(point1, point2) {
    const dx = point1[0] - point2[0];
    const dy = point1[1] - point2[1];
    return dx * dx + dy * dy;
}
// 时间复杂度：O(n^2)，n 为数组 points 的长度。需要使用两层循环，分别枚举所有点，及这个点和其他点的欧式距离。
// 空间复杂度：O(n)，需要使用额外的 Map 存储距离及对应的点的数量。
