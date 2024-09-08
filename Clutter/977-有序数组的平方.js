// 给你一个按 非递减顺序 排序的整数数组 nums，返回 每个数字的平方 组成的新数组，要求也按 非递减顺序 排序。

// 输入：nums = [-4,-1,0,3,10]
// 输出：[0,1,9,16,100]
// 解释：平方后，数组变为 [16,1,0,9,100]
// 排序后，数组变为 [0,1,9,16,100]

// 输入：nums = [-7,-3,2,3,11]
// 输出：[4,9,9,49,121]

// 方法一：双指针
// 数组是有序的，只不过负数平方之后可能成为最大数了。那么数组平方的最大值就在数组的两端，不是最左边就是最右边，不可能是中间。
// 因此，我们可以使用「双指针」，分别指向数组的两端，每次比较两个指针指向的元素的平方值，将较大者的平方值放入结果数组的末尾。
// 具体的：
// 定义一个新数组 res，和 nums 数组一样的大小，让 k 指向 res 数组的末尾位置；
// 初始化左右指针指向数组两端；
// 比较左右指针指向的元素的平方值，将较大的值放入 res[k]，并将对应指针向中间移动一位：
//  - 判断 nums 数组两端平方后谁为最大值，给数组res倒着赋值；
//  - 如果nums[i] * nums[i] < nums[j] * nums[j] 那么res[k--] = nums[j] * nums[j];
//  - 如果nums[i] * nums[i] >= nums[j] * nums[j] 那么res[k--] = nums[i] * nums[i];
// 循环直到所有数据已填入 res 中（直到左指针超过右指针，或者 k 指针为 -1）；
// 返回 res ；

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortedSquares = function (nums) {
    // 初始化左右指针、插入指针 k，结果数组 res
    let left = 0,
        right = nums.length - 1;
    const n = nums.length;
    let k = n - 1;
    const res = new Array(n);

    // 循环，直到左指针超过右指针，或者 k 指针为 -1，均表示所有数据已填入 res 中
    while (left <= right) {
        // 相等的情况谁赋值都一样
        if (nums[left] * nums[left] >= nums[right] * nums[right]) {
            res[k--] = nums[left] * nums[left];
            left++;
        } else if (nums[left] * nums[left] < nums[right] * nums[right]) {
            res[k--] = nums[right] * nums[right];
            right--;
        }
    }
    return res;
};
// 时间复杂度：O(n)，n为数组nums的长度。
// 空间复杂度：O(1)，除了答案数组，我们只需要维护常数的空间保存若干变量。
