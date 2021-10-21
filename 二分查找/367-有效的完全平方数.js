// 给定一个 正整数 num ，编写一个函数，如果 num 是一个完全平方数，则返回 true ，否则返回 false 。
// 进阶：不要 使用任何内置的库函数，如  sqrt 。

// 输入：num = 16
// 输出：true

// 输入：num = 14
// 输出：false

// 1 <= num <= 2^31 - 1

/**
 * @param {number} num
 * @return {boolean}
 */
var isPerfectSquare = function (num) {
    if (num === 1) return true;
    let left = 2, right = num >> 1, mid;
    while (left <= right) {
        mid = left + ((right - left) >> 1);
        if (mid * mid === num) {
            return true;
        } else if (mid * mid > num) { // 搜索边界缩小为[left, mid-1]
            right = mid - 1;
        } else { // 搜索边界缩小为[mid+1, right]
            left = mid + 1;
        }
    }
    // 循环体内没有找到，则说明 num 不是完全平方数，返回false
    return false;
};

// 时间复杂度：O(logN)。
// 空间复杂度：O(1)。