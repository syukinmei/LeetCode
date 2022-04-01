// 给定一个二进制数组 nums 和一个整数 k，如果可以翻转最多 k 个 0 ，则返回 数组中连续 1 的最大个数 。


// 输入：nums = [1,1,1,0,0,0,1,1,1,1,0], K = 2
// 输出：6
// 解释：[1,1,1,0,0,1,1,1,1,1,1]
// 粗体数字从 0 翻转到 1，最长的子数组长度为 6。

// 输入：nums = [0,0,1,1,0,0,1,1,1,0,1,1,0,0,0,1,1,1,1], K = 3
// 输出：10
// 解释：[0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1]
// 粗体数字从 0 翻转到 1，最长的子数组长度为 10。


/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
// 方法一：滑动窗口
var longestOnes = function (nums, k) {
    let left = 0, right = 0, res = 0;
    while (right < nums.length) {
        // 窗口缩小
        if (nums[right] === 0) {
            k--;
            while (k < 0) {
                if (nums[left] === 0) k++;
                left++;
            }
        }
        // 更新窗口最大值
        res = Math.max(res, right - left + 1);
        // 窗口扩张
        right++;
    }
    return res;
};
// 时间复杂度：O(n)，n 是数组 nums 的长度，我们至多只需要遍历该数组两次(左右指针各一次)。
// 空间复杂度：O(1)，只需要常数的空间存放若干变量。
