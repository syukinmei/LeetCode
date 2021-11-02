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
// 方法二：单调栈
 var dailyTemperatures = function (temperatures) {
    const stack = []; // 递减
    const res = new Array(temperatures.length).fill(0);
    for (let i = 0; i < temperatures.length; i++) {
        // 单调栈中有值 且 栈顶下标对应的元素 小于 当前元素 -> 出栈
        while (stack.length && temperatures[stack[stack.length - 1]] < temperatures[i]) {
            res[stack.pop()] = i - temp;
        }
        stack.push(i);
    }
    return res;
};