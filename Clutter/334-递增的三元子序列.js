// 给你一个整数数组 nums ，判断这个数组中是否存在长度为 3 的递增子序列。
// 如果存在这样的三元组下标 (i, j, k) 且满足 i < j < k ，使得 nums[i] < nums[j] < nums[k] ，返回 true ；否则，返回 false 。

// 输入：nums = [1,2,3,4,5]
// 输出：true
// 解释：任何 i < j < k 的三元组都满足题意

// 输入：nums = [5,4,3,2,1]
// 输出：false
// 解释：不存在满足题意的三元组

// 输入：nums = [2,1,5,0,4,6]
// 输出：true
// 解释：三元组 (3, 4, 5) 满足题意，因为 nums[3] == 0 < nums[4] == 4 < nums[5] == 6

/**
 * @param {number[]} nums
 * @return {boolean}
 */
// 方法一：双向遍历
// 寻找一个 nums[i] 满足 1、左边存在一个元素小于它，2、右边存在一个元素大于它。可转化为：
// 1、nums[i] 左边最小元素小于它    2、nums[i] 右边最大元素大于它。
// 因此可以维护 nums 数组中每个元素的左边最小元素 和 右边最大元素。

// 代码思路：
// 创建两个长度为 n 的数组 leftMin 和 rightMax 
// leftMin[i]  表示 nums[0] ~ nums[i] 中的最小值
// rightMax[i] 表示 nums[i] ~ nums[n-1] 中的最大值

// 数组 leftMin 的计算方式如下：
//  - leftMin[0] = nums[0]
//  - 从左到右遍历数组 nums ，对于 1 <= i < n，leftMin[i] = min(leftMin[i-1], nums[i])

// 数组 rightMax 的计算方式如下：
//  - rightMax[0] = nums[n-1]
//  - 从左到右遍历数组 nums ，对于 0 <= i < n-1，rightMax[i] = min(rightMax[i+1], nums[i])

// 遍历 nums 数组，对于 1 <= i < n-1，如存在 i 满足 leftMin[i-1] < nums[i] < rightMax[i+1] ，则返回 true，否则返回 false

// 如 [2, 1, 5, 0, 4, 6] 则有：
// leftMin： [2, 1, 1, 0, 0, 0]
// nums：    [2, 1, 5, 0, 4, 6]
// rightMax：[6, 6, 6, 6, 6, 6]
//                  o     o    有两个满足
var increasingTriplet = function (nums) {
    // 特殊情况处理
    const n = nums.length;
    if (n < 3) return false;

    // 建立leftMin
    const leftMin = new Array(n);
    leftMin[0] = [nums[0]];
    for (let i = 1; i < n; i++) {
        leftMin[i] = Math.min(leftMin[i - 1], nums[i]);
    }

    // 建立rightMax
    const rightMax = new Array(n);
    rightMax[n - 1] = nums[n - 1];
    for (let i = n - 2; i >= 0; i--) {
        rightMax[i] = (Math.max(rightMax[i + 1], nums[i]));
    }

    // 判断有无满足条件的nums[i]
    for (let i = 1; i < n - 1; i++) {
        if (leftMin[i - 1] < nums[i] && nums[i] < rightMax[i + 1]) return true;
    }
    return false;
};
// 时间复杂度：O(n)，n 为数组 nums 的长度。需要遍历数组3次。
// 空间复杂度：O(n)，n 为数组 nums 的长度。需要创建两个长度为 n 的数组 leftMin 和 rightMax。


// 方法二：贪心
// 贪心策略：为了找到递增的三元子序列，first 和 second 应该尽可能地小，此时找到递增的三元子序列的可能性更大。
// 遍历数组，遍历过程中维护两个变量 first 和 second ，分别表示递增的三元子序列的第一个数和第二个数，任何时候都有 first < second
var increasingTriplet = function (nums) {
    // 初始化 first 和 second
    let first = nums[0];
    let second = Number.MAX_VALUE;
    for (let i = 1; i < nums.length; i++) {
        if (second < nums[i]) return true; // 形成递增的三元子序列，返回true

        if (first < nums[i]) second = nums[i]; // 此时有 first < nums[i] <= second ,将 second 更新为 nums[i];

        if (nums[i] < first) first = nums[i];
        // 难以理解点：更新的 first 出现在 second 后面，需要担心不是子序列的问题吗？
        // 不用担心，因为 second 的前面一定存在一个之前担任过 first 的元素 < 此时的 second ，后续遇到 nums[i] > second 时，可以通过（之前担任过 first 的元素, second, nums[i]）组成递增的三元子序列。
    }
    return false; // 遍历结束，未形成递增的三元子序列，返回false
};
// 时间复杂度：O(n)，n 为数组 nums 的长度，需要遍历一次数组。
// 空间复杂度：O(1)，只需要常数的空间存放若干变量。