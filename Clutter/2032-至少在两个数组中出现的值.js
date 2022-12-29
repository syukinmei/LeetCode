// 给你三个整数数组 nums1、nums2 和 nums3 ，请你构造并返回一个 元素各不相同的 数组，且由 至少 在 两个 数组中出现的所有值组成。数组中的元素可以按 任意 顺序排列。


// 输入：nums1 = [1,1,3,2], nums2 = [2,3], nums3 = [3]
// 输出：[3,2]
// 解释：至少在两个数组中出现的所有值为：
// - 3 ，在全部三个数组中都出现过。
// - 2 ，在数组 nums1 和 nums2 中出现过。


// 输入：nums1 = [3,1], nums2 = [2,3], nums3 = [1,2]
// 输出：[2,3,1]
// 解释：至少在两个数组中出现的所有值为：
// - 2 ，在数组 nums2 和 nums3 中出现过。
// - 3 ，在数组 nums1 和 nums2 中出现过。
// - 1 ，在数组 nums1 和 nums3 中出现过。

// 输入：nums1 = [1,2,2], nums2 = [4,3,3], nums3 = [5]
// 输出：[]
// 解释：不存在至少在两个数组中出现的值。



/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number[]} nums3
 * @return {number[]}
 */
// 方法一：哈希表+模拟
var twoOutOfThree = function (nums1, nums2, nums3) {
    const map = new Map();
    const res = new Set();
    for (const num of nums1) {
        map.set(num, 1);
    }

    for (const num of nums2) {
        const position = map.get(num);
        if (position === 1) {
            res.add(num);
        } else {
            map.set(num, 2);
        }
    }

    for (const num of nums3) {
        const position = map.get(num);
        if (position === 1 || position === 2) {
            res.add(num);
        } else {
            map.set(num, 3);
        }
    }

    return [...res];
};


// 方法二：哈希表+位运算
// 还是采用哈希表，但是这次，哈希表的 value 为二机制的「0-2」位。以表示一个数分别在 nums1、nums2、nums3 出现过，即：
//  - 001 表示在 nums1 中出现过
//  - 011 表示在 nums1、nums2 中出现过
//  - 111 表示在 nums1、nums2、nums3 中都出现过

// 题意要求将出现在 最少2个 数组的值写入结果集，即只能是 011、101、110、111 这样的才能被写入，这些数都存在不止一个1，所以去掉最低位的1后，依然大于0，故满足 (x & (x-1)) > 0 。
var twoOutOfThree = function (nums1, nums2, nums3) {
    const map = new Map();
    const res = [];
    for (const num of nums1) {
        map.set(num, 1);
    }

    for (const num of nums2) {
        map.set(num, (map.get(num) || 0) | 2);
    }

    for (const num of nums3) {
        map.set(num, (map.get(num) || 0) | 4);
    }

    for (const [k, v] of map.entries()) {
        if ((v & (v - 1)) !== 0) res.push(k);
    }
    return res;
};
// 时间复杂度：O(n1+n2+n3)，分别为数组 nums1、nums2、nums3 的长度。
// 空间复杂度：O(n1+n2+n3)，分别为数组 nums1、nums2、nums3 的长度，主要为哈希表的空间开销。
