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
    for (let time of timePoints) { // 每一项转分后存入 minutse 中
        let [HH, MM] = time.split(':');
        minutse.push(parseInt(HH * 60) + parseInt(MM));
    }
    minutse.sort((a, b) => a - b); // 排序
    let ans = minutse[0] + 24 * 60 - minutse[minutse.length - 1]; // 首尾时间的时间差
    for (let i = 1; i < minutse.length; i++) {
        ans = Math.min(ans, minutse[i] - minutse[i - 1]);
    }
    return ans;
};
// 时间复杂度：O(nlogn)，n 为数组 timePoints 的长度。排序需要O(nlogn)的时间。
// 空间复杂度：O(n)，n 为数组 timePoints 的长度，我们需要存储timePoints转分后的数组。