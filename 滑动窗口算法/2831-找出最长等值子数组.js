// 给你一个下标从 0 开始的整数数组 nums 和一个整数 k 。
// 如果子数组中所有元素都相等，则认为子数组是一个 等值子数组 。注意，空数组是 等值子数组 。
// 从 nums 中删除最多 k 个元素后，返回可能的最长等值子数组的长度。
// 子数组 是数组中一个连续且可能为空的元素序列。

// 输入：nums = [1,3,2,3,1,3], k = 3
// 输出：3
// 解释：最优的方案是删除下标 2 和下标 4 的元素。
// 删除后，nums 等于 [1, 3, 3, 3] 。
// 最长等值子数组从 i = 1 开始到 j = 3 结束，长度等于 3 。
// 可以证明无法创建更长的等值子数组。

// 输入：nums = [1,1,2,2,1,1], k = 2
// 输出：4
// 解释：最优的方案是删除下标 2 和下标 3 的元素。
// 删除后，nums 等于 [1, 1, 1, 1] 。
// 数组自身就是等值子数组，长度等于 4 。
// 可以证明无法创建更长的等值子数组。

// 方法一：哈希表+滑动窗口
// 我们将相同的元素分组，使用哈希表 posList 记录每个元素出现的位置下标。
// 例如实例 1，对于元素 3，其在 nums 中的下标有 1, 3, 5，那么 posList[3] = [1, 3, 5]。
// 遍历 posList 中的每个下标列表 pos
// 我们使用「滑动窗口」计算 元素 x 的最长等值子数组的长度。设窗口左右端点为 left 和 right。
// 假设 x 的等值子数组的元素下标从 pos[left] 到 pos[right]，那么在删除前，子数组的长度为 pos[right] - pos[left] + 1。
// 这个子数组有 right - left + 1 个元素 x，其余元素都需要删除，那么需要删除的元素个数就是：
// pos[right] - pos[left] + 1 - (right - left + 1) = pos[right] - pos[left] - right + left
// 如果上式 > k，则说明需要删除的元素多了，那么我们右移 left 指针，直到上式 <= k，此时 right - left + 1 就是元素 x 的复合题意的等值子数组的长度。用其更新答案的最大值。
// 最后，我们遍历完 posList 中的所有下标列表，即可得到答案。

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var longestEqualSubarray = function (nums, k) {
    // 构建每个元素出现的位置下标数组哈希表
    // key 为元素值，value 为该元素在 nums 中的下标列表
    const posList = new Map();
    for (let i = 0; i < nums.length; i++) {
        if (!posList.has(nums[i])) {
            posList.set(nums[i], []);
        }
        posList.get(nums[i]).push(i); // 存储下标
    }

    let maxLen = 0; // 记录满足条件的最长等值子数组的长度

    // 遍历哈希表中的每个元素
    for (let num of posList.keys()) {
        // 对于每个元素 num，将其在 nums 中的下标列表使用「滑动窗口」计算元素 num 的最长等值子数组的长度
        const pos = posList.get(num);

        if (pos.length <= maxLen) continue; // 优化：无法让 maxLen 变得更大，则直接跳过该元素

        let left = 0,
            right = 0; // 初始化滑动窗口
        while (right < pos.length) {
            // 当前窗口需要删除的元素数量为：窗口大小 - 窗口中元素 num 的数量
            // 如果需要删除的元素数量超过 k，无法生成满足条件的合法等值子数组，收缩窗口，左边界右移
            while (pos[right] - pos[left] - right + left > k) left++;
            // 当前窗口可以生成满足条件的合法等值子数组，更新最大长度
            maxLen = Math.max(maxLen, right - left + 1);

            right++; // 移动右边界
        }
    }
    return maxLen;
};
// 时间复杂度：O(n)，n 为数组 nums 的长度。分组构建哈希表需要 O(n) 的复杂度，通过滑动窗口找到每个元素的最大长度的等值子数组长度只需要遍历所有的连续相等字符的长度计数即可。
// 空间复杂度：O(n)，n 为数组 nums 的长度。需要使用哈希表分组保存每种元素的在 nums 中的下标，哈希表需要 O(n) 的空间存储每个元素的下标。
