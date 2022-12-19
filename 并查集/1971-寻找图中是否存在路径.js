
// 有一个具有 n 个顶点的 双向 图，其中每个顶点标记从 0 到 n - 1（包含 0 和 n - 1）。图中的边用一个二维整数数组 edges 表示，其中 edges[i] = [ui, vi] 表示顶点 ui 和顶点 vi 之间的双向边。 每个顶点对由 最多一条 边连接，并且没有顶点存在与自身相连的边。
// 请你确定是否存在从顶点 source 开始，到顶点 destination 结束的 有效路径 。
// 给你数组 edges 和整数 n、source 和 destination，如果从 source 到 destination 存在 有效路径 ，则返回 true，否则返回 false 。


// 输入：n = 3, edges = [[0,1],[1,2],[2,0]], source = 0, destination = 2
// 输出：true
// 解释：存在由顶点 0 到顶点 2 的路径:
// - 0 → 1 → 2 
// - 0 → 2

// 输入：n = 6, edges = [[0,1],[0,2],[3,5],[5,4],[4,3]], source = 0, destination = 5
// 输出：false
// 解释：不存在由顶点 0 到顶点 5 的路径.


/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number} source
 * @param {number} destination
 * @return {boolean}
 */
// 方法一：并查集。
var validPath = function (n, edges, source, destination) {
    if (source === destination) {
        return true;
    }
    const ufSet = new UnionFindSet(n);
    for (const [i, j] of edges) {
        ufSet.unionn(i, j);
    }
    return ufSet.isConnect(source, destination);
};

class UnionFindSet {
    constructor(n) {
        this.fa = new Array(n).fill(0).map((_, i) => i);
        this.rank = new Array(n).fill(0);
    }

    find(i) {
        if (this.fa[i] === i) return i;

        this.fa[i] = this.find(this.fa[i]);
        return this.fa[i];
    }

    unionn(i, j) {
        const i_fa = this.find(i);
        const j_fa = this.find(j);

        if (this.rank[i_fa] > this.rank[j_fa]) {
            this.fa[j_fa] = i_fa;
        } else if (this.rank[i_fa] < this.rank[j_fa]) {
            this.fa[i_fa] = j_fa;
        } else {
            this.fa[j_fa] = i_fa;
            this.rank[i_fa]++;
        }
    }

    isConnect(i, j) {
        return this.find(i) === this.find(j);
    }
}
// 时间复杂度：O(n+m*α(m))，n 为图中的顶点数，m 为图中边的数目，α 是反阿克曼函数。并查集的初始化需要O(n)的时间，然后遍历 m 条边并执行 m 次合并操作，最后 对 source 和 destination 执行一次查询操作，查询与合并的单次操作时间复杂度为O(α(m))，因此合并与查询的时间复杂度为 O(m*α(m))，总的时间复杂度为 O(n+m*α(m))。
// 空间复杂度：O(n)，n 为图中的顶点数。并查集需要O(n)的空间。
