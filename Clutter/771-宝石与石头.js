//  给你一个字符串 jewels 代表石头中宝石的类型，另有一个字符串 stones 代表你拥有的石头。 stones 中每个字符代表了一种你拥有的石头的类型，你想知道你拥有的石头中有多少是宝石。

// 字母区分大小写，因此 "a" 和 "A" 是不同类型的石头。

// 输入：jewels = "aA", stones = "aAAbbbb"
// 输出：3

// 输入：jewels = "z", stones = "ZZ"
// 输出：0


// 方法一：暴力枚举
// 遍历字符串 stones，对于 stones 中的每个字符，还需要遍历一次字符串 jewels，如果其和 jewels 中的某个字符相同，则是宝石
// 时间复杂度：O(mn)，m 为字符串 jewels 的长度，n 为字符串 stones 的长度。
// 空间复杂度：O(1)，只需要常数的空间存放若干变量。


// 方法二：哈希集合+遍历
// 遍历字符串 jewels，使用哈希集合存储其中的字符，然后遍历字符串 stones ，对于其中的每个字符，如果其在哈希集合中则是宝石。
/**
 * @param {string} jewels
 * @param {string} stones
 * @return {number}
 */
var numJewelsInStones = function (jewels, stones) {
    const jewelsSet = new Set(jewels.split(''));

    let count = 0;
    for (let stone of stones) {
        if (jewelsSet.has(stone)) count++;
    }
    return count;
};
// 时间复杂度：O(m+n)，m 为字符串 jewels 的长度，n 为字符串 stones 的长度。遍历字符串 jewels 将其中的字符存储到哈希集合中，时间复杂度为O(m)，然后遍历 stones 时间复杂度为O(n)。因此总时间复杂度为O(m+n)。
// 空间复杂度：O(m)，m 为字符串 jewels 的长度，使用哈希集合存储字符串 jewels 中的字符。
