// 给你一个字符串 word ，该字符串由数字和小写英文字母组成。
// 请你用空格替换每个不是数字的字符。例如，"a123bc34d8ef34" 将会变成 " 123  34 8  34" 。注意，剩下的这些整数为（相邻彼此至少有一个空格隔开）："123"、"34"、"8" 和 "34" 。
// 返回对 word 完成替换后形成的 不同 整数的数目。
// 只有当两个整数的 不含前导零 的十进制表示不同， 才认为这两个整数也不同。



// 输入：word = "a123bc34d8ef34"
// 输出：3
// 解释：不同的整数有 "123"、"34" 和 "8" 。注意，"34" 只计数一次。

// 输入：word = "leet1234code234"
// 输出：2

// 输入：word = "a1b01c001"
// 输出：1
// 解释："1"、"01" 和 "001" 视为同一个整数的十进制表示，因为在比较十进制值时会忽略前导零的存在。


// 方法一：双指针
// 对于每个字符串中的整数部分，使用指针 l 指向整数部分的第一个字符，指针 r 指向整数部分的最后一个字符串的下一个位置。
// 为了去除前导零，如果 r-l > 1 且 word[l] === '0' ，则我们将 l 向后移动一位。即 l++。
// 将区间 [l,r) 对应的字符串插入哈希集合中，最终字符串不同整数的数目等于哈希集合的元素数目。
/**
 * @param {string} word
 * @return {number}
 */
 var numDifferentIntegers = function (word) {
    const set = new Set();
    let l = 0, r = 0; // 定义左右指针
    while (true) {
        while (l < word.length && !isDigit(word[l])) l++;

        if (l === word.length) return set.size;

        r = l; // 移动右指针

        while (r < word.length && isDigit(word[r])) r++;

        while (r - l > 1 && word[l] === '0') l++; // 去除前导0

        set.add(word.slice(l, r));

        l = r; // 移动左指针
    }
};

const isDigit = function (ch) {
    return '0' <= ch && ch <= '9';
}
// 时间复杂度：O(n)，n 为字符串 word 的长度。
// 空间复杂度：O(n)，为哈希集合需要占用的空间。
