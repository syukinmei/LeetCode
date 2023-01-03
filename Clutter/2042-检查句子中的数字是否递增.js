// 句子是由若干 token 组成的一个列表，token 间用 单个 空格分隔，句子没有前导或尾随空格。每个 token 要么是一个由数字 0-9 组成的不含前导零的 正整数 ，要么是一个由小写英文字母组成的 单词 。
//  - 示例，"a puppy has 2 eyes 4 legs" 是一个由 7 个 token 组成的句子："2" 和 "4" 是数字，其他像 "puppy" 这样的 tokens 属于单词。
// 给你一个表示句子的字符串 s ，你需要检查 s 中的 全部 数字是否从左到右严格递增（即，除了最后一个数字，s 中的 每个 数字都严格小于它 右侧 的数字）。
// 如果满足题目要求，返回 true ，否则，返回 false 。


// 输入：s = "1 box has 3 blue 4 red 6 green and 12 yellow marbles"
// 输出：true
// 解释：句子中的数字是：1, 3, 4, 6, 12 。
// 这些数字是按从左到右严格递增的 1 < 3 < 4 < 6 < 12 。

// 输入：s = "hello world 5 x 5"
// 输出：false
// 解释：句子中的数字是：5, 5 。这些数字不是严格递增的。

// 输入：s = "sunset is at 7 51 pm overnight lows will be in the low 50 and 60 s"
// 输出：false
// 解释：s 中的数字是：7, 51, 50, 60 。这些数字不是严格递增的

// 输入：s = "4 5 11 26"
// 输出：true
// 解释：s 中的数字是：4, 5, 11, 26 。
// 这些数字是按从左到右严格递增的：4 < 5 < 11 < 26 。


// 辅助函数，判断是否为数字，返回 Boolean。
const isDigit = (ch) => {
    return parseFloat(ch).toString() === "NaN" ? false : true;
}



/**
 * @param {string} s
 * @return {boolean}
 */
// 方法一：API
// String.split(' ') 将 token 字符串转sArr数组。维护一个 pre 记录前一个数字 token 的值。
// 遍历 sArr token 数组。记当前 token ch 。如果 ch 为数字，则与 pre 进行比较。
// ch <= pre，则认为不满足递增需求，返回 false ，否则维护 pre ，pre = ch。
var areNumbersAscending = function (s) {
    const sArr = s.split(' ');
    let pre = 0; // s 中的每个数字都是一个小于 100 的正数，且不含前导零
    for (let ch of sArr) {
        if (!isDigit(ch)) continue;
        // 一元加实现字符串转数字。
        if (pre < +ch) {
            pre = +ch;
        } else {
            return false;
        }
    }
    return true;
};


// 方法二：不使用API模拟
var areNumbersAscending = function (s) {
    let pre = 0; // s 中的每个数字都是一个小于 100 的正数，且不含前导零
    let i = 0;
    while (i < s.length) {
        if (isDigit(s[i])) {
            let cur = 0;
            while (i < s.length && isDigit(s[i])) {
                cur = cur * 10 + s[i].charCodeAt() - '0'.charCodeAt();
                i++;
            }
            if (cur <= pre) return false;
            pre = cur;
        }
        i++;
    }
    return true;
};
// 时间复杂度：O(n)，n 为字符串 s 的长度，我们至多需要遍历一次字符串即可。
// 空间复杂度：O(1)，只需要常数的空间存放若干变量。


// 方法三：正则
var areNumbersAscending = function (s) {
    let arr = s.match(/\d{1,}/g); // 匹配包含至少 1 个 数字 的序列的字符串
    for (let i = 0; i < arr.length - 1; i++) {

        if (Number(arr[i]) >= Number(arr[i + 1])) {

            return false
        }
    }
    return true
};
