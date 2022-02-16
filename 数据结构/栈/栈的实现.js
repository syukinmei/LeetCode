class Stack {
    constructor() {
        // 存储栈中数据
        this.data = [];

        // 记录栈中数据个数(相当于数组的 length )
        this.count = 0;
    }
    // push() 入栈方法
    push(item) {
        // 方法1：数组方法 push 添加
        // this.data.push(item);

        // 方法2：利用数组长度
        // this.data[this.data.length] = item;

        // 方法3：计数方式
        this.data[this.count] = item;
        this.count++; // 入栈后，count 自增
    }

    // pop() 出栈方法
    pop() {
        // 出栈前提是栈中存在元素
        if (this.isEmpty()) {
            console.log('栈为空！移除失败');
            return;
        }
        // 移除栈顶数据
        // 方法1：数组方法 pop移除
        // return this.data.pop();

        // 方法2：计数方式
        const temp = this.data[this.count - 1];
        delete this.data[this.count - 1];
        this.count--;
        return temp;

    }
    // isEmpty() 检测栈是否为空
    isEmpty() {
        return this.count === 0;
    }

    // top() 获取栈顶的元素
    top() {
        if (this.isEmpty()) {
            console.log('栈为空！获取失败');
            return;
        }
        return this.data[this.count - 1];
    }

    // size() 获取栈中元素个数
    size() {
        return this.count;
    }

    // clear() 清空栈
    clear() {
        this.data = [];
        this.count = 0;
    }
}
