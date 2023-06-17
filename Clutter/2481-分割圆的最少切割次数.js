// 圆内一个 有效切割 ，符合以下二者之一：

// 该切割是两个端点在圆上的线段，且该线段经过圆心。
// 该切割是一端在圆心另一端在圆上的线段。

// 给你一个整数 n ，请你返回将圆切割成相等的 n 等分的 最少 切割次数。

// 输入：n = 4
// 输出：2
// 解释：
// 上图展示了切割圆 2 次，得到四等分。

// 输入：n = 3
// 输出：3
// 解释：
// 最少需要切割 3 次，将圆切成三等分。
// 少于 3 次切割无法将圆切成大小相等面积相同的 3 等分。
// 同时可以观察到，第一次切割无法将圆切割开。

// 刚看到这题的时候很懵圈，官方标注的是一个简单题，原意就是平均的分蛋糕，一个蛋糕分给n个人吃，要切几刀（正常切，切直径或半价）。

// 分类讨论：
//  - n = 1，不需要切割，即切割次数为 0。
//  - n 为奇数，画 n 条半径来将它平均分成 n 份。
//  - n 为偶数，画 n/2 条直径来将它平均分成 n 份。

/**
 * @param {number} n
 * @return {number}
 */
var numberOfCuts = function (n) {
  if (n === 1) return 0;
  else if (n % 2 === 0) return n / 2;
  return n;
  // return n > 1 && n & 1 ? n : n >> 1;
};
// 时间复杂度：O(1)。
// 空间复杂度：O(1)。
