// 定义一个函数 f(s)，统计 s  中（按字典序比较）最小字母的出现频次 ，其中 s 是一个非空字符串。
// 例如，若 s = "dcce"，那么 f(s) = 2，因为字典序最小字母是 "c"，它出现了 2 次。
// 现在，给你两个字符串数组待查表 queries 和词汇表 words 。对于每次查询 queries[i] ，需统计 words 中满足 f(queries[i]) < f(W) 的 词的数目 ，W 表示词汇表 words 中的每个词。
// 请你返回一个整数数组 answer 作为答案，其中每个 answer[i] 是第 i 次查询的结果。

// 输入：queries = ["cbd"], words = ["zaaaz"]
// 输出：[1]
// 解释：查询 f("cbd") = 1，而 f("zaaaz") = 3 所以 f("cbd") < f("zaaaz")。

// 输入：queries = ["bbb","cc"], words = ["a","aa","aaa","aaaa"]
// 输出：[1,2]
// 解释：第一个查询 f("bbb") < f("aaaa")，第二个查询 f("aaa") 和 f("aaaa") 都 > f("cc")。

// tips:
// 1 <= queries.length <= 2000
// 1 <= words.length <= 2000
// 1 <= queries[i].length, words[i].length <= 10
// queries[i][j]、words[i][j] 都由小写英文字母组成

// 计算字符串 s 中最小字母出现的频次
// 初始化一个变量 ch = 'z' 表示当前遇到的字典序最小的字母，cnt 为其出现频次。
// 遍历字符串 s 中的每一个字符 c。如果 c 的字典序小于 ch，则将 ch 更新为 c，并将 cnt 置为 1。
// 否则如果 c === ch，则令 cnt+1。
// 最后 cnt 即为字符串 s 中字典序最小的字母的出现次数。
function f(s) {
  let ch = "z"; // 当前遇到的字典序最小的字母
  let cnt = 0; // 字母 ch 出现的次数
  for (const c of s) {
    if (c < ch) {
      ch = c;
      cnt = 1;
    } else if (c === ch) {
      cnt++;
    }
  }
  return cnt;
}

/**
 * @param {string[]} queries
 * @param {string[]} words
 * @return {number[]}
 */
// 方法一：后缀和
// 使用 counts 记录 words 中每个单词的最小字母出现次数。数组的下标表示最小字母出现频次，数组的值表示该频次的单词数量。
// 求 counts 的后缀和，这样 counst[i] 就表示最小字母出现次数大于等于 i 的单词数量。
// 最后遍历 queries 数组中的每个字符串 s，s 中最小字母出现频次为f(s)，words 中最小字母出现频次大于 f(s) 的单词数量为 counts[f(s)+1]，将其加入结果数组中。
var numSmallerByFrequency = function (queries, words) {
  // 统计 words 中每个单词的最小字母出现频次。
  const n = 12; // 定义为 12 是因为 queries、words 的长度最大为10，则其最小字母出现频次范围为[1, 10]共10种。为了让解答更好理解，不需要做下标偏移，允许其有频次为 0 的情况，以及最后求 words 中频次大于等于 10 次的即 11 次的单词数。
  const counts = new Array(n).fill(0); // 此时 counts[i] 表示 words 中最小字母出现次数等于 i 的单词数量。
  for (const s of words) {
    counts[f(s)]++;
  }
  // 求 counts 的后缀和，使得 counts[i] 表示最小字母出现次数大于等于 i 的单词数量。
  for (let i = n - 2; i >= 0; i--) {
    counts[i] += counts[i + 1];
  }
  // 统计 f(queries[i]) < f(W) 的个数。
  const res = [];
  for (let s of queries) {
    res.push(counts[f(s) + 1]);
  }
  return res;
};
// 时间复杂度：O((n+m)*p)，n 和 m 分别为数组 queries 和 words 的长度，p 是 queries 和 words 中最长字符串的长度。
// 空间复杂度：O(1)，忽略答案的空间消耗，我们只使用了常数个变量。
