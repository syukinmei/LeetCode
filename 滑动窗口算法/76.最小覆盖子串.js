
// 给你一个字符串 s 、一个字符串 t 。返回 s 中涵盖 t 所有字符的最小子串。如果 s 中不存在涵盖 t 所有字符的子串，则返回空字符串 "" 。
// 注意：如果 s 中存在这样的子串，我们保证它是唯一的答案。

// 输入：s = "ADOBECODEBANC", t = "ABC"
// 输出："BANC"

// 输入：s = "a", t = "a"
// 输出："a"

console.log(minWindow("ADOBECODEBANC", "ABCC"));

// 滑动窗口算法
function minWindow(s, t) {
    // 排除特殊情况
    if (s.length < t.length) return '';
    if (s.includes(t)) return t;

    // window 和 need 两个哈希表，记录窗口中的字符和需要凑齐的字符
    // key是要匹配的字符，value值是1，即出现的次数
    const needs = new Map();
    const window = new Map();
    // 初始化need
    for (let val of t) {
        // const v = needs.get(val) || 0;
        // needs.set(val, v + 1)
        console.log(val)
    }


};
