// 定义栈的数据结构，请在该类型中实现一个能够得到栈的最小元素的 min 函数在该栈中，调用 min、push 及 pop 的时间复杂度都是 O(1)。

// MinStack minStack = new MinStack();
// minStack.push(-2);
// minStack.push(0);
// minStack.push(-3);
// minStack.min();   --> 返回 -3.
// minStack.pop();
// minStack.top();      --> 返回 0.
// minStack.min();   --> 返回 -2.

// 在存储数据的栈外，再创建一个辅助栈，用于存储栈的最小值
// stack    = [-2, 0, -3]
// minStack = [-2, -2, -3]

class MinStack {
    constructor() {
        // stackA 用于存储数据
        this.stackA = [];
        this.countA = 0;

        // stackB 为辅助栈 用于存储栈道最小值(数据降序排序)
        this.stackB = [];
        this.countB = 0;
    }

    push(item) {
        // stackA 正常入栈
        this.stackA[this.countA] = item;
        this.countA++;

        // stackB 如果没有数据，直接入栈
        // 如果当前元素小于等于 stackB栈顶元素，入栈
        if (this.countB === 0 || item <= this.min()) {
            this.stackB[this.countB] = item;
        } else {
            // 否则 入栈元素为 当前栈中最小值
            this.stackB[this.countB] = this.min();
        }
        this.countB++;
    }

    // 最小值函数 返回栈中最小值 即时辅助栈栈顶元素
    min() {
        return this.stackB[this.countB - 1];
    }

    // 获取栈顶元素
    top() {
        return this.stackA[this.countA - 1];
    }

    // 出栈
    pop() {
        delete this.stackA[this.countA - 1];
        this.countA--;

        delete this.stackB[this.countB - 1];
        this.countB--;
    }
}
// 时间复杂度：O(1)，push(), pop(), top(), min() 四个函数的时间复杂度均为常数级别。
// 空间复杂度：O(N)，当共有 N 个待入栈元素时，辅助栈B 需要存储 N 个元素，使用O(N)额外空间。

// 方法二：
// stack    = [-2, 0, -3, 2 , -6]
// minStack = [-2, -3, -6]
// push()：stack 正常入栈，minStack遇到小于等于 min() 元素时入栈
// pop()：先 检测辅助栈 top() === min() stack ，minStack出栈
//        再 stackA 正常出栈。


// 方法三：API大法
class MinStack {
    constructor() {
        this.stack = [];
    }
    push(item) {
        this.stack.push(item);
    }
    top() {
        return this.stack[this.stack.length - 1];
    }
    min() {
        // return Math.min(...this.stack);
        return Math.min.apply(null, this.stack);
    }
    pop() {
        this.stack.pop();
    }
}
