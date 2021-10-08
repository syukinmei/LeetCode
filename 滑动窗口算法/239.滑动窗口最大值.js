// 题目：239. 滑动窗口最大值
// 给你一个整数数组 nums，有一个大小为 k 的滑动窗口从数组的最左侧移动到数组的最右侧。你只可以看到在滑动窗口内的 k 个数字。滑动窗口每次只向右移动一位。

// 输入：nums = [1,3,-1,-3,5,3,6,7], k = 3
// 输出：[3,3,5,5,6,7]

// 输入：nums = [1], k = 1
// 输出：[1]

// 输入：nums = [1,-1], k = 1
// 输出：[1,-1]

// 输入：nums = [9,11], k = 2
// 输出：[11]

// 输入：nums = [4,-2], k = 2
// 输出：[4]
// var maxSlidingWindow = function (nums, k) {
//     //单调队列数组，存放的是元素的下标，为了取值方便(存放窗口中值的下标)
//     const queue = [];
//     // 结果数组
//     const ans = [];
//     for (let i = 0; i < nums.length; i++) {
//         // 若队列有值 且 当前元素大于等于队尾所存下标的元素，则弹出队尾(当前元素>队尾元素，则弹出队列)
//         while (queue.length && nums[i] >= nums[queue[queue.length - 1]]) {
//             queue.pop();
//         }
//         // 入队 当前元素的下标
//         queue.push(i)
//         // 由于窗口的移动会导致窗口里的元素超出下标范围，需要出队，i-k表示窗口的左界，超过左界需移除
//         // 判断当前最大值（即队首元素）是否在窗口中，若不在便将其出队(队首值的下标大于i-k)
//         while (queue[0] <= i - k) {
//             queue.shift();
//         }
//         // 当达到窗口大小时便开始向结果中添加元素
//         if (i >= k - 1) ans.push(nums[queue[0]]);
//     }
//     return ans
// };


var maxSlidingWindow = function (nums, k) {
    // 单调队列，存放窗口中值的下标，为了方便取值
    const queue=[];
    // 结果数组
    const ans =[];
    for (let i = 0;i<nums.length;i++){
        // 如果队列有值，且当前元素大于等于窗口尾部元素，则需要出队，移除队列最后一个元素
        while(queue.length && nums[i]>=nums[queue[queue.length-1]]){
            queue.pop();
        }
        // 将当前元素加入队列
        queue.push(i);
        // 判断队列头部是否超过窗口左边界（队首>i-k）
        if(queue[0]<=i-k) queue.shift();
        // 如果达到窗口大小便开始向结果数组中添加元素
        if(i>=k-1) ans.push(nums[queue[0]]);
    }
    return ans;
}


console.log(maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], k = 3))
// console.log(maxSlidingWindow([4, -2], k = 2))