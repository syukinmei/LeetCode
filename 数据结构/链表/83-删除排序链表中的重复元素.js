// 给定一个已排序的链表的头 head ， 删除所有重复的元素，使每个元素只出现一次 。返回 已排序的链表 。

// 1 -> 1 -> 2
// ————————————
// 1 -> 2
// 输入：head = [1,1,2]
// 输出：[1,2]

// 1 -> 1 -> 2 -> 3 -> 3
// —————————————————
// 1 -> 2 -> 3
// 输入：head = [1,1,2,3,3]
// 输出：[1,2,3]

// 提示：
// 题目数据保证链表已经按升序 排列

// 方法一：遍历
// 由于给定的链表是排好序的，因此重复的元素在链表中出现的位置是连续的，因此我们只需要对链表进行一次遍历，就可以删除重复的元素。
// 具体的：
// 我们让指针 cur 指向链表头节点，随后开始对链表进行遍历。
// 如果当前的 cur 与 cur.next 对应的元素相同，那么就将 cur.next 从链表中删除，即将 cur.next 指向 cur.next.next；
// 如果不相同，则说明链表中不存在与 cur 对应的元素相同的节点了。因此可以将 cur 指向 cur.next；
// 遍历结束后，返回链表的头节点即可。

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicates = function (head) {
    // 初始化当前节点为链表头
    let cur = head;
    // 遍历链表
    while (cur !== null && cur.next !== null) {
        if (cur.val === cur.next.val) {
            // 如果当前节点的值和下一个节点的值相同，将当前节点的下一个节点指向下一个节点的下一个节点，相当于删除了重复的节点
            cur.next = cur.next.next;
        } else {
            // 如果当前节点和下一个节点的值不同，将当前节点移动到下一个节点
            cur = cur.next;
        }
    }
    // 返回处理后的链表头节点
    return head;
};
// 时间复杂度：O(n)，n 为链表的长度，需要对链表进行一次遍历。
// 空间复杂度：O(1)，只需要常数的空间存放若干变量。
