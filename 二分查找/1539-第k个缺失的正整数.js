// 给你一个 严格升序排列 的正整数数组 arr 和一个整数 k 。
// 请你找到这个数组里第 k 个缺失的正整数。

// 输入：arr = [2,3,4,7,11], k = 5
// 输出：9
// 解释：缺失的正整数包括 [1,5,6,8,9,10,12,13,...] 。第 5 个缺失的正整数为 9 。

// 输入：arr = [1,2,3,4], k = 2
// 输出：6
// 解释：缺失的正整数包括 [5,6,7,...] 。第 2 个缺失的正整数为 6 。


/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number}
 */
// 方法一：二分查找
// 对于每个元素 arr[i]，我们都可以确定到第 i 个元素为止缺失的元素数量 miss 为 arr[i] - i - 1
// 我们发现miss[i] 是随 i 非严格递增的，因此我们可以使用二分查找解决这个问题。
// 我们要找到一个 i 使得 miss[i] < k <= miss[i+1]，就可以确定缺失的第 k 个数为 arr[i] + k - miss[i] 。
var findKthPositive = function (arr, k) {
    if (arr[0] > k) return k;

    let left = 0, right = arr.length - 1;
    while (left <= right) {
        const mid = left + ((right - left) >> 1);
        const miss = arr[mid] - mid - 1;
        if (miss >= k) right = mid - 1;
        else if (miss < k) left = mid + 1;
    }
    // 第k个缺失的数为 当前位置数 + k - 当前位置缺失个数
    return arr[right] + k - (arr[right] - right - 1)
};
// 时间复杂度：O(logn)，n 为数组 arr 到长度，我们需要进行二分查找的次数为O(logn)。
// 空间复杂度：O(1)，只需要常数的空间存放若干变量。
