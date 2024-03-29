// 如果一个数列由至少两个元素组成，且每两个连续元素之间的差值都相同，那么这个序列就是 等差数列 。更正式地，数列 s 是等差数列，只需要满足：对于每个有效的 i ， s[i+1] - s[i] == s[1] - s[0] 都成立。

// 例如，下面这些都是 等差数列 ：
// 1, 3, 5, 7, 9
// 7, 7, 7, 7
// 3, -1, -5, -9

// 下面的数列 不是等差数列 ：
// 1, 1, 2, 5, 7

// 给你一个由 n 个整数组成的数组 nums，和两个由 m 个整数组成的数组 l 和 r，后两个数组表示 m 组范围查询，其中第 i 个查询对应范围 [l[i], r[i]] 。所有数组的下标都是 从 0 开始 的。
// 返回 boolean 元素构成的答案列表 answer 。如果子数组 nums[l[i]], nums[l[i]+1], ... , nums[r[i]] 可以 重新排列 形成 等差数列 ，answer[i] 的值就是 true；否则answer[i] 的值就是 false 。

// 输入：nums = [4,6,5,9,3,7], l = [0,0,2], r = [2,3,5]
// 输出：[true,false,true]
// 解释：
// 第 0 个查询，对应子数组 [4,6,5] 。可以重新排列为等差数列 [6,5,4] 。
// 第 1 个查询，对应子数组 [4,6,5,9] 。无法重新排列形成等差数列。
// 第 2 个查询，对应子数组 [5,9,3,7] 。可以重新排列为等差数列 [3,5,7,9] 。

// 输入：nums = [-12,-9,-3,-12,-6,15,20,-25,-20,-15,-10], l = [0,1,6,4,8,7], r = [4,4,9,7,9,10]
// 输出：[false,true,false,false,true,true]

// 提示：
// n == nums.length
// m == l.length
// m == r.length
// 2 <= n <= 500
// 1 <= m <= 500
// 0 <= l[i] < r[i] < n
// -105 <= nums[i] <= 105

/**
 * @param {number[]} nums
 * @param {number[]} l
 * @param {number[]} r
 * @return {boolean[]}
 */
// 方法一：模拟
// 枚举每个子数组，查看是否可以重新排列成等差数组。
// 具体的：对每个子数组进行排序，遍历一次，判断相邻两个元素的差值是否保持不变。
var checkArithmeticSubarrays = function (nums, l, r) {
  // 遍历每个查询范围
  const n = l.length;
  const ans = new Array(n).fill(true);
  for (let i = 0; i < n; i++) {
    let len = r[i] - l[i] + 1;
    let subArr = nums.slice(l[i], r[i] + 1); // 获取子数组
    subArr.sort((a, b) => a - b); // 对子数组进行升序排序
    // 判断子数组相邻两个元素的差值是否相等
    const diff = subArr[1] - subArr[0];
    for (let j = 1; j < len - 1; j++) {
      if (subArr[j + 1] - subArr[j] !== diff) ans[i] = false;
    }
  }
  return ans;
};

// 方法二：枚举（优化）
// 对于每个查询范围 [l[i], r[i]] 找出其中的最小值 minV 和最大值 maxV。
//  1 - 如果 minV 等于 maxV，说明子数组中所有元素相等，则该子数组是公差为 0 的等差数列。
//  2 - 如果不相等，计算子数组中最大值和最小值的差值 d，如果 d 不能整除子数组元素数量，则该子数组不能重新排列成等差数组。
//  3 - 否则，则遍历子数组中所有元素，计算每个元素和 minV 的差值，如果每个元素和minV的差不能被 d 整除，那么该子数组不是等差数组。
//  4 - 否则，计算该元素在等差数列的索引位置 t，如果该位置已被计算过，那么该子数组也不能重新排列成等差数组。
// 最后返回所有查询范围对应的子数组是否为等差数组即可。