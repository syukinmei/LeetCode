// 字符串有三种编辑操作:插入一个字符、删除一个字符或者替换一个字符。 给定两个字符串，编写一个函数判定它们是否只需要一次(或者零次)编辑。

// 输入: 
// first = "pale"
// second = "ple"
// 输出: True

// 输入: 
// first = "pales"
// second = "pal"
// 输出: False

/**
 * @param {string} first
 * @param {string} second
 * @return {boolean}
 */
// 分情况讨论
// 首先，两字符串长度差1以上一定不行。
// 记 first 和 second 的长度分别为 n、m
// 需要一次编辑，可能有 3 种情况：
//  - 1. 往 first 中插入一个字符得到 second ，此时 m-n = 1，即 second 比 first 多一个字符串，其余字符都相同
//  - 2. 往 first 中删除一个字符得到 second ，此时 n-m = 1，即 first 比 second 多一个字符串，其余字符都相同
//  - 3. 将 first 中的一个字符替换成不同的字符得到 second ，此时 n = m ，first 和 second 恰好有一个字符不同，且在同一个下标。
// 需要零次编辑的情况为，n = m 且 first与second相等。
// 根据上述分析，首先计算first 和 second 的长度关系，判断是以上哪种情况。，
//  Tips：m-n = 1 和 n-m=1 的情况具有对称性，可以统一计算这两种情况。具体实现是：
// 同时遍历两个字符，比较对应下标处的字符串是否相同，如果相同，两个字符串的下标同时 +1 ，不同则，字符串长度较长的下标 +1。遍历的过程判断两个字符串的下标之差是否大于1，大于1则不符合一次编辑。
var oneEditAway = function (first, second) {
    const n = first.length;
    const m = second.length;
    if (Math.abs(n - m) > 1) return false;
    if (first === second) return true;
    if (m - n === 1) {
        return oneEditAway(second, first);
    }
    if (n === m) {
        let diffCount = 0;
        for (let i = 0; i < n; i++) {
            if (first[i] !== second[i] && ++diffCount === 2) {
                return false;
            }
        }
        return true;
    }
    if (n - m === 1) {
        let fIndex = 0, sIndex = 0;
        while (fIndex < n) {
            if (first[fIndex] === second[sIndex]) {
                sIndex++;
            }
            fIndex++;
            if (fIndex - sIndex > 1) return false;
        }
        return true;
    }
};
// 时间复杂度：O(max(n, m))，n 和 m 分别为 first 和 second 的长度。
// 空间复杂度：O(1)，只需要常数的空间存放若干变量。
