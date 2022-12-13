// 全字母句 指包含英语字母表中每个字母至少一次的句子。
// 给你一个仅由小写英文字母组成的字符串 sentence ，请你判断 sentence 是否为 全字母句 。
// 如果是，返回 true ；否则，返回 false 。


// 输入：sentence = "thequickbrownfoxjumpsoverthelazydog"
// 输出：true
// 解释：sentence 包含英语字母表中每个字母至少一次。

// 输入：sentence = "leetcode"
// 输出：false

/**
 * @param {string} sentence
 * @return {boolean}
 */
// 方法一：循环
// 由于字符串 sentence 仅由小写英文字母组成，所以我们用一个长度为 26 的数组 Map_freq 作为词频表来统计每个字母的出现次数。
// 遍历字符串 sentence 构建词频表，最后检测词频表是否存在出现0次的字母，存在返回false，否则返回true。
var checkIfPangram = function (sentence) {
    const Map_freq = new Array(26).fill(0); // 词频表。下标对应小写字母顺序，值对应字母出现的次数。
    for (let i = 0; i < sentence.length; i++) {
        const chIdx = sentence[i].charCodeAt() - 'a'.charCodeAt();
        Map_freq[chIdx]++;
    }
    for (const x of Map_freq) {
        if (x === 0) return false;
    }
    return true;
};
// 时间复杂度：O(n+C)，n 为字符串 sentence 的长度，C 为字符集（词频表）的大小，本题词频表只包含26个小写英文字母，所以 C 为26，整个过程需要遍历一次 sentence 和 Map_freq。
// 空间复杂度：O(C)，C 为字符集（词频表）的大小，本题词频表只包含26个小写英文字母，所以 C 为26。


// 方法二：位运算
// 本题我们只需知道每个字母是否出现过，而不需要知道其出现次数，所以我们可以使用 一个长度为 26 的二进制数字来表示字符集合即可。
// 二进制数的第 i 位表示第 i 个字母是否出现过。最后判断这个数字在二进制表示中是否有26个1，即判断该数字是否等于 2^26 - 1。 
// 具体的：
// 初始化一个整型变量 exist 为 0，遍历 sentence 中的每个字母 c，如果 c 是字母表中的第 i(0<=i<=26) 个字母，就将 exist 的二进制表示中的第 i 位赋值为 1。这个过程中，将 exist 与 2^i 做或运算，2^i 可以用左移运算实现 1<<i 。
// 最后，我们只需要判断 exist 是否等于 2^26 - 1即可，如果是表面这数的二进制表示中第 0～25 位都为 1，其余为0，返回true，否则返回false。
var checkIfPangram = function (sentence) {
    let exist = 0;
    for (let i = 0; i < sentence.length; i++) {
        const idx = sentence[i].charCodeAt() - 'a'.charCodeAt();
        // exist |= 2 ** idx;
        exist |= 1 << idx;
    }
    // return exist === 2 ** 26 - 1;
    return exist === (1 << 26) - 1;
};
// 时间复杂度：O(n)，n 为字符串 sentence 的长度，我们需要对其遍历一次。
// 空间复杂度：O(1)，只需要常数的空间存放若干变量。
