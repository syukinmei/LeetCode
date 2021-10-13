// 猜数字游戏的规则如下：

// 每轮游戏，我都会从 1 到 n 随机选择一个数字。 请你猜选出的是哪个数字。
// 如果你猜错了，我会告诉你，你猜测的数字比我选出的数字是大了还是小了。
// 你可以通过调用一个预先定义好的接口 int guess(int num) 来获取猜测结果，返回值一共有 3 种可能的情况（-1，1 或 0）：

// -1：我选出的数字比你猜的数字小 pick < num
// 1：我选出的数字比你猜的数字大 pick > num
// 0：我选出的数字和你猜的数字一样。恭喜！你猜对了！pick == num
// 返回我选出的数字。

// 输入：n = 10, pick = 6
// 输出：6

// 输入：n = 1, pick = 1
// 输出：1

// 输入：n = 2, pick = 1
// 输出：1

// 输入：n = 2, pick = 2
// 输出：2

/** 
 * Forward declaration of guess API.
 * @param {number} num   your guess
 * @return 	            -1 if num is lower than the guess number
 *			             1 if num is higher than the guess number
 *                       otherwise return 0
 * var guess = function(num) {}
 */

/**
 * @param {number} n
 * @return {number}
 */
 var guessNumber = function (n) {
    if (guess(n) === 0) return n;
    let left = 1, right = n;
    while (left < right) { // 循环直至区间左右边界相等
        let mid = left + ((right - left) >> 1);
        // let mid = Math.floor(left + (right - left) / 2);
        if (guess(mid) <= 0) {
            right = mid; // 因为存在答案就是mid的情况所以right区间不能是mid-1应该是mid
        } else {
            left = mid + 1;
        }
    }
    // 此时有 left === right，区间缩为一个点，即为答案
    return left;
};

// 时间复杂度：O(logn)。时间复杂度即为二分的次数，每次二分我们将区间的长度减小一半，直至区间长度为 11 时二分终止，而区间初始长度为 nn，因此二分次数为O(logn)。

// 空间复杂度：O(1)。