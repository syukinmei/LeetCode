// 给定 n 个非负整数，用来表示柱状图中各个柱子的高度。每个柱子彼此相邻，且宽度为 1 。
// 求在该柱状图中，能够勾勒出来的矩形的最大面积。

//        5  _
//        _ |6|
//       |x||x|
//       |x||x|    _
//  _    |x||x| _ |3|
// |2| _ |x||x||2|| |
// |_||1||x||x||_||_|__

// 输入：heights = [2,1,5,6,2,3]
// 输出：10
// 解释：最大的矩形为图中红色(x)区域，面积为 10

// 输入： heights = [2,4]
// 输出： 4
/**
 * @param {number[]} heights
 * @return {number}
 */
//  方法一：暴力解法
// 矩形面积 = 底 * 高，固定底求最大高度不好求，可以固定高求最长底边。从i向两边遍历，找到左边和右边第1个严格小于height[i]的时候停下，中间长度即是当前高度下最长底边。
var largestRectangleArea = function (heights) {
    let Square = 0; // 存放面积
    for (let i = 0; i < heights.length; i++) {
        // 寻找左扩展边界 左边第一个 小于 hieghts[i]的下标 的上一个
        let expandLeft = i;
        while (expandLeft > 0 && heights[expandLeft - 1] >= heights[i]) expandLeft--;
        // 寻找右扩展边界 右边第一个 小于 heights[i]的下标 的上一个
        let expandRight = i;
        while (expandRight < heights.length - 1 && heights[expandRight + 1] >= heights[i]) expandRight++;
        Square = Math.max(Square, heights[i] * (expandRight - expandLeft + 1));
    }
    return Square;
};
largestRectangleArea([2, 1, 5, 6, 2, 3])
// 时间复杂度：O(n^2)，n是数组 height 的长度，需要遍历一次数组，在每一个位置向两边扩散，每一次扩散最坏情况需要看完整个数组。
// 空间复杂度：O(1)，使用常数个临时变量。
