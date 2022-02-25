// 复数 可以用字符串表示，遵循 "实部+虚部i" 的形式，并满足下述条件：

//  - 实部 是一个整数，取值范围是 [-100, 100]
//  - 虚部 也是一个整数，取值范围是 [-100, 100]
//  - i2 == -1
// 给你两个字符串表示的复数 num1 和 num2 ，请你遵循复数表示形式，返回表示它们乘积的字符串。

// 输入：num1 = "1+1i", num2 = "1+1i"
// 输出："0+2i"
// 解释：(1 + i) * (1 + i) = 1 + i2 + 2 * i = 2i ，你需要将它转换为 0+2i 的形式。

// 输入：num1 = "1+-1i", num2 = "1+-1i"
// 输出："0+-2i"
// 解释：(1 - i) * (1 - i) = 1 + i2 - 2 * i = -2i ，你需要将它转换为 0+-2i 的形式。 


/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
// 方法一：模拟
var complexNumberMultiply = function (num1, num2) {
    // 获取复数的实部和虚部
    const [a, b] = [parseInt(num1.split('+')[0]), parseInt(num1.split('+')[1].split('i')[0])];
    const [c, d] = [parseInt(num2.split('+')[0]), parseInt(num2.split('+')[1].split('i')[0])];
    // 公式：(a+bi)(c+di)=(ac-bd)+(bc+ad)i
    const res = '' + a * c - b * d + '+' + (b * c + a * d) + 'i';
    return res;
};
// 时间复杂度：O(1)，处理字符串获取复述的实部和虚部的时间为常数。
// 空间复杂度：O(1)，只需要常数的空间存放若干变量。
