// 给你一个由 n 个整数组成的数组 nums ，和一个目标值 target 。请你找出并返回满足下述全部条件且不重复的四元组 [nums[a], nums[b], nums[c], nums[d]] （若两个四元组元素一一对应，则认为两个四元组重复）：

//  - 0 <= a, b, c, d < n
//  - a、b、c 和 d 互不相同
//  - nums[a] + nums[b] + nums[c] + nums[d] == target
// 你可以按 任意顺序 返回答案 。

// 输入：nums = [1,0,-1,0,-2,2], target = 0
// 输出：[[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]

// 输入：nums = [2,2,2,2,2], target = 8
// 输出：[[2,2,2,2]]

// 提示：
//  - 1 <= nums.length <= 200
//  - -109 <= nums[i] <= 109
//  - -109 <= target <= 109

// 方法一：排序+双指针
// 三数之和我们的的做法是确定第一个数，寻找剩下的两个数。同样的，我们可以枚举确定前两个数，然后双指针寻找剩下的两个数。
// 为例避免枚举重复四元组，需要保证每一重循环中不能枚举相同的元素。
// 除此之外，还需要做一些剪枝操作：
//  - 确定第一个元素 nums[k] 后，如果 nums[k] + nums[k + 1] + nums[k + 2] + nums[k + 3] > target，nums 数组已经排序，所以此时剩下三个数无论取什么值，四数之和一定大于 target，因此需要 break 退出第一重循环。
//  - 确定第一个元素 nums[k] 后，如果 nums[k] + nums[n - 1] + nums[n - 2] + nums[n - 3] < target，nums 数组已经排序，所以此时剩下三个数无论取什么值，四数之和一定小于 target，因此需要 continue 跳过本轮循环，枚举 nums[k+1]。

//  - 确定前两个数 nums[k]、nums[i] 后，如果 nums[k] + nums[i] + nums[i + 1] + nums[i + 2] > target，nums 数组已经排序，所以此时剩下两个数无论取什么值，四数之和一定大于 target，因此需要 break 退出二重循环。
//  - 确定前两个数 nums[k]、nums[i] 后，如果 nums[k] + nums[i] + nums[n - 1] + nums[n - 2] < target，nums 数组已经排序，所以此剩下两个数无论取什么值，四数之和一定小于 target，因此需要 continue 跳过本轮循环，枚举 nums[i+1]。

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
var fourSum = function (nums, target) {
  const n = nums.length;
  if (n < 4) return [];
  nums.sort((a, b) => a - b); // nums 升序排序
  const res = [];
  for (let k = 0; k < n - 3; k++) {
    if (k > 0 && nums[k] === nums[k - 1]) continue; // 去重
    if (nums[k] + nums[k + 1] + nums[k + 2] + nums[k + 3] > target) break; // 剪枝
    if (nums[k] + nums[n - 1] + nums[n - 2] + nums[n - 3] < target) continue; // 剪枝，枚举 nums[k+1]

    for (let i = k + 1; i < n - 2; i++) {
      if (i > k + 1 && nums[i] === nums[i - 1]) continue; // 二级去重
      if (nums[k] + nums[i] + nums[i + 1] + nums[i + 2] > target) break; // 二级剪枝
      if (nums[k] + nums[i] + nums[n - 1] + nums[n - 2] < target) continue; // 二级剪枝，枚举 nums[i+1]

      // 使用双指针查询剩下两个数
      let left = i + 1;
      let right = n - 1;
      while (left < right) {
        const sum = nums[k] + nums[i] + nums[left] + nums[right];
        if (sum === target) {
          res.push([nums[k], nums[i], nums[left], nums[right]]);
          // 三级去重
          while (left < right && nums[left] === nums[left + 1]) left++;
          while (left < right && nums[right] === nums[right - 1]) right--;
          // 移动指针
          left++;
          right--;
        } else if (sum < target) left++;
        else if (sum > target) right--;
      }
    }
  }
  return res;
};
// 时间复杂度：O(n^3)，n 为数组 nums 的长度，排序需要 O(nlogn)的时间，搜索解需要O(n^3)，分别为第一重循环确认第一个数O(n)，第二重循环确定第二个数O(n)，第三重循环使用双指针解决三数之和也需要O(n)，因此总的时间复杂度为O(n^3)。
// 空间复杂度：O(logn)，排序需要O(logn)的递归栈空间。
