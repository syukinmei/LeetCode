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

// 方法三：前缀树 + DFS
// 我们可以使用前缀树代替数组，将所有字符串进行存储。然后对于每个搜索单词 searchWord，我们使用深度优先搜索的方式进行判断。

// 具体的，我们从前缀数的根节点开始，对于当前遍历到的字母：
//  - 我们首先判断是否存在与其相同的子节点，如果存在，则继续向下遍历。
//  - 否正我们需要判断是否还有剩余的修改次数，如果没有，则说明无法匹配，返回 false。
//  - 如果有剩余的修改次数，我们可以尝试对当前的字母进行修改，然后继续向下遍历，如果当前的字母修改后对应的子节点存在，则说明匹配，否正说明不匹配，返回 false。
//  - 如果我们遍历到了单词的结尾，且修改次数恰好为 1 ，说明可以匹配，返回 true。

// 代码实现：
// 在查询时，我们使用「递归+回溯」的方法，使用递归函数 dfs(searchWord, node, pos, modified)。在前缀树 Trie 中递归查找与给定单词 searchWord 匹配的路径，允许一次字符替换。
// 其中的参数分别表示：搜索字符串 searchWord，当前遍历到的前缀树上的节点 node 以及待查询字符串 searchWord 的第 pos 个单词，并且在之前的遍历中是否已经替换过恰好一个字符（如果替换过，modified 为 true，否则为 false）。
// 如果 node 有一个值为 searchWord[pos] 的子节点，我们可以继续递归地检查剩余的部分是否匹配。同时，如果 modified 为 false，我们可以将 searchWord[pos] 替换成任意一个是 node 子节点的字符，将 modified 置为 true 并继续进行递归。
// 当 pos 等于 searchWord 的长度时，说明递归完成，我们检查 node 是否是一个前缀树上的结束节点（即一个单词的末尾），同时需要确保 modified 为 true，因为我们必须进行一次修改，如果都满足，则说明我们找到了一个匹配的单词，返回 true，否则返回 false。

// 递归函数的含义：
//   它的目标是判断是否存在一个路径（在前缀树中）与单词 searchWord 匹配且正好只差一个字符。
// 递归边界：
//   1. 字符串全部匹配完毕，即 pos 等于 searchWord 的长度，此时需要判断 node 是否是一个前缀树上的结束节点，并且需要保证 modified 为 true，因为我们必须进行一次修改。
//   2. 字符不匹配，在递归过程中，发现 node.children 中没有值为 searchWord[pos] 的子节点，且已经尝试过修改一个字符，则返回 false。
// 递归内容：
//   当前字符不修改的情况，searchWord[pos] 存在于当前节点 node.children 中，则递归检查 searchWord 的下一个字符，即 dfs(searchWord, node.children[searchWord[pos]], pos + 1, modified)。
//   尝试修改当前字符的情况，
//      - 如果当前字符还没被修改过 modified === false ，则尝试修改当前字符串为任意可能的字符，继续向下递归。
//      - 遍历当前节点的所有子节点（node.children[i]），继续递归调用，即 dfs(searchWord, node.children[i], pos + 1, true)。true 表示已经修改了一次。
// 返回值：
//   当前节点是否存在一条路径，与单词 searchWord 中的 [idx, length-1] 的子串匹配，并且正好只差一个字符。
var MagicDictionary = function () {
    this.root = new Trie();
};

/**
 * @param {string[]} dictionary
 * @return {void}
 */
MagicDictionary.prototype.buildDict = function (dictionary) {
    // 遍历字典中每个字符串，将其插入前缀树中
    for (const word of dictionary) {
        this.insert(word);
    }
};

/**
 * 向前缀树中插入字符串
 * @param {string} word
 * @return {void}
 */
MagicDictionary.prototype.insert = function (word) {
    let node = this.root;
    for (let i = 0; i < word.length; i++) {
        const ch = word[i];
        const idx = ch.charCodeAt() - "a".charCodeAt();
        if (!node.children[idx]) {
            // 如果字符不存在，创建一个新的节点
            node.children[idx] = new Trie();
        }
        node = node.children[idx]; // 指向下一个节点
    }
    node.isEnd = true; // 当前字符串已全部插入前缀树中，标识该节点为字符串的结尾
};

/**
 * @param {string} searchWord
 * @return {boolean}
 */
MagicDictionary.prototype.search = function (searchWord) {
    return dfs(searchWord, this.root, 0, false);
};

const dfs = (searchWord, node, pos, modified) => {
    // 递归出口
    if (pos === searchWord.length) return modified && node.isEnd;

    const idx = searchWord[pos].charCodeAt() - "a".charCodeAt();

    // 当前字符不修改的情况
    if (node.children[idx]) {
        if (dfs(searchWord, node.children[idx], pos + 1, modified)) return true;
    }

    // 尝试修改当前字符的情况
    if (!modified) {
        for (let i = 0; i < 26; i++) {
            if (i !== idx && node.children[i]) {
                if (dfs(searchWord, node.children[i], pos + 1, true)) return true;
            }
        }
    }
    return false;
};

class Trie {
    constructor() {
        this.isEnd = false;
        this.children = new Array(26).fill(0);
    }
}
// 时间复杂度：O(nl)，n 为字符串数组 dictionary 的长度，l 为字符串的平均长度，q 为 search 操作的次数，m 为 搜索单词 searchWord 的长度。构建前缀树的时间复杂度为 O(nl)，search 操作的时间复杂度为 O(m*Σ)，本题中 Σ 为 26，因为最多替换一次，每次替换可能有 26 种可能。。
// 空间复杂度：O(nl)，n 为字符串数组 dictionary 的长度，l 为字符串的平均长度，即为前缀树所需要使用的空间。

/**
 * Your MagicDictionary object will be instantiated and called as such:
 * var obj = new MagicDictionary()
 * obj.buildDict(dictionary)
 * var param_2 = obj.search(searchWord)
 */
