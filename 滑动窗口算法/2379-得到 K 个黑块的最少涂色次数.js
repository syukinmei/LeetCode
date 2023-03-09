// 给你一个长度为 n 下标从 0 开始的字符串 blocks ，blocks[i] 要么是 'W' 要么是 'B' ，表示第 i 块的颜色。字符 'W' 和 'B' 分别表示白色和黑色。
// 给你一个整数 k ，表示想要 连续 黑色块的数目。
// 每一次操作中，你可以选择一个白色块将它 涂成 黑色块。
// 请你返回至少出现 一次 连续 k 个黑色块的 最少 操作次数。


// 输入：blocks = "WBBWWBBWBW", k = 7
// 输出：3
// 解释：
// 一种得到 7 个连续黑色块的方法是把第 0 ，3 和 4 个块涂成黑色。
// 得到 blocks = "BBBBBBBWBW" 。
// 可以证明无法用少于 3 次操作得到 7 个连续的黑块。
// 所以我们返回 3 。


// 输入：blocks = "WBWBBBW", k = 2
// 输出：0
// 解释：
// 不需要任何操作，因为已经有 2 个连续的黑块。
// 所以我们返回 0 。

// 由题意得，我们要求的是一个大小固定为 k 的滑动窗口中白色块 "W" 的最小数量。
// 因此，我们只需要遍历字符串 blocks，用一个变量 cnt 统计当前窗口中白色块的数量，然后用一个变量 ans 维护最小值即可。
// 具体的：
// 窗口初始化位于 blocks 长为 k 的前缀上，那么初始化 cnt 为这个前缀的白色块 "W" 的个数。然后不断向右滑动窗口，如果窗口内少了 "W"，则 cnt--，否则 cnt++。窗口滑动中 cnt 的最小值即为答案。
/**
 * @param {string} blocks
 * @param {number} k
 * @return {number}
 */
var minimumRecolors = function (blocks, k) {
    let l = 0, r = 0, cnt = 0;
    // step1：初始化窗口，统计窗口中白色块 "W" 的个数
    while (r < k) {
        if (blocks[r] === 'W') cnt++;
        r++;
    }
    // step2：滑动窗口，维护窗口中白色块的个数 cnt，即其最小值 asn。
    let ans = cnt; // 初始值即为初始位置窗口中 "W" 的个数
    while (r < blocks.length) {
        // 维护 cnt 和 ans
        cnt += blocks[r] === 'W';
        cnt -= blocks[l] === 'W';
        ans = Math.min(ans, cnt);
        l++; r++; // 窗口右移动
    }
    return ans;
};
// 时间复杂度：O(n)，n 为字符串 blocks 的长度，右边界需要完整的遍历一次字符串。
// 空间复杂度：O(1)，只需要常数的空间存放若干变量。
