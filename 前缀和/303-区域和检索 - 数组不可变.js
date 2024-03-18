// 给定一个整数数组  nums，处理以下类型的多个查询:
// 计算索引 left 和 right （包含 left 和 right）之间的 nums 元素的 和 ，其中 left <= right

// 实现 NumArray 类：
//  - NumArray(int[] nums) 使用数组 nums 初始化对象
//  - int sumRange(int i, int j) 返回数组 nums 中索引 left 和 right 之间的元素的 总和 ，包含 left 和 right 两点（也就是 nums[left] + nums[left + 1] + ... + nums[right] )

// 输入：
// ["NumArray", "sumRange", "sumRange", "sumRange"]
// [[[-2, 0, 3, -5, 2, -1]], [0, 2], [2, 5], [0, 5]]
// 输出：
// [null, 1, -1, -3]

// 解释：
// NumArray numArray = new NumArray([-2, 0, 3, -5, 2, -1]);
// numArray.sumRange(0, 2); // return 1 ((-2) + 0 + 3)
// numArray.sumRange(2, 5); // return -1 (3 + (-5) + 2 + (-1))
// numArray.sumRange(0, 5); // return -3 ((-2) + 0 + 3 + (-5) + 2 + (-1))

/**
 * Your NumArray object will be instantiated and called as such:
 * var obj = new NumArray(nums)
 * var param_1 = obj.sumRange(left,right)
 */

// 方法一：前缀和
// 定义前缀和数组 preSum，preSum[i] 表示前 i 个元素的前缀和。即 preSum[i] = (i-1)∑(j=0) nums[j]
// 此时有，对于 nums 任意区间[left, right]（左右端都包含）内的所有元素之和为：
// sum(left, right) = preSum[right+1] - preSum[left]

// preSum[right + 1] 表示 nums 数组中 [0, right] 的所有元素之和（包含 0 和 right）
// preSum[left] 表示 nums 数组中 [0, left-1] 的所有元素之和（包含 0 和 left-1）
// 两者相减，即保留了 nums 数组中 [left, right] 的所有元素之和。
/**
 * @param {number[]} nums
 */
var NumArray = function (nums) {
    const n = nums.length;
    // 构建差分数组
    this.preSum = new Array(n + 1).fill(0);

    for (let i = 0; i < n; i++) {
        this.preSum[i + 1] = this.preSum[i] + nums[i];
    }
};

/**
 * 利用前缀和特性，计算区间和
 * @param {number} left
 * @param {number} right
 * @return {number}
 */
NumArray.prototype.sumRange = function (left, right) {
    return this.preSum[right + 1] - this.preSum[left];
};
// 时间复杂度：初始化O(n)，每次检索区间和为O(1)，n 为数组 nums 的长度。
//              - 初始化需要遍历数组 nums 计算前缀和，时间复杂度为O(n)。
//              - 每次检索区间和只需要得到两个下标处的前缀和，然后计算差值即可，因此时间复杂度为O(1)。
// 空间复杂度：O(n)n 为数组 nums 的长度，需要长度为 n+1 的数组来存储前缀和。
