// 给你个整数数组 arr，其中每个元素都 不相同。
// 请你找到所有具有最小绝对差的元素对，并且按升序的顺序返回。

// 输入：arr = [4,2,1,3]
// 输出：[[1,2],[2,3],[3,4]]

// 输入：arr = [1,3,6,10,15]
// 输出：[[1,3]]

// 输入：arr = [3,8,-10,23,19,-4,-14,27]
// 输出：[[-14,-10],[19,23],[23,27]]


/**
 * @param {number[]} arr
 * @return {number[][]}
 */
// 方法一：排序 + 一次遍历
// 如果 arr 是一个有序数组，那么「最小绝对差」的元素对一定会产生在两个相邻的元素中。所以我们可以对数组 arr 进行生序排序。
// 随和我们对数组 arr 进行一次遍历，对每个 arr[i-1] 和 arr[i] 计算他们对绝对差，记为 absDiff。
// 我们维护一个变量 lowest ，使其为当前遇到对最小绝对差，以及一个结果数组 ans 存储答案。
//  - 如果 absDiff < lowest ，那么说明我们遇到了更小的绝对差，需要更新 lowest ，同时清空 ans 数组后存入 arr[i-1] 和 arr[i]。
//  - 如果 absDiff = lowest ，那么我们只需将 arr[i-1] 和 arr[i] 存入 ans 数组即可。
var minimumAbsDifference = function (arr) {
    const ans = []; // 结果数组
    let lowest = Number.MAX_SAFE_INTEGER;
    arr.sort((a, b) => a - b); // 对 arr 数组进行升序排序
    for (let i = 1; i < arr.length; i++) {
        const absDiff = arr[i] - arr[i - 1];
        if (absDiff === lowest) {
            ans.push([arr[i - 1], arr[i]]);
        } else if (absDiff < lowest) {
            ans.length = 0; // 清空数组
            lowest = absDiff; // 更新最小值
            ans.push([arr[i - 1], arr[i]]);
        }
    }
    return ans;
};
// 时间复杂度：O(nlogn)，n 为 数组 arr 的长度。排序需要的时间为O(nlogn)，遍历需要的时间为O(n)，因此总的时间复杂度为O(nlogn)。
// 空间复杂度：O(logn)，快速排序所使用的栈空间。
