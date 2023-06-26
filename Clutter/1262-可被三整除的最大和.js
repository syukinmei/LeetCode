// 给你一个整数数组 nums，请你找出并返回能被三整除的元素最大和。

// 输入：nums = [3,6,5,1,8]
// 输出：18
// 解释：选出数字 3, 6, 1 和 8，它们的和是 18（可被 3 整除的最大和）。

// 输入：nums = [4]
// 输出：0
// 解释：4 不能被 3 整除，所以无法选出数字，返回 0。

// 输入：nums = [1,2,3,4,4]
// 输出：12
// 解释：选出数字 1, 3, 4 以及 4，它们的和是 12（可被 3 整除的最大和）。

// tips:
// 1 <= nums.length <= 4 * 10^4
// 1 <= nums[i] <= 10^4

/**
 * @param {number[]} nums
 * @return {number}
 */
// 方法一：贪心 + 正向思维

// 方法二：贪心 + 反向思维
// 由于数组没有负数，如果整个数组的元素和可以被3整除，那么 s 就是最大的元素和。
// 如果 s 不能被3整除，那么可以看看能否让 s 减去某些 nums[i]，使得 s 可以被3整除。
// 将数组中的数字分成三部分 a, b, c，它们分别包含所有被 3 除余 0, 1, 2 的数。
// 显然，我们可以选取所有 a 中的数字，即不需要删除。
// 对于 b 和 c 从小到大排序，进行分类讨论：
//  - 如果 s mod 3 = 1：
//      - 如果 b 不为空，那么答案可能是 s - b[0]
//      - 如果 c 中至少有两个数，那么答案可能是 s - c[0] - c[1]
//      - 以上两种情况取较大值。
//      - 如果都不存在，则返回 0。
//  - 如果 s mod 3 = 2：
//      - 如果 c 不为空，那么答案可能是 s - c[0]
//      - 如果 b 中至少有两个数，那么答案可能是 s - b[0] - b[1]
//      - 以上两种情况取较大值。
//      - 如果都不存在，则返回 0。

// 代码实现时，如果 s mod 3 = 2，那么可以交换数组 b 和 c，从而复用相同一套逻辑。
var maxSumDivThree = function (nums) {
  let sum = nums.reduce((pre, cur) => pre + cur, 0);
  if (sum % 3 === 0) return sum;

  let b = [];
  let c = [];
  for (let num of nums) {
    if (num % 3 === 1) b.push(num);
    else if (num % 3 === 2) c.push(num);
  }

  b.sort((a, b) => a - b);
  c.sort((a, b) => a - b);

  if (sum % 3 === 2) [b, c] = [c, b];
  sum = Math.max(sum - b[0] || 0, sum - c[0] - c[1] || 0);
  return sum;
};
// 时间复杂度：O(nlogn)，n 为数组 nums 的长度，对 b 和 c 进行排序需要O(nlogn)的时间。
// 空间复杂度：O(logn)，快排需要O(nlogn)的递归栈空间。

// 方法三：方法二的优化
// 由于方法二中我们只需要关注 b 和 c 中最小的两个数，所以我们可以不使用排序，而是在遍历的时候为维护这4个值即可。
// 时间复杂度：O(n)，n 为数组 nums 的长度。
// 空间复杂度：O(1)，只需要常数的空间存放若干变量。

// 方法四：动态规划
// 设 dp[i][j] 为前 i 个数中选若干个数，其模3余为 j 时的和最大值为 dp[i][j]
// 对于当前数字 nums[i] ，我们不选取它，则 dp[i][j] = dp[i-1][j]
// 选取它，则有 dp[i][j] = dp[i-1][x] + nums[i]
// x有：
//  - x + nums[i]%3 = j
//  - x = j - nums[i]%3
//  - 由于 等式右边可能为 负数，所以 x = (j - (nums[i] % 3) + 3) % 3
// 状态移动方程为：
// dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][(j - (nums[i] % 3) + 3) % 3]);
var maxSumDivThree = function (nums) {
  const n = nums.length;
  const dp = new Array(n + 1)
    .fill(0)
    .map(() => new Array(3).fill(Number.MIN_SAFE_INTEGER));
  dp[0][0] = 0;
  for (let i = 1; i <= n; i++) {
    const cur = nums[i - 1];
    for (let j = 0; j < 3; j++) {
      dp[i][j] = Math.max(
        dp[i - 1][j],
        dp[i - 1][(j - (cur % 3) + 3) % 3] + cur
      );
    }
  }
  return dp[n][0];
};
// 时间复杂度：O(nk)，n 为数组 nums 的长度，此题 k 为 3。状态规划的时间复杂度 = 状态个数 * 单个状态的计算时间。本题中状态个数为 O(nk)，单个状态的计算时间为 O(1)，因此总的时间复杂度为 O(nk)。
// 空间复杂度：O(nk)，此题 k 为 3，需要 n * k 的空间存放动态规划状态个数。

// 方法四优化：滚动数组 优化空间复杂度
// 由于 dp[i]只依赖于dp[i-1]，之前的数据没有用了。因此我们可以使用滚动数组的方式优化空间复杂度。将二维数组优化为一维数组。
var maxSumDivThree1 = function (nums) {
  // i 为 0时，一个数字都不选，其和为0，模3余0，余数为1 和 2 的都不存在，设置为负无穷。
  const dp = [0, Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER];
  for (x of nums) {
    const preDp = [...dp]; // 拷贝一份上一个状态
    for (let j = 0; j < 3; j++) {
      dp[j] = Math.max(preDp[j], preDp[(j - (x % 3) + 3) % 3] + x);
    }
  }
  return dp[0];
};
// 时间复杂度：O(nk)，同方法四。
// 空间复杂度：O(k)，此题 k 为 3，需要创建一个长度为 3 的数组存放动态规划状态。
