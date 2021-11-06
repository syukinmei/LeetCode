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
        // 此时栈顶元素就是当前元素元素下一个更大元素，前提是栈中有值
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
var nextLesserElement_1 = function (nums) {
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
var nextLesserElement_2 = function (nums) {
    const res = new Array(nums.length); // 存储结果数组
    const stack = []; // 单调递增栈，保证栈顶元素即是当前元素下一个更小元素
    for (let i = nums.length - 1; i >= 0; i--) {
        // 栈中有值 且 当前元素 小于等于 栈顶元素 则弹栈
        while (!stack.empty() && nums[i] <= stack.top()) {
            stack.pop();
        }
        // 此时栈顶元素就是当前元素下一个更小元素，前提是栈中有值
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
// 正向遍历（相较逆向遍历清晰很多）
var lastGreaterElement_1 = function (nums) {
    const res = new Array(nums.length); // 存放结果数组
    const stack = []; // 单调递减栈，保证栈顶元素即是当前元素上一个更大元素
    for (let i = 0; i < nums.length; i++) {
        // 栈中有值 且 当前元素 大于等于 栈顶元素 则弹栈
        while (!stack.empty() && nums[i] >= stack.top()) {
            stack.pop()
        }
        // 此时有栈顶元素即使当前元素上一个更大元素，前提是栈中有值
        res[i] = stack.empty() ? -1 : stack.top();
        // 压栈
        stack.push(nums[i]);
    }
    return res;
}

/**
 * @param {number[]}nums
 * @return {number[]}
 */
// 逆向遍历
var lastGreaterElement_2 = function (nums) {
    const res = new Array(nums.length).fill(-1); // 存放结果数组
    const stack = []; // 单调递减栈，保证栈中元素未找到上一个更大元素（存索引）
    for (let i = nums.length - 1; i >= 0; i--) {
        // 栈中有值 且 当前元素 大于 栈顶元素 ，说明栈中部分元素上一更大元素已找到，需要记录并弹栈
        while (!stack.empty() && nums[i] > nums[stack.top()]) {
            res[stack.top()] = nums[i];
            stack.pop();
        }
        stack.push(i);
    }
    return res;
}



// 上一个更小元素
/**
 * @param {number[]}nums
 * @return {number[]}
 */
// 正向遍历（相较逆向遍历清晰很多）
var lastLesserElement_1 = function (nums) {
    const res = new Array(nums.length);
    const stack = []; // 单调递增栈，保证栈顶元素即使当前元素上一个更小元素
    for (let i = 0; i < nums.length; i++) {
        // 栈中有值 且 当前元素 小于等于 栈顶元素 则弹栈
        while (!stack.empty() && nums[i] <= stack.top()) {
            stack.pop();
        }
        // 此时有栈顶元素即是当前元素上一个更小元素，前提是栈中有值
        res[i] = stack.empty() ? -1 : stack.top();
        // 压栈
        stack.push(nums[i]);
    }
    return res;
}

/**
 * @param {number[]}nums
 * @return {number[]}
 */
// 逆向遍历
var lastLesserElement_2 = function (nums) {
    const res = new Array(nums.length).fill(-1); // 存放结果数组
    const stack = []; // 单调递增，保证栈中元素未找到上一个更小元素（存放索引）
    for (let i = nums.length - 1; i >= 0; i--) {
        // 栈中有值 且 当前元素 小于 栈顶元素，说明栈中部分元素的上一个更小元素已经找到，需要记录并弹栈
        while (!stack.empty() && nums[i] < nums[stack.top()]) {
            res[stack.top()] = nums[i];
            stack.pop();
        }
        stack.push(i);
    }
    return res;
}

// 复杂度分析：
// 这个算法的时间复杂度不是那么直观，如果你看到 for 循环嵌套 while 循环，可能认为这个算法的复杂度也是 O(n^2)，但是实际上这个算法的复杂度只有 O(n)。
// 分析它的时间复杂度，要从整体来看：总共有 n 个元素，每个元素都被 push 入栈了一次，而最多会被 pop 一次，没有任何冗余操作。所以总的计算规模是和元素规模 n 成正比的，也就是 O(n) 的复杂度。