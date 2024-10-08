// 给你一份旅游线路图，该线路图中的旅行线路用数组 paths 表示，其中 paths[i] = [cityAi, cityBi] 表示该线路将会从 cityAi 直接前往 cityBi 。请你找出这次旅行的终点站，即没有任何可以通往其他城市的线路的城市。
// 题目数据保证线路图会形成一条不存在循环的线路，因此恰有一个旅行终点站。

// 输入：paths = [["London","New York"],["New York","Lima"],["Lima","Sao Paulo"]]
// 输出："Sao Paulo"
// 解释：从 "London" 出发，最后抵达终点站 "Sao Paulo" 。本次旅行的路线是 "London" -> "New York" -> "Lima" -> "Sao Paulo" 。

// 输入：paths = [["B","C"],["D","B"],["C","A"]]
// 输出："A"
// 解释：所有可能的线路是：
// "D" -> "B" -> "C" -> "A".
// "B" -> "C" -> "A".
// "C" -> "A".
// "A".
// 显然，旅行终点站是 "A" 。

// 输入：paths = [["A","Z"]]
// 输出："Z"

// 提示：
// 1 <= paths.length <= 100
// paths[i].length == 2
// 1 <= cityAi.length, cityBi.length <= 10
// cityAi != cityBi
// 所有字符串均由大小写英文字母和空格字符组成。

// 方法一：枚举 + 两次遍历
// 题目相当于给你一条链上的有向边，你需要找到终点，也就是没有出边的点。
// 既然没有出边，那么终点必然不在 cityAi 中。

// 具体的：
//  1.遍历 paths，把所有 cityAi 存入到哈希集合中。
//  2.然后在遍历一次 paths，如果发现 cityBi 不在哈希集合中，那么 cityBi 就是终点。
/**
 * @param {string[][]} paths
 * @return {string}
 */
var destCity = function (paths) {
    const set = new Set();
    for (const p of paths) {
        set.add(p[0]);
    }
    for (const p of paths) {
        if (!set.has(p[1])) return p[1];
    }
    return "";
};
// 时间复杂度：O(n)，n 为数组 paths 的长度，需要对其进行两次遍历。
// 空间复杂度：O(n)，n 为数组 paths 的长度，需要使用哈希集合存储 cityAi。
