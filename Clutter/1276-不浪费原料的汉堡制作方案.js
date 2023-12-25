// 圣诞活动预热开始啦，汉堡店推出了全新的汉堡套餐。为了避免浪费原料，请你帮他们制定合适的制作计划。

// 给你两个整数 tomatoSlices 和 cheeseSlices，分别表示番茄片和奶酪片的数目。不同汉堡的原料搭配如下：

// 巨无霸汉堡：4 片番茄和 1 片奶酪
// 小皇堡：2 片番茄和 1 片奶酪
// 请你以 [total_jumbo, total_small]（[巨无霸汉堡总数，小皇堡总数]）的格式返回恰当的制作方案，使得剩下的番茄片 tomatoSlices 和奶酪片 cheeseSlices 的数量都是 0。

// 如果无法使剩下的番茄片 tomatoSlices 和奶酪片 cheeseSlices 的数量为 0，就请返回 []。

// 输入：tomatoSlices = 16, cheeseSlices = 7
// 输出：[1,6]
// 解释：制作 1 个巨无霸汉堡和 6 个小皇堡需要 4*1 + 2*6 = 16 片番茄和 1 + 6 = 7 片奶酪。不会剩下原料。

// 输入：tomatoSlices = 17, cheeseSlices = 4
// 输出：[]
// 解释：只制作小皇堡和巨无霸汉堡无法用光全部原料。

// 输入：tomatoSlices = 4, cheeseSlices = 17
// 输出：[]
// 解释：制作 1 个巨无霸汉堡会剩下 16 片奶酪，制作 2 个小皇堡会剩下 15 片奶酪。

// 输入：tomatoSlices = 0, cheeseSlices = 0
// 输出：[0,0]

// 输入：tomatoSlices = 2, cheeseSlices = 1
// 输出：[0,1]

// 方法一：数学
// 根据题目要求，我们需要制定合适的制作计划，使得剩下的番茄片和奶酪片的数量都是0。我们可以通过数学推导来解决这个问题。

// 假设巨无霸汉堡有 x 个，小皇堡有 y 个，由于所有材料都需要用完，因此我们可以得到二元一次方程：
//  - 4x + 2y = tomatoSlices
//  - x + y = cheeseSlices

// 两式转换，可以得到：
//  - y = (4 * cheeseSlices - 输入：tomatoSlices) / 2
//  - x = cheeseSlices - y

// 根据题意，x， y >= 0 且 x, y 属于非负整数，则满足题意，答案为 [x, y]
// 否则无解，返回 []。

/**
 * @param {number} tomatoSlices
 * @param {number} cheeseSlices
 * @return {number[]}
 */
var numOfBurgers = function (tomatoSlices, cheeseSlices) {
    const jumbo = (tomatoSlices - 2 * cheeseSlices) / 2;
    const small = cheeseSlices - jumbo;

    // jumb 和 small 是否是非负整数
    if (isNonNegativeInteger(jumbo) && isNonNegativeInteger(small)) {
        return [jumbo, small];
    } else {
        return [];
    }
};

// 辅助函数
// 判断是否为非负整数
function isNonNegativeInteger(value) {
    return Number.isInteger(value) && value >= 0;
}
// 时间复杂度：O(1)。
// 空间复杂度：O(1)，只需要常数的空间存放若干变量。
