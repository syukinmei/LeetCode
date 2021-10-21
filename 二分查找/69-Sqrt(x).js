// 给你一个非负整数 x ，计算并返回 x 的 算术平方根 。
// 由于返回类型是整数，结果只保留 整数部分 ，小数部分将被 舍去 。
// 注意：不允许使用任何内置指数函数和算符，例如 pow(x, 0.5) 或者 x ** 0.5 。

// 输入：x = 4
// 输出：2

// 输入：x = 8
// 输出：2
// 解释：8 的算术平方根是 2.82842..., 由于返回类型是整数，小数部分将被舍去。


/**
 * @param {number} x
 * @return {number}
 */
var mySqrt = function (x) {
    if (x < 2) return x;
    let left = 1, right = x;
    while (left <= right) {
        let mid = left + ((right - left) >> 1);
        if (x / mid >= mid) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return right;
};
console.log(mySqrt(4))
console.log(mySqrt(8))
console.log(mySqrt(9))
