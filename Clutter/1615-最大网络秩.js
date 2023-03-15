// n 座城市和一些连接这些城市的道路 roads 共同组成一个基础设施网络。每个 roads[i] = [ai, bi] 都表示在城市 ai 和 bi 之间有一条双向道路。
// 两座不同城市构成的 城市对 的 网络秩 定义为：与这两座城市 直接 相连的道路总数。如果存在一条道路直接连接这两座城市，则这条道路只计算 一次 。
// 整个基础设施网络的 最大网络秩 是所有不同城市对中的 最大网络秩 。
// 给你整数 n 和数组 roads，返回整个基础设施网络的 最大网络秩 。

// 0 - 1 - 2
//   \ |
//     3
// 输入：n = 4, roads = [[0,1],[0,3],[1,2],[1,3]]
// 输出：4
// 解释：城市 0 和 1 的网络秩是 4，因为共有 4 条道路与城市 0 或 1 相连。位于 0 和 1 之间的道路只计算一次。

// 0 - 1 - 2
//   \ | / |
//     3   4
// 输入：n = 5, roads = [[0,1],[0,3],[1,2],[1,3],[2,3],[2,4]]
// 输出：5
// 解释：共有 5 条道路与城市 1 或 2 相连。

// 输入：n = 8, roads = [[0,1],[1,2],[2,3],[2,4],[5,6],[5,7]]
// 输出：5
// 解释：2 和 5 的网络秩为 5，注意并非所有的城市都需要连接起来。

// 提示：
// 2 <= n <= 100
// 0 <= roads.length <= n * (n - 1) / 2
// roads[i].length == 2
// 0 <= ai, bi <= n-1
// ai != bi
// 每对城市之间 最多只有一条 道路相连

// 补充知识：
// 计算网络秩序的公式为：
// rank(i, j) = degree(i) + degree(j) - (1 if road i-j exists, else 0)
// 其中 degree(i) 表示节点 i 的度数，如果节点 i 和节点 j 之间存在道路，则需要减去 1。
// 即：在一个无向图中，两个节点的度数之和减去它们之间的边数。（度分入度和出度，表示每个节点有多少条连接连向它，以及它有多少条连接连出去。）

// 方法一：枚举
// 根据以上计算网络秩序的公式，我们首先求出所有城市在图中的度数，然后枚举所有可能的城市对(a, b)，求出城市对(a, b)的网络秩，即可找到最大的网络秩。
// 具体的：
// 用一个一维数组 degrees 记录每个城市的度，索引表示城市，索引对应的值表示该城市的度。
// 用一个二维数组 connect 作为邻接表，记录每对城市之间是否有道路相连，connect[a][b] = true 表示 城市 a 和 b 直接有道路连接。
// 接下来，遍历 roads 数组，将每个城市的度数加1，并将相邻的城市加入彼此的邻接表中。
// 最后，我们枚举每对城市(a, b)，计算它们的网络秩，即 degrees[a] + degrees[b] - connect[a][b]，取其中的最大值作为答案。
/**
 * @param {number} n
 * @param {number[][]} roads
 * @return {number}
 */

var maximalNetworkRank = function (n, roads) {
  const degrees = new Array(n).fill(0); // 初始化每个节点的度数
  const connect = new Array(n).fill(0).map(() => new Array(n).fill(0)); // 初始化每个节点的邻接表
  for (const [a, b] of roads) {
    degrees[a]++; // a 节点的度加 1
    degrees[b]++; // b 节点的度加 1
    connect[a][b] = true; // 记录 a 节点和 b 节点为相邻
    connect[b][a] = true; // 记录 b 节点和 a 节点为相邻
  }

  let maxRank = 0;
  // 枚举每个城市对。
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const rank = degrees[i] + degrees[j] - connect[i][j]; // 计算 i 节点和 j 节点的网络秩，注意要减去它们之间是否有连接的情况
      maxRank = Math.max(maxRank, rank); // 维护最大网络秩
    }
  }
  return maxRank;
};
// 时间复杂度：O(n^2)，n 为城市的数量。主要的时间复杂度来源于遍历所有的城市对来计算网络秩，因此总的时间复杂度为O(n^2)。
// 空间复杂度：O(n^2)，n 为城市的数量，构建二维数组 connect 记录图中所有的城市之间的连通关系需要O(n^2)的空间。

// 方法二：枚举（使用邻接表优化空间复杂度）
var maximalNetworkRank = function (n, roads) {
  const degrees = new Array(n).fill(0); // 初始化每个节点的度数
  const connect = new Array(n).fill(0).map(() => new Set()); // 初始化每个节点的邻接表
  for (const [a, b] of roads) {
    degrees[a]++; // a节点的度数加1
    degrees[b]++; // b节点的度数加1
    connect[a].add(b); // 将b节点加入a节点的邻接表中
    connect[b].add(a); // 将a节点加入b节点的邻接表中
  }
  let maxRank = 0;
  //   枚举每个城市对
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const rank = degrees[i] + degrees[j] - (connect[i].has(j) ? 1 : 0); // 计算i节点和j节点的网络秩，注意要减去它们之间是否有连接的情况
      maxRank = Math.max(maxRank, rank); // 维护最大网络秩
    }
  }
  return maxRank;
};
// 时间复杂度：O(n^2)，n 为城市的数量。主要的时间复杂度来源于遍历所有的城市对来计算网络秩，因此总的时间复杂度为O(n^2)。
// 空间复杂度：O(n+m)，n 为城市的数量，m 为道路的数量即数组 roads 的长度，空间复杂度主要来源于创建邻接表和度数数组。邻接表需要O(n)的空间，度数数组也需要O(n)的空间，因此总的空间复杂度为O(n+m)。
