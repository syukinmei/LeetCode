// 给你两个整数数组 arr1 ， arr2 和一个整数 d ，请你返回两个数组之间的 距离值 。
// 「距离值」 定义为符合此距离要求的元素数目：对于元素 arr1[i] ，不存在任何元素 arr2[j] 满足 |arr1[i]-arr2[j]| <= d 。

// 输入：arr1 = [4,5,8], arr2 = [10,9,1,8], d = 2
// 输出：2
// 解释：
// 对于 arr1[0]=4 我们有：
// |4-10|=6 > d=2 
// |4-9|=5 > d=2 
// |4-1|=3 > d=2 
// |4-8|=4 > d=2 
// 所以 arr1[0]=4 符合距离要求

// 对于 arr1[1]=5 我们有：
// |5-10|=5 > d=2 
// |5-9|=4 > d=2 
// |5-1|=4 > d=2 
// |5-8|=3 > d=2
// 所以 arr1[1]=5 也符合距离要求

// 对于 arr1[2]=8 我们有：
// |8-10|=2 <= d=2
// |8-9|=1 <= d=2
// |8-1|=7 > d=2
// |8-8|=0 <= d=2
// 存在距离小于等于 2 的情况，不符合距离要求 

// 故而只有 arr1[0]=4 和 arr1[1]=5 两个符合距离要求，距离值为 2

// 输入：arr1 = [1,4,2,3], arr2 = [-4,-3,6,10,20,30], d = 3
// 输出：2

// 输入：arr1 = [2,1,100,3], arr2 = [-5,-2,10,-3,7], d = 6
// 输出：1

/**
 * @param {number[]} arr1
 * @param {number[]} arr2
 * @param {number} d
 * @return {number}
 */
// 方法一：枚举
// 对于 arr1 中的每个元素v1，枚举 arr2 中的每个元素v2，检查是否对于每一个 v2 都有 |v1-v2| > d，如果是，count加1
var findTheDistanceValue = function (arr1, arr2, d) {
    let count = 0;
    for (let v1 of arr1) {
        let flag = true; // 标识，true 表示没有 |v1-v2| <= d ,false 相反
        for (let v2 of arr2) {
            const Distance = Math.abs(v1 - v2);
            if (Distance <= d) {
                flag = false;
                break;
            }
        }
        if (flag === true) count++;
    }
    return count;
};
// 时间复杂度：O(n*m)，n 和 m 分别为 arr1 和 arr2 的长度。
// 空间复杂度：O(1)，只需要常数的空间存放若干变量。



// 方法二：二分查找
// 方法一中，我们枚举了arr2中每一项查看是否满足 |v1 - v2| > d ，实际上我们只需要找到arr2中 大于等于v1的第一个v2 以及 小于v1的第一个v2，查看它们两是否满足距离值即可。
// 使用二分查找，搜索arr2中第一个大于等于 v1 的下标 P。此时只需判断 P以及p-1 和 v1 的关系即可。
// 注意：P可能不在arr2中！！！
var findTheDistanceValue = function (arr1, arr2, d) {
    // 将 arr2 进行升序排序
    arr2.sort((a, b) => a - b);
    const Len = arr2.length;
    let count = 0;
    for (let v1 of arr1) {
        const P = binarySearch(arr2, v1);
        // 如果P超过了右边界，只需判断 v1 - arr2[P - 1] > d；如果P===0，只需要判断  arr2[P] - v1 > d，否则全部都要判断。
        if (P > Len - 1 && v1 - arr2[P - 1] > d || P === 0 && arr2[P] - v1 > d || arr2[P] - v1 > d && v1 - arr2[P - 1] > d) count++;
        // 等价于
        // if (P > Len - 1) {
        //     if (v1 - arr2[P - 1] > d) count++;
        // } else if (P === 0) {
        //     if (arr2[P] - v1 > d) count++;
        // } else if (arr2[P] - v1 > d && v1 - arr2[P - 1] > d) {
        //     count++;
        // }
    }
    return count;
};

// 利用二分查找数组中第一个大于等于 target 的下标 P，使得 arr[P] >= target ，arr[p - 1] < target
// 注意：P可能超出边界，如数组中所有元素都小于 target 时返回的是数组长度，都大于 target 时返回 0。
var binarySearch = function (arr, target) {
    const Len = arr.length;
    let left = 0, right = Len - 1;
    while (left <= right) {
        const mid = left + ((right - left) >> 1);
        if (arr[mid] === target) return mid;

        if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return left;
}
// 时间复杂度：O((n+m)logm)，n 和 m 分别为 arr1 和 arr2 的长度。给 arr2 排序需要 O(mlogm)，对面 arr1 中的每一个元素在 arr2 中二分需要O(n*logm)，所以总的时间复杂度为 O((n+m)logm)。
// 空间复杂度：O(1)，只需要常数的空间存放若干变量。
