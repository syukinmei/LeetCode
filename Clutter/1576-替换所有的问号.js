// 给你一个仅包含小写英文字母和 '?' 字符的字符串 s，请你将所有的 '?' 转换为若干小写字母，使最终的字符串不包含任何 连续重复 的字符。
// 注意：你 不能 修改非 '?' 字符。
// 题目测试用例保证 除 '?' 字符 之外，不存在连续重复的字符。
// 在完成所有转换（可能无需转换）后返回最终的字符串。如果有多个解决方案，请返回其中任何一个。可以证明，在给定的约束条件下，答案总是存在的。


// 输入：s = "?zs"
// 输出："azs"
// 解释：该示例共有 25 种解决方案，从 "azs" 到 "yzs" 都是符合题目要求的。只有 "z" 是无效的修改，因为字符串 "zzs" 中有连续重复的两个 'z' 。

// 输入：s = "ubv?w"
// 输出："ubvaw"
// 解释：该示例共有 24 种解决方案，只有替换成 "v" 和 "w" 不符合题目要求。因为 "ubvvw" 和 "ubvww" 都包含连续重复的字符。

// 输入：s = "j?qg??b"
// 输出："jaqgacb"

// 输入：s = "??yw?ipkj?"
// 输出："acywaipkja"


/**
 * @param {string} s
 * @return {string}
 */
//  遍历字符串 s，如果遇到第 i 个字符 s[i] 为 ? 时，此时直接在英文字母 a-z 中找到一个与 s[i−1] 和 s[i+1] 均不相同的字母进行替换即可。
// 注意：由于只需要确保与前后 2 个字符不同，因此必然最多在 3 个字符内找到可替换的值
var modifyString = function (s) {
    const sArr = [...s];
    for (let i = 0; i < sArr.length; i++) {
        if (sArr[i] === '?') {
            for (let j = 0; j < 3; j++) {
                if (i > 0 && sArr[i - 1] === String.fromCharCode(97 + j)
                    || i < sArr.length - 1 && sArr[i + 1] === String.fromCharCode(97 + j)
                ) {
                    continue;
                } else {
                    sArr[i] = String.fromCharCode(97 + j);
                    break;
                }
            }
        }
    }
    return sArr.join('');
};



// 时间复杂度：O(C*n)，n为字符串的长度，我们需要遍历一次字符串，C表示可替代字符的数量，本题中C=3。
// 空间复杂度：O(1)，除了函数返回值以外我们不需要申请额外的空间。