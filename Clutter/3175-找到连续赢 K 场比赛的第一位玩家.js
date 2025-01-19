// 有 n 位玩家在进行比赛，玩家编号依次为 0 到 n - 1 。
// 给你一个长度为 n 的整数数组 skills 和一个 正整数 k ，其中 skills[i] 是第 i 位玩家的技能等级。skills 中所有整数 互不相同 。
// 所有玩家从编号 0 到 n - 1 排成一列。

// 比赛进行方式如下：

//  - 队列中最前面两名玩家进行一场比赛，技能等级 更高 的玩家胜出。
//  - 比赛后，获胜者保持在队列的开头，而失败者排到队列的末尾。

// 这个比赛的赢家是 第一位连续 赢下 k 场比赛的玩家。
// 请你返回这个比赛的赢家编号。

// 输入：skills = [4,2,6,3,9], k = 2
// 输出：2
// 解释：
// 一开始，队列里的玩家为 [0,1,2,3,4] 。比赛过程如下：
// 玩家 0 和 1 进行一场比赛，玩家 0 的技能等级高于玩家 1 ，玩家 0 胜出，队列变为 [0,2,3,4,1] 。
// 玩家 0 和 2 进行一场比赛，玩家 2 的技能等级高于玩家 0 ，玩家 2 胜出，队列变为 [2,3,4,1,0] 。
// 玩家 2 和 3 进行一场比赛，玩家 2 的技能等级高于玩家 3 ，玩家 2 胜出，队列变为 [2,4,1,0,3] 。
// 玩家 2 连续赢了 k = 2 场比赛，所以赢家是玩家 2 。

// 输入：skills = [2,5,4], k = 3
// 输出：1
// 解释：
// 一开始，队列里的玩家为 [0,1,2] 。比赛过程如下：
// 玩家 0 和 1 进行一场比赛，玩家 1 的技能等级高于玩家 0 ，玩家 1 胜出，队列变为 [1,2,0] 。
// 玩家 1 和 2 进行一场比赛，玩家 1 的技能等级高于玩家 2 ，玩家 1 胜出，队列变为 [1,0,2] 。
// 玩家 1 和 0 进行一场比赛，玩家 1 的技能等级高于玩家 0 ，玩家 1 胜出，队列变为 [1,2,0] 。
// 玩家 1 连续赢了 k = 3 场比赛，所以赢家是玩家 1 。

// 方法一：双指针模拟
// 由于每次被比较中，较小元素会被移到队列的末尾，因此每次比较一定是数组中的下一个元素和当前的较大元素进行比较。
// 因此，如果循环了 n - 1 次，那么最后的赢家一定是数组中的最大元素。否则，如果某个元素连续胜出了 k 次，那么这个元素就是最后的赢家。
// 具体的：
// 双指针 i 指向当前胜者，j指向下一个被比较的元素，cnt 为当前胜者 skills[i] 的连续胜场数。
// 每次比较 skills[i] 和 skills[j]，如果 skills[i] > skills[j]，则 cnt++，否则 cnt 重置为 1，i 指向 j，j 指向下一个元素。
// 如果 cnt == k，则返回 i。
// 直到 i 指向最后一个元素，返回 i。因为 i 就是当前数组中的最大元素，后面没有未比较的新元素了，且其余都是败后被移到后面的较小元素了。
/**
 * @param {number[]} skills
 * @param {number} k
 * @return {number}
 */
var findWinningPlayer = function (skills, k) {
    const n = skills.length;
    let i = 0;
    let cnt = 0;
    while (i < n) {
        let j = i + 1;
        // 记录当前胜者 skills[i] 可以连续胜出的次数
        while (j < n && skills[i] > skills[j] && cnt < k) {
            cnt++;
            j++;
        }

        // 当前胜者达到成为赢家的条件
        if (cnt == k) return i;

        // 更新当前胜者和其连续胜场数
        cnt = 1;
        i = j;
    }

    // 循环结束，最后的赢家为数组中的最大元素，即 i。
    return i;
};
// 时间复杂度：O(n)，n 为数组 skills 的长度，每个元素最多只被访问一次，因此总的时间复杂度为 O(n)。
// 空间复杂度：O(1)，只需要常数的空间存放若干变量。
