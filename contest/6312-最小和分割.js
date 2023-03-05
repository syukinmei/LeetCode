// 给你一个正整数 num ，请你将它分割成两个非负整数 num1 和 num2 ，满足：
//  - num1 和 num2 直接连起来，得到 num 各数位的一个排列。
//     换句话说，num1 和 num2 中所有数字出现的次数之和等于 num 中所有数字出现的次数。
//  - num1 和 num2 可以包含前导 0 。
// 请你返回 num1 和 num2 可以得到的和的 最小 值。

// 注意：
//  - num 保证没有前导 0 。
//  - num1 和 num2 中数位顺序可以与 num 中数位顺序不同。

// 输入：num = 4325
// 输出：59
// 解释：我们可以将 4325 分割成 num1 = 24 和 num2 = 35 ，和为 59 ，59 是最小和。

// 输入：num = 687
// 输出：75
// 解释：我们可以将 687 分割成 num1 = 68 和 num2 = 7 ，和为最优值 75 。

/**
 * @param {number} num
 * @return {number}
 */
// 贪心
// 不难证明，最高位的数越小则该数字值越小，数位越少值越小。
// 因此，我们只需要将 num 中的数升序排序后，按奇偶位均匀的分配给 num1 和 num2 即可。
// 贪心策略，排序后将较小的值放在高位。
var splitNum = function (num) {
  // step1：数位分割 并 升序排序
  const digits = [];
  while (num !== 0) {
    const digit = num % 10;
    digits.push(digit);
    num = (num - digit) / 10;
  }
  digits.sort((a, b) => a - b);
  // step2：贪心分配
  let num1 = "";
  let num2 = "";
  for (let i = 0; i < digits.length; i++) {
    if (i & (1 === 1)) {
      num1 += digits[i];
    } else {
      num2 += digits[i];
    }
  }
  // 转字数字后返回和
  return ~~num1 + ~~num2;
};
// 时间复杂度：O(nlogn)，n 为数字 num 的位数。排序需要 O(nlogn)的时间。
// 空间复杂度：O(logn)，快排需要O(logn)的递归栈空间。
