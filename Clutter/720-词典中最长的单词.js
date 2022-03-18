// 给出一个字符串数组 words 组成的一本英语词典。返回 words 中最长的一个单词，该单词是由 words 词典中其他单词逐步添加一个字母组成。
// 若其中有多个可行的答案，则返回答案中字典序最小的单词。若无答案，则返回空字符串。

// 输入：words = ["w","wo","wor","worl", "world"]
// 输出："world"
// 解释： 单词"world"可由"w", "wo", "wor", 和 "worl"逐步添加一个字母组成。


// 输入：words = ["a", "banana", "app", "appl", "ap", "apply", "apple"]
// 输出："apple"
// 解释："apply" 和 "apple" 都能由词典中的单词组成。但是 "apple" 的字典序小于 "apply" 


/**
 * @param {string[]} words
 * @return {string}
 */
// 方法一：排序+Set
// 将 words 按字典序排序，创建一个初始值为空字符的Set集合，遍历 words ，如果当前字符串去掉最后一个字母在 Set集合中出现过，则添加至集合中，并且维护一个 res 使其为 符合要求的最长单词。（因为已经将 words 按字典序排序了，所以最后的 res 就是答案）
 var longestWord = function (words) {
    words.sort(); // 字典序排序
    let res = '';
    const set = new Set([res]);
    for (let w of words) {
        if (set.has(w.slice(0, -1))) {
            if (w.length > res.length) res = w; // 更新res
            set.add(w);
        }
    }
    return res;
};
// 