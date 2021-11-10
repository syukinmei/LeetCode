// 在《英雄联盟》的世界中，有一个叫 “提莫” 的英雄。他的攻击可以让敌方英雄艾希（编者注：寒冰射手）进入中毒状态。
// 当提莫攻击艾希，艾希的中毒状态正好持续 duration 秒。
// 正式地讲，提莫在 t 发起发起攻击意味着艾希在时间区间 [t, t + duration - 1]（含 t 和 t + duration - 1）处于中毒状态。如果提莫在中毒影响结束 前 再次攻击，中毒状态计时器将会 重置 ，在新的攻击之后，中毒影响将会在 duration 秒后结束。
// 给你一个 非递减 的整数数组 timeSeries ，其中 timeSeries[i] 表示提莫在 timeSeries[i] 秒时对艾希发起攻击，以及一个表示中毒持续时间的整数 duration 。
// 返回艾希处于中毒状态的 总 秒数。


// 输入：timeSeries = [1,4], duration = 2
// 输出：4
// 解释：提莫攻击对艾希的影响如下：
// - 第 1 秒，提莫攻击艾希并使其立即中毒。中毒状态会维持 2 秒，即第 1 秒和第 2 秒。
// - 第 4 秒，提莫再次攻击艾希，艾希中毒状态又持续 2 秒，即第 4 秒和第 5 秒。
// 艾希在第 1、2、4、5 秒处于中毒状态，所以总中毒秒数是 4 。


// 输入：timeSeries = [1,2], duration = 2
// 输出：3
// 解释：提莫攻击对艾希的影响如下：
// - 第 1 秒，提莫攻击艾希并使其立即中毒。中毒状态会维持 2 秒，即第 1 秒和第 2 秒。
// - 第 2 秒，提莫再次攻击艾希，并重置中毒计时器，艾希中毒状态需要持续 2 秒，即第 2 秒和第 3 秒。
// 艾希在第 1、2、3 秒处于中毒状态，所以总中毒秒数是 3 。


/**
 * @param {number[]} timeSeries
 * @param {number} duration
 * @return {number}
 */
// 方法一：判断当前是否处于中毒状态
// expired 记录恢复为未中毒的起始时间（中毒结束时间）
// 如果不是，中毒持续时间增加 duration；
// 如果是，本次中毒时间为 本次中毒结束时间-上次中毒结束时间 。本次中毒后结束时间为 timeSeries + duration。

// [1,5,6,8,11] 3
// 1,2,3 [4] -0+3
// 5,6,7 [8] -3+3
// 8     [9] -6+(6+3-8);
// 11,12,13 [14]
var findPoisonedDuration = function (timeSeries, duration) {
    let ans = 0; // 答案，中毒持续时间
    let expired = 0; // 中毒结束的时间
    for (let i = 0; i < timeSeries.length; i++) {
        // 当前未处于中毒状态，第 expired 秒已经恢复
        if (timeSeries[i] >= expired) {
            ans += duration;
        } else {
            // 当前处于中毒状态
            ans += timeSeries[i] + duration - expired;
        }
        expired = timeSeries[i] + duration;
    }
    return ans;
};
// 时间复杂度：O(n)，其中n为数组timeSeries的长度。我们只需要遍历一次数组即可。
// 空间复杂度：O(1)，我们只需要常数的空间保存 未中毒起始时间即可。


// 方法二：判断本次中毒期间会不会存在二次中毒。
// 如果不存在，中毒持续时间+duration
// 如果存在，本次中毒持续时间 二次中毒开始时间 - 本次中毒开始时间
// 最后加一次中毒持续时间duration

// [1,5,6,8,11] 3
// 1,2,3
// 5
// 6,7
// 8,9,10
// 11,12,13 -12
var findPoisonedDuration = function (timeSeries, duration) {
    let ans = 0; // 答案，中毒持续时间
    let expired = 0; // 中毒结束的时间
    for (let i = 0; i < timeSeries.length - 1; i++) {
        // 中毒期间没有二次中毒，ans+duration
        if (timeSeries[i] + duration <= timeSeries[i + 1]) {
            ans += duration;
        } else {
            // 中毒期间二次中毒，ans += 二次中毒开始时间 - 本次中毒开始时间
            ans += timeSeries[i + 1] - timeSeries[i];
        }
    }
    return ans + duration;
};
// 时间复杂度：O(n)，其中n为数组timeSeries的长度。我们只需要遍历一次数组即可。
// 空间复杂度：O(1)。

