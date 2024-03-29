// 一个由字母和数字组成的字符串的 值 定义如下：

//  - 如果字符串 只 包含数字，那么值为该字符串在 10 进制下的所表示的数字。
//  - 否则，值为字符串的 长度 。
// 给你一个字符串数组 strs ，每个字符串都只由字母和数字组成，请你返回 strs 中字符串的 最大值 。

// 输入：strs = ["alic3","bob","3","4","00000"]
// 输出：5
// 解释：
// - "alic3" 包含字母和数字，所以值为长度 5 。
// - "bob" 只包含字母，所以值为长度 3 。
// - "3" 只包含数字，所以值为 3 。
// - "4" 只包含数字，所以值为 4 。
// - "00000" 只包含数字，所以值为 0 。
// 所以最大的值为 5 ，是字符串 "alic3" 的值。

// 输入：strs = ["1","01","001","0001"]
// 输出：1
// 解释：
// 数组中所有字符串的值都是 1 ，所以我们返回 1 。

// 方法一：模拟
// 遍历数组 strs 中的字符串，判断字符串是否只包含数字，如果是则转换为十进制下所表示的数字，否则值为字符串的长度。
// 返回字符串数组 strs 中的最大值。
/**
 * @param {string[]} strs
 * @return {number}
 */
var maximumValue = function (strs) {
  let res = 0;
  for (let s of strs) {
    let val_s = Number.isNaN(Number(s)) ? s.length : Number(s);
    res = Math.max(res, val_s);
  }
  return res;
};
// 时间复杂度：O(n)，n 为字符串数组 strs 的长度，需要遍历数组中的每一个字符串，并获取其值。
// 空间复杂度：O(1)，只需要常数的空间存放若干变量。
