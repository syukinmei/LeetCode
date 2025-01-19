// 给你两个整数数组 nums1 和 nums2，长度分别为 n 和 m。同时给你一个正整数 k。
// 如果 nums1[i] 可以被 nums2[j] * k 整除，则称数对 (i, j) 为 优质数对（0 <= i <= n - 1, 0 <= j <= m - 1）。
// 返回 优质数对 的总数。

// 输入：nums1 = [1,3,4], nums2 = [1,3,4], k = 1
// 输出：5
// 解释：
// 5个优质数对分别是 (0, 0), (1, 0), (1, 1), (2, 0), 和 (2, 2)。

// 输入：nums1 = [1,2,4,12], nums2 = [2,4], k = 3
// 输出：2
// 解释：
// 2个优质数对分别是 (3, 0) 和 (3, 1)。

// 方法一：枚举
// 根据题意枚举所有的数对，判断是否优质，返回优质数对的个数。
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number} k
 * @return {number}
 */
var numberOfPairs = function (nums1, nums2, k) {
    let count = 0;
    for (const a of nums1) {
        for (const b of nums2) {
            if (a % (b * k) === 0) count++;
        }
    }
    return count;
};
// 时间复杂度：O(n*m)，n 和 m 分别为数组 nums1 和 nums2 的长度。
// 空间复杂度：O(1)，只需要常数的空间存放若干变量。

// 方法二：哈希表 + 枚举倍数
// 枚举 nums2[j] * k 的倍数。
// 方法一中我们采用暴力枚举的方式，枚举每对 nums1[i] 和 nums2[j]，判断 nums2[j] * k 是否是 nums[i] 的倍数，时间复杂度为 O(n*m)。
// 而事实上，对于某个固定的 nums[j] * k ，可能大部分的 nums[i] 都不是他的倍数，枚举所有的 nums[i] 时间消耗比较大。

// 我们可以换一种思路，枚举 nums2[j] * k 的倍数，判断这个倍数是否存在与 nums1 中。
//  - 枚举的倍数上限不超过 nums1 中的最大值，因为超过最大值一定不存在于 nums1 中。
//  - 由于我们要找 nums1 中 nums2[j] * k 的倍数，如果 nums1[i] 不是 k 的倍数，那么他一定不是 nums2[j] * k 的倍数（因为它不是 k 的倍数一定不能整除 k，肯定也不能整除 k 的倍数），那么这个元素就没必要加入到哈希表 cnt1 中了。
// 具体的:
// 我们用一个哈希表 cnt1 记录数组 nums1 中每个数的出现次数，用一个哈希表 cnt2 记录数组 nums2 中每个数的出现次数。
// 接下来，我们枚举数组 nums2 中的每个数 x，对于每个数 x，我们枚举 x 的倍数 y，其中 y 的范围是 [x,mx]，其中 mx 是 cnt1 中的最大键值，然后我们统计 cnt1[y] 的和，记为 s，最后我们将 s×v 累加到答案中，其中 v 是 cnt2[x]。

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number} k
 * @return {number}
 */
var numberOfPairs = function (nums1, nums2, k) {
    // 词频表，记录每个元素出现的次数。key:数字x value:数字x的出现次数。
    const cnt1 = new Map();
    const cnt2 = new Map();

    let res = 0; // 记录优质数对的个数
    let mx1 = 0; // 记录 nums1 中的最大值

    // step1：构建 cnt1 和 cnt2 词频表
    for (const num of nums1) {
        cnt1.set(num, (cnt1.get(num) || 0) + 1); // 更新词频
        mx1 = Math.max(mx1, num); // 更新 nums1 中的最大值 mx1
    }

    for (const num of nums2) {
        cnt2.set(num, (cnt2.get(num) || 0) + 1); // 更新词频
    }

    // step2：枚举 nums2[j] * k 的倍数。
    for (const [b, cnt] of cnt2) {
        // 对于 nums2 中的每个数组 b，我们枚举 b 的倍数 multiple，其中 multiple 的范围是 [b*k ,mx1]
        for (let multiple = b * k; multiple <= mx1; multiple += b * k) {
            // 如果 multiple 存在于 cnt1 中，则将 cnt1[multiple] * cnt 累加到 res 中
            if (cnt1.has(multiple)) {
                res += cnt1.get(multiple) * cnt;
            }
        }
    }

    return res; // 返回最终的计数结果
};
// 时间复杂度：O(n+m+logm*(M/k))，n 和 m 分别为数组 nums1 和 nums2 的长度，k 为给定的正整数，M 为数组 nums1 中的最大值。
//  - 构建 nums1 和 nums2 的词频表分别用 O(n) 和 O(m) 的时间。
//  - 枚举 nums2[j] 的有效倍数需要 O(M/k/nums2[j]) 的时间，其中 M 为数组 nums1 中的最大值。显然 nums2[j] 越大，时间开销越小。
//  - 根据「调和级数」公式 1+1/2 + ... + 1/m ≈ log(m)，因此枚举 nums2[j] * k 的所有有效倍数的总时间复杂度为 O(logm * M/k)。
//  - 总的时间复杂度为 O(n+m+logm*(M/k))。
// 空间复杂度：O(n+m)，n 和 m 分别为数组 nums1 和 nums2 的长度。需要两个哈希集合存储数组 nums1 和 nums2 中元素的计数，最后情况下无重复元素，需要 O(n+m) 的空间。
