// 在歌曲列表中，第 i 首歌曲的持续时间为 time[i] 秒。
// 返回其总持续时间（以秒为单位）可被 60 整除的歌曲对的数量。形式上，我们希望下标数字 i 和 j 满足  i < j 且有 (time[i] + time[j]) % 60 == 0。

// 输入：time = [30,20,150,100,40]
// 输出：3
// 解释：这三对的总持续时间可被 60 整除：
// (time[0] = 30, time[2] = 150): 总持续时间 180
// (time[1] = 20, time[3] = 100): 总持续时间 120
// (time[1] = 20, time[4] = 40): 总持续时间 60

// 输入：time = [60,60,60]
// 输出：3
// 解释：所有三对的总持续时间都是 120，可以被 60 整除。

// 方法一：数学+计数
// 遍历歌曲列表，对于每个歌曲的持续时间，计算它对 60 取余数得到 remainder，然后计算它的补数(即 60 减去 remainder的值) 对 60 取余数得到 complement。
// 如果我们能够找到一个持续时间为 remainder 的歌曲和一个持续时间为 complement 的歌曲，它们的持续时间之和就是 60 的倍数，符合题目要求。
// 我们可以使用一个长度为 60 的数组 remainders 来记录每个余数出现的次数。
// 注意：在计算符合条件的歌曲对数时，为了避免重复计算。对于每个歌曲的 remainder，我们先查询 remainders 中可以作为它的补数的数量，再更新 remainders。
// 例如，remainder === complement 的情况。
/**
 * @param {number[]} time
 * @return {number}
 */
var numPairsDivisibleBy60 = function (time) {
  let count = 0; // 记录符合条件对歌曲对数
  const remainders = new Array(60).fill(0); // 用于记录每个每个余数出现的次数的数组。
  for (let second of time) {
    const remainder = second % 60; // 计算当前歌曲的持续时间对 60 取余
    const complement = (60 - remainder) % 60; // 计算当前歌曲的补数对 60 取余
    count += remainders[complement]; // 将补数出现的次数添加到 count 中
    remainders[remainder]++; // 将当前余数出现的次数+1
  }
  return count; // 返回符合条件对歌曲对数
};
// 时间复杂度：O(n)，n 为 time 的长度，需要对其遍历一次。
// 空间复杂度：O(C)，此题中 C 为余数的可能取值，这里 C = 60，需要长度为 60 的数组用于记录每个余数出现的次数。
