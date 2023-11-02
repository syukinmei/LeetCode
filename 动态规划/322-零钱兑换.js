// 给你一个整数数组 coins ，表示不同面额的硬币；以及一个整数 amount ，表示总金额。
// 计算并返回可以凑成总金额所需的 最少的硬币个数 。如果没有任何一种硬币组合能组成总金额，返回 -1 。
// 你可以认为每种硬币的数量是无限的。

// 输入：coins = [1, 2, 5], amount = 11
// 输出：3
// 解释：11 = 5 + 5 + 1

// 输入：coins = [2], amount = 3
// 输出：-1

// 输入：coins = [1], amount = 0
// 输出：0

// 方法一：动态规划
// 思路：
// 假设我们手头有 1, 2 ,5 种面值硬币需要凑 11 元。如果已知凑出 10, 9, 6 的最少硬币数(子问题)。那么我们只需要把子问题的结果加上 1 即可(再选一枚面值1, 2, 5面值的硬币)。

// 具体的：
// 定义 dp[i] 表示 当前目标金额为 i 时，至少需要 dp[i] 枚硬币凑成。

// 如已知 凑出金额 i - coins[j] 的最少硬币数为 dp[i - coins[j]]
// 那么只需要再加上一个硬币 coins[i] 即 dp[i - coins[j]] + 1 就是 dp[i]
// 所以 dp[i] 要取所以 dp[i - coins[j]] 中最小的，因此状态移动方程为：
//  - dp[i] = min(dp[i - coins[j]] + 1, dp[i])

// 最终答案为 dp[amount] 或者 -1

/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function (coins, amount) {
  // 初始化dp数组
  // 注意：题目要求最小值，所以初始化dp数组中需要填充一个较大值，题目规定硬币最小面额为1，因此所需的硬币数最多为 amount，而 amount + 1 就是"最大值"的下限
  const dp = new Array(amount + 1).fill(amount + 1);

  dp[0] = 0; // 金额为 0 时，是不需要硬币

  // 遍历每个金额，计算所需的最小硬币数
  for (let i = 1; i <= amount; i++) {
    // 遍历每种金额的硬币
    for (const coin of coins) {
      // 如果当前硬币的面值小于等于当前金额
      if (coin > i) continue;
      // 更新所需的最小硬币数量
      dp[i] = Math.min(dp[i - coin] + 1, dp[i]);
    }
  }

  // 如果最后的值仍然是 amount+1  表示无法凑出目标金额，返回 -1
  return dp[amount] === amount + 1 ? -1 : dp[amount];
};
// 时间复杂度：O(amount*n)，n 为 coins 的长度，及硬币面额数。需要计算 amount 个状态用于动态规划，每个状态需要枚举 n 个面额来转移状态，所以一共需要 O(amount*n) 的时间复杂度。
// 空间复杂度：O(n)，n 为需要凑出的总金额 amount，作为dp数组的空间开销。
