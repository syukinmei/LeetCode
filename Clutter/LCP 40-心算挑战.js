// 「力扣挑战赛」心算项目的挑战比赛中，要求选手从 N 张卡牌中选出 cnt 张卡牌，若这 cnt 张卡牌数字总和为偶数，则选手成绩「有效」且得分为 cnt 张卡牌数字总和。
// 给定数组 cards 和 cnt，其中 cards[i] 表示第 i 张卡牌上的数字。 请帮参赛选手计算最大的有效得分。若不存在获取有效得分的卡牌方案，则返回 0。

// 输入：cards = [1,2,8,9], cnt = 3
// 输出：18
// 解释：选择数字为 1、8、9 的这三张卡牌，此时可获得最大的有效得分 1+8+9=18。

// 输入：cards = [3,3,1], cnt = 1
// 输出：0
// 解释：不存在获取有效得分的卡牌方案。

// 方法一：排序 + 贪心
// 为了选取尽量大的数，将 cards 从大到小排序，并累加前 cnt 个数，记作 s。
// 分类讨论：
//  - 如果 s 为偶数，这是我们能得到的最大的有效得分，直接返回 s 。
//  - 如果 s 为奇数，我们可以：
//      - 从前 cnt 个数中去掉一个最小的奇数，然后从 n - cnt 中加进来一个最大的偶数，这样得分就变成了偶数。
//      - 从前 cnt 个数中去掉一个最小的偶数，然后从 n - cnt 中加进来一个最大的奇数，这样得分就变成了偶数。
//      - 两种情况取最大值。
/**
 * @param {number[]} cards
 * @param {number} cnt
 * @return {number}
 */
var maxmiumScore = function (cards, cnt) {
    let sum = 0;
    // 用于记录最大的 cnt 张排中最小的奇数和偶数
    let minOdd = -1;
    let minEven = -1;

    cards.sort((a, b) => b - a); // 将卡牌根据面值降序排序

    // 计算最大的 cnt 张牌的和
    for (let i = 0; i < cnt; i++) {
        sum += cards[i];

        if (cards[i] & 1) minOdd = cards[i];
        else minEven = cards[i];
    }

    // 如果和为偶数，直接返回
    if ((sum & 1) === 0) return sum;

    // 如果和为奇数，尝试去掉一个最小的奇数，然后加进来一个最大的偶数，或者去掉一个最小的偶数，然后加进来一个最大的奇数
    let ans = 0;
    for (let i = cnt; i < cards.length; i++) {
        // 奇数 - 当前遇到了教大的奇数，去掉前 cnt 个数中的最小偶数，然后将这个奇数加入其中
        if ((cards[i] & 1) === 1 && minEven !== -1) {
            ans = Math.max(ans, sum - minEven + cards[i]);
        }
        // 偶数 - 当前遇到了教大的偶数，去掉前 cnt 个数中的最小奇数，然后将这个偶数加入其中
        if ((cards[i] & 1) === 0 && minOdd !== -1) {
            ans = Math.max(ans, sum - minOdd + cards[i]);
        }
    }

    return ans;
};
// 时间复杂度：O(nlogn)，n 为数组 cards 的长度。排序需要 O(nlogn)的时间，构建最大的有效得分需要对 cards 进行一次遍历，时间复杂度为O(n)，因此总的时间复杂度为 O(nlogn)。
// 空间复杂度：O(logn)，快排需要 O(logn)的递归栈空间。
