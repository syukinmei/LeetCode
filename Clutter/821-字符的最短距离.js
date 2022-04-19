// 给你一个字符串 s 和一个字符 c ，且 c 是 s 中出现过的字符。
// 返回一个整数数组 answer ，其中 answer.length == s.length 且 answer[i] 是 s 中从下标 i 到离它 最近 的字符 c 的 距离 。
// 两个下标 i 和 j 之间的 距离 为 abs(i - j) ，其中 abs 是绝对值函数。


// 输入：s = "loveleetcode", c = "e"
// 输出：[3, 2, 1, 0, 1, 0, 0, 1, 2, 2, 1, 0]
// 解释：字符 'e' 出现在下标 3、5、6 和 11 处（下标从 0 开始计数）。
// 距下标 0 最近的 'e' 出现在下标 3 ，所以距离为 abs(0 - 3) = 3 。
// 距下标 1 最近的 'e' 出现在下标 3 ，所以距离为 abs(1 - 3) = 2 。
// 对于下标 4 ，出现在下标 3 和下标 5 处的 'e' 都离它最近，但距离是一样的 abs(4 - 3) == abs(4 - 5) = 1 。
// 距下标 8 最近的 'e' 出现在下标 6 ，所以距离为 abs(8 - 6) = 2 。

// 输入：s = "aaab", c = "b"
// 输出：[3,2,1,0]


/**
 * @param {string} s
 * @param {character} c
 * @return {number[]}
 */
// 方法一：两次遍历
// 可以将问题转化，对 s 的每个下标 i，求
//  - s[i] 到其左侧最近的字符 c 的距离
//  - s[i] 到其右侧最近的字符 c 的距离
// tips：代码实现时，在开始遍历的时候 cIndex 可能不存在，为了简化逻辑，我们可以用 Number.MIN_SAFE_INTEGER 和 MAX_SAFE_INTEGER 表示。
var shortestToChar = function (s, c) {
    const len = s.length;
    const res = new Array(len).fill(0);

    // s[i]到其左侧最近的字符c的距离
    for (let i = 0, cIndex = Number.MIN_SAFE_INTEGER; i < len; i++) {
        if (s[i] === c) cIndex = i;
        res[i] = i - cIndex;
    }

    // s[i]到其右侧最近的字符c的距离
    for (let i = len - 1, cIndex = Number.MAX_SAFE_INTEGER; i >= 0; i--) {
        if (s[i] === c) cIndex = i;
        res[i] = Math.min(res[i], cIndex - i);
    }
    return res;
};
// 时间复杂度：O(n)，n 为字符串 s 的长度。
// 空间复杂度：O(1)，只需要常数的空间存放若干变量。
