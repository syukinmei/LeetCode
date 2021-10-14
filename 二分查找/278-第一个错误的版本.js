// 你是产品经理，目前正在带领一个团队开发新的产品。不幸的是，你的产品的最新版本没有通过质量检测。由于每个版本都是基于之前的版本开发的，所以错误的版本之后的所有版本都是错的。
// 假设你有 n 个版本 [1, 2, ..., n]，你想找出导致之后所有版本出错的第一个错误的版本。
// 你可以通过调用 bool isBadVersion(version) 接口来判断版本号 version 是否在单元测试中出错。实现一个函数来查找第一个错误的版本。你应该尽量减少对调用 API 的次数。


// 输入：n = 5, bad = 4
// 输出：4
// 解释：
// 调用 isBadVersion(3) -> false 
// 调用 isBadVersion(5) -> true 
// 调用 isBadVersion(4) -> true
// 所以，4 是第一个错误的版本。

// 输入：n = 1, bad = 1
// 输出：1


/**
 * Definition for isBadVersion()
 * 
 * @param {integer} version number
 * @return {boolean} whether the version is bad
 * isBadVersion = function(version) {
 *     ...
 * };
 */

/**
 * @param {function} isBadVersion()
 * @return {function}
 */
var solution = function (isBadVersion) {
    /**
     * @param {integer} n Total versions
     * @return {integer} The first bad version
     */
    return function (n) {
        if (isBadVersion(1)) return 1;
        let left = 1, right = n, mid;
        while (left < right) { // 循环直区间左右边界重合
            mid = left + ((right - left) >> 1);
            if (isBadVersion(mid)) { // 最早坏的版本在左区间 也有可能就是mid
                right = mid;
            } else { // 最早坏的版本在右区间，mid是好的版本所以区间取值要+1
                left = mid + 1;
            }
        }
        // 此时有left === right 区间缩为一个点，即为答案
        return left;
    };
};

// 时间复杂度：O(logn)，其中 n 是给定版本的数量。

// 空间复杂度：O(1)。我们只需要常数的空间保存若干变量。