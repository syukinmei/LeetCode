// 给定一个循环数组 nums （ nums[nums.length - 1] 的下一个元素是 nums[0] ），返回 nums 中每个元素的 下一个更大元素 。

// 数字 x 的 下一个更大的元素 是按数组遍历顺序，这个数字之后的第一个比它更大的数，这意味着你应该循环地搜索它的下一个更大的数。如果不存在，则输出 -1 。

// 输入: nums = [1,2,1]
// 输出: [2,-1,2]
// 解释: 第一个 1 的下一个更大的数是 2；
// 数字 2 找不到下一个更大的数；
// 第二个 1 的下一个最大的数需要循环搜索，结果也是 2。

// 输入: nums = [1,2,3,4,3]
// 输出: [2,3,4,-1,4]

// 方法一：单调栈
// 1. 循环数组的处理：
//   由于输入数组是以「循环」形式给出的，因此我们需要对数组进行「循环扩展」来得到一个环形数组。
//    - 将数组 nums 扩展成长度为 2 * n 的数组，把数组复制一份到数组的末尾，虽然这样不是严格的循环数组，但是对于本题已经足够，因为本题对数组最多遍历两次。
//    - 取模运算，使用取模操作来模拟循环数组，把索引 i 映射到索引 i%n 的位置。

// 2. 求下一个更大元素：
//   「下一个更大」之类的题目，可以考虑用单调栈来解决。
//   单调栈中保存的是数组中元素的索引，而不是元素本身。从栈底到栈顶到索引在数组 nums 中对应的值是单调递减的。

//   每次我们移动到数组中的一个新的位置 i，我们将栈中所有小于 nums[i] 的值弹出栈，因为这些值的下一个更大元素即为 nums[i]（证明也很简单：如果有更靠前的更大元素，那么这些位置将被提前弹出栈中）。随后我们将位置 i 入栈。
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var nextGreaterElements = function (nums) {
    const n = nums.length;
    const res = new Array(n).fill(-1); // 初始化结果数组
    const stack = []; // 单调栈，单调递减，保证栈中元素未找到下一个更大元素

    // 遍历数组两次
    for (let i = 0; i < n * 2 - 1; i++) {
        // 栈中有值 且 当前元素大于栈顶元素，说明栈中部分元素的下一个更大元素已找到，需要弹栈
        while (stack.length && nums[i % n] > nums[stack[stack.length - 1]]) {
            res[stack[stack.length - 1]] = nums[i % n]; // 保存下一个更大元素
            stack.pop(); // 出栈
        }

        // 对于第二次枚举到的元素无需入栈
        // 因为这部分的元素已经入过栈，枚举他们是为了给数组靠后的元素找到更大的元素。
        // 它们本身在第一次枚举就是处理过了的，即使还没有找到下一个更大元素，它们也已经在第一次取到的时候入栈了，无需重复入栈。
        // 入栈的都是等待处理的，因此处理过的无须入栈
        if (i < n) {
            stack.push(i % n);
        }
    }
    return res;
};
// 时间复杂度：O(n)，n 为数组 nums 的长度，虽然我们对数组进行了 2 次循环，但是对于每一个元素，最多只入栈出栈各一次，因此总的时间复杂度为 O(n)。
// 空间复杂度：O(n)，n 为数组 nums 的长度，单调栈中最多会存放 n 个元素。
