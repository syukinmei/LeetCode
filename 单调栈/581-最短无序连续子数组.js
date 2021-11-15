// 给你一个整数数组 nums ，你需要找出一个 连续子数组 ，如果对这个子数组进行升序排序，那么整个数组都会变为升序排序。
// 请你找出符合题意的 最短 子数组，并输出它的长度。

// 输入：nums = [2,6,4,8,10,9,15]
// 输出：5
// 解释：你只需要对 [6, 4, 8, 10, 9] 进行升序排序，那么整个表都会变为升序排序。

// 输入：nums = [1,2,3,4]
// 输出：0

// 输入：nums = [1]
// 输出：0


/**
 * @param {number[]} nums
 * @return {number}
 */
var findUnsortedSubarray = function (nums) {
    const stack = []; // 单调栈
    // 寻找开始
    let start = nums.length - 1;
    for (let i = 0; i < nums.length; i++) {
        while (stack.length && nums[i] < nums[stack[stack.length - 1]]) {
            start = Math.min(start, stack.pop());
        }
        stack.push(i);
    }
    // 寻找结束
    stack.length = 0;
    let end = 0;
    for (let i = nums.length - 1; i >= 0; i--) {
        while (stack.length && nums[i] > nums[stack[stack.length - 1]]) {
            end = Math.max(end, stack.pop());
        }
        stack.push(i);
    }
    return end !== 0 || start !== nums.length - 1 ? end - start + 1 : 0;
};

console.log(findUnsortedSubarray([2, 6, 4, 8, 10, 9, 15]));
console.log(findUnsortedSubarray([1, 2, 3]));
console.log(findUnsortedSubarray([1]));