// 环形公交路线上有 n 个站，按次序从 0 到 n - 1 进行编号。我们已知每一对相邻公交站之间的距离，distance[i] 表示编号为 i 的车站和编号为 (i + 1) % n 的车站之间的距离。
// 环线上的公交车都可以按顺时针和逆时针的方向行驶。
// 返回乘客从出发点 start 到目的地 destination 之间的最短距离。

// [0] --- 1 ---[1]
//  |            |
//  4            2
//  |            |
// [3] --- 3 ---[2]
// 输入：distance = [1,2,3,4], start = 0, destination = 1
// 输出：1
// 解释：公交站 0 和 1 之间的距离是 1 或 9，最小值是 1。


// 输入：distance = [1,2,3,4], start = 0, destination = 2
// 输出：3
// 解释：公交站 0 和 2 之间的距离是 3 或 7，最小值是 3。


// 输入：distance = [1,2,3,4], start = 0, destination = 3
// 输出：4
// 解释：公交站 0 和 3 之间的距离是 6 或 4，最小值是 4。

/**
 * @param {number[]} distance
 * @param {number} start
 * @param {number} destination
 * @return {number}
 */
var distanceBetweenBusStops = function (distance, start, destination) {
    // 确保 start 小于 destination，简化逻辑。如果 start 大于 destination，则交换它们。
    if (destination < start) {
        [start, destination] = [destination, start];
    }

    // 正向的距离和（顺时针方向），以及反向的距离和（逆时针方向）。
    let normalSum = 0;   // 顺时针方向的距离
    let invertedSum = 0; // 逆时针方向的距离

    // 遍历整个公交站点的距离数组
    for (let i = 0; i < distance.length; i++) {
        // 如果当前索引在 start 和 destination 之间，累加顺时针方向的距离
        if (start <= i && i < destination) {
            normalSum += distance[i];
        } else {
            // 否则，累加逆时针方向的距离
            invertedSum += distance[i];
        }
    }

    // 返回顺时针方向和逆时针方向的最小距离
    return Math.min(normalSum, invertedSum);
};
// 时间复杂度：O(n)，n 为数组 distance 的长度，需要遍历整个数组一次，以计算两个方向的行驶距离。
// 空间复杂度：O(1)，只需要常数的空间存放若干变量即可。
