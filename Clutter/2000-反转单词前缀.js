// 给你一个下标从 0 开始的字符串 word 和一个字符 ch 。找出 ch 第一次出现的下标 i ，反转 word 中从下标 0 开始、直到下标 i 结束（含下标 i ）的那段字符。如果 word 中不存在字符 ch ，则无需进行任何操作。

// 例如，如果 word = "abcdefd" 且 ch = "d" ，那么你应该 反转 从下标 0 开始、直到下标 3 结束（含下标 3 ）。结果字符串将会是 "dcbaefd" 。
// 返回 结果字符串 。


// 输入：word = "abcdefd", ch = "d"
// 输出："dcbaefd"
// 解释："d" 第一次出现在下标 3 。 
// 反转从下标 0 到下标 3（含下标 3）的这段字符，结果字符串是 "dcbaefd" 。

// 输入：word = "xyxzxe", ch = "z"
// 输出："zxyxxe"
// 解释："z" 第一次也是唯一一次出现是在下标 3 。
// 反转从下标 0 到下标 3（含下标 3）的这段字符，结果字符串是 "zxyxxe" 。

// 输入：word = "abcd", ch = "z"
// 输出："abcd"
// 解释："z" 不存在于 word 中。
// 无需执行反转操作，结果字符串是 "abcd" 。


/**
 * @param {string} word
 * @param {character} ch
 * @return {string}
 */
// 方法一：API大法
var reversePrefix = function (word, ch) {
    let iFlip = word.indexOf(ch);

    let flip = word.slice(0, iFlip + 1).split('').reverse().join('');

    let res = flip + word.slice(iFlip + 1);

    return res;
};


// 方法二：双指针模拟
 var reversePrefix = function (word, ch) {
    let iFlip = word.indexOf(ch); // 获取ch第一次出现的下标
    if (iFlip !== -1) { // 说明 word 中存在 ch
        // 利用双指针进行反转
        let left = 0, right = iFlip;
        const wordArr = [...word]; // 字符串转数组用于反转
        while (left < right) {
            let temp = wordArr[left];
            wordArr[left] = wordArr[right];
            wordArr[right] = temp;
            // [wordArr[left], wordArr[right]] = [wordArr[right], wordArr[left]];
            left++;
            right--;
        }
        // 数组转字符串用于返回
        word = wordArr.join('');
    }
    return word;
};
// 时间复杂度：O(n)，n为字符串 word 的长度。查找和反转都需要O(n)。
// 空间复杂度：O(n)，取决于编程语言，对于字符串不可变的语言，空间空间复杂度为O(n)，否则为O(1)。