// 给定一个包含 n + 1 个整数的数组 nums ，其数字都在 1 到 n 之间（包括 1 和 n），可知至少存在一个重复的整数。
// 假设 nums 只有 一个重复的整数 ，找出 这个重复的数 。
// 你设计的解决方案必须不修改数组 nums 且只用常量级 O(1) 的额外空间。

// 输入：nums = [1,3,4,2,2]
// 输出：2

// 输入：nums = [3,1,3,4,2]
// 输出：3

// 输入：nums = [1,1]
// 输出：1

// 输入：nums = [1,1,2]
// 输出：1

/**
 * @param {number[]} nums
 * @return {number}
 */

// 方法一：哈希表（一旦涉及出现次数/找重复，就可以使用哈希表）
/* var findDuplicate = function (nums) {
    let dic = new Set()
    for (let item of nums) {
        if (dic.has(item)) return item
        dic.add(item)
    }
    return -1;
}; */

// 时间复杂度：O(n)
// 空间复杂度：O(n)


// 方法二：二分查找
// 思路：数组长度为n+1 数字为[1,n],至少存在一个重复的整数。
// 例题：[1,3,4,2,2] n为4 重复数字在1,4之间。
var findDuplicate = function (nums) {
    // left right 为数值区间而不是下标
    let left = 1, right = nums.length - 1, mid;
    while (left < right) {
        mid = left + ((right - left) >> 1);
        // 计算小于等于mid的数字个数
        let count = 0;
        for (let i = 0; i < nums.length; i++) {
            // if (nums[i] <= mid) count++;
            count += nums[i] <= mid;
        }
        if (count > mid) { // 假设mid=4小于等于4的数只能为[1,2,3,4]4个如果大于4个说明[1,4]有重复数字
            right = mid;
        } else {
            left = mid + 1;
        }
    }
    // 此时有left = right 即为重数数字
    return left;
};
// 时间复杂度：O(NlogN)。二分的时间复杂度为O(logN)，在二分内部有for循环，时间复杂度为O(N)。
// 空间复杂度：O(1)，我们只需要常数的空间保存若干变量。

// 解题复盘：
// 注意题意！！！
// 数组长度为n+1 数字为[1,n],至少存在一个重复的整数。
// 举例：
// nums = [1,3,4,2,2] 此时就有n为4，数组长度为4+1=5，数组内的数字值域为[1,4]
// 小于等于 1 的数字个数为 1 (1)
// 小于等于 2 的数字个数为 2 (1、2)
// 小于等于 3 的数字个数为 4 (1、3、2、2)
// 小于等于 4 的数字个数为 4 (1、3、2、2、4)
// 找一下规律家人们！！！
// 没错！重复数的左边严格小于等于自身，而重复数的右边严格大于自身。

// 结合**抽屉原理**：把十个苹果放到九个抽屉里，无论怎样放，至少会有一个抽屉里面放不少于两个苹果。
// 小于等于4的数字只有1、2、3、4 4个。如果有5个说明[1,4]区间有重复元素。

// 代码思路：
// 1、声明变量 left 和 right 为nums数组中值域 [1,....nums.length-1]，mid为二分界限，重复数要么在[1,mid]要么在[mid+1,nums.length-1]；
//     nums.length = 4 nums数组中的元素必定包含1、2、3 如何[1,3]中有一个重复数
// 2、while循环进行二分查找，终止条件为left >= right
// 3、遍历数组，统计小于等于mid的数字个数，记为count；
// 4、判断count 与 mid 的大小关系。根据之前发现的规律有以下总结
//     count > mid , 说明有超过mid个元素落在[1,mid]，但该区间只有mid个坑位，即有重复数大小在[1,mid]之间。
//     反之 count <= mid ,重复数大小为[mid+1,nums.length-1]。
// 5、对重复数所在的区间继续二分，直到值域区间闭合，重复数找到。