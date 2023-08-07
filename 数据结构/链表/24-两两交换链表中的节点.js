// 给你一个链表，两两交换其中相邻的节点，并返回交换后链表的头节点。你必须在不修改节点内部的值的情况下完成本题（即，只能进行节点交换）。

// 1 -> 2 -> 3 -> 4
// ——————————————————————————
// 2 -> 1 -> 4 -> 3
// 输入：head = [1,2,3,4]
// 输出：[2,1,4,3]

// 输入：head = []
// 输出：[]

// 输入：head = [1]
// 输出：[1]

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
var swapPairs = function (head) {
  const dummy = new ListNode(-1); // 创建一个虚拟节点作为新链表的头节点的前一个节点
  dummy.next = head;
  let cur = dummy;
  while (cur.next !== null && cur.next.next !== null) {
    const node1 = cur.next;
    const node2 = cur.next.next;
    // 交换
    cur.next = node2;
    node1.next = node2.next;
    node2.next = node1;

    cur = node1; // 更新链表 dummy 的末尾指针。
  }
  return dummy.next;
};
