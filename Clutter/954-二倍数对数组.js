

// 给定一个长度为偶数的整数数组 arr，只有对 arr 进行重组后可以满足 “对于每个 0 <= i < len(arr) / 2，都有 arr[2 * i + 1] = 2 * arr[2 * i]” 时，返回 true；否则，返回 false。


// 输入：arr = [3,1,3,6]
// 输出：false

// 输入：arr = [2,1,2,6]
// 输出：false

// 输入：arr = [4,-2,2,-4]
// 输出：true
// 解释：可以用 [-2,-4] 和 [2,4] 这两组组成 [-2,-4,2,4] 或是 [2,4,-2,-4]



/**
 * @param {number[]} arr
 * @return {boolean}
 */
// 方法一：哈希表+排序
// 建立字典cntMap，cntMap[x] 表示 arr 中 x 的个数。
// 对于 arr 中的 0 ，只能和 0 匹配，所以判断cntMap中 0 的个数是否为偶数。
//  

var canReorderDoubled = function (arr) {
    // 建立字典表，统计每个数字出现的次数 键为arr的元素，值为该元素的个数。
    const cntMap = new Map();
    for (const x of arr) {
        cntMap.set(x, (cntMap.get(x) || 0) + 1);
    }
    // 判断1：0的个数，如是奇数返回false。
    // if ((cntMap.get(0) || 0) % 2 !== 0) return false;
    if (cntMap.has(0) && cntMap.get(0) % 2 !== 0) return false;

    const keys = Array.from(cntMap.keys());
    keys.sort((a, b) => Math.abs(a) - Math.abs(b));

    for (const x of keys) {
        if ((cntMap.get(2 * x) || 0) < cntMap.get(x)) return false;
        cntMap.set(2 * x, (cntMap.get(2 * x) || 0) - cntMap.get(x));
        // if (cntMap.has(2 * x)) cntMap.set(2 * x, cntMap.get(2 * x) - cntMap.get(x));
    }
    return true;
};
// 时间复杂度：O(nlogn)，n 为数组 arr 的长度，最后情况下哈希表中有 n 个元素，对其排序需要O(nlogn)的时间。
// 空间复杂度：O(n)，最坏情况下哈希表中有 n 个元素，需要O(n)的空间。
