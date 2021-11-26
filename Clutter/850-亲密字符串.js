// 给你两个字符串 s 和 goal ，只要我们可以通过交换 s 中的两个字母得到与 goal 相等的结果，就返回 true ；否则返回 false 。
// 交换字母的定义是：取两个下标 i 和 j （下标从 0 开始）且满足 i != j ，接着交换 s[i] 和 s[j] 处的字符。
// 例如，在 "abcd" 中交换下标 0 和下标 2 的元素可以生成 "cbad" 。


// 输入：s = "ab", goal = "ba"
// 输出：true
// 解释：你可以交换 s[0] = 'a' 和 s[1] = 'b' 生成 "ba"，此时 s 和 goal 相等。

// 输入：s = "ab", goal = "ab"
// 输出：false
// 解释：你只能交换 s[0] = 'a' 和 s[1] = 'b' 生成 "ba"，此时 s 和 goal 不相等。

// 输入：s = "aa", goal = "aa"
// 输出：true
// 解释：你可以交换 s[0] = 'a' 和 s[1] = 'a' 生成 "aa"，此时 s 和 goal 相等。

// 输入：s = "aaaaaaabc", goal = "aaaaaaacb"
// 输出：true


/**
 * @param {string} s
 * @param {string} goal
 * @return {boolean}
 */
// 方法一：模拟
var buddyStrings = function (s, goal) {
    // 1、长度不想等必定不是亲密字符串
    if (s.length !== goal.length) return false;

    // 2、字符串相同 如果有重复元素返回true('aab') 无重复元素返回false('ab')
    if (s === goal) {
        const sArr = s.split('');
        // [...new Set(sArr)].length === s.length
        if (Array.from(new Set(sArr)).length === s.length) {
            return false;
        } else {
            return true;
        }
    }

    // 3、字符串不同 遍历字符串 3处不同返回false 2处不同 且 不同的位置交换后对应的元素相等返回true
    let [left, right] = [-1, -1]; // 记录两处不同的位置
    for (let i = 0; i < s.length; i++) {
        if (s.charAt(i) !== goal.charAt(i)) {
            if (left === -1) {
                left = i;
            } else if (right === -1) {
                right = i;
            } else {
                // 发现第三处不同 直接返回false
                return false;
            }
        }
    }
    // 2处不同 且 不同的位置交换后对应的元素相等
    return s.charAt(left)===goal.charAt(right)&&s.charAt(right)===goal.charAt(left);
};