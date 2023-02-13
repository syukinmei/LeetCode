// 有一个只含有 'Q', 'W', 'E', 'R' 四种字符，且长度为 n 的字符串。
// 假如在该字符串中，这四个字符都恰好出现 n/4 次，那么它就是一个「平衡字符串」。

// 给你一个这样的字符串 s，请通过「替换一个子串」的方式，使原字符串 s 变成一个「平衡字符串」。
// 你可以用和「待替换子串」长度相同的 任何 其他字符串来完成替换。
// 请返回待替换子串的最小可能长度。
// 如果原字符串自身就是一个平衡字符串，则返回 0。

// 输入：s = "QWER"
// 输出：0
// 解释：s 已经是平衡的了。

// 输入：s = "QQWE"
// 输出：1
// 解释：我们需要把一个 'Q' 替换成 'R'，这样得到的 "RQWE" (或 "QRWE") 是平衡的。

// 输入：s = "QQQW"
// 输出：2
// 解释：我们可以把前面的 "QQ" 替换成 "ER"。 

// 输入：s = "QWEQWQRQ"
// 输出：3
// 解释：有 4Q 2W 1E 1R


/**
 * @param {string} s
 * @return {number}
 */
var balancedString = function (s) {
    const n = s.length;
    // 构建词频表
    const cnt = new Array(26).fill(0);
    for (let i = 0; i < n; i++) {
        const c = s[i];
        cnt[idx(c)]++;
    }

    const partial = n / 4;
    if (check(cnt, partial)) return 0; // 检测初始字符串是否为平衡字符串

    let l = 0, r = 0, res = n; // 初始化滑动窗口左右边界和结果值
    while (r < n) {
        cnt[idx(s[r])]--;
        r++;
        while (check(cnt, partial)) {
            res = Math.min(res, r - l); // 更新结果
            // 左边界右移，缩小窗口
            cnt[idx(s[l])]++;
            l++
        }
    }
    return res;
};

// 辅助函数，返回大写字母的下标
const idx = (c) => {
    return c.charCodeAt() - 'A'.charCodeAt();
}

// 辅助函数，检查词频表中的词频是否均小于等于目标个数
const check = (cnt, partial) => {
    if (cnt[idx('Q')] <= partial && cnt[idx('W')] <= partial && cnt[idx('E')] <= partial && cnt[idx('R')] <= partial) return true;
    return false;
}