// 给定一个整数数组 arr，找到 min(b) 的总和，其中 b 的范围为 arr 的每个（连续）子数组。
// 由于答案可能很大，因此 返回答案模 10^9 + 7 。

// 输入：arr = [3,1,2,4]
// 输出：17
// 解释：
// 子数组为 [3]，[1]，[2]，[4]，[3,1]，[1,2]，[2,4]，[3,1,2]，[1,2,4]，[3,1,2,4]。 
// 最小值为 3，1，2，4，1，1，2，1，1，1，和为 17。

// 输入：arr = [11,81,94,43,3]
// 输出：444
[0, 4, 2, 3, 1, 2, 6, 3]

// 贡献值？？？
/* 
对于一个数字 A[i] 来说，如果在某个区间 [j, k] 里面它是最小值，那么 [j, k] 包含 A[i] 的子数组的最小值也一定是 A[i] 。所以我们只需要找出最大的那个区间，使得 A[i] 是最小值就行了。
3的贡献值 1*3=3
1的贡献值 6*1=6
2的贡献值 2*2=4
4的贡献值 1*4=4
比如 [2,4,1,2] ,以1 为最小数。能构成的数组数为 (2+1)*(1+1) ，2 表示 1 左面有两个比它大的数，1 表示 1 右面有一个比它大的数。 
contribution = value * amount
             = value * （1 + currentIndex - previousIndex）*（1 + nextIndex - currentIndex）
*/


/**
 * @param {number[]} arr
 * @return {number}
 */
// 方法一：暴力解法：
// 遍历所有子数组，然后对于每个子数组找出最小值求和。这种方法时间复杂度是 O(n^3) 。

// 方法二：聪明的暴力
var sumSubarrayMins = function (arr) {
    let res = 0;
    for (let i = 0; i < arr.length; i++) {
        let min_ = Infinity;
        for (let j = i; j < arr.length; j++) {
            min_ = Math.min(min_, arr[j]);
            res += min_;
        }
    }
    return res % (1e9 + 7);
};
// 时间复杂度：O(n^2)
// 空间复杂度：O(1);


// 方法三：暴力解法：循环找每个元素贡献值
// leetcode超时。。。很暴力
var sumSubarrayMins = function (arr) {
    let sum = 0; // 存放结果值
    for (let i = 0; i < arr.length; i++) {
        let left = i, right = i; // 寻找左右扩张边界的下标
        while (left >= 0 && arr[left - 1] > arr[i]) left--;
        while (right < arr.length && arr[right + 1] >= arr[i]) right++;
        sum += arr[i] * (i - left + 1) * (right - i + 1);
    }
    return sum % (1e9 + 7);
};
// 时间复杂素：O(n^2)
// 空间复杂度：O(1)


// 方法四：单调栈 + 贡献值

var sumSubarrayMins = function (arr) {
    const stack = []; // 单调递增栈
    const expandLeft = []; // 每个元素的左扩张边界
    const expandRight = []; // 每个元素的右扩张边界
    // step1 寻找左边扩张边界（寻找左边第一个小）
    for (let i = 0; i < arr.length; i++) {
        while (stack.length && arr[i] <= arr[stack[stack.length - 1]]) stack.pop();
        // 此时有栈顶元素即是当前元素左边第一个更小元素
        expandLeft[i] = stack.length ? stack[stack.length - 1] : -1;
        stack.push(i);
    }
    // step2 - 寻找右扩张边界（寻找右边第一个小）
    stack.length = 0; // stack初始化
    for (let i = arr.length - 1; i >= 0; i--) {
        // 此处选择 < 而不是 <= ，避免重复区间
        while (stack.length && arr[i] < arr[stack[stack.length - 1]]) stack.pop();
        // 此时有栈顶元素即使当前元素右边第一个更小元素
        expandRight[i] = stack.length ? stack[stack.length - 1] : arr.length;
        stack.push(i);
    }
    // step3 - 套用贡献值公式计算结果
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i] * (i - expandLeft[i]) * (expandRight[i] - i);
    }
    return sum %= 1e9 + 7;
}

// 时间复杂度：O(N)，其中 N 是 arr 的长度。
// 空间复杂度：O(N)。


// 方法五：单调栈 + DP动态规划
var sumSubarrayMins = function (arr) {
    const stack = []; // 单调栈
    stack.push(-1);
    const DP = new Array(arr.length + 1).fill(0);
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        while (stack[stack.length - 1] !== -1 && arr[i] <= arr[stack[stack.length - 1]]) stack.pop();
        // 此时有栈顶元素即是当前元素左边第一个更小元素
        DP[i + 1] = DP[stack[stack.length - 1] + 1] + (i - stack[stack.length - 1]) * arr[i];
        stack.push(i);
        sum += DP[i + 1];
    }
    return sum %= 1e9 + 7;
}

// 改版
var sumSubarrayMins = function (arr) {
    const stack = []; // 单调栈
    const DP = new Array(arr.length).fill(0);
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        while (stack.length && arr[i] <= arr[stack[stack.length - 1]]) stack.pop();
        // 此时有栈顶元素即是当前元素左边第一个更小元素
        if (stack.length) {
            DP[i] = DP[stack[stack.length - 1]] + (i - stack[stack.length - 1]) * arr[i];
        } else {
            DP[i] = (i + 1) * arr[i];
        }
        stack.push(i);
        sum += DP[i];
    }
    return sum %= 1e9 + 7;
}
console.log(sumSubarrayMins([3, 1, 2, 4, 2]));