// 珂珂喜欢吃香蕉。这里有 n 堆香蕉，第 i 堆中有 piles[i] 根香蕉。警卫已经离开了，将在 h 小时后回来。
// 珂珂可以决定她吃香蕉的速度 k （单位：根/小时）。每个小时，她将会选择一堆香蕉，从中吃掉 k 根。如果这堆香蕉少于 k 根，她将吃掉这堆的所有香蕉，然后这一小时内不会再吃更多的香蕉。  
// 珂珂喜欢慢慢吃，但仍然想在警卫回来前吃掉所有的香蕉。
// 返回她可以在 h 小时内吃掉所有香蕉的最小速度 k（k 为整数）。

// 输入：piles = [3,6,7,11], h = 8
// 输出：4

// 输入：piles = [30,11,23,4,20], h = 5
// 输出：30

// 输入：piles = [30,11,23,4,20], h = 6
// 输出：23


/**
 * @param {number[]} piles
 * @param {number} h
 * @return {number}
 */
// 方法一：二分查找
 var minEatingSpeed = function (piles, h) {
    // 左边界为1，右边界为 piles 数组最大值。
    let left = 1, right = Math.max(...piles);
    while (left < right) {
        const mid = left + ((right - left) >> 1);
        if (needTime(mid, piles) > h) {
            // 以mid速度吃这堆香蕉不能在警卫回来前吃完，需要加快吃香蕉速度
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    return left;
};

/**
 * 计算以速度speed这堆香蕉所需的时间
 * @param {number} speed - 吃香蕉的速度
 * @param {number[]} piles -香蕉堆
 * @return {number} 吃这堆香蕉所需的时间
 */
const needTime = (speed, piles) => {
    let time = 0;
    for (const pile of piles) {
        const curTime = Math.ceil(pile / speed);
        time += curTime;
    }
    return time;
}

// 时间复杂度：O(nlogm)，n 为数组 piles 的长度，m 为数组 piles 中的最大值。需要O(n)的时间遍历数组找到最大值right，二分查找需要执行 O(logm)轮，每一轮二分查找需要 O(n)的时间，因此总的时间复杂度为 O(nlogm)。
// 空间复杂度：O(1)，只需要常数的空间存放若干变量。
