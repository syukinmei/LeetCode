// 给你单链表的头节点 head ，请你反转链表，并返回反转后的链表。

// 输入：head = [1,2,3,4,5]
// 输出：[5,4,3,2,1]
// 输入：1 -> 2 -> 3 -> 4 -> 5 -> NULL
// 输出：5 -> 4 -> 3 -> 2 -> 1 -> NULL

// 输入：head = [1,2]
// 输出：[2,1]

// 输入：head = []
// 输出：[]

// 思路：迭代链表，将当前项的 next = next的前一项

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
// 方法一：迭代反转链表
var reverseList = function (head) {
    // 声明变量记录 prev、curr
    let prev = null;
    let curr = head;
    // 当 curr 是节点时，进行迭代
    while (curr !== null) {
        // 先保存当前节点的下一个节点
        const next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }
    return prev;
};
// 时间复杂度：O(n)，n 为链表的节点数目。需要遍历一次链表。
// 空间复杂度：O(1)，只需要常数的空间存放若干变量。


// 方法二：递归反转链表
// 思路：用递归函数不断传入 head.next ，直到 head === null 或者 head.next === null ，到了递归的最后一层的时候，让后面一个节点指向前一个节点，然后让前一个节点的 next 置为空，直到到达第一层，就是链表的第一个节点，每一层都返回最后一个节点。
var reverseList = function (head) {
    if (head === null || head.next === null) {
        return head;
    }
    const newHead = reverseList(head.next);
    // 此时的 head 为4 最后一个节点指向前一个节点。
    head.next.next = head;
    head.next = null; // 前一个节点的 next 置为空。
    return newHead;
};
// 时间复杂度：O(n)，n 为链表的节点数目。需要对链表的每一个节点进行反转操作。
// 空间复杂度：O(n)，n 为链表的节点数目。递归的深度为 n。
