// 给你一个日期，请你设计一个算法来判断它是对应一周中的哪一天。
// 输入为三个整数：day、month 和 year，分别表示日、月、年。
// 您返回的结果必须是这几个值中的一个 {"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"}。

// 提示：给出的日期一定是在 1971 到 2100 年之间的有效日期。

// 输入：day = 31, month = 8, year = 2019
// 输出："Saturday"

// 输入：day = 18, month = 7, year = 1999
// 输出："Sunday"

// 输入：day = 15, month = 8, year = 1993
// 输出："Sunday"

// 闰年定义：
// 1、年份能被4整除；
// 2、年份若是100的整数倍的话,需被400整除,否则是平年.

// 又因为本题年份在 1971 - 2100 年之间所以满足 %4 === 0 即可。

// 计算 beginYear - endYear 中的闰年数量
// 求出 [0,beginYear-1] 中闰年数量  -  [0,endYear] 中闰年数量

// 那么对于[0,beginYear-1]中闰年的数目可以这么求解：
// (beginYear-1)/4 - (beginYear-1)/100 + (beginYear-1)/400
// 即 [0,beginYear-1] 中4的倍数的个数减去 100 的倍数的个数，再加上 400 的倍数的个数。这点需要好好思考一下。这样就可以在常数时间内求解了。

var sectionEapYearCount = function (beginYear, endYear) {
    const begin4 = (beginYear - 1) / 4;
    const begin100 = (beginYear - 1) / 100;
    const begin400 = (beginYear - 1) / 400;
    const left = begin4 - begin100 + begin400;

    const end4 = endYear / 4;
    const end100 = endYear / 100;
    const end400 = endYear / 400;
    const right = end4 - end100 + end400;

    return parseInt(right - left);
}
console.log(sectionEapYearCount(1971, 2019))
console.log(Math.floor((2019 - 1969) / 4))


/**
 * @param {number} day
 * @param {number} month
 * @param {number} year
 * @return {string}
 */

// 思路：
// 1970.12.31是星期四，先计算当前日期距离1970.12.31的总天数。
// 每7天一循环，（总天数+3）%7，就是当前日期的周几了。
// 例如，输入是 1999年3月21日 ，即可分为三部分分别计算后求和：
// -（1） 1971年1月1日 到 1998年12月31日 之间的所有天数；
// -（2） 1999年1月1日 到 1999年2月28日 之间的所有天数；
// -（3） 1999年3月1日 到 1999年3月21日 之间的所有天数；（直接+day）
// （1）和（2）需要考虑闰年的影响。
var dayOfTheWeek = function (day, month, year) {
    // 计算输入日距1970年12月31日（星期4）的天数来推导
    let days = 0;
    const week = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30];
    /* 输入年份之前的年份的天数贡献 */
    days += 365 * (year - 1971) + Math.floor((year - 1969) / 4);
    /* 输入月份之前的月份的天数贡献 */
    for (let i = 0; i < month - 1; i++) {
        days += monthDays[i];
    }
    // 如果当前年是闰年 且大于二月则需要加一天。
    if ((year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0)) && month > 2) days += 1;
    /* 输入月份中天数的贡献 */
    days += day;

    return week[(days + 3) % 7];
};

// 时间复杂度：O(C)，C 为一年中的月份数 12。仅需要常量时间的数学计算。
// 空间复杂度：O(C)，C 为一年中的月份数 12。仅需要常量空间的数组。