// 给定一个已排序的链表的头 head ， 删除原始链表中所有重复数字的节点，只留下不同的数字 。返回 已排序的链表 。

// 1 -> 2 -> 3 -> 3 -> 4 -> 4 -> 5
// ——————————————————————————
// 1 -> 2 -> 5
// 输入：head = [1,2,3,3,4,4,5]
// 输出：[1,2,5]

// 1 -> 1 -> 1 -> 2 -> 3
// ——————————————————————————
// 2 -> 3
// 输入：head = [1,1,1,2,3]
// 输出：[2,3]

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
// 方法一：迭代
// 由于给定的链表是排好序的，因此重复的元素在链表中出现的位置是连续的，因此我们只需要对链表进行一次遍历，就可以删除重复的元素。
// 由于链表的头节点可能会被删除，因此需要额外使用一个哑节点（dummy node），dummy 的 next 指向链表的头节点。表示删除所有重复元素后的新链表的头节点的前一个节点，那么答案既是 dummy.next 。
// 具体的：
// 我们让指针 cur 指向 dummy 节点，随后开始对链表进行遍历。
// 如果 cur 的下两个节点值相同，则说明出现重复节点，重复值为 tempVal，需要将 cur.next 以及所有后面拥有相同元素值 tempVal 的链表节点进行删除操作。
//    - 直到 cur.next === null || cur.next.val !== tempVal 为止。此时，我们就将链表中所有元素值为 tempVal 的节点全部删除了。
// 如果 cur 的下两个节点值不同，则说明当前节点的下一个节点 cur.next 是唯一的，需要保留。将 cur 指向下一个节点 cur = cur.next 继续循环。
// 遍历结束返回 dummy.next 。即删除所有重复元素后的新链表的头节点。
var deleteDuplicates = function (head) {
    // 如果链表为空或只有一个节点，直接返回
    if (head === null || head.next === null) return head;

    const dummy = new ListNode(0, head); // 创建一个虚拟节点作为删除所有重复元素后的新链表的头节点的前一个节点

    let cur = dummy;
    // 遍历链表，查找重复元素并删除
    while (cur.next && cur.next.next) {
        // 如果当前节点的下两个节点值相同，表示有重复元素
        if (cur.next.val === cur.next.next.val) {
            const tempVal = cur.next.val;
            // 移动到下一个不同值的节点
            while (cur.next && cur.next.val === tempVal) {
                cur.next = cur.next.next;
            }
        } else {
            // 如果当前节点的下两个节点不同，说明当前节点的下一个节点是唯一的，保留
            cur = cur.next;
        }
    }
    // 返回删除重复元素后的新链表的头节点的下一个节点
    return dummy.next;
};
// 时间复杂度：O(n)，n 为链表的长度，需要对链表进行一次遍历。
// 空间复杂度：O(1)，只需要常数的空间存放若干变量。
