// 给你一个字符串 s ，根据下述规则反转字符串：
//  - 所有非英文字母保留在原有位置。
//  - 所有英文字母（小写或大写）位置反转。
// 返回反转后的 s 。

// 输入：s = "ab-cd"
// 输出："dc-ba"

// 输入：s = "a-bC-dEf-ghIj"
// 输出："j-Ih-gfE-dCba"

// 输入：s = "Test1ng-Leet=code-Q!"
// 输出："Qedo1ct-eeLg=ntse-T!"

// 提示
// 1 <= s.length <= 100
// s 仅由 ASCII 值在范围 [33, 122] 的字符组成
// s 不含 '\"' 或 '\\'


/**
 * @param {string} s
 * @return {string}
 */
// 思路：我们使用 left 和 right 指针分别从左边右边扫描字符串 s。如果两个指针都扫描到字母，且 left < right ，那么交换 s[left] 和 s[right]，然后继续进行扫描；否则表明反转过程结束，返回处理后的字符串。
var reverseOnlyLetters = function (s) {
    const sArr = s.split('');
    let left = 0, right = s.length - 1;
    while (left < right) {
        while (/[^a-zA-Z]/.test(sArr[left])) left++;
        while (/[^a-zA-Z]/.test(sArr[right])) right--;
        if (left > right) break;
        // 反转字母
        [sArr[left++], sArr[right--]] = [sArr[right], sArr[left]];
    }
    return sArr.join('');
};
// 时间复杂度：O(n)，n 为字符串 s 的长度
// 空间复杂度：O(n)。
