// 给你两个整数 red 和 blue，分别表示红色球和蓝色球的数量。你需要使用这些球来组成一个三角形，满足第 1 行有 1 个球，第 2 行有 2 个球，第 3 行有 3 个球，依此类推。
// 每一行的球必须是 相同 颜色，且相邻行的颜色必须 不同。
// 返回可以实现的三角形的 最大 高度。

// 输入： red = 2, blue = 4
// 输出： 3
// 解释：
//       蓝
//    红    红
// 蓝    蓝    蓝
// 上图显示了唯一可能的排列方式。

// 输入： red = 2, blue = 1
// 输出： 2
// 解释：
//    蓝
// 红    红
// 上图显示了唯一可能的排列方式。

// 输入： red = 1, blue = 1
// 输出： 1

// 输入： red = 10, blue = 1
// 输出： 2
// 解释：
//    蓝
// 红    红
// 上图显示了唯一可能的排列方式。

// 方法一：模拟
// 使用两种可能性计算最大高度。即红球在顶部，蓝球在顶部。
// 递增地枚举三角形的高度，在第 i 行时，如果对应的颜色的剩余球数大于等于 i 个，那么就可以组成第 i 行，否则不能，三角形的最大高度为 i-1。
// 三角形的颜色布局有两种可能：即红蓝交替（第一行为红色）或者蓝红交替（第一行为蓝色），我们分别枚举这两种情况，并取二者高度的较大值即可。
/**
 * @param {number} red
 * @param {number} blue
 * @return {number}
 */
var maxHeightOfTriangle = function (red, blue) {
    // 用于计算在给定红色和蓝色小球数量的情况下，三角形的最大高度
    // x 代表当前奇数层的颜色小球数量，y 代表当前偶数层的颜色小球数量
    const maxHeight = (x, y) => {
        for (let i = 1; ; i++) {
            if (i % 2 === 1) {
                x -= i;
                if (x < 0) return i - 1;
            } else {
                y -= i;
                if (y < 0) return i - 1;
            }
        }
    };

    // 比较两种情况，取较大值
    return Math.max(maxHeight(red, blue), maxHeight(blue, red));
};
// 时间复杂度：O(√(n + m))，n 和 m 分别为给定的 red 和 blue 的数量，同一种颜色的球形成一个公差为 2 的等差数量，那么球的数量是三角形高度的平方级别，因此高度是数量的平方根级别，即 O(√(n + m))。
// 空间复杂：O(1)，只需要常数的空间存放若干变量。
