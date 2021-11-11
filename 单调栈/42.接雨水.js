// 给定 n 个非负整数表示每个宽度为 1 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。

// 输入：height = [0,1,0,2,1,0,1,3,2,1,2,1]
// 输出：6
// 解释：上面是由数组 [0,1,0,2,1,0,1,3,2,1,2,1] 表示的高度图，在这种情况下，可以接 6 个单位的雨水（蓝色部分表示雨水）。 

// |
// |               | 
// |       | π π π | | π |
// | _ | π | | π | | | | | |
//   0 1 0 2 1 0 1 3 2 1 2 1

// 输入：height = [0,1,0,2,1,0,1,3,2,1,2,1]
// 输出：6
// 解释：上面是由数组 [0,1,0,2,1,0,1,3,2,1,2,1] 表示的高度图，在这种情况下，可以接 6 个单位的雨水（π部分表示雨水）。 

// 输入：height = [4,2,0,3,2,5]
// 输出：9

/**
 * @param {number[]} height
 * @return {number}
 */
// 方法一：单调栈
// 维护一个单调递减栈，当遇到大于栈顶元素时，此时左边有积水
// [0,1,0,2,1,0,1,3,2,1,2,1]
// [1,0]2，
// 积水高度为：当前元素- 
// 积水宽度为：当前索引-
// 宽度是 i-left-1，高度是 Math.mid(height[left],height[i])-height[top]
var trap = function (height) {
    const stack = []; // 单调递减栈，当遇到大于栈顶的元素时候说明形成凹槽可以积累雨水，储存索引用于计算trap宽高
    let sumTrap = 0; // 记录结果值 雨水面积
    for (let i = 0; i < height.length; i++) {
        // 栈中有值 且 当前元素 大于 栈顶元素 则弹栈
        while (stack.length && height[i] > height[stack[stack.length - 1]]) {
            let mid = height[stack.pop()];
            if (stack.length === 0) break; // 弹栈后 如果栈为空 则没有trap无法积累雨水 结束本次循环;
            // 弹栈后 如果栈中有值 则栈顶元素、弹栈元素、当前元素形成trap 计算积雨量
            // 有 trap 底宽为：i-栈顶-1  高为：Math.mid(栈顶元素高,当前元素高)-弹栈元素高
            sumTrap += (i - stack[stack.length - 1] - 1) * (Math.min(height[i], height[stack[stack.length - 1]]) - mid);
        }
        // 压栈
        stack.push(i);
    }
    return sumTrap;
};
// 时间复杂度：O(n)，其中n是数组 height 的长度 。从 0 到 n-1 的每一个下标最多只会入栈和出栈各一次
// 空间复杂度：O(n)，其中n是数组 height 的长度。空间复杂度主要取决于栈空间，栈的大小不会超过n。