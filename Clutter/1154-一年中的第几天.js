// 给你一个字符串 date ，按 YYYY-MM-DD 格式表示一个 现行公元纪年法 日期。请你计算并返回该日期是当年的第几天。
// 通常情况下，我们认为 1 月 1 日是每年的第 1 天，1 月 2 日是每年的第 2 天，依此类推。每个月的天数与现行公元纪年法（格里高利历）一致。

// 输入：date = "2019-01-09"
// 输出：9

// 输入：date = "2019-02-10"
// 输出：41

// 输入：date = "2003-03-01"
// 输出：60

// 提示：闰年的判定方法为：year 是 400 的倍数，或者 year 是 4 的倍数且不是 100 的倍数。
/**
 * @param {string} date
 * @return {number}
 */
// 方法一：利用switch穿透的特性
// break关键字出现在switch结构中用于结束switch结构
// switch结构如果没有break语句，会依次向下穿透执行，直到遇到break关键字
var dayOfYear = function (date) {
    date = date.split('-');
    let sum = 0; // 总天数
    let [y, m, d] = date;
    // 不使用break语句 可以让switch结构穿透执行
    switch (m) {
        case '12':
            sum += 30;
        case '11':
            sum += 31;
        case '10':
            sum += 30;
        case '09':
            sum += 31;
        case '08':
            sum += 31;
        case '07':
            sum += 30;
        case '06':
            sum += 31;
        case '05':
            sum += 30;
        case '04':
            sum += 31;
        case '03':
            // 如果是3月之后需要判断是平年还是闰年
            if (!(y % 400) || !(y % 4) && (y % 100)) {
                sum += 29;
            } else {
                sum += 28;
            }
        case '02':
            sum += 31;
    }
    return sum + parseInt(d);
};


// 方法二：
// 使用一个长度为 12 的数组，预先记录每一个月的天数，再进行累加，随后我们将答案再加上 day，
var dayOfYear = function (date) {
    date = date.split('-');
    const [y, m, d] = date
    const amount = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    // 判断平年还是闰年 如果是闰年2月要加1天
    if (!(y % 400) || !(y % 4) && y % 100) amount[1]++;
    // 计算
    let sum = 0;
    for (let i = 0; i < m - 1; i++) {
        sum += amount[i];
    }
    // return sum + parseInt(d);
    return sum + +d;
};
// 时间复杂度：O(1)。我们将字符串的长度(定值 7 )以及一年的月份数 12 视为常数
// 空间复杂度：O(1)。