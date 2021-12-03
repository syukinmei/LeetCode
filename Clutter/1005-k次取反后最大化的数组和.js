// 给你一个整数数组 nums 和一个整数 k ，按以下方法修改该数组：
// 选择某个下标 i 并将 nums[i] 替换为 -nums[i] 。
// 重复这个过程恰好 k 次。可以多次选择同一个下标 i 。
// 以这种方式修改数组后，返回数组 可能的最大和 。

// 输入：nums = [4,2,3], k = 1
// 输出：5
// 解释：选择下标 1 ，nums 变为 [4,-2,3] 。

// 输入：nums = [3,-1,0,2], k = 3
// 输出：6
// 解释：选择下标 (1, 2, 2) ，nums 变为 [3,1,0,2] 。

// 输入：nums = [2,-3,-1,5,-4], k = 2
// 输出：13
// 解释：选择下标 (1, 4) ，nums 变为 [2,3,-1,5,4] 。


/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var largestSumAfterKNegations = function (nums, k) {
    // 对数组升序排序
    nums.sort((a, b) => a - b);
    for (let i = 0; i < nums.length && k > 0; i++) {
        if (nums[i] < 0) {
            nums[i] *= -1;
            k--;
        }
        if (nums[i] === 0) {
            k = 0;
        }
    }
    // 再次排序检查k的
    nums.sort((a, b) => a - b);
    for (let i = 0; i < nums.length && k % 2; i++) {
        nums[i] *= -1;
        k--;
    }
    // 求和
    let sum = 0;
    for (let i = 0; i < nums.length; i++) {
        sum += nums[i];
    }
    return sum;
};


// 一次循环
var largestSumAfterKNegations = function (nums, k) {
    // 对数组依据绝对值生序排序
    nums.sort((a, b) => { return Math.abs(a) - Math.abs(b) });
    // 逆向遍历数组，求和
    let sum = 0;
    for (let i = nums.length - 1; i >= 0; i--) {
        if (nums[i] < 0 && k > 0) {
            sum += -nums[i];
            k--;
        } else {
            sum += nums[i];
        }
    }
    // 判断k剩余数量，为偶数直接return sum ，为奇数减2次最小数求反值
    if (k % 2) {
        // sum -= Math.abs(nums[0]) * 2
        sum -= Math.abs(nums[0] << 1)
    }
    return sum;
};