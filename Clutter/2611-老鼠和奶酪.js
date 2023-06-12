// 有两只老鼠和 n 块不同类型的奶酪，每块奶酪都只能被其中一只老鼠吃掉。

// 下标为 i 处的奶酪被吃掉的得分为：

//  - 如果第一只老鼠吃掉，则得分为 reward1[i] 。
//  - 如果第二只老鼠吃掉，则得分为 reward2[i] 。
// 给你一个正整数数组 reward1 ，一个正整数数组 reward2 ，和一个非负整数 k 。

// 请你返回第一只老鼠恰好吃掉 k 块奶酪的情况下，最大 得分为多少。

// 输入：reward1 = [1,1,3,4], reward2 = [4,4,1,1], k = 2
// 输出：15
// 解释：这个例子中，第一只老鼠吃掉第 2 和 3 块奶酪（下标从 0 开始），第二只老鼠吃掉第 0 和 1 块奶酪。
// 总得分为 4 + 4 + 3 + 4 = 15 。
// 15 是最高得分。

// 输入：reward1 = [1,1], reward2 = [1,1], k = 2
// 输出：2
// 解释：这个例子中，第一只老鼠吃掉第 0 和 1 块奶酪（下标从 0 开始），第二只老鼠不吃任何奶酪。
// 总得分为 1 + 1 = 2 。
// 2 是最高得分。

// tips：
// 1 <= n == reward1.length == reward2.length <= 105
// 1 <= reward1[i], reward2[i] <= 1000
// 0 <= k <= n

/**
 * @param {number[]} reward1
 * @param {number[]} reward2
 * @param {number} k
 * @return {number}
 */
// 方法一：贪心+贡献值
// 先让第二只老鼠吃所有的奶酪（答案累计sum(reward2)），第一只要吃 k 块，那么就需要第二只老鼠吐出 k 块给第一只吃。
// 如何选择这 k 块奶酪呢？吐出来的奶酪贡献值怎么算呢？
// 对于第 i 块奶酪，由于事先被第二只老鼠吃了，所以要吐出来就需要先减去 reward2[i]，再加上 reward1[i]，因此每一块奶酪如果需要吐出来给第一只老鼠吃，他的贡献值为 reward1[i] - reward2[i]
// 建立一个数组 diffs，用于存储每块奶酪的贡献值。最后将其降序排序，将前 k 块奶酪给第一只老鼠吃即可。
var miceAndCheese = function (reward1, reward2, k) {
  const n = reward1.length;
  let sum = reward2.reduce((acc, cur) => acc + cur, 0); // 结果值，初始值为所有奶酪都给第二只老鼠吃
  // 计算贡献值数组，每块奶酪让第二只老鼠吐给第一只老鼠吃的贡献值为 reward1[i] - reward2[i]
  const diff = new Array(n);
  for (let i = 0; i < n; i++) {
    diff[i] = reward1[i] - reward2[i];
  }
  diff.sort((a, b) => b - a); // 将贡献值降序排序
  // 将贡献值最高的k给奶酪分给第一只老鼠
  for (let i = 0; i < k; i++) {
    sum += diff[i];
  }
  return sum;
};
// 时间复杂度：O(nlogn)，n 为数组 reward1 和 reward2 的长度，主要为数组 diff 的排序时间消耗。
// 空间复杂度：O(logn)，n 为数组 reward1 和 reward2 的长度，需要创建一个长度为 n 的数组 diff 并进行排序，排序需要 O(nlogn) 的递归调用栈空间。
