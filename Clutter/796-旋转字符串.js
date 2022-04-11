// 给定两个字符串, s 和 goal。如果在若干次旋转操作之后，s 能变成 goal ，那么返回 true 。
// s 的 旋转操作 就是将 s 最左边的字符移动到最右边。 
//  - 例如, 若 s = 'abcde'，在旋转一次之后结果就是'bcdea' 。

// 输入: s = "abcde", goal = "cdeab"
// 输出: true

// 输入: s = "abcde", goal = "abced"
// 输出: false

/**
 * @param {string} s
 * @param {string} goal
 * @return {boolean}
 */
// 方法一：模拟
// 思路：s 和 goal 的长度相等时无论怎么旋转 s 都不能得到 goal，返回false。
// 长度相等都为len的前提下，s 旋转 i 位后，goal[j] 应该与 s[(i + j) mod len] 对应。
// 在固定 i 的情况下，遍历所有 j ，若对应字符都相同，则返回true。否则，继续遍历其他候选的 i 。若所有 i 都不能使 s 变成 goal，则返回 false。
var rotateString = function (s, goal) {
    // 如果s 和 goal 长度不相等，怎么旋转都不匹配
    if (s.length !== goal.length) return false;

    const len = s.length;
    for (let i = 0; i < len; i++) {
        let flag = true;
        for (let j = 0; j < len; j++) {
            if (s[(i + j) % len] !== goal[j]) {
                flag = false;
                break;
            }
        }
        if (flag) return true;
    }
    return false;
};
// 时间复杂度：O(n^2)，n 为字符串 s 的长度，我们需要两层循环来判断。
// 空间复杂度：O(1)，只需要常数的空间存放若干变量。


// 方法二：搜索子字符串
// 生成一个字符串 A+A ，它包含了 A 旋转 n 次后的所有结果，该字符串中包含 B ，则说明 B 可以通过A旋转后得到。
var rotateString = function (s, goal) {
    return s.length === goal.length && (s + s).indexOf(goal) !== -1;
};
// 时间复杂度：O(n)，n 为字符串 s 的长度，KMP算法搜索子字符串的时间复杂度为O(n)。
// 空间复杂度：O(n)，n 为字符串 s 的长度，KMP算法搜索子字符串的空间复杂度为O(n)。
