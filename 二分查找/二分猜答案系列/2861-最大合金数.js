// 假设你是一家合金制造公司的老板，你的公司使用多种金属来制造合金。现在共有 n 种不同类型的金属可以使用，并且你可以使用 k 台机器来制造合金。每台机器都需要特定数量的每种金属来创建合金。
// 对于第 i 台机器而言，创建合金需要 composition[i][j] 份 j 类型金属。最初，你拥有 stock[i] 份 i 类型金属，而每购入一份 i 类型金属需要花费 cost[i] 的金钱。
// 给你整数 n、k、budget，下标从 1 开始的二维数组 composition，两个下标从 1 开始的数组 stock 和 cost，请你在预算不超过 budget 金钱的前提下，最大化 公司制造合金的数量。
// 所有合金都需要由同一台机器制造。
// 返回公司可以制造的最大合金数。

// 输入：n = 3, k = 2, budget = 15, composition = [[1,1,1],[1,1,10]], stock = [0,0,0], cost = [1,2,3]
// 输出：2
// 解释：最优的方法是使用第 1 台机器来制造合金。
// 要想制造 2 份合金，我们需要购买：
// - 2 份第 1 类金属。
// - 2 份第 2 类金属。
// - 2 份第 3 类金属。
// 总共需要 2 * 1 + 2 * 2 + 2 * 3 = 12 的金钱，小于等于预算 15 。
// 注意，我们最开始时候没有任何一类金属，所以必须买齐所有需要的金属。
// 可以证明在示例条件下最多可以制造 2 份合金。

// 输入：n = 3, k = 2, budget = 15, composition = [[1,1,1],[1,1,10]], stock = [0,0,100], cost = [1,2,3]
// 输出：5
// 解释：最优的方法是使用第 2 台机器来制造合金。
// 要想制造 5 份合金，我们需要购买：
// - 5 份第 1 类金属。
// - 5 份第 2 类金属。
// - 0 份第 3 类金属。
// 总共需要 5 * 1 + 5 * 2 + 0 * 3 = 15 的金钱，小于等于预算 15 。
// 可以证明在示例条件下最多可以制造 5 份合金。

// 输入：n = 2, k = 3, budget = 10, composition = [[2,1],[1,2],[1,1]], stock = [1,1], cost = [5,5]
// 输出：2
// 解释：最优的方法是使用第 3 台机器来制造合金。
// 要想制造 2 份合金，我们需要购买：
// - 1 份第 1 类金属。
// - 1 份第 2 类金属。
// 总共需要 1 * 5 + 1 * 5 = 10 的金钱，小于等于预算 10 。
// 可以证明在示例条件下最多可以制造 2 份合金。

// 提示：
// 1 <= n, k <= 100
// 0 <= budget <= 10^8
// composition.length == k
// composition[i].length == n
// 1 <= composition[i][j] <= 100
// stock.length == cost.length == n
// 0 <= stock[i] <= 10^8
// 1 <= cost[i] <= 100

// 阅读理解题，题意读懂了一眼能看出是二分答案。

// 方法一：二分答案
// 假设要制造 x 份合金，由于 x 越小，花费的钱越少，x 越多，花费的钱越多，有单调性，可以二分。
// 更简单点的说，可以制造 x 份合金，就一定可以制造 x - 1 份。因此存在一个 max(x) ，使得可以制造数量小于等于 max(x) 的合金，但是无法制造数量大于等于 max(x) 的合金。
// 即拥有单调性，又拥有二段性，显然我们可以使用 二分答案找到这个 max(x)。

// 二分 x 的时候，如何判断是否可以制造 x 份合金呢？由于题目要求 「所有合金都需要由同一台机器制造」，这样就简单了，挨个判断每台机器最多可以制造多少份合金。
// 对于第 i 台机器以及第 j 种金属，它需要的数量为 composition[i][j] * x ，当前已拥有 stock[j]，因此额外还需要：
//      max(composition[i][j] * x - stock[j], 0) * cost[j]
// 的价格补齐缺少的部分。我们将所有的金属需要点价格相加。
//  - 如果不超过给定的 budget，那么可以制造 x 份合金，并修改二分查找的左边界。
//  - 反之，无法制造 x 份合金，修改二分查找的右边界。

// 初始化左右边界，分别为问题的可能解的最小值和最大值。
// left 为 1，最小的可能合金数量为 1。
// 关于 right，机器耗材越少，材料越便宜，则可以制造的合金就越多，假设 composition[i][j] 和 cost[j] 都为 1，此时可以制造最多的合金个数为 min(stock) + budget

/**
 * @param {number} n
 * @param {number} k
 * @param {number} budget
 * @param {number[][]} composition
 * @param {number[]} stock
 * @param {number[]} cost
 * @return {number}
 */
var maxNumberOfAlloys = function (n, k, budget, composition, stock, cost) {
    let left = 0,
        right = Math.min(...stock) + budget; // 定义左右边界
    let ans = 0;
    while (left <= right) {
        let mid = left + ((right - left) >> 1);
        if (checkCanCompleted(mid, n, k, budget, composition, stock, cost)) {
            ans = mid;
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return ans;
};

/**
 * 计算当前条件生产指定个合金是否可以完成
 * @return {boolean} 当前条件生产 count 个合金是否可以完成
 */
const checkCanCompleted = (count, n, k, budget, composition, stock, cost) => {
    // 遍历每台机器，计算是否可以生存 mid 个合金的机器
    for (let i = 0; i < k; i++) {
        let amount = 0;
        // 计算使用当前机器制造 mid 个合金所需花费
        for (let j = 0; j < n; j++) {
            amount +=
                Math.max(composition[i][j] * count - stock[j], 0) * cost[j];
        }
        if (amount <= budget) return true;
    }
    return false;
};
// 时间复杂度：O(nklogC)，C 为 答案的范围，二分查找需要点次数为 logC 次，每次需要 O(nk) 的时间进行判断，因此总的时间复杂度为 O(nklogC)。
// 空间复杂度：O(1)，只需要常数的空间存放若干变量。
