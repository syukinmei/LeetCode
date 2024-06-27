// 给你一个仅由小写英文字母组成的字符串 s 。在一步操作中，你可以完成以下行为：

//  - 选择 s 的任一非空子字符串，可能是整个字符串，接着将字符串中的每一个字符替换为英文字母表中的前一个字符。例如，'b' 用 'a' 替换，'a' 用 'z' 替换。

// 返回执行上述操作 恰好一次 后可以获得的 字典序最小 的字符串。
// 子字符串 是字符串中的一个连续字符序列。
// 现有长度相同的两个字符串 x 和 字符串 y ，在满足 x[i] != y[i] 的第一个位置 i 上，如果  x[i] 在字母表中先于 y[i] 出现，则认为字符串 x 比字符串 y 字典序更小 。

// 输入：s = "cbabc"
// 输出："baabc"
// 解释：我们选择从下标 0 开始、到下标 1 结束的子字符串执行操作。
// 可以证明最终得到的字符串是字典序最小的。

// 输入：s = "acbbc"
// 输出："abaab"
// 解释：我们选择从下标 1 开始、到下标 4 结束的子字符串执行操作。
// 可以证明最终得到的字符串是字典序最小的。

// 输入：s = "leetcode"
// 输出："kddsbncd"
// 解释：我们选择整个字符串执行操作。
// 可以证明最终得到的字符串是字典序最小的。

// 方法一：模拟
// 由题意可知，替换操作把 a 换成 z 会使字典序变大，其余情况都是将字典序变小，因此被替换的子串不能包含 a 。
// 为了得到字典序最小的字符串，我们需尽可能早地开始替换。
// 因此，我们要从左到右遍历，找到第一个不等于 a 的字符s [i] ，然后从下标 i 开始，把每一个字符都进行替换，直到遍历结束或者遇到了 a 。
// 额外的，需要主要字符串全为 a 的情况，由于题目要求 必须操作一次 ，可以把最后一个 a 变成 z。

/**
 * @param {string} s
 * @return {string}
 */
var smallestString = function (s) {
    const cs = s.split(""); // 将字符串转数组方便进行替换操作
    const n = cs.length;

    // 寻找第一个非 a 的下标，作为开始下标 i
    let i = 0; // 第一个非 a 的下标
    while (i < n && cs[i] === "a") {
        i++;
    }

    // 如果字符所有元素均为 a
    if (i === n) {
        cs[n - 1] = "z";
        return cs.join("");
    }

    // 基于 i 寻找第一个为 a 的下标，作为结束下标 j
    // 并将中间字符进行替换操作
    let j = i;
    while (j < n && cs[j] !== "a") {
        const newLetter = String.fromCharCode(cs[j].charCodeAt(0) - 1);
        cs[j] = newLetter;
        j++;
    }

    return cs.join("");
};
// 时间复杂度：O(n)，n 为字符串 s 的长度，最坏情况下需要完整遍历一次字符串 s。
// 空间复杂度：O(n)，n 为字符串 s 的长度，需要创建一个与字符串 s 等长的数组 cs 来方便替换操作。
