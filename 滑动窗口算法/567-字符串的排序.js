// 给你两个字符串 s1 和 s2 ，写一个函数来判断 s2 是否包含 s1 的排列。如果是，返回 true ；否则，返回 false 。
// 换句话说，s1 的排列之一是 s2 的 子串 。

// 输入：s1 = "ab" s2 = "eidbaooo"
// 输出：true
// 解释：s2 包含 s1 的排列之一 ("ba").

// 输入：s1= "ab" s2 = "eidboaoo"
// 输出：false

/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var checkInclusion = function (s1, s2) {
    const targetArr = new Array(26).fill(0);
    const windowArr = new Array(26).fill(0);
    // 遍历s1，建立计数数组 下标对应字母，值对应出现次数
    for (let i = 0; i < s1.length; i++) {
        targetArr[s1.charCodeAt(i) - 'a'.charCodeAt()]++;
    }
    // 遍历s2
    for (let i = 0; i < s2.length; i++) {
        // 建立滑动窗口的计数数组，滑动窗口数组的长度与目标数组长度相同
        windowArr[s2.charCodeAt(i) - 'a'.charCodeAt()]++;
        if (i >= s1.length - 1) {
            if (equal(windowArr, targetArr)) return true;
            else windowArr[s2.charCodeAt(i - s1.length + 1) - 'a'.charCodeAt()]--;
        }
    }
    return false;
};

// 辅助函数，用于比较滑动窗口中的数据与目标数据是否相同
/**
 * @param {number[]} a
 * @param {number[]} b
 * @return {boolean}
 */
function equal(a, b) {
    for (let i = 0; i < a.length; i++)
        if (a[i] !== b[i]) return false;
    return true;
}
