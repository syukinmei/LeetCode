// 给定包含多个点的集合，从其中取三个点组成三角形，返回能组成的最大三角形的面积。

// 示例:
// 输入: points = [[0,0],[0,1],[1,0],[0,2],[2,0]]
// 输出: 2
// 解释: 
// 这五个点如下图所示。组成的橙色三角形是最大的，面积为2。

// 注意：
// 3 <= points.length <= 50.
// 不存在重复的点。
//  -50 <= points[i][j] <= 50.
// 结果误差值在 10^-6 以内都认为是正确答案。

// 我们将坐标系中的三角形顶点都向x轴投影，分别得到点 E, D, F
// 此时得到3个梯形，两个小梯形的面积和 - 大梯形的面积 = 三角形的面积
// 或者使用 三角形面积公式行列式形式：
// 科普视频：https://www.bilibili.com/video/BV1RU4y1d72J?spm_id_from=333.337.search-card.all.click
/**
 * @param {number[][]} points
 * @return {number}
 */
// 方法一：枚举
// 三重for循环，从题目给出的二维坐标中取出 3 个点，根据面积公式求组成的三角形面积。
var largestTriangleArea = function (points) {
    const Len = points.length;
    let res = 0;
    for (let i = 0; i < Len; i++) {
        for (let j = i + 1; j < Len; j++) {
            for (let k = j + 1; k < Len; k++) {
                const area = triangleArea(points[i][0], points[i][1], points[j][0], points[j][1], points[k][0], points[k][1]);
                res = Math.max(res, area);
            }
        }
    }
    return res;
};

// 辅助函数计算3个点形成的三角形的面积
const triangleArea = function (x1, y1, x2, y2, x3, y3) {
    // return 0.5 * Math.abs(x2 * y1 + x3 * y2 + x1 * y3 - x1 * y2 - x2 * y3 - x3 * y1);
    return 0.5 * Math.abs(x1 * y2 + x2 * y3 + x3 * y1 - x1 * y3 - x2 * y1 - x3 * y2);
}

// 时间复杂度：O(n^3)，n 是数组 points 的长度。三重循环需要O(n^3)。
// 空间复杂度：O(1)，只需要常数的空间存放若干变量。