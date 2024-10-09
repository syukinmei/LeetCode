// 给你一个正整数数组 nums 。
//  - 元素和 是 nums 中的所有元素相加求和。
//  - 数字和 是 nums 中每一个元素的每一数位（重复数位需多次求和）相加求和。
// 返回 元素和 与 数字和 的绝对差。

// 注意：两个整数 x 和 y 的绝对差定义为 |x - y| 。

// 输入：nums = [1,15,6,3]
// 输出：9
// 解释：
// nums 的元素和是 1 + 15 + 6 + 3 = 25 。
// nums 的数字和是 1 + 1 + 5 + 6 + 3 = 16 。
// 元素和与数字和的绝对差是 |25 - 16| = 9 。

// 输入：nums = [1,2,3,4]
// 输出：0
// 解释：
// nums 的元素和是 1 + 2 + 3 + 4 = 10 。
// nums 的数字和是 1 + 2 + 3 + 4 = 10 。
// 元素和与数字和的绝对差是 |10 - 10| = 0 。

// 方法一：模拟
// 遍历数组 nums ，计算元素和 elementSum 和数字和 digitSum ，最后返回 |elementSum - digitSum| 即可。
// 因为一个正整数本身一定大于等于它各位数字之和，因此一个正整数数组的元素和与数字和的绝对差，等于它各个元素本身的值减去它的各位数字之和得到的差再求和。

/**
 * @param {number[]} nums
 * @return {number}
 */
var differenceOfSum = function (nums) {
    let elementSum = 0; // 记录元素和
    let digitSum = 0; // 记录数字和
    for (const num of nums) {
        elementSum += num;
        digitSum += getDigitSum(num);
    }
    return elementSum - digitSum;
};

//辅助函数，用于计算数字和
const getDigitSum = function (num) {
    let digitSum = 0;
    let temp = num;
    while (temp !== 0) {
        const digit = temp % 10;
        digitSum += digit;
        temp = (temp - digit) / 10;
    }
    return digitSum;
};
// 时间复杂度：O(n*logU)，n 为数组 nums 的长度，U 是数组 nums 的最大值。
// 空间复杂度：O(1)，只需要常数的空间存放若干变量。
