// 给你两个整数 x 和 y ，表示你在一个笛卡尔坐标系下的 (x, y) 处。同时，在同一个坐标系下给你一个数组 points ，其中 points[i] = [ai, bi] 表示在 (ai, bi) 处有一个点。当一个点与你所在的位置有相同的 x 坐标或者相同的 y 坐标时，我们称这个点是 有效的 。

// 请返回距离你当前位置 曼哈顿距离 最近的 有效 点的下标（下标从 0 开始）。如果有多个最近的有效点，请返回下标 最小 的一个。如果没有有效点，请返回 -1 。

// 两个点 (x1, y1) 和 (x2, y2) 之间的 曼哈顿距离 为 abs(x1 - x2) + abs(y1 - y2) 。


// 输入：x = 3, y = 4, points = [[1,2],[3,1],[2,4],[2,3],[4,4]]
// 输出：2
// 解释：所有点中，[3,1]，[2,4] 和 [4,4] 是有效点。有效点中，[2,4] 和 [4,4] 距离你当前位置的曼哈顿距离最小，都为 1 。[2,4] 的下标最小，所以返回 2 。


// 输入：x = 3, y = 4, points = [[3,4]]
// 输出：0
// 提示：答案可以与你当前所在位置坐标相同。

// 输入：x = 3, y = 4, points = [[2,3]]
// 输出：-1
// 解释：没有 有效点。


// 枚举
// 枚举数组 points 中所有的点（px,py）
//  - 如果 x == px，那么这两个点有相同的 x 坐标，我们可以用距离 |y-py| 更新答案。
//  - 如果 y == py，那么这两个点有相同的 y 坐标，我们可以用距离 |x-px| 更新答案。
// 题目要求返回下标最小的一个最近有效点，我们只需要按照数据枚举点，在距离严格变小时才选择更新答案即可。
/**
 * @param {number} x
 * @param {number} y
 * @param {number[][]} points
 * @return {number}
 */
var nearestValidPoint = function (x, y, points) {
    let best = Number.MAX_SAFE_INTEGER;
    let res = -1;
    for (let i = 0; i < points.length; i++) {
        const [px, py] = points[i];
        if (px === x) {
            const dist = Math.abs(y - py);
            if (dist < best) {
                best = dist;
                res = i;
            }
        } else if (py === y) {
            const dist = Math.abs(x - px);
            if (dist < best) {
                best = dist;
                res = i;
            }
        }
    }
    return res;
};
// 时间复杂度：O(n)，n 为 数组 points 的长度。
// 空间复杂度：O(1)，只需要常数的空间存放若干变量。