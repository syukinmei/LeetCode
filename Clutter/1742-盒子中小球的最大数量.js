// 你在一家生产小球的玩具厂工作，有 n 个小球，编号从 lowLimit 开始，到 highLimit 结束（包括 lowLimit 和 highLimit ，即 n == highLimit - lowLimit + 1）。另有无限数量的盒子，编号从 1 到 infinity 。

// 你的工作是将每个小球放入盒子中，其中盒子的编号应当等于小球编号上每位数字的和。例如，编号 321 的小球应当放入编号 3 + 2 + 1 = 6 的盒子，而编号 10 的小球应当放入编号 1 + 0 = 1 的盒子。

// 给你两个整数 lowLimit 和 highLimit ，返回放有最多小球的盒子中的小球数量。如果有多个盒子都满足放有最多小球，只需返回其中任一盒子的小球数量。

// 输入：lowLimit = 1, highLimit = 10
// 输出：2
// 解释：
// 盒子编号：1 2 3 4 5 6 7 8 9 10 11 ...
// 小球数量：2 1 1 1 1 1 1 1 1 0  0  ...
// 编号 1 的盒子放有最多小球，小球数量为 2 。

// 输入：lowLimit = 5, highLimit = 15
// 输出：2
// 解释：
// 盒子编号：1 2 3 4 5 6 7 8 9 10 11 ...
// 小球数量：1 1 1 1 2 2 1 1 1 0  0  ...
// 编号 5 和 6 的盒子放有最多小球，每个盒子中的小球数量都是 2 。

// 输入：lowLimit = 19, highLimit = 28
// 输出：2
// 解释：
// 盒子编号：1 2 3 4 5 6 7 8 9 10 11 12 ...
// 小球数量：0 1 1 1 1 1 1 1 1 2  0  0  ...
// 编号 10 的盒子放有最多小球，小球数量为 2 。


/**
 * @param {number} lowLimit
 * @param {number} highLimit
 * @return {number}
 */
// 方法一：哈希表
// 遍历所有的小球，对于编号 i 的小球，我们需要计算它应该放入的盒子编号 box。
// 使用哈希表 cntMap 记录每个盒子中的小球数量，返回遍历结束后 cntMap 中小球数量最大的盒子对应的小球数量。
var countBalls = function (lowLimit, highLimit) {
    const cntMap = new Map(); // 记录每个盒子中的小球数量。
    let res = 0;
    for (let i = lowLimit; i <= highLimit; i++) {
        let box = 0;
        let x = i;
        // 计算当前编号 i 的小球应该放入的盒子编号box。
        while (x > 0) {
            box += x % 10;
            x = x / 10 | 0;
            // x = Math.floor(x / 10);
        }
        cntMap.set(box, (cntMap.get(box) || 0) + 1);
        res = Math.max(res, cntMap.get(box)); // 维护数量最多的盒子小球数。
    }
    return res;
};
// 时间复杂度：O(n log highLimit)，n 为 highLimit - lowLimit + 1。
// 空间复杂度：O(log highLimit)，假设 highLimit 的十进制位数为 x，那么可能使用的盒子编号数目不超过 10*x，因此空间复杂度为O(log highLimit)。
