class Deque {
    constructor() {
        // 对象配合双指针完成双端队列
        this.queue = {};
        this.count = 0; // 指向队尾
        this.head = 0; // 指向队首
    }
    addFront(item) {
        this.head--;
        this.queue[this.head] = item;
    }
    addBack(item) {
        this.queue[this.count] = item;
        this.count++;
    }

    removeFront() {
        if (this.isEmpty()) {
            console.log('队列为空！移除失败');
            return;
        }

        const headData = this.queue[this.head];
        delete this.queue[this.head];
        this.head++;
        return headData;
    }
    removeBack() {
        if (this.isEmpty()) {
            console.log('队列为空！移除失败');
            return;
        }

        const backData = this.queue[this.count - 1];
        delete this.queue[this.count - 1];
        this.count--;
        return backData;
    }

    frontTop() {
        if (this.isEmpty()) {
            console.log('队列为空！获取失败');
            return;
        }
        return this.queue[this.head];
    }
    backTop() {
        if (this.isEmpty()) {
            console.log('队列为空！获取失败');
            return;
        }
        return this.queue[this.count - 1];
    }

    isEmpty() {
        return this.size() === 0;
    }

    size() {
        return this.count - this.head;
    }
}

const deque = new Deque();
