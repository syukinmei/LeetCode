// 已知一个长度为 n 的数组，预先按照升序排列，经由 1 到 n 次 旋转 后，得到输入数组。例如，原数组 nums = [0,1,2,4,5,6,7] 在变化后可能得到：
// 若旋转 4 次，则可以得到 [4,5,6,7,0,1,2]
// 若旋转 7 次，则可以得到 [0,1,2,4,5,6,7]
// 注意，数组 [a[0], a[1], a[2], ..., a[n-1]] 旋转一次 的结果为数组 [a[n-1], a[0], a[1], a[2], ..., a[n-2]] 。
// 给你一个元素值 互不相同 的数组 nums ，它原来是一个升序排列的数组，并按上述情形进行了多次旋转。请你找出并返回数组中的 最小元素 。

// 输入：nums = [3,4,5,1,2]
// 输出：1
// 解释：原数组为 [1,2,3,4,5] ，旋转 3 次得到输入数组。

// 输入：nums = [4,5,6,7,0,1,2]
// 输出：0
// 解释：原数组为 [0,1,2,4,5,6,7] ，旋转 4 次得到输入数组。

// 输入：nums = [11,13,15,17]
// 输出：11
// 解释：原数组为 [11,13,15,17] ，旋转 4 次得到输入数组。

/**
 * @param {number[]} nums
 * @return {number}
 */

// 方法一：

/* var findMin = function (nums) {
    if (!nums.length) return null;
    if (nums[0] < nums[nums.length - 1] || nums.length === 1) return nums[0];
    let left = 0, right = nums.length - 1, mid;
    while (left < right) {
        mid = left + ((right - left) >> 1);
        // mid 为断点上时，小的值就是最小值；
        if (nums[mid] > nums[mid + 1]) return nums[mid + 1];
        if (nums[mid] < nums[mid - 1]) return nums[mid];
        // mid 不在断点上，需要缩小范围寻找断点
        if (nums[mid] < nums[right]) { // 最小值在[left,mid-1]之间 
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
}; */

// 方法二：

// 提示：在最小值右侧的元素（不包括最后一个元素本身），它们的值一定都严格小于数组最后一个元素；而在最小值左侧的元素，它们的值一定都严格大于数组最后一个元素。因此，我们可以根据这一条性质，通过二分查找的方法找出最小值。

var findMin = function (nums) {
    if (nums.length === 1 || nums[0] < nums[nums.length - 1]) return nums[0];
    let left = 0, right = nums.length - 1, mid;
    while (left < right) {
        mid = left + ((right - left) >> 1);
        if (nums[mid] < nums[right]) { // 最小值在[left,mid] mid存在为最小值的可能
            right = mid;
        } else { // （mid,right]之间存在最小值
            left = mid + 1;
        }
    }
    // 此时有 left = right 该点即为最小值
    return nums[left];
};

// 时间复杂度：时间复杂度为 O(logn)，其中 n 是数组nums的长度。在二分查找的过程中，每一步会忽略一半的区间，因此时间复杂度为 O(logn)。

// 空间复杂度：O(1)。