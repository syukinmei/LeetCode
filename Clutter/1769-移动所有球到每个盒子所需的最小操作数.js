// 有 n 个盒子。给你一个长度为 n 的二进制字符串 boxes ，其中 boxes[i] 的值为 '0' 表示第 i 个盒子是 空 的，而 boxes[i] 的值为 '1' 表示盒子里有 一个 小球。
// 在一步操作中，你可以将 一个 小球从某个盒子移动到一个与之相邻的盒子中。第 i 个盒子和第 j 个盒子相邻需满足 abs(i - j) == 1 。注意，操作执行后，某些盒子中可能会存在不止一个小球。
// 返回一个长度为 n 的数组 answer ，其中 answer[i] 是将所有小球移动到第 i 个盒子所需的 最小 操作数。
// 每个 answer[i] 都需要根据盒子的 初始状态 进行计算。


// 输入：boxes = "110"
// 输出：[1,1,3]
// 解释：每个盒子对应的最小操作数如下：
// 1) 第 1 个盒子：将一个小球从第 2 个盒子移动到第 1 个盒子，需要 1 步操作。
// 2) 第 2 个盒子：将一个小球从第 1 个盒子移动到第 2 个盒子，需要 1 步操作。
// 3) 第 3 个盒子：将一个小球从第 1 个盒子移动到第 3 个盒子，需要 2 步操作。将一个小球从第 2 个盒子移动到第 3 个盒子，需要 1 步操作。共计 3 步操作。

// 输入：boxes = "001011"
// 输出：[11,8,5,4,3,4]

/**
 * @param {string} boxes
 * @return {number[]}
 */
// 方法一：模拟双重循环
// 第一层循环每个盒子 boxes[i]，第二次循环计算把所有小球转移到 boxes[i] 该盒子的最小操作数。
var minOperations = function (boxes) {
    const n = boxes.length;
    const res = [];
    for (let i = 0; i < n; i++) {
        let moveCount = 0;
        for (let j = 0; j < n; j++) {
            if (boxes[j] === '1') {
                moveCount += Math.abs(j - i);
            }
        }
        res.push(moveCount);
    }
    return res;
};
// 时间复杂度：O(n^2)，n 为数组 boxes 的长度，需要循环两次。
// 空间复杂度：O(1)，只需要常数的空间存放若干变量。


// 方法二：动态规划，根据前一个盒子的操作数得到下一个盒子的操作数
// 针对盒子 i，其左侧有 lc 个小球，右侧有 rc 个小球。假设对盒子 i 的最少操作为 dp[i] 次。
// 已知 dp[i]，可推导出 dp[i+1] 的最小操作数为 dp[i] + lc - rc。
// 因为原来左侧的 lc 个小球各需要多操作1步，原来右侧的 rc 个小球可以各少操作1步。
// 对于盒子 i 显然和 i-1 有递推关系。因此我们可以得到状态转移方程为：
//  - dp[i] = dp[i-1] + 左边1个数 - 右边1个数。
var minOperations = function (boxes) {
    const res = new Array(boxes.length).fill(0);
    let lc = boxes[0] === '1' ? 1 : 0; // 左侧 1 的总数
    let rc = 0; // 右侧 1 的总数
    for (let i = 1; i < boxes.length; i++) {
        if (boxes[i] === '1') {
            rc++; // 更新右侧 1 的总数
            res[0] += i; // 第一个箱子的操作数
        }
    }

    for (let i = 1; i < boxes.length; i++) {
        res[i] = res[i - 1] + lc - rc; // 第 n 个箱子的操作数
        if (boxes[i] === '1') {
            // 更新维护 lc 和 rc。
            lc++;
            rc--;
        }
    }
    return res;
};
// 时间复杂度：O(n)，n 为数组 boxes 的长度，我们分别需要对 boxes 数组循环两次。
// 空间复杂度：O(1)，只需要常数的空间存放若干变量。
