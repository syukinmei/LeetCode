// 给你两个 非空 链表来代表两个非负整数。数字最高位位于链表开始位置。它们的每个节点只存储一位数字。将这两数相加会返回一个新的链表。
// 你可以假设除了数字 0 之外，这两个数字都不会以零开头。

// 7 -> 2 -> 4 -> 3
//      5 -> 6 -> 4
// —————————————————
// 7 -> 8 -> 0 -> 7
// 输入：l1 = [7,2,4,3], l2 = [5,6,4]
// 输出：[7,8,0,7]

// 输入：l1 = [2,4,3], l2 = [5,6,4]
// 输出：[8,0,7]

// 输入：l1 = [0], l2 = [0]
// 输出：[0]

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
// 方法一：栈
// 本题难点在于链表中数位的顺序与我们做加法的顺序相反，为了逆序处理所有数位，我们可以使用栈先进后出的特性：把所有数字压入栈中，再依次取出相加。
// 通过使用两个栈（ stack1 和 stack2 ）来存储链表节点的值，并通过遍历栈来执行相加操作。最后，将相加结果转换为链表形式并返回。
// 要注意的是，由于我们先计算低位的数值，所以在写入新的链表时，需要使用 「头插法」，来将输入进行逆序的操作。
var addTwoNumbers = function (l1, l2) {
  // 创建两个空数组 stack1、stack2 分别用于存储链表 l1、l2 的节点值。
  const stack1 = new Array();
  const stack2 = new Array();

  // 将链表 l1、l2 的节点逐个压入对应的栈中
  while (l1 !== null) {
    stack1.push(l1.val); // 当前节点值压入栈中
    l1 = l1.next; // l1 指向下一个节点
  }
  while (l2 !== null) {
    stack2.push(l2.val);
    l2 = l2.next; // l2 指向下一个节点
  }

  let carry = 0; // 维护当前进位信息，初始位0。
  const head = new ListNode(); // 创建一个头节点

  // 当 stack1 或者 stack2 非空时，执行栈顶元素相加操作，并弹栈。
  while (stack1.length || stack2.length) {
    let val1 = stack1.pop() ?? 0;
    let val2 = stack2.pop() ?? 0;
    let sum = val1 + val2 + carry; // 当前位的和，加上进位值。
    carry = sum >= 10 ? 1 : 0; // 判断当前位累加是否需要进位
    const curNode = new ListNode(sum % 10); // 创建一个新节点，存储值为当前位的值。
    // 倒插法插入
    const pre = head.next; // 获取头节点的下一个节点
    curNode.next = pre; // 将当前节点的下一个节点指向 pre(头节点的下一个节点)
    head.next = curNode; // 将当前节点倒插入头节点的下一个节点，即将头节点的下一个节点指向当前节点
  }

  // 如果还有进位，创建一个值为 1 的新节点，并将其倒插入到头节点之后
  if (carry) {
    const curNode = new ListNode(1);
    const pre = head.next;
    curNode.next = pre;
    head.next = curNode;
  }
  return head.next; // 返回头节点的下一个节点，即相加结果的链表
};
// 时间复杂度：O(max(m, n))，m 和 n 分别为 l1、l2 两个链表的长度。需要遍历两个链表，并对每个节点执行常数次操作。
// 空间复杂度：O(m+n)，为两个存储链表节点值的栈的空间消耗。
