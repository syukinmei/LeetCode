// 给你一个仅由整数组成的有序数组，其中每个元素都会出现两次，唯有一个数只会出现一次。
// 请你找出并返回只出现一次的那个数。
// 你设计的解决方案必须满足 O(log n) 时间复杂度和 O(1) 空间复杂度。

// 输入: nums = [1,1,2,3,3,4,4,8,8]
// 输出: 2

// 输入: nums =  [3,3,7,7,10,11,11]
// 输出: 10

/**
 * @param {number[]} nums
 * @return {number}
 */
// 暴力解法：
var singleNonDuplicate = function (nums) {
    for (let i = 0; i < nums.length; i += 2) {
        if (nums[i] !== nums[i + 1]) return nums[i];
    }
};


// 方法二：全数组的二分查找
// 假设只出现一次的元素位于下标为 x ，由于其余每个元素都出现两次，因此下标 x 的左边和右边都有偶数个元素，数组的长度是奇数。
// 由于数组是有序的，因此数组中相同的元素一定相邻。对于下标 x 左边的下标 y，如果nums[y] === nums[y+1]，则 y 一定是偶数；对于下标 x 右边的下标 z，如果nums[z] === nums[z+1]，则 z 一定是奇数。
//  - 如果 mid 是 偶数，则比较nums[mid] 和 nums[mid+1] 是否相等
//  - 如果 mid 是 奇数，则比较nums[mid-1] 和 nums[mid] 是否相等
// 由于下标 x 是相同元素的开始下标的奇偶性的分界，因此可以使用二分查找的方法寻找下标 x。
// 1 0001 
// 3 0011 0010 2
// 5 0101 0100 4
// 9 1001 1000 8

// 4  0100 0101 5
// 12 1100 1101 13

var singleNonDuplicate = function (nums) {
    let left = 0, right = nums.length - 1;
    while (left < right) {
        const mid = left + Math.floor((right - left) / 2);
        if (mid % 2 === 0) { // 如果 mid 是偶数
            if (nums[mid] === nums[mid + 1]) {
                left = mid + 2;
            } else {
                right = mid - 1;
            }
        } else { // 如果是 mid 是奇数
            if (nums[mid - 1] === nums[mid]) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }
    // 此时有 left === right，即为单一元素下标
    return nums[left];
};
// 时间复杂度：O(logn)，n 为数组 nums 的长度。需要在全数组范围内二分查找，二分查找的时间复杂度是O(logn)。
// 空间复杂度：O(1)，只需要常数的空间存放若干变量。

// 方法二优化：利用位运算
var singleNonDuplicate = function (nums) {
    let left = 0, right = nums.length - 1;
    while (left < right) {
        const mid = left + ((right - left) >> 1);
        // 利用按位异或，实现下标 mid 为 奇数 和上一个元素比较，为 偶数 和下一个元素比较
        if (nums[mid] === nums[mid ^ 1]) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    // 此时有 left === right，即为单一元素下标
    return nums[left];
};


// 方法三：偶数下标的二分查找
// 由于只出现一次的元素所在下标 x 的左边有偶数个元素，因此下标 x 一定是偶数，可以在偶数下标范围内二分查找。
// 二分查找的目标是找到满足 nums[x] !== nums[x+1] 的最小的偶数下标 x，则下标 x 处的元素是只出现一次的元素。
// 如果 mid 是奇数，则将 mid-1，确保 mid 是偶数，比较 nums[mid] 和 nums[mid+1] 是否相等。
//  - 如果相等，则 mid < x ，调整 left 边界，left = mid + 2
//  - 如果不想等，则 mid >= x ,调整 right 边界 ，right = mid
// 调整边界之后继续二分查找，直到确定下标 x 的值
var singleNonDuplicate = function (nums) {
    let left = 0, right = nums.length - 1;
    while (left < right) {
        let mid = left + ((right - left) >> 1);
        // if (mid % 2 !== 0) mid -= 1;
        // 利用按位与，实现下标 mid 为 奇数 时减 1 ，为 偶数 时减 0；
        mid -= mid & 1;
        if (nums[mid] === nums[mid + 1]) {
            left = mid + 2;
        } else {
            right = mid;
        }
    }
    // 此时有 left === right，即为单一元素下标
    return nums[left];
};
// 时间复杂度：O(logn)，n 为数组 nums 的长度。需要在偶数下标范围内二分查找，二分查找的时间复杂度是O(logn)。
// 空间复杂度：O(1)，只需要常数的空间存放若干变量。