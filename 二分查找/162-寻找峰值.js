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