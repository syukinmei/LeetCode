// 给定两个长度相等的数组 nums1 和 nums2，nums1 相对于 nums2 的优势可以用满足 nums1[i] > nums2[i] 的索引 i 的数目来描述。
// 返回 nums1 的任意排列，使其相对于 nums2 的优势最大化。

// 输入：nums1 = [2,7,11,15], nums2 = [1,10,4,11]
// 输出：[2,11,7,15]

// 输入：nums1 = [12,24,8,32], nums2 = [13,25,32,11]
// 输出：[24,32,8,12]

// 可以把这个题目意思理解成：nums1就是田忌的马，nums2就是齐王的马，数组中的元素就是马的战斗力
// 将齐王和田忌的马匹按照战斗力排序，然后按照排名一一对比，如果田忌的马能赢，那就去赢下比赛，如果不能赢，就换个垫底的来送人头，保存实力。
// 但是 nums2 中元素的顺序是不能改变的，因为计算出战的顺序依赖 nums2 的顺序，所以我们不能直接对 nums2 进行排序，可以创建一个下标数组 idxs ，对 idxs 进行排序，即 idxs[0] 对应 nums2 中最大值的下标，idxs[1] 对应 nums2 中第二大值的下标，......。
// 使用双指针 i，j 分别指向 nums1 中的最大值和最小值

// 遍历 idxs 中的每个下标 idx，有 ：
//  - nums1[i] 表示 田忌战力最强马匹
//  - nums1[j] 表示 田忌战力最弱马匹
//  - nums2[idx] 表示 齐王战力最强马匹

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var advantageCount = function (nums1, nums2) {
  const idxs = new Array(nums2.length).fill(0).map((_, i) => i);
  idxs.sort((a, b) => nums2[b] - nums2[a]);
  nums1.sort((a, b) => b - a);
  // 定义双指针
  let i = 0;
  let j = nums1.length - 1;

  const res = []; // 存放结果值，即是排序后的数组。

  for (let idx of idxs) {
    if (nums2[idx] >= nums1[i]) {
      // 比不过，战力低的去送人头
      res[idx] = nums1[j];
      j--;
    } else {
      // 比得过
      res[idx] = nums1[i];
      i++;
    }
  }
  return res;
};
// 时间复杂度：O(nlogn)，n 为数组 nums1、nums2 的长度，需要对其进行排序，排序需要 O(nlogn) 的时间。
// 空间复杂度：O(logn)，快排需要O(nlogn)的递归栈空间，以及存储下标数组 idxs 需要 O(n) 的空间。
