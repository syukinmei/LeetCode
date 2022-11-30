// 设计一个类似堆栈的数据结构，将元素推入堆栈，并从堆栈中弹出出现频率最高的元素。

// 实现 FreqStack 类:
//  - FreqStack() 构造一个空的堆栈。
//  - void push(int val) 将一个整数 val 压入栈顶。
//  - int pop() 删除并返回堆栈中出现频率最高的元素。
//    - 如果出现频率最高的元素不只一个，则移除并返回最接近栈顶的元素。

// 输入：
// ["FreqStack","push","push","push","push","push","push","pop","pop","pop","pop"],
// [[],[5],[7],[5],[7],[4],[5],[],[],[],[]]
// 输出：[null,null,null,null,null,null,null,5,7,5,4]
// 解释：
// FreqStack = new FreqStack();
// freqStack.push (5);//堆栈为 [5]
// freqStack.push (7);//堆栈是 [5,7]
// freqStack.push (5);//堆栈是 [5,7,5]
// freqStack.push (7);//堆栈是 [5,7,5,7]
// freqStack.push (4);//堆栈是 [5,7,5,7,4]
// freqStack.push (5);//堆栈是 [5,7,5,7,4,5]
// freqStack.pop ();//返回 5 ，因为 5 出现频率最高。堆栈变成 [5,7,5,7,4]。
// freqStack.pop ();//返回 7 ，因为 5 和 7 出现频率最高，但7最接近顶部。堆栈变成 [5,7,5,4]。
// freqStack.pop ();//返回 5 ，因为 5 出现频率最高。堆栈变成 [5,7,4]。
// freqStack.pop ();//返回 4 ，因为 4, 5 和 7 出现频率最高，但 4 是最接近顶部的。堆栈变成 [5,7]。


// 哈希表和栈。
// 核心思路：把频率（出现次数）不同的元素，压入不同的栈中，每次出栈时，弹出含有频率最高元素的栈的栈顶。为了知道每个元素的频率，还需要使用一个哈希表来实时维护。
// 更加详细的说就是：
// 我们使用一个哈希表 freq 来记录每个元素的出现次数。假设当前最大频率为 maxFreq，为 1～maxFreq 中的每种频率单独设一个栈。
// freq[x] 表示 x出现的次数，group[i] 表示 频率为i的栈（元素集合）。
//  - 当元素 x 入栈时， 令 freq[x]+1 ，然后将 x 放入 group[freq[x]] 中。更新 maxFreq = max(maxFreq, freq[x])。
//  - 当元素出栈时，获取 x = group[maxFreq].top() 作为出栈元素，令 freq[x]-1 。若 x 出栈后 group[maxFreq] 为空，说明最大频次的元素更新了，则令 maxFreq-1 。


var FreqStack = function () {
    this.freq = new Map(); // 词频表，记录每个元素出现的次数。key:数字x value:数字x的出现次数。
    this.group = new Map(); // 哈希桶，key:出现x次数 value:出现x次的数字集合。
    this.maxFreq = 0;
};

/** 
 * @param {number} val
 * @return {void}
 */
FreqStack.prototype.push = function (val) {
    this.freq.set(val, (this.freq.get(val) || 0) + 1); // 更新val的词频
    if (!this.group.has(this.freq.get(val))) {
        this.group.set(this.freq.get(val), []); // 不存在时初始化为空数组。
    }

    this.group.get(this.freq.get(val)).push(val); // 入对应词频的栈。

    this.maxFreq = Math.max(this.maxFreq, this.freq.get(val)); // 更新最大词频。
};

/**
 * @return {number}
 */
FreqStack.prototype.pop = function () {
    const maxFreqGroup = this.group.get(this.maxFreq); // 词频最大的数字集合。
    const popVal = maxFreqGroup.pop(); // 需要出栈元素，出现次数最多，最接近栈顶元素。

    this.freq.set(popVal, this.freq.get(popVal) - 1); // 出栈后，其词频-1

    if (maxFreqGroup.length === 0) this.maxFreq--; // 更新最大词频

    return popVal;
};

/**
 * Your FreqStack object will be instantiated and called as such:
 * var obj = new FreqStack()
 * obj.push(val)
 * var param_2 = obj.pop()
 */
// 时间复杂度：对于 push 和 pop 的操作，时间复杂度均为(1)。
// 空间复杂度：O(n)，n 为 FreqStack 中元素的个数。所有入栈元素最多会被存储两次，一次在计数词频表中，一次在分桶哈希表中，所以空间复杂度为O(n)。
