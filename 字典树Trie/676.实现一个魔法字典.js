// 设计一个使用单词列表进行初始化的数据结构，单词列表中的单词 互不相同 。 如果给出一个单词，请判定能否只将这个单词中一个字母换成另一个字母，使得所形成的新单词存在于你构建的字典中。
// 实现 MagicDictionary 类：
//  - MagicDictionary() 初始化对象
//  - void buildDict(String[] dictionary) 使用字符串数组 dictionary 设定该数据结构，dictionary 中的字符串互不相同
//  - bool search(String searchWord) 给定一个字符串 searchWord ，判定能否只将字符串中 一个 字母换成另一个字母，使得所形成的新字符串能够与字典中的任一字符串匹配。如果可以，返回 true ；否则，返回 false 。

// 输入
// ["MagicDictionary", "buildDict", "search", "search", "search", "search"]
// [[], [["hello", "leetcode"]], ["hello"], ["hhllo"], ["hell"], ["leetcoded"]]
// 输出
// [null, null, false, true, false, false]

// 解释
// MagicDictionary magicDictionary = new MagicDictionary();
// magicDictionary.buildDict(["hello", "leetcode"]);
// magicDictionary.search("hello"); // 返回 False
// magicDictionary.search("hhllo"); // 将第二个 'h' 替换为 'e' 可以匹配 "hello" ，所以返回 True
// magicDictionary.search("hell"); // 返回 False
// magicDictionary.search("leetcoded"); // 返回 False

// 提示：
// 1 <= dictionary.length <= 100
// 1 <= dictionary[i].length <= 100
// dictionary[i] 仅由小写英文字母组成
// dictionary 中的所有字符串 互不相同
// 1 <= searchWord.length <= 100
// searchWord 仅由小写英文字母组成
// buildDict 仅在 search 之前调用一次
// 最多调用 100 次 search

// 方法一：模拟
// 枚举每个字典中的字符串并进行判断
// 对于本题来说，我们可以很快想到两种解法：
//  - 第一种，把字典中的所有字符串存储到数组中，而当进行 search 操作时，我们遍历数组中的每个字符串，判断 searchWord 是否可以通过改变一个字符变成该字符串。
//  - 第二种，提前把字典中每个字符串替换成任意字母的结果存在哈希表中，这样 search 操作就只需要判断 searchWord 是否在哈希表中即可。
// 记字典中字符串的个数为 n ，平均长度为 l，查询的次数为 q，字符集为 Σ。那么：
//  - 第一种方法需要 O(1) 的时间把所有字符串存储到数组中，每一次查询需要 O(nl) 的时间，总的时间复杂度为 O(nlq)。
//  - 第二种方法需要 O(nlΣ) 的时间把所有字符串替换成任意字母的结果存储到哈希表中，每次查询仅需要 O(1) 的时间，总的时间复杂度为 O(nlΣ + q)。
// 在本题中数据范围中 n，l，q 均为 100，而 Σ = 26，因此第一种方法的时间复杂度较低，第二种方法的时间复杂度较高。因此可以采取第一种。
// 在比较两个字符串时，我们首先需要保证它们的长度相等，随后遍历这两个字符串，需要保证这两个字符串恰好有一个位置对应的字符串不同。

var MagicDictionary = function () {
    this.words = [];
};

/**
 * @param {string[]} dictionary
 * @return {void}
 */
MagicDictionary.prototype.buildDict = function (dictionary) {
    this.words = dictionary;
};

/**
 * @param {string} searchWord
 * @return {boolean}
 */
MagicDictionary.prototype.search = function (searchWord) {
    for (const word of this.words) {
        // 长度不同一定不匹配
        if (word.length !== searchWord.length) {
            continue;
        }
        let diff = 0;
        for (let i = 0; i < word.length; i++) {
            if (word[i] !== searchWord[i]) {
                diff++;
                if (diff > 1) {
                    break;
                }
            }
        }
        // 当前字符串与 searchWord 恰好只有一个字符不同，因此匹配
        if (diff === 1) return true;
    }
    // 遍历完所有字符串，没有找到符合条件的字符串
    return false;
};
// 时间复杂度：O(nlq)，n 为字符串数组 dictionary 的长度，l 为字符串的平均长度，q 为 search 操作的次数。每次 search 操作需要遍历字典中每个字符串的每个字符，需要 O(nl) 的时间复杂度，需要操作 q 次，因此总的时间复杂度为 O(nlq)。
// 空间复杂度：O(n)，n 为字符串数组 dictionary 的长度，用于构建 words 字典。

/**
 * Your MagicDictionary object will be instantiated and called as such:
 * var obj = new MagicDictionary()
 * obj.buildDict(dictionary)
 * var param_2 = obj.search(searchWord)
 */
