// 给你一个长度为 n 的二进制数组 possible 。
// Alice 和 Bob 正在玩一个有 n 个关卡的游戏，游戏中有一些关卡是 困难 模式，其他的关卡是 简单 模式。如果 possible[i] == 0 ，那么第 i 个关卡是 困难 模式。一个玩家通过一个简单模式的关卡可以获得 1 分，通过困难模式的关卡将失去 1 分。
// 游戏的一开始，Alice 将从第 0 级开始 按顺序 完成一些关卡，然后 Bob 会完成剩下的所有关卡。
// 假设两名玩家都采取最优策略，目的是 最大化 自己的得分，Alice 想知道自己 最少 需要完成多少个关卡，才能获得比 Bob 更多的分数。
// 请你返回 Alice 获得比 Bob 更多的分数所需要完成的 最少 关卡数目，如果 无法 达成，那么返回 -1 。
// 注意，每个玩家都至少需要完成 1 个关卡。

// 输入：possible = [1,0,1,0]
// 输出：1
// 解释：
// 我们来看一下 Alice 可以完成的关卡数目：
// 如果 Alice 只完成关卡 0 ，Bob 完成剩下的所有关卡，那么 Alice 获得 1 分，Bob 获得 -1 + 1 - 1 = -1 分。
// 如果 Alice 完成到关卡 1 ，Bob 完成剩下的所有关卡，那么 Alice 获得 1 - 1 = 0 分，Bob 获得 1 - 1 = 0 分。
// 如果 Alice 完成到关卡 2 ，Bob 完成剩下的所有关卡，那么 Alice 获得 1 - 1 + 1 = 1 分，Bob 获得 -1 分。
// Alice 需要完成至少一个关卡获得更多的分数。

// 输入：possible = [1,1,1,1,1]
// 输出：3
// 解释：
// 我们来看一下 Alice 可以完成的关卡数目：
// 如果 Alice 只完成关卡 0 ，Bob 完成剩下的所有关卡，那么 Alice 获得 1 分，Bob 获得 4 分。
// 如果 Alice 完成到关卡 1 ，Bob 完成剩下的所有关卡，那么 Alice 获得 2 分，Bob 获得 3 分。
// 如果 Alice 完成到关卡 2 ，Bob 完成剩下的所有关卡，那么 Alice 获得 3 分，Bob 获得 2 分。
// 如果 Alice 完成到关卡 3 ，Bob 完成剩下的所有关卡，那么 Alice 获得 4 分，Bob 获得 1 分。
// Alice 需要完成至少三个关卡获得更多的分数。

// 输入：possible = [0,0]
// 输出：-1
// 解释：
// 两名玩家只能各完成 1 个关卡，Alice 完成关卡 0 得到 -1 分，Bob 完成关卡 1 得到 -1 分。两名玩家得分相同，所以 Alice 无法得到更多分数。

// 方法一：前缀和
// 根据题意可知，每次通过简单关卡玩家得 1 分，通过困难关卡玩家失去 1 分，当 Alice 从第 i 个关卡结束时，此时 Bob 从第 i+1 个关卡开始完成剩余关卡。
// 经分析通过每个关卡的得分是确定的，那么通过 n 个关卡的游戏总得分也是固定的。
// 设通过 n 个关卡的总得分是 tot，此时 Alice 完成了前 i 个关卡的得分是 pre，Bob的得分即为 tot - pre，若要使得 Alice 得分多于 Bob，则 tot - pre < pre，即 tot < 2 * pre 即可。

// 经上分析，我们首先 需要把 0 视作 -1，计算出游戏的总得分 tot，再找出一个「最短前缀」，其元素和大于剩余元素和即可。
/**
 * @param {number[]} possible
 * @return {number}
 */
var minimumLevels = function (possible) {
    const n = possible.length;

    const tot = possible.reduce((acc, x) => acc + (x === 0 ? -1 : 1), 0); // 计算通过 n 个关卡的总得分

    let pre = 0; // 前缀和，即 Alice 的游戏得分
    for (let i = 0; i < n - 1; i++) {
        pre += possible[i] === 0 ? -1 : 1;
        if (tot < 2 * pre) return i + 1; // 返回关卡数
    }

    // 不存在满足条件的 i，返回 -1。
    return -1;
};
// 时间复杂度：O(n)，n 为数组 possible 的长度，需要对 possible 进行 2 次遍历。分别求总和和前缀和。
// 空间复杂度：O(1)，只需要常数的空间存放若干变量。
