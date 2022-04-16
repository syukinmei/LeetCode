// 给你一个未排序的整数数组 nums ，请你找出其中没有出现的最小的正整数。
// 请你实现时间复杂度为 O(n) 并且只使用常数级别额外空间的解决方案。


// 输入：nums = [1,2,0]
// 输出：3

// 输入：nums = [3,4,-1,1]
// 输出：2

// 输入：nums = [7,8,9,11,12]
// 输出：1



// 提示：观察案例数组，我们不难发现：设数组nums长度为 n，一旦出现 小于0 或者 大于等于n+1的数，那么 1～n 中必定会有数字缺失，所以缺失的第一个正整数一定是在 [1, n+1] 这个闭合区间内。 


/**
 * @param {number[]} nums
 * @return {number}
 */
// 方法一：额外数组
// 我们创建一个额外数组 arr，长度为 nums.length，初始值为0。
// 循环 nums 将值存于 arr 中满足其要求的位置。使其要求是如 [1,2,3,..,n] ，arr[i] === i + 1，即下标0存放的值应该为1，下标2存3....
// arr 长度为 nums 的长度，因为 如nums = [1, 2, 3]，可以完美填充 arr 因此他缺失的第一个正数为 arr.leng +1 
// 循环 arr 判断 各位置是否有缺失
var firstMissingPositive = function (nums) {
    const len = nums.length;
    const arr = new Array(len).fill(0);
    for (let i = 0; i < len; i++) {
        if (0 < nums[i] && nums[i] <= len) {
            arr[nums[i] - 1] = nums[i];
        }
    }
    for (let [index, num] of arr.entries()) {
        if (index + 1 !== num) return index + 1;
    }
    return len + 1;
};
// 时间复杂度：O(n)，n 为 nums 的长度。
// 空间复杂度：O(n)，n 为 arr 而是 nums 的长度。


// 方法二：额外数组的优化
// 1、原地操作 nums 数组。使其达到理想状态
// 2、[3, 4, -1, 1] = [1, -1, 3, 4]
// 3、使得 nums[i] = i + 1 否则缺少的第一个正整数就是 i+1
// 思路：循环 nums，当前元素在(0, nums.length] 之间，并且 nums[nums[i]-1] !== nums[i]，则交换位置。
// 然后循环交换位置后的数组，判断第一个缺失的正数。
var firstMissingPositive = function (nums) {
    const len = nums.length;

    for (let i = 0; i < len; i++) {
        // 将 nums[i] 放到对应的位置
        while (
            0 < nums[i] &&
            nums[i] <= len &&
            nums[nums[i] - 1] !== nums[i]
        ) {
            let temp = nums[nums[i] - 1];
            nums[nums[i] - 1] = nums[i];
            nums[i] = temp;
        }
    }

    // 交换完后，遍历理想数组，查看是否是对应位置
    for (let i = 0; i < len; i++) {
        if (nums[i] !== i + 1) return i + 1;
    }

    // 如 [1, 2, 3] 这样的数组 缺失的第一个正整数为 len+1
    return len + 1;
};
// 时间复杂度：O(n)，n 为 nums 的长度。
// 空间复杂度：O(1)，只需要常数的空间存放若干变量。