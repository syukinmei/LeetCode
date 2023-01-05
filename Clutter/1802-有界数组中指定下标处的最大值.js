// 给你三个正整数 n、index 和 maxSum 。你需要构造一个同时满足下述所有条件的数组 nums（下标 从 0 开始 计数）：
//  - nums.length == n
//  - nums[i] 是 正整数 ，其中 0 <= i < n
//  - abs(nums[i] - nums[i+1]) <= 1 ，其中 0 <= i < n-1
//  - nums 中所有元素之和不超过 maxSum
//  - nums[index] 的值被 最大化
// 返回你所构造的数组中的 nums[index] 。

// 注意：abs(x) 等于 x 的前提是 x >= 0 ；否则，abs(x) 等于 -x 。


// 输入：n = 4, index = 2,  maxSum = 6
// 输出：2
// 解释：数组 [1,1,2,1] 和 [1,2,2,1] 满足所有条件。不存在其他在指定下标处具有更大值的有效数组。


// 输入：n = 6, index = 1,  maxSum = 10
// 输出：3

/**
 * @param {number} n
 * @param {number} index
 * @param {number} maxSum
 * @return {number}
 */
// 方法一：二分查找+贪心策略
// 根据题意，要使 nums[index] 成为最大元素，并且使其他元素尽可能小，所以我们的贪心策略为：从 nums[index] 开始，往左和往右，下标每相差 1，元素值也减少1，直到达到数组边界，或者减少到为1后保持为 1 不变。
// 根据以上思路 nums[index] 确认后，这个数组的 numsSum 也就确定了。并且 nums[index] 越大，数组和 numsSum 也越大。据此，找到了 numsSum 的单调性，所以可以使用二分查找来找出最大的能使 numsSum <= maxSum 成立的 nums[index]。
// 具体地，二分搜索的左边界为 1，有边界为 maxSum。numsSum 由三部分组成 nums[index]、nums[index]左边之和、nums[index]右边之和。
// 根据等差数列通项公式：和=(首项+末项)×项数÷2、
// 设 nums[index] = x
// [0, index-1]区间 index 个元素的和分两种情况：
//  - nums[index] > index，和为 (2x-index-1)*index/2
//  - nums[index] <= index，区间中有 index-(x-1) 个因为无法再减而被动赋值为 1 。和为 (x-1+1)*(x-1)/2 + index-(x-1) 即 (2*index-3*x+x*x+2)/2

// [index+1, n-1] 区间 n-1-index 个元素和也同理
var maxValue = function (n, index, maxSum) {
    let left = 1, right = maxSum;
    while (left < right) {
        // const mid = left + ((right - left) >> 1);
        const mid = Math.floor((left + right + 1) / 2);
        const numsSum = mid + cal(mid, index) + cal(mid, n - 1 - index);
        if (numsSum <= maxSum) {
            left = mid;
        } else {
            right = mid - 1;
        }
    }
    return left;
};

// 辅助函数，计算单边的元素和，需要考虑边界元素是否已下降到 1 的情况。
// 返回nums[index]为x时，单边有count个数时的和。
const cal = (x, count) => {
    if (x > count) {
        return (2 * x - count - 1) * count / 2;
    } else {
        const ones = count - (x - 1)
        return ones + (x - 1 + 1) * (x - 1) / 2
        // return (2 * count - 3 * x + x * x + 2) / 2;
    }
}
// 时间复杂度：O(logmaxSum)，二分搜索上下界的差为 maxSum。
// 空间复杂度：O(1)，只需要常数的空间存放若干变量。
