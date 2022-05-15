// 给你一个整数 n ，按字典序返回范围 [1, n] 内所有整数。
// 你必须设计一个时间复杂度为 O(n) 且使用 O(1) 额外空间的算法。

// 输入：n = 13
// 输出：[1,10,11,12,13,2,3,4,5,6,7,8,9]

// 输入：n = 2
// 输出：[1,2]

/**
 * @param {number} n
 * @return {number[]}
 */
// 方法一：递归
/**
 * @param {number} n
 * @return {number[]}
 */
var lexicalOrder = function (n) {
    const res = [];

    function dfs(number) {
        if (number > n) return;

        res.push(number);

        for (let i = 0; i <= 9; i++) {
            if (number * 10 + i <= n) dfs(number * 10 + i, n);
        }
    }

    for (let i = 1; i <= 9; i++) {
        dfs(i);
    }
    return res;
};

// 方法二：递归的十叉树思想
// 字典序排序，相当于从 1 开始，用DFS遍历下一位取值为 0-9 的十叉树
// 当遍历到的数字超出范围，则不记录，并且返回。
var lexicalOrder = function (n) {
    const res = [];

    function bfs(number = 1) {
        if (number > n) return;
        res.push(number);
        bfs(number * 10);
        if (number % 10 !== 9) bfs(number + 1);
    }

    bfs();
    return res;
};

// 方法三：迭代
// 共有 n 个数需要被处理，假设当前处理到的数为 number，根据字典序规则，在满足条件的前提下，我们优先在 number 的后面添加 0（即 number * 10 <= n 满足），否则我们考虑将上一位回退并进行加一操作。
var lexicalOrder = function (n) {
    const res = [];
    let number = 1;
    for (let i = 1; i <= n; i++) {
        res.push(number);
        if (number * 10 <= n) {
            number *= 10;
        } else {
            while (number % 10 === 9 || number + 1 > n) { // 使用while循环而不是if 是因为考虑number末尾是连续的9的情况
                number = Math.floor(number / 10);
            }
            number++;
        }
    }
    return res;
};
// 时间复杂度：O(n)，n 为整数的数目，获取下一个字典序整数的最坏时间复杂度为O(logn)，但 while 循环的迭代次数于 number 的末尾连续的 9 的数目有关，在整数区间[1, n]中，末尾是连续的9的数字个数不超过 n / 10^k 个，其中 1<= k <= [log10 n]。
// 空间复杂度：O(1)，只需要常数的空间存放若干变量。
