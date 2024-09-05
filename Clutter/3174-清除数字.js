// 给你一个字符串 s 。
// 你的任务是重复以下操作删除 所有 数字字符：
//  - 删除 第一个数字字符 以及它左边 最近 的 非数字 字符。
// 请你返回删除所有数字字符以后剩下的字符串。

// 输入：s = "abc"
// 输出："abc"
// 解释：
// 字符串中没有数字。

// 输入：s = "cb34"
// 输出：""
// 解释：
// 一开始，我们对 s[2] 执行操作，s 变为 "c4" 。
// 然后对 s[1] 执行操作，s 变为 "" 。

// 提示：
// 1 <= s.length <= 100
// s 只包含小写英文字母和数字字符。
// 输入保证所有数字都可以按以上操作被删除。

// 方法一：栈
// 根据题意，我们可以使用栈来模拟所有操作。具体的，我们遍历字符串 s 时，根据当前字符 c 有两种处理情况：
//  - c 为数字，那么我们将栈顶字符串弹出。
//  - c 为非数字，那么我们将 c 入栈。
// 最后返回栈中自底向上的所有字符组成的字符串为结果。
/**
 * @param {string} s
 * @return {string}
 */
var clearDigits = function (s) {
    const stack = []; // 栈
    const isDigit = /^\d$/;
    for (const c of s) {
        const isNumericChar = isDigit.test(c); // 判断是否是数字字符

        if (isNumericChar) stack.pop(); // 是则栈顶字符出栈
        else stack.push(c); // 不是则当前字符入栈
    }
    return stack.join(""); // 返回栈中自底向上的所有字符组成的字符串为结果
};
// 时间复杂度：O(n)，n 为字符串 s 的长度，需要遍历字符串 s 一次。
// 空间复杂度：O(n)，n 为 stack 栈的空间消耗，最坏情况下 s 中的所有字符都是非数字字符，都需要入栈。
