// 已知函数 signFunc(x) 将会根据 x 的正负返回特定值：

//  - 如果 x 是正数，返回 1 。
//  - 如果 x 是负数，返回 -1 。
//  - 如果 x 是等于 0 ，返回 0 。
// 给你一个整数数组 nums 。令 product 为数组 nums 中所有元素值的乘积。

// 返回 signFunc(product) 。


// 输入：nums = [-1,-2,-3,-4,3,2,1]
// 输出：1
// 解释：数组中所有值的乘积是 144 ，且 signFunc(144) = 1

// 输入：nums = [1,5,0,2,-3]
// 输出：0
// 解释：数组中所有值的乘积是 0 ，且 signFunc(0) = 0

// 输入：nums = [-1,1,-1,1,-1]
// 输出：-1
// 解释：数组中所有值的乘积是 -1 ，且 signFunc(-1) = -1

// 方法一：遍历
// 如果数组中有一个元素0，那么所有元素的乘积一定为0，直接返回0.
// 使用 sign 记录元素乘积的符号，1为正，-1为负，初始时 sign = 1。
// 遍历整个数组，如果元素为正，那么sign不变，否则另 sign = -sign，最后返回 sign。
/**
 * @param {number[]} nums
 * @return {number}
 */
var arraySign = function (nums) {
    let sign = 1; // 表示乘积符号。1为正，-1为负。
    for (const num of nums) {
        if (num === 0) return 0; // 有0则乘积一定为0，直接返回0
        if (num < 0) sign = -sign;
    }
    return sign;
};
// 时间复杂度：O(n)，n 为 nums 数组的长度，需要遍历一次数组。
// 空间复杂度：O(1)，只需要常数的空间存放若干变量。
