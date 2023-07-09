// 给你两个 非空 的链表，表示两个非负的整数。它们每位数字都是按照 逆序 的方式存储的，并且每个节点只能存储 一位 数字。
// 请你将两个数相加，并以相同形式返回一个表示和的链表。
// 你可以假设除了数字 0 之外，这两个数都不会以 0 开头。

// 2 -> 4 -> 3
// 5 -> 6 -> 4
// ———————————
// 7 -> 0 -> 8
// 输入：l1 = [2,4,3], l2 = [5,6,4]
// 输出：[7,0,8]
// 解释：342 + 465 = 807.

// 输入：l1 = [0], l2 = [0]
// 输出：[0]

// 输入：l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
// 输出：[8,9,9,9,0,0,0,1]

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
  let result = new ListNode();
  let temp = result,
    add = 0; //保存进位信息，使用temp复制result地址修改result
  let getval = (ListNode) => ListNode.val;
  while (l1 || l2) {
    let val1 = l1 ? getval(l1) : 0;
    let val2 = l2 ? getval(l2) : 0; //如果l1或者l2遍历到底则赋值为0，加另一个链表的当前值
    let sum = val1 + val2 + add;
    add = sum >= 10 ? 1 : 0;
    temp.next = new ListNode(sum >= 10 ? sum - 10 : sum);
    temp = temp.next;
    l1 = l1 && l1.next;
    l2 = l2 && l2.next;
  }
  if (add) {
    temp.next = new ListNode(1);
  }
  return result.next; //因为首指针为0，所以返回首指针的next
};
