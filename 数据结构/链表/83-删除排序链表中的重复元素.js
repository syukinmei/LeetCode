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

// 方法二：递归
// 递归边界：
// 当前节点为空或者下一个节点为空，说明已经到达链表的末尾，不需要再进行递归，直接返回当前节点即可。即：
//  - if (head === null || head.next === null) return head;

// 递归内容：
// 在递归函数中，我们需要处理当前节点和下一个节点的值。
// 如果它们值相同，说明存在重复元素，需要删除下一个节点。然后继续递归处理当前节点，因为当前节点仍然有可能与后面的节点重复。
// 如果它们的值不相等，说明当前节点是唯一的，继续递归处理下一个节点。

// 返回值：
// 删除重复节点后的链表

var deleteDuplicates = function (head) {
    // 递归边界：如果当前节点或者下一个节点为空，直接返回
    if (head === null || head.next === null) return head;

    if (head.val === head.next.val) {
        // 如果当前节点和下一个节点的值相等，删除下一个节点，然后继续递归处理当前节点。
        head.next = head.next.next;
        // 递归处理当前节点，因为当前节点仍然有可能与后面的节点重复
        deleteDuplicates(head);
    } else {
        // 如果值不相等，递归处理下一个节点
        deleteDuplicates(head.next);
    }

    // 返回删除重复节点后的链表
    return head;
};
// 时间复杂度：O(n)，n 为链表的长度，递归过程中，每个节点只被访问一次。
// 空间复杂度：O(n)，n 为链表的长度。为递归过程中栈道开销，递归的调用栈深度取决于链表的长度。
