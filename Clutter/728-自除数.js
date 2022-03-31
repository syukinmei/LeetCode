// 自除数 是指可以被它包含的每一位数整除的数。
//  - 例如，128 是一个 自除数 ，因为 128 % 1 == 0，128 % 2 == 0，128 % 8 == 0。
// 自除数 不允许包含 0 。
// 给定两个整数 left 和 right ，返回一个列表，列表的元素是范围 [left, right] 内所有的 自除数 。


// 输入：left = 1, right = 22
// 输出：[1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 15, 22]

// 输入：left = 47, right = 85
// 输出：[48,55,66,77]


/**
 * @param {number} left
 * @param {number} right
 * @return {number[]}
 */
// 方法一：模拟
// 对于范围内的每个整数，得到各个位的数，进行判断。
var selfDividingNumbers = function (left, right) {
    const res = [];
    for (let i = left; i <= right; i++) {
        isSelfDividing(i) && res.push(i);
    }
    return res;
};

// 辅助函数
const isSelfDividing = function (num) {
    const copy = num;
    while (num > 0) {
        const digit = num % 10;
        // 根据自除数的定义，判断是否符合条件
        if (digit === 0 || copy % digit !== 0) return false;
        num = Math.floor(num / 10);
    }
    return true;
}
// 时间复杂度：O(nlogright)，n 是范围内的整数个数，right 是范围内的最大整数。对于范围内的每个整数，需要O(logright)的时间判断是否为自除数。
// 空间复杂度：O(1)，只需要常数的空间存放若干变量。
