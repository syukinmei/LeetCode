// 给你一个数组 target 和一个整数 n。每次迭代，需要从  list = { 1 , 2 , 3 ..., n } 中依次读取一个数字。
// 请使用下述操作来构建目标数组 target ：
// - "Push"：从 list 中读取一个新元素， 并将其推入数组中。
// - "Pop"：删除数组中的最后一个元素。
// -  如果目标数组构建完成，就停止读取更多元素。
// 题目数据保证目标数组严格递增，并且只包含 1 到 n 之间的数字。

// 请返回构建目标数组所用的操作序列。如果存在多个可行方案，返回任一即可。


// 输入：target = [1,3], n = 3
// 输出：["Push","Push","Pop","Push"]
// 解释： 
// 读取 1 并自动推入数组 -> [1]
// 读取 2 并自动推入数组，然后删除它 -> [1]
// 读取 3 并自动推入数组 -> [1,3]

// 输入：target = [1,2,3], n = 3
// 输出：["Push","Push","Push"]

// 输入：target = [1,2], n = 4
// 输出：["Push","Push"]
// 解释：只需要读取前 2 个数字就可以停止。


// Tips：题意即是 使用 list 拼装成 target ，我们要求的就是拼装的动作（Push/Pop）集合。

/**
 * @param {number[]} target
 * @param {number} n
 * @return {string[]}
 */
// 方法一：
// prev 起始值为 1，因为 list 从1开始。
// 当 target[i] === prev 时，进行一次“Push”。
// 当 target[i] !== prev 时，进行一次 “Push”和“Pop”即可。
// 每次操作都需要对prev进行加1操作。
var buildArray = function (target, n) {
    let prev = 1;
    const res = [];
    for (const number of target) {
        while (prev !== number) {
            res.push('Push');
            res.push('Pop');
            prev++;
        }
        res.push('Push');
        prev++;
    }
    return res;
};
// 时间复杂度：O(n)，Push 需要执行 O(n)次。
// 空间复杂度：O(1)，只需要常数的空间存放若干变量。


// 方法二：
// 操作对象是 1到n 严格递增的数字集合。每次操作一个数字时，如果他在 target 中，只需将它Push入栈即可。如果不在 target 中，可以先将其Push入栈，紧接着Pop出栈。
// 因为 target 中的数字是严格递增的，因此只需遍历 target ，在target中的每两个连续数字 prev 和 number 中插入 number - prev -1 个 Push 和 Pop ，最后再多加一个Push来插入当前数字即可。
var buildArray = function (target, n) {
    let prev = 0;
    const res = [];
    for (const number of target) {
        for (let i = 0; i < number - prev - 1; i++) {
            res.push('Push');
            res.push('Pop');
        }
        res.push('Push');
        prev = number;
    }
    return res;
};
// 时间复杂度：O(n)，Push 需要添加 O(n)次。
// 空间复杂度：O(1)，只需要常数的空间存放若干变量。
