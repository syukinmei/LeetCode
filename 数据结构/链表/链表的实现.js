// 节点类
class LinkedNode {
    constructor(value) {
        // 存储当前节点数据
        this.value = value;
        // 用于存储下一个节点的引用
        this.next = null;
    }
}

// 链表类
class LinkedList {
    constructor() {
        this.count = 0;
        this.head = null;
    }
    // 添加节点(尾)
    addAttail(value) {
        // 创建新节点
        const node = new LinkedNode(value);
        // 检测链表是否存在数据
        if (this.count === 0) {
            this.head = node;
        } else {
            // 找到链表尾部节点，将尾部节点的 next 设置为 node
            // Q：如何找到尾部节点呢？
            // A：链表不同数组可以通过 length-1 找到尾部节点，所以我们需要使用 head 一直访问 next 直到没有next为止。
            let cur = this.head;
            while (cur.next !== null) {
                cur = cur.next;
            }
            cur.next = node;
        }
        this.count++;
    }

    // 添加节点(头)
    addAtHead(value) {
        const node = new LinkedNode(value);
        if (this.count === 0) {
            this.head = node;
        } else {
            // 将 node 添加到 head 的前面
            node.next = this.head;
            this.head = node;
        }
        this.count++;
    }

    // 获取节点(根据索引，类似数组，索引0指向head)
    get(index) {
        // 合法检测
        if (this.count === 0 || index < 0 || index >= this.count) {
            console.log('不合法，获取节点失败');
            return;
        }
        // 迭代链表，找到对应节点
        let current = this.head;
        for (let i = 0; i < index; i++) {
            current = current.next;
        }
        return current;
    }

    // 添加节点(根据索引)
    addAtIndex(value, index) {
        // 合法检测
        if (this.count === 0 || index >= this.count) {
            console.log('不合法，添加节点失败');
            return;
        }
        // 如果 index <= 0，默认添加到头部即可。
        if (index <= 0) {
            return this.addAtHead(value);
        }
        // 后面为正常区间处理，将 node 添加到 get(index) 前面
        const prev = this.get(index - 1);
        const node = new LinkedNode(value);
        node.next = prev.next;
        prev.next = node;

        this.count++;
    }

    // 删除节点(根据索引)
    removeAtIndex(index) {
        // 合法检测
        if (this.count === 0 || index < 0 || index >= this.count) {
            console.log('不合法，删除节点失败');
            return;
        }
        if (index === 0) {
            this.head = this.head.next;
        } else {
            const prev = this.get(index - 1);
            prev.next = prev.next.next;
        }
        this.count--;
    }
}

const l = new LinkedList();
