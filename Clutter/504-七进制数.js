// 给定一个整数 num，将其转化为 7 进制，并以字符串形式输出。

// 输入: num = 100
// 输出: "202"

// 输入: num = -7
// 输出: "-10"

/**
 * @param {number} num
 * @return {string}
 */
// 思路与转二进制相同
// 9 -> 4...1 -> 2...0 -> 1...0 -> 0...1
var convertToBase7 = function (num) {
    if (num === 0) return '0';
    let isMinus = false; // 标识正负号
    if (num < 0) {
        isMinus = true;
        num = -num;
    }
    const res = [];
    let remain = 0; // 记录余数
    while (num != 0) {
        remain = num % 7;
        num = Math.floor(num / 7);
        res.unshift(remain); // 余数从队头放入数组
    }
    // 结果集转字符串，判断正负号 并返回
    return isMinus ? '-' + res.join('') : res.join('');
};
// 时间复杂度：O(log |num|)，循环中最多做O(log |num|)次除法。
// 空间复杂度：O(log |num|)，字符串数组的长度最多为O(log |num|)。
