// 给你一个整数数组 nums，将 nums 中的的所有偶数元素移动到数组的前面，后跟所有奇数元素。
// 返回满足此条件的 任一数组 作为答案。

// 输入：nums = [3,1,2,4]
// 输出：[2,4,3,1]
// 解释：[4,2,3,1]、[2,4,1,3] 和 [4,2,1,3] 也会被视作正确答案。

// 输入：nums = [0]
// 输出：[0]

/**
 * @param {number[]} nums
 * @return {number[]}
 */
// 方法一：两次遍历
// 遍历两次 nums ，第一次把所有偶数依次追加到res中，第二次把所有奇数依次追加到res中。
var sortArrayByParity = function (nums) {
    const Len = nums.length;
    const res = new Array(Len).fill(0);
    let index = 0;
    for (let num of nums)
        if (num % 2 === 0) res[index++] = num;

    for (let num of nums)
        if (num % 2 === 1) res[index++] = num;

    return res;
};
// 时间复杂度：O(n)，n 为 nums 的长度，需要遍历 nums 两次。
// 空间复杂度：O(1)，只需要常数的空间存放若干变量。


// 方法二：一次遍历 + 双指针
// 方法一需要遍历两次 nums，第一次遍历时遇到奇数会跳过，第二次遍历时遇到偶数会跳过，这部分可以优化。
// 左右指针分别指向结果数组两侧，遍历一次 nums ，遇到偶数从 res 左侧开始替换元素，遇到奇数则从 res 右侧开始替换元素。
var sortArrayByParity = function (nums) {
    const Len = nums.length;
    let left = 0, right = Len - 1;
    const res = new Array(Len).fill(0);
    for (let num of nums) {
        if (num % 2 === 0) res[left++] = num;
        if (num % 2 === 1) res[right--] = num;
    }
    return res;
};
// 时间复杂度：O(n)，n 为 nums 的长度，只需要遍历 nums 一次。
// 空间复杂度：O(1)，只需要常数的空间存放若干变量。


// 方法三：双指针 + 原地交换
// 左右指针分别指向 nums 数组两侧，
// left 指针先向右移，如果遇到偶数，就表示这个元素已经在合理的位置了，继续右移，直到遇到一个奇数。然后 right 左移，如果遇到奇数，就表示这个元素已经在合理的位置了，继续左移，直到遇到一个偶数。交换这两个奇数和偶数的位置。
// 然后重复上述操作，直到 left 和 right 相遇，此时 nums 排序完毕。
var sortArrayByParity = function (nums) {
    let left = 0, right = nums.length - 1;
    while (left < right) {
        // 找到左侧第一个奇数
        while (left < right && nums[left] % 2 === 0) left++;

        // 找到右侧第一个偶数
        while (left < right && nums[right] % 2 === 1) right--;

        // 交换左右指针指向的元素
        let temp = nums[left];
        nums[left] = nums[right];
        nums[right] = temp;
        // 注意 此时left 和 right 交换后 所指元素也在合理位置 指针应该移动
        left++;
        right--;
    }
    return nums;
};
// 时间复杂度：O(n)，n 为 nums 的长度，只需要遍历 nums 一次。
// 空间复杂度：O(1)，只需要常数的空间存放若干变量。
