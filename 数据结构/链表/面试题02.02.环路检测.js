// 给定一个链表，如果它是有环链表，实现一个算法返回环路的开头节点。若环不存在，请返回 null。

// 如果链表中有某个节点，可以通过连续跟踪 next 指针再次到达，则链表中存在环。 为了表示给定链表中的环，我们使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。 如果 pos 是 -1，则在该链表中没有环。注意：pos 不作为参数进行传递，仅仅是为了标识链表的实际情况。

// 输入：head = [3,2,0,-4], pos = 1
// 输出：tail connects to node index 1
// 解释：链表中有一个环，其尾部连接到第二个节点。

// 输入：head = [1,2], pos = 0
// 输出：tail connects to node index 0
// 解释：链表中有一个环，其尾部连接到第一个节点。

// 输入：head = [1], pos = -1
// 输出：no cycle
// 解释：链表中没有环。

// 没有环路的链表是这样的：
// 3->2->0->4->null
// 这里输入head = [3,2,0,-4], pos = 1,表示输入的链表是这样的：
// 3->2->0->4
//    ^     |
//    |_____|

// PS：不存在环返回null，存在环返回环的起始节点。


/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
// 方法一：集合
// 思路：迭代遍历链表的每一个节点，并且将其记录与集合中，如果某个节点在集合中出现过，就可以判定链表中存在环。
var detectCycle = function (head) {
    const visited = new Set();
    while (head !== null) {
        // 判断集合中是否存在当前节点
        if (visited.has(head)) {
            return head;
        }
        // 不存在，则添加到集合中
        visited.add(head);
        head = head.next;
    }
    return null;
};
// 时间复杂度：O(n)，n 为链表的节点数目。我们需要访问链表的每一个节点。
// 空间复杂度：O(n)，n 为链表的节点数目。我们需要将链表中的每一个节点都保存到集合中。

// 方法二：快慢指针
// 步骤一：判断是否为有环链表
//  - 定义两个指针 fast slow。fast 每次移动 2 位，slow 每次移动 1 位。
//  - 如果相遇，则说明链表中存在环。

// 步骤二：找到入环点
//  - 如下图所示，设链表中环外部分的长度为 a。slow 指针进入环后，又走了 b 的距离与 fast 相遇。此时，fast 指针已经走完了环的 n 圈。
//  - fast 移动距离为：a+n(b+c)+b 
//  - slow 移动距离为：a+b
//  - 又因： 速度比为 2:1 即在任意时刻 fast 指针走过的距离都为 slow 的 2倍
//  - 得：a+n(b+c)+b = 2(a+b) 
//  - 交互处理的：a = (n-1)(b+c)+c
//  - 根据这层等量关系，我们可得：从相遇点到入环点的距离(图中c的长度)，恰好等于 从链表头部到入环点的距离。
//  - 此时 再定一个一个新指针 ptr
//  - 因此，当 slow 和 fast 相遇时，我们再额外定义一个 ptr 指针。起始阶段指向链表头部，然后 prt 和 slow 每次向后移动一个位置。最终会在入环点相遇。
var detectCycle = function (head) {
    // 特殊情况处理 
    if (head === null || head.next === null) {
        return null;
    }
    // 使用快慢指针判断是否存在环
    let fast = head, slow = head;
    while (fast !== null) {
        slow = slow.next;
        // fast 为尾部节点，则不存在环 返回null，否则移动两位
        if (fast.next === null) {
            return null;
        }
        fast = fast.next.next;
        // 判断是否快慢指针是否相遇，相遇则存在环
        if (slow === fast) {
            // 找到入环点
            let prt = head;
            while (prt !== slow) {
                prt = prt.next;
                slow = slow.next;
            }
            // slow 和 prt 的交点即是入环点
            return prt;
        }
    }
    // while循环结束，说明 fast 为 null，即不存在环，返回null
    return null;
};
// 时间复杂度：O(n)，n 为 链表的节点数目。
//  - 第一步判断是否存在节点，slow 指针走过的距离不会超过链表的总长度；
//  - 第二步寻找入环点，走过的距离也不会超过链表的总长度。
// 空间复杂度：O(1)，只需要常数的空间存放若干变量，即 slow fast prt 三个指针。
