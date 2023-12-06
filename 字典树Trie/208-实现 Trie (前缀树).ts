// Trie（发音类似 "try"）或者说 前缀树 是一种树形数据结构，用于高效地存储和检索字符串数据集中的键。这一数据结构有相当多的应用情景，例如自动补完和拼写检查。

// 请你实现 Trie 类：

// Trie() 初始化前缀树对象。
// void insert(String word) 向前缀树中插入字符串 word 。
// boolean search(String word) 如果字符串 word 在前缀树中，返回 true（即，在检索之前已经插入）；否则，返回 false 。
// boolean startsWith(String prefix) 如果之前已经插入的字符串 word 的前缀之一为 prefix ，返回 true ；否则，返回 false 。

// 示例：
// 输入
// ["Trie", "insert", "search", "search", "startsWith", "insert", "search"]
// [[], ["apple"], ["apple"], ["app"], ["app"], ["app"], ["app"]]
// 输出
// [null, null, true, false, true, null, true]

// 解释
// Trie trie = new Trie();
// trie.insert("apple");
// trie.search("apple");   // 返回 True
// trie.search("app");     // 返回 False
// trie.startsWith("app"); // 返回 True
// trie.insert("app");
// trie.search("app");     // 返回 True

// ps:
// 1 <= word.length, prefix.length <= 2000
// word 和 prefix 仅由小写英文字母组成
// insert、search 和 startsWith 调用次数 总计 不超过 3 * 104 次

// 实现思路：
// 1. 定义了一个 TrieNode 类，用于表示前缀树的节点。每个节点包含一个子节点的映射表 children 和一个标记 isEnd，用于标记是否是单词的结尾。
// 2. 定义 Trie 类，用于表示前缀树，它包含一个根节点，提供三个方法。
//  - 插入字符串
//      从字典树的根节点 root 开始，将字符串的字符逐一插入。插入之前需要确认字符对应的节点是否存在
//        存在，则共享该节点，指针移动到子节点，继续处理下一个字符。
//        不存在，则需要创建一个新的子节点，记录在 子节点的对应位置上，然后沿着指针移动到子节点，继续处理下一个字符。
//      重复以上步骤，直到处理完字符串的最后一个字符，然后使用 isEnd = true 将当前节点标记为字符串的结尾。
//  - 查找前缀
//      从字典树的根节点 root 开始，查找是否含有目标字符串作为前缀的节点
//        节点存在且有 isEnd = true 的结束标识，则查找成功，否则查找失败。
//  - 前缀查找
//      流程和查找一样，但无需关心 isEnd 标识。

// 定义前缀树节点
class TrieNode {
  children: { [key: string]: TrieNode }; // 子节点的映射表，本题是 a-z
  isEnd: boolean; // 标记是否是单词的结尾

  constructor() {
    this.children = {};
    this.isEnd = false;
  }
}

// 定义前缀树
class Trie {
  root: TrieNode; // 根节点

  constructor() {
    this.root = new TrieNode();
  }

  /**
   * 向前缀树中插入字符串
   * @param {string} word
   * @return {void}
   */
  insert(word: string): void {
    let node = this.root;
    for (const ch of word) {
      if (!node.children[ch]) node.children[ch] = new TrieNode(); // 如果字符不存在，创建一个新的节点

      node = node.children[ch]; // 指向下一个节点
    }
    node.isEnd = true; // 当前字符串已全部插入到前缀树中，标识该节点为字符串的结尾
  }

  /**
   * 查看前缀树中包含要查找的目标字符串
   * @param {string} word
   * @return {boolean}
   */
  search(word: string): boolean {
    const node = this._searchPrefix(word);
    return !!(node && node.isEnd); // 节点存在并且有结束标识
  }

  /**
   * 查看前缀树中是否含有目标字符串作为前缀
   * @param {string} prefix
   * @returns {boolean}
   */
  startsWith(prefix: string): boolean {
    return !!this._searchPrefix(prefix); // 最后一个节点存在，不管有没有结束标识
  }

  /**
   * 辅助函数，查看前缀树中是否含有目标字符串作为前缀，有则返回节点，无则返回 false。
   * @param {string} word
   * @returns
   */
  private _searchPrefix(word: string): { [key: string]: any } | false {
    let node = this.root;
    for (const ch of word) {
      if (!node.children[ch]) {
        return false; // 找不到当前字符，直接返回false
      }
      node = node.children[ch]; // 指向下一个节点
    }

    return node; // 返回字符串最后一个字符对应的节点
  }
}

/**
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */

// 时间复杂度：O(n)，所有操作均为 O(n)，n 为 每次插入或查询的字符串的长度。
// 空间复杂度：O(n*Σ)，n 为所有插入字符串的长度和，Σ 为字符集的大小，本题中字符串只包含小写字母，因此 ∣Σ∣ = 26 。
