// 已知一个长度为 n 的数组，预先按照升序排列，经由 1 到 n 次 旋转 后，得到输入数组。例如，原数组 nums = [0,1,4,4,5,6,7] 在变化后可能得到：
// 若旋转 4 次，则可以得到 [4,5,6,7,0,1,4]
// 若旋转 7 次，则可以得到 [0,1,4,4,5,6,7]
// 注意，数组 [a[0], a[1], a[2], ..., a[n-1]] 旋转一次 的结果为数组 [a[n-1], a[0], a[1], a[2], ..., a[n-2]] 。

// 给你一个可能存在 重复 元素值的数组 nums ，它原来是一个升序排列的数组，并按上述情形进行了多次旋转。请你找出并返回数组中的 最小元素 。

// 输入：nums = [1,3,5]
// 输出：1

// 输入：nums = [2,2,2,0,1]
// 输出：0

/**
 * @param {number[]} nums
 * @return {number}
 */

//  提示：在最小值右侧的元素（不包括最后一个元素本身），它们的值一定都严格小于等于数组最后一个元素；而在最小值左侧的元素，它们的值一定都严格大于等于数组最后一个元素。因此，我们可以根据这一条性质，通过二分查找的方法找出最小值。

// 二分查找
/* var findMin = function (nums) {
    let left = 0, right = nums.length - 1, mid;
    while (left < right) {
        mid = left + ((right - left) >> 1);
        if (nums[mid] < nums[right]) { // 最小值在 [left, mid] mid存在为最小值的可能
            right = mid;
        } else if (nums[mid] > nums[right]) { // 最小值在 [mid+1,right]
            left = mid + 1;
        } else { // nums[mid] = nums[right] 无法分辨mid在最小值左边还是右边
            right--;
        }
    }
    // 此时有 left = right 该点即为最小值
    return nums[left];
}; */


// 二分查找优化1
/* var findMin = function (nums) {
    let left = 0, right = nums.length - 1, mid;
    while (left < right) {
        if (nums[left] === nums[right]) {
            right--;
            continue;
        }
        mid = left + ((right - left) >> 1);
        if (nums[mid] <= nums[right]) { // 最小值在 [left, mid] mid存在为最小值的可能
            right = mid;
        } else if (nums[mid] > nums[right]) { // 最小值在 [mid+1,right]
            left = mid + 1;
        }
    }
    // 此时有 left = right 该点即为最小值
    return nums[left];
}; */


// 二分查找优化2
var findMin = function (nums) {
    let left = 0, right = nums.length - 1, mid;
    while (left < right) {
        // 经过此步处理，[left,right]区间内最小值右侧一定小于最后一个元素，左侧一定大于最后一个元素
        if (nums[left] === nums[right] || nums[right] === nums[right - 1]) {
            right--;
            continue;
        }
        console.log(nums.splice(left, right + 1));
        mid = left + ((right - left) >> 1);
        if (nums[mid] < nums[right]) { // 最小值在 [left, mid] mid存在为最小值的可能
            right = mid;
        } else if (nums[mid] > nums[right]) { // 最小值在 [mid+1,right]
            left = mid + 1;
        }
    }
    // 此时有 left = right 该点即为最小值
    return nums[left];
};

// 时间复杂度：平均时间复杂度为 O(logn)，其中 n 是数组 nums 的长度。如果数组是随机生成的，那么数组中包含相同元素的概率很低，在二分查找的过程中，大部分情况都会忽略一半的区间。而在最坏情况下，如果数组中的元素完全相同，那么 while 循环就需要执行 n 次，每次忽略区间的右端点，时间复杂度为 O(n)。

// 空间复杂度：O(1)。


// console.log(findMin([3, 3, 3, 3, 3, 1, 3, 3]));
// console.log(findMin([2, 2, 2, 1, 1]));
// console.log(findMin([3, 1, 1]));
// console.log(findMin([2, 4, 5, 6, 7, 2, 2, 2]));

// console.log(findMin([4, 4, 4, 5, 6, 7, 8, 8, 8, 1, 1, 2, 2, 2, 2, 4, 4, 4]));
console.log(findMin([4, 4, 5, 5, 6, 6, 6, 7, 0, 0, 1, 2, 2, 4, 4, 4]));