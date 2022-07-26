// 给你一个 m * n 的矩阵 grid，矩阵中的元素无论是按行还是按列，都以非递增顺序排列。 请你统计并返回 grid 中 负数 的数目。

// 输入：grid = [[4,3,2,-1],[3,2,1,-1],[1,1,-1,-2],[-1,-1,-2,-3]]
// 输出：8
// 解释：矩阵中共有 8 个负数。

// 输入：grid = [[3,2],[1,0]]
// 输出：0


// 遍历矩阵的每一行，通过二分查找可以找到每一行中从前往后的第一个负数，那么这个位置之后到这一行的末尾里所有的数必然是负数了。

/**
 * @param {number[][]} grid
 * @return {number}
 */
var countNegatives = function (grid) {
    let count = 0; // 记录负数个数
    for (let item of grid) {
        count += search(item);
    }
    return count;
};

// 辅助函数
var search = function (item) {
    let left = 0, right = item.length - 1;

    // 由于是非递增序列，可以判断第一个元素和最后一个元素大小分别判断该列小于0的元素数量。
    if (item[left] < 0) return item.length;
    if (item[right] > 0) return 0;

    while (left <= right) {
        const mid = left + ((right - left) >> 1);
        if (item[mid] < 0) right = mid - 1;
        else left = mid + 1;
    }
    return item.length - left; // 返回本行负数个数
}
// 时间复杂度：O(nlogm)，每行二分查找的时间为logm，需要遍历 n 行，所以总的时间复杂度为 O(nlogm)。
// 空间复杂度：O(1)，只需要常数的空间存放若干变量。
