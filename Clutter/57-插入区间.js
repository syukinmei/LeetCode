// 给你一个无重叠的 ，按照区间起始端点排序的区间列表。

// 在列表中插入一个新的区间，你需要确保列表中的区间仍然有序且不重叠（如果有必要的话，可以合并区间）。

// 输入：intervals = [[1,3],[6,9]], newInterval = [2,5]
// 输出：[[1,5],[6,9]]

// 输入：intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]
// 输出：[[1,2],[3,10],[12,16]]
// 解释：这是因为新的区间 [4,8] 与 [3,5],[6,7],[8,10] 重叠。

// 输入：intervals = [], newInterval = [5,7]
// 输出：[[5,7]]

// 输入：intervals = [[1,5]], newInterval = [2,3]
// 输出：[[1,5]]

// 输入：intervals = [[1,5]], newInterval = [2,7]
// 输出：[[1,7]]

// 方法一：模拟
// 对于区间 S1 = [l1, r1] 和 S2 = [l2, r2]，如果他们之间没有重叠（无交集），说明要么 S1 在 S2 的左侧，此时有 r1 < l2；要么 S1 在 S2 的右侧，此时有 l1 > r2。
// 如果 r1 < l2 和 l1 > r2 二者均不满足，说明 S1 和 S2 必定有交集。
// 它们的交集为 [max(l1, l2), min(r1, r2)]
// 它们的并集为 [min(l1, l2), max(r1, r2)]

// 遍历 intervals 区间数组，依次找出 新区间左侧（之前）且无交集的区间、与新区间有重叠的区间集的并集、新区间右侧（之后）且无交集的区间，将将其一次加入结果数组中。

/**
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */
function insert(intervals, newInterval) {
    const res = [];
    let i = 0; // 指针，指向当前遍历到的区间
    const n = intervals.length;

    // step1：寻找插入区间左侧且无交集区间
    while (i < n && intervals[i][1] < newInterval[0]) {
        res.push(intervals[i]);
        i++;
    }

    // step2：与插入区间有交集，计算他们的合并区间
    let left = newInterval[0],
        right = newInterval[1];
    while (i < n && intervals[i][0] <= newInterval[1]) {
        left = Math.min(left, intervals[i][0]); // 左端取较小者
        right = Math.max(right, intervals[i][1]); // 右端取较大者
        i++;
    }
    res.push([left, right]); // 循环结束，将合并的区间推入res中

    // step3：寻找插入区间的右侧且无交集区间（即剩余区间）
    while (i < n) {
        res.push(intervals[i]);
        i++;
    }

    return res;
}
// 时间复杂度：O(n)，n 为区间数组 intervals 的长度。需要遍历一次区间数组。
// 空间复杂度：O(1)，只需要常数的空间存放若干变量。
