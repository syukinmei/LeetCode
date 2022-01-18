// 给定一个 24 小时制（小时:分钟 "HH:MM"）的时间列表，找出列表中任意两个时间的最小时间差并以分钟数表示。

// 输入：timePoints = ["23:59","00:00"]
// 输出：1

// 输入：timePoints = ["00:00","23:59","00:00"]
// 输出：0


/**
 * @param {string[]} timePoints
 * @return {number}
 */
var findMinDifference = function (timePoints) {
    let minutse = []; // 存储timePoints转分后的数组
    for (let time of timePoints) {
        let HM = time.split(':');
        minutse.push(parseInt(HM[0] * 60) + parseInt(HM[1]));
    }
    minutse.sort((a, b) => a - b); // 排序
    // 遍历寻找，寻找最小时间差
    let minGap = minutse[0] + 1440 - minutse[minutse.length - 1];
    for (let i = 1; i < minutse.length; i++) {
        let adjacentGap = minutse[i] - minutse[i - 1];
        minGap = Math.min(minGap, adjacentGap);
    }
    return minGap;
};