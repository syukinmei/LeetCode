// 给你一个长度为 n 的整数数组 score ，其中 score[i] 是第 i 位运动员在比赛中的得分。所有得分都 互不相同 。
// 运动员将根据得分 决定名次 ，其中名次第 1 的运动员得分最高，名次第 2 的运动员得分第 2 高，依此类推。运动员的名次决定了他们的获奖情况：
// 名次第 1 的运动员获金牌 "Gold Medal" 。
// 名次第 2 的运动员获银牌 "Silver Medal" 。
// 名次第 3 的运动员获铜牌 "Bronze Medal" 。
// 从名次第 4 到第 n 的运动员，只能获得他们的名次编号（即，名次第 x 的运动员获得编号 "x"）。
// 使用长度为 n 的数组 answer 返回获奖，其中 answer[i] 是第 i 位运动员的获奖情况。

// 输入：score = [5,4,3,2,1]
// 输出：["Gold Medal","Silver Medal","Bronze Medal","4","5"]
// 解释：名次为 [1st, 2nd, 3rd, 4th, 5th] 。

// 输入：score = [10,3,8,9,4]
// 输出：["Gold Medal","5","Bronze Medal","Silver Medal","4"]
// 解释：名次为 [1st, 5th, 3rd, 2nd, 4th] 。

/**
 * @param {number[]} score
 * @return {string[]}
 */
// 方法一：二维数组记录 得分 和 下标，后对二维数组进行排序 赋值ans数组
var findRelativeRanks = function (score) {
    // 声明一个数组长度为score的长度并用固定值0填充，再映射该数组，每一项变为长度为2的值为0的数组 [[0, 0], [0, 0]]
    const arr = new Array(score.length).fill(0).map(() => new Array(2).fill(0));
    let desc = ["Gold Medal", "Silver Medal", "Bronze Medal"]; // 辅助数组
    for (let i = 0; i < arr.length; i++) {
        arr[i][0] = score[i];
        arr[i][1] = i;
        // arr[i] = [score[i], i];
    }
    // 此时有二维数组，数组[0]为得分，数组[1]为下标. [ [ 10, 0 ], [ 3, 1 ], [ 8, 2 ], [ 9, 3 ], [ 4, 4 ] ]
    // 按照得分降序排序
    arr.sort((a, b) => b[0] - a[0]);
    // 此时数组为名次降序 赋值ans数组
    const ans = new Array(score.length).fill(0);
    for (let i = 0; i < score.length; i++) {
        if (i >= 3) { // 赋值排名
            ans[arr[i][1]] = i + 1 + '';
        } else { // 赋值奖章
            ans[arr[i][1]] = desc[i];
        }
    }
    return ans;
};
// 时间复杂度：O(n log n)，n为数组 score 的长度。拷贝 score 数组形成 arr新数组的复杂度为O(n)，对拷贝数组进行排序的复杂度为O(n log n)，构造答案数组复杂度为O(n)，整体时间复杂度为O(n log n)。
// 空间复杂度：O(n)，n为数组 score 的长度。


// 方法二：哈希表记录下表
// 哈希表记录原来的分值对应的坐标，这样排序后我们就知道每个原来的坐标排多少名了。
var findRelativeRanks = function (score) {
    let desc = ["Gold Medal", "Silver Medal", "Bronze Medal"]; // 辅助数组
    // 创建字典 key为分数 value为下标
    const map = new Map(), ans = new Array(score.length);
    for (let i = 0; i < score.length; i++)
        map.set(score[i], i);
    // 按照得分降序排序
    score = score.sort((a, b) => b - a);
    for (let i = 0; i < score.length; i++)
        ans[map.get(score[i])] = i <= 2 ? desc[i] : (i + 1) + "";
    return ans;
};
// 复杂度与方法一相同