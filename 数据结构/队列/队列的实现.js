class Queue {
    constructor() {
        // 用于存储队列中的数据 和 个数
        this.queue = [];
        this.count = 0;
    }
    // 入队方法
    enQueue(item) {
        this.queue[this.count] = item;
        this.count++;
    }

    // 出队的方法
    deQueue() {
        if (this.isEmpty()) {
            console.log('队列为空！移除失败');
            return;
        }
        // 不能使用delete，因为会变成empty无法删除
        // 利用 shift() 移除数组第一个元素
        this.count--;
        return this.queue.shift();
    }

    // isEmpty() 检测队列是否为空
    isEmpty() {
        return this.count === 0;
    }

    // 获取队首元素值
    top() {
        if (this.isEmpty()) {
            console.log('队列为空！获取失败');
            return;
        }
        return this.queue[0];
    }

    // 获取队列中元素个数
    size() {
        return this.count;
    }

    // 清空队列
    clear() {
        // this.queue.length = 0
        this.queue = [];
        this.count = 0;
    }
}

const queue = new Queue();
