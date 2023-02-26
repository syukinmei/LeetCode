// 有两个长度相同的字符串 s1 和 s2，且它们其中 只含有 字符 "x" 和 "y"，你需要通过「交换字符」的方式使这两个字符串相同。
// 每次「交换字符」的时候，你都可以在两个字符串中各选一个字符进行交换。
// 交换只能发生在两个不同的字符串之间，绝对不能发生在同一个字符串内部。也就是说，我们可以交换 s1[i] 和 s2[j]，但不能交换 s1[i] 和 s1[j]。
// 最后，请你返回使 s1 和 s2 相同的最小交换次数，如果没有方法能够使得这两个字符串相同，则返回 -1 。

// 输入：s1 = "xx", s2 = "yy"
// 输出：1
// 解释：
// 交换 s1[0] 和 s2[1]，得到 s1 = "yx"，s2 = "yx"。

// 输入：s1 = "xy", s2 = "yx"
// 输出：2
// 解释：
// 交换 s1[0] 和 s2[0]，得到 s1 = "yy"，s2 = "xx" 。
// 交换 s1[0] 和 s2[1]，得到 s1 = "xy"，s2 = "xy" 。
// 注意，你不能交换 s1[0] 和 s1[1] 使得 s1 变成 "yx"，因为我们只能交换属于两个不同字符串的字符。

// 输入：s1 = "xx", s2 = "xy"
// 输出：-1

// 输入：s1 = "xxyyxyxyxx", s2 = "xyyxyxxxyx"
// 输出：4

/**
 * @param {string} s1
 * @param {string} s2
 * @return {number}
 */
// 贪心：
// 如果 s1[i] === s2[i]，则不需要交换，直接跳过。如果 s1[i] !== s2[2]，则需要交换。我们统计 s1[i] 和 s2[i] 的组合情况。即 s1[i] === x 且 s2[i] === y 的情况，记为 xy。对于 s1[i] === y 且 s2[i] === x 的情况，记为 yx。
//  - 两个 xy 或者 两个 yx 可以通过 1 次交换使得相同。
//  - 一个 xy 和 一个 yx 可以通过 1 次交换变为 两个 xy 或者 两个 yx（上诉情况），再通过 1 次交换使得相同
// 所以我们的贪心策略为：
// 优选选择相同 的 xy 组合或者 yx 组合进行内耗，因为它们一次交换就可以相同，剩余无法内耗的 xy 和 yx 如果都为1个，可以通过情况 2 进行两次交换使其相等。否则不能使 xy 和 yx 都为0，即 xy + yx 的个数为奇数个的情况，无法完成交换，返回 -1。
// ps：奇数为啥无解
// 因为奇数无法均分，要使两个字符串最终相同，总共的 x 的个数和 y 的个数都必须是偶数。
var minimumSwap = function (s1, s2) {
  let xy = 0,
    yx = 0;
  // 统计 xy 和 yx 的次数
  for (let i = 0; i < s1.length; i++) {
    const a = s1[i],
      b = s2[i];
    if (a === "x" && b === "y") {
      xy++;
    } else if (a === "y" && b === "x") {
      yx++;
    }
  }

  // 判断 xy+yx 的个数是否为奇数，是则无法完成交换。
  if ((xy + yx) % 2 === 1) {
    return -1;
  }
  // 计算交换次数。
  // 偶数个 xy 和 偶数个 yx，答案为 (xy + yx)/2
  // 奇数个 xy 和 奇数个 yx，答案为 (xy + yx)/2 +1
  return Math.floor(xy / 2) + Math.floor(yx / 2) + (xy % 2) + (yx % 2);
};
// 时间复杂度：O(n)，n 为字符串的长度，需要遍历两个字符串一次。
// 空间复杂度：O(1)，只需要常数的空间存放若干变量。
