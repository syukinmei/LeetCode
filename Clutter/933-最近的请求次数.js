// 写一个 RecentCounter 类来计算特定时间范围内最近的请求。

// 请你实现 RecentCounter 类：

// RecentCounter() 初始化计数器，请求数为 0 。
// int ping(int t) 在时间 t 添加一个新请求，其中 t 表示以毫秒为单位的某个时间，并返回过去 3000 毫秒内发生的所有请求数（包括新请求）。确切地说，返回在 [t-3000, t] 内发生的请求数。
// 保证 每次对 ping 的调用都使用比之前更大的 t 值。


// 输入：
// ["RecentCounter", "ping", "ping", "ping", "ping"]
// [[], [1], [100], [3001], [3002]]
// 输出：
// [null, 1, 2, 3, 3]

// 解释：
// RecentCounter recentCounter = new RecentCounter();
// recentCounter.ping(1);     // requests = [1]，范围是 [-2999,1]，返回 1
// recentCounter.ping(100);   // requests = [1, 100]，范围是 [-2900,100]，返回 2
// recentCounter.ping(3001);  // requests = [1, 100, 3001]，范围是 [1,3001]，返回 3
// recentCounter.ping(3002);  // requests = [1, 100, 3001, 3002]，范围是 [2,3002]，返回 3

// Tips：对于不了解题意的同学可以这样理解：
// 定义一个计数器，这个计数器只包含一个方法ping，每次ping方法传一个毫秒单位的时间进去，他会确保每次传的时间都是递增的，用来模拟他调用ping的时间点，然后返回最近3000毫米内调用ping的次数。



var RecentCounter = function () {
    this.queue = [];
};

/** 
 * @param {number} t
 * @return {number}
 */
RecentCounter.prototype.ping = function (t) {
    this.queue.push(t); // 添加一个新请求
    while (this.queue[0] < t - 3000) { // 过滤掉3000毫秒外的请求
        this.queue.shift();
    }
    return this.queue.length; // 此时队列中的就是过去3000毫米内发生的请求数。
};

/**
 * Your RecentCounter object will be instantiated and called as such:
 * var obj = new RecentCounter()
 * var param_1 = obj.ping(t)
 */

// 时间复杂度：O(1)，每个元素至多入队出队各一次。
// 空间复杂度：O(L)，L 为队列中的最大元素的个数。
