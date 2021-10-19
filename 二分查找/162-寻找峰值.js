// 峰值元素是指其值严格大于左右相邻值的元素。
// 给你一个整数数组 nums，找到峰值元素并返回其索引。数组可能包含多个峰值，在这种情况下，返回 任何一个峰值 所在位置即可。
// 你可以假设 nums[-1] = nums[n] = -∞ 。
// 你必须实现时间复杂度为 O(log n) 的算法来解决此问题。

// 输入：nums = [1,2,3,1]
// 输出：2
// 解释：3 是峰值元素，你的函数应该返回其索引 2。

// 输入：nums = [1,2,1,3,5,6,4]
// 输出：1 或 5 
// 解释：你的函数可以返回索引 1，其峰值元素为 2；
//      或者返回索引 5， 其峰值元素为 6。


/**
 * @param {number[]} nums
 * @return {number}
 */
var findPeakElement = function (nums) {
    // 有上坡就有峰值
    let left = 0, right = nums.length - 1, mid;
    while (left < right) {
        mid = left + ((right - left) >> 1);
        if (nums[mid] < nums[mid + 1]) { // 说明右边上坡，峰值在mid右边
            left = mid + 1;
        } else { // 说明左边上坡，峰值在mid左边同时mid也可能为峰值
            right = mid;
        }
    }
    // 此时有 left === right，区间缩为一个点，即为答案
    return left;
};

// 投机取巧
// return nums.indexOf(Math.max(...nums)); 


console.log(findPeakElement([1, 2, 1, 3, 5, 6, 4]));

// 时间复杂度：O(logN)
// 空间复杂度：O(1)