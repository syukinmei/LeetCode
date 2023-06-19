// 给你一个字符串 s，请你对 s 的子串进行检测。
// 每次检测，待检子串都可以表示为 queries[i] = [left, right, k]。我们可以 重新排列 子串 s[left], ..., s[right]，并从中选择 最多 k 项替换成任何小写英文字母。
// 如果在上述检测过程中，子串可以变成回文形式的字符串，那么检测结果为 true，否则结果为 false。
// 返回答案数组 answer[]，其中 answer[i] 是第 i 个待检子串 queries[i] 的检测结果。
// 注意：在替换时，子串中的每个字母都必须作为 独立的 项进行计数，也就是说，如果 s[left..right] = "aaa" 且 k = 2，我们只能替换其中的两个字母。（另外，任何检测都不会修改原始字符串 s，可以认为每次检测都是独立的）

// 输入：s = "abcda", queries = [[3,3,0],[1,2,0],[0,3,1],[0,3,2],[0,4,1]]
// 输出：[true,false,false,true,true]
// 解释：
// queries[0] : 子串 = "d"，回文。
// queries[1] : 子串 = "bc"，不是回文。
// queries[2] : 子串 = "abcd"，只替换 1 个字符是变不成回文串的。
// queries[3] : 子串 = "abcd"，可以变成回文的 "abba"。 也可以变成 "baab"，先重新排序变成 "bacd"，然后把 "cd" 替换为 "ab"。
// queries[4] : 子串 = "abcda"，可以变成回文的 "abcba"。

// 思考：
// 回文意味着从左到右第 i 个字母和从右到左第 i 个字母是相同的（回文串关于回文中心对称）。
//  - 如果有偶数个 a，那么可以将其均分成两部分，分别放置在字符串的中心对称位置上。例如4个a，可以在字符串的最左边放置2个a，最右边放置2个a，这样字符串中的a是回文的，其余字母如果出现偶数次，也同理处置。
//  - 如果有奇数个 a，多出的一个 a 要单独拿出来讨论：
//      - 只有 a 出现奇数次，其余字母都出现偶数次，此时字符串的长度也一定是奇数，那么可以把多出的这个 a ，放在字符串的中心，我们仍然可以得到一个回文串，无需替换任何字母。
//      - 有 2 种字母出现奇数次（假定为字母 a、b），此时字符串是 'XXXabXXX' 这样的，由于多出一个a和b无法组成回文串，可以把一个b改成b（或者把一个b改成a），这样 a 和 b 就都出现偶数次了，即第一种情况组成回文串。
//      - 有 3 种字母出现奇数次（假定为字母 a、b、c），把一个 b 改成 c，就转换成只有 a 出现奇数次的情况了。
//      - 一般地，如果有 m 种字母出现奇数次，只需要修改 其中 m/2 个字母。

// 如果第 i 次询问有 m/2 <= K，那么 answer[i] 为 treu，反之为 false。
// 最后这题要解决的问题就变成了，如何快速求出待检子串每种字母的个数？

/**
 * @param {string} s
 * @param {number[][]} queries
 * @return {boolean[]}
 */
// 方法一：
// 预处理 s 的长为 i 的前缀中，每种字母各出现了多少次。使用 (s.length+1) * 26 的二维数组 preSum 存储前缀和。
//  preSum[i+1][j] 表示 s[0] 到 s[i] 中，字母表的第 j 个小写字母出现次数。
//   - 根据前缀和的特性有，待检子串中字母表第 j 个小写字母出现次数为 s[left: right][j] === preSum[right + 1][j] - preSum[left][j]
// 对于 queries[i]，利用前缀和计算出每种字母出现次数，统计有多少种字母出现奇数次，设为 m。如果 m/2 <= k，那么 answer[i] 为 true。
var canMakePaliQueries = function (s, queries) {
  const n = s.length;
  const preSum = new Array(n + 1).fill(0).map(() => new Array(26).fill(0));
  for (let i = 0; i < n; i++) {
    preSum[i + 1] = [...preSum[i]];
    preSum[i + 1][s.charCodeAt(i) - "a".charCodeAt()]++;
  }
  const ans = [];
  for (const [left, right, k] of queries) {
    let m = 0; // 待检子串 s[left: right] 中出现奇数次字母个数。
    for (let j = 0; j < 26; j++) {
      // 根据前缀和的特性，
      const count = preSum[right + 1][j] - preSum[left][j];
      m += count % 2; // 奇数+1，偶数+0
    }
    ans.push(Math.floor(m / 2) <= k);
  }
  return ans;
};
// 时间复杂度：O((n+q)*C)，n 为字符串 s 的长度，q 为数组 queries 的长度，C 为字符集的大小，本题中字符均为小写字母，所以 C=26。
// 空间复杂：O(n*C)，需要创建一个长度为 n * 26 的二维数组，用于存储字母表的词频。

// 优化 1：
// 对于 preSum 二维数组，我们只关心其每种字母出现次数的奇偶性，不关心其出现次数。所以不需要在前缀和中存储每种字母的出现次数，只需要保存每种字母出现次数的奇偶性。
// 为了方便计算，约定 0 表示出现偶数次，1 表示出现奇数次。
// 因为只有奇偶数相加减才能得到奇数。因此，判断待检子串第 j 个小写字母出现次数的奇偶性，只需要判断区间两侧出现次数的奇偶性是否相等，即：
//  - preSum[right + 1][j] === preSum[left]，则出现偶数次，反之为奇数次。
var canMakePaliQueries = function (s, queries) {
  const n = s.length;
  const preSum = new Array(n + 1).fill(0).map(() => new Array(26).fill(0));
  for (let i = 0; i < n; i++) {
    preSum[i + 1] = [...preSum[i]];
    preSum[i + 1][s.charCodeAt(i) - "a".charCodeAt()] ^= 1; // 利用异或1，奇数变偶数，偶数变奇数
  }
  const ans = [];
  for (const [left, right, k] of queries) {
    let m = 0; // 待检子串 s[left: right] 中出现奇数次字母个数。
    for (let j = 0; j < 26; j++) {
      // 如果待检子串 s[left: right] 的第 j 个小写字母出现奇数次，则记录下来。
      const isOdd = preSum[right + 1][j] !== preSum[left][j];
      m += isOdd ? 1 : 0;
      // m += preSum[right + 1][j] ^ preSum[left][j]; // 利用异或，奇数+1，偶数+0
    }
    ans.push(m >> 1 <= k);
  }
  return ans;
};
// 复杂度同上
// 时间复杂度：O((n+q)*C)，n 为字符串 s 的长度，q 为数组 queries 的长度，C 为字符集的大小，本题中字符均为小写字母，所以 C=26。
// 空间复杂：O(n*C)，需要创建一个长度为 n * 26 的二维数组，用于存储字母表的词频。

// 优化 2：
// 由于长度为26的数组只存储 0 和 1，可以压缩到一个二进制数中。
// 如二进制 0b10010 表示 b 和 e 出现奇数次，其余字母出现偶数次。
// 在计算前缀和时（准确地说是异或前缀和）：
//  - 更新 a 出现次数的奇偶性，可以异或二进制 1；
//  - ...  b     ...       ，     ...      10；
//  - ...  c     ...       ，     ...      100；
//  - 后续字母依此类推。

// 判断待检子串第 j 个小写字母出现次数的奇偶性，只需判断 s[left: right] 中bit为1的个数。
// 对于前缀和中的两个二进制数直接进行异或运算，得到待检子串中每种字母出现次数的奇偶性。再计算这个二进制数中的 1 的个数，便得到了m。
// 具体的，使用 n & (n-1) 消除数字 n 的二进制表示中最后一个1，以此判断bit为1的个数。
//  - Integer.bitCount(preSum[right + 1] ^ preSum[left])
// 例如，10010 ⊕ 01110 = 11100，说明有3种字母出现了奇数次。
var canMakePaliQueries = function (s, queries) {
  const n = s.length;
  const preSum = new Array(n + 1).fill(0);
  for (let i = 0; i < n; i++) {
    const bit = 1 << (s.charCodeAt(i) - "a".charCodeAt()); // 当前的小写字母的二进制位
    preSum[i + 1] = preSum[i] ^ bit; // 更新其出现次数的奇偶性
  }
  const ans = [];
  for (const [left, right, k] of queries) {
    const m = bitCount(preSum[right + 1] ^ preSum[left]);
    ans.push(m >> 1 <= k);
  }
  return ans;
};
// 辅助函数，统计一个数的二进制位有多少个 1。如 5 的二进制为 101，返回 2。
function bitCount(n) {
  let count = 0;
  while (n) {
    n &= n - 1;
    count++;
  }
  return count;
}
// 时间复杂度：O(n+q)，n 为字符串 s 的长度，q 为数组 queries 的长度。忽略统计位 1 的个数的时间复杂度。
// 空间复杂度：O(n)，n 为字符串 s 的长度，需要创建长度为 n+1 的数组，用于存储字母表每个单词的奇偶性。
