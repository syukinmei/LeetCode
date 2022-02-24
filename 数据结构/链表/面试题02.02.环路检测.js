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
    return head;
};
// 时间复杂度：O(n)，n 为链表的节点数目。我们需要访问链表的每一个节点。
// 空间复杂度：O(n)，n 为链表的节点数目。我们需要将链表中的每一个节点都保存到集合中。

// 方法二：快慢指针