// 给你一个链表的头 head ，每个结点包含一个整数值。
// 在相邻结点之间，请你插入一个新的结点，结点值为这两个相邻结点值的 最大公约数 。
// 请你返回插入之后的链表。
// 两个数的 最大公约数 是可以被两个数字整除的最大正整数。

// 18 -> 6 -> 10 -> 3
// —————————————————
// 18 -> 【6】 -> 6 -> 【2】 -> 10 -> 【1】 -> 3
// 输入：head = [18,6,10,3]
// 输出：[18,6,6,2,10,1,3]
// 解释：第一幅图是一开始的链表，第二幅图是插入新结点后的图（蓝色结点为新插入结点）。
// - 18 和 6 的最大公约数为 6 ，插入第一和第二个结点之间。
// - 6 和 10 的最大公约数为 2 ，插入第二和第三个结点之间。
// - 10 和 3 的最大公约数为 1 ，插入第三和第四个结点之间。
// 所有相邻结点之间都插入完毕，返回链表。

// 输入：head = [7]
// 输出：[7]
// 解释：第一幅图是一开始的链表，第二幅图是插入新结点后的图（蓝色结点为新插入结点）。
// 没有相邻结点，所以返回初始链表。

// 方法一：模拟
// 遍历链表，在当前链表 cur 后面插入值为 gcd ，下个节点指向 cur.next 的新节点。
// 插入后，cur 更新为 cur.next.next ，也就是 cur 原来的下一个节点，开始下一轮循环，直到 cur 没有下一个节点。
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
var insertGreatestCommonDivisors = function (head) {
    let cur = head;
    while (cur.next !== null) {
        const insertVal = gcd(cur.val, cur.next.val);
        cur.next = new ListNode(insertVal, cur.next);
        cur = cur.next.next;
    }
    return head;
};
// 时间复杂度：O(nlogU)，n 为链表的长度，U 为节点值的最大值。每次计算 最大公约数 gcd 需要 O(logU) 的时间。
// 空间复杂度：O(1)，只需要常数的空间存放若干变量。

// 方法二：递归
// 递归边界：当前节点的下一个节点为空，说明到达链表的尾部，不再需要插入。
// 递归内容：计算当前节点和下一个节点值的最大公约数，并将其插入到他们之前。然后继续递归处理 下一个相邻节点。
var insertGreatestCommonDivisors = function (head) {
    // 设置递归出口，
    if (head.next === null) return head;

    // 递归插入操作
    // 计算当前节点与下一个节点值的最大公约数
    const insertVal = gcd(head.val, head.next.val);
    // 将当前节点的下一个节点指向一个新节点，新节点的值为最大公约数，下一个节点为当前节点的下一个节点。
    head.next = new ListNode(insertVal, head.next);
    // 递归处理下一个相邻节点
    insertGreatestCommonDivisors(head.next.next);

    // 返回完成插入操作的链表的头节点
    return head;
};
// O(nlogU)，n 为链表的长度，U 为节点的最大值。每次计算 最大公约数 gcd 需要 O(logU) 的时间。
// O(n)，n 为链表的长度。递归调用栈的深度为 n。

// 辅助函数
/**
 * 欧几里德算法(辗转相除法)求两数最大公约数
 * 
 * 两个数的最大公约数等于其中较小的数和两数相除余数的最大公约数
 * 
 * 如果两个数中有一个是 0，那么另一个数就是它们的最大公约数。
   否则，用较小的数除以较大的数，得到余数。
   然后，将较大的数替换为较小的数，将余数替换为较大的数。
   重复上述步骤，直到余数为 0。此时，非零的那个数就是最大公约数。
 * @param {number} a 
 * @param {number} b 
 * @returns {number}
 */
// const gcd = (a, b) => {
//     if (b === 0) return a;
//     return gcd(b, a % b);
// };

const gcd = (a, b) => {
    while (a !== 0) {
        [a, b] = [b % a, a];
    }
    return b;
};
