// 一个正整数如果能被 a 或 b 整除，那么它是神奇的。
// 给定三个整数 n , a , b ，返回第 n 个神奇的数字。因为答案可能很大，所以返回答案 对 109 + 7 取模 后的值。

// 输入：n = 1, a = 2, b = 3
// 输出：2

// 输入：n = 4, a = 2, b = 3
// 输出：6

// 提示：
// 1 <= n <= 10^9
// 2 <= a, b <= 4 * 104


// 方法一：多路归并
// 若不看数据范围，只看题面，容易想到的做法是「多路归并」：
// 使用两个指针分别指向 [a, 2a, 3a, ...] 和 [b, 2b, 3b, ...] 的下标 0 处。不断比较两个指针所指向的数值大小，从而决定谁向后移，并不断更新顺位计数。
// 该做法常见，但其时间复杂度为O(n)，对于本题 n = 1e9 来说并不可行。

// 方法二：数学 + 二分
// 令 f(x) 等于所有小于等于 x 的神奇数字的数量。
// 根据「容斥原理」：能被 a 或者 b 整除的数的个数 = 能被 a 整除的数的个数 + 能被 b 整除的数的个数 - 既能被 a 又能被 b 整除的数的个数，所以 f(x) 的表达式为：
// f(x) = x/a + x/b - x/c
// 其中 c 为 a 和 b 的最小公倍数 lcm(a, b)

// f(x) 是单调不减函数的。所以我们可以使用二分查找找到第一个使 f(x) = n 的 x 的值。x 即为答案。

// 其中  最小公倍数 lcm 可以根据 a 和 b 的最大公约数 gcd(a, b) 求出：lcm(a, b) = a*b / gcd(a, b)。

/**
 * @param {number} n
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
var nthMagicalNumber = function (n, a, b) {
    const MOD = 10 ** 9 + 7;
    let left = Math.min(a, b); // 下限为第一个神奇数字
    let right = Math.min(a, b) * n; // 上限，这样就至少有 n 个神奇数字了。
    let c = lcm(a, b);

    while (left < right) {
        const mid = left + Math.floor((right - left) / 2);
        // const mid = left + ((right - left) >> 1); // 值较大不能使用位运算
        const cnt = Math.floor(mid / a) + Math.floor(mid / b) - Math.floor(mid / c);
        if (cnt >= n) { // 没有比 mid 更小的数字
            right = mid;
        } else {
            left = mid + 1;
        }
    }
    return left % MOD;
};

// 辗转相除法求 a和b 的最大公约数
const gcd = (a, b) => {
    if (b === 0) return a;
    return gcd(b, a % b);
}

// 求 a 和 b 的最小公倍数
const lcm = (a, b) => {
    return Math.floor(a * b / gcd(a, b));
}
// 时间复杂度：O(log( n * max(a, b) ))，n, a, b 为题目给定的数字。
// 空间复杂度：O(1)，只需要常数的空间存放若干变量。
