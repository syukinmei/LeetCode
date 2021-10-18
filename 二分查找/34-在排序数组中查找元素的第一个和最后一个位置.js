
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */

// 方法一：暴力解法
// 利用数组有序的特点从头到尾遍历一次数组。
// 在遍历的开始，检查遍历到的元素是否等于target，如果等于target，记录当前的下标位置
// 接着遍历，检查遍历到的元素是否不等于target，如果不等于target，记录当前位置的前一个下标即可。
// 复杂度分析：
// 时间复杂度：O(n),这里n为数组的长度。
// 空间复杂度：O(1)，只用到常数个临时变量。


// 方法二：2次二分搜索分别检索大于等于target的部分 和 小于等于target的部分
var searchRange = function (nums, target) {
    let left = 0, right = nums.length - 1, mid, ans = [];
    // 第一次二分搜索大于等于target的部分，即为target的起始位置
    while (left < right) {
        mid = left + ((right - left) >> 1);
        if (nums[mid] >= target) { // 下轮搜索区间为[left, mid] ,因为存在mid为第一个等于target的情况
            right = mid;
        } else { // 下轮搜索区间为[mid+1, right]
            left = mid + 1;
        }
    }
    // 此时有left = right if该点为target即为第一个target的位置，else数组中无target，返回[-1,-1]
    if (nums[left] === target) {
        ans.push(left);
    } else {
        return [-1, -1];
    }

    // 第二次二分搜索小于等于target的部分
    // 再次二分搜索初始化
    left = 0, right = nums.length - 1;
    // 会存在left 和 right 区间里都为target的情况如果mid = left会死循环；

    // 此方法只能返回right
    // while (left <= right) {
    //     mid = left + ((right - left) >> 1);
    //     if (nums[mid] <= target) {
    //         left = mid + 1;
    //     } else {
    //         right = mid - 1;
    //     }
    // }

    // 此方法可以left == right 都可以返回
    while (left < right) {
        mid = left + Math.ceil((right - left) / 2);
        if (nums[mid] <= target) {
            left = mid
        } else {
            right = mid - 1;
        }
    }
    ans.push(right)
    return ans;
};
searchRange([1, 2, 2, 4, 4, 4, 5, 6, 6, 6], 4)

// 时间复杂度：n为数组的长度
// 空间复杂度：只用到常数个临时变量





// 更好理解版

/* var searchRange = function (nums, target) {
    let left = 0, right = nums.length - 1, mid, ans = [];
    // 第一次二分搜索大于等于target的部分，即为target的起始位置
    while (left < right) {
        mid = left + ((right - left) >> 1);
        if (nums[mid] > target) { //
            right = mid - 1;
        } else if (nums[mid] < target) {
            left = mid + 1;
        } else { // nums[mid]==target,mid右边一定不是target第一次出现的位置
            right = mid;
        }
    }
    // 此时有left = right if该点为target即为第一个target的位置，else数组中无target，返回[-1,-1]
    if (nums[left] === target) {
        ans.push(left);
    } else {
        return [-1, -1];
    }

    // 第二次二分搜索小于等于target的部分
    // 再次二分搜索初始化
    left = 0, right = nums.length - 1;
    while (left < right) {
        mid = left + Math.ceil((right - left) / 2);
        if (nums[mid] < target) {
            left = mid + 1;
        } else if (nums[mid] > target) {
            right = mid - 1;
        } else { // nums[mid]==target,mid左边边一定不是target第一次出现的位置
            left = mid;
        }
    }
    ans.push(right)
    return ans;
}; */