// 请你仅使用两个栈实现先入先出队列。队列应当支持一般队列支持的所有操作（push、pop、peek、empty）：
// 实现 MyQueue 类：
//  - void push(int x) 将元素 x 推到队列的末尾
//  - int pop() 从队列的开头移除并返回元素
//  - int peek() 返回队列开头的元素
//  - boolean empty() 如果队列为空，返回 true ；否则，返回 false

// 说明：
// 你 只能 使用标准的栈操作 —— 也就是只有 push to top, peek/pop from top, size, 和 is empty 操作是合法的。
// 你所使用的语言也许不支持栈。你可以使用 list 或者 deque（双端队列）来模拟一个栈，只要是标准的栈操作即可。

// 输入：
// ["MyQueue", "push", "push", "peek", "pop", "empty"]
// [[], [1], [2], [], [], []]
// 输出：
// [null, null, null, 1, 1, false]

// 解释：
// MyQueue myQueue = new MyQueue();
// myQueue.push(1); // queue is: [1]
// myQueue.push(2); // queue is: [1, 2] (leftmost is front of the queue)
// myQueue.peek(); // return 1
// myQueue.pop(); // return 1, queue is [2]
// myQueue.empty(); // return false

// 思路：
// 栈实现队列的出队操作效率低下：栈底元素（对应队首元素）无法直接删除，需要将上方所有元素出栈。
// 两个栈可实现将列表倒序：设有含三个元素的栈 inStack = [1,2,3] 和空栈 outStack = [] 。若循环执行 inStack 元素出栈并添加入栈 outStack ，直到栈 inStack 为空，则 inStack = [] , outStack = [3,2,1] ，即栈 outStack 元素为栈 inStack 元素倒序。
// 利用栈 outStack 删除队首元素：倒序后，outStack 执行出栈则相当于删除了 inStack 的栈底元素，即对应队首元素。
// 因此，可以设计栈 inStack 用于加入队尾操作，栈 outStack 用于将元素倒序，从而实现删除队首元素。

// 函数设计：
// 1. 入队加入队尾 push()：将数字 val 加入栈 inStack 即可。
// 2. 获取队首元素 peek()：
//   - 当栈 outStack 不为空：outStack 中仍有已完成倒序的元素，因此直接返回 outStack 的栈顶元素即可。
//   - 否则：将栈 inStack 中全部元素转移至栈 outStack 中，以实现元素倒序，并返回 outStack 的栈顶元素。
// 3. 弹出队首元素 pop()：和 peek 相似，返回 outStack 的栈顶元素操作改为弹出操作。
// 4. 队列判断空 empty()：当栈 inStack 和 outStack 都为空时，队列为空。

/**
 * Your MyQueue object will be instantiated and called as such:
 * var obj = new MyQueue()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.peek()
 * var param_4 = obj.empty()
 */
var MyQueue = function () {
    this.inStack = []; // 入队栈，用于加入队尾元素操作
    this.outStack = []; // 出队栈，用于将元素倒序，从而实现删除队首元素。
};

/**
 * 元素入队
 * @param {number} x
 * @return {void}
 */
MyQueue.prototype.push = function (x) {
    this.inStack.push(x);
};

/**
 * 弹出队首元素
 * @return {number}
 */
MyQueue.prototype.pop = function () {
    if (this.outStack.length === 0) {
        this.in2out();
    }
    return this.outStack.pop();
};

/**
 * 查看队首元素
 * @return {number}
 */
MyQueue.prototype.peek = function () {
    if (this.outStack.length === 0) {
        this.in2out();
    }
    return this.outStack[this.outStack.length - 1];
};

/**
 * 判断队列为空
 * @return {boolean}
 */
MyQueue.prototype.empty = function () {
    return this.outStack.length === 0 && this.inStack.length === 0;
};

/**
 * 将入队栈 inStack 中的元素弹出后入栈到出队栈 outStack 中，以实现倒序效果。
 * @return {void}
 */
MyQueue.prototype.in2out = function () {
    while (this.inStack.length) {
        this.outStack.push(this.inStack.pop());
    }
};
// 时间复杂度：push、empty 的操作为O(1)，pop、peek 操作均摊O(1)，函数在 n 次删除队首元素操作中总共需要完成 n 个元素的倒序，均摊时间复杂度为O(1)。
// 空间复杂度；O(n)，n 为操作总数，对于 n 次 push 操作，队列中会有 n 个元素的情况，因此空间复杂度为O(n)。
