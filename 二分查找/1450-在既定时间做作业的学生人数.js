// 给你两个整数数组 startTime（开始时间）和 endTime（结束时间），并指定一个整数 queryTime 作为查询时间。
// 已知，第 i 名学生在 startTime[i] 时开始写作业并于 endTime[i] 时完成作业。
// 请返回在查询时间 queryTime 时正在做作业的学生人数。形式上，返回能够使 queryTime 处于区间 [startTime[i], endTime[i]]（含）的学生人数。


// 输入：startTime = [1,2,3], endTime = [3,2,7], queryTime = 4
// 输出：1
// 解释：一共有 3 名学生。
// 第一名学生在时间 1 开始写作业，并于时间 3 完成作业，在时间 4 没有处于做作业的状态。
// 第二名学生在时间 2 开始写作业，并于时间 2 完成作业，在时间 4 没有处于做作业的状态。
// 第三名学生在时间 3 开始写作业，预计于时间 7 完成作业，这是是唯一一名在时间 4 时正在做作业的学生。

// 输入：startTime = [4], endTime = [4], queryTime = 4
// 输出：1
// 解释：在查询时间只有一名学生在做作业。

// 输入：startTime = [4], endTime = [4], queryTime = 5
// 输出：0

// 输入：startTime = [1,1,1,1], endTime = [1,3,2,4], queryTime = 7
// 输出：0

// 输入：startTime = [9,8,7,6,5,4,3,2,1], endTime = [10,10,10,10,10,10,10,10,10], queryTime = 5
// 输出：5


/**
 * @param {number[]} startTime
 * @param {number[]} endTime
 * @param {number} queryTime
 * @return {number}
 */
// 方法一：枚举
// 遍历所有学生的起始时间喝结束时间，统计符合 startTime[i] <= queryTime <= endTime[i] 条件的学生总数即可。
var busyStudent = function (startTime, endTime, queryTime) {
    let count = 0;
    for (let i = 0; i < startTime.length; i++) {
        if (startTime[i] <= queryTime && endTime[i] >= queryTime) count++
    }
    return count;
};
// 时间复杂度：O(n)，n 为学生数组(startTime或endTime)的长度。只需要遍历一次数组即可。
// 空间复杂度：O(1)，只需要常数的空间存放若干变量。


// 方法二：二分查找
// 对于每个学生的作业时间 [startTime[i], endTime[i]] ，一定满足 startTime[i] <= endTime[i] 。如果第 i 个学生在 queryTime 时正在作业，则一定满足 startTime[i] <= queryTime <= endTime[i] 。
// 设 startTime <= queryTime 的学生集合为 lessStart。设 endTime <= queryTime 的学生集合为 lessEnd ，根据以上推论（startTime[i] <= endTime[i]）可知 lessEnd ∈ lessStart。我们从 lessStart 中去除 lessEnd 的子集部分即为符合条件的学生集合。
// 我们通过二分查找找到起始时间小于等于 queryTime 的学生人数，然后减去结束时间小于 queryTime 的学生人数，最终结果即为符合条件的学生人数。
var busyStudent = function (startTime, endTime, queryTime) {
    startTime.sort((a, b) => a - b);
    endTime.sort((a, b) => a - b);
    const lessStart = binarySearch(startTime, queryTime, true);
    const lessEnd = binarySearch(endTime, queryTime, false);
    return lessStart - lessEnd;
}
/**
 * 
 * @param {number[]} timeArr startTime / endTime
 * @param {number} target queryTime
 * @param {boolean} needEqual 表示是否需要相等，true 寻找小于等于target的下标 ，false 寻找小于target的下标
 * @return {number} 返回 timeArr 中 小于或者小于等于 target 的元素个数。
 */
var binarySearch = function (timeArr, target, needEqual) {
    let left = 0, right = timeArr.length - 1;
    while (left <= right) {
        const mid = left + ((right - left) >> 1);
        if (timeArr[mid] < target + needEqual) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return right + 1;
}
// 时间复杂度：O(nlogn)，n 为学生数组(startTime或endTime)的长度。排序需要的时间为O(nlogn)，二分查找的时间复杂度为O(logn)。
// 空间复杂度：O(logn)，即为排序需要的栈空间。
