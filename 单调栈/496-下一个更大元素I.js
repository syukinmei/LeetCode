// 给你两个 没有重复元素 的数组 nums1 和 nums2 ，其中nums1 是 nums2 的子集。
// 请你找出 nums1 中每个元素在 nums2 中的下一个比其大的值。
// nums1 中数字 x 的下一个更大元素是指 x 在 nums2 中对应位置的右边的第一个比 x 大的元素。如果不存在，对应位置输出 -1 。

// 输入: nums1 = [4,1,2], nums2 = [1,3,4,2].
// 输出: [-1,3,-1]
// 解释:
//     对于 num1 中的数字 4 ，你无法在第二个数组中找到下一个更大的数字，因此输出 -1 。
//     对于 num1 中的数字 1 ，第二个数组中数字1右边的下一个较大数字是 3 。
//     对于 num1 中的数字 2 ，第二个数组中没有下一个更大的数字，因此输出 -1 。

// 输入: nums1 = [2,4], nums2 = [1,2,3,4].
// 输出: [3,-1]
// 解释:
//     对于 num1 中的数字 2 ，第二个数组中的下一个较大数字是 3 。
//     对于 num1 中的数字 4 ，第二个数组中没有下一个更大的数字，因此输出 -1 。

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */

// 方法一：暴力解法
var nextGreaterElement = function (nums1, nums2) {
    let res = new Array(nums1.length).fill(0);
    for (let i = 0; i < nums1.length; i++) {
        // 寻找nums1中元素在nums2中对应的位置
        let targetIndex = 0; // 储存nums1[i]在 nums2中的下标
        while (targetIndex < nums2.length && nums1[i] !== nums2[targetIndex]) {
            targetIndex++;
        }
        // 寻找下一个更大元素
        let nextIndex = targetIndex + 1;
        while (nextIndex < nums2.length && nums2[nextIndex] < nums2[targetIndex]) {
            nextIndex++;
        }
        // 判断存不存在并存储相应结果
        // nextIndex小于nums2.length 或 nums2[nextIndex] > nums2[targetIndex]
        res[i] = nextIndex < nums2.length ? nums2[nextIndex] : -1;
    }
    return res;
};
// 时间复杂度：O(mn)，其中m是nums1的长度，n是nums2的长度
// 空间复杂度：O(1);


// 方法二：单调栈 + 哈希表
var nextGreaterElement = function (nums1, nums2) {
    const dic = new Map();
    const stack = [];
    // 逆向遍历nums2
    for (let i = nums2.length - 1; i >= 0; i--) {
        while (stack.length && nums2[i] > stack[stack.length - 1]) {
            // 单调栈有值 且 nums2当前元素大于单调栈栈顶的元素 则 出栈
            stack.pop();
        }
        // 此时有栈顶元素即位当前元素的下一个更大元素 用dic保存
        dic.set(nums2[i], stack.length ? stack[stack.length - 1] : -1)
        // 当前元素入栈
        stack.push(nums2[i]);
    }
    const res = new Array(nums1.length).fill(0).map((_, i) => dic.get(nums1[i]))
    return res;
};
// 时间复杂度：O(m+n)，其中m为nums1的长度，n为nums2的长度。我们需要遍历nums2以计算nums2中每一个元素右边的第一个更大值，需要遍历nusm1以生成查询结果。
// 空间复杂度：O(n)，用于存储哈希表