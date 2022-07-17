// 符合下列属性的数组 arr 称为 山脉数组 ：
//  - arr.length >= 3
//  - 存在 i（0 < i < arr.length - 1）使得：
//     - arr[0] < arr[1] < ... arr[i-1] < arr[i]
//     - arr[i] > arr[i+1] > ... > arr[arr.length - 1]
// 给你由整数组成的山脉数组 arr ，返回任何满足 arr[0] < arr[1] < ... arr[i - 1] < arr[i] > arr[i + 1] > ... > arr[arr.length - 1] 的下标 i 。


// 输入：arr = [0,1,0]
// 输出：1

// 输入：arr = [0,2,1,0]
// 输出：1

// 输入：arr = [0,10,5,2]
// 输出：1

// 输入：arr = [3,4,5,1]
// 输出：2

// 提示：
// 3 <= arr.length <= 104
// 0 <= arr[i] <= 106
// 题目数据保证 arr 是一个山脉数组


/**
 * @param {number[]} arr
 * @return {number}
 */
// 方法一：枚举
// 对数组 arr 进行一次遍历，满足 arr[i-1] < arr[i] > arr[i+1] ，即是我们要找的下标。
// 满足 arr[i] > arr[i+1] 的下标一定也满足 arr[i-1] < arr[i] 。
var peakIndexInMountainArray = function (arr) {
    const Len = arr.length;
    for (let i = 0; i < Len - 1; i++) {
        if (arr[i] > arr[i + 1]) return i;
    }
};
// 时间复杂度：O(n)，n 为数组 arr 的长度，我们最多对数组进行一次遍历。
// 空间复杂度：O(1)，只需要常数的空间存放若干变量。

// 方法二：二分查找
// 使用二分查找 求最小满足 arr[i] > arr[i+1] 的下标i。
var peakIndexInMountainArray = function (arr) {
    const Len = arr.length;
    let left = 1, right = Len - 2; // （题意得：数组最小长度为3，山脉型并有山顶）山顶不可能是第一个数，也不会是最后一个数，所以在区间 [1, arr.length-2] 中寻找。
    while (left < right) {
        const mid = left + ((right - left) >> 1);
        if (arr[mid] < arr[mid + 1]) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    // 此时有 left = right ，区间缩为一个点，即为答案。
    return left;
};
// 时间复杂度：O(logn)，n 为数组 arr 的长度，我们需要进行二分查找的次数为O(logn)。
// 空间复杂度：O(1)，只需要常数的空间存放若干变量。
