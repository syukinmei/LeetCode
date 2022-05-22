// 给你一个区间数组 intervals ，其中 intervals[i] = [starti, endi] ，且每个 starti 都 不同 。
// 区间 i 的 右侧区间 可以记作区间 j ，并满足 startj >= endi ，且 startj 最小化 。
// 返回一个由每个区间 i 的 右侧区间 在 intervals 中对应下标组成的数组。如果某个区间 i 不存在对应的 右侧区间 ，则下标 i 处的值设为 -1

// 输入：intervals = [[1,2]]
// 输出：[-1]
// 解释：集合中只有一个区间，所以输出-1。

// 输入：intervals = [[3,4],[2,3],[1,2]]
// 输出：[-1,0,1]
// 解释：对于 [3,4] ，没有满足条件的“右侧”区间。
// 对于 [2,3] ，区间[3,4]具有最小的“右”起点;
// 对于 [1,2] ，区间[2,3]具有最小的“右”起点。

// 输入：intervals = [[1,4],[2,3],[3,4]]
// 输出：[-1,2,-1]
// 解释：对于区间 [1,4] 和 [3,4] ，没有满足条件的“右侧”区间。
// 对于 [2,3] ，区间 [3,4] 有最小的“右”起点。

// 提示：
// 1 <= intervals.length <= 2 * 104
// intervals[i].length == 2
// -106 <= starti <= endi <= 106
// 每个间隔的起点都 不相同

// 翻译一下题目：
// 给定一个区间数组 intervals。
// 当区间B的起点 start 大于等于 区间A的重点 end，我们就说 区间B在区间A的右侧。
// 让我们求每个区间的右侧第一个区间。（右侧区间中，起点最小的那个）。


/**
 * @param {number[][]} intervals
 * @return {number[]}
 */
// 方法一：二分查找
// 创建一个用于存储每个区间起始位置 intervals[i][0] 及其对应的下标 i 的数组 startIntervals。
// 对 startIntervals 这个数组根据 区间起始位置 start 进行升序排序。
// 此时有了有序数组，就可以将题目转化为：在有序数组中找到大于等于 intervals[i][1] 的第一个元素。很显然就可以使用二分查找了。
// 对于每一个 intervals[i][1] 寻找第一个大于等于它的 startIntervals[target][0]。
var findRightInterval = function (intervals) {
    const Len = intervals.length;
    // 创建一个二维数组 startIntervals 存储区间 start 和其在 intervals 中的下标位置
    const startIntervals = new Array(Len).fill(0).map(() => new Array(2).fill(0));
    for (let i = 0; i < Len; i++) {
        startIntervals[i][0] = intervals[i][0];
        startIntervals[i][1] = i;
    }
    // 根据区间 start 对 startIntervals 升序排序
    startIntervals.sort((a, b) => a[0] - b[0]);

    // 枚举每个区间的 end 即 intervals[i][1]，利用二分查找 第一个大于等于 end 的 start 返回其对应的下标
    const res = new Array(Len).fill(0);
    for (let i = 0; i < Len; i++) {
        const End = intervals[i][1];
        // 如果不存在大于End的tart 说明 intervals[i] 区间没有右区间，赋值-1即可
        if (End > startIntervals[Len - 1][0]) {
            res[i] = -1;
            continue;
        }
        // 利用二分查找寻找第一个右区间
        let left = 0, right = Len - 1;
        while (left < right) {
            const mid = left + ((right - left) >> 1);
            if (startIntervals[mid][0] >= End) {
                right = mid;
            } else {
                left = mid + 1;
            }
        }
        // 此时 left = right，该点就是右边第一个区间。
        res[i] = startIntervals[left][1];
    }
    return res;
};
// 时间复杂度：O(n logn)，n 为数组 intervals 的长度，排序的时间为 O(n logn)，每次进行二分查找花费的时间为O(logn)，一个需要进行 n 次二分，因此总的时间复杂度为O(nlogn)。
// 空间复杂度：O(n)，n 为数组 intervals 的长度，startIntervals 一共存储了 n 个元素，因此空间复杂度为O(n)。
