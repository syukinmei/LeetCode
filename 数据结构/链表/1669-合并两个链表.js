// 给你两个链表 list1 和 list2 ，它们包含的元素分别为 n 个和 m 个。
// 请你将 list1 中下标从 a 到 b 的全部节点都删除，并将list2 接在被删除节点的位置。
// 请你返回结果链表的头指针。


// 输入：list1 = [0,1,2,3,4,5], a = 3, b = 4, list2 = [1000000,1000001,1000002]
// 输出：[0,1,2,1000000,1000001,1000002,5]
// 解释：我们删除 list1 中下标为 3 和 4 的两个节点，并将 list2 接在该位置。上图中蓝色的边和节点为答案链表。

// 输入：list1 = [0,1,2,3,4,5,6], a = 2, b = 5, list2 = [1000000,1000001,1000002,1000003,1000004]
// 输出：[0,1,1000000,1000001,1000002,1000003,1000004,6]
// 解释：上图中蓝色的边和节点为答案链表。


/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {number} a
 * @param {number} b
 * @param {ListNode} list2
 * @return {ListNode}
 */
// 方法一：模拟
// 题目要求将 list1 的第 a 到 b 个节点都删除，将其替换为 list2。
// 因此，我们需要找到 list1 中的第 a-1 个节点，以及第 b+1 个节点。
// 由于，1 <= a <= b <= n-1（n 为 list1 的长度），所以 head 和 tail 一定存在。
// 然后我们让 head 的 next 指向 list2 的头节点，再让 list2 的尾节点的 next 指向 tail 即可。
var mergeInBetween = function (list1, a, b, list2) {
    // step1：寻找下标为 a-1 的节点
    let head = list1;
    for (let i = 0; i < a - 1; i++) {
        head = head.next;
    }

    // step2：寻找下标为 b+1 的节点
    let tail = list1;
    for (let i = 0; i < b + 1; i++) {
        tail = tail.next;
    }
    // step3：将 list2 插入 head 和 tail 中
    // 让 head 的 next 指向 list2 点头节点
    head.next = list2;

    // 将 tail 的 next 指向 list2 的尾节点
    while (list2.next !== null) {
        list2 = list2.next;
    }
    list2.next = tail;
    return list1
};
// 时间复杂度：O(n+m)，其中 n 为 list1 的长度，m 为 list2 的长度。
// 空间复杂度：O(1)，只需要常数的空间存放若干变量。
