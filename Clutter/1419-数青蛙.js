// 给你一个字符串 croakOfFrogs，它表示不同青蛙发出的蛙鸣声（字符串 "croak" ）的组合。由于同一时间可以有多只青蛙呱呱作响，所以 croakOfFrogs 中会混合多个 “croak” 。
// 请你返回模拟字符串中所有蛙鸣所需不同青蛙的最少数目。
// 要想发出蛙鸣 "croak"，青蛙必须 依序 输出 ‘c’, ’r’, ’o’, ’a’, ’k’ 这 5 个字母。如果没有输出全部五个字母，那么它就不会发出声音。如果字符串 croakOfFrogs 不是由若干有效的 "croak" 字符混合而成，请返回 -1 。

// 输入：croakOfFrogs = "croakcroak"
// 输出：1
// 解释：一只青蛙 “呱呱” 两次

// 输入：croakOfFrogs = "crcoakroak"
// 输出：2
// 解释：最少需要两只青蛙，“呱呱” 声用黑体标注
// 第一只青蛙 "crcoakroak"
// 第二只青蛙 "crcoakroak"
// 示例 3：

// 输入：croakOfFrogs = "croakcrook"
// 输出：-1
// 解释：给出的字符串不是 "croak" 的有效组合。

// Tips:
// 1 <= croakOfFrogs.length <= 105
// 字符串中的字符只有 'c', 'r', 'o', 'a' 或者 'k'

// 方法一：记数
// 由题意的，一只青蛙想要发出蛙鸣，需要依次输出 c r o a k 这5个字符，如果没有输出全部5个字符，则不会发出声音。
// 我们使用一个长度为 5 的数组 cnt，记录分别叫唤到 c r o a k 声的青蛙数量。
// 遍历一次数组 croakOfFrogs，对于每一声 croakOfFrogs[i] 判断发声了之前的声。例如当前遍历到 r ，那就看看有没有青蛙刚才发出了 c 声，如果有则让其继续发出 r 声。然后更新 cnt 中 叫唤到 c 声的青蛙-1，叫唤到 r 声的青蛙+1。
// 具体的，
//  - 遍历到 c 时，看看有没有蛙发过 k 声，如果有会 复用 这只蛙，让他继续发 c 声。即 cnt['k']--，cnt['c']++。如果没有，则需要新增一只蛙让其发出 c 声，即 cnt['c']++。
//  - 遍历到 r o a k 时都一样，查看该字母在 croak 的上一个字母的 cnt值 cnt[preIdx]，如果 cnt[preIdx] 大于0，那么将其-1，同时当前字母 cnt[idx] +1，如果 cnt[preIdx] 等于0，则返回 -1。因为题意要求青蛙必须从 c 开始蛙鸣，所以返回 -1。
// 遍历结束后，所有蛙必须在最后发出 k 声，如果有蛙最后发出声音不是 k ，就是cnt中 除了 k 其他字母大于0，那么返回 -1 ，否则返回 cnt['k']作为答案即可。
/**
 * @param {string} croakOfFrogs
 * @return {number}
 */
var minNumberOfFrogs = function (croakOfFrogs) {
  const CROAK = "croak";
  const LEN = CROAK.length;
  const cnt = new Array(LEN).fill(0); // 分别表示字母croak的次数
  for (const c of croakOfFrogs) {
    const idx = CROAK.indexOf(c); // 当前声音的下标
    const preIdx = idx === 0 ? LEN - 1 : idx - 1; // 上一个声音的下标
    cnt[idx]++; // 更新当前蛙的状态
    // 如果有蛙发声过前一声
    if (cnt[preIdx] > 0) {
      cnt[preIdx]--; // 复用，更新这只蛙的上一次状态
    } else if (c !== "c") {
      // 如果不是第一声，前一声必须发声过。
      return -1;
    }
  }

  // 计算未叫完的青蛙数量
  const prefixSum = cnt.slice(0, LEN - 1).reduce((acc, cur) => acc + cur, 0);

  // 如果还有未叫完的青蛙，则返回-1，否则发声最后一个字母的青蛙数量就是答案
  return prefixSum === 0 ? cnt[LEN - 1] : -1;
};
// 时间复杂度：O(n)，n 为字符串 croakOfFrogs 的长度，需要遍历一次 croakOfFrogs 字符串。
// 空间复杂度：O(1)，只需要常数的空间存放若干变量。
