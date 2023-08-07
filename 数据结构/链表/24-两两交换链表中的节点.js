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
// 以 1 -> 2 -> 3 为例子

// dummy -> 1 -> 2 -> 3

//    -------1------
//   |             |
// dummy    1 <-3- 2    3
//          |           |
//          ------2------
// 具体的，创建一个哨兵节点 dummy，令 dummy.next = head。令 cur 表示当前到达的节点，cur 之后的节点需要进行置换，初始时 cur = dummy。每次需要交换 cur 后面的两个节点。
// 交换之前的节点关系是 cur -> node1 -> node2，交换之后的节点关系变成 cur -> node2 -> node1。因此需要进行如下操作：
//  - cur.next = node2
//  - node1.next = node2.next
//  - node2.next = node1

// 交换完成后更新 cur的位置，cur = node1，再对链表中其余节点进行两两交换，直到全部节点都被两两交换。
// 两两交换链表中的节点后，新的链表的头节点就是 dummy.next。
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

    cur = node1; // 更新cur，然后继续交换 cur 后的两个节点。
  }
  return dummy.next; // 返回新链表的头节点
};
// 时间复杂度：O(n)，n 为链表的节点数量。需要对每个节点进行更新指针的操作。
// 空间复杂度：O(1)，只需要常数的空间存放若干变量。

// 方法二：递归
// 递归边界：当前无节点或者只有一个节点，无需进行交换。
// 递归内容：设每次需要交换的两个节点为 head 和 next，将 head 和后面完成交换的子链表链接，next 和 head 链接，已完成本轮交换，即：
//  - head.next = swapPairs(next.next)
//  - next.net = head
// 返回值：完成交换的子链表的头节点
var swapPairs = function (head) {
  // 设置递归出口
  if (head === null || head.next === null) return head;

  const next = head.next;
  head.next = swapPairs(next.next); // head 和后面完成交换的子节点连接
  next.next = head; // next 和 head 链接。

  return next; // 返回完成交换的子链表的头节点
};
// O(n)，n 为链表的节点数量。需要对每个节点进行更新指针的操作。
// O(n)，n 为链表的节点数量。递归调用栈的深度为 n。
