// Alice 和 Bob 轮流玩一个游戏，Alice 先手。

// 一堆石子里总共有 n 个石子，轮到某个玩家时，他可以 移出 一个石子并得到这个石子的价值。Alice 和 Bob 对石子价值有 不一样的的评判标准 。双方都知道对方的评判标准。

// 给你两个长度为 n 的整数数组 aliceValues 和 bobValues 。aliceValues[i] 和 bobValues[i] 分别表示 Alice 和 Bob 认为第 i 个石子的价值。

// 所有石子都被取完后，得分较高的人为胜者。如果两个玩家得分相同，那么为平局。两位玩家都会采用 最优策略 进行游戏。

// 请你推断游戏的结果，用如下的方式表示：

//  - 如果 Alice 赢，返回 1 。
//  - 如果 Bob 赢，返回 -1 。
//  - 如果游戏平局，返回 0 。

// 输入：aliceValues = [1,3], bobValues = [2,1]
// 输出：1
// 解释：
// 如果 Alice 拿石子 1 （下标从 0开始），那么 Alice 可以得到 3 分。
// Bob 只能选择石子 0 ，得到 2 分。
// Alice 获胜。

// 输入：aliceValues = [1,2], bobValues = [3,1]
// 输出：0
// 解释：
// Alice 拿石子 0 ， Bob 拿石子 1 ，他们得分都为 1 分。
// 打平。

// 输入：aliceValues = [2,4,3], bobValues = [1,6,7]
// 输出：-1
// 解释：
// 不管 Alice 怎么操作，Bob 都可以得到比 Alice 更高的得分。
// 比方说，Alice 拿石子 1 ，Bob 拿石子 2 ， Alice 拿石子 0 ，Alice 会得到 6 分而 Bob 得分为 7 分。
// Bob 会获胜。

// 方法一：贪心 + 排序
// 题目说两位玩家都会采取 「最优策略」 进行游戏，那么关键点就在于什么是最优策略？
// 是每次都取走自己能取到的最大得分吗？并不是！
// 作为玩家，我们目标不仅是自己得分最高，还需要同时要对手得分低。因此，玩家每次选择的是那些 双方得分都高的石头，在自己得到高分的同时抑制对手的得分。
// 因此，我们可以根据每个石头的价值进行排序，两位玩家依次取走综合得分最高的石头，最后比较得分。

// 证明：
// 假如有 2 个石头 i 和 j，Alice 和 Bob 认为它们的价值分别为 ai, bi 和 aj, bj。
//  - 如果 Alice 先选择了 i，而 Bob 只能选 j，则它们的分差为 ai - bj；
//  - 如果 Alice 先选择了 j，而 Bob 只能选 i，则它们的分差为 aj - bi；
// 对于 Alice 来说，这两种方案，选取哪种取决于两个分差的差值，即 (ai - bj) - (aj - bi) = (ai + bi) - (aj + bj)
//  - 当差值 >0 时，Alice 会选 i，<0 时会选 j。因此 Alice 在选择时，会优先选择 (ai + bi) 大的石头。

// 具体的：
// 只需要将两个数组 aliceValue 和 bobValue 对应的元素相加后升序排序，然后让 Alice 和 Bob 依次选取，最后计算两人的分数和后进行比较返回结果即可。

/**
 * @param {number[]} aliceValues
 * @param {number[]} bobValues
 * @return {number}
 */
var stoneGameVI = function (aliceValues, bobValues) {
    // step1：计算石头价值和并升序排序
    const n = aliceValues.length;

    // valusSumAndIndex[i] 存储第 i 个石头的价值和其索引
    const valusSumAndIndex = new Array(n)
        .fill(0)
        .map(() => new Array(2).fill(0));

    for (let i = 0; i < n; i++) {
        valusSumAndIndex[i] = [aliceValues[i] + bobValues[i], i];
    }

    valusSumAndIndex.sort((a, b) => b[0] - a[0]); // 根据价值降排序

    // step2：依次获取石头的价值。
    let scoreA = 0; // Alice 的分数
    let scoreB = 0; // Bob 的分数
    // 根据价值依次获取得分
    for (let i = 0; i < n; i++) {
        const stoneIndex = valusSumAndIndex[i][1];
        // Alice 先手，获取偶数下标
        if ((i & 1) === 0) {
            scoreA += aliceValues[stoneIndex];
        } else {
            scoreB += bobValues[stoneIndex];
        }
    }

    // step3：比较结果
    if (scoreA === scoreB) return 0;
    else if (scoreA > scoreB) return 1;
    else if (scoreA < scoreB) return -1;
};
// 时间复杂度：O(nlogn)，需要进行一次排序，排序需要 O(nlogn)。
// 空间复杂度：O(n)，为额外数组 valusSumAndIndex 的空间开销。
