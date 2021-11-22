// 给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。

// 输入: [0,1,0,3,12]
// 输出: [1,3,12,0,0]

// 1.必须在原数组上操作，不能拷贝额外的数组。
// 2.尽量减少操作次数。


/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
// 双指针
// left指针指向当前已处理好的序列尾部，right指针指向待处理序列的头部。
// right指针不断向右移动，每次右指针指向非零数，则将左右指针对应的数交换，同时left指针右移。
// 此时有：
// 1. left指针 左边均为非零数；
// 2. right指针 左边直到left指针处均为零；
var moveZeroes = function (nums) {
    // left 指向非0元素的尾部(left左边没有0)
    let left = 0
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== 0) {
            // [nums[i], nums[left]] = [nums[left], nums[i]];
            let temp = nums[i];
            nums[i] = nums[left];
            nums[left] = temp;
            left++;
        }
    }
};
// 时间复杂度：O(n)，n 为数组 nums 的长度
// 空间复杂度：O(1)，只需要常数的空间存放若干变量。