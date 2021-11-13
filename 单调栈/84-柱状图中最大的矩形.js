// 给定 n 个非负整数，用来表示柱状图中各个柱子的高度。每个柱子彼此相邻，且宽度为 1 。
// 求在该柱状图中，能够勾勒出来的矩形的最大面积。

//        5  _
//        _ |6|
//       |x||x|
//       |x||x|    _
//  _    |x||x| _ |3|
// |2| _ |x||x||2|| |
// |_||1||x||x||_||_|__
//  0  1  2  3  4  5  index

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
// 依次遍历柱形的高度，对于每一个高度分别向两边扩散，求出以当前高度为矩形的最大宽度多少。
var largestRectangleArea = function (heights) {
    let Square = 0; // 存储面积
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
// 时间复杂度：O(n^2)，n是数组 height 的长度，需要遍历一次数组，在每一个位置向两边扩散，每一次扩散最坏情况需要看完整个数组。
// 空间复杂度：O(1)，使用常数个临时变量。


// 方法二：单调栈
// 维护一个单调递增栈，当遇到 小于等于 栈顶元素时，进行弹栈，此时有 当高度为弹栈元素时 当前元素即使右扩展边界 栈顶元素为左扩展边界
// 即 弹栈元素为高计算举行面积 高为：弹栈元素，底为：当前元素下标 - 弹栈元素下标
var largestRectangleArea = function (heights) {
    const stack = []; // 单调递增栈
    let Square = 0; // 存储面积
    let newHeights = [0, ...heights, 0];
    for (let i = 0; i < heights.length; i++) {
        // 栈中有值 且 当前元素 小于等于 栈顶元素时
        while (stack.length && heights[i] <= heights[stack[stack.length - 1]]) {
            let curIndex = stack.pop();
            let curSquare = heights[curIndex] * (i - curIndex);
            Square = Math.max(Square, curSquare);
        }
        // 压栈
        stack.push(i);
    }
    // 处理全部单调递增情况 以及 栈中有值的情况
    if (heights[stack[0]] === heights[stack[stack.length - 1]]) {
        Square = Math.max(Square, heights[stack[0]] * stack.length)
    }
    console.log('stack', stack, 'Square', Square);
    while (stack.length) {
        let curIndex = stack.pop();
        let curWidth = stack.length ? curIndex - stack[stack.length - 1] : 1
        Square = Math.max(Square, curWidth * heights[curIndex]);
    }
    return Square;
}

// 对heights数组特殊处理
var largestRectangleArea = function (heights) {
    const stack = []; // 单调递增栈
    let Square = 0; // 存储面积
    let newHeights = [0, ...heights, 0];
    for (let i = 0; i < newHeights.length; i++) {
        // 栈中有值 且 当前元素 小于等于 栈顶元素时
        while (stack.length && newHeights[i] < newHeights[stack[stack.length - 1]]) {
            let curIndex = stack.pop();
            let curSquare = newHeights[curIndex] * (i - stack[stack.length - 1] - 1);
            Square = Math.max(Square, curSquare);
        }
        // 压栈
        stack.push(i);
    }
    return Square;
}


var largestRectangleArea = function (heights) {
    heights = [...heights, 0];
    const stack = [];
    let Square = 0;
    for (let i = 0; i < heights.length; i++) {
        while (stack.length && heights[i] <= heights[stack[stack.length - 1]]) {
            let middle = stack.pop();
            // 如果栈中无值 则left为-1 否则为栈顶下标
            let left = stack.length ? stack[stack.length - 1] : -1
            let curSquare = heights[middle] * (i - left - 1);
            Square = Math.max(Square, curSquare);
        }
        stack.push(i);
    }
    return Square;
}
console.log(largestRectangleArea([2, 1, 5, 6, 2, 3]))
console.log(largestRectangleArea([2, 4]))
console.log(largestRectangleArea([1, 1]))