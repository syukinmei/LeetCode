// 给定一个排序好的数组 arr ，两个整数 k 和 x ，从数组中找到最靠近 x（两数之差最小）的 k 个数。返回的结果必须要是按升序排好的。
// 整数 a 比整数 b 更接近 x 需要满足：
// |a - x| < |b - x| 或者
// |a - x| == |b - x| 且 a < b

// 输入：arr = [1,2,3,4,5], k = 4, x = 3
// 输出：[1,2,3,4]

// 输入：arr = [1,2,3,4,5], k = 4, x = -1
// 输出：[1,2,3,4]

/**
 * @param {number[]} arr
 * @param {number} k
 * @param {number} x
 * @return {number[]}
 */

// 方法一：暴力解法
// 将数组中的元素按照与目标 x 的差的绝对值排序，排好序后前 k 个元素就是我们需要的答案。

/* var findClosestElements = function (arr, k, x) {
    // 排序
    arr.sort((a, b) => Math.abs(a - x) - Math.abs(b - x));
    // 取出最小的前k个
    let ansArr = arr.slice(0, k);
    // 再排序
    return ansArr.sort((a, b) => a - b);
}; */

// 时间复杂度： O(nlogn)。 Collections.sort() 使用二叉排序所以时间复杂度是O(nlogn)。
// 空间复杂度： O(k)。就地排序不需要额外的空间。但是生成长度为 k 的子列表需要消耗空间。


// 方法二：二分查找
// 把 mid 看成结果的起始下标，判断是否正确。

var findClosestElements = function (arr, k, x) {
    let left = 0, right = arr.length - 1, mid;
    while (left < right) {
        mid = left + ((right - left) >> 1);
        // arr[mid + k] 位置的差值比 arr[mid] 位置的差值小，那说明起始值比 mid 大
        // mid 到 [mid + k]，是 k + 1 的长度，不是 k 的长度
        if ((x - arr[mid]) > (arr[mid + k] - x)) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    return arr.slice(left, left + k);
};

// 时间复杂度:O(log N)
// 空间复杂度:O (1)