// 给你一个整数数组 nums ，该数组具有以下属性：

// nums.length == 2 * n.
// nums 包含 n + 1 个 不同的 元素
// nums 中恰有一个元素重复 n 次
// 找出并返回重复了 n 次的那个元素。

// 输入：nums = [1,2,3,3]
// 输出：3

// 输入：nums = [2,1,2,5,3,2]
// 输出：2

// 输入：nums = [5,1,5,2,5,3,5,4]
// 输出：5

// 提示:
// 2 <= n <= 5000
// nums.length == 2 * n
// 0 <= nums[i] <= 104
// nums 由 n + 1 个 不同的 元素组成，且其中一个元素恰好重复 n 次


// 由于数组长度为 2n，且数组包含 n+1 个不同的元素，且有一个元素重复 n 次，所以我们能够推出 数组中除了出现n次的数字，其他数字均只出现过一次。

/**
 * @param {number[]} nums
 * @return {number}
 */
// 方法一：哈希表
var repeatedNTimes = function (nums) {
    const set = new Set();
    for (let i = 0; i < nums.length; i++) {
        if (set.has(nums[i])) {
            return nums[i];
        } else {
            set.add(nums[i]);
        }
    }
};
// 时间复杂度：O(n)，我们只需要对数组 nums 进行一次遍历。
// 空间复杂度O(n)，为构建哈希集合的空间。


// 方法二：数学
// 重复元素最多间隔为2。也就是n=2时。
// 如，[3, 1, 2, 3]    [3, 1, 2, 3, 4, 3]
// 对于每个nums[i]而言，我们检查往前的三个位置（若有）。
var repeatedNTimes = function (nums) {
    for (let i = 0; i < nums.length; i++) {
        if (i - 1 >= 0 && nums[i - 1] === nums[i]) return nums[i];
        if (i - 2 >= 0 && nums[i - 2] === nums[i]) return nums[i];
        if (i - 3 >= 0 && nums[i - 3] === nums[i]) return nums[i];
    }
};
// 时间复杂度：O(n)。
// 空间复杂度：O(1)，只需要常数的空间存放若干变量。


// 方法三：随机抽样
// 我们可以每次随机选择两个不同的下标，判断它们对应的元素是否相等即可，如果相等，返回任意一个即可。
var repeatedNTimes = function (nums) {
    const Len = nums.length;
    while (true) {
        const x = Math.floor(Math.random() * Len), y = Math.floor(Math.random() * Len);
        if (x !== y && nums[x] === nums[y]) return nums[x];
    }
};
// 时间复杂度：期望O(1)，选择两个相同元素的概率为 n/2n * n-1/2n ，因此期望 4 次结束循环。
// 空间复杂度：O(1)，只需要常数的空间存放若干变量。
