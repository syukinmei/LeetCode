// 实现 pow(x, n) ，即计算 x 的 n 次幂函数（即，xn）。

// 输入：x = 2.00000, n = 10
// 输出：1024.00000

// 入：x = 2.10000, n = 3
// 输出：9.26100

// 输入：x = 2.00000, n = -2
// 输出：0.25000
// 解释：2-2 = 1/22 = 1/4 = 0.25


/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */

// 方法一：暴力解法
/* var myPow = function (x, n) {
    //  处理n为负数的情况
    if (n < 0) {
        x = 1 / x;
        n = -n;
    }
    let ans = 1;
    for (let i = 1; i <= n; i++) {
        ans *= x;
    }
    return ans;
}; */
// 时间复杂度为O(n)
// 空间复杂度为O(1)

// 方法二：分治
// 思路：把x的n次方，转变为[x^(n/2)]^2  ->  (x*x)^(n/2)
// 考虑n为奇数和偶数的情况：[x^(n/2)]^2*x 亦或者 先将n-1操作 x*x^(n-1)
// x^n -> x^(n/2) -> x^(n/4) -> ... -> x^1===x or x^0 ===0

var myPow = function (x, n) {
    // 递归写法
    // if (n < 0) return 1 / myPow(x, -n);
    // if (n === 0) return 1;
    // if (n % 2) return x * myPow(x, n - 1);
    // return myPow(x * x, n / 2);

    // 非递归写法
    if (n < 0) {
        x = 1 / x;
        n = -n;
    }
    if (n === 0) return 1; // 设置递归的出口
    let res = 1;
    while (n > 1) {
        if (n & 1) { // 按位与 等价n % 2 === 1
            n--;
            res *= x; // 将x^n 转变为 x*x^(n-1)
        }
        x *= x; // 4, 16  16*16
        n / 2;
    }
    return res * x;
}

// 时间复杂度：O(logN)。N为n，需要计算x的n，n/2，n/4，。。。，1次
// 空间复杂度：O(1) 如果是递归写法就是 O(logN)，即为递归的层数。这是由于递归的函数调用会使用栈空间

// (x*x)^n/2