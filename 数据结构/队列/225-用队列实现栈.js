// 请你仅使用两个队列实现一个后入先出（LIFO）的栈，并支持普通栈的全部四种操作（push、top、pop 和 empty）。
// 实现 MyStack 类：
//  - void push(int x) 将元素 x 压入栈顶。
//  - int pop() 移除并返回栈顶元素。
//  - int top() 返回栈顶元素。
//  - boolean empty() 如果栈是空的，返回 true ；否则，返回 false 。

// 注意：
//  - 你只能使用队列的基本操作 —— 也就是 push to back、peek/pop from front、size 和 is empty 这些操作。
//  - 你所使用的语言也许不支持队列。 你可以使用 list （列表）或者 deque（双端队列）来模拟一个队列 , 只要是标准的队列操作即可。

// 输入：
// ["MyStack", "push", "push", "top", "pop", "empty"]
// [[], [1], [2], [], [], []]
// 输出：
// [null, null, null, 2, 2, false]

// 解释：
// MyStack myStack = new MyStack();
// myStack.push(1);
// myStack.push(2);
// myStack.top(); // 返回 2
// myStack.pop(); // 返回 2
// myStack.empty(); // 返回 False

/**
 * Your MyStack object will be instantiated and called as such:
 * var obj = new MyStack()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.empty()
 */

// 方法一：两个队列实现栈
// 使用两个队列，queue 用于模拟栈中元素，_queue 用于入栈操作的辅助队列。具体的：
// 入栈操作时，先将元素 x 入队到临时队列 _queue，然后将 queue 全部元素依次出队并入队到 _queue 中，此时队列 _queue 中的元素从队首到队尾，既是栈的栈顶到栈底。最后将 queue 和 _queue 互换即可。
// 由于每次入栈操作都保证了队列 queue 从队首到队尾，既是栈的栈顶到栈底。因此出栈操作和获取栈顶操作，对应的就是出队和获取队首操作。
// 判断栈是否为空及判断 queue 队是否为空。
var MyStack = function () {
    this.queue = []; // 模拟栈的队列，队首和队尾分别对应栈顶和栈底。
    this._queue = []; // 临时队列，用于备份
};

/**
 * 添加元素
 * 入栈操作时，先将元素 x 入队到临时队列 _queue，然后将 queue 全部元素依次出队并入队到 _queue 中，此时 _queue 中的元素从队首到队尾，既是栈的栈顶到栈底。最后将 queue 和 _queue 互换即可。
 * 这样保证了队列 queue 从队首到队尾元素和栈保持一致。
 * @param {number} x
 * @return {void}
 */
MyStack.prototype.push = function (x) {
    this._queue.push(x);
    while (!this.empty()) {
        this._queue.push(this.queue.shift());
    }
    this.queue = this._queue;
    this._queue = [];
};

/**
 * 移除并返回栈顶元素，及队首元素出队，并返回。
 * @return {number}
 */
MyStack.prototype.pop = function () {
    return this.queue.shift();
};

/**
 * 返回栈顶元素，即返回队首元素
 * @return {number}
 */
MyStack.prototype.top = function () {
    return this.queue[0];
};

/**
 * 判断队中元素是否为空
 * @return {boolean}
 */
MyStack.prototype.empty = function () {
    return this.queue.length === 0;
};
// 时间复杂度：入队操作O(n)，其余操作均为 O(1)，n 为栈内元素个数。入队操作需要将 queue 中的 n 个元素依次出队，并入队 n+1 个元素到 _queue 中，共有 2n+1 次操作，因此入栈道时间复杂度为 O(n)。
// 空间复杂度：O(n)，n 为栈内元素个数，需要使用两个队列存储栈内元素。

// 方法二：一个队列实现栈
// 使用一个队列，queue 用于模拟栈中元素。具体的：
// 入栈操作时，首先获取入栈前的元素个数（记作 count），然后将元素入队到队列中，再将队列中前 count 个元素（即除了新入栈的元素之外的全部元素）依次出队并重新入队到队列中。此时队首元素即为新入栈的元素，且队首和队尾分别对应栈顶和栈底。
// 由于每次入栈操作都保证了队列 queue 从队首到队尾，既是栈的栈顶到栈底。因此出栈操作和获取栈顶操作，对应的就是出队和获取队首操作。
// 判断栈是否为空及判断 queue 队是否为空。

// 除了初始化和入栈操作其余保持一致，因此只提供不同部分的代码。
var MyStack = function () {
    this.queue = []; // 模拟栈的队列，队首和队尾分别对应栈顶和栈底。
};

/**
 * 添加元素
 * 获取入栈前的元素个数 count，然后将元素 x 入队到队列中，再将队列中前 count 个元素依次出队并重新入队。
 * 这样保证了队列 queue 从队首到队尾元素和栈保持一致。
 * @param {number} x
 * @return {void}
 */
MyStack.prototype.push = function (x) {
    let count = this.queue.length;
    this.queue.push(x);
    while (count--) {
        const el = this.queue.shift();
        this.queue.push(el);
    }
};
// 时间复杂度：入队操作O(n)，其余操作均为 O(1)，n 为栈内元素个数。入队操作需要将 queue 中的 n 个元素依次出队，并入队 n+1 个元素，共有 2n+1 次操作，因此入栈道时间复杂度为 O(n)。
// 空间复杂度：O(n)，n 为栈内元素个数，需要使用一个队列存储栈内元素。
