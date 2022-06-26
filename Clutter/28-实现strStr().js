// 给你两个字符串 haystack 和 needle ，请你在 haystack 字符串中找出 needle 字符串出现的第一个位置（下标从 0 开始）。如果不存在，则返回  -1 。

// 说明：

// 当 needle 是空字符串时，我们应当返回什么值呢？这是一个在面试中很好的问题。

// 对于本题而言，当 needle 是空字符串时我们应当返回 0 。这与 C 语言的 strstr() 以及 Java 的 indexOf() 定义相符。

// 输入：haystack = "hello", needle = "ll"
// 输出：2

// 输入：haystack = "aaaaa", needle = "bba"
// 输出：-1


/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
// 方法一：API 大法
var strStr = function (haystack, needle) {
    return haystack.indexOf(needle);
};


// 方法二：暴力循环
var strStr = function (haystack, needle) {
    if (needle == '') return 0
    if (needle.length > haystack.length) return -1
    var i, j;
    for (i = 0; i < haystack.length; i++) {
        if (needle.charAt(0) == haystack.charAt(i)) {
            for (j = 1; j < needle.length; j++)
                if (needle.charAt(j) != haystack.charAt(i + j)) break;
            if (j == needle.length) return i
        }
    }
    return -1
};



// 方法三：KMP算法
var strStr = function (haystack, needle) {
    const next = build_next(needle); // 计算 next 数组

    let i = 0; // 主串中的指针
    let j = 0; // 子串中的子针
    while (i < haystack.length) {
        if (haystack[i] === needle[j]) {
            i++;
            j++;
        } else if (j > 0) {
            j = next[j - 1]; // 字符串失配，j 指针回退，根据 next 跳过子串前面的部分字符的比较
        } else {
            i++;
        }

        // 如果指针 j 已经到达了子串的末尾，则表示匹配成功，返回匹配的起始位置即可。
        if (j === needle.length) return i - j;
    }
    return -1;
};

const build_next = function (needle) {
    const next = [0];
    let prefix_len = 0;
    let i = 1;
    while (i < needle.length) {
        if (needle[prefix_len] === needle[i]) {
            prefix_len++;
            next[i] = prefix_len;
            i++
        } else if (prefix_len === 0) {
            next.push(0);
            i++;
        } else {
            prefix_len = next[prefix_len - 1];
        }
    }
    return next;
}
// 时间复杂度：O(n+m)，n为字符串 haystack 的长度，m为字符串 needle 的长度，我们至少需要遍历两字符串一次。
// 空间复杂度：O(m)，m为字符串 needle 的长度，我们需要构建KMP算法的 next 数组。
