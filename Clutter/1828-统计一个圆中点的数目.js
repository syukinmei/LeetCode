// 给你一个数组 points ，其中 points[i] = [xi, yi] ，表示第 i 个点在二维平面上的坐标。多个点可能会有 相同 的坐标。
// 同时给你一个数组 queries ，其中 queries[j] = [xj, yj, rj] ，表示一个圆心在 (xj, yj) 且半径为 rj 的圆。
// 对于每一个查询 queries[j] ，计算在第 j 个圆 内 点的数目。如果一个点在圆的 边界上 ，我们同样认为它在圆 内 。
// 请你返回一个数组 answer ，其中 answer[j]是第 j 个查询的答案。


// 输入：points = [[1,3],[3,3],[5,3],[2,2]], queries = [[2,3,1],[4,3,1],[1,1,2]]
// 输出：[3,2,2]


// 输入：points = [[1,1],[2,2],[3,3],[4,4],[5,5]], queries = [[1,2,2],[2,2,2],[4,3,2],[4,3,3]]
// 输出：[2,3,2,4]


/**
 * @param {number[][]} points
 * @param {number[][]} queries
 * @return {number[]}
 */
// 方法一：枚举
// 实用双重循环，对于每一个查询，枚举所有的点，依次判断它们是否在查询的圆中即可。
// 设当前查询的圆 圆心为(cx, xy)，半径为cr，枚举的点的坐标为(px, py)，那么点在圆中(包括在圆上的情况)只有当且仅当点到圆心的距离小于等于半径。我们可以用以下公式判断：
// (cx-px)^2 + (cy-py)^2 <= cr^2
var countPoints = function (points, queries) {
    const ans = new Array(queries.length).fill(0);
    for (let j = 0; j < queries.length; j++) {
        const [cx, cy, cr] = queries[j];
        for (let i = 0; i < points.length; i++) {
            const [px, py] = points[i];
            if ((cx - px) ** 2 + (cy - py) ** 2 <= cr ** 2) ans[j]++;
        }
    }
    return ans;
};
// 时间复杂度：O(mn)，n 和 m 分别为数组 points 和 queries 的长度。
// 空间复杂度：O(1)，只需要常数的空间存放若干变量。
