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
/**
 * @param {number[][]} points
 * @return {number}
 */
var numberOfBoomerangs = function (points) {
    const n = points.length;
    let count = 0;
    for (let i = 0; i < n; i++) {
        const distanceMap = new Map();

        for (let j = 0; j < n; j++) {
            if (i !== j) {
                const dist = getDistance(points[i], points[j]);
                distanceMap.set(dist, (distanceMap.get(dist) || 0) + 1);
            }
        }

        for (const [k, v] of distanceMap.entries()) {
            count += v * (v - 1);
        }
    }
    return count;
};

/**
 * 计算两点之间的距离
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
