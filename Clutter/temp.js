var maxSumAfterPartitioning = function (nums, m) {
  const n = nums.length;
  const dp = new Array(n + 1).fill(0); // 初始化动态规划数组
  for (let i = 1; i <= m; i++) {
    // 遍历分割次数
    let max = 0;
    for (let j = i - 1; j < n; j++) {
      // 遍历数组
      max = Math.max(max, nums[j]); // 记录当前分割区间的最大值
      dp[j + 1] = Math.max(dp[j + 1], dp[j - i + 1] + max * i); // 更新动态规划数组
    }
  }
  return dp[n]; // 返回最终结果
};

console.log(maxSumAfterPartitioning([1, 15, 7, 9, 2, 5, 10], 3));
