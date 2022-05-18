// 几乎每一个人都用 乘法表。但是你能在乘法表中快速找到第k小的数字吗？
// 给定高度m 、宽度n 的一张 m * n的乘法表，以及正整数k，你需要返回表中第k 小的数字。

// 输入: m = 3, n = 3, k = 5
// 输出: 3
// 解释: 
// 乘法表:
// 1	2	3
// 2	4	6
// 3	6	9
// 第5小的数字是 3 (1, 2, 2, 3, 3).

// 输入: m = 2, n = 3, k = 6
// 输出: 6
// 解释: 
// 乘法表:
// 1	2	3
// 2	4	6
// 第6小的数字是 6 (1, 2, 2, 3, 4, 6).


// 方法一：二分查找
// 可以把题目转化为：给定一个数，求矩阵中有多少个数比这个数小 ，然后用二分的思想去做
// 假设给的的乘法表是 3*3 的，我们要找第 5小的数，如果乘法表中小于等于 3 的数字有 5 个，那么3是在这个乘法表中一定是第5小的。当然3也可以是第4小的，即在3*3的乘法表中 3 最大是第 5 小的，还可以再小。
// 记乘法表中小于 mid 的数字有 smallerCount 个。
//  - smallerCount < k ，mid 最大情况不足 第k小，因此 将mid及小于mid的数在区间中剔除，left = mid+1
//  - smallerCount >= k，mid 最大情况 比k大，但是！！但是乘法表中可能有很多个 mid，所有mid需要保，比mid大的数字在区间中剔除，right = mid

// Q：怎么计算乘法表中 小于等于 mid 数字的数量？
// A：第 i 行的数字分别为 i, 2*i, 3*i, ... ，因此第 i 行小于等于 mid 数字的数量有 min(x/i, n) 个。 然后相加所有行数即可。
// why：mid 整除 i 得到了 mid 是 i 的多少倍，表示第 i 行有 多少个数字小于等于x。同时要考虑 i 行只有 n 个数字。因此需要取个 min;

// Q：为什么 smallerCount 函数不是计算小于 mid 的数量？
// A：因为会死循环，比如 3, 3, 5 ，会在[3,4]直接一直循环 mid=3，smallerCount === 3 < k 区间还是在[3, 4]
/**
 * @param {number} m
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var findKthNumber = function (m, n, k) {
    let left = 1, right = m * n;
    while (left < right) {
        const mid = left + ((right - left) >> 1);
        console.log(left, right, mid)
        if (smallerCount(m, n, mid) >= k) {
            // 细节：二分查找过程中取得的值不一定在乘法表中，所有在 smallerCount = k的时候不能直接retun mid;
            right = mid;
        } else {
            left = mid + 1;
        }
    }
    // 此时有 left === right，区间缩为一个点，即为答案
    return left;
};

// 辅助函数
/**
 * 统计乘法表中有多个数字小于等于 num
 * @param {number} m - 乘法表的高度
 * @param {number} n - 乘法表的宽度
 * @param {number} num
 * @param {number} count - m*n乘法表中小于等于 num 的数字数量，即在m*n的乘法表中 num 最多是第 count 小的
 */
const smallerCount = function (m, n, num) {
    let count = 0;
    // 统计第i行小于 num 的数目
    for (let i = 1; i <= m; i++) {
        count += Math.min(Math.floor(num / i), n);
    }
    return count;
}
// 时间复杂度：O(m*log(m*n))，二分的次数为 O(log(m*n))，每次二分需要O(m)的时间统计 smallerCount。
// 空间复杂度：O(1)，只需要常数的空间存放若干变量。
