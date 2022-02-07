// 给你一个整数数组 nums 。数组中唯一元素是那些只出现 恰好一次 的元素。
// 请你返回 nums 中唯一元素的 和 。

// 输入：nums = [1,2,3,2]
// 输出：4
// 解释：唯一元素为 [1,3] ，和为 4 。

// 输入：nums = [1,1,1,1,1]
// 输出：0
// 解释：没有唯一元素，和为 0 。

// 输入：nums = [1,2,3,4,5]
// 输出：15
// 解释：唯一元素为 [1,2,3,4,5] ，和为 15 。


/**
 * @param {number[]} nums
 * @return {number}
 */
// 方法一：记录每个元素的出现次数
// 根据题意，我们可以用一个哈希表记录每个元素值的出现次数，然后遍历哈希表，累加恰好出现一次的元素值，即为答案。
var sumOfUnique = function (nums) {
    // 建立字典记录 数字 及 出现的次数 
    const dis = new Map();
    for (let num of nums) {
        dis.set(num, (dis.get(num) || 0) + 1);
    }
    // 遍历字典，如果出现次数为 1 次，则往结果值中累加
    let ans = 0;
    for (const [num, cnt] of dis) {
        if (cnt === 1) ans += num;
    }
    return ans;
};
// 时间复杂度：O(n)，n 为数组 nums 的长度
// 空间复杂度：O(n)，建立字典需要O(n)


// 方法二：记录每个元素的状态 + 一次遍历
// 方法一需要遍历数组和哈希表各一次，能否做到仅执行一次遍历呢？
// 我们可以赋给每个元素三个状态：
// 0：该元素尚未被访问；
// 1：该元素被访问过一次；
// 2：该元素被访问超过一次。
// 我们可以在首次访问一个元素时，将该元素加入答案，然后将该元素状态标记为 1 。在访问到一个标记为 1 的元素时，由于这意味着该元素出现不止一次，因此将其从答案中减去，并将该元素状态标记为 2 。
var sumOfUnique = function (nums) {
    // 建立字典记录 数字 及 出现的次数 
    const dis = new Map();
    let ans = 0;
    for (let num of nums) {
        if (!dis.get(num)) { // 如果字典中不存在该元素
            ans += num;
            // dis.set(num, 1);
        } else if (dis.get(num) === 1) { // 出现过一次
            ans -= num;
            // dis.set(num, 2);
        }
        dis.set(num, (dis.get(num) || 0) + 1);
    }
    return ans;
};
// 时间复杂度：O(n)，n 为数组 nums 的长度
// 空间复杂度：O(n)，建立字典需要O(n)