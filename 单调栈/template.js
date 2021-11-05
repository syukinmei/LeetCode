// 给你一个数组nums，请你返回一个等长的结果数组，结果数组中对应下标存储着下一个更大（下一个更小、上一个更大、上一个更小）元素，如果没有就存储-1。

// 辅助函数
function isEmpty(arr) {
    return arr.length === 0;
}

function peek(arr) {
    return arr[arr.length - 1];
}

Array.prototype.top = function () {
    return this[this.length - 1]
}

Array.prototype.empty = function () {
    return !this.length
}


// 下一个更大元素
/**
 * @param {number[]}nums
 * @return {number[]}
 */
// 正向遍历 
var nextGreaterElement_1 = function (nums) {
    const res = new Array(nums.length).fill(-1); // 存放结果数组  默认值为-1表示没有找到
    const stack = []; // 单调递减栈 保证栈中元素未找到下一个更大元素（存放索引）
    for (let i = 0; i < nums.length; i++) {
        // 栈中有值 且 当前元素大于栈顶元素，说明栈中部分元素的下一个更大元素已找到，需要记录并弹栈
        // [4,2,1] current->3
        while (!stack.empty() && nums[i] > nums[stack.top()]) {
            res[stack.top()] = nums[i];
            stack.pop();
        }
        stack.push(i);
    }
    return res;
}

/**
 * @param {number[]}nums
 * @return {number[]}
 */
// 逆向遍历（相较正向遍历清晰很多）
var nextGreaterElement_2 = function (nums) {
    const res = new Array(nums.length); // 存放结果数组
    const stack = []; // 单调递减栈，保证栈顶元素即是当前元素下一个更大元素
    for (let i = nums.length - 1; i >= 0; i--) {
        // 栈中有值 且 当前元素 大于等于 栈顶元素 则弹栈
        while (!stack.empty() && nums[i] >= stack.top()) {
            // 矮个子起开，反正也被挡着
            stack.pop();
        }
        // 此时栈顶元素就是当前元素元素下一个更大元素，提前是栈中有值
        res[i] = stack.empty() ? -1 : stack.top();
        // 压栈
        stack.push(nums[i]);
    }
    return res;
}



// 下一个更小元素
/**
 * @param {number[]}nums
 * @return {number[]}
 */
// 正向遍历
let nextLesserElement_1 = function (nums) {
    const res = new Array(nums.length).fill(-1); // 存放结果数组 默认值为-1表示没有找到
    const stack = []; // 单调递增栈，保证栈中元素为找到下一个更小元素（存放索引）
    for (let i = 0; i < nums.length; i++) {
        // 栈中有值 且 当前元素 小于 栈顶元素，说明栈中部分元素的下一个更小元素已经找到，需要记录并弹栈
        while (!stack.empty() && nums[i] < nums[stack.top()]) {
            res[stack.top()] = nums[i];
            stack.pop();
        }
        stack.push(i);
    }
    return res;
}

/**
 * @param {number[]}nums
 * @return {number[]}
 */
// 逆向遍历（相较正向遍历清晰很多）
let nextLesserElement_2 = function (nums) {
    const res = new Array(nums.length); // 存储结果数组
    const stack = []; // 单调递增栈，保证栈顶元素即是当前元素下一个更小元素
    for (let i = nums.length - 1; i >= 0; i--) {
        // 栈中有值 且 当前元素 小于等于 栈顶元素 则弹栈
        while (!stack.empty() && nums[i] <= stack.top()) {
            stack.pop();
        }
        // 此时栈顶元素就是当前元素下一个更小元素，提前是栈中有值
        res[i] = stack.empty() ? -1 : stack.top();
        // 压栈
        stack.push(nums[i]);
    }
    return res;
}



// 上一个更大元素
/**
 * @param {number[]}nums
 * @return {number[]}
 */
let lastGreaterElement_1 = function(nums){
    
}
