// 一位老师正在出一场由 n 道判断题构成的考试，每道题的答案为 true （用 'T' 表示）或者 false （用 'F' 表示）。老师想增加学生对自己做出答案的不确定性，方法是 最大化 有 连续相同 结果的题数。（也就是连续出现 true 或者连续出现 false）。

// 给你一个字符串 answerKey ，其中 answerKey[i] 是第 i 个问题的正确结果。除此以外，还给你一个整数 k ，表示你能进行以下操作的最多次数：

// 每次操作中，将问题的正确答案改为 'T' 或者 'F' （也就是将 answerKey[i] 改为 'T' 或者 'F' ）。
// 请你返回在不超过 k 次操作的情况下，最大 连续 'T' 或者 'F' 的数目。



// 输入：answerKey = "TTFF", k = 2
// 输出：4
// 解释：我们可以将两个 'F' 都变为 'T' ，得到 answerKey = "TTTT" 。
// 总共有四个连续的 'T' 。


// 输入：answerKey = "TFFT", k = 1
// 输出：3
// 解释：我们可以将最前面的 'T' 换成 'F' ，得到 answerKey = "FFFT" 。
// 或者，我们可以将第二个 'T' 换成 'F' ，得到 answerKey = "TFFF" 。
// 两种情况下，都有三个连续的 'F' 。


// 输入：answerKey = "TTFTTFTT", k = 1
// 输出：5
// 解释：我们可以将第一个 'F' 换成 'T' ，得到 answerKey = "TTTTTFTT" 。
// 或者我们可以将第二个 'F' 换成 'T' ，得到 answerKey = "TTFTTTTT" 。
// 两种情况下，都有五个连续的 'T' 。

/**
 * @param {string} answerKey
 * @param {number} k
 * @return {number}
 */
// 方法一：滑动窗口
// 我们可以使用滑动窗口的方法计算出连续相同字符的最大长度。
// 具体的，使用一个辅助函数 f(c) ，计算最多替换 k 个字符 c 的情况下，连续相同字符的最大长度。其中 c 就是题目中的 "T" 或 "F"。
// 此时我们的答案就是 max(f("T"), f("F")
// 我们在遍历字符串 answerKey 的时候，如果 k 不足即 k < 0，我们将窗口的左边界向右移动，直到 k >= 0。遍历结束后滑动窗口最大长度即为「将 k 个字符串修改为 char 后最大连续字符的长度」。
var maxConsecutiveAnswers = function (answerKey, k) {
    return Math.max(maxConsecutiveChar(answerKey, k, 'T'), maxConsecutiveChar(answerKey, k, 'F'));
};

// 辅助函数
const maxConsecutiveChar = function (answerKey, k, char) {
    let res = 0, left = 0, right = 0; // res 为滑动窗口的最大长度
    while (right < answerKey.length) {
        if (answerKey[right] !== char) {
            k--;
            // 窗口缩小，左边界向右移动，直到 k >= 0
            while (k < 0) {
                if (answerKey[left] !== char) k++;
                left++;
            }
        }
        // 更新窗口最大值
        res = Math.max(res, right - left + 1);
        right++;
    }
    // res 即为将 k 个字符串修改为 char 后，连续相同字符的最大长度。
    return res;
}
// 时间复杂度：O(n)，n 为字符串 answerKey 的长度，我们只需要遍历字符串两次，分别判断 T 和 K 的情况。
// 空间复杂度：O(1)，只需要常数的空间存放若干变量。
