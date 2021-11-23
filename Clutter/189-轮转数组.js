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
// 当我们将数组的元素向右移动 k 次后，尾部 k mod n 个元素会移动至数组头部，其余元素向后移动 k mod n 个位置。
// 我们可以先将所有元素翻转，这样尾部的 k mod n 个元素就被移至数组头部，然后我们再翻转 [0, k mod n -1] 区间的元素和 [k mod n, n-1] 区间的元素即能得到最后的答案。
// nums = [1, 2, 3, 4, 5, 6, 7], k = 3
// todo1 将整个数组反转 [7, 6, 5, 4, 3, 2, 1]
// todo2 从第k个元素以后，将数组划分为左右两块子数组 [7, 6, 5] | [4, 3, 2, 1]
// todo3 左右两子数组各自反转 [5, 6, 7] | [1, 2, 3, 4]

// 辅助函数
const reverse = (nums, start, end) => {
    while (start < end) {
        // 很多交换变量的方法在 344-反转字符串.js 中有介绍
        let temp = nums[start];
        nums[start] = nums[end];
        nums[end] = temp;
        start++;
        end--;
    }
}

var rotate = function (nums, k) {
    // 解决k大于nums.length的情况
    k %= nums.length;
    reverse(nums, 0, nums.length - 1);
    reverse(nums, 0, k - 1);
    reverse(nums, k, nums.length - 1)
}
// 时间复杂度：o(n)，n为数组 nums 的长度，每个元素被翻转2次，一共 n 个元素，因此总时间复杂度为O(2n) = O(n)。
// 空间复杂度：O(1)。
