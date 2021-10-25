// 整数数组 nums 按升序排列，数组中的值 互不相同 。
// 在传递给函数之前，nums 在预先未知的某个下标 k（0 <= k < nums.length）上进行了 旋转，使数组变为 [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]]（下标 从 0 开始 计数）。例如， [0,1,2,4,5,6,7] 在下标 3 处经旋转后可能变为 [4,5,6,7,0,1,2] 。
// 给你 旋转后 的数组 nums 和一个整数 target ，如果 nums 中存在这个目标值 target ，则返回它的下标，否则返回 -1 。

// 输入：nums = [4,5,6,7,0,1,2], target = 0
// 输出：4

// 输入：nums = [4,5,6,7,0,1,2], target = 3
// 输出：-1

// 输入：nums = [1], target = 0
// 输出：-1

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
    let left = 0, right = nums.length - 1, mid;
    while (left <= right) {
        mid = left + ((right - left) >> 1);
        if (nums[mid] === target) return mid;
        if (nums[left] <= nums[mid]) { // 左边有序 或者 左边没区间了
            if (nums[left] <= target && target < nums[mid]) { // 且target在此区间
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        } else { // 右边有序
            if (nums[mid] < target && target <= nums[right]) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }
    return -1;
};

// 时间复杂度：O(logn)，其中 n 是数组 nums 的长度。在二分查找的过程中，每一步会忽略一半的区间，因此时间复杂度为 O(logn)。

// 空间复杂度：O(1)。