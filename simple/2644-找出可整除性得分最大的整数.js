// 给你两个下标从 0 开始的整数数组 nums 和 divisors 。
// divisors[i] 的 可整除性得分 等于满足 nums[j] 能被 divisors[i] 整除的下标 j 的数量。
// 返回 可整除性得分 最大的整数 divisors[i] 。如果有多个整数具有最大得分，则返回数值最小的一个。

// 输入：nums = [4,7,9,3,9], divisors = [5,2,3]
// 输出：3
// 解释：divisors 中每个元素的可整除性得分为：
// divisors[0] 的可整除性得分为 0 ，因为 nums 中没有任何数字能被 5 整除。
// divisors[1] 的可整除性得分为 1 ，因为 nums[0] 能被 2 整除。
// divisors[2] 的可整除性得分为 3 ，因为 nums[2]、nums[3] 和 nums[4] 都能被 3 整除。
// 因此，返回 divisors[2] ，它的可整除性得分最大。

// 输入：nums = [20,14,21,10], divisors = [5,7,5]
// 输出：5
// 解释：divisors 中每个元素的可整除性得分为：
// divisors[0] 的可整除性得分为 2 ，因为 nums[0] 和 nums[3] 都能被 5 整除。
// divisors[1] 的可整除性得分为 2 ，因为 nums[1] 和 nums[2] 都能被 7 整除。
// divisors[2] 的可整除性得分为 2 ，因为 nums[0] 和 nums[3] 都能被5整除。
// 由于 divisors[0]、divisors[1] 和 divisors[2] 的可整除性得分都是最大的，因此，我们返回数值最小的一个，即 divisors[2] 。

// 输入：nums = [12], divisors = [10,16]
// 输出：10
// 解释：divisors 中每个元素的可整除性得分为：
// divisors[0] 的可整除性得分为 0 ，因为 nums 中没有任何数字能被 10 整除。
// divisors[1] 的可整除性得分为 0 ，因为 nums 中没有任何数字能被 16 整除。
// 由于 divisors[0] 和 divisors[1] 的可整除性得分都是最大的，因此，我们返回数值最小的一个，即 divisors[0] 。

// 方法一：二次遍历模拟
// 我们可以枚举 divisors 中的每个元素 divisor ，计算 nums 中有多少个元素能被 divisor 整除（可整除性得分值），记为 tempCount 。
//  - 如果 tempCount 大于当前最大的可整除性得分 count，则更新 count = tempCount，并更新 ans = divisor。
//  - 如果 tempCount 等于当前最大的可整除性得分 count 并且 divisor 小于 ans，则更新 ans = divisor。
// 最后返回 ans 即具有最大可整除性得分的最小除数。
/**
 * @param {number[]} nums
 * @param {number[]} divisors
 * @return {number}
 */
var maxDivScore = function (nums, divisors) {
    let ans = Infinity; // 用于记录具有最大可整除性得分的除数
    let count = 0; // 当前最大的可整除性得分
    // 遍历每个除数
    for (const divisor of divisors) {
        let tempCount = 0; // 根据当前 divisor 的可整除性得分

        // 遍历每个数字，累计可以被 divisor 整除的数字数量
        for (const num of nums) {
            if (num % divisor === 0) {
                tempCount++;
            }
        }

        // 根据当前 divisor 的可整除性得分更新 ans 和 count
        // 如果当前 divisor 的整除数量大于当前最大计数，或者整除数量相同但除数更小
        if (tempCount > count || (tempCount === count && divisor < ans)) {
            ans = divisor;
            count = tempCount;
        }
    }

    return ans;
};
// 时间复杂度：O(m*n)，m 和 n 分别为数组 nums 和 divisors 的长度，因为我们需要遍历每个除数并检查每个数字是否能被该除数整除。
// 空间复杂度：O(1)，只需要常数的空间存放若干变量。
