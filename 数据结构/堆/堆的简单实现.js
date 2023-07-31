/**
 * 一个简单的堆
 */
class Heap {
  constructor(compare) {
    // 构造函数只需要做两件事
    // 1、初始化用于存储堆数据的数组
    this.heap = [];
    // 2、接受传入的优先级比较函数，没有则使用默认（最小堆）实现
    this.compare =
      typeof compare === "function" ? compare : this._defaultCompare;
  }

  // 堆中插入新元素
  // 将新元素插入到堆的末尾，不断的将该元素与它的父节点比较优先级，如果新元素优先更高，理应更靠近堆顶，那么交换新元素和它父节点的位置。上浮一层之后继续执行，直到不满足比父节点优先级更高这一条件或者抵达堆顶
  push(item) {
    // 1、新的元素添加到整个堆的末尾
    this.heap.push(item);
    // 2、为了维系堆序性尝试让它进行“上浮”，回到它该呆的位置
    this.swim(this.heap.length - 1);
  }

  // 返回堆顶元素，出队
  pop() {
    if (this.size === 0) return null;
    // 1、保存当前堆顶元素，用于最后返回，用数组尾部元素替换堆顶元素（因为直接删除堆顶元素会破坏堆结构）
    this._swap(0, this.heap.length - 1);
    let res = this.heap.pop();
    // 2、为了维系堆序性尝试让它进行“下沉”，回到它该呆的位置
    this.sink(0);
    return res;
  }

  // 返回堆顶元素，但不出队
  peek() {
    return this.heap[0];
  }

  // 查看堆中元素数量
  get size() {
    return this.heap.length;
  }

  /* 维系堆序性的方法 */
  // 上滤
  swim(idx) {
    // idx 比他的父节点更靠近堆顶，应该继续上浮（k == 0，表示已经到达堆顶）
    while (
      idx > 0 &&
      this.compare(this.heap[idx], this.heap[this._parent(idx)])
    ) {
      this._swap(idx, this._parent(idx));
      idx = this._parent(idx);
    }
  }

  // 下滤
  //
  sink(idx) {
    let { heap, _c_left, _c_right, size, compare } = this;
    // 沉到堆底，就不下沉了。
    while (_c_left(idx) < size) {
      // 1、优先级更高的子节点下标
      let priorityIdx = _c_left(idx);
      if (
        _c_right(idx) < size &&
        compare(heap[_c_right(idx)], heap[_c_left(idx)])
      ) {
        priorityIdx = _c_right(idx);
      }

      // 如果当前节点比子节点优先级更高，则不用下沉了
      if (compare(heap[idx], heap[priorityIdx])) return;
      // 继续下沉
      this._swap(idx, priorityIdx);
      idx = priorityIdx;
    }
  }

  /* ...若干辅助函数 */
  // 获取父节点下标
  _parent(idx) {
    return Math.floor((idx - 1) / 2);
  }
  // 获取左子节点下标
  _c_left(idx) {
    return idx * 2 + 1;
  }

  // 获取右子节点下标
  _c_right(idx) {
    return idx * 2 + 2;
  }

  // 交互下标 i 和 j 的位置
  _swap(i, j) {
    const temp = this.heap[i];
    this.heap[i] = this.heap[j];
    this.heap[j] = temp;
  }

  // a是否比b更接近堆顶，默认为小顶堆
  _defaultCompare(a, b) {
    return a < b;
  }
}
