// 给你两个长度可能不等的整数数组 nums1 和 nums2 。两个数组中的所有值都在 1 到 6 之间（包含 1 和 6）。
// 每次操作中，你可以选择 任意 数组中的任意一个整数，将它变成 1 到 6 之间 任意 的值（包含 1 和 6）。
// 请你返回使 nums1 中所有数的和与 nums2 中所有数的和相等的最少操作次数。如果无法使两个数组的和相等，请返回 -1 。


// 输入：nums1 = [1,2,3,4,5,6], nums2 = [1,1,2,2,2,2]
// 输出：3
// 解释：你可以通过 3 次操作使 nums1 中所有数的和与 nums2 中所有数的和相等。以下数组下标都从 0 开始。
// - 将 nums2[0] 变为 6 。 nums1 = [1,2,3,4,5,6], nums2 = [6,1,2,2,2,2] 。
// - 将 nums1[5] 变为 1 。 nums1 = [1,2,3,4,5,1], nums2 = [6,1,2,2,2,2] 。
// - 将 nums1[2] 变为 2 。 nums1 = [1,2,2,4,5,1], nums2 = [6,1,2,2,2,2] 。

// 输入：nums1 = [1,1,1,1,1,1,1], nums2 = [6]
// 输出：-1
// 解释：没有办法减少 nums1 的和或者增加 nums2 的和使二者相等。

// 输入：nums1 = [6,6], nums2 = [1]
// 输出：3
// 解释：你可以通过 3 次操作使 nums1 中所有数的和与 nums2 中所有数的和相等。以下数组下标都从 0 开始。
// - 将 nums1[0] 变为 2 。 nums1 = [2,6], nums2 = [1] 。
// - 将 nums1[1] 变为 2 。 nums1 = [2,2], nums2 = [1] 。
// - 将 nums2[0] 变为 4 。 nums1 = [2,2], nums2 = [4] 。


// 哈希表+贪心
// 设 nums1 的元素和大于 nums2 的元素和（让其具有一般性），元素和的差为diff。
// 那么 nums1 的元素需要变大，而 nums2 的元素需要变小。
// 然后我们计算它们每个元素的最大变化量并使用 cnt 记录。使得 cnt[i] 表示有 cnt[i] 个数可以使得 diff 减少 i。
//  - nums1[i] 最大变成1，最大变化量为 nums1[i]-1
//  - nums2[i] 最大变成6，最大变化量为 6-nums2[i]
// 从大到小枚举 5-1
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var minOperations = function (nums1, nums2) {
    // 极限判断，无法使两个数组的和相等，返回-1。
    if (6 * nums1.length < nums2.length || 6 * nums2.length < nums1.length) return -1;

    let diff = 0; // 两数组差值
    // 默认 nums1 为和比较大的数组
    // 计算两数组和的差值
    for (let num of nums1) diff += num;
    for (let num of nums2) diff -= num;

    if (diff === 0) return 0; //  两个数组和相等，则不需要操作，返回 0 次。

    // diff < 0 说明 nums2 为和比较大的数组，调整数据（交换nums1和nums2，）
    if (diff < 0) {
        diff = -diff;
        let temp = nums1;
        nums1 = nums2;
        nums2 = temp;
    }

    let count = 0;

    const cnt = new Array(6).fill(0); // cnt[i] 表示 可以调整 i 大小的数 有 cnt[i] 个
    for (num of nums1) cnt[num - 1]++; // 对于和较大的数组，要执行增大操作，理论上最大值是6
    for (num of nums2) cnt[6 - num]++; // 对于和较小的数组，要执行减小操作，理论上最小值是1

    for (let i = 5; i > 0; i--) {
        if (diff <= cnt[i] * i) {
            // count += Math.ceil(diff / i);
            count += Math.min(Math.floor((diff + i - 1) / i), cnt[i]);
            return count;
        }
        // 更新状态
        count += cnt[i];
        diff -= cnt[i] * i;

        // 一个比较好理解的版本
        // while (cnt[i] > 0) { // 跨度为 i 的次数不为0
        //     count++; // 操作次数 +1
        //     cnt[i]--; // 差值次数 -1
        //     diff -= i; // 更新 diff
        //     if (diff <= 0) return count; // 操作结束
        // }
    }
};
// 时间复杂度：O(n+m)，n 和 m 分别为数组 nums1 和 nums2 的长度。
// 空间复杂度：O(C)，本题C为6，即是「哈希表」cnt 的空间开销。