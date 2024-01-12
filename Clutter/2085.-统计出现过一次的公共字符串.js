// 给你两个字符串数组 words1 和 words2 ，请你返回在两个字符串数组中 都恰好出现一次 的字符串的数目。

// 输入：words1 = ["leetcode","is","amazing","as","is"], words2 = ["amazing","leetcode","is"]
// 输出：2
// 解释：
// - "leetcode" 在两个数组中都恰好出现一次，计入答案。
// - "amazing" 在两个数组中都恰好出现一次，计入答案。
// - "is" 在两个数组中都出现过，但在 words1 中出现了 2 次，不计入答案。
// - "as" 在 words1 中出现了一次，但是在 words2 中没有出现过，不计入答案。
// 所以，有 2 个字符串在两个数组中都恰好出现了一次。

// 输入：words1 = ["b","bb","bbb"], words2 = ["a","aa","aaa"]
// 输出：0
// 解释：没有字符串在两个数组中都恰好出现一次。

// 输入：words1 = ["a","ab"], words2 = ["a","a","a","ab"]
// 输出：1
// 解释：唯一在两个数组中都出现一次的字符串是 "ab" 。

// 方法一：哈希表
// 使用哈希表构建两个词频表分别统计 words1 和 words2 中字符串的出现次数。
// 然后遍历其中一个词频表，如果某个字符串只出现过一次，且在另一个词频表中也只出现了一次，则答案+1。
/**
 * @param {string[]} words1
 * @param {string[]} words2
 * @return {number}
 */
var countWords = function (words1, words2) {
  // 构建词频表统计字符串出现频率
  const freq1 = new Map();
  const freq2 = new Map();
  for (const w of words1) {
    freq1.set(w, (freq1.get(w) || 0) + 1);
  }
  for (const w of words2) {
    freq2.set(w, (freq2.get(w) || 0) + 1);
  }

  // 遍历 freq1 ，即 words1 出现的字符串并检查个数，更新两个数组中都恰好出现了一次的字符串
  let ans = 0;
  for (const [w, count] of freq1.entries()) {
    if (count === 1 && freq2.get(w) === 1) ans++;
  }

  return ans;
};
// 时间复杂度：O(m+n)，m 和 n 分别为字符串数组 words1 和 words2，构建对应的词频表需要分别进行一次遍历。
// 空间复杂度：O(m+n)，即为哈希表的空间开销。
