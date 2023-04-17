// Alice 和 Bob 计划分别去罗马开会。
// 给你四个字符串 arriveAlice ，leaveAlice ，arriveBob 和 leaveBob 。Alice 会在日期 arriveAlice 到 leaveAlice 之间在城市里（日期为闭区间），而 Bob 在日期 arriveBob 到 leaveBob 之间在城市里（日期为闭区间）。每个字符串都包含 5 个字符，格式为 "MM-DD" ，对应着一个日期的月和日。
// 请你返回 Alice和 Bob 同时在罗马的天数。
// 你可以假设所有日期都在 同一个 自然年，而且 不是 闰年。每个月份的天数分别为：[31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31] 。

// 输入：arriveAlice = "08-15", leaveAlice = "08-18", arriveBob = "08-16", leaveBob = "08-19"
// 输出：3
// 解释：Alice 从 8 月 15 号到 8 月 18 号在罗马。Bob 从 8 月 16 号到 8 月 19 号在罗马，他们同时在罗马的日期为 8 月 16、17 和 18 号。所以答案为 3 。

// 输入：arriveAlice = "10-01", leaveAlice = "10-31", arriveBob = "11-01", leaveBob = "12-31"
// 输出：0
// 解释：Alice 和 Bob 没有同时在罗马的日子，所以我们返回 0 。

/**
 * @param {string} arriveAlice
 * @param {string} leaveAlice
 * @param {string} arriveBob
 * @param {string} leaveBob
 * @return {number}
 */
// 模拟
// 前置知识：
// 已经两个正整数区间 [s1, e1] 和 [s2, e2]，交集就应该是两个起点的较大值和终点的较小值 [max(s1, s2), min(e1, e2)]
// 同时在的天数就是区间的长度 max(s1, s2), min(e1, e2) + 1 （闭区间，因此长度是端点值相减再加 1）。
// 如果区间不存在，很明显上面公式的结果是小于 0 的数，可以通过 max(0, res) 将小于 0 的结果修正为 0。
// 具体的：
// 分别计算出每个日子是一年中的第几天后求差。
// 我们可以设计一个函数 calculateDayOfYear 计算输入的日子在一年中是第几天。计算输入中的每个日子在一年中是第几天时，可以利用前缀和数组来降低每次计算的复杂度。
// 知道每个日子是一年中的第几天后，可以先通过比较算出两人到达日子的最大值，离开日子的最小值，然后利用减法计算重合的日子。
var countDaysTogether = function (
  arriveAlice,
  leaveAlice,
  arriveBob,
  leaveBob
) {
  const datesOfMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const prefixSum = [0];
  for (let i = 0; i < 12; i++) {
    prefixSum.push(prefixSum[i] + datesOfMonths[i]);
  }

  let arriveAliceDay = calculateDayOfYear(arriveAlice, prefixSum);
  let leaveAliceDay = calculateDayOfYear(leaveAlice, prefixSum);
  let arriveBobDay = calculateDayOfYear(arriveBob, prefixSum);
  let leaveBobDay = calculateDayOfYear(leaveBob, prefixSum);

  // 计算并集区间长度，通过Math.max(0, ...)修正无交集的结果
  return Math.max(
    0,
    Math.min(leaveAliceDay, leaveBobDay) -
      Math.max(arriveAliceDay, arriveBobDay) +
      1
  );
};

// 辅助函数
// 计算输入的日子在一年中是第几天
function calculateDayOfYear(day, prefixSum) {
  const month = parseInt(day.substring(0, 2));
  const date = parseInt(day.substring(3));
  return prefixSum[month - 1] + date;
}
// 时间复杂度：O(1)，最耗时的操作是计算前缀和，因为一年中只有12个月，因此时间复杂度是常数。
// 空间复杂度：O(1)，最耗空间的是存储每个月日子的数组和它的前缀和数组，因为一年中只有12个月，因此空间复杂度是常数。ß