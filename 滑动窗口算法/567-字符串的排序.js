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
    // 遍历s2，在字符串内部使用滑动窗口逐一访问判断
    for (let i = 0; i < s2.length; i++) {
        // 建立滑动窗口的计数数组，滑动窗口数组的长度与目标数组长度相同
        windowArr[s2.charCodeAt(i) - 'a'.charCodeAt()]++;
        // 滑动窗口创建完成之前不进行任何操作，长度不同不可能与目标数组相符
        if (i >= s1.length - 1) {
            // 滑动窗口创建完毕之后即刻开始与目标窗口进行比对，比对一致即返回true
            if (equal(windowArr, targetArr)) return true;
            // 比对不一致，则滑动窗口向右滑动，最左边字符退出窗口，进入下一次循坏，在下一次循环中又会将窗口外右边的第一个字符放入窗口
            else windowArr[s2.charCodeAt(i - s1.length + 1) - 'a'.charCodeAt()]--;
        }
    }
    // 比对完成都没有发现匹配数据，则说明无匹配数据，返回false
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