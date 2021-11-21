// 给你一个数组，将数组中的元素向右轮转 k 个位置，其中 k 是非负数

// 输入: nums = [1,2,3,4,5,6,7], k = 3
// 输出: [5,6,7,1,2,3,4]
// 解释:
// 向右轮转 1 步: [7,1,2,3,4,5,6]
// 向右轮转 2 步: [6,7,1,2,3,4,5]
// 向右轮转 3 步: [5,6,7,1,2,3,4]

// 输入：nums = [-1,-100,3,99], k = 2
// 输出：[3,99,-1,-100]
// 解释: 
// 向右轮转 1 步: [99,-1,-100,3]
// 向右轮转 2 步: [3,99,-1,-100]


/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
// 方法一：使用额外数组
var rotate = function (nums, k) {
    const n = nums.length;
    // 额外新数组 将每个元素放至正确位置
    const newArray = new Array(n);
    // tod1 遍历nums数组 将下标i的元素 放至新数组的 (i+k) mod n的位置
    for (let i = 0; i < n; i++) {
        newArray[(i + k) % n] = nums[i];
    }
    // todo2 因为题目要求就地修改nums数组，没有返回值，则将新数组拷贝至原数组
    for (let i = 0; i < n; i++) {
        nums[i] = newArray[i];
    }
};
// 时间复杂度：O(n)，n 为数组 nums的长度。
// 空间复杂度：O(n)，n 为额外新数组的长度。


// 方法二：数组反转
// nums = [1, 2, 3, 4, 5, 6, 7], k = 3
// todo1 将整个数组反转 [7, 6, 5, 4, 3, 2, 1]
// todo2 从第k个元素以后，将数组划分为左右两块子数组 [7, 6, 5] | [4, 3, 2, 1]
// todo3 左右两子数组各自反转 [5, 6, 7] | [1, 2, 3, 4]
