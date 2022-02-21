// 给定一个数组 nums 和滑动窗口的大小 k，请找出所有滑动窗口里的最大值。

// 输入: nums = [1,3,-1,-3,5,3,6,7], 和 k = 3
// 输出: [3,3,5,5,6,7] 
// 解释: 

//   滑动窗口的位置                最大值
// ---------------               -----
// [1  3  -1] -3  5  3  6  7       3
//  1 [3  -1  -3] 5  3  6  7       3
//  1  3 [-1  -3  5] 3  6  7       5
//  1  3  -1 [-3  5  3] 6  7       5
//  1  3  -1  -3 [5  3  6] 7       6
//  1  3  -1  -3  5 [3  6  7]      7

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function (nums, k) {
    //单调队列数组，存放的是元素的下标，为了取值方便(存放窗口中值的下标)
    const queue = [];
    // 结果数组
    const ans = [];
    for (let i = 0; i < nums.length; i++) {
        // 若队列有值 且 当前元素大于等于队尾所存下标的元素，则弹出队尾(当前元素>=队尾元素，则弹出队列)
        while (queue.length && nums[queue[queue.length - 1]] <= nums[i]) {
            queue.pop();
        }
        // 入队 当前元素的下标
        queue.push(i);
        // 判断当前最大值（即队首元素）是否在窗口中，若不在便将其出队(队首值的下标大于等于i-k)
        if (queue[0] === i - k) queue.shift();

        // 当达到窗口大小时便开始向结果中添加元素
        if (i >= k - 1) ans.push(nums[queue[0]]);
    }
    return ans;
};


var maxSlidingWindow = function (nums, k) {
    const deque = [];
    // 结果数组
    const res = [];
    for (let i = 0; i < nums.length; i++) {
        // 单调队列有值 且 当前元素大于队尾元素，需出队
        while (deque.length && deque[deque.length - 1] < nums[i]) {
            deque.pop();
        }
        // 入队
        deque.push(nums[i]);
        // 判断当前最大值（即队首元素）是否在窗口中，若不在便将其出队(队首值的下标大于i-k)
        if (deque[0] === nums[i - k]) deque.shift();

        // 当达到窗口大小时便开始向结果中添加元素
        if (i >= k - 1) res.push(deque[0]);
    }
    return res;
};
// 时间复杂度：O(n)，n 为数组 nums 的长度，每一个下标(元素)恰好被放入队列一次，并且最多被弹出队列一次，因此时间复杂度为O(n)。
// 空间复杂度：O(k)，需要维护一个最多不会超过 k+1 个元素的单调队列。
