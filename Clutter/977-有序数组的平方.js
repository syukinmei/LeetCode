// 给你一个按 非递减顺序 排序的整数数组 nums，返回 每个数字的平方 组成的新数组，要求也按 非递减顺序 排序。

// 输入：nums = [-4,-1,0,3,10]
// 输出：[0,1,9,16,100]
// 解释：平方后，数组变为 [16,1,0,9,100]
// 排序后，数组变为 [0,1,9,16,100]

// 输入：nums = [-7,-3,2,3,11]
// 输出：[4,9,9,49,121]

// 方法一：双指针
// 数组是有序的， 只不过负数平方之后可能成为最大数了。那么数组平方的最大值就在数组的两端，不是最左边就是最右边，不可能是中间。
// 定义一个新数组res，和nums数组一样的大小，让k指向res数组终止位置。
// 判断nums数组两端平方后谁为最大值，给数组res倒着赋值。
// 如果nums[i] * nums[i] < nums[j] * nums[j] 那么result[k--] = nums[j] * nums[j]; 
// 如果nums[i] * nums[i] >= nums[j] * nums[j] 那么result[k--] = nums[i] * nums[i]; 

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortedSquares = function (nums) {
    let left = 0, right = nums.length - 1;
    const res = new Array(nums.length);
    let k = res.length - 1;
    while (left <= right) {
        // 相等的情况谁赋值都一样
        if (nums[left] * nums[left] >= nums[right] * nums[right]) {
            res[k--] = nums[left] * nums[left]
            left++;
        } else if (nums[left] * nums[left] < nums[right] * nums[right]) {
            res[k--] = nums[right] * nums[right];
            right--;
        }
    }
    return res;
};
// 时间复杂度：O(n)，n为数组nums的长度。
// 空间复杂度：O(1)，除了答案数组，我们只需要维护常数的空间保存若干变量。