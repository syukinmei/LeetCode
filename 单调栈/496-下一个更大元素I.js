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


// 方法二：单调栈 + 哈希表(正向遍历)
var nextGreaterElement = function (nums1, nums2) {
    const dic = new Map(); // 哈希表 键为nums2中的元素 值为该元素下一个更大元素
    const stack = []; // 单调递减 保证栈中元素未找到下一个更大元素
    for (let i = 0; i < nums2.length; i++) {
        // 栈中有值 且 当前元素大于栈顶元素，说明栈中部分元素的下一个更大元素已找到，需要弹栈
        while (stack.length && nums2[i] > stack[stack.length - 1]) {
            dic.set(stack[stack.length - 1], nums2[i]);
            stack.pop();
        }
        // 压栈
        stack.push(nums2[i]);
    }
    // 此时哈希表建设完毕，返回结果元素
    // const res = new Array(nums1.length).fill(0).map((_, i) => {
    //     if(dic.has(nums1[i])){
    //         return dic.get(nums1[i]);
    //     }else{
    //         return -1;
    //     }
    // });
    const res = [];
    for (let i = 0; i < nums1.length; i++) {
        res[i] = dic.get(nums1[i]) || -1;
    }
    return res;
};
// 从左向右正向遍历nums2，维护一个单调栈（单调递减），当遇到大于栈顶的元素时，此元素就是栈中小于该元素的元素下一个更大值，需要出栈并且记录哈希表中。
// 时间复杂度：O(m+n)，其中m为nums1的长度，n为nums2的长度。我们需要遍历nums2以计算nums2中每一个元素右边的第一个更大值，需要遍历nusm1以生成查询结果。
// 空间复杂度：O(n)，用于存储哈希表


// 方法二：单调栈 + 哈希表(逆向遍历)
var nextGreaterElement = function (nums1, nums2) {
    const dic = new Map();
    const stack = [];
    for (let i = nums2.length - 1; i >= 0; i--) {
        // 栈中有值 且 当前元素 大于 栈顶元素 则弹栈
        while (stack.length && nums2[i] > stack[stack.length - 1]) {
            stack.pop();
        }
        // 此时栈顶元素即是当前元素下一个更大元素，前提是栈中有值。用哈希表保存
        dic.set(nums2[i], stack[stack.length - 1] || -1);
        // 压栈
        stack.push(nums2[i]);
    }
    // 此时哈希表建设完毕,返回结果值。
    const res = new Array(nums1.length).fill(0).map((_, i) => dic.get(nums1[i]));
    return res;
};
// 从右向左逆向遍历，维护一个单调栈(单调递减)，当遇到大于(不重复，重复就是大于等于)栈顶的元素时，进行弹栈，此时栈顶元素即是当前元素的下一个更大元素（栈中有值），使用哈希表记录后压栈。
// 时间复杂度：O(m+n)，其中m为nums1的长度，n为nums2的长度。我们需要遍历nums2以计算nums2中每一个元素右边的第一个更大值，需要遍历nusm1以生成查询结果。
// 空间复杂度：O(n)，用于存储哈希表