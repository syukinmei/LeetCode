// Hercy 想要为购买第一辆车存钱。他 每天 都往力扣银行里存钱。
// 最开始，他在周一的时候存入 1 块钱。从周二到周日，他每天都比前一天多存入 1 块钱。在接下来每一个周一，他都会比 前一个周一 多存入 1 块钱。
// 给你 n ，请你返回在第 n 天结束的时候他在力扣银行总共存了多少块钱。

// 1 2 3 4 5 6 7 --28(7)
// 2 3 4 5 6 7 8 --35(7)

/**
 * @param {number} n
 * @return {number}
 */
// 方法一：暴力解法
// 记当前的天数是第 week 周的第 day 天。此时有每天存的钱等于 week + day -1。把每天存的钱相加就是我们要求的答案。
var totalMoney = function (n) {
    let week = 1, day = 1;
    let res = 0;
    while (n > 0) {
        res += week + day - 1; // 存钱
        day++;
        n--;
        if (day === 8) { // 新的一周，更新day 和 week
            day = 1;
            week++;
        }
    }
    return res;
};
// 时间复杂度：O(n)，需要遍历一次 n 得到答案。
// 空间复杂度：O(1)，只需要常数的空间存放若干变量。


// 方法二：等差数列求和公式
// an = a1 + (n-1)d  Sn = n * a1 + n(n-1)d/2  或 Sn = n(a1+an)/2
// 因为每周七天存的钱之和比上一周多 7 块，因此每周存的钱之和的序列是一个等差数列，我们可以用等差数列求和公式来求出所有完整的周存的钱总和。剩下的天数里，每天存的钱也是一个等差数列，可以用相同的公式进行求和。最后把两者相加可以得到答案。
var totalMoney = function (n) {
    // 1、利用等差公式计算 完整周存的钱
    const weekNumber = Math.floor(n / 7); // 完整周的数量
    const firstWeekMoney = 7 * 1 + 7 * (7 - 1) * 1 / 2; // 第一周存的钱
    const lastWeekMoney = firstWeekMoney + (weekNumber - 1) * 7; // 最后一个完整周存的钱
    const weekMoney = weekNumber * (firstWeekMoney + lastWeekMoney) / 2; // 完整周存的钱

    // 2、利用等差公式计算 剩下不能构成一个完整周的天数里存的钱
    dayNumber = n % 7; // 剩余不能构成一个完整周的天数
    firstDayMoney = 1 + weekNumber; // 剩余天数第一天存的钱
    lastDayMoney = firstDayMoney + dayNumber - 1; // 剩余天数最后一天存的钱
    dayMoney = dayNumber * (firstDayMoney + lastDayMoney) / 2; // 剩下不能构成一个完整周的天数里存的钱
    // dayMoney = dayNumber * firstDayMoney + dayNumber * (dayNumber - 1) * 1 / 2;
    return dayMoney + weekMoney;
}
// 时间复杂度：O(1)，只需要用到常数时间。
// 空间复杂度：O(1)，只需要常数的空间存放若干变量。