// 将两个升序链表合并为一个新的 升序 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。

// 1 -> 2 -> 4
// 1 -> 3 -> 4
// ——————————————————————————
// 1 -> 1 -> 2 -> 3 -> 4 -> 4
// 输入：l1 = [1,2,4], l2 = [1,3,4]
// 输出：[1,1,2,3,4,4]

// 输入：l1 = [], l2 = []
// 输出：[]

// 输入：l1 = [], l2 = [0]
// 输出：[0]

// 提示：
// 两个链表的节点数目范围是 [0, 50]
// -100 <= Node.val <= 100
// l1 和 l2 均按 非递减顺序 排列

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
// 方法一：迭代
// 创建一个哨兵节点 dummy，作为合并后的新链表的头节点的前一个节点，使用 cur 指向链表 dummy 的尾部，返回 dummy.next 就是我们的答案。(这样可以避免单独处理头节点，也无需特判链表为空的情况，从而简化代码。)
// 比较 list1、list2 的节点值，如果 list1 的节点较小，则将 list1 加到 dummy 的尾部，然后将 list1 替换成它的下一个节点。如果 list2 的节点较小也是同理。如果两个节点值一样，则随意处理。
// 重复上述过程，直到其中一个节点为空。
// 循环结束后，其中一个链表可能还有剩余的节点，将其剩余部分加到 dummy 的尾部。
// 返回合并后的新链表头节点，即 dummy.next。
var mergeTwoLists = function (list1, list2) {
  const dummy = new ListNode(-1); // 创建一个虚拟节点作为新链表的头节点的前一个节点
  let cur = dummy; // cur 指向新链表的末尾
  while (list1 !== null && list2 !== null) {
    // 比较两个链表的节点值，将较小的节点接在当前节点后面
    if (list1.val < list2.val) {
      cur.next = list1;
      list1 = list1.next;
    } else {
      cur.next = list2;
      list2 = list2.next;
    }
    cur = cur.next; // 更新链表 dummy 的末尾指针。
  }
  // 处理剩余的节点，将其接在新链表的末尾
  cur.next = list1 === null ? list2 : list1;

  return dummy.next;
};
// 时间复杂度：O(m+n)，m 和 n 分别为链表 list1、list2 的长度。需要遍历两个链表的每一个节点。
// 空间复杂度：O(1)，只需要常数的空间存放若干变量。

// 方法二：递归
// 递归边界：如果其中一个链表为空，直接返回另一个链表作为合并后的结果。
// 递归内容：如果两个链表都不为空，则比较两个链表当前节点的值，并选择较小的节点的 next 与剩下节点 merge。
//  - 例如 list1 的节点值更小，那么将 list1 的下一个节点和 list2 合并，即调用 mergeTwoLists(lsit1.next, list2) ，将递归返回的链表接在 list1 的末尾。
var mergeTwoLists = function (list1, list2) {
  // 设置递归出口
  if (list1 === null) return list2;
  if (list2 === null) return list1;

  // 递归调用，较小节点的 next 指向「其余结点的合并结点」，并返回合并后的链表。
  if (list1.val < list2.val) {
    list1.next = mergeTwoLists(list1.next, list2);
    return list1;
  } else {
    list2.next = mergeTwoLists(list1, list2.next);
    return list2;
  }
};
// 时间复杂度：O(m+n)，m 和 n 分别为链表 list1、list2 的长度。需要访问两个链表的每一个节点。
// 空间复杂度：O(m+n)，m 和 n 分别为链表 list1、list2 的长度。递归调用栈的深度为n + m。
