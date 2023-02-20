// 给你一个函数  f(x, y) 和一个目标结果 z，函数公式未知，请你计算方程 f(x,y) == z 所有可能的正整数 数对 x 和 y。满足条件的结果数对可以按任意顺序返回。
// 尽管函数的具体式子未知，但它是单调递增函数，也就是说：

//  - f(x, y) < f(x + 1, y)
//  - f(x, y) < f(x, y + 1)

// 函数接口定义如下：

// interface CustomFunction {
// public:
//     // Returns some positive integer f(x, y) for two positive integers x and y based on a formula.
//     int f(int x, int y);
// };

// 你的解决方案将按如下规则进行评判：
// 判题程序有一个由 CustomFunction 的 9 种实现组成的列表，以及一种为特定的 z 生成所有有效数对的答案的方法。
// 判题程序接受两个输入：function_id（决定使用哪种实现测试你的代码）以及目标结果 z 。
// 判题程序将会调用你实现的 findSolution 并将你的结果与答案进行比较。
// 如果你的结果与答案相符，那么解决方案将被视作正确答案，即 Accepted 。


// 输入：function_id = 1, z = 5
// 输出：[[1,4],[2,3],[3,2],[4,1]]
// 解释：function_id = 1 暗含的函数式子为 f(x, y) = x + y
// 以下 x 和 y 满足 f(x, y) 等于 5：
// x=1, y=4 -> f(1, 4) = 1 + 4 = 5
// x=2, y=3 -> f(2, 3) = 2 + 3 = 5
// x=3, y=2 -> f(3, 2) = 3 + 2 = 5
// x=4, y=1 -> f(4, 1) = 4 + 1 = 5


// 输入：function_id = 2, z = 5
// 输出：[[1,5],[5,1]]
// 解释：function_id = 2 暗含的函数式子为 f(x, y) = x * y
// 以下 x 和 y 满足 f(x, y) 等于 5：
// x=1, y=5 -> f(1, 5) = 1 * 5 = 5
// x=5, y=1 -> f(5, 1) = 5 * 1 = 5


// Tips：
// 1 <= function_id <= 9
// 1 <= z <= 100
// 题目保证 f(x, y) == z 的解处于 1 <= x, y <= 1000 的范围内。
// 在 1 <= x, y <= 1000 的前提下，题目保证 f(x, y) 是一个 32 位有符号整数。


/**
 * // This is the CustomFunction's API interface.
 * // You should not implement it, or speculate about its implementation
 * function CustomFunction() {
 *     @param {integer, integer} x, y
 *     @return {integer}
 *     this.f = function(x, y) {
 *         ...
 *     };
 * };
 */

/**
 * @param {CustomFunction} customfunction
 * @param {integer} z
 * @return {integer[][]}
 */
// 方法一：枚举
// 不推荐这个做法，完全没有利用到「递增」这个条件
// 根据题目给出的 x 和 y 的取值范围，枚举所有可能的 x,y 数对，保存满足 f(x, y) === z 对数对，最后返回结果。
var findSolution = function (customfunction, z) {
    const res = [];
    for (let x = 1; x <= 1000; x++) {
        for (let y = 1; y <= 1000; y++) {
            if (customfunction.f(x, y) === z) res.push([x, y]);
        }
    }
    return res;
};
// 时间复杂度：O(mn)，m n 分别为 x 和 y 对取值范围。
// 空间复杂度：O(1)，只需要常数的空间存放若干变量。


// 方法二：二分查找
// 不推荐使用这个做法，因为只利用到了函数 f 对 y 变量是递增的，没有利用到对 x 也是这样。
// 当我们固定 x = x0 时，函数g(y) = f(x0, y) 是随着 y 的增大单调递增的，因此我们可以通过二分查找来判断是否存在 y = y0，使得 g(y0) = f(x0, y0) = z。
var findSolution = function (customfunction, z) {
    const res = [];
    for (let x = 1; x <= 1000; x++) {
        let yL = 1, yR = 1000; // 定义 y 的左右边界
        while (yL <= yR) {
            let mid = yL + ((yR - yL) >> 1);
            const result = customfunction.f(x, mid);
            if (result < z) {
                yL = mid + 1;
            } else if (result > z) {
                yR = mid - 1;
            } else {
                res.push([x, mid]);
                break;
            }
        }
    }
    return res;
};
// 时间复杂度：O(mlogn)，m 为 x 的取值范围，n 为 y 的取值范围。
// 空间复杂度：O(1)，只需要常数的空间存放若干变量。


// 方法三：双指针
// 由于函数 f 对于 x 和 y 都是单调递增函数。
// 假设 x1 < x2，且 f(x1, y1) = f(x2, y2)，那么显然有 y1 > y2。因此我们从小到大枚举 x，并且从到小枚举 y。
// 当 x 固定时，不需要重头开始枚举所有的 y，只需要从上次结束的值开始继续从大到小枚举即可。

// 具体地：
// 定义两个指针 x 和 y，初始化 x = 1，y = 1000。
//  f(x, y) < z，那么对于任意 y' < y，都有 f(x, y') < f(x, y) < z，这说明固定 x 枚举其余 y 无法找到匹配值，那么将 x 加 1，缩小搜索范围。
//  f(x, y) > z，那么对于任意 x' < x，都有 f(x', y) > f(x, y) > z，这说明固定 y 枚举其余 x 无法找到匹配值，那么将 y 减 1，缩小搜索范围。
//  f(x, y) = z，那么记录答案，情况同1一样，将 x 加 1，由于 f(x+1, y) > f(x, y) = z ，根据情况2，再将 y 减 1。
// 不断循环直到 x>1000 或 y<1 为止，此时搜索范围为空。
var findSolution = function (customfunction, z) {
    const res = [];
    let x = 1, y = 1000; // 初始化 x 和 y 指针
    while (x <= 1000 && y >= 1) {
        const result = customfunction.f(x, y);
        if (result < z) {
            x++;
        } else if (result > z) {
            y--;
        } else {
            res.push([x, y])
            x++;
            y--;
        }
    }
    return res;
};
// 时间复杂度：O(m+n)，m 为 x 的取值范围，n 为 y 的取值范围。
// 空间复杂度：O(1)，只需要常数的空间存放若干变量。
