// 给你一个下标从 0 开始的正整数数组 nums 。请你找出并统计满足下述条件的三元组 (i, j, k) 的数目：

//  - 0 <= i < j < k < nums.length
//  - nums[i]、nums[j] 和 nums[k] 两两不同 。
//    - 换句话说：nums[i] != nums[j]、nums[i] != nums[k] 且 nums[j] != nums[k] 。
// 返回满足上述条件三元组的数目。

// 输入：nums = [4,4,2,4,3]
// 输出：3
// 解释：下面列出的三元组均满足题目条件：
// - (0, 2, 4) 因为 4 != 2 != 3
// - (1, 2, 4) 因为 4 != 2 != 3
// - (2, 3, 4) 因为 2 != 4 != 3
// 共计 3 个三元组，返回 3 。
// 注意 (2, 0, 4) 不是有效的三元组，因为 2 > 0 。

// 输入：nums = [1,1,1,1,1]
// 输出：0
// 解释：不存在满足条件的三元组，所以返回 0 。

/**
 * @param {number[]} nums
 * @return {number}
 */
// 方法一：枚举
// 记数组 nums 的长度为 n，使用三重循环，枚举所有 0 <= i < k < j < n 的三元组，判断三个元素是否满足两两不同，如果满足，则将结果加 1。
// 代码略...
// 时间复杂度：O(n^3)，n 为数组 nums 的长度。
// 空间复杂度：O(1)，只需要常数的空间存放若干变量。

// 方法二：排序
// 由于数组元素的相对顺序不影响结果，因此我们可以将数组 nums 从小到大排序。排序后，数组中相同元素一定是相邻的。
// 我们以某一堆 [i, j) 相同的数 x，作为三元组的中间元素，x 的左边有 i 个小于 x 的元素，右边有 n-j 个元素大于 x。
// 那么，以 x 作为中间元素的符合条件的三元组数量，即 x 对答案的贡献值为：
//   i * (j - i) * (n - j)
// 随后累计所有元素的贡献值，得到答案即可。
var unequalTriplets = function (nums) {
  nums.sort();
  let count = 0;
  const n = nums.length;
  for (let i = 0, j = 1; i < n; i = j) {
    while (j < n && nums[i] === nums[j]) {
      j++;
    }
    // 计算以 nums[i] 作为中间元素的符合条件的三元组数量，并累加到计数器中。
    count += i * (j - i) * (n - j);
  }
  return count;
};
// 时间复杂度：O(nlogn)，n 为数组 nums 的长度，主要为排序所需的时间。
// 空间复杂度：O(logn)，排序需要 O(logn) 的递归调用栈空间。

// 方法三：哈希表
// 类似于方案2，我们使用哈希表 cntMap 记录每个元素的数目，key 为元素，value 为元素的个数。
// 遍历哈希表，记录当前遍历的元素数目 curCnt，先前遍历的元素总数为 preCnt，那么以当前遍历的元素为中间元素的符合条件的三元组的数目为：
//   preCnt * curCnt * (n - curCnt - preCnt)
// 随后和方案2一样，对所有元素累计他们的贡献值
var unequalTriplets = function (nums) {
  // 创建一个哈希表，用于存储每个数字出现的次数
  const cntMap = new Map();
  for (let num of nums) {
    cntMap.set(num, (cntMap.get(num) ?? 0) + 1);
  }

  let count = 0;
  let preCnt = 0;
  const n = nums.length;
  // 遍历哈希表，计算每个元素为中间元素的符合条件的三元组数量，并累加到计数器中。
  for (let curCnt of cntMap.values()) {
    count += preCnt * curCnt * (n - preCnt - curCnt);

    preCnt += curCnt; // 更新 preCnt
  }
  return count;
};
// 时间复杂度：O(n)，n 为数组 nums 的长度，需要对其进行一次遍历用于构建哈希表。
// 空间复杂度：O(n)，构建哈希表所需的空间消耗。
