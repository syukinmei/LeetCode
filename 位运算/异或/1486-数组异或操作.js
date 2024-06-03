// 给你两个整数，n 和 start 。
// 数组 nums 定义为：nums[i] = start + 2*i（下标从 0 开始）且 n == nums.length 。
// 请返回 nums 中所有元素按位异或（XOR）后得到的结果。

// 输入：n = 5, start = 0
// 输出：8
// 解释：数组 nums 为 [0, 2, 4, 6, 8]，其中 (0 ^ 2 ^ 4 ^ 6 ^ 8) = 8 。
//      "^" 为按位异或 XOR 运算符。

// 输入：n = 4, start = 3
// 输出：8
// 解释：数组 nums 为 [3, 5, 7, 9]，其中 (3 ^ 5 ^ 7 ^ 9) = 8.

// 输入：n = 1, start = 7
// 输出：7

// 输入：n = 10, start = 5
// 输出：2

// 方法一：模拟
// 按照题意模拟即可，具体的：
//  1. 初始化结果值 ans = 0
//  2. 遍历 nums 数组，即遍历区间[0, n-1] 中的每一个整数 i，令 ans 与每一个 start + 2*i 进行异或运算
//  3. 最终返回结果值 ans，即我们需要的答案
/**
 * @param {number} n
 * @param {number} start
 * @return {number}
 */
var xorOperation = function (n, start) {
    let ans = 0;
    
    for (let i = 0; i < n; i++) {
        const item = start + i * 2;
        ans ^= item;
    }

    return ans;
};
// 时间复杂度：O(n)，需要一重循环对 n 个数字进行异或操作。
// 空间复杂度：O(1)，只需要常数的空间存放若干变量。
