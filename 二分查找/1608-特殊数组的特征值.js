// 给你一个非负整数数组 nums 。如果存在一个数 x ，使得 nums 中恰好有 x 个元素 大于或者等于 x ，那么就称 nums 是一个 特殊数组 ，而 x 是该数组的 特征值 。
// 注意： x 不必 是 nums 的中的元素。
// 如果数组 nums 是一个 特殊数组 ，请返回它的特征值 x 。否则，返回 -1 。可以证明的是，如果 nums 是特殊数组，那么其特征值 x 是 唯一的 。

// 输入：nums = [3,5]
// 输出：2
// 解释：有 2 个元素（3 和 5）大于或等于 2 。

// 输入：nums = [0,0]
// 输出：-1
// 解释：没有满足题目要求的特殊数组，故而也不存在特征值 x 。
// 如果 x = 0，应该有 0 个元素 >= x，但实际有 2 个。
// 如果 x = 1，应该有 1 个元素 >= x，但实际有 0 个。
// 如果 x = 2，应该有 2 个元素 >= x，但实际有 0 个。
// x 不能取更大的值，因为 nums 中只有两个元素。

// 输入：nums = [0,4,3,0,4]
// 输出：3
// 解释：有 3 个元素大于或等于 3 。

// 首先确定x的范围为[1, nums.length]。因为 nums 数组长度大于 0，而每个元素都满足大于等于 0，则答案最小是 1，最大为 nums 的长度。

/**
 * @param {number[]} nums
 * @return {number}
 */
// 方法一：暴力遍历
var specialArray = function (nums) {
    for (let i = 1; i <= nums.length; i++) {
        let count = 0; // 记录 nums 中大于等于 i 的元素数量
        for (let j = 0; j < nums.length; j++) {
            if (nums[j] >= i) count++;
            if (count > i) break;
        }
        if (count === i) return i;
    }
    return -1;
};
// 时间复杂度：O(n^2)。
// 空间复杂度：O(1)，只需要常数的空间存放若干变量。


// 方法二：二分
// 对nums数组排序后进行二分
var specialArray = function (nums) {
    nums.sort((a, b) => a - b);
    let left = 1, right = nums.length;
    while (left <= right) {
        const mid = left + ((right - left) >> 1);
        const firstBigIndex = getFirstBigIndex(nums, mid);
        const bigCount = nums.length - firstBigIndex; // 大于等于 mid 的数字
        console.log(mid, firstBigIndex, bigCount)
        if (mid === bigCount) return mid;
        else if (mid < bigCount) left = mid + 1; // 大于等于 mid 的元素太多了，增大 mid 的取值范围
        else right = mid - 1; // 反之，减少 mid 的取值范围
    }
    return -1;
};

// 找到大于等于target的数字
var getFirstBigIndex = function (nums, target) {
    let left = 0, right = nums.length - 1;
    while (left <= right) {
        const mid = left + ((right - left) >> 1);
        if (nums[mid] >= target) right = mid - 1;
        else left = mid + 1;
    }
    return left;
}