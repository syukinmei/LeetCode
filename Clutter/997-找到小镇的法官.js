// 小镇里有 n 个人，按从 1 到 n 的顺序编号。传言称，这些人中有一个暗地里是小镇法官。

// 如果小镇法官真的存在，那么：
// 1. 小镇法官不会信任任何人。
// 2. 每个人（除了小镇法官）都信任这位小镇法官。
// 3. 只有一个人同时满足属性 1 和属性 2 。

// 给你一个数组 trust ，其中 trust[i] = [ai, bi] 表示编号为 ai 的人信任编号为 bi 的人。
// 如果小镇法官存在并且可以确定他的身份，请返回该法官的编号；否则，返回 -1 。

// 输入：n = 2, trust = [[1,2]]
// 输出：2

// 输入：n = 3, trust = [[1,3],[2,3]]
// 输出：3

// 输入：n = 3, trust = [[1,3],[2,3],[3,1]]
// 输出：-1

// tips:
// 3. 只有一个人同时满足属性 1 和属性 2 。即表示 只有一个小镇法官

// 方法一：计算各节点的入度和出度
// 预备知识：本题需要用到有向图中节点的入度和出度的概念。在有向图中，一个节点的入度是指向该节点的边的数量；而一个节点的出度是从该节点出发的边的数量。
// 题目描述了一个有向图。每个人都是图的节点，trust[i] 是图的有向边，trust[i][0] 指向 trust[i][1]，即 trust[i][0] 信任 trust[i][1]。
// 我们可以遍历 trust，统计每个节点的入度和出度。如果存在一个节点，它的入度为 n−1，出度为 0，那么这个节点就是法官。
/**
 * @param {number} n
 * @param {number[][]} trust
 * @return {number}
 */
var findJudge = function (n, trust) {
    const inDegrees = new Array(n + 1).fill(0); // inDegrees[i] 表示节点（编号） i 的入度
    const outDegress = new Array(n + 1).fill(0); // outDegress[i] 表示节点（编号） i 的出度
    // 遍历边，根据每组信任关系 t[0] -> t[1]，统计每个节点的入度和出度
    for (const t of trust) {
        outDegress[t[0]] += 1; // 编号 t[0] 出度增加
        inDegrees[t[1]] += 1; // 编号 t[1] 入度增加
    }
    // 遍历所有节点，找到入度为 n-1 且出度为 0 的节点
    // 从下标 1 处开始遍历，因为题目中节点编号从 1 开始
    for (let i = 1; i <= n; i++) {
        if (inDegrees[i] === n - 1 && outDegress[i] === 0) {
            return i; // 找到法官
        }
    }
    // 法官不存在
    return -1;
};
// 时间复杂度：O(n+m)，其中 n 是节点数量，m 是 trust 即边数量。需要遍历所有节点和边，计算每个节点的入度和出度。
// 空间复杂度：O(n)，n 为节点数量，需要 2 个长度为 n+1 的数组用于记录每个节点的入度和出度。
