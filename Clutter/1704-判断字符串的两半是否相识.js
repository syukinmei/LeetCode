// 给你一个偶数长度的字符串 s 。将其拆分成长度相同的两半，前一半为 a ，后一半为 b 。

// 两个字符串 相似 的前提是它们都含有相同数目的元音（'a'，'e'，'i'，'o'，'u'，'A'，'E'，'I'，'O'，'U'）。注意，s 可能同时含有大写和小写字母。

// 如果 a 和 b 相似，返回 true ；否则，返回 false 。


// 输入：s = "book"
// 输出：true
// 解释：a = "bo" 且 b = "ok" 。a 中有 1 个元音，b 也有 1 个元音。所以，a 和 b 相似。

// 输入：s = "textbook"
// 输出：false
// 解释：a = "text" 且 b = "book" 。a 中有 1 个元音，b 中有 2 个元音。因此，a 和 b 不相似。
// 注意，元音 o 在 b 中出现两次，记为 2 个。



// 将给的多字符串 s 拆分为长度相同的两半，前一半表示字符串a，后一半表示字符串b，我们需要判断 a 和 b是否相似，只需要按照 「相似」的定义，统计 a 和 b 中元音字母的个数是否相等即可。
/**
 * @param {string} s
 * @return {boolean}
 */
var halvesAreAlike = function (s) {
    const a = s.slice(0, s.length / 2);
    const b = s.slice(s.length / 2);
    const yy = 'aeiouAEIOU';
    let [sum1, sum2] = [0, 0];
    for (let i = 0; i < s.length / 2; i++) {
        if (yy.includes(a[i])) sum1++;
        if (yy.includes(b[i])) sum2++;
    }
    return sum1 === sum2;
};
