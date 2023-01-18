// 给你一个数组 nums ，数组中只包含非负整数。定义 rev(x) 的值为将整数 x 各个数字位反转得到的结果。比方说 rev(123) = 321 ， rev(120) = 21 。我们称满足下面条件的下标对 (i, j) 是 好的 ：
//  - 0 <= i < j < nums.length
//  - nums[i] + rev(nums[j]) == nums[j] + rev(nums[i])
// 请你返回好下标对的数目。由于结果可能会很大，请将结果对 109 + 7 取余 后返回。


// 输入：nums = [42,11,1,97]
// 输出：2
// 解释：两个坐标对为：
//  - (0,3)：42 + rev(97) = 42 + 79 = 121, 97 + rev(42) = 97 + 24 = 121 。
//  - (1,2)：11 + rev(1) = 11 + 1 = 12, 1 + rev(11) = 1 + 11 = 12 。

// 输入：nums = [13,10,35,24,76]
// 输出：4

// 式子转化 + 哈希表
// 对于下标对(i, j)，如果满足条件，那么有 nums[i] + rev(nums[j]) === nums[j] + rev(nums[i])，即 nums[i] - rev(nums[i]) === nums[j] - rev(nums[j])
// 因此，我们可以将 nums[i] - rev(nums[i]) 作为哈希表的键，出现次数做为值。
// 具体的，我们从前往后遍历数组中所有数，对于当前数 nums[i] ，查看哈希表中 nums[i] - rev(nums[i]) 出现的次数，然后我们直接累加以前 nums[i] - rev(nums[i]) 出现的次数即可。
/**
 * @param {number[]} nums
 * @return {number}
 */
var countNicePairs = function (nums) {
    const MOD = 10 ** 9 + 7;
    const map = new Map();
    let count = 0;
    for (let num of nums) {
        // 记录
        const val = num - rev(num);
        count += map.get(val) || 0;
        map.set(val, (map.get(val) || 0) + 1)
    }
    return count % MOD;
};

// 辅助函数 rev
// rev(x) 的值为将整数 x 各个数字位反转得到的结果。
const rev = function (num) {
    let res = 0;
    let temp = num;
    while (temp > 0) {
        res = res * 10 + temp % 10;
        temp = Math.floor(temp / 10);
    }
    return res;
}
// 时间复杂度：O(n*logC)，n 为数组 nums 的长度，C 为数组 nums 中的数字范围。其中 O(logC)为反转数位的时间复杂度。
// 空间复杂度：O(n)，n 为数组 nums 的长度，主要为哈希表的空间开销。
