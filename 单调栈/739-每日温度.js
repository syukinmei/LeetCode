// 请根据每日 气温 列表 temperatures ，请计算在每一天需要等几天才会有更高的温度。如果气温在这之后都不会升高，请在该位置用 0 来代替。

// 输入: temperatures = [73,74,75,71,69,72,76,73]
// 输出: [1,1,4,2,1,1,0,0]

// 输入: temperatures = [30,40,50,60]
// 输出: [1,1,1,0]

// 输入: temperatures = [30,60,90]
// 输出: [1,1,0]


/**
 * @param {number[]} temperatures
 * @return {number[]}
 */

// 方法一：暴力解法
// var dailyTemperatures = function (temperatures) {
//     let ans = new Array(temperatures.length).fill(0);
//     for (let i = 0; i < temperatures.length; i++) {
//         for (let j = i + 1; j < temperatures.length; j++) {
//             if (temperatures[i] < temperatures[j]) {
//                 ans[i] = j - i;
//                 break;
//             }
//         }
//     }
// }
// 时间复杂度：O(n^2)
// 空间复杂度：O(1)

// 方法二：单调栈
var dailyTemperatures = function (temperatures) {
    const stack = []; // 单调递减，存储温度列表的下标
    const res = new Array(temperatures.length).fill(0);
    for (let i = 0; i < temperatures.length; i++) {
        // 单调栈中有值 且 栈顶下标对应的元素 小于 当前元素 -> 出栈
        while (stack.length && temperatures[stack[stack.length - 1]] < temperatures[i]) {
            let previousIndex = stack.pop();
            res[previousIndex] = i - previousIndex;
        }
        stack.push(i);
    }
    return res;
};
// 时间复杂度：O(n)，其中n是温度列表的长度。正向遍历温度列表一遍，对于温度列表中的每个下标最多只进行一次进栈和出栈的操作。
// 空间复杂度：O(n)，其中n是温度列表的长度。需要维护一个单调栈存储温度列表中的下标。