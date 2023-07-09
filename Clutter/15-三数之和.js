// 给你一个整数数组 nums ，判断是否存在三元组 [nums[i], nums[j], nums[k]] 满足 i != j、i != k 且 j != k ，同时还满足 nums[i] + nums[j] + nums[k] == 0 。请
// 你返回所有和为 0 且不重复的三元组。
// 注意：答案中不可以包含重复的三元组。

// 输入：nums = [-1,0,1,2,-1,-4]
// 输出：[[-1,-1,2],[-1,0,1]]
// 解释：
// nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0 。
// nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0 。
// nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0 。
// 不同的三元组是 [-1,0,1] 和 [-1,-1,2] 。
// 注意，输出的顺序和三元组的顺序并不重要。

// 输入：nums = [0,1,1]
// 输出：[]
// 解释：唯一可能的三元组和不为 0 。

// 输入：nums = [0,0,0]
// 输出：[[0,0,0]]
// 解释：唯一可能的三元组和为 0 。

// 方法一：暴力枚举
// 三重循环，分别找出 i、j、k 和为0的三个数。
// 时间复杂度：O(n^3)，需要遍历三次 nums 数组。
// 空间复杂度：O(1)，只需要常数的空间存放若干变量。

// 方法二：双指针
// 由于题目要求不可以包含重复解，很容易想到将 nums 数组进行排序。
// 思考一下，如果我们已经确定了第一个数，那么寻找剩下的两个数，是不是就转为了力扣第一题 「两数之和」。
// 具体的：
// 首先对数组 nums 进行升序排序，排序后固定一个数 nums[i]，再使用左右指针指向 nums[i] 后面数组的两端。left = i + 1，right = len - 1。
// 判断三数之和 sum 是否为 0，如果是则加入结果数组中。
//  - 如果 nums[i] > 0，由于 nums 数组已经升序排序，所以 nums[left]、nums[right] 也大于0，三数之和必然无法等于0，我们之间结束循环。
//  - 如果 nums[i] === nums[i-1]，则说明该数字重复，会导致结果重复，所以应该跳过。
//  - 当 sum === 0 时，说明我们找到了一组满足条件的三元组，我们需要移动指针来跳过重复的元素，以避免得到重复的结果。
//      - left 指针右移，跳过所有与当前数相同的元素，直到找到一个不同的元素。right 指针也是同样的进行左移。这样可以确保我们不会得到重复的结果。
//  - 当 sum < 0 时，说明左指针 left 指向的元素太小了，需要将左指针右移动（left++），以增大和 sum。
//  - 当 sum > 0 时，说明右指针 right 指向的元素太大了，需要将右指针左移动（right--），以减小和 sum。
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
  nums.sort((a, b) => a - b); // nums 升序排序
  const len = nums.length;
  const res = [];
  // 从小到大遍历数组，以当前元素作为第一个数。
  for (let i = 0; i < len - 2; i++) {
    if (nums[i] > 0) break; // 如果第一个数大于0，则三数之和一定大于0，直接结束循环。

    if (i > 0 && nums[i] === nums[i - 1]) continue; // 去重

    // 使用双指针查询剩下两个数
    let left = i + 1;
    let right = len - 1;
    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];
      if (sum === 0) {
        // 满足条件，将当前三个元素加入结果集中。
        res.push([nums[i], nums[left], nums[right]]);
        // 去重
        while (left < right && nums[left] === nums[left + 1]) left++;
        while (left < right && nums[right] === nums[right - 1]) right--;
        // 移动指针
        left++;
        right--;
      } else if (sum < 0) left++; // 和小于目标值，左指针向右移动。
      else if (sum > 0) right--; // 和大于目标值，右指针向左移动。
    }
  }
  return res;
};
// 时间复杂度：O(n^2)，n 为数组 nums 的长度，排序需要 O(nlogn)的时间，搜索解需要O(n^2)，分别为外层循环确认第一个数O(n)，内层循环使用双指针解决两数之和也需要O(n)，因此总的时间复杂度为O(n^2)
// 空间复杂度：O(1)，只需要常数的空间存放若干变量。
