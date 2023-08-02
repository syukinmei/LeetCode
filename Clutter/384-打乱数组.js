// 给你一个整数数组 nums ，设计算法来打乱一个没有重复元素的数组。打乱后，数组的所有排列应该是 等可能 的。
// 实现 Solution class:
// Solution(int[] nums) 使用整数数组 nums 初始化对象
// int[] reset() 重设数组到它的初始状态并返回
// int[] shuffle() 返回数组随机打乱后的结果

// 输入
// ["Solution", "shuffle", "reset", "shuffle"]
// [[[1, 2, 3]], [], [], []]
// 输出
// [null, [3, 1, 2], [1, 2, 3], [1, 3, 2]]

// 解释
// Solution solution = new Solution([1, 2, 3]);
// solution.shuffle();    // 打乱数组 [1,2,3] 并返回结果。任何 [1,2,3]的排列返回的概率应该相同。例如，返回 [3, 1, 2]
// solution.reset();      // 重设数组到它的初始状态 [1, 2, 3] 。返回 [1, 2, 3]
// solution.shuffle();    // 随机返回数组 [1, 2, 3] 打乱后的结果。例如，返回 [1, 3, 2]


// 方法一：Fisher-Yates 洗牌算法
/**
 * @param {number[]} nums
 */
var Solution = function (nums) {
  this.nums = nums;
  this.original = [...nums]; // 存储原始结构
};

/**
 * @return {number[]}
 */
Solution.prototype.reset = function () {
  this.nums = [...this.original];
  return this.nums;
};

/**
 * 洗牌算法
 * @return {number[]}
 */
Solution.prototype.shuffle = function () {
  const len = this.nums.length;
  for (let i = 0; i < len; i++) {
    const idx = Math.floor(Math.random() * (len - i));
    [this.nums[len - 1 - i], this.nums[idx]] = [
      this.nums[idx],
      this.nums[len - 1 - i],
    ];
  }
  return this.nums;
};

/**
 * Your Solution object will be instantiated and called as such:
 * var obj = new Solution(nums)
 * var param_1 = obj.reset()
 * var param_2 = obj.shuffle()
 */

// 时间复杂度：
//  -   初始化：O(n)，需要遍历 nums 数组生成原始数组 original。
//  -   reset：O(n)，需要遍历 nums 数组将其重置为原始数组。
//  - shuffle：O(n)，需要遍历 nums 数组将其打乱。
// 空间复杂度：O(n)，需要 original 存储初始状态。
