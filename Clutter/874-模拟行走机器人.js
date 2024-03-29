// 机器人在一个无限大小的 XY 网格平面上行走，从点 (0, 0) 处开始出发，面向北方。该机器人可以接收以下三种类型的命令 commands ：
//  *  -2 ：向左转 90 度
//  *  -1 ：向右转 90 度
//  *  1 <= x <= 9 ：向前移动 x 个单位长度

// 在网格上有一些格子被视为障碍物 obstacles 。第 i 个障碍物位于网格点  obstacles[i] = (xi, yi) 。
// 机器人无法走到障碍物上，它将会停留在障碍物的前一个网格方块上，但仍然可以继续尝试进行该路线的其余部分。
// 返回从原点到机器人所有经过的路径点（坐标为整数）的最大欧式距离的平方。（即，如果距离为 5 ，则返回 25 ）

// 注意：
//  *  北表示 +Y 方向。
//  *  东表示 +X 方向。
//  *  南表示 -Y 方向。
//  *  西表示 -X 方向。

// 输入：commands = [4,-1,3], obstacles = []
// 输出：25
// 解释：
// 机器人开始位于 (0, 0)：
// 1. 向北移动 4 个单位，到达 (0, 4)
// 2. 右转
// 3. 向东移动 3 个单位，到达 (3, 4)
// 距离原点最远的是 (3, 4) ，距离为 32 + 42 = 25

// 输入：commands = [4,-1,4,-2,4], obstacles = [[2,4]]
// 输出：65
// 解释：机器人开始位于 (0, 0)：
// 1. 向北移动 4 个单位，到达 (0, 4)
// 2. 右转
// 3. 向东移动 1 个单位，然后被位于 (2, 4) 的障碍物阻挡，机器人停在 (1, 4)
// 4. 左转
// 5. 向北走 4 个单位，到达 (1, 8)
// 距离原点最远的是 (1, 8) ，距离为 12 + 82 = 65

// tips：
// 1 <= commands.length <= 104
// commands[i] is one of the values in the list [-2,-1,1,2,3,4,5,6,7,8,9].
// 0 <= obstacles.length <= 104
// -3 * 104 <= xi, yi <= 3 * 104
// 答案保证小于 231

// 解题思路：
// 1、模拟转向
// 据题意，我们需要知道如何模拟机器人的转向，假设当前机器人位置在 (x, y)，那么向四个方向移动一步则有：
//  - 向北，x = x ，y = y + 1；
//  - 向东，x = x + 1 ，y = y；
//  - 向南，x = x ，y = y - 1；
//  - 向西，x = x - 1 ，y = y；
// 因此，我们可以提炼出来方向数组，directions = [[0, 1], [1, 0],[0, -1], [-1,0]]。
// 使用变量 dire 来记录当前机器人的方向索引，即 0, 1, 2, 3 分别对应方向 北东南西

//            (0, 1)
//              ^
//              |
//  (-1, 0) <—— * ——> (1, 0)
//              |
//              v
//            (0, -1)

// 我们的 directions 方向数组已经按照右转方向排列好了，即：索引递增 (dire += 1) 为右转；索引递减 (dire -= 1) 增加为左转。
// 由于 com = -1 表示右转，即 dire += 1；com = -2 表示左转，即 dire -= 1。
// 既有 dire = dire + (3 + com * 2);
// 又因为 dire 范围为 [0, 3]，超过 3 或者低于 0 时，需要修正。通过加 4 模 4 的方式，使得 dire 在 [0, 3] 内循环取值。即
//      - dire = (4 + dire + (3 + com * 2)) % 4;

// 2、模拟移动
// directions[dire] 表示当前方向，当 com > 0 时，表示沿着当前方向移动 com 个单位，即坐标更新为：
//   -  x = x + directions[dir][0] * com;
//   -  y = y + directions[dire][1] * com;

// 3、规避障碍
// 由于题目给定 obstacles 障碍物坐标集合，机器人无法走到障碍物上，它将会停留在障碍物的前一个网格方块上，因此我们需要能够快速知道机器人下一个位置是否为障碍点。
// 我们可以使用 「哈希集合」记录障碍点，实现 O(1) 的查找时间复杂度。当时由于 obstacles[i] 障碍点是一个二维坐标，我们需要将其转为一个独一无二的编号。
// 对于一个 n 列的网格，每一个单元格的编号 = 行编号 * n + 列编号：

// 行编号   0   1   2
// 列编号｜———————————————
//   0  ｜  0  1   2
//   1  ｜  3  4   5
//   2  ｜  6  7   8

// 题目说的是网格无界，但从提示中可以看到坐标的取值范围为 [-30000, 30000]。因此我们可以认为有 60001 列，每个坐标 obstacles[i] 的编号为：x * 60001 + y。我们可以将其存储在一个哈希集合中。

// 4、关于最大值的位置
// 无论每一次朝哪个方向移动多少，每次移动的最大值一定是每次移动的起点或者终点。因此，我们更新每次移动的终点的欧氏距离的平方即可(因为每一次的终点也是下一次的起点，因此就囊括了每一次移动的起点和终点)。

/**
 * @param {number[]} commands
 * @param {number[][]} obstacles
 * @return {number}
 */
function robotSim(commands, obstacles) {
  const COL = 60001; // 网格总列数
  const directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ]; // 方向数组，分别表示 北东南西四个方向

  const obs = new Set(); // 哈希表，用于存储障碍点
  // 将障碍点坐标转为编号存储在哈希表中
  for (const [x, y] of obstacles) {
    const point = x * COL + y;
    obs.add(point);
  }

  let dir = 0; // 记录机器人当前方向下标，初始值为 0，表示朝北
  let res = 0; // 维护结果值，最大欧式距离的平方
  let x = 0,
    y = 0; // 机器人当前的坐标点，初始位置在原点

  for (const com of commands) {
    // 转向
    if (com < 0) {
      dir = (4 + dir + (3 + com * 2)) % 4;
    }
    // 移动
    // 根据当前方向获取 x、y 坐标单位位移长度。
    const dx = directions[dir][0];
    const dy = directions[dir][1];
    for (let i = 0; i < com; i++) {
      // 判断是否在障碍物上。如果位移后的点是障碍点，停在当前点，即退出循环。
      const nextPointNum = (x + dx) * COL + y + dy; // 机器人下一个位置坐标的编号
      if (obs.has(nextPointNum)) break;
      // 进行位移，更新当前机器人的坐标点。
      x += dx;
      y += dy;
    }
    res = Math.max(res, x * x + y * y); // 维护最大欧式距离的平方，每一次位移后的终点一定是潜在的最大结果。
  }
  return res;
}
// 时间复杂度：O(C * n + m)，n 为数组 commands 的长度，C 为机器人每次可以移动的步数，在本题中 C = 9，m 为数组 obstacles 的长度。时间开销主要为模拟机器人的移动和哈希表存储每个障碍物坐标的开销。
// 空间复杂度：O(m)，m 为数组 obstacles 的长度，用于存储每个障碍点坐标对应的编号。
