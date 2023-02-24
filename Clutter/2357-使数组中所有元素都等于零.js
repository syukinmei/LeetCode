// 给你一个非负整数数组 nums 。在一步操作中，你必须：
//  - 选出一个正整数 x ，x 需要小于或等于 nums 中 最小 的 非零 元素。
//  - nums 中的每个正整数都减去 x。
// 返回使 nums 中所有元素都等于 0 需要的 最少 操作数。


// 输入：nums = [1,5,0,3,5]
// 输出：3
// 解释：
// 第一步操作：选出 x = 1 ，之后 nums = [0,4,0,2,4] 。
// 第二步操作：选出 x = 2 ，之后 nums = [0,2,0,0,2] 。
// 第三步操作：选出 x = 2 ，之后 nums = [0,0,0,0,0] 。


// 输入：nums = [0]
// 输出：0
// 解释：nums 中的每个元素都已经是 0 ，所以不需要执行任何操作。

/**
 * @param {number[]} nums
 * @return {number}
 */
// 方法一：排序+贪心
// 贪心策略，每次选择数组中最小非零元素作为x，将数组中的每个非零元素减少x。
var minimumOperations = function (nums) {
    nums.sort((a, b) => a - b); // 升序排序
    let subtractor = 0; // 减数，记录当前数组已经减少了多少数
    let count = 0; // 记录当前操作次数
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] > subtractor) {
            subtractor += nums[i] - subtractor; // 更新减数
            count++; // 更新操作次数
        }
    }
    return count;
};
// 时间复杂度：O(nlogn)，n 为数组 nums 的长度。排序需要O(nlogn)的时间。排序后需要遍历一次数组，对于每个非零元素，计算将该值减到0所需的减数 subtractor，因此总的时间复杂度为O(nlogn)。
// 空间复杂度：O(logn)，n 为数组 nums 的长度。排序需要O(logn)的递归调用栈空间。


// 方法二：哈希集合
// 由于每次操作都使数组中所有非零元素减少一个相同的值，因此数组中相同元素减少到0点操作数相等，数组中不相等的元素减少到0点操作数不相等。
// 由因为使用贪心策略操作时，每次操作都会将数组中的最小非零元素减少到0，因此最少操作数等于数组中的不同非零元素个数。
// 具体地：
// 使用哈希集合存储数组中的所有非零元素，则哈希集合的大小等于数组中的不同非零元素的个数，即为最少操作数。
var minimumOperations = function (nums) {
    const set = new Set();
    for (let num of nums) {
        if (num > 0) set.add(num);
    }
    return set.size;
};
// 时间复杂度：O(n)，n 为数组 nums 的长度，需要遍历数组一次。
// 空间复杂度：O(n)，n 为数组 nums 的长度。哈希集合需要O(n)的空间。
