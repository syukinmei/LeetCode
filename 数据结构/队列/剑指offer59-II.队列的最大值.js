// 请定义一个队列并实现函数 max_value 得到队列里的最大值，要求函数max_value、push_back 和 pop_front 的均摊时间复杂度都是O(1)。
// 若队列为空，pop_front 和 max_value 需要返回 -1

// 输入: 
// ["MaxQueue","push_back","push_back","max_value","pop_front","max_value"]
// [[],[1],[2],[],[],[]]
// 输出: [null,null,null,2,1,2]

// 输入: 
// ["MaxQueue","pop_front","max_value"]
// [[],[],[]]
// 输出: [null,-1,-1]


// 方法一：不是使用内置API，基于对象实现
var MaxQueue = function () {
    // 存储队列数据
    this.queue = {};

    // 双端队列 维护最大值（每个阶段的最大值）
    this.deque = {};

    // 基于对象时需要的相关数据
    this.count = this.head = this.countQ = this.headQ = 0;
};

/** 获取队列最大值
 * @return {number}
 */
MaxQueue.prototype.max_value = function () {
    // 
    if (this.isEmptyQueue()) return -1;
    // 返回 deque 队首元素
    return this.deque[this.headQ];
};

/**  队尾入队
 * @param {number} value
 * @return {void}
 */
MaxQueue.prototype.push_back = function (value) {
    // queue 正常入队
    this.queue[this.count] = value;
    this.count++;

    // deque 需要呈现单调性(单调递减)
    //  - 双端队列不能为空
    //  - value 大于队尾元素
    while (!this.isEmptyDeque() && this.deque[this.countQ - 1] < value) {
        delete this.deque[this.countQ - 1];
        this.countQ--;
    }
    // 将value入队
    this.deque[this.countQ] = value;
    this.countQ++;
};

/** 队首出队
 * @return {number}
 */
MaxQueue.prototype.pop_front = function () {
    if (this.isEmptyQueue()) return -1;

    // 比较 deque 和 queue 的队首元素是否相同，如果相同 deque 出队，否则无操作
    if (this.deque[this.headQ] === this.queue[this.head]) {
        delete this.deque[this.headQ];
        this.headQ++;
    }
    // queue 正常出队 并返回出队元素
    const frontData = this.queue[this.head];
    delete this.queue[this.head];
    this.head++;
    return frontData;
};

/** 自定义辅助方法 检测队列 deque 是否为空
 * @return {boolean}
 */
MaxQueue.prototype.isEmptyDeque = function () {
    return this.countQ - this.headQ === 0;
}

/** 自定义辅助方法 检测队列 queue 是否为空
 * @return {boolean}
 */
MaxQueue.prototype.isEmptyQueue = function () {
    return this.count - this.head === 0;
}

/**
 * Your MaxQueue object will be instantiated and called as such:
 * var obj = new MaxQueue()
 * var param_1 = obj.max_value()
 * obj.push_back(value)
 * var param_3 = obj.pop_front()
 */



// 方法一：使用API

var MaxQueue = function () {
    this.queue = [];
    this.deque = [];
};

/**
 * @return {number}
 */
MaxQueue.prototype.max_value = function () {
    if (this.queue.length === 0) return -1;
    return this.deque[0];
};

/** 
 * @param {number} value
 * @return {void}
 */
MaxQueue.prototype.push_back = function (value) {
    // queue 正常入队
    this.queue.push(value);
    // deque 需要呈现单调性(单调递减)
    //  - 双端队列不能为空
    //  - value 大于队尾元素
    while (this.deque.length !== 0 && this.deque[this.deque.length - 1] < value) this.deque.pop();
    this.deque.push(value);
};

/**
 * @return {number}
 */
MaxQueue.prototype.pop_front = function () {
    if (this.queue.length === 0) return -1;

    // 比较 deque 和 queue 的队首元素是否相同，如果相同 deque 出队，否则无操作
    if (this.deque[0] === this.queue[0]) this.deque.shift();
    // queue 正常出队 并返回出队元素
    return this.queue.shift();
};

/**
 * Your MaxQueue object will be instantiated and called as such:
 * var obj = new MaxQueue()
 * var param_1 = obj.max_value()
 * obj.push_back(value)
 * var param_3 = obj.pop_front()
 */

// 时间复杂度：O(1)。
//  删除与求最大值操作显然只需要O(1)，
//  而插入操作虽然看起来有循环，做一个插入操作时最多可能会有 n 次出队操作，但是要注意，由于每个数字只会出队一次，因此对于所有的 n 个数字的插入过程，对应的所有出队操作也不会大于 n 次。因此将出队的时间均摊到每一个插入操作上，时间复杂度为O(1)。
// 空间复杂度：O(n)，需要用队列存储所有插入的元素。