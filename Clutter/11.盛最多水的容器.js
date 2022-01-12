// 给你 n 个非负整数 a1，a2，...，an，每个数代表坐标中的一个点 (i, ai) 。在坐标内画 n 条垂直线，垂直线 i 的两个端点分别为 (i, ai) 和 (i, 0) 。找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。
// 说明：你不能倾斜容器。

// 图

// 输入：[1,8,6,2,5,4,8,3,7]
// 输出：49 


// 输入：height = [1,1]
// 输出：1

// 输入：height = [4,3,2,1,4]
// 输出：16

// 输入：height = [1,2,1]
// 输出：2

/**
 * @param {number[]} height
 * @return {number}
 */
// 暴力解法 两层循环（超时）
var maxArea = function (height) {
    let res = 0;
    for (let i = 0; i < height.length - 1; i++) {
        const hi = height[i];
        for (let j = i + 1; j < height.length; j++) {
            const area = Math.min(hi, height[j]) * (j - i);
            res = Math.max(res, area);
        }
    }
    return res;
};

// 优化 暴力解法
var maxArea = function (height) {
    let l, res = 0;
    for (let i = 0; i < height.length - 1; i++) {
        const hi = height[i];
        if (hi <= height[l]) continue;
        for (let j = i + 1; j < height.length; j++) {
            const area = Math.min(hi, height[j]) * (j - i);
            if (area > res) l = i, res = area;
        }
    }
    return res;
};