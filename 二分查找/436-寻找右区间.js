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

// 方法二：双指针：
// 和方法一一样，创建两个数组，startIntervals 和 endIntervals 
// startIntervals 存储每个区间的起始位置 intervals[i][0] 以及对应的下标 i。
// endIntervals   存储每个区间的结束位置 intervals[i][1] 以及对应的下标 i。
// 对 startIntervals 和  endIntervals 根据区间大小进行升序排序
// 如 intervals = [[2, 5], [1, 3], [3, 4]] ，此时就有：
// startIntervals = [[1, 1], [2, 0], [3, 2]]    endIntervals = [[3, 1], [4, 2], [5, 0]]
// 遍历 endIntervals[i][0]，从左到右扫描 startIntervals 数组中的起始区间，找到满足作为右区间条件的起始区间，记做 startIntervals[j][0]。
// 此时 res[endIntervals[i][1]] = startIntervals[j][1];

// 为什么使用双指针？
// 已知 startIntervals[j-1][0] < endIntervals[i][0]， startIntervals[j][0] >= endIntervals[i][0]
// 当我们遍历： endIntervals[i+1] 时，我们就不需要从第一个开始从左向右扫描 startIntervals 数组，可以直接从第 j 个元素开始扫描 startIntervals 数组。
// 由于数组都是已经排序好的，因此可以知道 startIntervals[j-1][0] < endIntervals[i][0] <= endIntervals[i+1][0]，所以数组 startIntervals 的前 j-1 个区间的起始点一定都小于 endIntervals[i+1][0]，因此可以直接跳过 j-1 个元素。只需要从 j 开始扫描即可。
var findRightInterval = function (intervals) {
    const Len = intervals.length;
    const startInterval = new Array(Len).fill(0).map(() => new Array(2).fill(0));
    const endInterval = new Array(Len).fill(0).map(() => new Array(2).fill(0));
    for (let i = 0; i < Len; i++) {
        startInterval[i][0] = intervals[i][0];
        startInterval[i][1] = i
        endInterval[i][0] = intervals[i][1];
        endInterval[i][1] = i;
    }
    startInterval.sort((a, b) => a[0] - b[0]);
    endInterval.sort((a, b) => a[0] - b[0]);

    const res = new Array(Len).fill(-1);
    for (let i = 0, j = 0; i < Len; i++) {
        const end = endInterval[i][0];
        while (j < Len && startInterval[j][0] < end) {
            j++;
        }
        // 此时找到了 end 的第一个右区间
        if (j < Len) {
            res[endInterval[i][1]] = startInterval[j][1];
        }
    }
    return res;
};
// 时间复杂度：O(nlogn)，n 为区间数组 intervals 的长度，对两个数组的排序的时间一共需要 O(nlogn)，查找每个区间的右侧区间的时间复杂度为O(n),因此总的时间复杂度为O(nlogn)。
// 空间复杂度：O(n)，n 为区间数组 intervals 的长度，startInterval 和 endInterval 均存储了 n 个元素，因此空间复杂度为O(n)。
